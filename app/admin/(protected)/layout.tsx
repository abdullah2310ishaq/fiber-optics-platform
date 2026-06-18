import { redirect } from "next/navigation";
import { verifyAdminSession } from "@/lib/auth/admin-session";
import { AdminSidebar } from "@/components/admin/admin-sidebar";

export default async function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await verifyAdminSession();
  if (!session) redirect("/admin/login");

  return (
    <div className="flex min-h-screen bg-[#0f172a] text-slate-100">
      <AdminSidebar adminUsername={session.username} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
