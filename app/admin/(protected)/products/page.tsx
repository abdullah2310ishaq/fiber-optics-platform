"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { ProductForm } from "@/components/admin/product-form";
import { getAllProducts } from "@/lib/firestore/admin-products";
import type { Product } from "@/types/product";

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const loadProducts = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getAllProducts();
      setProducts(data);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Products</h1>
        <p className="mt-1 text-slate-400">
          Upload images to Cloudinary → URLs save in Firebase automatically.
        </p>
      </div>

      <ProductForm onSuccess={loadProducts} />

      <div>
        <h2 className="mb-4 text-lg font-semibold text-white">
          All Products ({loading ? "..." : products.length})
        </h2>

        {loading ? (
          <p className="text-slate-400">Loading...</p>
        ) : products.length === 0 ? (
          <p className="rounded-lg border border-dashed border-slate-700 p-8 text-center text-slate-500">
            No products yet. Add your first product above.
          </p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <div key={product.id} className="overflow-hidden rounded-lg border border-slate-700 bg-slate-800">
                <div className="relative aspect-video bg-slate-900">
                  {product.images[0] && (
                    <Image src={product.images[0]} alt={product.name} fill className="object-cover" sizes="300px" />
                  )}
                </div>
                <div className="p-4">
                  <p className="font-medium text-white">{product.name}</p>
                  <p className="text-xs text-slate-400">{product.sku}</p>
                  <p className="mt-1 text-xs text-slate-500">{product.images.length} image(s)</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
