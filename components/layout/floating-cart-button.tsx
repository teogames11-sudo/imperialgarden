"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { useCart } from "@/components/layout/cart-provider";

export function FloatingCartButton() {
  const { itemsCount, openCart } = useCart();
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.button
      type="button"
      onClick={openCart}
      className="organic-button fixed bottom-4 right-4 z-50 inline-flex min-h-14 items-center gap-3 border border-[rgba(210,176,106,0.26)] bg-[linear-gradient(135deg,rgba(16,43,33,0.94),rgba(29,79,61,0.92))] px-5 text-sm font-semibold text-white shadow-[0_22px_60px_rgba(10,26,20,0.24)] backdrop-blur-xl sm:bottom-6 sm:right-6 lg:bottom-auto lg:top-5"
      animate={shouldReduceMotion ? undefined : { y: [0, -2, 0] }}
      transition={shouldReduceMotion ? undefined : { duration: 4.5, ease: "easeInOut", repeat: Infinity }}
      whileHover={shouldReduceMotion ? undefined : { y: -2, scale: 1.01 }}
      whileTap={shouldReduceMotion ? undefined : { scale: 0.98 }}
    >
      <ShoppingBag className="size-4" />
      <span>Корзина</span>
      <span className="inline-flex min-w-7 items-center justify-center rounded-full bg-[rgba(255,255,255,0.14)] px-2 py-1 text-xs">
        {itemsCount}
      </span>
    </motion.button>
  );
}
