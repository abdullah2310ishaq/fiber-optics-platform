"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon } from "@/components/icons/fiber-icons";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const slides = [
  {
    image:
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1920&q=80&auto=format&fit=crop",
    alt: "Server room with fiber optic cabling",
    label: "Data Center Infrastructure",
  },
  {
    image:
      "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1920&q=80&auto=format&fit=crop",
    alt: "Network operations center",
    label: "Telecom Operations",
  },
  {
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80&auto=format&fit=crop",
    alt: "Global connectivity visualization",
    label: "Global Connectivity",
  },
  {
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=80&auto=format&fit=crop",
    alt: "Fiber optic cable installation",
    label: "Field Deployment",
  },
  {
    image:
      "https://images.unsplash.com/photo-1513828583688-c52646db42da?w=1920&q=80&auto=format&fit=crop",
    alt: "High-speed network technology",
    label: "Enterprise Networks",
  },
];

const rotatingWords = [
  "Modern Networks",
  "Data Centers",
  "FTTH Deployments",
  "Telecom Infrastructure",
  "ISP Backbone",
];

const INTERVAL_MS = 5500;

export function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const goTo = useCallback((index: number) => {
    setCurrent((prev) => {
      if (index === prev) return prev;
      return ((index % slides.length) + slides.length) % slides.length;
    });
  }, []);

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  useEffect(() => {
    const timer = setInterval(next, INTERVAL_MS);
    return () => clearInterval(timer);
  }, [next]);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsAnimating(true);
      setTimeout(() => {
        setWordIndex((i) => (i + 1) % rotatingWords.length);
        setIsAnimating(false);
      }, 300);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-[92vh] overflow-hidden">
      {/* Background slides */}
      {slides.map((slide, i) => (
        <div
          key={slide.image}
          className={cn(
            "absolute inset-0 transition-opacity duration-1000 ease-in-out",
            i === current ? "opacity-100" : "opacity-0"
          )}
        >
          <Image
            src={slide.image}
            alt={slide.alt}
            fill
            priority={i === 0}
            loading={i === 0 ? "eager" : "lazy"}
            className="object-cover"
            sizes="100vw"
          />
        </div>
      ))}

      {/* Overlays */}
      <div className="hero-gradient absolute inset-0" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(34,211,238,0.15),transparent_55%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_80%_80%,rgba(15,23,42,0.4),transparent_50%)]" />

      {/* Content */}
      <div className="relative mx-auto flex min-h-[92vh] max-w-7xl flex-col justify-center px-4 py-28 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-1.5 backdrop-blur-md">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
              {slides[current].label}
            </span>
          </div>

          <h1 className="display-font text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-7xl">
            Industrial Fiber Optics
            <br />
            for{" "}
            <span
              className={cn(
                "inline-block bg-gradient-to-r from-cyan-300 via-cyan-400 to-teal-300 bg-clip-text text-transparent transition-all duration-300",
                isAnimating ? "translate-y-2 opacity-0" : "translate-y-0 opacity-100"
              )}
            >
              {rotatingWords[wordIndex]}
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300/90 sm:text-xl">
            Precision components for ISPs, contractors, and data centers. Browse
            technical catalogs, submit bulk RFQs, and track orders — all in one
            platform.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Button
              size="lg"
              variant="accent"
              className="h-12 px-8 shadow-lg shadow-cyan-500/25"
              asChild
            >
              <Link href="/products">
                Explore Catalog
                <ArrowRightIcon size={16} />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-12 border-white/25 bg-white/10 px-8 text-white backdrop-blur-sm hover:bg-white/20"
              asChild
            >
              <Link href="/rfq">Request Quotation</Link>
            </Button>
          </div>

          <div className="mt-14 grid grid-cols-3 gap-6 border-t border-white/15 pt-8 sm:max-w-lg">
            {[
              { value: "500+", label: "SKUs" },
              { value: "24h", label: "RFQ Response" },
              { value: "Global", label: "Shipping" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl font-bold text-white sm:text-3xl">{stat.value}</p>
                <p className="mt-0.5 text-[11px] font-medium uppercase tracking-widest text-slate-400">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel controls */}
        <div className="absolute bottom-8 left-4 right-4 flex items-center justify-between sm:left-6 sm:right-6 lg:left-8 lg:right-8">
          <div className="flex gap-2">
            {slides.map((_, i) => (
              <button
                key={slides[i].image}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={cn(
                  "h-1 rounded-full transition-all duration-500",
                  i === current
                    ? "w-8 bg-cyan-400"
                    : "w-4 bg-white/30 hover:bg-white/50"
                )}
              />
            ))}
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={prev}
              aria-label="Previous slide"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20"
            >
              <ChevronLeftIcon size={20} />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next slide"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-white/20"
            >
              <ChevronRightIcon size={20} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
