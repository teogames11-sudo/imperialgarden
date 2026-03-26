import type { Metadata } from "next";
import { TrainingCard } from "@/components/training/training-card";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { seminars, seoDefaults } from "@/data/site";

export const metadata: Metadata = {
  title: "Семинары | Imperial Garden",
  description:
    "Архив семинаров Imperial Garden: темы, программы, процедуры и обучение специалистов.",
  openGraph: {
    title: "Семинары | Imperial Garden",
    description:
      "Архив семинаров Imperial Garden: темы, программы, процедуры и обучение специалистов.",
    images: [seoDefaults.image],
  },
};

export default function SeminarsPage() {
  return (
    <div className="page-shell py-16">
      <Reveal>
        <SectionHeading
          eyebrow="Семинары"
          title="Архив программ и тем для мастеров, салонов и SPA-пространств."
          body="Здесь собраны обучающие материалы бренда: процедуры, техники, линии и сценарии работы с клиентом."
        />
      </Reveal>
      <div className="mt-10 grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
        {seminars.map((event, index) => (
          <Reveal key={event.slug} delay={index * 0.03}>
            <TrainingCard event={event} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
