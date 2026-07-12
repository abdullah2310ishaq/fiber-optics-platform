"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Box,
  Clock,
  Globe2,
  Layers,
  LineChart,
  Package,
  Sparkles,
  Truck,
  Zap,
} from "lucide-react";
import { ProductCard } from "@/components/public/product-card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/product";

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: i * 0.08, ease },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const stats = [
  { value: "500+", label: "SKUs", icon: Package, accent: false },
  { value: "24h", label: "RFQ Turnaround", icon: Clock, accent: true },
  { value: "50+", label: "Countries", icon: Globe2, accent: false },
  { value: "Live", label: "Order Tracking", icon: Truck, accent: false },
];

const bentoCards = [
  {
    title: "Deep Technical Catalog",
    desc: "Full specs on every SKU — fiber type, connector, insertion loss, core count. Built for engineers.",
    tags: ["OS2 / OM4", "PLC & ODF", "FTTH Ready"],
    icon: Layers,
    className: "lg:col-span-2 lg:row-span-2",
  },
  {
    title: "Dual Commerce Flow",
    desc: "RFQ for bulk quotes. Cart for direct purchase with shipping.",
    icon: Box,
    className: "lg:col-span-1",
  },
  {
    title: "Lifecycle Visibility",
    desc: "Pending → packed → dispatched → delivered. Real-time updates.",
    icon: LineChart,
    className: "lg:col-span-1",
  },
  {
    title: "24h RFQ Response",
    desc: "Submit your BOM. Competitive pricing within one business day.",
    icon: Zap,
    className: "lg:col-span-2",
  },
];

const steps = [
  {
    num: "01",
    title: "Browse catalog",
    desc: "Filter by category, fiber type, and technical specs.",
  },
  {
    num: "02",
    title: "Quote or order",
    desc: "RFQ for enterprise pricing or cart for immediate checkout.",
  },
  {
    num: "03",
    title: "Confirm details",
    desc: "Review quantities, specs, and shipping information.",
  },
  {
    num: "04",
    title: "Track delivery",
    desc: "Monitor dispatch and delivery status in real time.",
  },
];

