import { NextResponse } from "next/server";
import { z } from "zod";
import { getSiteUrl } from "@/lib/email/mailer";
import { sendOrderPlacedEmails } from "@/lib/email/send-order-emails";

const orderItemSchema = z.object({
  productId: z.string(),
  name: z.string(),
  sku: z.string(),
  quantity: z.number().int().positive(),
  price: z.number().optional(),
});

const shippingSchema = z.object({
  fullName: z.string(),
  email: z.string().email(),
  phone: z.string(),
  companyName: z.string().optional(),
  addressLine1: z.string(),
  addressLine2: z.string().optional(),
  city: z.string(),
  state: z.string().optional(),
  postalCode: z.string(),
  country: z.string(),
});

const bodySchema = z.object({
  orderId: z.string().min(1),
  contactName: z.string().min(1),
  contactEmail: z.string().email(),
  contactPhone: z.string().optional(),
  companyName: z.string().min(1),
  items: z.array(orderItemSchema).min(1),
  subtotal: z.number().optional(),
  shippingAddress: shippingSchema.optional(),
  notes: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const data = bodySchema.parse(await request.json());
    await sendOrderPlacedEmails(data, getSiteUrl(request));
    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid request data" }, { status: 400 });
    }
    console.error("Order email failed:", error);
    return NextResponse.json({ error: "Failed to send emails" }, { status: 500 });
  }
}
