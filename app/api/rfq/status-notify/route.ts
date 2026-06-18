import { NextResponse } from "next/server";
import { z } from "zod";
import { requireAdmin } from "@/lib/auth/require-admin";
import { sendRfqStatusEmail } from "@/lib/email/send-rfq-emails";

const bodySchema = z.object({
  rfqId: z.string().min(1),
  contactName: z.string().min(1),
  contactEmail: z.string().email(),
  companyName: z.string().min(1),
  status: z.enum(["under_review", "quoted", "approved", "rejected"]),
});

export async function POST(request: Request) {
  const { error } = await requireAdmin();
  if (error) return error;

  try {
    const data = bodySchema.parse(await request.json());
    await sendRfqStatusEmail(data);
    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: "Invalid request data" }, { status: 400 });
    }
    console.error("RFQ status email failed:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
