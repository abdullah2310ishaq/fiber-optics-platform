import type { OrderStatus } from "@/types/order";

export const ORDER_STATUS_STEPS: OrderStatus[] = [
  "pending",
  "processing",
  "packed",
  "dispatched",
  "in_transit",
  "delivered",
  "completed",
];

export const ORDER_STATUS_LABELS: Record<OrderStatus, string> = {
  pending: "Received",
  processing: "Processing",
  packed: "Packed",
  dispatched: "Dispatched",
  in_transit: "In Transit",
  delivered: "Delivered",
  completed: "Completed",
};

export const ORDER_STATUS_DESCRIPTIONS: Record<OrderStatus, string> = {
  pending: "New order — not started yet",
  processing: "Being prepared in warehouse",
  packed: "Packed and ready to ship",
  dispatched: "Handed to courier",
  in_transit: "On the way to customer",
  delivered: "Reached customer address",
  completed: "Order closed",
};

export const SHIPPING_STATUSES: OrderStatus[] = [
  "dispatched",
  "in_transit",
  "delivered",
  "completed",
];

export type OrderFilterTab = "all" | "action" | "shipping" | "done";

export function getNextOrderStatus(status: OrderStatus): OrderStatus | null {
  const index = ORDER_STATUS_STEPS.indexOf(status);
  if (index < 0 || index >= ORDER_STATUS_STEPS.length - 1) return null;
  return ORDER_STATUS_STEPS[index + 1];
}

export function orderMatchesFilter(status: OrderStatus, tab: OrderFilterTab): boolean {
  switch (tab) {
    case "all":
      return true;
    case "action":
      return status === "pending" || status === "processing";
    case "shipping":
      return status === "packed" || status === "dispatched" || status === "in_transit";
    case "done":
      return status === "delivered" || status === "completed";
  }
}
