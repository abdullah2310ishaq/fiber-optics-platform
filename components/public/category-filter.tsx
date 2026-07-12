"use client";

import { cn } from "@/lib/utils";
import type { Category } from "@/types/product";

interface CategoryFilterProps {
  categories: Category[];
  selectedId?: string;
  onSelect: (categoryId?: string) => void;
  vertical?: boolean;
  compact?: boolean;
}

export function CategoryFilter({
  categories,
  selectedId,
  onSelect,
  vertical,
  compact,
}: CategoryFilterProps) {
  const btnClass = (active: boolean) =>
    cn(
      "text-sm font-medium transition-all duration-200",
      vertical
        ? cn(
            "w-full rounded-xl px-4 py-2.5 text-left",
            active
              ? "bg-accent/10 text-accent ring-1 ring-accent/25"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          )
        : cn(
            "shrink-0 rounded-full px-4 py-2",
            compact ? "text-xs px-3 py-1.5" : "",
            active
              ? "bg-accent text-accent-foreground shadow-md shadow-accent/20"
              : "border border-border bg-card text-muted-foreground hover:border-accent/30 hover:text-foreground"
          )
    );

  const wrapperClass = vertical
    ? "space-y-1"
    : cn("flex gap-2", compact ? "flex-wrap" : "overflow-x-auto pb-1 scrollbar-none");

  return (
    <div className={wrapperClass}>
      <button type="button" onClick={() => onSelect(undefined)} className={btnClass(!selectedId)}>
        All
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
