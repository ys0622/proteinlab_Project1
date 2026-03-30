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
        label="쿠팡에서 가격 보기"
        mobileLabel="쿠팡 가격"
        tone="coupang"
        size={size}
        onClick={coupangHref ? onCoupangClick : undefined}
        title={coupangHref ? undefined : "쿠팡 구매 링크를 아직 확인 중입니다."}
      />
      <PurchaseLinkButton
        href={naverHref}
        label="네이버에서 가격 보기"
        mobileLabel="네이버 가격"
        tone="naver"
        size={size}
        onClick={naverHref ? onNaverClick : undefined}
        title={naverHref ? undefined : "네이버 구매 링크를 아직 확인 중입니다."}
      />
      <PurchaseLinkButton
        href={officialMallHref}
        label="공식몰 가격 보기"
        mobileLabel="공식몰 가격"
        tone="official"
        size={size}
        onClick={officialMallHref ? onOfficialClick : undefined}
        title={officialMallHref ? undefined : "공식몰 구매 링크를 아직 확인 중입니다."}
      />
    </div>
  );
}
