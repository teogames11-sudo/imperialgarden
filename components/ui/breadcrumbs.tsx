import Link from "next/link";
import { Filigree } from "@/components/ui/filigree";

interface BreadcrumbItem {
  href?: string;
  label: string;
}

export function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Хлебные крошки" className="text-sm text-[var(--color-forest-muted)]">
      <div className="mb-3">
        <Filigree className="opacity-70" />
      </div>
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`} className="flex items-center gap-2">
            {item.href ? (
              <Link href={item.href} className="transition hover:text-[var(--color-forest-strong)]">
                {item.label}
              </Link>
            ) : (
              <span className="text-[var(--color-forest-strong)]">{item.label}</span>
            )}
            {index < items.length - 1 ? (
              <span className="text-[var(--color-gold-strong)]">/</span>
            ) : null}
          </li>
        ))}
      </ol>
    </nav>
  );
}
