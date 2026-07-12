"use client";

import { getAuth } from "firebase/auth";
import { getAnalytics, isSupported, type Analytics } from "firebase/analytics";
import { getFirebaseApp } from "./configuration";
import { getDb } from "./firestore";

const app = getFirebaseApp();

export const auth = getAuth(app);
export const db = getDb();

let analyticsInstance: Analytics | null = null;

export async function getFirebaseAnalytics(): Promise<Analytics | null> {
  if (analyticsInstance) {
    return analyticsInstance;
  }
  if (typeof window === "undefined") {
    return null;
  }
  const supported = await isSupported();
  if (!supported) {
    return null;
  }
  analyticsInstance = getAnalytics(app);
  return analyticsInstance;
}
