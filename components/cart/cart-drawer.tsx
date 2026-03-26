"use client";

import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useEffectEvent } from "react";
import { useCart } from "@/components/layout/cart-provider";
import { Button } from "@/components/ui/button";

export function CartDrawer() {
  const pathname = usePathname();
  const {
    isOpen,
    closeCart,
    cartItems,
    itemsCount,
    updateQuantity,
    removeItem,
  } = useCart();
  const closeOnPathChange = useEffectEvent(() => {
    closeCart();
  });

  useEffect(() => {
    closeOnPathChange();
  }, [pathname]);

  return (
    <AnimatePresence>
      {isOpen ? (
        <>
          <motion.button
            aria-label="Закрыть корзину"
            className="fixed inset-0 z-40 bg-[rgba(18,34,28,0.34)] backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
          />
          <motion.aside
            className="fixed inset-y-0 right-0 z-50 flex w-full max-w-md flex-col border-l border-white/60 bg-[var(--color-ivory)]/95 p-5 shadow-[0_30px_90px_rgba(20,45,36,0.18)] backdrop-blur-xl"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-5 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[var(--color-gold-strong)]">
                  Корзина
                </p>
                <h3 className="mt-2 font-display text-3xl text-[var(--color-forest-strong)]">
                  {itemsCount} позиций
                </h3>
              </div>
              <button
                type="button"
                className="rounded-full p-3 text-[var(--color-forest-strong)] transition hover:bg-[var(--color-forest)]/5"
                onClick={closeCart}
              >
                <X className="size-5" />
              </button>
            </div>

            {cartItems.length ? (
              <>
                <div className="flex-1 space-y-4 overflow-y-auto pr-1">
                  {cartItems.map((item) => (
                    <div
                      key={item.slug}
                      className="rounded-[28px] border border-[var(--color-forest)]/10 bg-white/70 p-4"
                    >
                      <div className="flex gap-4">
                        <div className="relative h-28 w-24 shrink-0 overflow-hidden rounded-[22px] bg-[linear-gradient(180deg,rgba(242,246,242,0.95),rgba(223,234,228,0.85))]">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-contain p-3"
                            sizes="96px"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-gold-strong)]">
                            {item.seriesName}
                          </p>
                          <h4 className="mt-2 text-lg font-semibold text-[var(--color-forest-strong)]">
                            {item.name}
                          </h4>
                          <p className="mt-1 text-sm text-[var(--color-forest-muted)]">
                            {item.subtitle}
                          </p>
                          <p className="mt-3 text-sm font-semibold text-[var(--color-forest-strong)]">
                            {item.priceLabel}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center justify-between gap-3">
                        <div className="inline-flex items-center rounded-full bg-[var(--color-blush)] px-2 py-1">
                          <button
                            type="button"
                            className="rounded-full p-2 text-[var(--color-forest-strong)] transition hover:bg-white/70"
                            onClick={() => updateQuantity(item.slug, item.quantity - 1)}
                          >
                            <Minus className="size-4" />
                          </button>
                          <span className="min-w-8 text-center text-sm font-semibold text-[var(--color-forest-strong)]">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            className="rounded-full p-2 text-[var(--color-forest-strong)] transition hover:bg-white/70"
                            onClick={() => updateQuantity(item.slug, item.quantity + 1)}
                          >
                            <Plus className="size-4" />
                          </button>
                        </div>
                        <button
                          type="button"
                          className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm text-[var(--color-forest-muted)] transition hover:bg-[var(--color-forest)]/5 hover:text-[var(--color-forest-strong)]"
                          onClick={() => removeItem(item.slug)}
                        >
                          <Trash2 className="size-4" />
                          Удалить
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-5 rounded-[28px] border border-[var(--color-gold)]/20 bg-white/70 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm text-[var(--color-forest-muted)]">Итог по заявке</p>
                      <p className="mt-1 text-lg font-semibold text-[var(--color-forest-strong)]">
                        Стоимость уточняется менеджером
                      </p>
                    </div>
                    <ShoppingBag className="size-5 text-[var(--color-gold-strong)]" />
                  </div>
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <Button href="/cart" variant="ghost" className="w-full">
                    Корзина
                  </Button>
                  <Button href="/checkout" className="w-full">
                    Оформить заявку
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex flex-1 flex-col items-center justify-center rounded-[32px] border border-dashed border-[var(--color-forest)]/15 bg-white/65 p-8 text-center">
                <ShoppingBag className="size-8 text-[var(--color-gold-strong)]" />
                <h4 className="mt-5 font-display text-3xl text-[var(--color-forest-strong)]">
                  Корзина пока пуста
                </h4>
                <p className="mt-3 max-w-xs text-sm leading-6 text-[var(--color-forest-muted)]">
                  Добавьте продукты из каталога, а затем отправьте простую заявку на заказ.
                </p>
                <Button href="/catalog" className="mt-6">
                  Перейти в каталог
                </Button>
              </div>
            )}
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>
  );
}
