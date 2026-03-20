interface AffiliateDisclosureProps {
  className?: string;
}

export default function AffiliateDisclosure({
  className = "",
}: AffiliateDisclosureProps) {
  return (
    <p
      className={`mb-2 text-xs leading-[1.4] text-[#6b7280] ${className}`.trim()}
    >
      ※ 본 페이지에는 쿠팡 파트너스 링크가 포함되어 있으며, 구매 시 일정 수수료를
      제공받을 수 있습니다.
    </p>
  );
}
