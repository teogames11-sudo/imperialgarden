import type { Metadata } from "next";
import Script from "next/script";
import { notFound } from "next/navigation";
import { ContentBlocks } from "@/components/ui/content-blocks";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { NewsCard } from "@/components/news/news-card";
import { Reveal } from "@/components/ui/reveal";
import { getNewsBySlug, news, seoDefaults } from "@/data/site";
import { formatRuDate } from "@/lib/utils";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return news.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getNewsBySlug(slug);

  if (!article) {
    return {};
  }

  return {
    title: `${article.title} | Imperial Garden`,
    description: article.summary,
    openGraph: {
      title: `${article.title} | Imperial Garden`,
      description: article.summary,
      images: [seoDefaults.image],
    },
  };
}

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params;
  const article = getNewsBySlug(slug);

  if (!article) {
    notFound();
  }

  const schema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    datePublished: article.date,
    description: article.summary,
  };

  const related = news.filter((item) => item.slug !== article.slug).slice(0, 3);

  return (
    <div className="page-shell py-16">
      <Script
        id={`article-schema-${article.slug}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <Reveal>
        <Breadcrumbs
          items={[
            { href: "/", label: "Главная" },
            { href: "/news", label: "Новости" },
            { label: article.title },
          ]}
        />
      </Reveal>

      <Reveal className="mt-6">
        <article className="soft-surface p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-gold-strong)]">
            {formatRuDate(article.date)}
          </p>
          <h1 className="mt-4 max-w-4xl font-display text-5xl leading-none text-[var(--color-forest-strong)] sm:text-6xl">
            {article.title}
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-[var(--color-forest-muted)]">
            {article.summary}
          </p>
          <div className="mt-10 rounded-[30px] bg-[var(--color-blush)]/72 p-6">
            <ContentBlocks blocks={article.blocks} />
          </div>
        </article>
      </Reveal>

      <section className="mt-12">
        <Reveal>
          <h2 className="font-display text-4xl text-[var(--color-forest-strong)]">
            Другие новости
          </h2>
        </Reveal>
        <div className="mt-8 grid gap-5 lg:grid-cols-3">
          {related.map((item, index) => (
            <Reveal key={item.slug} delay={index * 0.05}>
              <NewsCard article={item} />
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}

