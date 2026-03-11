"use client";

type PurchaseLinkRowProps = {
  coupangHref: string;
  naverHref: string;
  officialMallHref?: string | null;
  size?: "sm" | "md";
  onCoupangClick?: () => void;
  onNaverClick?: () => void;
  onOfficialClick?: () => void;
};

function getButtonClassName(size: "sm" | "md", tone: "coupang" | "naver" | "official") {
  const sizeClass =
    size === "sm"
      ? "purchase-link-button--sm"
      : "purchase-link-button--md";
  const toneClass =
    tone === "coupang"
      ? "purchase-link-button--coupang"
      : tone === "naver"
        ? "purchase-link-button--naver"
        : "purchase-link-button--official";

  return `purchase-link-button ${sizeClass} ${toneClass}`;
}

export default function PurchaseLinkRow({
  coupangHref,
  naverHref,
  officialMallHref,
  size = "md",
  onCoupangClick,
  onNaverClick,
  onOfficialClick,
}: PurchaseLinkRowProps) {
  const coupangClassName = getButtonClassName(size, "coupang");
  const naverClassName = getButtonClassName(size, "naver");
  const officialClassName = getButtonClassName(size, "official");

  return (
    <div className="purchase-link-row">
      <a
        href={coupangHref}
        target="_blank"
        rel="noopener noreferrer"
        className={coupangClassName}
        onClick={onCoupangClick}
      >
        쿠팡 구매
      </a>
      <a
        href={naverHref}
        target="_blank"
        rel="noopener noreferrer"
        className={naverClassName}
        onClick={onNaverClick}
      >
        네이버 구매
      </a>
      {officialMallHref ? (
        <a
          href={officialMallHref}
          target="_blank"
          rel="noopener noreferrer"
          className={officialClassName}
          onClick={onOfficialClick}
        >
          공식몰 구매
        </a>
      ) : (
        <span
          className={`${officialClassName} purchase-link-button--disabled cursor-not-allowed`}
          title="공식몰 정보 없음"
        >
          공식몰 구매
        </span>
      )}
    </div>
  );
}
