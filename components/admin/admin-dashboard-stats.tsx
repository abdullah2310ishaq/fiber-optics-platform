"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FileText, Package, ShoppingCart } from "lucide-react";
import { AdminCard, AdminLoading, AdminPage, AdminPageHeader } from "@/components/admin/admin-ui";
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
    { icon: Package, label: "Products", value: stats.products, href: "/admin/products" },
    { icon: FileText, label: "RFQs", value: stats.rfqs, href: "/admin/rfqs", alert: stats.pendingRfqs },
    { icon: ShoppingCart, label: "Orders", value: stats.orders, href: "/admin/orders", alert: stats.activeOrders },
  ];

  return (
    <AdminPage>
      <AdminPageHeader
        title="Dashboard"
        description="Quick overview of your store."
      />

      {loading ? (
        <AdminLoading label="Loading stats..." />
      ) : (
        <div className="grid gap-4 sm:grid-cols-3">
          {cards.map(({ icon: Icon, label, value, href, alert }) => (
            <AdminCard key={label} className="p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-100 text-orange-700">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-foreground">{value}</p>
                  <p className="text-sm text-muted-foreground">{label}</p>
                  {alert != null && alert > 0 && (
                    <p className="text-xs text-amber-700">{alert} need attention</p>
                  )}
                </div>
              </div>
              <Button variant="ghost" size="sm" className="mt-4 h-auto p-0 text-accent" asChild>
                <Link href={href}>Open →</Link>
              </Button>
            </AdminCard>
          ))}
        </div>
      )}
    </AdminPage>
  );
}
