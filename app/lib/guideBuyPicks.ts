// 가이드 하단 구매 섹션에 노출할 대표 제품. 수치는 drinkProductsData.json 기준(단백질·당류·열량).
// 쿠팡 링크가 있는 제품만 골랐고, GuideBuySection이 링크 없는 제품은 자동으로 거른다.
export type GuideBuyTopic = "general" | "workout" | "highProtein" | "diet" | "night" | "lowSugar";

export const GUIDE_BUY_PICKS: Record<GuideBuyTopic, { caption: string; slugs: string[] }> = {
  general: {
    caption: "단백질 20g 안팎, 당류 1g 이하로 부담 없이 시작하기 좋은 제품",
    slugs: ["takefit-max-goso-250", "danbaek-drink-chocolate-250", "hymune-balance-active-deepchoco-250"],
  },
  workout: {
    caption: "운동 후 한 병으로 단백질을 채우기 좋은 고단백 제품",
    slugs: ["takefit-monster-goso-350", "labnosh-protein-max-choco-400", "sellex-profit-sports-wildchoco-350"],
  },
  highProtein: {
    caption: "한 병에 45g 이상 담긴 고단백 제품",
    slugs: ["takefit-extreme-450", "hymune-ultra-400", "takefit-monster-goso-350"],
  },
  diet: {
    caption: "100kcal 안팎에 단백질 18g 이상, 당류 0g인 제품",
    slugs: ["danbaek-water-apple-400", "newcare-olprotein-water-lemon-350", "calobye-sparkling-grape-340"],
  },
  night: {
    caption: "저녁 이후에도 부담이 적은 100kcal 안팎, 당류 1g 이하 제품",
    slugs: ["hymune-balance-active-night-tiramisu-zero-250", "danbaek-drink-banana-250", "newcare-olprotein-water-lemon-350"],
  },
  lowSugar: {
    caption: "당류 0g이면서 단백질 25g 안팎인 제품",
    slugs: ["labnosh-protein-perfect-choco-350", "newcare-all-protein-choco-245", "takefit-pro-lemon-500"],
  },
};