function StatsBar() {
  return (
    <section className="border-y border-border bg-card">
      <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-border lg:grid-cols-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5, ease }}
            className="flex flex-col items-center gap-2 px-6 py-8 text-center sm:flex-row sm:justify-center sm:gap-4 sm:text-left"
          >
            <stat.icon
              className={cn(
                "h-5 w-5 shrink-0",
                stat.accent ? "text-accent" : "text-muted-foreground"
              )}
            />
            <div>
              <p className="home-label text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                {stat.value}
              </p>
              <p className="home-label text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
                {stat.label}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function PlatformSection() {
  return (
    <section className="relative overflow-hidden bg-background py-24 lg:py-32">
      <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-accent/5 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.p variants={fadeUp} className="section-label home-label">
            Platform
          </motion.p>
          <motion.h2
            variants={fadeUp}
            custom={1}
            className="mt-4 text-4xl font-bold leading-tight tracking-tight text-foreground sm:text-5xl"
          >
            Built for{" "}
            <span className="home-serif text-accent">serious procurement</span>
          </motion.h2>
          <motion.p
            variants={fadeUp}
            custom={2}
            className="mt-5 text-lg leading-relaxed text-muted-foreground"
          >
            Not a retail store — industrial sales infrastructure for telecom teams
            who need precision, speed, and visibility.
          </motion.p>
          <motion.p
            variants={fadeUp}
            custom={3}
            className="home-label mt-4 text-xs font-medium uppercase tracking-widest text-muted-foreground"
          >
            ISPs · Contractors · Data Centers
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={stagger}
          className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2"
        >
          {bentoCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.article
                key={card.title}
                variants={fadeUp}
                custom={i}
                whileHover={{ y: -4 }}
                className={cn(
                  "group relative overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-sm transition-shadow hover:border-accent/20 hover:shadow-lg",
                  card.className
                )}
              >
                <div className="relative">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-accent/10 text-accent">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="home-label mt-5 text-lg font-bold text-foreground">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {card.desc}
                  </p>
                  {card.tags && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {card.tags.map((tag) => (
                        <span
                          key={tag}
                          className="home-label rounded-full bg-background px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.article>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

function WorkflowSection() {
  return (
    <section className="relative overflow-hidden bg-[#f7f7f9] py-24 lg:py-32">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
        >
          <div>
            <motion.p variants={fadeUp} className="section-label home-label">
              How it works
            </motion.p>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="mt-3 text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl"
            >
              Catalog to <span className="home-serif text-accent">delivery</span>
            </motion.h2>
          </div>
          <motion.p
            variants={fadeUp}
            custom={2}
            className="max-w-sm text-sm leading-relaxed text-muted-foreground lg:text-right"
          >
            Four steps from discovery to doorstep — built for procurement teams.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={stagger}
          className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              variants={fadeUp}
              custom={i}
              className="relative rounded-2xl border border-border bg-card p-6"
            >
              <span className="home-label inline-flex rounded-xl border border-accent/25 bg-accent/10 px-3 py-1.5 text-sm font-bold text-accent">
                {step.num}
              </span>
              <h3 className="home-label mt-4 text-lg font-bold text-foreground">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ProductsShowcase({ products }: { products: Product[] }) {
  const [spotlight, ...rest] = products;

  return (
    <section className="relative overflow-hidden bg-card py-24 lg:py-32">
      <div className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-accent/25 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <motion.div variants={fadeUp} className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-accent" />
              <p className="section-label home-label">Featured catalog</p>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="mt-3 text-3xl font-bold text-foreground sm:text-4xl"
            >
              Components <span className="home-serif text-accent">in stock</span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="mt-3 max-w-md text-muted-foreground">
              Industry-standard fiber products — quote in bulk or order directly.
            </motion.p>
          </div>
          <motion.div variants={fadeUp} custom={3}>
            <Button variant="outline" className="home-label border-accent/30 text-accent hover:bg-accent/5" asChild>
              <Link href="/products">
                Full catalog
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        {products.length === 0 ? (
          <div className="mt-14 rounded-2xl border border-dashed border-border py-16 text-center text-muted-foreground">
            No products yet.
          </div>
        ) : (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="mt-14 grid gap-5 lg:grid-cols-12"
          >
            {spotlight && (
              <motion.div variants={fadeUp} className="lg:col-span-7">
                <SpotlightCard product={spotlight} />
              </motion.div>
            )}
            <div className="grid gap-5 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
              {rest.slice(0, 2).map((p, i) => (
                <motion.div key={p.id} variants={fadeUp} custom={i}>
                  <ProductCard product={p} variant="elevated" />
                </motion.div>
              ))}
            </div>
            {rest.slice(2, 5).map((p, i) => (
              <motion.div key={p.id} variants={fadeUp} custom={i} className="lg:col-span-4">
                <ProductCard product={p} variant="elevated" />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}

function SpotlightCard({ product }: { product: Product }) {
  const image = product.images?.[0];
  const displayName = product.name ?? "Untitled Product";
  const hasPrice = product.price != null && product.price > 0;

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group relative flex h-full min-h-[380px] flex-col overflow-hidden rounded-3xl border border-border bg-background lg:min-h-[440px]"
    >
      <div className="relative min-h-[220px] flex-1 overflow-hidden">
        {image ? (
          <Image
            src={image}
            alt={displayName}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 55vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-muted-foreground">No image</div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <span className="home-label absolute left-4 top-4 rounded-full bg-accent/15 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-accent ring-1 ring-accent/25">
          Spotlight
        </span>
      </div>
      <div className="relative p-6 lg:p-8">
        {product.brand && (
          <p className="home-label text-[10px] font-semibold uppercase tracking-widest text-accent/80">
            {product.brand}
          </p>
        )}
        <h3 className="home-label mt-2 text-xl font-bold text-foreground lg:text-2xl">
          {displayName}
        </h3>
        {product.sku && (
          <p className="mt-1 font-mono text-xs text-muted-foreground">{product.sku}</p>
        )}
        <div className="mt-5 flex items-center justify-between border-t border-border pt-5">
          {hasPrice ? (
            <span className="home-label text-2xl font-bold text-foreground">
              ${product.price!.toFixed(2)}
            </span>
          ) : (
            <span className="home-label text-sm font-semibold text-accent">Request quote</span>
          )}
          <span className="flex items-center gap-1 text-sm text-muted-foreground transition-colors group-hover:text-accent">
            View specs
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </Link>
  );
}

function DualCtaSection() {
  return (
    <section className="bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="grid gap-5 lg:grid-cols-2"
        >
          <motion.div
            variants={fadeUp}
            className="relative overflow-hidden rounded-3xl border border-border bg-card p-8 sm:p-10"
          >
            <p className="section-label home-label">Bulk procurement</p>
            <h3 className="mt-3 text-2xl font-bold text-foreground sm:text-3xl">
              Start your <span className="home-serif text-accent">RFQ</span>
            </h3>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Add products to your quote list. No account needed — we respond within 24 hours.
            </p>
            <Button size="lg" variant="accent" className="home-label mt-8" asChild>
              <Link href="/rfq">
                Request quotation
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </motion.div>

          <motion.div
            variants={fadeUp}
            custom={1}
            className="relative overflow-hidden rounded-3xl border border-accent/20 bg-accent/5 p-8 sm:p-10"
          >
            <p className="section-label home-label">Direct purchase</p>
            <h3 className="mt-3 text-2xl font-bold text-foreground sm:text-3xl">
              Browse <span className="home-serif text-accent">catalog</span>
            </h3>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Priced items go straight to cart with full shipping capture and order tracking.
            </p>
            <Button size="lg" variant="outline" className="home-label mt-8 border-accent/30 hover:bg-accent/10" asChild>
              <Link href="/products">
                Explore products
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

interface HomeSectionsProps {
  products: Product[];
}

export function HomeSections({ products }: HomeSectionsProps) {
  return (
    <>
      <StatsBar />
      <PlatformSection />
      <WorkflowSection />
      <ProductsShowcase products={products} />
      <DualCtaSection />
    </>
  );
}
