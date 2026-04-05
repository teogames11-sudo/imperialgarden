import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { companyStory, companyValues, seoDefaults } from "@/data/site";

export const metadata: Metadata = {
  title: "О компании | Imperial Garden",
  description:
    "История, философия и ценности Imperial Garden: морская эстетика, уход за телом и профессиональная подача.",
  openGraph: {
    title: "О компании | Imperial Garden",
    description:
      "История, философия и ценности Imperial Garden: морская эстетика, уход за телом и профессиональная подача.",
    images: [seoDefaults.image],
  },
};

export default function AboutPage() {
  return (
    <div className="page-shell py-16">
      <Reveal>
        <div className="soft-surface grid gap-8 overflow-hidden p-6 lg:grid-cols-[0.95fr,1.05fr] lg:p-8">
          <div className="relative min-h-[28rem] overflow-hidden rounded-[34px] bg-[var(--color-forest)]">
            <Image
              src="/assets/legacy/massage-thermal-spa.jpg"
              alt="Imperial Garden brand atmosphere"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,41,33,0.24),rgba(17,41,33,0.68))]" />
          </div>
          <div className="flex flex-col justify-center">
            <SectionHeading
              eyebrow="О компании"
              title="Imperial Garden объединяет салонный SPA-уход, домашние ритуалы и обучение мастеров."
            />
            <div className="mt-5 space-y-4 text-base leading-8 text-[var(--color-forest-muted)]">
              {companyStory.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button href="/catalog">Открыть каталог</Button>
              <Button href="/about/professionals" variant="secondary">
                Профессионалам
              </Button>
            </div>
          </div>
        </div>
      </Reveal>

      <section className="py-16">
        <Reveal>
          <SectionHeading
            eyebrow="Философия"
            title="Бренд строится на ощущении ухода, а не на показной роскоши."
            body="Морские мотивы, ботанические экстракты, деликатные текстуры и визуальная мягкость формируют почерк Imperial Garden."
          />
        </Reveal>
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {companyValues.map((item, index) => (
            <Reveal key={item.title} delay={index * 0.05}>
              <article className="soft-surface p-6">
                <h3 className="font-display text-3xl leading-[1.08] text-[var(--color-forest-strong)]">
                  {item.title}
                </h3>
                <p className="mt-4 text-sm leading-7 text-[var(--color-forest-muted)]">
                  {item.text}
                </p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
