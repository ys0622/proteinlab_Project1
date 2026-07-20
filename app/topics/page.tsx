import Link from "next/link";
import CommercialAdSection from "../components/CommercialAdSection";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { getAllSearchTopics } from "../data/searchTopics";

function getFeaturedTopics() {
  const topics = getAllSearchTopics();
  const featuredSlugs = [
    "newcare-all-protein",
    "protein-drink-recommend",
    "high-protein-drink-20g",
    "low-sugar-protein-drink",
    "diet-protein-drink",
    "high-protein-bar",
  ];

  return featuredSlugs
    .map((slug) => topics.find((topic) => topic.slug === slug))
    .filter((topic): topic is (typeof topics)[number] => Boolean(topic));
}

const urgentSeoLinks = [
  {
    href: "/topics/newcare-all-protein",
    title: "뉴케어 올프로틴 추천 및 비교",
    description: "41g, 25g, 워터, 식물성 라인을 먼저 나눠 보고 상세·비교 페이지로 이동합니다.",
  },
  {
    href: "/guides/product-selection-comparison/protein-drink-top10",
    title: "단백질 음료 추천 TOP 10",
    description: "테이크핏, 더단백, 뉴케어, 랩노쉬 등 대표 RTD를 성분 기준으로 좁힙니다.",
  },
  {
    href: "/guides/product-selection-comparison/high-protein-40g-comparison",
    title: "40g 이상 고단백 음료 비교",
    description: "뉴케어 41g, 테이크핏 몬스터, 닥터유 40g 같은 고단백 후보를 비교합니다.",
  },
  {
    href: "/compare/newcare-vs-danbaek-drink",
    title: "뉴케어 vs 더단백 비교",
    description: "대표 RTD 브랜드를 단백질, 당류, 칼로리 기준으로 바로 비교합니다.",
  },
];

const questionSeoLinks = [
  {
    href: "/guides/intake-strategy-health/protein-drink-diarrhea",
    title: "단백질 음료 설사",
    description: "유당, 감미료, 섭취량 때문에 생기는 소화 부담을 먼저 확인합니다.",
  },
  {
    href: "/guides/intake-strategy-health/protein-drink-weight-gain",
    title: "단백질 음료 살찌나요",
    description: "칼로리와 당류, 간식 대체 여부로 체중 영향을 판단합니다.",
  },
  {
    href: "/guides/intake-strategy-health/protein-drink-daily",
    title: "단백질 음료 매일 마셔도 되나요",
    description: "식사 보완인지 추가 섭취인지에 따라 매일 섭취 기준을 나눕니다.",
  },
  {
    href: "/guides/intake-strategy-health/protein-drink-empty-stomach",
    title: "단백질 음료 공복",
    description: "아침 공복과 운동 전 공복에 마실 때 부담을 줄이는 방법을 봅니다.",
  },
  {
    href: "/guides/intake-strategy-health/protein-drink-sugar",
    title: "단백질 음료 당류 기준",
    description: "당류 0g, 저당, 맛별 SKU 차이를 라벨 기준으로 읽습니다.",
  },
];

const metadataTitle = "단백질 검색 주제 모음 | 뉴케어·단백질 음료 추천·질문형 가이드";
const metadataDescription =
  "뉴케어 올프로틴, 단백질 음료 추천 TOP10, 설사, 살찌나요, 매일 마셔도 되나요, 공복, 당류 기준처럼 검색 수요가 큰 주제를 한곳에 모았습니다.";

export const metadata = {
  title: metadataTitle,
  description: metadataDescription,
  alternates: {
    canonical: "https://proteinlab.kr/topics",
  },
  openGraph: {
    title: metadataTitle,
    description: metadataDescription,
    url: "https://proteinlab.kr/topics",
    type: "website",
    locale: "ko_KR",
    siteName: "ProteinLab",
  },
  twitter: {
    card: "summary",
    title: metadataTitle,
    description: metadataDescription,
  },
};

