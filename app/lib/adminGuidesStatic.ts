export interface AdminGuideArticle {
  slug: string;
  emoji: string;
  title: string;
  description: string;
  heroImage: string;
  content: string;
  readTime: string;
  tags: string[];
  href: string;
  status: "live" | "planned";
}

export interface AdminGuideSection {
  id: string;
  slug: string;
  emoji: string;
  title: string;
  description: string;
  note?: string;
  trackLabel: string;
  accentColor: string;
  accentBg: string;
  previewHref: string;
  articles: AdminGuideArticle[];
}

export interface AdminMainTrack {
  id: string;
  emoji: string;
  title: string;
  subtitle: string;
  description: string;
  count: number;
  href: string;
  accentColor: string;
  accentBg: string;
}

export interface AdminGuidesStaticData {
  mainPage: {
    title: string;
    description: string;
    tracks: AdminMainTrack[];
  };
  sections: AdminGuideSection[];
}

function article(
  slug: string,
  title: string,
  description: string,
  href: string,
  options?: Partial<AdminGuideArticle>,
): AdminGuideArticle {
  return {
    slug,
    title,
    description,
    href,
    emoji: options?.emoji ?? "•",
    heroImage: options?.heroImage ?? "",
    content: options?.content ?? "",
    readTime: options?.readTime ?? "5분 읽기",
    tags: options?.tags ?? [],
    status: options?.status ?? "live",
  };
}

