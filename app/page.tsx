import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "@/components/product-card";
import { Reveal } from "@/components/reveal";
import { PRODUCTS, WEIGHTS } from "@/lib/products";

export default function Home() {
  const featured = PRODUCTS.slice(0, 4);
  const rest = PRODUCTS.filter((p) => p.category !== "tops").slice(4, 8);

  return (
    <>
      {/* ---------------------------------------------------------------- Hero */}
      <section className="relative overflow-hidden bg-azure text-ink">
        <div className="grid lg:grid-cols-2">
          <div className="seam-b lg:seam-r relative aspect-4/3 sm:aspect-16/10 lg:aspect-auto lg:min-h-[88vh]">
            <Image
              src="/media/waist-tall.jpg"
              alt="A hand resting in the pocket of a pair of heavyweight cotton sweatpants"
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>

          <div className="flex flex-col justify-center gap-9 px-5 py-16 md:px-12 lg:py-24">
            <p className="t-spec rise">Giza cotton · knit and sewn in Cairo</p>

            <h1
              className="t-display rise text-[clamp(3.25rem,8.5vw,7.5rem)]"
              style={{ animationDelay: "90ms" }}
            >
              Weight is
              <br />
              the whole
              <br />
              point
            </h1>

            <p
              className="rise max-w-md text-lg leading-relaxed"
              style={{ animationDelay: "180ms" }}
            >
              A sweatpant lives or dies on how heavy its cloth is. We knit three
              weights, print the number on every pair, and let you shop by it.
            </p>

            <div
              className="rise flex flex-wrap gap-3"
              style={{ animationDelay: "260ms" }}
            >
              <Link href="/shop" className="btn btn-solid">
                Shop the catalogue
              </Link>
              <Link href="#weights" className="btn btn-line">
                Compare weights
              </Link>
            </div>

            <dl
              className="rise mt-2 flex flex-wrap gap-x-10 gap-y-3 border-t border-ink/25 pt-6"
              style={{ animationDelay: "340ms" }}
            >
              {WEIGHTS.map((w) => (
                <div key={w.gsm}>
                  <dt className="t-spec text-ink/70">{w.label}</dt>
                  <dd className="t-num text-2xl">{w.gsm} gsm</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------------- Weights */}
      <section id="weights" className="shell scroll-mt-32 py-20 md:py-28">
        <Reveal>
          <header className="flex flex-wrap items-end justify-between gap-6 border-b border-rule pb-6">
            <h2 className="t-head text-4xl md:text-5xl">Start with the weight</h2>
            <p className="max-w-sm text-sm text-ink-soft">
              Grams per square metre decides whether a pair wears like a t-shirt
              or like a blanket. Pick the number first — the fit is the easy part.
            </p>
          </header>
        </Reveal>

        <ul className="mt-px grid gap-px bg-rule md:grid-cols-3">
          {WEIGHTS.map((w) => (
            <li key={w.gsm} className="bg-paper">
              <Link
                href={`/shop?weight=${w.gsm}`}
                className="group flex h-full flex-col justify-between gap-12 p-8 transition-colors duration-300 hover:bg-azure"
              >
                <div className="flex items-baseline gap-3">
                  <span className="t-display text-6xl md:text-7xl">{w.gsm}</span>
                  <span className="t-spec text-ink-soft group-hover:text-ink">
                    gsm
                  </span>
                </div>
                <div>
                  <h3 className="t-head text-2xl">{w.label}</h3>
                  <p className="mt-2 text-sm text-ink-soft group-hover:text-ink">
                    {w.blurb}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* ------------------------------------------------------------ Catalogue */}
      <section className="shell pb-20 md:pb-28">
        <Reveal>
          <header className="flex flex-wrap items-end justify-between gap-6 border-b border-rule pb-6">
            <h2 className="t-head text-4xl md:text-5xl">New this season</h2>
            <Link href="/shop" className="t-spec link-draw">
              All 12 styles
            </Link>
          </header>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
            {featured.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </Reveal>
      </section>

      {/* ---------------------------------------------------------- Cuff detail */}
      <section className="bg-haze">
        <div className="shell grid items-center gap-12 py-20 md:py-28 lg:grid-cols-2">
          <Reveal className="relative aspect-2/1 lg:aspect-4/3">
            <Image
              src="/media/cuff.jpg"
              alt="Close view of a ribbed knit cuff gathered at the ankle"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </Reveal>

          <Reveal delay={0.1}>
            <p className="t-spec text-ink-soft">The cuff</p>
            <h2 className="t-head mt-4 text-4xl md:text-5xl">
              Knit on the same
              <br />
              machine as the body
            </h2>
            <p className="mt-6 max-w-md text-ink-soft">
              Most sweatpants get a cuff bought by the metre and sewn on. Ours is
              knit from the same yarn as the leg, so it holds its stretch for the
              life of the pair instead of going slack by the second winter.
            </p>

            <dl className="mt-10 grid grid-cols-3 gap-px border border-rule bg-rule">
              {[
                ["Cuff depth", "6–8 cm"],
                ["Hem width", "14–27 cm"],
                ["Inseam", "73–76 cm"],
              ].map(([label, value]) => (
                <div key={label} className="bg-haze p-4">
                  <dt className="t-spec text-ink-soft">{label}</dt>
                  <dd className="t-num mt-2 text-lg">{value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* ---------------------------------------------------------- Cairo story */}
      <section className="relative overflow-hidden bg-ink text-paper">
        <div className="grid lg:grid-cols-2">
          <div className="flex flex-col justify-center gap-6 px-5 py-20 md:px-12 md:py-28">
            <p className="t-spec text-azure">Where it comes from</p>
            <h2 className="t-head text-4xl md:text-6xl">
              Long-staple cotton,
              <br />
              spun an hour
              <br />
              from the factory
            </h2>
            <p className="max-w-md text-paper/70">
              Egyptian cotton has a longer fibre than most, which means a yarn
              with fewer joins and a surface that resists pilling. We buy it from
              the Delta, knit it in Shubra and sew it in Cairo. Nothing about the
              supply chain is interesting except how short it is.
            </p>
            <Link href="/shop" className="btn btn-azure mt-2 self-start">
              See what we make
            </Link>
          </div>

          <div className="seam-b lg:seam-l relative aspect-3/2 lg:aspect-auto lg:min-h-[34rem]">
            <Image
              src="/media/fabric-loopback.jpg"
              alt="Macro view of loopback cotton terry, showing the knit surface"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- More catalogue */}
      <section className="shell py-20 md:py-28">
        <Reveal>
          <header className="flex flex-wrap items-end justify-between gap-6 border-b border-rule pb-6">
            <h2 className="t-head text-4xl md:text-5xl">Straight, wide, cargo</h2>
            <Link href="/shop" className="t-spec link-draw">
              Browse everything
            </Link>
          </header>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
            {rest.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </Reveal>
      </section>

      {/* ---------------------------------------------------------- Newsletter */}
      <section className="bg-azure">
        <div className="shell flex flex-col items-start gap-8 py-16 md:flex-row md:items-end md:justify-between md:py-20">
          <div>
            <h2 className="t-head text-4xl md:text-5xl">
              We drop a weight at a time
            </h2>
            <p className="mt-4 max-w-md">
              One email when a knit lands or a size comes back. Nothing else.
            </p>
          </div>

          <form
            className="flex w-full max-w-md gap-2"
            aria-label="Get restock emails"
          >
            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <input
              id="email"
              type="email"
              required
              placeholder="you@example.com"
              className="min-w-0 flex-1 border border-ink bg-paper px-4 py-3 text-sm placeholder:text-ink-soft"
            />
            <button type="submit" className="btn btn-solid">
              Sign up
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
