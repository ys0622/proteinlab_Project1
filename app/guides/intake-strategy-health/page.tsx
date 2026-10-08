import GuideTrackPage from "../[track]/page";

export const metadata = {
  title: "단백질 섭취 전략·건강 가이드 — 타이밍·체중관리·50대 단백질",
  description:
    "단백질을 언제, 얼마나, 어떤 상황에서 챙겨야 할지 정리한 섭취 전략 가이드입니다. 체중 관리, 식사대용, 운동 전후, 50대 단백질 전략까지 한 번에 볼 수 있습니다.",
  alternates: { canonical: "https://proteinlab.kr/guides/intake-strategy-health" },
};

export default function IntakeStrategyHealthPage() {
  return GuideTrackPage({ params: Promise.resolve({ track: "intake-strategy-health" }) });
}
