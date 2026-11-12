import Image from "next/image";
import TrackedLink from "./TrackedLink";
import TrackedCoupangLink from "./TrackedCoupangLink";
import AffiliateDisclosure from "./AffiliateDisclosure";
import type { ProductDetailProps } from "@/app/data/products";
import { getCoupangRedirectHref, hasNoPurchasableCoupangLink, type CoupangLinkCategory } from "@/app/lib/purchaseLinks";
import { formatProductLabel } from "@/app/lib/productLabel";
import { getProductImageUrl } from "@/app/lib/productImage";

const CATEGORY_LABEL: Record<string, string> = {
  drink: "음료",
  shake: "쉐이크",
  bar: "바",
  yogurt: "요거트",
  soymilk: "두유",
  powder: "파우더",
};

export interface BrandLine {
  key: string;
  shortName: string;
  category: string;
  items: ProductDetailProps[];
}

function stripFlavor(name: string) {
  return name.replace(/\s*\([^)]*\)\s*$/, "").trim();
}

/**
 * 브랜드 제품을 라인(맥스·몬스터·프로처럼 맛만 다른 제품 묶음)으로 나눈다.
 * 기본은 제품명 끝의 "(맛)"을 뗀 이름. 괄호가 없는 이름은 마지막 단어만 다른 제품이 같은 카테고리에 2개 이상이면 한 라인으로 묶는다(랩노쉬 단백쿠키바 4종).
 */
export function getBrandLines(brand: string, items: ProductDetailProps[]): BrandLine[] {
  const keyOf = new Map<string, string>();
  for (const item of items) {
    const base = stripFlavor(item.name);
    let key = base;
    if (base === item.name.trim()) {
      const words = base.split(/\s+/);
      if (words.length >= 2) {
        const prefix = words.slice(0, -1).join(" ");
        const siblings = items.filter(
          (other) => (other.productType ?? "drink") === (item.productType ?? "drink") && stripFlavor(other.name) === other.name.trim() && other.name.startsWith(`${prefix} `),
        );
        if (siblings.length >= 2) key = prefix;
      }
    }
    keyOf.set(item.slug, `${item.productType ?? "drink"}|${key}`);
  }
  const groups = new Map<string, BrandLine>();
  for (const item of items) {
    const groupKey = keyOf.get(item.slug)!;
    const [category, key] = groupKey.split("|");
    const line = groups.get(groupKey) ?? { key, shortName: key.replace(brand, "").trim() || key, category, items: [] };
    line.items.push(item);
    groups.set(groupKey, line);
  }
  return [...groups.values()];
}

function span(values: Array<number | null | undefined>, unit: string) {
  const list = values.filter((v): v is number => typeof v === "number" && Number.isFinite(v));
  if (list.length === 0) return "-";
  const min = Math.min(...list);
  const max = Math.max(...list);
  return min === max ? `${min}${unit}` : `${min}~${max}${unit}`;
}

function uniq(values: Array<string | null | undefined>) {
  return [...new Set(values.filter((v): v is string => Boolean(v)))];
}

