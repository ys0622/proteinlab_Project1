interface ServingBasisNoticeProps {
  className?: string;
  detail?: boolean;
  needsServingCheck?: boolean;
  note?: string;
}

const DEFAULT_DETAIL_NOTICE_LINES = [
  "이 제품은 소포장 제품으로 보이며, 현재 수집값이 낱개 기준인지 재확인이 필요합니다. 구매 전 라벨의 기준 중량과 1개당 영양정보를 다시 확인해주세요.",
  "일부 단백질 바는 소포장 또는 멀티팩 제품으로, 표시 성분이 1개 기준이 아닐 수 있습니다. 구매 전 제품 라벨의 기준 중량과 1개당 영양정보를 다시 확인해주세요.",
];

const COMPACT_NOTICE_LINES = [
  "제품 정보 안내",
  "소포장 또는 멀티팩 제품은 표시 성분이 낱개 기준이 아닐 수 있습니다.",
  "구매 전 라벨의 기준 중량과 1개당 영양정보를 다시 확인해주세요.",
];

export default function ServingBasisNotice({
  className = "",
  detail = false,
  needsServingCheck = false,
  note,
}: ServingBasisNoticeProps) {
  if (!detail) {
    return (
      <div
        className={`text-xs leading-5 text-[#6b7280] ${className}`.trim()}
        role="note"
        aria-label="소포장 제품 안내"
      >
        <p className="font-medium text-[#6b7280]">{COMPACT_NOTICE_LINES[0]}</p>
        <p>{COMPACT_NOTICE_LINES[1]}</p>
        <p>{COMPACT_NOTICE_LINES[2]}</p>
      </div>
    );
  }

  return (
    <div
      className={`rounded-xl border border-[#efe2bf] bg-[#fff8e8] px-4 py-3 text-sm text-[#6a5733] ${className}`.trim()}
      role="note"
      aria-label="소포장 제품 영양정보 안내"
    >
      {needsServingCheck && note ? (
        <p>{note}</p>
      ) : (
        <div className="space-y-2">
          {DEFAULT_DETAIL_NOTICE_LINES.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      )}
    </div>
  );
}
