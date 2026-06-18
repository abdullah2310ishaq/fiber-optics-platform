import type { OrderStatus } from "@/types/order";
import type { RfqStatus } from "@/types/rfq";

export const ORDER_STATUS_LABELS: Record<
  OrderStatus,
  { title: string; message: string }
> = {
  pending: {
    title: "Order Received",
    message: "We have received your order and will begin processing it shortly.",
  },
  processing: {
    title: "Order Processing",
    message: "Your order is now being processed by our fulfillment team.",
  },
  packed: {
    title: "Order Packed & Ready",
    message: "Your order has been packed and is ready for dispatch.",
  },
  dispatched: {
    title: "Order Dispatched",
    message: "Your order has been dispatched and is on its way.",
  },
  in_transit: {
    title: "In Transit",
    message: "Your shipment is in transit to the delivery address.",
  },
  delivered: {
    title: "Delivered",
    message: "Your order has been delivered. Thank you for your business.",
  },
  completed: {
    title: "Order Completed",
    message: "Your order is complete. We appreciate your trust in Fiber Optics.",
  },
};

export const RFQ_STATUS_LABELS: Record<
  Exclude<RfqStatus, "submitted" | "converted">,
  { title: string; message: string }
> = {
  under_review: {
    title: "RFQ Under Review",
    message: "Our team is reviewing your quotation request.",
  },
  quoted: {
    title: "Quotation Ready",
    message: "Your quotation has been prepared. Our team will share pricing details with you shortly.",
  },
  approved: {
    title: "Quotation Approved",
    message: "Your quotation has been approved. We will proceed with the next steps.",
  },
  rejected: {
    title: "Quotation Update",
    message: "We were unable to proceed with this quotation request. Please contact us for assistance.",
  },
};
