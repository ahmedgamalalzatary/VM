import type { Metadata } from "next";
import { CheckoutView } from "@/components/checkout-view";

export const metadata: Metadata = {
  title: "Checkout",
  description: "Delivery details and payment for your VM order.",
};

export default function CheckoutPage() {
  return <CheckoutView />;
}
