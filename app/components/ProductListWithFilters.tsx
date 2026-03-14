"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import type { ProductDetailProps } from "../data/products";
import { applyCurationToCategoryProducts } from "../lib/curationSystem";
import {
  defaultBarFilters,
  defaultDrinkFilters,
  defaultYogurtFilters,
  filterBarProducts,
  filterDrinkProducts,
  filterYogurtProducts,
  getCapacityMl,
  getYogurtFlavorCategory,
  getYogurtTypeCategory,
  type BarFilters,
  type DrinkFilters,
  type YogurtFilters,
} from "../lib/productFilters";
import { getPopularityScore } from "../lib/productPopularity";
import FilterSection from "./FilterSection";
import ProductCard from "./ProductCard";
import QuickCuration from "./QuickCuration";
import SearchBar from "./SearchBar";
import ServingBasisNotice from "./ServingBasisNotice";
import SortBar, { type SortOptionValue } from "./SortBar";

const PAGE_SIZE = 20;

type ProductListWithFiltersProps =
  | { productType: "drink"; products: ProductDetailProps[]; curationSlug?: string }
  | { productType: "bar"; products: ProductDetailProps[]; curationSlug?: string }
  | { productType: "yogurt"; products: ProductDetailProps[]; curationSlug?: string };

type PersistedFilterState = {
  drinkFilters: DrinkFilters;
  barFilters: BarFilters;
  yogurtFilters: YogurtFilters;
  sort: SortOptionValue;
  page: number;
  searchQuery: string;
};

function getPersistedFilterState(storageKey: string): Partial<PersistedFilterState> | null {
  if (typeof window === "undefined") {
    return null;
  }

  const rawState = window.sessionStorage.getItem(storageKey);
  if (!rawState) {
    return null;
  }

  try {
    return JSON.parse(rawState) as Partial<PersistedFilterState>;
  } catch {
    window.sessionStorage.removeItem(storageKey);
    return null;
  }
}

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
  productType: "drink" | "bar" | "yogurt",
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
  productType: "drink" | "bar" | "yogurt",
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

type ProductListWithFiltersInnerProps = ProductListWithFiltersProps & {
  storageKey: string;
  pathname: string;
  initialPersistedState: Partial<PersistedFilterState> | null;
};

