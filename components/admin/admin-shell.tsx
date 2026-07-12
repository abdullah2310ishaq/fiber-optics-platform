"use client";

import { AdminHeader } from "@/components/admin/admin-header";
import { AdminNotificationProvider } from "@/components/admin/admin-notification-provider";
import { AdminNotificationToast } from "@/components/admin/admin-notification-toast";
import { AdminSidebar } from "@/components/admin/admin-sidebar";

export function AdminShell({
  adminUsername,
  children,
}: {
  adminUsername: string;
  children: React.ReactNode;
}) {
  return (
    <AdminNotificationProvider>
      <div className="flex min-h-screen bg-background text-foreground">
        <AdminSidebar adminUsername={adminUsername} />
        <div className="flex min-w-0 flex-1 flex-col">
          <AdminHeader />
          <main className="flex-1 overflow-auto">
            <div className="mx-auto max-w-5xl px-5 py-6 lg:px-8 lg:py-8">{children}</div>
          </main>
        </div>
        <AdminNotificationToast />
      </div>
    </AdminNotificationProvider>
  );
}
