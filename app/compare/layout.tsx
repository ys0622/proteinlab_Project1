import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "단백질 제품 비교 | ProteinLab",
  description:
    "단백질 음료·바·요거트·쉐이크를 최대 4개까지 나란히 비교하세요. 단백질 함량, 칼로리, 당류, 밀도 등 핵심 영양 지표를 한눈에 확인합니다.",
};

export default function CompareLayout({ children }: { children: React.ReactNode }) {
  return children;
}
