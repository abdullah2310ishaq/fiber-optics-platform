export type OrderStatus =
  | "pending"
  | "processing"
  | "packed"
  | "dispatched"
  | "in_transit"
  | "delivered"
  | "completed";

export type OrderType = "direct" | "rfq_converted";

export interface ShippingAddress {
  fullName: string;
  email: string;
  phone: string;
  companyName?: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state?: string;
  postalCode: string;
  country: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  sku: string;
  quantity: number;
  price?: number;
}

export interface OrderStatusUpdate {
  status: OrderStatus;
  note?: string;
  at: Date;
}

export interface Order {
  id: string;
  orderType: OrderType;
  rfqId?: string;
  companyName: string;
  contactName: string;
  contactEmail: string;
  contactPhone?: string;
  shippingAddress?: ShippingAddress;
  items: OrderItem[];
  subtotal?: number;
  status: OrderStatus;
  trackingNumber?: string;
  courier?: string;
  notes?: string;
  statusHistory?: OrderStatusUpdate[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateDirectOrderInput {
  companyName: string;
  contactName: string;
  contactEmail: string;
  contactPhone?: string;
  shippingAddress: ShippingAddress;
  items: OrderItem[];
  subtotal: number;
  notes?: string;
}

export interface CreateRfqOrderInput {
  rfqId?: string;
  companyName: string;
  contactName: string;
  contactEmail: string;
  contactPhone?: string;
  items: OrderItem[];
  notes?: string;
}
