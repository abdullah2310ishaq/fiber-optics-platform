import Link from "next/link";
import { ChevronRight, FileText, ShoppingCart } from "lucide-react";
import { notFound } from "next/navigation";
import { ProductImageGallery } from "@/components/public/product-image-gallery";
import { AddToQuoteButton } from "@/components/public/quote-cart";
import { AddToCartButton } from "@/components/public/shopping-cart";
import { SpecTable } from "@/components/public/spec-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getProductBySlug } from "@/lib/firestore/products";
import { cn } from "@/lib/utils";

interface ProductDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const displayName = product.name ?? "Untitled Product";
  const images = product.images ?? [];
  const specs = product.specs ?? {};
  const canAddToCart = product.price != null && product.price > 0;
  const specEntries = Object.entries(specs).filter(([, v]) => v);

  return (
    <div className="bg-background">
      <div className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-7xl items-center gap-2 px-4 py-3 text-sm text-muted-foreground sm:px-6 lg:px-8">
          <Link href="/" className="hover:text-accent">Home</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <Link href="/products" className="hover:text-accent">Products</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="truncate font-medium text-foreground">{displayName}</span>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <ProductImageGallery name={displayName} images={images} />
          </div>

          <div className="lg:col-span-6">
            <div className="flex flex-wrap gap-2">
              {product.sku && (
                <Badge variant="secondary" className="font-mono text-xs">{product.sku}</Badge>
              )}
              {product.brand && <Badge variant="outline">{product.brand}</Badge>}
              {product.isRfqOnly && <Badge variant="accent">RFQ Available</Badge>}
              {product.stockStatus && (
                <Badge
                  variant="outline"
                  className={cn(
                    product.stockStatus === "in_stock"
                      ? "border-emerald-500/40 text-emerald-600"
                      : "border-red-500/40 text-red-600"
                  )}
                >
                  {product.stockStatus === "in_stock" ? "In Stock" : "Out of Stock"}
                </Badge>
              )}
            </div>

            <h1 className="display-font mt-4 text-3xl font-bold tracking-tight text-foreground lg:text-4xl">
              {displayName}
            </h1>

            {(product.color || product.pcs || product.quantity != null) && (
              <div className="mt-4 flex flex-wrap gap-3 text-sm text-muted-foreground">
                {product.color && <span>Color: <strong className="text-foreground">{product.color}</strong></span>}
                {product.pcs && <span>PCS: <strong className="text-foreground">{product.pcs}</strong></span>}
                {product.quantity != null && (
                  <span>Qty: <strong className="text-foreground">{product.quantity}</strong></span>
                )}
              </div>
            )}

            {canAddToCart && (
              <p className="mt-4 text-3xl font-bold text-primary">
                ${product.price!.toFixed(2)}
                <span className="ml-2 text-sm font-normal text-muted-foreground">per unit</span>
              </p>
            )}

            {product.description && (
              <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                {product.description}
              </p>
            )}

            {specEntries.length > 0 && (
              <div className="mt-6 flex flex-wrap gap-2">
                {specEntries.slice(0, 4).map(([key, value]) => (
                  <span
                    key={key}
                    className="rounded-md border border-border bg-muted/50 px-3 py-1 text-xs font-medium text-foreground"
                  >
                    {key.replace(/([A-Z])/g, " $1")}: {value}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-8 space-y-4">
              <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
                <div className="flex items-center gap-2">
                  <ShoppingCart className="h-4 w-4 text-primary" />
                  <p className="font-semibold text-foreground">Direct Purchase</p>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  Add to cart with full shipping address and place order.
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {canAddToCart ? (
                    <AddToCartButton
                      productId={product.id}
                      slug={product.slug}
                      name={displayName}
                      sku={product.sku ?? ""}
                      price={product.price!}
                      image={images[0]}
                    />
                  ) : (
                    <p className="text-sm text-muted-foreground">Pricing on request</p>
                  )}
                  <Button variant="outline" asChild>
                    <Link href="/cart">View Cart</Link>
                  </Button>
                </div>
              </div>

              <div className="rounded-xl border-2 border-dashed border-accent/30 bg-accent/5 p-5">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-accent" />
                  <p className="font-semibold text-foreground">Bulk Quotation (RFQ)</p>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  For enterprise volume pricing and custom specifications.
                </p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <AddToQuoteButton
                    productId={product.id}
                    slug={product.slug}
                    name={displayName}
                    sku={product.sku ?? ""}
                    image={images[0]}
                  />
                  <Button variant="outline" asChild>
                    <Link href="/rfq">View Quote List</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {specEntries.length > 0 && (
          <div className="mt-16">
            <h2 className="display-font mb-6 text-xl font-bold text-foreground">Technical Specifications</h2>
            <SpecTable specs={specs} />
          </div>
        )}
      </div>
    </div>
  );
}
