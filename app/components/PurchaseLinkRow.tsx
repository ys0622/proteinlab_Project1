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
    size === "sm" ? "h-9 px-3 text-xs sm:text-[11px] lg:text-xs" : "h-10 px-4 text-sm";
  const toneClass =
    tone === "coupang"
      ? "border-[#f6c7b6] bg-[#fff3ee] text-[#c24e1b] hover:border-[#ef9c7f] hover:bg-[#ffe6db]"
      : tone === "naver"
        ? "border-[#bfe8cf] bg-[#eefbf3] text-[#0f8f45] hover:border-[#8fd0aa] hover:bg-[#ddf6e7]"
        : "border-[#d8d8d8] bg-[#f4f4f4] text-[#4f4f4f] hover:border-[#bdbdbd] hover:bg-[#ebebeb]";

  return `inline-flex w-full items-center justify-center rounded-full border text-center leading-none ${sizeClass} font-medium transition-colors ${toneClass}`;
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
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
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
          className={`${officialClassName} cursor-not-allowed border-[#e3e3e3] bg-[#f7f7f7] text-[#b5b5b5] hover:border-[#e3e3e3] hover:bg-[#f7f7f7] hover:text-[#b5b5b5]`}
          title="공식몰 정보 없음"
        >
          공식몰 구매
        </span>
      )}
    </div>
  );
}
