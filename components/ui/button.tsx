import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

const variants = {
  primary:
    "bg-[linear-gradient(135deg,#184737,#2c6c52)] text-[var(--color-ivory)] shadow-[0_20px_48px_rgba(23,64,49,0.26)] hover:-translate-y-0.5 hover:shadow-[0_24px_56px_rgba(23,64,49,0.32)]",
  secondary:
    "bg-[rgba(255,250,244,0.92)] text-[var(--color-forest-strong)] ring-1 ring-[var(--color-gold)]/50 shadow-[0_12px_32px_rgba(17,45,34,0.08)] hover:bg-white",
  ghost:
    "bg-transparent text-[var(--color-forest-strong)] ring-1 ring-[var(--color-forest)]/20 hover:bg-[rgba(24,71,55,0.06)]",
};

const baseClassName =
  "organic-button inline-flex min-h-12 items-center justify-center px-6 py-3 text-sm font-semibold tracking-[0.02em] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-forest)] focus-visible:ring-offset-2 focus-visible:ring-offset-white";

interface ButtonProps {
  href?: string;
  type?: "button" | "submit" | "reset";
  variant?: keyof typeof variants;
  className?: string;
  children: ReactNode;
  onClick?: () => void;
}

export function Button({
  href,
  type = "button",
  variant = "primary",
  className,
  children,
  onClick,
}: ButtonProps) {
  const resolvedClassName = cn(baseClassName, variants[variant], className);

  if (href) {
    return (
      <Link href={href} className={resolvedClassName}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={resolvedClassName} onClick={onClick}>
      {children}
    </button>
  );
}
