import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { contacts, contactsQuickLinks, seoDefaults } from "@/data/site";

export const metadata: Metadata = {
  title: "Контакты | Imperial Garden",
  description:
    "Контакты, реквизиты и сервисная информация по заказу, оплате, доставке и возврату продукции Imperial Garden.",
  openGraph: {
    title: "Контакты | Imperial Garden",
    description:
      "Контакты, реквизиты и сервисная информация по заказу, оплате, доставке и возврату продукции Imperial Garden.",
    images: [seoDefaults.image],
  },
};

export default function ContactsPage() {
  return (
    <div className="page-shell py-16">
      <Reveal>
        <SectionHeading
          eyebrow="Контакты"
          title="Связаться с брендом, обсудить заказ и открыть сервисные страницы."
          body="Здесь собраны основные контакты Imperial Garden и отдельные страницы для заказа, оплаты, доставки и возврата."
        />
      </Reveal>

      <div className="mt-10 grid gap-6 xl:grid-cols-[1fr,1fr]">
        <Reveal>
          <div className="soft-surface p-6 sm:p-8">
            <h2 className="font-display text-4xl leading-[1.08] text-[var(--color-forest-strong)]">
              Основные контакты
            </h2>
            <div className="mt-6 space-y-4 text-sm leading-7 text-[var(--color-forest-muted)]">
              <p>{contacts.office}</p>
              <p>{contacts.phone}</p>
              <p>{contacts.email}</p>
            </div>
            <div className="mt-6 rounded-[28px] bg-[var(--color-blush)]/72 p-5">
              <h3 className="text-xl font-semibold text-[var(--color-forest-strong)]">
                Для знакомства с брендом
              </h3>
              <p className="mt-3 text-sm leading-7 text-[var(--color-forest-muted)]">
                {contacts.introText}
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="soft-surface p-6 sm:p-8">
            <h2 className="font-display text-4xl leading-[1.08] text-[var(--color-forest-strong)]">
              Официальные представители
            </h2>
            <div className="mt-6 grid gap-4">
              {contacts.representatives.map((group) => (
                <div
                  key={group[0]}
                  className="rounded-[28px] bg-[var(--color-blush)]/72 p-5 text-sm leading-7 text-[var(--color-forest-muted)]"
                >
                  {group.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>

      <section className="mt-12">
        <Reveal>
          <SectionHeading
            eyebrow="Сервис"
            title="Заказ, оплата, доставка и возврат вынесены в отдельные страницы."
            body="Так каждая служебная тема открывается отдельно и не перегружает основной контактный раздел."
          />
        </Reveal>
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {contactsQuickLinks.map((item, index) => (
            <Reveal key={item.href} delay={index * 0.04}>
              <Link href={item.href} className="soft-surface block p-6 transition hover:-translate-y-1">
                <h3 className="font-display text-3xl leading-[1.08] text-[var(--color-forest-strong)]">
                  {item.label}
                </h3>
                <p className="mt-4 text-sm leading-7 text-[var(--color-forest-muted)]">
                  {item.description}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
