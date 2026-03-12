"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ProductDetailProps } from "../data/products";
import { applyCurationToCategoryProducts, getCurationDefinition } from "../lib/curationSystem";
import {
  defaultBarFilters,
  defaultDrinkFilters,
  filterBarProducts,
  filterDrinkProducts,
  getCapacityMl,
  type BarFilters,
  type DrinkFilters,
} from "../lib/productFilters";
import { getPopularityScore } from "../lib/productPopularity";
import FilterSection from "./FilterSection";
import ProductCard from "./ProductCard";
import ProductTopFivePopover from "./ProductTopFivePopover";
import QuickCuration from "./QuickCuration";
import SearchBar from "./SearchBar";
import ServingBasisNotice from "./ServingBasisNotice";
import SortBar, { type SortOptionValue } from "./SortBar";

const PAGE_SIZE = 20;

type ProductListWithFiltersProps =
  | { productType: "drink"; products: ProductDetailProps[]; curationSlug?: string }
  | { productType: "bar"; products: ProductDetailProps[]; curationSlug?: string };

function getDensityValue(product: ProductDetailProps): number {
  const capacity = getCapacityMl(product);
  if (capacity <= 0) return 0;
  return ((product.proteinPerServing ?? 0) / capacity) * 100;
}

function getFallbackPopularity(index: number): number {
  return Math.max(100, 850 - index * 17);
}

function getRecommendedScore(
  product: ProductDetailProps,
  productType: "drink" | "bar",
  index: number,
): number {
  const density = getDensityValue(product);
  const protein = product.proteinPerServing ?? 0;
  const sugar = product.sugar ?? 0;
  const calories = product.calories ?? 0;
  const popularity = getPopularityScore(product, productType) ?? getFallbackPopularity(index);

  return density * 18 + protein * 2.5 + popularity * 0.01 - sugar * 4 - calories * 0.06;
}

function applySort(
  products: ProductDetailProps[],
  sort: SortOptionValue,
  productType: "drink" | "bar",
  allProducts: ProductDetailProps[],
): ProductDetailProps[] {
  const arr = [...products];

  switch (sort) {
    case "protein_desc":
      return arr.sort((a, b) => (b.proteinPerServing ?? 0) - (a.proteinPerServing ?? 0));
    case "density":
      return arr.sort((a, b) => getDensityValue(b) - getDensityValue(a));
    case "sugar_asc":
      return arr.sort((a, b) => (a.sugar ?? 0) - (b.sugar ?? 0));
    case "sugar_desc":
      return arr.sort((a, b) => (b.sugar ?? 0) - (a.sugar ?? 0));
    case "volume_desc":
      return arr.sort((a, b) => getCapacityMl(b) - getCapacityMl(a));
    case "volume_asc":
      return arr.sort((a, b) => getCapacityMl(a) - getCapacityMl(b));
    case "popular":
      return arr.sort((a, b) => {
        const aIndex = allProducts.indexOf(a);
        const bIndex = allProducts.indexOf(b);
        const aScore = getPopularityScore(a, productType) ?? getFallbackPopularity(aIndex);
        const bScore = getPopularityScore(b, productType) ?? getFallbackPopularity(bIndex);
        return bScore - aScore;
      });
    case "recommended":
    default:
      return arr.sort((a, b) => {
        const aIndex = allProducts.indexOf(a);
        const bIndex = allProducts.indexOf(b);
        return (
          getRecommendedScore(b, productType, bIndex) -
          getRecommendedScore(a, productType, aIndex)
        );
      });
  }
}

