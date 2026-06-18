import { NextResponse } from "next/server";
import { verifyAdminSession } from "@/lib/auth/admin-session";

export async function requireAdmin() {
  const session = await verifyAdminSession();
  if (!session) {
    return { session: null, error: NextResponse.json({ error: "Unauthorized" }, { status: 401 }) };
  }
  return { session, error: null };
}
