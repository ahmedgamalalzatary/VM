import type { Metadata } from "next";
import { CartView } from "@/components/cart-view";

export const metadata: Metadata = {
  title: "Cart",
  description: "Review what you've picked before checking out.",
};

export default function CartPage() {
  return <CartView />;
}
