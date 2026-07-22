/**
 * The offer stage.
 *
 * Every offer here is drawn from something already true in the catalogue —
 * the Khamaseen's markdown, the weight the Corniche and the Nile share, the
 * knit we push in summer, the delivery threshold. Nothing invented for the
 * banner. Each one is tokened by a measured thing, a weight or a price, which
 * is what the mono face is reserved for across the rest of the site.
 */

export type Offer = {
  id: string;
  /** Mono token in the rail. A weight or a price — never a number in a sequence. */
  token: string;
  kicker: string;
  headline: string;
  body: string;
  price?: { now: number; was?: number; note?: string };
  cta: { href: string; label: string };
  image: string;
  imageAlt: string;
  /** object-position, for shots whose subject sits off-centre. */
  focus?: string;
};

export const OFFERS: Offer[] = [
  {
    id: "khamaseen",
    token: "EGP 200 off",
    kicker: "Marked down",
    headline: "Two hundred off the Khamaseen",
    body: "The cargo cut for the spring wind. Two bellowed thigh pockets with flaps that actually close, and ripstop cotton where the grit lands.",
    price: { now: 1390, was: 1590 },
    cta: { href: "/product/khamaseen-cargo", label: "Shop the Khamaseen" },
    image: "/media/hoodie-street.jpg",
    imageAlt:
      "Someone sitting on a skatepark ledge in grey sweatpants and a blue hood",
    focus: "50% 62%",
  },
  {
    id: "four-hundred",
    token: "400 gsm",
    kicker: "Cut to wear together",
    headline: "One weight, top to bottom",
    body: "Four hundred grams of brushed loopback either end. The Nile hood is cut to sit over the Corniche without bunching at the waist.",
    price: { now: 2780, note: "the pair" },
    cta: { href: "/shop?weight=400", label: "Shop 400 gsm" },
    image: "/media/hoodie-rain.jpg",
    imageAlt: "A heavyweight hoodie in undyed cotton, worn in light rain",
    focus: "50% 40%",
  },
  {
    id: "two-eighty",
    token: "280 gsm",
    kicker: "Knit for July",
    headline: "The summer knit, unbrushed",
    body: "Single-knit terry with no fleece on the inside, so it breathes, packs flat and does not cling once Cairo gets going.",
    price: { now: 890, note: "from" },
    cta: { href: "/shop?weight=280", label: "Shop lightweight" },
    image: "/media/cuff-sneaker.jpg",
    imageAlt: "A ribbed cuff gathered above a white sneaker on wet tarmac",
  },
  {
    id: "delivery",
    token: "EGP 1,500",
    kicker: "Cairo and Giza",
    headline: "Next day over fifteen hundred",
    body: "Free delivery nationwide above EGP 1,500, three days outside Cairo, and any size exchanged within fourteen.",
    cta: { href: "/shop", label: "Browse all 12 styles" },
    image: "/media/folded-stack.jpg",
    imageAlt: "A rail of folded trousers hung waistband out",
  },
];

/** How long each offer holds the stage. */
export const OFFER_DWELL_MS = 6500;

/** Standing notices for the ticker. Short enough to read as they pass. */
export const NOTICES = [
  "Free delivery over EGP 1,500",
  "Cairo & Giza next day, rest of Egypt in three",
  "Exchange any size within 14 days",
  "EGP 200 off the Khamaseen cargo this week",
];
