"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ProductDetailProps } from "../data/products";
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
import SearchBar from "./SearchBar";
import SortBar, { type SortOptionValue } from "./SortBar";

const PAGE_SIZE = 20;

type ProductListWithFiltersProps =
  | { productType: "drink"; products: ProductDetailProps[] }
  | { productType: "bar"; products: ProductDetailProps[] };

function applySort(products: ProductDetailProps[], sort: SortOptionValue, productType: "drink" | "bar"): ProductDetailProps[] {
  const arr = [...products];
  switch (sort) {
    case "protein_desc":
      return arr.sort((a, b) => (b.proteinG ?? 0) - (a.proteinG ?? 0));
    case "density":
      return arr.sort((a, b) => {
        const da = getCapacityMl(a) > 0 ? (a.proteinG ?? 0) / getCapacityMl(a) : 0;
        const db = getCapacityMl(b) > 0 ? (b.proteinG ?? 0) / getCapacityMl(b) : 0;
        return db - da;
      });
    case "sugar_asc":
      return arr.sort((a, b) => (a.sugarG ?? 0) - (b.sugarG ?? 0));
    case "sugar_desc":
      return arr.sort((a, b) => (b.sugarG ?? 0) - (a.sugarG ?? 0));
    case "volume_desc":
      return arr.sort((a, b) => getCapacityMl(b) - getCapacityMl(a));
    case "volume_asc":
      return arr.sort((a, b) => getCapacityMl(a) - getCapacityMl(b));
    case "popular":
      return arr.sort((a, b) => {
        const sa = getPopularityScore(a, productType) ?? 0;
        const sb = getPopularityScore(b, productType) ?? 0;
        return sb - sa;
      });
    case "recommended":
    default:
      return arr;
  }
}

export default function ProductListWithFilters(props: ProductListWithFiltersProps) {
  const { productType, products } = props;
  const [drinkFilters, setDrinkFilters] = useState<DrinkFilters>(defaultDrinkFilters);
  const [barFilters, setBarFilters] = useState<BarFilters>(defaultBarFilters);
  const [sort, setSort] = useState<SortOptionValue>("recommended");
  const [page, setPage] = useState(1);

  const filters = productType === "drink" ? drinkFilters : barFilters;

  const filtered = useMemo(
    () =>
      productType === "drink"
        ? filterDrinkProducts(products, filters as DrinkFilters)
        : filterBarProducts(products, filters as BarFilters),
    [products, filters, productType],
  );

  const sorted = useMemo(() => applySort(filtered, sort, productType), [filtered, sort, productType]);

  const visible = useMemo(() => sorted.slice(0, page * PAGE_SIZE), [sorted, page]);
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

  const pathname = usePathname();
  const isBar = pathname === "/bars";

  return (
    <>
      <div
        className="mt-3 rounded-xl border border-[var(--border)] bg-[var(--filter-box-bg)]"
        style={{ marginTop: "12px", borderRadius: "12px", padding: "10px 12px" }}
      >
        <SearchBar />
        <div className="mt-1.5">
          {productType === "drink" ? (
            <FilterSection
              productType="drink"
              filters={filters as DrinkFilters}
              onFilterToggle={handleDrinkFilterToggle}
              onResetFilters={handleResetFilters}
            />
          ) : (
            <FilterSection
              productType="bar"
              filters={filters as BarFilters}
              onFilterToggle={handleBarFilterToggle}
              onResetFilters={handleResetFilters}
            />
          )}
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between gap-2" style={{ marginTop: "12px" }}>
        <div className="flex min-w-0 gap-2">
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
          total={filtered.length}
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

      {hasMore ? (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setPage((current) => current + 1)}
            className="rounded-full border border-[var(--border)] bg-white px-6 py-2.5 text-sm font-medium text-[var(--foreground)] transition-colors hover:border-[var(--accent)] hover:bg-[var(--accent-light)] hover:text-[var(--accent)]"
          >
            더보기({sorted.length - visible.length}개 남음)
          </button>
        </div>
      ) : null}
    </>
  );
}
