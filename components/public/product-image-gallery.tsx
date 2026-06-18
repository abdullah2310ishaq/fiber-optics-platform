"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

const GALLERY_COUNT = 3;

interface ProductImageGalleryProps {
  name: string;
  images: string[];
}

export function getProductImages(images: string[]) {
  const main = images[0] ?? "";
  const gallery = images.slice(1, 1 + GALLERY_COUNT);
  return { main, gallery };
}

export function ProductImageGallery({ name, images }: ProductImageGalleryProps) {
  const { main, gallery } = getProductImages(images);
  const allImages = [main, ...gallery].filter(Boolean);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeImage = allImages[activeIndex] ?? main;

  if (!main) {
    return (
      <div className="flex aspect-square items-center justify-center rounded-xl bg-muted text-muted-foreground">
        No image available
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl border border-border bg-muted shadow-md sm:aspect-square">
        <Image
          src={activeImage}
          alt={name}
          fill
          className="object-cover"
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>

      {gallery.length > 0 && (
        <div className="grid grid-cols-3 gap-3">
          {gallery.map((image, index) => {
            const thumbIndex = index + 1;
            const isActive = activeIndex === thumbIndex;

            return (
              <button
                key={image}
                type="button"
                onClick={() => setActiveIndex(thumbIndex)}
                className={cn(
                  "relative aspect-square overflow-hidden rounded-lg border-2 bg-muted transition-all",
                  isActive
                    ? "border-accent ring-2 ring-accent/30"
                    : "border-border hover:border-accent/50"
                )}
                aria-label={`View image ${thumbIndex + 1}`}
                aria-pressed={isActive}
              >
                <Image
                  src={image}
                  alt={`${name} view ${thumbIndex + 1}`}
                  fill
                  className="object-cover"
                  sizes="120px"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
