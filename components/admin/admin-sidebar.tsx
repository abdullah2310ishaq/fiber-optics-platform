"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Bell,
  ExternalLink,
  LayoutDashboard,
  LogOut,
  Package,
  FileText,
  ShoppingCart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAdminNotifications } from "@/components/admin/admin-notification-provider";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, match: "exact" as const },
  { href: "/admin/products/list", label: "Products", icon: Package, match: "prefix" as const },
  { href: "/admin/rfqs", label: "RFQs", icon: FileText, match: "exact" as const },
  { href: "/admin/orders", label: "Orders", icon: ShoppingCart, match: "exact" as const },
  { href: "/admin/notifications", label: "Notifications", icon: Bell, match: "exact" as const },
];

export function AdminSidebar({ adminUsername }: { adminUsername: string }) {
  const pathname = usePathname();
  const router = useRouter();
  const { unreadCount } = useAdminNotifications();

  async function handleLogout() {
    await fetch("/api/auth/session", { method: "DELETE" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <aside className="flex w-56 shrink-0 flex-col border-r border-slate-800 bg-slate-950">
      <div className="border-b border-slate-800 px-4 py-5">
        <p className="text-base font-bold text-white">Admin</p>
        <p className="text-xs text-slate-500">Fiber Optics</p>
      </div>

      <nav className="flex-1 space-y-1 p-3">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.match === "prefix"
              ? pathname.startsWith("/admin/products")
              : pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-slate-400 hover:bg-slate-900 hover:text-white"
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span className="flex-1">{item.label}</span>
              {item.href === "/admin/notifications" && unreadCount > 0 && (
                <span className="rounded-full bg-blue-500 px-1.5 py-0.5 text-[10px] font-bold text-white">
                  {unreadCount > 9 ? "9+" : unreadCount}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      <div className="space-y-2 border-t border-slate-800 p-3">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs text-slate-500 hover:bg-slate-900 hover:text-slate-300"
        >
          <ExternalLink className="h-3.5 w-3.5" />
          View site
        </Link>
        <p className="truncate px-3 text-[11px] text-slate-600">{adminUsername}</p>
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start text-slate-400 hover:bg-slate-900 hover:text-white"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign out
        </Button>
      </div>
    </aside>
  );
}
