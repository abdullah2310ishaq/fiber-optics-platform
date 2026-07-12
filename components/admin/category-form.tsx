"use client";

import { useState } from "react";
import { Check, Pencil, X } from "lucide-react";
import { deleteCategory, saveCategory, updateCategory } from "@/lib/firestore/admin-categories";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import type { Category } from "@/types/product";

interface CategoryFormProps {
  categories: Category[];
  deletableIds: Set<string>;
  onSuccess?: (category: Category) => void;
  onUpdate?: (category: Category) => void;
  onDelete?: (categoryId: string) => void;
}

export function CategoryForm({
  categories,
  deletableIds,
  onSuccess,
  onUpdate,
  onDelete,
}: CategoryFormProps) {
  const [name, setName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editOrder, setEditOrder] = useState("");
  const [savingEditId, setSavingEditId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!name.trim()) {
      setError("Enter a category name.");
      return;
    }

    setSubmitting(true);
    try {
      const category = await saveCategory({ name: name.trim() });
      setSuccess(true);
      setName("");
      onSuccess?.(category);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save category");
    } finally {
      setSubmitting(false);
    }
  }

  function startEdit(category: Category) {
    setEditingId(category.id);
    setEditName(category.name);
    setEditOrder(String(category.order));
    setError("");
    setSuccess(false);
  }

  function cancelEdit() {
    setEditingId(null);
    setEditName("");
    setEditOrder("");
  }

  async function saveEdit(category: Category) {
    if (!editName.trim()) {
      setError("Category name cannot be empty.");
      return;
    }

    const order = editOrder.trim() ? Number.parseInt(editOrder, 10) : category.order;
    if (editOrder.trim() && (Number.isNaN(order) || order < 0)) {
      setError("Order must be a valid number.");
      return;
    }

    setSavingEditId(category.id);
    setError("");
    setSuccess(false);
    try {
      const updated = await updateCategory(category.id, {
        name: editName.trim(),
        order,
      });
      cancelEdit();
      onUpdate?.(updated);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update category");
    } finally {
      setSavingEditId(null);
    }
  }

  async function handleDelete(category: Category) {
    if (!deletableIds.has(category.id)) return;
    if (!confirm(`Delete category "${category.name}"? Products using it will keep the old category ID.`)) {
      return;
    }

    setError("");
    setSuccess(false);
    setDeletingId(category.id);
    try {
      await deleteCategory(category.id);
      onDelete?.(category.id);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete category");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-xl border border-border bg-card p-6"
    >
      <div>
        <h2 className="text-lg font-semibold text-foreground">Categories</h2>
        <p className="text-sm text-muted-foreground">
          Add, edit, or delete categories. Changes apply to the product form and public site.
        </p>
      </div>

      <div className="space-y-2">
        <Label className="text-foreground">New Category</Label>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Fiber Adapters"
          />
          <Button type="submit" disabled={submitting} className="shrink-0">
            {submitting ? "Adding..." : "Add Category"}
          </Button>
        </div>
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}
      {success && <p className="text-sm text-emerald-700">Category added successfully.</p>}

      {categories.length > 0 && (
        <div className="border-t border-border pt-4">
          <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Current categories ({categories.length})
          </p>
          <ul className="space-y-2">
            {categories.map((cat) => {
              const isEditing = editingId === cat.id;
              const isDeleting = deletingId === cat.id;
              const isSaving = savingEditId === cat.id;
              const canDelete = deletableIds.has(cat.id);

              if (isEditing) {
                return (
                  <li
                    key={cat.id}
                    className="flex flex-col gap-2 rounded-lg border border-border bg-card p-3 sm:flex-row sm:items-center"
                  >
                    <Input
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      placeholder="Category name"
                      autoFocus
                    />
                    <Input
                      type="number"
                      min={0}
                      value={editOrder}
                      onChange={(e) => setEditOrder(e.target.value)}
                      className="w-full sm:w-20"
                      placeholder="Order"
                      title="Display order"
                    />
                    <div className="flex gap-1">
                      <Button
                        type="button"
                        size="sm"
                        onClick={() => saveEdit(cat)}
                        disabled={isSaving}
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={cancelEdit}
                        disabled={isSaving}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </li>
                );
              }

              return (
                <li
                  key={cat.id}
                  className={cn(
                    "flex items-center justify-between gap-2 rounded-lg border border-border bg-muted/60 px-3 py-2",
                    (isDeleting || isSaving) && "opacity-50"
                  )}
                >
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm text-foreground">{cat.name}</p>
                    <p className="font-mono text-[10px] text-muted-foreground">
                      {cat.slug} · order {cat.order}
                    </p>
                  </div>
                  <div className="flex shrink-0 gap-1">
                    <button
                      type="button"
                      onClick={() => startEdit(cat)}
                      disabled={isDeleting}
                      className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                      aria-label={`Edit ${cat.name}`}
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </button>
                    {canDelete && (
                      <button
                        type="button"
                        onClick={() => handleDelete(cat)}
                        disabled={isDeleting}
                        className="rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-red-50 hover:text-destructive"
                        aria-label={`Delete ${cat.name}`}
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </form>
  );
}
