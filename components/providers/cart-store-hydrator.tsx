"use client";

import { useEffect } from "react";
import { useQuoteCart } from "@/store/quote-cart";
import { useShoppingCart } from "@/store/shopping-cart";

/** Rehydrate persisted carts after mount to avoid SSR/client HTML mismatch. */
export function CartStoreHydrator() {
  useEffect(() => {
    useQuoteCart.persist.rehydrate();
    useShoppingCart.persist.rehydrate();
  }, []);
  return null;
}
