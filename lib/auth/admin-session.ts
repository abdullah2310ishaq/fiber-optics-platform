import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { COOKIE_NAME, SESSION_MAX_AGE } from "@/lib/auth/session-config";

function getSecret(): string {
  return process.env.SESSION_COOKIE_SECRET ?? "fiber-optics-admin-secret";
}

function sign(payload: string): string {
  return createHmac("sha256", getSecret()).update(payload).digest("hex");
}

export function verifyAdminPassword(password: string): boolean {
  const expected = process.env.ADMIN_PASSWORD ?? "admin123";
  return password === expected;
}

export function createAdminSessionToken(): string {
  const expires = Date.now() + SESSION_MAX_AGE * 1000;
  const payload = `admin:${expires}`;
  return `${payload}.${sign(payload)}`;
}

function verifyToken(token: string): boolean {
  const dot = token.lastIndexOf(".");
  if (dot === -1) return false;

  const payload = token.slice(0, dot);
  const signature = token.slice(dot + 1);
  const expected = sign(payload);

  try {
    if (!timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) return false;
  } catch {
    return false;
  }

  const expires = Number(payload.split(":")[1]);
  return Number.isFinite(expires) && Date.now() < expires;
}

export async function verifyAdminSession(): Promise<{ username: string } | null> {
  const cookieStore = await cookies();
  const session = cookieStore.get(COOKIE_NAME)?.value;
  if (!session || !verifyToken(session)) return null;
  return { username: "admin" };
}

export async function clearAdminSessionCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export { COOKIE_NAME, SESSION_MAX_AGE } from "@/lib/auth/session-config";
