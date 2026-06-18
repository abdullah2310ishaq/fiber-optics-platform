export type ProductStatus = "active" | "draft" | "archived";

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
  name: string;
  slug: string;
  sku: string;
  brand: string;
  categoryId: string;
  subcategoryId?: string;
  description: string;
  specs: ProductSpecs;
  /** [0] = main image (large), [1–3] = gallery thumbnails below */
  images: string[];
  isRfqOnly: boolean;
  price?: number;
  status: ProductStatus;
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