export default function BrandLineupGlance({ brand, items, mainCategory }: { brand: string; items: ProductDetailProps[]; mainCategory: string }) {
  const lines = getBrandLines(brand, items);
  if (lines.length < 2) return null;

  const maxProtein = (line: BrandLine) => Math.max(...line.items.map((i) => i.proteinPerServing ?? 0));
  const minKcal = (line: BrandLine) => Math.min(...line.items.map((i) => i.calories ?? Number.POSITIVE_INFINITY));
  const ordered = [...lines].sort((a, b) => {
    if (a.category !== b.category) {
      if (a.category === mainCategory) return -1;
      if (b.category === mainCategory) return 1;
      return a.category.localeCompare(b.category);
    }
    return maxProtein(b) - maxProtein(a);
  });
  const shown = ordered.slice(0, 8);

  // 배지는 같은 카테고리 라인끼리만 비교한다(파우더 1스쿱과 음료 1병을 한 줄에 세우지 않는다).
  const badgesFor = (line: BrandLine) => {
    const peers = lines.filter((l) => l.category === line.category);
    const badges: string[] = [];
    if (peers.length >= 2) {
      if (maxProtein(line) === Math.max(...peers.map(maxProtein))) badges.push("단백질 최다");
      if (minKcal(line) === Math.min(...peers.map(minKcal))) badges.push("열량 최저");
    }
    if (line.items.every((i) => i.sugar === 0)) badges.push("당류 0g");
    return badges;
  };

  return (
    <section className="rounded-[28px] border border-[#dce8df] bg-white px-4 py-5 md:px-6" aria-labelledby="brand-lineup-glance">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 id="brand-lineup-glance" className="text-lg font-bold text-[#16412D]">
          {brand} 라인업 한눈에 · {lines.length}개 라인
        </h2>
        <AffiliateDisclosure className="mb-0" />
      </div>
      <p className="mt-1 text-xs leading-5 text-[var(--foreground-muted)]">
        맛만 다른 제품을 한 라인으로 묶었습니다. 수치는 성분표 1회 제공량(1병·1개·1포) 기준 범위입니다.
      </p>
      <ul className="mt-4 divide-y divide-[#edf1ee]">
        {shown.map((line) => {
          const sorted = [...line.items].sort((a, b) => (b.proteinPerServing ?? 0) - (a.proteinPerServing ?? 0));
          const rep = sorted.find((i) => !hasNoPurchasableCoupangLink(i.coupangUrl, i.slug)) ?? sorted[0];
          const repLabel = formatProductLabel(rep.brand, rep.name);
          const image = getProductImageUrl(rep.slug);
          const flavors = uniq(line.items.map((i) => (stripFlavor(i.name) !== i.name.trim() ? i.flavor : i.name.replace(line.key, "").trim() || null)));
          const capacities = uniq(line.items.map((i) => i.capacity));
          const purchasable = !hasNoPurchasableCoupangLink(rep.coupangUrl, rep.slug);
          const badges = badgesFor(line);
          return (
            <li key={`${line.category}-${line.key}`} className="flex gap-3 py-4 first:pt-0 last:pb-0 md:gap-5">
              <TrackedLink
                href={`/product/${rep.slug}`}
                trackingLabel={`${line.key} 라인 사진`}
                trackingSection="brand_lineup_glance"
                trackingPageType="brand"
                productId={rep.slug}
                className="flex h-28 w-20 shrink-0 items-center justify-center rounded-xl border border-[#edf1ee] bg-white md:h-32 md:w-24"
              >
                {image ? <Image src={image} alt={repLabel} width={96} height={128} className="h-full w-full object-contain p-1.5" /> : null}
              </TrackedLink>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-1.5">
                  <h3 className="text-[15px] font-bold text-[var(--foreground)] md:text-base">{line.shortName}</h3>
                  <span className="rounded-full bg-[#f1f5f2] px-2 py-0.5 text-[11px] font-semibold text-[#356149]">
                    {CATEGORY_LABEL[line.category] ?? line.category}
                    {line.items.length > 1 ? ` · ${line.items.length}종` : ""}
                  </span>
                  {badges.map((badge) => (
                    <span key={badge} className="rounded-full bg-[#e5f3e8] px-2 py-0.5 text-[11px] font-bold text-[#1F5A3D]">
                      {badge}
                    </span>
                  ))}
                </div>
                <dl className="mt-2 grid grid-cols-4 gap-1 text-center">
                  {[
                    ["단백질", span(line.items.map((i) => i.proteinPerServing), "g"), true],
                    ["당류", span(line.items.map((i) => i.sugar), "g"), false],
                    // 범위(195~204kcal)가 모바일 칸을 넘쳐 단위는 이름 쪽에 둔다.
                    ["열량(kcal)", span(line.items.map((i) => i.calories), ""), false],
                    ["용량", capacities.join("·") || "-", false],
                  ].map(([label, value, strong]) => (
                    <div key={label as string} className="rounded-lg bg-[#f7f9f7] px-1 py-1.5">
                      <dt className="text-[10px] text-[var(--foreground-muted)]">{label}</dt>
                      <dd className={`mt-0.5 break-keep text-xs font-bold leading-4 md:text-[13px] ${strong ? "text-[var(--accent)]" : "text-[var(--foreground)]"}`}>{value}</dd>
                    </div>
                  ))}
                </dl>
                {flavors.length > 0 ? (
                  <p className="mt-2 line-clamp-1 text-xs text-[var(--foreground-muted)]">맛: {flavors.join(" · ")}</p>
                ) : null}
                <div className="mt-2.5 flex gap-2">
                  <TrackedLink
                    href={`/product/${rep.slug}`}
                    trackingLabel={`${line.key} 성분표 보기`}
                    trackingSection="brand_lineup_glance"
                    trackingPageType="brand"
                    productId={rep.slug}
                    ctaType="product_detail"
                    className="inline-flex min-h-9 items-center rounded-full border border-[#d7e4d9] bg-white px-3 text-xs font-semibold text-[#24543d] hover:border-[#24543d]"
                  >
                    성분표 보기
                  </TrackedLink>
                  {purchasable ? (
                    <TrackedCoupangLink
                      href={getCoupangRedirectHref(rep.coupangUrl, rep.productType as CoupangLinkCategory, rep.slug)}
                      productId={rep.slug}
                      productName={repLabel}
                      productBrand={rep.brand}
                      productCategory={rep.productType}
                      linkPosition="mid_content"
                      className="inline-flex min-h-9 items-center rounded-full bg-[#1F5A3D] px-3.5 text-xs font-bold text-white"
                    >
                      가격 보기
                    </TrackedCoupangLink>
                  ) : null}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      {ordered.length > shown.length ? (
        <p className="mt-3 text-xs text-[var(--foreground-muted)]">나머지 {ordered.length - shown.length}개 라인은 아래 성분 비교표에 있습니다.</p>
      ) : null}
    </section>
  );
}
