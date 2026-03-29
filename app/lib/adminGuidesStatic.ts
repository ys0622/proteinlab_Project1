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
      article("protein-deficiency-self-check", "단백질 부족 자가체크", "생활 패턴 기준으로 단백질 부족 가능성을 빠르게 점검합니다.", "/guides/basics/protein-deficiency-self-check", { emoji: "✅", tags: ["자가체크", "부족"] }),
      article("protein-drink-vs-powder", "단백질 음료 vs 프로틴 파우더", "간편함, 가성비, 입문 난이도로 두 제품군을 비교합니다.", "/guides/basics/protein-drink-vs-powder", { emoji: "🥤", tags: ["비교", "입문"] }),
    ],
  },
  {
    id: "track-b",
    slug: "product-selection-comparison",
    emoji: "🧪",
    title: "제품 선택 · 비교",
    description: "단백질 음료와 바를 고를 때 성분표를 읽는 법부터 추천 리스트, 랭킹 해석까지 정리했습니다.",
    trackLabel: "TRACK B",
    accentColor: "#4a6178",
    accentBg: "#eaf0f6",
    previewHref: "/guides/product-selection-comparison",
    articles: [
      article("protein-drink-guide", "단백질 음료 선택 가이드", "단백질 음료를 볼 때 먼저 체크해야 할 숫자를 정리합니다.", "/guides/product-selection-comparison/protein-drink-guide", { emoji: "🥤", tags: ["음료", "선택"] }),
      article("protein-shake-guide", "단백질 쉐이크 추천 가이드", "간편 섭취형 단백질 쉐이크를 고를 때 먼저 볼 기준을 정리합니다.", "/guides/product-selection-comparison/protein-shake-guide", { emoji: "🥤", tags: ["쉐이크", "선택"] }),
      article("protein-category-guide", "단백질 카테고리 선택 가이드", "RTD, 쉐이크, 바, 요거트 중 지금 내 목적에 맞는 카테고리를 고르는 법을 정리합니다.", "/guides/product-selection-comparison/protein-category-guide", { emoji: "🧭", tags: ["카테고리", "입문", "허브"] }),
      article("low-calorie-protein-products-guide", "저칼로리 단백질 제품 추천", "음료, 쉐이크, 요거트, 바를 한 번에 비교하면서 저칼로리 기준으로 어떤 카테고리가 맞는지 정리합니다.", "/guides/product-selection-comparison/low-calorie-protein-products-guide", { emoji: "📉", tags: ["저칼로리", "카테고리", "다이어트"] }),
      article("protein-shake-top7", "단백질 쉐이크 추천 TOP 7", "ProteinLab DB 기준으로 파우치형 단백질 쉐이크 상위 후보를 정리합니다.", "/guides/product-selection-comparison/protein-shake-top7", { emoji: "🥇", tags: ["쉐이크", "랭킹", "다이어트"] }),
      article("labnosh-lineup", "랩노쉬 제품 종류 전체 정리", "랩노쉬 슬림쉐이크 중심으로 맛과 목적 차이를 정리합니다.", "/guides/product-selection-comparison/labnosh-lineup", { emoji: "🎒", tags: ["랩노쉬", "라인업", "쉐이크"] }),
      article("diet-protein-shake", "다이어트 단백질 쉐이크 추천", "저칼로리·저당·단백질 20g 이상 기준으로 다이어트용 쉐이크를 고릅니다.", "/guides/product-selection-comparison/diet-protein-shake", { emoji: "🍽️", tags: ["다이어트", "쉐이크", "식사대용"] }),
      article("protein-shake-calorie-ranking", "단백질 쉐이크 칼로리 순위", "파우치형 쉐이크를 칼로리 낮은 순으로 정리한 데이터 랭킹입니다.", "/guides/product-selection-comparison/protein-shake-calorie-ranking", { emoji: "📉", tags: ["칼로리", "쉐이크", "랭킹"] }),
      article("protein-bar-top10", "단백질 바 추천 TOP 10", "ProteinLab DB 바 80개 기준으로 스펙과 실사용성을 함께 본 상위권 단백질 바를 정리합니다.", "/guides/product-selection-comparison/protein-bar-top10", { emoji: "🍫", tags: ["단백질 바", "랭킹", "입문"] }),
      article("convenience-protein-bar", "편의점 단백질 바 추천", "CU, GS25, 세븐일레븐 등 오프라인에서 바로 살 수 있는 단백질 바만 따로 정리합니다.", "/guides/product-selection-comparison/convenience-protein-bar", { emoji: "🏪", tags: ["편의점", "단백질 바", "구매"] }),
      article("diet-protein-bar", "다이어트 단백질 바 추천", "당류와 칼로리를 함께 관리하고 싶은 사람을 위한 다이어트용 단백질 바 후보를 정리합니다.", "/guides/product-selection-comparison/diet-protein-bar", { emoji: "🥗", tags: ["다이어트", "단백질 바", "저당"] }),
      article("protein-yogurt-top5", "단백질 요거트 추천 TOP 5", "ProteinLab DB 요거트 45개 기준으로 1회 섭취 기준이 좋은 단백질 요거트를 추려 정리합니다.", "/guides/product-selection-comparison/protein-yogurt-top5", { emoji: "🥣", tags: ["요거트", "랭킹", "입문"] }),
      article("greek-vs-protein-yogurt", "그릭요거트 vs 단백질 요거트", "그릭요거트와 단백질 요거트의 차이를 제조 방식과 용도 기준으로 쉽게 비교합니다.", "/guides/product-selection-comparison/greek-vs-protein-yogurt", { emoji: "⚖️", tags: ["비교", "요거트", "그릭"] }),
      article("diet-protein-yogurt", "다이어트 단백질 요거트", "저칼로리, 저당, 고단백 조건으로 다이어트 중 보기 쉬운 요거트만 따로 정리합니다.", "/guides/product-selection-comparison/diet-protein-yogurt", { emoji: "🫐", tags: ["다이어트", "요거트", "저칼로리"] }),
      article("protein-shake-for-women", "여성을 위한 단백질 쉐이크", "다이어트, 아침 대용, 체형 유지 관점에서 여성에게 맞는 파우치형 쉐이크를 정리합니다.", "/guides/product-selection-comparison/protein-shake-for-women", { emoji: "💁‍♀️", tags: ["여성", "쉐이크", "다이어트"] }),
      article("morning-protein-shake", "아침 식사 대용 단백질 쉐이크", "바쁜 아침에 바로 마시기 좋은 단백질 쉐이크를 포만감 중심으로 정리합니다.", "/guides/product-selection-comparison/morning-protein-shake", { emoji: "🌅", tags: ["아침", "쉐이크", "식사대용"] }),
      article("morning-protein-products-guide", "아침 대용 단백질 제품 추천", "음료, 쉐이크, 요거트, 바 중 아침 루틴에 맞는 카테고리를 포만감과 편의성 기준으로 정리합니다.", "/guides/product-selection-comparison/morning-protein-products-guide", { emoji: "🌅", tags: ["아침", "카테고리", "식사대용"] }),
      article("oliveyoung-protein-shake", "올리브영 단백질 쉐이크 추천", "올리브영에서 실제로 접근하기 쉬운 단백질 쉐이크만 따로 정리한 채널형 가이드입니다.", "/guides/product-selection-comparison/oliveyoung-protein-shake", { emoji: "🛍️", tags: ["올리브영", "쉐이크", "채널"] }),
      article("meal-replacement-protein-shake-guide", "식사대용 단백질 쉐이크", "식사대용 쉐이크를 고를 때 칼로리와 식이섬유를 어떻게 볼지 정리합니다.", "/guides/product-selection-comparison/meal-replacement-protein-shake-guide", { emoji: "🥣", tags: ["쉐이크", "식사대용"] }),
      article("protein-drink-vs-protein-shake", "단백질 음료 vs 단백질 쉐이크", "RTD 음료와 쉐이크를 상황과 용도 기준으로 비교합니다.", "/guides/product-selection-comparison/protein-drink-vs-protein-shake", { emoji: "⚖️", tags: ["비교", "쉐이크"] }),
      article("low-sugar-protein-shake-guide", "저당 단백질 쉐이크", "당류가 낮은 쉐이크를 고를 때 함께 볼 기준을 정리합니다.", "/guides/product-selection-comparison/low-sugar-protein-shake-guide", { emoji: "🍃", tags: ["저당", "쉐이크"] }),
      article("post-workout-protein-shake-guide", "운동 후 단백질 쉐이크", "운동 후 보충용 쉐이크를 성분 기준으로 정리합니다.", "/guides/product-selection-comparison/post-workout-protein-shake-guide", { emoji: "🏃", tags: ["운동 후", "쉐이크"] }),
      article("protein-bar-guide", "단백질 바 선택 가이드", "단백질 바의 용도별 비교 기준을 정리합니다.", "/guides/product-selection-comparison/protein-bar-guide", { emoji: "🍫", tags: ["바", "선택"] }),
      article("nutrition-comparison", "영양성분 비교", "단백질, 당류, 칼로리, 지방을 어떻게 읽을지 설명합니다.", "/guides/product-selection-comparison/nutrition-comparison", { emoji: "📋", tags: ["비교", "영양성분"] }),
      article("nutrition-criteria", "영양성분 기준", "좋은 제품을 고를 때 참고할 최소 기준을 모읍니다.", "/guides/product-selection-comparison/nutrition-criteria", { emoji: "📐", tags: ["기준", "체크리스트"] }),
      article("recommendation-lists", "추천 리스트 활용법", "추천, 큐레이션, picks의 차이와 사용법을 설명합니다.", "/guides/product-selection-comparison/recommendation-lists", { emoji: "🧭", tags: ["추천", "리스트"] }),
      article("ranking-content", "등급 · 랭킹 읽는 법", "등급, 랭킹, 100점 점수를 해석하는 기준을 정리합니다.", "/guides/product-selection-comparison/ranking-content", { emoji: "🏅", tags: ["점수", "랭킹"] }),
      article("zero-sugar-allulose", "당류 0g인데 왜 달까 — 알룰로스·스테비아·에리스리톨", "당류 0g 단백질 음료에 쓰이는 감미료 종류와 다이어트에 미치는 영향을 정리합니다.", "/guides/product-selection-comparison/zero-sugar-allulose", { emoji: "🍃", tags: ["알룰로스", "당류 0g", "감미료"] }),
      article("bcaa-guide", "BCAA란 무엇인가 — 단백질 음료에서 BCAA의 의미", "류신·이소류신·발린의 역할과 단백질 음료에서 BCAA를 어떻게 볼지 정리합니다.", "/guides/product-selection-comparison/bcaa-guide", { emoji: "💊", tags: ["BCAA", "류신", "근육 합성"] }),
      article("selex-vs-himune", "셀렉스 vs 하이뮨 비교", "대표 RTD 20g 제품을 단백질, 당류, 칼로리, 지방 기준으로 직접 비교합니다.", "/guides/product-selection-comparison/selex-vs-himune", { emoji: "🥛", tags: ["브랜드 비교", "RTD", "셀렉스"] }),
      article("high-protein-40g-comparison", "단백질 음료 40g 이상 3종 비교", "테이크핏 몬스터, 뉴케어 41g, 닥터유 40g을 고단백 기준으로 정리합니다.", "/guides/product-selection-comparison/high-protein-40g-comparison", { emoji: "🏋️", tags: ["40g", "고단백", "비교"] }),
      article("protein-density-ranking", "단백질 음료 100mL당 단백질 순위", "ProteinLab DB 기준으로 단백질 밀도 상위 제품을 계산해 정리합니다.", "/guides/product-selection-comparison/protein-density-ranking", { emoji: "📊", tags: ["밀도", "랭킹", "데이터"] }),
      article("selex-vs-takefit-vs-himune", "셀렉스 vs 테이크핏 vs 하이뮨", "대표 20g급 RTD 3종을 한 번에 비교해 목적별로 추천합니다.", "/guides/product-selection-comparison/selex-vs-takefit-vs-himune", { emoji: "🥊", tags: ["3자 비교", "브랜드", "RTD"] }),
      article("lactose-free-protein-drink", "유당불내증인데 단백질 음료 먹을 수 있나", "락토프리와 저부담 후보 제품을 기준으로 실제 선택법을 정리합니다.", "/guides/product-selection-comparison/lactose-free-protein-drink", { emoji: "🥣", tags: ["락토프리", "유당불내증", "문제 해결"] }),
      article("protein-drink-for-50s", "50대 단백질 음료 추천", "중장년층이 건강 유지 관점에서 단백질 음료를 고를 때 볼 기준을 정리합니다.", "/guides/product-selection-comparison/protein-drink-for-50s", { emoji: "👨", tags: ["50대", "시니어", "건강 유지"] }),
      article("protein-drink-box-value", "단백질 음료 박스로 사면 얼마", "대표 박스 수량 기준으로 개당 단가와 단백질 1g당 가격을 계산합니다.", "/guides/product-selection-comparison/protein-drink-box-value", { emoji: "📦", tags: ["박스", "가성비", "가격"] }),
      article("doctoru-40g-vs-takefit-monster-43g", "닥터유 40g vs 테이크핏 몬스터 43g", "40g급 고단백 RTD 2종을 맛과 영양 기준으로 직접 비교합니다.", "/guides/product-selection-comparison/doctoru-40g-vs-takefit-monster-43g", { emoji: "🥤", tags: ["40g", "고단백", "2자 비교"] }),
      article("protein-drink-for-diabetes", "당뇨 있을 때 단백질 음료 마셔도 될까", "당류·칼로리·탄수화물 기준으로 저당 후보 제품을 정리합니다.", "/guides/product-selection-comparison/protein-drink-for-diabetes", { emoji: "🩺", tags: ["당뇨", "저당", "문제 해결"] }),
      article("protein-drink-beginners-guide", "단백질 음료 입문 가이드", "처음 마시는 사람이 무엇부터 봐야 하는지 쉬운 언어로 정리합니다.", "/guides/product-selection-comparison/protein-drink-beginners-guide", { emoji: "🌱", tags: ["입문", "처음", "가이드"] }),
      article("selexs-lineup", "셀렉스 제품 종류 전체 정리", "셀렉스 RTD 라인업을 목적별로 나눠 어떤 제품이 맞는지 정리합니다.", "/guides/product-selection-comparison/selexs-lineup", { emoji: "🥛", tags: ["셀렉스", "라인업", "브랜드"] }),
      article("protein-drink-by-flavor", "단백질 음료 맛별 추천", "초코, 복숭아, 바나나, 아메리카노처럼 맛 기준으로 고르기 쉽게 정리합니다.", "/guides/product-selection-comparison/protein-drink-by-flavor", { emoji: "🍫", tags: ["맛", "입문", "추천"] }),
      article("protein-drink-taste-tips", "단백질 음료 맛없다", "맛없게 느껴지는 이유와 더 잘 맞는 제품으로 바꾸는 방법을 정리합니다.", "/guides/product-selection-comparison/protein-drink-taste-tips", { emoji: "🧊", tags: ["맛", "문제 해결", "입문"] }),
      article("himune-lineup", "하이뮨 제품 종류 전체 정리", "하이뮨 RTD 라인업을 일상형, 액티브형, 제로형 기준으로 정리합니다.", "/guides/product-selection-comparison/himune-lineup", { emoji: "🐐", tags: ["하이뮨", "라인업", "브랜드"] }),
      article("takefit-lineup", "테이크핏 제품 종류 전체 정리", "테이크핏 맥스, 몬스터, 프로 차이를 목적별로 정리합니다.", "/guides/product-selection-comparison/takefit-lineup", { emoji: "⚡", tags: ["테이크핏", "라인업", "브랜드"] }),
      article("newcare-allprotein", "뉴케어 올프로틴 완전 분석", "41g 고단백과 락토프리라는 차별점을 중심으로 정리합니다.", "/guides/product-selection-comparison/newcare-allprotein", { emoji: "🧴", tags: ["뉴케어", "41g", "락토프리"] }),
      article("protein-drink-by-content", "단백질 음료 함량대별 완전 정리", "20g 미만부터 40g 이상까지 함량대별로 누가 맞는지 정리합니다.", "/guides/product-selection-comparison/protein-drink-by-content", { emoji: "📶", tags: ["함량", "허브", "비교"] }),
      article("takefit-vs-himune", "테이크핏 vs 하이뮨 비교", "테이크핏 맥스와 하이뮨 액티브를 직접 비교합니다.", "/guides/product-selection-comparison/takefit-vs-himune", { emoji: "🥊", tags: ["브랜드 비교", "테이크핏", "하이뮨"] }),
      article("danbaek-vs-selexs", "더단백 vs 셀렉스 비교", "더단백과 셀렉스 대표 RTD를 영양 기준으로 직접 비교합니다.", "/guides/product-selection-comparison/danbaek-vs-selexs", { emoji: "⚖️", tags: ["더단백", "셀렉스", "브랜드 비교"] }),
      article("danbaek-vs-himune", "더단백 vs 하이뮨 비교", "더단백과 하이뮨 대표 RTD를 영양 기준으로 직접 비교합니다.", "/guides/product-selection-comparison/danbaek-vs-himune", { emoji: "⚖️", tags: ["더단백", "하이뮨", "브랜드 비교"] }),
      article("dryou-lineup", "닥터유 제품 종류 전체 정리", "닥터유 PRO 드링크와 40g 라인업 차이를 정리합니다.", "/guides/product-selection-comparison/dryou-lineup", { emoji: "🍫", tags: ["닥터유", "라인업", "40g"] }),
      article("danbaek-lineup", "더단백 제품 종류 전체 정리", "더단백 드링크, 다크초코, 더블초코 라인업을 정리합니다.", "/guides/product-selection-comparison/danbaek-lineup", { emoji: "🥛", tags: ["더단백", "라인업", "저나트륨"] }),
    ],
  },
  {
    id: "track-c",
    slug: "intake-strategy-health",
    emoji: "⚙️",
    title: "섭취 전략 · 건강",
    description: "운동 전후, 체중 관리, 식사대용, 노년 전략까지 실생활에 바로 적용할 수 있는 섭취 기준을 정리했습니다.",
    trackLabel: "TRACK C",
    accentColor: "#7a5230",
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
      article("protein-drink-without-exercise", "운동 안 해도 단백질 음료", "운동을 안 해도 단백질 음료가 필요한 상황을 정리합니다.", "/guides/intake-strategy-health/protein-drink-without-exercise", { emoji: "🥛", tags: ["입문", "생활 보완"] }),
      article("protein-drink-meal-replacement", "단백질 음료 식사대용", "단백질 음료가 한 끼 대체가 되는지 제품군별로 나눠 설명합니다.", "/guides/intake-strategy-health/protein-drink-meal-replacement", { emoji: "🥣", tags: ["식사대용", "보완"] }),
      article("night-protein-drink", "밤에 단백질 음료 마셔도 될까", "저녁, 야식, 자기 전 상황에서 어떤 제품이 맞는지 정리합니다.", "/guides/intake-strategy-health/night-protein-drink", { emoji: "🌙", tags: ["저녁", "야식", "저당"] }),
      article("diet-protein-drink-strategy", "다이어트 중 단백질 음료 어떻게 마실까", "저당, 저칼로리, 포만감 기준으로 감량 중 제품 선택법을 정리합니다.", "/guides/intake-strategy-health/diet-protein-drink-strategy", { emoji: "🥗", tags: ["다이어트", "저당", "포만감"] }),
    ],
  },
  {
    id: "track-d",
    slug: "fitness-lifestyle",
    emoji: "🏃",
    title: "운동 · 라이프스타일",
    description: "러닝, 마라톤, 근력운동, 운동 초보 루틴까지 실제 운동 상황에 맞는 단백질 전략을 빠르게 찾을 수 있습니다.",
    trackLabel: "TRACK D",
    accentColor: "#8a4b2f",
    accentBg: "#f8ede7",
    previewHref: "/guides/fitness-lifestyle",
    articles: [
      article("running-protein-guide", "러닝 단백질 가이드", "러너의 단백질 필요량과 회복 전략을 설명합니다.", "/guides/fitness-lifestyle/running-protein-guide", { emoji: "🏃‍♂️", tags: ["러닝", "회복"] }),
      article("marathon-protein-guide", "마라톤 영양 전략", "훈련기와 레이스 주간의 영양 전략을 정리합니다.", "/guides/fitness-lifestyle/marathon-protein-guide", { emoji: "🏁", tags: ["마라톤", "레이스"] }),
      article("marathon-distance-strategy", "거리별 영양 · 훈련 전략", "5km, 10km, 하프, 풀 마라톤 전략을 비교합니다.", "/guides/fitness-lifestyle/marathon-distance-strategy", { emoji: "📍", tags: ["거리별", "전략"] }),
      article("sports-nutrition-guide", "운동 영양 & 제품 비교", "운동 목적에 맞는 제품 선택 기준을 설명합니다.", "/guides/fitness-lifestyle/sports-nutrition-guide", { emoji: "🥇", tags: ["운동 영양", "제품 비교"] }),
      article("strength-training-protein", "근력운동과 단백질", "근력운동과 러닝 병행 시 단백질 전략을 정리합니다.", "/guides/fitness-lifestyle/strength-training-protein", { emoji: "🏋️", tags: ["근력운동", "병행"] }),
      article("beginner-workout-guide", "운동 초보 가이드", "운동을 시작하는 사람이 보는 단백질 입문 가이드입니다.", "/guides/fitness-lifestyle/beginner-workout-guide", { emoji: "🌱", tags: ["초보", "루틴"] }),
      article("commute-protein-guide", "출근길 단백질 제품", "출근길과 사무실에서 먹기 좋은 제품군을 상황별로 정리합니다.", "/guides/fitness-lifestyle/commute-protein-guide", { emoji: "💼", tags: ["출근길", "직장인"] }),
      article("convenience-store-workout-protein", "편의점 운동 전후 단백질", "운동 전후 편의점에서 바로 살 수 있는 제품 기준을 정리합니다.", "/guides/fitness-lifestyle/convenience-store-workout-protein", { emoji: "🏪", tags: ["편의점", "운동 전후"] }),
      article("running-protein-category-guide", "러닝하는 사람은 음료·바·쉐이크 중 뭐가 맞을까", "러닝 전후와 장거리 훈련일에 어떤 카테고리가 맞는지 상황별로 정리합니다.", "/guides/fitness-lifestyle/running-protein-category-guide", { emoji: "🏃", tags: ["러닝", "카테고리", "비교"] }),
      article("office-worker-protein-routine", "회사원 루틴용 단백질 제품 선택법", "출근 전, 사무실, 퇴근 후 루틴에 맞는 제품군을 상황별로 정리합니다.", "/guides/fitness-lifestyle/office-worker-protein-routine", { emoji: "🏢", tags: ["회사원", "루틴", "비교"] }),
    ],
  },
  {
    id: "track-e",
    slug: "market-insights",
    emoji: "📈",
    title: "시장 인사이트",
    description: "RTD 시장, 브랜드 전략, 성분 트렌드 등 시장과 브랜드의 흐름을 데이터로 읽습니다.",
    trackLabel: "TRACK E",
    accentColor: "#6b4d7c",
    accentBg: "#f1ebf7",
    previewHref: "/guides/market-insights",
    articles: [
      article("protein-market-history", "단백질 시장 히스토리", "국내 단백질 시장의 흐름을 시간축으로 정리합니다.", "/guides/market-insights/protein-market-history", { emoji: "🕰️", tags: ["시장", "역사"] }),
      article("protein-rtd-market", "단백질 RTD 시장", "RTD 단백질 음료 시장 구조를 설명합니다.", "/guides/market-insights/protein-rtd-market", { emoji: "📦", tags: ["RTD", "시장"] }),
      article("brand-analysis", "브랜드 분석", "주요 브랜드의 상품 전략과 SKU 구성을 비교합니다.", "/guides/market-insights/brand-analysis", { emoji: "🏷️", tags: ["브랜드", "분석"] }),
      article("ingredient-trends", "성분 트렌드", "고단백, 저당, 워터형 같은 키워드 트렌드를 정리합니다.", "/guides/market-insights/ingredient-trends", { emoji: "🧪", tags: ["트렌드", "성분"] }),
      article("new-product-analysis", "신제품 분석", "새로 나온 제품을 어떤 기준으로 읽어야 하는지 설명합니다.", "/guides/market-insights/new-product-analysis", { emoji: "🆕", tags: ["신제품", "분석"] }),
      article("global-protein-market", "글로벌 단백질 시장", "해외 시장 흐름과 국내 제품 이해를 연결합니다.", "/guides/market-insights/global-protein-market", { emoji: "🌍", tags: ["글로벌", "시장"] }),
      article("protein-drink-trend-2026", "2026 단백질 음료 시장 트렌드", "초고단백, 저당, 시니어 타깃 확대 등 2026년 핵심 흐름을 자료 기반으로 정리합니다.", "/guides/market-insights/protein-drink-trend-2026", { emoji: "📈", tags: ["2026", "트렌드", "신제품"] }),
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
    accentColor: "#5d4b8a",
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
      description: "단백질 기초부터 제품 선택, 섭취 전략, 시장 인사이트까지 — 목적에 맞는 가이드를 바로 찾아보세요.",
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
