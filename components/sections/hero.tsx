"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Filigree } from "@/components/ui/filigree";
import { brand, popularProducts } from "@/data/site";

export function HeroSection() {
  const heroRef = useRef<HTMLElement | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const copyY = useTransform(scrollYProgress, [0, 1], [0, -92]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.72, 1], [1, 0.94, 0.68]);
  const artY = useTransform(scrollYProgress, [0, 1], [0, -118]);
  const artScale = useTransform(scrollYProgress, [0, 1], [1, 1.06]);
  const artRotate = useTransform(scrollYProgress, [0, 1], ["0deg", "5deg"]);
  const mistY = useTransform(scrollYProgress, [0, 1], [0, 118]);
  const crestX = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const labelY = useTransform(scrollYProgress, [0, 1], [0, -42]);
  const orbY = useTransform(scrollYProgress, [0, 1], [0, -56]);

  const heroProducts = [popularProducts[0], popularProducts[3], popularProducts[6]].filter(Boolean);

  return (
    <section
      ref={heroRef}
      className="relative -mt-[5.75rem] overflow-hidden px-3 pb-5 pt-[5.75rem] sm:-mt-[6.75rem] sm:px-5 sm:pb-6 sm:pt-[6.75rem] lg:-mt-[7rem] lg:pt-[7rem]"
    >
      <div className="mx-auto max-w-[1720px] overflow-hidden rounded-[44px] border border-[rgba(255,255,255,0.16)] bg-[linear-gradient(180deg,rgba(11,31,24,0.16),rgba(255,255,255,0.04))] shadow-[0_36px_120px_rgba(11,30,23,0.18)]">
        <div className="relative grid min-h-[31rem] lg:min-h-[calc(100svh-9.1rem)] lg:grid-cols-[0.92fr,1.08fr]">
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
            <div className="absolute inset-0 bg-[linear-gradient(112deg,rgba(8,25,20,0.9)_0%,rgba(19,46,36,0.82)_34%,rgba(30,71,55,0.54)_62%,rgba(242,235,226,0.08)_100%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_16%_18%,rgba(255,255,255,0.14),transparent_16%),radial-gradient(circle_at_82%_14%,rgba(212,177,112,0.18),transparent_18%),radial-gradient(circle_at_72%_56%,rgba(223,208,232,0.12),transparent_18%)]" />
            <motion.div
              style={shouldReduceMotion ? undefined : { x: crestX }}
              className="absolute inset-x-0 top-[27%]"
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
              className="max-w-[34rem]"
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
                    <span className="text-[11px] uppercase tracking-[0.22em] text-white/60">
                      Thermal Body Rituals
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <h1 className="max-w-[9.5ch] font-display text-[3.8rem] leading-[0.88] text-white sm:text-[4.5rem] lg:text-[5.35rem]">
                  Красота тела в ритме моря.
                </h1>
                <p className="mt-5 max-w-[32rem] text-sm leading-7 text-white/[0.82] sm:text-[15px] lg:text-[1.02rem]">
                  Профессиональные SPA-линии, домашние ритуалы и обучение мастеров в
                  эстетике минералов, ботаники и мягкого света.
                </p>
              </div>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Button href="/catalog">Открыть каталог</Button>
                <Button href="/about" variant="secondary">
                  О бренде
                </Button>
              </div>

              <motion.div
                style={shouldReduceMotion ? undefined : { y: labelY }}
                className="mt-7 max-w-[28rem] border-t border-white/14 pt-4"
              >
                <div className="grid gap-3 sm:grid-cols-3">
                  {[
                    "Кабинетные линии",
                    "Домашний уход",
                    "Обучение мастеров",
                  ].map((item) => (
                    <div
                      key={item}
                      className="rounded-[20px] border border-white/10 bg-white/[0.06] px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/[0.82] backdrop-blur-sm"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          </div>

          <div className="relative z-10 flex items-center justify-center px-4 pb-6 pt-2 sm:px-6 lg:px-10 lg:pb-8 lg:pt-6">
            <motion.div
              style={
                shouldReduceMotion
                  ? undefined
                  : { y: artY, scale: artScale, rotate: artRotate }
              }
              className="relative h-[18rem] w-full max-w-[44rem] sm:h-[21rem] lg:h-[29rem]"
            >
              <div className="absolute inset-x-[10%] inset-y-[13%] rounded-[44px] border border-white/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.16),rgba(255,255,255,0.05))] shadow-[0_34px_90px_rgba(10,26,20,0.28)] backdrop-blur-md" />
              <div className="absolute inset-x-[19%] inset-y-[22%] rounded-[40px] border border-white/10 bg-[rgba(255,255,255,0.08)] backdrop-blur-sm" />
              <div className="absolute inset-0 opacity-34 mix-blend-screen">
                <Image
                  src="/assets/legacy/floral.jpg"
                  alt=""
                  fill
                  className="object-cover"
                  sizes="50vw"
                />
              </div>

              <motion.div
                animate={
                  shouldReduceMotion
                    ? undefined
                    : { y: [0, -12, 0], rotate: [0, 1.2, 0] }
                }
                transition={
                  shouldReduceMotion
                    ? undefined
                    : {
                        duration: 7.2,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }
                }
                className="absolute left-[7%] top-[42%] h-28 w-24 rounded-[24px] border border-white/12 bg-[rgba(255,255,255,0.14)] shadow-[0_22px_60px_rgba(10,26,20,0.22)] backdrop-blur-sm sm:h-36 sm:w-28"
              >
                {heroProducts[2] ? (
                  <Image
                    src={heroProducts[2].image}
                    alt={heroProducts[2].name}
                    fill
                    className="object-contain p-4"
                    sizes="112px"
                  />
                ) : null}
              </motion.div>

              <motion.div
                animate={shouldReduceMotion ? undefined : { y: [0, -18, 0] }}
                transition={
                  shouldReduceMotion
                    ? undefined
                    : {
                        duration: 8.6,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }
                }
                className="absolute left-1/2 top-[11%] h-[14.5rem] w-36 -translate-x-1/2 rounded-[34px] border border-white/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.22),rgba(255,255,255,0.06))] shadow-[0_28px_80px_rgba(10,26,20,0.3)] backdrop-blur-sm sm:h-[18rem] sm:w-44 lg:h-[22rem] lg:w-52"
              >
                {heroProducts[0] ? (
                  <Image
                    src={heroProducts[0].image}
                    alt={heroProducts[0].name}
                    fill
                    className="object-contain p-5 sm:p-6"
                    sizes="208px"
                  />
                ) : null}
              </motion.div>

              <motion.div
                animate={
                  shouldReduceMotion
                    ? undefined
                    : { y: [0, -10, 0], rotate: [0, -1.5, 0] }
                }
                transition={
                  shouldReduceMotion
                    ? undefined
                    : {
                        duration: 6.4,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }
                }
                className="absolute right-[10%] top-[18%] h-24 w-20 rounded-[22px] border border-white/12 bg-[rgba(255,255,255,0.12)] shadow-[0_18px_48px_rgba(10,26,20,0.18)] backdrop-blur-sm sm:h-32 sm:w-24"
              >
                {heroProducts[1] ? (
                  <Image
                    src={heroProducts[1].image}
                    alt={heroProducts[1].name}
                    fill
                    className="object-contain p-4"
                    sizes="96px"
                  />
                ) : null}
              </motion.div>

              <div className="absolute left-[14%] top-[13%] rounded-[999px] border border-white/12 bg-[rgba(14,35,28,0.3)] px-4 py-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/[0.84] backdrop-blur-sm">
                Sea minerals
              </div>

              <motion.div
                style={shouldReduceMotion ? undefined : { y: labelY }}
                className="absolute bottom-[7%] right-[11%] max-w-[16rem] rounded-[28px] border border-[rgba(210,176,106,0.18)] bg-[rgba(250,245,238,0.9)] p-4 text-[var(--color-forest-strong)] shadow-[0_20px_60px_rgba(10,26,20,0.18)] backdrop-blur-md"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-gold-strong)]">
                  Imperial Garden
                </p>
                <p className="mt-3 font-display text-[1.65rem] leading-[0.96]">
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
