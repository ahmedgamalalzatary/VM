/**
 * The VM catalogue.
 *
 * Everything a shopper argues about when buying sweats — how heavy the fabric
 * is, how far it narrows at the ankle, how long the leg runs — is a field here
 * rather than a sentence buried in a description. The shop page filters on
 * those fields and the product page draws them.
 */

export type Weight = 280 | 340 | 400;

export type Colorway = {
  name: string;
  /** Dyed-fabric colour. The knit macro is tinted to this at render time. */
  hex: string;
};

export type Product = {
  slug: string;
  name: string;
  /** One line, shown under the name in listings. */
  subtitle: string;
  category: "joggers" | "straight" | "cargo" | "shorts" | "tops";
  price: number;
  /** Set only when the item is marked down. */
  compareAt?: number;
  gsm: Weight;
  fabric: string;
  fit: string;
  /** Flat measurements in centimetres, taken on a size M. */
  measurements: {
    thigh: number;
    hem: number;
    inseam: number;
    rise: number;
  };
  colors: Colorway[];
  sizes: string[];
  /** Sizes we're out of, by name. */
  soldOut?: string[];
  /** The garment worn. Shown greyscale everywhere in the catalogue. */
  photo: string;
  photoAlt: string;
  /** object-position, for shots whose subject sits off-centre. */
  photoFocus?: string;
  /** Which knit macro to tint for the cloth swatch. */
  texture: "a" | "b" | "c" | "d";
  story: string;
  details: string[];
  care: string;
  badge?: string;
};

export const WEIGHTS: { gsm: Weight; label: string; blurb: string }[] = [
  {
    gsm: 280,
    label: "Light",
    blurb: "Single-knit terry. For Cairo in May, and for anyone who runs warm.",
  },
  {
    gsm: 340,
    label: "Mid",
    blurb: "The one most people keep wearing. Holds its shape, packs flat.",
  },
  {
    gsm: 400,
    label: "Heavy",
    blurb: "Brushed loopback with real weight to it. Winter, and only winter.",
  },
];

export const CATEGORIES: { id: Product["category"]; label: string }[] = [
  { id: "joggers", label: "Joggers" },
  { id: "straight", label: "Straight leg" },
  { id: "cargo", label: "Cargo" },
  { id: "shorts", label: "Shorts" },
  { id: "tops", label: "Tops" },
];

const ONYX = { name: "Onyx", hex: "#1b1d21" };
const HEATHER = { name: "Heather", hex: "#9aa0a6" };
const BONE = { name: "Bone", hex: "#e4ded2" };
const NAVY = { name: "Navy", hex: "#232f4a" };
const OLIVE = { name: "Olive", hex: "#4f5442" };
const SAND = { name: "Sand", hex: "#c6ab86" };
const CLAY = { name: "Clay", hex: "#9c5f4d" };
const SLATE = { name: "Slate", hex: "#585f67" };
const AZURE = { name: "Azure", hex: "#0191d8" };

