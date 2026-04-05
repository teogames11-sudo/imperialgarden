import Image from "next/image";
import Link from "next/link";
import { SeriesCard } from "@/components/catalog/series-card";
import { OrderForm } from "@/components/forms/order-form";
import { NewsCard } from "@/components/news/news-card";
import { HeroSection } from "@/components/sections/hero";
import { HomeImageTriptych } from "@/components/sections/home-image-triptych";
import { Button } from "@/components/ui/button";
import { Filigree } from "@/components/ui/filigree";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  ctaLead,
  featuredSeriesLead,
  featuredSeries,
  getSeriesPreviewProducts,
  homeCareBenefits,
  homeSelections,
  news,
  professionalBenefits,
  seminars,
} from "@/data/site";

export default function HomePage() {
  return (
    <>
      <HeroSection />

      <section className="page-shell pb-24">
        <Reveal>
          <div className="leaf-panel grid overflow-hidden rounded-[44px] border border-[rgba(17,45,34,0.08)] bg-[linear-gradient(140deg,#17392d,#23473a_48%,#2f5643)] shadow-[0_30px_90px_rgba(15,36,29,0.18)] lg:grid-cols-[1.02fr,0.98fr]">
            <div className="relative p-7 text-white sm:p-10 lg:p-12">
              <div className="absolute inset-0 opacity-22">
                <Image
                  src="/assets/legacy/floral.jpg"
                  alt=""
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 48vw"
                />
              </div>
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,28,22,0.12),rgba(10,28,22,0.46))]" />

              <div className="relative z-10 max-w-2xl">
                <div className="flex items-center gap-3">
                  <Filigree className="opacity-90" />
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[rgba(226,204,155,0.94)]">
                    Imperial Garden
                  </p>
                </div>
                <h2 className="mt-6 font-display text-5xl leading-[1.02] text-white sm:text-6xl">
                  Морской воздух, листья и тепло ухода в одном ритме.
                </h2>
                <p className="mt-5 max-w-2xl text-base leading-8 text-white/[0.82]">
                  Здесь легко выбрать линию для кабинета, найти домашний ритуал и
                  открыть обучение для мастеров.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Button href="/catalog">Открыть каталог</Button>
                  <Button href="/about/professionals" variant="secondary">
                    Для профессионалов
                  </Button>
                  <Button href="/training" variant="ghost" className="text-white ring-white/20 hover:bg-white/10">
                    Обучение
                  </Button>
                </div>
              </div>
            </div>

            <div className="relative min-h-[31rem] overflow-hidden bg-[linear-gradient(180deg,#fffefb,#f6f3ec)] p-4 sm:p-5">
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(210,176,106,0.14),transparent_22%),radial-gradient(circle_at_bottom_left,rgba(216,206,221,0.14),transparent_24%)]" />
              <HomeImageTriptych />
            </div>
          </div>
        </Reveal>
      </section>

      <section className="page-shell py-2">
        <Reveal>
          <div className="max-w-4xl">
            <div className="mb-4 flex items-center gap-3">
              <Filigree className="opacity-85" />
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-gold-strong)]">
                {featuredSeriesLead.eyebrow}
              </p>
            </div>
            <h2 className="font-display text-4xl leading-[1.02] text-[var(--color-forest-strong)] sm:text-5xl">
              {featuredSeriesLead.title}
            </h2>
            <div className="mt-5 max-w-3xl space-y-3 text-base leading-8 text-[var(--color-forest-muted)] sm:text-lg">
              <p>{featuredSeriesLead.text}</p>
              <p>{featuredSeriesLead.detail}</p>
            </div>
            <div className="mt-6">
              <Filigree className="opacity-75" />
            </div>
          </div>
        </Reveal>
        <div className="mt-10 grid gap-8">
          {featuredSeries.slice(0, 3).map((item, index) => (
            <Reveal key={item.slug} delay={index * 0.05}>
              <SeriesCard
                series={item}
                previewProducts={getSeriesPreviewProducts(item.slug)}
              />
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-8 flex justify-center">
          <Button href="/catalog" variant="secondary">
            Смотреть все линии
          </Button>
        </Reveal>
      </section>

      <section className="page-shell py-20">
        <div className="grid gap-6 xl:grid-cols-2">
          <Reveal>
            <article id="home-care" className="soft-surface scroll-mt-32 overflow-hidden p-6 sm:p-8">
              <div className="grid gap-6 lg:grid-cols-[0.9fr,1.1fr]">
                <div className="relative min-h-72 overflow-hidden rounded-[30px] bg-[var(--color-forest)]">
                  <Image
                    src="/assets/legacy/floral.jpg"
                    alt="Домашний уход Imperial Garden"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1280px) 100vw, 30vw"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(18,38,31,0.24),rgba(18,38,31,0.72))]" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-gold-strong)]">
                    Домашний уход
                  </p>
                  <h2 className="mt-4 font-display text-4xl leading-[1.08] text-[var(--color-forest-strong)]">
                    Ритуалы, которые хочется оставлять для себя.
                  </h2>
                  <div className="mt-5 space-y-3 text-sm leading-7 text-[var(--color-forest-muted)]">
                    {homeCareBenefits.map((item) => (
                      <p key={item}>{item}</p>
                    ))}
                  </div>
                  <div className="mt-6 flex flex-wrap gap-3">
                    {homeSelections.home.slice(0, 3).map((product) => (
                      <Link
                        key={product.slug}
                        href={`/catalog/products/${product.slug}`}
                        className="organic-chip inline-flex min-h-11 items-center bg-[var(--color-blush)] px-4 py-3 text-sm font-semibold leading-[1.15] text-[var(--color-forest-strong)] transition hover:bg-white"
                      >
                        {product.name} · {product.volume}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </article>
          </Reveal>

          <Reveal delay={0.08}>
            <article
              id="professional-lines"
              className="soft-surface scroll-mt-32 overflow-hidden p-6 sm:p-8"
            >
              <div className="grid gap-6 lg:grid-cols-[0.95fr,1.05fr]">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-gold-strong)]">
                    Для профессионалов
                  </p>
                  <h2 className="mt-4 font-display text-4xl leading-[1.08] text-[var(--color-forest-strong)]">
                    Линии, которые красиво работают в кабинете.
                  </h2>
                  <div className="mt-5 space-y-3 text-sm leading-7 text-[var(--color-forest-muted)]">
                    {professionalBenefits.map((item) => (
                      <p key={item}>{item}</p>
                    ))}
                  </div>
                  <div className="mt-6 flex flex-wrap gap-3">
                    {homeSelections.professional.slice(0, 3).map((product) => (
                      <Link
                        key={product.slug}
                        href={`/catalog/products/${product.slug}`}
                        className="organic-chip inline-flex min-h-11 items-center bg-[var(--color-blush)] px-4 py-3 text-sm font-semibold leading-[1.15] text-[var(--color-forest-strong)] transition hover:bg-white"
                      >
                        {product.name} · {product.volume}
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="relative min-h-72 overflow-hidden rounded-[30px] bg-[var(--color-forest)]">
                  <Image
                    src="/assets/legacy/massage-thermal-spa.jpg"
                    alt="Профессиональные SPA-линии Imperial Garden"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1280px) 100vw, 30vw"
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(32,49,40,0.12),rgba(18,38,31,0.68))]" />
                </div>
              </div>
            </article>
          </Reveal>
        </div>
      </section>

      <section id="training-masters" className="page-shell scroll-mt-32 py-4">
        <div className="grid gap-6 xl:grid-cols-2">
          <Reveal>
            <div className="soft-surface p-6 sm:p-8">
              <SectionHeading
                eyebrow="Обучение"
                title="Семинары, архив тем и сопровождение для мастеров."
                body="Imperial Garden помогает раскрыть линии в работе с телом — от первого знакомства до уверенной подачи процедур."
              />
              <div className="mt-8 grid gap-4">
                {seminars.slice(0, 2).map((event) => (
                  <Link
                    key={event.slug}
                    href={`/training/events/${event.slug}`}
                    className="soft-surface block p-5 transition hover:-translate-y-1"
                  >
                    <p className="text-xs uppercase tracking-[0.22em] text-[var(--color-gold-strong)]">
                      Семинар
                    </p>
                    <h3 className="mt-3 text-2xl font-semibold text-[var(--color-forest-strong)]">
                      {event.title}
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-[var(--color-forest-muted)]">
                      {event.summary}
                    </p>
                  </Link>
                ))}
              </div>
              <Button href="/training" variant="secondary" className="mt-8">
                Открыть обучение
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="soft-surface p-6 sm:p-8">
              <SectionHeading
                eyebrow="Новости"
                title="Анонсы, выставки и важные события бренда."
                body="Небольшая витрина для новостей, акций и обучающих анонсов Imperial Garden."
              />
              <div className="mt-8 grid gap-4">
                {news.slice(0, 2).map((article, index) => (
                  <Reveal key={article.slug} delay={index * 0.04}>
                    <NewsCard article={article} />
                  </Reveal>
                ))}
              </div>
              <Button href="/news" variant="secondary" className="mt-8">
                Все новости
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="page-shell pb-24 pt-20">
        <Reveal>
          <OrderForm title={ctaLead.title} description={ctaLead.text} />
        </Reveal>
      </section>
    </>
  );
}
