import type { CompareLanding } from "./compareLandings";
import { getAllProducts, type ProductDetailProps } from "./products";
import { brandToSlug } from "../lib/brandHubs";

/**
 * 데이터로 만드는 비교 랜딩(2026-10-20, 네이버 신규 유입용).
 * 문장 속 수치는 모두 등록 제품 데이터에서 계산한다. 제품이 빠지면 그 랜딩은 만들지 않는다.
 */

const CATEGORY_PAGE: Record<string, { href: string; title: string }> = {
  drink: { href: "/drinks", title: "단백질 음료 전체 비교" },
  bar: { href: "/bars", title: "단백질 바 전체 비교" },
  shake: { href: "/shake", title: "단백질 쉐이크 전체 비교" },
  yogurt: { href: "/yogurt", title: "단백질 요거트 전체 비교" },
  soymilk: { href: "/soymilk", title: "두유 전체 비교" },
};

const fmt = (value: number | undefined) => (value == null ? "-" : String(Math.round(value * 10) / 10));

function basis(product: ProductDetailProps) {
  const capacity = product.capacity ?? "";
  switch (product.productType) {
    case "drink":
      return `1병(${capacity})`;
    case "soymilk":
      return `1팩(${capacity})`;
    case "shake":
      return `1회(${capacity})`;
    default:
      return `1개(${capacity})`;
  }
}

function label(product: ProductDetailProps) {
  return product.name.startsWith(product.brand) ? product.name : `${product.brand} ${product.name}`;
}

function nutrition(product: ProductDetailProps) {
  return `${label(product)} ${basis(product)}: 단백질 ${fmt(product.proteinPerServing)}g·당류 ${fmt(product.sugar)}g·${fmt(product.calories)}kcal`;
}

function range(products: ProductDetailProps[], pick: (p: ProductDetailProps) => number | undefined) {
  const values = products.map(pick).filter((v): v is number => v != null);
  if (!values.length) return "-";
  const min = Math.min(...values);
  const max = Math.max(...values);
  return min === max ? fmt(min) : `${fmt(min)}~${fmt(max)}`;
}

function brandHub(brand: string) {
  return { href: `/brands/${brandToSlug(brand)}`, title: `${brand} 브랜드 허브`, description: `${brand} 등록 제품의 상세 성분을 확인합니다.` };
}

type PairSpec = { slug: string; a: string; b: string; titleA: string; titleB: string; topic?: string };
type LineSpec = { slug: string; title: string; filter: (p: ProductDetailProps) => boolean; lineName: string };

const PAIRS: PairSpec[] = [
  { slug: "maeil-vs-yonsei-protein-soymilk", a: "maeil-soymilk-protein-plain-190", b: "yonsei-protein-plain-unsweetened-190", titleA: "매일두유 고단백", titleB: "연세두유 고단백" },
  { slug: "erom-vs-vegemil-protein-soymilk", a: "erom-protein-plain-190", b: "vegemil-protein-plain-190", titleA: "이롬 고단백 두유", titleB: "베지밀 고단백두유" },
  { slug: "gt-vs-maeil-protein-soymilk", a: "nam-gt-protein-190", b: "maeil-soymilk-protein-plain-190", titleA: "맛있는두유 GT 고단백", titleB: "매일두유 고단백" },
  { slug: "doctoru-vs-quest-proteinbar", a: "dryou-proteinbar-pro-choco-classic", b: "quest-nutrition-protein-bar-double-chocolate-chunk-60", titleA: "닥터유 프로 단백질바", titleB: "퀘스트 단백질바" },
  { slug: "post-vs-doctoru-proteinbar", a: "post-proteinbar", b: "dryou-proteinbar-nuts", titleA: "포스트 단백질바", titleB: "닥터유 단백질바" },
  { slug: "ultive-vegan-vs-sellex-dangsolve-drink", a: "ultive-vegan-protein-choco-250", b: "sellex-protein-dangsolve-corn-190", titleA: "얼티브 비건 프로틴", titleB: "셀렉스 당솔브", topic: "식물성 단백질 음료" },
  { slug: "oatmont-vs-sellex-profit-drink", a: "oatmont-protein-savory-250", b: "sellex-profit-milk-vanilla-250", titleA: "오트몬드 프로틴", titleB: "셀렉스 프로핏" },
  { slug: "mymil-vs-hymune-balance-drink", a: "mymil-newprotein-original-190", b: "hymune-protein-balance-190", titleA: "마이밀 뉴프로틴", titleB: "하이뮨 프로틴 밸런스" },
  { slug: "ultive-vs-mymil-furotein-drink", a: "ultive-protein-savory-250", b: "mymil-furotein-gosohan-250", titleA: "얼티브 프로틴", titleB: "마이밀 퓨로틴" },
  { slug: "yozm-vs-greekday-greek-yogurt", a: "yozm-plain-greek-450", b: "greekday-signature-450", titleA: "YOZM 그릭요거트", titleB: "그릭데이 시그니처" },
];

