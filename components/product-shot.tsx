import Image from "next/image";
import type { Colorway, Product } from "@/lib/products";

/**
 * Product imagery.
 *
 * Two halves of one idea. The garment is photographed worn and shown grey,
 * because the photograph is about how a pair hangs; the cloth is shown in
 * colour, because on this catalogue the colourway *is* the cloth. Between them
 * they carry everything a listing needs, and colour only ever arrives with the
 * knit — or on the offer stage, which is the other place it's allowed.
 */

const TEXTURES = {
  a: "/media/knit-a.jpg",
  b: "/media/knit-b.jpg",
  c: "/media/knit-c.jpg",
  d: "/media/knit-d.jpg",
} as const;

export function ProductShot({
  product,
  sizes = "(min-width: 1024px) 25vw, 50vw",
  className = "",
  eager = false,
}: {
  product: Product;
  sizes?: string;
  className?: string;
  eager?: boolean;
}) {
  return (
    <div className={`relative aspect-4/5 overflow-hidden bg-haze ${className}`}>
      <Image
        src={product.photo}
        alt={product.photoAlt}
        fill
        sizes={sizes}
        loading={eager ? "eager" : "lazy"}
        fetchPriority={eager ? "high" : "auto"}
        className="object-cover grayscale"
        style={{ objectPosition: product.photoFocus ?? "50% 50%" }}
      />
    </div>
  );
}

/**
 * The knit macro tinted to a colourway. The macro is a real photograph of the
 * cloth, shot flat and neutral, so an overlay blend lands it on the dyed colour
 * without flattening the loops.
 */
export function ClothSwatch({
  product,
  color,
  sizes = "(min-width: 1024px) 25vw, 50vw",
  className = "",
}: {
  product: Product;
  color: Colorway;
  sizes?: string;
  className?: string;
}) {
  return (
    <div
      className={`relative aspect-4/5 isolate overflow-hidden ${className}`}
      style={{ backgroundColor: color.hex }}
    >
      <Image
        src={TEXTURES[product.texture]}
        alt=""
        fill
        sizes={sizes}
        className="object-cover opacity-90 mix-blend-overlay"
      />
    </div>
  );
}
