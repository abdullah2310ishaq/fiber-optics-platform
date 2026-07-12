import type { ProductDimensions, ProductDetailSection } from "@/types/product-detail";

const DIMENSION_ROWS: { key: keyof ProductDimensions; label: string }[] = [
  { key: "type", label: "Type" },
  { key: "size", label: "Size" },
  { key: "width", label: "Width" },
  { key: "height", label: "Height" },
  { key: "depth", label: "Depth" },
  { key: "grossWeight", label: "Gross Weight" },
  { key: "netWeight", label: "Net Weight" },
];

export function getDimensionRows(dimensions?: ProductDimensions) {
  if (!dimensions) return [];
  return DIMENSION_ROWS.map(({ key, label }) => ({
    label,
    value: dimensions[key]?.trim(),
  })).filter((row) => row.value);
}

export function hasDimensions(dimensions?: ProductDimensions) {
  return getDimensionRows(dimensions).length > 0;
}

/** Lines starting with ## are sub-headings; other non-empty lines are bullet items. */
export function parseDetailSections(text?: string): ProductDetailSection[] {
  if (!text?.trim()) return [];

  const sections: ProductDetailSection[] = [];
  let current: ProductDetailSection = { items: [] };

  for (const rawLine of text.split("\n")) {
    const line = rawLine.trim();
    if (!line) continue;

    if (line.startsWith("## ")) {
      if (current.heading || current.items.length > 0) {
        sections.push(current);
      }
      current = { heading: line.slice(3).trim(), items: [] };
      continue;
    }

    const bullet = line.replace(/^[•\-*·]\s*/, "").trim();
    if (bullet) current.items.push(bullet);
  }

  if (current.heading || current.items.length > 0) {
    sections.push(current);
  }

  if (sections.length === 1 && !sections[0].heading) {
    return [{ items: sections[0].items }];
  }

  return sections;
}
