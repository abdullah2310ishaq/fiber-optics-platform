export type RfqStatus =
  | "submitted"
  | "under_review"
  | "quoted"
  | "approved"
  | "rejected"
  | "converted";

export interface RfqItem {
  productId: string;
  slug: string;
  name: string;
  sku: string;
  quantity: number;
  notes?: string;
  image?: string;
}

export interface Rfq {
  id: string;
  contactName: string;
  contactEmail: string;
  contactPhone?: string;
  companyName: string;
  message: string;
  items: RfqItem[];
  status: RfqStatus;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateGuestRfqInput {
  contactName: string;
  contactEmail: string;
  contactPhone?: string;
  companyName: string;
  message: string;
  items: RfqItem[];
}
