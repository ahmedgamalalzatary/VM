"use client";

import { MotionConfig } from "motion/react";
import { createContext, useCallback, useContext, useMemo, useState, useSyncExternalStore } from "react";

export type CartItem = {
  /** productSlug + color + size — one line per unique combination. */
  key: string;
  slug: string;
  name: string;
  color: string;
  size: string;
  price: number;
  image: string;
  quantity: number;
};

const STORAGE_KEY = "vm-cart";
const MAX_PER_LINE = 10;

/* ---------------------------------------------------------------------------
   localStorage is an external store, so it's read through useSyncExternalStore
   rather than an effect. That keeps the server render (always empty) and the
   client render (whatever was saved) from disagreeing, with no flash of state
   in between.
   --------------------------------------------------------------------------- */

const EMPTY: CartItem[] = [];

let snapshot: CartItem[] = EMPTY;
let loaded = false;
const listeners = new Set<() => void>();

function emit() {
  for (const l of listeners) l();
}

function persist() {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot));
  } catch {
    // Private browsing or a full quota — the cart still works for this visit.
  }
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot() {
  if (!loaded) {
    loaded = true;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) snapshot = JSON.parse(raw) as CartItem[];
    } catch {
      // A corrupt store just means an empty cart.
    }
  }
  return snapshot;
}

function getServerSnapshot() {
  return EMPTY;
}

function write(next: CartItem[]) {
  snapshot = next;
  persist();
  emit();
}

function lineKey(slug: string, color: string, size: string) {
  return `${slug}::${color}::${size}`;
}

/* -------------------------------------------------------------------------- */

type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  /** False during the server render and the first client paint. */
  ready: boolean;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  add: (item: Omit<CartItem, "key" | "quantity">, quantity?: number) => void;
  setQuantity: (key: string, quantity: number) => void;
  remove: (key: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

const alwaysUnsubscribed = () => () => {};

export function CartProvider({ children }: { children: React.ReactNode }) {
  const items = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const ready = useSyncExternalStore(
    alwaysUnsubscribed,
    () => true,
    () => false,
  );
  const [isOpen, setIsOpen] = useState(false);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const add = useCallback(
    (item: Omit<CartItem, "key" | "quantity">, quantity = 1) => {
      const key = lineKey(item.slug, item.color, item.size);
      const current = getSnapshot();
      const existing = current.find((i) => i.key === key);

      write(
        existing
          ? current.map((i) =>
              i.key === key
                ? { ...i, quantity: Math.min(MAX_PER_LINE, i.quantity + quantity) }
                : i,
            )
          : [...current, { ...item, key, quantity }],
      );
      setIsOpen(true);
    },
    [],
  );

  const setQuantity = useCallback((key: string, quantity: number) => {
    const current = getSnapshot();
    write(
      quantity < 1
        ? current.filter((i) => i.key !== key)
        : current.map((i) =>
            i.key === key
              ? { ...i, quantity: Math.min(MAX_PER_LINE, quantity) }
              : i,
          ),
    );
  }, []);

  const remove = useCallback((key: string) => {
    write(getSnapshot().filter((i) => i.key !== key));
  }, []);

  const clear = useCallback(() => write([]), []);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      count: items.reduce((n, i) => n + i.quantity, 0),
      subtotal: items.reduce((n, i) => n + i.price * i.quantity, 0),
      ready,
      isOpen,
      openCart,
      closeCart,
      add,
      setQuantity,
      remove,
      clear,
    }),
    [items, ready, isOpen, openCart, closeCart, add, setQuantity, remove, clear],
  );

  return (
    <CartContext.Provider value={value}>
      {/* reducedMotion="user" makes every motion component below honour the OS
          setting without each one checking for itself. */}
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}
