import { Suspense } from "react";
import { AdminLoginForm } from "@/components/admin/admin-login-form";

export default function AdminLoginPage() {
  return (
    <div className="admin-site flex min-h-screen items-center justify-center bg-[#0b1120] px-4">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(59,130,246,0.08),transparent_60%)]" />
      <div className="relative w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 text-sm font-bold text-white shadow-lg shadow-blue-600/30">
            FO
          </div>
          <h1 className="text-xl font-bold text-white">Admin Control Center</h1>
          <p className="mt-1 text-sm text-slate-500">Restricted access — authorized personnel only</p>
        </div>
        <Suspense>
          <AdminLoginForm />
        </Suspense>
      </div>
    </div>
  );
}
