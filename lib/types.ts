export type PurposeTag =
  | "anti-cellulite"
  | "toning"
  | "figure-correction"
  | "relax"
  | "nutrition"
  | "spa-ritual"
  | "lifting"
  | "firming"
  | "anti-age"
  | "massage"
  | "recovery"
  | "detox"
  | "revitalization"
  | "drainage"
  | "mineral-care"
  | "hydration"
  | "home-care"
  | "professional";

export type ProductGroup = "professional" | "expert" | "home";

export type ContentBlock =
  | {
      type: "paragraph";
      text: string;
    }
  | {
      type: "list";
      items: string[];
    };

export interface Series {
  id: string;
  slug: string;
  name: string;
  description: string;
  accent: string;
  coverImage: string;
  purposes: PurposeTag[];
  productIds: string[];
}

export interface ProductIngredient {
  name: string;
  description: string;
}

export interface Product {
  id: string;
  slug: string;
  legacySlug: string;
  legacyHref: string;
  name: string;
  type: string;
  seriesSlug: string;
  seriesName: string;
  image: string;
  volume: string;
  volumeValue: number | null;
  volumeUnit: string | null;
  audiences: ProductGroup[];
  groups: ProductGroup[];
  purposes: PurposeTag[];
  summary: string;
  subtitle: string;
  benefits: string[];
  usage: string;
  ingredients: ProductIngredient[];
  relatedIds: string[];
  searchText: string;
  formatLabel: string;
  price: null;
  priceLabel: string;
}

export interface NewsArticle {
  slug: string;
  href: string;
  title: string;
  summary: string;
  date: string;
  completed: boolean;
  kind: "seminar" | "webinar" | "promotion" | "exhibition" | "news";
  blocks: ContentBlock[];
  status: "completed" | "upcoming";
  themeClass: string | null;
}

export interface TrainingEvent {
  slug: string;
  title: string;
  summary: string;
  publicationDate: string;
  status: "archive" | "request";
  format: "seminar" | "webinar";
  blocks: ContentBlock[];
  sourceNewsSlug?: string;
}

export interface ContactSectionLink {
  href: string;
  label: string;
  description: string;
}

export interface OrderPageSection {
  title: string;
  body: string[];
}

export interface NavigationItem {
  href: string;
  label: string;
  description?: string;
  children?: NavigationItem[];
}