const LINES: LineSpec[] = [
  { slug: "quest-proteinbar-flavor-comparison", title: "퀘스트 프로틴바 맛별 비교", lineName: "퀘스트 프로틴바", filter: (p) => p.productType === "bar" && p.brand === "퀘스트 뉴트리션" },
  { slug: "flymill-shake-flavor-comparison", title: "플라이밀 단백질 쉐이크 맛별 비교", lineName: "플라이밀 쉐이크", filter: (p) => p.productType === "shake" && p.brand === "플라이밀" },
  { slug: "itthefit-shake-flavor-comparison", title: "잇더핏 단백질 쉐이크 맛별 비교", lineName: "잇더핏 쉐이크", filter: (p) => p.productType === "shake" && p.brand === "잇더핏" },
  { slug: "soyjoy-flavor-comparison", title: "소이조이 맛별 비교", lineName: "소이조이", filter: (p) => p.productType === "bar" && p.brand === "소이조이" },
  { slug: "benof-proteinbar-flavor-comparison", title: "베노프 단백질바 맛별 비교", lineName: "베노프 단백질바", filter: (p) => p.productType === "bar" && p.brand === "베노프" },
  { slug: "ultive-protein-flavor-comparison", title: "얼티브 프로틴 맛별 비교", lineName: "얼티브 프로틴", filter: (p) => p.productType === "drink" && p.brand === "얼티브" },
  { slug: "vegemil-soymilk-flavor-comparison", title: "베지밀 두유 맛별 비교", lineName: "베지밀 두유", filter: (p) => p.productType === "soymilk" && p.brand === "베지밀" },
];

function buildPair(spec: PairSpec, bySlug: Map<string, ProductDetailProps>): CompareLanding | null {
  const a = bySlug.get(spec.a);
  const b = bySlug.get(spec.b);
  if (!a || !b) return null;
  const category = CATEGORY_PAGE[a.productType ?? "drink"];
  const subject = spec.topic ? `${spec.topic} ` : "";
  return {
    slug: spec.slug,
    title: `${spec.titleA} vs ${spec.titleB} ${subject}비교 | 단백질·당류·칼로리`,
    description: `${nutrition(a)}, ${nutrition(b)}입니다.`,
    intro: `${label(a)}, ${label(b)} 두 제품을 표시 기준량으로 비교합니다. 표시 단백질은 각각 ${fmt(a.proteinPerServing)}g·${fmt(b.proteinPerServing)}g, 당류는 각각 ${fmt(a.sugar)}g·${fmt(b.sugar)}g입니다.`,
    bullets: [nutrition(a), nutrition(b), `용량 비교: ${label(a)} ${a.capacity ?? "-"} · ${label(b)} ${b.capacity ?? "-"}`],
    productSlugs: [a.slug, b.slug],
    relatedLinks: [
      brandHub(a.brand),
      ...(a.brand === b.brand ? [] : [brandHub(b.brand)]),
      { href: category.href, title: category.title, description: "등록 제품을 같은 항목으로 비교합니다." },
    ],
  };
}

function buildLine(spec: LineSpec, products: ProductDetailProps[]): CompareLanding | null {
  const items = products.filter(spec.filter);
  if (items.length < 3) return null;
  const brand = items[0].brand;
  const category = CATEGORY_PAGE[items[0].productType ?? "drink"];
  const byProtein = [...items].sort((x, y) => (y.proteinPerServing ?? 0) - (x.proteinPerServing ?? 0))[0];
  const bySugar = [...items].sort((x, y) => (x.sugar ?? 99) - (y.sugar ?? 99))[0];
  const byKcal = [...items].sort((x, y) => (x.calories ?? 9999) - (y.calories ?? 9999))[0];
  return {
    slug: spec.slug,
    title: `${spec.title} | 단백질·당류·칼로리`,
    description: `등록된 ${spec.lineName} ${items.length}종을 비교합니다. 단백질 ${range(items, (p) => p.proteinPerServing)}g, 당류 ${range(items, (p) => p.sugar)}g, 열량 ${range(items, (p) => p.calories)}kcal 범위입니다.`,
    intro: `${spec.lineName} ${items.length}종의 표시 기준량 성분을 한 번에 비교합니다. 맛마다 단백질·당류·칼로리가 어떻게 다른지 확인하고 제품 상세로 이어서 볼 수 있습니다.`,
    bullets: [
      `단백질이 가장 높은 맛: ${nutrition(byProtein)}`,
      `당류가 가장 낮은 맛: ${nutrition(bySugar)}`,
      `열량이 가장 낮은 맛: ${nutrition(byKcal)}`,
    ],
    productSlugs: items.map((p) => p.slug),
    relatedLinks: [brandHub(brand), { href: category.href, title: category.title, description: "다른 브랜드 제품과 같은 항목으로 비교합니다." }],
  };
}

export function getGeneratedCompareLandings(): CompareLanding[] {
  const products = getAllProducts();
  const bySlug = new Map(products.map((p) => [p.slug, p]));
  return [
    ...PAIRS.map((spec) => buildPair(spec, bySlug)),
    ...LINES.map((spec) => buildLine(spec, products)),
  ].filter((item): item is CompareLanding => item !== null);
}
