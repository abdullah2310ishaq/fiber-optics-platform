"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Package, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getOrderByIdAndEmail } from "@/lib/firestore/orders";
import type { Order, OrderStatus } from "@/types/order";

const statusSteps: OrderStatus[] = [
  "pending", "processing", "packed", "dispatched", "in_transit", "delivered", "completed",
];

const statusLabels: Record<OrderStatus, string> = {
  pending: "Order Received",
  processing: "Processing",
  packed: "Packed",
  dispatched: "Dispatched",
  in_transit: "In Transit",
  delivered: "Delivered",
  completed: "Completed",
};

export function TrackOrderContent() {
  const searchParams = useSearchParams();
  const [orderId, setOrderId] = useState(searchParams.get("orderId") ?? "");
  const [email, setEmail] = useState(searchParams.get("email") ?? "");
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  useEffect(() => {
    const id = searchParams.get("orderId");
    const em = searchParams.get("email");
    if (id && em) {
      setOrderId(id);
      setEmail(em);
      handleSearch(id, em);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleSearch(id = orderId, em = email) {
    setError("");
    setLoading(true);
    setSearched(true);
    try {
      const result = await getOrderByIdAndEmail(id.trim(), em.trim());
      if (!result) {
        setOrder(null);
        setError("Order not found. Check your Order ID and email.");
      } else {
        setOrder(result);
      }
    } catch {
      setError("Failed to load order. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const currentStep = order ? statusSteps.indexOf(order.status) : -1;

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6 lg:px-8">
      <form
        className="space-y-4 rounded-xl border border-border bg-card p-6 shadow-sm"
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch();
        }}
      >
        <div className="space-y-2">
          <Label htmlFor="orderId">Order ID</Label>
          <Input id="orderId" value={orderId} onChange={(e) => setOrderId(e.target.value)} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="trackEmail">Email</Label>
          <Input id="trackEmail" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <Button type="submit" variant="accent" disabled={loading} className="w-full">
          {loading ? "Searching..." : "Track Order"}
        </Button>
      </form>

      {error && <p className="mt-4 text-sm text-destructive">{error}</p>}

      {order && (
        <div className="mt-8 space-y-6">
          <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Order ID</p>
                <p className="font-mono font-semibold">{order.id}</p>
              </div>
              <span className="rounded-full bg-accent/10 px-3 py-1 text-sm font-medium text-accent">
                {statusLabels[order.status]}
              </span>
            </div>
            {order.trackingNumber && (
              <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                <Truck className="h-4 w-4" />
                {order.courier ? `${order.courier}: ` : ""}{order.trackingNumber}
              </div>
            )}
          </div>

          <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <h2 className="mb-4 font-semibold">Shipping Timeline</h2>
            <div className="space-y-0">
              {statusSteps.map((step, index) => {
                const done = index <= currentStep;
                const isLast = index === statusSteps.length - 1;
                return (
                  <div key={step} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${
                        done ? "bg-accent text-white" : "bg-muted text-muted-foreground"
                      }`}>
                        {index + 1}
                      </div>
                      {!isLast && (
                        <div className={`my-1 w-0.5 flex-1 min-h-[24px] ${done ? "bg-accent" : "bg-border"}`} />
                      )}
                    </div>
                    <div className="pb-6">
                      <p className={`font-medium ${done ? "text-foreground" : "text-muted-foreground"}`}>
                        {statusLabels[step]}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {order.shippingAddress && (
            <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
              <h2 className="mb-3 font-semibold">Delivery Address</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {order.shippingAddress.fullName}<br />
                {order.shippingAddress.addressLine1}<br />
                {order.shippingAddress.addressLine2 && <>{order.shippingAddress.addressLine2}<br /></>}
                {order.shippingAddress.city}, {order.shippingAddress.postalCode}<br />
                {order.shippingAddress.country}
              </p>
            </div>
          )}

          <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
            <h2 className="mb-3 flex items-center gap-2 font-semibold">
              <Package className="h-4 w-4" /> Items
            </h2>
            <div className="space-y-2">
              {order.items.map((item) => (
                <div key={item.productId} className="flex justify-between text-sm">
                  <span>{item.name} × {item.quantity}</span>
                  {item.price != null && <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>}
                </div>
              ))}
            </div>
            {order.subtotal != null && (
              <p className="mt-3 border-t border-border pt-3 font-semibold">
                Total: ${order.subtotal.toFixed(2)}
              </p>
            )}
          </div>
        </div>
      )}

      {searched && !loading && !order && !error && (
        <p className="mt-4 text-center text-muted-foreground">No order found.</p>
      )}
    </div>
  );
}
