"use client";

import PurchaseLinkButton from "./PurchaseLinkButton";

type PurchaseLinkRowProps = {
  coupangHref: string;
  naverHref: string;
  officialMallHref?: string | null;
  size?: "sm" | "md";
  onCoupangClick?: () => void;
  onNaverClick?: () => void;
  onOfficialClick?: () => void;
};

export default function PurchaseLinkRow({
  coupangHref,
  naverHref,
  officialMallHref,
  size = "md",
  onCoupangClick,
  onNaverClick,
  onOfficialClick,
}: PurchaseLinkRowProps) {
  return (
    <div className="purchase-link-row">
      <PurchaseLinkButton
        href={coupangHref}
        label="쿠팡 구매"
        mobileLabel="쿠팡"
        tone="coupang"
        size={size}
        onClick={onCoupangClick}
      />
      <PurchaseLinkButton
        href={naverHref}
        label="네이버 구매"
        mobileLabel="네이버"
        tone="naver"
        size={size}
        onClick={onNaverClick}
      />
      <PurchaseLinkButton
        href={officialMallHref}
        label="공식몰 구매"
        mobileLabel="공식몰"
        tone="official"
        size={size}
        onClick={onOfficialClick}
        title={officialMallHref ? undefined : "공식몰 정보 없음"}
      />
    </div>
  );
}
