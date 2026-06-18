"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CategoryFilter } from "@/components/public/category-filter";
import { ProductGrid } from "@/components/public/product-grid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CloseIcon, SearchIcon } from "@/components/icons/fiber-icons";
import { useCategories, useProducts } from "@/hooks/use-products";

export function ProductsCatalog() {
  const [categoryId, setCategoryId] = useState<string | undefined>();
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const { data: categories = [], isLoading: categoriesLoading } = useCategories();
  const { data: products = [], isLoading: productsLoading } = useProducts({
    categoryId,
    search: search || undefined,
  });

  const activeCategory = categories.find((c) => c.id === categoryId);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearch(searchInput.trim());
  };

  const clearFilters = () => {
    setCategoryId(undefined);
    setSearch("");
    setSearchInput("");
  };

  const hasActiveFilters = Boolean(categoryId || search);

  return (
    <div className="-mt-16 lg:-mt-[4.5rem]">
      {/* Hero + search */}
      <section className="relative overflow-hidden border-b border-border bg-background text-white">
        <div className="dot-pattern absolute inset-0 opacity-30" />
        <div className="absolute -right-20 top-0 h-72 w-72 rounded-full bg-cyan-500/15 blur-[100px]" />
        <div className="absolute -left-20 bottom-0 h-56 w-56 rounded-full bg-teal-500/10 blur-[80px]" />

        <div className="relative mx-auto max-w-7xl px-4 pt-28 pb-10 sm:px-6 lg:px-8 lg:pt-32 lg:pb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="text-center"
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-cyan-400">
              Technical Catalog
            </p>
            <h1 className="display-font mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
              Fiber Optic{" "}
              <span className="bg-gradient-to-r from-cyan-300 to-teal-400 bg-clip-text text-transparent">
                Products
              </span>
            </h1>
            <p className="mx-auto mt-4 max-w-lg text-sm text-slate-400">
              Search by SKU, name, or spec — filter by category below.
            </p>
          </motion.div>

          {/* Full-width horizontal search */}
          <motion.form
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            onSubmit={handleSearch}
            className="relative mx-auto mt-10 max-w-3xl"
          >
            <SearchIcon
              className="pointer-events-none absolute left-5 top-1/2 -translate-y-1/2 text-slate-400"
              size={20}
            />
            <Input
              placeholder="Search SKU, product name, brand, fiber type..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="h-14 rounded-2xl border-white/15 bg-white/10 pl-14 pr-32 text-base text-white shadow-lg shadow-black/20 placeholder:text-slate-500 backdrop-blur-sm focus-visible:border-cyan-400/50 focus-visible:bg-white/15 focus-visible:ring-cyan-400/30"
            />
            <Button
              type="submit"
              variant="accent"
              className="absolute right-2 top-1/2 h-10 -translate-y-1/2 rounded-xl px-6 shadow-md shadow-cyan-500/25"
            >
              Search
            </Button>
          </motion.form>

          {search && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mx-auto mt-4 flex max-w-3xl items-center justify-center gap-2"
            >
              <span className="rounded-full border border-white/15 bg-white/10 px-4 py-1.5 text-sm text-slate-300">
                Results for &ldquo;{search}&rdquo;
              </span>
              <button
                type="button"
                onClick={() => {
                  setSearch("");
                  setSearchInput("");
                }}
                className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 text-slate-400 transition-colors hover:bg-white/10 hover:text-white"
                aria-label="Clear search"
              >
                <CloseIcon size={14} />
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Sticky horizontal categories */}
      <div className="sticky top-16 z-40 border-b border-border bg-background/95 shadow-sm backdrop-blur-xl lg:top-[4.5rem]">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0 flex-1">
              {!categoriesLoading ? (
                <CategoryFilter
                  categories={categories}
                  selectedId={categoryId}
                  onSelect={setCategoryId}
                  compact
                />
              ) : (
                <div className="flex gap-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={i} className="h-9 w-24 animate-pulse rounded-full bg-secondary" />
                  ))}
                </div>
              )}
            </div>

            <div className="flex shrink-0 items-center gap-4">
              <p className="whitespace-nowrap font-mono text-xs uppercase tracking-wider text-muted-foreground">
                {productsLoading ? "Loading…" : `${products.length} items`}
              </p>
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="whitespace-nowrap text-xs font-semibold text-accent transition-colors hover:text-[#22D3EE]"
                >
                  Clear all
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Full-width results */}
      <div className="bg-background">
        <div className="mx-auto max-w-screen-2xl px-4 py-10 sm:px-6 lg:px-10 lg:py-14">
          {(activeCategory || search) && (
            <div className="mb-8 flex flex-wrap items-center gap-2">
              <span className="text-sm text-muted-foreground">Showing:</span>
              {activeCategory && (
                <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-accent">
                  {activeCategory.name}
                </span>
              )}
              {search && (
                <span className="rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-foreground">
                  &ldquo;{search}&rdquo;
                </span>
              )}
            </div>
          )}

          {productsLoading ? (
            <div className="grid auto-rows-fr gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card animate-pulse"
                >
                  <div className="aspect-[2/1] bg-secondary" />
                  <div className="flex flex-1 flex-col space-y-2.5 p-4">
                    <div className="h-3 w-1/4 rounded bg-secondary" />
                    <div className="h-10 w-full rounded bg-secondary" />
                    <div className="h-3 w-1/2 rounded bg-secondary" />
                    <div className="mt-auto h-8 w-full rounded bg-secondary" />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <ProductGrid products={products} variant="catalog" />
          )}
        </div>
      </div>
    </div>
  );
}
