"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ExternalLink, Pencil, Plus, Search, Trash2 } from "lucide-react";
import {
  AdminEmpty,
  AdminLoading,
  AdminLoadingModal,
  AdminPage,
  AdminPageHeader,
} from "@/components/admin/admin-ui";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { mergeCategories, PRODUCT_CATEGORIES } from "@/lib/constants/product-categories";
import { getAllCategories } from "@/lib/firestore/admin-categories";
import { deleteProduct, getAllProducts } from "@/lib/firestore/admin-products";
import { cn } from "@/lib/utils";
import type { Category, Product } from "@/types/product";

import { productActiveBadge, stockStatusBadge } from "@/lib/admin/badge-styles";

function StockBadge({ status }: { status?: Product["stockStatus"] }) {
  if (!status) return <span className="text-xs text-muted-foreground">—</span>;
  return (
    <span
      className={cn(
        "inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium uppercase",
        stockStatusBadge[status]
      )}
    >
      {status === "in_stock" ? "In Stock" : "Out of Stock"}
    </span>
  );
}

export function AdminProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>(PRODUCT_CATEGORIES);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const categoryMap = useMemo(
    () => new Map(categories.map((c) => [c.id, c.name])),
    [categories]
  );

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return products;
    return products.filter(
      (p) =>
        (p.name ?? "").toLowerCase().includes(term) ||
        (p.sku ?? "").toLowerCase().includes(term) ||
        (p.brand ?? "").toLowerCase().includes(term) ||
        p.slug.toLowerCase().includes(term)
    );
  }, [products, search]);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [allProducts, firestoreCategories] = await Promise.all([
        getAllProducts(),
        getAllCategories(),
      ]);
      setProducts(allProducts);
      setCategories(mergeCategories(firestoreCategories));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function handleDelete(product: Product) {
    const label = product.name ?? product.slug;
    if (!confirm(`Delete "${label}"? This cannot be undone.`)) return;

    setBusy(true);
    setDeletingId(product.id);
    try {
      await deleteProduct(product.id);
      setProducts((prev) => prev.filter((p) => p.id !== product.id));
    } catch (err) {
      alert(err instanceof Error ? err.message : "Failed to delete product");
    } finally {
      setDeletingId(null);
      setBusy(false);
    }
  }

  return (
    <AdminPage>
      <AdminLoadingModal open={busy} message="Deleting product..." />

      <AdminPageHeader
        title="All Products"
        description="View, edit, and delete products in your catalog."
        action={
          <Button asChild>
            <Link href="/admin/products/new">
              <Plus className="mr-2 h-4 w-4" />
              Add Product
            </Link>
          </Button>
        }
      />

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search name, SKU, brand..."
          className="pl-9"
        />
      </div>

      {loading ? (
        <AdminLoading label="Loading products..." />
      ) : filtered.length === 0 ? (
        <AdminEmpty>
          {products.length === 0
            ? "No products yet."
            : "No products match your search."}
        </AdminEmpty>
      ) : (
        <div className="overflow-hidden rounded-xl border border-border bg-card">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/60 text-xs uppercase tracking-wide text-muted-foreground">
                  <th className="px-4 py-3 font-medium">Product</th>
                  <th className="px-4 py-3 font-medium">SKU</th>
                  <th className="px-4 py-3 font-medium">Category</th>
                  <th className="px-4 py-3 font-medium">Stock</th>
                  <th className="px-4 py-3 font-medium">Price</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 text-right font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filtered.map((product) => {
                  const isDeleting = deletingId === product.id;
                  return (
                    <tr
                      key={product.id}
                      className={cn(
                        "transition-colors hover:bg-muted/40",
                        isDeleting && "opacity-50"
                      )}
                    >
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-background">
                            {product.images?.[0] ? (
                              <Image
                                src={product.images[0]}
                                alt={product.name ?? product.slug}
                                fill
                                className="object-cover"
                                sizes="48px"
                              />
                            ) : (
                              <div className="flex h-full items-center justify-center text-[10px] text-muted-foreground">
                                N/A
                              </div>
                            )}
                          </div>
                          <div className="min-w-0">
                            <p className="truncate font-medium text-foreground">
                              {product.name ?? "Untitled"}
                            </p>
                            <p className="truncate font-mono text-xs text-muted-foreground">
                              {product.slug}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 font-mono text-xs text-muted-foreground">
                        {product.sku ?? "—"}
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">
                        {product.categoryId
                          ? categoryMap.get(product.categoryId) ?? product.categoryId
                          : "—"}
                      </td>
                      <td className="px-4 py-3">
                        <div className="space-y-1">
                          <StockBadge status={product.stockStatus} />
                          {product.quantity != null && (
                            <p className="text-xs text-muted-foreground">Qty: {product.quantity}</p>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-foreground">
                        {product.price != null && product.price > 0
                          ? `$${product.price.toFixed(2)}`
                          : "RFQ"}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={cn(
                            "inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium capitalize",
                            product.status === "active"
                              ? productActiveBadge
                              : "bg-muted text-muted-foreground"
                          )}
                        >
                          {product.status ?? "active"}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1">
                          <Button variant="ghost" size="sm" asChild>
                            <Link
                              href={`/products/${product.slug}`}
                              target="_blank"
                              title="View on site"
                            >
                              <ExternalLink className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button variant="ghost" size="sm" asChild>
                            <Link
                              href={`/admin/products/${product.id}/edit`}
                              title="Edit product"
                            >
                              <Pencil className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(product)}
                            disabled={isDeleting || busy}
                            className="text-destructive hover:bg-red-50 hover:text-destructive"
                            title="Delete product"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="border-t border-border px-4 py-2 text-xs text-muted-foreground">
            {filtered.length} of {products.length} products
          </div>
        </div>
      )}
    </AdminPage>
  );
}
