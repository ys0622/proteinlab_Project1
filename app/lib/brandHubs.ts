import type { ProductDetailProps } from "../data/products";

const BRAND_SLUG_MAP: Record<string, string> = {
  셀렉스: "sellex",
  하이뮨: "hymune",
  닥터유: "dryou",
  베노프: "benof",
  요프로: "yopro",
  요플레: "yoplait",
  랩노쉬: "labnosh",
  플라이밀: "flymill",
  단백하니: "danbaekhani",
  뉴케어: "newcare",
  더단백: "danbaek",
  "매일 바이오": "maeil-bio",
};

export function brandToSlug(brand: string) {
  return (
    BRAND_SLUG_MAP[brand] ??
    brand
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-")
  );
}

export function slugToBrand(slug: string, brands: string[]) {
  return brands.find((brand) => brandToSlug(brand) === slug) ?? null;
}

export function getBrandSummary(products: ProductDetailProps[]) {
  const byBrand = new Map<string, ProductDetailProps[]>();

  for (const product of products) {
    const list = byBrand.get(product.brand) ?? [];
    list.push(product);
    byBrand.set(product.brand, list);
  }

  return [...byBrand.entries()]
    .map(([brand, items]) => ({
      brand,
      slug: brandToSlug(brand),
      total: items.length,
      categories: [...new Set(items.map((item) => item.productType))].filter(Boolean),
      items,
    }))
    .sort((a, b) => b.total - a.total || a.brand.localeCompare(b.brand));
}
