import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  type DocumentData,
} from "firebase/firestore";
import { getDb } from "@/app/firebase/firestore";
import type { Product, ProductSpecs, ProductStatus, StockStatus } from "@/types/product";

function toDate(value: unknown): Date {
  if (value && typeof value === "object" && "toDate" in value) {
    return (value as { toDate: () => Date }).toDate();
  }
  return new Date();
}

function mapProduct(id: string, data: DocumentData): Product {
  return {
    id,
    slug: data.slug ?? id,
    name: typeof data.name === "string" && data.name.trim() ? data.name.trim() : undefined,
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
    pcs: data.pcs,
    color: data.color,
    stockStatus: data.stockStatus,
    quantity: data.quantity,
    createdAt: toDate(data.createdAt),
    updatedAt: toDate(data.updatedAt),
  };
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function cleanSpecs(specs?: ProductSpecs): ProductSpecs | undefined {
  if (!specs) return undefined;
  const cleaned = Object.fromEntries(
    Object.entries(specs).filter(([, value]) => value?.trim())
  ) as ProductSpecs;
  return Object.keys(cleaned).length > 0 ? cleaned : undefined;
}

export interface SaveProductInput {
  name?: string;
  slug?: string;
  sku?: string;
  brand?: string;
  categoryId?: string;
  subcategoryId?: string;
  description?: string;
  specs?: ProductSpecs;
  images?: string[];
  isRfqOnly?: boolean;
  price?: number;
  status?: ProductStatus;
  pcs?: string;
  color?: string;
  stockStatus?: StockStatus;
  quantity?: number;
}

function resolveSlug(input: SaveProductInput): string {
  const fromSlug = input.slug?.trim();
  if (fromSlug) return slugify(fromSlug);

  const fromName = input.name?.trim();
  if (fromName) return slugify(fromName);

  const fromSku = input.sku?.trim();
  if (fromSku) return slugify(fromSku);

  return `product-${Date.now()}`;
}

function buildProductDoc(
  input: SaveProductInput,
  slug: string,
  options?: { createdAt?: unknown }
) {
  const now = serverTimestamp();
  const specs = cleanSpecs(input.specs);
  const images = input.images?.filter(Boolean) ?? [];

  const doc: Record<string, unknown> = {
    slug,
    name: input.name?.trim() ?? "",
    status: input.status ?? "active",
    isRfqOnly: input.isRfqOnly ?? true,
    images,
    createdAt: options?.createdAt ?? now,
    updatedAt: now,
  };

  const optionalStrings: (keyof SaveProductInput)[] = [
    "sku",
    "brand",
    "categoryId",
    "subcategoryId",
    "description",
    "pcs",
    "color",
  ];

  for (const key of optionalStrings) {
    const value = input[key];
    if (typeof value === "string" && value.trim()) {
      doc[key] = value.trim();
    }
  }

  if (specs) doc.specs = specs;
  if (input.price != null && input.price > 0) doc.price = input.price;
  if (input.stockStatus) doc.stockStatus = input.stockStatus;
  if (input.quantity != null && input.quantity >= 0) doc.quantity = input.quantity;

  return doc;
}

function productFromDoc(slug: string, docData: Record<string, unknown>): Product {
  return {
    id: slug,
    slug,
    name: typeof docData.name === "string" && docData.name.trim() ? docData.name.trim() : undefined,
    sku: typeof docData.sku === "string" ? docData.sku : undefined,
    brand: typeof docData.brand === "string" ? docData.brand : undefined,
    categoryId: typeof docData.categoryId === "string" ? docData.categoryId : undefined,
    subcategoryId: typeof docData.subcategoryId === "string" ? docData.subcategoryId : undefined,
    description: typeof docData.description === "string" ? docData.description : undefined,
    specs: (docData.specs as ProductSpecs | undefined) ?? {},
    images: (docData.images as string[]) ?? [],
    isRfqOnly: docData.isRfqOnly as boolean,
    price: typeof docData.price === "number" ? docData.price : undefined,
    status: docData.status as ProductStatus,
    pcs: typeof docData.pcs === "string" ? docData.pcs : undefined,
    color: typeof docData.color === "string" ? docData.color : undefined,
    stockStatus: docData.stockStatus as StockStatus | undefined,
    quantity: typeof docData.quantity === "number" ? docData.quantity : undefined,
    createdAt: toDate(docData.createdAt),
    updatedAt: toDate(docData.updatedAt),
  };
}

export async function saveProduct(input: SaveProductInput): Promise<Product> {
  const slug = resolveSlug(input);
  const docData = buildProductDoc(input, slug);
  await setDoc(doc(getDb(), "products", slug), docData);

  return productFromDoc(slug, docData);
}

export async function updateProduct(
  productId: string,
  input: SaveProductInput
): Promise<Product> {
  const newSlug = slugify(input.slug?.trim() || productId);
  const existingSnap = await getDoc(doc(getDb(), "products", productId));
  const createdAt = existingSnap.exists() ? existingSnap.data()?.createdAt : serverTimestamp();

  if (newSlug !== productId && existingSnap.exists()) {
    await deleteDoc(doc(getDb(), "products", productId));
  }

  const docData = buildProductDoc(input, newSlug, { createdAt });
  await setDoc(doc(getDb(), "products", newSlug), docData);

  return productFromDoc(newSlug, docData);
}

export async function deleteProduct(productId: string): Promise<void> {
  await deleteDoc(doc(getDb(), "products", productId));
}

export async function getAdminProductById(productId: string): Promise<Product | null> {
  const docSnap = await getDoc(doc(getDb(), "products", productId));
  if (!docSnap.exists()) return null;
  return mapProduct(docSnap.id, docSnap.data());
}

export async function getAllProducts(): Promise<Product[]> {
  try {
    const snapshot = await getDocs(
      query(collection(getDb(), "products"), orderBy("name", "asc"))
    );
    return snapshot.docs.map((docSnap) => mapProduct(docSnap.id, docSnap.data()));
  } catch {
    const snapshot = await getDocs(collection(getDb(), "products"));
    return snapshot.docs
      .map((docSnap) => mapProduct(docSnap.id, docSnap.data()))
      .sort((a, b) => (a.name ?? a.slug).localeCompare(b.name ?? b.slug));
  }
}

export async function getProductCount(): Promise<number> {
  const snapshot = await getDocs(collection(getDb(), "products"));
  return snapshot.size;
}
