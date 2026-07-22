"use client";

import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useCart } from "@/components/cart-provider";
import { GarmentPlate, TaperDiagram } from "@/components/garment";
import { price } from "@/lib/format";
import { isSoldOut, type Product } from "@/lib/products";

export function ProductDetail({ product }: { product: Product }) {
  const { add } = useCart();
  const [colorIndex, setColorIndex] = useState(0);
  const [size, setSize] = useState<string | null>(null);
  const [showSizeHint, setShowSizeHint] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const addedTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (addedTimer.current) clearTimeout(addedTimer.current);
    };
  }, []);

  const color = product.colors[colorIndex];
  const onSale = product.compareAt != null;
  const isTop = product.category === "tops";
  const secondary = product.fit === "Tapered" ? "/media/cuff.jpg" : "/media/waist-wide.jpg";

  function handleAdd() {
    if (!size) {
      setShowSizeHint(true);
      return;
    }
    add({
      slug: product.slug,
      name: product.name,
      color: color.name,
      size,
      price: product.price,
      image: product.texture,
    });

    setJustAdded(true);
    if (addedTimer.current) clearTimeout(addedTimer.current);
    addedTimer.current = setTimeout(() => setJustAdded(false), 1800);
  }

  return (
    <div className="shell py-8 md:py-12">
      <nav aria-label="Breadcrumb" className="t-spec mb-8 text-ink-soft">
        <Link href="/shop" className="link-draw">
          Catalogue
        </Link>
        <span className="mx-2">/</span>
        <span className="text-ink">{product.name}</span>
      </nav>

      <div className="grid gap-12 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
        {/* ------------------------------------------------------- Gallery */}
        <div>
          <div className="bg-haze">
            <GarmentPlate product={product} color={color} className="w-full" />
          </div>

          <div className="mt-4 grid grid-cols-4 gap-4">
            {product.colors.map((c, i) => (
              <button
                key={c.name}
                type="button"
                onClick={() => setColorIndex(i)}
                aria-label={`View ${product.name} in ${c.name}`}
                aria-pressed={i === colorIndex}
                className={`bg-haze transition-opacity ${
                  i === colorIndex
                    ? "ring-1 ring-ink ring-offset-2 ring-offset-paper"
                    : "opacity-70 hover:opacity-100"
                }`}
              >
                <GarmentPlate product={product} color={c} className="w-full" />
              </button>
            ))}
          </div>

          <div className="relative mt-4 aspect-2/1">
            <Image
              src={secondary}
              alt={
                product.fit === "Tapered"
                  ? "The ribbed cuff gathered at the ankle"
                  : "The waistband and front seam in daylight"
              }
              fill
              sizes="(min-width: 1024px) 55vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>

        {/* ---------------------------------------------------------- Buy */}
        <div className="lg:sticky lg:top-32 lg:self-start">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <h1 className="t-head text-5xl md:text-6xl">{product.name}</h1>
            <p className="t-num text-xl">
              {onSale && (
                <span className="mr-3 text-ink-soft line-through">
                  {price(product.compareAt!)}
                </span>
              )}
              <span className={onSale ? "text-azure-deep" : undefined}>
                {price(product.price)}
              </span>
            </p>
          </div>

          <p className="mt-2 text-lg text-ink-soft">{product.subtitle}</p>

          {/* The three numbers that decide the purchase. */}
          <dl className="mt-8 grid grid-cols-3 gap-px border border-rule bg-rule">
            <div className="bg-paper p-4">
              <dt className="t-spec text-ink-soft">Weight</dt>
              <dd className="t-num mt-2 text-lg">{product.gsm} gsm</dd>
            </div>
            <div className="bg-paper p-4">
              <dt className="t-spec text-ink-soft">Fit</dt>
              <dd className="t-num mt-2 text-lg">{product.fit}</dd>
            </div>
            <div className="bg-paper p-4">
              <dt className="t-spec text-ink-soft">
                {isTop ? "Cotton" : "Hem"}
              </dt>
              <dd className="t-num mt-2 text-lg">
                {isTop ? "100%" : `${product.measurements.hem} cm`}
              </dd>
            </div>
          </dl>

          <p className="mt-8 leading-relaxed">{product.story}</p>

          {/* ------------------------------------------------------ Colour */}
          <fieldset className="mt-10">
            <legend className="t-spec text-ink-soft">
              Colour — <span className="text-ink">{color.name}</span>
            </legend>
            <div className="mt-3 flex flex-wrap gap-3">
              {product.colors.map((c, i) => (
                <button
                  key={c.name}
                  type="button"
                  onClick={() => setColorIndex(i)}
                  aria-label={c.name}
                  aria-pressed={i === colorIndex}
                  title={c.name}
                  className={`size-8 rounded-full border transition-transform hover:scale-110 ${
                    i === colorIndex
                      ? "border-ink ring-1 ring-ink ring-offset-2 ring-offset-paper"
                      : "border-rule"
                  }`}
                  style={{ backgroundColor: c.hex }}
                />
              ))}
            </div>
          </fieldset>

          {/* -------------------------------------------------------- Size */}
          <fieldset className="mt-8">
            <legend className="t-spec text-ink-soft">
              Size {size && <span className="text-ink">— {size}</span>}
            </legend>

            <div className="mt-3 grid grid-cols-5 gap-2">
              {product.sizes.map((s) => {
                const gone = isSoldOut(product, s);
                const active = size === s;
                return (
                  <button
                    key={s}
                    type="button"
                    disabled={gone}
                    onClick={() => {
                      setSize(s);
                      setShowSizeHint(false);
                    }}
                    aria-pressed={active}
                    className={`t-spec border py-3 transition-colors ${
                      gone
                        ? "cursor-not-allowed border-rule text-rule line-through"
                        : active
                          ? "border-ink bg-ink text-paper"
                          : "border-rule hover:border-ink"
                    }`}
                  >
                    {s}
                  </button>
                );
              })}
            </div>

            {product.soldOut?.length ? (
              <p className="t-spec mt-3 text-ink-soft">
                {product.soldOut.join(", ")} back in about three weeks
              </p>
            ) : null}
          </fieldset>

          {showSizeHint && (
            <p role="alert" className="t-spec mt-5 text-azure-deep">
              Pick a size first
            </p>
          )}

          <button
            type="button"
            onClick={handleAdd}
            className="btn btn-solid relative mt-6 w-full overflow-hidden"
          >
            {/* The label swaps rather than the button changing colour, so the
                confirmation reads without the control appearing to move. */}
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={justAdded ? "added" : "add"}
                initial={{ y: "120%" }}
                animate={{ y: 0 }}
                exit={{ y: "-120%" }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                className="block"
              >
                {justAdded
                  ? `Added — ${size}, ${color.name}`
                  : `Add to cart — ${price(product.price)}`}
              </motion.span>
            </AnimatePresence>
          </button>

          <span aria-live="polite" className="sr-only">
            {justAdded
              ? `${product.name}, ${color.name}, size ${size} added to your cart`
              : ""}
          </span>

          <p className="t-spec mt-4 text-ink-soft">
            Free delivery over EGP 1,500 · exchange any size within 14 days
          </p>

          {/* ------------------------------------------------------ Specs */}
          <div className="mt-12 border-t border-rule">
            <section className="border-b border-rule py-6">
              <h2 className="t-head text-xl">Made from</h2>
              <p className="mt-3 text-sm text-ink-soft">{product.fabric}</p>
              <ul className="mt-4 space-y-2">
                {product.details.map((d) => (
                  <li key={d} className="flex gap-3 text-sm">
                    <span className="text-azure-deep">—</span>
                    <span>{d}</span>
                  </li>
                ))}
              </ul>
            </section>

            {!isTop && (
              <section className="border-b border-rule py-6">
                <h2 className="t-head text-xl">How far it tapers</h2>
                <p className="mt-3 max-w-sm text-sm text-ink-soft">
                  One leg, drawn to scale from the measurements above. Thigh at
                  the top, hem at the bottom.
                </p>
                <div className="mt-4 max-w-56">
                  <TaperDiagram product={product} />
                </div>
              </section>
            )}

            <section className="py-6">
              <h2 className="t-head text-xl">Washing it</h2>
              <p className="mt-3 text-sm text-ink-soft">{product.care}</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
