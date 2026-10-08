import GuideTrackPage from "../[track]/page";

export const metadata = {
  title: "운동·라이프스타일 단백질 가이드 | ProteinLab",
  description:
    "운동 전후 단백질 섭취와 일상 식단에 맞는 제품 선택 가이드를 모았습니다.",
  alternates: { canonical: "https://proteinlab.kr/guides/fitness-lifestyle" },
};

export default function FitnessLifestylePage() {
  return GuideTrackPage({ params: Promise.resolve({ track: "fitness-lifestyle" }) });
}
