"use client";

import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { useCart } from "@/components/cart-provider";
import { GarmentPlate } from "@/components/garment";
import { price } from "@/lib/format";
import { getProduct } from "@/lib/products";

const FREE_DELIVERY_OVER = 1500;

// Quick and weighted rather than bouncy — it should feel like a drawer, not a toy.
const PANEL_IN = { type: "spring", stiffness: 420, damping: 42, mass: 0.9 } as const;
const PANEL_OUT = { duration: 0.22, ease: [0.4, 0, 1, 1] } as const;

export function CartDrawer() {
  const { items, subtotal, isOpen, closeCart, setQuantity, remove } = useCart();
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeCart();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, closeCart]);

  const remaining = FREE_DELIVERY_OVER - subtotal;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <motion.button
            type="button"
            onClick={closeCart}
            aria-label="Close cart"
            className="absolute inset-0 bg-ink/40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          />

          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Cart"
            tabIndex={-1}
            className="relative flex h-full w-full max-w-md flex-col bg-paper shadow-2xl outline-none"
            initial={{ x: "100%" }}
            animate={{ x: 0, transition: PANEL_IN }}
            exit={{ x: "100%", transition: PANEL_OUT }}
          >
            <div className="flex items-center justify-between border-b border-rule px-6 py-5">
              <h2 className="t-head text-2xl">Your cart</h2>
              <button type="button" onClick={closeCart} className="t-spec link-draw">
                Close
              </button>
            </div>

            {items.length === 0 ? (
              <div className="flex flex-1 flex-col items-start justify-center gap-5 px-6">
                <p className="t-head text-3xl">Nothing in here yet.</p>
                <p className="text-ink-soft">
                  Start with the weight you want, then pick a fit.
                </p>
                <Link href="/shop" onClick={closeCart} className="btn btn-solid">
                  Browse the catalogue
                </Link>
              </div>
            ) : (
              <>
                <ul className="flex-1 divide-y divide-rule overflow-y-auto px-6">
                  <AnimatePresence initial={false}>
                    {items.map((item) => {
                      const product = getProduct(item.slug);
                      const color = product?.colors.find(
                        (c) => c.name === item.color,
                      );
                      return (
                        <motion.li
                          key={item.key}
                          layout
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <div className="flex gap-4 py-5">
                            <Link
                              href={`/product/${item.slug}`}
                              onClick={closeCart}
                              className="w-20 shrink-0 bg-haze"
                            >
                              {product && color && (
                                <GarmentPlate
                                  product={product}
                                  color={color}
                                  className="w-full"
                                />
                              )}
                            </Link>

                            <div className="min-w-0 flex-1">
                              <div className="flex justify-between gap-3">
                                <h3 className="t-head text-lg">{item.name}</h3>
                                <p className="t-num text-sm">
                                  {price(item.price * item.quantity)}
                                </p>
                              </div>
                              <p className="t-spec mt-1 text-ink-soft">
                                {item.color} · {item.size}
                              </p>

                              <div className="mt-3 flex items-center justify-between">
                                <div className="flex items-center border border-rule">
                                  <button
                                    type="button"
                                    onClick={() =>
                                      setQuantity(item.key, item.quantity - 1)
                                    }
                                    className="px-3 py-1.5 text-lg leading-none hover:bg-haze"
                                    aria-label={`Reduce ${item.name} quantity`}
                                  >
                                    −
                                  </button>
                                  <span className="t-num w-8 text-center text-sm">
                                    {item.quantity}
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() =>
                                      setQuantity(item.key, item.quantity + 1)
                                    }
                                    className="px-3 py-1.5 text-lg leading-none hover:bg-haze"
                                    aria-label={`Increase ${item.name} quantity`}
                                  >
                                    +
                                  </button>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => remove(item.key)}
                                  className="t-spec link-draw text-ink-soft"
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          </div>
                        </motion.li>
                      );
                    })}
                  </AnimatePresence>
                </ul>

                <div className="border-t border-rule px-6 py-5">
                  {remaining > 0 ? (
                    <p className="t-spec mb-4 text-ink-soft">
                      {price(remaining)} more for free delivery
                    </p>
                  ) : (
                    <p className="t-spec mb-4 text-azure-deep">Delivery is on us</p>
                  )}

                  <div className="mb-5 flex items-baseline justify-between">
                    <span className="t-spec">Subtotal</span>
                    <span className="t-num text-lg">{price(subtotal)}</span>
                  </div>

                  <Link
                    href="/checkout"
                    onClick={closeCart}
                    className="btn btn-solid w-full"
                  >
                    Checkout
                  </Link>
                  <Link
                    href="/cart"
                    onClick={closeCart}
                    className="t-spec link-draw mt-4 block text-center text-ink-soft"
                  >
                    View full cart
                  </Link>
                </div>
              </>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
