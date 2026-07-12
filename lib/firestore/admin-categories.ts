import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  type DocumentData,
} from "firebase/firestore";
import { getDb } from "@/app/firebase/firestore";
import type { Category } from "@/types/product";

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
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

export interface SaveCategoryInput {
  name: string;
  slug?: string;
  order?: number;
}

export async function getAllCategories(): Promise<Category[]> {
  try {
    const snapshot = await getDocs(
      query(collection(getDb(), "categories"), orderBy("order", "asc"))
    );
    return snapshot.docs.map((docSnap) => mapCategory(docSnap.id, docSnap.data()));
  } catch {
    const snapshot = await getDocs(collection(getDb(), "categories"));
    return snapshot.docs
      .map((docSnap) => mapCategory(docSnap.id, docSnap.data()))
      .sort((a, b) => a.order - b.order);
  }
}

export async function saveCategory(input: SaveCategoryInput): Promise<Category> {
  const name = input.name.trim();
  if (!name) throw new Error("Category name is required.");

  const slug = slugify(input.slug?.trim() || name);
  if (!slug) throw new Error("Could not generate a valid category slug.");

  const existing = await getAllCategories();
  if (existing.some((c) => c.slug === slug || c.id === slug)) {
    throw new Error("A category with this name already exists.");
  }

  const order = input.order ?? existing.length + 1;

  await setDoc(doc(getDb(), "categories", slug), {
    name,
    slug,
    order,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return { id: slug, name, slug, order };
}

export async function deleteCategory(categoryId: string): Promise<void> {
  await deleteDoc(doc(getDb(), "categories", categoryId));
}

export interface UpdateCategoryInput {
  name: string;
  order?: number;
}

export async function updateCategory(
  categoryId: string,
  input: UpdateCategoryInput
): Promise<Category> {
  const name = input.name.trim();
  if (!name) throw new Error("Category name is required.");

  const firestore = await getAllCategories();
  const existing = firestore.find((c) => c.id === categoryId);
  const order = input.order ?? existing?.order ?? firestore.length + 1;

  const payload: Record<string, unknown> = {
    name,
    slug: categoryId,
    order,
    updatedAt: serverTimestamp(),
  };

  if (!existing) {
    payload.createdAt = serverTimestamp();
  }

  await setDoc(doc(getDb(), "categories", categoryId), payload, { merge: true });

  return { id: categoryId, name, slug: categoryId, order };
}
