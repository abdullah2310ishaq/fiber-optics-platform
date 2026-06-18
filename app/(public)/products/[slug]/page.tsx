import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductImageGallery } from "@/components/public/product-image-gallery";
import { AddToQuoteButton } from "@/components/public/quote-cart";
import { SpecTable } from "@/components/public/spec-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getProductBySlug } from "@/lib/firestore/products";

interface ProductDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) notFound();

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-6">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/products">← Back to Products</Link>
        </Button>
      </div>

      <div className="grid gap-10 lg:grid-cols-2">
        <ProductImageGallery name={product.name} images={product.images} />

        <div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary">{product.brand}</Badge>
            {product.isRfqOnly && <Badge variant="accent">RFQ Pricing</Badge>}
          </div>
          <h1 className="mt-4 text-3xl font-bold">{product.name}</h1>
          <p className="mt-2 text-muted-foreground">SKU: {product.sku}</p>
          <p className="mt-6 leading-relaxed text-muted-foreground">{product.description}</p>

          {product.price != null && !product.isRfqOnly && (
            <p className="mt-4 text-2xl font-bold">${product.price}</p>
          )}

          <div className="mt-8 flex flex-wrap gap-3">
            <AddToQuoteButton
              productId={product.id}
              slug={product.slug}
              name={product.name}
              sku={product.sku}
              image={product.images[0]}
            />
            <Button variant="outline" asChild>
              <Link href="/rfq">View Quote Cart</Link>
            </Button>
          </div>

          <div className="mt-10">
            <h2 className="mb-4 text-lg font-semibold">Technical Specifications</h2>
            <SpecTable specs={product.specs} />
          </div>
        </div>
      </div>
    </div>
  );
}
