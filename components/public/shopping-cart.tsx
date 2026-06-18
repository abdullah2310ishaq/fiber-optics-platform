"use client";

import Image from "next/image";
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMounted } from "@/hooks/use-mounted";
import { useShoppingCart } from "@/store/shopping-cart";

export function AddToCartButton({
  productId,
  slug,
  name,
  sku,
  price,
  image,
}: {
  productId: string;
  slug: string;
  name: string;
  sku: string;
  price: number;
  image?: string;
}) {
  const addItem = useShoppingCart((s) => s.addItem);

  return (
    <Button
      variant="default"
      onClick={() => addItem({ productId, slug, name, sku, price, image })}
    >
      <ShoppingCart className="h-4 w-4" />
      Add to Cart
    </Button>
  );
}

export function ShoppingCartList() {
  const mounted = useMounted();
  const { items, removeItem, updateQuantity, subtotal } = useShoppingCart();

  if (!mounted) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-card p-12 text-center text-muted-foreground">
        Loading cart...
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border bg-muted/30 p-12 text-center text-muted-foreground">
        Your cart is empty. Add priced products to place a direct order with shipping.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {items.map((item) => (
        <div
          key={item.productId}
          className="flex flex-col gap-4 rounded-xl border border-border bg-card p-4 sm:flex-row sm:items-start"
        >
          <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-muted">
            {item.image ? (
              <Image
                src={item.image}
                alt={item.name}
                fill
                sizes="80px"
                className="object-cover"
              />
            ) : null}
          </div>
          <div className="flex-1 space-y-3">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-sm text-muted-foreground">{item.sku}</p>
                <p className="mt-1 text-sm font-medium">${item.price.toFixed(2)} each</p>
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
              <span className="ml-auto font-semibold">
                ${(item.price * item.quantity).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      ))}
      <div className="flex justify-end rounded-xl border border-border bg-muted/50 p-4">
        <p className="text-lg font-semibold">Subtotal: ${subtotal().toFixed(2)}</p>
      </div>
    </div>
  );
}
