"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useMounted } from "@/hooks/use-mounted";
import { useQuoteCart } from "@/store/quote-cart";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/rfq", label: "Request Quote" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const mounted = useMounted();
  const itemCount = useQuoteCart((s) => s.itemCount());

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground">
            FO
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-foreground">Fiber Optics</p>
            <p className="text-xs text-muted-foreground">B2B Marketplace</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-accent",
                pathname === link.href ? "text-accent" : "text-muted-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Button variant="outline" size="sm" asChild>
          <Link href="/rfq" className="relative">
            <FileText className="h-4 w-4" />
            <span className="hidden sm:inline">Quote</span>
            {mounted && itemCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-accent text-xs text-white">
                {itemCount}
              </span>
            )}
          </Link>
        </Button>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border bg-primary text-primary-foreground">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="flex items-center gap-2">
              <LayoutGrid className="h-5 w-5" />
              <span className="font-semibold">Fiber Optics B2B</span>
            </div>
            <p className="mt-3 text-sm text-primary-foreground/70">
              Enterprise fiber optic components for ISPs, telecom, contractors, and data centers.
            </p>
          </div>
          <div>
            <h3 className="font-semibold">Quick Links</h3>
            <ul className="mt-3 space-y-2 text-sm text-primary-foreground/70">
              <li><Link href="/products" className="hover:text-white">Products</Link></li>
              <li><Link href="/rfq" className="hover:text-white">Request Quote</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold">Contact</h3>
            <p className="mt-3 text-sm text-primary-foreground/70">
              WhatsApp inquiries welcome for product details and bulk pricing.
            </p>
          </div>
        </div>
        <p className="mt-8 border-t border-primary-foreground/20 pt-6 text-center text-xs text-primary-foreground/60" suppressHydrationWarning>
          © {new Date().getFullYear()} Fiber Optics B2B Platform. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
