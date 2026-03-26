import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Reveal } from "@/components/ui/reveal";
import { returnInfo, seoDefaults } from "@/data/site";

export const metadata: Metadata = {
  title: "Возврат товара | Imperial Garden",
  description: "Как обратиться по вопросу возврата или разбора ситуации по заказу Imperial Garden.",
  openGraph: {
    title: "Возврат товара | Imperial Garden",
    description: "Как обратиться по вопросу возврата или разбора ситуации по заказу Imperial Garden.",
    images: [seoDefaults.image],
  },
};

export default function ReturnsPage() {
  return (
    <div className="page-shell py-16">
      <Reveal>
        <Breadcrumbs items={[{ href: "/", label: "Главная" }, { href: "/contacts", label: "Контакты" }, { label: "Возврат товара" }]} />
      </Reveal>
      <Reveal className="mt-6">
        <h1 className="font-display text-5xl leading-none text-[var(--color-forest-strong)] sm:text-6xl">
          Возврат товара
        </h1>
      </Reveal>
      <div className="mt-10 grid gap-5">
        {returnInfo.map((section) => (
          <Reveal key={section.title}>
            <article className="soft-surface p-6 sm:p-8">
              <h2 className="font-display text-4xl text-[var(--color-forest-strong)]">
                {section.title}
              </h2>
              <div className="mt-5 space-y-4 text-sm leading-7 text-[var(--color-forest-muted)]">
                {section.body.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
