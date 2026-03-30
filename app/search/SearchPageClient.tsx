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
const START_LINKS = [
  { href: "/guides/product-selection-comparison/selex-vs-himune", label: "셀렉스 vs 하이뮨", desc: "브랜드 비교부터 시작" },
  { href: "/guides/product-selection-comparison/high-protein-40g-comparison", label: "40g 이상 비교", desc: "고단백 제품만 보기" },
  { href: "/guides/product-selection-comparison/morning-protein-products-guide", label: "아침 대용 찾기", desc: "출근 전 바로 고르기" },
  { href: "/recommend", label: "맞춤 추천 받기", desc: "조건부터 좁히기" },
] as const;

export default function SearchPageClient({ initialQuery }: { initialQuery: string }) {
  const [query, setQuery] = useState(initialQuery);
  const [allProducts, setAllProducts] = useState<ProductEntry[]>([]);
  const [loaded, setLoaded] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    fetch("/products.json")
      .then((response) => response.json())
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
          (product) =>
            product.name.toLowerCase().includes(trimmed) ||
            product.brand.toLowerCase().includes(trimmed),
        )
      : [];

  const grouped = CATEGORY_ORDER.reduce<Record<string, ProductEntry[]>>((accumulator, category) => {
    const items = filtered.filter((product) => product.category === category);
    if (items.length > 0) accumulator[category] = items;
    return accumulator;
  }, {});

  const totalCount = filtered.length;
  const matchedBrands = Array.from(new Set(filtered.map((product) => product.brand))).slice(0, 3);
  const topCategory = CATEGORY_ORDER.find((category) => grouped[category]?.length);

  const handleQueryChange = (value: string) => {
    setQuery(value);
    const params = new URLSearchParams();
    if (value.trim()) params.set("q", value.trim());
    router.replace(`/search${value.trim() ? `?${params.toString()}` : ""}`, { scroll: false });
  };

  return (
    <div>
      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
          Search
        </p>
        <h1 className="mt-2 text-2xl font-bold text-[var(--foreground)] md:text-3xl">
          단백질 제품 검색
        </h1>
        <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)] md:text-base">
          브랜드명이나 제품명으로 검색하면 제품 상세를 보고, 바로 비교 페이지나 추천 흐름까지 이어서 볼 수 있습니다.
        </p>
      </div>

      <div className="relative mb-6 mt-6">
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
          placeholder="브랜드명 또는 제품명으로 검색"
          className="w-full rounded-xl border border-[#e8e6e3] bg-[#fffdf8] py-3 pl-11 pr-4 text-sm focus:border-[var(--accent)] focus:outline-none focus:ring-1 focus:ring-[var(--accent)]"
          autoComplete="off"
        />
        {query && (
          <button
            type="button"
            onClick={() => handleQueryChange("")}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--foreground-muted)] hover:text-[var(--foreground)]"
            aria-label="검색어 지우기"
          >
            ×
          </button>
        )}
      </div>

      {!loaded && (
        <div className="py-20 text-center text-sm text-[var(--foreground-muted)]">불러오는 중입니다.</div>
      )}

      {loaded && !trimmed && (
        <div className="space-y-4">
          <div className="rounded-2xl border border-[#ebe5dc] bg-[#fcfaf6] px-5 py-10 text-center text-sm text-[var(--foreground-muted)]">
            브랜드명 또는 제품명을 입력해보세요. 예: 셀렉스, 하이뮨, 랩노쉬, 뉴케어
          </div>
          <section className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {START_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-2xl border border-[#e8e6e3] bg-[#fffdf8] px-4 py-4 transition-colors hover:bg-[var(--accent-light)]"
              >
                <p className="text-sm font-semibold text-[var(--foreground)]">{link.label}</p>
                <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{link.desc}</p>
              </Link>
            ))}
          </section>
        </div>
      )}

      {loaded && trimmed && totalCount === 0 && (
        <div className="py-16 text-center">
          <p className="text-base font-semibold text-[var(--foreground)]">검색 결과가 없습니다</p>
          <p className="mt-1 text-sm text-[var(--foreground-muted)]">
            다른 키워드로 다시 검색하거나 브랜드명으로 시도해보세요.
          </p>
        </div>
      )}

      {loaded && trimmed && totalCount > 0 && (
        <div className="space-y-8">
          <div className="space-y-3">
            <p className="text-sm text-[var(--foreground-muted)]">
              <span className="font-semibold text-[var(--foreground)]">{totalCount}개</span> 결과
            </p>
            <div className="rounded-2xl border border-[#ebe5dc] bg-[#fcfaf6] px-4 py-4">
              <p className="text-sm font-semibold text-[var(--foreground)]">
                {matchedBrands.length > 0
                  ? `${matchedBrands.join(", ")} 관련 제품을 먼저 찾았습니다.`
                  : "검색 결과를 먼저 확인해보세요."}
              </p>
              <p className="mt-1 text-sm leading-6 text-[var(--foreground-muted)]">
                {topCategory
                  ? `${CATEGORY_LABEL[topCategory]} 카테고리에서 가장 많이 나왔습니다. 제품 상세를 본 뒤 비교나 추천으로 이어가면 더 빠르게 좁힐 수 있습니다.`
                  : "제품 상세를 본 뒤 비교나 추천으로 이어가면 더 빠르게 좁힐 수 있습니다."}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Link
                  href="/products"
                  className="rounded-full border border-[#d8d5d0] bg-white px-3 py-1.5 text-xs font-semibold text-[var(--foreground)] transition-colors hover:bg-[var(--accent-light)]"
                >
                  전체 제품 보기
                </Link>
                <Link
                  href="/compare"
                  className="rounded-full border border-[#d8d5d0] bg-white px-3 py-1.5 text-xs font-semibold text-[var(--foreground)] transition-colors hover:bg-[var(--accent-light)]"
                >
                  비교 시작하기
                </Link>
                <Link
                  href="/recommend"
                  className="rounded-full border border-[#d8d5d0] bg-white px-3 py-1.5 text-xs font-semibold text-[var(--foreground)] transition-colors hover:bg-[var(--accent-light)]"
                >
                  맞춤 추천 받기
                </Link>
              </div>
            </div>
          </div>

          {Object.entries(grouped).map(([category, items]) => (
            <section key={category}>
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-base font-bold text-[var(--foreground)]">
                  {CATEGORY_LABEL[category] ?? category}
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
                  {items.length - 8}개가 더 있습니다.{" "}
                  <Link
                    href={`/${category === "drink" ? "" : category}`}
                    className="text-[var(--accent)] hover:underline"
                  >
                    전체 {CATEGORY_LABEL[category]} 보기
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
