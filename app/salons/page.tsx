import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { homeSelections, professionalBenefits, seoDefaults } from "@/data/site";

export const metadata: Metadata = {
  title: "Салонам | Imperial Garden",
  description:
    "Imperial Garden для салонов и SPA-пространств: кабинетные линии, обучение мастеров и сопровождение по подбору ассортимента.",
  openGraph: {
    title: "Салонам | Imperial Garden",
    description:
      "Imperial Garden для салонов и SPA-пространств: кабинетные линии, обучение мастеров и сопровождение по подбору ассортимента.",
    images: [seoDefaults.image],
  },
};

export default function SalonsPage() {
  return (
    <div className="page-shell py-16">
      <Reveal>
        <div className="soft-surface grid gap-8 overflow-hidden p-6 lg:grid-cols-[1.05fr,0.95fr] lg:p-8">
          <div className="flex flex-col justify-center">
            <SectionHeading
              eyebrow="Салонам"
              title="Линии Imperial Garden для кабинета, SPA-ритуалов и красивой подачи ухода."
              body="Подбор коллекций, обучение мастеров и формат работы, который удобно встроить в салонный сервис."
            />
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {professionalBenefits.map((item) => (
                <div
                  key={item}
                  className="organic-chip min-h-28 bg-[var(--color-blush)]/72 px-5 py-5 text-sm leading-7 text-[var(--color-forest-muted)]"
                >
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/catalog?group=professional">Кабинетные линии</Button>
              <Button href="/training" variant="secondary">
                Обучение
              </Button>
              <Button href="/contacts" variant="ghost">
                Связаться
              </Button>
            </div>
          </div>

          <div className="relative min-h-[32rem] overflow-hidden rounded-[34px] bg-[var(--color-forest)]">
            <Image
              src="/assets/legacy/massage-thermal-spa.jpg"
              alt="Imperial Garden для салонов"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 42vw"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,41,33,0.16),rgba(17,41,33,0.72))]" />
            <div className="absolute bottom-6 left-6 right-6 rounded-[28px] border border-[rgba(210,176,106,0.18)] bg-[rgba(255,250,244,0.9)] p-5 text-[var(--color-forest-strong)] shadow-[0_18px_50px_rgba(10,26,20,0.18)] backdrop-blur-md sm:bottom-8 sm:left-8 sm:right-8">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-gold-strong)]">
                Imperial Garden
              </p>
              <p className="mt-3 font-display text-[1.9rem] leading-[0.98]">
                Салонный ассортимент, обучение и домашнее продолжение ухода.
              </p>
            </div>
          </div>
        </div>
      </Reveal>

      <section className="py-16">
        <Reveal>
          <SectionHeading
            eyebrow="Подбор ассортимента"
            title="Позиции, с которых удобно начать работу в кабинете."
            body="Подборка ориентирована на салонный формат, программы по телу и домашнее продолжение ухода."
          />
        </Reveal>
        <div className="mt-10 flex flex-wrap gap-3">
          {homeSelections.professional.slice(0, 8).map((product) => (
            <Link
              key={product.slug}
              href={`/catalog/products/${product.slug}`}
              className="organic-chip inline-flex min-h-11 items-center bg-white/85 px-4 py-3 text-sm font-semibold leading-[1.15] text-[var(--color-forest-strong)] shadow-[0_10px_30px_rgba(15,40,31,0.08)] transition hover:bg-[var(--color-blush)]"
            >
              {product.seriesName} · {product.name}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
