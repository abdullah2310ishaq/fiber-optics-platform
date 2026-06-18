"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  LogOut,
  Package,
  FileText,
  ShoppingCart,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, enabled: true },
  { href: "/admin/products", label: "Products", icon: Package, enabled: true },
  { href: "/admin/rfqs", label: "RFQs", icon: FileText, enabled: true },
  { href: "/admin/orders", label: "Orders", icon: ShoppingCart, enabled: true },
];

export function AdminSidebar({ adminUsername }: { adminUsername: string }) {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/session", { method: "DELETE" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <aside className="flex w-64 flex-col border-r border-slate-800 bg-slate-950 text-slate-200">
      <div className="border-b border-slate-800 p-6">
        <div className="flex items-center gap-2">
          <Lock className="h-5 w-5 text-blue-400" />
          <div>
            <p className="font-semibold text-white">Admin Panel</p>
            <p className="text-xs text-slate-500">Restricted Access</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          if (!item.enabled) {
            return (
              <div
                key={item.href}
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-600"
              >
                <Icon className="h-4 w-4" />
                {item.label}
                <span className="ml-auto text-xs">Soon</span>
              </div>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                isActive
                  ? "bg-blue-600 text-white"
                  : "text-slate-300 hover:bg-slate-800"
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-slate-800 p-4">
        <p className="truncate text-xs text-slate-500">Logged in as {adminUsername}</p>
        <Button
          variant="ghost"
          size="sm"
          className="mt-2 w-full justify-start text-slate-300 hover:bg-slate-800 hover:text-white"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </aside>
  );
}
