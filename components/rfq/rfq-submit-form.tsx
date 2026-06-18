"use client";

import { useState } from "react";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { createRfq } from "@/lib/firestore/rfqs";
import { notifyEmails } from "@/lib/email/notify-client";
import { useMounted } from "@/hooks/use-mounted";
import { useQuoteCart } from "@/store/quote-cart";

export function RfqSubmitForm() {
  const mounted = useMounted();
  const { items, clearCart } = useQuoteCart();
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [successId, setSuccessId] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (items.length === 0) {
      setError("Add at least one product to your quote cart.");
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        contactName: contactName.trim(),
        contactEmail: contactEmail.trim(),
        contactPhone: contactPhone.trim() || undefined,
        companyName: companyName.trim(),
        message: message.trim(),
        items,
      };

      const id = await createRfq(payload);

      await notifyEmails("/api/rfq/notify", { rfqId: id, ...payload });

      setSuccessId(id);
      clearCart();
    } catch {
      setError("Failed to submit RFQ. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (!mounted) {
    return (
      <div className="rounded-xl border border-border bg-card p-6 text-muted-foreground">
        Loading form...
      </div>
    );
  }

  if (successId) {
    return (
      <div className="rounded-xl border border-border bg-card p-8 text-center">
        <CheckCircle className="mx-auto h-12 w-12 text-accent" />
        <h2 className="mt-4 text-xl font-semibold">RFQ Submitted Successfully</h2>
        <p className="mt-2 text-muted-foreground">
          Your quote request has been received. A confirmation email has been sent to{" "}
          <strong>{contactEmail}</strong>. Our team will respond within 24 hours.
        </p>
        <p className="mt-1 text-sm text-muted-foreground">Reference: {successId}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 rounded-xl border border-border bg-card p-6 shadow-sm">
      <h2 className="text-lg font-semibold">Submit Quotation Request</h2>
      <p className="text-sm text-muted-foreground">
        For bulk / custom pricing. This is separate from cart checkout.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="contactName">Your Name</Label>
          <Input id="contactName" value={contactName} onChange={(e) => setContactName(e.target.value)} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="contactEmail">Email</Label>
          <Input id="contactEmail" type="email" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} required />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="companyName">Company Name</Label>
          <Input id="companyName" value={companyName} onChange={(e) => setCompanyName(e.target.value)} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="contactPhone">Phone / WhatsApp</Label>
          <Input id="contactPhone" value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} placeholder="Optional" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Message / Requirements</Label>
        <Textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} rows={4} />
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <Button type="submit" variant="accent" disabled={submitting || items.length === 0}>
        {submitting ? "Submitting..." : "Submit RFQ"}
      </Button>
    </form>
  );
}
