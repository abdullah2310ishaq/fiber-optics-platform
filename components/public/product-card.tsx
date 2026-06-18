import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const image = product.images[0];

  return (
    <Card className="overflow-hidden transition-shadow hover:shadow-md">
      <Link href={`/products/${product.slug}`}>
        <div className="relative aspect-[4/3] bg-muted">
          {image ? (
            <Image
              src={image}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground">
              No image
            </div>
          )}
        </div>
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between gap-2">
            <CardTitle className="text-base leading-snug">{product.name}</CardTitle>
            {product.isRfqOnly && <Badge variant="accent">RFQ</Badge>}
          </div>
          <p className="text-xs text-muted-foreground">{product.sku} · {product.brand}</p>
        </CardHeader>
        <CardContent className="pt-0">
          <p className="line-clamp-2 text-sm text-muted-foreground">{product.description}</p>
          {product.price != null && !product.isRfqOnly && (
            <p className="mt-2 text-sm font-semibold">${product.price}</p>
          )}
        </CardContent>
      </Link>
    </Card>
  );
}
