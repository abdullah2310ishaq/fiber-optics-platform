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
import { SITE_NAME, SITE_NAME_SHORT } from "@/lib/site/brand";
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
  { href: "/contact", label: "Contact Us" },
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
      <h3 className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
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
                className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-accent"
              >
                <span className="h-px w-0 bg-accent transition-all group-hover:w-3" />
                {link.label}
              </a>
            ) : (
              <Link
                href={link.href}
                className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-accent"
              >
                <span className="h-px w-0 bg-accent transition-all group-hover:w-3" />
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
    <footer className="relative mt-auto overflow-hidden border-t border-border bg-card text-secondary">
      <div className="dot-pattern absolute inset-0 opacity-30" />
      <div className="absolute -top-px left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
      <div className="absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-accent/5 blur-[100px]" />

      <div className="relative border-b border-border">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, ease }}
            className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between"
          >
            <div className="max-w-2xl">
              <p className="section-label">Enterprise Procurement</p>
              <h2 className="display-font mt-3 text-2xl font-bold leading-tight text-foreground sm:text-3xl lg:text-4xl">
                Ready to Source Telecom Infrastructure at Scale?
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                Submit your requirements and receive enterprise quotations for
                fiber optic products, accessories, and network deployment materials.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button variant="accent" className="h-11" asChild>
                <Link href="/rfq">
                  Submit RFQ
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" className="h-11" asChild>
                <Link href="/products">Browse Products</Link>
              </Button>
              <Button
                variant="outline"
                className="h-11 border-accent/30 text-accent hover:bg-accent/5 hover:text-accent"
                asChild
              >
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="h-4 w-4" />
                  Talk to Sales
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, ease }}
            className="lg:col-span-4"
          >
            <Link href="/" className="inline-block">
              <span className="brand-wordmark text-3xl font-semibold tracking-[0.04em] text-foreground sm:text-4xl">
                {SITE_NAME_SHORT} <span className="font-bold text-accent">Technologies</span>
              </span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Precision fiber optic components for ISPs, telecom operators,
              contractors, and data center teams — quotation-driven B2B procurement.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-3">
              {highlights.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="group flex flex-col items-center gap-2 rounded-2xl border border-border bg-background px-3 py-4 text-center transition-all duration-500 hover:border-accent/25 hover:bg-accent/5"
                >
                  <Icon className="h-5 w-5 text-accent transition-colors" />
                  <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                    {label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

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

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: 0.2, ease }}
            className="lg:col-span-3"
          >
            <h3 className="font-mono text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Contact
            </h3>
            <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-accent/70" />
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="transition-colors hover:text-accent"
                >
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <MessageCircle className="h-4 w-4 shrink-0 text-accent/70" />
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-accent"
                >
                  WhatsApp · {WHATSAPP_DISPLAY}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Cable className="h-4 w-4 shrink-0 text-accent/70" />
                <span>Mon–Fri, 9:00–18:00 GST</span>
              </li>
            </ul>

            <div className="mt-10 space-y-5 border-t border-border pt-8">
              {metrics.map((metric) => (
                <div key={metric.label}>
                  <p className="display-font text-3xl font-bold text-foreground">
                    {metric.value}
                  </p>
                  <p className="mt-0.5 text-xs text-muted-foreground">{metric.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease }}
          className="mt-14 grid gap-4 border-y border-border py-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {trustItems.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-accent/20 bg-accent/10">
                <Icon className="h-4 w-4 text-accent" />
              </span>
              <span className="text-sm font-medium text-foreground">{label}</span>
            </div>
          ))}
        </motion.div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-xs text-muted-foreground" suppressHydrationWarning>
            © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground">
            <Link href="/products" className="transition-colors hover:text-accent">
              Privacy Policy
            </Link>
            <Link href="/products" className="transition-colors hover:text-accent">
              Terms of Service
            </Link>
            <span className="hidden h-3 w-px bg-border sm:block" />
            <span>Telecom &amp; Infrastructure Procurement</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
