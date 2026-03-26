import type { Metadata } from "next";
import { CatalogExplorer } from "@/components/catalog/catalog-explorer";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { products, seoDefaults, series } from "@/data/site";

type Props = {
  searchParams: Promise<{
    group?: string;
  }>;
};

export const metadata: Metadata = {
  title: "Каталог | Imperial Garden",
  description:
    "Полный каталог Imperial Garden: линии для салона и дома, фильтрация по задачам ухода и форматам.",
  openGraph: {
    title: "Каталог | Imperial Garden",
    description:
      "Полный каталог Imperial Garden: линии для салона и дома, фильтрация по задачам ухода и форматам.",
    images: [seoDefaults.image],
  },
};

export default async function CatalogPage({ searchParams }: Props) {
  const params = await searchParams;
  const initialGroup =
    params.group === "professional" || params.group === "expert" || params.group === "home"
      ? params.group
      : "all";

  return (
    <div className="page-shell py-16">
      <Reveal>
        <SectionHeading
          eyebrow="Каталог"
          title="Линии, форматы и средства для салонного и домашнего ухода."
          body="Выбирайте по серии, задаче, группе или объему и переходите к карточкам продуктов без перегруженной навигации."
        />
      </Reveal>
      <div className="mt-10">
        <CatalogExplorer
          products={products}
          series={series}
          initialGroup={initialGroup}
        />
      </div>
    </div>
  );
}
