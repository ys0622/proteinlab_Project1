export interface GuideThumbnailConfig {
  slug: string;
  eyebrow: string;
  title: string;
  highlight: string;
  theme: "ranking" | "comparison" | "channel" | "information";
  productImages: string[];
}

export const GUIDE_THUMBNAILS: Record<string, GuideThumbnailConfig> = {
  "protein-shake-top7": {
    slug: "protein-shake-top7",
    eyebrow: "2026 SHAKE RANKING",
    title: "단백질 쉐이크\n추천 TOP 7",
    highlight: "112종 데이터 비교",
    theme: "ranking",
    productImages: ["/guide-thumbnails/products/proteone-proteinshake-choco-40.png", "/guide-thumbnails/products/itthefit-proteinshake-double-choco-40.png", "/guide-thumbnails/products/labnosh-slimshake-double-choco-45.png"],
  },
  "protein-shake-calorie-ranking": {
    slug: "protein-shake-calorie-ranking",
    eyebrow: "CALORIE DATA",
    title: "단백질 쉐이크\n칼로리 순위",
    highlight: "TOP 20",
    theme: "ranking",
    productImages: ["/guide-thumbnails/products/maeilhankki-shake-choco-40.png", "/guide-thumbnails/products/maeilhankki-shake-grain-40.png"],
  },
  "oliveyoung-protein-shake": {
    slug: "oliveyoung-protein-shake",
    eyebrow: "OLIVE YOUNG GUIDE",
    title: "올리브영\n단백질 쉐이크",
    highlight: "단품 테스트 가이드",
    theme: "channel",
    productImages: ["/guide-thumbnails/products/flymill-proteinshake-peanut-butter-45.png", "/guide-thumbnails/products/danbaekhani-proteinshake-choco-40.png", "/guide-thumbnails/products/delight-project-shake-pistachio-choco-45.png"],
  },
  "protein-shake-new-products-2026": {
    slug: "protein-shake-new-products-2026",
    eyebrow: "NEW PRODUCTS 2026",
    title: "단백질 쉐이크\n신제품 24종",
    highlight: "5개 브랜드 비교",
    theme: "comparison",
    productImages: ["/guide-thumbnails/products/delight-project-shake-melon-milk-45.png", "/guide-thumbnails/products/takefit-breadmeal-shake-choco-brownie-45.png", "/guide-thumbnails/products/sportsix-protein-shake-nutty-choco-45.png"],
  },
  "takefit-breadmeal-protein-shake": {
    slug: "takefit-breadmeal-protein-shake",
    eyebrow: "TAKEFIT BREADMEAL",
    title: "테이크핏 브레드밀\n4종 비교",
    highlight: "단백질 20–24g",
    theme: "comparison",
    productImages: ["/guide-thumbnails/products/takefit-breadmeal-shake-choco-brownie-45.png", "/guide-thumbnails/products/takefit-breadmeal-shake-savory-oat-bread-45.png", "/guide-thumbnails/products/takefit-breadmeal-shake-sweet-potato-soboro-45.png"],
  },
  "low-sugar-protein-shake-guide": {
    slug: "low-sugar-protein-shake-guide",
    eyebrow: "LOW SUGAR PICKS",
    title: "저당 단백질\n쉐이크 추천",
    highlight: "당류 3g 이하",
    theme: "ranking",
    productImages: ["/guide-thumbnails/products/sportsix-protein-shake-savory-yulmu-45.png", "/guide-thumbnails/products/maeilhankki-shake-grain-40.png", "/guide-thumbnails/products/takefit-breadmeal-shake-choco-brownie-45.png"],
  },
  "protein-shake-flavor-guide": {
    slug: "protein-shake-flavor-guide",
    eyebrow: "FLAVOR GUIDE",
    title: "단백질 쉐이크\n맛 추천",
    highlight: "초코 · 곡물 · 과일",
    theme: "comparison",
    productImages: ["/guide-thumbnails/products/delight-project-shake-strawberry-yogurt-45.png", "/guide-thumbnails/products/sportsix-protein-shake-savory-yulmu-45.png", "/guide-thumbnails/products/takefit-breadmeal-shake-choco-brownie-45.png"],
  },
  "protein-shake-nutrition-label-guide": {
    slug: "protein-shake-nutrition-label-guide",
    eyebrow: "NUTRITION LABEL",
    title: "쉐이크 성분표\n보는 법",
    highlight: "단백질 · 당류 · 칼로리",
    theme: "information",
    productImages: ["/guide-thumbnails/products/maeilhankki-shake-grain-40.png", "/guide-thumbnails/products/delight-project-shake-melon-milk-45.png"],
  },
};

export function getGuideThumbnailUrl(slug: string) {
  return GUIDE_THUMBNAILS[slug] ? `/api/guide-thumbnail?slug=${encodeURIComponent(slug)}` : null;
}
