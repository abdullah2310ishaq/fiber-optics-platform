"use client";

import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { createOrderFromRfq } from "@/lib/firestore/orders";
import { getAllRfqs, updateRfqStatus } from "@/lib/firestore/rfqs";
import type { Rfq, RfqStatus } from "@/types/rfq";

const statusColors: Record<RfqStatus, string> = {
  submitted: "bg-yellow-500/20 text-yellow-300",
  under_review: "bg-blue-500/20 text-blue-300",
  quoted: "bg-purple-500/20 text-purple-300",
  approved: "bg-green-500/20 text-green-300",
  rejected: "bg-red-500/20 text-red-300",
  converted: "bg-slate-500/20 text-slate-300",
};

export default function AdminRfqsPage() {
  const [rfqs, setRfqs] = useState<Rfq[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      setRfqs(await getAllRfqs());
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function handleStatus(id: string, status: RfqStatus) {
    await updateRfqStatus(id, status);
    load();
  }

  async function convertToOrder(rfq: Rfq) {
    await createOrderFromRfq({
      rfqId: rfq.id,
      companyName: rfq.companyName,
      contactName: rfq.contactName,
      contactEmail: rfq.contactEmail,
      contactPhone: rfq.contactPhone,
      items: rfq.items.map((i) => ({
        productId: i.productId,
        name: i.name,
        sku: i.sku,
        quantity: i.quantity,
      })),
      notes: rfq.message,
    });
    await updateRfqStatus(rfq.id, "converted");
    load();
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-white">RFQs ({rfqs.length})</h1>
      <p className="mt-1 text-slate-400">Manage quote requests from customers.</p>

      {loading ? (
        <p className="mt-8 text-slate-400">Loading...</p>
      ) : rfqs.length === 0 ? (
        <p className="mt-8 rounded-lg border border-dashed border-slate-700 p-8 text-center text-slate-500">
          No RFQs yet.
        </p>
      ) : (
        <div className="mt-6 space-y-4">
          {rfqs.map((rfq) => (
            <div key={rfq.id} className="rounded-xl border border-slate-700 bg-slate-800 p-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <p className="font-semibold text-white">{rfq.companyName}</p>
                  <p className="text-sm text-slate-400">
                    {rfq.contactName} · {rfq.contactEmail}
                    {rfq.contactPhone ? ` · ${rfq.contactPhone}` : ""}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    {rfq.createdAt.toLocaleDateString()} · {rfq.items.length} item(s)
                  </p>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-medium ${statusColors[rfq.status]}`}>
                  {rfq.status.replace("_", " ")}
                </span>
              </div>

              {rfq.message && <p className="mt-3 text-sm text-slate-300">{rfq.message}</p>}

              <div className="mt-3 flex flex-wrap gap-2">
                {rfq.status === "submitted" && (
                  <Button size="sm" variant="outline" onClick={() => handleStatus(rfq.id, "under_review")}>
                    Mark Under Review
                  </Button>
                )}
                {rfq.status === "under_review" && (
                  <Button size="sm" variant="outline" onClick={() => handleStatus(rfq.id, "quoted")}>
                    Send Quotation
                  </Button>
                )}
                {rfq.status === "quoted" && (
                  <Button size="sm" onClick={() => handleStatus(rfq.id, "approved")}>
                    Mark Approved
                  </Button>
                )}
                {rfq.status === "approved" && (
                  <Button size="sm" variant="accent" onClick={() => convertToOrder(rfq)}>
                    Convert to Order
                  </Button>
                )}
                {rfq.status !== "rejected" && rfq.status !== "converted" && (
                  <Button size="sm" variant="ghost" className="text-red-400" onClick={() => handleStatus(rfq.id, "rejected")}>
                    Reject
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
