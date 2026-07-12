"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Bell } from "lucide-react";
import { useAdminNotifications } from "@/components/admin/admin-notification-provider";
import { cn } from "@/lib/utils";
import type { AdminNotification } from "@/types/admin-notification";

function formatTime(date: Date) {
  const diff = Date.now() - date.getTime();
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  return date.toLocaleDateString();
}

function NotificationRow({
  item,
  onOpen,
}: {
  item: AdminNotification;
  onOpen: (item: AdminNotification) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onOpen(item)}
      className={cn(
        "flex w-full gap-3 border-b border-border px-4 py-3 text-left transition-colors hover:bg-muted/80",
        !item.read && "bg-accent/5"
      )}
    >
      <span
        className={cn(
          "mt-1.5 h-2 w-2 shrink-0 rounded-full",
          item.read ? "bg-transparent" : "bg-accent"
        )}
      />
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-medium text-foreground">{item.title}</span>
        <span className="mt-0.5 block truncate text-xs text-muted-foreground">{item.body}</span>
        <span className="mt-1 block text-[10px] text-muted-foreground">{formatTime(item.createdAt)}</span>
      </span>
    </button>
  );
}

export function AdminNotificationBell() {
  const router = useRouter();
  const { notifications, unreadCount, openNotification } = useAdminNotifications();
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  const preview = notifications.slice(0, 8);

  useEffect(() => {
    if (!open) return;
    function handleClick(event: MouseEvent) {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  async function handleOpen(item: AdminNotification) {
    const href = await openNotification(item);
    setOpen(false);
    router.push(href);
  }

  return (
    <div className="relative" ref={panelRef}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-foreground transition-colors hover:bg-muted hover:text-foreground"
        aria-label="Notifications"
      >
        <Bell className="h-4 w-4" />
        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold text-accent-foreground">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-2 w-80 overflow-hidden rounded-xl border border-border bg-card shadow-xl">
          <div className="flex items-center justify-between border-b border-border px-4 py-3">
            <p className="text-sm font-semibold text-foreground">Notifications</p>
            {unreadCount > 0 && (
              <span className="text-xs text-accent">{unreadCount} unread</span>
            )}
          </div>

          <div className="max-h-80 overflow-y-auto">
            {preview.length === 0 ? (
              <p className="px-4 py-8 text-center text-sm text-muted-foreground">No notifications yet</p>
            ) : (
              preview.map((item) => (
                <NotificationRow key={item.id} item={item} onOpen={handleOpen} />
              ))
            )}
          </div>

          <div className="border-t border-border p-2">
            <Link
              href="/admin/notifications"
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-2 text-center text-sm text-accent hover:bg-muted"
            >
              View all notifications
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
