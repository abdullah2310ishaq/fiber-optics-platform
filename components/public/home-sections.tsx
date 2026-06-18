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
  { value: "500+", label: "SKUs", icon: Package, color: "text-amber-400" },
  { value: "24h", label: "RFQ Turnaround", icon: Clock, color: "text-violet-400" },
  { value: "50+", label: "Countries", icon: Globe2, color: "text-emerald-400" },
  { value: "Live", label: "Order Tracking", icon: Truck, color: "text-sky-400" },
];

const bentoCards = [
  {
    title: "Deep Technical Catalog",
    desc: "Full specs on every SKU — fiber type, connector, insertion loss, core count. Built for engineers.",
    tags: ["OS2 / OM4", "PLC & ODF", "FTTH Ready"],
    icon: Layers,
    className: "lg:col-span-2 lg:row-span-2",
    gradient: "from-indigo-600/20 via-violet-600/10 to-transparent",
    iconBg: "bg-indigo-500",
  },
  {
    title: "Dual Commerce Flow",
    desc: "RFQ for bulk quotes. Cart for direct purchase with shipping.",
    icon: Box,
    className: "lg:col-span-1",
    gradient: "from-amber-500/15 to-transparent",
    iconBg: "bg-amber-500",
  },
  {
    title: "Lifecycle Visibility",
    desc: "Pending → packed → dispatched → delivered. Real-time updates.",
    icon: LineChart,
    className: "lg:col-span-1",
    gradient: "from-emerald-500/15 to-transparent",
    iconBg: "bg-emerald-500",
  },
  {
    title: "24h RFQ Response",
    desc: "Submit your BOM. Competitive pricing within one business day.",
    icon: Zap,
    className: "lg:col-span-2",
    gradient: "from-rose-500/15 via-fuchsia-500/10 to-transparent",
    iconBg: "bg-rose-500",
  },
];

const steps = [
  {
    num: "01",
    title: "Browse catalog",
    desc: "Filter by category, fiber type, and technical specs.",
    color: "border-violet-500/40 bg-violet-500/10 text-violet-300",
  },
  {
    num: "02",
    title: "Quote or order",
    desc: "RFQ for enterprise pricing or cart for immediate checkout.",
    color: "border-fuchsia-500/40 bg-fuchsia-500/10 text-fuchsia-300",
  },
  {
    num: "03",
    title: "Confirm details",
    desc: "Review quantities, specs, and shipping information.",
    color: "border-sky-500/40 bg-sky-500/10 text-sky-300",
  },
  {
    num: "04",
    title: "Track delivery",
    desc: "Monitor dispatch and delivery status in real time.",
    color: "border-emerald-500/40 bg-emerald-500/10 text-emerald-300",
  },
];

