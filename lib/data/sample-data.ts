import type { Category, Product } from "@/types/product";

const galleryPool = [
  "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80",
  "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
  "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?w=800&q=80",
  "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80",
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800&q=80",
  "https://images.unsplash.com/photo-1597852074116-155c7e0a0c0a?w=800&q=80",
];

/** 1 main image + 3 gallery thumbnails */
function productImages(mainIndex: number): string[] {
  return [
    galleryPool[mainIndex % galleryPool.length],
    galleryPool[(mainIndex + 1) % galleryPool.length],
    galleryPool[(mainIndex + 2) % galleryPool.length],
    galleryPool[(mainIndex + 3) % galleryPool.length],
  ];
}

export const sampleCategories: Omit<Category, "id">[] = [
  { name: "Fiber Optic Cables", slug: "fiber-optic-cables", order: 1 },
  { name: "Patch Cords", slug: "patch-cords", order: 2 },
  { name: "PLC Splitters", slug: "plc-splitters", order: 3 },
  { name: "Transceivers", slug: "transceivers", order: 4 },
  { name: "ODFs & Enclosures", slug: "odfs-enclosures", order: 5 },
];

export const sampleProducts: Omit<Product, "id" | "createdAt" | "updatedAt">[] = [
  {
    name: "OS2 Single Mode Fiber Cable 12 Core",
    slug: "os2-single-mode-fiber-cable-12-core",
    sku: "FO-CAB-OS2-12C",
    brand: "FiberLink",
    categoryId: "fiber-optic-cables",
    description:
      "High-performance OS2 single mode fiber optic cable designed for long-haul backbone and ISP deployments.",
    specs: {
      fiberType: "Single Mode OS2",
      coreCount: "12",
      cableType: "Outdoor Armored",
      distance: "Up to 40km",
    },
    images: productImages(0),
    isRfqOnly: true,
    status: "active",
  },
  {
    name: "LC-LC Duplex OM4 Patch Cord 3m",
    slug: "lc-lc-duplex-om4-patch-cord-3m",
    sku: "FO-PATCH-OM4-LC-3M",
    brand: "OptiCore",
    categoryId: "patch-cords",
    description:
      "Low-loss OM4 multimode patch cord with LC connectors for data center interconnects.",
    specs: {
      fiberType: "Multimode OM4",
      connectorType: "LC-LC",
      loss: "≤0.3 dB",
      distance: "3 meters",
    },
    images: productImages(1),
    isRfqOnly: true,
    price: 24.99,
    status: "active",
  },
  {
    name: "1x8 PLC Splitter SC/APC",
    slug: "1x8-plc-splitter-sc-apc",
    sku: "FO-SPL-1X8-SC",
    brand: "NetBeam",
    categoryId: "plc-splitters",
    description:
      "Planar lightwave circuit splitter for FTTH and PON network distribution.",
    specs: {
      connectorType: "SC/APC",
      loss: "≤10.5 dB",
      coreCount: "1x8",
    },
    images: productImages(2),
    isRfqOnly: true,
    status: "active",
  },
  {
    name: "SFP+ 10G SR Transceiver",
    slug: "sfp-plus-10g-sr-transceiver",
    sku: "FO-TRX-SFP10G-SR",
    brand: "DataPort",
    categoryId: "transceivers",
    description:
      "Hot-pluggable 10Gbps SFP+ transceiver for short-range multimode fiber links.",
    specs: {
      fiberType: "Multimode",
      connectorType: "LC",
      distance: "300m on OM3",
    },
    images: productImages(3),
    isRfqOnly: true,
    price: 89,
    status: "active",
  },
  {
    name: "48 Port Fiber ODF Rack Mount",
    slug: "48-port-fiber-odf-rack-mount",
    sku: "FO-ODF-48P",
    brand: "RackPro",
    categoryId: "odfs-enclosures",
    description:
      "Standard 19-inch rack mount optical distribution frame for enterprise fiber management.",
    specs: {
      connectorType: "LC/SC compatible",
      coreCount: "48 ports",
      cableType: "Rack Mount",
    },
    images: productImages(4),
    isRfqOnly: true,
    status: "active",
  },
  {
    name: "MPO-12 OM4 Trunk Cable 10m",
    slug: "mpo-12-om4-trunk-cable-10m",
    sku: "FO-TRUNK-MPO12-10M",
    brand: "OptiCore",
    categoryId: "fiber-optic-cables",
    description:
      "High-density MPO trunk cable for data center spine-leaf architectures.",
    specs: {
      fiberType: "Multimode OM4",
      connectorType: "MPO-12",
      distance: "10 meters",
      coreCount: "12",
    },
    images: productImages(5),
    isRfqOnly: true,
    status: "active",
  },
  {
    name: "SC-SC Simplex SM Patch Cord 5m",
    slug: "sc-sc-simplex-sm-patch-cord-5m",
    sku: "FO-PATCH-SM-SC-5M",
    brand: "FiberLink",
    categoryId: "patch-cords",
    description: "Single mode simplex patch cord with SC connectors for telecom applications.",
    specs: {
      fiberType: "Single Mode",
      connectorType: "SC-SC",
      loss: "≤0.2 dB",
      distance: "5 meters",
    },
    images: productImages(6),
    isRfqOnly: true,
    price: 18.5,
    status: "active",
  },
  {
    name: "1x16 PLC Splitter Box Type",
    slug: "1x16-plc-splitter-box-type",
    sku: "FO-SPL-1X16-BOX",
    brand: "NetBeam",
    categoryId: "plc-splitters",
    description: "Box-type PLC splitter for FTTH distribution in building access networks.",
    specs: {
      connectorType: "SC/APC",
      loss: "≤13.5 dB",
      coreCount: "1x16",
    },
    images: productImages(7),
    isRfqOnly: true,
    status: "active",
  },
];

export function getSampleCategories(): Category[] {
  return sampleCategories.map((cat, index) => ({
    ...cat,
    id: cat.slug,
  }));
}

export function getSampleProducts(filters?: {
  categoryId?: string;
  search?: string;
}): Product[] {
  const now = new Date();
  let products = sampleProducts.map((product) => ({
    ...product,
    id: product.slug,
    createdAt: now,
    updatedAt: now,
  }));

  if (filters?.categoryId) {
    products = products.filter((p) => p.categoryId === filters.categoryId);
  }

  if (filters?.search) {
    const term = filters.search.toLowerCase();
    products = products.filter(
      (p) =>
        p.name.toLowerCase().includes(term) ||
        p.sku.toLowerCase().includes(term) ||
        p.brand.toLowerCase().includes(term)
    );
  }

  return products;
}

export function getSampleProductBySlug(slug: string): Product | null {
  return getSampleProducts().find((p) => p.slug === slug) ?? null;
}
