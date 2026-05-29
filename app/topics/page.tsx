import Link from "next/link";
import CommercialAdSection from "../components/CommercialAdSection";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { getAllSearchTopics } from "../data/searchTopics";

function getFeaturedTopics() {
  const topics = getAllSearchTopics();
  const featuredSlugs = [
    "protein-drink-recommend",
    "low-sugar-protein-drink",
    "diet-protein-drink",
    "high-protein-bar",
    "meal-replacement-protein-shake",
    "high-protein-greek-yogurt",
  ];

  return featuredSlugs
    .map((slug) => topics.find((topic) => topic.slug === slug))
    .filter((topic): topic is (typeof topics)[number] => Boolean(topic));
}

const metadataTitle = "단백질 검색 주제 모음 | 추천·저당·다이어트·식사대용 바로 찾기";
const metadataDescription =
  "단백질 음료 추천, 저당, 다이어트, 식사대용, 고단백 바, 그릭요거트처럼 검색 수요가 큰 주제를 한곳에 모았습니다. 비교 가이드와 제품 페이지로 바로 이동할 수 있습니다.";

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
        "추천, 저당, 다이어트, 식사대용, 고단백 바, 고단백 그릭요거트처럼 단백질 제품 검색 수요가 큰 주제를 모아둔 허브입니다.",
      url: "https://proteinlab.kr/topics",
      inLanguage: "ko-KR",
      mainEntity: {
        "@type": "ItemList",
        itemListElement: featuredTopics.map((topic, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: `https://proteinlab.kr/topics/${topic.slug}`,
          name: topic.title,
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
            다이어트, 저당, 식사대용, 고단백 바·요거트 같은 의도별로 바로 이동할 수 있습니다.
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
