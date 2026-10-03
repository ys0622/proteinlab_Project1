"use client";

import PurchaseLinkButton from "./PurchaseLinkButton";
import type { PurchaseLinkTracking } from "./PurchaseLinkButton";

type PurchaseLinkRowProps = {
  coupangHref: string | null;
  naverHref: string | null;
  officialMallHref: string | null;
  size?: "sm" | "md";
  coupangOnly?: boolean;
  coupangLabel?: string;
  coupangMobileLabel?: string;
  naverLabel?: string;
  naverMobileLabel?: string;
  officialLabel?: string;
  officialMobileLabel?: string;
  onCoupangClick?: () => void;
  onNaverClick?: () => void;
  onOfficialClick?: () => void;
  coupangImpressionTracking?: PurchaseLinkTracking;
};

export default function PurchaseLinkRow({
  coupangHref,
  naverHref,
  officialMallHref,
  size = "md",
  coupangOnly = false,
  coupangLabel = "쿠팡 가격 보기",
  coupangMobileLabel = "가격 보기",
  naverLabel = "네이버 쇼핑",
  naverMobileLabel = "네이버",
  officialLabel = "공식몰",
  officialMobileLabel = "공식몰",
  onCoupangClick,
  onNaverClick,
  onOfficialClick,
  coupangImpressionTracking,
}: PurchaseLinkRowProps) {
  const hasCoupang = Boolean(coupangHref);
  const rowClass = coupangOnly
    ? "purchase-link-row purchase-link-row--single"
    : hasCoupang
      ? "purchase-link-row"
      : "purchase-link-row purchase-link-row--two";

  return (
    <div className={rowClass}>
      {(hasCoupang || coupangOnly) && (
        <PurchaseLinkButton
          href={coupangHref}
          label={coupangOnly ? "쿠팡 가격 보기" : coupangLabel}
          mobileLabel={coupangOnly ? "가격 보기" : coupangMobileLabel}
          tone="coupang"
          size={size}
          onClick={coupangHref ? onCoupangClick : undefined}
          impressionTracking={coupangImpressionTracking}
          title={coupangHref ? undefined : "쿠팡 구매 링크를 아직 확인 중입니다."}
        />
      )}
      {!coupangOnly && (
        <PurchaseLinkButton
          href={naverHref}
          label={naverLabel}
          mobileLabel={naverMobileLabel}
          tone="naver"
          size={size}
          onClick={naverHref ? onNaverClick : undefined}
          title={naverHref ? undefined : "네이버 쇼핑 링크를 아직 확인 중입니다."}
        />
      )}
      {!coupangOnly && (
        <PurchaseLinkButton
          href={officialMallHref}
          label={officialLabel}
          mobileLabel={officialMobileLabel}
          tone="official"
          size={size}
          onClick={officialMallHref ? onOfficialClick : undefined}
          title={officialMallHref ? undefined : "공식몰 구매 링크를 아직 확인 중입니다."}
        />
      )}
    </div>
  );
}
