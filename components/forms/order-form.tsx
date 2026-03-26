"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/layout/cart-provider";
import { Button } from "@/components/ui/button";
import { Filigree } from "@/components/ui/filigree";

interface OrderFormProps {
  mode?: "lead" | "checkout";
  title?: string;
  description?: string;
}

export function OrderForm({
  mode = "lead",
  title = "Оставить заявку",
  description = "Заполните короткую форму, и менеджер свяжется с вами, чтобы обсудить заказ, подбор линии или обучение.",
}: OrderFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { cartItems, clearCart } = useCart();

  async function handleSubmit(formData: FormData) {
    setError(null);

    const payload = {
      name: String(formData.get("name") || "").trim(),
      phone: String(formData.get("phone") || "").trim(),
      email: String(formData.get("email") || "").trim(),
      comment: String(formData.get("comment") || "").trim(),
      items:
        mode === "checkout"
          ? cartItems.map((item) => ({
              slug: item.slug,
              quantity: item.quantity,
              title: item.name,
            }))
          : [],
    };

    startTransition(async () => {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const body = (await response.json().catch(() => null)) as { error?: string } | null;
        setError(body?.error || "Не удалось отправить заявку. Попробуйте еще раз.");
        return;
      }

      setIsSuccess(true);

      if (mode === "checkout") {
        clearCart();
      }

      router.refresh();
    });
  }

  return (
    <div className="soft-surface p-6 sm:p-8">
      <div className="flex items-center gap-3">
        <Filigree className="opacity-80" />
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-gold-strong)]">
          Заявка
        </p>
      </div>
      <h3 className="mt-4 font-display text-4xl leading-[1.08] text-[var(--color-forest-strong)]">
        {title}
      </h3>
      <p className="mt-4 max-w-2xl text-sm leading-7 text-[var(--color-forest-muted)]">
        {description}
      </p>

      {isSuccess ? (
        <div className="mt-8 rounded-[30px] bg-[linear-gradient(180deg,rgba(228,238,231,0.92),rgba(245,240,233,0.92))] p-5">
          <p className="text-lg font-semibold text-[var(--color-forest-strong)]">
            Заявка отправлена.
          </p>
          <p className="mt-2 text-sm leading-7 text-[var(--color-forest-muted)]">
            Мы получили ваши контакты и свяжемся с вами, чтобы обсудить заказ,
            подобрать линию ухода или рассказать об обучении.
          </p>
        </div>
      ) : (
        <form action={handleSubmit} className="mt-8 grid gap-4">
          <div className="grid gap-4 md:grid-cols-2">
            <input
              name="name"
              required
              placeholder="Имя"
              className="min-h-14 rounded-[22px] border border-[var(--color-forest)]/10 bg-[var(--color-blush)]/55 px-5 text-base text-[var(--color-forest-strong)] outline-none transition focus:border-[var(--color-gold-strong)] focus:bg-white"
            />
            <input
              name="phone"
              required
              placeholder="Телефон"
              className="min-h-14 rounded-[22px] border border-[var(--color-forest)]/10 bg-[var(--color-blush)]/55 px-5 text-base text-[var(--color-forest-strong)] outline-none transition focus:border-[var(--color-gold-strong)] focus:bg-white"
            />
          </div>
          <input
            name="email"
            type="email"
            required
            placeholder="Email"
            className="min-h-14 rounded-[22px] border border-[var(--color-forest)]/10 bg-[var(--color-blush)]/55 px-5 text-base text-[var(--color-forest-strong)] outline-none transition focus:border-[var(--color-gold-strong)] focus:bg-white"
          />
          <textarea
            name="comment"
            rows={5}
            placeholder={
              mode === "checkout"
                ? "Комментарий к заказу, способ связи, город, пожелания по доставке"
                : "Комментарий, интересующая серия, домашний уход или обучение"
            }
            className="rounded-[22px] border border-[var(--color-forest)]/10 bg-[var(--color-blush)]/55 px-5 py-4 text-base text-[var(--color-forest-strong)] outline-none transition focus:border-[var(--color-gold-strong)] focus:bg-white"
          />
          {error ? <p className="text-sm text-[#8f455d]">{error}</p> : null}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm leading-6 text-[var(--color-forest-muted)]">
              Отправляя форму, вы подтверждаете, что готовы получить обратную связь
              по заказу или обучению.
            </p>
            <Button type="submit" className="sm:shrink-0">
              {isPending ? "Отправляем..." : "Отправить заявку"}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
