"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  ChevronDown,
  FileText,
  Menu,
  Phone,
  ShoppingCart,
  X,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useMounted } from "@/hooks/use-mounted";
import { useQuoteCart } from "@/store/quote-cart";
import { useShoppingCart } from "@/store/shopping-cart";

const navLinks = [
  { href: "/products", label: "Products" },
  { href: "/rfq", label: "Quotation" },
  { href: "/cart", label: "Cart" },
  { href: "/track-order", label: "Track Order" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const mounted = useMounted();
  const quoteCount = useQuoteCart((s) => s.itemCount());
  const cartCount = useShoppingCart((s) => s.itemCount());
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      {/* Utility bar */}
      <div className="hidden border-b border-white/10 bg-[#061829] text-xs text-blue-100/80 sm:block">
        <div className="mx-auto flex h-9 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <p className="flex items-center gap-1.5">
            <Zap className="h-3.5 w-3.5 text-blue-400" />
            Enterprise Fiber Optics · B2B Procurement Platform
          </p>
          <p className="flex items-center gap-1.5">
            <Phone className="h-3.5 w-3.5" />
            WhatsApp &amp; bulk inquiries welcome
          </p>
        </div>
      </div>

      {/* Main nav */}
      <div className="border-b border-border bg-white/95 shadow-sm backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary shadow-md shadow-primary/20">
              <span className="text-sm font-bold text-white">FO</span>
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-bold tracking-tight text-primary">FiberOptics</p>
              <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
                Industrial B2B
              </p>
            </div>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-md px-3.5 py-2 text-sm font-medium transition-colors",
                  pathname === link.href
                    ? "bg-primary/5 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="hidden border-primary/20 text-primary hover:bg-primary/5 sm:inline-flex"
              asChild
            >
              <Link href="/rfq" className="relative">
                <FileText className="h-4 w-4" />
                RFQ
                {mounted && quoteCount > 0 && (
                  <span className="absolute -right-1.5 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-white">
                    {quoteCount}
                  </span>
                )}
              </Link>
            </Button>

            <Button variant="accent" size="sm" className="shadow-md shadow-accent/25" asChild>
              <Link href="/cart" className="relative">
                <ShoppingCart className="h-4 w-4" />
                <span className="hidden sm:inline">Cart</span>
                {mounted && cartCount > 0 && (
                  <span className="absolute -right-1.5 -top-1.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-white px-1 text-[10px] font-bold text-accent">
                    {cartCount}
                  </span>
                )}
              </Link>
            </Button>

            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border lg:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="border-t border-border bg-white px-4 py-3 lg:hidden">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "block rounded-md px-3 py-2.5 text-sm font-medium",
                  pathname === link.href ? "bg-primary/5 text-primary" : "text-muted-foreground"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-white/10 bg-[#061829] text-blue-50">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent font-bold text-white">
                FO
              </div>
              <div>
                <p className="font-bold text-white">Fiber Optics B2B</p>
                <p className="text-xs text-blue-200/60">Industrial Procurement Infrastructure</p>
              </div>
            </div>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-blue-100/70">
              Precision fiber optic components for ISPs, telecom operators, contractors, and
              data center infrastructure teams. Quotation-driven enterprise sales workflow.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-blue-200/90">
              Platform
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-blue-100/70">
              <li><Link href="/products" className="hover:text-white transition-colors">Product Catalog</Link></li>
              <li><Link href="/rfq" className="hover:text-white transition-colors">Request Quotation</Link></li>
              <li><Link href="/cart" className="hover:text-white transition-colors">Cart &amp; Shipping</Link></li>
              <li><Link href="/track-order" className="hover:text-white transition-colors">Order Tracking</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-blue-200/90">
              Enterprise
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-blue-100/70">
              <li>Bulk RFQ Pricing</li>
              <li>Technical Specifications</li>
              <li>Global Shipping</li>
              <li>WhatsApp Support</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="text-xs text-blue-200/50" suppressHydrationWarning>
            © {new Date().getFullYear()} Fiber Optics B2B Platform. All rights reserved.
          </p>
          <p className="flex items-center gap-1 text-xs text-blue-200/50">
            Built for telecom &amp; infrastructure procurement
            <ChevronDown className="h-3 w-3 rotate-[-90deg]" />
          </p>
        </div>
      </div>
    </footer>
  );
}
