import type { ReactNode } from "react";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { AmbientBackdrop } from "@/components/layout/ambient-backdrop";
import { CartProvider } from "@/components/layout/cart-provider";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

export function SiteChrome({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      <div className="relative min-h-screen overflow-hidden">
        <AmbientBackdrop />
        <div className="pointer-events-none fixed inset-0 z-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.28),transparent_24%,rgba(17,45,34,0.05)_74%,rgba(255,255,255,0.09))]" />
        <div className="pointer-events-none fixed inset-x-0 top-36 z-0 h-[44rem] bg-[radial-gradient(circle_at_center,rgba(29,79,61,0.14),transparent_60%)]" />
        <div className="relative z-10 flex min-h-screen flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <CartDrawer />
        </div>
      </div>
    </CartProvider>
  );
}
