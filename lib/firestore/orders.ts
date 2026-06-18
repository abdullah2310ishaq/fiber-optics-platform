import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  where,
  type DocumentData,
} from "firebase/firestore";
import { db } from "@/app/firebase/client";
import { createAdminNotification } from "@/lib/firestore/admin-notifications";
import { stripUndefinedDeep } from "@/lib/utils";
import type {
  CreateDirectOrderInput,
  CreateRfqOrderInput,
  Order,
  OrderStatus,
  OrderStatusUpdate,
} from "@/types/order";

function toDate(value: unknown): Date {
  if (value && typeof value === "object" && "toDate" in value) {
    return (value as { toDate: () => Date }).toDate();
  }
  return new Date();
}

function mapStatusHistory(data: unknown): OrderStatusUpdate[] {
  if (!Array.isArray(data)) return [];
  return data.map((entry) => ({
    status: entry.status,
    note: entry.note,
    at: toDate(entry.at),
  }));
}

function mapOrder(id: string, data: DocumentData): Order {
  return {
    id,
    orderType: data.orderType ?? "rfq_converted",
    rfqId: data.rfqId,
    companyName: data.companyName,
    contactName: data.contactName,
    contactEmail: data.contactEmail,
    contactPhone: data.contactPhone,
    shippingAddress: data.shippingAddress,
    items: data.items ?? [],
    subtotal: data.subtotal,
    status: data.status as OrderStatus,
    trackingNumber: data.trackingNumber,
    courier: data.courier,
    notes: data.notes,
    statusHistory: mapStatusHistory(data.statusHistory),
    createdAt: toDate(data.createdAt),
    updatedAt: toDate(data.updatedAt),
  };
}

export async function createDirectOrder(input: CreateDirectOrderInput): Promise<string> {
  const docRef = await addDoc(
    collection(db, "orders"),
    stripUndefinedDeep({
      orderType: "direct",
      ...input,
      status: "pending",
      statusHistory: [{ status: "pending", note: "Order placed", at: new Date() }],
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    })
  );
  await createAdminNotification({
    type: "order",
    referenceId: docRef.id,
    title: "New cart order",
    body: `${input.companyName} placed an order (${input.items.length} item(s))`,
    href: `/admin/orders?focus=${docRef.id}`,
  });
  return docRef.id;
}

export async function createOrderFromRfq(input: CreateRfqOrderInput): Promise<string> {
  const docRef = await addDoc(
    collection(db, "orders"),
    stripUndefinedDeep({
      orderType: "rfq_converted",
      ...input,
      status: "pending",
      statusHistory: [{ status: "pending", note: "Converted from RFQ", at: new Date() }],
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    })
  );
  return docRef.id;
}

/** @deprecated use createOrderFromRfq */
export async function createOrder(input: CreateRfqOrderInput): Promise<string> {
  return createOrderFromRfq(input);
}

export async function getAllOrders(): Promise<Order[]> {
  const snapshot = await getDocs(
    query(collection(db, "orders"), orderBy("createdAt", "desc"))
  );
  return snapshot.docs.map((docSnap) => mapOrder(docSnap.id, docSnap.data()));
}

export async function getOrderByIdAndEmail(
  orderId: string,
  email: string
): Promise<Order | null> {
  const docSnap = await getDoc(doc(db, "orders", orderId));
  if (!docSnap.exists()) return null;
  const order = mapOrder(docSnap.id, docSnap.data());
  if (order.contactEmail.toLowerCase() !== email.trim().toLowerCase()) return null;
  return order;
}

export async function updateOrderStatus(
  id: string,
  status: OrderStatus,
  extra?: { trackingNumber?: string; courier?: string; notes?: string }
): Promise<void> {
  const docSnap = await getDoc(doc(db, "orders", id));
  const existing = docSnap.exists() ? docSnap.data() : {};
  const history = Array.isArray(existing.statusHistory) ? [...existing.statusHistory] : [];
  history.push({ status, at: new Date(), note: extra?.notes });

  await updateDoc(
    doc(db, "orders", id),
    stripUndefinedDeep({
      status,
      ...extra,
      statusHistory: history,
      updatedAt: serverTimestamp(),
    })
  );
}

export async function getOrderCount(): Promise<number> {
  const snapshot = await getDocs(collection(db, "orders"));
  return snapshot.size;
}

export async function getDirectOrderCount(): Promise<number> {
  const snapshot = await getDocs(
    query(collection(db, "orders"), where("orderType", "==", "direct"))
  );
  return snapshot.size;
}
