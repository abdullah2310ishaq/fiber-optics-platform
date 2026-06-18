"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Clock, FileText, Package, ShoppingCart, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getAdminStats } from "@/lib/firestore/stats";

export function AdminDashboardStats() {
  const [stats, setStats] = useState({
    products: 0,
    rfqs: 0,
    orders: 0,
    pendingRfqs: 0,
    activeOrders: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAdminStats().then(setStats).finally(() => setLoading(false));
  }, []);

  const cards = [
    {
      icon: Package,
      label: "Products",
      value: stats.products,
      href: "/admin/products",
      color: "text-blue-400 bg-blue-500/10",
      sub: "In catalog",
    },
    {
      icon: FileText,
      label: "RFQs",
      value: stats.rfqs,
      href: "/admin/rfqs",
      color: "text-amber-400 bg-amber-500/10",
      sub: `${stats.pendingRfqs} pending review`,
    },
    {
      icon: ShoppingCart,
      label: "Orders",
      value: stats.orders,
      href: "/admin/orders",
      color: "text-emerald-400 bg-emerald-500/10",
      sub: `${stats.activeOrders} in progress`,
    },
    {
      icon: Clock,
      label: "Pending RFQs",
      value: stats.pendingRfqs,
      href: "/admin/rfqs",
      color: "text-purple-400 bg-purple-500/10",
      sub: "Awaiting quotation",
    },
  ];

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <p className="text-xs font-semibold uppercase tracking-widest text-blue-400">Overview</p>
        <h1 className="mt-1 text-2xl font-bold text-white">Operations Dashboard</h1>
        <p className="mt-1 text-sm text-slate-400">
          Real-time business metrics across products, quotations, and orders.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map(({ icon: Icon, label, value, href, color, sub }) => (
          <div
            key={label}
            className="group rounded-xl border border-slate-800 bg-slate-900/60 p-5 transition-all hover:border-slate-700 hover:bg-slate-900"
          >
            <div className="flex items-start justify-between">
              <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${color}`}>
                <Icon className="h-5 w-5" />
              </div>
              <ArrowUpRight className="h-4 w-4 text-slate-600 transition-colors group-hover:text-slate-400" />
            </div>
            <p className="mt-4 text-3xl font-bold text-white">{loading ? "—" : value}</p>
            <p className="mt-1 text-sm font-medium text-slate-300">{label}</p>
            <p className="text-xs text-slate-500">{loading ? "" : sub}</p>
            <Button variant="ghost" size="sm" className="mt-3 h-auto p-0 text-blue-400 hover:text-blue-300" asChild>
              <Link href={href}>Manage →</Link>
            </Button>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-blue-400" />
            <h2 className="font-semibold text-white">Workflow Summary</h2>
          </div>
          <ul className="mt-4 space-y-3 text-sm text-slate-400">
            <li className="flex justify-between border-b border-slate-800 pb-2">
              <span>Quotation requests</span>
              <span className="font-medium text-white">{loading ? "—" : stats.rfqs}</span>
            </li>
            <li className="flex justify-between border-b border-slate-800 pb-2">
              <span>Pending quotations</span>
              <span className="font-medium text-amber-400">{loading ? "—" : stats.pendingRfqs}</span>
            </li>
            <li className="flex justify-between">
              <span>Active shipments</span>
              <span className="font-medium text-emerald-400">{loading ? "—" : stats.activeOrders}</span>
            </li>
          </ul>
        </div>

        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-6">
          <h2 className="font-semibold text-white">Quick Actions</h2>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {[
              { href: "/admin/products", label: "Add Product" },
              { href: "/admin/rfqs", label: "Review RFQs" },
              { href: "/admin/orders", label: "Update Orders" },
              { href: "/", label: "Public Site", external: true },
            ].map((action) => (
              <Button
                key={action.label}
                variant="outline"
                size="sm"
                className="border-slate-700 bg-slate-800/50 text-slate-300 hover:bg-slate-800 hover:text-white"
                asChild
              >
                <Link href={action.href} target={action.external ? "_blank" : undefined}>
                  {action.label}
                </Link>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
