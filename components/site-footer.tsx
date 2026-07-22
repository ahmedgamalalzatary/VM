import Image from "next/image";
import Link from "next/link";
import { CATEGORIES, WEIGHTS } from "@/lib/products";

const HELP = [
  { href: "/shop", label: "Size & fit" },
  { href: "/shop", label: "Delivery" },
  { href: "/shop", label: "Exchanges" },
  { href: "/shop", label: "Contact" },
];

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-rule bg-haze">
      <div className="shell grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Image
            src="/logo-lockup.png"
            alt="VM SweatPants"
            width={910}
            height={580}
            className="h-12 w-auto"
          />
          <p className="mt-5 max-w-xs text-sm text-ink-soft">
            Cut and sewn in Cairo from Egyptian long-staple cotton. We knit three
            weights and publish the number on every pair.
          </p>
        </div>

        <nav aria-label="Shop">
          <h2 className="t-spec text-ink-soft">Shop</h2>
          <ul className="mt-5 space-y-3">
            {CATEGORIES.map((c) => (
              <li key={c.id}>
                <Link href={`/shop?fit=${c.id}`} className="link-draw text-sm">
                  {c.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="By weight">
          <h2 className="t-spec text-ink-soft">By weight</h2>
          <ul className="mt-5 space-y-3">
            {WEIGHTS.map((w) => (
              <li key={w.gsm}>
                <Link
                  href={`/shop?weight=${w.gsm}`}
                  className="link-draw text-sm"
                >
                  {w.gsm} GSM — {w.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Help">
          <h2 className="t-spec text-ink-soft">Help</h2>
          <ul className="mt-5 space-y-3">
            {HELP.map((h) => (
              <li key={h.label}>
                <Link href={h.href} className="link-draw text-sm">
                  {h.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-rule">
        <div className="shell flex flex-col gap-3 py-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="t-spec text-ink-soft">
            © {new Date().getFullYear()} VM SweatPants — Cairo
          </p>
          <p className="t-spec text-ink-soft">
            Demo storefront · no real orders are taken
          </p>
        </div>
      </div>
    </footer>
  );
}