function StatsBar() {
  return (
    <section className="border-y border-white/10 bg-[#0c0a09]">
      <div className="mx-auto grid max-w-7xl grid-cols-2 divide-x divide-white/10 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5, ease }}
            className="flex flex-col items-center gap-2 px-6 py-8 text-center sm:flex-row sm:justify-center sm:gap-4 sm:text-left"
          >
            <stat.icon className={cn("h-5 w-5 shrink-0", stat.color)} />
            <div>
              <p className="home-label text-2xl font-bold tracking-tight text-white sm:text-3xl">
                {stat.value}
              </p>
              <p className="home-label text-[11px] font-medium uppercase tracking-widest text-stone-500">
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
    <section className="relative overflow-hidden bg-[#faf7f2] py-24 text-stone-900 lg:py-32">
      <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-indigo-200/40 blur-[100px]" />
      <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-amber-200/50 blur-[80px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={stagger}
          className="mx-auto max-w-3xl text-center"
        >
          <motion.p
            variants={fadeUp}
            className="home-label text-xs font-semibold uppercase tracking-[0.3em] text-indigo-600"
          >
            Platform
          </motion.p>
          <motion.h2
            variants={fadeUp}
            custom={1}
            className="mt-4 text-4xl font-bold leading-tight tracking-tight text-stone-900 sm:text-5xl"
          >
            Built for{" "}
            <span className="home-serif text-indigo-700">serious procurement</span>
          </motion.h2>
          <motion.p variants={fadeUp} custom={2} className="mt-5 text-lg leading-relaxed text-stone-600">
            Not a retail store — industrial sales infrastructure for telecom teams
            who need precision, speed, and visibility.
          </motion.p>
          <motion.p
            variants={fadeUp}
            custom={3}
            className="home-label mt-4 text-xs font-medium uppercase tracking-widest text-stone-400"
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
                  "group relative overflow-hidden rounded-3xl border border-stone-200/80 bg-white p-6 shadow-sm transition-shadow hover:shadow-xl hover:shadow-indigo-500/5",
                  card.className
                )}
              >
                <div
                  className={cn(
                    "pointer-events-none absolute inset-0 bg-gradient-to-br opacity-60",
                    card.gradient
                  )}
                />
                <div className="relative">
                  <div
                    className={cn(
                      "flex h-11 w-11 items-center justify-center rounded-2xl text-white shadow-lg",
                      card.iconBg
                    )}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="home-label mt-5 text-lg font-bold text-stone-900">{card.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-stone-600">{card.desc}</p>
                  {card.tags && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {card.tags.map((tag) => (
                        <span
                          key={tag}
                          className="home-label rounded-full bg-stone-100 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-stone-600"
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
    <section className="relative overflow-hidden bg-[#1e1b4b] py-24 lg:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.15),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(56,189,248,0.08),transparent_50%)]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between"
        >
          <div>
            <motion.p
              variants={fadeUp}
              className="home-label text-xs font-semibold uppercase tracking-[0.3em] text-violet-300"
            >
              How it works
            </motion.p>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="mt-3 text-3xl font-bold text-white sm:text-4xl lg:text-5xl"
            >
              Catalog to{" "}
              <span className="home-serif text-violet-200">delivery</span>
            </motion.h2>
          </div>
          <motion.p
            variants={fadeUp}
            custom={2}
            className="max-w-sm text-sm leading-relaxed text-violet-200/70 lg:text-right"
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
              className="relative rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm"
            >
              <span
                className={cn(
                  "home-label inline-flex rounded-xl border px-3 py-1.5 text-sm font-bold",
                  step.color
                )}
              >
                {step.num}
              </span>
              <h3 className="home-label mt-4 text-lg font-bold text-white">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-violet-200/60">{step.desc}</p>
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
    <section className="relative overflow-hidden bg-[#020617] py-24 lg:py-32">
      <div className="absolute left-1/2 top-0 h-px w-2/3 -translate-x-1/2 bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent" />
      <div className="absolute -left-40 top-1/3 h-80 w-80 rounded-full bg-emerald-500/10 blur-[100px]" />

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
              <Sparkles className="h-4 w-4 text-emerald-400" />
              <p className="home-label text-xs font-semibold uppercase tracking-[0.3em] text-emerald-400">
                Featured catalog
              </p>
            </motion.div>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="mt-3 text-3xl font-bold text-white sm:text-4xl"
            >
              Components{" "}
              <span className="home-serif text-emerald-300">in stock</span>
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="mt-3 max-w-md text-stone-400">
              Industry-standard fiber products — quote in bulk or order directly.
            </motion.p>
          </div>
          <motion.div variants={fadeUp} custom={3}>
            <Button
              variant="outline"
              className="home-label border-emerald-500/30 bg-emerald-500/5 text-emerald-300 hover:bg-emerald-500/15 hover:text-emerald-200"
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
          <div className="mt-14 rounded-2xl border border-dashed border-white/15 py-16 text-center text-stone-500">
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
  const image = product.images[0];
  const hasPrice = product.price != null && product.price > 0;

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group relative flex h-full min-h-[380px] flex-col overflow-hidden rounded-3xl border border-emerald-500/20 bg-[#0f172a] lg:min-h-[440px]"
    >
      <div className="relative min-h-[220px] flex-1 overflow-hidden">
        {image ? (
          <Image
            src={image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 1024px) 100vw, 55vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-stone-500">No image</div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-[#0f172a]/40 to-transparent" />
        <span className="home-label absolute left-4 top-4 rounded-full bg-emerald-500/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-300 ring-1 ring-emerald-500/30">
          Spotlight
        </span>
      </div>
      <div className="relative p-6 lg:p-8">
        <p className="home-label text-[10px] font-semibold uppercase tracking-widest text-emerald-400/80">
          {product.brand}
        </p>
        <h3 className="home-label mt-2 text-xl font-bold text-white lg:text-2xl">{product.name}</h3>
        <p className="mt-1 font-mono text-xs text-stone-500">{product.sku}</p>
        <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-5">
          {hasPrice ? (
            <span className="home-label text-2xl font-bold text-white">
              ${product.price!.toFixed(2)}
            </span>
          ) : (
            <span className="home-label text-sm font-semibold text-emerald-400">Request quote</span>
          )}
          <span className="flex items-center gap-1 text-sm text-stone-400 transition-colors group-hover:text-emerald-400">
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
    <section className="py-20 lg:py-28">
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
            className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 to-indigo-800 p-8 sm:p-10"
          >
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl" />
            <p className="home-label text-xs font-semibold uppercase tracking-widest text-violet-200">
              Bulk procurement
            </p>
            <h3 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
              Start your <span className="home-serif">RFQ</span>
            </h3>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-violet-100/80">
              Add products to your quote list. No account needed — we respond within 24 hours.
            </p>
            <Button size="lg" className="home-label mt-8 bg-white text-indigo-900 hover:bg-violet-50" asChild>
              <Link href="/rfq">
                Request quotation
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </motion.div>

          <motion.div
            variants={fadeUp}
            custom={1}
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#111827] p-8 sm:p-10"
          >
            <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-cyan-500/15 blur-2xl" />
            <p className="home-label text-xs font-semibold uppercase tracking-widest text-cyan-400">
              Direct purchase
            </p>
            <h3 className="mt-3 text-2xl font-bold text-white sm:text-3xl">
              Browse <span className="home-serif text-cyan-300">catalog</span>
            </h3>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-stone-400">
              Priced items go straight to cart with full shipping capture and order tracking.
            </p>
            <Button
              size="lg"
              variant="accent"
              className="home-label mt-8 shadow-lg shadow-cyan-500/20"
              asChild
            >
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
