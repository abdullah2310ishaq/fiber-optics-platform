"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import {
  motion,
  useInView,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Box,
  Building2,
  Cable,
  CheckCircle2,
  Clock,
  Globe2,
  HardHat,
  Layers,
  LineChart,
  Package,
  Radio,
  Server,
  ShieldCheck,
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
  hidden: { opacity: 0, y: 40 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.09, ease },
  }),
};

const fadeIn = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6, ease },
  },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.11, delayChildren: 0.05 } },
};

const marqueeItems = [
  "OS2 Single-Mode",
  "OM4 Multimode",
  "PLC Splitters",
  "Patch Cords",
  "ODF Cabinets",
  "FTTH Closures",
  "Enterprise RFQ",
  "Live Tracking",
  "Bulk Procurement",
  "Technical Specs",
  "Global Shipping",
  "24h Quotation",
];

const metrics = [
  { value: "500+", label: "Active SKUs", icon: Package },
  { value: "24h", label: "RFQ Response", icon: Clock, highlight: true },
  { value: "50+", label: "Countries", icon: Globe2 },
  { value: "Live", label: "Order Tracking", icon: Truck },
];

const platformCards = [
  {
    title: "Deep Technical Catalog",
    desc: "Full specs on every SKU — fiber type, connector, insertion loss, core count.",
    tags: ["OS2 / OM4", "PLC & ODF", "FTTH Ready"],
    icon: Layers,
    span: "lg:col-span-7 lg:row-span-2",
    featured: true,
  },
  {
    title: "Dual Commerce Flow",
    desc: "RFQ for bulk quotes. Cart for direct purchase with shipping.",
    icon: Box,
    span: "lg:col-span-5",
  },
  {
    title: "Lifecycle Visibility",
    desc: "Pending → packed → dispatched → delivered in real time.",
    icon: LineChart,
    span: "lg:col-span-5",
  },
  {
    title: "24h RFQ Response",
    desc: "Submit your BOM. Competitive pricing within one business day.",
    icon: Zap,
    span: "lg:col-span-12",
  },
];

const steps = [
  {
    num: "01",
    title: "Browse catalog",
    desc: "Filter by category, fiber type, and technical specifications.",
    icon: Layers,
  },
  {
    num: "02",
    title: "Quote or order",
    desc: "RFQ for enterprise pricing or cart for immediate checkout.",
    icon: Box,
  },
  {
    num: "03",
    title: "Confirm details",
    desc: "Review quantities, specs, and shipping information.",
    icon: CheckCircle2,
  },
  {
    num: "04",
    title: "Track delivery",
    desc: "Monitor dispatch and delivery status in real time.",
    icon: Truck,
  },
];

const industries = [
  {
    title: "ISPs & Telecom",
    desc: "Backbone, last-mile, and FTTH deployment materials at scale.",
    icon: Radio,
    stat: "FTTH Ready",
  },
  {
    title: "Data Centers",
    desc: "High-density cabling, patch infrastructure, and ODF systems.",
    icon: Server,
    stat: "OS2 / OM4",
  },
  {
    title: "Contractors",
    desc: "Field-proven components with spec sheets and fast quotation.",
    icon: HardHat,
    stat: "Bulk RFQ",
  },
];

