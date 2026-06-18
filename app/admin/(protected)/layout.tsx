import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/admin-shell";
import { verifyAdminSession } from "@/lib/auth/admin-session";

export default async function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await verifyAdminSession();
  if (!session) redirect("/admin/login");

  return <AdminShell adminUsername={session.username}>{children}</AdminShell>;
}
