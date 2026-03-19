"use client";

import PurchaseLinkButton from "./PurchaseLinkButton";

type PurchaseLinkRowProps = {
  coupangHref: string | null;
  naverHref: string | null;
  officialMallHref: string | null;
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
        label={coupangHref ? "쿠팡 구매" : "링크 준비중"}
        mobileLabel={coupangHref ? "쿠팡" : "준비중"}
        tone="coupang"
        size={size}
        onClick={coupangHref ? onCoupangClick : undefined}
        title={coupangHref ? undefined : "쿠팡 링크가 등록되지 않았습니다"}
      />
      <PurchaseLinkButton
        href={naverHref}
        label={naverHref ? "네이버 구매" : "링크 준비중"}
        mobileLabel={naverHref ? "네이버" : "준비중"}
        tone="naver"
        size={size}
        onClick={naverHref ? onNaverClick : undefined}
        title={naverHref ? undefined : "네이버 링크가 등록되지 않았습니다"}
      />
      <PurchaseLinkButton
        href={officialMallHref}
        label={officialMallHref ? "공식몰 구매" : "링크 준비중"}
        mobileLabel={officialMallHref ? "공식몰" : "준비중"}
        tone="official"
        size={size}
        onClick={officialMallHref ? onOfficialClick : undefined}
        title={officialMallHref ? undefined : "공식몰 링크가 등록되지 않았습니다"}
      />
    </div>
  );
}
