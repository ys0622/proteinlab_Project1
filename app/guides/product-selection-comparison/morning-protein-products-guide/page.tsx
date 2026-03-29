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
  slug: "morning-protein-products-guide",
  title: "아침 대용 단백질 제품 추천 | 음료·쉐이크·요거트·바 비교",
  description:
    "바쁜 아침에 먹기 좋은 단백질 제품을 음료, 쉐이크, 요거트, 바 기준으로 비교합니다. 포만감, 칼로리, 당류, 휴대성까지 한 번에 정리했습니다.",
  keywords: [
    "아침 대용 단백질",
    "아침 단백질 추천",
    "아침 식사 대용 단백질",
    "단백질 음료 아침",
    "단백질 쉐이크 아침",
  ],
  badge: "아침 대용 허브",
  readingTime: "6분 읽기",
  updatedAt: "2026-03-29",
  methodologyNote: "ProteinLab DB 기준 카테고리별 대표 제품과 아침 활용 시나리오 비교",
  intro:
    "아침 대용을 찾는다면 먼저 카테고리부터 정하는 게 가장 빠릅니다. 출근 전 3분 안에 끝내야 하면 RTD 음료, 점심 전까지 버텨야 하면 쉐이크, 가볍게 시작하려면 요거트, 이동 중 한 손으로 끝내려면 바가 더 잘 맞습니다. 이 페이지는 제품 하나를 바로 찍기보다 아침 루틴에 맞는 시작 카테고리를 먼저 정리합니다.",
  summary: [
    "출근 전 3분이면 RTD 음료, 점심 전까지 버텨야 하면 쉐이크, 가볍게 시작하려면 요거트, 이동 중이면 바부터 보면 됩니다.",
    "아침 대용은 단백질 g보다 포만감과 보관 편의성이 더 중요합니다. 숫자만 보고 고르면 루틴이 오래가기 어렵습니다.",
    "처음 시작하는 사람은 요거트나 맛있는 쉐이크처럼 진입 장벽이 낮은 후보부터 보는 편이 안정적입니다.",
  ],
  comparisonTitle: "아침 대용 카테고리 한눈에 비교",
  comparisonColumns: ["RTD 음료", "파우치 쉐이크", "단백질 요거트", "단백질 바"],
  comparisonRows: [
    { label: "포만감", values: ["중", "상", "중상", "중"] },
    { label: "준비 시간", values: ["최상", "상", "상", "최상"] },
    { label: "휴대성", values: ["상", "중", "중", "최상"] },
    { label: "냉장 필요", values: ["보통 차갑게 마심", "상온 보관 가능 제품 많음", "대체로 필요", "불필요"] },
    { label: "대표 용도", values: ["빠른 한 병 대체", "식사대용", "가벼운 아침", "이동 중 간식형"] },
    { label: "대표 제품", values: ["셀렉스 프로핏", "랩노쉬 슬림쉐이크", "요프로 플레인", "닥터유 프로틴바"] },
  ],
  sections: [
    {
      title: "어떤 카테고리부터 봐야 하나",
      items: [
        {
          title: "출근 준비 3분 안에 끝내고 싶다",
          body: "RTD 음료가 가장 단순합니다. 냉장고에서 꺼내 바로 마시면 끝이라 아침 루틴에 추가하기 쉽고, 설거지나 섞는 과정이 없습니다.",
        },
        {
          title: "점심 전까지 배가 안 고팠으면 좋겠다",
          body: "파우치 쉐이크가 유리합니다. 식이섬유와 칼로리 구성이 들어간 제품이 많아서 아침 대용 체감은 음료보다 안정적입니다.",
        },
        {
          title: "아침을 너무 무겁게 먹고 싶진 않다",
          body: "단백질 요거트가 가장 무난합니다. 부담이 적고 단맛 적응도 쉬워서 입문용으로 좋습니다. 다만 한 끼 대체로는 포만감이 부족할 수 있습니다.",
        },
        {
          title: "이동 중 한 손으로 끝내고 싶다",
          body: "단백질 바가 가장 편합니다. 다만 수분이 없어서 식사 대용 느낌은 약하고, 당류와 칼로리 편차가 커서 성분표를 더 꼼꼼히 봐야 합니다.",
        },
      ],
    },
    {
      title: "아침 대용에서 가장 자주 하는 실수",
      items: [
        {
          title: "단백질 g만 보고 고르기",
          body: "아침 대용은 단백질 총량만큼이나 포만감과 소화 부담이 중요합니다. 20g이어도 허기가 빨리 오면 루틴이 끊기기 쉽습니다.",
        },
        {
          title: "냉장 보관 여부를 안 보기",
          body: "요거트는 맛과 진입장벽은 좋지만 회사나 이동 환경에 따라 보관이 애매할 수 있습니다. 이런 경우에는 바나 상온형 쉐이크가 더 실용적입니다.",
        },
        {
          title: "박스로 먼저 사기",
          body: "아침 루틴은 맛 적응이 중요합니다. 처음엔 요거트나 단품 쉐이크처럼 실패 비용이 낮은 후보로 시작하는 편이 안전합니다.",
        },
        {
          title: "다이어트용과 아침 대용을 같은 기준으로 보기",
          body: "다이어트용은 저칼로리가 우선이지만, 아침 대용은 포만감과 지속성이 더 중요합니다. 같은 제품이라도 아침 대용으로는 체감이 달라집니다.",
        },
      ],
    },
    {
      title: "상황별 바로가기",
      items: [
        {
          title: "아침부터 가볍게 마시고 싶다면",
          body: "RTD 음료나 요거트 쪽이 맞습니다. 특히 저당 RTD는 부담이 적고, 요거트는 입문자에게 거부감이 적습니다.",
        },
        {
          title: "식사처럼 든든해야 한다면",
          body: "쉐이크를 먼저 보세요. 쉐이크는 포만감과 칼로리 구성이 아침 대용 프레임에 가장 잘 맞습니다.",
        },
        {
          title: "출근길, 회의 전, 운전 중이라면",
          body: "바가 가장 현실적입니다. 다만 바는 제품 간 당류 차이가 커서 다이어트 목적이면 저당 라인을 먼저 확인하는 편이 좋습니다.",
        },
        {
          title: "입문자라면",
          body: "요거트 또는 맛있는 쉐이크부터 시작하는 편이 좋습니다. 아침 루틴은 숫자보다도 거부감 없이 계속 먹을 수 있는지가 더 중요합니다.",
        },
      ],
    },
    {
      title: "실제 선택 순서",
      items: [
        {
          title: "1단계: 냉장 보관 가능 여부부터 정하기",
          body: "회사 냉장고나 집 환경이 애매하면 요거트는 바로 제외됩니다. 이 한 가지 기준만으로도 후보가 크게 줄어듭니다.",
        },
        {
          title: "2단계: 포만감이 필요한지 확인하기",
          body: "점심 전까지 버텨야 하면 쉐이크, 아침을 거르지 않는 수준만 원하면 RTD나 요거트가 더 맞습니다.",
        },
        {
          title: "3단계: 이동 중 섭취 여부 보기",
          body: "차 안, 지하철, 사무실 자리 이동이 많으면 바와 RTD가 앞서고, 집에서 천천히 먹을 수 있으면 쉐이크 선택지가 넓어집니다.",
        },
        {
          title: "4단계: 마지막으로 맛과 가격 비교",
          body: "아침은 습관이 핵심이라 결국은 맛과 재구매 부담이 중요합니다. 카테고리를 정한 뒤에 브랜드 비교로 들어가는 흐름이 가장 효율적입니다.",
        },
      ],
    },
  ],
  relatedGuides: [
    {
      title: "아침 식사 대용 단백질 쉐이크",
      href: "/guides/product-selection-comparison/morning-protein-shake",
      description: "아침 쉐이크만 따로 좁혀서 보고 싶다면 이 페이지가 가장 빠릅니다.",
    },
    {
      title: "단백질 요거트 추천 TOP 5",
      href: "/guides/product-selection-comparison/protein-yogurt-top5",
      description: "가볍고 부담 적은 아침 후보를 먼저 보고 싶다면 요거트 쪽이 맞습니다.",
    },
    {
      title: "단백질 바 추천 TOP 10",
      href: "/guides/product-selection-comparison/protein-bar-top10",
      description: "출근길 이동 중 한 손으로 끝낼 후보를 보고 싶다면 바부터 보세요.",
    },
    {
      title: "단백질 음료 입문 가이드",
      href: "/guides/product-selection-comparison/protein-drink-beginners-guide",
      description: "아침에 마실 RTD 음료를 입문 기준으로 고르고 싶다면 여기부터 보면 됩니다.",
    },
  ],
  purchaseLinks: [
    { label: "아침용 RTD 대표 제품", slug: "sellex-profit-milk-vanilla-250" },
    { label: "아침용 쉐이크 대표 제품", slug: "labnosh-slimshake-double-choco-45" },
    { label: "아침용 요거트 대표 제품", slug: "yopro-plain-150" },
    { label: "아침용 바 대표 제품", slug: "dryou-proteinbar-pro-choco-classic" },
  ],
  faq: [
    {
      question: "아침 대용으로는 음료, 쉐이크, 요거트, 바 중 뭐가 가장 낫나요?",
      answer:
        "정답은 상황에 따라 다릅니다. 가장 빠른 건 RTD 음료, 가장 든든한 건 쉐이크, 가장 가벼운 건 요거트, 가장 휴대성이 좋은 건 바입니다.",
    },
    {
      question: "다이어트 중이면 무조건 쉐이크가 더 좋은가요?",
      answer:
        "꼭 그렇진 않습니다. 포만감은 쉐이크가 좋지만, 출근길처럼 실사용 환경이 안 맞으면 오히려 루틴이 깨집니다. 다이어트는 지속성이 더 중요합니다.",
    },
    {
      question: "요거트만으로 아침 대용이 충분한가요?",
      answer:
        "가볍게 시작하는 용도로는 괜찮지만, 점심 전 허기까지 잡으려면 부족할 수 있습니다. 이 경우에는 쉐이크나 RTD 음료가 더 맞습니다.",
    },
    {
      question: "단백질 바를 아침 식사처럼 먹어도 되나요?",
      answer:
        "가능은 하지만 식사 대용 체감은 약한 편입니다. 이동 중이나 회의 전처럼 시간이 없을 때 보조 카드로 보는 편이 더 정확합니다.",
    },
  ],
};

config.jsonLd = [articleJsonLd(config), faqJsonLd(config)];

export const metadata = buildCategoryGuideMetadata(config);

export default function MorningProteinProductsGuidePage() {
  return <CategoryGuidePage config={config} />;
}
