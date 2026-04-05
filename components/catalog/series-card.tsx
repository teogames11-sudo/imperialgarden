import Image from "next/image";
import Link from "next/link";
import { Filigree } from "@/components/ui/filigree";
import { purposeLabels } from "@/data/site";
import type { Product, Series } from "@/lib/types";

export function SeriesCard({
  series,
  previewProducts,
}: {
  series: Series;
  previewProducts: Product[];
}) {
  return (
    <article className="leaf-panel grid overflow-hidden rounded-[42px] border border-[rgba(17,45,34,0.1)] bg-[rgba(255,250,244,0.9)] shadow-[0_26px_80px_rgba(19,44,35,0.12)] lg:grid-cols-[1.05fr,0.95fr]">
      <div className="relative min-h-[24rem] overflow-hidden bg-[var(--color-forest)]">
        <Image
          src={series.coverImage}
          alt={series.name}
          fill
          className="object-cover opacity-90"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(145deg, rgba(11,29,22,0.82), ${series.accent}99 52%, rgba(250,247,242,0.14))`,
          }}
        />
        <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
          <div className="flex items-center gap-3">
            <Filigree className="opacity-80" />
            <p className="text-xs uppercase tracking-[0.24em] text-white/[0.8]">
              Серия бренда
            </p>
          </div>
          <h3 className="mt-3 font-display text-5xl leading-none sm:text-6xl">{series.name}</h3>
          <p className="mt-4 max-w-lg text-sm leading-7 text-white/[0.84] sm:text-base">
            {series.description}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            {series.purposes.slice(0, 3).map((purpose) => (
              <span
                key={purpose}
                className="organic-chip inline-flex min-h-8 items-center border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] leading-none text-white"
              >
                {purposeLabels[purpose]}
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-between p-7 sm:p-8">
        <div>
          <p className="text-sm leading-7 text-[var(--color-forest-muted)]">
            В серии собраны скрабы, маски, кремы, масла и средства для домашнего
            ухода, которые поддерживают впечатление от процедуры.
          </p>
          <div className="mt-7 grid gap-4">
            {previewProducts.map((product) => (
              <Link
                key={product.slug}
                href={`/catalog/products/${product.slug}`}
                className="flex items-center gap-4 rounded-[28px] border border-[rgba(17,45,34,0.08)] bg-[var(--color-blush)]/72 p-4 transition hover:bg-[rgba(255,255,255,0.92)]"
              >
                <div className="relative h-20 w-16 shrink-0 overflow-hidden rounded-[18px] bg-white/90">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain p-2"
                    sizes="64px"
                  />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[var(--color-forest-strong)]">
                    {product.name}
                  </p>
                  <p className="mt-1 text-sm text-[var(--color-forest-muted)]">
                    {product.subtitle}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
        <Link
          href={`/catalog/series/${series.slug}`}
          className="mt-8 inline-flex items-center text-sm font-semibold text-[var(--color-forest-strong)] transition hover:text-[var(--color-gold-strong)]"
        >
          Смотреть серию полностью
        </Link>
      </div>
    </article>
  );
}
