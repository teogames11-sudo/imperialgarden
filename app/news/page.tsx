import type { Metadata } from "next";
import { NewsCard } from "@/components/news/news-card";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { news, seoDefaults } from "@/data/site";

export const metadata: Metadata = {
  title: "Новости | Imperial Garden",
  description:
    "Новости, акции, выставки и архив обучающих событий Imperial Garden в современной редакционной подаче.",
  openGraph: {
    title: "Новости | Imperial Garden",
    description:
      "Новости, акции, выставки и архив обучающих событий Imperial Garden в современной редакционной подаче.",
    images: [seoDefaults.image],
  },
};

export default function NewsPage() {
  return (
    <div className="page-shell py-16">
      <Reveal>
        <SectionHeading
          eyebrow="Новости"
          title="Актуальные события бренда, выставки и обучающие анонсы."
          body="Раздел оформлен как аккуратная редакционная витрина, где легко читать новости и переходить к материалам."
        />
      </Reveal>
      <div className="mt-10 grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
        {news.map((article, index) => (
          <Reveal key={article.slug} delay={index * 0.03}>
            <NewsCard article={article} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
