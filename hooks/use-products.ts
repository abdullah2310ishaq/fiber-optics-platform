"use client";

import { useQuery } from "@tanstack/react-query";
import { getCategories, getProductBySlug, getProducts } from "@/lib/firestore/products";

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
}

export function useProducts(filters?: { categoryId?: string; search?: string }) {
  return useQuery({
    queryKey: ["products", filters?.categoryId ?? "all", filters?.search ?? ""],
    queryFn: () => getProducts(filters),
  });
}

export function useProduct(slug: string) {
  return useQuery({
    queryKey: ["product", slug],
    queryFn: () => getProductBySlug(slug),
    enabled: Boolean(slug),
  });
}