export default function TopicsPage() {
  const topics = getAllSearchTopics();
  const featuredTopics = getFeaturedTopics();
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "ProteinLab", item: "https://proteinlab.kr/" },
        { "@type": "ListItem", position: 2, name: "단백질 검색 주제", item: "https://proteinlab.kr/topics" },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "단백질 검색 주제 모음",
      description:
        "뉴케어 올프로틴, 단백질 음료 추천, 저당, 다이어트, 식사대용, 고단백 바처럼 단백질 제품 검색 수요가 큰 주제를 모아둔 허브입니다.",
      url: "https://proteinlab.kr/topics",
      inLanguage: "ko-KR",
      mainEntity: {
        "@type": "ItemList",
        itemListElement: [...urgentSeoLinks, ...questionSeoLinks].map((link, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: `https://proteinlab.kr${link.href}`,
          name: link.title,
        })),
      },
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Header />

      <section
        className="w-full border-b border-t bg-[var(--hero-bg)]"
        style={{ borderColor: "var(--hero-border)" }}
      >
        <div className="mx-auto max-w-[1200px] px-4 py-6 md:px-6 md:py-7">
          <h1 className="text-2xl font-bold leading-[1.25] text-[var(--foreground)] md:text-3xl">
            단백질 검색 주제 모음
          </h1>
          <p className="mt-2 max-w-[760px] text-sm leading-6 text-[var(--foreground-muted)] md:text-[15px]">
            제품명을 아직 모르는 상태에서 먼저 많이 찾는 검색 주제를 모았습니다. 단백질 음료 추천,
            뉴케어 올프로틴, 설사, 살찌나요, 매일 섭취, 공복, 당류 기준 같은 의도별로 바로 이동할 수 있습니다.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 pb-12 pt-6 md:px-6">
        <section className="rounded-2xl border border-[#d9e7dc] bg-[#f6fbf7] p-5">
          <h2 className="text-base font-semibold text-[var(--foreground)]">이 페이지 활용법</h2>
          <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">
            제품명을 아직 모르고 조건만 정해진 상태라면 여기서 시작하는 편이 가장 빠릅니다. 단백질
            음료 추천, 다이어트, 식사대용처럼 먼저 조건을 좁힌 뒤 비교 페이지와 가이드로 들어가면
            클릭 이후 탐색도 훨씬 자연스럽습니다.
          </p>
        </section>

        <section className="mt-6 rounded-2xl border border-[#d9e7dc] bg-white p-5">
          <div className="mb-4 space-y-1">
            <h2 className="text-lg font-bold text-[var(--foreground)]">검색 노출을 먼저 밀어야 할 핵심 랜딩</h2>
            <p className="text-sm leading-6 text-[var(--foreground-muted)]">
              제품명과 추천형 검색어를 동시에 받을 수 있는 페이지입니다. 처음 방문한 사용자가 여기서
              상세·비교·구매처 확인으로 이어지도록 연결했습니다.
            </p>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {urgentSeoLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-xl border border-[var(--border)] bg-[var(--background-card)] p-4 transition-colors hover:border-[var(--accent)]/35 hover:bg-[var(--accent-light)]/40"
              >
                <p className="text-sm font-semibold text-[var(--foreground)]">{link.title}</p>
                <p className="mt-1 text-xs leading-5 text-[var(--foreground-muted)]">{link.description}</p>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-6 rounded-2xl border border-[#d9e7dc] bg-[#f6fbf7] p-5">
          <div className="mb-4 space-y-1">
            <h2 className="text-lg font-bold text-[var(--foreground)]">질문형 롱테일 가이드</h2>
            <p className="text-sm leading-6 text-[var(--foreground-muted)]">
              케어맵처럼 노출을 빠르게 넓히기 위해 제품 추천 전 단계의 실전 질문을 모았습니다.
              걱정·증상·섭취 루틴 검색어에서 들어와 제품 비교로 이어지는 구조입니다.
            </p>
          </div>
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {questionSeoLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-xl border border-[#d8e2da] bg-white p-4 transition-colors hover:border-[var(--accent)]/35 hover:bg-[var(--accent-light)]/40"
              >
                <p className="text-sm font-semibold text-[var(--foreground)]">{link.title}</p>
                <p className="mt-1 text-xs leading-5 text-[var(--foreground-muted)]">{link.description}</p>
              </Link>
            ))}
          </div>
        </section>

        <CommercialAdSection
          pageType="guide"
          className="mt-6"
          title="주제 탐색 구간 안내 광고"
          description="토픽 허브처럼 검색 의도를 모은 정보형 섹션에서만 광고를 노출합니다."
        />

        <section className="mt-6">
          <div className="mb-4 space-y-1">
            <h2 className="text-lg font-bold text-[var(--foreground)]">지금 가장 먼저 보기 좋은 주제</h2>
            <p className="text-sm leading-6 text-[var(--foreground-muted)]">
              방문자가 실제로 많이 찾는 비교 의도를 먼저 모았습니다. 검색어가 길어질수록 세부 주제가
              갈리기 때문에, 시작 지점을 먼저 정해두는 편이 유리합니다.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {featuredTopics.map((topic) => (
              <Link
                key={topic.slug}
                href={`/topics/${topic.slug}`}
                className="rounded-2xl border border-[#d9e7dc] bg-[#f6fbf7] p-5 transition-colors hover:border-[var(--accent)]/35 hover:bg-[var(--accent-light)]/40"
              >
                <p className="text-base font-semibold text-[var(--foreground)]">{topic.title}</p>
                <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{topic.description}</p>
                <p className="mt-3 text-xs font-semibold text-[var(--accent)]">{topic.primaryCta.title}</p>
              </Link>
            ))}
          </div>
        </section>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {topics.map((topic) => (
            <Link
              key={topic.slug}
              href={`/topics/${topic.slug}`}
              className="rounded-2xl border border-[var(--border)] bg-[var(--background-card)] p-5 transition-colors hover:border-[var(--accent)]/35 hover:bg-[var(--accent-light)]/40"
            >
              <p className="text-base font-semibold text-[var(--foreground)]">{topic.title}</p>
              <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{topic.description}</p>
              <p className="mt-3 text-xs font-semibold text-[var(--accent)]">비교 페이지로 바로 이동</p>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
