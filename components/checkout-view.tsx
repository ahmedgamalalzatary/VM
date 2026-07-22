"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart, type CartItem } from "@/components/cart-provider";
import { GarmentPlate } from "@/components/garment";
import { orderNumber, price } from "@/lib/format";
import { getProduct } from "@/lib/products";

const FREE_DELIVERY_OVER = 1500;
const DELIVERY_FLAT = 75;

const GOVERNORATES = [
  "Cairo",
  "Giza",
  "Alexandria",
  "Qalyubia",
  "Dakahlia",
  "Sharqia",
  "Gharbia",
  "Beheira",
  "Port Said",
  "Suez",
  "Ismailia",
  "Matrouh",
  "Red Sea",
  "Luxor",
  "Aswan",
];

const PAYMENTS = [
  {
    id: "cod",
    label: "Cash on delivery",
    note: "Pay the courier when the box arrives.",
  },
  {
    id: "card",
    label: "Card on delivery",
    note: "The courier carries a card machine.",
  },
  {
    id: "instapay",
    label: "InstaPay",
    note: "We send a request once the order is confirmed.",
  },
];

type Placed = { ref: string; items: CartItem[]; total: number; city: string };

export function CheckoutView() {
  const { items, subtotal, clear, ready } = useCart();
  const [payment, setPayment] = useState("cod");
  const [placed, setPlaced] = useState<Placed | null>(null);

  const delivery = subtotal >= FREE_DELIVERY_OVER ? 0 : DELIVERY_FLAT;
  const total = subtotal + delivery;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    // Snapshot the order before emptying the cart, so the receipt survives.
    setPlaced({
      ref: orderNumber(Math.floor(Math.random() * 900000) + 100000),
      items,
      total,
      city: String(data.get("governorate") ?? ""),
    });
    clear();
    window.scrollTo({ top: 0 });
  }

  if (placed) {
    return (
      <div className="shell py-16 md:py-24">
        <div className="max-w-2xl">
          <p className="t-spec text-azure-deep">Order placed</p>
          <h1 className="t-head mt-4 text-5xl md:text-7xl">
            That&rsquo;s yours.
          </h1>
          <p className="mt-6 text-lg text-ink-soft">
            We&rsquo;ve reserved {placed.items.length}{" "}
            {placed.items.length === 1 ? "line" : "lines"} and sent a
            confirmation. Delivery to {placed.city} usually runs one to three
            days.
          </p>

          <dl className="mt-10 grid grid-cols-2 gap-px border border-rule bg-rule sm:grid-cols-3">
            <div className="bg-paper p-5">
              <dt className="t-spec text-ink-soft">Reference</dt>
              <dd className="t-num mt-2 text-lg">{placed.ref}</dd>
            </div>
            <div className="bg-paper p-5">
              <dt className="t-spec text-ink-soft">Total</dt>
              <dd className="t-num mt-2 text-lg">{price(placed.total)}</dd>
            </div>
            <div className="bg-paper p-5">
              <dt className="t-spec text-ink-soft">Paying by</dt>
              <dd className="t-num mt-2 text-lg">
                {PAYMENTS.find((p) => p.id === payment)?.label}
              </dd>
            </div>
          </dl>

          <ul className="mt-10 divide-y divide-rule border-y border-rule">
            {placed.items.map((item) => {
              const product = getProduct(item.slug);
              const color = product?.colors.find((c) => c.name === item.color);
              return (
                <li key={item.key} className="flex items-center gap-4 py-4">
                  <div className="w-14 shrink-0 bg-haze">
                    {product && color && (
                      <GarmentPlate
                        product={product}
                        color={color}
                        className="w-full"
                      />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="t-head text-lg">{item.name}</p>
                    <p className="t-spec mt-1 text-ink-soft">
                      {item.color} · {item.size} · ×{item.quantity}
                    </p>
                  </div>
                  <p className="t-num text-sm">
                    {price(item.price * item.quantity)}
                  </p>
                </li>
              );
            })}
          </ul>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/shop" className="btn btn-solid">
              Keep shopping
            </Link>
            <Link href="/" className="btn btn-line">
              Back home
            </Link>
          </div>

          <p className="t-spec mt-10 text-ink-soft">
            This is a demo storefront — no order was actually placed and no
            payment was taken.
          </p>
        </div>
      </div>
    );
  }

  if (ready && items.length === 0) {
    return (
      <div className="shell flex flex-col items-start gap-6 py-24 md:py-32">
        <p className="t-spec text-ink-soft">Checkout</p>
        <h1 className="t-head text-5xl md:text-7xl">
          There&rsquo;s nothing to pay for
        </h1>
        <p className="max-w-md text-ink-soft">
          Add a pair to the cart and this page will have something to do.
        </p>
        <Link href="/shop" className="btn btn-solid">
          Browse the catalogue
        </Link>
      </div>
    );
  }

  return (
    <div className="shell py-12 md:py-16">
      <header className="border-b border-rule pb-8">
        <p className="t-spec text-ink-soft">Checkout</p>
        <h1 className="t-head mt-3 text-5xl md:text-7xl">Where is it going?</h1>
      </header>

      <div className="grid gap-12 py-10 lg:grid-cols-[1.4fr_1fr] lg:gap-16">
        <form onSubmit={handleSubmit} className="max-w-xl">
          <fieldset>
            <legend className="t-head text-2xl">Contact</legend>
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <Field name="name" label="Full name" autoComplete="name" />
              <Field
                name="phone"
                label="Mobile number"
                type="tel"
                autoComplete="tel"
                hint="The courier calls before arriving"
              />
              <div className="sm:col-span-2">
                <Field
                  name="email"
                  label="Email"
                  type="email"
                  autoComplete="email"
                />
              </div>
            </div>
          </fieldset>

          <fieldset className="mt-12">
            <legend className="t-head text-2xl">Address</legend>
            <div className="mt-5 grid gap-5 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Field
                  name="street"
                  label="Street and building"
                  autoComplete="address-line1"
                />
              </div>
              <Field
                name="apartment"
                label="Apartment or floor"
                required={false}
                autoComplete="address-line2"
              />
              <div>
                <label htmlFor="governorate" className="t-spec text-ink-soft">
                  Governorate
                </label>
                <select
                  id="governorate"
                  name="governorate"
                  required
                  defaultValue="Cairo"
                  className="mt-2 w-full border border-rule bg-paper px-4 py-3 text-sm focus:border-ink"
                >
                  {GOVERNORATES.map((g) => (
                    <option key={g}>{g}</option>
                  ))}
                </select>
              </div>
            </div>
          </fieldset>

          <fieldset className="mt-12">
            <legend className="t-head text-2xl">Payment</legend>
            <div className="mt-5 grid gap-px border border-rule bg-rule">
              {PAYMENTS.map((p) => (
                <label
                  key={p.id}
                  className={`flex cursor-pointer items-start gap-4 p-5 transition-colors ${
                    payment === p.id ? "bg-mist" : "bg-paper hover:bg-haze"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value={p.id}
                    checked={payment === p.id}
                    onChange={() => setPayment(p.id)}
                    className="mt-1 accent-azure-deep"
                  />
                  <span>
                    <span className="block font-medium">{p.label}</span>
                    <span className="mt-1 block text-sm text-ink-soft">
                      {p.note}
                    </span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <button type="submit" className="btn btn-solid mt-10 w-full">
            Place order — {price(total)}
          </button>

          <p className="t-spec mt-4 text-ink-soft">
            Demo storefront. No payment is taken and no order is sent.
          </p>
        </form>

        {/* ------------------------------------------------------- Summary */}
        <aside className="lg:sticky lg:top-32 lg:self-start">
          <h2 className="t-head text-2xl">Your order</h2>

          <ul className="mt-6 divide-y divide-rule border-y border-rule">
            {items.map((item) => {
              const product = getProduct(item.slug);
              const color = product?.colors.find((c) => c.name === item.color);
              return (
                <li key={item.key} className="flex items-center gap-4 py-4">
                  <div className="w-14 shrink-0 bg-haze">
                    {product && color && (
                      <GarmentPlate
                        product={product}
                        color={color}
                        className="w-full"
                      />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="t-head text-lg">{item.name}</p>
                    <p className="t-spec mt-1 text-ink-soft">
                      {item.color} · {item.size} · ×{item.quantity}
                    </p>
                  </div>
                  <p className="t-num text-sm">
                    {price(item.price * item.quantity)}
                  </p>
                </li>
              );
            })}
          </ul>

          <dl className="mt-5 space-y-3">
            <div className="flex justify-between">
              <dt className="text-sm text-ink-soft">Subtotal</dt>
              <dd className="t-num text-sm">{price(subtotal)}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-sm text-ink-soft">Delivery</dt>
              <dd className="t-num text-sm">
                {delivery === 0 ? "Free" : price(delivery)}
              </dd>
            </div>
          </dl>

          <div className="mt-5 flex items-baseline justify-between border-t border-rule pt-5">
            <span className="t-head text-xl">Total</span>
            <span className="t-num text-2xl">{price(total)}</span>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Field({
  name,
  label,
  type = "text",
  required = true,
  autoComplete,
  hint,
}: {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  hint?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="t-spec text-ink-soft">
        {label}
        {!required && <span className="ml-2 normal-case">(optional)</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className="mt-2 w-full border border-rule bg-paper px-4 py-3 text-sm focus:border-ink"
      />
      {hint && <p className="mt-2 text-xs text-ink-soft">{hint}</p>}
    </div>
  );
}
