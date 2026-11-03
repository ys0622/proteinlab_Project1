import type { ProductDetailProps } from "@/app/data/products";
import type { CatalogProductCategory } from "./categories";
import { ALL_CATEGORY_IDS } from "./categories";
import { getProductsByCategoryAsync } from "./productData";

export type CategoryProductCounts = Record<CatalogProductCategory, number>;
export type CategoryProductLists = Record<CatalogProductCategory, ProductDetailProps[]>;

export async function getCategoryProductListsAsync(): Promise<CategoryProductLists> {
  const entries = await Promise.all(
    ALL_CATEGORY_IDS.map(async (category) => [
      category,
      await getProductsByCategoryAsync(category),
    ] as const),
  );

  return Object.fromEntries(entries) as CategoryProductLists;
}

export function getCategoryProductCounts(lists: CategoryProductLists): CategoryProductCounts {
  return Object.fromEntries(
    ALL_CATEGORY_IDS.map((category) => [category, lists[category].length]),
  ) as CategoryProductCounts;
}

export function getTotalProductCount(counts: CategoryProductCounts): number {
  return ALL_CATEGORY_IDS.reduce((total, category) => total + counts[category], 0);
}

export async function getCategoryProductCountsAsync(): Promise<CategoryProductCounts> {
  return getCategoryProductCounts(await getCategoryProductListsAsync());
}

export async function getCategoryProductsWithCountsAsync(category: CatalogProductCategory) {
  const lists = await getCategoryProductListsAsync();
  const categoryCounts = getCategoryProductCounts(lists);

  return {
    products: lists[category],
    categoryCounts,
    totalCount: getTotalProductCount(categoryCounts),
  };
}
