"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import type { ProductDetailProps } from "../data/products";
import { type ProductCategory } from "../lib/categories";
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
};

type PersistedFilterState = {
  drinkFilters: DrinkFilters;
  barFilters: BarFilters;
  yogurtFilters: YogurtFilters;
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

function getPersistedFilterState(storageKey: string): Partial<PersistedFilterState> | null {
  if (typeof window === "undefined") return null;

  const rawState = window.sessionStorage.getItem(storageKey);
  if (!rawState) return null;

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
  productType: ProductCategory,
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
  const { productType, products, curationSlug, categoryCounts, storageKey, initialPersistedState } = props;
  const [drinkFilters, setDrinkFilters] = useState<DrinkFilters>(
    () => initialPersistedState?.drinkFilters ?? defaultDrinkFilters,
  );
  const [barFilters, setBarFilters] = useState<BarFilters>(
    () => initialPersistedState?.barFilters ?? defaultBarFilters,
  );
  const [yogurtFilters, setYogurtFilters] = useState<YogurtFilters>(
    () => initialPersistedState?.yogurtFilters ?? defaultYogurtFilters,
  );
  const [sort, setSort] = useState<SortOptionValue>(() => normalizeSortValue(initialPersistedState?.sort));
  const [page, setPage] = useState(() =>
    typeof initialPersistedState?.page === "number" && initialPersistedState.page > 0
      ? initialPersistedState.page
      : 1,
  );
  const [isDesktop, setIsDesktop] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(() => initialPersistedState?.searchQuery ?? "");

  const filters =
    productType === "drink"
      ? drinkFilters
      : productType === "bar"
        ? barFilters
        : productType === "yogurt"
          ? yogurtFilters
          : null;

  const curationFiltered = useMemo(() => {
    if (productType === "yogurt" || productType === "shake") {
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
    return curationFiltered.filter((product) => product.productType === "shake");
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
    if (productType === "yogurt") {
      setYogurtFilters(defaultYogurtFilters);
    }
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

  return (
    <>
      <div className="mt-3">
        <CategoryTabs
          activeCategory={productType}
          counts={categoryCounts}
          stickyMobile
        />
      </div>

      {productType !== "shake" ? (
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
        </>
      ) : (
        <div className="mt-3 rounded-2xl border border-[var(--border)] bg-[var(--background-card)] p-4">
          <p className="text-sm font-semibold text-[var(--foreground)]">쉐이크 카테고리</p>
          <p className="mt-1 text-sm leading-6 text-[var(--foreground-muted)]">
            파우치형 중심의 간편 섭취 쉐이크만 포함할 예정입니다. 이번 버전에서는 카테고리 구조와 정보 UI를 먼저 정리했고,
            제품 데이터는 이후 같은 기준으로 추가할 수 있도록 분리해 두었습니다.
          </p>
        </div>
      )}

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

      <div className="mt-1.5" style={{ marginTop: isDesktop ? "6px" : "8px" }}>
        <SortBar total={searched.length} sort={sort} onSortChange={handleSortChange} />
      </div>

      {visible.length === 0 ? (
        <div className="mt-4 rounded-2xl border border-[var(--border)] bg-[var(--background-card)] px-5 py-8 text-center">
          <p className="text-sm font-semibold text-[var(--foreground)]">표시할 제품이 없습니다.</p>
          <p className="mt-1 text-sm text-[var(--foreground-muted)]">
            {productType === "shake"
              ? "쉐이크 데이터가 아직 등록되지 않았습니다."
              : "검색어나 필터 조건을 조정해 다시 확인해보세요."}
          </p>
        </div>
      ) : (
        <section className="product-grid mt-3 bg-white" style={{ marginTop: isDesktop ? "12px" : "8px" }} aria-label="제품 목록">
          {visible.map((product, idx) => (
            <ProductCard
              key={product.slug ?? `${product.brand}-${product.name}`}
              {...product}
              priority={idx < 4}
            />
          ))}
        </section>
      )}

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

      {productType === "shake" ? (
        <div className="mt-4">
          <Link
            href="/recommend"
            className="inline-flex rounded-full border border-[var(--border)] bg-white px-4 py-2 text-sm font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--accent-light)]"
          >
            추천 페이지에서도 쉐이크 카테고리 구조 확인하기
          </Link>
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
