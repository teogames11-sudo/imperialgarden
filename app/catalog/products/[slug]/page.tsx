import type { Metadata } from "next";
import Image from "next/image";
import Script from "next/script";
import { notFound } from "next/navigation";
import { AddToCartButton } from "@/components/cart/add-to-cart-button";
import { ProductCard } from "@/components/catalog/product-card";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Reveal } from "@/components/ui/reveal";
import { getProductBySlug, productsWithRelations, seoDefaults } from "@/data/site";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return productsWithRelations.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    return {};
  }

  return {
    title: `${product.name} | Imperial Garden`,
    description: product.summary,
    openGraph: {
      title: `${product.name} | Imperial Garden`,
      description: product.summary,
      images: [seoDefaults.image],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.summary,
    image: [seoDefaults.image],
    brand: {
      "@type": "Brand",
      name: "Imperial Garden",
    },
  };

  return (
    <div className="page-shell py-16">
      <Script
        id={`product-schema-${product.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <Reveal>
        <Breadcrumbs
          items={[
            { href: "/", label: "Главная" },
            { href: "/catalog", label: "Каталог" },
            { href: `/catalog/series/${product.seriesSlug}`, label: product.seriesName },
            { label: product.name },
          ]}
        />
      </Reveal>

      <Reveal className="mt-6">
        <div className="overflow-hidden rounded-[42px] border border-white/60 bg-white/78 p-6 shadow-[0_24px_80px_rgba(15,40,31,0.1)] backdrop-blur-sm sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[0.92fr,1.08fr]">
            <div className="relative min-h-[34rem] overflow-hidden rounded-[34px] bg-[linear-gradient(180deg,rgba(242,246,242,0.95),rgba(229,238,233,0.82))]">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-contain p-8"
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-gold-strong)]">
                {product.seriesName}
              </p>
              <h1 className="mt-4 font-display text-5xl leading-none text-[var(--color-forest-strong)] sm:text-6xl">
                {product.name}
              </h1>
              <p className="mt-3 text-lg text-[var(--color-forest-muted)]">{product.subtitle}</p>
              <p className="mt-6 text-base leading-8 text-[var(--color-forest-muted)]">
                {product.summary}
              </p>
              <div className="mt-6 rounded-[28px] bg-[var(--color-blush)]/72 p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-gold-strong)]">
                  Основные преимущества
                </p>
                <ul className="mt-4 list-disc space-y-2 pl-5 text-sm leading-7 text-[var(--color-forest-muted)]">
                  {product.benefits.map((benefit) => (
                    <li key={benefit}>{benefit}</li>
                  ))}
                </ul>
              </div>
              <div className="mt-6 flex flex-wrap items-center gap-4">
                <div className="rounded-full bg-[var(--color-blush)] px-5 py-3">
                  <span className="text-xs uppercase tracking-[0.16em] text-[var(--color-forest-muted)]">
                    Объем
                  </span>
                  <p className="mt-1 text-sm font-semibold text-[var(--color-forest-strong)]">
                    {product.volume}
                  </p>
                </div>
                <div className="rounded-full bg-[var(--color-blush)] px-5 py-3">
                  <span className="text-xs uppercase tracking-[0.16em] text-[var(--color-forest-muted)]">
                    Стоимость
                  </span>
                  <p className="mt-1 text-sm font-semibold text-[var(--color-forest-strong)]">
                    {product.priceLabel}
                  </p>
                </div>
              </div>
              <AddToCartButton productSlug={product.slug} className="mt-8" />
            </div>
          </div>

          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <div className="rounded-[30px] bg-[var(--color-blush)]/72 p-6">
              <h2 className="font-display text-3xl text-[var(--color-forest-strong)]">
                Способ применения
              </h2>
              <p className="mt-4 text-sm leading-7 text-[var(--color-forest-muted)]">
                {product.usage || "Информация уточняется."}
              </p>
            </div>
            <div className="rounded-[30px] bg-[var(--color-blush)]/72 p-6">
              <h2 className="font-display text-3xl text-[var(--color-forest-strong)]">
                Активные компоненты
              </h2>
              <ul className="mt-4 space-y-3 text-sm leading-7 text-[var(--color-forest-muted)]">
                {product.ingredients.map((ingredient) => (
                  <li key={ingredient.name}>
                    <span className="font-semibold text-[var(--color-forest-strong)]">
                      {ingredient.name}
                    </span>
                    {" — "}
                    {ingredient.description}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Reveal>

      {product.relatedProducts.length ? (
        <section className="mt-12">
          <Reveal>
            <h2 className="font-display text-4xl text-[var(--color-forest-strong)]">
              Похожие продукты
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {product.relatedProducts.map((related, index) => (
              <Reveal key={related.slug} delay={index * 0.04}>
                <ProductCard product={related} />
              </Reveal>
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}

