"use client";

import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import type { ProductDetailProps } from "../data/products";
import { type ProductCategory } from "../lib/categories";
import { applyCurationToCategoryProducts } from "../lib/curationSystem";
import {
  defaultBarFilters,
  defaultDrinkFilters,
  defaultShakeFilters,
  defaultYogurtFilters,
  filterBarProducts,
  filterDrinkProducts,
  filterShakeProducts,
  filterYogurtProducts,
  getCapacityMl,
  getYogurtFlavorCategory,
  getYogurtTypeCategory,
  type BarFilters,
  type DrinkFilters,
  type ShakeFilters,
  type YogurtFilters,
} from "../lib/productFilters";
import { getPopularityScore } from "../lib/productPopularity";
import { trackEvent } from "@/lib/gtag";
import CategoryTabs from "./CategoryTabs";
import FilterSection from "./FilterSection";
import ProductCard from "./ProductCard";
import QuickCuration from "./QuickCuration";
import SearchBar from "./SearchBar";
import ServingBasisNotice from "./ServingBasisNotice";
import SortBar, { sortOptions, type SortOptionValue } from "./SortBar";

const PAGE_SIZE = 20;

type ProductListWithFiltersProps = {
  productType: ProductCategory;
  products: ProductDetailProps[];
  curationSlug?: string;
  categoryCounts?: Partial<Record<ProductCategory, number>>;
  stickyTabs?: boolean;
  tabsPlacement?: "top" | "before_grid";
};

type PersistedFilterState = {
  drinkFilters: DrinkFilters;
  barFilters: BarFilters;
  yogurtFilters: YogurtFilters;
  shakeFilters: ShakeFilters;
  sort: SortOptionValue;
  page: number;
  searchQuery: string;
};

function normalizeSortValue(value: SortOptionValue | null | undefined): SortOptionValue {
  if (value && sortOptions.some((option) => option.value === value)) {
    return value;
  }
  return "recommended";
}

function toStringArray(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((item): item is string => typeof item === "string");
}

function normalizeDrinkFilters(value: unknown): DrinkFilters {
  const candidate = (value ?? {}) as Partial<Record<keyof DrinkFilters, unknown>>;
  return {
    brand: toStringArray(candidate.brand),
    protein: toStringArray(candidate.protein),
    source: toStringArray(candidate.source),
    taste: toStringArray(candidate.taste),
    volume: toStringArray(candidate.volume),
  };
}

function normalizeBarFilters(value: unknown): BarFilters {
  const candidate = (value ?? {}) as Partial<Record<keyof BarFilters, unknown>>;
  return {
    brand: toStringArray(candidate.brand),
    protein: toStringArray(candidate.protein),
    sugar: toStringArray(candidate.sugar),
    weight: toStringArray(candidate.weight),
  };
}

function normalizeYogurtFilters(value: unknown): YogurtFilters {
  const candidate = (value ?? {}) as Partial<Record<keyof YogurtFilters, unknown>>;
  return {
    brand: toStringArray(candidate.brand),
    protein: toStringArray(candidate.protein),
    sugar: toStringArray(candidate.sugar),
    yogurtType: toStringArray(candidate.yogurtType),
    flavor: toStringArray(candidate.flavor),
  };
}

function normalizeShakeFilters(value: unknown): ShakeFilters {
  const candidate = (value ?? {}) as Partial<Record<keyof ShakeFilters, unknown>>;
  return {
    brand: toStringArray(candidate.brand),
    protein: toStringArray(candidate.protein),
    sugar: toStringArray(candidate.sugar),
    useCase: toStringArray(candidate.useCase),
    fiber: toStringArray(candidate.fiber),
    taste: toStringArray(candidate.taste),
  };
}

