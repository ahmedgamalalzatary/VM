"use client";

import Link from "next/link";
import { useCart } from "@/components/cart-provider";
import { GarmentPlate } from "@/components/garment";
import { price } from "@/lib/format";
import { getProduct } from "@/lib/products";

const FREE_DELIVERY_OVER = 1500;
const DELIVERY_FLAT = 75;

export function CartView() {
  const { items, subtotal, setQuantity, remove, ready } = useCart();

  if (!ready) {
    // Nothing to show until localStorage has been read; avoids a flash of empty.
    return <div className="shell py-24" aria-busy="true" />;
  }

  if (items.length === 0) {
    return (
      <div className="shell flex flex-col items-start gap-6 py-24 md:py-32">
        <p className="t-spec text-ink-soft">Cart</p>
        <h1 className="t-head text-5xl md:text-7xl">Nothing in here yet</h1>
        <p className="max-w-md text-ink-soft">
          Pick a weight and we&rsquo;ll take it from there. Most people start at
          340 and go heavier the second time.
        </p>
        <Link href="/shop" className="btn btn-solid">
          Browse the catalogue
        </Link>
      </div>
    );
  }

  const delivery = subtotal >= FREE_DELIVERY_OVER ? 0 : DELIVERY_FLAT;

  return (
    <div className="shell py-12 md:py-16">
      <header className="border-b border-rule pb-8">
        <p className="t-spec text-ink-soft">Cart</p>
        <h1 className="t-head mt-3 text-5xl md:text-7xl">
          {items.length} {items.length === 1 ? "line" : "lines"}
        </h1>
      </header>

      <div className="grid gap-12 py-10 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
        <ul className="divide-y divide-rule border-b border-rule">
          {items.map((item) => {
            const product = getProduct(item.slug);
            const color = product?.colors.find((c) => c.name === item.color);
            return (
              <li key={item.key} className="flex gap-5 py-6 first:pt-0">
                <Link
                  href={`/product/${item.slug}`}
                  className="w-24 shrink-0 bg-haze sm:w-32"
                >
                  {product && color && (
                    <GarmentPlate
                      product={product}
                      color={color}
                      className="w-full"
                    />
                  )}
                </Link>

                <div className="flex min-w-0 flex-1 flex-col">
                  <div className="flex flex-wrap justify-between gap-x-6 gap-y-1">
                    <h2 className="t-head text-2xl">
                      <Link href={`/product/${item.slug}`} className="link-draw">
                        {item.name}
                      </Link>
                    </h2>
                    <p className="t-num">{price(item.price * item.quantity)}</p>
                  </div>

                  <p className="t-spec mt-2 text-ink-soft">
                    {item.color} · {item.size}
                    {product ? ` · ${product.gsm} gsm` : ""}
                  </p>

                  <div className="mt-auto flex items-center justify-between pt-5">
                    <div className="flex items-center border border-rule">
                      <button
                        type="button"
                        onClick={() => setQuantity(item.key, item.quantity - 1)}
                        className="px-3.5 py-2 text-lg leading-none hover:bg-haze"
                        aria-label={`Reduce ${item.name} quantity`}
                      >
                        −
                      </button>
                      <span className="t-num w-9 text-center text-sm">
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => setQuantity(item.key, item.quantity + 1)}
                        className="px-3.5 py-2 text-lg leading-none hover:bg-haze"
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
              </li>
            );
          })}
        </ul>

        <aside className="lg:sticky lg:top-32 lg:self-start">
          <h2 className="t-head text-2xl">Summary</h2>

          <dl className="mt-6 space-y-3 border-b border-rule pb-5">
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

          <div className="flex items-baseline justify-between py-5">
            <span className="t-head text-xl">Total</span>
            <span className="t-num text-2xl">{price(subtotal + delivery)}</span>
          </div>

          {delivery > 0 && (
            <p className="t-spec mb-5 text-ink-soft">
              {price(FREE_DELIVERY_OVER - subtotal)} more and delivery is free
            </p>
          )}

          <Link href="/checkout" className="btn btn-solid w-full">
            Checkout
          </Link>
          <Link
            href="/shop"
            className="t-spec link-draw mt-5 block text-center text-ink-soft"
          >
            Keep shopping
          </Link>
        </aside>
      </div>
    </div>
  );
}
