import { cn } from "@/lib/utils";

export function Filigree({
  className,
  flip = false,
}: {
  className?: string;
  flip?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 240 80"
      aria-hidden="true"
      className={cn("h-8 w-28", flip && "-scale-x-100", className)}
      fill="none"
    >
      <path
        d="M6 56c28-26 52-36 74-36 19 0 31 8 44 24 11 14 21 22 39 22 22 0 45-12 71-40"
        stroke="rgba(165,122,52,0.78)"
        strokeLinecap="round"
        strokeWidth="1.2"
      />
      <path
        d="M24 64c14-14 30-21 47-21 15 0 28 6 44 20 13 12 26 17 41 17 13 0 27-4 52-14"
        stroke="rgba(29,79,61,0.68)"
        strokeLinecap="round"
        strokeWidth="1"
      />
    </svg>
  );
}
