const WHATSAPP_NUMBER = "971559247636";

export const CONTACT_EMAIL = "nasir.ch87@yahoo.com";

export const WHATSAPP_DISPLAY = "+971 55 924 7636";

export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
  "Hi, I would like to get in touch with Fiber Optics."
)}`;

export interface ContactFormPayload {
  name: string;
  email: string;
  whatsapp: string;
  country: string;
  message: string;
}

export function buildContactMessage(payload: ContactFormPayload): string {
  return [
    "Hello,",
    "",
    `My name is ${payload.name}.`,
    `Email: ${payload.email}`,
    `WhatsApp: ${payload.whatsapp}`,
    `Country: ${payload.country}`,
    "",
    "Message:",
    payload.message,
  ].join("\n");
}

export function buildContactMailtoUrl(payload: ContactFormPayload): string {
  const subject = encodeURIComponent(`Contact from ${payload.name} — Fiber Optics`);
  const body = encodeURIComponent(buildContactMessage(payload));
  return `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
}

export function buildContactWhatsAppUrl(payload: ContactFormPayload): string {
  const text = encodeURIComponent(buildContactMessage(payload));
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
}
