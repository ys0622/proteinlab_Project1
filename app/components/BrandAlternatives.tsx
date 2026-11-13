import Image from "next/image";
import TrackedLink from "./TrackedLink";
import TrackedCoupangLink from "./TrackedCoupangLink";
import type { ProductDetailProps } from "@/app/data/products";
import { getCoupangRedirectHref, hasNoPurchasableCoupangLink, type CoupangLinkCategory } from "@/app/lib/purchaseLinks";
import { formatProductLabel } from "@/app/lib/productLabel";
import { getProductImageUrl } from "@/app/lib/productImage";
import { getSimilarProducts } from "@/app/lib/similarProducts";
import { brandToSlug } from "@/app/lib/brandHubs";
import { withTopic } from "@/app/lib/koreanParticle";

const KIND_LABEL: Record<string, string> = {
  drink: "단백질 음료",
  shake: "단백질 쉐이크",
  bar: "단백질 바",
  yogurt: "그릭·단백질 요거트",
  soymilk: "두유",
  powder: "프로틴 파우더",
};

const PICK = 5;

function hasPhoto(slug: string) {
  const url = getProductImageUrl(slug);
  return Boolean(url) && !String(url).includes("no-image");
}

/**
 * 제품이 1개뿐인 브랜드 페이지에 같은 종류의 성분이 비슷한 다른 브랜드 제품 5개를 붙인다(2026-11-13, 백로그 #14).
 * 브랜드 이름으로 들어온 사람이 "이것 말고 뭐가 있나"를 같은 페이지에서 비교하게 하고, 내용이 1개뿐인 페이지를 키운다.
 */
export function getBrandAlternatives(source: ProductDetailProps, all: ProductDetailProps[]) {
  const pool = all.filter((p) => p.brand !== source.brand && !p.needsServingCheck && hasPhoto(p.slug));
  const ranked = getSimilarProducts(source, pool, 60);
  const seen = new Set<string>();
  const picks: ProductDetailProps[] = [];
  for (const p of ranked) {
    if (seen.has(p.brand)) continue;
    seen.add(p.brand);
    picks.push(p);
    if (picks.length >= PICK) break;
  }
  return picks;
}

// ties: 이 제품과 값이 같은 다른 제품 수. 동점이면 "다른 3종과 함께"를 붙인다(하림 21g = 서울우유·얼티브·오트몬드 21g).
function orderWord(rank: number, total: number, ties: number, best: string, worst: string) {
  const together = ties > 0 ? `다른 ${ties}종과 함께 ` : "";
  if (rank === 1) return `${together}가장 ${best}`;
  if (rank + ties === total) return `${together}가장 ${worst}`;
  return `${together}${rank}번째로 ${best}`;
}

