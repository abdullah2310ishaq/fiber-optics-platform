"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCheck, MailOpen } from "lucide-react";
import { useAdminNotifications } from "@/components/admin/admin-notification-provider";
import {
  AdminCard,
  AdminEmpty,
  AdminLoading,
  AdminPage,
  AdminPageHeader,
  AdminTabs,
} from "@/components/admin/admin-ui";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { AdminNotification } from "@/types/admin-notification";

function formatDate(date: Date) {
  return date.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function AdminNotificationsPage() {
  const router = useRouter();
  const {
    notifications,
    loading,
    unreadCount,
    markRead,
    markUnread,
    markAllRead,
    openNotification,
  } = useAdminNotifications();
  const [tab, setTab] = useState<"all" | "unread">("all");

  const filtered = useMemo(() => {
    if (tab === "unread") return notifications.filter((item) => !item.read);
    return notifications;
  }, [notifications, tab]);

  async function handleOpen(item: AdminNotification) {
    const href = await openNotification(item);
    router.push(href);
  }

  return (
    <AdminPage>
      <AdminPageHeader
        title="Notifications"
        description="Real-time alerts for new orders and RFQs. Click to jump to the right page."
        action={
          unreadCount > 0 ? (
            <Button size="sm" variant="outline" onClick={markAllRead} className="border-slate-700">
              <CheckCheck className="h-4 w-4" />
              Mark all read
            </Button>
          ) : undefined
        }
      />

      <AdminTabs
        tabs={[
          { id: "all", label: "All", count: notifications.length },
          { id: "unread", label: "Unread", count: unreadCount },
        ]}
        active={tab}
        onChange={(id) => setTab(id as "all" | "unread")}
      />

      {loading ? (
        <AdminLoading label="Loading notifications..." />
      ) : filtered.length === 0 ? (
        <AdminEmpty>
          {tab === "unread" ? "No unread notifications." : "No notifications yet."}
        </AdminEmpty>
      ) : (
        <div className="space-y-3">
          {filtered.map((item) => (
            <AdminCard
              key={item.id}
              className={cn(
                "flex flex-wrap items-center justify-between gap-4 p-4",
                !item.read && "border-blue-500/30"
              )}
            >
              <button
                type="button"
                onClick={() => handleOpen(item)}
                className="min-w-0 flex-1 text-left"
              >
                <div className="flex items-center gap-2">
                  {!item.read && <span className="h-2 w-2 rounded-full bg-blue-500" />}
                  <p className="font-medium text-white">{item.title}</p>
                  <span className="rounded bg-slate-800 px-2 py-0.5 text-[10px] uppercase text-slate-400">
                    {item.type}
                  </span>
                </div>
                <p className="mt-1 text-sm text-slate-400">{item.body}</p>
                <p className="mt-1 text-xs text-slate-500">{formatDate(item.createdAt)}</p>
              </button>

              <Button
                size="sm"
                variant="ghost"
                className="text-slate-400"
                onClick={() => (item.read ? markUnread(item.id) : markRead(item.id))}
              >
                {item.read ? (
                  <>
                    <MailOpen className="h-4 w-4" />
                    Mark unread
                  </>
                ) : (
                  <>
                    <CheckCheck className="h-4 w-4" />
                    Mark read
                  </>
                )}
              </Button>
            </AdminCard>
          ))}
        </div>
      )}
    </AdminPage>
  );
}