function FiberBeamGraphic({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 400 200"
      fill="none"
      className={cn("pointer-events-none select-none", className)}
      aria-hidden
    >
      <defs>
        <linearGradient id="fiber-beam" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FF6A00" stopOpacity="0" />
          <stop offset="40%" stopColor="#FF6A00" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#FF6A00" stopOpacity="0" />
        </linearGradient>
      </defs>
      <motion.path
        d="M0 100 C80 40, 120 160, 200 100 S320 40, 400 100"
        stroke="rgba(255,106,0,0.12)"
        strokeWidth="2"
        fill="none"
      />
      <motion.path
        d="M0 100 C80 40, 120 160, 200 100 S320 40, 400 100"
        stroke="url(#fiber-beam)"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: [0, 1, 0], opacity: [0, 1, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.circle
        r="4"
        fill="#FF6A00"
        initial={{ offsetDistance: "0%" }}
        animate={{ offsetDistance: ["0%", "100%"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        style={{ offsetPath: "path('M0 100 C80 40, 120 160, 200 100 S320 40, 400 100')" }}
      />
    </svg>
  );
}

function CapabilitiesMarquee() {
  const items = [...marqueeItems, ...marqueeItems];

  return (
    <section className="relative overflow-hidden border-y border-border bg-card py-5">
      <div className="absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-card to-transparent" />
      <div className="absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-card to-transparent" />
      <div className="marquee-track flex w-max gap-10">
        {items.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="flex shrink-0 items-center gap-3 text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent/70" />
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}

function MetricsSection() {
  return (
    <section className="relative overflow-hidden bg-background py-20 lg:py-24">
      <div className="absolute left-1/2 top-0 h-px w-3/4 -translate-x-1/2 bg-gradient-to-r from-transparent via-border to-transparent" />
      <FiberBeamGraphic className="absolute -right-10 top-8 w-[min(500px,60vw)] opacity-60" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {metrics.map((metric, i) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={metric.label}
                variants={fadeUp}
                custom={i}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                className={cn(
                  "group relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-xl hover:shadow-accent/5",
                  metric.highlight && "ring-1 ring-accent/20"
                )}
              >
                <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-accent/5 transition-transform duration-500 group-hover:scale-150" />
                <div className="relative flex items-start justify-between gap-4">
                  <div>
                    <p
                      className={cn(
                        "display-font text-3xl font-bold tracking-tight lg:text-4xl",
                        metric.highlight ? "text-accent" : "text-foreground"
                      )}
                    >
                      {metric.value}
                    </p>
                    <p className="mt-1 text-[11px] font-medium uppercase tracking-widest text-muted-foreground">
                      {metric.label}
                    </p>
                  </div>
                  <span
                    className={cn(
                      "flex h-11 w-11 items-center justify-center rounded-xl transition-colors",
                      metric.highlight
                        ? "bg-accent text-accent-foreground"
                        : "bg-accent/10 text-accent group-hover:bg-accent/15"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                  </span>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

function PlatformSection() {
  return (
    <section className="relative overflow-hidden bg-card py-24 lg:py-32">
      <div className="dot-pattern absolute inset-0 opacity-40" />
      <motion.div
        className="home-float absolute -left-32 top-20 h-64 w-64 rounded-full bg-accent/8 blur-[80px]"
        aria-hidden
      />
      <motion.div
        className="home-float-delayed absolute -right-20 bottom-10 h-72 w-72 rounded-full bg-accent/5 blur-[90px]"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-end gap-12 lg:grid-cols-12 lg:gap-16">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="lg:col-span-4"
          >
            <motion.p variants={fadeUp} className="section-label">
              The Platform
            </motion.p>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="display-font mt-4 text-3xl font-bold leading-[1.1] tracking-tight text-foreground sm:text-4xl lg:text-5xl"
            >
              Procurement infrastructure{" "}
              <span className="text-accent">built for scale</span>
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="mt-5 text-base leading-relaxed text-muted-foreground lg:text-lg"
            >
              Not a retail storefront — a precision B2B engine for telecom teams who
              need specs, speed, and full order visibility.
            </motion.p>
            <motion.div variants={fadeUp} custom={3} className="mt-8">
              <Button variant="accent" asChild>
                <Link href="/products">
                  Explore platform
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={stagger}
            className="grid gap-4 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-12"
          >
            {platformCards.map((card, i) => {
              const Icon = card.icon;
              return (
                <motion.article
                  key={card.title}
                  variants={fadeUp}
                  custom={i}
                  whileHover={{ y: -5 }}
                  className={cn(
                    "group relative overflow-hidden rounded-3xl border border-border bg-background p-6 shadow-sm transition-all duration-500 hover:border-accent/25 hover:shadow-2xl hover:shadow-accent/5 lg:p-7",
                    card.span,
                    card.featured && "sm:col-span-2"
                  )}
                >
                  {card.featured && (
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(255,106,0,0.08),transparent_60%)]" />
                  )}
                  <div className="relative">
                    <div className="flex items-center justify-between">
                      <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 text-accent transition-transform duration-500 group-hover:scale-110 group-hover:bg-accent group-hover:text-accent-foreground">
                        <Icon className="h-5 w-5" />
                      </span>
                      <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent group-hover:opacity-100" />
                    </div>
                    <h3 className="display-font mt-6 text-lg font-bold text-foreground lg:text-xl">
                      {card.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {card.desc}
                    </p>
                    {card.tags && (
                      <div className="mt-5 flex flex-wrap gap-2">
                        {card.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-border bg-card px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground"
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
      </div>
    </section>
  );
}

function ProcessSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.4"],
  });
  const lineWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const smoothWidth = useSpring(lineWidth, { stiffness: 80, damping: 25 });

  return (
    <section ref={ref} className="relative overflow-hidden bg-[#f7f7f9] py-24 lg:py-32">
      <div className="enterprise-grid absolute inset-0 opacity-50" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="mx-auto max-w-2xl text-center"
        >
          <motion.p variants={fadeUp} className="section-label">
            How it works
          </motion.p>
          <motion.h2
            variants={fadeUp}
            custom={1}
            className="display-font mt-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl"
          >
            From catalog to{" "}
            <span className="text-accent">your doorstep</span>
          </motion.h2>
          <motion.p variants={fadeUp} custom={2} className="mt-4 text-muted-foreground">
            Four deliberate steps — engineered for procurement teams, not impulse buyers.
          </motion.p>
        </motion.div>

        <div className="relative mt-16 hidden lg:block">
          <div className="absolute left-0 right-0 top-8 h-px bg-border" />
          <motion.div
            className="absolute left-0 top-8 h-px origin-left bg-accent"
            style={{ width: smoothWidth }}
          />
          <motion.div
            className="grid grid-cols-4 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={stagger}
          >
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div key={step.num} variants={fadeUp} custom={i} className="relative pt-14">
                  <motion.span
                    whileHover={{ scale: 1.08 }}
                    className="absolute left-0 top-0 flex h-16 w-16 items-center justify-center rounded-2xl border border-accent/25 bg-card shadow-sm"
                  >
                    <Icon className="h-6 w-6 text-accent" />
                  </motion.span>
                  <span className="text-xs font-bold uppercase tracking-widest text-accent">
                    Step {step.num}
                  </span>
                  <h3 className="display-font mt-2 text-lg font-bold text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {step.desc}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="mt-12 space-y-4 lg:hidden"
        >
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={step.num}
                variants={fadeUp}
                custom={i}
                className="flex gap-4 rounded-2xl border border-border bg-card p-5"
              >
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-accent">
                    {step.num}
                  </span>
                  <h3 className="display-font font-bold text-foreground">{step.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{step.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}

function IndustriesSection() {
  return (
    <section className="relative overflow-hidden bg-background py-24 lg:py-28">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <motion.p variants={fadeUp} className="section-label">
              Who we serve
            </motion.p>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="display-font mt-3 text-3xl font-bold text-foreground sm:text-4xl"
            >
              Built for <span className="text-accent">every layer</span> of telecom
            </motion.h2>
          </div>
          <motion.p variants={fadeUp} custom={2} className="max-w-md text-sm text-muted-foreground">
            From backbone operators to field contractors — one platform, enterprise-grade flow.
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          variants={stagger}
          className="mt-12 grid gap-5 lg:grid-cols-3"
        >
          {industries.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.article
                key={item.title}
                variants={fadeUp}
                custom={i}
                whileHover={{ y: -8 }}
                className="group relative overflow-hidden rounded-3xl border border-border bg-card p-8 transition-shadow hover:shadow-xl hover:shadow-accent/5"
              >
                <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-accent/5 transition-transform duration-700 group-hover:scale-150" />
                <div className="relative">
                  <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                    <Icon className="h-6 w-6" />
                  </span>
                  <span className="mt-6 inline-block rounded-full border border-accent/20 bg-accent/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-widest text-accent">
                    {item.stat}
                  </span>
                  <h3 className="display-font mt-4 text-xl font-bold text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                </div>
              </motion.article>
            );
          })}
        </motion.div>
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
      className="group relative flex h-full min-h-[420px] flex-col overflow-hidden rounded-3xl border border-border bg-card lg:min-h-[480px]"
    >
      <div className="relative min-h-[260px] flex-1 overflow-hidden">
        {image ? (
          <Image
            src={image}
            alt={displayName}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 55vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-muted text-muted-foreground">
            No image
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />
        <motion.span
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="absolute left-5 top-5 rounded-full bg-accent px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-accent-foreground"
        >
          Spotlight
        </motion.span>
      </div>
      <div className="relative p-6 lg:p-8">
        {product.brand && (
          <p className="text-[10px] font-semibold uppercase tracking-widest text-accent">
            {product.brand}
          </p>
        )}
        <h3 className="display-font mt-2 text-xl font-bold text-foreground lg:text-2xl">
          {displayName}
        </h3>
        {product.sku && (
          <p className="mt-1 text-xs text-muted-foreground">{product.sku}</p>
        )}
        <div className="mt-5 flex items-center justify-between border-t border-border pt-5">
          {hasPrice ? (
            <span className="display-font text-2xl font-bold text-foreground">
              ${product.price!.toFixed(2)}
            </span>
          ) : (
            <span className="text-sm font-semibold text-accent">Request quote</span>
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

function ProductsShowcase({ products }: { products: Product[] }) {
  const [spotlight, ...rest] = products;
  const scrollRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(scrollRef, { once: true, margin: "-100px" });

  return (
    <section className="relative overflow-hidden bg-card py-24 lg:py-32">
      <FiberBeamGraphic className="absolute bottom-0 left-0 w-full max-w-2xl opacity-40" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
        >
          <div>
            <motion.div variants={fadeUp} className="flex items-center gap-2">
              <motion.span
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <Sparkles className="h-4 w-4 text-accent" />
              </motion.span>
              <p className="section-label">Featured catalog</p>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="display-font mt-3 text-3xl font-bold text-foreground sm:text-4xl lg:text-5xl"
            >
              Components{" "}
              <span className="text-accent">ready to ship</span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="mt-3 max-w-lg text-muted-foreground">
              Industry-standard fiber products — quote in bulk or order directly from catalog.
            </motion.p>
          </div>
          <motion.div variants={fadeUp} custom={3}>
            <Button
              variant="outline"
              className="border-accent/30 text-accent hover:bg-accent/5"
              asChild
            >
              <Link href="/products">
                Full catalog
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        {products.length === 0 ? (
          <div className="mt-14 rounded-3xl border border-dashed border-border py-20 text-center text-muted-foreground">
            No products yet.
          </div>
        ) : (
          <>
            <motion.div
              ref={scrollRef}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={stagger}
              className="mt-14 grid gap-5 lg:grid-cols-12"
            >
              {spotlight && (
                <motion.div variants={fadeIn} className="lg:col-span-7">
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
            </motion.div>

            {rest.length > 2 && (
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={stagger}
                className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
              >
                {rest.slice(2, 5).map((p, i) => (
                  <motion.div key={p.id} variants={fadeUp} custom={i}>
                    <ProductCard product={p} variant="elevated" />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

function TrustStrip() {
  const trust = [
    { icon: ShieldCheck, label: "Enterprise RFQ" },
    { icon: Cable, label: "Full Spec Sheets" },
    { icon: Building2, label: "B2B Procurement" },
    { icon: Globe2, label: "Global Shipping" },
  ];

  return (
    <section className="border-y border-border bg-background py-10">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
        {trust.map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5, ease }}
              className="flex items-center justify-center gap-3 text-center sm:justify-start"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <Icon className="h-4 w-4" />
              </span>
              <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                {item.label}
              </span>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

function ClosingCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const yReverse = useTransform(scrollYProgress, [0, 1], [-40, 40]);

  return (
    <section ref={ref} className="relative overflow-hidden py-24 lg:py-32">
      <div className="cta-gradient absolute inset-0" />
      <motion.div style={{ y }} className="home-pulse-glow absolute -left-20 top-10 h-56 w-56 rounded-full bg-accent/10 blur-[80px]" aria-hidden />
      <motion.div style={{ y: yReverse }} className="home-pulse-glow absolute -right-16 bottom-0 h-64 w-64 rounded-full bg-accent/8 blur-[90px]" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="grid gap-6 lg:grid-cols-2"
        >
          <motion.div
            variants={fadeUp}
            whileHover={{ y: -4 }}
            className="relative overflow-hidden rounded-3xl border border-border bg-card p-8 sm:p-10 lg:p-12"
          >
            <div className="absolute inset-0 overflow-hidden">
              <div className="home-shimmer-line absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-accent/5 to-transparent" />
            </div>
            <div className="relative">
              <p className="section-label">Bulk procurement</p>
              <h3 className="display-font mt-4 text-2xl font-bold text-foreground sm:text-3xl lg:text-4xl">
                Start your <span className="text-accent">RFQ</span> today
              </h3>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground sm:text-base">
                Add products to your quote list. No account needed — competitive pricing
                within 24 hours.
              </p>
              <Button size="lg" variant="accent" className="mt-8" asChild>
                <Link href="/rfq">
                  Request quotation
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            custom={1}
            whileHover={{ y: -4 }}
            className="relative overflow-hidden rounded-3xl border border-accent/25 bg-accent p-8 text-accent-foreground sm:p-10 lg:p-12"
          >
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
            <div className="relative">
              <p className="text-xs font-semibold uppercase tracking-widest text-white/70">
                Direct purchase
              </p>
              <h3 className="display-font mt-4 text-2xl font-bold sm:text-3xl lg:text-4xl">
                Browse the <span className="text-white/90">full catalog</span>
              </h3>
              <p className="mt-4 max-w-md text-sm leading-relaxed text-white/80 sm:text-base">
                Priced items go straight to cart with shipping capture and live order
                tracking.
              </p>
              <Button
                size="lg"
                className="mt-8 bg-white text-accent hover:bg-white/90"
                asChild
              >
                <Link href="/products">
                  Explore products
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
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
      <CapabilitiesMarquee />
      <MetricsSection />
      <PlatformSection />
      <ProcessSection />
      <IndustriesSection />
      <ProductsShowcase products={products} />
      <TrustStrip />
      <ClosingCTA />
    </>
  );
}