export default function BrandAlternatives({ product, all }: { product: ProductDetailProps; all: ProductDetailProps[] }) {
  const picks = getBrandAlternatives(product, all);
  if (picks.length < 3) return null;
  const rows = [product, ...[...picks].sort((a, b) => (b.proteinPerServing ?? 0) - (a.proteinPerServing ?? 0))];
  const kind = KIND_LABEL[product.productType ?? "drink"] ?? "제품";
  const label = formatProductLabel(product.brand, product.name);

  const protein = (p: ProductDetailProps) => p.proteinPerServing ?? 0;
  const proteinRank = rows.filter((p) => protein(p) > protein(product)).length + 1;
  const sugarKnown = rows.filter((p) => typeof p.sugar === "number");
  const sugarRank = typeof product.sugar === "number" ? sugarKnown.filter((p) => (p.sugar as number) < (product.sugar as number)).length + 1 : null;
  const proteinTies = rows.filter((p) => p !== product && protein(p) === protein(product)).length;
  const sugarTies = sugarKnown.filter((p) => p !== product && p.sugar === product.sugar).length;
  const rankText = sugarRank
    ? `단백질은 ${orderWord(proteinRank, rows.length, proteinTies, "많고", "적고")}, 당류는 ${orderWord(sugarRank, sugarKnown.length, sugarTies, "낮습니다", "높습니다")}.`
    : `단백질은 ${orderWord(proteinRank, rows.length, proteinTies, "많습니다", "적습니다")}.`;

  return (
    <section className="rounded-[28px] border border-[#dce8df] bg-white px-4 py-5 md:px-6" aria-labelledby="brand-alternatives">
      <h2 id="brand-alternatives" className="text-lg font-bold text-[#16412D]">
        {product.brand} 대신 볼 만한 {kind} · 다른 브랜드 {picks.length}종
      </h2>
      <p className="mt-1 text-sm leading-6 text-[var(--foreground-muted)]">
        {withTopic(product.brand)} ProteinLab에 {label} 1종이 등록돼 있습니다. 단백질·당류·열량·용량이 비슷한 다른 브랜드 {kind}{" "}
        {picks.length}종과 나란히 놓으면 {rows.length}종 중 {rankText} 수치는 성분표 1회 제공량 기준입니다.
      </p>
      <ul className="mt-4 divide-y divide-[#edf1ee]">
        {rows.map((p, i) => {
          const isSelf = i === 0;
          const pLabel = formatProductLabel(p.brand, p.name);
          const image = getProductImageUrl(p.slug);
          const purchasable = !hasNoPurchasableCoupangLink(p.coupangUrl, p.slug);
          return (
            <li key={p.slug} className={`flex gap-3 py-3.5 first:pt-0 last:pb-0 md:gap-5`}>
              <TrackedLink
                href={`/product/${p.slug}`}
                trackingLabel={`${pLabel} 사진`}
                trackingSection="brand_alternatives"
                trackingPageType="brand"
                productId={p.slug}
                className={`flex h-24 w-[72px] shrink-0 items-center justify-center rounded-xl border bg-white md:h-28 md:w-20 ${isSelf ? "border-[#8eb79a]" : "border-[#edf1ee]"}`}
              >
                {image ? <Image src={image} alt={pLabel} width={80} height={112} className="h-full w-full object-contain p-1.5" /> : null}
              </TrackedLink>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-1.5">
                  {isSelf ? (
                    <span className="rounded-full bg-[#1F5A3D] px-2 py-0.5 text-[11px] font-bold text-white">이 브랜드</span>
                  ) : (
                    <TrackedLink
                      href={`/brands/${brandToSlug(p.brand)}`}
                      trackingLabel={`${p.brand} 브랜드`}
                      trackingSection="brand_alternatives"
                      trackingPageType="brand"
                      className="rounded-full bg-[#f1f5f2] px-2 py-0.5 text-[11px] font-semibold text-[#356149] hover:underline"
                    >
                      {p.brand}
                    </TrackedLink>
                  )}
                  <h3 className="min-w-0 break-keep text-[14px] font-bold leading-5 text-[var(--foreground)] md:text-[15px]">{p.name}</h3>
                </div>
                <dl className="mt-2 grid grid-cols-4 gap-1 text-center">
                  {[
                    ["단백질", p.proteinPerServing != null ? `${p.proteinPerServing}g` : "-", true],
                    ["당류", p.sugar != null ? `${p.sugar}g` : "-", false],
                    ["열량", p.calories != null ? `${p.calories}kcal` : "-", false],
                    ["용량", p.capacity ?? "-", false],
                  ].map(([k, v, strong]) => (
                    <div key={k as string} className="rounded-lg bg-[#f7f9f7] px-1 py-1.5">
                      <dt className="text-[10px] text-[var(--foreground-muted)]">{k}</dt>
                      <dd className={`mt-0.5 break-keep text-xs font-bold leading-4 md:text-[13px] ${strong ? "text-[var(--accent)]" : "text-[var(--foreground)]"}`}>{v}</dd>
                    </div>
                  ))}
                </dl>
                <div className="mt-2 flex gap-2">
                  <TrackedLink
                    href={`/product/${p.slug}`}
                    trackingLabel={`${pLabel} 성분표 보기`}
                    trackingSection="brand_alternatives"
                    trackingPageType="brand"
                    productId={p.slug}
                    ctaType="product_detail"
                    className="inline-flex min-h-8 items-center rounded-full border border-[#d7e4d9] bg-white px-3 text-xs font-semibold text-[#24543d] hover:border-[#24543d]"
                  >
                    성분표 보기
                  </TrackedLink>
                  {purchasable ? (
                    <TrackedCoupangLink
                      href={getCoupangRedirectHref(p.coupangUrl, p.productType as CoupangLinkCategory, p.slug)}
                      productId={p.slug}
                      productName={pLabel}
                      productBrand={p.brand}
                      productCategory={p.productType}
                      linkPosition="mid_content"
                      className="inline-flex min-h-8 items-center rounded-full bg-[#1F5A3D] px-3.5 text-xs font-bold text-white"
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
    </section>
  );
}
