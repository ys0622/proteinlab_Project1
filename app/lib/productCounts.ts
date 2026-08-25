import type { ProductDetailProps } from "@/app/data/products";
import type { ProductCategory } from "./categories";
import { ORDERED_CATEGORY_IDS } from "./categories";
import { getProductsByCategoryAsync } from "./productData";

export type CategoryProductCounts = Record<ProductCategory, number>;
export type CategoryProductLists = Record<ProductCategory, ProductDetailProps[]>;

export async function getCategoryProductListsAsync(): Promise<CategoryProductLists> {
  const entries = await Promise.all(
    ORDERED_CATEGORY_IDS.map(async (category) => [
      category,
      await getProductsByCategoryAsync(category),
    ] as const),
  );

  return Object.fromEntries(entries) as CategoryProductLists;
}

export function getCategoryProductCounts(lists: CategoryProductLists): CategoryProductCounts {
  return Object.fromEntries(
    ORDERED_CATEGORY_IDS.map((category) => [category, lists[category].length]),
  ) as CategoryProductCounts;
}

export function getTotalProductCount(counts: CategoryProductCounts): number {
  return ORDERED_CATEGORY_IDS.reduce((total, category) => total + counts[category], 0);
}

export async function getCategoryProductCountsAsync(): Promise<CategoryProductCounts> {
  return getCategoryProductCounts(await getCategoryProductListsAsync());
}

export async function getCategoryProductsWithCountsAsync(category: ProductCategory) {
  const lists = await getCategoryProductListsAsync();
  const categoryCounts = getCategoryProductCounts(lists);

  return {
    products: lists[category],
    categoryCounts,
    totalCount: getTotalProductCount(categoryCounts),
  };
}
