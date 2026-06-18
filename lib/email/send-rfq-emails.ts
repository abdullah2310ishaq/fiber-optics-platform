import type { RfqItem } from "@/types/rfq";
import type { RfqStatus } from "@/types/rfq";
import { escapeHtml, emailLayout } from "@/lib/email/html";
import { getAdminRecipients, sendEmail } from "@/lib/email/mailer";
import { RFQ_STATUS_LABELS } from "@/lib/email/status-labels";

export interface RfqEmailPayload {
  rfqId: string;
  contactName: string;
  contactEmail: string;
  contactPhone?: string;
  companyName: string;
  message: string;
  items: RfqItem[];
}

function formatItemsHtml(items: RfqItem[]): string {
  const rows = items
    .map(
      (item) => `
      <tr>
        <td style="padding:8px;border:1px solid #e2e8f0;">${escapeHtml(item.name)}</td>
        <td style="padding:8px;border:1px solid #e2e8f0;">${escapeHtml(item.sku)}</td>
        <td style="padding:8px;border:1px solid #e2e8f0;">${item.quantity}</td>
      </tr>`
    )
    .join("");

  return `
    <table style="border-collapse:collapse;width:100%;font-size:14px;margin-top:12px;">
      <thead>
        <tr style="background:#f8fafc;">
          <th style="padding:8px;border:1px solid #e2e8f0;text-align:left;">Product</th>
          <th style="padding:8px;border:1px solid #e2e8f0;text-align:left;">SKU</th>
          <th style="padding:8px;border:1px solid #e2e8f0;text-align:left;">Qty</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>`;
}

function formatItemsText(items: RfqItem[]): string {
  return items.map((item) => `- ${item.name} (${item.sku}) × ${item.quantity}`).join("\n");
}

export async function sendRfqAdminNotification(payload: RfqEmailPayload): Promise<void> {
  const subject = `New RFQ — ${payload.companyName} (${payload.rfqId})`;

  const body = `
    <h2 style="margin:0 0 8px;font-size:20px;">New Quotation Request</h2>
    <p style="color:#64748b;margin:0 0 20px;">Reference: <strong>${escapeHtml(payload.rfqId)}</strong></p>
    <table style="width:100%;font-size:14px;margin-bottom:20px;">
      <tr><td style="padding:4px 0;color:#64748b;width:100px;">Name</td><td><strong>${escapeHtml(payload.contactName)}</strong></td></tr>
      <tr><td style="padding:4px 0;color:#64748b;">Email</td><td>${escapeHtml(payload.contactEmail)}</td></tr>
      <tr><td style="padding:4px 0;color:#64748b;">Company</td><td>${escapeHtml(payload.companyName)}</td></tr>
      <tr><td style="padding:4px 0;color:#64748b;">Phone</td><td>${escapeHtml(payload.contactPhone || "—")}</td></tr>
    </table>
    <p style="margin:0 0 8px;font-weight:600;">Message</p>
    <p style="background:#f8fafc;padding:12px;border-radius:8px;white-space:pre-wrap;margin:0 0 20px;">${escapeHtml(payload.message || "—")}</p>
    <p style="margin:0 0 4px;font-weight:600;">Items (${payload.items.length})</p>
    ${formatItemsHtml(payload.items)}`;

  await sendEmail({
    to: getAdminRecipients(),
    replyTo: payload.contactEmail,
    subject,
    html: emailLayout(body),
    text: `New RFQ ${payload.rfqId}\n\n${payload.contactName}\n${payload.contactEmail}\n${payload.companyName}\n\n${formatItemsText(payload.items)}`,
  });
}

export async function sendRfqClientConfirmation(payload: RfqEmailPayload): Promise<void> {
  const subject = `RFQ Received — Reference ${payload.rfqId}`;

  const body = `
    <h2 style="margin:0 0 8px;font-size:20px;">Thank you, ${escapeHtml(payload.contactName)}</h2>
    <p style="color:#475569;margin:0 0 20px;">
      We have received your quotation request. Our team will review your requirements and respond within <strong>24 business hours</strong>.
    </p>
    <p style="background:#ecfeff;border:1px solid #a5f3fc;padding:12px 16px;border-radius:8px;margin:0 0 20px;">
      <strong>Reference:</strong> ${escapeHtml(payload.rfqId)}<br/>
      <strong>Company:</strong> ${escapeHtml(payload.companyName)}
    </p>
    <p style="margin:0 0 4px;font-weight:600;">Your requested items</p>
    ${formatItemsHtml(payload.items)}
    <p style="margin:20px 0 0;color:#64748b;font-size:13px;">
      Questions? Reply to this email or contact us on WhatsApp at +971 55 924 7636.
    </p>`;

  await sendEmail({
    to: payload.contactEmail,
    subject,
    html: emailLayout(body),
    text: `Thank you ${payload.contactName}. We received your RFQ ${payload.rfqId}. We will respond within 24 business hours.\n\n${formatItemsText(payload.items)}`,
  });
}

export async function sendRfqSubmittedEmails(payload: RfqEmailPayload): Promise<void> {
  const results = await Promise.allSettled([
    sendRfqAdminNotification(payload),
    sendRfqClientConfirmation(payload),
  ]);

  const failed = results.filter((r) => r.status === "rejected");
  if (failed.length === results.length) {
    throw new Error("All RFQ emails failed to send");
  }
  failed.forEach((r) => {
    if (r.status === "rejected") console.error("RFQ email failed:", r.reason);
  });
}

export async function sendRfqStatusEmail(payload: {
  rfqId: string;
  contactName: string;
  contactEmail: string;
  companyName: string;
  status: Exclude<RfqStatus, "submitted" | "converted">;
}): Promise<void> {
  const info = RFQ_STATUS_LABELS[payload.status];
  const subject = `${info.title} — RFQ ${payload.rfqId}`;

  const body = `
    <h2 style="margin:0 0 8px;font-size:20px;">${escapeHtml(info.title)}</h2>
    <p style="color:#475569;margin:0 0 16px;">Hi ${escapeHtml(payload.contactName)},</p>
    <p style="margin:0 0 20px;">${escapeHtml(info.message)}</p>
    <p style="background:#f8fafc;padding:12px 16px;border-radius:8px;margin:0;">
      <strong>Reference:</strong> ${escapeHtml(payload.rfqId)}<br/>
      <strong>Company:</strong> ${escapeHtml(payload.companyName)}<br/>
      <strong>Status:</strong> ${escapeHtml(payload.status.replace("_", " "))}
    </p>`;

  await sendEmail({
    to: payload.contactEmail,
    subject,
    html: emailLayout(body),
    text: `${info.title}\n\nHi ${payload.contactName},\n\n${info.message}\n\nRFQ: ${payload.rfqId}`,
  });
}

/** @deprecated */
export async function sendRfqNotification(payload: RfqEmailPayload): Promise<void> {
  return sendRfqSubmittedEmails(payload);
}