function ProductListWithFiltersInner(props: ProductListWithFiltersInnerProps) {
  const { productType, products, curationSlug } = props;
  const { initialPersistedState, pathname, storageKey } = props;
  const [drinkFilters, setDrinkFilters] = useState<DrinkFilters>(
    () => initialPersistedState?.drinkFilters ?? defaultDrinkFilters,
  );
  const [barFilters, setBarFilters] = useState<BarFilters>(
    () => initialPersistedState?.barFilters ?? defaultBarFilters,
  );
  const [yogurtFilters, setYogurtFilters] = useState<YogurtFilters>(
    () => initialPersistedState?.yogurtFilters ?? defaultYogurtFilters,
  );
  const [sort, setSort] = useState<SortOptionValue>(() => initialPersistedState?.sort ?? "recommended");
  const [page, setPage] = useState(() =>
    typeof initialPersistedState?.page === "number" && initialPersistedState.page > 0
      ? initialPersistedState.page
      : 1,
  );
  const [isDesktop, setIsDesktop] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(() => initialPersistedState?.searchQuery ?? "");
  const isBar = pathname === "/bars";
  const isYogurt = pathname === "/yogurt";

  const filters =
    productType === "drink"
      ? drinkFilters
      : productType === "bar"
        ? barFilters
        : yogurtFilters;

  const curationFiltered = useMemo(
    () =>
      productType === "yogurt"
        ? products
        : applyCurationToCategoryProducts(products, productType, curationSlug),
    [curationSlug, productType, products],
  );

  const filtered = useMemo(() => {
    if (productType === "drink") {
      return filterDrinkProducts(curationFiltered, filters as DrinkFilters);
    }
    if (productType === "bar") {
      return filterBarProducts(curationFiltered, filters as BarFilters);
    }
    return filterYogurtProducts(curationFiltered, filters as YogurtFilters);
  }, [curationFiltered, filters, productType]);

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
        product.yogurtType,
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

  useEffect(() => {
    if (typeof window === "undefined") return;

    const persistedState: PersistedFilterState = {
      drinkFilters,
      barFilters,
      yogurtFilters,
      sort,
      page,
      searchQuery,
    };

    window.sessionStorage.setItem(storageKey, JSON.stringify(persistedState));
  }, [barFilters, drinkFilters, page, searchQuery, sort, storageKey, yogurtFilters]);

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

  const handleYogurtFilterToggle = (key: keyof YogurtFilters, value: string) => {
    setPage(1);
    setYogurtFilters((prev) => {
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
    if (productType === "bar") {
      setBarFilters(defaultBarFilters);
      return;
    }
    setYogurtFilters(defaultYogurtFilters);
  };

  const handleSortChange = (newSort: SortOptionValue) => {
    setPage(1);
    setSort(newSort);
  };

  const handleSearchChange = (value: string) => {
    setPage(1);
    setSearchQuery(value);
  };

  const brandOptions = useMemo(
    () =>
      [...new Set(products.map((product) => product.brand).filter(Boolean))].sort((a, b) =>
        a.localeCompare(b, "ko"),
      ),
    [products],
  );
  const yogurtTypeOptions = useMemo(
    () =>
      productType === "yogurt"
        ? [...new Set(products.map((product) => getYogurtTypeCategory(product)).filter(Boolean))].sort((a, b) =>
            a.localeCompare(b, "ko"),
          )
        : [],
    [productType, products],
  );
  const yogurtFlavorOptions = useMemo(
    () =>
      productType === "yogurt"
        ? [...new Set(products.map((product) => getYogurtFlavorCategory(product)).filter(Boolean))].sort((a, b) =>
            a.localeCompare(b, "ko"),
          )
        : [],
    [productType, products],
  );

  const mobileSearchButton = (
    <button
      type="button"
      onClick={() => setMobileSearchOpen(true)}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full text-[#374151] transition-colors hover:bg-white/70 md:hidden"
      aria-label="寃???닿린"
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
  );

  return (
    <>
      <div className="mt-3 md:hidden" style={{ marginTop: "12px" }}>
        <QuickCuration productType={productType} />
      </div>

      <div
        className="mt-3 rounded-xl border border-[var(--border)] bg-[var(--filter-box-bg)]"
        style={{ marginTop: isDesktop ? "12px" : "10px", borderRadius: "12px", padding: isDesktop ? "10px 12px" : "3px 6px" }}
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
                mobileToolbarSlot={mobileSearchButton}
                drinkBrandOptions={brandOptions}
                desktopFooterSlot={<QuickCuration productType={productType} variant="inline" />}
              />
            ) : productType === "bar" ? (
              <FilterSection
                productType="bar"
                filters={filters as BarFilters}
                onFilterToggle={handleBarFilterToggle}
                onResetFilters={handleResetFilters}
                mobileToolbarSlot={mobileSearchButton}
                barBrandOptions={brandOptions}
                desktopFooterSlot={<QuickCuration productType={productType} variant="inline" />}
              />
            ) : (
              <FilterSection
                productType="yogurt"
                filters={filters as YogurtFilters}
                onFilterToggle={handleYogurtFilterToggle}
                onResetFilters={handleResetFilters}
                mobileToolbarSlot={mobileSearchButton}
                yogurtBrandOptions={brandOptions}
                yogurtTypeOptions={yogurtTypeOptions}
                yogurtFlavorOptions={yogurtFlavorOptions}
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
                aria-label="寃???リ린"
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
              ?쒗뭹紐? 釉뚮옖?? 留? ?좏삎?쇰줈 寃?됲븷 ???덉뒿?덈떎.
            </p>
          </div>
        </div>
      ) : null}

      <div className="mt-3" style={{ marginTop: "12px" }}>
        <div className="flex min-w-0 gap-2 overflow-x-auto pb-1">
          <Link
            href="/"
            className={`rounded-full px-3.5 py-1 text-sm font-medium transition-colors ${
              !isBar && !isYogurt
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
          <Link
            href="/yogurt"
            className={`rounded-full px-3.5 py-1 text-sm font-medium transition-colors ${
              isYogurt
                ? "bg-[var(--accent)] text-white"
                : "border border-[var(--border)] bg-white text-[var(--foreground-muted)] hover:text-[var(--foreground)]"
            }`}
            style={{ fontWeight: 400, whiteSpace: "nowrap" }}
          >
            단백질 요거트
          </Link>
        </div>
      </div>

      <div className="mt-1.5" style={{ marginTop: isDesktop ? "6px" : "4px" }}>
        <SortBar
          total={searched.length}
          sort={sort}
          onSortChange={handleSortChange}
        />
      </div>

      <section className="product-grid mt-3 bg-white" style={{ marginTop: isDesktop ? "12px" : "8px" }} aria-label="?쒗뭹 紐⑸줉">
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
            ?붾낫湲?({sorted.length - visible.length}媛??⑥쓬)
          </button>
        </div>
      ) : null}
    </>
  );
}

export default function ProductListWithFilters(props: ProductListWithFiltersProps) {
  const pathname = usePathname();
  const storageKey = useMemo(
    () => `product-list-state:${pathname}:${props.productType}:${props.curationSlug ?? "all"}`,
    [pathname, props.curationSlug, props.productType],
  );
  const initialPersistedState = getPersistedFilterState(storageKey);

  return (
    <ProductListWithFiltersInner
      key={storageKey}
      {...props}
      pathname={pathname}
      storageKey={storageKey}
      initialPersistedState={initialPersistedState}
    />
  );
}


