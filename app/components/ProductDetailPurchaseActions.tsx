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
  const hasPurchaseLink = Boolean(coupangHref || naverHref || officialMallHref);
  const coupangCta = "오늘 가격 확인";
  const naverCta = "네이버 최종가 확인";
  const officialCta = "공식몰 혜택 확인";

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
            최신 가격 바로 확인
          </h2>
        </div>
        <p className="text-[10px] leading-4 text-[#9b9287]">
          쿠팡 파트너스 링크가 포함될 수 있습니다.
        </p>
      </div>

      <p className="mb-3 text-xs leading-5 text-[var(--foreground-muted)] md:text-sm">
        {hasPurchaseLink
          ? "할인·쿠폰·배송비까지 최종 결제 전 한 번에 확인하세요."
          : "구매 채널 링크를 확인 중입니다. 지금은 비교와 카테고리 목록에서 후보를 먼저 좁혀보는 편이 빠릅니다."}
      </p>

      <PurchaseLinkRow
        coupangHref={coupangHref}
        naverHref={naverHref}
        officialMallHref={officialMallHref}
        size="md"
        coupangLabel={coupangCta}
        naverLabel={naverCta}
        officialLabel={officialCta}
        onCoupangClick={() => trackPurchase("coupang", coupangHref, coupangCta)}
        onNaverClick={() => trackPurchase("naver", naverHref, naverCta)}
        onOfficialClick={() => trackPurchase("official", officialMallHref, officialCta)}
      />
    </div>
  );
}
