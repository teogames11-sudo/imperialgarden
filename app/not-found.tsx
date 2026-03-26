import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="page-shell flex min-h-[60vh] flex-col items-center justify-center py-20 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-gold-strong)]">
        404
      </p>
      <h1 className="mt-4 font-display text-5xl text-[var(--color-forest-strong)] sm:text-6xl">
        Страница не найдена
      </h1>
      <p className="mt-4 max-w-xl text-sm leading-7 text-[var(--color-forest-muted)]">
        Возможно, ссылка устарела или адрес был введен с ошибкой. Вернитесь на
        главную страницу или откройте каталог.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button href="/">На главную</Button>
        <Button href="/catalog" variant="secondary">
          Перейти в каталог
        </Button>
      </div>
    </div>
  );
}
