export type ProductStatus = "active" | "draft" | "archived";
export type StockStatus = "in_stock" | "out_of_stock";

export type { ProductDimensions, ProductOrderingRow } from "./product-detail";
import type { ProductDimensions, ProductOrderingRow } from "./product-detail";

export interface ProductSpecs {
  fiberType?: string;
  connectorType?: string;
  loss?: string;
  distance?: string;
  coreCount?: string;
  cableType?: string;
  [key: string]: string | undefined;
}

export interface Product {
  id: string;
  slug: string;
  name?: string;
  sku?: string;
  brand?: string;
  categoryId?: string;
  subcategoryId?: string;
  description?: string;
  specs?: ProductSpecs;
  /** [0] = main image (large), [1–3] = gallery thumbnails below */
  images?: string[];
  isRfqOnly?: boolean;
  price?: number;
  status?: ProductStatus;
  pcs?: string;
  color?: string;
  stockStatus?: StockStatus;
  quantity?: number;
  dimensions?: ProductDimensions;
  cabinetFeatures?: string;
  technicalSpecifications?: string;
  orderingInformation?: ProductOrderingRow[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  parentId?: string;
  order: number;
  imageUrl?: string;
}
