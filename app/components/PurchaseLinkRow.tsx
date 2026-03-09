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

function getButtonClassName(size: "sm" | "md") {
  const sizeClass = size === "sm" ? "h-9 px-3 text-xs" : "h-10 px-4 text-sm";
  return `inline-flex w-full items-center justify-center rounded-full border border-[#e2e2e2] bg-white ${sizeClass} font-medium text-[var(--foreground)] transition-colors hover:border-[var(--accent)] hover:bg-[var(--accent-light)] hover:text-[var(--accent)]`;
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
  const buttonClassName = getButtonClassName(size);

  return (
    <div className="grid grid-cols-3 gap-2">
      <a
        href={coupangHref}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClassName}
        onClick={onCoupangClick}
      >
        쿠팡 구매
      </a>
      <a
        href={naverHref}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClassName}
        onClick={onNaverClick}
      >
        네이버 구매
      </a>
      {officialMallHref ? (
        <a
          href={officialMallHref}
          target="_blank"
          rel="noopener noreferrer"
          className={buttonClassName}
          onClick={onOfficialClick}
        >
          공식몰 구매
        </a>
      ) : (
        <span
          className={`${buttonClassName} cursor-not-allowed border-[#e8e8e8] bg-[#f9f9f9] text-[#b5b5b5] hover:border-[#e8e8e8] hover:bg-[#f9f9f9] hover:text-[#b5b5b5]`}
          title="공식몰 정보 없음"
        >
          공식몰 구매
        </span>
      )}
    </div>
  );
}
