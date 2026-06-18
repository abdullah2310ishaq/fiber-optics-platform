"use client";

import { Suspense } from "react";
import { PageHeader } from "@/components/public/page-header";
import { TrackOrderContent } from "@/components/public/track-order-content";

export default function TrackOrderPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Order Visibility"
        title="Track Your Order"
        description="Enter your order ID and email to view real-time shipping status updates."
        dark
      />
      <Suspense>
        <TrackOrderContent />
      </Suspense>
    </div>
  );
}
