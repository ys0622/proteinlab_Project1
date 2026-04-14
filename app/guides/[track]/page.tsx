import { notFound } from "next/navigation";
import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import GuideVisual from "@/app/components/GuideVisual";
import { getAllSearchTopics } from "@/app/data/searchTopics";
import { getGuideTracks, type GuideTrackSlug } from "@/app/data/guidesTracks";
import { getAdminGuidesStaticRuntimeData } from "@/app/lib/adminGuidesStaticRuntime";

export const dynamic = "force-dynamic";

const clampTwoLines = {
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical" as const,
  overflow: "hidden",
};

function CuratedGuideGroup({
  title,
  description,
  accentColor,
  accentBg,
  items,
}: {
  title: string;
  description: string;
  accentColor: string;
  accentBg: string;
  items: {
    slug: string;
    title: string;
    description: string;
    href: string;
    emoji: string;
    tags: string[];
  }[];
}) {
  if (!items.length) return null;

  return (
    <section className="rounded-[28px] border border-[#d8e2da] bg-white px-5 py-5 shadow-[0_10px_24px_rgba(20,40,28,0.05)]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-[var(--foreground)]">{title}</h2>
          <p className="mt-1 text-sm leading-6 text-[var(--foreground-muted)]">{description}</p>
        </div>
        <span
          className="hidden rounded-full px-3 py-1 text-xs font-semibold md:inline-flex"
          style={{ color: accentColor, backgroundColor: accentBg }}
        >
          추천 모음
        </span>
      </div>

      <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {items.map((item) => (
          <Link
            key={item.slug}
            href={item.href}
            className="rounded-2xl border border-[#d9e4dd] bg-[#f7faf8] p-4 transition-colors hover:bg-white"
          >
            <div className="flex items-start gap-3">
              <span
                aria-hidden
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#d7e6dd] bg-white text-lg"
              >
                {item.emoji}
              </span>
              <div className="min-w-0">
                <p className="text-sm font-semibold" style={{ color: accentColor }}>
                  {item.title}
                </p>
                <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]" style={clampTwoLines}>
                  {item.description}
                </p>
              </div>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {item.tags.slice(0, 2).map((tag) => (
                <span
                  key={`${item.slug}-${tag}`}
                  className="inline-flex items-center rounded-full border border-[#d9e4dd] bg-white px-2 py-1 text-[11px] font-medium text-[#496555]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export async function generateStaticParams() {
  return getGuideTracks().map((track) => ({ track: track.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ track: string }> }) {
  const { track } = await params;
  const cms = await getAdminGuidesStaticRuntimeData();
  const section = cms.sections.find((item) => item.slug === track);

  if (!section) return {};

  if (section.slug === "product-selection-comparison") {
    return {
      title: "단백질 음료 비교·추천 가이드 | 셀렉스·하이뮨·테이크핏",
      description:
        "셀렉스, 하이뮨, 테이크핏, 뉴케어까지 단백질 음료 비교와 추천 가이드를 한 번에 모았습니다. 입문자, 다이어트, 40g 고단백 비교까지 바로 볼 수 있습니다.",
    };
  }

  if (section.slug === "intake-strategy-health") {
    return {
      title: "단백질 섭취 전략·건강 가이드 | 타이밍·체중관리·50대 단백질",
      description:
        "단백질을 언제, 얼마나, 어떤 상황에서 챙겨야 할지 정리한 섭취 전략 가이드입니다. 체중 관리, 식사대용, 운동 전후, 50대 단백질 전략까지 한 번에 볼 수 있습니다.",
    };
  }

  return {
    title: section.title,
    description: section.description,
  };
}

export default async function GuideTrackPage({ params }: { params: Promise<{ track: string }> }) {
  const { track } = await params;
  const cms = await getAdminGuidesStaticRuntimeData();
  const section = cms.sections.find((item) => item.slug === track);

  if (!section) notFound();

  const featuredTopics = section.articles.slice(0, 3).map((article) => article.title);
  const articleMap = new Map(section.articles.map((article) => [article.slug, article]));
  const globalArticleMap = new Map(
    cms.sections.flatMap((sectionItem) => sectionItem.articles.map((article) => [article.slug, article] as const)),
  );
  const popularTopic =
    section.articles.find((article) => article.status === "live")?.title ??
    section.articles[0]?.title ??
    "대표 콘텐츠 준비 중";

  const accentSoftBg = section.slug === "tools" ? "#f6f0ff" : "#eff7f2";
  const accentChipBg = section.slug === "tools" ? "#f7f2ff" : "#f4faf6";

  const lineupArticles =
    section.slug === "product-selection-comparison"
      ? ["selexs-lineup", "himune-lineup", "takefit-lineup", "newcare-allprotein", "dryou-lineup", "danbaek-lineup"]
          .map((slug) => articleMap.get(slug))
          .filter((item): item is NonNullable<typeof item> => Boolean(item))
      : [];

  const starterArticles =
    section.slug === "product-selection-comparison"
      ? ["protein-category-guide", "protein-drink-beginners-guide", "protein-shake-top7", "protein-bar-top10"]
          .map((slug) => articleMap.get(slug))
          .filter((item): item is NonNullable<typeof item> => Boolean(item))
      : [];

  const shakeBrandArticles =
    section.slug === "product-selection-comparison"
      ? ["flymill-vs-danbaekhani", "flymill-protein-shake", "danbaekhani-protein-shake", "oliveyoung-protein-shake"]
          .map((slug) => articleMap.get(slug))
          .filter((item): item is NonNullable<typeof item> => Boolean(item))
      : [];

  const comparisonArticles =
    section.slug === "product-selection-comparison"
      ? ["selex-vs-himune", "selex-vs-takefit-vs-himune", "high-protein-40g-comparison", "protein-drink-by-content"]
          .map((slug) => articleMap.get(slug))
          .filter((item): item is NonNullable<typeof item> => Boolean(item))
      : [];

  const topicMap = new Map(getAllSearchTopics().map((topic) => [topic.slug, topic]));
  const searchTopicItems =
    section.slug === "product-selection-comparison"
      ? ["protein-drink-recommend", "low-sugar-protein-drink", "high-protein-drink-20g", "lactose-free-protein-drink", "meal-replacement-protein-shake", "high-protein-bar"]
          .map((slug) => topicMap.get(slug))
          .filter((item): item is NonNullable<typeof item> => Boolean(item))
          .map((topic) => ({
            slug: topic.slug,
            title: topic.title,
            description: topic.description,
            href: `/topics/${topic.slug}`,
            emoji: "🔎",
            tags: ["검색형", "허브"],
          }))
      : [];

  const trackCStarterArticles =
    section.slug === "intake-strategy-health"
      ? ["protein-timing", "weight-management-protein", "meal-replacement-strategy", "senior-protein-strategy"]
          .map((slug) => articleMap.get(slug))
          .filter((item): item is NonNullable<typeof item> => Boolean(item))
      : [];

  const trackCWorkoutArticles =
    section.slug === "intake-strategy-health"
      ? ["post-workout-protein", "pre-workout-protein", "muscle-maintenance-protein"]
          .map((slug) => articleMap.get(slug))
          .filter((item): item is NonNullable<typeof item> => Boolean(item))
      : [];

  const trackCProductBridgeArticles =
    section.slug === "intake-strategy-health"
      ? ["protein-drink-for-50s", "diet-protein-shake", "protein-drink-beginners-guide", "protein-drink-by-content"]
          .map((slug) => globalArticleMap.get(slug))
          .filter((item): item is NonNullable<typeof item> => Boolean(item))
      : [];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section
        className="w-full border-b border-t bg-[var(--hero-bg)]"
        style={{ borderColor: "var(--hero-border)" }}
      >
        <div className="mx-auto max-w-[1200px] px-4 py-4 md:px-6 md:py-5">
          <div className="flex items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
            <Link href="/guides" className="hover:text-[var(--accent)]">
              Guides
            </Link>
            <span>/</span>
            <span>{section.title}</span>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2.5">
            <span
              className="rounded-md px-2 py-0.5 text-[11px] font-semibold tracking-wide"
              style={{ background: section.accentBg, color: section.accentColor }}
            >
              {section.trackLabel}
            </span>
            <span className="text-xs text-[#8b8b8b]">대표 콘텐츠와 연결 흐름까지 한 번에 정리했습니다.</span>
            <span className="text-xs text-[#8b8b8b]">{section.articles.length}개 주제</span>
          </div>

          <div className="mt-3 flex items-start gap-3">
            <span
              aria-hidden
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#d7e6dd] text-lg"
              style={{ backgroundColor: accentSoftBg }}
            >
              {section.emoji}
            </span>
            <div className="min-w-0">
              <h1 className="text-[26px] font-bold leading-tight md:text-[30px]" style={{ color: section.accentColor }}>
                {section.title}
              </h1>
              <p className="mt-1.5 max-w-2xl text-sm leading-6 text-[var(--foreground-muted)]">{section.description}</p>
            </div>
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {featuredTopics.map((topic) => (
              <span
                key={`${section.slug}-${topic}`}
                className="inline-flex items-center rounded-full border border-[#d7e6dd] bg-[#fffdf8] px-2.5 py-1 text-[11px] font-medium text-[var(--foreground-muted)]"
              >
                {topic}
              </span>
            ))}
          </div>

          <div className="mt-3 flex items-center gap-2 text-[11px] font-medium text-[#6f7f76] md:hidden">
            <span aria-hidden>↓</span>
            <span>아래 카드에서 바로 주제를 선택할 수 있습니다.</span>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 pb-12 md:px-6">
        {section.slug === "product-selection-comparison" ? (
          <div className="mt-5 space-y-4">
            <CuratedGuideGroup
              title="입문자는 여기부터 보면 됩니다"
              description="카테고리부터 정하는 입문 허브와, 음료·쉐이크·바 입문용 대표 페이지를 먼저 묶었습니다."
              accentColor={section.accentColor}
              accentBg={accentChipBg}
              items={starterArticles}
            />
            <CuratedGuideGroup
              title="쉐이크 브랜드 바로보기"
              description="플라이밀, 단백하니, 올리브영 쉐이크처럼 최근 추가한 쉐이크 브랜드와 비교 페이지를 상단에서 바로 볼 수 있게 묶었습니다."
              accentColor={section.accentColor}
              accentBg={accentChipBg}
              items={shakeBrandArticles}
            />
            <CuratedGuideGroup
              title="브랜드 라인업만 모아보기"
              description="셀렉스, 하이뮨, 테이크핏, 뉴케어, 닥터유, 더단백 라인 차이를 먼저 보고 싶을 때 보는 묶음입니다."
              accentColor={section.accentColor}
              accentBg={accentChipBg}
              items={lineupArticles}
            />
            <CuratedGuideGroup
              title="대표 비교 페이지 바로가기"
              description="브랜드 직접 비교, 40g대 비교, 함량대별 정리처럼 검색 유입이 큰 비교 페이지를 모았습니다."
              accentColor={section.accentColor}
              accentBg={accentChipBg}
              items={comparisonArticles}
            />
            <CuratedGuideGroup
              title="상황별 제품 고르기"
              description="저당, 아침 대용, 저칼로리, 올리브영처럼 조건과 채널 기준으로 바로 들어가는 허브를 묶었습니다."
              accentColor={section.accentColor}
              accentBg={accentChipBg}
              items={searchTopicItems}
            />
          </div>
        ) : null}

        {section.slug === "intake-strategy-health" ? (
          <div className="mt-5 space-y-4">
            <CuratedGuideGroup
              title="가장 많이 찾는 섭취 전략"
              description="단백질 타이밍, 체중 관리, 식사대용, 50대 전략처럼 실제 검색량이 큰 주제부터 바로 들어갈 수 있게 정리했습니다."
              accentColor={section.accentColor}
              accentBg={accentChipBg}
              items={trackCStarterArticles}
            />
            <CuratedGuideGroup
              title="운동 전후와 근육 유지 전략"
              description="운동 전, 운동 후, 근육 유지처럼 운동 루틴과 직접 연결되는 섭취 전략만 따로 묶었습니다."
              accentColor={section.accentColor}
              accentBg={accentChipBg}
              items={trackCWorkoutArticles}
            />
            <CuratedGuideGroup
              title="제품 선택으로 바로 이어지는 가이드"
              description="전략을 읽고 바로 제품까지 고르고 싶을 때 이어서 보기 좋은 Track B 페이지를 같이 묶었습니다."
              accentColor={section.accentColor}
              accentBg={accentChipBg}
              items={trackCProductBridgeArticles}
            />
          </div>
        ) : null}

        <section className="mt-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-[var(--foreground)]">주제 목록</h2>
              <p className="mt-1 text-xs text-[#8b8b8b]">대표 질문과 상황별 고민을 먼저 보고 필요한 주제로 이동해보세요.</p>
            </div>
            <div
              className="hidden rounded-full border border-[#d7e6dd] px-3 py-1.5 text-xs font-medium md:block"
              style={{ color: section.accentColor, backgroundColor: accentChipBg }}
            >
              인기: {popularTopic}
            </div>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {section.articles.map((article) => (
              <Link
                key={article.slug}
                href={article.href}
                className="group flex h-full min-h-[248px] flex-col justify-between overflow-hidden rounded-[24px] border border-[#d8e2da] bg-[#fffdf8] shadow-[0_10px_24px_rgba(20,40,28,0.05)] transition-colors hover:border-[#cfe1d7] sm:min-h-[256px]"
              >
                <div className="h-1.5 w-full" style={{ background: section.accentColor }} />

                <div className="flex flex-1 flex-col">
                  <div
                    className="border-b border-[#e7eee9] px-4 py-3 sm:px-5"
                    style={{ background: `linear-gradient(135deg, ${section.accentBg} 0%, #fffdf8 100%)` }}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex flex-1 flex-wrap items-center gap-2">
                        <span
                          aria-hidden
                          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#d7e6dd] bg-white text-lg shadow-[0_4px_10px_rgba(20,40,28,0.06)]"
                        >
                          {article.emoji}
                        </span>
                        {article.tags.slice(0, 2).map((tag) => (
                          <span
                            key={`${article.slug}-${tag}`}
                            className="inline-flex items-center whitespace-nowrap rounded-full border border-[#d9e4dd] bg-[#f7faf8] px-2.5 py-1 text-[11px] font-medium text-[#496555]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      {article.status !== "live" && (
                        <span className="rounded-full bg-amber-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-amber-700">
                          Planned
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col px-4 pb-4 pt-4 sm:px-5 sm:pb-5">
                    <h3
                      className="min-h-[52px] text-base font-bold leading-7 transition-colors group-hover:text-[var(--accent)]"
                      style={{ ...clampTwoLines, color: section.accentColor }}
                    >
                      {article.title}
                    </h3>

                    <div className="mt-3 md:hidden">
                      <GuideVisual
                        track={section.slug as GuideTrackSlug}
                        title={article.title}
                        accentColor={section.accentColor}
                        accentBg={section.accentBg}
                        variant="topic"
                      />
                    </div>

                    <p className="mt-2 min-h-[48px] text-sm leading-6 text-[var(--foreground-muted)]" style={clampTwoLines}>
                      {article.description}
                    </p>

                    <div className="mt-4 rounded-xl border border-[#edf3ef] bg-white px-3 py-3">
                      <p className="text-[11px] font-semibold uppercase tracking-wide text-[#7c8b84]">읽는 시간</p>
                      <p className="mt-1 text-[13px] leading-5 text-[var(--foreground)]">{article.readTime}</p>
                    </div>
                  </div>
                </div>

                <div className="px-4 pb-4 sm:px-5 sm:pb-5">
                  <div className="flex items-center justify-between gap-3">
                    <span
                      className="rounded-full px-2.5 py-1 text-[11px] font-semibold"
                      style={{ color: section.accentColor, backgroundColor: accentChipBg }}
                    >
                      바로가기
                    </span>
                    <span className="inline-flex items-center text-sm font-semibold" style={{ color: section.accentColor }}>
                      주제 보기
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
