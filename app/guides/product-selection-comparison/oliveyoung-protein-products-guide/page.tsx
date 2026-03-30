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
  slug: "oliveyoung-protein-products-guide",
  title: "올리브영 단백질 추천 | 처음 사기 좋은 쉐이크·바·요거트 정리",
  description:
    "올리브영에서 접근하기 쉬운 단백질 제품을 찾는 사람을 위해 쉐이크 중심으로 바와 요거트 후보까지 함께 정리합니다. 플라이밀, 단백하니 같은 쉐이크 브랜드부터 단품 테스트 기준으로 빠르게 고를 수 있게 채널 중심으로 비교했습니다.",
  keywords: [
    "올리브영 단백질 제품",
    "올리브영 프로틴 추천",
    "올리브영 단백질 쉐이크",
    "올리브영 단백질 바",
    "올리브영에서 살 수 있는 단백질",
  ],
  badge: "올리브영 허브",
  readingTime: "6분 읽기",
  updatedAt: "2026-03-29",
  methodologyNote: "ProteinLab DB 기준 올리브영 채널 접근성이 확인된 제품과 실구매 시나리오 정리",
  intro:
    "올리브영 단백질 추천을 찾는 사람은 대체로 처음 한두 개를 테스트해 보려는 경우가 많습니다. 그래서 지금은 쉐이크부터 보는 게 가장 빠릅니다. 단품 테스트가 쉽고 선택지도 가장 넓기 때문입니다. 특히 플라이밀, 단백하니처럼 쉐이크 브랜드를 먼저 보고 들어가면 후보를 훨씬 빨리 좁힐 수 있습니다. 바와 요거트는 보조 후보로 함께 볼 수 있지만, 메인 비교는 쉐이크 중심으로 들어가는 쪽이 훨씬 효율적입니다. 이 페이지는 그 현실을 기준으로 가장 실용적인 시작점을 정리합니다.",
  summary: [
    "올리브영에서는 지금도 쉐이크부터 보는 편이 가장 효율적이고 입문자, 다이어트, 아침 대용 수요와 가장 잘 맞습니다.",
    "바와 요거트는 같이 볼 수 있지만 선택지 폭이 좁아서 보조 후보로 두는 쪽이 더 현실적입니다.",
    "처음엔 올리브영에서 단품 테스트, 정착 후엔 온라인 박스 구매로 넘어가는 흐름이 가장 안정적입니다.",
  ],
  comparisonTitle: "올리브영 기준 카테고리 비교",
  comparisonColumns: ["쉐이크", "단백질 바", "요거트", "RTD 음료"],
  comparisonRows: [
    { label: "채널 적합도", values: ["가장 높음", "중간", "중간 이하", "낮음"] },
    { label: "입문 난이도", values: ["낮음", "중간", "낮음", "중간"] },
    { label: "맛 테스트 용이성", values: ["높음", "높음", "중간", "낮음"] },
    { label: "추천 상황", values: ["다이어트, 아침 대용", "간식, 이동 중", "가벼운 아침", "당일 보충"] },
    { label: "주의 포인트", values: ["맛·칼로리 편차", "당류·코팅 확인", "실매장 편차", "채널 자체 선택지 적음"] },
    { label: "대표 후보", values: ["랩노쉬, 프롬잇", "프로틴 바 계열", "플레인 계열", "편의점형이 더 많음"] },
  ],
  sections: [
    {
      title: "어떤 카테고리부터 봐야 하나",
      items: [
        {
          title: "처음이라면 쉐이크부터 보는 게 가장 안정적이다",
          body: "올리브영에서 실제로 체감 선택지가 가장 넓고, 맛 테스트와 입문 난이도도 낮은 편입니다. 다이어트와 아침 대용 수요와도 잘 맞습니다.",
        },
        {
          title: "간식처럼 간단히 끝내고 싶다면 바가 더 맞다",
          body: "씹는 만족감이 있고 이동 중에도 먹기 쉽습니다. 다만 올리브영 채널에서 바는 제품별 당류 편차가 커서 성분 확인이 더 중요합니다.",
        },
        {
          title: "요거트는 채널 특성상 보조 후보로 보는 편이 현실적이다",
          body: "올리브영에서 단백질 요거트는 폭이 넓지 않아 메인 선택지보다 가벼운 보조 옵션으로 보는 게 맞습니다.",
        },
        {
          title: "RTD 음료는 올리브영보다 다른 채널이 강하다",
          body: "RTD는 편의점이나 온라인 채널이 더 강합니다. 올리브영 기준 허브에서는 쉐이크를 우선 보는 쪽이 훨씬 효율적입니다.",
        },
      ],
    },
    {
      title: "올리브영 채널에서 가장 자주 하는 실수",
      items: [
        {
          title: "올리브영이면 모든 카테고리 선택지가 많을 거라고 생각하기",
          body: "실제로는 쉐이크 쪽이 압도적으로 강하고, 바와 요거트는 상대적으로 제한적입니다. 채널 특성을 먼저 이해하는 게 중요합니다.",
        },
        {
          title: "세일가만 보고 바로 박스로 넘어가기",
          body: "올리브영은 단품 테스트에 강점이 있습니다. 처음부터 대량 구매로 가기보다 맛과 포만감이 맞는지 확인한 뒤 정착하는 편이 안전합니다.",
        },
        {
          title: "올리브영 입점 여부와 실매장 재고를 같은 것으로 보기",
          body: "온라인 노출이 있어도 실제 매장별 재고는 다를 수 있습니다. 급하게 필요하면 재고보다 대체 가능한 카테고리를 먼저 정하는 편이 좋습니다.",
        },
        {
          title: "쉐이크와 바를 같은 기준으로 고르기",
          body: "쉐이크는 아침 대용과 다이어트 루틴, 바는 간식과 이동성 쪽이 강합니다. 카테고리 역할이 다르기 때문에 비교 기준도 달라야 합니다.",
        },
      ],
    },
    {
      title: "상황별 바로가기",
      items: [
        {
          title: "처음 단백질 제품을 사보는 입문자다",
          body: "올리브영에서는 쉐이크부터 보는 게 가장 쉽습니다. 맛과 포만감 기준으로 후보를 좁히기 편합니다.",
        },
        {
          title: "다이어트용으로 바로 고르고 싶다",
          body: "쉐이크와 저당 바를 먼저 비교하는 편이 좋습니다. 요거트는 보조 후보로 두는 쪽이 더 현실적입니다.",
        },
        {
          title: "오늘 당장 하나 사서 테스트하고 싶다",
          body: "단품 접근성이 좋은 쉐이크가 가장 안정적입니다. 한 번 먹어보고 루틴화할지 판단하기 좋습니다.",
        },
        {
          title: "아침 대용까지 생각하고 있다",
          body: "쉐이크가 가장 잘 맞고, 요거트는 가볍게 시작하는 보조 옵션으로 볼 수 있습니다.",
        },
      ],
    },
    {
      title: "실제 선택 순서",
      items: [
        {
          title: "1단계: 올리브영에서 왜 사려는지 먼저 정하기",
          body: "당장 하나 테스트하려는 건지, 오프라인 픽업이 필요한 건지, 세일가를 보는 건지에 따라 기준이 달라집니다.",
        },
        {
          title: "2단계: 쉐이크부터 볼지 바까지 볼지 나누기",
          body: "아침 대용이나 다이어트면 쉐이크, 이동 중 간식이면 바로 분기하면 후보가 빠르게 줄어듭니다.",
        },
        {
          title: "3단계: 맛과 포만감, 당류를 같이 확인하기",
          body: "올리브영 유입은 입문자가 많아서 맛과 지속성이 특히 중요합니다. 성분표와 함께 실제 먹기 쉬운지까지 봐야 합니다.",
        },
        {
          title: "4단계: 정착 후 박스 구매 채널로 넘어갈지 판단하기",
          body: "올리브영은 테스트 시작점으로 강하고, 정착 후엔 온라인 박스 구매가 더 나은 경우가 많습니다. 채널 역할을 분리해서 보는 편이 좋습니다.",
        },
      ],
    },
  ],
  relatedGuides: [
    {
      title: "플라이밀 단백질 쉐이크 추천",
      href: "/guides/product-selection-comparison/flymill-protein-shake",
      description: "올리브영에서 플라이밀부터 볼지 고민된다면 브랜드 기준으로 먼저 정리한 이 페이지가 가장 빠릅니다.",
    },
    {
      title: "단백하니 단백질 쉐이크 추천",
      href: "/guides/product-selection-comparison/danbaekhani-protein-shake",
      description: "단백하니의 시그니처, 초코, 말차 차이를 먼저 보고 싶다면 이 브랜드 가이드가 더 직접적입니다.",
    },
    {
      title: "올리브영 단백질 쉐이크 추천",
      href: "/guides/product-selection-comparison/oliveyoung-protein-shake",
      description: "올리브영 쉐이크만 따로 깊게 보고 싶다면 이 페이지가 가장 가깝습니다.",
    },
    {
      title: "여성을 위한 단백질 쉐이크",
      href: "/guides/product-selection-comparison/protein-shake-for-women",
      description: "다이어트, 아침 대용, 체형 유지 관점까지 같이 보고 싶다면 이쪽이 더 맞습니다.",
    },
    {
      title: "단백질 바 추천 TOP 10",
      href: "/guides/product-selection-comparison/protein-bar-top10",
      description: "올리브영에서 바까지 같이 볼지 고민된다면 전체 바 후보는 여기서 확인할 수 있습니다.",
    },
  ],
  purchaseLinks: [
    { label: "올리브영 쉐이크 대표 후보", slug: "labnosh-slimshake-double-choco-45" },
    { label: "올리브영 여성 타깃 후보", slug: "allthebetter-protein-balance-shake-grain-40" },
    { label: "올리브영 신규 브랜드 후보", slug: "fromit-proteinshake-choco-45" },
    { label: "올리브영 입문용 쉐이크 후보", slug: "labnosh-protein-drink-perfect-choco-350" },
  ],
  faq: [
    {
      question: "올리브영에서 단백질 제품을 사려면 어떤 카테고리부터 보면 되나요?",
      answer:
        "현재 기준으로는 쉐이크부터 보는 게 가장 효율적입니다. 선택지가 넓고 입문자, 다이어트, 아침 대용 수요와도 잘 맞습니다.",
    },
    {
      question: "올리브영에서는 단백질 바나 요거트보다 쉐이크가 더 강한가요?",
      answer:
        "네. 현재 채널 특성상 쉐이크가 가장 강한 편입니다. 바와 요거트는 보조 후보로 보는 쪽이 더 현실적입니다.",
    },
    {
      question: "올리브영에서 맛만 테스트하고 나중에 다른 채널로 사도 되나요?",
      answer:
        "그 흐름이 가장 실용적입니다. 올리브영은 단품 테스트에 강하고, 정착 후에는 박스 구매 채널이 더 유리한 경우가 많습니다.",
    },
    {
      question: "실매장에서 바로 살 수 있는 제품만 이 페이지에서 다루나요?",
      answer:
        "올리브영 채널 접근 기준으로 정리한 페이지입니다. 실제 매장별 재고는 다를 수 있으므로 오프라인 재고 보장 페이지로 보기는 어렵습니다.",
    },
  ],
};

config.jsonLd = [articleJsonLd(config), faqJsonLd(config)];

export const metadata = buildCategoryGuideMetadata(config);

export default function OliveyoungProteinProductsGuidePage() {
  return <CategoryGuidePage config={config} />;
}
