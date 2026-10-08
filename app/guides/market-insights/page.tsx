import GuideTrackPage from "../[track]/page";

export const metadata = {
  title: "단백질 제품 시장·신제품 분석 | ProteinLab",
  description:
    "단백질 음료·쉐이크 시장 변화와 신제품의 영양성분을 데이터로 분석한 글을 모았습니다.",
  alternates: { canonical: "https://proteinlab.kr/guides/market-insights" },
};

export default function MarketInsightsPage() {
  return GuideTrackPage({ params: Promise.resolve({ track: "market-insights" }) });
}
