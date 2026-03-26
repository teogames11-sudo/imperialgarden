import { Filigree } from "@/components/ui/filigree";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  body?: string;
  align?: "left" | "center";
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  body,
  align = "left",
  className,
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div
      className={cn(
        "max-w-3xl",
        centered ? "mx-auto text-center" : "text-left",
        className,
      )}
    >
      {eyebrow ? (
        <div
          className={cn(
            "mb-4 flex items-center gap-3",
            centered ? "justify-center" : "justify-start",
          )}
        >
          <Filigree className="opacity-85" />
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-gold-strong)]">
            {eyebrow}
          </p>
        </div>
      ) : null}
      <h2 className="font-display text-4xl leading-[1.02] text-[var(--color-forest-strong)] sm:text-5xl">
        {title}
      </h2>
      {body ? (
        <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--color-forest-muted)] sm:text-lg">
          {body}
        </p>
      ) : null}
      <div className={cn("mt-6", centered ? "flex justify-center" : "")}>
        <Filigree className="opacity-75" flip={centered} />
      </div>
    </div>
  );
}
