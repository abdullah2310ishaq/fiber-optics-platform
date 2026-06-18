"use client";

import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMounted } from "@/hooks/use-mounted";
import { useQuoteCart } from "@/store/quote-cart";

export function AddToQuoteButton({
  productId,
  slug,
  name,
  sku,
  image,
}: {
  productId: string;
  slug: string;
  name: string;
  sku: string;
  image?: string;
}) {
  const addItem = useQuoteCart((s) => s.addItem);

  return (
    <Button
      variant="accent"
      onClick={() => addItem({ productId, slug, name, sku, image })}
    >
      Add to Quote
    </Button>
  );
}

export function QuoteCartList() {
  const mounted = useMounted();
  const { items, removeItem, updateQuantity, updateNotes } = useQuoteCart();

  if (!mounted) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-card p-12 text-center text-muted-foreground">
        Loading quote cart...
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-muted/30 p-12 text-center text-muted-foreground">
        Your quotation list is empty. Browse products and add items for bulk RFQ pricing.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <div
          key={item.productId}
          className="flex flex-col gap-4 rounded-xl border border-border bg-card p-4 shadow-sm sm:flex-row sm:items-start"
        >
          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-muted">
            {item.image ? (
              <Image
                src={item.image}
                alt={item.name}
                fill
                sizes="80px"
                priority={index === 0}
                loading={index === 0 ? "eager" : "lazy"}
                className="object-cover"
              />
            ) : null}
          </div>
          <div className="flex-1 space-y-3">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-sm text-muted-foreground">{item.sku}</p>
              </div>
              <Button variant="ghost" size="icon" onClick={() => removeItem(item.productId)}>
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                disabled={item.quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-8 text-center font-medium">{item.quantity}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => updateQuantity(item.productId, item.quantity + 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <Input
              placeholder="Notes (optional)"
              value={item.notes ?? ""}
              onChange={(e) => updateNotes(item.productId, e.target.value)}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
