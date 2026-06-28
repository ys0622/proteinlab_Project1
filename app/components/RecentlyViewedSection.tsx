"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getRecentProducts } from "./RecentlyViewedTracker";

type Product = {
  slug: string;
  brand: string;
  name: string;
  proteinPerServing: number;
  imageUrl?: string | null;
};

export default function RecentlyViewedSection({
  products,
  currentSlug,
}: {
  products: Product[];
  currentSlug?: string;
}) {
  const [recentSlugs, setRecentSlugs] = useState<string[]>([]);

  useEffect(() => {
    setRecentSlugs(getRecentProducts());
  }, []);

  const recentProducts = recentSlugs
    .filter((s) => s !== currentSlug)
    .map((s) => products.find((p) => p.slug === s))
    .filter(Boolean)
    .slice(0, 6) as Product[];

  if (recentProducts.length === 0) return null;

  return (
    <section className="mt-8">
      <h2 className="mb-3 text-base font-bold text-[var(--foreground)]">최근 본 제품</h2>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-6">
        {recentProducts.map((p) => (
          <Link
            key={p.slug}
            href={`/product/${p.slug}`}
            className="flex flex-col rounded-xl border border-[#e8e6e3] bg-white p-3 hover:border-[var(--accent)] hover:bg-[var(--accent-light)]"
          >
            <p className="text-[10px] text-[var(--foreground-muted)]">{p.brand}</p>
            <p className="mt-0.5 line-clamp-2 min-h-[2.4rem] text-xs font-semibold leading-tight text-[var(--foreground)]">
              {p.name}
            </p>
            <p className="mt-1.5 text-xs font-bold text-[var(--accent)]">단백질 {p.proteinPerServing}g</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
