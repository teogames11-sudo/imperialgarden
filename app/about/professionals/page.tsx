import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { homeSelections, professionalBenefits, seoDefaults } from "@/data/site";

export const metadata: Metadata = {
  title: "Профессионалам | Imperial Garden",
  description:
    "Почему Imperial Garden подходит массажистам, косметологам и SPA-специалистам: линии для кабинета, обучение и сопровождение.",
  openGraph: {
    title: "Профессионалам | Imperial Garden",
    description:
      "Почему Imperial Garden подходит массажистам, косметологам и SPA-специалистам: линии для кабинета, обучение и сопровождение.",
    images: [seoDefaults.image],
  },
};

export default function ProfessionalsPage() {
  return (
    <div className="page-shell py-16">
      <Reveal>
        <div className="soft-surface p-6 sm:p-8">
          <SectionHeading
            eyebrow="Профессионалам"
            title="Линии для мастеров, SPA и кабинетов с красивой подачей процедур."
            body="Imperial Garden подходит специалистам, которым важны выразительные текстуры, эффектный результат и эстетика бренда в каждой детали."
          />
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {professionalBenefits.map((item) => (
              <div
                key={item}
                className="organic-chip min-h-28 bg-[var(--color-blush)]/72 px-5 py-5 text-sm leading-7 text-[var(--color-forest-muted)]"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <section className="py-16">
        <Reveal>
          <SectionHeading
            eyebrow="Коллекции для работы"
            title="Линии для массажа, коррекции силуэта, лифтинга и домашнего продолжения ухода."
            body="Для старта можно открыть профессиональные позиции, а затем дополнить их домашними средствами и обучающими форматами."
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
        <div className="mt-10 flex flex-wrap gap-3">
          <Button href="/training/seminars">Перейти к обучению</Button>
          <Button href="/catalog?group=professional" variant="secondary">
            Открыть профессиональные линии
          </Button>
        </div>
      </section>
    </div>
  );
}
