"use client";

import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { cn } from "@/lib/utils";

export function AdminPage({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("space-y-6", className)}>{children}</div>;
}

export function AdminPageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4 border-b border-border pb-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">{title}</h1>
        {description && <p className="mt-1 max-w-xl text-sm text-muted-foreground">{description}</p>}
      </div>
      {action}
    </div>
  );
}

export function AdminLoading({ label = "Loading..." }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16">
      <Loader2 className="h-8 w-8 animate-spin text-accent" />
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}

export function AdminLoadingModal({
  open,
  message = "Please wait...",
}: {
  open: boolean;
  message?: string;
}) {
  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-foreground/20 backdrop-blur-sm"
      role="alertdialog"
      aria-modal="true"
      aria-busy="true"
      aria-label={message}
    >
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-card px-10 py-10 shadow-2xl">
        <Loader2 className="h-10 w-10 animate-spin text-accent" />
        <p className="text-center text-sm font-medium text-foreground">{message}</p>
        <p className="text-center text-xs text-muted-foreground">Do not close this page</p>
      </div>
    </div>
  );
}

export function AdminEmpty({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-dashed border-border bg-muted/50 py-12 text-center text-sm text-muted-foreground">
      {children}
    </div>
  );
}

export function AdminCard({
  children,
  className,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <div
      id={id}
      className={cn(
        "rounded-xl border border-border bg-card shadow-sm",
        className
      )}
    >
      {children}
    </div>
  );
}

export function AdminTabs({
  tabs,
  active,
  onChange,
}: {
  tabs: { id: string; label: string; count?: number }[];
  active: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          type="button"
          onClick={() => onChange(tab.id)}
          className={cn(
            "rounded-lg px-4 py-2 text-sm font-medium transition-colors",
            active === tab.id
              ? "bg-accent text-accent-foreground"
              : "bg-muted text-muted-foreground hover:bg-secondary hover:text-foreground"
          )}
        >
          {tab.label}
          {tab.count != null && (
            <span className="ml-1.5 opacity-70">({tab.count})</span>
          )}
        </button>
      ))}
    </div>
  );
}
