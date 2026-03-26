import Link from "next/link";
import { notFound } from "next/navigation";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import RelatedLinkCards from "../../components/RelatedLinkCards";
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

  return {
    title: `${topic.title} | 조건별 단백질 비교 허브`,
    description: `${topic.description} 실제 비교 페이지와 추천 가이드로 바로 이어질 수 있게 정리했습니다.`,
    alternates: {
      canonical: `https://proteinlab.kr/topics/${topic.slug}`,
    },
    robots: { index: true, follow: true },
    openGraph: {
      title: `${topic.title} | 조건별 단백질 비교 허브`,
      description: `${topic.description} 실제 비교 페이지와 추천 가이드로 바로 이어질 수 있게 정리했습니다.`,
    },
    twitter: {
      card: "summary_large_image",
      title: `${topic.title} | 조건별 단백질 비교 허브`,
      description: `${topic.description} 실제 비교 페이지와 추천 가이드로 바로 이어질 수 있게 정리했습니다.`,
    },
  };
}

export default async function TopicLandingPage({ params }: PageProps) {
  const { slug } = await params;
  const topic = getSearchTopicBySlug(slug);

  if (!topic) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: topic.title,
    description: topic.description,
    url: `https://proteinlab.kr/topics/${topic.slug}`,
  };

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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
            {topic.description} 조건을 먼저 좁힌 뒤, 실제 비교 페이지와 추천 가이드로 바로 넘어갈 수 있게 정리했습니다.
          </p>
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
              <h2 className="text-base font-semibold text-[var(--foreground)]">
                바로 비교하러 가기
              </h2>
              <p className="mt-1 text-sm leading-6 text-[var(--foreground-muted)]">
                조건 설명만 보고 끝나지 않도록, 가장 가까운 실제 비교 페이지로 바로 연결합니다.
              </p>
            </div>
            <Link
              href={topic.primaryCta.href}
              className="inline-flex items-center justify-center rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              {topic.primaryCta.title}
            </Link>
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
