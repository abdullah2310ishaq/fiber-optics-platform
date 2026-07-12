/** Light-theme status badges — pastel background + dark text for readability on cream/white.admin UI */

export const orderStatusBadge = {
  pending: "bg-amber-100 text-amber-800",
  processing: "bg-orange-100 text-orange-800",
  packed: "bg-indigo-100 text-indigo-800",
  dispatched: "bg-purple-100 text-purple-800",
  in_transit: "bg-orange-100 text-orange-800",
  delivered: "bg-emerald-100 text-emerald-800",
  completed: "bg-muted text-foreground",
} as const;

export const rfqStatusBadge = {
  submitted: "bg-amber-100 text-amber-800",
  under_review: "bg-orange-100 text-orange-800",
  quoted: "bg-purple-100 text-purple-800",
  approved: "bg-emerald-100 text-emerald-800",
  rejected: "bg-red-100 text-red-800",
  converted: "bg-muted text-foreground",
} as const;

export const stockStatusBadge = {
  in_stock: "bg-emerald-100 text-emerald-800",
  out_of_stock: "bg-red-100 text-red-800",
} as const;

export const productActiveBadge = "bg-emerald-100 text-emerald-800";
