import type { Metadata } from "next";
import Link from "next/link";
import { TrainingCard } from "@/components/training/training-card";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { seminars, seoDefaults, webinars } from "@/data/site";

export const metadata: Metadata = {
  title: "Обучение | Imperial Garden",
  description:
    "Семинары, архив программ и дистанционные форматы Imperial Garden для массажистов, косметологов и SPA-специалистов.",
  openGraph: {
    title: "Обучение | Imperial Garden",
    description:
      "Семинары, архив программ и дистанционные форматы Imperial Garden для массажистов, косметологов и SPA-специалистов.",
    images: [seoDefaults.image],
  },
};

export default function TrainingPage() {
  return (
    <div className="page-shell py-16">
      <Reveal>
        <SectionHeading
          eyebrow="Обучение"
          title="Семинары и онлайн-форматы для тех, кто работает с телом профессионально."
          body="В этом разделе собраны архивные программы бренда, обучающие темы и дистанционные форматы для студий, салонов и частных мастеров."
        />
      </Reveal>

      <div className="mt-10 grid gap-6 xl:grid-cols-2">
        <Reveal>
          <div className="soft-surface p-6 sm:p-8">
            <h2 className="font-display text-4xl leading-[1.08] text-[var(--color-forest-strong)]">
              Семинары
            </h2>
            <p className="mt-4 text-sm leading-7 text-[var(--color-forest-muted)]">
              Архив тем, протоколов и обучающих программ бренда для салонов, SPA и частных специалистов.
            </p>
            <div className="mt-8 grid gap-4">
              {seminars.slice(0, 3).map((event) => (
                <TrainingCard key={event.slug} event={event} />
              ))}
            </div>
            <Link
              href="/training/seminars"
              className="mt-6 inline-flex text-sm font-semibold text-[var(--color-forest-strong)]"
            >
              Смотреть все семинары
            </Link>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="soft-surface p-6 sm:p-8">
            <h2 className="font-display text-4xl leading-[1.08] text-[var(--color-forest-strong)]">
              Вебинары
            </h2>
            <p className="mt-4 text-sm leading-7 text-[var(--color-forest-muted)]">
              Онлайн-форматы доступны по запросу: для знакомства с линиями, подбора ухода и обсуждения процедурных сценариев.
            </p>
            <div className="mt-8 grid gap-4">
              {webinars.map((event) => (
                <TrainingCard key={event.slug} event={event} />
              ))}
            </div>
            <Link
              href="/training/webinars"
              className="mt-6 inline-flex text-sm font-semibold text-[var(--color-forest-strong)]"
            >
              Открыть вебинары
            </Link>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
