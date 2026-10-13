import Link from "next/link";
import { FileSpreadsheet, LogOut, MessageCircle, Search, X } from "lucide-react";
import { ApiError } from "@/lib/api";
import { services } from "@/lib/content/services";
import { cn } from "@/lib/utils";
import { filterQuery, listEnquiries } from "@/lib/vertbook/enquiries";
import { readFilters, serviceLabel, statusLabels, type EnquiryFilters } from "@/lib/vertbook/filters";
import { enquiryStatuses, type Enquiry, type EnquiryList } from "@/lib/vertbook/types";
import { logout } from "./actions";
import { DeleteButton, StatusSelect } from "./enquiry-controls";
import { VertbookMark } from "./vertbook-mark";

const dateFormat = new Intl.DateTimeFormat("en-IN", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  hour: "numeric",
  minute: "2-digit",
  timeZone: "Asia/Kolkata",
});

const columns = [
  { label: "Date", width: "min-w-44" },
  { label: "Name", width: "min-w-40" },
  { label: "Phone", width: "min-w-36" },
  { label: "Email", width: "min-w-52" },
  { label: "Service", width: "min-w-44" },
  { label: "Status", width: "min-w-32" },
  { label: "Message", width: "min-w-80" },
  { label: "Actions", width: "min-w-24" },
];

/** Blank rows below the data so the sheet always looks like a spreadsheet. */
const MIN_ROWS = 24;

const cell = "h-8 border-r border-b border-[#e1e1e1] px-2 text-left align-middle whitespace-nowrap";
const headCell = "h-6 border-r border-b border-[#d4d4d4] bg-[#f3f3f3] text-center text-xs font-normal text-neutral-500";
const rowNumber = "sticky left-0 z-10 w-11 min-w-11 border-r border-b border-[#d4d4d4] bg-[#f3f3f3] text-center text-xs text-neutral-500";

function digits(phone: string) {
  return phone.replace(/\D/g, "");
}

async function load(filters: EnquiryFilters) {
  try {
    return { data: await listEnquiries(filters) };
  } catch (error) {
    // Login redirects from `listEnquiries` must propagate.
    if (!(error instanceof ApiError)) throw error;
    console.error("[vertbook] failed to load enquiries", error);
    return { error: error.status === 0 ? error.message : "The server returned an error." };
  }
}

const emptyList: EnquiryList = {
  items: [],
  total: 0,
  page: 1,
  limit: 0,
  counts: { all: 0, new: 0, contacted: 0, closed: 0 },
};

function href(filters: Partial<EnquiryFilters>) {
  const query = filterQuery(filters);
  return `/vertbook${query.size ? `?${query}` : ""}`;
}

