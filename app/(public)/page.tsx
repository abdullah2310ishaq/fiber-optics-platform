import Link from "next/link";
import { ArrowRight, Shield, Truck, Zap } from "lucide-react";
import { ProductGrid } from "@/components/public/product-grid";
import { Button } from "@/components/ui/button";
import { getProducts } from "@/lib/firestore/products";

export default async function HomePage() {
  const products = await getProducts();
  const featured = products.slice(0, 3);

  return (
    <div>
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-blue-300">B2B Fiber Optics Marketplace</p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
              Enterprise Fiber Infrastructure for Modern Networks
            </h1>
            <p className="mt-6 text-lg text-primary-foreground/80">
              Browse technical fiber components, build your quote cart, and submit RFQs for
              bulk pricing. Built for ISPs, telecom, contractors, and data centers.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button variant="accent" size="lg" asChild>
                <Link href="/products">
                  Browse Products
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" className="border-white/30 bg-transparent text-white hover:bg-white/10" asChild>
                <Link href="/rfq">Request Quote</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          {[
            { icon: Zap, title: "Technical Catalog", desc: "Detailed specs for every fiber component." },
            { icon: Shield, title: "RFQ-Based Sales", desc: "Enterprise pricing through quotation workflow." },
            { icon: Truck, title: "Order Tracking", desc: "Full visibility from quote to delivery." },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="rounded-xl border border-border bg-card p-6">
              <Icon className="h-8 w-8 text-accent" />
              <h3 className="mt-4 font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-muted/50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold">Featured Products</h2>
              <p className="mt-1 text-muted-foreground">Popular fiber optic components</p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/products">View All</Link>
            </Button>
          </div>
          <ProductGrid products={featured} />
        </div>
      </section>
    </div>
  );
}
