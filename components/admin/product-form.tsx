"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { saveProduct, updateProduct, type SaveProductInput } from "@/lib/firestore/admin-products";
import { AdminLoadingModal } from "@/components/admin/admin-ui";
import {
  EMPTY_DIMENSIONS,
  EMPTY_ORDERING_ROW,
  ProductDetailFields,
} from "@/components/admin/product-detail-fields";
import { ImageUploader } from "@/components/admin/image-uploader";
import { PRODUCT_DETAIL_SAMPLES } from "@/lib/constants/product-detail-samples";
import type { ProductDimensions, ProductOrderingRow } from "@/types/product-detail";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Category, Product, ProductSpecs, StockStatus } from "@/types/product";

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const emptySpecs = {
  fiberType: "",
  connectorType: "",
  loss: "",
  distance: "",
  coreCount: "",
  cableType: "",
};

function specsFromProduct(specs?: ProductSpecs) {
  return {
    fiberType: specs?.fiberType ?? "",
    connectorType: specs?.connectorType ?? "",
    loss: specs?.loss ?? "",
    distance: specs?.distance ?? "",
    coreCount: specs?.coreCount ?? "",
    cableType: specs?.cableType ?? "",
  };
}

function galleryFromProduct(images?: string[]) {
  const gallery = images?.slice(1, 4) ?? [];
  return [gallery[0] ?? "", gallery[1] ?? "", gallery[2] ?? ""];
}

