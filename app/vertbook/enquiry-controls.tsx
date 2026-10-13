"use client";

import { useTransition } from "react";
import { Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { EnquiryStatus } from "@/lib/vertbook/types";
import { removeEnquiry, updateStatus } from "./actions";

const statusStyles: Record<EnquiryStatus, string> = {
  new: "bg-brand-soft text-brand-strong",
  contacted: "bg-amber-50 text-amber-800",
  closed: "bg-emerald-50 text-emerald-800",
};

export function StatusSelect({
  id,
  status,
  labels,
}: {
  id: string;
  status: EnquiryStatus;
  labels: Record<EnquiryStatus, string>;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <select
      aria-label="Status"
      defaultValue={status}
      disabled={pending}
      onChange={(e) => {
        const data = new FormData();
        data.set("id", id);
        data.set("status", e.target.value);
        startTransition(() => updateStatus(data));
      }}
      className={cn(
        "h-full w-full cursor-pointer px-2 text-[13px] font-semibold outline-none focus-visible:ring-2 focus-visible:ring-[#107c41] focus-visible:ring-inset disabled:opacity-60",
        statusStyles[status]
      )}
    >
      {(Object.keys(labels) as EnquiryStatus[]).map((s) => (
        <option key={s} value={s}>
          {labels[s]}
        </option>
      ))}
    </select>
  );
}

export function DeleteButton({ id, name }: { id: string; name: string }) {
  const [pending, startTransition] = useTransition();

  return (
    <button
      type="button"
      disabled={pending}
      aria-label={`Delete request from ${name}`}
      onClick={() => {
        if (!confirm(`Delete the request from ${name}? This can't be undone.`)) return;
        const data = new FormData();
        data.set("id", id);
        startTransition(() => removeEnquiry(data));
      }}
      title="Delete"
      className="grid size-7 place-items-center rounded text-neutral-400 transition hover:bg-brand-soft hover:text-brand disabled:opacity-50"
    >
      <Trash2 className="size-3.5" aria-hidden />
    </button>
  );
}
