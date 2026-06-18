import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
  variant?: "light" | "elevated";
}

export function ProductCard({ product, variant = "light" }: ProductCardProps) {
  const image = product.images[0];
  const hasPrice = product.price != null && product.price > 0;

  return (
    <article
      className={
        variant === "elevated"
          ? "glass-card group overflow-hidden rounded-xl transition-all duration-300"
          : "group overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-lg"
      }
    >
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          {image ? (
            <Image
              src={image}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground">
              No image
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          <div className="absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white text-primary opacity-0 shadow-lg transition-all group-hover:opacity-100">
            <ArrowUpRight className="h-4 w-4" />
          </div>
        </div>

        <div className="p-5">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                {product.brand}
              </p>
              <h3 className="mt-1 line-clamp-2 text-base font-semibold leading-snug text-foreground group-hover:text-accent transition-colors">
                {product.name}
              </h3>
            </div>
            {product.isRfqOnly && (
              <Badge variant="accent" className="shrink-0 text-[10px]">
                RFQ
              </Badge>
            )}
          </div>

          <p className="mt-2 font-mono text-xs text-muted-foreground">{product.sku}</p>
          <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
            {product.description}
          </p>

          <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
            {hasPrice ? (
              <span className="text-lg font-bold text-primary">${product.price!.toFixed(2)}</span>
            ) : (
              <span className="text-sm font-medium text-accent">Request Quote</span>
            )}
            <span className="text-xs font-medium text-muted-foreground group-hover:text-accent">
              View specs →
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}