export function ProductForm({
  categories,
  mode = "create",
  productId,
  initialProduct,
  onSuccess,
  onCancel,
}: {
  categories: Category[];
  mode?: "create" | "edit";
  productId?: string;
  initialProduct?: Product;
  onSuccess?: (product: Product) => void;
  onCancel?: () => void;
}) {
  const isEdit = mode === "edit";
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [sku, setSku] = useState("");
  const [brand, setBrand] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [description, setDescription] = useState("");
  const [pcs, setPcs] = useState("");
  const [color, setColor] = useState("");
  const [quantity, setQuantity] = useState("");
  const [stockStatus, setStockStatus] = useState<StockStatus | "">("");
  const [price, setPrice] = useState("");
  const [isRfqOnly, setIsRfqOnly] = useState(true);
  const [specs, setSpecs] = useState(emptySpecs);
  const [dimensions, setDimensions] = useState<ProductDimensions>({ ...EMPTY_DIMENSIONS });
  const [cabinetFeatures, setCabinetFeatures] = useState("");
  const [technicalSpecifications, setTechnicalSpecifications] = useState("");
  const [orderingRows, setOrderingRows] = useState<ProductOrderingRow[]>([{ ...EMPTY_ORDERING_ROW }]);
  const [mainImage, setMainImage] = useState("");
  const [galleryImages, setGalleryImages] = useState(["", "", ""]);
  const [activeUploads, setActiveUploads] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!initialProduct) return;
    setName(initialProduct.name ?? "");
    setSlug(initialProduct.slug);
    setSku(initialProduct.sku ?? "");
    setBrand(initialProduct.brand ?? "");
    setCategoryId(initialProduct.categoryId ?? "");
    setDescription(initialProduct.description ?? "");
    setPcs(initialProduct.pcs ?? "");
    setColor(initialProduct.color ?? "");
    setQuantity(initialProduct.quantity != null ? String(initialProduct.quantity) : "");
    setStockStatus(initialProduct.stockStatus ?? "");
    setPrice(initialProduct.price != null ? String(initialProduct.price) : "");
    setIsRfqOnly(initialProduct.isRfqOnly ?? true);
    setSpecs(specsFromProduct(initialProduct.specs));
    setDimensions({ ...EMPTY_DIMENSIONS, ...initialProduct.dimensions });
    setCabinetFeatures(initialProduct.cabinetFeatures ?? "");
    setTechnicalSpecifications(initialProduct.technicalSpecifications ?? "");
    setOrderingRows(
      initialProduct.orderingInformation?.length
        ? initialProduct.orderingInformation
        : [{ ...EMPTY_ORDERING_ROW }]
    );
    setMainImage(initialProduct.images?.[0] ?? "");
    setGalleryImages(galleryFromProduct(initialProduct.images));
  }, [initialProduct]);

  const isBusy = activeUploads > 0 || submitting;

  const handleUploadStart = useCallback(() => {
    setActiveUploads((count) => count + 1);
  }, []);

  const handleUploadEnd = useCallback(() => {
    setActiveUploads((count) => Math.max(0, count - 1));
  }, []);

  function updateGallery(index: number, url: string) {
    setGalleryImages((prev) => prev.map((img, i) => (i === index ? url : img)));
  }

  function clearGallery(index: number) {
    updateGallery(index, "");
  }

  function updateSpec(key: keyof typeof emptySpecs, value: string) {
    setSpecs((prev) => ({ ...prev, [key]: value }));
  }

  function resetForm() {
    setName("");
    setSlug("");
    setSku("");
    setBrand("");
    setCategoryId("");
    setDescription("");
    setPcs("");
    setColor("");
    setQuantity("");
    setStockStatus("");
    setPrice("");
    setIsRfqOnly(true);
    setSpecs(emptySpecs);
    setDimensions({ ...EMPTY_DIMENSIONS });
    setCabinetFeatures("");
    setTechnicalSpecifications("");
    setOrderingRows([{ ...EMPTY_ORDERING_ROW }]);
    setMainImage("");
    setGalleryImages(["", "", ""]);
  }

  function applySample(sampleId: string) {
    const sample = PRODUCT_DETAIL_SAMPLES.find((s) => s.id === sampleId);
    if (!sample) return;
    const data = sample.data;
    setName(data.name ?? "");
    setSlug(data.slug ?? "");
    setSku(data.sku ?? "");
    setBrand(data.brand ?? "");
    setCategoryId(data.categoryId ?? "");
    setDescription(data.description ?? "");
    setPcs(data.pcs ?? "");
    setColor(data.color ?? "");
    setQuantity(data.quantity != null ? String(data.quantity) : "");
    setStockStatus(data.stockStatus ?? "");
    setPrice(data.price != null ? String(data.price) : "");
    setIsRfqOnly(data.isRfqOnly ?? true);
    setSpecs(specsFromProduct(data.specs));
    setDimensions({ ...EMPTY_DIMENSIONS, ...data.dimensions });
    setCabinetFeatures(data.cabinetFeatures ?? "");
    setTechnicalSpecifications(data.technicalSpecifications ?? "");
    setOrderingRows(
      data.orderingInformation?.length ? data.orderingInformation : [{ ...EMPTY_ORDERING_ROW }]
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess(false);

    const images = [mainImage, ...galleryImages.filter(Boolean)].filter(Boolean);
    const parsedPrice = price.trim() ? Number.parseFloat(price) : undefined;
    const parsedQuantity = quantity.trim() ? Number.parseInt(quantity, 10) : undefined;

    if (price.trim() && (parsedPrice == null || Number.isNaN(parsedPrice))) {
      setError("Price must be a valid number.");
      return;
    }

    if (quantity.trim() && (parsedQuantity == null || Number.isNaN(parsedQuantity))) {
      setError("Quantity must be a valid whole number.");
      return;
    }

    if (activeUploads > 0) {
      setError("Please wait for all images to finish uploading.");
      return;
    }

    setSubmitting(true);
    try {
      const payload: SaveProductInput = {
        name: name.trim() || undefined,
        slug: slug.trim() || undefined,
        sku: sku.trim() || undefined,
        brand: brand.trim() || undefined,
        categoryId: categoryId || undefined,
        description: description.trim() || undefined,
        pcs: pcs.trim() || undefined,
        color: color.trim() || undefined,
        stockStatus: stockStatus || undefined,
        quantity: parsedQuantity,
        price: parsedPrice,
        isRfqOnly,
        specs,
        dimensions,
        cabinetFeatures: cabinetFeatures.trim() || undefined,
        technicalSpecifications: technicalSpecifications.trim() || undefined,
        orderingInformation: orderingRows,
        images,
      };

      const product =
        isEdit && productId
          ? await updateProduct(productId, payload)
          : await saveProduct(payload);

      setSuccess(true);
      if (!isEdit) resetForm();
      onSuccess?.(product);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save product");
    } finally {
      setSubmitting(false);
    }
  }

  const loadingMessage = submitting
    ? isEdit
      ? "Updating product in Firebase..."
      : "Saving product to Firebase..."
    : activeUploads > 1
      ? `Uploading images... (${activeUploads} remaining)`
      : "Uploading image to Cloudinary...";

  return (
    <>
      <AdminLoadingModal open={isBusy} message={loadingMessage} />

      <form
        onSubmit={handleSubmit}
        className="space-y-8 rounded-xl border border-slate-700 bg-slate-800 p-6"
        aria-busy={isBusy}
      >
      <div>
        <h2 className="text-lg font-semibold text-white">
          {isEdit ? "Edit Product" : "Add Product"}
        </h2>
        <p className="text-sm text-slate-400">
          All fields are optional. Images upload to Cloudinary; details save to Firestore.
        </p>
        {!isEdit && (
          <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center">
            <Label className="shrink-0 text-slate-300">Load sample content</Label>
            <select
              defaultValue=""
              onChange={(e) => {
                if (e.target.value) applySample(e.target.value);
                e.target.value = "";
              }}
              className="flex h-10 max-w-md flex-1 rounded-md border border-slate-600 bg-slate-900 px-3 text-sm text-white"
            >
              <option value="">Choose a cabinet example...</option>
              {PRODUCT_DETAIL_SAMPLES.map((sample) => (
                <option key={sample.id} value={sample.id}>
                  {sample.label}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <section className="space-y-4">
        <h3 className="text-sm font-medium uppercase tracking-wide text-slate-400">Basic</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label className="text-slate-200">Product Name</Label>
            <Input
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (!isEdit && !slug) setSlug(slugify(e.target.value));
              }}
              className="border-slate-600 bg-slate-900 text-white"
              placeholder="Optional"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-slate-200">SKU</Label>
            <Input
              value={sku}
              onChange={(e) => setSku(e.target.value)}
              className="border-slate-600 bg-slate-900 text-white"
              placeholder="Optional"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-slate-200">Slug</Label>
            <Input
              value={slug}
              onChange={(e) => setSlug(slugify(e.target.value))}
              className="border-slate-600 bg-slate-900 text-white"
              placeholder="Auto-generated if empty"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-slate-200">Brand</Label>
            <Input
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              className="border-slate-600 bg-slate-900 text-white"
              placeholder="Optional"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label className="text-slate-200">Category</Label>
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            className="flex h-10 w-full rounded-md border border-slate-600 bg-slate-900 px-3 text-sm text-white"
          >
            <option value="">None</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-sm font-medium uppercase tracking-wide text-slate-400">Inventory</h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-2">
            <Label className="text-slate-200">PCS</Label>
            <Input
              value={pcs}
              onChange={(e) => setPcs(e.target.value)}
              className="border-slate-600 bg-slate-900 text-white"
              placeholder="e.g. 100 pcs"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-slate-200">Color</Label>
            <Input
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="border-slate-600 bg-slate-900 text-white"
              placeholder="Optional"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-slate-200">Quantity</Label>
            <Input
              type="number"
              min={0}
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="border-slate-600 bg-slate-900 text-white"
              placeholder="Stock count"
            />
          </div>
          <div className="space-y-2">
            <Label className="text-slate-200">Stock Status</Label>
            <select
              value={stockStatus}
              onChange={(e) => setStockStatus(e.target.value as StockStatus | "")}
              className="flex h-10 w-full rounded-md border border-slate-600 bg-slate-900 px-3 text-sm text-white"
            >
              <option value="">Not set</option>
              <option value="in_stock">In Stock</option>
              <option value="out_of_stock">Out of Stock</option>
            </select>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-sm font-medium uppercase tracking-wide text-slate-400">Pricing & Sales</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label className="text-slate-200">Price (USD)</Label>
            <Input
              type="number"
              min={0}
              step="0.01"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="border-slate-600 bg-slate-900 text-white"
              placeholder="Enables Add to Cart when set"
            />
          </div>
          <div className="flex items-end gap-3 pb-1">
            <label className="flex cursor-pointer items-center gap-2 text-sm text-slate-200">
              <input
                type="checkbox"
                checked={isRfqOnly}
                onChange={(e) => setIsRfqOnly(e.target.checked)}
                className="rounded border-slate-600"
              />
              RFQ available
            </label>
          </div>
        </div>
      </section>

      <section className="space-y-2">
        <h3 className="text-sm font-medium uppercase tracking-wide text-slate-400">Description</h3>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border-slate-600 bg-slate-900 text-white"
          rows={4}
          placeholder="Optional product description"
        />
      </section>

      <ProductDetailFields
        dimensions={dimensions}
        onDimensionsChange={setDimensions}
        cabinetFeatures={cabinetFeatures}
        onCabinetFeaturesChange={setCabinetFeatures}
        technicalSpecifications={technicalSpecifications}
        onTechnicalSpecificationsChange={setTechnicalSpecifications}
        orderingRows={orderingRows}
        onOrderingRowsChange={setOrderingRows}
      />

      <section className="space-y-4">
        <h3 className="text-sm font-medium uppercase tracking-wide text-slate-400">
          Fiber Specs (optional)
        </h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {(
            [
              ["fiberType", "Fiber Type"],
              ["connectorType", "Connector Type"],
              ["loss", "Loss"],
              ["distance", "Distance"],
              ["coreCount", "Core Count"],
              ["cableType", "Cable Type"],
            ] as const
          ).map(([key, label]) => (
            <div key={key} className="space-y-2">
              <Label className="text-slate-200">{label}</Label>
              <Input
                value={specs[key]}
                onChange={(e) => updateSpec(key, e.target.value)}
                className="border-slate-600 bg-slate-900 text-white"
                placeholder="Optional"
              />
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="font-medium text-white">Product Images</h3>
        <p className="text-xs text-slate-400">1 main image + up to 3 gallery images (all optional)</p>

        <ImageUploader
          label="Main Image"
          value={mainImage}
          onChange={setMainImage}
          onClear={() => setMainImage("")}
          onUploadStart={handleUploadStart}
          onUploadEnd={handleUploadEnd}
          disabled={isBusy}
        />

        <div className="grid gap-4 sm:grid-cols-3">
          {galleryImages.map((img, index) => (
            <ImageUploader
              key={index}
              label={`Gallery Image ${index + 1}`}
              value={img}
              onChange={(url) => updateGallery(index, url)}
              onClear={() => clearGallery(index)}
              onUploadStart={handleUploadStart}
              onUploadEnd={handleUploadEnd}
              disabled={isBusy}
            />
          ))}
        </div>
      </section>

      {error && <p className="text-sm text-red-400">{error}</p>}
      {success && (
        <p className="text-sm text-green-400">
          {isEdit ? "Product updated successfully." : "Product saved to Firebase successfully."}
        </p>
      )}

      <div className="flex flex-wrap gap-3">
        <Button type="submit" disabled={isBusy}>
          {submitting
            ? isEdit
              ? "Updating..."
              : "Saving..."
            : activeUploads > 0
              ? "Uploading images..."
              : isEdit
                ? "Update Product"
                : "Save Product"}
        </Button>
        {isEdit && (
          <Button type="button" variant="outline" asChild disabled={isBusy}>
            <Link href="/admin/products/list">Back to list</Link>
          </Button>
        )}
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel} disabled={isBusy}>
            Cancel
          </Button>
        )}
      </div>
    </form>
    </>
  );
}
