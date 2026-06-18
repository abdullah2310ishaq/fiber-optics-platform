"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import {
  ArrowRightIcon,
  CheckBadgeIcon,
  DispatchIcon,
  DualFlowIcon,
  FastResponseIcon,
  FiberCableIcon,
  LifecycleIcon,
  QuotationIcon,
  RfqDocumentIcon,
  ShieldWorkflowIcon,
  SpecSheetIcon,
} from "@/components/icons/fiber-icons";
import { ProductCard } from "@/components/public/product-card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Product } from "@/types/product";

const ease = [0.22, 1, 0.36, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 48 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease },
  }),
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const trustItems = [
  { icon: ShieldWorkflowIcon, text: "Enterprise RFQ Workflow" },
  { icon: SpecSheetIcon, text: "Technical Spec Sheets" },
  { icon: QuotationIcon, text: "Quotation Management" },
  { icon: DispatchIcon, text: "Dispatch Tracking" },
];

const capabilities = [
  {
    icon: DualFlowIcon,
    title: "Dual Commerce Flow",
    desc: "Separate quotation pipeline for bulk RFQ and cart checkout with full shipping capture.",
    accent: "from-violet-500/20 to-fuchsia-500/10",
  },
  {
    icon: LifecycleIcon,
    title: "Lifecycle Visibility",
    desc: "Track orders from pending through dispatch, in-transit, and delivery in real time.",
    accent: "from-cyan-500/20 to-blue-500/10",
  },
  {
    icon: FastResponseIcon,
    title: "24h RFQ Response",
    desc: "Submit your bill of materials and receive competitive pricing within one business day.",
    accent: "from-amber-500/20 to-orange-500/10",
  },
];

const catalogTags = [
  "OS2 / OM4 / OM5",
  "PLC Splitters & ODFs",
  "Patch Cords & Trunks",
  "FTTH Ready",
];

const steps = [
  { step: "01", title: "Browse", desc: "Filter by category, specs, and fiber type." },
  { step: "02", title: "Quote or Order", desc: "Add to RFQ for bulk pricing or cart for direct purchase." },
  { step: "03", title: "Confirm", desc: "Review specs, quantities, and shipping details." },
  { step: "04", title: "Track", desc: "Monitor dispatch and delivery status live." },
];

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <motion.span
      variants={fadeUp}
      className="inline-flex items-center gap-2 font-mono text-[11px] font-medium uppercase tracking-[0.25em] text-accent"
    >
      <span className="h-px w-8 bg-accent/60" />
      {children}
    </motion.span>
  );
}

function TrustMarquee() {
  const items = [...trustItems, ...trustItems];

  return (
    <section className="relative overflow-hidden border-b border-slate-800 bg-slate-950 py-4">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-slate-950 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-slate-950 to-transparent" />
      <div className="marquee-track flex w-max gap-12 px-6">
        {items.map(({ icon: Icon, text }, i) => (
          <div
            key={`${text}-${i}`}
            className="flex shrink-0 items-center gap-3 text-sm font-medium text-slate-300"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-cyan-500/30 bg-cyan-500/10">
              <Icon className="text-cyan-400" size={16} />
            </span>
            {text}
          </div>
        ))}
      </div>
    </section>
  );
}

