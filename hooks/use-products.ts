"use client";

import { useQuery } from "@tanstack/react-query";
import { getCategories, getProductBySlug, getProducts } from "@/lib/firestore/products";

const FIVE_MINUTES = 5 * 60 * 1000;

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
    staleTime: FIVE_MINUTES,
  });
}

const ONE_MINUTE = 60 * 1000;

export function useProducts(filters?: { categoryId?: string; search?: string }) {
  return useQuery({
    queryKey: ["products", filters?.categoryId ?? "all", filters?.search ?? ""],
    queryFn: () => getProducts(filters),
    staleTime: ONE_MINUTE,
    refetchOnMount: "always",
  });
}

export function useProduct(slug: string) {
  return useQuery({
    queryKey: ["product", slug],
    queryFn: () => getProductBySlug(slug),
    enabled: Boolean(slug),
    staleTime: FIVE_MINUTES,
  });
}
