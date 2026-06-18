import nodemailer from "nodemailer";

function parseEmails(raw: string | undefined): string[] {
  if (!raw) return [];
  return raw
    .split(",")
    .map((e) => e.trim())
    .filter(Boolean);
}

export function getAdminRecipients(): string[] {
  const recipients = parseEmails(
    process.env.RFQ_NOTIFY_EMAIL ||
      process.env.NOTIFY_EMAIL ||
      process.env.EMAIL_USER
  );
  if (recipients.length === 0) {
    throw new Error("No admin notification email recipients configured");
  }
  return recipients;
}

/** @deprecated use getAdminRecipients */
export function getNotifyRecipients(): string[] {
  return getAdminRecipients();
}

export function getMailer() {
  const user = process.env.EMAIL_USER;
  const pass = process.env.EMAIL_PASS?.replace(/\s/g, "");

  if (!user || !pass) {
    throw new Error("EMAIL_USER and EMAIL_PASS must be configured");
  }

  return nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  });
}

export function getFromAddress(): string {
  const user = process.env.EMAIL_USER;
  if (!user) throw new Error("EMAIL_USER is not configured");
  return `Fiber Optics B2B <${user}>`;
}

export function getSiteUrl(request?: Request): string {
  if (request) {
    const origin = request.headers.get("origin");
    if (origin) return origin;
  }
  return process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
}

export async function sendEmail(options: {
  to: string | string[];
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
}): Promise<void> {
  const transporter = getMailer();
  const to = Array.isArray(options.to) ? options.to.join(", ") : options.to;

  await transporter.sendMail({
    from: getFromAddress(),
    to,
    replyTo: options.replyTo,
    subject: options.subject,
    html: options.html,
    text: options.text,
  });
}

