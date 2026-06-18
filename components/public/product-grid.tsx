"use client";

import { motion } from "framer-motion";
import { EmptyCatalogIcon } from "@/components/icons/fiber-icons";
import { ProductCard } from "@/components/public/product-card";
import type { Product } from "@/types/product";

const ease = [0.22, 1, 0.36, 1] as const;

interface ProductGridProps {
  products: Product[];
  emptyMessage?: string;
  variant?: "light" | "elevated" | "catalog";
}

export function ProductGrid({
  products,
  emptyMessage = "No products match your filters.",
  variant = "light",
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border bg-card px-8 py-20 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl border border-border bg-secondary shadow-sm">
          <EmptyCatalogIcon className="text-muted-foreground" size={40} />
        </div>
        <p className="display-font mt-6 text-xl font-bold text-foreground">Nothing found</p>
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">{emptyMessage}</p>
      </div>
    );
  }

  const gridClass =
    variant === "catalog"
      ? "grid auto-rows-fr gap-5 sm:grid-cols-2 lg:grid-cols-3"
      : "grid auto-rows-fr gap-6 sm:grid-cols-2 lg:grid-cols-3";

  return (
    <div className={gridClass}>
      {products.map((product, i) => (
        <motion.div
          key={product.id}
          className="h-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: Math.min(i * 0.05, 0.3), ease }}
        >
          <ProductCard product={product} variant={variant} priority={i === 0} />
        </motion.div>
      ))}
    </div>
  );
}
