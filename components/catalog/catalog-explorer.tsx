"use client";

import { startTransition, useDeferredValue, useState } from "react";
import type { Product, ProductGroup, Series } from "@/lib/types";
import { ProductCard } from "@/components/catalog/product-card";
import { Filigree } from "@/components/ui/filigree";
import { purposeLabels } from "@/data/site";

const groupLabels: Record<ProductGroup, string> = {
  professional: "Профессионалы",
  expert: "Expert",
  home: "Домашний уход",
};

type CatalogExplorerProps = {
  products: Product[];
  series: Series[];
  initialGroup?: ProductGroup | "all";
};

function getFormatBucket(product: Product) {
  if (product.type.toLowerCase().includes("сыворот")) {
    return "serum";
  }

  if (product.volumeValue !== null && product.volumeValue <= 200) {
    return "compact";
  }

  if (product.volumeValue !== null && product.volumeValue >= 500) {
    return "professional";
  }

  return "other";
}

export function CatalogExplorer({
  products,
  series,
  initialGroup = "all",
}: CatalogExplorerProps) {
  const [search, setSearch] = useState("");
  const [selectedSeries, setSelectedSeries] = useState("all");
  const [selectedPurpose, setSelectedPurpose] = useState("all");
  const [selectedGroup, setSelectedGroup] = useState(initialGroup);
  const [selectedFormat, setSelectedFormat] = useState("all");

  const deferredSearch = useDeferredValue(search.trim().toLowerCase());
  const purposeOptions = [...new Set(products.flatMap((product) => product.purposes))];

  const visibleProducts = products.filter((product) => {
    if (selectedSeries !== "all" && product.seriesSlug !== selectedSeries) {
      return false;
    }

    if (
      selectedPurpose !== "all" &&
      !product.purposes.includes(selectedPurpose as Product["purposes"][number])
    ) {
      return false;
    }

    if (selectedGroup !== "all" && !product.groups.includes(selectedGroup as ProductGroup)) {
      return false;
    }

    if (selectedFormat !== "all" && getFormatBucket(product) !== selectedFormat) {
      return false;
    }

    if (deferredSearch && !product.searchText.toLowerCase().includes(deferredSearch)) {
      return false;
    }

    return true;
  });

  const fieldClassName =
    "min-h-12 rounded-[20px] border border-[var(--color-forest)]/10 bg-[var(--color-blush)]/58 px-4 text-sm text-[var(--color-forest-strong)] outline-none transition focus:border-[var(--color-gold-strong)] focus:bg-white";

  return (
    <div className="grid gap-8 lg:grid-cols-[20rem,1fr]">
      <aside className="soft-surface h-fit p-5 lg:sticky lg:top-32">
        <div className="flex items-center gap-3">
          <Filigree className="opacity-80" />
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-gold-strong)]">
            Фильтры
          </p>
        </div>
        <h2 className="mt-3 font-display text-4xl text-[var(--color-forest-strong)]">
          Подобрать линию
        </h2>

        <div className="mt-6 grid gap-4">
          <label className="grid gap-2">
            <span className="text-sm font-semibold text-[var(--color-forest-strong)]">Поиск</span>
            <input
              value={search}
              onChange={(event) => {
                const value = event.target.value;
                startTransition(() => setSearch(value));
              }}
              placeholder="Название, серия или формат"
              className={fieldClassName}
            />
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-semibold text-[var(--color-forest-strong)]">Серия</span>
            <select
              value={selectedSeries}
              onChange={(event) => setSelectedSeries(event.target.value)}
              className={fieldClassName}
            >
              <option value="all">Все серии</option>
              {series.map((item) => (
                <option key={item.slug} value={item.slug}>
                  {item.name}
                </option>
              ))}
            </select>
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-semibold text-[var(--color-forest-strong)]">Назначение</span>
            <select
              value={selectedPurpose}
              onChange={(event) => setSelectedPurpose(event.target.value)}
              className={fieldClassName}
            >
              <option value="all">Все задачи</option>
              {purposeOptions.map((purpose) => (
                <option key={purpose} value={purpose}>
                  {purposeLabels[purpose]}
                </option>
              ))}
            </select>
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-semibold text-[var(--color-forest-strong)]">Группа</span>
            <select
              value={selectedGroup}
              onChange={(event) => setSelectedGroup(event.target.value as ProductGroup | "all")}
              className={fieldClassName}
            >
              <option value="all">Все группы</option>
              {Object.entries(groupLabels).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>

          <label className="grid gap-2">
            <span className="text-sm font-semibold text-[var(--color-forest-strong)]">Формат</span>
            <select
              value={selectedFormat}
              onChange={(event) => setSelectedFormat(event.target.value)}
              className={fieldClassName}
            >
              <option value="all">Все форматы</option>
              <option value="compact">Компактный уход</option>
              <option value="professional">Большой объем / кабинет</option>
              <option value="serum">Сыворотки</option>
              <option value="other">Другие форматы</option>
            </select>
          </label>
        </div>
      </aside>

      <div>
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm text-[var(--color-forest-muted)]">Найдено позиций</p>
            <h3 className="font-display text-5xl text-[var(--color-forest-strong)]">
              {visibleProducts.length}
            </h3>
          </div>
          <p className="max-w-xl text-sm leading-7 text-[var(--color-forest-muted)]">
            Линии можно смотреть по сериям, задачам ухода, группам и объему, не
            теряя атмосферу бренда и удобство выбора.
          </p>
        </div>

        {visibleProducts.length ? (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {visibleProducts.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        ) : (
          <div className="soft-surface p-10 text-center">
            <h4 className="font-display text-4xl text-[var(--color-forest-strong)]">
              Ничего не найдено
            </h4>
            <p className="mt-3 text-sm leading-7 text-[var(--color-forest-muted)]">
              Измените один из фильтров или попробуйте другой запрос.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
