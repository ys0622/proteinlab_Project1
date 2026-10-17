"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import PurchaseLinkRow from "./PurchaseLinkRow";
import { purchaseClick } from "../../lib/analytics";

export type DiscontinuedAlternative = {
  slug: string;
  brand: string;
  name: string;
  imageUrl: string | null;
  href: string;
  facts: string[];
  reason: string;
};

type ProductDetailPurchaseActionsProps = {
  brand: string;
  coupangHref: string | null;
  naverHref: string | null;
  officialMallHref: string | null;
  productName: string;
  slug: string;
  productType?: "drink" | "bar" | "yogurt" | "shake" | "soymilk";
  /** 버튼 위에 보여줄 핵심 수치(예: "단백질 10g"). 1회 기준 비교가 가능한 제품만 넘긴다. */
  quickFacts?: string[];
  /** 판매 중단 제품일 때 보여줄 판매 중인 대체 후보(서버에서 계산). */
  alternatives?: DiscontinuedAlternative[];
  /** 제목 줄 오른쪽에 붙일 작은 버튼(카카오톡 공유 아이콘). */
  headerAction?: ReactNode;
};

export default function ProductDetailPurchaseActions({
  brand,
  coupangHref,
  naverHref,
  officialMallHref,
  productName,
  slug,
  productType,
  quickFacts,
  alternatives = [],
  headerAction,
}: ProductDetailPurchaseActionsProps) {
  const placement = "product_detail_hero_purchase";
  const hasPurchaseLink = Boolean(coupangHref);
  const coupangCta = "쿠팡에서 최저가 확인하기 →";
  const categoryHref = { drink: "/drinks", bar: "/bars", yogurt: "/yogurt", shake: "/shake", soymilk: "/soymilk" }[productType ?? "drink"];

  const trackPurchase = (
    store: "coupang" | "naver" | "official",
    destinationUrl: string | null,
    ctaText: string,
  ) =>
    purchaseClick({
      productId: slug,
      productName,
      brand,
      store,
      destinationUrl: destinationUrl ?? undefined,
      placement,
      ctaText,
      category: productType,
      source: "product_detail_hero",
    });

  if (!hasPurchaseLink) {
    return (
      <div
        className="rounded-2xl border border-[#ded8cf] bg-white/72 p-3 md:p-4"
        style={{ borderRadius: "16px" }}
      >
        <p className="text-[11px] font-bold tracking-[0.08em] text-[#9b9287]">판매 정보</p>
        <h2 className="text-base font-bold text-[var(--foreground-muted)]" style={productType === "soymilk" ? { color: "var(--foreground)" } : undefined}>
          {productType === "soymilk" ? "쿠팡 구매 링크를 준비 중입니다" : "현재 쿠팡에서 판매가 확인되지 않습니다"}
        </h2>
        <p className="mt-2 text-xs leading-5 text-[var(--foreground-muted)] md:text-sm">
          {productType === "soymilk"
            ? "성분 정보를 먼저 공개했고, 쿠팡 구매 링크는 확인되는 대로 연결합니다. 비슷한 조건의 두유는 아래 비교 제품이나 목록에서 확인해보세요."
            : alternatives.length > 0
              ? "단종되었거나 판매가 중단된 제품이라 구매 링크를 제공하지 않습니다. 성분 정보는 참고용으로 남겨두었습니다."
              : "단종되었거나 판매가 중단된 제품으로 확인되어 구매 링크를 제공하지 않습니다. 성분 정보는 참고용으로 남겨두었으니, 비슷한 조건의 판매 중인 제품은 아래 비교 제품이나 카테고리 목록에서 확인해보세요."}
        </p>
        {alternatives.length > 0 ? (
          <div className="mt-3 border-t border-dashed border-[#d6cfc4] pt-3">
            <p className="text-[11px] font-bold tracking-[0.08em] text-[var(--accent)]">판매 중인 비슷한 제품</p>
            <h3 className="mb-2 mt-0.5 text-[15px] font-bold text-[var(--foreground)]">지금 살 수 있는 대체 후보</h3>
            <div className="space-y-2">
              {alternatives.map((alt, index) => (
                <div key={alt.slug} className="flex items-center gap-2.5 rounded-[14px] border border-[var(--border)] bg-white p-2">
                  <Link href={`/product/${alt.slug}`} className="flex min-w-0 flex-1 items-center gap-2.5">
                    {alt.imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={alt.imageUrl} alt="" width={52} height={52} loading="lazy" className="h-[52px] w-[52px] shrink-0 object-contain" />
                    ) : null}
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[13px] font-semibold text-[var(--foreground)]">{alt.name}</span>
                      <span className="mt-1 flex flex-wrap gap-1">
                        {alt.facts.map((fact) => (
                          <span key={fact} className="rounded-full bg-[var(--accent-light)] px-2 py-0.5 text-[11px] font-semibold text-[var(--accent)]">
                            {fact}
                          </span>
                        ))}
                      </span>
                      <span className="mt-0.5 block text-[11px] text-[#9b9287]">{alt.reason}</span>
                    </span>
                  </Link>
                  <a
                    href={alt.href}
                    target="_blank"
                    rel="sponsored nofollow noopener noreferrer"
                    onClick={() =>
                      purchaseClick({
                        productId: alt.slug,
                        productName: alt.name,
                        brand: alt.brand,
                        store: "coupang",
                        destinationUrl: alt.href,
                        placement: "product_detail_discontinued_alt",
                        ctaText: "쿠팡 보기",
                        category: productType,
                        source: `discontinued_alt:${slug}`,
                        position: index + 1,
                      })
                    }
                    className="shrink-0 whitespace-nowrap rounded-full bg-[#c8102e] px-2.5 py-2 text-xs font-bold text-white hover:opacity-90"
                  >
                    쿠팡 보기
                  </a>
                </div>
              ))}
            </div>
            <p className="mt-1.5 text-[10px] text-[#9b9287]">쿠팡 파트너스 링크가 포함될 수 있습니다.</p>
          </div>
        ) : null}
        <Link
          href={categoryHref}
          className="mt-3 inline-flex min-h-11 items-center rounded-full border border-[var(--border)] bg-white px-4 text-sm font-semibold text-[var(--accent)] hover:border-[var(--accent)]"
        >
          같은 카테고리 제품 보기 →
        </Link>
      </div>
    );
  }

  return (
    <div
      className="rounded-2xl border border-[#ded8cf] bg-white/72 p-3 shadow-[0_10px_24px_rgba(60,45,30,0.06)] md:p-4"
      style={{ borderRadius: "16px" }}
    >
      <div className="mb-3 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-[11px] font-bold tracking-[0.08em] text-[var(--accent)]">
              구매 채널
            </p>
            <h2 className="text-base font-bold text-[var(--foreground)]">
              구매처 바로 확인
            </h2>
          </div>
          {headerAction}
        </div>
        <p className="text-[10px] leading-4 text-[#9b9287]">
          쿠팡 파트너스 링크가 포함될 수 있습니다.
        </p>
      </div>

      {quickFacts && quickFacts.length > 0 ? (
        <div className="mb-3 flex flex-wrap gap-1.5">
          {quickFacts.map((fact) => (
            <span
              key={fact}
              className="rounded-full bg-[var(--accent-light)] px-2.5 py-1 text-xs font-semibold text-[var(--accent)]"
            >
              {fact}
            </span>
          ))}
        </div>
      ) : null}

      <PurchaseLinkRow
        coupangHref={coupangHref}
        naverHref={naverHref}
        officialMallHref={officialMallHref}
        size="md"
        coupangOnly
        coupangLabel={coupangCta}
        coupangOnlyLabel={coupangCta}
        coupangImpressionTracking={{
          productId: slug,
          productName,
          productBrand: brand,
          productCategory: productType,
          linkPosition: "hero",
          contentId: "product_detail_hero",
        }}
        onCoupangClick={() => trackPurchase("coupang", coupangHref, coupangCta)}
      />
      <p className="mt-2 text-xs leading-5 text-[var(--foreground-muted)]">
        할인·묶음 옵션은 쿠팡 페이지에서 바뀔 수 있어요.
      </p>
    </div>
  );
}
