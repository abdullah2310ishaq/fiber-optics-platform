"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FileText, Package, ShoppingCart, Clock } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    getAdminStats()
      .then(setStats)
      .finally(() => setLoading(false));
  }, []);

  const cards = [
    { icon: Package, label: "Products", value: stats.products, href: "/admin/products" },
    { icon: FileText, label: "RFQs", value: stats.rfqs, href: "/admin/rfqs", sub: `${stats.pendingRfqs} pending` },
    { icon: ShoppingCart, label: "Orders", value: stats.orders, href: "/admin/orders", sub: `${stats.activeOrders} active` },
    { icon: Clock, label: "Pending RFQs", value: stats.pendingRfqs, href: "/admin/rfqs" },
  ];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="mt-1 text-slate-400">Overview of your B2B platform.</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map(({ icon: Icon, label, value, href, sub }) => (
          <Card key={label} className="border-slate-700 bg-slate-800 text-white">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-300">{label}</CardTitle>
              <Icon className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">{loading ? "—" : value}</p>
              {sub && <p className="text-xs text-slate-500">{loading ? "" : sub}</p>}
              <Button variant="ghost" size="sm" className="mt-2 h-auto p-0 text-blue-400 hover:text-blue-300" asChild>
                <Link href={href}>View →</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
