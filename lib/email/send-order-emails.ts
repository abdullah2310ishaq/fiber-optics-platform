import type { OrderItem, OrderStatus, ShippingAddress } from "@/types/order";
import { escapeHtml, emailLayout } from "@/lib/email/html";
import { getAdminRecipients, sendEmail } from "@/lib/email/mailer";
import { ORDER_STATUS_LABELS } from "@/lib/email/status-labels";

export interface OrderEmailPayload {
  orderId: string;
  contactName: string;
  contactEmail: string;
  contactPhone?: string;
  companyName: string;
  items: OrderItem[];
  subtotal?: number;
  shippingAddress?: ShippingAddress;
  notes?: string;
}

function formatOrderItemsHtml(items: OrderItem[]): string {
  const rows = items
    .map(
      (item) => `
      <tr>
        <td style="padding:8px;border:1px solid #e2e8f0;">${escapeHtml(item.name)}</td>
        <td style="padding:8px;border:1px solid #e2e8f0;">${escapeHtml(item.sku)}</td>
        <td style="padding:8px;border:1px solid #e2e8f0;">${item.quantity}</td>
        <td style="padding:8px;border:1px solid #e2e8f0;">${item.price != null ? `$${item.price.toFixed(2)}` : "RFQ"}</td>
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
          <th style="padding:8px;border:1px solid #e2e8f0;text-align:left;">Price</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>`;
}

function formatAddress(addr: ShippingAddress): string {
  return [
    addr.addressLine1,
    addr.addressLine2,
    `${addr.city}${addr.state ? `, ${addr.state}` : ""} ${addr.postalCode}`,
    addr.country,
  ]
    .filter(Boolean)
    .join(", ");
}

export async function sendOrderAdminNotification(payload: OrderEmailPayload): Promise<void> {
  const subject = `New Order — ${payload.companyName} (${payload.orderId})`;

  const body = `
    <h2 style="margin:0 0 8px;font-size:20px;">New Order Placed</h2>
    <p style="color:#64748b;margin:0 0 20px;">Order ID: <strong>${escapeHtml(payload.orderId)}</strong></p>
    <table style="width:100%;font-size:14px;margin-bottom:20px;">
      <tr><td style="padding:4px 0;color:#64748b;width:100px;">Customer</td><td><strong>${escapeHtml(payload.contactName)}</strong></td></tr>
      <tr><td style="padding:4px 0;color:#64748b;">Email</td><td>${escapeHtml(payload.contactEmail)}</td></tr>
      <tr><td style="padding:4px 0;color:#64748b;">Company</td><td>${escapeHtml(payload.companyName)}</td></tr>
      <tr><td style="padding:4px 0;color:#64748b;">Phone</td><td>${escapeHtml(payload.contactPhone || "—")}</td></tr>
      ${payload.subtotal != null ? `<tr><td style="padding:4px 0;color:#64748b;">Subtotal</td><td><strong>$${payload.subtotal.toFixed(2)}</strong></td></tr>` : ""}
    </table>
    ${payload.shippingAddress ? `<p style="margin:0 0 20px;"><strong>Ship to:</strong> ${escapeHtml(formatAddress(payload.shippingAddress))}</p>` : ""}
    ${formatOrderItemsHtml(payload.items)}`;

  await sendEmail({
    to: getAdminRecipients(),
    replyTo: payload.contactEmail,
    subject,
    html: emailLayout(body),
    text: `New order ${payload.orderId} from ${payload.contactName} <${payload.contactEmail}>`,
  });
}

export async function sendOrderClientConfirmation(
  payload: OrderEmailPayload,
  siteUrl: string
): Promise<void> {
  const trackUrl = `${siteUrl}/track-order?orderId=${encodeURIComponent(payload.orderId)}&email=${encodeURIComponent(payload.contactEmail)}`;
  const subject = `Order Confirmed — ${payload.orderId}`;

  const body = `
    <h2 style="margin:0 0 8px;font-size:20px;">Thank you, ${escapeHtml(payload.contactName)}</h2>
    <p style="color:#475569;margin:0 0 20px;">
      Your order has been placed successfully. We will notify you as it moves through processing, dispatch, and delivery.
    </p>
    <p style="background:#ecfeff;border:1px solid #a5f3fc;padding:12px 16px;border-radius:8px;margin:0 0 20px;">
      <strong>Order ID:</strong> ${escapeHtml(payload.orderId)}<br/>
      ${payload.subtotal != null ? `<strong>Subtotal:</strong> $${payload.subtotal.toFixed(2)}<br/>` : ""}
      <strong>Status:</strong> Order Received
    </p>
    ${formatOrderItemsHtml(payload.items)}
    <p style="margin:24px 0 0;">
      <a href="${trackUrl}" style="display:inline-block;background:#0891b2;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;">
        Track Your Order
      </a>
    </p>`;

  await sendEmail({
    to: payload.contactEmail,
    subject,
    html: emailLayout(body),
    text: `Order confirmed ${payload.orderId}. Track: ${trackUrl}`,
  });
}

export async function sendOrderPlacedEmails(
  payload: OrderEmailPayload,
  siteUrl: string
): Promise<void> {
  const results = await Promise.allSettled([
    sendOrderAdminNotification(payload),
    sendOrderClientConfirmation(payload, siteUrl),
  ]);

  const failed = results.filter((r) => r.status === "rejected");
  if (failed.length === results.length) {
    throw new Error("All order emails failed to send");
  }
  failed.forEach((r) => {
    if (r.status === "rejected") console.error("Order email failed:", r.reason);
  });
}

export async function sendOrderStatusEmail(payload: {
  orderId: string;
  contactName: string;
  contactEmail: string;
  status: OrderStatus;
  trackingNumber?: string;
  courier?: string;
  siteUrl: string;
}): Promise<void> {
  const info = ORDER_STATUS_LABELS[payload.status];
  const trackUrl = `${payload.siteUrl}/track-order?orderId=${encodeURIComponent(payload.orderId)}&email=${encodeURIComponent(payload.contactEmail)}`;
  const subject = `${info.title} — Order ${payload.orderId}`;

  const trackingBlock =
    payload.trackingNumber || payload.courier
      ? `<p style="background:#f8fafc;padding:12px 16px;border-radius:8px;margin:16px 0 0;">
          ${payload.courier ? `<strong>Courier:</strong> ${escapeHtml(payload.courier)}<br/>` : ""}
          ${payload.trackingNumber ? `<strong>Tracking:</strong> ${escapeHtml(payload.trackingNumber)}` : ""}
        </p>`
      : "";

  const body = `
    <h2 style="margin:0 0 8px;font-size:20px;">${escapeHtml(info.title)}</h2>
    <p style="color:#475569;margin:0 0 16px;">Hi ${escapeHtml(payload.contactName)},</p>
    <p style="margin:0 0 16px;">${escapeHtml(info.message)}</p>
    <p style="background:#ecfeff;border:1px solid #a5f3fc;padding:12px 16px;border-radius:8px;margin:0;">
      <strong>Order ID:</strong> ${escapeHtml(payload.orderId)}<br/>
      <strong>Status:</strong> ${escapeHtml(payload.status.replace("_", " "))}
    </p>
    ${trackingBlock}
    <p style="margin:24px 0 0;">
      <a href="${trackUrl}" style="display:inline-block;background:#0891b2;color:#fff;padding:12px 24px;border-radius:8px;text-decoration:none;font-weight:600;">
        View Order Status
      </a>
    </p>`;

  await sendEmail({
    to: payload.contactEmail,
    subject,
    html: emailLayout(body),
    text: `${info.title}\n\nHi ${payload.contactName},\n\n${info.message}\n\nOrder: ${payload.orderId}\nTrack: ${trackUrl}`,
  });
}
