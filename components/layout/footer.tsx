import Link from "next/link";
import { Filigree } from "@/components/ui/filigree";
import { contacts, footerGroups } from "@/data/site";

export function Footer() {
  return (
    <footer className="mt-20 px-3 pb-6 sm:px-5 sm:pb-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[34px] border border-[rgba(210,176,106,0.16)] bg-[linear-gradient(180deg,rgba(16,43,33,0.96),rgba(19,50,39,0.92))] text-white shadow-[0_28px_90px_rgba(10,26,20,0.18)]">
        <div className="grid gap-12 px-6 py-12 sm:px-8 lg:grid-cols-[1.2fr,1fr,1fr,1fr]">
          <div>
            <div className="flex items-center gap-3">
              <Filigree className="opacity-80" />
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[rgba(226,204,155,0.94)]">
                Imperial Garden
              </p>
            </div>
            <h3 className="mt-5 max-w-lg font-display text-4xl leading-[1.06] text-white">
              Линии для тела, в которых встречаются ботаника, морской воздух и
              салонная эстетика.
            </h3>
            <p className="mt-5 max-w-md text-sm leading-7 text-white/[0.74]">
              Для студий, SPA-ритуалов и домашнего ухода, который хочется
              повторять.
            </p>
          </div>

          {footerGroups.map((group) => (
            <div key={group.title}>
              <h4 className="text-sm font-semibold uppercase tracking-[0.22em] text-[rgba(226,204,155,0.9)]">
                {group.title}
              </h4>
              <div className="mt-5 grid gap-3">
                {group.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="text-sm leading-6 text-white/[0.74] transition hover:text-white"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mx-6 h-px bg-[linear-gradient(90deg,transparent,rgba(210,176,106,0.55),transparent)] sm:mx-8" />

        <div className="flex flex-col gap-3 px-6 py-6 text-sm text-white/[0.72] sm:px-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:gap-6">
            <Link
              href={`tel:${contacts.phone.replace(/\D/g, "")}`}
              className="transition hover:text-white"
            >
              {contacts.phone}
            </Link>
            <Link
              href={`mailto:${contacts.email}`}
              className="transition hover:text-white"
            >
              {contacts.email}
            </Link>
            <span>{contacts.office}</span>
          </div>
          <p>© Imperial Garden {new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  );
}
