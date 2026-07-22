"use client";

import { useId } from "react";
import type { Product } from "@/lib/products";

/**
 * Product plates.
 *
 * We photograph the cloth, not the garment: one grayscale macro of the knit,
 * tinted to the colourway and clipped to a silhouette whose hem width is taken
 * from the product's own measurements. So the Fustat really is wider at the
 * ankle than the Corniche, and a new colourway costs nothing.
 */

const VIEW = { w: 400, h: 520 };

const CX = 200;
const WAIST_HALF = 74;
const HIP_HALF = 86;
const WAIST_Y = 30;
const HIP_Y = 190;
const CROTCH_Y = 214;
const NOTCH_Y = 176;
// Each leg hangs from the centre of its half of the hip, so the outer seam
// falls plumb instead of splaying.
const LEG_L = 157;
const LEG_R = 243;

/** Centimetres of hem, drawn at roughly 2.4px per cm. */
function hemToPx(hemCm: number) {
  return Math.max(24, hemCm * 2.4);
}

function pantsOutline(hemCm: number, bottom: number) {
  const h = hemToPx(hemCm) / 2;
  return [
    `M ${CX - WAIST_HALF} ${WAIST_Y}`,
    `L ${CX + WAIST_HALF} ${WAIST_Y}`,
    `L ${CX + HIP_HALF} ${HIP_Y}`,
    `L ${LEG_R + h} ${bottom}`,
    `L ${LEG_R - h} ${bottom}`,
    `L ${CX + 6} ${CROTCH_Y}`,
    `L ${CX} ${NOTCH_Y}`,
    `L ${CX - 6} ${CROTCH_Y}`,
    `L ${LEG_L + h} ${bottom}`,
    `L ${LEG_L - h} ${bottom}`,
    `L ${CX - HIP_HALF} ${HIP_Y}`,
    "Z",
  ].join(" ");
}

const HOODIE_OUTLINE = [
  "M 146 110",
  "C 150 30, 250 30, 254 110",
  "L 322 128",
  "L 378 286",
  "L 338 306",
  "L 300 214",
  "L 300 470",
  "L 100 470",
  "L 100 214",
  "L 62 306",
  "L 22 286",
  "L 78 128",
  "Z",
].join(" ");

const CREW_OUTLINE = [
  "M 156 106",
  "C 170 88, 230 88, 244 106",
  "L 322 128",
  "L 378 286",
  "L 338 306",
  "L 300 214",
  "L 300 470",
  "L 100 470",
  "L 100 214",
  "L 62 306",
  "L 22 286",
  "L 78 128",
  "Z",
].join(" ");

type Shape = { outline: string; seams: string[] };

function shapeFor(product: Product): Shape {
  if (product.category === "tops") {
    const isHood = product.slug === "nile-hoodie";
    return {
      outline: isHood ? HOODIE_OUTLINE : CREW_OUTLINE,
      seams: [
        // Hem and cuff bands.
        "M 100 442 L 300 442",
        "M 40 292 L 348 292",
        // Armhole seams.
        "M 100 214 L 132 128",
        "M 300 214 L 268 128",
        isHood
          ? // Hood opening and its centre seam.
            "M 146 110 C 168 150, 232 150, 254 110 M 200 40 L 200 96"
          : // Ribbed collar.
            "M 156 106 C 170 122, 230 122, 244 106",
        isHood ? "M 128 330 L 272 330 L 262 402 L 138 402 Z" : "",
      ].filter(Boolean),
    };
  }

  const isShort = product.category === "shorts";
  const bottom = isShort ? 330 : 500;
  const cuffed = product.fit === "Tapered";
  const h = hemToPx(product.measurements.hem) / 2;

  return {
    outline: pantsOutline(product.measurements.hem, bottom),
    seams: [
      // Waistband.
      "M 100 62 L 300 62",
      // Front rise.
      `M 200 62 L 200 ${NOTCH_Y}`,
      // Drawcord, tied off centre like it always ends up.
      "M 200 64 C 188 88, 180 92, 175 112 M 200 64 C 212 86, 221 94, 226 116",
      // Side pocket openings.
      "M 122 86 L 140 156",
      "M 278 86 L 260 156",
      // Inseam down each leg.
      `M ${CX - 6} ${CROTCH_Y} L ${LEG_L + h} ${bottom}`,
      `M ${CX + 6} ${CROTCH_Y} L ${LEG_R - h} ${bottom}`,
      // Ribbed cuff, only where there is one.
      cuffed ? `M 40 ${bottom - 36} L 360 ${bottom - 36}` : "",
    ].filter(Boolean),
  };
}

const TEXTURES = {
  a: "/media/knit-a.jpg",
  b: "/media/knit-b.jpg",
  c: "/media/knit-c.jpg",
  d: "/media/knit-d.jpg",
} as const;

