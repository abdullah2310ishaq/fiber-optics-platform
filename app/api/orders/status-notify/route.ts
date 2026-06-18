import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/lib/auth/require-admin";
import { getSiteUrl } from "@/lib/email/mailer";
import { sendOrderStatusEmail } from "@/lib/email/send-order-emails";

const bodySchema = z.object({
  orderId: z.string().min(1),
  contactName: z.string().min(1),
  contactEmail: z.string().email(),
  status: z.enum([
    "pending",
    "processing",
    "packed",
    "dispatched",
    "in_transit",
    "delivered",
    "completed",
  ]),
  trackingNumber: z.string().optional(),
  courier: z.string().optional(),
});

export async function POST(request: Request) {
  const { error } = await requireAdmin();
  if (error) return error;

  try {
    const data = bodySchema.parse(await request.json());
    await sendOrderStatusEmail({ ...data, siteUrl: getSiteUrl(request) });
    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid request data" }, { status: 400 });
    }
    console.error("Order status email failed:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
