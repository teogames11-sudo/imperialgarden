"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

export function AmbientBackdrop() {
  const { scrollY } = useScroll();
  const shouldReduceMotion = useReducedMotion();

  const tideY = useTransform(scrollY, [0, 1800], [0, -180]);
  const mistY = useTransform(scrollY, [0, 1600], [0, 120]);
  const glowY = useTransform(scrollY, [0, 1400], [0, -72]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <motion.div
        style={shouldReduceMotion ? undefined : { y: tideY }}
        className="absolute inset-0"
      >
        <div className="absolute -left-40 top-8 h-[34rem] w-[34rem] rounded-full bg-[radial-gradient(circle,rgba(58,108,85,0.24),rgba(58,108,85,0.1)_38%,transparent_72%)] blur-3xl" />
        <div className="absolute right-[-10rem] top-20 h-[28rem] w-[28rem] rounded-full bg-[radial-gradient(circle,rgba(214,191,143,0.18),rgba(214,191,143,0.08)_34%,transparent_72%)] blur-3xl" />
        <div className="absolute left-[10%] top-[34rem] h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(circle,rgba(219,207,229,0.18),rgba(219,207,229,0.06)_40%,transparent_74%)] blur-3xl" />
        <div className="absolute right-[14%] top-[52rem] h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.22),rgba(255,255,255,0.06)_36%,transparent_72%)] blur-3xl" />
      </motion.div>

      <motion.div
        style={shouldReduceMotion ? undefined : { y: glowY }}
        className="absolute right-[4%] top-[10rem] hidden h-[24rem] w-[24rem] rounded-full border border-[rgba(210,176,106,0.14)] bg-[radial-gradient(circle,rgba(255,255,255,0.12),transparent_72%)] blur-[1px] sm:block"
      />
      <motion.div
        style={shouldReduceMotion ? undefined : { y: mistY }}
        className="absolute left-[-6rem] top-[22rem] hidden h-[26rem] w-[26rem] rounded-full border border-[rgba(30,85,63,0.1)] sm:block"
      />
    </div>
  );
}
