import GuideTrackPage from "../[track]/page";

export const metadata = {
  title: "단백질 음료 비교·추천 가이드 — 셀렉스·하이뮨·테이크핏",
  description:
    "셀렉스, 하이뮨, 테이크핏, 뉴케어까지 단백질 음료 비교와 추천 가이드를 한 번에 모았습니다. 입문자, 다이어트, 40g 고단백 비교까지 바로 볼 수 있습니다.",
  alternates: { canonical: "https://proteinlab.kr/guides/product-selection-comparison" },
};

export default function ProductSelectionComparisonPage() {
  return GuideTrackPage({ params: Promise.resolve({ track: "product-selection-comparison" }) });
}
