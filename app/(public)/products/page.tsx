"use client";

import { useState } from "react";
import { CategoryFilter } from "@/components/public/category-filter";
import { ProductGrid } from "@/components/public/product-grid";
import { Input } from "@/components/ui/input";
import { useCategories, useProducts } from "@/hooks/use-products";

export default function ProductsPage() {
  const [categoryId, setCategoryId] = useState<string | undefined>();
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const { data: categories = [], isLoading: categoriesLoading } = useCategories();
  const { data: products = [], isLoading: productsLoading } = useProducts({
    categoryId,
    search: search || undefined,
  });

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Products</h1>
        <p className="mt-2 text-muted-foreground">
          Browse our fiber optic catalog. Add items to your quote cart for RFQ pricing.
        </p>
      </div>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <form
          className="max-w-sm flex-1"
          onSubmit={(e) => {
            e.preventDefault();
            setSearch(searchInput);
          }}
        >
          <Input
            placeholder="Search by name, SKU, or brand..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </form>
      </div>

      {!categoriesLoading && (
        <div className="mb-8">
          <CategoryFilter
            categories={categories}
            selectedId={categoryId}
            onSelect={setCategoryId}
          />
        </div>
      )}

      {productsLoading ? (
        <div className="py-12 text-center text-muted-foreground">Loading products...</div>
      ) : (
        <ProductGrid products={products} />
      )}
    </div>
  );
}
