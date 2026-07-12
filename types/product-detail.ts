export interface ProductDimensions {
  type?: string;
  size?: string;
  width?: string;
  height?: string;
  depth?: string;
  grossWeight?: string;
  netWeight?: string;
}

export interface ProductOrderingRow {
  size?: string;
  width?: string;
  depth?: string;
  partNo?: string;
}

export interface ProductDetailSection {
  heading?: string;
  items: string[];
}
