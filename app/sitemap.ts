import type { MetadataRoute } from "next";
import { news, productsWithRelations, seminars, series, webinars } from "@/data/site";
import { getSiteUrl } from "@/lib/site-url";

const siteUrl = getSiteUrl();

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/about",
    "/about/professionals",
    "/salons",
    "/catalog",
    "/news",
    "/training",
    "/training/seminars",
    "/training/webinars",
    "/contacts",
    "/contacts/order",
    "/contacts/payment",
    "/contacts/shipping",
    "/contacts/returns",
    "/cart",
    "/checkout",
  ].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
  }));

  const dynamicRoutes = [
    ...series.map((item) => `/catalog/series/${item.slug}`),
    ...productsWithRelations.map((item) => `/catalog/products/${item.slug}`),
    ...news.map((item) => `/news/${item.slug}`),
    ...seminars.map((item) => `/training/events/${item.slug}`),
    ...webinars.map((item) => `/training/events/${item.slug}`),
  ].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: new Date(),
  }));

  return [...staticRoutes, ...dynamicRoutes];
}