function WhySection() {
  return (
    <section className="relative overflow-hidden bg-slate-950 py-28 text-white">
      <div className="dot-pattern absolute inset-0 opacity-40" />
      <div className="absolute -left-32 top-20 h-96 w-96 rounded-full bg-cyan-500/10 blur-[120px]" />
      <div className="absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-teal-500/10 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            variants={stagger}
            className="lg:sticky lg:top-28 lg:self-start"
          >
            <SectionEyebrow>Why us</SectionEyebrow>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="display-font mt-6 text-4xl font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl"
            >
              Built for
              <br />
              <span className="bg-gradient-to-r from-cyan-300 to-teal-400 bg-clip-text text-transparent">
                serious
              </span>{" "}
              procurement
            </motion.h2>
            <motion.p
              variants={fadeUp}
              custom={2}
              className="mt-6 max-w-md text-base leading-relaxed text-slate-400"
            >
              Not a retail store — a structured industrial sales infrastructure
              designed for telecom teams who need precision, speed, and visibility.
            </motion.p>
            <motion.div variants={fadeUp} custom={3} className="mt-10 hidden lg:block">
              <div className="h-px w-24 bg-gradient-to-r from-cyan-400 to-transparent" />
              <p className="mt-4 font-mono text-xs uppercase tracking-widest text-slate-500">
                Trusted by ISPs · Contractors · Data Centers
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="space-y-5"
          >
            <motion.div
              variants={fadeUp}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] p-8 sm:p-10"
            >
              <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-cyan-500/20 blur-3xl transition-all duration-700 group-hover:bg-cyan-500/30" />
              <div className="relative flex flex-col gap-6 sm:flex-row sm:items-start">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-teal-500 shadow-lg shadow-cyan-500/30">
                  <FiberCableIcon className="text-white" size={28} />
                </div>
                <div>
                  <h3 className="display-font text-2xl font-bold">Deep Technical Catalog</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-400">
                    Every component ships with full specifications — fiber type,
                    connector, insertion loss, distance rating, and core count.
                    Built for engineers who need facts, not marketing fluff.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {catalogTags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-300"
                      >
                        <CheckBadgeIcon className="text-cyan-400" size={14} />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="grid gap-5 sm:grid-cols-3">
              {capabilities.map((cap, i) => (
                <motion.div
                  key={cap.title}
                  variants={fadeUp}
                  custom={i}
                  whileHover={{ y: -6, transition: { duration: 0.25 } }}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6"
                >
                  <div
                    className={cn(
                      "absolute inset-0 bg-gradient-to-br opacity-0 transition-opacity duration-500 group-hover:opacity-100",
                      cap.accent
                    )}
                  />
                  <div className="relative">
                    <cap.icon className="text-cyan-400" size={24} />
                    <h3 className="display-font mt-4 text-lg font-bold leading-snug">{cap.title}</h3>
                    <p className="mt-2 text-xs leading-relaxed text-slate-400">{cap.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
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
    offset: ["start end", "end start"],
  });
  const lineScale = useTransform(scrollYProgress, [0.1, 0.7], [0, 1]);

  return (
    <section ref={ref} className="relative overflow-hidden bg-[#f8fafc] py-28">
      <div className="enterprise-grid absolute inset-0" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="mx-auto max-w-2xl text-center"
        >
          <SectionEyebrow>Workflow</SectionEyebrow>
          <motion.h2
            variants={fadeUp}
            custom={1}
            className="display-font mt-5 text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
          >
            From catalog to delivery
          </motion.h2>
          <motion.p variants={fadeUp} custom={2} className="mt-4 text-muted-foreground">
            A streamlined procurement workflow in four steps.
          </motion.p>
        </motion.div>

        <div className="relative mt-20 hidden lg:block">
          <div className="absolute left-0 right-0 top-8 h-px bg-border" />
          <motion.div
            style={{ scaleX: lineScale, transformOrigin: "left" }}
            className="absolute left-0 right-0 top-8 h-px bg-gradient-to-r from-cyan-500 via-teal-400 to-cyan-500"
          />
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="grid grid-cols-4 gap-6"
          >
            {steps.map((item, i) => (
              <motion.div key={item.step} variants={fadeUp} custom={i} className="relative pt-16">
                <motion.div
                  whileHover={{ scale: 1.08 }}
                  className="absolute left-0 top-0 flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-cyan-500/30 bg-white shadow-lg shadow-cyan-500/10"
                >
                  <span className="display-font text-lg font-bold text-cyan-600">{item.step}</span>
                </motion.div>
                <h3 className="display-font text-xl font-bold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="mt-12 space-y-0 lg:hidden"
        >
          {steps.map((item, i) => (
            <motion.div key={item.step} variants={fadeUp} custom={i} className="relative flex gap-6 pb-10">
              {i < steps.length - 1 && (
                <div className="absolute left-7 top-16 bottom-0 w-px bg-border" />
              )}
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border-2 border-cyan-500/30 bg-white shadow-md">
                <span className="display-font font-bold text-cyan-600">{item.step}</span>
              </div>
              <div className="pt-2">
                <h3 className="display-font text-lg font-bold">{item.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function FeaturedSection({ products }: { products: Product[] }) {
  const [hero, ...rest] = products;

  return (
    <section className="relative overflow-hidden bg-white py-28">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={stagger}
          className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"
        >
          <div className="max-w-xl">
            <SectionEyebrow>Catalog</SectionEyebrow>
            <motion.h2
              variants={fadeUp}
              custom={1}
              className="display-font mt-5 text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
            >
              Featured
              <br />
              Components
            </motion.h2>
            <motion.p variants={fadeUp} custom={2} className="mt-4 text-muted-foreground">
              Industry-standard fiber optic products available for quotation and direct order.
            </motion.p>
          </div>
          <motion.div variants={fadeUp} custom={3}>
            <Button variant="outline" className="group h-12 px-6" asChild>
              <Link href="/products">
                View Full Catalog
                <ArrowRightIcon className="transition-transform group-hover:translate-x-1" size={16} />
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        {products.length === 0 ? (
          <div className="mt-14 rounded-2xl border border-dashed border-border p-16 text-center text-muted-foreground">
            No products found.
          </div>
        ) : (
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={stagger}
            className="mt-14 grid gap-6 lg:grid-cols-12"
          >
            {hero && (
              <motion.div variants={fadeUp} className="lg:col-span-7">
                <FeaturedHeroCard product={hero} />
              </motion.div>
            )}
            <div className="grid gap-6 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1">
              {rest.slice(0, 2).map((product, i) => (
                <motion.div key={product.id} variants={fadeUp} custom={i}>
                  <ProductCard product={product} variant="elevated" />
                </motion.div>
              ))}
            </div>
            {rest.slice(2).map((product, i) => (
              <motion.div key={product.id} variants={fadeUp} custom={i} className="lg:col-span-4">
                <ProductCard product={product} variant="elevated" />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </section>
  );
}

function FeaturedHeroCard({ product }: { product: Product }) {
  const image = product.images[0];
  const hasPrice = product.price != null && product.price > 0;

  return (
    <motion.article
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease }}
      className="group relative h-full min-h-[420px] overflow-hidden rounded-3xl border border-border bg-slate-950"
    >
      <Link href={`/products/${product.slug}`} className="flex h-full flex-col lg:flex-row">
        <div className="relative min-h-[240px] flex-1 overflow-hidden lg:min-h-full">
          {image ? (
            <Image
              src={image}
              alt={product.name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-muted text-muted-foreground">
              No image
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-slate-950/80" />
        </div>

        <div className="relative flex flex-col justify-center p-8 lg:w-[45%] lg:p-10">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-cyan-400">
            {product.brand}
          </p>
          <h3 className="display-font mt-3 text-2xl font-bold leading-tight text-white lg:text-3xl">
            {product.name}
          </h3>
          <p className="mt-1 font-mono text-xs text-slate-500">{product.sku}</p>
          <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-slate-400">
            {product.description}
          </p>
          <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-6">
            {hasPrice ? (
              <span className="display-font text-2xl font-bold text-white">
                ${product.price!.toFixed(2)}
              </span>
            ) : (
              <span className="text-sm font-semibold text-cyan-400">Request Quote</span>
            )}
            <span className="flex items-center gap-1 text-sm font-medium text-slate-400 transition-colors group-hover:text-cyan-400">
              View specs
              <ArrowRightIcon className="transition-transform group-hover:translate-x-1" size={16} />
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

function CtaSection() {
  return (
    <section className="relative overflow-hidden py-28">
      <div className="cta-gradient absolute inset-0" />
      <div className="dot-pattern absolute inset-0 opacity-30" />

      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-80px" }}
        variants={stagger}
        className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8"
      >
        <motion.div
          variants={fadeUp}
          className="mx-auto mb-8 inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-cyan-400/30 bg-cyan-400/10"
        >
          <RfqDocumentIcon className="text-cyan-400" size={28} />
        </motion.div>
        <motion.h2
          variants={fadeUp}
          custom={1}
          className="display-font text-4xl font-bold tracking-tight text-white sm:text-5xl"
        >
          Ready to build your RFQ?
        </motion.h2>
        <motion.p variants={fadeUp} custom={2} className="mx-auto mt-5 max-w-lg text-slate-400">
          Add products to your quotation list or cart. No account required — we
          respond within 24 hours.
        </motion.p>
        <motion.div
          variants={fadeUp}
          custom={3}
          className="mt-10 flex flex-wrap justify-center gap-4"
        >
          <Button
            size="lg"
            variant="accent"
            className="h-12 px-8 shadow-lg shadow-cyan-500/25"
            asChild
          >
            <Link href="/rfq">
              Start Quotation
              <ArrowRightIcon size={16} />
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="h-12 border-white/20 bg-white/5 px-8 text-white hover:bg-white/10"
            asChild
          >
            <Link href="/products">Browse Products</Link>
          </Button>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease }}
        className="pointer-events-none absolute -bottom-32 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-cyan-500/20 blur-[100px]"
      />
    </section>
  );
}

interface HomeSectionsProps {
  products: Product[];
}

export function HomeSections({ products }: HomeSectionsProps) {
  return (
    <>
      <TrustMarquee />
      <WhySection />
      <ProcessSection />
      <FeaturedSection products={products} />
      <CtaSection />
    </>
  );
}
