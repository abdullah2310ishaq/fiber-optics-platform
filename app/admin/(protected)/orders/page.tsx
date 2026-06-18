"use client";

import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getAllOrders, updateOrderStatus } from "@/lib/firestore/orders";
import type { Order, OrderStatus } from "@/types/order";

const statuses: OrderStatus[] = [
  "pending",
  "processing",
  "packed",
  "dispatched",
  "in_transit",
  "delivered",
  "completed",
];

const statusColors: Record<OrderStatus, string> = {
  pending: "bg-yellow-500/20 text-yellow-300",
  processing: "bg-blue-500/20 text-blue-300",
  packed: "bg-indigo-500/20 text-indigo-300",
  dispatched: "bg-purple-500/20 text-purple-300",
  in_transit: "bg-orange-500/20 text-orange-300",
  delivered: "bg-green-500/20 text-green-300",
  completed: "bg-slate-500/20 text-slate-300",
};

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [tracking, setTracking] = useState<Record<string, string>>({});
  const [courier, setCourier] = useState<Record<string, string>>({});

  const load = useCallback(async () => {
    setLoading(true);
    try {
      setOrders(await getAllOrders());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function advanceStatus(order: Order) {
    const idx = statuses.indexOf(order.status);
    if (idx < statuses.length - 1) {
      const next = statuses[idx + 1];
      await updateOrderStatus(order.id, next, {
        trackingNumber: tracking[order.id],
        courier: courier[order.id],
      });
      load();
    }
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-white">Orders ({orders.length})</h1>
      <p className="mt-1 text-slate-400">Track and update order status.</p>

      {loading ? (
        <p className="mt-8 text-slate-400">Loading...</p>
      ) : orders.length === 0 ? (
        <p className="mt-8 rounded-lg border border-dashed border-slate-700 p-8 text-center text-slate-500">
          No orders yet. Convert an approved RFQ to create an order.
        </p>
      ) : (
        <div className="mt-6 space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="rounded-xl border border-slate-700 bg-slate-800 p-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="font-semibold text-white">{order.companyName}</p>
                  <p className="text-sm text-slate-400">
                    {order.contactName} · {order.contactEmail}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    {order.createdAt.toLocaleDateString()} · {order.items.length} item(s)
                  </p>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusColors[order.status]}`}>
                  {order.status.replace("_", " ")}
                </span>
              </div>

              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                <Input
                  placeholder="Tracking number"
                  value={tracking[order.id] ?? order.trackingNumber ?? ""}
                  onChange={(e) => setTracking((p) => ({ ...p, [order.id]: e.target.value }))}
                  className="border-slate-600 bg-slate-900 text-white"
                />
                <Input
                  placeholder="Courier name"
                  value={courier[order.id] ?? order.courier ?? ""}
                  onChange={(e) => setCourier((p) => ({ ...p, [order.id]: e.target.value }))}
                  className="border-slate-600 bg-slate-900 text-white"
                />
              </div>

              {order.status !== "completed" && (
                <Button size="sm" className="mt-3" onClick={() => advanceStatus(order)}>
                  Advance to Next Status
                </Button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
