"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/components/layout/cart-provider";
import { Filigree } from "@/components/ui/filigree";
import { brand, navigation } from "@/data/site";
import { cn } from "@/lib/utils";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isHydrated, isOpen, itemsCount, openCart } = useCart();
  const safeItemsCount = isHydrated ? itemsCount : 0;

  return (
    <header className="sticky top-0 z-[80] px-3 pt-3 sm:px-5 sm:pt-4">
      <div className="mx-auto max-w-[1720px]">
        <div className="header-ribbon leaf-panel relative text-white">
          <div className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[radial-gradient(circle_at_left,rgba(255,255,255,0.12),transparent_24%),linear-gradient(90deg,rgba(255,255,255,0.04),transparent_35%,transparent_70%,rgba(255,255,255,0.04))]" />
          <div className="pointer-events-none absolute inset-x-6 bottom-0 h-px bg-[linear-gradient(90deg,transparent,rgba(210,176,106,0.65),transparent)]" />
          <div className="pointer-events-none absolute left-[18%] top-1/2 hidden -translate-y-1/2 sm:block">
            <Filigree className="h-9 w-36 opacity-70" />
          </div>

          <div className="relative z-10 flex items-center justify-between gap-4 px-4 py-3 sm:px-6 sm:py-3.5">
            <Link href="/" className="flex min-w-0 items-center gap-4">
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border border-white/18 bg-[rgba(255,250,244,0.12)] shadow-[0_12px_30px_rgba(8,20,16,0.26)] backdrop-blur-xl sm:h-[3.25rem] sm:w-[3.25rem]">
                <Image
                  src={brand.logo}
                  alt={brand.name}
                  fill
                  className="object-contain p-2.5"
                  sizes="56px"
                />
              </div>
              <div className="min-w-0">
                <p className="truncate font-display text-[1.95rem] leading-none tracking-[0.03em] text-white sm:text-[2.25rem]">
                  Imperial Garden
                </p>
                <div className="mt-1 hidden items-center gap-3 sm:flex">
                  <p className="truncate text-[11px] uppercase tracking-[0.3em] text-[rgba(226,204,155,0.92)]">
                    Professional Thermal SPA
                  </p>
                  <Filigree className="hidden opacity-75 xl:block" />
                </div>
              </div>
            </Link>

            <nav className="hidden items-center lg:flex">
              <div className="nav-cloud flex items-center gap-1 p-1">
                {navigation.map((item) => (
                  <div key={item.href} className="group relative">
                    <Link
                      href={item.href}
                      className="inline-flex min-h-11 items-center rounded-full px-4 text-[12px] font-semibold uppercase tracking-[0.16em] text-white/[0.9] transition hover:bg-white/10 hover:text-white"
                    >
                      {item.label}
                    </Link>
                    {item.children?.length ? (
                      <div className="pointer-events-none absolute left-1/2 top-full z-[95] w-[22rem] -translate-x-1/2 pt-4 opacity-0 transition duration-200 group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:pointer-events-auto group-focus-within:opacity-100">
                        <div className="overflow-hidden rounded-[28px] border border-[rgba(17,45,34,0.08)] bg-[rgba(255,250,244,0.97)] p-3 text-[var(--color-forest-strong)] shadow-[0_28px_80px_rgba(11,29,22,0.2)] backdrop-blur-xl">
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className="block rounded-[22px] px-4 py-3 transition hover:bg-[rgba(227,235,228,0.72)]"
                            >
                              <p className="text-sm font-semibold">{child.label}</p>
                              {child.description ? (
                                <p className="mt-1 text-sm leading-6 text-[var(--color-forest-muted)]">
                                  {child.description}
                                </p>
                              ) : null}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
            </nav>

            <div className="flex items-center gap-2 lg:hidden">
              <button
                type="button"
                className="organic-button inline-flex min-h-11 items-center justify-center border border-white/14 bg-[rgba(255,255,255,0.08)] px-4 text-white shadow-[0_10px_30px_rgba(8,20,16,0.22)] transition hover:bg-white/14"
                onClick={() => setIsMenuOpen((current) => !current)}
              >
                {isMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
              </button>
            </div>
          </div>

          <AnimatePresence>
            {isMenuOpen ? (
              <motion.div
                className="relative z-10 border-t border-white/10 px-4 py-4 lg:hidden"
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
              >
                <div className="space-y-2">
                  {navigation.map((item) => (
                    <div
                      key={item.href}
                      className="rounded-[24px] border border-white/[0.08] bg-white/[0.06] p-3 backdrop-blur-sm"
                    >
                      <Link
                        href={item.href}
                        className="block text-base font-semibold text-white"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                      {item.children?.length ? (
                        <div className="mt-3 grid gap-2">
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className={cn(
                                "rounded-[18px] px-3 py-3 text-sm transition hover:bg-white/10",
                                "text-white/[0.8]",
                              )}
                              onClick={() => setIsMenuOpen(false)}
                            >
                              <span className="block font-semibold text-white">
                                {child.label}
                              </span>
                              {child.description ? (
                                <span className="mt-1 block leading-6">
                                  {child.description}
                                </span>
                              ) : null}
                            </Link>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  ))}
                </div>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
      </div>

      <button
        type="button"
        onClick={openCart}
        className={cn(
          "floating-cart organic-button inline-flex min-h-11 items-center gap-2 border border-[rgba(210,176,106,0.24)] bg-[linear-gradient(135deg,rgba(15,39,30,0.96),rgba(26,68,52,0.92))] px-3 text-sm font-semibold text-white shadow-[0_26px_70px_rgba(10,26,20,0.22)] backdrop-blur-xl transition hover:-translate-y-0.5 hover:shadow-[0_30px_76px_rgba(10,26,20,0.28)] sm:min-h-14 sm:gap-3 sm:px-5",
          isOpen && "pointer-events-none opacity-0",
        )}
      >
        <ShoppingBag className="size-4" />
        <span className="hidden sm:inline">{"\u041a\u043e\u0440\u0437\u0438\u043d\u0430"}</span>
        <span className="inline-flex min-w-7 items-center justify-center rounded-full bg-[rgba(255,255,255,0.14)] px-2 py-1 text-xs">
          {safeItemsCount}
        </span>
      </button>
    </header>
  );
}
