import Link from "next/link";
import {
  ArrowRight,
  Award,
  Cable,
  FileText,
  Package,
  Shield,
  Truck,
} from "lucide-react";
import { ProductGrid } from "@/components/public/product-grid";
import { SectionHeading } from "@/components/public/page-header";
import { Button } from "@/components/ui/button";
import { getProducts } from "@/lib/firestore/products";

export default async function HomePage() {
  const products = await getProducts();
  const featured = products.slice(0, 6);

  return (
    <div>
      {/* Hero */}
      <section className="navy-mesh relative overflow-hidden border-b border-white/10 text-white">
        <div className="enterprise-grid absolute inset-0 opacity-[0.07]" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <div>
              <p className="section-label text-blue-300">Enterprise Fiber Infrastructure</p>
              <h1 className="mt-4 text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
                Industrial-Grade Fiber Optics for{" "}
                <span className="text-blue-400">Modern Networks</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-blue-100/75">
                Browse technical catalogs, submit RFQs for bulk procurement, and manage
                shipping orders — built for ISPs, telecom, contractors, and data centers.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button size="lg" variant="accent" className="h-12 px-8 shadow-lg shadow-blue-500/30" asChild>
                  <Link href="/products">
                    Explore Catalog
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 border-white/20 bg-white/5 px-8 text-white hover:bg-white/10"
                  asChild
                >
                  <Link href="/rfq">Submit Quotation</Link>
                </Button>
              </div>

              <div className="mt-12 grid grid-cols-3 gap-6 border-t border-white/10 pt-8">
                {[
                  { value: "500+", label: "SKUs" },
                  { value: "24h", label: "RFQ Response" },
                  { value: "Global", label: "Shipping" },
                ].map((stat) => (
                  <div key={stat.label}>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                    <p className="text-xs uppercase tracking-wider text-blue-200/60">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative hidden lg:block">
              <div className="absolute -inset-4 rounded-3xl bg-blue-500/10 blur-2xl" />
              <div className="relative rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
                <div className="space-y-4">
                  {[
                    { icon: Cable, label: "Fiber Cables & Trunks", tag: "OS2 / OM4" },
                    { icon: Package, label: "PLC Splitters & ODFs", tag: "FTTH Ready" },
                    { icon: Truck, label: "Order Lifecycle Tracking", tag: "Real-time" },
                  ].map(({ icon: Icon, label, tag }) => (
                    <div
                      key={label}
                      className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 p-4"
                    >
                      <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-500/20">
                        <Icon className="h-5 w-5 text-blue-300" />
                      </div>
                      <div>
                        <p className="font-medium text-white">{label}</p>
                        <p className="text-xs text-blue-200/60">{tag}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-b border-border bg-card">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-8 px-4 py-6 sm:px-6 lg:px-8">
          {[
            { icon: Shield, text: "Enterprise RFQ Workflow" },
            { icon: Award, text: "Technical Spec Sheets" },
            { icon: FileText, text: "Quotation Management" },
            { icon: Truck, text: "Dispatch Tracking" },
          ].map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Icon className="h-4 w-4 text-accent" />
              {text}
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="enterprise-grid py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Built for B2B Procurement"
            description="Not a retail store — a structured industrial sales infrastructure."
          />
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Technical Catalog",
                desc: "Deep specifications — fiber type, connector, loss, distance, core count — for every component.",
              },
              {
                title: "Dual Commerce Flow",
                desc: "Separate quotation pipeline for bulk RFQ and cart checkout with full shipping address capture.",
              },
              {
                title: "Lifecycle Visibility",
                desc: "Track orders from pending through processing, dispatch, in-transit, and delivery.",
              },
            ].map((f) => (
              <div key={f.title} className="glass-card rounded-xl p-8">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/5 text-primary">
                  <Cable className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-lg font-semibold text-foreground">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured products */}
      <section className="border-t border-border bg-card py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Featured Components"
            description="Industry-standard fiber optic products available for quotation and direct order."
            action={
              <Button variant="outline" asChild>
                <Link href="/products">View Full Catalog</Link>
              </Button>
            }
          />
          <ProductGrid products={featured} />
        </div>
      </section>

      {/* CTA */}
      <section className="navy-mesh border-t border-white/10 py-16 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold sm:text-3xl">Ready to build your RFQ?</h2>
          <p className="mx-auto mt-3 max-w-lg text-blue-100/70">
            Add products to your quotation list or cart. No account required to get started.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button variant="accent" size="lg" asChild>
              <Link href="/rfq">Start Quotation</Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-white/20 bg-transparent text-white hover:bg-white/10"
              asChild
            >
              <Link href="/products">Browse Products</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
