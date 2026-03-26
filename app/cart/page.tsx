import type { Metadata } from "next";
import { CartPageView } from "@/components/cart/cart-page";
import { Breadcrumbs } from "@/components/ui/breadcrumbs";
import { Reveal } from "@/components/ui/reveal";
import { seoDefaults } from "@/data/site";

export const metadata: Metadata = {
  title: "Корзина | Imperial Garden",
  description:
    "Корзина Imperial Garden: проверка позиций, количество, промежуточный итог и переход к оформлению заявки.",
  openGraph: {
    title: "Корзина | Imperial Garden",
    description:
      "Корзина Imperial Garden: проверка позиций, количество, промежуточный итог и переход к оформлению заявки.",
    images: [seoDefaults.image],
  },
};

export default function CartPage() {
  return (
    <div className="page-shell py-16">
      <Reveal>
        <Breadcrumbs
          items={[
            { href: "/", label: "Главная" },
            { label: "Корзина" },
          ]}
        />
      </Reveal>
      <Reveal className="mt-6">
        <h1 className="font-display text-5xl leading-none text-[var(--color-forest-strong)] sm:text-6xl">
          Корзина
        </h1>
      </Reveal>
      <div className="mt-10">
        <CartPageView />
      </div>
    </div>
  );
}

