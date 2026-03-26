export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function formatRuDate(input: string) {
  const parts = input.split(".");

  if (parts.length !== 3) {
    return input;
  }

  const [day, month, year] = parts.map(Number);
  const date = new Date(Date.UTC(year, month - 1, day));

  return new Intl.DateTimeFormat("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export function parseRuDate(input: string) {
  const parts = input.split(".");

  if (parts.length !== 3) {
    return new Date(0);
  }

  const [day, month, year] = parts.map(Number);
  return new Date(year, month - 1, day);
}

export function excerpt(text: string, maxLength = 140) {
  if (text.length <= maxLength) {
    return text;
  }

  return `${text.slice(0, maxLength).trimEnd()}…`;
}

export function slugifySegment(input: string) {
  return input
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9а-яё]+/gi, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}
