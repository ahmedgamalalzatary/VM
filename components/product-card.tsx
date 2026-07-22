"use client";

import Link from "next/link";
import { useState } from "react";
import { ClothSwatch, ProductShot } from "@/components/product-shot";
import { price } from "@/lib/format";
import type { Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  const [active, setActive] = useState(0);
  const color = product.colors[active];
  const onSale = product.compareAt != null;

  return (
    <article className="group">
      <Link
        href={`/product/${product.slug}`}
        className="relative block overflow-hidden bg-haze"
        aria-label={`${product.name} — ${product.subtitle}, ${price(product.price)}`}
      >
        <ProductShot product={product} sizes="(min-width: 1024px) 22vw, 45vw" />

        {/* The cloth it's knit from, wiped in on the brand's diagonal. Colour
            arrives with the knit rather than with the photograph. */}
        <div
          className="swap-wipe group-hover:swap-open group-focus-within:swap-open absolute inset-0"
          aria-hidden
        >
          <ClothSwatch
            product={product}
            color={color}
            sizes="(min-width: 1024px) 22vw, 45vw"
            className="h-full"
          />
        </div>

        {product.badge && (
          <span
            className={`t-spec absolute left-0 top-0 px-3 py-2 ${
              onSale ? "bg-azure text-ink" : "bg-ink text-paper"
            }`}
          >
            {product.badge}
          </span>
        )}
      </Link>

      <div className="pt-4">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="t-head text-xl">
            <Link href={`/product/${product.slug}`} className="link-draw">
              {product.name}
            </Link>
          </h3>
          <p className="t-num shrink-0 text-sm">
            {onSale && (
              <span className="mr-2 text-ink-soft line-through">
                {price(product.compareAt!)}
              </span>
            )}
            <span className={onSale ? "text-azure-deep" : undefined}>
              {price(product.price)}
            </span>
          </p>
        </div>

        <p className="mt-1 text-sm text-ink-soft">{product.subtitle}</p>

        <p className="t-spec mt-3 text-ink-soft">
          {product.gsm} GSM · {product.fit}
        </p>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          {product.colors.map((c, i) => (
            <button
              key={c.name}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show the ${c.name} cloth`}
              aria-pressed={i === active}
              title={c.name}
              className={`size-4 rounded-full border transition-transform hover:scale-110 ${
                i === active
                  ? "border-ink ring-1 ring-ink ring-offset-2 ring-offset-paper"
                  : "border-rule"
              }`}
              style={{ backgroundColor: c.hex }}
            />
          ))}
          <span className="t-spec ml-1 text-ink-soft">{color.name}</span>
        </div>
      </div>
    </article>
  );
}
