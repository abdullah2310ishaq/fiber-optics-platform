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
import { getDb } from "@/app/firebase/firestore";
import { createAdminNotification } from "@/lib/firestore/admin-notifications";
import { stripUndefinedDeep } from "@/lib/utils";
import type { CreateGuestRfqInput, Rfq, RfqStatus } from "@/types/rfq";

function toDate(value: unknown): Date {
  if (value && typeof value === "object" && "toDate" in value) {
    return (value as { toDate: () => Date }).toDate();
  }
  return new Date();
}

function mapRfq(id: string, data: DocumentData): Rfq {
  return {
    id,
    contactName: data.contactName,
    contactEmail: data.contactEmail,
    contactPhone: data.contactPhone,
    companyName: data.companyName,
    message: data.message ?? "",
    items: data.items ?? [],
    status: data.status as RfqStatus,
    createdAt: toDate(data.createdAt),
    updatedAt: toDate(data.updatedAt),
  };
}

export async function createRfq(input: CreateGuestRfqInput): Promise<string> {
  const docRef = await addDoc(
    collection(getDb(), "rfqs"),
    stripUndefinedDeep({
      ...input,
      status: "submitted",
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    })
  );
  await createAdminNotification({
    type: "rfq",
    referenceId: docRef.id,
    title: "New RFQ received",
    body: `${input.companyName} submitted a quotation request`,
    href: `/admin/rfqs?focus=${docRef.id}`,
  });
  return docRef.id;
}

export async function getAllRfqs(): Promise<Rfq[]> {
  const snapshot = await getDocs(
    query(collection(getDb(), "rfqs"), orderBy("createdAt", "desc"))
  );
  return snapshot.docs.map((docSnap) => mapRfq(docSnap.id, docSnap.data()));
}

export async function updateRfqStatus(id: string, status: RfqStatus): Promise<void> {
  await updateDoc(doc(getDb(), "rfqs", id), {
    status,
    updatedAt: serverTimestamp(),
  });
}
