"use client";

import { AdminNotificationBell } from "@/components/admin/admin-notification-bell";

export function AdminHeader() {
  return (
    <header className="sticky top-0 z-40 flex items-center justify-end border-b border-border bg-card px-5 py-3 lg:px-8">
      <AdminNotificationBell />
    </header>
  );
}
