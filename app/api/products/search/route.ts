import { NextResponse } from "next/server";
import drinks from "@/app/data/drinkProductsData.json";
import bars from "@/app/data/barProductsData.json";
import yogurts from "@/app/data/yogurtProductsData.json";
import shakes from "@/app/data/shakeProductsData.json";
import soymilks from "@/app/data/soymilkProductsData.json";

// 검색·찜 화면용. 예전에는 전체 제품 데이터를 /products.json 한 파일로 공개했는데,
// 다른 사이트가 그 파일을 통째로 가져다 썼다(2026-11-01 확인, docs/competitor-proteinfact-2026-11-01.md).
// 이제는 검색어나 찜한 slug에 맞는 제품만, 정해진 개수까지만 돌려준다.
const MAX_QUERY_RESULTS = 60;
const MAX_SLUGS = 50;

type RawProduct = Record<string, unknown> & { slug?: string; name?: string; brand?: string };

const CATEGORY_SOURCES: Array<[string, string, RawProduct[]]> = [
  ["drinks", "drink", drinks as RawProduct[]],
  ["bars", "bar", bars as RawProduct[]],
  ["yogurt", "yogurt", yogurts as RawProduct[]],
  ["shake", "shake", shakes as RawProduct[]],
  ["soymilk", "soymilk", soymilks as RawProduct[]],
];

const PRODUCTS = CATEGORY_SOURCES.flatMap(([category, productType, list]) =>
  list
    .filter((p) => typeof p.slug === "string")
    .map((p) => ({
      slug: p.slug as string,
      name: String(p.name ?? ""),
      brand: String(p.brand ?? ""),
      category,
      productType: (p.productType as string | undefined) ?? productType,
      capacity: (p.capacity as string | undefined) ?? "",
      variant: (p.variant as string | undefined) ?? "",
      tags: Array.isArray(p.tags) ? p.tags : [],
      protein: (p.proteinPerServing as number | undefined) ?? null,
      proteinPerServing: (p.proteinPerServing as number | undefined) ?? 0,
      calories: (p.calories as number | undefined) ?? null,
      sugar: (p.sugar as number | undefined) ?? null,
      density: (p.density as string | undefined) ?? "-",
      coupangUrl: (p.coupangUrl as string | undefined) ?? null,
      naverUrl: (p.naverUrl as string | undefined) ?? null,
      officialUrl: (p.officialUrl as string | undefined) ?? null,
      yogurtType: (p.yogurtType as string | undefined) ?? null,
    })),
);

const BY_SLUG = new Map(PRODUCTS.map((p) => [p.slug, p]));

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const slugsParam = searchParams.get("slugs");
  const query = (searchParams.get("q") ?? "").trim().toLowerCase();

  if (slugsParam) {
    const slugs = [...new Set(slugsParam.split(",").map((s) => s.trim()).filter(Boolean))].slice(0, MAX_SLUGS);
    const products = slugs.map((slug) => BY_SLUG.get(slug)).filter((p) => p != null);
    return NextResponse.json({ products, more: false });
  }

  if (!query) return NextResponse.json({ products: [], more: false });

  const matches = PRODUCTS.filter(
    (p) => p.name.toLowerCase().includes(query) || p.brand.toLowerCase().includes(query),
  );
  return NextResponse.json({ products: matches.slice(0, MAX_QUERY_RESULTS), more: matches.length > MAX_QUERY_RESULTS });
}
