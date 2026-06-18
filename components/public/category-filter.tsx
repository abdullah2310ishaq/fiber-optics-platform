"use client";

import { cn } from "@/lib/utils";
import type { Category } from "@/types/product";

interface CategoryFilterProps {
  categories: Category[];
  selectedId?: string;
  onSelect: (categoryId?: string) => void;
  vertical?: boolean;
}

export function CategoryFilter({
  categories,
  selectedId,
  onSelect,
  vertical,
}: CategoryFilterProps) {
  const btnClass = (active: boolean) =>
    cn(
      "rounded-lg text-sm font-medium transition-all",
      vertical ? "w-full px-3 py-2.5 text-left" : "rounded-full px-4 py-1.5",
      active
        ? "bg-primary text-primary-foreground shadow-sm"
        : vertical
          ? "text-muted-foreground hover:bg-muted hover:text-foreground"
          : "border border-border bg-card text-muted-foreground hover:border-accent/50"
    );

  return (
    <div className={cn(vertical ? "space-y-1" : "flex flex-wrap gap-2")}>
      <button type="button" onClick={() => onSelect(undefined)} className={btnClass(!selectedId)}>
        All Categories
      </button>
      {categories.map((category) => (
        <button
          key={category.id}
          type="button"
          onClick={() => onSelect(category.id)}
          className={btnClass(selectedId === category.id)}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}
