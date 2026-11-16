import TrackedLink from "@/app/components/TrackedLink";
import { getAllProducts } from "@/app/data/products";
import { brandToSlug } from "@/app/lib/brandHubs";
import { getCategoryHref, getCategoryLabel, isProductCategory } from "@/app/lib/categories";

// 비교 가이드의 비교표 아래에 두는 '이어서 보기' 한 줄(2026-11-16 시안, 전략 축 C).
// 쿠팡 클릭은 목록(63%)·브랜드(15%) 페이지에서 가장 많이 나는데, 비교 가이드 본문에는 두 곳으로 가는 링크가 없었다.
// 표에 나온 제품의 브랜드 페이지(브랜드 전체 제품 수)와 카테고리 목록(등록 제품 수)으로 보낸다. 수치는 모두 데이터에서 센다.
// Scott 승인(운영실 카드 guide-browse-more-1116). productCompareShared.tsx의 '표의 제품 쿠팡 가격 보기' 블록 바로 뒤(비교표 section 안)에 있다.
const LIST_LABEL: Record<string, string> = {
  drink: "단백질 음료",
  bar: "단백질바",
  shake: "단백질 쉐이크",
  yogurt: "단백질 요거트",
  soymilk: "두유",
  powder: "단백질 보충제",
};

// 2026-11-16 Scott "추가 작업 진행해": 11/23 주에서 당겨 배포. 섭취·건강 정보 가이드(11/2~15 약 160세션·쿠팡 클릭 약 3, 2%)에도
// 첫 구매 상자 아래에 같은 줄을 둔다(GuideBuySection topic). 순위 페이지(바 TOP10 41%·쉐이크 TOP7 42%·파우더 TOP10 33%)와 목록으로 보낸다.
const RANKING_LINK: Record<string, { href: string; label: string }> = {
  drink: { href: "/guides/product-selection-comparison/protein-drink-top10", label: "단백질 음료 추천 TOP 10 순위" },
  bar: { href: "/guides/product-selection-comparison/protein-bar-top10", label: "단백질바 추천 TOP 10 순위" },
  shake: { href: "/guides/product-selection-comparison/protein-shake-top7", label: "단백질 쉐이크 추천 TOP 7 순위" },
  powder: { href: "/guides/product-selection-comparison/protein-powder-top10", label: "단백질 보충제 추천 TOP 10 순위" },
};

export default function GuideBrowseMore({
  slugs,
  contentId,
  heading = "표에 없는 제품도 같이 보려면",
  showBrands = true,
  showRanking = false,
  className = "mt-4",
}: {
  slugs: string[];
  contentId: string;
  heading?: string;
  showBrands?: boolean;
  /** 카테고리 추천 순위 페이지 칩을 목록 칩 앞에 둔다(정보 가이드용). */
  showRanking?: boolean;
  className?: string;
}) {
  const all = getAllProducts();
  const picked = slugs.map((slug) => all.find((item) => item.slug === slug)).filter((item): item is NonNullable<typeof item> => !!item);
  if (picked.length === 0) return null;

  const rankings = showRanking
    ? [...new Set(picked.map((item) => item.productType ?? "drink"))].map((category) => RANKING_LINK[category]).filter((item) => !!item).slice(0, 1)
    : [];
  const brands = (showBrands ? [...new Set(picked.map((item) => item.brand))].slice(0, 3) : []).map((brand) => ({
    brand,
    href: `/brands/${brandToSlug(brand)}`,
    count: all.filter((item) => item.brand === brand).length,
  }));
  const categories = [...new Set(picked.map((item) => item.productType ?? "drink"))]
    .filter(isProductCategory)
    .slice(0, 2)
    .map((category) => ({
      href: getCategoryHref(category),
      label: LIST_LABEL[category] ?? getCategoryLabel(category),
      count: all.filter((item) => (item.productType ?? "drink") === category).length,
    }));

  const chip =
    "inline-flex min-h-10 items-center rounded-full border border-[#cfdccf] bg-white px-3.5 py-2 text-xs font-semibold text-[#24543d] transition-colors hover:bg-[#f1f6f1]";
  return (
    <div className={`${className} rounded-2xl border border-[#e3ebe3] bg-[#f6faf6] px-3.5 py-3`}>
      <p className="text-xs font-semibold text-[#4a6178]">{heading}</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {rankings.map((item) => (
          <TrackedLink
            key={item.href}
            href={item.href}
            trackingLabel={item.label}
            trackingSection="browse_more"
            trackingPageType="guide"
            contentId={`${contentId}:browse_more:ranking`}
            ctaType="all_products"
            linkPosition="mid_content"
            className={chip}
          >
            {item.label} →
          </TrackedLink>
        ))}
        {categories.map((item) => (
          <TrackedLink
            key={item.href}
            href={item.href}
            trackingLabel={item.label}
            trackingSection="browse_more"
            trackingPageType="guide"
            contentId={`${contentId}:browse_more:list`}
            ctaType="all_products"
            linkPosition="mid_content"
            className={chip}
          >
            {item.label} {item.count}개 전체 비교 →
          </TrackedLink>
        ))}
        {brands.map((item) => (
          <TrackedLink
            key={item.href}
            href={item.href}
            trackingLabel={item.brand}
            trackingSection="browse_more"
            trackingPageType="guide"
            contentId={`${contentId}:browse_more:brand`}
            ctaType="related_products"
            linkPosition="mid_content"
            className={chip}
          >
            {item.brand} 전체 {item.count}종 성분표 →
          </TrackedLink>
        ))}
      </div>
    </div>
  );
}
