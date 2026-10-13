import "server-only";

import { apiJson } from "@/lib/api";
import { adminApi } from "./auth";
import type { EnquiryFilters } from "./filters";
import type { Enquiry, EnquiryList, EnquiryStatus } from "./types";

export type NewEnquiry = Pick<Enquiry, "name" | "email" | "phone" | "service" | "message">;

/** Public: saves a "Send us a message" request. */
export async function createEnquiry(input: NewEnquiry) {
  return apiJson<{ id: string }>("/enquiries", { method: "POST", body: input });
}

export function filterQuery(filters: Partial<EnquiryFilters>) {
  return new URLSearchParams(
    Object.entries(filters).filter((entry): entry is [string, string] => Boolean(entry[1]))
  );
}

export async function listEnquiries(filters: EnquiryFilters) {
  const query = filterQuery({ ...filters });
  query.set("limit", "500");
  return adminApi((token) => apiJson<EnquiryList>(`/enquiries?${query}`, { token }));
}

export async function setEnquiryStatus(id: string, status: EnquiryStatus) {
  await adminApi((token) =>
    apiJson(`/enquiries/${encodeURIComponent(id)}`, { method: "PATCH", body: { status }, token })
  );
}

export async function deleteEnquiry(id: string) {
  await adminApi((token) =>
    apiJson(`/enquiries/${encodeURIComponent(id)}`, { method: "DELETE", token })
  );
}
