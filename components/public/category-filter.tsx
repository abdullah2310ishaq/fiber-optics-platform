"use client";

import { cn } from "@/lib/utils";
import type { Category } from "@/types/product";

interface CategoryFilterProps {
  categories: Category[];
  selectedId?: string;
  onSelect: (categoryId?: string) => void;
}

export function CategoryFilter({ categories, selectedId, onSelect }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        onClick={() => onSelect(undefined)}
        className={cn(
          "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
          !selectedId
            ? "border-accent bg-accent text-accent-foreground"
            : "border-border bg-card text-muted-foreground hover:border-accent"
        )}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category.id}
          type="button"
          onClick={() => onSelect(category.id)}
          className={cn(
            "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
            selectedId === category.id
              ? "border-accent bg-accent text-accent-foreground"
              : "border-border bg-card text-muted-foreground hover:border-accent"
          )}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
}
