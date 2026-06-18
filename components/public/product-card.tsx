import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
  variant?: "light" | "elevated" | "catalog";
}

function SpecChips({ product }: { product: Product }) {
  const chips = [
    product.specs.fiberType,
    product.specs.connectorType,
    product.specs.coreCount,
  ].filter(Boolean) as string[];

  return (
    <div className="mt-auto flex min-h-[22px] flex-wrap gap-1 pt-2">
      {chips.length > 0 ? (
        chips.slice(0, 2).map((chip) => (
          <span
            key={chip}
            className="rounded-md border border-slate-200 bg-slate-50 px-2 py-0.5 font-mono text-[10px] text-slate-600"
          >
            {chip}
          </span>
        ))
      ) : (
        <span className="invisible text-[10px]">—</span>
      )}
    </div>
  );
}

export function ProductCard({ product, variant = "light" }: ProductCardProps) {
  const image = product.images[0];
  const hasPrice = product.price != null && product.price > 0;
  const isCatalog = variant === "catalog";

  if (isCatalog) {
    return (
      <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-cyan-500/25 hover:shadow-lg hover:shadow-cyan-500/5">
        <Link href={`/products/${product.slug}`} className="flex h-full flex-col">
          <div className="relative aspect-[2/1] shrink-0 overflow-hidden bg-slate-100">
            {image ? (
              <Image
                src={image}
                alt={product.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                sizes="(max-width: 640px) 100vw, 33vw"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                No image
              </div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

            {product.isRfqOnly && (
              <div className="absolute left-3 top-3">
                <Badge variant="accent" className="text-[10px] shadow-sm">
                  RFQ
                </Badge>
              </div>
            )}

            <div className="absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-white text-slate-900 opacity-0 shadow-md transition-all duration-300 group-hover:opacity-100">
              <ArrowUpRight className="h-3.5 w-3.5" />
            </div>
          </div>

          <div className="flex min-h-[128px] flex-1 flex-col p-3.5 sm:p-4">
            <div className="flex items-start justify-between gap-2">
              {product.brand ? (
                <p className="truncate font-mono text-[10px] uppercase tracking-[0.12em] text-slate-400">
                  {product.brand}
                </p>
              ) : (
                <span />
              )}
            </div>

            <h3 className="display-font mt-1 line-clamp-2 min-h-[2.5rem] text-sm font-bold leading-snug text-slate-900 transition-colors group-hover:text-cyan-700 sm:text-[0.95rem]">
              {product.name}
            </h3>

            <p className="mt-0.5 truncate font-mono text-[10px] text-slate-400">{product.sku}</p>

            <SpecChips product={product} />

            <div className="mt-2 flex items-center justify-between border-t border-slate-100 pt-2.5">
              {hasPrice ? (
                <span className="text-base font-bold text-slate-900">
                  ${product.price!.toFixed(2)}
                </span>
              ) : (
                <span className="text-sm font-semibold text-cyan-600">Request Quote</span>
              )}
              <span className="flex items-center gap-0.5 text-xs font-medium text-slate-400 transition-colors group-hover:text-cyan-600">
                View specs
                <ArrowUpRight className="h-3 w-3" />
              </span>
            </div>
          </div>
        </Link>
      </article>
    );
  }

  return (
    <article
      className={cn(
        "group overflow-hidden transition-all duration-300",
        variant === "elevated"
          ? "glass-card rounded-xl"
          : "rounded-xl border border-border bg-card shadow-sm hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-lg"
      )}
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
              {product.brand && (
                <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                  {product.brand}
                </p>
              )}
              <h3 className="mt-1 line-clamp-2 text-base font-semibold leading-snug text-foreground transition-colors group-hover:text-accent">
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
