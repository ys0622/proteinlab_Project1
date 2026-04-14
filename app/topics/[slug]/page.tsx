import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import RelatedLinkCards from "../../components/RelatedLinkCards";
import TrackedLink from "../../components/TrackedLink";
import { getAllSearchTopics, getSearchTopicBySlug } from "../../data/searchTopics";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllSearchTopics().map((topic) => ({ slug: topic.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const topic = getSearchTopicBySlug(slug);

  if (!topic) {
    return { title: "검색 주제를 찾을 수 없음 | ProteinLab" };
  }

  const canonical = `https://proteinlab.kr/topics/${topic.slug}`;
  const title = `${topic.title} — 비교 가이드 모음`;
  const description = `${topic.description} 관련 비교 페이지와 추천 가이드로 바로 이어서 확인할 수 있습니다.`;
  return {
    title,
    description,
    alternates: { canonical },
    robots: { index: true, follow: true },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "article",
      locale: "ko_KR",
      siteName: "ProteinLab",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

function getTopicQuickLinks(slug: string) {
  if (
    [
      "protein-drink-recommend",
      "low-sugar-protein-drink",
      "diet-protein-drink",
      "high-protein-drink-20g",
      "protein-water",
      "lactose-free-protein-drink",
      "vegan-protein-drink",
    ].includes(slug)
  ) {
    return [
      { href: "/", title: "조건 맞는 단백질 음료 보기" },
      { href: "/guides/product-selection-comparison", title: "음료 비교 가이드 읽기" },
      { href: "/recommend", title: "내 기준으로 추천받기" },
    ];
  }

  if (
    ["meal-replacement-protein-shake", "low-sugar-protein-shake", "post-workout-protein-shake"].includes(
      slug,
    )
  ) {
    return [
      { href: "/shake", title: "쉐이크 전체 보기" },
      { href: "/guides/product-selection-comparison/protein-shake-top7", title: "대표 쉐이크 비교하기" },
      { href: "/recommend", title: "내 기준으로 추천받기" },
    ];
  }

  if (
    ["high-protein-greek-yogurt", "low-sugar-yogurt", "drinking-yogurt-protein", "bulk-yogurt-protein"].includes(
      slug,
    )
  ) {
    return [
      { href: "/yogurt", title: "요거트 전체 보기" },
      { href: "/guides/product-selection-comparison/protein-yogurt-top5", title: "대표 요거트 비교하기" },
      { href: "/recommend", title: "내 기준으로 추천받기" },
    ];
  }

  if (["high-protein-bar", "low-sugar-protein-bar", "low-calorie-protein-bar"].includes(slug)) {
    return [
      { href: "/bars", title: "단백질 바 전체 보기" },
      { href: "/guides/product-selection-comparison/protein-bar-top10", title: "대표 바 비교하기" },
      { href: "/recommend", title: "내 기준으로 추천받기" },
    ];
  }

  if (slug === "convenience-store-protein") {
    return [
      { href: "/products", title: "전체 제품 허브 보기" },
      { href: "/curation/convenience", title: "편의점용 제품만 보기" },
      { href: "/recommend", title: "내 기준으로 추천받기" },
    ];
  }

  if (slug === "running-protein-products") {
    return [
      { href: "/curation/running", title: "러닝용 제품만 보기" },
      { href: "/guides/fitness-lifestyle", title: "러닝 가이드 읽기" },
      { href: "/recommend", title: "내 기준으로 추천받기" },
    ];
  }

  return [
    { href: "/products", title: "전체 제품 허브 보기" },
    { href: "/ranking", title: "상위 제품 먼저 보기" },
    { href: "/recommend", title: "내 기준으로 추천받기" },
  ];
}

export default async function TopicLandingPage({ params }: PageProps) {
  const { slug } = await params;
  const topic = getSearchTopicBySlug(slug);

  if (!topic) notFound();

  const quickLinks = getTopicQuickLinks(topic.slug);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "ProteinLab", item: "https://proteinlab.kr/" },
        { "@type": "ListItem", position: 2, name: "검색 주제", item: "https://proteinlab.kr/topics" },
        { "@type": "ListItem", position: 3, name: topic.title, item: `https://proteinlab.kr/topics/${topic.slug}` },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: topic.title,
      description: topic.description,
      url: `https://proteinlab.kr/topics/${topic.slug}`,
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      {jsonLd.map((item, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }} />
      ))}
      <Header />

      <section
        className="w-full border-b border-t bg-[var(--hero-bg)]"
        style={{ borderColor: "var(--hero-border)" }}
      >
        <div className="mx-auto max-w-[1200px] px-4 py-6 md:px-6 md:py-7">
          <nav className="mb-3 text-sm text-[var(--foreground-muted)]">
            <Link href="/topics" className="hover:text-[var(--accent)]">
              검색 주제
            </Link>
            <span className="mx-2">/</span>
            <span className="text-[var(--foreground)]">{topic.title}</span>
          </nav>

          <h1 className="text-2xl font-bold leading-[1.25] text-[var(--foreground)] md:text-3xl">
            {topic.title}
          </h1>
          <p className="mt-2 max-w-[760px] text-sm leading-6 text-[var(--foreground-muted)] md:text-[15px]">
            {topic.description} 조건을 먼저 좁힌 뒤, 실제 비교 페이지와 추천 가이드로 바로 넘어갈 수
            있게 정리했습니다.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <TrackedLink
              href={topic.primaryCta.href}
              trackingLabel={`${topic.title} 비교 시작하기`}
              trackingSection="topic_hero_cta"
              trackingPageType="topic"
              className="inline-flex min-h-11 min-w-[132px] items-center justify-center rounded-full bg-[var(--accent)] px-4 py-2.5 text-xs font-semibold text-white shadow-[0_10px_24px_rgba(47,111,74,0.18)] transition-all hover:-translate-y-0.5 hover:opacity-95 md:text-sm"
            >
              비교 시작하기
            </TrackedLink>
            <TrackedLink
              href="/recommend"
              trackingLabel={`${topic.title} 맞춤 추천 받기`}
              trackingSection="topic_hero_cta"
              trackingPageType="topic"
              className="inline-flex min-h-9 items-center rounded-full border border-[#d7e4d9] bg-white px-3.5 py-2 text-xs font-semibold text-[#24543d] transition-colors hover:border-[#24543d] hover:bg-[#f3faf5] md:text-sm"
            >
              맞춤 추천
            </TrackedLink>
            <TrackedLink
              href="/products"
              trackingLabel="전체 제품 보기"
              trackingSection="topic_hero_cta"
              trackingPageType="topic"
              className="inline-flex min-h-9 items-center rounded-full border border-[#d7e4d9] bg-white px-3.5 py-2 text-xs font-semibold text-[#24543d] transition-colors hover:border-[#24543d] hover:bg-[#f3faf5] md:text-sm"
            >
              전체 제품 보기
            </TrackedLink>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 pb-12 pt-6 md:px-6">
        <section className="rounded-2xl border border-[#e8e6e3] bg-[#FFFDF8] p-5">
          <h2 className="text-base font-semibold text-[var(--foreground)]">이 페이지에서 보는 기준</h2>
          <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{topic.intro}</p>
          <ul className="mt-4 space-y-2">
            {topic.bullets.map((bullet) => (
              <li
                key={bullet}
                className="flex items-start gap-2 text-sm leading-6 text-[var(--foreground-muted)]"
              >
                <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-8 rounded-2xl border border-[#d9e7dc] bg-[#f6fbf7] p-5">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-base font-semibold text-[var(--foreground)]">바로 비교하러 가기</h2>
              <p className="mt-1 text-sm leading-6 text-[var(--foreground-muted)]">
                조건 설명만 보고 끝나지 않도록, 가장 가까운 실제 비교 페이지로 바로 연결합니다.
              </p>
            </div>
            <TrackedLink
              href={topic.primaryCta.href}
              trackingLabel={topic.primaryCta.title}
              trackingSection="primary_cta"
              trackingPageType="topic"
              className="inline-flex items-center justify-center rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              {topic.primaryCta.title}
            </TrackedLink>
          </div>
        </section>

        <section className="mt-4">
          <div className="grid gap-3 md:grid-cols-3">
            {quickLinks.map((item) => (
              <TrackedLink
                key={item.href}
                href={item.href}
                trackingLabel={item.title}
                trackingSection="quick_links"
                trackingPageType="topic"
                className="rounded-2xl border border-[#e8e6e3] bg-[#FFFDF8] px-4 py-4 transition-colors hover:bg-[var(--accent-light)]"
              >
                <p className="text-sm font-semibold text-[var(--foreground)]">{item.title}</p>
                <p className="mt-2 text-xs leading-5 text-[var(--foreground-muted)]">
                  조건을 더 좁히거나, 바로 제품 목록과 비교 흐름으로 이어집니다.
                </p>
              </TrackedLink>
            ))}
          </div>
        </section>

        <RelatedLinkCards
          title="같이 보면 좋은 비교 허브"
          description="검색 의도가 비슷한 가이드와 허브 페이지를 묶어서 다음 클릭이 바로 이어지도록 정리했습니다."
          links={topic.relatedLinks}
          sectionId={`topic-${topic.slug}-related`}
        />
      </main>

      <Footer />
    </div>
  );
}
