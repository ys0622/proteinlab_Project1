"use client";

import PurchaseLinkRow from "./PurchaseLinkRow";
import TrackedLink from "./TrackedLink";
import { purchaseClick } from "../../lib/analytics";

type ProductDetailPurchaseActionsProps = {
  brand: string;
  categoryHref: string;
  categoryLabel: string;
  coupangHref: string | null;
  naverHref: string | null;
  officialMallHref: string | null;
  productName: string;
  slug: string;
  variant?: "hero" | "section";
};

export default function ProductDetailPurchaseActions({
  brand,
  categoryHref,
  categoryLabel,
  coupangHref,
  naverHref,
  officialMallHref,
  productName,
  slug,
  variant = "section",
}: ProductDetailPurchaseActionsProps) {
  const isHero = variant === "hero";
  const placement = isHero ? "product_detail_hero_purchase" : "product_detail_after_purchase";
  const hasPurchaseLink = Boolean(coupangHref || naverHref || officialMallHref);

  const trackPurchase = (
    store: "coupang" | "naver" | "official",
    destinationUrl: string | null,
  ) =>
    purchaseClick({
      productId: slug,
      productName,
      brand,
      store,
      destinationUrl: destinationUrl ?? undefined,
      placement,
    });

  return (
    <div
      className={
        isHero
          ? "rounded-2xl border border-[#ded8cf] bg-white/72 p-3 shadow-[0_10px_24px_rgba(60,45,30,0.06)] md:p-4"
          : "rounded-2xl border border-[#e0d8cc] bg-[color-mix(in_srgb,var(--hero-bg)_58%,white)] p-4 shadow-[0_12px_30px_rgba(60,45,30,0.06)]"
      }
      style={{ borderRadius: isHero ? "16px" : "18px" }}
    >
      <div className="mb-3 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[11px] font-bold tracking-[0.08em] text-[var(--accent)]">
            구매 채널
          </p>
          <h2 className="text-base font-bold text-[var(--foreground)]">
            {isHero ? "최신 가격 바로 확인" : "가격·구매 채널 확인"}
          </h2>
        </div>
        <p className="text-[10px] leading-4 text-[#9b9287]">
          쿠팡 파트너스 링크가 포함될 수 있습니다.
        </p>
      </div>

      <p className="mb-3 text-xs leading-5 text-[var(--foreground-muted)] md:text-sm">
        {hasPurchaseLink
          ? "가격과 재고는 수시로 바뀝니다. 결제 전 쿠팡·네이버·공식몰 최종가를 바로 확인하세요."
          : "구매 채널 링크를 확인 중입니다. 지금은 비교와 카테고리 목록에서 후보를 먼저 좁혀보는 편이 빠릅니다."}
      </p>

      <PurchaseLinkRow
        coupangHref={coupangHref}
        naverHref={naverHref}
        officialMallHref={officialMallHref}
        size="md"
        coupangLabel="쿠팡 가격 보기"
        naverLabel="네이버 가격 보기"
        officialLabel="공식몰 보기"
        onCoupangClick={() => trackPurchase("coupang", coupangHref)}
        onNaverClick={() => trackPurchase("naver", naverHref)}
        onOfficialClick={() => trackPurchase("official", officialMallHref)}
      />

      {!isHero ? (
        <div className="mt-4 grid gap-2 sm:grid-cols-2">
          <TrackedLink
            href={`/compare?slugs=${encodeURIComponent(slug)}`}
            trackingLabel="비교함에 넣기"
            trackingSection={placement}
            trackingPageType="product_detail"
            className="inline-flex w-full items-center justify-center rounded-xl border border-[color-mix(in_srgb,var(--accent)_22%,transparent)] bg-white px-4 py-3 text-sm font-semibold text-[var(--accent)] transition-colors hover:bg-[var(--accent-light)]"
          >
            비교함에 넣기
          </TrackedLink>
          <TrackedLink
            href={categoryHref}
            trackingLabel="같은 카테고리 보기"
            trackingSection={placement}
            trackingPageType="product_detail"
            className="inline-flex w-full items-center justify-center rounded-xl border border-[#ded8cf] bg-white px-4 py-3 text-sm font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--accent-light)]"
          >
            같은 {categoryLabel} 보기
          </TrackedLink>
        </div>
      ) : null}
    </div>
  );
}
