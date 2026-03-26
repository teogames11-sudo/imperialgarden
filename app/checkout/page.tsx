import type { Metadata } from "next";
import { OrderForm } from "@/components/forms/order-form";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Reveal } from "@/components/ui/reveal";
import { seoDefaults } from "@/data/site";

export const metadata: Metadata = {
  title: "Оформление заявки | Imperial Garden",
  description:
    "Оформление заявки на заказ Imperial Garden: имя, телефон, email и комментарий без лишних шагов.",
  openGraph: {
    title: "Оформление заявки | Imperial Garden",
    description:
      "Оформление заявки на заказ Imperial Garden: имя, телефон, email и комментарий без лишних шагов.",
    images: [seoDefaults.image],
  },
};

export default function CheckoutPage() {
  return (
    <div className="page-shell py-16">
      <Reveal>
        <Breadcrumbs
          items={[
            { href: "/", label: "Главная" },
            { href: "/cart", label: "Корзина" },
            { label: "Оформление заявки" },
          ]}
        />
      </Reveal>
      <div className="mt-6 grid gap-8 xl:grid-cols-[0.9fr,1.1fr]">
        <Reveal>
          <div className="soft-surface p-6 sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-gold-strong)]">
              Checkout
            </p>
            <h1 className="mt-4 font-display text-5xl leading-none text-[var(--color-forest-strong)] sm:text-6xl">
              Оформление заявки
            </h1>
            <div className="mt-6 space-y-4 text-sm leading-7 text-[var(--color-forest-muted)]">
              <p>Оставьте базовые контакты и комментарий к заказу.</p>
              <p>
                Менеджер свяжется с вами, чтобы подтвердить наличие, состав корзины,
                стоимость и детали доставки.
              </p>
              <p>
                Если нужно, в комментарии можно указать интерес к обучению или подбору
                линии для кабинета.
              </p>
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.08}>
          <OrderForm
            mode="checkout"
            title="Подтвердить заказ"
            description="Оставьте контакты, и мы свяжемся с вами для подтверждения состава корзины и деталей поставки."
          />
        </Reveal>
      </div>
    </div>
  );
}
