import {
  collection,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  type DocumentData,
} from "firebase/firestore";
import { db } from "@/app/firebase/client";
import type { Product, ProductSpecs } from "@/types/product";

function toDate(value: unknown): Date {
  if (value && typeof value === "object" && "toDate" in value) {
    return (value as { toDate: () => Date }).toDate();
  }
  return new Date();
}

function mapProduct(id: string, data: DocumentData): Product {
  return {
    id,
    name: data.name,
    slug: data.slug,
    sku: data.sku,
    brand: data.brand,
    categoryId: data.categoryId,
    subcategoryId: data.subcategoryId,
    description: data.description,
    specs: data.specs ?? {},
    images: data.images ?? [],
    isRfqOnly: data.isRfqOnly ?? true,
    price: data.price,
    status: data.status ?? "active",
    createdAt: toDate(data.createdAt),
    updatedAt: toDate(data.updatedAt),
  };
}

export interface SaveProductInput {
  name: string;
  slug: string;
  sku: string;
  brand: string;
  categoryId: string;
  description: string;
  specs?: ProductSpecs;
  images: string[];
  isRfqOnly?: boolean;
  price?: number;
}

export async function saveProduct(input: SaveProductInput): Promise<string> {
  const now = serverTimestamp();
  await setDoc(doc(db, "products", input.slug), {
    ...input,
    specs: input.specs ?? {},
    isRfqOnly: input.isRfqOnly ?? true,
    status: "active",
    createdAt: now,
    updatedAt: now,
  });
  return input.slug;
}

export async function getAllProducts(): Promise<Product[]> {
  const snapshot = await getDocs(
    query(collection(db, "products"), orderBy("name", "asc"))
  );
  return snapshot.docs.map((docSnap) => mapProduct(docSnap.id, docSnap.data()));
}

export async function getProductCount(): Promise<number> {
  const snapshot = await getDocs(collection(db, "products"));
  return snapshot.size;
}
