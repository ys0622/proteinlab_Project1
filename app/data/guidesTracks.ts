export type GuideTrackSlug =
  | "protein-basics"
  | "product-selection-comparison"
  | "intake-strategy-health"
  | "fitness-lifestyle"
  | "market-insights"
  | "tools";

export interface GuideSlot {
  slug: string;
  href?: string;
  title: string;
  description: string;
  searchIntent: string;
  futureFocus: string[];
  internalLinkTargets: {
    label: string;
    href: string;
  }[];
}

export interface GuideTrack {
  slug: GuideTrackSlug;
  label: string;
  shortLabel: string;
  title: string;
  description: string;
  cardDescription?: string;
  cardNote?: string;
  ctaLabel?: string;
  hubSummary: string;
  seoFocus: string;
  accentColor: string;
  accentBg: string;
  slots: GuideSlot[];
}

export const guideTracks: GuideTrack[] = [
  {
    slug: "protein-basics",
    label: "TRACK A",
    shortLabel: "단백질 기초",
    title: "단백질 기초",
    description:
      "단백질의 역할과 기본 개념을 먼저 이해할 수 있도록 Track A를 단일 핵심 주제로 정리했습니다.",
    hubSummary:
      "단백질 기초 트랙은 지금 단백질이 몸에서 어떤 역할을 하는지 빠르게 이해하는 출발 카드로 구성했습니다.",
    seoFocus: "단백질 역할, 단백질 기초, 단백질 기본 개념",
    accentColor: "#2d6a4f",
    accentBg: "#e7f3ec",
    slots: [
      {
        slug: "protein-functions",
        title: "단백질 역할 개요",
        description: "근육, 면역, 호르몬 관점에서 단백질이 몸에서 어떤 일을 하는지 먼저 이해하는 기본 안내 카드입니다.",
        searchIntent: "단백질이 몸에서 어떤 역할을 하나",
        futureFocus: ["근육과 회복", "면역과 호르몬", "하루 섭취량 기준"],
        internalLinkTargets: [
          { label: "근육과 단백질", href: "/guides/basics/muscle" },
          { label: "면역·호르몬과 단백질", href: "/guides/basics/immunity-hormone" },
        ],
      },
    ],
  },
  {
    slug: "product-selection-comparison",
    label: "TRACK B",
    shortLabel: "제품 선택 & 비교",
    title: "제품 선택 & 비교",
    description:
      "단백질 제품을 고르는 기준, 성분 비교, 추천 리스트, 랭킹형 콘텐츠를 연결하는 제품 탐색 허브입니다.",
    hubSummary:
      "제품 DB, 랭킹, 추천, 비교 페이지로 확장하기 위한 핵심 허브입니다. 제품 비교형 검색과 구매 직전 탐색 수요를 받는 구조로 설계했습니다.",
    seoFocus: "제품 선택, 비교 검색, 추천형 콘텐츠 연결",
    accentColor: "#4a6178",
    accentBg: "#eaf0f6",
    slots: [
      {
        slug: "protein-drink-guide",
        title: "단백질 음료 선택 가이드",
        description: "RTD 단백질 음료를 고르는 기준을 정리할 페이지 슬롯입니다.",
        searchIntent: "단백질 음료 추천 기준",
        futureFocus: ["음료 선택 기준", "성분 우선순위", "제품 DB 연결"],
        internalLinkTargets: [
          { label: "랭킹", href: "/ranking" },
          { label: "제품 비교", href: "/compare" },
        ],
      },
      {
        slug: "diet-protein-drink-guide",
        title: "다이어트 단백질 음료 기준",
        description: "저당, 저칼로리, 단백질 밀도를 함께 보면서 다이어트용 단백질 음료를 고르는 기준을 정리한 페이지입니다.",
        searchIntent: "다이어트 단백질 음료 기준",
        futureFocus: ["저당 단백질 음료", "저칼로리 기준", "단백질 밀도 비교"],
        internalLinkTargets: [
          { label: "다이어트용 Picks", href: "/picks/diet-a" },
          { label: "단백질 음료 선택 가이드", href: "/guides/product-selection-comparison/protein-drink-guide" },
        ],
      },
      {
        slug: "low-sugar-protein-drink-guide",
        title: "저당 단백질 음료 추천 기준",
        description: "당류 컷을 먼저 잡고 저당 단백질 음료 후보를 비교하는 기준을 정리한 페이지입니다.",
        searchIntent: "저당 단백질 음료 추천",
        futureFocus: ["당류 컷", "저당 RTD", "워터형 음료 비교"],
        internalLinkTargets: [
          { label: "zero sugar picks", href: "/picks/zero-sugar" },
          { label: "단백질 음료 선택 가이드", href: "/guides/product-selection-comparison/protein-drink-guide" },
        ],
      },
      {
        slug: "protein-shake-guide",
        title: "단백질 쉐이크 추천 가이드",
        description: "파우치형 중심의 간편 섭취 단백질 쉐이크를 비교할 때 단백질, 당류, 칼로리, 식이섬유를 어떻게 봐야 하는지 정리한 페이지입니다.",
        searchIntent: "단백질 쉐이크 추천",
        futureFocus: ["쉐이크 비교 기준", "식사대용 쉐이크", "저당 쉐이크"],
        internalLinkTargets: [
          { label: "쉐이크 카테고리", href: "/shake" },
          { label: "쉐이크 추천", href: "/recommend?category=shake" },
        ],
      },
      {
        slug: "meal-replacement-protein-shake-guide",
        title: "식사대용 단백질 쉐이크",
        description: "식사대용 쉐이크를 고를 때 단백질, 칼로리, 식이섬유를 어떤 순서로 봐야 하는지 정리한 페이지입니다.",
        searchIntent: "식사대용 단백질 쉐이크",
        futureFocus: ["한 끼 대체 기준", "포만감 비교", "식이섬유 기준"],
        internalLinkTargets: [
          { label: "쉐이크 카테고리", href: "/shake?curation=shake-meal-replacement" },
          { label: "단백질 쉐이크 추천", href: "/guides/product-selection-comparison/protein-shake-guide" },
        ],
      },
      {
        slug: "protein-drink-vs-protein-shake",
        title: "단백질 음료 vs 단백질 쉐이크",
        description: "RTD 단백질 음료와 파우치형 단백질 쉐이크의 차이를 용도와 성분 기준으로 정리한 비교 가이드입니다.",
        searchIntent: "단백질 음료 vs 단백질 쉐이크",
        futureFocus: ["RTD vs 쉐이크", "운동 후 보충", "식사대용 비교"],
        internalLinkTargets: [
          { label: "단백질 음료 선택 가이드", href: "/guides/product-selection-comparison/protein-drink-guide" },
          { label: "쉐이크 카테고리", href: "/shake" },
        ],
      },
      {
        slug: "low-sugar-protein-shake-guide",
        title: "저당 단백질 쉐이크",
        description: "당류가 낮은 단백질 쉐이크를 비교할 때 단백질과 칼로리, 식이섬유까지 함께 보는 기준을 정리한 페이지입니다.",
        searchIntent: "저당 단백질 쉐이크",
        futureFocus: ["저당 쉐이크", "당류 기준", "저당 식사대용"],
        internalLinkTargets: [
          { label: "쉐이크 저당 큐레이션", href: "/shake?curation=shake-low-sugar" },
          { label: "단백질 쉐이크 추천", href: "/guides/product-selection-comparison/protein-shake-guide" },
        ],
      },
      {
        slug: "post-workout-protein-shake-guide",
        title: "운동 후 단백질 쉐이크",
        description: "운동 후 단백질 쉐이크를 고를 때 단백질 함량, 당류, 단백질 밀도를 어떻게 봐야 하는지 정리한 페이지입니다.",
        searchIntent: "운동 후 단백질 쉐이크",
        futureFocus: ["운동 후 보충", "고단백 쉐이크", "단백질 밀도"],
        internalLinkTargets: [
          { label: "운동 후 단백질 섭취", href: "/guides/intake-strategy-health/post-workout-protein" },
          { label: "쉐이크 추천", href: "/recommend?category=shake" },
        ],
      },
      {
        slug: "protein-bar-guide",
        title: "단백질 바 선택 가이드",
        description: "단백질 바를 목적별로 구분해 선택 기준을 담을 페이지 슬롯입니다.",
        searchIntent: "단백질 바 고르는 법",
        futureFocus: ["간식형 제품 구분", "당류·칼로리 비교", "바 제품 연결"],
        internalLinkTargets: [
          { label: "단백질 바 목록", href: "/bars" },
          { label: "성분 비교", href: "/guides/product-selection-comparison/nutrition-comparison" },
        ],
      },
      {
        slug: "meal-replacement-protein-bar-guide",
        title: "식사대용 단백질 바 기준",
        description: "포만감과 칼로리, 단백질을 같이 보며 식사대용 단백질 바를 고르는 기준을 정리합니다.",
        searchIntent: "식사대용 단백질 바",
        futureFocus: ["식사보완형 바", "포만감 기준", "총열량 비교"],
        internalLinkTargets: [
          { label: "단백질 바 목록", href: "/bars" },
          { label: "단백질 바 선택 가이드", href: "/guides/product-selection-comparison/protein-bar-guide" },
        ],
      },
      {
        slug: "protein-yogurt-guide",
        title: "단백질 요거트 선택 가이드",
        description: "단백질 요거트를 그릭, 드링킹, 대용량 기준으로 나눠 보는 선택 가이드입니다.",
        searchIntent: "단백질 요거트 고르는 법",
        futureFocus: ["그릭요거트 비교", "드링킹 요거트 비교", "요거트 DB 연결"],
        internalLinkTargets: [
          { label: "단백질 요거트 비교", href: "/yogurt" },
          { label: "요거트 랭킹", href: "/ranking" },
        ],
      },
      {
        slug: "greek-yogurt-guide",
        title: "그릭요거트 추천 기준",
        description: "그릭요거트를 고를 때 단백질 밀도와 당류를 어떻게 읽어야 하는지 정리합니다.",
        searchIntent: "그릭요거트 추천 기준",
        futureFocus: ["그릭요거트 추천", "단백질 밀도", "대용량 요거트"],
        internalLinkTargets: [
          { label: "그릭 요거트 큐레이션", href: "/curation/yogurt-greek" },
          { label: "단백질 요거트 비교", href: "/yogurt?curation=yogurt-greek" },
        ],
      },
      {
        slug: "unsweetened-greek-yogurt-guide",
        title: "무가당 그릭요거트 추천 기준",
        description: "무가당 그릭요거트를 고를 때 당류, 단백질 밀도, 용량 기준을 같이 보는 흐름을 정리합니다.",
        searchIntent: "무가당 그릭요거트 추천",
        futureFocus: ["무가당 그릭요거트", "당류 기준", "대용량 그릭요거트"],
        internalLinkTargets: [
          { label: "그릭 요거트 큐레이션", href: "/curation/yogurt-greek" },
          { label: "단백질 요거트 비교", href: "/yogurt?curation=yogurt-greek" },
        ],
      },
      {
        slug: "low-sugar-yogurt-guide",
        title: "저당 단백질 요거트 기준",
        description: "저당 단백질 요거트를 고를 때 당류와 단백질을 함께 보는 기준을 정리합니다.",
        searchIntent: "저당 단백질 요거트 추천",
        futureFocus: ["당류 기준", "저당 요거트 비교", "플레인/맛 제품 구분"],
        internalLinkTargets: [
          { label: "저당 요거트 큐레이션", href: "/curation/yogurt-low-sugar" },
          { label: "단백질 요거트 비교", href: "/yogurt?curation=yogurt-low-sugar" },
        ],
      },
      {
        slug: "drinking-yogurt-guide",
        title: "드링킹 요거트 비교 포인트",
        description: "드링킹 단백질 요거트를 비교할 때 용량, 단백질, 당류를 같이 보는 기준입니다.",
        searchIntent: "드링킹 요거트 추천",
        futureFocus: ["휴대성 비교", "드링킹 타입 구분", "제품 DB 연결"],
        internalLinkTargets: [
          { label: "드링킹 요거트 큐레이션", href: "/curation/yogurt-drinking" },
          { label: "단백질 요거트 비교", href: "/yogurt?curation=yogurt-drinking" },
        ],
      },
      {
        slug: "protein-yogurt-ranking-guide",
        title: "단백질 요거트 순위 읽는 법",
        description: "단백질 요거트 랭킹의 단백질 밀도, 다이어트, 퍼포먼스 점수 읽는 법을 정리합니다.",
        searchIntent: "단백질 요거트 순위",
        futureFocus: ["랭킹 해석", "등급 기준 연결", "요거트 추천 연결"],
        internalLinkTargets: [
          { label: "요거트 랭킹", href: "/ranking" },
          { label: "등급 기준", href: "/grade-criteria" },
        ],
      },
      {
        slug: "nutrition-comparison",
        title: "성분 비교",
        description: "단백질, 당류, 칼로리, 지방, 나트륨 등을 비교하는 페이지 슬롯입니다.",
        searchIntent: "단백질 제품 성분 비교",
        futureFocus: ["핵심 지표 비교", "제품 필터 연결", "사용자 비교 프레임"],
        internalLinkTargets: [
          { label: "영양 성분 기준", href: "/guides/product-selection-comparison/nutrition-criteria" },
          { label: "제품 비교", href: "/compare" },
        ],
      },
      {
        slug: "nutrition-criteria",
        title: "영양 성분 기준",
        description: "좋은 제품을 볼 때 어떤 영양 기준을 우선해야 하는지 다룰 페이지 슬롯입니다.",
        searchIntent: "단백질 제품 영양성분 보는 법",
        futureFocus: ["판단 기준", "숫자 해석", "구매 체크리스트"],
        internalLinkTargets: [
          { label: "단백질 음료 선택 가이드", href: "/guides/product-selection-comparison/protein-drink-guide" },
          { label: "추천 리스트", href: "/guides/product-selection-comparison/recommendation-lists" },
        ],
      },
      {
        slug: "recommendation-lists",
        title: "제품 추천 리스트",
        description: "상황별 추천 리스트와 큐레이션 페이지로 확장할 슬롯입니다.",
        searchIntent: "단백질 제품 추천 리스트",
        futureFocus: ["목적별 추천", "큐레이션 구조", "제품 허브 연결"],
        internalLinkTargets: [
          { label: "추천", href: "/recommend" },
          { label: "Picks", href: "/picks/zero-sugar" },
        ],
      },
      {
        slug: "ranking-content",
        title: "랭킹 콘텐츠",
        description: "랭킹형 콘텐츠와 데이터 기반 순위 해설을 담을 슬롯입니다.",
        searchIntent: "단백질 음료 랭킹",
        futureFocus: ["랭킹 해설", "순위 기준 공개", "제품 페이지 연결"],
        internalLinkTargets: [
          { label: "랭킹", href: "/ranking" },
          { label: "시장 인사이트", href: "/guides/market-insights" },
        ],
      },
    ],
  },
  {
    slug: "intake-strategy-health",
    label: "TRACK C",
    shortLabel: "섭취 전략 & 건강",
    title: "섭취 전략 & 건강",
    description:
      "운동 전후, 체중 관리, 시니어, 식사대용처럼 상황별 섭취 전략과 건강 관점을 함께 확장하는 허브입니다.",
    hubSummary:
      "기초 정보와 제품 선택 콘텐츠를 실제 섭취 전략으로 연결하는 트랙입니다. 건강 관리형 검색과 실전 질문을 함께 받도록 설계했습니다.",
    seoFocus: "섭취 타이밍, 건강 전략, 실전 활용",
    accentColor: "#7a5230",
    accentBg: "#f5f0ea",
    slots: [
      {
        slug: "protein-timing",
        title: "단백질 섭취 타이밍",
        description: "하루 중 언제 먹는 것이 좋은지 정리한 실전 섭취 전략 페이지입니다.",
        searchIntent: "단백질 언제 먹어야 하나",
        futureFocus: ["시간대별 전략", "생활 루틴별 적용", "제품 연결"],
        internalLinkTargets: [
          { label: "운동 전 섭취", href: "/guides/intake-strategy-health/pre-workout-protein" },
          { label: "운동 후 섭취", href: "/guides/intake-strategy-health/post-workout-protein" },
        ],
      },
      {
        slug: "pre-workout-protein",
        title: "운동 전 섭취",
        description: "운동 전에 단백질을 활용하는 방법과 주의점을 다루는 페이지입니다.",
        searchIntent: "운동 전 단백질 섭취",
        futureFocus: ["운동 전 전략", "부담 적은 제품", "운동 유형별 연결"],
        internalLinkTargets: [
          { label: "운동 영양", href: "/guides/fitness-lifestyle/sports-nutrition-guide" },
          { label: "운동 후 섭취", href: "/guides/intake-strategy-health/post-workout-protein" },
        ],
      },
      {
        slug: "post-workout-protein",
        title: "운동 후 섭취",
        description: "운동 후 회복과 단백질 섭취 전략을 다루는 페이지입니다.",
        searchIntent: "운동 후 단백질 섭취",
        futureFocus: ["회복 전략", "제품 선택", "타이밍 연결"],
        internalLinkTargets: [
          { label: "단백질 흡수", href: "/guides/protein-basics/protein-absorption" },
          { label: "근력 운동", href: "/guides/fitness-lifestyle/strength-training-protein" },
        ],
      },
      {
        slug: "weight-management-protein",
        title: "체중 관리와 단백질",
        description: "감량과 유지 상황에서 단백질을 활용하는 전략을 정리한 페이지입니다.",
        searchIntent: "다이어트 단백질 전략",
        futureFocus: ["포만감 활용", "열량 조절", "식사 구조"],
        internalLinkTargets: [
          { label: "식사대용 전략", href: "/guides/intake-strategy-health/meal-replacement-strategy" },
          { label: "추천 리스트", href: "/guides/product-selection-comparison/recommendation-lists" },
        ],
      },
      {
        slug: "muscle-maintenance-protein",
        title: "근육 유지",
        description: "근육 유지 관점에서 섭취량과 제품 활용법을 정리한 페이지입니다.",
        searchIntent: "근육 유지 단백질",
        futureFocus: ["유지 전략", "운동과 연결", "식사 보완"],
        internalLinkTargets: [
          { label: "단백질 섭취량", href: "/guides/protein-basics/protein-intake-amount" },
          { label: "운동 후 섭취", href: "/guides/intake-strategy-health/post-workout-protein" },
        ],
      },
      {
        slug: "senior-protein-strategy",
        title: "시니어 단백질 전략",
        description: "시니어 단백질 섭취 전략과 제품 선택 기준을 다루는 페이지입니다.",
        searchIntent: "시니어 단백질 전략",
        futureFocus: ["고령층 전략", "부담 적은 선택", "건강 관리 연결"],
        internalLinkTargets: [
          { label: "단백질 건강 영향", href: "/guides/protein-basics/protein-health-impact" },
          { label: "단백질 음료 선택 가이드", href: "/guides/product-selection-comparison/protein-drink-guide" },
        ],
      },
      {
        slug: "meal-replacement-strategy",
        title: "식사대용 전략",
        description: "식사대용과 보충용의 차이를 정리하고 활용법을 다루는 페이지입니다.",
        searchIntent: "단백질 음료 식사대용 가능할까",
        futureFocus: ["식사대용 판단", "보충용과 구분", "제품 연결"],
        internalLinkTargets: [
          { label: "체중 관리", href: "/guides/intake-strategy-health/weight-management-protein" },
          { label: "단백질 음료 선택 가이드", href: "/guides/product-selection-comparison/protein-drink-guide" },
        ],
      },
      {
        slug: "morning-protein-drink",
        title: "아침 대용 단백질 음료",
        description: "공복, 출근길, 점심 전 허기 기준으로 아침 대용 단백질 음료를 고르는 법을 정리합니다.",
        searchIntent: "아침 대용 단백질 음료 추천",
        futureFocus: ["공복 부담", "출근길 루틴", "식사대용 연결"],
        internalLinkTargets: [
          { label: "식사대용 전략", href: "/guides/intake-strategy-health/meal-replacement-strategy" },
          { label: "단백질 음료 선택 가이드", href: "/guides/product-selection-comparison/protein-drink-guide" },
        ],
      },
    ],
  },
  {
    slug: "fitness-lifestyle",
    label: "TRACK D",
    shortLabel: "운동 & 라이프스타일",
    title: "운동 & 라이프스타일",
    description:
      "러닝, 마라톤, 근력 운동, 운동 초보, 시즌 스포츠 등 활동 맥락에 맞는 단백질 콘텐츠를 확장하는 허브입니다.",
    hubSummary:
      "운동 종목과 라이프스타일별 니즈를 단백질 전략과 연결하는 트랙입니다. 시즌 이벤트와 스포츠 일정형 콘텐츠 확장도 염두에 둔 구조입니다.",
    seoFocus: "운동 맥락, 라이프스타일별 영양 전략",
    accentColor: "#8a4b2f",
    accentBg: "#f8ede7",
    slots: [
      {
        slug: "running-protein-guide",
        title: "러닝",
        description: "러너를 위한 단백질 섭취 포인트를 다룰 페이지 슬롯입니다.",
        searchIntent: "러닝 단백질 섭취",
        futureFocus: ["지구력 운동 맥락", "회복 포인트", "간편 제품 연결"],
        internalLinkTargets: [
          { label: "운동 후 섭취", href: "/guides/intake-strategy-health/post-workout-protein" },
          { label: "운동 영양", href: "/guides/fitness-lifestyle/sports-nutrition-guide" },
        ],
      },
      {
        slug: "marathon-protein-guide",
        title: "마라톤",
        description: "장거리 훈련과 레이스 준비 상황을 반영한 페이지 슬롯입니다.",
        searchIntent: "마라톤 단백질 전략",
        futureFocus: ["장거리 훈련", "회복 관리", "시즌성 콘텐츠"],
        internalLinkTargets: [
          { label: "러닝", href: "/guides/fitness-lifestyle/running-protein-guide" },
          { label: "운동 영양", href: "/guides/fitness-lifestyle/sports-nutrition-guide" },
        ],
      },
      {
        slug: "strength-training-protein",
        title: "근력 운동",
        description: "근력 운동 맥락에서 단백질 전략을 풀어낼 페이지 슬롯입니다.",
        searchIntent: "근력운동 단백질",
        futureFocus: ["근성장 맥락", "운동 전후 전략", "제품 선택"],
        internalLinkTargets: [
          { label: "운동 후 섭취", href: "/guides/intake-strategy-health/post-workout-protein" },
          { label: "근육 유지", href: "/guides/intake-strategy-health/muscle-maintenance-protein" },
        ],
      },
      {
        slug: "beginner-workout-guide",
        title: "운동 초보 가이드",
        description: "운동을 막 시작한 사용자를 위한 입문형 페이지 슬롯입니다.",
        searchIntent: "운동 초보 단백질",
        futureFocus: ["입문자 질문", "가장 쉬운 기준", "기초 콘텐츠 연결"],
        internalLinkTargets: [
          { label: "단백질 기본 개념", href: "/guides/protein-basics/protein-basics-overview" },
          { label: "단백질 음료 선택 가이드", href: "/guides/product-selection-comparison/protein-drink-guide" },
        ],
      },
      {
        slug: "sports-nutrition-guide",
        title: "운동 영양",
        description: "운동 상황 전반의 영양 전략과 단백질 위치를 설명할 페이지 슬롯입니다.",
        searchIntent: "운동 영양 단백질",
        futureFocus: ["운동 영양 프레임", "보충 전략", "카테고리 확장"],
        internalLinkTargets: [
          { label: "운동 전 섭취", href: "/guides/intake-strategy-health/pre-workout-protein" },
          { label: "단백질 음료 선택 가이드", href: "/guides/product-selection-comparison/protein-drink-guide" },
        ],
      },
      {
        slug: "seasonal-sports-events",
        title: "시즌 스포츠 이벤트",
        description: "마라톤 시즌, 여름 운동, 대회 시즌 등 이벤트형 콘텐츠 슬롯입니다.",
        searchIntent: "시즌 스포츠 단백질 가이드",
        futureFocus: ["시즌성 허브", "이벤트 확장", "운동 트렌드 연결"],
        internalLinkTargets: [
          { label: "공식 이벤트", href: "/official-events" },
          { label: "마라톤", href: "/guides/fitness-lifestyle/marathon-protein-guide" },
        ],
      },
      {
        slug: "spring-diet-protein-guide",
        title: "봄 다이어트 단백질 전략",
        description: "봄철 체중 관리 시즌에 맞는 단백질 음료, 바, 요거트 선택 기준을 정리합니다.",
        searchIntent: "봄 다이어트 단백질",
        futureFocus: ["봄 다이어트", "저당 제품 기준", "가벼운 감량 루틴"],
        internalLinkTargets: [
          { label: "체중 관리와 단백질", href: "/guides/intake-strategy-health/weight-management-protein" },
          { label: "다이어트 단백질 음료 기준", href: "/guides/product-selection-comparison/diet-protein-drink-guide" },
        ],
      },
      {
        slug: "spring-running-start-guide",
        title: "봄 러닝 시작 단백질 가이드",
        description: "봄에 러닝을 다시 시작할 때 회복 루틴과 제품 선택 기준을 정리합니다.",
        searchIntent: "봄 러닝 단백질",
        futureFocus: ["러닝 재개", "회복 루틴", "가벼운 RTD"],
        internalLinkTargets: [
          { label: "러닝 단백질 가이드", href: "/guides/fitness-lifestyle/running-protein-guide" },
          { label: "운동 후 단백질", href: "/guides/intake-strategy-health/post-workout-protein" },
        ],
      },
      {
        slug: "spring-outdoor-protein-snack-guide",
        title: "봄 야외활동 단백질 간식 가이드",
        description: "피크닉, 가벼운 등산, 야외활동용 단백질 간식 기준을 정리합니다.",
        searchIntent: "봄 단백질 간식",
        futureFocus: ["야외활동 간식", "피크닉 단백질", "휴대성"],
        internalLinkTargets: [
          { label: "단백질 바 선택 가이드", href: "/guides/product-selection-comparison/protein-bar-guide" },
          { label: "드링킹 요거트 비교 가이드", href: "/guides/product-selection-comparison/drinking-yogurt-guide" },
        ],
      },
    ],
  },
  {
    slug: "market-insights",
    label: "TRACK E",
    shortLabel: "시장 인사이트",
    title: "시장 인사이트",
    description:
      "단백질 시장의 흐름, RTD 카테고리, 브랜드 전략, 성분 트렌드, 신제품과 글로벌 흐름을 확장하는 분석 허브입니다.",
    hubSummary:
      "브랜드 관심도와 시장 트렌드형 콘텐츠를 담는 트랙입니다. SEO뿐 아니라 브랜드·시장 관점의 전문 콘텐츠 기반으로 확장할 수 있습니다.",
    seoFocus: "시장 분석, 브랜드 분석, 트렌드 콘텐츠",
    accentColor: "#6b4d7c",
    accentBg: "#f1ebf7",
    slots: [
      {
        slug: "protein-market-history",
        title: "단백질 시장 히스토리",
        description: "국내 단백질 시장 변화 흐름을 시간축으로 정리할 페이지 슬롯입니다.",
        searchIntent: "국내 단백질 시장 역사",
        futureFocus: ["시장 흐름", "카테고리 변화", "시대별 정리"],
        internalLinkTargets: [
          { label: "단백질 RTD 시장", href: "/guides/market-insights/protein-rtd-market" },
          { label: "글로벌 단백질 시장", href: "/guides/market-insights/global-protein-market" },
        ],
      },
      {
        slug: "protein-rtd-market",
        title: "단백질 RTD 시장",
        description: "RTD 단백질 음료 시장 구조와 변화 포인트를 담을 페이지 슬롯입니다.",
        searchIntent: "단백질 RTD 시장",
        futureFocus: ["카테고리 구조", "브랜드 경쟁", "제품 데이터 연결"],
        internalLinkTargets: [
          { label: "브랜드 분석", href: "/guides/market-insights/brand-analysis" },
          { label: "랭킹 콘텐츠", href: "/guides/product-selection-comparison/ranking-content" },
        ],
      },
      {
        slug: "brand-analysis",
        title: "브랜드 분석",
        description: "브랜드 포지셔닝과 제품 구성을 해설할 페이지 슬롯입니다.",
        searchIntent: "단백질 브랜드 분석",
        futureFocus: ["브랜드 포트폴리오", "가격대", "포지셔닝"],
        internalLinkTargets: [
          { label: "신제품 분석", href: "/guides/market-insights/new-product-analysis" },
          { label: "공식 이벤트", href: "/official-events" },
        ],
      },
      {
        slug: "ingredient-trends",
        title: "성분 트렌드",
        description: "고단백, 저당, 식물성 등 성분 흐름을 정리할 페이지 슬롯입니다.",
        searchIntent: "단백질 제품 성분 트렌드",
        futureFocus: ["성분 흐름", "소비자 선호", "제품 DB 연결"],
        internalLinkTargets: [
          { label: "성분 비교", href: "/guides/product-selection-comparison/nutrition-comparison" },
          { label: "단백질 종류", href: "/guides/protein-basics/protein-types" },
        ],
      },
      {
        slug: "new-product-analysis",
        title: "신제품 분석",
        description: "신제품 출시와 포지셔닝을 빠르게 해설하는 슬롯입니다.",
        searchIntent: "단백질 신제품 분석",
        futureFocus: ["신제품 리뷰 구조", "시장 반응", "브랜드 연결"],
        internalLinkTargets: [
          { label: "브랜드 분석", href: "/guides/market-insights/brand-analysis" },
          { label: "추천 리스트", href: "/guides/product-selection-comparison/recommendation-lists" },
        ],
      },
      {
        slug: "global-protein-market",
        title: "글로벌 단백질 시장",
        description: "해외 시장 트렌드와 국내 시장 비교로 확장할 페이지 슬롯입니다.",
        searchIntent: "글로벌 단백질 시장 트렌드",
        futureFocus: ["글로벌 비교", "국내 적용", "브랜드 흐름"],
        internalLinkTargets: [
          { label: "단백질 시장 히스토리", href: "/guides/market-insights/protein-market-history" },
          { label: "성분 트렌드", href: "/guides/market-insights/ingredient-trends" },
        ],
      },
    ],
  },
  {
    slug: "tools",
    label: "TRACK F",
    shortLabel: "계산 & 도구",
    title: "단백질 계산 & 도구",
    description:
      "체중과 활동량을 기반으로 하루 단백질 섭취량을 계산하고 목표에 맞는 단백질 전략을 확인할 수 있는 도구 트랙입니다.",
    cardDescription:
      "체중과 활동량을 기반으로 개인에게 필요한 단백질 섭취량을 계산하고 제품 선택과 실사용에 연결할 수 있는 단백질 계산 도구를 제공합니다.",
    cardNote: "하루 단백질 섭취량 계산기 등",
    ctaLabel: "도구 사용하기",
    hubSummary:
      "계산기와 실전 활용 도구를 모아두는 확장형 트랙입니다. 현재는 하루 단백질 섭취량 계산기를 우선 제공하고, 이후 제품 개수 계산기와 단백질 밀도 계산기 등으로 넓혀갈 수 있습니다.",
    seoFocus: "단백질 섭취량 계산기, 체중별 단백질 계산, 도구형 SEO 콘텐츠",
    accentColor: "#5d4b8a",
    accentBg: "#efe9fb",
    slots: [
      {
        slug: "daily-protein-calculator",
        title: "하루 단백질 섭취량 계산기",
        description:
          "체중과 활동량을 입력하면 하루 단백질 권장량을 바로 계산할 수 있습니다.",
        searchIntent: "하루 단백질 섭취량 계산기",
        futureFocus: ["체중 기준 계산", "활동량 계수", "제품 연결"],
        internalLinkTargets: [
          { label: "단백질 섭취량", href: "/guides/protein-basics/protein-intake-amount" },
          { label: "단백질 음료 비교", href: "/products" },
        ],
      },
      {
        slug: "protein-drink-count-calculator",
        title: "단백질 음료 개수 계산기",
        description:
          "목표 섭취량을 기준으로 단백질 음료가 하루 몇 개 필요한지 계산합니다.",
        searchIntent: "단백질 음료 몇 개 먹어야",
        futureFocus: ["제품별 단백질 함량 반영", "총량 역산", "비교 페이지 연결"],
        internalLinkTargets: [
          { label: "단백질 음료 선택 가이드", href: "/guides/product-selection-comparison/protein-drink-guide" },
          { label: "랭킹", href: "/ranking" },
        ],
      },
      {
        slug: "protein-density-calculator",
        title: "단백질 밀도 계산기",
        description:
          "칼로리 대비 단백질 효율을 계산해 더 효율적인 제품을 고를 수 있게 돕습니다.",
        searchIntent: "단백질 밀도 계산기",
        futureFocus: ["밀도 계산", "제품 비교", "선택 기준 연결"],
        internalLinkTargets: [
          { label: "영양 성분 기준", href: "/guides/product-selection-comparison/nutrition-criteria" },
          { label: "제품 비교", href: "/compare" },
        ],
      },
    ],
  },
];

export function getGuideTracks() {
  return guideTracks;
}

export function getGuideTrack(trackSlug: string) {
  return guideTracks.find((track) => track.slug === trackSlug);
}

export function getGuideSlot(trackSlug: string, slotSlug: string) {
  return getGuideTrack(trackSlug)?.slots.find((slot) => slot.slug === slotSlug);
}
