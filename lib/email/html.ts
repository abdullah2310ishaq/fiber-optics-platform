import { SITE_NAME, SITE_TAGLINE } from "@/lib/site/brand";

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function emailLayout(content: string): string {
  return `
    <div style="font-family:system-ui,-apple-system,sans-serif;max-width:640px;margin:0 auto;color:#0f172a;line-height:1.5;">
      <div style="background:linear-gradient(135deg,#0f172a,#1e293b);padding:24px;border-radius:12px 12px 0 0;">
        <p style="margin:0;font-size:18px;font-weight:700;color:#fff;">${SITE_NAME}</p>
        <p style="margin:4px 0 0;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;color:#67e8f9;">B2B Procurement</p>
      </div>
      <div style="padding:28px 24px;background:#fff;border:1px solid #e2e8f0;border-top:none;border-radius:0 0 12px 12px;">
        ${content}
      </div>
      <p style="margin:16px 0 0;font-size:11px;color:#94a3b8;text-align:center;">
        ${SITE_NAME} · ${SITE_TAGLINE}
      </p>
    </div>`;
}