/** Pale colourways need dark seams; dark ones need light seams. */
function isLight(hex: string) {
  const n = parseInt(hex.replace("#", ""), 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.6;
}

export function GarmentPlate({
  product,
  color,
  className,
  ground = "var(--color-haze)",
}: {
  product: Product;
  color: { name: string; hex: string };
  className?: string;
  ground?: string;
}) {
  const shape = shapeFor(product);
  // The same product and colourway can appear more than once on a page (the
  // product gallery shows it large and again as a thumbnail), so the clip id
  // has to be unique per instance, not per garment.
  const uid = useId().replace(/:/g, "");
  const seam = isLight(color.hex) ? "rgba(0,0,0,0.32)" : "rgba(255,255,255,0.30)";

  return (
    <svg
      viewBox={`0 0 ${VIEW.w} ${VIEW.h}`}
      className={className}
      role="img"
      aria-label={`${product.name} in ${color.name}`}
      style={{ isolation: "isolate" }}
    >
      <rect width={VIEW.w} height={VIEW.h} fill={ground} />

      <defs>
        <clipPath id={`clip-${uid}`}>
          <path d={shape.outline} />
        </clipPath>
      </defs>

      <g clipPath={`url(#clip-${uid})`} style={{ isolation: "isolate" }}>
        <rect width={VIEW.w} height={VIEW.h} fill={color.hex} />
        <image
          href={TEXTURES[product.texture]}
          width={VIEW.w}
          height={VIEW.h}
          preserveAspectRatio="xMidYMid slice"
          style={{ mixBlendMode: "overlay" }}
          opacity={0.92}
        />
        {shape.seams.map((d, i) => (
          <path
            key={i}
            d={d}
            fill="none"
            stroke={seam}
            strokeWidth={1.5}
            strokeLinecap="round"
          />
        ))}
      </g>

      {/* A hairline round the garment so pale colourways don't dissolve. */}
      <path
        d={shape.outline}
        fill="none"
        stroke="rgba(11,11,12,0.18)"
        strokeWidth={1}
      />
    </svg>
  );
}

/**
 * The taper diagram: one leg in profile, thigh to hem, drawn to scale.
 * It answers the question a photograph can't — how narrow does this actually
 * get at the ankle?
 */
export function TaperDiagram({ product }: { product: Product }) {
  const { thigh, hem, inseam } = product.measurements;
  const scale = 3.1;
  const top = thigh * scale;
  const bottom = hem * scale;
  const height = 300;
  const cx = 110;

  return (
    <svg viewBox="0 0 220 360" className="w-full" role="img"
      aria-label={`Leg taper: ${thigh} cm at the thigh narrowing to ${hem} cm at the hem over a ${inseam} cm inseam`}>
      <path
        d={`M ${cx - top / 2} 20 L ${cx + top / 2} 20 L ${cx + bottom / 2} ${20 + height} L ${cx - bottom / 2} ${20 + height} Z`}
        fill="var(--color-mist)"
        stroke="var(--color-azure-deep)"
        strokeWidth={1.5}
      />
      {/* Thigh measure */}
      <g stroke="var(--color-ink)" strokeWidth={1}>
        <path d={`M ${cx - top / 2} 12 L ${cx + top / 2} 12`} />
        <path d={`M ${cx - top / 2} 8 L ${cx - top / 2} 16`} />
        <path d={`M ${cx + top / 2} 8 L ${cx + top / 2} 16`} />
      </g>
      <text
        x={cx}
        y={6}
        textAnchor="middle"
        className="t-num"
        fontSize={11}
        fill="var(--color-ink)"
      >
        {thigh} cm
      </text>
      {/* Hem measure */}
      <g stroke="var(--color-ink)" strokeWidth={1}>
        <path d={`M ${cx - bottom / 2} ${28 + height} L ${cx + bottom / 2} ${28 + height}`} />
        <path d={`M ${cx - bottom / 2} ${24 + height} L ${cx - bottom / 2} ${32 + height}`} />
        <path d={`M ${cx + bottom / 2} ${24 + height} L ${cx + bottom / 2} ${32 + height}`} />
      </g>
      <text
        x={cx}
        y={48 + height}
        textAnchor="middle"
        className="t-num"
        fontSize={11}
        fill="var(--color-ink)"
      >
        {hem} cm
      </text>
      {/* Inseam, running down the inner edge */}
      <g stroke="var(--color-ink-soft)" strokeWidth={1} strokeDasharray="3 3">
        <path d={`M ${cx + top / 2 + 22} 20 L ${cx + bottom / 2 + 22} ${20 + height}`} />
      </g>
      <text
        x={cx + top / 2 + 28}
        y={20 + height / 2}
        className="t-num"
        fontSize={11}
        fill="var(--color-ink-soft)"
      >
        {inseam} cm
      </text>
    </svg>
  );
}
