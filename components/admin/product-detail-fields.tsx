"use client";

import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { ProductDimensions, ProductOrderingRow } from "@/types/product-detail";

const EMPTY_DIMENSIONS: ProductDimensions = {
  type: "",
  size: "",
  width: "",
  height: "",
  depth: "",
  grossWeight: "",
  netWeight: "",
};

const EMPTY_ORDERING_ROW: ProductOrderingRow = {
  size: "",
  width: "",
  depth: "",
  partNo: "",
};

interface ProductDetailFieldsProps {
  dimensions: ProductDimensions;
  onDimensionsChange: (dimensions: ProductDimensions) => void;
  cabinetFeatures: string;
  onCabinetFeaturesChange: (value: string) => void;
  technicalSpecifications: string;
  onTechnicalSpecificationsChange: (value: string) => void;
  orderingRows: ProductOrderingRow[];
  onOrderingRowsChange: (rows: ProductOrderingRow[]) => void;
}

export function ProductDetailFields({
  dimensions,
  onDimensionsChange,
  cabinetFeatures,
  onCabinetFeaturesChange,
  technicalSpecifications,
  onTechnicalSpecificationsChange,
  orderingRows,
  onOrderingRowsChange,
}: ProductDetailFieldsProps) {
  function updateDimension(key: keyof ProductDimensions, value: string) {
    onDimensionsChange({ ...dimensions, [key]: value });
  }

  function updateOrderingRow(index: number, key: keyof ProductOrderingRow, value: string) {
    onOrderingRowsChange(
      orderingRows.map((row, i) => (i === index ? { ...row, [key]: value } : row))
    );
  }

  function addOrderingRow() {
    onOrderingRowsChange([...orderingRows, { ...EMPTY_ORDERING_ROW }]);
  }

  function removeOrderingRow(index: number) {
    onOrderingRowsChange(orderingRows.filter((_, i) => i !== index));
  }

  return (
    <>
      <section className="space-y-4">
        <h3 className="text-sm font-medium uppercase tracking-wide text-slate-400">Dimensions</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {(
            [
              ["type", "Type"],
              ["size", "Size"],
              ["width", "Width"],
              ["height", "Height"],
              ["depth", "Depth"],
              ["grossWeight", "Gross Weight"],
              ["netWeight", "Net Weight"],
            ] as const
          ).map(([key, label]) => (
            <div key={key} className="space-y-2">
              <Label className="text-slate-200">{label}</Label>
              <Input
                value={dimensions[key] ?? ""}
                onChange={(e) => updateDimension(key, e.target.value)}
                className="border-slate-600 bg-slate-900 text-white"
                placeholder="Optional"
              />
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-2">
        <h3 className="text-sm font-medium uppercase tracking-wide text-slate-400">
          Cabinet Features
        </h3>
        <p className="text-xs text-slate-500">
          One feature per line. Use <code className="text-slate-400">## Heading</code> for a
          sub-heading on the next section.
        </p>
        <Textarea
          value={cabinetFeatures}
          onChange={(e) => onCabinetFeaturesChange(e.target.value)}
          className="min-h-[160px] border-slate-600 bg-slate-900 font-mono text-sm text-white"
          placeholder={`• 19" mounting angles\n• Front glass door with lock`}
        />
      </section>

      <section className="space-y-2">
        <h3 className="text-sm font-medium uppercase tracking-wide text-slate-400">
          Technical Specifications
        </h3>
        <p className="text-xs text-slate-500">
          One point per line. Use <code className="text-slate-400">## Power Distribution</code>{" "}
          for sub-headings.
        </p>
        <Textarea
          value={technicalSpecifications}
          onChange={(e) => onTechnicalSpecificationsChange(e.target.value)}
          className="min-h-[160px] border-slate-600 bg-slate-900 font-mono text-sm text-white"
          placeholder={`• All steel construction\n## Power Distribution\n• Max Current: 13 Amps`}
        />
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-sm font-medium uppercase tracking-wide text-slate-400">
            Ordering Information
          </h3>
          <Button type="button" variant="outline" size="sm" onClick={addOrderingRow}>
            <Plus className="mr-1 h-3.5 w-3.5" />
            Add row
          </Button>
        </div>
        <div className="space-y-3">
          {orderingRows.map((row, index) => (
            <div
              key={index}
              className="grid gap-3 rounded-lg border border-slate-700 bg-slate-900/50 p-4 sm:grid-cols-2 lg:grid-cols-5"
            >
              <div className="space-y-1">
                <Label className="text-xs text-slate-400">Size</Label>
                <Input
                  value={row.size ?? ""}
                  onChange={(e) => updateOrderingRow(index, "size", e.target.value)}
                  className="border-slate-600 bg-slate-950 text-white"
                  placeholder="15U"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-slate-400">Width</Label>
                <Input
                  value={row.width ?? ""}
                  onChange={(e) => updateOrderingRow(index, "width", e.target.value)}
                  className="border-slate-600 bg-slate-950 text-white"
                  placeholder="600 mm"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-slate-400">Depth</Label>
                <Input
                  value={row.depth ?? ""}
                  onChange={(e) => updateOrderingRow(index, "depth", e.target.value)}
                  className="border-slate-600 bg-slate-950 text-white"
                  placeholder="1000 mm"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-slate-400">Part No.</Label>
                <Input
                  value={row.partNo ?? ""}
                  onChange={(e) => updateOrderingRow(index, "partNo", e.target.value)}
                  className="border-slate-600 bg-slate-950 text-white"
                  placeholder="AN-FS15U600X1000"
                />
              </div>
              <div className="flex items-end">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeOrderingRow(index)}
                  disabled={orderingRows.length <= 1}
                  className="text-red-400 hover:bg-red-500/10 hover:text-red-300"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export { EMPTY_DIMENSIONS, EMPTY_ORDERING_ROW };
