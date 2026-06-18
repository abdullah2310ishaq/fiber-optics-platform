import { NextResponse } from "next/server";
import { z } from "zod";
import { sendRfqSubmittedEmails } from "@/lib/email/send-rfq-emails";

const rfqItemSchema = z.object({
  productId: z.string(),
  slug: z.string(),
  name: z.string(),
  sku: z.string(),
  quantity: z.number().int().positive(),
  notes: z.string().optional(),
  image: z.string().optional(),
});

const bodySchema = z.object({
  rfqId: z.string().min(1),
  contactName: z.string().min(1),
  contactEmail: z.string().email(),
  contactPhone: z.string().optional(),
  companyName: z.string().min(1),
  message: z.string(),
  items: z.array(rfqItemSchema).min(1),
});

export async function POST(request: Request) {
  try {
    const data = bodySchema.parse(await request.json());
    await sendRfqSubmittedEmails(data);
    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid request data" }, { status: 400 });
    }
    console.error("RFQ email failed:", error);
    return NextResponse.json({ error: "Failed to send emails" }, { status: 500 });
  }
}
