"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const imageSets = [
  [
    {
      src: "/assets/legacy/massage-thermal-spa.jpg",
      alt: "SPA-ритуал Imperial Garden",
      sizes: "(max-width: 1024px) 100vw, 28vw",
    },
    {
      src: "/assets/legacy/thermal-spa.jpg",
      alt: "Thermal SPA линия Imperial Garden",
      sizes: "(max-width: 1024px) 50vw, 18vw",
    },
    {
      src: "/assets/legacy/floral.jpg",
      alt: "Ботаническая атмосфера Imperial Garden",
      sizes: "(max-width: 1024px) 50vw, 18vw",
    },
  ],
  [
    {
      src: "/assets/legacy/floral.jpg",
      alt: "Ботаническая палитра Imperial Garden",
      sizes: "(max-width: 1024px) 100vw, 28vw",
    },
    {
      src: "/assets/legacy/lift-and-slim.jpg",
      alt: "Lift and Slim линия Imperial Garden",
      sizes: "(max-width: 1024px) 50vw, 18vw",
    },
    {
      src: "/assets/legacy/mousse-and-juice.jpg",
      alt: "Mousse and Juice линия Imperial Garden",
      sizes: "(max-width: 1024px) 50vw, 18vw",
    },
  ],
  [
    {
      src: "/assets/legacy/thermal-spa.jpg",
      alt: "Морская линия Imperial Garden",
      sizes: "(max-width: 1024px) 100vw, 28vw",
    },
    {
      src: "/assets/legacy/anti-cellulite.jpg",
      alt: "Anti-Cellulite линия Imperial Garden",
      sizes: "(max-width: 1024px) 50vw, 18vw",
    },
    {
      src: "/assets/legacy/massage-thermal-spa.jpg",
      alt: "Салонная атмосфера Imperial Garden",
      sizes: "(max-width: 1024px) 50vw, 18vw",
    },
  ],
];

export function HomeImageTriptych() {
  const [activeSet, setActiveSet] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setActiveSet(Math.floor(Math.random() * imageSets.length));
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="relative h-full min-h-[31rem] overflow-hidden rounded-[34px] border border-[rgba(17,45,34,0.08)] bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(247,243,237,0.96))] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] sm:p-5">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(210,176,106,0.12),transparent_24%),radial-gradient(circle_at_bottom_left,rgba(216,206,221,0.14),transparent_26%)]" />
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSet}
          initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.985 }}
          animate={shouldReduceMotion ? undefined : { opacity: 1, scale: 1 }}
          exit={shouldReduceMotion ? undefined : { opacity: 0, scale: 1.01 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 grid h-full gap-3 lg:grid-cols-[1.08fr,0.92fr]"
        >
          <div className="relative min-h-[14rem] overflow-hidden rounded-[28px] sm:min-h-[18rem]">
            <Image
              src={imageSets[activeSet][0].src}
              alt={imageSets[activeSet][0].alt}
              fill
              className="object-cover"
              sizes={imageSets[activeSet][0].sizes}
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,41,33,0.08),rgba(17,41,33,0.22))]" />
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {imageSets[activeSet].slice(1).map((image) => (
              <div key={image.src} className="relative min-h-[11rem] overflow-hidden rounded-[24px]">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover"
                  sizes={image.sizes}
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(17,41,33,0.16))]" />
              </div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
