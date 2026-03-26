import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/catalog/product-card";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Reveal } from "@/components/ui/reveal";
import { getProductsForSeries, getSeriesBySlug, seoDefaults, series } from "@/data/site";
import { purposeLabels } from "@/data/site";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return series.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const currentSeries = getSeriesBySlug(slug);

  if (!currentSeries) {
    return {};
  }

  return {
    title: `${currentSeries.name} | Imperial Garden`,
    description: currentSeries.description,
    openGraph: {
      title: `${currentSeries.name} | Imperial Garden`,
      description: currentSeries.description,
      images: [seoDefaults.image],
    },
  };
}

export default async function SeriesPage({ params }: Props) {
  const { slug } = await params;
  const currentSeries = getSeriesBySlug(slug);

  if (!currentSeries) {
    notFound();
  }

  const items = getProductsForSeries(slug);

  return (
    <div className="page-shell py-16">
      <Reveal>
        <Breadcrumbs
          items={[
            { href: "/", label: "Главная" },
            { href: "/catalog", label: "Каталог" },
            { label: currentSeries.name },
          ]}
        />
      </Reveal>

      <Reveal className="mt-6">
        <div className="overflow-hidden rounded-[42px] border border-white/60 bg-white/78 p-6 shadow-[0_24px_80px_rgba(15,40,31,0.1)] backdrop-blur-sm sm:p-8">
          <div className="grid gap-6 lg:grid-cols-[1fr,1.05fr]">
            <div
              className="min-h-[22rem] rounded-[34px]"
              style={{
                backgroundImage: `linear-gradient(140deg, rgba(20,53,39,0.84), ${currentSeries.accent}aa), url(${currentSeries.coverImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
            <div className="flex flex-col justify-center">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-gold-strong)]">
                Серия бренда
              </p>
              <h1 className="mt-4 font-display text-5xl leading-none text-[var(--color-forest-strong)] sm:text-6xl">
                {currentSeries.name}
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--color-forest-muted)]">
                {currentSeries.description}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {currentSeries.purposes.map((purpose) => (
                  <span
                    key={purpose}
                    className="rounded-full bg-[var(--color-blush)] px-4 py-2 text-sm font-semibold text-[var(--color-forest-strong)]"
                  >
                    {purposeLabels[purpose]}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {items.map((product, index) => (
          <Reveal key={product.slug} delay={index * 0.03}>
            <ProductCard product={product} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}

