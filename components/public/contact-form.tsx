"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, CheckCircle2, Mail, MessageCircle, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  CONTACT_COUNTRIES,
  formatWhatsAppNumber,
  getCountryByCode,
} from "@/lib/site/countries";
import {
  buildContactMailtoUrl,
  buildContactMessage,
  buildContactWhatsAppUrl,
  CONTACT_EMAIL,
  WHATSAPP_DISPLAY,
  type ContactFormPayload,
} from "@/lib/site/contact";
import { cn } from "@/lib/utils";

export function ContactForm() {
  const [step, setStep] = useState<"form" | "send">("form");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [countryCode, setCountryCode] = useState("AE");
  const [whatsappLocal, setWhatsappLocal] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const country = getCountryByCode(countryCode);

  const payload = useMemo((): ContactFormPayload | null => {
    if (!country) return null;
    const whatsappDigits = formatWhatsAppNumber(country.dialCode, whatsappLocal);
    return {
      name: name.trim(),
      email: email.trim(),
      whatsapp: whatsappLocal.trim() ? `+${whatsappDigits}` : "",
      country: country.name,
      message: message.trim(),
    };
  }, [name, email, country, whatsappLocal, message]);

  const preview = payload ? buildContactMessage(payload) : "";

  function validate(): boolean {
    if (!name.trim()) {
      setError("Please enter your name.");
      return false;
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError("Please enter a valid email.");
      return false;
    }
    if (!country) {
      setError("Please select your country.");
      return false;
    }
    if (!whatsappLocal.trim() || whatsappLocal.replace(/\D/g, "").length < 6) {
      setError("Please enter a valid WhatsApp number.");
      return false;
    }
    if (!message.trim() || message.trim().length < 10) {
      setError("Please write a message (at least 10 characters).");
      return false;
    }
    setError("");
    return true;
  }

  function handleContinue(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setStep("send");
  }

  function handleBack() {
    setStep("form");
    setError("");
  }

  if (step === "send" && payload) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-6"
      >
        <button
          type="button"
          onClick={handleBack}
          className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-accent"
        >
          <ArrowLeft className="h-4 w-4" />
          Edit details
        </button>

        <div className="rounded-2xl border border-accent/30 bg-accent/5 p-6 text-center">
          <CheckCircle2 className="mx-auto h-10 w-10 text-accent" />
          <h2 className="display-font mt-3 text-xl font-bold text-foreground">
            Ready to send
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Choose how you want to reach us. Your message is pre-filled — you can edit it
            before sending.
          </p>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5">
          <p className="home-label text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">
            Message preview
          </p>
          <pre className="mt-3 whitespace-pre-wrap font-sans text-sm leading-relaxed text-secondary">
            {preview}
          </pre>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <a
            href={buildContactMailtoUrl(payload)}
            className="group flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-6 text-center transition-all hover:border-accent/30 hover:bg-accent/5 hover:shadow-lg hover:shadow-accent/5"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/10 text-accent transition-transform group-hover:scale-105">
              <Mail className="h-7 w-7" />
            </span>
            <span className="font-semibold text-foreground">Send via Email</span>
            <span className="text-xs text-muted-foreground">{CONTACT_EMAIL}</span>
            <span className="text-xs font-medium text-accent">Opens your email app →</span>
          </a>

          <a
            href={buildContactWhatsAppUrl(payload)}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-6 text-center transition-all hover:border-border hover:bg-muted hover:shadow-lg"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-muted text-muted-foreground transition-transform group-hover:scale-105 group-hover:text-accent">
              <MessageCircle className="h-7 w-7" />
            </span>
            <span className="font-semibold text-foreground">Chat on WhatsApp</span>
            <span className="text-xs text-muted-foreground">{WHATSAPP_DISPLAY}</span>
            <span className="text-xs font-medium text-accent">Opens WhatsApp with your message →</span>
          </a>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleContinue} className="space-y-6">
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="contact-name">Full name *</Label>
          <Input
            id="contact-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="h-11 border-border bg-secondary/50"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="contact-email">Email *</Label>
          <Input
            id="contact-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@company.com"
            className="h-11 border-border bg-secondary/50"
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="contact-country">Country *</Label>
          <select
            id="contact-country"
            value={countryCode}
            onChange={(e) => setCountryCode(e.target.value)}
            className={cn(
              "flex h-11 w-full rounded-md border border-border bg-secondary/50 px-3 text-sm",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            )}
            required
          >
            {CONTACT_COUNTRIES.map((c) => (
              <option key={c.code} value={c.code} className="bg-card text-foreground">
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="contact-whatsapp">WhatsApp number *</Label>
          <div className="flex gap-2">
            <span className="flex h-11 shrink-0 items-center rounded-md border border-border bg-muted/50 px-3 text-sm font-medium text-muted-foreground">
              {country?.dialCode ?? "+971"}
            </span>
            <Input
              id="contact-whatsapp"
              type="tel"
              value={whatsappLocal}
              onChange={(e) => setWhatsappLocal(e.target.value)}
              placeholder="55 123 4567"
              className="h-11 flex-1 border-border bg-secondary/50"
              required
            />
          </div>
          <p className="text-xs text-muted-foreground">
            We&apos;ll include this in your message so our team can reply on WhatsApp.
          </p>
        </div>

        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="contact-message">Your message *</Label>
          <Textarea
            id="contact-message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tell us about your project, products needed, quantities..."
            rows={5}
            className="border-border bg-secondary/50 resize-none"
            required
          />
        </div>
      </div>

      {name && message && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="rounded-xl border border-dashed border-accent/30 bg-accent/5 p-4"
        >
          <p className="text-xs font-medium uppercase tracking-wider text-accent">Live preview</p>
          <p className="mt-2 text-sm text-muted-foreground line-clamp-4">
            Hello, my name is <span className="text-foreground">{name}</span>. Email: {email || "…"}.
            WhatsApp: {country?.dialCode} {whatsappLocal || "…"}. {message.slice(0, 80)}
            {message.length > 80 ? "…" : ""}
          </p>
        </motion.div>
      )}

      <Button type="submit" variant="accent" size="lg" className="w-full sm:w-auto">
        Continue — choose Email or WhatsApp
        <Send className="h-4 w-4" />
      </Button>
    </form>
  );
}
