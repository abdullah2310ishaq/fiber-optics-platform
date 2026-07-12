"use client";

import { useEffect } from "react";
import { CheckCircle2, X, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface AdminModalState {
  open: boolean;
  type: "success" | "error";
  title: string;
  message: string;
}

interface AdminModalProps extends AdminModalState {
  onClose: () => void;
}

export function AdminModal({ open, type, title, message, onClose }: AdminModalProps) {
  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  const isSuccess = type === "success";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <button
        type="button"
        aria-label="Close"
        className="absolute inset-0 bg-foreground/20 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        className="relative w-full max-w-md rounded-2xl border border-border bg-card p-6 shadow-2xl"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex flex-col items-center text-center">
          <div
            className={cn(
              "flex h-14 w-14 items-center justify-center rounded-full",
              isSuccess ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-destructive"
            )}
          >
            {isSuccess ? <CheckCircle2 className="h-8 w-8" /> : <XCircle className="h-8 w-8" />}
          </div>
          <h2 className="mt-4 text-lg font-semibold text-foreground">{title}</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{message}</p>
          <Button type="button" variant="accent" className="mt-6 min-w-[120px]" onClick={onClose}>
            OK
          </Button>
        </div>
      </div>
    </div>
  );
}
