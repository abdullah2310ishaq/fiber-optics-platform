"use client";

import { useEffect } from "react";
import { useQuoteCart } from "@/store/quote-cart";

/** Rehydrate persisted cart after mount to avoid SSR/client HTML mismatch. */
export function CartStoreHydrator() {
  useEffect(() => {
    useQuoteCart.persist.rehydrate();
  }, []);
  return null;
}
