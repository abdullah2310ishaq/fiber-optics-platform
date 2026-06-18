import {
  addDoc,
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  type DocumentData,
} from "firebase/firestore";
import { db } from "@/app/firebase/client";
import type { CreateOrderInput, Order, OrderStatus } from "@/types/order";

function toDate(value: unknown): Date {
  if (value && typeof value === "object" && "toDate" in value) {
    return (value as { toDate: () => Date }).toDate();
  }
  return new Date();
}

function mapOrder(id: string, data: DocumentData): Order {
  return {
    id,
    rfqId: data.rfqId,
    companyName: data.companyName,
    contactName: data.contactName,
    contactEmail: data.contactEmail,
    contactPhone: data.contactPhone,
    items: data.items ?? [],
    status: data.status as OrderStatus,
    trackingNumber: data.trackingNumber,
    courier: data.courier,
    notes: data.notes,
    createdAt: toDate(data.createdAt),
    updatedAt: toDate(data.updatedAt),
  };
}

export async function createOrder(input: CreateOrderInput): Promise<string> {
  const docRef = await addDoc(collection(db, "orders"), {
    ...input,
    status: "pending",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function getAllOrders(): Promise<Order[]> {
  const snapshot = await getDocs(
    query(collection(db, "orders"), orderBy("createdAt", "desc"))
  );
  return snapshot.docs.map((docSnap) => mapOrder(docSnap.id, docSnap.data()));
}

export async function updateOrderStatus(
  id: string,
  status: OrderStatus,
  extra?: { trackingNumber?: string; courier?: string; notes?: string }
): Promise<void> {
  await updateDoc(doc(db, "orders", id), {
    status,
    ...extra,
    updatedAt: serverTimestamp(),
  });
}

export async function getOrderCount(): Promise<number> {
  const snapshot = await getDocs(collection(db, "orders"));
  return snapshot.size;
}
