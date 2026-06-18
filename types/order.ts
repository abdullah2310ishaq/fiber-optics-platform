export type OrderStatus =
  | "pending"
  | "processing"
  | "packed"
  | "dispatched"
  | "in_transit"
  | "delivered"
  | "completed";

export interface Order {
  id: string;
  rfqId?: string;
  companyName: string;
  contactName: string;
  contactEmail: string;
  contactPhone?: string;
  items: Array<{
    productId: string;
    name: string;
    sku: string;
    quantity: number;
  }>;
  status: OrderStatus;
  trackingNumber?: string;
  courier?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateOrderInput {
  rfqId?: string;
  companyName: string;
  contactName: string;
  contactEmail: string;
  contactPhone?: string;
  items: Order["items"];
  notes?: string;
}
