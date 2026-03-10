import type { ProductDetailProps } from "../data/products";

const popularitySeeds = {
  drink: [
    { score: 1620, matchers: ["셀렉스", "프로핏"] },
    { score: 1540, matchers: ["랩노쉬", "프로틴 드링크"] },
    { score: 1480, matchers: ["뉴케어", "올프로틴"] },
    { score: 1410, matchers: ["더단백"] },
    { score: 1360, matchers: ["마이밀", "프로틴"] },
  ],
  bar: [
    { score: 1190, matchers: ["퀘스트"] },
    { score: 1130, matchers: ["닥터유"] },
    { score: 1090, matchers: ["베노프"] },
    { score: 1040, matchers: ["켈로그"] },
    { score: 990, matchers: ["마이프로틴"] },
  ],
} as const;

export interface PopularProductItem {
  slug: string;
  brand: string;
  name: string;
  viewsLast7d: number;
}

function getSeedScore(
  product: ProductDetailProps,
  productType: "drink" | "bar",
): number | null {
  const haystack = `${product.brand} ${product.name}`.toLowerCase();
  const seed = popularitySeeds[productType].find((entry) =>
    entry.matchers.every((matcher) => haystack.includes(matcher.toLowerCase())),
  );

  return seed?.score ?? null;
}

export function getPopularProducts(
  products: ProductDetailProps[],
  productType: "drink" | "bar",
  limit = 5,
): PopularProductItem[] {
  const scored = products.map((product, index) => ({
    slug: product.slug,
    brand: product.brand,
    name: product.name,
    viewsLast7d: getSeedScore(product, productType) ?? Math.max(100, 850 - index * 17),
  }));

  return scored
    .sort((a, b) => b.viewsLast7d - a.viewsLast7d)
    .slice(0, limit);
}
