"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AnnouncementBar } from "@/components/announcement-bar";
import { useCart } from "@/components/cart-provider";
import { CATEGORIES } from "@/lib/products";

const NAV = [
  { href: "/shop", label: "Shop all" },
  ...CATEGORIES.map((c) => ({ href: `/shop?fit=${c.id}`, label: c.label })),
];

export function SiteHeader() {
  const { count, openCart, ready } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-paper">
      <AnnouncementBar />

      <div className="border-b border-rule">
        <div className="shell flex h-20 items-center justify-between gap-4">
          <Link href="/" className="shrink-0" aria-label="VM SweatPants, home">
            <Image
              src="/logo-lockup.png"
              alt="VM SweatPants"
              width={910}
              height={580}
              loading="eager"
              fetchPriority="high"
              className="h-11 w-auto"
            />
          </Link>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-8">
              {NAV.map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="t-spec link-draw">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-5">
            <Link href="/shop" className="t-spec link-draw hidden sm:inline">
              Search
            </Link>
            <button
              type="button"
              onClick={openCart}
              className="t-spec link-draw"
              aria-label={`Open cart, ${ready ? count : 0} item${count === 1 ? "" : "s"}`}
            >
              Cart ({ready ? count : 0})
            </button>
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              className="t-spec lg:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-nav"
            >
              {menuOpen ? "Close" : "Menu"}
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <nav
          id="mobile-nav"
          aria-label="Main"
          className="border-b border-rule bg-paper lg:hidden"
        >
          <ul className="shell flex flex-col py-2">
            {NAV.map((item) => (
              <li key={item.label} className="border-b border-rule last:border-0">
                <Link
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="t-head block py-4 text-2xl"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
