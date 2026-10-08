import type { Metadata } from "next";
import type { ReactNode } from "react";
import { getGuideTrack } from "@/app/data/guidesTracks";

export async function generateMetadata({ params }: { params: Promise<{ track: string }> }): Promise<Metadata> {
  const { track } = await params;
  const section = getGuideTrack(track);
  if (!section) return {};

  let title = section.title;
  let description = section.description;

  if (track === "product-selection-comparison") {
    title = "단백질 음료 비교·추천 가이드 — 셀렉스·하이뮨·테이크핏";
    description = "셀렉스, 하이뮨, 테이크핏, 뉴케어까지 단백질 음료 비교와 추천 가이드를 한 번에 모았습니다. 입문자, 다이어트, 40g 고단백 비교까지 바로 볼 수 있습니다.";
  } else if (track === "intake-strategy-health") {
    title = "단백질 섭취 전략·건강 가이드 — 타이밍·체중관리·50대 단백질";
    description = "단백질을 언제, 얼마나, 어떤 상황에서 챙겨야 할지 정리한 섭취 전략 가이드입니다. 체중 관리, 식사대용, 운동 전후, 50대 단백질 전략까지 한 번에 볼 수 있습니다.";
  }

  const url = `https://proteinlab.kr/guides/${track}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      locale: "ko_KR",
      siteName: "ProteinLab",
      images: [{ url: "https://proteinlab.kr/opengraph-image", width: 1200, height: 630, alt: "ProteinLab 단백질 제품 비교" }],
    },
    twitter: {
      card: "summary",
      title,
      description,
      images: ["https://proteinlab.kr/opengraph-image"],
    },
  };
}

export default function GuideTrackLayout({ children }: { children: ReactNode }) {
  return children;
}
