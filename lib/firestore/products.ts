import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  where,
  type DocumentData,
  type QueryConstraint,
} from "firebase/firestore";
import { db } from "@/app/firebase/client";
import {
  getSampleCategories,
  getSampleProductBySlug,
  getSampleProducts,
} from "@/lib/data/sample-data";
import type { Category, Product } from "@/types/product";

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

function mapCategory(id: string, data: DocumentData): Category {
  return {
    id,
    name: data.name,
    slug: data.slug,
    parentId: data.parentId,
    order: data.order ?? 0,
    imageUrl: data.imageUrl,
  };
}

export async function getCategories(): Promise<Category[]> {
  try {
    const snapshot = await getDocs(
      query(collection(db, "categories"), orderBy("order", "asc"))
    );
    if (snapshot.empty) return getSampleCategories();
    return snapshot.docs.map((docSnap) => mapCategory(docSnap.id, docSnap.data()));
  } catch {
    return getSampleCategories();
  }
}

export async function getProducts(filters?: {
  categoryId?: string;
  search?: string;
}): Promise<Product[]> {
  const constraints: QueryConstraint[] = [
    where("status", "==", "active"),
    orderBy("name", "asc"),
  ];

  if (filters?.categoryId) {
    constraints.unshift(where("categoryId", "==", filters.categoryId));
  }

  try {
    const snapshot = await getDocs(query(collection(db, "products"), ...constraints));
    let products = snapshot.docs.map((docSnap) => mapProduct(docSnap.id, docSnap.data()));

    if (products.length === 0) {
      return getSampleProducts(filters);
    }

    if (filters?.search) {
      const term = filters.search.toLowerCase();
      products = products.filter(
        (product) =>
          product.name.toLowerCase().includes(term) ||
          product.sku.toLowerCase().includes(term) ||
          product.brand.toLowerCase().includes(term)
      );
    }

    return products;
  } catch {
    return getSampleProducts(filters);
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const snapshot = await getDocs(
      query(
        collection(db, "products"),
        where("slug", "==", slug),
        where("status", "==", "active")
      )
    );

    if (snapshot.empty) return getSampleProductBySlug(slug);
    const docSnap = snapshot.docs[0];
    return mapProduct(docSnap.id, docSnap.data());
  } catch {
    return getSampleProductBySlug(slug);
  }
}

export async function getProductById(id: string): Promise<Product | null> {
  const docSnap = await getDoc(doc(db, "products", id));
  if (!docSnap.exists()) return null;
  return mapProduct(docSnap.id, docSnap.data());
}
