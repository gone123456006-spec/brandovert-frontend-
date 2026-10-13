import { apiFetch, ApiError } from "@/lib/api";
import { getToken } from "@/lib/vertbook/auth";
import { filterQuery } from "@/lib/vertbook/enquiries";
import { readFilters } from "@/lib/vertbook/filters";

export async function GET(request: Request) {
  const token = await getToken();
  if (!token) return new Response("Unauthorized", { status: 401 });

  const query = filterQuery(readFilters(new URL(request.url).searchParams));
  try {
    const res = await apiFetch(`/enquiries/export?${query}`, { token });
    return new Response(res.body, {
      headers: {
        "Content-Type": res.headers.get("content-type") ?? "text/csv; charset=utf-8",
        "Content-Disposition": res.headers.get("content-disposition") ?? 'attachment; filename="vertbook-requests.csv"',
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    const status = error instanceof ApiError && error.status === 401 ? 401 : 502;
    return new Response(status === 401 ? "Unauthorized" : "Export failed. Please try again.", { status });
  }
}
