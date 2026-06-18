"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AdminOrderCard } from "@/components/admin/admin-order-card";
import { AdminModal, type AdminModalState } from "@/components/admin/admin-modal";
import { AdminEmpty, AdminLoading, AdminPage, AdminPageHeader, AdminTabs } from "@/components/admin/admin-ui";
import { getAllOrders, updateOrderStatus } from "@/lib/firestore/orders";
import { notifyEmails } from "@/lib/email/notify-client";
import { ORDER_STATUS_LABELS, orderMatchesFilter, type OrderFilterTab } from "@/lib/orders/status";
import type { Order, OrderStatus } from "@/types/order";

const filterTabs: { id: OrderFilterTab; label: string }[] = [
  { id: "all", label: "All" },
  { id: "action", label: "Needs action" },
  { id: "shipping", label: "Shipping" },
  { id: "done", label: "Done" },
];

const closedModal: AdminModalState = {
  open: false,
  type: "success",
  title: "",
  message: "",
};

function patchOrder(
  order: Order,
  status: OrderStatus,
  shipping: { trackingNumber?: string; courier?: string }
): Order {
  return {
    ...order,
    status,
    trackingNumber: shipping.trackingNumber ?? order.trackingNumber,
    courier: shipping.courier ?? order.courier,
    updatedAt: new Date(),
    statusHistory: [
      ...(order.statusHistory ?? []),
      { status, at: new Date() },
    ],
  };
}

export default function AdminOrdersPage() {
  const searchParams = useSearchParams();
  const focusId = searchParams.get("focus");
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<OrderFilterTab>("all");
  const [updatingOrderIds, setUpdatingOrderIds] = useState<Set<string>>(new Set());
  const [modal, setModal] = useState<AdminModalState>(closedModal);
  const updatingRef = useRef<Set<string>>(new Set());
  const loadedRef = useRef(false);

  const load = useCallback(async () => {
    if (!loadedRef.current) setLoading(true);
    try {
      setOrders(await getAllOrders());
      loadedRef.current = true;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  useEffect(() => {
    if (!focusId || loading || orders.length === 0) return;
    setActiveTab("all");
    const el = document.getElementById(`order-${focusId}`);
    if (el) {
      window.setTimeout(() => {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 100);
    }
  }, [focusId, loading, orders]);

  const tabCounts = useMemo(() => {
    const counts: Record<OrderFilterTab, number> = {
      all: orders.length,
      action: 0,
      shipping: 0,
      done: 0,
    };
    for (const order of orders) {
      if (orderMatchesFilter(order.status, "action")) counts.action++;
      if (orderMatchesFilter(order.status, "shipping")) counts.shipping++;
      if (orderMatchesFilter(order.status, "done")) counts.done++;
    }
    return counts;
  }, [orders]);

  const filteredOrders = useMemo(
    () => orders.filter((o) => orderMatchesFilter(o.status, activeTab)),
    [orders, activeTab]
  );

  async function handleStatusUpdate(
    order: Order,
    status: OrderStatus,
    shipping: { trackingNumber?: string; courier?: string }
  ) {
    if (order.status === "completed") return;
    if (updatingRef.current.has(order.id)) return;

    updatingRef.current.add(order.id);
    setUpdatingOrderIds(new Set(updatingRef.current));

    try {
      await updateOrderStatus(order.id, status, shipping);

      if (status !== order.status) {
        await notifyEmails("/api/orders/status-notify", {
          orderId: order.id,
          contactName: order.contactName,
          contactEmail: order.contactEmail,
          status,
          trackingNumber: shipping.trackingNumber,
          courier: shipping.courier,
        });
      }

      setOrders((prev) =>
        prev.map((o) => (o.id === order.id ? patchOrder(o, status, shipping) : o))
      );

      setModal({
        open: true,
        type: "success",
        title: "Order updated",
        message: `${order.companyName} is now "${ORDER_STATUS_LABELS[status]}". The page is already updated — no refresh needed.`,
      });
    } catch {
      setModal({
        open: true,
        type: "error",
        title: "Update failed",
        message: "Could not save status. Please try again.",
      });
      throw new Error("update failed");
    } finally {
      updatingRef.current.delete(order.id);
      setUpdatingOrderIds(new Set(updatingRef.current));
    }
  }

  return (
    <AdminPage>
      <AdminModal {...modal} onClose={() => setModal(closedModal)} />

      <AdminPageHeader
        title="Orders"
        description="Pick a status and save. UI updates instantly — no page refresh."
      />

      {!loading && orders.length > 0 && (
        <AdminTabs
          tabs={filterTabs.map((t) => ({ ...t, count: tabCounts[t.id] }))}
          active={activeTab}
          onChange={(id) => setActiveTab(id as OrderFilterTab)}
        />
      )}

      {loading ? (
        <AdminLoading label="Loading orders..." />
      ) : orders.length === 0 ? (
        <AdminEmpty>No orders yet.</AdminEmpty>
      ) : filteredOrders.length === 0 ? (
        <AdminEmpty>No orders in this tab.</AdminEmpty>
      ) : (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <AdminOrderCard
              key={order.id}
              order={order}
              highlighted={focusId === order.id}
              isUpdating={updatingOrderIds.has(order.id)}
              onStatusUpdate={handleStatusUpdate}
            />
          ))}
        </div>
      )}
    </AdminPage>
  );
}
