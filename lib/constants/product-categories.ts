import type { Category } from "@/types/product";

export const PRODUCT_CATEGORIES: Category[] = [
  { id: "fiber-optic-cables", name: "Fiber Optic Cables", slug: "fiber-optic-cables", order: 1 },
  { id: "patch-cords", name: "Patch Cords", slug: "patch-cords", order: 2 },
  { id: "plc-splitters", name: "PLC Splitters", slug: "plc-splitters", order: 3 },
  { id: "transceivers", name: "Transceivers", slug: "transceivers", order: 4 },
  { id: "odfs-enclosures", name: "ODFs & Enclosures", slug: "odfs-enclosures", order: 5 },
];

export function mergeCategories(firestore: Category[]): Category[] {
  if (firestore.length === 0) return PRODUCT_CATEGORIES;

  const seen = new Set(firestore.map((c) => c.slug));
  const defaults = PRODUCT_CATEGORIES.filter((c) => !seen.has(c.slug));
  return [...firestore, ...defaults].sort((a, b) => a.order - b.order);
}
