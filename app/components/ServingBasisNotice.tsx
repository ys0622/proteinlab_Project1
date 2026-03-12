interface ServingBasisNoticeProps {
  className?: string;
  detail?: boolean;
  needsServingCheck?: boolean;
  note?: string;
}

const DEFAULT_BAR_NOTICE =
  "일부 단백질 바는 소포장 또는 멀티팩 제품으로, 표시 성분이 1개 기준이 아닐 수 있습니다. 구매 전 제품 라벨의 기준 중량과 1개당 영양정보를 다시 확인해주세요.";

const COMPACT_BAR_NOTICE_LINES = [
  "ℹ 제품 정보 안내",
  "일부 제품은 멀티팩 기준 영양정보일 수 있습니다.",
  "구매 전 1개당 영양정보를 확인하세요.",
];

export default function ServingBasisNotice({
  className = "",
  detail = false,
  needsServingCheck = false,
  note,
}: ServingBasisNoticeProps) {
  const message = needsServingCheck && note ? note : DEFAULT_BAR_NOTICE;

  if (!detail) {
    return (
      <div
        className={`text-xs leading-5 text-[#6b7280] ${className}`.trim()}
        role="note"
        aria-label="단백질 바 제품 정보 안내"
      >
        <p className="font-medium text-[#6b7280]">{COMPACT_BAR_NOTICE_LINES[0]}</p>
        <p>{COMPACT_BAR_NOTICE_LINES[1]}</p>
        <p>{COMPACT_BAR_NOTICE_LINES[2]}</p>
      </div>
    );
  }

  return (
    <div
      className={`rounded-xl border border-[#efe2bf] bg-[#fff8e8] px-4 py-3 text-sm text-[#6a5733] ${className}`.trim()}
      role="note"
      aria-label="단백질 바 영양성분 기준 안내"
    >
      {message}
    </div>
  );
}
