import { CONTACT_EMAIL, WHATSAPP_DISPLAY } from "@/lib/site/contact";

export interface ChatMessage {
  id: string;
  role: "user" | "bot";
  content: string;
  timestamp: Date;
}

export interface ChatReply {
  content: string;
  suggestions: string[];
}

export interface KnowledgeEntry {
  id: string;
  keywords: string[];
  suggestions: string[];
  answer: string;
}

export const CHATBOT_WELCOME: ChatReply = {
  content: `Hi! I'm the **Fiber Optics Assistant** — here to help with our catalog, RFQs, orders, and technical questions.

We supply enterprise-grade fiber components for ISPs, contractors, and data centers. What would you like to know?`,
  suggestions: [
    "What products do you sell?",
    "How does RFQ work?",
    "Fiber types OS2 vs OM4",
    "How to track my order?",
    "Contact support",
  ],
};

export const KNOWLEDGE_BASE: KnowledgeEntry[] = [
  {
    id: "products",
    keywords: [
      "product",
      "sell",
      "catalog",
      "buy",
      "offer",
      "stock",
      "sku",
      "what do you",
      "items",
    ],
    suggestions: ["Fiber cable types", "RFQ vs cart", "Technical specs"],
    answer: `We supply a full **technical fiber optics catalog**, including:

• **Fiber cables** — OS2, OM4, OM5 single-mode & multimode
• **Patch cords & trunks** — LC, SC, MTP/MPO connectors
• **PLC splitters** — 1×2 to 1×32 for FTTH & PON
• **ODF & patch panels** — rack-mount fiber distribution
• **Closures & enclosures** — outdoor / underground
• **Accessories** — adapters, couplers, cleaning kits

Browse live inventory at **/products** — every SKU includes fiber type, connector, insertion loss, core count, and distance ratings.`,
  },
  {
    id: "fiber-types",
    keywords: [
      "os2",
      "om4",
      "om5",
      "single mode",
      "single-mode",
      "multimode",
      "fiber type",
      "smf",
      "mmf",
      "wavelength",
    ],
    suggestions: ["What is FTTH?", "Patch cord specs", "Request a quote"],
    answer: `**Fiber type quick guide:**

• **OS2 (G.652)** — Single-mode, 1310/1550 nm. Long-haul, ISP backbone, data center links. Low loss over 10–80+ km.

• **OM4** — Multimode 50 µm, 850 nm VCSEL optimized. 10G/40G/100G inside buildings & campuses. Reach ~400 m at 10G.

• **OM5** — Wideband multimode for SWDM applications — fewer fibers, higher lane counts in hyperscale environments.

Not sure which fits your link budget? **Submit an RFQ** with distance, speed, and connector type — our team will spec it correctly.`,
  },
  {
    id: "rfq",
    keywords: [
      "rfq",
      "quote",
      "quotation",
      "bulk",
      "pricing",
      "price",
      "enterprise",
      "volume",
      "bom",
    ],
    suggestions: ["How long for a quote?", "Add products to RFQ", "RFQ vs direct order"],
    answer: `**Request for Quotation (RFQ)** is our enterprise bulk-pricing flow:

1. Browse **/products** and add items to your **Quote List**
2. Open **/rfq** — enter company, contact, and project notes
3. Submit — no account required
4. We respond within **24 business hours** with competitive pricing

RFQ is ideal for contractors, ISPs, and projects needing custom quantities, mixed SKUs, or spec confirmation. You'll receive email updates as your quote moves through review → quoted → approved.`,
  },
  {
    id: "cart",
    keywords: [
      "cart",
      "order",
      "buy now",
      "checkout",
      "purchase",
      "direct",
      "shipping",
      "pay",
    ],
    suggestions: ["Track my order", "Shipping countries", "RFQ instead?"],
    answer: `**Direct cart checkout** is for priced products ready to ship:

1. Add items with listed prices to **Cart** (**/cart**)
2. Enter shipping address & contact details
3. Place order — confirmation email sent instantly
4. Track status at **/track-order**

Cart orders support full address capture and lifecycle tracking: Received → Processing → Packed → Dispatched → In Transit → Delivered.

Items without listed prices are **RFQ-only** — use the quote list instead.`,
  },
  {
    id: "tracking",
    keywords: [
      "track",
      "tracking",
      "status",
      "delivery",
      "shipped",
      "dispatch",
      "where is",
      "order id",
    ],
    suggestions: ["Order statuses explained", "Contact about delay", "Place new order"],
    answer: `Track any order at **/track-order**:

• Enter your **Order ID** (from confirmation email)
• Enter the **email** used at checkout

You'll see a live timeline: Received → Processing → Packed → Dispatched → In Transit → Delivered → Completed.

When dispatched, we add **courier name** and **tracking number** — you'll get email alerts on each status change.`,
  },
  {
    id: "ftth",
    keywords: ["ftth", "pon", "gpon", "epon", "splitter", "drop cable", "last mile"],
    suggestions: ["PLC splitters", "Patch cords", "Submit RFQ"],
    answer: `**FTTH / PON deployment** is a core focus:

• **PLC splitters** — balanced 1×8, 1×16, 1×32 for GPON/XGS-PON
• **Drop cables** & **indoor/outdoor fiber**
• **MTP/MPO trunks** for central office fan-out
• **Closures & handholes** for aerial/underground plant

We support contractors with BOM-level RFQs — send your network design quantities and we'll quote the full material list.`,
  },
  {
    id: "specs",
    keywords: [
      "spec",
      "specification",
      "insertion loss",
      "connector",
      "lc",
      "sc",
      "mtp",
      "mpo",
      "attenuation",
      "datasheet",
    ],
    suggestions: ["OS2 vs OM4", "Browse catalog", "Talk to sales"],
    answer: `Every product page includes a **Technical Specifications** table:

• Fiber type & core count
• Connector polish (UPC/APC) & type (LC, SC, MTP…)
• Insertion loss & return loss
• Distance / bandwidth rating
• Cable jacket & flame rating (where applicable)

Engineers can filter the catalog by category and search by SKU or fiber type. Need a formal datasheet? Mention it in your **RFQ** or **Contact** form.`,
  },
  {
    id: "shipping",
    keywords: [
      "ship",
      "shipping",
      "deliver",
      "country",
      "international",
      "global",
      "freight",
      "uae",
      "gcc",
    ],
    suggestions: ["How to order", "RFQ for large projects", "Contact us"],
    answer: `We ship **globally** to telecom operators, contractors, and integrators in **50+ countries**.

• Cart checkout captures full delivery address
• RFQ projects — we confirm lead time & Incoterms in the quotation
• Standard processing before dispatch: order verification → warehouse pick → pack → handoff to courier

For large project shipments or consolidated freight, include details in your RFQ and our logistics team will advise.`,
  },
  {
    id: "contact",
    keywords: [
      "contact",
      "support",
      "help",
      "email",
      "whatsapp",
      "phone",
      "talk",
      "human",
      "agent",
    ],
    suggestions: ["What products do you sell?", "RFQ process", "Track order"],
    answer: `Reach our team anytime:

• **Contact form** — **/contact** (name, email, WhatsApp, country, message → send via Email or WhatsApp)
• **Email** — ${CONTACT_EMAIL}
• **WhatsApp** — ${WHATSAPP_DISPLAY}

**Business hours:** Mon–Fri, 9:00–18:00 GST

For urgent project quotes, WhatsApp is fastest — include your BOM or product SKUs.`,
  },
  {
    id: "company",
    keywords: [
      "who",
      "about",
      "company",
      "fiber optics",
      "isp",
      "b2b",
      "platform",
    ],
    suggestions: ["What do you sell?", "How does RFQ work?", "Browse products"],
    answer: `**Fiber Optics** is a B2B procurement platform for telecom infrastructure — not a retail shop.

We serve **ISPs, network operators, contractors, and data center teams** with:

• Structured **RFQ workflow** for bulk quotations
• **Direct cart** for in-stock priced items
• **Live order tracking** from warehouse to delivery
• Deep **technical catalogs** with real specs

Built for serious procurement — precision, speed, and visibility.`,
  },
  {
    id: "quote-time",
    keywords: ["how long", "24", "hours", "response time", "when", "turnaround"],
    suggestions: ["Start RFQ", "Contact support", "Browse catalog"],
    answer: `Standard **RFQ turnaround is within 24 business hours** after submission.

You'll receive email confirmation immediately, then updates when your quote is under review, quoted, or approved. Approved quotes can be **converted to orders** by our team.

Need it faster? Use **/contact** or WhatsApp with "urgent" and your project deadline.`,
  },
  {
    id: "rfq-vs-cart",
    keywords: ["difference", "rfq vs", "cart vs", "which", "better"],
    suggestions: ["RFQ steps", "Cart checkout", "Get a quote"],
    answer: `**Quick comparison:**

| | **RFQ (Quote)** | **Cart (Direct)** |
|---|---|---|
| Best for | Bulk, projects, custom qty | Priced items, fast buy |
| Pricing | Quoted by our team | Listed on product page |
| Shipping | Confirmed in quote | Entered at checkout |
| Account | Not required | Not required |

**Rule of thumb:** No price shown → RFQ. Price listed → add to Cart.`,
  },
];

export const CHATBOT_FALLBACK: ChatReply = {
  content: `I'm not sure about that yet — I'm still learning! (Gemini AI coming soon.)

Try one of these topics, or visit **/contact** to speak with our team:`,
  suggestions: [
    "What products do you sell?",
    "How does RFQ work?",
    "Fiber types OS2 vs OM4",
    "Contact support",
  ],
};