export const PRODUCTS: Product[] = [
  {
    slug: "corniche-jogger",
    name: "Corniche",
    subtitle: "Heavyweight tapered jogger",
    category: "joggers",
    price: 1290,
    gsm: 400,
    fabric: "Brushed loopback terry, 100% Giza cotton",
    fit: "Tapered",
    measurements: { thigh: 33, hem: 14, inseam: 74, rise: 30 },
    colors: [ONYX, HEATHER, BONE, AZURE],
    sizes: ["S", "M", "L", "XL", "XXL"],
    soldOut: ["S"],
    photo: "/media/rail-walk.jpg",
    photoAlt: "Cuffed heavyweight joggers worn walking a railway line in winter",
    texture: "a",
    story:
      "The heaviest thing we make. Four hundred grams of loopback terry per square metre, brushed once on the inside so it softens instead of pilling. It falls straight from the hip and closes tight at the ankle.",
    details: [
      "Ribbed cuff, 8 cm, knit on the same machine as the body",
      "Two side pockets and one zipped pocket at the back",
      "Flat cotton drawcord, no plastic tips",
      "Pre-shrunk — it stays the size you bought",
    ],
    care: "Machine wash cold, inside out. Tumble dry low. The terry softens every wash.",
    badge: "Heaviest",
  },
  {
    slug: "maadi-jogger",
    name: "Maadi",
    subtitle: "Midweight tapered jogger",
    category: "joggers",
    price: 1050,
    gsm: 340,
    fabric: "Loopback terry, 100% Giza cotton",
    fit: "Tapered",
    measurements: { thigh: 32, hem: 15, inseam: 74, rise: 29 },
    colors: [HEATHER, NAVY, OLIVE, ONYX],
    sizes: ["S", "M", "L", "XL", "XXL"],
    photo: "/media/stride.jpg",
    photoAlt: "A tapered pair caught mid-jump above a concrete lot",
    photoFocus: "50% 28%",
    texture: "b",
    story:
      "The pair that ends up in the wash every week. Mid weight, so it works in November and still works in March. We cut the rise a centimetre lower than the Corniche and left a little more room through the seat.",
    details: [
      "Ribbed cuff, 7 cm",
      "Two side pockets, deep enough for a phone",
      "Bar-tacked at every stress point",
      "Pre-shrunk",
    ],
    care: "Machine wash cold, inside out. Tumble dry low.",
    badge: "Best seller",
  },
  {
    slug: "sahel-jogger",
    name: "Sahel",
    subtitle: "Lightweight tapered jogger",
    category: "joggers",
    price: 890,
    gsm: 280,
    fabric: "Single-knit terry, 100% Giza cotton",
    fit: "Tapered",
    measurements: { thigh: 31, hem: 15, inseam: 73, rise: 29 },
    colors: [BONE, SAND, HEATHER],
    sizes: ["S", "M", "L", "XL"],
    photo: "/media/cuff-sneaker.jpg",
    photoAlt: "A light ribbed cuff gathered above a white sneaker",
    texture: "c",
    story:
      "Built for the north coast in August. Unbrushed single-knit that breathes, in colours that don't hold heat. Thin enough to roll into a bag and forget about.",
    details: [
      "Ribbed cuff, 6 cm",
      "Two side pockets",
      "Unbrushed inside — no fleece, no cling",
      "Pre-shrunk",
    ],
    care: "Machine wash cold. Line dry in shade to keep the light colours light.",
  },
  {
    slug: "zamalek-straight",
    name: "Zamalek",
    subtitle: "Midweight straight leg",
    category: "straight",
    price: 1120,
    gsm: 340,
    fabric: "Loopback terry, 100% Giza cotton",
    fit: "Straight",
    measurements: { thigh: 33, hem: 21, inseam: 76, rise: 30 },
    colors: [ONYX, HEATHER, SLATE, BONE],
    sizes: ["S", "M", "L", "XL", "XXL"],
    photo: "/media/waist-wide.jpg",
    photoAlt: "A hand resting in the side pocket, shot square at the hip",
    texture: "a",
    story:
      "An open hem that breaks once over the shoe. Same terry as the Maadi, cut with no taper at all, so it reads closer to a trouser than a track pant.",
    details: [
      "Open hem, finished with a 4 cm turn-up",
      "Two side pockets and one back pocket",
      "Flat cotton drawcord",
      "Pre-shrunk",
    ],
    care: "Machine wash cold, inside out. Tumble dry low.",
  },
  {
    slug: "fustat-wide",
    name: "Fustat",
    subtitle: "Heavyweight wide leg",
    category: "straight",
    price: 1350,
    gsm: 400,
    fabric: "Brushed loopback terry, 100% Giza cotton",
    fit: "Wide",
    measurements: { thigh: 36, hem: 27, inseam: 76, rise: 32 },
    colors: [ONYX, BONE, OLIVE],
    sizes: ["S", "M", "L", "XL"],
    soldOut: ["XL"],
    photo: "/media/walk-bridge.jpg",
    photoAlt: "A full-length wide leg worn walking a suspension bridge",
    photoFocus: "50% 62%",
    texture: "d",
    story:
      "Heavy fabric is the only way a wide leg hangs properly instead of billowing. High rise, full through the thigh, and a hem wide enough to sit on top of a boot.",
    details: [
      "Open hem, 27 cm across",
      "High rise, pleated at the front",
      "Two deep side pockets",
      "Pre-shrunk",
    ],
    care: "Machine wash cold, inside out. Tumble dry low. Cool iron if you want the pleat sharp.",
  },
  {
    slug: "roda-straight",
    name: "Roda",
    subtitle: "Lightweight straight leg",
    category: "straight",
    price: 950,
    gsm: 280,
    fabric: "Single-knit terry, 100% Giza cotton",
    fit: "Straight",
    measurements: { thigh: 32, hem: 22, inseam: 75, rise: 29 },
    colors: [BONE, HEATHER, SAND],
    sizes: ["S", "M", "L", "XL"],
    photo: "/media/waist-tall.jpg",
    photoAlt: "The waistband and front seam of a light straight leg",
    photoFocus: "50% 70%",
    texture: "c",
    story:
      "The lightest straight leg we cut. Wears like a pyjama and looks like a trouser, which is the whole point.",
    details: [
      "Open hem",
      "Two side pockets",
      "Unbrushed inside",
      "Pre-shrunk",
    ],
    care: "Machine wash cold. Line dry in shade.",
  },
  {
    slug: "khamaseen-cargo",
    name: "Khamaseen",
    subtitle: "Midweight cargo jogger",
    category: "cargo",
    price: 1390,
    compareAt: 1590,
    gsm: 340,
    fabric: "Loopback terry with ripstop trim, 100% Giza cotton",
    fit: "Tapered",
    measurements: { thigh: 34, hem: 15, inseam: 74, rise: 30 },
    colors: [OLIVE, ONYX, SAND],
    sizes: ["S", "M", "L", "XL", "XXL"],
    soldOut: ["M"],
    photo: "/media/hoodie-street.jpg",
    photoAlt: "Sweatpants and a hood, sitting out an afternoon at a skatepark",
    photoFocus: "50% 62%",
    texture: "b",
    story:
      "Named after the wind that arrives every spring and puts sand through everything. Two bellowed thigh pockets, both with flaps that actually close, in a ripstop cotton that shrugs the grit off.",
    details: [
      "Two bellowed cargo pockets with press-stud flaps",
      "Ribbed cuff, 7 cm",
      "Ripstop cotton on pockets and waistband facing",
      "Pre-shrunk",
    ],
    care: "Machine wash cold, inside out. Close the flaps before washing.",
    badge: "On sale",
  },
  {
    slug: "bulaq-cargo",
    name: "Bulaq",
    subtitle: "Heavyweight utility straight",
    category: "cargo",
    price: 1450,
    gsm: 400,
    fabric: "Brushed loopback terry with ripstop trim, 100% Giza cotton",
    fit: "Straight",
    measurements: { thigh: 35, hem: 22, inseam: 76, rise: 31 },
    colors: [ONYX, OLIVE, SLATE],
    sizes: ["M", "L", "XL", "XXL"],
    photo: "/media/lacing.jpg",
    photoAlt: "Crouching to lace a boot on a cold morning",
    photoFocus: "50% 45%",
    texture: "d",
    story:
      "A workwear pattern in sweatpant fabric. Straight through the leg, reinforced where a knee usually goes first, with pockets sized for a tape measure and a phone.",
    details: [
      "Two cargo pockets, one zipped utility pocket",
      "Double-layer ripstop at the knee",
      "Open hem with an internal drawcord",
      "Pre-shrunk",
    ],
    care: "Machine wash cold, inside out. Tumble dry low.",
  },
  {
    slug: "delta-short",
    name: "Delta",
    subtitle: "Midweight sweat short",
    category: "shorts",
    price: 690,
    gsm: 340,
    fabric: "Loopback terry, 100% Giza cotton",
    fit: "Relaxed",
    measurements: { thigh: 33, hem: 30, inseam: 18, rise: 29 },
    colors: [HEATHER, ONYX, NAVY, CLAY],
    sizes: ["S", "M", "L", "XL", "XXL"],
    photo: "/media/hoodie-back.jpg",
    photoAlt: "Sweat shorts and a hood, seen from behind at a rail",
    photoFocus: "50% 62%",
    texture: "a",
    story:
      "An 18 centimetre inseam, which lands just above the knee on most people. Same terry and same waistband as the Maadi, so the two wear as a set.",
    details: [
      "18 cm inseam",
      "Two side pockets",
      "Flat cotton drawcord",
      "Pre-shrunk",
    ],
    care: "Machine wash cold, inside out. Tumble dry low.",
  },
  {
    slug: "manial-short",
    name: "Manial",
    subtitle: "Lightweight sweat short",
    category: "shorts",
    price: 620,
    gsm: 280,
    fabric: "Single-knit terry, 100% Giza cotton",
    fit: "Relaxed",
    measurements: { thigh: 32, hem: 29, inseam: 15, rise: 28 },
    colors: [BONE, SAND, AZURE],
    sizes: ["S", "M", "L", "XL"],
    photo: "/media/tracksuit-field.jpg",
    photoAlt: "Stretching out on a playing field on a warm afternoon",
    texture: "c",
    story:
      "Shorter and thinner than the Delta. The pair you leave at the beach house.",
    details: ["15 cm inseam", "Two side pockets", "Unbrushed inside", "Pre-shrunk"],
    care: "Machine wash cold. Line dry in shade.",
  },
  {
    slug: "nile-hoodie",
    name: "Nile",
    subtitle: "Heavyweight hoodie",
    category: "tops",
    price: 1490,
    gsm: 400,
    fabric: "Brushed loopback terry, 100% Giza cotton",
    fit: "Relaxed",
    measurements: { thigh: 0, hem: 0, inseam: 0, rise: 0 },
    colors: [ONYX, HEATHER, BONE, AZURE],
    sizes: ["S", "M", "L", "XL", "XXL"],
    photo: "/media/hoodie-rain.jpg",
    photoAlt: "A heavyweight hoodie worn in light rain",
    photoFocus: "50% 40%",
    texture: "b",
    story:
      "Cut to sit over the Corniche without bunching. A two-panel hood that stands up on its own, and a kangaroo pocket set low enough to put your hands in while walking.",
    details: [
      "Two-panel lined hood",
      "Kangaroo pocket",
      "Ribbed cuffs and hem",
      "Pre-shrunk",
    ],
    care: "Machine wash cold, inside out. Tumble dry low.",
  },
  {
    slug: "giza-crew",
    name: "Giza",
    subtitle: "Midweight crewneck",
    category: "tops",
    price: 1190,
    gsm: 340,
    fabric: "Loopback terry, 100% Giza cotton",
    fit: "Regular",
    measurements: { thigh: 0, hem: 0, inseam: 0, rise: 0 },
    colors: [HEATHER, ONYX, NAVY, SLATE],
    sizes: ["S", "M", "L", "XL", "XXL"],
    soldOut: ["XXL"],
    photo: "/media/grass-lie.jpg",
    photoAlt: "A midweight crewneck, lying back on cut grass",
    texture: "a",
    story:
      "A plain crewneck with a proper ribbed collar that keeps its shape after the tenth wash. Nothing printed on it anywhere.",
    details: [
      "Ribbed collar, cuffs and hem",
      "Set-in sleeves",
      "No print, no embroidery",
      "Pre-shrunk",
    ],
    care: "Machine wash cold, inside out. Tumble dry low.",
  },
];

export const SIZE_ORDER = ["S", "M", "L", "XL", "XXL"];

export function getProduct(slug: string) {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function relatedTo(product: Product, limit = 4) {
  // Nearest neighbours by weight first, then anything else in the catalogue.
  const others = PRODUCTS.filter((p) => p.slug !== product.slug);
  const sameWeight = others.filter((p) => p.gsm === product.gsm);
  const rest = others.filter((p) => p.gsm !== product.gsm);
  return [...sameWeight, ...rest].slice(0, limit);
}

export function isSoldOut(product: Product, size: string) {
  return product.soldOut?.includes(size) ?? false;
}
