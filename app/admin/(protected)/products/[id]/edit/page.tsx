"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { ProductForm } from "@/components/admin/product-form";
import { AdminLoading, AdminPage, AdminPageHeader } from "@/components/admin/admin-ui";
import { Button } from "@/components/ui/button";
import { mergeCategories, PRODUCT_CATEGORIES } from "@/lib/constants/product-categories";
import { getAllCategories } from "@/lib/firestore/admin-categories";
import { getAdminProductById } from "@/lib/firestore/admin-products";
import type { Category, Product } from "@/types/product";

export default function AdminEditProductPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params.id as string;

  const [product, setProduct] = useState<Product | null>(null);
  const [categories, setCategories] = useState<Category[]>(PRODUCT_CATEGORIES);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [loadedProduct, firestoreCategories] = await Promise.all([
        getAdminProductById(productId),
        getAllCategories(),
      ]);
      if (!loadedProduct) {
        setNotFound(true);
        return;
      }
      setProduct(loadedProduct);
      setCategories(mergeCategories(firestoreCategories));
    } finally {
      setLoading(false);
    }
  }, [productId]);

  useEffect(() => {
    load();
  }, [load]);

  if (loading) {
    return (
      <AdminPage>
        <AdminLoading label="Loading product..." />
      </AdminPage>
    );
  }

  if (notFound || !product) {
    return (
      <AdminPage>
        <AdminPageHeader title="Product not found" />
        <Button asChild>
          <Link href="/admin/products/list">Back to products</Link>
        </Button>
      </AdminPage>
    );
  }

  return (
    <AdminPage>
      <AdminPageHeader
        title="Edit Product"
        description={product.name ?? product.slug}
        action={
          <Button variant="outline" asChild>
            <Link href="/admin/products/list">
              <ArrowLeft className="mr-2 h-4 w-4" />
              All Products
            </Link>
          </Button>
        }
      />

      <ProductForm
        mode="edit"
        productId={productId}
        initialProduct={product}
        categories={categories}
        onSuccess={(updated) => {
          if (updated.id !== productId) {
            router.replace(`/admin/products/${updated.id}/edit`);
          }
          setProduct(updated);
        }}
      />
    </AdminPage>
  );
}
