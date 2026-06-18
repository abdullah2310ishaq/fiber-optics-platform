"use client";

import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import { CategoryFilter } from "@/components/public/category-filter";
import { PageHeader } from "@/components/public/page-header";
import { ProductGrid } from "@/components/public/product-grid";
import { Button } from "@/components/ui/button";
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
    <div>
      <PageHeader
        eyebrow="Technical Catalog"
        title="Fiber Optic Products"
        description="Filter by category, search by SKU or brand. Add to quotation for bulk pricing or to cart for direct purchase."
        dark
      />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Sidebar filters */}
          <aside className="w-full shrink-0 lg:w-64">
            <div className="sticky top-28 space-y-6 rounded-xl border border-border bg-card p-5 shadow-sm">
              <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <SlidersHorizontal className="h-4 w-4 text-accent" />
                Filters
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSearch(searchInput);
                }}
              >
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="SKU, name, brand..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className="pl-9"
                  />
                </div>
                <Button type="submit" variant="secondary" size="sm" className="mt-2 w-full">
                  Search
                </Button>
              </form>

              {!categoriesLoading && (
                <CategoryFilter
                  categories={categories}
                  selectedId={categoryId}
                  onSelect={setCategoryId}
                  vertical
                />
              )}
            </div>
          </aside>

          {/* Product grid */}
          <div className="flex-1">
            <div className="mb-6 flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                {productsLoading ? "Loading..." : `${products.length} products`}
              </p>
            </div>

            {productsLoading ? (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="h-80 animate-pulse rounded-xl bg-muted" />
                ))}
              </div>
            ) : (
              <ProductGrid products={products} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
