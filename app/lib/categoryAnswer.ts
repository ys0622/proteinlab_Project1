import { formatProductLabel } from "./productLabel";

// 목록 페이지 첫 화면 한 줄 답(2026-11-14, ChatGPT·검색 유입 랜딩 보강). /bars의 답 줄(11/13)과 같은 형식으로 성분표 데이터에서 계산한다.
type AnswerProduct = { brand: string; name: string; proteinPerServing: number; sugar?: number | null; needsServingCheck?: boolean };

export function getCategoryAnswer(products: AnswerProduct[], unitLabel: string, highProteinG: number) {
  const withProtein = products.filter((p) => Number.isFinite(p.proteinPerServing) && p.proteinPerServing > 0);
  if (withProtein.length === 0) return "";
  const top = [...withProtein]
    .filter((p) => !p.needsServingCheck)
    .sort((a, b) => b.proteinPerServing - a.proteinPerServing || (a.sugar ?? 99) - (b.sugar ?? 99))[0];
  const sorted = withProtein.map((p) => p.proteinPerServing).sort((a, b) => a - b);
  const median = sorted[Math.floor(sorted.length / 2)];
  const high = withProtein.filter((p) => p.proteinPerServing >= highProteinG).length;
  const zeroSugar = products.filter((p) => p.sugar === 0).length;
  // 제품명 괄호는 풀어 쓴다(괄호 겹침 방지).
  const topLabel = top ? formatProductLabel(top.brand, top.name).replace(/\s*\(([^)]*)\)$/, " $1") : "";
  return `${unitLabel} 단백질 중간값 ${median}g, ${highProteinG}g 이상 ${high}종${topLabel ? `, 가장 많은 제품은 ${topLabel} ${top.proteinPerServing}g` : ""}${zeroSugar > 0 ? `, 당류 0g ${zeroSugar}종` : ""}입니다.`;
}
