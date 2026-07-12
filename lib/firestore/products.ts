import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  where,
  type DocumentData,
  type QueryConstraint,
} from "firebase/firestore";
import { getDb } from "@/app/firebase/firestore";
import { mergeCategories, PRODUCT_CATEGORIES } from "@/lib/constants/product-categories";
import type { Category, Product } from "@/types/product";

function toDate(value: unknown): Date {
  if (value && typeof value === "object" && "toDate" in value) {
    return (value as { toDate: () => Date }).toDate();
  }
  return new Date();
}

function mapCategory(id: string, data: DocumentData): Category {
  return {
    id,
    name: data.name ?? id,
    slug: data.slug ?? id,
    parentId: data.parentId,
    order: data.order ?? 0,
    imageUrl: data.imageUrl,
  };
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
    dimensions: data.dimensions,
    cabinetFeatures: data.cabinetFeatures,
    technicalSpecifications: data.technicalSpecifications,
    orderingInformation: data.orderingInformation,
    createdAt: toDate(data.createdAt),
    updatedAt: toDate(data.updatedAt),
  };
}

export async function getCategories(): Promise<Category[]> {
  try {
    const snapshot = await getDocs(
      query(collection(getDb(), "categories"), orderBy("order", "asc"))
    );
    const firestore = snapshot.docs.map((docSnap) =>
      mapCategory(docSnap.id, docSnap.data())
    );
    return mergeCategories(firestore);
  } catch {
    try {
      const snapshot = await getDocs(collection(getDb(), "categories"));
      const firestore = snapshot.docs
        .map((docSnap) => mapCategory(docSnap.id, docSnap.data()))
        .sort((a, b) => a.order - b.order);
      return mergeCategories(firestore);
    } catch {
      return PRODUCT_CATEGORIES;
    }
  }
}

function isActiveProduct(data: DocumentData): boolean {
  const status = data.status ?? "active";
  return status === "active";
}

function sortByName(a: Product, b: Product) {
  return (a.name ?? a.slug).localeCompare(b.name ?? b.slug);
}

async function fetchAllActiveProducts(): Promise<Product[]> {
  const snapshot = await getDocs(collection(getDb(), "products"));
  return snapshot.docs
    .map((docSnap) => mapProduct(docSnap.id, docSnap.data()))
    .filter((product) => (product.status ?? "active") === "active")
    .sort(sortByName);
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

  let products: Product[];

  try {
    const snapshot = await getDocs(query(collection(getDb(), "products"), ...constraints));
    products = snapshot.docs.map((docSnap) => mapProduct(docSnap.id, docSnap.data()));
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[getProducts] Indexed query failed, using fallback:", error);
    }
    products = await fetchAllActiveProducts();
    if (filters?.categoryId) {
      products = products.filter((product) => product.categoryId === filters.categoryId);
    }
  }

  if (filters?.search) {
    const term = filters.search.toLowerCase();
    products = products.filter(
      (product) =>
        (product.name ?? "").toLowerCase().includes(term) ||
        (product.sku ?? "").toLowerCase().includes(term) ||
        (product.brand ?? "").toLowerCase().includes(term)
    );
  }

  return products;
}

export async function getFeaturedProducts(limitCount = 6): Promise<Product[]> {
  try {
    const snapshot = await getDocs(
      query(
        collection(getDb(), "products"),
        where("status", "==", "active"),
        orderBy("name", "asc"),
        limit(limitCount)
      )
    );
    return snapshot.docs.map((docSnap) => mapProduct(docSnap.id, docSnap.data()));
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[getFeaturedProducts] Indexed query failed, using fallback:", error);
    }
    const products = await fetchAllActiveProducts();
    return products.slice(0, limitCount);
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const snapshot = await getDocs(
      query(
        collection(getDb(), "products"),
        where("slug", "==", slug),
        where("status", "==", "active")
      )
    );

    if (!snapshot.empty) {
      const docSnap = snapshot.docs[0];
      return mapProduct(docSnap.id, docSnap.data());
    }
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[getProductBySlug] Indexed query failed, using fallback:", error);
    }
  }

  const docSnap = await getDoc(doc(getDb(), "products", slug));
  if (!docSnap.exists()) return null;
  const data = docSnap.data();
  if (!isActiveProduct(data)) return null;
  return mapProduct(docSnap.id, data);
}

export async function getProductById(id: string): Promise<Product | null> {
  const docSnap = await getDoc(doc(getDb(), "products", id));
  if (!docSnap.exists()) return null;
  return mapProduct(docSnap.id, docSnap.data());
}
