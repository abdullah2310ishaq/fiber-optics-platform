"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  Cable,
  FileSpreadsheet,
  FileText,
  Globe,
  Mail,
  MessageCircle,
  PackageSearch,
  ShieldCheck,
  Truck,
  Workflow,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CONTACT_EMAIL, WHATSAPP_DISPLAY, WHATSAPP_URL } from "@/lib/site/contact";

const ease = [0.22, 1, 0.36, 1] as const;

const productLinks = [
  { href: "/products", label: "Fiber Cables" },
  { href: "/products", label: "Patch Cords" },
  { href: "/products", label: "PLC Splitters" },
  { href: "/products", label: "ODF" },
  { href: "/products", label: "Closures" },
  { href: "/products", label: "Accessories" },
];

const companyLinks = [
  { href: "/products", label: "About" },
  { href: WHATSAPP_URL, label: "Contact Us", external: true },
  { href: "/rfq", label: "RFQ" },
  { href: "/track-order", label: "Tracking" },
];

const resourceLinks = [
  { href: "/products", label: "Technical Specs" },
  { href: "/products", label: "Datasheets" },
  { href: "/products", label: "Installation Guides" },
  { href: "/rfq", label: "FAQ" },
];

const highlights = [
  { icon: FileSpreadsheet, label: "Spec Sheets" },
  { icon: FileText, label: "RFQ Pipeline" },
  { icon: Truck, label: "Live Tracking" },
  { icon: Workflow, label: "Order Lifecycle" },
];

const trustItems = [
  { icon: Globe, label: "Global Shipping" },
  { icon: PackageSearch, label: "Bulk Procurement" },
  { icon: ShieldCheck, label: "Enterprise RFQ" },
  { icon: Building2, label: "Technical Support" },
];

const metrics = [
  { value: "10K+", label: "Products Available" },
  { value: "50+", label: "Countries Served" },
  { value: "24/7", label: "Quotation Support" },
];

function FooterLinkColumn({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string; external?: boolean }[];
}) {
  return (
    <div>
      <h3 className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-slate-500">
        {title}
      </h3>
      <ul className="mt-5 space-y-3">
        {links.map((link) => (
          <li key={link.label}>
            {link.external ? (
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-cyan-400"
              >
                <span className="h-px w-0 bg-cyan-400 transition-all group-hover:w-3" />
                {link.label}
              </a>
            ) : (
              <Link
                href={link.href}
                className="group inline-flex items-center gap-2 text-sm text-slate-400 transition-colors hover:text-cyan-400"
              >
                <span className="h-px w-0 bg-cyan-400 transition-all group-hover:w-3" />
                {link.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="relative mt-auto overflow-hidden border-t border-border bg-background text-secondary">
      <div className="dot-pattern absolute inset-0 opacity-20" />
      <div className="absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
      <div className="absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-cyan-500/10 blur-[100px]" />
      <div className="absolute -right-24 top-1/3 h-64 w-64 rounded-full bg-teal-500/10 blur-[90px]" />

      {/* Animated fiber-light sweep */}
      <motion.div
        className="pointer-events-none absolute inset-0 opacity-60"
        animate={{ backgroundPosition: ["0% 0%", "200% 200%"] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        style={{
          backgroundImage:
            "linear-gradient(90deg, transparent, rgba(6,182,212,0.12), transparent)",
          backgroundSize: "50% 100%",
        }}
      />

      {/* CTA */}
      <div className="relative border-b border-white/10">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, ease }}
            className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between"
          >
            <div className="max-w-2xl">
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-cyan-400">
                Enterprise Procurement
              </p>
              <h2 className="display-font mt-3 text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-4xl">
                Ready to Source Telecom Infrastructure at Scale?
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-slate-400 sm:text-base">
                Submit your requirements and receive enterprise quotations for
                fiber optic products, accessories, and network deployment materials.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button
                variant="accent"
                className="h-11 shadow-lg shadow-cyan-500/20"
                asChild
              >
                <Link href="/rfq">
                  Submit RFQ
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                variant="outline"
                className="h-11 border-white/15 bg-white/5 text-white hover:bg-white/10"
                asChild
              >
                <Link href="/products">Browse Products</Link>
              </Button>
              <Button
                variant="outline"
                className="h-11 border-cyan-500/30 bg-cyan-500/5 text-cyan-300 hover:bg-cyan-500/10 hover:text-cyan-200"
                asChild
              >
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="h-4 w-4" />
                  Talk to Sales
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          {/* Brand + highlights */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, ease }}
            className="lg:col-span-4"
          >
            <Link href="/" className="inline-block">
              <span className="brand-wordmark text-3xl font-semibold tracking-[0.04em] text-white sm:text-4xl">
                Fiber{" "}
                <span className="bg-gradient-to-r from-cyan-300 to-teal-400 bg-clip-text font-bold text-transparent">
                  Optics
                </span>
              </span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-slate-400">
              Precision fiber optic components for ISPs, telecom operators,
              contractors, and data center teams — quotation-driven B2B procurement.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-3">
              {highlights.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="group flex flex-col items-center gap-2 rounded-2xl border border-white/5 bg-gradient-to-b from-white/[0.06] to-white/[0.02] px-3 py-4 text-center backdrop-blur-xl transition-all duration-500 hover:border-cyan-500/30 hover:bg-cyan-500/[0.05]"
                >
                  <Icon className="h-5 w-5 text-cyan-400 transition-colors group-hover:text-cyan-300" />
                  <span className="text-[10px] font-medium uppercase tracking-wider text-slate-500 group-hover:text-slate-400">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Link columns */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: 0.1, ease }}
            className="grid gap-10 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-3"
          >
            <FooterLinkColumn title="Products" links={productLinks} />
            <FooterLinkColumn title="Company" links={companyLinks} />
            <FooterLinkColumn title="Resources" links={resourceLinks} />
          </motion.div>

          {/* Metrics + contact */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: 0.2, ease }}
            className="lg:col-span-3"
          >
            <h3 className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-slate-500">
              Contact
            </h3>
            <ul className="mt-5 space-y-3 text-sm text-slate-400">
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-cyan-500/70" />
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="transition-colors hover:text-cyan-400"
                >
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MessageCircle className="h-4 w-4 shrink-0 text-cyan-500/70" />
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-cyan-400"
                >
                  WhatsApp · {WHATSAPP_DISPLAY}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Cable className="h-4 w-4 shrink-0 text-cyan-500/70" />
                <span>Mon–Fri, 9:00–18:00 GST</span>
              </li>
            </ul>

            <div className="mt-10 space-y-5 border-t border-white/10 pt-8">
              {metrics.map((metric) => (
                <div key={metric.label}>
                  <p className="display-font text-3xl font-bold text-white">
                    {metric.value}
                  </p>
                  <p className="mt-0.5 text-xs text-slate-500">{metric.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Trust bar */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease }}
          className="mt-14 grid gap-4 border-y border-white/10 py-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {trustItems.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-cyan-500/20 bg-cyan-500/10">
                <Icon className="h-4 w-4 text-cyan-400" />
              </span>
              <span className="text-sm font-medium text-slate-300">{label}</span>
            </div>
          ))}
        </motion.div>

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-slate-600" suppressHydrationWarning>
            © {new Date().getFullYear()} Fiber Optics. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-slate-600">
            <Link href="/products" className="transition-colors hover:text-cyan-400">
              Privacy Policy
            </Link>
            <Link href="/products" className="transition-colors hover:text-cyan-400">
              Terms of Service
            </Link>
            <span className="hidden h-3 w-px bg-white/10 sm:block" />
            <span>Telecom &amp; Infrastructure Procurement</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
