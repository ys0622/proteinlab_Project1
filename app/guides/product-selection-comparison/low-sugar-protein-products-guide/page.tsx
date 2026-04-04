import type { CategoryGuideConfig } from "../categoryGuideShared";
import { buildCategoryGuideMetadata, CategoryGuidePage } from "../categoryGuideShared";

function articleJsonLd(config: CategoryGuideConfig) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: config.title,
    description: config.description,
    inLanguage: "ko-KR",
    mainEntityOfPage: `https://proteinlab.kr/guides/product-selection-comparison/${config.slug}`,
    author: { "@type": "Organization", name: "ProteinLab" },
    publisher: {
      "@type": "Organization",
      name: "ProteinLab",
      logo: { "@type": "ImageObject", url: "https://proteinlab.kr/proteinlab-logo.png" },
    },
    dateModified: "2026-03-29",
  };
}

function faqJsonLd(config: CategoryGuideConfig) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: (config.faq ?? []).map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

const config: CategoryGuideConfig = {
  slug: "low-sugar-protein-products-guide",
  title: "저당 단백질 추천 | 당류 낮은 음료·쉐이크·요거트·바 한눈에 비교",
  description:
    "당류 낮은 단백질 제품을 찾는 사람을 위해 음료, 쉐이크, 요거트, 바를 한 번에 비교합니다. 다이어트, 혈당 관리, 저당 간식 목적에 맞는 시작 카테고리를 빠르게 고를 수 있게 정리했습니다.",
  keywords: [
    "저당 단백질",
    "당류 낮은 단백질 제품",
    "저당 단백질 음료",
    "저당 단백질 쉐이크",
    "당류 낮은 단백질 추천",
  ],
  badge: "저당 허브",
  readingTime: "6분 읽기",
  updatedAt: "2026-03-29",
  methodologyNote: "ProteinLab DB 기준 카테고리별 저당 후보와 실제 섭취 상황 비교",
  intro:
    "저당 단백질을 찾는 사람은 보통 당류 부담을 줄이면서도 단백질은 놓치고 싶지 않은 경우가 많습니다. 그런데 실제로는 카테고리 선택이 생각보다 더 중요합니다. 당류를 가장 깔끔하게 관리하려면 RTD 음료나 일부 쉐이크가 유리하고, 요거트와 바는 제품별 편차를 더 꼼꼼히 봐야 합니다. 이 페이지는 음료, 쉐이크, 요거트, 바를 한 번에 놓고 당류 기준으로 어떤 카테고리가 더 잘 맞는지 가장 빠르게 정리합니다.",
  summary: [
    "당류 관리가 최우선이면 RTD 음료나 일부 쉐이크부터, 가벼운 간식이면 요거트, 이동 중이면 바를 보되 성분표를 더 꼼꼼히 확인해야 합니다.",
    "저당 제품은 당류 숫자만 보면 안 되고 단백질, 칼로리, 계속 먹을 수 있는 맛인지까지 같이 봐야 실패가 줄어듭니다.",
    "다이어트나 혈당 관리 목적이라면 처음부터 완벽한 제품 하나를 찾기보다 달지 않은 맛에 적응하기 쉬운 카테고리부터 시작하는 편이 더 오래 갑니다.",
  ],
  comparisonTitle: "저당 기준 카테고리 비교",
  comparisonColumns: ["RTD 음료", "파우치 쉐이크", "단백질 요거트", "단백질 바"],
  comparisonRows: [
    { label: "당류 범위", values: ["0~4g", "1~5g", "3~8g", "1~8g"] },
    { label: "저당 제품 찾기", values: ["가장 쉬움", "쉬운 편", "제품 편차 큼", "제품 편차 큼"] },
    { label: "맛 진입 장벽", values: ["중간", "중간", "낮음", "중간"] },
    { label: "추천 상황", values: ["운동 후, 저녁 보충", "아침 대용, 다이어트", "가벼운 간식", "이동 중 저당 간식"] },
    { label: "주의 포인트", values: ["나트륨 확인", "칼로리 확인", "토핑·혼합당 확인", "코팅·당알코올 확인"] },
    { label: "대표 후보", values: ["셀렉스 프로핏", "랩노쉬 슬림쉐이크", "요프로 플레인", "닥터유 프로틴바"] },
  ],
  sections: [
    {
      title: "어떤 카테고리부터 봐야 하나",
      items: [
        {
          title: "당류를 가장 먼저 줄이고 싶다",
          body: "RTD 음료부터 보는 편이 가장 단순합니다. 당류 0g 또는 1g대 제품이 많고, 성분표도 읽기 쉬운 편입니다.",
        },
        {
          title: "저당이어야 하지만 한 끼 대체 체감도 원한다",
          body: "쉐이크가 더 잘 맞습니다. 당류를 낮추면서도 포만감을 같이 챙기기 쉬워서 다이어트 루틴과 연결하기 좋습니다.",
        },
        {
          title: "가볍게 먹고 싶고 유제품 느낌이 좋다",
          body: "요거트가 가장 진입 장벽이 낮습니다. 다만 토핑형이나 과일 혼합형은 당류 차이가 커서 제품별 확인이 필요합니다.",
        },
        {
          title: "이동 중에 당류 낮은 간식이 필요하다",
          body: "바가 실용적이지만 성분표를 더 꼼꼼히 봐야 합니다. 초코 코팅과 시럽이 들어간 제품은 당류가 확 높아질 수 있습니다.",
        },
      ],
    },
    {
      title: "저당 제품에서 가장 자주 하는 실수",
      items: [
        {
          title: "당류 숫자만 보고 안심하기",
          body: "당류가 낮아도 칼로리나 지방이 높으면 다이어트 목적과는 안 맞을 수 있습니다. 저당과 저칼로리는 다른 기준입니다.",
        },
        {
          title: "요거트와 바의 토핑을 놓치기",
          body: "기본 제품은 저당이어도 그래놀라, 초코칩, 시럽이 들어가면 숫자가 크게 달라집니다. 제품명보다 성분표가 더 중요합니다.",
        },
        {
          title: "저당이면 맛이 없을 거라고 미리 포기하기",
          body: "저당 제품도 카테고리마다 맛 특성이 다릅니다. 처음에는 무난한 RTD나 플레인 요거트부터 시작하면 적응이 쉽습니다.",
        },
        {
          title: "저당과 혈당 관리 제품을 완전히 같은 것으로 보기",
          body: "당류가 낮아도 탄수화물, 칼로리, 섭취 타이밍에 따라 체감은 달라질 수 있습니다. 목적에 맞는 제품군을 고르는 게 먼저입니다.",
        },
      ],
    },
    {
      title: "상황별 바로가기",
      items: [
        {
          title: "다이어트 중 당류를 강하게 관리하고 싶다",
          body: "저당 쉐이크나 RTD 음료가 가장 보기 쉽습니다. 제품 수가 많고 수치 차이도 분명해서 비교가 편합니다.",
        },
        {
          title: "밤에 가볍게 단백질 보충하고 싶다",
          body: "저당 RTD나 플레인 요거트가 무난합니다. 바는 편하지만 코팅형은 늦은 시간엔 부담이 될 수 있습니다.",
        },
        {
          title: "아침에 달지 않은 제품이 좋다",
          body: "플레인 요거트나 무난한 맛 쉐이크부터 시작하는 쪽이 좋습니다. 달지 않은 맛에 적응하기 쉬운 편입니다.",
        },
        {
          title: "이동 중 저당 간식이 필요하다",
          body: "바가 가장 편하지만, 제품별 편차가 커서 저당 기준으로 다시 한 번 걸러보는 과정이 필요합니다.",
        },
      ],
    },
    {
      title: "실제 선택 순서",
      items: [
        {
          title: "1단계: 왜 저당 제품이 필요한지 먼저 정하기",
          body: "다이어트인지, 혈당 관리인지, 단지 덜 단 맛을 원하는지에 따라 맞는 카테고리가 달라집니다.",
        },
        {
          title: "2단계: 한 끼 대체인지 보충인지 구분하기",
          body: "보충이면 RTD나 요거트, 식사대용이면 쉐이크가 더 잘 맞습니다. 바는 이동 중 간식에 가깝습니다.",
        },
        {
          title: "3단계: 당류와 함께 칼로리도 확인하기",
          body: "저당이어도 칼로리가 높으면 전체 루틴과 안 맞을 수 있습니다. 특히 다이어트 중이라면 두 숫자를 같이 봐야 합니다.",
        },
        {
          title: "4단계: 마지막으로 맛과 재구매 편의성 비교",
          body: "저당 루틴은 한 번보다 반복 섭취가 중요합니다. 무난한 맛과 자주 살 수 있는 채널을 확인한 뒤 정하는 편이 좋습니다.",
        },
      ],
    },
  ],
  relatedGuides: [
    {
      title: "저당 단백질 쉐이크",
      href: "/guides/product-selection-comparison/low-sugar-protein-shake-guide",
      description: "저당 쉐이크만 따로 깊게 보고 싶다면 이 페이지가 가장 가깝습니다.",
    },
    {
      title: "저당 단백질 음료 가이드",
      href: "/guides/product-selection-comparison/low-sugar-protein-drink-guide",
      description: "RTD 음료 안에서 저당 제품을 다시 좁혀보고 싶다면 여기부터 보면 됩니다.",
    },
    {
      title: "저당 요거트 가이드",
      href: "/guides/product-selection-comparison/low-sugar-yogurt-guide",
      description: "요거트를 중심으로 저당 후보를 찾고 있다면 이쪽이 더 정확합니다.",
    },
    {
      title: "단백질 바 추천 TOP 10",
      href: "/guides/product-selection-comparison/protein-bar-top10",
      description: "바 카테고리 전체를 먼저 본 뒤, 저당 기준으로 다시 걸러보고 싶다면 이 페이지가 더 자연스럽습니다.",
    },
    {
      title: "단백질 음료 추천 TOP 10",
      href: "/guides/product-selection-comparison/protein-drink-top10",
      description: "저당 RTD 후보를 포함해 전체 음료 상위권을 먼저 보고 싶다면 음료 TOP 10으로 이어지면 됩니다.",
    },
  ],
  purchaseLinks: [
    { label: "저당 RTD 대표 후보", slug: "sellex-profit-milk-vanilla-250" },
    { label: "저당 쉐이크 대표 후보", slug: "labnosh-slimshake-double-choco-45" },
    { label: "저당 요거트 대표 후보", slug: "yopro-plain-150" },
    { label: "저당 바 대표 후보", slug: "dryou-proteinbar-pro-choco-classic" },
  ],
  faq: [
    {
      question: "저당 단백질 제품이면 다이어트용으로 무조건 괜찮나요?",
      answer:
        "그렇지는 않습니다. 당류가 낮아도 칼로리와 지방이 높으면 다이어트 루틴에는 덜 맞을 수 있습니다. 당류와 칼로리를 같이 봐야 합니다.",
    },
    {
      question: "가장 저당 제품이 많은 카테고리는 무엇인가요?",
      answer:
        "대체로 RTD 음료와 일부 쉐이크가 가장 찾기 쉽습니다. 요거트와 바는 토핑과 코팅에 따라 편차가 더 큰 편입니다.",
    },
    {
      question: "요거트도 저당 제품으로 보기 괜찮나요?",
      answer:
        "가능합니다. 다만 플레인과 토핑형 차이가 커서 제품별 성분표를 꼭 봐야 합니다. 요거트는 이름보다 실제 수치가 더 중요합니다.",
    },
    {
      question: "처음 저당 제품을 시작할 때 가장 무난한 카테고리는 무엇인가요?",
      answer:
        "진입 장벽이 낮은 건 RTD 음료나 플레인 요거트입니다. 식사대용 체감까지 원하면 저당 쉐이크로 넘어가는 순서가 가장 안정적입니다.",
    },
  ],
};

config.jsonLd = [articleJsonLd(config), faqJsonLd(config)];

export const metadata = buildCategoryGuideMetadata(config);

export default function LowSugarProteinProductsGuidePage() {
  return <CategoryGuidePage config={config} />;
}
