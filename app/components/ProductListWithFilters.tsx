"use client";

import { useState, useMemo } from "react";
import type { ProductDetailProps } from "../data/products";
import {
  defaultDrinkFilters,
  defaultBarFilters,
  filterDrinkProducts,
  filterBarProducts,
  type DrinkFilters,
  type BarFilters,
} from "../lib/productFilters";
import FilterSection from "./FilterSection";
import SearchBar from "./SearchBar";
import SortBar from "./SortBar";
import ProductCard from "./ProductCard";

type ProductListWithFiltersProps =
  | { productType: "drink"; products: ProductDetailProps[] }
  | { productType: "bar"; products: ProductDetailProps[] };

export default function ProductListWithFilters(props: ProductListWithFiltersProps) {
  const { productType, products } = props;
  const [drinkFilters, setDrinkFilters] = useState<DrinkFilters>(defaultDrinkFilters);
  const [barFilters, setBarFilters] = useState<BarFilters>(defaultBarFilters);

  const filters = productType === "drink" ? drinkFilters : barFilters;

  const filtered = useMemo(
    () => (productType === "drink" ? filterDrinkProducts(products, filters as DrinkFilters) : filterBarProducts(products, filters as BarFilters)),
    [products, filters, productType]
  );

  const handleDrinkFilterToggle = (key: keyof DrinkFilters, value: string) => {
    setDrinkFilters((prev) => {
      const arr = prev[key];
      const next = arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];
      return { ...prev, [key]: next };
    });
  };

  const handleBarFilterToggle = (key: keyof BarFilters, value: string) => {
    setBarFilters((prev) => {
      const arr = prev[key];
      const next = arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];
      return { ...prev, [key]: next };
    });
  };

  return (
    <>
      <div className="mt-3 rounded-xl border border-[var(--border)] bg-[var(--filter-box-bg)]" style={{ marginTop: "12px", borderRadius: "12px", padding: "10px 12px" }}>
        <SearchBar />
        <div className="mt-1.5">
          {productType === "drink" ? (
            <FilterSection productType="drink" filters={filters as DrinkFilters} onFilterToggle={handleDrinkFilterToggle} />
          ) : (
            <FilterSection productType="bar" filters={filters as BarFilters} onFilterToggle={handleBarFilterToggle} />
          )}
        </div>
      </div>

      <div className="mt-2" style={{ marginTop: "8px" }}>
        <SortBar total={filtered.length} />
      </div>

      <section
        className="mt-3 grid grid-cols-1 gap-6 bg-white sm:grid-cols-2 lg:grid-cols-3"
        style={{ marginTop: "12px", gap: "24px" }}
        aria-label="제품 목록"
      >
        {filtered.map((product) => (
          <ProductCard key={product.slug ?? `${product.brand}-${product.name}`} {...product} />
        ))}
      </section>
    </>
  );
}
