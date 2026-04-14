import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "단백질 제품 비교 — 음료·바·요거트·쉐이크 성분 비교표",
  description:
    "단백질 음료, 바, 요거트, 쉐이크를 최대 4개까지 한 화면에서 비교하세요. 단백질 함량, 칼로리, 당류, 밀도, 원료까지 바로 확인할 수 있습니다.",
};

export default function CompareLayout({ children }: { children: React.ReactNode }) {
  return children;
}
