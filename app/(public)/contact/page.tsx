import { Mail, MapPin, MessageCircle } from "lucide-react";
import { ContactForm } from "@/components/public/contact-form";
import { PageHeader } from "@/components/public/page-header";
import { CONTACT_EMAIL, WHATSAPP_DISPLAY } from "@/lib/site/contact";

export default function ContactPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Get in touch"
        title="Contact Us"
        description="Fill in your details, then send via email or WhatsApp — your message will be pre-filled for you."
      />

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-5 lg:gap-14">
          <aside className="space-y-6 lg:col-span-2">
            <div className="rounded-2xl border border-border bg-card p-6">
              <h2 className="display-font text-lg font-bold text-foreground">Talk to our team</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Enterprise fiber optics procurement, RFQs, and order support. We typically
                respond within 24 hours on business days.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-start gap-4 rounded-xl border border-border bg-card/60 p-4">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                <div>
                  <p className="text-sm font-medium text-foreground">Email</p>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="text-sm text-accent hover:underline"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4 rounded-xl border border-border bg-card/60 p-4">
                <MessageCircle className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-foreground">WhatsApp</p>
                  <p className="text-sm text-muted-foreground">{WHATSAPP_DISPLAY}</p>
                </div>
              </div>
              <div className="flex items-start gap-4 rounded-xl border border-border bg-card/60 p-4">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium text-foreground">Hours</p>
                  <p className="text-sm text-muted-foreground">Mon–Fri, 9:00–18:00 GST</p>
                </div>
              </div>
            </div>
          </aside>

          <div className="rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8 lg:col-span-3">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