export default function ProductListWithFilters(props: ProductListWithFiltersProps) {
  const { productType, products, curationSlug } = props;
  const [drinkFilters, setDrinkFilters] = useState<DrinkFilters>(defaultDrinkFilters);
  const [barFilters, setBarFilters] = useState<BarFilters>(defaultBarFilters);
  const [sort, setSort] = useState<SortOptionValue>("recommended");
  const [page, setPage] = useState(1);
  const [isDesktop, setIsDesktop] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filters = productType === "drink" ? drinkFilters : barFilters;
  const activeCuration = curationSlug ? getCurationDefinition(curationSlug) : null;

  const curationFiltered = useMemo(
    () => applyCurationToCategoryProducts(products, productType, curationSlug),
    [curationSlug, productType, products],
  );

  const filtered = useMemo(
    () =>
      productType === "drink"
        ? filterDrinkProducts(curationFiltered, filters as DrinkFilters)
        : filterBarProducts(curationFiltered, filters as BarFilters),
    [curationFiltered, filters, productType],
  );

  const searched = useMemo(() => {
    const keyword = searchQuery.trim().toLowerCase();
    if (!keyword) return filtered;

    return filtered.filter((product) => {
      const haystack = [
        product.name,
        product.brand,
        product.flavor,
        product.slug,
        product.variant,
        ...(product.tags ?? []),
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return haystack.includes(keyword);
    });
  }, [filtered, searchQuery]);

  const sorted = useMemo(
    () => applySort(searched, sort, productType, curationFiltered),
    [searched, sort, productType, curationFiltered],
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const updateIsDesktop = () => setIsDesktop(mediaQuery.matches);

    updateIsDesktop();
    mediaQuery.addEventListener("change", updateIsDesktop);

    return () => {
      mediaQuery.removeEventListener("change", updateIsDesktop);
    };
  }, []);

  const visible = useMemo(
    () => (isDesktop ? sorted : sorted.slice(0, page * PAGE_SIZE)),
    [isDesktop, page, sorted],
  );
  const hasMore = visible.length < sorted.length;

  const handleDrinkFilterToggle = (key: keyof DrinkFilters, value: string) => {
    setPage(1);
    setDrinkFilters((prev) => {
      const current = prev[key];
      const next = current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value];
      return { ...prev, [key]: next };
    });
  };

  const handleBarFilterToggle = (key: keyof BarFilters, value: string) => {
    setPage(1);
    setBarFilters((prev) => {
      const current = prev[key];
      const next = current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value];
      return { ...prev, [key]: next };
    });
  };

  const handleResetFilters = () => {
    setPage(1);
    setSearchQuery("");
    if (productType === "drink") {
      setDrinkFilters(defaultDrinkFilters);
      return;
    }
    setBarFilters(defaultBarFilters);
  };

  const handleSortChange = (newSort: SortOptionValue) => {
    setPage(1);
    setSort(newSort);
  };

  const handleSearchChange = (value: string) => {
    setPage(1);
    setSearchQuery(value);
  };

  const pathname = usePathname();
  const isBar = pathname === "/bars";

  return (
    <>
      <div className="mt-3 md:hidden" style={{ marginTop: "12px" }}>
        <QuickCuration productType={productType} />
      </div>

      {activeCuration ? (
        <div
          className="mt-3 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[var(--border)] bg-[var(--background-card)] px-3 py-3"
          style={{ marginTop: "12px" }}
        >
          <div className="min-w-0">
            <p className="text-xs font-semibold text-[var(--foreground)]">
              {activeCuration.icon} {activeCuration.label} 큐레이션 적용 중
            </p>
            <p className="mt-1 text-xs leading-5 text-[var(--foreground-muted)]">
              현재 카테고리 안에서 {activeCuration.label} 조건에 맞는 제품만 비교하고 있습니다.
            </p>
          </div>
          <div className="flex items-center gap-2">
            {activeCuration.heroTitle ? (
              <Link
                href={`/curation/${activeCuration.slug}`}
                className="rounded-full border border-[var(--border)] bg-white px-3 py-1.5 text-xs font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--accent-light)]"
              >
                설명 보기
              </Link>
            ) : null}
            <Link
              href={productType === "bar" ? "/bars" : "/"}
              className="rounded-full border border-[var(--border)] bg-white px-3 py-1.5 text-xs font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--accent-light)]"
            >
              해제
            </Link>
          </div>
        </div>
      ) : null}

      <div
        className="mt-3 rounded-xl border border-[var(--border)] bg-[var(--filter-box-bg)]"
        style={{ marginTop: "12px", borderRadius: "12px", padding: "10px 12px" }}
      >
        <div className="hidden md:block">
          <SearchBar value={searchQuery} onChange={handleSearchChange} />
        </div>
        <div className={isDesktop ? "mt-1.5" : ""}>
          {productType === "drink" ? (
            <FilterSection
              productType="drink"
              filters={filters as DrinkFilters}
              onFilterToggle={handleDrinkFilterToggle}
              onResetFilters={handleResetFilters}
              mobileToolbarSlot={
                <button
                  type="button"
                  onClick={() => setMobileSearchOpen(true)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full text-[#374151] transition-colors hover:bg-white/70 md:hidden"
                  aria-label="검색 열기"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              }
              desktopFooterSlot={<QuickCuration productType={productType} variant="inline" />}
            />
          ) : (
            <FilterSection
              productType="bar"
              filters={filters as BarFilters}
              onFilterToggle={handleBarFilterToggle}
              onResetFilters={handleResetFilters}
              mobileToolbarSlot={
                <button
                  type="button"
                  onClick={() => setMobileSearchOpen(true)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full text-[#374151] transition-colors hover:bg-white/70 md:hidden"
                  aria-label="검색 열기"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              }
              desktopFooterSlot={<QuickCuration productType={productType} variant="inline" />}
            />
          )}
        </div>
      </div>

      {mobileSearchOpen ? (
        <div
          className="fixed inset-0 z-[120] bg-black/35 px-4 py-6 md:hidden"
          onClick={() => setMobileSearchOpen(false)}
        >
          <div
            className="mx-auto mt-16 max-w-[560px] rounded-2xl bg-white p-3 shadow-xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center gap-2">
              <SearchBar
                value={searchQuery}
                onChange={handleSearchChange}
                autoFocus
                className="flex-1"
              />
              <button
                type="button"
                onClick={() => setMobileSearchOpen(false)}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full text-[#374151] transition-colors hover:bg-[#f3f4f6]"
                aria-label="검색 닫기"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <p className="mt-2 px-1 text-xs text-[var(--foreground-muted)]">
              셀렉스, 더단백, 하이뮨처럼 제품명이나 브랜드명으로 검색할 수 있습니다.
            </p>
          </div>
        </div>
      ) : null}

      <div
        className="mt-3 flex flex-col gap-2 min-[360px]:flex-row min-[360px]:items-center min-[360px]:justify-between"
        style={{ marginTop: "12px" }}
      >
        <div className="flex min-w-0 gap-2 overflow-x-auto pb-1">
          <Link
            href="/"
            className={`rounded-full px-3.5 py-1 text-sm font-medium transition-colors ${
              !isBar
                ? "bg-[var(--accent)] text-white"
                : "border border-[var(--border)] bg-white text-[var(--foreground-muted)] hover:text-[var(--foreground)]"
            }`}
            style={{ fontWeight: 400, whiteSpace: "nowrap" }}
          >
            단백질 음료
          </Link>
          <Link
            href="/bars"
            className={`rounded-full px-3.5 py-1 text-sm font-medium transition-colors ${
              isBar
                ? "bg-[var(--accent)] text-white"
                : "border border-[var(--border)] bg-white text-[var(--foreground-muted)] hover:text-[var(--foreground)]"
            }`}
            style={{ fontWeight: 400, whiteSpace: "nowrap" }}
          >
            단백질 바
          </Link>
        </div>

        <ProductTopFivePopover productType={productType} products={products} />
      </div>

      <div className="mt-2" style={{ marginTop: "8px" }}>
        <SortBar
          total={searched.length}
          categoryLabel={productType === "bar" ? "단백질 바" : "단백질 음료"}
          sort={sort}
          onSortChange={handleSortChange}
        />
      </div>

      <section className="product-grid mt-3 bg-white" style={{ marginTop: "12px" }} aria-label="제품 목록">
        {visible.map((product, idx) => (
          <ProductCard
            key={product.slug ?? `${product.brand}-${product.name}`}
            {...product}
            priority={idx < 4}
          />
        ))}
      </section>

      {productType === "bar" ? <ServingBasisNotice className="mt-4" /> : null}

      {!isDesktop && hasMore ? (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setPage((current) => current + 1)}
            className="rounded-full border border-[var(--border)] bg-white px-6 py-2.5 text-sm font-medium text-[var(--foreground)] transition-colors hover:border-[var(--accent)] hover:bg-[var(--accent-light)] hover:text-[var(--accent)]"
          >
            더보기 ({sorted.length - visible.length}개 남음)
          </button>
        </div>
      ) : null}
    </>
  );
}
