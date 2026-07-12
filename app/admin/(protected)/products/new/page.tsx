"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { CategoryForm } from "@/components/admin/category-form";
import { ProductForm } from "@/components/admin/product-form";
import { AdminPage, AdminPageHeader } from "@/components/admin/admin-ui";
import { Button } from "@/components/ui/button";
import { getAllCategories } from "@/lib/firestore/admin-categories";
import { mergeCategories, PRODUCT_CATEGORIES } from "@/lib/constants/product-categories";
import type { Category, Product } from "@/types/product";

export default function AdminNewProductPage() {
  const [categories, setCategories] = useState<Category[]>(PRODUCT_CATEGORIES);
  const [deletableCategoryIds, setDeletableCategoryIds] = useState<Set<string>>(new Set());
  const [categoriesLoading, setCategoriesLoading] = useState(true);

  const loadCategories = useCallback(async () => {
    setCategoriesLoading(true);
    try {
      const firestore = await getAllCategories();
      setDeletableCategoryIds(new Set(firestore.map((c) => c.id)));
      setCategories(mergeCategories(firestore));
    } finally {
      setCategoriesLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  function handleCategorySaved(category: Category) {
    setDeletableCategoryIds((prev) => new Set([...prev, category.id]));
    setCategories((prev) => {
      if (prev.some((c) => c.id === category.id)) return prev;
      return [...prev, category].sort((a, b) => a.order - b.order);
    });
  }

  function handleCategoryUpdated(category: Category) {
    setDeletableCategoryIds((prev) => new Set([...prev, category.id]));
    setCategories((prev) =>
      prev.map((c) => (c.id === category.id ? category : c)).sort((a, b) => a.order - b.order)
    );
  }

  function handleCategoryDeleted(categoryId: string) {
    setDeletableCategoryIds((prev) => {
      const next = new Set(prev);
      next.delete(categoryId);
      return next;
    });
    setCategories((prev) => {
      const filtered = prev.filter((c) => c.id !== categoryId);
      const defaultCat = PRODUCT_CATEGORIES.find((c) => c.id === categoryId);
      if (defaultCat && !filtered.some((c) => c.id === categoryId)) {
        return [...filtered, defaultCat].sort((a, b) => a.order - b.order);
      }
      return filtered;
    });
  }

  return (
    <AdminPage>
      <AdminPageHeader
        title="Add Product"
        description="Create categories and add a new product to your catalog."
        action={
          <Button variant="outline" asChild>
            <Link href="/admin/products/list">
              <ArrowLeft className="mr-2 h-4 w-4" />
              All Products
            </Link>
          </Button>
        }
      />

      <div className="space-y-6">
        <CategoryForm
          categories={categories}
          deletableIds={deletableCategoryIds}
          onSuccess={handleCategorySaved}
          onUpdate={handleCategoryUpdated}
          onDelete={handleCategoryDeleted}
        />
        <ProductForm
          categories={categories}
          onSuccess={() => {
            window.location.href = "/admin/products/list";
          }}
        />
      </div>

      {categoriesLoading && (
        <p className="text-xs text-slate-500">Loading categories...</p>
      )}
    </AdminPage>
  );
}
