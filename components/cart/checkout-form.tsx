"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useMounted } from "@/hooks/use-mounted";
import { createDirectOrder } from "@/lib/firestore/orders";
import { notifyEmails } from "@/lib/email/notify-client";
import { useShoppingCart } from "@/store/shopping-cart";

export function CheckoutForm() {
  const mounted = useMounted();
  const { items, subtotal, clearCart } = useShoppingCart();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("Pakistan");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [orderId, setOrderId] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (items.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    setSubmitting(true);
    try {
      const orderPayload = {
        companyName: companyName.trim() || fullName.trim(),
        contactName: fullName.trim(),
        contactEmail: email.trim(),
        contactPhone: phone.trim(),
        shippingAddress: {
          fullName: fullName.trim(),
          email: email.trim(),
          phone: phone.trim(),
          companyName: companyName.trim() || undefined,
          addressLine1: addressLine1.trim(),
          addressLine2: addressLine2.trim() || undefined,
          city: city.trim(),
          state: state.trim() || undefined,
          postalCode: postalCode.trim(),
          country: country.trim(),
        },
        items: items.map((i) => ({
          productId: i.productId,
          name: i.name,
          sku: i.sku,
          quantity: i.quantity,
          price: i.price,
        })),
        subtotal: subtotal(),
        notes: notes.trim() || undefined,
      };

      const id = await createDirectOrder(orderPayload);

      await notifyEmails("/api/orders/notify", { orderId: id, ...orderPayload });

      setOrderId(id);
      clearCart();
    } catch (err) {
      console.error("Order placement failed:", err);
      setError("Failed to place order. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (!mounted) {
    return (
      <div className="rounded-xl border border-border bg-card p-6 text-muted-foreground">
        Loading checkout...
      </div>
    );
  }

  if (orderId) {
    return (
      <div className="rounded-xl border border-border bg-card p-8 text-center">
        <CheckCircle className="mx-auto h-12 w-12 text-accent" />
        <h2 className="mt-4 text-xl font-semibold">Order Placed Successfully</h2>
        <p className="mt-2 text-muted-foreground">
          Order <strong>{orderId}</strong> has been received. A confirmation email has been sent to{" "}
          <strong>{email}</strong>. You will receive updates when your order is processed, dispatched, and delivered.
        </p>
        <Button variant="accent" className="mt-6" asChild>
          <Link href={`/track-order?orderId=${orderId}&email=${encodeURIComponent(email)}`}>
            Track Order
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-xl border border-border bg-card p-6 shadow-sm">
      <div>
        <h2 className="text-lg font-semibold">Shipping & Contact Details</h2>
        <p className="text-sm text-muted-foreground">
          Enter your delivery address and contact information.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="fullName">Full Name *</Label>
          <Input id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="phone">Phone / WhatsApp *</Label>
          <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="companyName">Company (optional)</Label>
          <Input id="companyName" value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="addressLine1">Address Line 1 *</Label>
        <Input id="addressLine1" value={addressLine1} onChange={(e) => setAddressLine1(e.target.value)} required />
      </div>

      <div className="space-y-2">
        <Label htmlFor="addressLine2">Address Line 2</Label>
        <Input id="addressLine2" value={addressLine2} onChange={(e) => setAddressLine2(e.target.value)} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="city">City *</Label>
          <Input id="city" value={city} onChange={(e) => setCity(e.target.value)} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="state">State / Province</Label>
          <Input id="state" value={state} onChange={(e) => setState(e.target.value)} />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="postalCode">Postal Code *</Label>
          <Input id="postalCode" value={postalCode} onChange={(e) => setPostalCode(e.target.value)} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="country">Country *</Label>
          <Input id="country" value={country} onChange={(e) => setCountry(e.target.value)} required />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="notes">Delivery Notes</Label>
        <Textarea id="notes" value={notes} onChange={(e) => setNotes(e.target.value)} rows={3} />
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      <Button type="submit" variant="accent" className="w-full" disabled={submitting || items.length === 0}>
        {submitting ? "Placing Order..." : `Place Order — $${subtotal().toFixed(2)}`}
      </Button>
    </form>
  );
}
