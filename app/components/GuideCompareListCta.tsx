import Image from "next/image";
import TrackedLink from "./TrackedLink";
import { getProductBySlug } from "@/app/data/products";
import { formatProductLabel } from "@/app/lib/productLabel";
import { getProductImageUrl } from "@/app/lib/productImage";
import categoryCounts from "@/app/data/productCategoryCounts.json";

type ListCategory = "drink" | "bar" | "yogurt" | "shake" | "soymilk";

const LIST_META: Record<ListCategory, { href: string; name: string }> = {
  drink: { href: "/drinks", name: "단백질 음료" },
  bar: { href: "/bars", name: "단백질 바" },
  yogurt: { href: "/yogurt", name: "단백질 요거트" },
  shake: { href: "/shake", name: "단백질 쉐이크" },
  soymilk: { href: "/soymilk", name: "두유" },
};

// 가이드 → 목록 동선(2026-11-02 시안). GA4 28일: 목록·브랜드의 제품 카드는 본 사람 중 19.7%가 쿠팡을 누르고,
// 가이드 본문 구매 버튼은 2.0%다. 가이드에서 바로 사게 하기보다 전체 비교 목록으로 보낸다. 기존 구매 버튼은 그대로 둔다.
export default function GuideCompareListCta({ category, slugs }: { category: ListCategory; slugs: string[] }) {
  const meta = LIST_META[category];
  const count = (categoryCounts as Record<ListCategory, number>)[category];
  const products = slugs.map((slug) => getProductBySlug(slug)).filter((p): p is NonNullable<typeof p> => Boolean(p)).slice(0, 3);

  return (
    <section className="break-keep rounded-[28px] border border-[#cddfd2] bg-[#f5faf6] px-4 py-4 md:px-5 md:py-5" aria-label={`${meta.name} 전체 비교`}>
      <p className="text-xs font-semibold tracking-[0.08em] text-[#1F5A3D]">전체 비교</p>
      <h2 className="mt-1 text-lg font-bold text-[#16412D]">
        {meta.name} {count}개를 한 화면에서 비교하기
      </h2>
      <p className="mt-1 text-sm leading-6 text-[var(--foreground-muted)]">
        이 글의 제품을 포함해 단백질·당류·열량을 성분표 기준으로 나란히 보고, 순서를 바꿔 가며 고를 수 있습니다.
      </p>
      {products.length > 0 ? (
        <div className="mt-3 grid grid-cols-3 gap-2">
          {products.map((product) => {
            const label = formatProductLabel(product.brand, product.name);
            const image = getProductImageUrl(product.slug);
            return (
              <TrackedLink
                key={product.slug}
                href={`/product/${product.slug}`}
                trackingLabel={`${label} 상세 보기`}
                trackingSection="guide_compare_list_cta"
                trackingPageType="guide"
                productId={product.slug}
                linkPosition="mid_content"
                ctaType="product_detail"
                className="flex flex-col rounded-xl border border-[#e3ebe5] bg-white p-2"
              >
                <span className="flex h-20 items-center justify-center md:h-24">
                  {image ? <Image src={image} alt={label} width={80} height={96} className="h-full w-full object-contain" /> : null}
                </span>
                <span className="mt-1 line-clamp-2 min-h-[2.5rem] text-[11px] font-semibold leading-5 text-[var(--foreground)]">{label}</span>
                <span className="text-[10px] leading-4 text-[var(--foreground-muted)]">단백질 {product.proteinPerServing}g</span>
              </TrackedLink>
            );
          })}
        </div>
      ) : null}
      <TrackedLink
        href={meta.href}
        trackingLabel={`${meta.name} 전체 비교로 가기`}
        trackingSection="guide_compare_list_cta"
        trackingPageType="guide"
        linkPosition="mid_content"
        ctaType="all_products"
        className="mt-3 flex items-center justify-center rounded-full bg-[#1F5A3D] px-4 py-3 text-sm font-bold text-white hover:bg-[#16412D]"
      >
        {meta.name} {count}개 전체 비교 보기 →
      </TrackedLink>
    </section>
  );
}
