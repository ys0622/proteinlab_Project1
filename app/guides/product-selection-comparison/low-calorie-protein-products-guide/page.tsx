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
  slug: "low-calorie-protein-products-guide",
  title: "저칼로리 단백질 제품 추천 | 음료·쉐이크·요거트·바 한눈에 비교",
  description:
    "칼로리 낮은 단백질 제품을 찾는 사람을 위해 음료, 쉐이크, 요거트, 바를 한 번에 비교합니다. 다이어트, 아침 대용, 간식 목적에 맞게 바로 고를 수 있게 정리했습니다.",
  keywords: [
    "저칼로리 단백질",
    "칼로리 낮은 단백질 제품",
    "다이어트 단백질 추천",
    "저칼로리 단백질 음료",
    "저칼로리 단백질 쉐이크",
  ],
  badge: "저칼로리 허브",
  readingTime: "6분 읽기",
  updatedAt: "2026-03-29",
  methodologyNote: "ProteinLab DB 기준 카테고리별 대표 저칼로리 후보와 실사용 시나리오 비교",
  intro:
    "칼로리가 낮다고 해서 무조건 좋은 단백질 제품은 아닙니다. 한 끼를 대신할 건지, 간식처럼 가볍게 먹을 건지, 다이어트 중 배고픔을 줄이고 싶은지에 따라 맞는 카테고리가 달라집니다. 이 페이지는 숫자만 나열하는 대신 저칼로리 제품을 어떤 순서로 좁혀야 하는지부터 정리합니다.",
  summary: [
    "가장 가볍게 시작하려면 RTD 음료나 요거트, 포만감까지 챙기려면 쉐이크, 이동 중 간식이면 바가 더 잘 맞습니다.",
    "저칼로리 제품을 고를 때는 칼로리만 보지 말고 단백질, 당류, 포만감, 실제 먹는 상황을 같이 봐야 실패가 줄어듭니다.",
    "다이어트 목적이라면 한 번에 끝내는 제품보다 오래 유지할 수 있는 루틴형 제품을 고르는 쪽이 더 안정적입니다.",
  ],
  comparisonTitle: "저칼로리 기준 카테고리 비교",
  comparisonColumns: ["RTD 음료", "파우치 쉐이크", "단백질 요거트", "단백질 바"],
  comparisonRows: [
    { label: "칼로리 범위", values: ["90~140kcal", "120~200kcal", "80~150kcal", "150~220kcal"] },
    { label: "포만감", values: ["낮음~중간", "높음", "중간", "중간"] },
    { label: "당류 관리", values: ["제품 편차 큼", "낮은 제품 고르기 쉬움", "저당 제품 다양", "바별 편차 큼"] },
    { label: "섭취 속도", values: ["가장 빠름", "천천히 마시기 좋음", "가볍게 먹기 좋음", "씹는 간식형"] },
    { label: "추천 상황", values: ["운동 후, 출근길", "아침 대용, 다이어트", "가벼운 아침, 간식", "이동 중 간식"] },
    { label: "대표 후보", values: ["셀렉스 프로핏", "랩노쉬 슬림쉐이크", "요프로 플레인", "닥터유 프로틴바"] },
  ],
  sections: [
    {
      title: "어떤 카테고리부터 봐야 하나",
      items: [
        {
          title: "칼로리는 낮게, 준비는 가장 간단하게",
          body: "RTD 음료나 요거트부터 보면 됩니다. 둘 다 바로 꺼내 먹기 쉽고, 다이어트 초반에 루틴을 만들 때 부담이 적습니다.",
        },
        {
          title: "칼로리도 낮아야 하지만 포만감이 중요하다",
          body: "쉐이크가 가장 유리합니다. 식이섬유와 구성 원료 차이 덕분에 같은 칼로리라도 한 끼 대체 체감이 더 오래 가는 편입니다.",
        },
        {
          title: "밖에서 간식처럼 해결해야 한다",
          body: "바가 가장 실용적입니다. 다만 바는 저칼로리라고 해도 당류와 지방 편차가 커서 제품별 확인이 꼭 필요합니다.",
        },
        {
          title: "아침에 너무 무거운 건 싫다",
          body: "요거트나 RTD 음료가 더 무난합니다. 쉐이크보다 부담이 적고, 처음 시작하는 사람도 거부감이 덜합니다.",
        },
      ],
    },
    {
      title: "저칼로리 제품에서 가장 자주 하는 실수",
      items: [
        {
          title: "칼로리만 낮으면 다이어트용이라고 생각하기",
          body: "칼로리가 낮아도 단백질이 너무 적거나 당류가 높으면 금방 배고파집니다. 결국 간식을 더 찾게 되면 전체 섭취량이 늘어날 수 있습니다.",
        },
        {
          title: "쉐이크와 음료를 같은 기준으로 비교하기",
          body: "쉐이크는 식사대용, RTD는 빠른 보충에 더 가깝습니다. 같은 130kcal여도 포만감 체감은 꽤 다를 수 있습니다.",
        },
        {
          title: "바를 무조건 가벼운 간식으로 보기",
          body: "단백질 바는 휴대성은 좋지만 생각보다 칼로리가 높은 제품도 많습니다. 특히 초코 코팅형은 성분표 확인이 필수입니다.",
        },
        {
          title: "맛을 무시하고 숫자만 보고 고르기",
          body: "저칼로리 루틴은 오래 가야 의미가 있습니다. 맛이 너무 안 맞으면 유지가 어렵기 때문에 첫 구매는 무난한 맛부터 시작하는 편이 좋습니다.",
        },
      ],
    },
    {
      title: "상황별 바로가기",
      items: [
        {
          title: "다이어트 중 아침 대용이 필요하다",
          body: "쉐이크나 요거트 쪽이 더 잘 맞습니다. 포만감과 칼로리 균형을 함께 보는 게 핵심입니다.",
        },
        {
          title: "운동 후 가볍게 단백질만 보충하고 싶다",
          body: "RTD 음료가 가장 실용적입니다. 바로 마시기 쉽고 100~130kcal대 제품도 많아 부담이 적습니다.",
        },
        {
          title: "회사나 이동 중 간식이 필요하다",
          body: "바가 편하지만, 저당과 칼로리 기준을 먼저 확인해야 합니다. 바는 간편하지만 과식하기 쉬운 카테고리입니다.",
        },
        {
          title: "처음이라면 가장 부담 없는 후보가 좋다",
          body: "요거트나 무난한 맛 쉐이크부터 시작하는 쪽이 안정적입니다. 차갑게 먹기 쉽고 진입 장벽이 낮습니다.",
        },
      ],
    },
    {
      title: "실제 선택 순서",
      items: [
        {
          title: "1단계: 한 끼 대체인지 간식인지 먼저 정하기",
          body: "이 기준만 정해도 쉐이크와 바, RTD와 요거트가 빠르게 갈립니다. 저칼로리 제품은 목적 구분이 특히 중요합니다.",
        },
        {
          title: "2단계: 포만감 필요 여부 확인하기",
          body: "같은 저칼로리라도 오래 버텨야 하면 쉐이크, 가볍게 끝내려면 요거트나 RTD가 더 맞습니다.",
        },
        {
          title: "3단계: 당류와 단백질을 같이 보기",
          body: "저칼로리 제품은 숫자가 작아 보이기 쉬워서 당류를 놓치기 쉽습니다. 다이어트라면 단백질과 당류를 같이 체크해야 합니다.",
        },
        {
          title: "4단계: 마지막으로 맛과 구매 채널 비교",
          body: "지속성이 핵심이므로 맛, 보관 편의성, 재구매 채널까지 확인한 뒤 고르면 실패 확률이 줄어듭니다.",
        },
      ],
    },
  ],
  relatedGuides: [
    {
      title: "단백질 쉐이크 칼로리 순위",
      href: "/guides/product-selection-comparison/protein-shake-calorie-ranking",
      description: "저칼로리 쉐이크만 따로 깊게 보고 싶다면 이 페이지가 가장 가깝습니다.",
    },
    {
      title: "다이어트 단백질 바 추천",
      href: "/guides/product-selection-comparison/diet-protein-bar",
      description: "바 카테고리 안에서 저당·저칼로리 기준으로 다시 좁혀볼 수 있습니다.",
    },
    {
      title: "다이어트 단백질 요거트",
      href: "/guides/product-selection-comparison/diet-protein-yogurt",
      description: "요거트를 중심으로 저칼로리 후보를 찾고 있다면 여기부터 보면 됩니다.",
    },
    {
      title: "다이어트 단백질 쉐이크 추천",
      href: "/guides/product-selection-comparison/diet-protein-shake",
      description: "식사대용이나 다이어트 루틴형 쉐이크를 바로 비교하고 싶다면 이쪽이 더 맞습니다.",
    },
  ],
  purchaseLinks: [
    { label: "저칼로리 RTD 대표 후보", slug: "sellex-profit-milk-vanilla-250" },
    { label: "저칼로리 쉐이크 대표 후보", slug: "labnosh-slimshake-double-choco-45" },
    { label: "저칼로리 요거트 대표 후보", slug: "yopro-plain-150" },
    { label: "저칼로리 바 대표 후보", slug: "dryou-proteinbar-pro-choco-classic" },
  ],
  faq: [
    {
      question: "저칼로리 단백질 제품은 무조건 다이어트에 좋나요?",
      answer:
        "그렇지는 않습니다. 칼로리가 낮아도 단백질이 너무 적거나 당류가 높으면 포만감이 약해져서 오히려 간식을 더 찾게 될 수 있습니다.",
    },
    {
      question: "가장 칼로리가 낮은 카테고리는 무엇인가요?",
      answer:
        "대체로 RTD 음료와 요거트 쪽이 시작점이 낮습니다. 다만 한 끼 대체 체감은 쉐이크가 더 강한 경우가 많아서 목적에 따라 달라집니다.",
    },
    {
      question: "저칼로리 제품이면 바도 아침 대용으로 괜찮나요?",
      answer:
        "가능은 하지만 바는 식사대용 체감이 약한 편입니다. 아침 대용이라면 쉐이크나 요거트가 더 안정적인 선택인 경우가 많습니다.",
    },
    {
      question: "처음 시작할 때는 어떤 카테고리가 가장 무난한가요?",
      answer:
        "부담이 적고 진입 장벽이 낮은 건 요거트나 RTD 음료입니다. 식사대용까지 원하면 쉐이크로 넘어가는 순서가 가장 안정적입니다.",
    },
  ],
};

config.jsonLd = [articleJsonLd(config), faqJsonLd(config)];

export const metadata = buildCategoryGuideMetadata(config);

export default function LowCalorieProteinProductsGuidePage() {
  return <CategoryGuidePage config={config} />;
}
