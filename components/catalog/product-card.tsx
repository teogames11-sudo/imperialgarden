import Image from "next/image";
import Link from "next/link";
import { AddToCartButton } from "@/components/cart/add-to-cart-button";
import { getSeriesBySlug, purposeLabels } from "@/data/site";
import type { Product } from "@/lib/types";

export function ProductCard({ product }: { product: Product }) {
  const series = getSeriesBySlug(product.seriesSlug);
  const accent = series?.accent ?? "#9f7631";

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-[34px] border border-[rgba(17,45,34,0.12)] bg-[linear-gradient(180deg,rgba(255,252,248,0.96),rgba(246,241,233,0.94))] shadow-[0_22px_60px_rgba(17,42,33,0.12)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_28px_72px_rgba(17,42,33,0.18)]">
      <Link
        href={`/catalog/products/${product.slug}`}
        className="relative block aspect-[0.96] overflow-hidden border-b border-[rgba(17,45,34,0.08)]"
        style={{
          background: `radial-gradient(circle at 50% 0%, rgba(255,255,255,0.96), rgba(236,244,239,0.94) 42%, rgba(199,214,206,0.88) 100%), radial-gradient(circle at 12% 16%, ${accent}18, transparent 24%), radial-gradient(circle at 88% 90%, ${accent}14, transparent 28%)`,
        }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.42),transparent_36%,rgba(17,45,34,0.08)_100%)]" />
        <div
          className="absolute inset-x-6 bottom-4 h-16 rounded-full opacity-85 blur-2xl"
          style={{
            background: `linear-gradient(90deg, ${accent}55, rgba(17,45,34,0.16), ${accent}40)`,
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-28 opacity-90"
          style={{
            background: `linear-gradient(180deg, transparent, ${accent}22 62%, ${accent}66)`,
          }}
        />
        <div className="absolute left-5 top-5 h-px w-24 bg-[rgba(255,255,255,0.76)]" />
        <div className="absolute right-5 top-5 rounded-full border border-white/60 bg-[rgba(255,255,255,0.32)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--color-forest-strong)] backdrop-blur-sm">
          SPA
        </div>
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain object-center p-9 pt-14 pb-8 transition duration-500 group-hover:-translate-y-1 group-hover:scale-[1.03] sm:p-10 sm:pt-16 sm:pb-9"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
        />
      </Link>

      <div className="flex flex-1 flex-col bg-[linear-gradient(180deg,rgba(255,251,247,0.92),rgba(249,244,237,0.98))] px-5 pb-5 pt-5">
        <p className="text-xs uppercase tracking-[0.22em] text-[var(--color-gold-strong)]">
          {product.seriesName}
        </p>
        <Link href={`/catalog/products/${product.slug}`} className="mt-2 block">
          <h3 className="text-[2rem] font-semibold leading-none text-[var(--color-forest-strong)]">
            {product.name}
          </h3>
        </Link>
        <p className="mt-2 text-sm text-[var(--color-forest-muted)]">{product.subtitle}</p>
        <p className="mt-4 flex-1 text-sm leading-7 text-[var(--color-forest-muted)]">
          {product.summary}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {product.purposes.slice(0, 2).map((purpose) => (
            <span
              key={purpose}
              className="organic-chip inline-flex min-h-8 items-center bg-[rgba(226,235,228,0.92)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] leading-none text-[var(--color-forest-strong)]"
            >
              {purposeLabels[purpose]}
            </span>
          ))}
        </div>
        <div className="mt-5 flex items-center justify-between gap-3 border-t border-[rgba(17,45,34,0.08)] pt-4">
          <div>
            <p className="text-xs uppercase tracking-[0.14em] text-[var(--color-forest-muted)]">
              Формат
            </p>
            <p className="mt-1 text-sm font-semibold text-[var(--color-forest-strong)]">
              {product.volume}
            </p>
          </div>
          <p className="text-sm font-semibold text-[var(--color-gold-strong)]">
            {product.priceLabel}
          </p>
        </div>
        <AddToCartButton productSlug={product.slug} className="mt-5 w-full" />
      </div>
    </article>
  );
}
