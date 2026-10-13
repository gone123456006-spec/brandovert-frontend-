import { services } from "@/lib/content/services";
import { enquiryStatuses, type EnquiryStatus } from "./types";

export type EnquiryFilters = { q: string; status: EnquiryStatus | ""; service: string };

type Params = Record<string, string | string[] | undefined> | URLSearchParams;

function param(params: Params, key: string) {
  const value = params instanceof URLSearchParams ? params.get(key) : params[key];
  return (Array.isArray(value) ? value[0] : value)?.trim() ?? "";
}

export function readFilters(params: Params): EnquiryFilters {
  const status = param(params, "status");
  const service = param(params, "service");
  return {
    q: param(params, "q").slice(0, 200),
    status: enquiryStatuses.includes(status as EnquiryStatus) ? (status as EnquiryStatus) : "",
    service: service === "other" || services.some((s) => s.slug === service) ? service : "",
  };
}

export function serviceLabel(slug: string) {
  if (slug === "other") return "Other / not sure";
  return services.find((s) => s.slug === slug)?.title ?? slug;
}

export const statusLabels: Record<EnquiryStatus, string> = {
  new: "New",
  contacted: "Contacted",
  closed: "Closed",
};
