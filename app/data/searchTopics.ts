import type { TrafficLinkItem } from "../lib/trafficLinks";

export interface SearchTopic {
  slug: string;
  title: string;
  description: string;
  intro: string;
  bullets: string[];
  primaryCta: TrafficLinkItem;
  relatedLinks: TrafficLinkItem[];
}

const searchTopics: SearchTopic[] = [
  {
    slug: "protein-drink-recommend",
    title: "단백질 음료 추천",
    description: "단백질 g, 당류, 칼로리, 단백질 밀도를 기준으로 단백질 음료를 비교합니다.",
    intro: "가장 넓은 검색 의도를 받는 허브 페이지입니다. 비교 기준과 추천 흐름, 실제 제품 목록으로 자연스럽게 연결합니다.",
    bullets: ["처음 보는 사람도 비교 기준부터 이해하기 쉬움", "랭킹과 추천 페이지로 연결하기 좋음", "카테고리 전체 제품 탐색의 출발점 역할"],
    primaryCta: { href: "/", title: "단백질 음료 전체 보기", description: "홈 제품 리스트에서 필터와 정렬을 바로 적용합니다." },
    relatedLinks: [
      { href: "/guides/product-selection-comparison/protein-drink-guide", title: "단백질 음료 선택 가이드", description: "비교 기준과 읽는 순서를 먼저 확인합니다." },
      { href: "/ranking", title: "단백질 제품 순위", description: "점수 기준으로 상위 제품을 바로 봅니다." },
      { href: "/recommend", title: "맞춤 추천 받기", description: "운동 목적에 맞는 제품군만 다시 추립니다." },
    ],
  },
  {
    slug: "low-sugar-protein-drink",
    title: "저당 단백질 음료 추천",
    description: "당류 부담을 줄이고 싶은 사람을 위한 저당 단백질 음료 비교 페이지입니다.",
    intro: "다이어트, 혈당 관리, 깔끔한 맛 선호 검색어를 함께 받을 수 있는 랜딩입니다.",
    bullets: ["당류 중심 검색 유입 대응", "다이어트 가이드와 연결이 쉬움", "워터형/RTD 비교 흐름으로 확장 가능"],
    primaryCta: { href: "/guides/product-selection-comparison/low-sugar-protein-drink-guide", title: "저당 음료 가이드 보기", description: "당류 기준과 함께 실제 후보군을 확인합니다." },
    relatedLinks: [
      { href: "/topics/diet-protein-drink", title: "다이어트용 단백질 음료", description: "칼로리까지 함께 보는 검색형 랜딩입니다." },
      { href: "/ranking", title: "점수 기준 순위", description: "상위권 제품의 점수도 함께 비교합니다." },
      { href: "/?curation=popular", title: "인기 음료 비교", description: "검색이 많은 제품군부터 빠르게 봅니다." },
    ],
  },
  {
    slug: "diet-protein-drink",
    title: "다이어트 단백질 음료 추천",
    description: "저칼로리, 저당, 단백질 밀도를 함께 보며 다이어트용 단백질 음료를 비교합니다.",
    intro: "다이어트와 체중 관리 검색은 구매 의도가 높아서 별도 랜딩 가치가 큽니다.",
    bullets: ["다이어트 검색 CTR이 높은 편", "저당/저칼로리 기준을 한 페이지에서 처리", "추천 페이지와 결합 시 전환 흐름이 좋음"],
    primaryCta: { href: "/guides/product-selection-comparison/diet-protein-drink-guide", title: "다이어트 음료 가이드 보기", description: "칼로리와 당류 기준을 먼저 확인합니다." },
    relatedLinks: [
      { href: "/topics/low-sugar-protein-drink", title: "저당 단백질 음료", description: "당류 중심으로 다시 좁혀 봅니다." },
      { href: "/recommend", title: "맞춤 추천 받기", description: "빈도와 운동 강도를 반영한 추천으로 이어집니다." },
      { href: "/ranking", title: "순위 페이지", description: "다른 제품과 위치를 빠르게 확인합니다." },
    ],
  },
  {
    slug: "high-protein-drink-20g",
    title: "고단백 20g 이상 단백질 음료",
    description: "한 병 기준 단백질 20g 이상 제품을 중심으로 고단백 음료를 모았습니다.",
    intro: "운동 후 보충이나 고단백 중심 검색을 직접 받는 페이지입니다.",
    bullets: ["고단백 의도 키워드 대응", "운동 후/퍼포먼스 가이드와 연결 가능", "순위 페이지와 잘 맞음"],
    primaryCta: { href: "/picks/high-protein-20", title: "20g 이상 음료 보기", description: "실제 제품 카드 중심으로 바로 이동합니다." },
    relatedLinks: [
      { href: "/topics/post-workout-protein-shake", title: "운동 후 단백질 쉐이크", description: "운동 직후 보충 목적이면 쉐이크도 함께 비교합니다." },
      { href: "/ranking", title: "퍼포먼스 순위", description: "고단백 제품의 상대 위치를 확인합니다." },
      { href: "/guides/intake-strategy-health/post-workout-protein", title: "운동 후 섭취 가이드", description: "언제, 얼마나 보충할지 기준을 봅니다." },
    ],
  },
  {
    slug: "protein-water",
    title: "프로틴 워터 추천",
    description: "가볍게 마실 수 있는 워터형 단백질 음료를 비교하는 랜딩 페이지입니다.",
    intro: "깔끔한 음용감과 낮은 부담을 찾는 검색 의도를 직접 받습니다.",
    bullets: ["워터형 검색 전용 랜딩", "저당/가벼운 음료 탐색과 결합 가능", "운동 후 수분 보충 흐름과도 맞음"],
    primaryCta: { href: "/picks/protein-water", title: "워터형 음료 보기", description: "워터형 제품만 모아서 비교합니다." },
    relatedLinks: [
      { href: "/topics/low-sugar-protein-drink", title: "저당 음료", description: "당류 기준으로도 함께 비교합니다." },
      { href: "/guides/product-selection-comparison/protein-drink-guide", title: "단백질 음료 가이드", description: "워터형이 어떤 목적에 맞는지 봅니다." },
      { href: "/recommend", title: "맞춤 추천", description: "운동 강도와 빈도로 후보를 좁힙니다." },
    ],
  },
  {
    slug: "lactose-free-protein-drink",
    title: "락토프리 단백질 음료 추천",
    description: "우유 기반 제품이 부담스러운 사람을 위한 락토프리 단백질 음료 비교 페이지입니다.",
    intro: "민감한 사용자가 검색하는 니즈가 분명해 전환 의도가 높은 랜딩입니다.",
    bullets: ["민감도 기반 검색어 대응", "음용 부담 관련 질문과 연결 가능", "제품 상세 체류 유도에 좋음"],
    primaryCta: { href: "/picks/lactose-free", title: "락토프리 음료 보기", description: "락토프리 제품만 빠르게 확인합니다." },
    relatedLinks: [
      { href: "/topics/protein-drink-recommend", title: "단백질 음료 전체 허브", description: "전체 제품군도 함께 살펴볼 수 있습니다." },
      { href: "/recommend", title: "맞춤 추천", description: "조건을 선택해 더 좁은 후보를 받습니다." },
      { href: "/guides/product-selection-comparison/protein-drink-guide", title: "비교 기준 가이드", description: "락토프리 외에 함께 볼 기준을 정리했습니다." },
    ],
  },
  {
    slug: "vegan-protein-drink",
    title: "비건 단백질 음료 추천",
    description: "식물성 단백질 원료 기반의 비건 단백질 음료를 비교합니다.",
    intro: "원료 기반 검색 의도가 분명해 식물성 단백질 탐색 허브로 활용할 수 있습니다.",
    bullets: ["식물성 단백질 검색 대응", "원료별 비교 콘텐츠로 확장 가능", "브랜드 허브와도 연결이 좋음"],
    primaryCta: { href: "/picks/vegan", title: "비건 음료 보기", description: "식물성 원료 기반 제품을 모아 봅니다." },
    relatedLinks: [
      { href: "/topics/protein-drink-recommend", title: "음료 전체 허브", description: "비건 외 제품과 차이도 같이 볼 수 있습니다." },
      { href: "/guides/product-selection-comparison/protein-drink-guide", title: "음료 선택 가이드", description: "원료 외에도 함께 볼 수치를 정리했습니다." },
      { href: "/ranking", title: "순위 페이지", description: "전체 제품 속 상대 위치를 확인합니다." },
    ],
  },
  {
    slug: "meal-replacement-protein-shake",
    title: "식사대용 단백질 쉐이크 추천",
    description: "식이섬유와 칼로리까지 고려해 식사대용으로 보기 좋은 단백질 쉐이크를 비교합니다.",
    intro: "식사대용과 포만감 의도는 쉐이크 카테고리에서 가장 핵심적인 검색 주제입니다.",
    bullets: ["식사대용 키워드 전용 랜딩", "쉐이크 카테고리 핵심 유입 담당", "가이드와 카테고리 페이지 연결이 쉬움"],
    primaryCta: { href: "/guides/product-selection-comparison/meal-replacement-protein-shake-guide", title: "식사대용 쉐이크 가이드", description: "선택 기준과 함께 추천 흐름을 확인합니다." },
    relatedLinks: [
      { href: "/shake?curation=shake-meal-replacement", title: "식사대용 쉐이크 목록", description: "카테고리 필터 결과를 바로 봅니다." },
      { href: "/topics/low-sugar-protein-shake", title: "저당 단백질 쉐이크", description: "당류 기준으로 다시 좁혀 볼 수 있습니다." },
      { href: "/recommend", title: "맞춤 추천", description: "실사용 조건에 맞춰 다시 후보를 추립니다." },
    ],
  },
  {
    slug: "low-sugar-protein-shake",
    title: "저당 단백질 쉐이크 추천",
    description: "당류 부담이 낮은 단백질 쉐이크를 비교하는 검색형 랜딩입니다.",
    intro: "쉐이크 쪽에서는 저당과 식사대용이 가장 큰 검색 덩어리라 별도 허브가 필요합니다.",
    bullets: ["쉐이크 저당 검색 대응", "식사대용/운동후 랜딩과 교차 연결 가능", "CTR 개선 여지가 큼"],
    primaryCta: { href: "/guides/product-selection-comparison/low-sugar-protein-shake-guide", title: "저당 쉐이크 가이드", description: "당류와 단백질 밀도를 함께 확인합니다." },
    relatedLinks: [
      { href: "/shake?curation=shake-low-sugar", title: "저당 쉐이크 목록", description: "필터링된 제품 목록으로 바로 이동합니다." },
      { href: "/topics/meal-replacement-protein-shake", title: "식사대용 쉐이크", description: "포만감 목적 랜딩도 함께 봅니다." },
      { href: "/ranking", title: "순위 페이지", description: "상대 점수도 함께 체크합니다." },
    ],
  },
  {
    slug: "post-workout-protein-shake",
    title: "운동 후 단백질 쉐이크 추천",
    description: "운동 직후 보충 관점에서 보기 좋은 단백질 쉐이크를 모았습니다.",
    intro: "운동 후 검색은 구매 의도가 높아서 추천/순위/가이드 연결이 특히 잘 먹히는 주제입니다.",
    bullets: ["운동 후 섭취 검색 대응", "퍼포먼스 순위와 연결이 좋음", "운동 강도 기반 추천으로 확장 가능"],
    primaryCta: { href: "/guides/product-selection-comparison/post-workout-protein-shake-guide", title: "운동 후 쉐이크 가이드", description: "보충 목적에 맞는 기준을 먼저 봅니다." },
    relatedLinks: [
      { href: "/guides/intake-strategy-health/post-workout-protein", title: "운동 후 단백질 섭취 가이드", description: "타이밍과 섭취량 기준을 확인합니다." },
      { href: "/topics/high-protein-drink-20g", title: "고단백 음료", description: "음료형 후보도 함께 비교합니다." },
      { href: "/recommend", title: "맞춤 추천", description: "운동 빈도와 강도로 다시 후보를 좁힙니다." },
    ],
  },
  {
    slug: "high-protein-greek-yogurt",
    title: "고단백 그릭요거트 추천",
    description: "단백질 밀도와 당류를 함께 보며 고단백 그릭요거트를 비교합니다.",
    intro: "요거트 카테고리에서 가장 검색 의도가 선명한 조합형 랜딩입니다.",
    bullets: ["그릭요거트 + 고단백 조합 검색 대응", "요거트 상세와 랭킹 유입 허브 역할", "대용량/저당 페이지로 확장 가능"],
    primaryCta: { href: "/guides/product-selection-comparison/greek-yogurt-guide", title: "그릭요거트 가이드", description: "그릭요거트를 볼 때 어떤 수치를 봐야 하는지 정리했습니다." },
    relatedLinks: [
      { href: "/yogurt?curation=yogurt-greek", title: "그릭요거트 목록", description: "그릭요거트 제품군을 바로 비교합니다." },
      { href: "/topics/low-sugar-yogurt", title: "저당 요거트 랜딩", description: "당류 기준으로도 다시 좁힐 수 있습니다." },
      { href: "/ranking", title: "순위 페이지", description: "요거트 상위권 제품 위치를 확인합니다." },
    ],
  },
  {
    slug: "low-sugar-yogurt",
    title: "저당 단백질 요거트 추천",
    description: "당류 부담을 줄이면서 단백질을 챙기고 싶은 사람을 위한 요거트 비교 페이지입니다.",
    intro: "요거트 카테고리에서는 저당과 그릭이 가장 직접적인 검색 주제입니다.",
    bullets: ["저당 요거트 검색 대응", "그릭/드링킹 요거트와 교차 탐색 가능", "다이어트 의도와 연결이 좋음"],
    primaryCta: { href: "/guides/product-selection-comparison/low-sugar-yogurt-guide", title: "저당 요거트 가이드", description: "당류 기준과 제품군 차이를 먼저 봅니다." },
    relatedLinks: [
      { href: "/yogurt?curation=yogurt-low-sugar", title: "저당 요거트 목록", description: "당류 기준으로 필터링된 리스트를 봅니다." },
      { href: "/topics/high-protein-greek-yogurt", title: "고단백 그릭요거트", description: "단백질 밀도 중심으로 다시 좁힙니다." },
      { href: "/recommend", title: "맞춤 추천", description: "섭취 목적에 맞는 카테고리별 추천으로 이어집니다." },
    ],
  },
  {
    slug: "drinking-yogurt-protein",
    title: "드링킹 요거트 추천",
    description: "마시기 편한 드링킹 단백질 요거트를 비교하는 검색형 랜딩입니다.",
    intro: "휴대성과 음용 편의성 니즈가 확실해서 모바일 유입과 잘 맞습니다.",
    bullets: ["드링킹 요거트 검색 전용 랜딩", "대용량/그릭요거트와 차이를 보여주기 좋음", "편의성 중심 검색을 흡수"],
    primaryCta: { href: "/guides/product-selection-comparison/drinking-yogurt-guide", title: "드링킹 요거트 가이드", description: "드링킹 타입을 볼 때 확인할 기준입니다." },
    relatedLinks: [
      { href: "/yogurt?curation=yogurt-drinking", title: "드링킹 요거트 목록", description: "드링킹 타입 제품만 바로 봅니다." },
      { href: "/topics/low-sugar-yogurt", title: "저당 요거트", description: "당류 기준으로 다시 좁혀 볼 수 있습니다." },
      { href: "/topics/high-protein-greek-yogurt", title: "고단백 그릭요거트", description: "식감과 밀도 차이를 함께 비교합니다." },
    ],
  },
  {
    slug: "bulk-yogurt-protein",
    title: "대용량 단백질 요거트 추천",
    description: "한 번에 오래 먹기 좋은 대용량 단백질 요거트를 모은 랜딩 페이지입니다.",
    intro: "대용량 SKU는 장바구니 의도가 높은 편이라 별도 랜딩 가치가 있습니다.",
    bullets: ["대용량 검색 대응", "가성비/가정용 검색어와 결합 가능", "상세 페이지 재방문 유도에 적합"],
    primaryCta: { href: "/curation/yogurt-bulk", title: "대용량 요거트 큐레이션", description: "대용량 제품을 우선으로 정리한 페이지입니다." },
    relatedLinks: [
      { href: "/yogurt", title: "요거트 전체 보기", description: "전체 요거트 제품군에서 다른 타입도 확인합니다." },
      { href: "/topics/high-protein-greek-yogurt", title: "고단백 그릭요거트", description: "단백질 밀도가 높은 타입과 연결됩니다." },
      { href: "/ranking", title: "순위 페이지", description: "대용량 제품이 전체에서 어디쯤인지 확인합니다." },
    ],
  },
  {
    slug: "high-protein-bar",
    title: "고단백 단백질 바 추천",
    description: "단백질 함량이 높은 단백질 바를 한눈에 비교하는 검색형 랜딩입니다.",
    intro: "바 카테고리에서 가장 직접적인 검색어라 내부 링크 허브로도 활용도가 높습니다.",
    bullets: ["고단백 바 검색 대응", "식사대용/저당 바와 자연스럽게 연결", "상세 페이지 유입 확장에 유리"],
    primaryCta: { href: "/picks/bar-high-protein-20", title: "20g 이상 단백질 바 보기", description: "고단백 바만 추린 페이지로 이동합니다." },
    relatedLinks: [
      { href: "/guides/product-selection-comparison/protein-bar-guide", title: "단백질 바 선택 가이드", description: "총량과 밀도를 함께 보는 기준을 설명합니다." },
      { href: "/topics/low-sugar-protein-bar", title: "저당 단백질 바", description: "당류 기준으로 다시 좁힙니다." },
      { href: "/bars", title: "단백질 바 전체 보기", description: "전체 바 목록에서 추가 탐색이 가능합니다." },
    ],
  },
  {
    slug: "low-sugar-protein-bar",
    title: "저당 단백질 바 추천",
    description: "당류가 낮은 단백질 바를 중심으로 다이어트 친화적인 제품을 비교합니다.",
    intro: "단백질 바는 간식형 검색이 많아서 저당 랜딩이 특히 중요합니다.",
    bullets: ["다이어트 바 검색 대응", "고단백 바와 교차 탐색 가능", "가이드와 추천 흐름 연결이 좋음"],
    primaryCta: { href: "/picks/bar-low-sugar", title: "저당 단백질 바 보기", description: "저당 기준 제품만 모아 둔 페이지입니다." },
    relatedLinks: [
      { href: "/topics/high-protein-bar", title: "고단백 단백질 바", description: "함량 중심 제품군도 함께 볼 수 있습니다." },
      { href: "/guides/product-selection-comparison/meal-replacement-protein-bar-guide", title: "식사대용 바 가이드", description: "포만감과 칼로리 기준을 함께 봅니다." },
      { href: "/recommend", title: "맞춤 추천", description: "목적에 따라 다른 카테고리 후보도 추천합니다." },
    ],
  },
  {
    slug: "low-calorie-protein-bar",
    title: "저칼로리 단백질 바 추천",
    description: "200kcal 미만 제품 중심으로 저칼로리 단백질 바를 비교합니다.",
    intro: "칼로리 기준 검색은 구매 전환 의도가 분명해서 별도 랜딩 가치가 큽니다.",
    bullets: ["저칼로리 검색 대응", "다이어트 바 니즈와 연결", "저당/고단백 페이지로 확장 가능"],
    primaryCta: { href: "/picks/bar-low-calorie", title: "저칼로리 바 보기", description: "가벼운 바 위주로 정리된 페이지입니다." },
    relatedLinks: [
      { href: "/topics/low-sugar-protein-bar", title: "저당 단백질 바", description: "당류 기준과 함께 비교할 수 있습니다." },
      { href: "/bars", title: "단백질 바 전체 보기", description: "전체 후보군에서 추가 탐색이 가능합니다." },
      { href: "/ranking", title: "순위 페이지", description: "전체 카테고리 내 위치를 확인합니다." },
    ],
  },
  {
    slug: "convenience-store-protein",
    title: "편의점 단백질 제품 추천",
    description: "편의점에서 찾기 쉬운 단백질 음료와 단백질 바를 모은 검색형 랜딩입니다.",
    intro: "브랜드나 유통채널 기반 검색을 받는 허브로 활용할 수 있습니다.",
    bullets: ["편의점 검색 대응", "음료/바를 동시에 연결할 수 있음", "실사용 맥락이 분명해 전환이 좋음"],
    primaryCta: { href: "/curation/convenience", title: "편의점 큐레이션 보기", description: "유통채널 기준으로 정리한 큐레이션입니다." },
    relatedLinks: [
      { href: "/?curation=convenience", title: "편의점 음료 보기", description: "음료 카테고리부터 확인합니다." },
      { href: "/bars?curation=convenience", title: "편의점 바 보기", description: "바 카테고리 제품도 함께 비교합니다." },
      { href: "/topics/running-protein-products", title: "러닝용 단백질 제품", description: "실사용 목적형 랜딩으로 이어집니다." },
    ],
  },
  {
    slug: "running-protein-products",
    title: "러닝용 단백질 제품 추천",
    description: "러닝과 마라톤 루틴에 맞는 단백질 음료와 바를 정리한 검색형 랜딩입니다.",
    intro: "운동 종목 기반 검색은 목적이 명확해서 추천과 큐레이션 연결이 잘 됩니다.",
    bullets: ["러닝/마라톤 검색 대응", "운동 후 보충 콘텐츠와 연결", "음료와 바를 함께 묶기 좋음"],
    primaryCta: { href: "/curation/running", title: "러닝 큐레이션 보기", description: "러닝 관점으로 추린 제품 페이지입니다." },
    relatedLinks: [
      { href: "/guides/fitness-lifestyle/running-protein-guide", title: "러닝 단백질 가이드", description: "러닝 루틴에서 단백질을 보는 기준을 정리했습니다." },
      { href: "/guides/fitness-lifestyle/marathon-protein-guide", title: "마라톤 단백질 가이드", description: "장거리 러너 관점의 내용을 봅니다." },
      { href: "/recommend", title: "맞춤 추천", description: "개인 운동 빈도와 강도를 반영합니다." },
    ],
  },
  {
    slug: "best-protein-ranking",
    title: "단백질 제품 순위 총정리",
    description: "단백질 음료, 바, 요거트, 쉐이크를 한곳에서 순위 기준으로 비교하는 허브입니다.",
    intro: "순위형 검색어를 받는 대표 랜딩으로, 카테고리별 상세 순위와 가이드 진입점 역할을 맡습니다.",
    bullets: ["순위형 검색 대응", "카테고리 전체 허브 역할", "가이드/추천/상세로 분기하기 좋음"],
    primaryCta: { href: "/ranking", title: "순위 페이지 보기", description: "카테고리별 점수와 순위를 바로 확인합니다." },
    relatedLinks: [
      { href: "/topics/protein-drink-recommend", title: "단백질 음료 추천", description: "음료 카테고리 랜딩으로 이동합니다." },
      { href: "/topics/high-protein-bar", title: "고단백 바 추천", description: "바 카테고리 랜딩으로 이동합니다." },
      { href: "/topics/high-protein-greek-yogurt", title: "고단백 그릭요거트", description: "요거트 카테고리 랜딩으로 이동합니다." },
    ],
  },
];

export function getAllSearchTopics() {
  return searchTopics;
}

export function getSearchTopicBySlug(slug: string) {
  return searchTopics.find((topic) => topic.slug === slug) ?? null;
}
