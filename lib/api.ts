import "server-only";

import { headers } from "next/headers";

/** Error returned by the Brandovert API (backend/), or `status: 0` when it can't be reached. */
export class ApiError extends Error {
  constructor(
    readonly status: number,
    message: string,
    readonly fieldErrors?: Record<string, string[] | undefined>
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export function isApiConfigured() {
  return Boolean(process.env.BACKEND_URL && process.env.BACKEND_API_KEY);
}

/** The visitor's IP, so the API can rate-limit per visitor rather than per Next.js server. */
async function clientIp() {
  const h = await headers();
  return h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "";
}

type ApiOptions = {
  method?: "GET" | "POST" | "PATCH" | "DELETE";
  body?: unknown;
  token?: string;
};

/** Raw call to the API. Only the server talks to it; the API key never reaches the browser. */
export async function apiFetch(path: string, { method = "GET", body, token }: ApiOptions = {}) {
  const base = process.env.BACKEND_URL;
  const key = process.env.BACKEND_API_KEY;
  if (!base || !key) {
    throw new ApiError(0, "The Brandovert API is not configured. Set BACKEND_URL and BACKEND_API_KEY.");
  }

  const ip = await clientIp();
  let res: Response;
  try {
    res = await fetch(new URL(`/api${path}`, base), {
      method,
      cache: "no-store",
      // Render's free plan can take up to a minute to wake an idle service.
      signal: AbortSignal.timeout(60_000),
      headers: {
        "x-api-key": key,
        ...(ip && { "x-client-ip": ip }),
        ...(token && { authorization: `Bearer ${token}` }),
        ...(body !== undefined && { "content-type": "application/json" }),
      },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
  } catch (error) {
    console.error(`[api] ${method} ${path} unreachable`, error);
    throw new ApiError(0, "Can't reach the Brandovert API right now.");
  }

  if (!res.ok) {
    const data = (await res.json().catch(() => ({}))) as {
      error?: string;
      fieldErrors?: Record<string, string[]>;
    };
    throw new ApiError(res.status, data.error ?? `API responded with ${res.status}`, data.fieldErrors);
  }
  return res;
}

export async function apiJson<T>(path: string, options?: ApiOptions): Promise<T> {
  const res = await apiFetch(path, options);
  return (res.status === 204 ? undefined : await res.json()) as T;
}
