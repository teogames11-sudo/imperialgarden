import Link from "next/link";
import { Filigree } from "@/components/ui/filigree";
import type { NewsArticle } from "@/lib/types";
import { formatRuDate } from "@/lib/utils";

const labelMap: Record<NewsArticle["kind"], string> = {
  seminar: "Семинар",
  webinar: "Вебинар",
  promotion: "Акция",
  exhibition: "Выставка",
  news: "Новость",
};

export function NewsCard({ article }: { article: NewsArticle }) {
  return (
    <article className="soft-surface group flex h-full flex-col p-6 transition hover:-translate-y-1 hover:shadow-[0_30px_70px_rgba(20,45,36,0.14)]">
      <div className="flex items-center justify-between gap-3">
        <span className="organic-chip bg-[var(--color-blush)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-forest-strong)]">
          {labelMap[article.kind]}
        </span>
        <span className="text-sm text-[var(--color-gold-strong)]">{formatRuDate(article.date)}</span>
      </div>
      <div className="mt-5">
        <Filigree className="opacity-75" />
      </div>
      <Link href={`/news/${article.slug}`} className="mt-4 block">
        <h3 className="font-display text-3xl leading-[1.08] text-[var(--color-forest-strong)]">
          {article.title}
        </h3>
      </Link>
      <p className="mt-4 flex-1 text-sm leading-7 text-[var(--color-forest-muted)]">
        {article.summary}
      </p>
      <Link
        href={`/news/${article.slug}`}
        className="mt-6 inline-flex items-center text-sm font-semibold text-[var(--color-forest-strong)] transition hover:text-[var(--color-gold-strong)]"
      >
        Читать подробнее
      </Link>
    </article>
  );
}
