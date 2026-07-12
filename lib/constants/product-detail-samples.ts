import type { SaveProductInput } from "@/lib/firestore/admin-products";

/** Reference samples — use "Load sample" in admin product form. */
export const PRODUCT_DETAIL_SAMPLES: {
  id: string;
  label: string;
  data: SaveProductInput;
}[] = [
  {
    id: "wall-mount-18u",
    label: "18U Wall Mount Cabinet (sample)",
    data: {
      name: "18U Wall Mount Cabinet",
      slug: "18u-wall-mount-cabinet",
      sku: "AN-WM18U600X600",
      brand: "Avalon",
      categoryId: "odfs-enclosures",
      description:
        "Compact wall-mount rack cabinet for structured cabling and network equipment. Optimized for easy installation, cable management, and airflow in space-constrained environments.",
      dimensions: {
        type: "19 inch standard",
        size: "18U",
        width: "600 mm",
        height: "945 mm",
        depth: "600 mm",
        grossWeight: "36 KG (Including the packaging)",
        netWeight: "33 KG",
      },
      cabinetFeatures: `• 19" mounting angles
• Front glass door with lock and handle
• Rear perforated metal door with lock
• Both the doors can be mounted to be opening from either side
• Lock on the front door with handle and rear door with duplicate keys
• Removable side panels
• Adjustable jacking feet
• Four fans fitted in a fan tray with cable for connection
• Extra cage nuts provided (30 Pieces)
• Earthing screws`,
      technicalSpecifications: `• All steel construction
• Frame made of 1.2 mm thick SPCC
• Fixed shelves made of 1.2 mm thick SPCC (Optional)
• Mounting angles made of 2.0 mm thick steel
• Strong structure of individually fabricated components
• Manufactured using CNC machine
• Surface Finish: Matt Black Epoxy Powder Coated Paint (RAL 9005)
## Power Distribution and Cooling fan
• Max Current: 13 Amps
• Max Output Power: 3250 Watts
• Rated voltage: 200 - 250 Volts 50-60 HZ
• Six Outlet UK Type
• Cooling Fan: Lower noise, Less than 48db, Air flow 50 - 110 CBM/H`,
      orderingInformation: [
        {
          size: "18U",
          width: "600 mm",
          depth: "600 mm",
          partNo: "AN-WM18U600X600",
        },
      ],
      isRfqOnly: true,
      stockStatus: "in_stock",
    },
  },
  {
    id: "floor-standing-15u",
    label: "15U Floor Standing Rack (sample)",
    data: {
      name: "15U 600 x 1000 - Floor Standing Rack",
      slug: "15u-floor-standing-rack",
      sku: "AN-FS15U600X1000",
      brand: "Avalon",
      categoryId: "odfs-enclosures",
      description:
        "Avalon Cabinets are feature-rich rack enclosures optimized for easy installation, managing cables, integrating power distribution, and maximizing airflow. These racks are multi-functional rack enclosures designed to meet current IT market trends and applications ranging from high density computing and networking to broadcast and audio-video.",
      dimensions: {
        type: "19 inch standard",
        size: "15U",
        width: "600 mm",
        height: "860 mm",
        depth: "1000 mm",
        grossWeight: "65 Kg (Including the packaging)",
        netWeight: "62 Kg",
      },
      cabinetFeatures: `• 19" mounting angles
• Front glass door with lock and handle
• Rear perforated metal door with lock
• Both the doors can be mounted to be opening from either side
• Lock on the front door with handle and rear door with duplicate keys
• Removable side panels
• Adjustable jacking feet
• Four fans fitted in a fan tray with cable for connection
• Extra cage nuts provided (30 Pieces)
• Earthing screws`,
      technicalSpecifications: `• All steel construction
• Frame made of 1.2 mm thick SPCC
• Fixed shelves made of 1.2 mm thick SPCC (Optional)
• Mounting angles made of 2.0 mm thick steel
• Strong structure of individually fabricated components
• Manufactured using CNC machine
• Surface Finish: Matt Black Epoxy Powder Coated Paint (RAL 9005)
## Power Distribution and Cooling fan
• Max Current: 13 Amps
• Max Output Power: 3250 Watts
• Rated voltage: 200 - 250 Volts 50-60 HZ
• Six Outlet UK Type
• Cooling Fan: Lower noise, Less than 48db, Air flow 50 - 110 CBM/H`,
      orderingInformation: [
        {
          size: "15U",
          width: "600 mm",
          depth: "1000 mm",
          partNo: "AN-FS15U600X1000",
        },
      ],
      isRfqOnly: true,
      stockStatus: "in_stock",
    },
  },
];
