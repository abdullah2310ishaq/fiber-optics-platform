import { Suspense } from "react";
import { AdminLoginForm } from "@/components/admin/admin-login-form";
import { SITE_NAME, SITE_NAME_SHORT } from "@/lib/site/brand";

export default function AdminLoginPage() {
  return (
    <div className="navy-mesh flex min-h-screen items-center justify-center px-4">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,106,0,0.08),transparent_60%)]" />
      <div className="relative w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent text-sm font-bold text-accent-foreground shadow-lg shadow-accent/30">
            {SITE_NAME_SHORT.slice(0, 2).toUpperCase()}
          </div>
          <h1 className="display-font text-xl font-bold text-foreground">Admin Control Center</h1>
          <p className="mt-1 text-sm text-muted-foreground">{SITE_NAME} — authorized personnel only</p>
        </div>
        <Suspense>
          <AdminLoginForm />
        </Suspense>
      </div>
    </div>
  );
}
