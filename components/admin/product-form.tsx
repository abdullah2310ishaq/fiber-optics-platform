"use client";

import { useState } from "react";
import { saveProduct } from "@/lib/firestore/admin-products";
import { ImageUploader } from "@/components/admin/image-uploader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const categories = [
  { id: "fiber-optic-cables", name: "Fiber Optic Cables" },
  { id: "patch-cords", name: "Patch Cords" },
  { id: "plc-splitters", name: "PLC Splitters" },
  { id: "transceivers", name: "Transceivers" },
  { id: "odfs-enclosures", name: "ODFs & Enclosures" },
];

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function ProductForm({ onSuccess }: { onSuccess?: () => void }) {
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [sku, setSku] = useState("");
  const [brand, setBrand] = useState("");
  const [categoryId, setCategoryId] = useState(categories[0].id);
  const [description, setDescription] = useState("");
  const [mainImage, setMainImage] = useState("");
  const [galleryImages, setGalleryImages] = useState(["", "", ""]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  function updateGallery(index: number, url: string) {
    setGalleryImages((prev) => prev.map((img, i) => (i === index ? url : img)));
  }

  function clearGallery(index: number) {
    updateGallery(index, "");
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!mainImage) {
      setError("Main image is required.");
      return;
    }

    const images = [mainImage, ...galleryImages.filter(Boolean)];

    setSubmitting(true);
    try {
      await saveProduct({
        name,
        slug: slug || slugify(name),
        sku,
        brand,
        categoryId,
        description,
        images,
        isRfqOnly: true,
      });

      setSuccess(true);
      setName("");
      setSlug("");
      setSku("");
      setBrand("");
      setDescription("");
      setMainImage("");
      setGalleryImages(["", "", ""]);
      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save product");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-xl border border-slate-700 bg-slate-800 p-6">
      <div>
        <h2 className="text-lg font-semibold text-white">Add Product</h2>
        <p className="text-sm text-slate-400">
          Images upload to Cloudinary. URLs are saved in Firebase Firestore.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label className="text-slate-200">Product Name</Label>
          <Input
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (!slug) setSlug(slugify(e.target.value));
            }}
            className="border-slate-600 bg-slate-900 text-white"
            required
          />
        </div>
        <div className="space-y-2">
          <Label className="text-slate-200">Slug</Label>
          <Input
            value={slug}
            onChange={(e) => setSlug(slugify(e.target.value))}
            className="border-slate-600 bg-slate-900 text-white"
            required
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label className="text-slate-200">SKU</Label>
          <Input
            value={sku}
            onChange={(e) => setSku(e.target.value)}
            className="border-slate-600 bg-slate-900 text-white"
            required
          />
        </div>
        <div className="space-y-2">
          <Label className="text-slate-200">Brand</Label>
          <Input
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="border-slate-600 bg-slate-900 text-white"
            required
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
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <Label className="text-slate-200">Description</Label>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border-slate-600 bg-slate-900 text-white"
          rows={4}
          required
        />
      </div>

      <div className="space-y-4">
        <h3 className="font-medium text-white">Product Images</h3>
        <p className="text-xs text-slate-400">1 main image (large on product page) + up to 3 gallery images below</p>

        <ImageUploader
          label="Main Image"
          value={mainImage}
          onChange={setMainImage}
          onClear={() => setMainImage("")}
          required
        />

        <div className="grid gap-4 sm:grid-cols-3">
          {galleryImages.map((img, index) => (
            <ImageUploader
              key={index}
              label={`Gallery Image ${index + 1}`}
              value={img}
              onChange={(url) => updateGallery(index, url)}
              onClear={() => clearGallery(index)}
            />
          ))}
        </div>
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}
      {success && <p className="text-sm text-green-400">Product saved to Firebase successfully.</p>}

      <Button type="submit" disabled={submitting}>
        {submitting ? "Saving..." : "Save Product"}
      </Button>
    </form>
  );
}
