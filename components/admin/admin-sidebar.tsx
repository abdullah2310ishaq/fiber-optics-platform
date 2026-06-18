"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  ExternalLink,
  LayoutDashboard,
  LogOut,
  Package,
  FileText,
  ShoppingCart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Products", icon: Package },
  { href: "/admin/rfqs", label: "RFQs", icon: FileText },
  { href: "/admin/orders", label: "Orders", icon: ShoppingCart },
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
    <aside className="flex w-[260px] shrink-0 flex-col border-r border-slate-800/80 bg-[#0b1120]">
      <div className="border-b border-slate-800/80 p-5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-xs font-bold text-white">
            FO
          </div>
          <div>
            <p className="text-sm font-bold text-white">Control Center</p>
            <p className="text-[10px] uppercase tracking-widest text-slate-500">Admin ERP</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-1 p-3">
        <p className="px-3 py-2 text-[10px] font-semibold uppercase tracking-widest text-slate-600">
          Operations
        </p>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                isActive
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                  : "text-slate-400 hover:bg-slate-800/80 hover:text-white"
              )}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-slate-800/80 p-4 space-y-2">
        <Link
          href="/"
          target="_blank"
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-xs text-slate-500 hover:bg-slate-800/50 hover:text-slate-300"
        >
          <ExternalLink className="h-3.5 w-3.5" />
          View Public Site
        </Link>
        <p className="px-3 text-[11px] text-slate-600">Session: {adminUsername}</p>
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start text-slate-400 hover:bg-slate-800 hover:text-white"
          onClick={handleLogout}
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sign Out
        </Button>
      </div>
    </aside>
  );
}

export function AdminTopBar({ title }: { title?: string }) {
  return (
    <header className="sticky top-0 z-10 flex h-14 items-center border-b border-slate-800/80 bg-[#0f172a]/90 px-6 backdrop-blur-md">
      <p className="text-sm font-medium text-slate-300">{title ?? "Admin Panel"}</p>
    </header>
  );
}
