export type BarNutritionBasis = "per_unit" | "per_pack" | "unknown";

export interface BarServingAuditEntry {
  nutritionBasis: BarNutritionBasis;
  needsServingCheck?: boolean;
  note?: string;
  sourceHint?: string;
}

export const barServingAuditBySlug: Record<string, BarServingAuditEntry> = {
  "danbaekhani-protein-bar-choco-38": {
    nutritionBasis: "per_unit",
    sourceHint: "외부 판매 페이지에서 38g x 10개입으로 확인",
  },
  "danbaekhani-protein-bar-signature-31": {
    nutritionBasis: "per_unit",
    sourceHint: "외부 판매 페이지에서 31g x 5개입으로 확인",
  },
  "dryou-proteinbar-bite-crunch": {
    nutritionBasis: "per_unit",
    sourceHint: "스펙 이미지가 100g당 기준이며 데이터 capacity가 24g이어서 1개 24g 기준으로 환산 반영",
  },
  "dryou-proteinbar-pro-bite-choco-classic": {
    nutritionBasis: "per_unit",
    sourceHint: "스펙 이미지가 100g당 기준이며 데이터 capacity가 24g이어서 1개 24g 기준으로 환산 반영",
  },
  "dryou-proteinbar-mini-nuts": {
    nutritionBasis: "unknown",
    needsServingCheck: true,
    note:
      "미니 단위 제품으로 판매되는 SKU라 현재 성분값이 낱개 기준인지, 묶음 또는 표시기준분량 기준인지 추가 확인이 필요합니다.",
    sourceHint: "닥터유 미니 제품군 외부 판매 규격과 내부 값 재대조 필요",
  },
  "nobrand-proteinbar-mini": {
    nutritionBasis: "unknown",
    needsServingCheck: true,
    note:
      "노브랜드 미니 단백질바는 외부 판매 페이지에서 개별 중량 정보가 다르게 노출되는 사례가 있어 낱개 기준 재확인이 필요합니다.",
    sourceHint: "외부 판매 페이지/칼로리 DB 기준 중량 차이 존재",
  },
  "post-proteinbar-mini": {
    nutritionBasis: "per_unit",
    sourceHint: "외부 판매 페이지에서 11g x 21개입으로 확인",
  },
  "proteinbangatgan-harudanbaekbar-jetchococake": {
    nutritionBasis: "per_unit",
    sourceHint: "외부 영양 DB에서 40g 1인분 기준으로 확인",
  },
  "organica-ola-chewy-protein-bar-berry-almond-35": {
    nutritionBasis: "per_unit",
    sourceHint: "외부 영양 DB 및 판매 페이지에서 35g 1개 기준으로 확인",
  },
  "organica-ola-chewy-protein-bar-peanut-cacao-35": {
    nutritionBasis: "per_unit",
    sourceHint: "외부 영양 DB 및 판매 페이지에서 35g 1개 기준으로 확인",
  },
  "kellogg-protein-granolabar-savory": {
    nutritionBasis: "per_unit",
    sourceHint: "외부 영양 DB에서 35g 1인분 기준으로 확인",
  },
  "kellogg-proteinbark-nuts": {
    nutritionBasis: "per_unit",
    sourceHint: "프로틴바K 계열 외부 판매 규격 기준 1개 단위 제품으로 확인",
  },
  "kellogg-proteinbark-caramel-nuts": {
    nutritionBasis: "per_unit",
    sourceHint: "프로틴바K 계열 외부 판매 규격 기준 1개 단위 제품으로 확인",
  },
  "kellogg-proteinbark-hazelnut-darkchoco": {
    nutritionBasis: "per_unit",
    sourceHint: "프로틴바K 계열 외부 판매 규격 기준 1개 단위 제품으로 확인",
  },
  "gomgom-proteinbar-mini": {
    nutritionBasis: "per_unit",
    sourceHint: "스펙 이미지가 100g당 기준이며 데이터 capacity가 10g이어서 1개 10g 기준으로 환산 반영",
  },
};
