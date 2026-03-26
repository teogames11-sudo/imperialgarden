import Link from "next/link";
import { Filigree } from "@/components/ui/filigree";
import type { TrainingEvent } from "@/lib/types";
import { formatRuDate } from "@/lib/utils";

export function TrainingCard({ event }: { event: TrainingEvent }) {
  const isArchive = event.status === "archive";

  return (
    <article className="soft-surface flex h-full flex-col p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="organic-chip bg-[var(--color-blush)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-forest-strong)]">
          {event.format === "seminar" ? "Семинар" : "Вебинар"}
        </span>
        <span className="text-sm text-[var(--color-gold-strong)]">
          {event.publicationDate.includes(".")
            ? formatRuDate(event.publicationDate)
            : event.publicationDate}
        </span>
      </div>
      <div className="mt-5">
        <Filigree className="opacity-75" />
      </div>
      <h3 className="mt-4 font-display text-3xl leading-[1.08] text-[var(--color-forest-strong)]">
        {event.title}
      </h3>
      <p className="mt-4 flex-1 text-sm leading-7 text-[var(--color-forest-muted)]">
        {event.summary}
      </p>
      <div className="mt-6 flex items-center justify-between gap-3">
        <span className="text-sm text-[var(--color-forest-muted)]">
          {isArchive ? "Архив бренда" : "По предварительной заявке"}
        </span>
        <Link
          href={`/training/events/${event.slug}`}
          className="text-sm font-semibold text-[var(--color-forest-strong)] transition hover:text-[var(--color-gold-strong)]"
        >
          Подробнее
        </Link>
      </div>
    </article>
  );
}
