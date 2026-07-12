import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  updateDoc,
  writeBatch,
  type DocumentData,
  type Unsubscribe,
} from "firebase/firestore";
import { getDb } from "@/app/firebase/firestore";
import type {
  AdminNotification,
  CreateAdminNotificationInput,
} from "@/types/admin-notification";

function toDate(value: unknown): Date {
  if (value && typeof value === "object" && "toDate" in value) {
    return (value as { toDate: () => Date }).toDate();
  }
  return new Date();
}

function mapNotification(id: string, data: DocumentData): AdminNotification {
  return {
    id,
    type: data.type,
    referenceId: data.referenceId,
    title: data.title,
    body: data.body,
    href: data.href,
    read: Boolean(data.read),
    createdAt: toDate(data.createdAt),
  };
}

export async function createAdminNotification(
  input: CreateAdminNotificationInput
): Promise<string> {
  const docRef = await addDoc(collection(getDb(), "admin_notifications"), {
    ...input,
    read: false,
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

export function subscribeAdminNotifications(
  onUpdate: (notifications: AdminNotification[]) => void,
  onError?: (error: Error) => void
): Unsubscribe {
  const q = query(
    collection(getDb(), "admin_notifications"),
    orderBy("createdAt", "desc")
  );

  return onSnapshot(
    q,
    (snapshot) => {
      onUpdate(snapshot.docs.map((docSnap) => mapNotification(docSnap.id, docSnap.data())));
    },
    (error) => onError?.(error)
  );
}

export async function markNotificationRead(id: string): Promise<void> {
  await updateDoc(doc(getDb(), "admin_notifications", id), { read: true });
}

export async function markNotificationUnread(id: string): Promise<void> {
  await updateDoc(doc(getDb(), "admin_notifications", id), { read: false });
}

export async function markAllNotificationsRead(ids: string[]): Promise<void> {
  if (ids.length === 0) return;
  const batch = writeBatch(getDb());
  for (const id of ids) {
    batch.update(doc(getDb(), "admin_notifications", id), { read: true });
  }
  await batch.commit();
}
