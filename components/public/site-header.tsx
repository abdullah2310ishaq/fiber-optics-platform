"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  CartIcon,
  CloseIcon,
  MenuIcon,
  QuotationIcon,
} from "@/components/icons/fiber-icons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useMounted } from "@/hooks/use-mounted";
import { useQuoteCart } from "@/store/quote-cart";
import { useShoppingCart } from "@/store/shopping-cart";

type NavLink =
  | { href: string; label: string; external?: false }
  | { href: string; label: string; external: true };

const navLinks: NavLink[] = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/rfq", label: "Quotation" },
  { href: "/cart", label: "Cart" },
  { href: "/track-order", label: "Track Order" },
  { href: "/contact", label: "Contact Us" },
];

function isNavActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

function NavItem({
  link,
  pathname,
  transparent,
  className,
}: {
  link: NavLink;
  pathname: string;
  transparent: boolean;
  className?: string;
}) {
  const active = !link.external && isNavActive(pathname, link.href);
  const itemClass = cn(
    "rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200",
    active
      ? "bg-cyan-400/15 text-cyan-300"
      : transparent
        ? "text-slate-300 hover:bg-white/10 hover:text-white"
        : "text-slate-300 hover:bg-white/10 hover:text-white",
    className
  );

  if (link.external) {
    return (
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className={itemClass}
      >
        {link.label}
      </a>
    );
  }

  return (
    <Link href={link.href} className={itemClass}>
      {link.label}
    </Link>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const mounted = useMounted();
  const quoteCount = useQuoteCart((s) => s.itemCount());
  const cartCount = useShoppingCart((s) => s.itemCount());
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const transparent = isHome && !scrolled && !mobileOpen;

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        transparent
          ? "border-b border-white/10 bg-transparent"
          : "border-b border-white/10 bg-background/80 shadow-lg shadow-black/20 backdrop-blur-xl"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:h-[4.5rem] lg:px-8">
        <Link href="/" className="group shrink-0">
          <span
            className={cn(
              "brand-wordmark text-2xl font-semibold tracking-[0.04em] transition-colors sm:text-[1.65rem]",
              transparent ? "text-white" : "text-white"
            )}
          >
            Fiber{" "}
            <span className="bg-gradient-to-r from-cyan-300 to-teal-400 bg-clip-text font-bold text-transparent">
              Optics
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <NavItem
              key={link.label}
              link={link}
              pathname={pathname}
              transparent={transparent}
            />
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "hidden sm:inline-flex",
              transparent
                ? "text-slate-200 hover:bg-white/10 hover:text-white"
                : "text-slate-200 hover:bg-white/10 hover:text-white"
            )}
            asChild
          >
            <Link href="/rfq" className="relative">
              <QuotationIcon size={16} />
              RFQ
              {mounted && quoteCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-cyan-400 px-1 text-[10px] font-bold text-slate-950">
                  {quoteCount}
                </span>
              )}
            </Link>
          </Button>

          <Button
            size="sm"
            className="bg-gradient-to-r from-cyan-500 to-teal-500 text-white shadow-md shadow-cyan-500/25 hover:from-[#22D3EE] hover:to-teal-400"
            asChild
          >
            <Link href="/cart" className="relative">
              <CartIcon size={16} />
              <span className="hidden sm:inline">Cart</span>
              {mounted && cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-white px-1 text-[10px] font-bold text-slate-900">
                  {cartCount}
                </span>
              )}
            </Link>
          </Button>

          <button
            type="button"
            className={cn(
              "inline-flex h-9 w-9 items-center justify-center rounded-lg border transition-colors lg:hidden",
              transparent
                ? "border-white/20 text-white hover:bg-white/10"
                : "border-white/15 text-white hover:bg-white/10"
            )}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <CloseIcon size={20} /> : <MenuIcon size={20} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-white/10 bg-background/95 px-4 py-4 backdrop-blur-xl lg:hidden">
          {navLinks.map((link) => (
            <NavItem
              key={link.label}
              link={link}
              pathname={pathname}
              transparent={transparent}
              className="block py-3"
            />
          ))}
        </div>
      )}
    </header>
  );
}
