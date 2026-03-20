export const metadata = {
  title: "단백질 제품 등급 기준 | ProteinLab",
  description:
    "ProteinLab의 단백질 제품 등급(A·B·C·D) 산정 기준을 공개합니다. 단백질 밀도(g/100kcal)와 식이 목적별 기준값을 음료·바·요거트·쉐이크 카테고리별로 확인하세요.",
};

export default function GradeCriteriaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
