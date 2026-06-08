"use client";

import PurchaseLinkButton from "./PurchaseLinkButton";

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
};

export default function PurchaseLinkRow({
  coupangHref,
  naverHref,
  officialMallHref,
  size = "md",
  coupangOnly = false,
  coupangLabel = "쿠팡 구매",
  coupangMobileLabel = "쿠팡",
  naverLabel = "네이버 쇼핑",
  naverMobileLabel = "네이버",
  officialLabel = "공식몰",
  officialMobileLabel = "공식몰",
  onCoupangClick,
  onNaverClick,
  onOfficialClick,
}: PurchaseLinkRowProps) {
  return (
    <div className={coupangOnly ? "purchase-link-row purchase-link-row--single" : "purchase-link-row"}>
      <PurchaseLinkButton
        href={coupangHref}
        label={coupangOnly ? "쿠팡에서 구매하기" : coupangLabel}
        mobileLabel={coupangOnly ? "쿠팡에서 구매" : coupangMobileLabel}
        tone="coupang"
        size={size}
        onClick={coupangHref ? onCoupangClick : undefined}
        title={coupangHref ? undefined : "쿠팡 구매 링크를 아직 확인 중입니다."}
      />
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
