import type { ProductCategory } from "./productData";

export interface TrafficLinkItem {
  href: string;
  title: string;
  description: string;
}

export function getHomeHubLinks(): TrafficLinkItem[] {
  return [
    {
      href: "/ranking",
      title: "단백질 제품 순위",
      description: "단백질 밀도, 다이어트, 퍼포먼스 기준으로 빠르게 비교합니다.",
    },
    {
      href: "/recommend",
      title: "맞춤 제품 추천",
      description: "목적과 운동 빈도에 맞춰 카테고리별 제품을 바로 좁힙니다.",
    },
    {
      href: "/guides/product-selection-comparison",
      title: "비교 가이드 모음",
      description: "저당, 고단백, 식사대용, 요거트 비교 기준을 한 번에 확인합니다.",
    },
    {
      href: "/topics",
      title: "검색형 주제 랜딩",
      description: "저당 단백질 음료, 편의점 프로틴, 러닝용 제품 같은 인기 주제를 모았습니다.",
    },
  ];
}

export function getBrandHubLinks(): TrafficLinkItem[] {
  return [
    {
      href: "/brands/sellex",
      title: "셀렉스 브랜드 허브",
      description: "셀렉스 음료와 바를 한 번에 모아 비교합니다.",
    },
    {
      href: "/brands/labnosh",
      title: "랩노쉬 브랜드 허브",
      description: "랩노쉬 음료, 바, 쉐이크 라인을 브랜드 단위로 확인합니다.",
    },
    {
      href: "/brands/hymune",
      title: "하이뮨 브랜드 허브",
      description: "하이뮨 대표 RTD와 관련 제품을 브랜드 기준으로 모아 봅니다.",
    },
    {
      href: "/brands/danbaek",
      title: "더단백 브랜드 허브",
      description: "더단백 음료와 바를 함께 보고 제품군 구성을 빠르게 비교합니다.",
    },
  ];
}

export function getGuidesHubLinks(): TrafficLinkItem[] {
  return [
    {
      href: "/ranking",
      title: "점수 기준 순위 보기",
      description: "가이드에서 본 기준을 실제 제품 순위에 바로 적용해 확인합니다.",
    },
    {
      href: "/recommend",
      title: "조건 맞춤 추천 받기",
      description: "운동 강도, 목적, 저당 여부를 선택해 바로 후보를 좁힙니다.",
    },
    {
      href: "/topics",
      title: "주제별 랜딩 모음",
      description: "검색 의도가 분명한 주제 페이지로 이동해 더 빠르게 비교합니다.",
    },
  ];
}

export function getRankingHubLinks(): TrafficLinkItem[] {
  return [
    {
      href: "/guides/product-selection-comparison/ranking-content",
      title: "랭킹 해석 가이드",
      description: "100점 환산 점수와 등급이 어떤 의미인지 기준부터 확인합니다.",
    },
    {
      href: "/recommend",
      title: "맞춤 추천으로 다시 좁히기",
      description: "전체 순위 대신 내 운동 목적과 조건으로 제품을 다시 추립니다.",
    },
    {
      href: "/topics",
      title: "주제별 랜딩 보기",
      description: "저당, 식사대용, 편의점 같은 조건형 랜딩으로 바로 이동합니다.",
    },
  ];
}

export function getRecommendHubLinks(): TrafficLinkItem[] {
  return [
    {
      href: "/ranking",
      title: "카테고리별 순위 보기",
      description: "추천 결과를 본 뒤 전체 순위와 상위권 제품도 함께 비교합니다.",
    },
    {
      href: "/guides/product-selection-comparison/recommendation-lists",
      title: "추천 리스트 읽기",
      description: "조건별 제품을 더 빠르게 고르는 방법을 가이드 형식으로 정리했습니다.",
    },
    {
      href: "/topics",
      title: "조건형 랜딩 더 보기",
      description: "러닝, 저당, 고단백 같은 주제 페이지로 바로 이어집니다.",
    },
  ];
}

export function getProductTrafficLinks(
  category: ProductCategory,
  slug: string,
): TrafficLinkItem[] {
  const common: TrafficLinkItem[] = [
    {
      href: "/ranking",
      title: "전체 순위에서 보기",
      description: "같은 카테고리 제품과 점수 기준으로 비교해 위치를 확인합니다.",
    },
    {
      href: "/recommend",
      title: "맞춤 추천 받기",
      description: "이 제품과 비슷한 조건의 후보를 추천 흐름에서 다시 찾습니다.",
    },
    {
      href: `/compare?slugs=${encodeURIComponent(slug)}`,
      title: "비교함에 담아 확장 비교",
      description: "현재 제품을 기준점으로 잡고 다른 제품과 숫자를 나란히 봅니다.",
    },
  ];

  const categorySpecific: Record<ProductCategory, TrafficLinkItem[]> = {
    drink: [
      {
        href: "/guides/product-selection-comparison/protein-drink-guide",
        title: "단백질 음료 선택 가이드",
        description: "단백질 g, 당류, 칼로리, 단백질 밀도를 어떤 순서로 봐야 하는지 정리했습니다.",
      },
      {
        href: "/topics/low-sugar-protein-drink",
        title: "저당 단백질 음료 랜딩",
        description: "당류 기준으로 비슷한 제품군만 빠르게 다시 비교합니다.",
      },
    ],
    bar: [
      {
        href: "/guides/product-selection-comparison/protein-bar-guide",
        title: "단백질 바 선택 가이드",
        description: "총 단백질, 당류, 칼로리, 중량을 함께 보는 기준을 정리했습니다.",
      },
      {
        href: "/topics/high-protein-bar",
        title: "고단백 바 랜딩",
        description: "단백질 함량이 높은 바만 모아서 다시 비교합니다.",
      },
    ],
    yogurt: [
      {
        href: "/guides/product-selection-comparison/protein-yogurt-guide",
        title: "단백질 요거트 비교 가이드",
        description: "그릭, 드링킹, 대용량 요거트를 목적에 맞게 나누는 기준입니다.",
      },
      {
        href: "/topics/high-protein-greek-yogurt",
        title: "고단백 그릭요거트 랜딩",
        description: "단백질 밀도와 당류를 기준으로 그릭요거트만 다시 봅니다.",
      },
    ],
    shake: [
      {
        href: "/guides/product-selection-comparison/protein-shake-guide",
        title: "단백질 쉐이크 선택 가이드",
        description: "파우치형 쉐이크에서 단백질, 식이섬유, 당류를 보는 기준입니다.",
      },
      {
        href: "/topics/meal-replacement-protein-shake",
        title: "식사대용 쉐이크 랜딩",
        description: "식이섬유와 칼로리를 포함해 식사대용 관점으로 다시 비교합니다.",
      },
    ],
  };

  return [...categorySpecific[category], ...common];
}
