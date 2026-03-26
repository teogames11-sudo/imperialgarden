"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useCart } from "@/components/layout/cart-provider";
import { Button } from "@/components/ui/button";

export function CartPageView() {
  const { cartItems, updateQuantity, removeItem, itemsCount } = useCart();

  if (!cartItems.length) {
    return (
      <div className="soft-surface p-8 text-center sm:p-12">
        <h2 className="font-display text-4xl text-[var(--color-forest-strong)]">
          Корзина пока пуста
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[var(--color-forest-muted)]">
          Добавьте средства из каталога, чтобы собрать заказ. Стоимость по позициям
          уточняется менеджером после подтверждения заявки.
        </p>
        <Button href="/catalog" className="mt-8">
          Перейти в каталог
        </Button>
      </div>
    );
  }

  return (
    <div className="grid gap-8 xl:grid-cols-[1.25fr,0.75fr]">
      <div className="grid gap-5">
        {cartItems.map((item) => (
          <div key={item.slug} className="soft-surface overflow-hidden p-5 sm:p-6">
            <div className="flex flex-col gap-5 sm:flex-row">
              <div className="relative h-44 w-full shrink-0 overflow-hidden rounded-[28px] bg-[linear-gradient(180deg,rgba(242,246,242,0.95),rgba(229,238,233,0.82))] sm:h-40 sm:w-36">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-contain p-4"
                  sizes="(max-width: 640px) 100vw, 144px"
                />
              </div>
              <div className="flex flex-1 flex-col justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-[var(--color-gold-strong)]">
                    {item.seriesName}
                  </p>
                  <Link href={`/catalog/products/${item.slug}`}>
                    <h3 className="mt-2 text-2xl font-semibold text-[var(--color-forest-strong)]">
                      {item.name}
                    </h3>
                  </Link>
                  <p className="mt-2 text-sm text-[var(--color-forest-muted)]">
                    {item.subtitle}
                  </p>
                  <p className="mt-4 text-sm leading-7 text-[var(--color-forest-muted)]">
                    {item.summary}
                  </p>
                </div>
                <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="organic-chip inline-flex items-center bg-[var(--color-blush)] px-2 py-1">
                    <button
                      type="button"
                      className="rounded-full p-2 transition hover:bg-white/80"
                      onClick={() => updateQuantity(item.slug, item.quantity - 1)}
                    >
                      <Minus className="size-4 text-[var(--color-forest-strong)]" />
                    </button>
                    <span className="min-w-8 text-center text-sm font-semibold text-[var(--color-forest-strong)]">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      className="rounded-full p-2 transition hover:bg-white/80"
                      onClick={() => updateQuantity(item.slug, item.quantity + 1)}
                    >
                      <Plus className="size-4 text-[var(--color-forest-strong)]" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <p className="text-sm font-semibold text-[var(--color-forest-strong)]">
                      {item.priceLabel}
                    </p>
                    <button
                      type="button"
                      className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm text-[var(--color-forest-muted)] transition hover:bg-[var(--color-blush)] hover:text-[var(--color-forest-strong)]"
                      onClick={() => removeItem(item.slug)}
                    >
                      <Trash2 className="size-4" />
                      Удалить
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <aside className="soft-surface h-fit p-6 sm:p-8">
        <h2 className="font-display text-4xl text-[var(--color-forest-strong)]">
          Детали заказа
        </h2>
        <div className="mt-6 space-y-4 rounded-[28px] bg-[var(--color-blush)]/72 p-5 text-sm leading-7 text-[var(--color-forest-muted)]">
          <p>Позиций в корзине: {itemsCount}</p>
          <p>Стоимость уточняется менеджером после подтверждения состава заказа.</p>
          <p>При необходимости можно добавить комментарий по доставке или обучению.</p>
        </div>
        <div className="mt-8 grid gap-3">
          <Button href="/checkout" className="w-full">
            Перейти к оформлению
          </Button>
          <Button href="/catalog" variant="ghost" className="w-full">
            Продолжить выбор
          </Button>
        </div>
      </aside>
    </div>
  );
}