const sections: AdminGuideSection[] = [
  {
    id: "track-a",
    slug: "protein-basics",
    emoji: "🧬",
    title: "단백질 기초",
    description: "단백질의 역할, 권장 섭취량, 부족 신호까지 기초부터 차근차근 이해할 수 있습니다.",
    trackLabel: "TRACK A",
    accentColor: "#2d6a4f",
    accentBg: "#e7f3ec",
    previewHref: "/guides/protein-basics",
    articles: [
      article("protein-functions", "단백질의 역할 개요", "단백질이 근육, 면역, 호르몬과 어떻게 연결되는지 설명합니다.", "/guides/protein-basics/protein-functions", { emoji: "🧩", tags: ["기초", "역할"] }),
      article("muscle", "근육과 단백질", "근육 성장과 회복 관점에서 단백질의 역할을 정리합니다.", "/guides/basics/muscle", { emoji: "💪", tags: ["근육", "회복"] }),
      article("immunity-hormone", "면역·호르몬과 단백질", "항체, 면역세포, 호르몬과 단백질의 연결을 설명합니다.", "/guides/basics/immunity-hormone", { emoji: "🛡️", tags: ["면역", "호르몬"] }),
      article("deficiency-symptoms", "단백질 부족 신호", "피로, 근육 감소, 부종 등 부족 신호를 정리합니다.", "/guides/basics/deficiency-symptoms", { emoji: "🚨", tags: ["결핍", "증상"] }),
      article("daily-requirement", "하루 단백질 섭취량", "체중과 활동량 기준으로 하루 단백질 권장량을 설명합니다.", "/guides/basics/daily-requirement", { emoji: "📏", tags: ["섭취량", "권장량"] }),
      article("digestion", "단백질 소화와 흡수", "단백질이 소화되고 흡수되는 과정을 설명합니다.", "/guides/basics/digestion", { emoji: "🥛", tags: ["소화", "흡수"] }),
    ],
  },
  {
    id: "track-b",
    slug: "product-selection-comparison",
    emoji: "🧪",
    title: "제품 선택 · 비교",
    description: "단백질 음료와 바를 고를 때 성분표를 읽는 법부터 추천 리스트, 랭킹 해석까지 정리했습니다.",
    trackLabel: "TRACK B",
    accentColor: "#2d6a4f",
    accentBg: "#eaf0f6",
    previewHref: "/guides/product-selection-comparison",
    articles: [
      article("protein-drink-guide", "단백질 음료 선택 가이드", "단백질 음료를 볼 때 먼저 체크해야 할 숫자를 정리합니다.", "/guides/product-selection-comparison/protein-drink-guide", { emoji: "🥤", tags: ["음료", "선택"] }),
      article("protein-bar-guide", "단백질 바 선택 가이드", "단백질 바의 용도별 비교 기준을 정리합니다.", "/guides/product-selection-comparison/protein-bar-guide", { emoji: "🍫", tags: ["바", "선택"] }),
      article("nutrition-comparison", "영양성분 비교", "단백질, 당류, 칼로리, 지방을 어떻게 읽을지 설명합니다.", "/guides/product-selection-comparison/nutrition-comparison", { emoji: "📋", tags: ["비교", "영양성분"] }),
      article("nutrition-criteria", "영양성분 기준", "좋은 제품을 고를 때 참고할 최소 기준을 모읍니다.", "/guides/product-selection-comparison/nutrition-criteria", { emoji: "📐", tags: ["기준", "체크리스트"] }),
      article("recommendation-lists", "추천 리스트 활용법", "추천, 큐레이션, picks의 차이와 사용법을 설명합니다.", "/guides/product-selection-comparison/recommendation-lists", { emoji: "🧭", tags: ["추천", "리스트"] }),
      article("ranking-content", "등급 · 랭킹 읽는 법", "등급, 랭킹, 100점 점수를 해석하는 기준을 정리합니다.", "/guides/product-selection-comparison/ranking-content", { emoji: "🏅", tags: ["점수", "랭킹"] }),
    ],
  },
  {
    id: "track-c",
    slug: "intake-strategy-health",
    emoji: "⚙️",
    title: "섭취 전략 · 건강",
    description: "운동 전후, 체중 관리, 식사대용, 노년 전략까지 실생활에 바로 적용할 수 있는 섭취 기준을 정리했습니다.",
    trackLabel: "TRACK C",
    accentColor: "#2d6a4f",
    accentBg: "#f5f0ea",
    previewHref: "/guides/intake-strategy-health",
    articles: [
      article("protein-timing", "단백질 섭취 타이밍", "하루 전체 루틴에서 단백질을 배치하는 방법을 설명합니다.", "/guides/intake-strategy-health/protein-timing", { emoji: "⏰", tags: ["타이밍", "루틴"] }),
      article("pre-workout-protein", "운동 전 단백질", "운동 전 섭취가 필요한 상황과 주의점을 정리합니다.", "/guides/intake-strategy-health/pre-workout-protein", { emoji: "🏃", tags: ["운동 전", "소화"] }),
      article("post-workout-protein", "운동 후 단백질", "회복과 적응을 위한 운동 후 단백질 전략을 설명합니다.", "/guides/intake-strategy-health/post-workout-protein", { emoji: "🔋", tags: ["운동 후", "회복"] }),
      article("weight-management-protein", "체중 관리와 단백질", "다이어트와 체중 관리 상황의 단백질 기준을 정리합니다.", "/guides/intake-strategy-health/weight-management-protein", { emoji: "⚖️", tags: ["체중 관리", "다이어트"] }),
      article("muscle-maintenance-protein", "근육 유지 전략", "감량기와 병행 운동 상황에서 근육을 유지하는 전략입니다.", "/guides/intake-strategy-health/muscle-maintenance-protein", { emoji: "🧱", tags: ["근육 유지", "감량기"] }),
      article("senior-protein-strategy", "노년 단백질 전략", "중장년층이 부담 없이 단백질을 챙기는 기준을 정리합니다.", "/guides/intake-strategy-health/senior-protein-strategy", { emoji: "👵", tags: ["중장년", "건강"] }),
      article("meal-replacement-strategy", "식사대용 전략", "식사대용과 보충용의 차이를 설명합니다.", "/guides/intake-strategy-health/meal-replacement-strategy", { emoji: "🍽️", tags: ["식사대용", "포만감"] }),
    ],
  },
  {
    id: "track-d",
    slug: "fitness-lifestyle",
    emoji: "🏃",
    title: "운동 · 라이프스타일",
    description: "러닝, 마라톤, 근력운동, 운동 초보 루틴까지 실제 운동 상황에 맞는 단백질 전략을 빠르게 찾을 수 있습니다.",
    trackLabel: "TRACK D",
    accentColor: "#2d6a4f",
    accentBg: "#f8ede7",
    previewHref: "/guides/fitness-lifestyle",
    articles: [
      article("running-protein-guide", "러닝 단백질 가이드", "러너의 단백질 필요량과 회복 전략을 설명합니다.", "/guides/fitness-lifestyle/running-protein-guide", { emoji: "🏃‍♂️", tags: ["러닝", "회복"] }),
      article("marathon-protein-guide", "마라톤 영양 전략", "훈련기와 레이스 주간의 영양 전략을 정리합니다.", "/guides/fitness-lifestyle/marathon-protein-guide", { emoji: "🏁", tags: ["마라톤", "레이스"] }),
      article("marathon-distance-strategy", "거리별 영양 · 훈련 전략", "5km, 10km, 하프, 풀 마라톤 전략을 비교합니다.", "/guides/fitness-lifestyle/marathon-distance-strategy", { emoji: "📍", tags: ["거리별", "전략"] }),
      article("sports-nutrition-guide", "운동 영양 & 제품 비교", "운동 목적에 맞는 제품 선택 기준을 설명합니다.", "/guides/fitness-lifestyle/sports-nutrition-guide", { emoji: "🥇", tags: ["운동 영양", "제품 비교"] }),
      article("strength-training-protein", "근력운동과 단백질", "근력운동과 러닝 병행 시 단백질 전략을 정리합니다.", "/guides/fitness-lifestyle/strength-training-protein", { emoji: "🏋️", tags: ["근력운동", "병행"] }),
      article("beginner-workout-guide", "운동 초보 가이드", "운동을 시작하는 사람이 보는 단백질 입문 가이드입니다.", "/guides/fitness-lifestyle/beginner-workout-guide", { emoji: "🌱", tags: ["초보", "루틴"] }),
    ],
  },
  {
    id: "track-e",
    slug: "market-insights",
    emoji: "📈",
    title: "시장 인사이트",
    description: "RTD 시장, 브랜드 전략, 성분 트렌드 등 시장과 브랜드의 흐름을 데이터로 읽습니다.",
    trackLabel: "TRACK E",
    accentColor: "#2d6a4f",
    accentBg: "#f1ebf7",
    previewHref: "/guides/market-insights",
    articles: [
      article("protein-market-history", "단백질 시장 히스토리", "국내 단백질 시장의 흐름을 시간축으로 정리합니다.", "/guides/market-insights/protein-market-history", { emoji: "🕰️", tags: ["시장", "역사"] }),
      article("protein-rtd-market", "단백질 RTD 시장", "RTD 단백질 음료 시장 구조를 설명합니다.", "/guides/market-insights/protein-rtd-market", { emoji: "📦", tags: ["RTD", "시장"] }),
      article("brand-analysis", "브랜드 분석", "주요 브랜드의 상품 전략과 SKU 구성을 비교합니다.", "/guides/market-insights/brand-analysis", { emoji: "🏷️", tags: ["브랜드", "분석"] }),
      article("ingredient-trends", "성분 트렌드", "고단백, 저당, 워터형 같은 키워드 트렌드를 정리합니다.", "/guides/market-insights/ingredient-trends", { emoji: "🧪", tags: ["트렌드", "성분"] }),
      article("new-product-analysis", "신제품 분석", "새로 나온 제품을 어떤 기준으로 읽어야 하는지 설명합니다.", "/guides/market-insights/new-product-analysis", { emoji: "🆕", tags: ["신제품", "분석"] }),
      article("global-protein-market", "글로벌 단백질 시장", "해외 시장 흐름과 국내 제품 이해를 연결합니다.", "/guides/market-insights/global-protein-market", { emoji: "🌍", tags: ["글로벌", "시장"] }),
    ],
  },
  {
    id: "track-f",
    slug: "tools",
    emoji: "🧮",
    title: "계산기 · 도구",
    description: "하루 단백질 권장량, 음료 개수, 단백질 밀도를 직접 계산해볼 수 있는 도구 모음입니다.",
    note: "현재는 일부 도구만 실제 페이지가 있고, 나머지는 예정 상태입니다.",
    trackLabel: "TRACK F",
    accentColor: "#2d6a4f",
    accentBg: "#efe9fb",
    previewHref: "/guides/tools",
    articles: [
      article("daily-protein-calculator", "하루 단백질 섭취량 계산기", "체중과 활동량 기준으로 하루 섭취량을 계산합니다.", "/tools/calculator", { emoji: "📏", tags: ["계산기", "섭취량"], status: "live" }),
      article("protein-drink-count-calculator", "단백질 음료 개수 계산기", "목표 단백질량을 채우기 위해 몇 병이 필요한지 계산하는 도구입니다.", "/guides/tools", { emoji: "🥤", tags: ["도구", "예정"], status: "planned" }),
      article("protein-density-calculator", "단백질 밀도 계산기", "칼로리 대비 단백질 함량을 계산하는 도구입니다.", "/guides/tools", { emoji: "📊", tags: ["도구", "예정"], status: "planned" }),
    ],
  },
];

export function buildAdminGuidesStaticData(): AdminGuidesStaticData {
  return {
    mainPage: {
      title: "단백질 가이드",
      description: "Track A부터 Track F까지 현재 사이트에 연결된 가이드 구조를 운영 관점에서 한 번에 관리합니다.",
      tracks: sections.map((section) => ({
        id: section.id,
        emoji: section.emoji,
        title: section.title,
        subtitle: section.trackLabel,
        description: section.description,
        count: section.articles.length,
        href: section.previewHref,
        accentColor: section.accentColor,
        accentBg: section.accentBg,
      })),
    },
    sections,
  };
}
