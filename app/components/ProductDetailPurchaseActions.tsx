"use client";

import PurchaseLinkRow from "./PurchaseLinkRow";
import { purchaseClick } from "../../lib/analytics";

type ProductDetailPurchaseActionsProps = {
  brand: string;
  coupangHref: string | null;
  naverHref: string | null;
  officialMallHref: string | null;
  productName: string;
  slug: string;
};

export default function ProductDetailPurchaseActions({
  brand,
  coupangHref,
  naverHref,
  officialMallHref,
  productName,
  slug,
}: ProductDetailPurchaseActionsProps) {
  const placement = "product_detail_hero_purchase";
  const hasPurchaseLink = Boolean(coupangHref);
  const coupangCta = "최저가 확인";

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
    });

  return (
    <div
      className="rounded-2xl border border-[#ded8cf] bg-white/72 p-3 shadow-[0_10px_24px_rgba(60,45,30,0.06)] md:p-4"
      style={{ borderRadius: "16px" }}
    >
      <div className="mb-3 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[11px] font-bold tracking-[0.08em] text-[var(--accent)]">
            구매 채널
          </p>
          <h2 className="text-base font-bold text-[var(--foreground)]">
            구매처 바로 확인
          </h2>
        </div>
        <p className="text-[10px] leading-4 text-[#9b9287]">
          쿠팡 파트너스 링크가 포함될 수 있습니다.
        </p>
      </div>

      <p className="mb-3 text-xs leading-5 text-[var(--foreground-muted)] md:text-sm">
        {hasPurchaseLink
          ? "쿠팡 최저가를 바로 확인하세요."
          : "구매 채널 링크를 확인 중입니다. 지금은 카테고리 목록에서 후보를 먼저 비교해보는 편이 좋습니다."}
      </p>

      <PurchaseLinkRow
        coupangHref={coupangHref}
        naverHref={naverHref}
        officialMallHref={officialMallHref}
        size="md"
        coupangOnly
        coupangLabel={coupangCta}
        onCoupangClick={() => trackPurchase("coupang", coupangHref, coupangCta)}
      />
    </div>
  );
}
