"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { ProductForm } from "@/components/admin/product-form";
import { AdminCard, AdminEmpty, AdminLoading, AdminPage, AdminPageHeader } from "@/components/admin/admin-ui";
import { getAllProducts } from "@/lib/firestore/admin-products";
import type { Product } from "@/types/product";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const loadProducts = useCallback(async () => {
    setLoading(true);
    try {
      setProducts(await getAllProducts());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return (
    <AdminPage>
      <AdminPageHeader
        title="Products"
        description="Add products with images. Saved to Firebase automatically."
      />

      <ProductForm onSuccess={loadProducts} />

      <div>
        <h2 className="mb-4 text-sm font-medium uppercase tracking-wide text-slate-500">
          Catalog ({loading ? "..." : products.length})
        </h2>

        {loading ? (
          <AdminLoading label="Loading products..." />
        ) : products.length === 0 ? (
          <AdminEmpty>No products yet. Add one above.</AdminEmpty>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <AdminCard key={product.id} className="overflow-hidden">
                <div className="relative aspect-video bg-slate-950">
                  {product.images[0] && (
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="300px"
                    />
                  )}
                </div>
                <div className="p-4">
                  <p className="font-medium text-white">{product.name}</p>
                  <p className="text-xs text-slate-500">{product.sku}</p>
                </div>
              </AdminCard>
            ))}
          </div>
        )}
      </div>
    </AdminPage>
  );
}
