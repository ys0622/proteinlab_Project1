export type ProductBadgeTone = "grade-a" | "grade-b" | "grade-c" | "grade-d" | "neutral";
export type ProductBadgeKind = "density" | "diet" | "performance" | "lactosefree" | "neutral";

export const METRIC_BADGE_TOOLTIP_TEXT: Record<Exclude<ProductBadgeKind, "neutral">, string> = {
  density:
    "열량 대비 단백질 함량을 의미합니다. 단백질(g)/칼로리(kcal) 기준이며, 높을수록 같은 열량에서 더 많은 단백질을 섭취할 수 있습니다.",
  diet: "당류, 칼로리, 단백질 밀도를 종합적으로 고려한 지표입니다.",
  performance: "운동 후 단백질 보충 관점에서 단백질 함량과 영양 구성을 종합적으로 고려한 지표입니다.",
  lactosefree:
    "유당을 제거하거나 낮춘 제품으로, 유당이 부담되는 소비자에게 적합한 제품입니다.",
};

export function getBadgeKindFromLabel(label: string): ProductBadgeKind {
  if (label.startsWith("밀도 ") || label.startsWith("단백질 밀도 ")) return "density";
  if (label.startsWith("다이어트 ")) return "diet";
  if (label.startsWith("퍼포먼스 ")) return "performance";
  if (label === "락토프리" || label.toLowerCase() === "lactose free") return "lactosefree";
  return "neutral";
}

export function getBadgeToneFromLabel(label: string): ProductBadgeTone {
  const grade = label.split(" ").pop();

  if (grade === "A") return "grade-a";
  if (grade === "B") return "grade-b";
  if (grade === "C") return "grade-c";
  if (grade === "D") return "grade-d";
  return "neutral";
}

export function formatProductBadgeLabel(label: string): string {
  if (label.startsWith("밀도 ")) {
    return label.replace("밀도 ", "단백질 밀도 ");
  }

  return label;
}

export function getProductBadgeTone(label: string): ProductBadgeTone {
  return getBadgeToneFromLabel(label);
}

export function getMetricBadgeKind(label: string): Exclude<ProductBadgeKind, "neutral"> | null {
  const kind = getBadgeKindFromLabel(label);
  return kind === "neutral" ? null : kind;
}

export function getMetricBadgeTooltip(label: string): string | null {
  const kind = getMetricBadgeKind(label);
  return kind ? METRIC_BADGE_TOOLTIP_TEXT[kind] : null;
}

export function getMetricBadgeAriaLabel(label: string): string | undefined {
  const kind = getMetricBadgeKind(label);

  if (!kind) return undefined;

  const map: Record<Exclude<ProductBadgeKind, "neutral">, string> = {
    density: "단백질 밀도 지표 설명 보기",
    diet: "다이어트 지표 설명 보기",
    performance: "퍼포먼스 지표 설명 보기",
    lactosefree: "락토프리 설명 보기",
  };

  return `${formatProductBadgeLabel(label)} - ${map[kind]}`;
}
