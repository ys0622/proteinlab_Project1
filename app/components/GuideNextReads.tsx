import RelatedLinkCards from "./RelatedLinkCards";
import nextReads from "../data/guideNextReads.json";

type NextReadLink = { href: string; title: string; description: string };

// 가이드 하단에서 이어 읽을 관련 가이드. 링크 제목·설명은 각 가이드의 실제 메타 정보를 그대로 쓴다.
export default function GuideNextReads({ path }: { path: string }) {
  const links = (nextReads as Record<string, NextReadLink[]>)[path] ?? [];
  if (links.length === 0) return null;

  return (
    <div className="mx-auto max-w-[1200px] px-4 pb-8 md:px-6">
      <RelatedLinkCards
        title="이어서 읽기 좋은 가이드"
        description="같이 보면 비교 기준을 정리하기 좋은 가이드입니다."
        links={links}
        sectionId="guide_next_reads"
      />
    </div>
  );
}
