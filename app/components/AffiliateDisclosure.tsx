interface AffiliateDisclosureProps {
  className?: string;
}

export default function AffiliateDisclosure({
  className = "",
}: AffiliateDisclosureProps) {
  return (
    <p className={`mb-2 text-[10px] text-gray-400 ${className}`.trim()}>
      이 페이지에는 쿠팡 파트너스 링크가 포함되며, 구매 시 수수료가 발생할 수 있습니다.
    </p>
  );
}
