import type { Metadata } from "next";
import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { CATEGORIES, PRODUCTS, WEIGHTS, type Product } from "@/lib/products";

export const metadata: Metadata = {
  title: "The catalogue",
  description:
    "Every VM style, filterable by fabric weight and by fit. Twelve pieces in 280, 340 and 400 GSM Egyptian cotton.",
};

type Search = { weight?: string; fit?: string; sort?: string };

const SORTS = [
  { id: "featured", label: "Featured" },
  { id: "light", label: "Lightest first" },
  { id: "heavy", label: "Heaviest first" },
  { id: "low", label: "Price: low to high" },
  { id: "high", label: "Price: high to low" },
];

/** Builds a href that changes one filter and keeps the rest. */
function hrefWith(current: Search, patch: Search) {
  const next = { ...current, ...patch };
  const params = new URLSearchParams();
  for (const [k, v] of Object.entries(next)) {
    if (v && v !== "all") params.set(k, v);
  }
  const qs = params.toString();
  return qs ? `/shop?${qs}` : "/shop";
}

function sortProducts(list: Product[], sort?: string) {
  const out = [...list];
  switch (sort) {
    case "light":
      return out.sort((a, b) => a.gsm - b.gsm);
    case "heavy":
      return out.sort((a, b) => b.gsm - a.gsm);
    case "low":
      return out.sort((a, b) => a.price - b.price);
    case "high":
      return out.sort((a, b) => b.price - a.price);
    default:
      return out;
  }
}

function Chip({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-current={active ? "true" : undefined}
      className={`t-spec border px-4 py-2.5 transition-colors ${
        active
          ? "border-ink bg-ink text-paper"
          : "border-rule text-ink-soft hover:border-ink hover:text-ink"
      }`}
    >
      {children}
    </Link>
  );
}

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<Search>;
}) {
  const sp = await searchParams;
  const weight = sp.weight ?? "all";
  const fit = sp.fit ?? "all";
  const sort = sp.sort ?? "featured";

  const filtered = PRODUCTS.filter((p) => {
    if (weight !== "all" && String(p.gsm) !== weight) return false;
    if (fit !== "all" && p.category !== fit) return false;
    return true;
  });
  const products = sortProducts(filtered, sort);

  const activeWeight = WEIGHTS.find((w) => String(w.gsm) === weight);

  return (
    <div className="shell py-12 md:py-16">
      <header className="border-b border-rule pb-8">
        <p className="t-spec text-ink-soft">The catalogue</p>
        <h1 className="t-head mt-3 text-5xl md:text-7xl">
          {activeWeight ? `${activeWeight.gsm} GSM` : "Everything we make"}
        </h1>
        <p className="mt-5 max-w-lg text-ink-soft">
          {activeWeight
            ? activeWeight.blurb
            : "Twelve pieces, three weights, one cotton. Filter by the number first — it narrows things faster than fit does."}
        </p>
      </header>

      {/* ------------------------------------------------------------ Filters */}
      <div className="grid gap-8 border-b border-rule py-8 lg:grid-cols-[auto_auto_1fr] lg:gap-12">
        <section aria-labelledby="filter-weight">
          <h2 id="filter-weight" className="t-spec mb-3 text-ink-soft">
            Weight
          </h2>
          <div className="flex flex-wrap gap-2">
            <Chip href={hrefWith(sp, { weight: "all" })} active={weight === "all"}>
              All
            </Chip>
            {WEIGHTS.map((w) => (
              <Chip
                key={w.gsm}
                href={hrefWith(sp, { weight: String(w.gsm) })}
                active={weight === String(w.gsm)}
              >
                {w.gsm}
              </Chip>
            ))}
          </div>
        </section>

        <section aria-labelledby="filter-fit">
          <h2 id="filter-fit" className="t-spec mb-3 text-ink-soft">
            Type
          </h2>
          <div className="flex flex-wrap gap-2">
            <Chip href={hrefWith(sp, { fit: "all" })} active={fit === "all"}>
              All
            </Chip>
            {CATEGORIES.map((c) => (
              <Chip
                key={c.id}
                href={hrefWith(sp, { fit: c.id })}
                active={fit === c.id}
              >
                {c.label}
              </Chip>
            ))}
          </div>
        </section>

        <section aria-labelledby="filter-sort" className="lg:justify-self-end">
          <h2 id="filter-sort" className="t-spec mb-3 text-ink-soft">
            Sort
          </h2>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {SORTS.map((s) => (
              <Link
                key={s.id}
                href={hrefWith(sp, { sort: s.id })}
                aria-current={sort === s.id ? "true" : undefined}
                className={`t-spec link-draw ${
                  sort === s.id ? "text-ink" : "text-ink-soft"
                }`}
              >
                {s.label}
              </Link>
            ))}
          </div>
        </section>
      </div>

      {/* --------------------------------------------------------------- Grid */}
      <p className="t-spec py-6 text-ink-soft">
        {products.length} {products.length === 1 ? "style" : "styles"}
      </p>

      {products.length === 0 ? (
        <div className="flex flex-col items-start gap-5 border border-rule p-10">
          <h2 className="t-head text-3xl">
            We don&rsquo;t knit that combination yet
          </h2>
          <p className="max-w-md text-ink-soft">
            Nothing in the catalogue matches both filters. Try one weight up, or
            clear the type.
          </p>
          <Link href="/shop" className="btn btn-solid">
            Clear filters
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
