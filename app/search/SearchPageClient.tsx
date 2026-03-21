"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ProductCard from "../components/ProductCard";

interface ProductEntry {
  slug: string;
  name: string;
  brand: string;
  category: string;
  protein: number;
  calories: number | null;
  sugar: number | null;
}

interface ProductsJson {
  products: ProductEntry[];
}

const CATEGORY_LABEL: Record<string, string> = {
  drink: "음료",
  bar: "바",
  yogurt: "요거트",
  shake: "쉐이크",
};

const CATEGORY_ORDER = ["drink", "bar", "yogurt", "shake"];

export default function SearchPageClient({ initialQuery }: { initialQuery: string }) {
  const [query, setQuery] = useState(initialQuery);
  const [allProducts, setAllProducts] = useState<ProductEntry[]>([]);
  const [loaded, setLoaded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    fetch("/products.json")
      .then((r) => r.json())
      .then((data: ProductsJson) => {
        setAllProducts(data.products ?? []);
        setLoaded(true);
      })
      .catch(() => setLoaded(true));
  }, []);

  useEffect(() => {
    inputRef.current?.focus();
  }, [loaded]);

  const trimmed = query.trim().toLowerCase();
  const filtered =
    trimmed.length >= 1
      ? allProducts.filter(
          (p) =>
            p.name.toLowerCase().includes(trimmed) ||
            p.brand.toLowerCase().includes(trimmed),
        )
      : [];

  const grouped = CATEGORY_ORDER.reduce<Record<string, ProductEntry[]>>((acc, cat) => {
    const items = filtered.filter((p) => p.category === cat);
    if (items.length > 0) acc[cat] = items;
    return acc;
  }, {});

  const totalCount = filtered.length;

  const handleQueryChange = (value: string) => {
    setQuery(value);
    const params = new URLSearchParams();
    if (value.trim()) params.set("q", value.trim());
    router.replace(`/search${value.trim() ? `?${params.toString()}` : ""}`, { scroll: false });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-[var(--foreground)] mb-6">제품 검색</h1>

      <div className="relative mb-6">
        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--foreground-muted)]">
          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </span>
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => handleQueryChange(e.target.value)}
          placeholder="브랜드 또는 제품명으로 검색"
          className="w-full rounded-xl border border-[#e8e6e3] bg-[#fffdf8] pl-11 pr-4 py-3 text-sm focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
          autoComplete="off"
        />
        {query && (
          <button
            type="button"
            onClick={() => handleQueryChange("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--foreground-muted)] hover:text-[var(--foreground)]"
            aria-label="검색어 지우기"
          >
            ✕
          </button>
        )}
      </div>

      {!loaded && (
        <div className="py-20 text-center text-sm text-[var(--foreground-muted)]">로딩 중...</div>
      )}

      {loaded && !trimmed && (
        <div className="py-16 text-center text-sm text-[var(--foreground-muted)]">
          브랜드명 또는 제품명을 입력하세요.
        </div>
      )}

      {loaded && trimmed && totalCount === 0 && (
        <div className="py-16 text-center">
          <p className="text-base font-semibold text-[var(--foreground)]">검색 결과가 없습니다</p>
          <p className="mt-1 text-sm text-[var(--foreground-muted)]">다른 키워드로 다시 시도해보세요.</p>
        </div>
      )}

      {loaded && trimmed && totalCount > 0 && (
        <div className="space-y-8">
          <p className="text-sm text-[var(--foreground-muted)]">
            <span className="font-semibold text-[var(--foreground)]">{totalCount}개</span> 결과
          </p>

          {Object.entries(grouped).map(([cat, items]) => (
            <section key={cat}>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-base font-bold text-[var(--foreground)]">
                  {CATEGORY_LABEL[cat] ?? cat}
                  <span className="ml-1.5 text-sm font-normal text-[var(--foreground-muted)]">
                    {items.length}개
                  </span>
                </h2>
              </div>
              <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 md:gap-4">
                {items.slice(0, 8).map((product) => (
                  <ProductCard
                    key={product.slug}
                    slug={product.slug}
                    brand={product.brand}
                    name={product.name}
                    capacity=""
                    tags={[]}
                    proteinPerServing={product.protein}
                    calories={product.calories ?? undefined}
                    sugar={product.sugar ?? undefined}
                    density="-"
                    productType={product.category as "drink" | "bar" | "yogurt" | "shake"}
                  />
                ))}
              </div>
              {items.length > 8 && (
                <p className="mt-3 text-xs text-[var(--foreground-muted)]">
                  {items.length - 8}개 더 있음 —{" "}
                  <Link href={`/${cat === "drink" ? "" : cat}`} className="text-[var(--accent)] hover:underline">
                    전체 {CATEGORY_LABEL[cat]} 보기
                  </Link>
                </p>
              )}
            </section>
          ))}
        </div>
      )}
    </div>
  );
}
