/**
 * Seed Firestore with sample categories and products.
 * Run: npx tsx scripts/seed-products.ts
 *
 * Requires FIREBASE_ADMIN_* env vars in .env.local
 */
import { readFileSync } from "fs";
import { resolve } from "path";
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getFirestore, Timestamp } from "firebase-admin/firestore";
import { sampleCategories, sampleProducts } from "../lib/data/sample-data";

function loadEnv() {
  try {
    const envPath = resolve(process.cwd(), ".env.local");
    const content = readFileSync(envPath, "utf-8");
    for (const line of content.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eq = trimmed.indexOf("=");
      if (eq === -1) continue;
      const key = trimmed.slice(0, eq);
      const value = trimmed.slice(eq + 1);
      if (!process.env[key]) process.env[key] = value;
    }
  } catch {
    // .env.local optional if vars already set
  }
}

async function main() {
  loadEnv();

  const projectId = process.env.FIREBASE_ADMIN_PROJECT_ID;
  const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
  const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!projectId || !clientEmail || !privateKey) {
    console.error(
      "Missing FIREBASE_ADMIN_PROJECT_ID, FIREBASE_ADMIN_CLIENT_EMAIL, or FIREBASE_ADMIN_PRIVATE_KEY"
    );
    process.exit(1);
  }

  if (!getApps().length) {
    initializeApp({
      credential: cert({ projectId, clientEmail, privateKey }),
    });
  }

  const db = getFirestore();
  const now = Timestamp.now();

  console.log("Seeding categories...");
  for (const category of sampleCategories) {
    await db.collection("categories").doc(category.slug).set({
      ...category,
      createdAt: now,
      updatedAt: now,
    });
    console.log(`  + ${category.name}`);
  }

  console.log("Seeding products...");
  for (const product of sampleProducts) {
    await db.collection("products").doc(product.slug).set({
      ...product,
      createdAt: now,
      updatedAt: now,
    });
    console.log(`  + ${product.name}`);
  }

  console.log("Done.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
