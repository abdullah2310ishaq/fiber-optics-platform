"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { AdminCard } from "@/components/admin/admin-ui";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  getNextOrderStatus,
  ORDER_STATUS_LABELS,
  ORDER_STATUS_STEPS,
  SHIPPING_STATUSES,
} from "@/lib/orders/status";
import type { Order, OrderStatus } from "@/types/order";
import { cn } from "@/lib/utils";

const statusBadge: Record<OrderStatus, string> = {
  pending: "bg-amber-500/20 text-amber-300",
  processing: "bg-blue-500/20 text-blue-300",
  packed: "bg-indigo-500/20 text-indigo-300",
  dispatched: "bg-purple-500/20 text-purple-300",
  in_transit: "bg-orange-500/20 text-orange-300",
  delivered: "bg-emerald-500/20 text-emerald-300",
  completed: "bg-slate-500/20 text-slate-300",
};

interface AdminOrderCardProps {
  order: Order;
  isUpdating: boolean;
  highlighted?: boolean;
  onStatusUpdate: (
    order: Order,
    status: OrderStatus,
    shipping: { trackingNumber?: string; courier?: string }
  ) => Promise<void>;
}

export function AdminOrderCard({ order, isUpdating, highlighted, onStatusUpdate }: AdminOrderCardProps) {
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus>(order.status);
  const [tracking, setTracking] = useState(order.trackingNumber ?? "");
  const [courier, setCourier] = useState(order.courier ?? "");
  const [saving, setSaving] = useState(false);
  const busyRef = useRef(false);

  const busy = saving || isUpdating;
  const isCompleted = order.status === "completed";
  const nextStatus = isCompleted ? null : getNextOrderStatus(order.status);
  const needsShipping = SHIPPING_STATUSES.includes(selectedStatus);
  const hasChanges =
    selectedStatus !== order.status ||
    tracking !== (order.trackingNumber ?? "") ||
    courier !== (order.courier ?? "");

  useEffect(() => {
    if (busy) return;
    setSelectedStatus(order.status);
    setTracking(order.trackingNumber ?? "");
    setCourier(order.courier ?? "");
  }, [order.id, order.status, order.trackingNumber, order.courier, busy]);

  async function runUpdate(status: OrderStatus) {
    if (busyRef.current || busy) return;
    busyRef.current = true;
    setSaving(true);

    try {
      await onStatusUpdate(order, status, {
        trackingNumber: tracking.trim() || undefined,
        courier: courier.trim() || undefined,
      });
    } finally {
      setSaving(false);
      busyRef.current = false;
    }
  }

  return (
    <AdminCard
      id={`order-${order.id}`}
      className={cn(
        "relative overflow-hidden transition-colors",
        highlighted && "border-blue-500 ring-2 ring-blue-500/30"
      )}
    >
      {busy && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-slate-950/70">
          <div className="flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-3 text-sm text-white shadow-lg">
            <Loader2 className="h-4 w-4 animate-spin text-blue-400" />
            Updating...
          </div>
        </div>
      )}

      <div className="p-5">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="font-semibold text-white">{order.companyName}</p>
            <p className="text-sm text-slate-400">
              {order.contactName} · {order.contactEmail}
            </p>
            <p className="mt-1 font-mono text-xs text-slate-500">{order.id}</p>
          </div>
          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusBadge[order.status]}`}>
            {ORDER_STATUS_LABELS[order.status]}
          </span>
        </div>

        <p className="mt-3 text-xs text-slate-500">
          {order.items.length} item(s)
          {order.subtotal != null ? ` · $${order.subtotal.toFixed(2)}` : ""}
          {" · "}
          {order.createdAt.toLocaleDateString()}
        </p>

        {isCompleted ? (
          <p className="mt-4 rounded-lg border border-slate-800 bg-slate-950/50 px-4 py-3 text-sm text-slate-400">
            This order is complete. No further action needed.
          </p>
        ) : (
          <>
        <div className="mt-5">
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-slate-500">
            Change status
          </p>
          <div className="flex flex-wrap gap-2">
            {ORDER_STATUS_STEPS.map((step) => (
              <button
                key={step}
                type="button"
                disabled={busy}
                onClick={() => setSelectedStatus(step)}
                className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors disabled:opacity-50 ${
                  selectedStatus === step
                    ? "bg-blue-600 text-white"
                    : step === order.status
                      ? "bg-slate-700 text-white"
                      : "bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white"
                }`}
              >
                {ORDER_STATUS_LABELS[step]}
              </button>
            ))}
          </div>
        </div>

        {needsShipping && (
          <div className="mt-4 grid gap-3 rounded-lg border border-slate-800 bg-slate-950/50 p-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor={`courier-${order.id}`} className="text-slate-400">
                Courier
              </Label>
              <Input
                id={`courier-${order.id}`}
                placeholder="DHL, FedEx..."
                value={courier}
                disabled={busy}
                onChange={(e) => setCourier(e.target.value)}
                className="border-slate-700 bg-slate-900"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor={`tracking-${order.id}`} className="text-slate-400">
                Tracking #
              </Label>
              <Input
                id={`tracking-${order.id}`}
                placeholder="Tracking number"
                value={tracking}
                disabled={busy}
                onChange={(e) => setTracking(e.target.value)}
                className="border-slate-700 bg-slate-900"
              />
            </div>
          </div>
        )}

        <div className="mt-4 flex flex-wrap gap-2">
          {nextStatus && (
            <Button
              type="button"
              size="sm"
              variant="outline"
              disabled={busy}
              onClick={() => runUpdate(nextStatus)}
              className="border-slate-600 bg-slate-800 text-white hover:bg-slate-700"
            >
              {busy ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  Next: {ORDER_STATUS_LABELS[nextStatus]}
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          )}
          <Button
            type="button"
            size="sm"
            variant="accent"
            disabled={!hasChanges || busy}
            onClick={() => runUpdate(selectedStatus)}
          >
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save status"}
          </Button>
        </div>
          </>
        )}
      </div>
    </AdminCard>
  );
}
