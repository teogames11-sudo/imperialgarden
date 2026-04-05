"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Filigree } from "@/components/ui/filigree";
import { brand, heroQuickLinks, popularProducts } from "@/data/site";

export function HeroSection() {
  const heroRef = useRef<HTMLElement | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const copyY = useTransform(scrollYProgress, [0, 1], [0, -84]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.72, 1], [1, 0.94, 0.7]);
  const artY = useTransform(scrollYProgress, [0, 1], [0, -94]);
  const artScale = useTransform(scrollYProgress, [0, 1], [1, 1.04]);
  const mistY = useTransform(scrollYProgress, [0, 1], [0, 108]);
  const crestX = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const chipY = useTransform(scrollYProgress, [0, 1], [0, -34]);
  const orbY = useTransform(scrollYProgress, [0, 1], [0, -48]);

  const featuredProduct = popularProducts[3] ?? popularProducts[0];

  return (
    <section
      ref={heroRef}
      className="relative -mt-[5.75rem] overflow-hidden px-3 pb-5 pt-[5.75rem] sm:-mt-[6.75rem] sm:px-5 sm:pb-6 sm:pt-[6.75rem] lg:-mt-[7rem] lg:pt-[7rem]"
    >
      <div className="mx-auto max-w-[1720px] overflow-hidden rounded-[44px] border border-[rgba(255,255,255,0.16)] bg-[linear-gradient(180deg,rgba(11,31,24,0.16),rgba(255,255,255,0.04))] shadow-[0_36px_120px_rgba(11,30,23,0.18)]">
        <div className="relative grid min-h-[32rem] lg:min-h-[calc(100svh-9.1rem)] lg:grid-cols-[0.9fr,1.1fr]">
          <div className="absolute inset-0">
            <div className="absolute inset-x-0 top-0 z-[1] h-32 bg-[linear-gradient(180deg,rgba(12,34,26,0.38),rgba(12,34,26,0.12)_45%,transparent)]" />
            <motion.div
              style={shouldReduceMotion ? undefined : { y: mistY }}
              className="absolute inset-0 opacity-32"
            >
              <Image
                src="/assets/legacy/massage-thermal-spa.jpg"
                alt=""
                fill
                priority
                className="object-cover"
                sizes="100vw"
              />
            </motion.div>
            <div className="absolute inset-0 bg-[linear-gradient(112deg,rgba(8,25,20,0.92)_0%,rgba(19,46,36,0.84)_34%,rgba(30,71,55,0.58)_62%,rgba(242,235,226,0.1)_100%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_18%,rgba(255,255,255,0.14),transparent_16%),radial-gradient(circle_at_82%_14%,rgba(212,177,112,0.18),transparent_18%),radial-gradient(circle_at_72%_56%,rgba(223,208,232,0.12),transparent_18%)]" />
            <motion.div
              style={shouldReduceMotion ? undefined : { x: crestX }}
              className="absolute inset-x-0 top-[28%]"
            >
              <div className="sea-thread opacity-85" />
            </motion.div>
            <motion.div
              style={shouldReduceMotion ? undefined : { y: orbY }}
              className="absolute left-[8%] top-[12%] h-44 w-44 rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.14),transparent_70%)] blur-2xl"
            />
            <div className="absolute bottom-0 left-0 h-28 w-full bg-[linear-gradient(180deg,transparent,rgba(255,255,255,0.08)_52%,rgba(250,244,236,0.14))]" />
          </div>

          <div className="relative z-10 flex items-center px-6 py-8 sm:px-8 lg:px-12 lg:py-9">
            <motion.div
              style={shouldReduceMotion ? undefined : { y: copyY, opacity: copyOpacity }}
              className="max-w-[33rem]"
            >
              <div className="flex items-center gap-4">
                <div className="relative h-16 w-16 overflow-hidden rounded-full border border-white/18 bg-white/10 shadow-[0_12px_36px_rgba(9,24,19,0.22)] backdrop-blur-xl">
                  <Image
                    src={brand.logo}
                    alt={brand.name}
                    fill
                    className="object-contain p-3"
                    sizes="64px"
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-[0.34em] text-[rgba(226,204,155,0.94)]">
                    Imperial Garden
                  </p>
                  <div className="mt-2 flex items-center gap-3">
                    <Filigree className="opacity-80" />
                    <span className="text-[11px] uppercase tracking-[0.22em] text-white/64">
                      Professional Thermal SPA
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-7">
                <h1 className="max-w-[9.5ch] font-display text-[3.45rem] leading-[0.9] text-white sm:text-[4.15rem] lg:text-[4.85rem]">
                  {brand.heroTitle}
                </h1>
                <p className="mt-4 max-w-[31rem] text-sm leading-7 text-white/[0.82] sm:text-[15px] lg:text-[1rem]">
                  {brand.heroSubtitle}
                </p>
              </div>

              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button href="/catalog">Открыть каталог</Button>
                <Button href="/about" variant="secondary">
                  О бренде
                </Button>
              </div>

              <motion.div
                style={shouldReduceMotion ? undefined : { y: chipY }}
                className="mt-6 max-w-[33rem] border-t border-white/14 pt-4"
              >
                <div className="grid gap-3 sm:grid-cols-3">
                  {heroQuickLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="organic-chip group flex min-h-[4.5rem] flex-col justify-between border border-white/10 bg-white/[0.06] px-4 py-4 text-left backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-[rgba(210,176,106,0.36)] hover:bg-white/[0.1]"
                    >
                      <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/[0.86]">
                        {item.label}
                      </span>
                      <span className="mt-3 text-[11px] uppercase tracking-[0.18em] text-[rgba(226,204,155,0.94)]">
                        Перейти
                      </span>
                    </Link>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>

          <div className="relative z-10 flex items-center justify-center px-4 pb-6 pt-2 sm:px-6 lg:px-10 lg:pb-8 lg:pt-6">
            <motion.div
              style={shouldReduceMotion ? undefined : { y: artY, scale: artScale }}
              className="relative h-[17.5rem] w-full max-w-[45rem] sm:h-[21.5rem] lg:h-[28.5rem]"
            >
              <div className="absolute inset-[5%] overflow-hidden rounded-[42px] border border-white/12 shadow-[0_34px_90px_rgba(10,26,20,0.28)]">
                <Image
                  src="/assets/legacy/thermal-spa.jpg"
                  alt="Imperial Garden thermal SPA ritual"
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 92vw, 46vw"
                />
                <div className="absolute inset-0 bg-[linear-gradient(145deg,rgba(15,39,30,0.18),rgba(247,241,233,0.04)_42%,rgba(15,39,30,0.44))]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.26),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(9,25,20,0.18))]" />
              </div>
              <div className="absolute inset-x-[13%] inset-y-[13%] rounded-[38px] border border-white/10" />

              <motion.div
                animate={shouldReduceMotion ? undefined : { y: [0, -10, 0] }}
                transition={
                  shouldReduceMotion
                    ? undefined
                    : { duration: 7.4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }
                }
                className="absolute left-[7%] top-[11%] max-w-[13rem] rounded-[28px] border border-white/12 bg-[rgba(255,250,244,0.12)] p-4 text-white shadow-[0_18px_50px_rgba(10,26,20,0.18)] backdrop-blur-md sm:p-5"
              >
                <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[rgba(226,204,155,0.94)]">
                  Морской акцент
                </p>
                <p className="mt-3 text-sm leading-6 text-white/[0.84]">
                  Морские минералы, ботанические экстракты и салонный ритм ухода.
                </p>
              </motion.div>

              {featuredProduct ? (
                <motion.div
                  animate={shouldReduceMotion ? undefined : { y: [0, -16, 0] }}
                  transition={
                    shouldReduceMotion
                      ? undefined
                      : { duration: 8.2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }
                  }
                  className="absolute bottom-[7%] left-[12%] h-[11rem] w-[8.75rem] rounded-[30px] border border-white/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.18),rgba(255,255,255,0.05))] shadow-[0_28px_80px_rgba(10,26,20,0.26)] backdrop-blur-sm sm:h-[13rem] sm:w-[10rem] lg:h-[15rem] lg:w-[11rem]"
                >
                  <Image
                    src={featuredProduct.image}
                    alt={featuredProduct.name}
                    fill
                    className="object-contain p-5 sm:p-6"
                    sizes="(max-width: 640px) 140px, 176px"
                  />
                </motion.div>
              ) : null}

              <motion.div
                style={shouldReduceMotion ? undefined : { y: chipY }}
                className="absolute bottom-[8%] right-[7%] max-w-[16rem] rounded-[30px] border border-[rgba(210,176,106,0.18)] bg-[rgba(250,245,238,0.92)] p-5 text-[var(--color-forest-strong)] shadow-[0_20px_60px_rgba(10,26,20,0.18)] backdrop-blur-md"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-gold-strong)]">
                  Imperial Garden
                </p>
                <p className="mt-3 font-display text-[1.7rem] leading-[0.96]">
                  Дом, кабинет, обучение.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
