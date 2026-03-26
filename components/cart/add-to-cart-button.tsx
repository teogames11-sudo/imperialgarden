"use client";

import { ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/components/layout/cart-provider";

export function AddToCartButton({
  productSlug,
  className,
}: {
  productSlug: string;
  className?: string;
}) {
  const { addItem } = useCart();

  return (
    <Button className={className} onClick={() => addItem(productSlug)}>
      <ShoppingBag className="mr-2 size-4" />
      Добавить в корзину
    </Button>
  );
}

