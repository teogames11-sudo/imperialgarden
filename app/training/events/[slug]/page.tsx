import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { ContentBlocks } from "@/components/ui/content-blocks";
import { Reveal } from "@/components/ui/reveal";
import { getTrainingEventBySlug, seoDefaults, seminars, webinars } from "@/data/site";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return [...seminars, ...webinars].map((event) => ({ slug: event.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = getTrainingEventBySlug(slug);

  if (!event) {
    return {};
  }

  return {
    title: `${event.title} | Imperial Garden`,
    description: event.summary,
    openGraph: {
      title: `${event.title} | Imperial Garden`,
      description: event.summary,
      images: [seoDefaults.image],
    },
  };
}

export default async function TrainingEventPage({ params }: Props) {
  const { slug } = await params;
  const event = getTrainingEventBySlug(slug);

  if (!event) {
    notFound();
  }

  return (
    <div className="page-shell py-16">
      <Reveal>
        <Breadcrumbs
          items={[
            { href: "/", label: "Главная" },
            { href: "/training", label: "Обучение" },
            {
              href: event.format === "seminar" ? "/training/seminars" : "/training/webinars",
              label: event.format === "seminar" ? "Семинары" : "Вебинары",
            },
            { label: event.title },
          ]}
        />
      </Reveal>

      <Reveal className="mt-6">
        <article className="soft-surface p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-gold-strong)]">
            {event.format === "seminar" ? "Семинар" : "Вебинар"}
          </p>
          <h1 className="mt-4 max-w-4xl font-display text-5xl leading-none text-[var(--color-forest-strong)] sm:text-6xl">
            {event.title}
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-8 text-[var(--color-forest-muted)]">
            {event.summary}
          </p>
          <div className="mt-10 rounded-[30px] bg-[var(--color-blush)]/72 p-6">
            <ContentBlocks blocks={event.blocks} />
          </div>
        </article>
      </Reveal>
    </div>
  );
}

