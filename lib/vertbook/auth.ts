import "server-only";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { apiJson, ApiError, isApiConfigured } from "@/lib/api";

const COOKIE = "vertbook_session";

export { isApiConfigured as isConfigured };

/** Logs in through the API and keeps its token in an httpOnly cookie. Throws `ApiError`. */
export async function startSession(password: string) {
  const { token, expiresAt } = await apiJson<{ token: string; expiresAt: string }>("/auth/login", {
    method: "POST",
    body: { password },
  });
  (await cookies()).set(COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/vertbook",
    expires: new Date(expiresAt),
  });
}

export async function endSession() {
  (await cookies()).delete({ name: COOKIE, path: "/vertbook" });
}

export async function getToken() {
  return (await cookies()).get(COOKIE)?.value;
}

/** True when the API accepts the stored token. */
export async function hasSession() {
  const token = await getToken();
  if (!token || !isApiConfigured()) return false;
  try {
    await apiJson("/auth/me", { token });
    return true;
  } catch {
    return false;
  }
}

/**
 * Returns the stored token or sends the visitor to the login page.
 * The API still verifies the token on every call; see `adminApi`.
 */
export async function requireSession() {
  const token = await getToken();
  if (!token) redirect("/vertbook/login");
  return token;
}

/** Runs an API call as the logged-in admin; an expired or invalid token goes back to login. */
export async function adminApi<T>(call: (token: string) => Promise<T>): Promise<T> {
  const token = await requireSession();
  try {
    return await call(token);
  } catch (error) {
    if (error instanceof ApiError && error.status === 401) redirect("/vertbook/login");
    throw error;
  }
}