function getPersistedFilterState(storageKey: string): Partial<PersistedFilterState> | null {
  if (typeof window === "undefined") return null;

  const rawState = window.sessionStorage.getItem(storageKey);
  if (!rawState) return null;

  try {
    const parsed = JSON.parse(rawState) as Partial<PersistedFilterState>;

    return {
      ...parsed,
      drinkFilters: normalizeDrinkFilters(parsed.drinkFilters),
      barFilters: normalizeBarFilters(parsed.barFilters),
      yogurtFilters: normalizeYogurtFilters(parsed.yogurtFilters),
      shakeFilters: normalizeShakeFilters(parsed.shakeFilters),
      sort: normalizeSortValue(parsed.sort),
      page: typeof parsed.page === "number" && Number.isFinite(parsed.page) && parsed.page > 0 ? parsed.page : 1,
      searchQuery: typeof parsed.searchQuery === "string" ? parsed.searchQuery : "",
    };
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

function getPer100UnitValue(value: number | undefined, product: ProductDetailProps): number {
  if (value == null) return 0;

  const capacity = getCapacityMl(product);
  if (capacity <= 0) return value;

  return (value / capacity) * 100;
}

function getFallbackPopularity(index: number): number {
  return Math.max(100, 850 - index * 17);
}

function getRecommendedScore(
  product: ProductDetailProps,
  productType: ProductCategory,
  index: number,
): number {
  const density = getDensityValue(product);
  const popularity = getPopularityScore(product, productType) ?? getFallbackPopularity(index);

  if (productType === "yogurt") {
    const protein = getPer100UnitValue(product.proteinPerServing, product);
    const sugar = getPer100UnitValue(product.sugar, product);
    const calories = getPer100UnitValue(product.calories, product);

    return density * 18 + protein * 2.5 + popularity * 0.01 - sugar * 4 - calories * 0.06;
  }

  const protein = product.proteinPerServing ?? 0;
  const sugar = product.sugar ?? 0;
  const calories = product.calories ?? 0;

  return density * 18 + protein * 2.5 + popularity * 0.01 - sugar * 4 - calories * 0.06;
}

function applySort(
  products: ProductDetailProps[],
  sort: SortOptionValue,
  productType: ProductCategory,
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
  initialPersistedState: Partial<PersistedFilterState> | null;
};

function ProductListWithFiltersInner(props: ProductListWithFiltersInnerProps) {
  const {
    productType,
    products,
    curationSlug,
    categoryCounts,
    storageKey,
    initialPersistedState,
    stickyTabs = true,
    tabsPlacement = "top",
  } = props;
  const [drinkFilters, setDrinkFilters] = useState<DrinkFilters>(
    () => initialPersistedState?.drinkFilters ?? defaultDrinkFilters,
  );
  const [barFilters, setBarFilters] = useState<BarFilters>(
    () => initialPersistedState?.barFilters ?? defaultBarFilters,
  );
  const [yogurtFilters, setYogurtFilters] = useState<YogurtFilters>(
    () => initialPersistedState?.yogurtFilters ?? defaultYogurtFilters,
  );
  const [shakeFilters, setShakeFilters] = useState<ShakeFilters>(
    () => initialPersistedState?.shakeFilters ?? defaultShakeFilters,
  );
  const [sort, setSort] = useState<SortOptionValue>(
    () => normalizeSortValue(initialPersistedState?.sort),
  );
  const [page, setPage] = useState(() =>
    typeof initialPersistedState?.page === "number" && initialPersistedState.page > 0
      ? initialPersistedState.page
      : 1,
  );
  const [isDesktop, setIsDesktop] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(
    () => initialPersistedState?.searchQuery ?? "",
  );

  const filters =
    productType === "drink"
      ? drinkFilters
      : productType === "bar"
        ? barFilters
        : productType === "yogurt"
          ? yogurtFilters
          : shakeFilters;

  const curationFiltered = useMemo(() => {
    if (productType === "yogurt") {
      return products;
    }
    return applyCurationToCategoryProducts(products, productType, curationSlug);
  }, [curationSlug, productType, products]);

  const filtered = useMemo(() => {
    if (productType === "drink") {
      return filterDrinkProducts(curationFiltered, filters as DrinkFilters);
    }
    if (productType === "bar") {
      return filterBarProducts(curationFiltered, filters as BarFilters);
    }
    if (productType === "yogurt") {
      return filterYogurtProducts(curationFiltered, filters as YogurtFilters);
    }
    return filterShakeProducts(curationFiltered, filters as ShakeFilters);
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
      shakeFilters,
      sort,
      page,
      searchQuery,
    };

    window.sessionStorage.setItem(storageKey, JSON.stringify(persistedState));
  }, [barFilters, drinkFilters, page, searchQuery, shakeFilters, sort, storageKey, yogurtFilters]);

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

  const handleShakeFilterToggle = (key: keyof ShakeFilters, value: string) => {
    setPage(1);
    setShakeFilters((prev) => {
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
    if (productType === "yogurt") {
      setYogurtFilters(defaultYogurtFilters);
      return;
    }
    setShakeFilters(defaultShakeFilters);
  };

  const handleSortChange = (newSort: SortOptionValue) => {
    if (newSort !== sort) {
      trackEvent("sort_change", {
        from_sort: sort,
        to_sort: newSort,
        category: productType,
        total_results: searched.length,
        search_query: searchQuery.trim() || undefined,
      });
    }

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
        ? [...new Set(products.map((product) => getYogurtTypeCategory(product)).filter(Boolean))]
            .sort((a, b) => a.localeCompare(b, "ko"))
        : [],
    [productType, products],
  );
  const yogurtFlavorOptions = useMemo(
    () =>
      productType === "yogurt"
        ? [...new Set(products.map((product) => getYogurtFlavorCategory(product)).filter(Boolean))]
            .sort((a, b) => a.localeCompare(b, "ko"))
        : [],
    [productType, products],
  );

  const mobileSearchButton = (
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
  );

  const categoryTabs = (
    <div className="mt-2.5 md:mt-3">
      <CategoryTabs
        activeCategory={productType}
        counts={categoryCounts}
        stickyMobile={stickyTabs}
      />
    </div>
  );

  return (
    <>
      {tabsPlacement === "top" ? categoryTabs : null}

      <div className="mt-2.5 md:hidden" style={{ marginTop: "10px" }}>
        <QuickCuration productType={productType} />
      </div>

      <div
        className="mt-2.5 rounded-xl border border-[var(--border)] bg-[var(--filter-box-bg)]"
        style={{
          marginTop: isDesktop ? "12px" : "8px",
          borderRadius: "12px",
          padding: isDesktop ? "10px 12px" : "2px 5px",
        }}
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
          ) : productType === "yogurt" ? (
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
          ) : (
            <FilterSection
              productType="shake"
              filters={filters as ShakeFilters}
              onFilterToggle={handleShakeFilterToggle}
              onResetFilters={handleResetFilters}
              mobileToolbarSlot={mobileSearchButton}
              shakeBrandOptions={brandOptions}
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
              제품명, 브랜드, 맛, 유형으로 검색할 수 있습니다.
            </p>
          </div>
        </div>
      ) : null}

      <div className="mt-1.5" style={{ marginTop: isDesktop ? "6px" : "6px" }}>
        <SortBar total={searched.length} sort={sort} onSortChange={handleSortChange} />
      </div>

      {tabsPlacement === "before_grid" ? categoryTabs : null}

      {visible.length === 0 ? (
        <div className="mt-4 rounded-2xl border border-[var(--border)] bg-[var(--background-card)] px-5 py-8 text-center">
          <p className="text-sm font-semibold text-[var(--foreground)]">표시할 제품이 없습니다.</p>
          <p className="mt-1 text-sm text-[var(--foreground-muted)]">
            {productType === "shake"
              ? "쉐이크 데이터가 아직 등록되지 않았습니다."
              : "검색어 또는 필터 조건을 조정해 다시 확인해보세요."}
          </p>
        </div>
      ) : (
        <section
          className="product-grid mt-3 items-start bg-white"
          style={{ marginTop: isDesktop ? "12px" : "8px" }}
          aria-label="제품 목록"
        >
          {visible.map((product, idx) => (
            <ProductCard
              key={product.slug ?? `${product.brand}-${product.name}`}
              {...product}
              priority={idx < 4}
              productType={productType}
            />
          ))}
        </section>
      )}

      {productType === "bar" ? <ServingBasisNotice className="mt-4" /> : null}

      {!isDesktop && hasMore ? (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => {
              trackEvent("load_more_click", {
                category: productType,
                visible_count: visible.length,
                total_results: sorted.length,
                next_page: page + 1,
                search_query: searchQuery.trim() || undefined,
              });
              setPage((current) => current + 1);
            }}
            className="rounded-full border border-[var(--border)] bg-white px-6 py-2.5 text-sm font-medium text-[var(--foreground)] transition-colors hover:border-[var(--accent)] hover:bg-[var(--accent-light)] hover:text-[var(--accent)]"
          >
            더보기 ({sorted.length - visible.length}개 남음)
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
      storageKey={storageKey}
      initialPersistedState={initialPersistedState}
    />
  );
}
