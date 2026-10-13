import { BookOpenCheck } from "lucide-react";

export function VertbookMark() {
  return (
    <span className="inline-flex items-center gap-2.5">
      <span className="grid size-10 place-items-center rounded-xl bg-ink text-white">
        <BookOpenCheck className="size-5" aria-hidden />
      </span>
      <span className="font-display text-2xl leading-none font-black text-ink">
        Vert<span className="text-brand">book</span>
      </span>
    </span>
  );
}
