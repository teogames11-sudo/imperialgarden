import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import { SiteChrome } from "@/components/layout/site-chrome";
import { seoDefaults } from "@/data/site";
import { getSiteUrl } from "@/lib/site-url";
import "./globals.css";

const display = Cormorant_Garamond({
  variable: "--font-display",
  subsets: ["latin", "cyrillic"],
  weight: ["500", "600", "700"],
});

const sans = Manrope({
  variable: "--font-sans",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: seoDefaults.title,
  description: seoDefaults.description,
  openGraph: {
    title: seoDefaults.title,
    description: seoDefaults.description,
    images: [
      {
        url: seoDefaults.image,
        width: 1200,
        height: 630,
        alt: "Imperial Garden",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: seoDefaults.title,
    description: seoDefaults.description,
    images: [seoDefaults.image],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${display.variable} ${sans.variable}`}>
      <body className="min-h-screen bg-[var(--color-ivory)] font-sans text-[var(--color-forest-strong)] antialiased">
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}
