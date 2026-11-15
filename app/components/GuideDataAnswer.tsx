import { getGuideAnswer } from "@/app/lib/guideAnswer";

/** 개별 가이드 페이지의 첫 화면 한 줄 답(2026-11-15). 그 페이지에 나온 제품의 성분표 수치로 계산한다. */
export default function GuideDataAnswer({ slugs }: { slugs: string[] }) {
  const answer = getGuideAnswer(slugs);
  if (!answer) return null;
  return <p className="mt-2 max-w-3xl break-keep text-sm font-semibold leading-6 text-[#2F3B33]">{answer}</p>;
}
