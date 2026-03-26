"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

export function RouteTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={
          shouldReduceMotion
            ? false
            : {
                opacity: 0,
                y: 28,
                scale: 0.985,
                filter: "blur(12px)",
              }
        }
        animate={
          shouldReduceMotion
            ? undefined
            : {
                opacity: 1,
                y: 0,
                scale: 1,
                filter: "blur(0px)",
              }
        }
        exit={
          shouldReduceMotion
            ? undefined
            : {
                opacity: 0.62,
                y: -18,
                scale: 1.012,
                filter: "blur(10px)",
              }
        }
        transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
      >
        {!shouldReduceMotion ? (
          <>
            <motion.div
              aria-hidden="true"
              className="pointer-events-none fixed inset-0 z-[120] overflow-hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.86, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.12, times: [0, 0.38, 1], ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                className="absolute inset-y-[-18%] right-[-34%] w-[72vw] rounded-[42%_58%_38%_62%/44%_40%_60%_56%] bg-[linear-gradient(90deg,rgba(255,255,255,0),rgba(255,255,255,0.42)_28%,rgba(212,177,112,0.22)_56%,rgba(32,81,62,0.2)_74%,rgba(255,255,255,0))] blur-3xl"
                initial={{ x: "112%", rotate: 8, scale: 0.94 }}
                animate={{ x: ["112%", "8%", "-122%"], rotate: [8, 2, -8], scale: [0.94, 1, 1.04] }}
                exit={{ x: "-122%" }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              />
              <motion.div
                className="absolute left-[-24%] top-[16%] h-[54vh] w-[54vh] rounded-[50%_50%_42%_58%/42%_58%_50%_50%] border border-[rgba(210,176,106,0.14)] bg-[radial-gradient(circle,rgba(255,255,255,0.18),rgba(255,255,255,0.04)_56%,transparent_72%)] blur-2xl"
                initial={{ opacity: 0, x: -80, scale: 0.84 }}
                animate={{ opacity: [0, 0.72, 0], x: [-80, 0, 80], scale: [0.84, 1, 1.08] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.08, ease: [0.22, 1, 0.36, 1] }}
              />
            </motion.div>
            <motion.div
              aria-hidden="true"
              className="pointer-events-none fixed inset-x-0 top-[6.2rem] z-20 hidden sm:block"
              initial={{ opacity: 0, scaleX: 0.8, x: -42 }}
              animate={{ opacity: 1, scaleX: 1, x: 0 }}
              exit={{ opacity: 0, scaleX: 1.1, x: 34 }}
              transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="mx-auto max-w-[1720px] px-6">
                <div className="sea-thread" />
              </div>
            </motion.div>
            <motion.div
              aria-hidden="true"
              className="pointer-events-none fixed right-[7%] top-[8rem] z-20 hidden h-52 w-52 rounded-full border border-[rgba(210,176,106,0.18)] bg-[radial-gradient(circle,rgba(255,255,255,0.1),transparent_72%)] sm:block"
              initial={{ opacity: 0, scale: 0.68 }}
              animate={{ opacity: 0.94, scale: 1 }}
              exit={{ opacity: 0, scale: 1.08 }}
              transition={{ duration: 0.82, ease: [0.22, 1, 0.36, 1] }}
            />
          </>
        ) : null}
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
