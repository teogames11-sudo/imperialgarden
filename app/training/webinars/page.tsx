import type { Metadata } from "next";
import { TrainingCard } from "@/components/training/training-card";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { seoDefaults, webinars } from "@/data/site";

export const metadata: Metadata = {
  title: "Вебинары | Imperial Garden",
  description:
    "Онлайн-форматы Imperial Garden: дистанционные консультации по линиям, протоколам и домашнему уходу.",
  openGraph: {
    title: "Вебинары | Imperial Garden",
    description:
      "Онлайн-форматы Imperial Garden: дистанционные консультации по линиям, протоколам и домашнему уходу.",
    images: [seoDefaults.image],
  },
};

export default function WebinarsPage() {
  return (
    <div className="page-shell py-16">
      <Reveal>
        <SectionHeading
          eyebrow="Вебинары"
          title="Онлайн-формат для тех, кому нужен быстрый разбор по запросу."
          body="Вебинары подходят для первого знакомства с линиями, обсуждения процедур и подбора домашнего ухода."
        />
      </Reveal>
      <div className="mt-10 grid gap-5 lg:grid-cols-2">
        {webinars.map((event, index) => (
          <Reveal key={event.slug} delay={index * 0.05}>
            <TrainingCard event={event} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
