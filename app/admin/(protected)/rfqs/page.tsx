"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";
import { AdminModal, type AdminModalState } from "@/components/admin/admin-modal";
import { AdminCard, AdminEmpty, AdminLoading, AdminPage, AdminPageHeader } from "@/components/admin/admin-ui";
import { Button } from "@/components/ui/button";
import { createOrderFromRfq } from "@/lib/firestore/orders";
import { getAllRfqs, updateRfqStatus } from "@/lib/firestore/rfqs";
import { notifyEmails } from "@/lib/email/notify-client";
import { cn } from "@/lib/utils";
import type { Rfq, RfqStatus } from "@/types/rfq";

const statusLabels: Record<RfqStatus, string> = {
  submitted: "Submitted",
  under_review: "Under review",
  quoted: "Quoted",
  approved: "Approved",
  rejected: "Rejected",
  converted: "Converted",
};

const statusBadge: Record<RfqStatus, string> = {
  submitted: "bg-amber-500/20 text-amber-300",
  under_review: "bg-blue-500/20 text-blue-300",
  quoted: "bg-purple-500/20 text-purple-300",
  approved: "bg-emerald-500/20 text-emerald-300",
  rejected: "bg-red-500/20 text-red-300",
  converted: "bg-slate-500/20 text-slate-300",
};

const closedModal: AdminModalState = {
  open: false,
  type: "success",
  title: "",
  message: "",
};

export default function AdminRfqsPage() {
  const searchParams = useSearchParams();
  const focusId = searchParams.get("focus");
  const [rfqs, setRfqs] = useState<Rfq[]>([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [modal, setModal] = useState<AdminModalState>(closedModal);
  const busyRef = useRef<string | null>(null);

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

  useEffect(() => {
    if (!focusId || loading || rfqs.length === 0) return;
    const el = document.getElementById(`rfq-${focusId}`);
    if (el) {
      window.setTimeout(() => {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 100);
    }
  }, [focusId, loading, rfqs]);

  function patchRfq(id: string, status: RfqStatus) {
    setRfqs((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status, updatedAt: new Date() } : r))
    );
  }

  async function runAction(id: string, action: () => Promise<void>, successMsg: string) {
    if (busyRef.current) return;
    busyRef.current = id;
    setBusyId(id);
    try {
      await action();
      setModal({
        open: true,
        type: "success",
        title: "Done",
        message: successMsg,
      });
    } catch {
      setModal({
        open: true,
        type: "error",
        title: "Failed",
        message: "Something went wrong. Please try again.",
      });
    } finally {
      busyRef.current = null;
      setBusyId(null);
    }
  }

  async function handleStatus(id: string, status: RfqStatus) {
    const rfq = rfqs.find((r) => r.id === id);
    if (!rfq) return;

    await runAction(id, async () => {
      await updateRfqStatus(id, status);
      if (
        status === "under_review" ||
        status === "quoted" ||
        status === "approved" ||
        status === "rejected"
      ) {
        await notifyEmails("/api/rfq/status-notify", {
          rfqId: rfq.id,
          contactName: rfq.contactName,
          contactEmail: rfq.contactEmail,
          companyName: rfq.companyName,
          status,
        });
      }
      patchRfq(id, status);
    }, `${rfq.companyName} is now "${statusLabels[status]}".`);
  }

  async function convertToOrder(rfq: Rfq) {
    await runAction(rfq.id, async () => {
      const orderId = await createOrderFromRfq({
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

      await notifyEmails("/api/orders/notify", {
        orderId,
        contactName: rfq.contactName,
        contactEmail: rfq.contactEmail,
        contactPhone: rfq.contactPhone,
        companyName: rfq.companyName,
        items: rfq.items.map((i) => ({
          productId: i.productId,
          name: i.name,
          sku: i.sku,
          quantity: i.quantity,
        })),
        notes: rfq.message,
      });

      await updateRfqStatus(rfq.id, "converted");
      patchRfq(rfq.id, "converted");
    }, `Order created from ${rfq.companyName}. Check Orders tab.`);
  }

  return (
    <AdminPage>
      <AdminModal {...modal} onClose={() => setModal(closedModal)} />

      <AdminPageHeader
        title="RFQs"
        description="Review quote requests. Status updates instantly."
      />

      {loading ? (
        <AdminLoading label="Loading RFQs..." />
      ) : rfqs.length === 0 ? (
        <AdminEmpty>No RFQs yet.</AdminEmpty>
      ) : (
        <div className="space-y-4">
          {rfqs.map((rfq) => {
            const busy = busyId === rfq.id;
            return (
              <AdminCard
                key={rfq.id}
                id={`rfq-${rfq.id}`}
                className={cn(
                  "relative overflow-hidden p-5",
                  focusId === rfq.id && "border-blue-500 ring-2 ring-blue-500/30"
                )}
              >
                {busy && (
                  <div className="absolute inset-0 z-10 flex items-center justify-center bg-slate-950/70">
                    <Loader2 className="h-6 w-6 animate-spin text-blue-400" />
                  </div>
                )}
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-white">{rfq.companyName}</p>
                    <p className="text-sm text-slate-400">
                      {rfq.contactName} · {rfq.contactEmail}
                    </p>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusBadge[rfq.status]}`}>
                    {statusLabels[rfq.status]}
                  </span>
                </div>

                {rfq.message && (
                  <p className="mt-3 text-sm text-slate-400">{rfq.message}</p>
                )}

                <div className="mt-4 flex flex-wrap gap-2">
                  {rfq.status === "submitted" && (
                    <Button size="sm" variant="outline" disabled={busy} onClick={() => handleStatus(rfq.id, "under_review")}>
                      Under review
                    </Button>
                  )}
                  {rfq.status === "under_review" && (
                    <Button size="sm" variant="outline" disabled={busy} onClick={() => handleStatus(rfq.id, "quoted")}>
                      Send quote
                    </Button>
                  )}
                  {rfq.status === "quoted" && (
                    <Button size="sm" variant="accent" disabled={busy} onClick={() => handleStatus(rfq.id, "approved")}>
                      Approve
                    </Button>
                  )}
                  {rfq.status === "approved" && (
                    <Button size="sm" variant="accent" disabled={busy} onClick={() => convertToOrder(rfq)}>
                      Convert to order
                    </Button>
                  )}
                  {rfq.status !== "rejected" && rfq.status !== "converted" && (
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-red-400"
                      disabled={busy}
                      onClick={() => handleStatus(rfq.id, "rejected")}
                    >
                      Reject
                    </Button>
                  )}
                </div>
              </AdminCard>
            );
          })}
        </div>
      )}
    </AdminPage>
  );
}