export default async function VertbookPage({ searchParams }: PageProps<"/vertbook">) {
  const filters = readFilters(await searchParams);
  const { data = emptyList, error } = await load(filters);
  const { items, total, counts } = data;
  const filtered = Boolean(filters.q || filters.status || filters.service);
  const exportQuery = filterQuery(filters);

  const sheets = [
    { label: "All requests", count: counts.all, status: "" as const },
    ...enquiryStatuses.map((s) => ({ label: statusLabels[s], count: counts[s], status: s })),
  ];
  const blankRows = Math.max(0, MIN_ROWS - items.length - (error || items.length === 0 ? 1 : 0));

  return (
    <div className="flex h-dvh flex-col bg-white text-[13px] text-ink">
      {/* Title bar */}
      <header className="flex h-14 shrink-0 items-center justify-between gap-4 border-b border-[#d4d4d4] px-4">
        <div className="flex min-w-0 items-center gap-3">
          <VertbookMark />
          <span className="hidden truncate rounded-md bg-[#f3f3f3] px-2.5 py-1 text-xs font-medium text-neutral-600 sm:inline">
            Website requests.xlsx
          </span>
        </div>
        <form action={logout}>
          <button
            type="submit"
            className="inline-flex h-8 items-center gap-2 rounded-md px-3 text-sm font-medium text-neutral-600 hover:bg-[#f3f3f3] hover:text-ink"
          >
            <LogOut className="size-4" aria-hidden />
            Log out
          </button>
        </form>
      </header>

      <form role="search" className="shrink-0 border-b border-[#d4d4d4] bg-[#f8f8f8]">
        {/* Ribbon */}
        <div className="flex flex-wrap items-center gap-2 border-b border-[#e1e1e1] px-3 py-2">
          <input type="hidden" name="status" value={filters.status} />
          <label className="flex items-center gap-1.5 text-xs text-neutral-500">
            Service
            <select
              name="service"
              defaultValue={filters.service}
              className="h-7 max-w-52 rounded border border-[#c8c8c8] bg-white px-2 text-[13px] text-ink outline-none focus:border-[#107c41]"
            >
              <option value="">All services</option>
              {services.map((s) => (
                <option key={s.slug} value={s.slug}>
                  {s.title}
                </option>
              ))}
              <option value="other">{serviceLabel("other")}</option>
            </select>
          </label>
          <button
            type="submit"
            className="h-7 rounded border border-[#107c41] bg-[#107c41] px-3 text-[13px] font-semibold text-white hover:bg-[#0e6b38]"
          >
            Apply
          </button>
          {filtered && (
            <Link
              href="/vertbook"
              className="inline-flex h-7 items-center gap-1 rounded border border-[#c8c8c8] bg-white px-2.5 font-medium text-neutral-600 hover:border-neutral-400"
            >
              <X className="size-3.5" aria-hidden />
              Clear filters
            </Link>
          )}
          <a
            href={`/vertbook/export${exportQuery.size ? `?${exportQuery}` : ""}`}
            className="ml-auto inline-flex h-7 items-center gap-1.5 rounded border border-[#c8c8c8] bg-white px-3 font-semibold text-[#107c41] hover:border-[#107c41]"
          >
            <FileSpreadsheet className="size-4" aria-hidden />
            Export to Excel (CSV)
          </a>
        </div>

        {/* Formula bar */}
        <div className="flex h-8 items-stretch bg-white">
          <span className="flex w-24 shrink-0 items-center border-r border-[#d4d4d4] px-2 font-mono text-xs text-neutral-600">
            A1:H{items.length + 1}
          </span>
          <span className="flex w-10 shrink-0 items-center justify-center border-r border-[#d4d4d4] font-serif text-sm text-neutral-500 italic">
            fx
          </span>
          <label className="relative flex min-w-0 flex-1 items-center">
            <span className="sr-only">Search</span>
            <Search className="pointer-events-none absolute left-2 size-3.5 text-neutral-400" aria-hidden />
            <input
              name="q"
              defaultValue={filters.q}
              placeholder="Search name, email, phone or message, then press Enter"
              className="h-full w-full bg-transparent pr-3 pl-7 outline-none placeholder:text-neutral-400 focus:bg-[#f2fbf6]"
            />
          </label>
        </div>
      </form>

      {/* Grid */}
      <div className="min-h-0 flex-1 overflow-auto">
        <table className="border-separate border-spacing-0">
          <thead className="sticky top-0 z-20">
            <tr>
              <th className={cn(headCell, "sticky left-0 z-10 w-11 min-w-11")} aria-hidden />
              {columns.map((c, i) => (
                <th key={c.label} className={cn(headCell, c.width)} aria-hidden>
                  {String.fromCharCode(65 + i)}
                </th>
              ))}
              <th className={cn(headCell, "w-full")} aria-hidden />
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className={rowNumber}>1</td>
              {columns.map((c) => (
                <th key={c.label} scope="col" className={cn(cell, "bg-[#e9f5ee] font-bold text-[#0b5a2f]")}>
                  {c.label}
                </th>
              ))}
              <td className={cn(cell, "bg-[#e9f5ee]")} />
            </tr>

            {error ? (
              <MessageRow row={2} tone="error">
                #REF! Couldn&rsquo;t load requests. {error} Check that the Brandovert API is running, then refresh.
              </MessageRow>
            ) : items.length === 0 ? (
              <MessageRow row={2}>
                {counts.all === 0
                  ? "No requests yet. New messages from the website will show up here."
                  : "No requests match these filters. Try a different search or clear the filters."}
              </MessageRow>
            ) : (
              items.map((e, i) => <EnquiryRow key={e.id} enquiry={e} row={i + 2} />)
            )}

            {Array.from({ length: blankRows }, (_, i) => {
              const row = items.length + (error || items.length === 0 ? 3 : 2) + i;
              return (
                <tr key={`blank-${row}`} aria-hidden>
                  <td className={rowNumber}>{row}</td>
                  {columns.map((c) => (
                    <td key={c.label} className={cell} />
                  ))}
                  <td className={cell} />
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Sheet tabs */}
      <nav aria-label="Sheets" className="flex h-9 shrink-0 items-stretch overflow-x-auto border-t border-[#d4d4d4] bg-[#f3f3f3]">
        {sheets.map((s) => {
          const active = filters.status === s.status;
          return (
            <Link
              key={s.label}
              href={href({ ...filters, status: s.status })}
              aria-current={active ? "page" : undefined}
              className={cn(
                "flex shrink-0 items-center gap-2 border-r border-[#d4d4d4] px-4 whitespace-nowrap",
                active
                  ? "-mt-px border-t-2 border-t-[#107c41] bg-white font-semibold text-[#107c41]"
                  : "text-neutral-600 hover:bg-white/70"
              )}
            >
              {s.label}
              <span
                className={cn(
                  "rounded-full px-1.5 text-[11px] font-semibold",
                  active ? "bg-[#107c41] text-white" : "bg-neutral-200 text-neutral-600"
                )}
              >
                {s.count}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Status bar */}
      <footer className="flex h-6 shrink-0 items-center justify-between gap-4 bg-[#107c41] px-3 text-xs text-white">
        <span>{error ? "Offline" : "Ready"}</span>
        {!error && (
          <span>
            {filtered ? `Count: ${total} of ${counts.all}` : `Count: ${counts.all}`}
            {items.length < total && ` · showing the latest ${items.length}`}
          </span>
        )}
      </footer>
    </div>
  );
}

function MessageRow({ row, tone, children }: { row: number; tone?: "error"; children: React.ReactNode }) {
  return (
    <tr>
      <td className={rowNumber}>{row}</td>
      <td
        colSpan={columns.length}
        className={cn(cell, tone === "error" ? "font-semibold text-brand" : "text-neutral-500 italic")}
      >
        {children}
      </td>
      <td className={cell} />
    </tr>
  );
}

function EnquiryRow({ enquiry: e, row }: { enquiry: Enquiry; row: number }) {
  const whatsapp = `https://wa.me/${digits(e.phone)}?text=${encodeURIComponent(
    `Hi ${e.name.split(" ")[0]}, this is Brandovert about your enquiry.`
  )}`;
  const link = "text-[#0563c1] underline decoration-[#0563c1]/40 underline-offset-2 hover:decoration-[#0563c1]";

  return (
    <tr className="group">
      <td className={cn(rowNumber, "group-hover:bg-[#d3f0e0] group-hover:text-[#0b5a2f]")}>{row}</td>
      <td className={cn(cell, "tabular-nums group-hover:bg-[#f2fbf6]")}>
        <time dateTime={e.createdAt}>{dateFormat.format(new Date(e.createdAt))}</time>
      </td>
      <td className={cn(cell, "group-hover:bg-[#f2fbf6]", e.status === "new" && "font-bold")}>{e.name}</td>
      <td className={cn(cell, "tabular-nums group-hover:bg-[#f2fbf6]")}>
        <a href={`tel:+${digits(e.phone)}`} className={link} title="Call">
          {e.phone}
        </a>
      </td>
      <td className={cn(cell, "max-w-64 truncate group-hover:bg-[#f2fbf6]")}>
        <a href={`mailto:${e.email}`} className={link} title="Send email">
          {e.email}
        </a>
      </td>
      <td className={cn(cell, "group-hover:bg-[#f2fbf6]")}>{serviceLabel(e.service)}</td>
      <td className={cn(cell, "p-0")}>
        <StatusSelect key={e.status} id={e.id} status={e.status} labels={statusLabels} />
      </td>
      <td
        className={cn(cell, "max-w-[28rem] truncate text-neutral-700 group-hover:bg-[#f2fbf6]")}
        title={e.message}
      >
        {e.message ?? <span className="text-neutral-300">—</span>}
      </td>
      <td className={cn(cell, "py-0 group-hover:bg-[#f2fbf6]")}>
        <div className="flex items-center gap-0.5">
          <a
            href={whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            title="WhatsApp"
            aria-label={`WhatsApp ${e.name}`}
            className="grid size-7 place-items-center rounded text-neutral-500 hover:bg-[#25D366]/15 hover:text-[#128C7E]"
          >
            <MessageCircle className="size-3.5" aria-hidden />
          </a>
          <DeleteButton id={e.id} name={e.name} />
        </div>
      </td>
      <td className={cn(cell, "group-hover:bg-[#f2fbf6]")} />
    </tr>
  );
}
