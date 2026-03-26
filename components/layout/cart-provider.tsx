"use client";

import {
  createContext,
  startTransition,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { products } from "@/data/site";

type CartItemState = {
  slug: string;
  quantity: number;
};

type CartContextValue = {
  items: CartItemState[];
  isHydrated: boolean;
  isOpen: boolean;
  itemsCount: number;
  cartItems: Array<(typeof products)[number] & { quantity: number }>;
  addItem: (slug: string) => void;
  updateQuantity: (slug: string, quantity: number) => void;
  removeItem: (slug: string) => void;
  clearCart: () => void;
  openCart: () => void;
  closeCart: () => void;
};

const storageKey = "imperial-garden-cart";
const productMap = new Map(products.map((product) => [product.slug, product]));

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItemState[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const raw = window.localStorage.getItem(storageKey);

    if (!raw) {
      setIsHydrated(true);
      return;
    }

    try {
      const parsed = JSON.parse(raw) as CartItemState[];
      setItems(parsed.filter((item) => productMap.has(item.slug) && item.quantity > 0));
    } catch {
      setItems([]);
    } finally {
      setIsHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !isHydrated) {
      return;
    }

    window.localStorage.setItem(storageKey, JSON.stringify(items));
  }, [isHydrated, items]);

  const cartItems = items
    .map((item) => {
      const product = productMap.get(item.slug);

      if (!product) {
        return null;
      }

      return {
        ...product,
        quantity: item.quantity,
      };
    })
    .filter((value): value is (typeof products)[number] & { quantity: number } => Boolean(value));

  const itemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        isHydrated,
        isOpen,
        itemsCount,
        cartItems,
        addItem: (slug) => {
          startTransition(() => {
            setItems((current) => {
              const existing = current.find((item) => item.slug === slug);

              if (existing) {
                return current.map((item) =>
                  item.slug === slug ? { ...item, quantity: item.quantity + 1 } : item,
                );
              }

              return [...current, { slug, quantity: 1 }];
            });
            setIsOpen(true);
          });
        },
        updateQuantity: (slug, quantity) => {
          setItems((current) =>
            current
              .map((item) => (item.slug === slug ? { ...item, quantity } : item))
              .filter((item) => item.quantity > 0),
          );
        },
        removeItem: (slug) => {
          setItems((current) => current.filter((item) => item.slug !== slug));
        },
        clearCart: () => {
          setItems([]);
        },
        openCart: () => setIsOpen(true),
        closeCart: () => setIsOpen(false),
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }

  return context;
}
