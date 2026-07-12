"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Bell } from "lucide-react";
import { useAdminNotifications } from "@/components/admin/admin-notification-provider";

export function AdminNotificationToast() {
  const router = useRouter();
  const { latestUnread, clearLatestUnread, openNotification } = useAdminNotifications();

  useEffect(() => {
    if (!latestUnread) return;
    const timer = window.setTimeout(clearLatestUnread, 6000);
    return () => window.clearTimeout(timer);
  }, [latestUnread, clearLatestUnread]);

  if (!latestUnread) return null;

  async function handleClick() {
    const href = await openNotification(latestUnread!);
    clearLatestUnread();
    router.push(href);
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 flex max-w-sm items-start gap-3 rounded-xl border border-accent/30 bg-card px-4 py-3 text-left shadow-2xl transition-transform hover:scale-[1.02]"
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-700">
        <Bell className="h-4 w-4" />
      </span>
      <span>
        <span className="block text-sm font-semibold text-foreground">{latestUnread.title}</span>
        <span className="mt-0.5 block text-xs text-muted-foreground">{latestUnread.body}</span>
        <span className="mt-1 block text-[10px] text-accent">Tap to open</span>
      </span>
    </button>
  );
}
