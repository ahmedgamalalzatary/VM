"use client";

import Image from "next/image";
import Link from "next/link";
import { type CSSProperties, useEffect, useState } from "react";
import { price } from "@/lib/format";
import { OFFERS, OFFER_DWELL_MS } from "@/lib/offers";

/**
 * The offer stage.
 *
 * Four offers share one strip, cut into parallelograms on the brand's seam.
 * The one on show takes the width it needs; the rest stand as slivers to its
 * right, greyed back until their turn. Advancing widens a sliver into the stage
 * and lets the colour in — the only place in the catalogue colour appears.
 *
 * The panels are flex items rather than a translated track, so advancing is a
 * single flex-grow transition with nothing to measure and nothing to clone.
 */
export function OfferStage() {
  const [index, setIndex] = useState(0);
  const [held, setHeld] = useState(false);
  const [visible, setVisible] = useState(true);
  const [stillMoving, setStillMoving] = useState(true);

  // Reduced motion leaves a static offer with a working picker, rather than one
  // that advances under the reader.
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setStillMoving(!query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  // A backgrounded tab would otherwise burn through every offer unseen.
  useEffect(() => {
    const sync = () => setVisible(!document.hidden);
    document.addEventListener("visibilitychange", sync);
    return () => document.removeEventListener("visibilitychange", sync);
  }, []);

  const paused = held || !visible || !stillMoving;

  useEffect(() => {
    if (paused) return;
    const timer = setTimeout(
      () => setIndex((i) => (i + 1) % OFFERS.length),
      OFFER_DWELL_MS,
    );
    return () => clearTimeout(timer);
  }, [paused, index]);

  const offer = OFFERS[index];

  return (
    <section
      className="stage relative overflow-hidden bg-azure text-ink"
      aria-roledescription="carousel"
      aria-label="Current offers"
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
      onFocusCapture={() => setHeld(true)}
      onBlurCapture={() => setHeld(false)}
    >
      <div className="grid lg:grid-cols-2">
        {/* ------------------------------------------------------- The strip */}
        <div className="seam-b lg:seam-r relative overflow-hidden">
          <div className="stage-strip aspect-4/3 sm:aspect-16/10 lg:aspect-auto lg:h-full lg:min-h-[88vh]">
            {OFFERS.map((o, i) => {
              const active = i === index;
              const shot = (
                <Image
                  src={o.image}
                  alt={active ? o.imageAlt : ""}
                  fill
                  // The first panel is the LCP element at every breakpoint.
                  loading={i === 0 ? "eager" : "lazy"}
                  fetchPriority={i === 0 ? "high" : "auto"}
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                  style={{ objectPosition: o.focus ?? "50% 50%" }}
                />
              );

              // The offer on show is worth clicking through; the slivers are a
              // picker. Same panel, two different jobs.
              return active ? (
                <Link
                  key={o.id}
                  href={o.cta.href}
                  aria-label={`${o.headline} — ${o.cta.label}`}
                  data-active
                  className="stage-panel grow"
                >
                  {shot}
                </Link>
              ) : (
                <button
                  key={o.id}
                  type="button"
                  onClick={() => setIndex(i)}
                  aria-label={`Show offer: ${o.headline}`}
                  data-active="false"
                  className="stage-panel hidden shrink-0 grow-0 basis-30 cursor-pointer lg:block"
                >
                  {shot}
                </button>
              );
            })}
          </div>
        </div>

        {/* --------------------------------------------------------- The copy */}
        <div className="flex flex-col justify-center gap-7 px-5 py-14 md:px-12 lg:py-20">
          {/* Keyed on the offer so the load-in replays as each one arrives. */}
          <div key={offer.id} className="flex flex-col gap-7">
            <p className="t-spec rise">{offer.kicker}</p>

            <h1
              className="t-display rise text-[clamp(2.25rem,3.9vw,3.5rem)] lg:min-h-24"
              style={{ animationDelay: "70ms" }}
            >
              {offer.headline}
            </h1>

            <p
              className="rise max-w-md leading-relaxed lg:min-h-21"
              style={{ animationDelay: "140ms" }}
            >
              {offer.body}
            </p>

            {/* Held open even when an offer carries no price, so the buttons
                below it don't shift as the stage advances. */}
            <p
              className="t-num rise flex min-h-8 items-baseline gap-3 text-2xl"
              style={{ animationDelay: "200ms" }}
            >
              {offer.price?.note === "from" && (
                <span className="t-spec text-ink/70">From</span>
              )}
              {offer.price && <span>{price(offer.price.now)}</span>}
              {offer.price?.was && (
                <span className="text-lg text-ink/60 line-through">
                  {price(offer.price.was)}
                </span>
              )}
              {offer.price?.note && offer.price.note !== "from" && (
                <span className="t-spec text-ink/70">{offer.price.note}</span>
              )}
            </p>

            <div
              className="rise flex flex-wrap gap-3"
              style={{ animationDelay: "260ms" }}
            >
              <Link href={offer.cta.href} className="btn btn-solid">
                {offer.cta.label}
              </Link>
              <Link href="#weights" className="btn btn-line">
                Compare weights
              </Link>
            </div>
          </div>

          {/* ------------------------------------------------------ The rail
              Tokened by what each offer is — a weight or a price — because a
              running 01 / 02 / 03 would say nothing about any of them. */}
          <ul
            className="mt-2 flex flex-wrap gap-x-8 gap-y-3 border-t border-ink/25 pt-5"
            data-paused={paused}
          >
            {OFFERS.map((o, i) => {
              const active = i === index;
              return (
                <li key={o.id}>
                  <button
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-current={active}
                    className={`t-spec block cursor-pointer transition-colors ${
                      active ? "text-ink" : "text-ink/55 hover:text-ink"
                    }`}
                  >
                    {o.token}
                    <span className="mt-2 block h-px w-full bg-ink/20">
                      {active && (
                        <span
                          key={index}
                          className="dwell block h-px w-full bg-ink"
                          style={
                            { "--dwell": `${OFFER_DWELL_MS}ms` } as CSSProperties
                          }
                        />
                      )}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      {/* Announces the offer for anyone not watching it change. */}
      <p aria-live="polite" aria-atomic className="sr-only">
        {`Offer ${index + 1} of ${OFFERS.length}: ${offer.headline}`}
      </p>
    </section>
  );
}
