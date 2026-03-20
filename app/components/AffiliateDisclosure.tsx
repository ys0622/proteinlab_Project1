interface AffiliateDisclosureProps {
  className?: string;
  mobileCompact?: boolean;
}

export default function AffiliateDisclosure({
  className = "",
  mobileCompact = false,
}: AffiliateDisclosureProps) {
  return (
    <p
      className={`mb-2 text-[10px] leading-[1.3] text-[#6b7280] md:text-xs md:leading-[1.4] ${className}`.trim()}
    >
      {mobileCompact ? (
        <>
          <span className="whitespace-nowrap md:hidden">
            ※ 쿠팡 파트너스 링크 포함, 구매 시 수수료가 발생할 수 있습니다.
          </span>
          <span className="hidden md:inline">
            ※ 본 페이지에는 쿠팡 파트너스 링크가 포함되어 있으며, 구매 시 일정 수수료를
            제공받을 수 있습니다.
          </span>
        </>
      ) : (
        <>
          ※ 본 페이지에는 쿠팡 파트너스 링크가 포함되어 있으며, 구매 시 일정 수수료를
          제공받을 수 있습니다.
        </>
      )}
    </p>
  );
}
