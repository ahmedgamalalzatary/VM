import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/product-card";
import { ProductDetail } from "@/components/product-detail";
import { getProduct, PRODUCTS, relatedTo } from "@/lib/products";

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return { title: "Not found" };

  return {
    title: `${product.name} — ${product.subtitle}`,
    description: product.story,
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const related = relatedTo(product);

  return (
    <>
      <ProductDetail product={product} />

      <section className="shell py-20 md:py-24">
        <header className="flex flex-wrap items-end justify-between gap-6 border-b border-rule pb-6">
          <h2 className="t-head text-3xl md:text-4xl">
            Wears well with the {product.name}
          </h2>
          <Link href="/shop" className="t-spec link-draw">
            All 12 styles
          </Link>
        </header>

        <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
          {related.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>
    </>
  );
}
