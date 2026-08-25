import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CommercialAdSection from "../../components/CommercialAdSection";
import ProductCard from "../../components/ProductCard";
import TrackedLink from "../../components/TrackedLink";
import { getCompareLandingBySlug, getAllCompareLandingStaticSlugs } from "../../data/compareLandings";
import { formatProductLabel } from "../../lib/productLabel";
import { getAllProducts } from "../../data/products";
import type { ProductDetailProps } from "../../data/products";

interface PageProps {
  params: Promise<{ slug: string }>;
}

const priorityConversionPlans: Record<string, { contentId: string; conclusion: string }> = {
  "proteone-vs-itthefit-shake": {
    contentId: "plv3:landing:compare:proteone-vs-itthefit-shake",
    conclusion: "두 제품은 단백질 수치만으로 고르기보다 당류, 칼로리, 1회 섭취량을 함께 비교해 목적에 맞는 쪽을 고르는 편이 좋습니다.",
  },
  "takefit-vs-hymune-drink": {
    contentId: "plv3:landing:compare:takefit-vs-hymune-drink",
    conclusion: "운동 후 보충과 일상 보완은 기준이 다릅니다. 단백질 함량과 당류, 칼로리를 표에서 나란히 확인한 뒤 선택하세요.",
  },
  "takefit-vs-himune-drink": {
    contentId: "plv3:landing:compare:takefit-vs-hymune-drink",
    conclusion: "운동 후 보충과 일상 보완은 기준이 다릅니다. 단백질 함량과 당류, 칼로리를 표에서 나란히 확인한 뒤 선택하세요.",
  },
  "newcare-vs-sellex-drink": {
    contentId: "plv3:landing:compare:newcare-vs-sellex-drink",
    conclusion: "식사 보완 목적이라면 총 영양과 섭취 상황을, 단백질 보충 목적이라면 단백질과 당류를 우선해 비교하는 것이 좋습니다.",
  },
  "takefit-max-vs-takefit-monster": {
    contentId: "plv3:landing:compare:takefit-max-vs-takefit-monster",
    conclusion: "같은 브랜드라도 단백질 구간과 열량이 다릅니다. 하루 섭취량과 운동 목적에 맞춰 비교표에서 차이를 확인하세요.",
  },
};

type CompareMetric = {
  id: string;
  label: string;
  direction: "higher" | "lower";
  getValue: (product: ProductDetailProps) => number | null;
  format: (value: number) => string;
  threshold: number;
  reason: string;
};

type DifferenceCard = {
  id: string;
  label: string;
  winnerName: string;
  winnerValue: string;
  comparisonText: string;
  deltaText: string;
  reason: string;
  direction: "higher" | "lower";
  score: number;
};

const compareMetrics: CompareMetric[] = [
  {
    id: "protein",
    label: "단백질",
    direction: "higher",
    getValue: (product) => product.proteinPerServing ?? null,
    format: (value) => `${value}g`,
    threshold: 2,
    reason: "운동 후 보충이나 포만감 기준에서 먼저 보는 수치입니다.",
  },
  {
    id: "sugar",
    label: "당류",
    direction: "lower",
    getValue: (product) => product.sugar ?? null,
    format: (value) => `${value}g`,
    threshold: 1,
    reason: "저당 설계나 야간 섭취 기준에서 차이를 크게 만듭니다.",
  },
  {
    id: "calories",
    label: "칼로리",
    direction: "lower",
    getValue: (product) => product.calories ?? null,
    format: (value) => `${value}kcal`,
    threshold: 15,
    reason: "다이어트나 간식 대체 목적이면 총열량 차이를 함께 봐야 합니다.",
  },
  {
    id: "density",
    label: "단백질 밀도",
    direction: "higher",
    getValue: (product) => {
      if (typeof product.density === "number") return product.density;
      if (typeof product.density === "string") {
        const parsed = Number.parseFloat(product.density.replace(/[^\d.]/g, ""));
        return Number.isFinite(parsed) ? parsed : null;
      }
      const capacity = Number.parseFloat(String(product.capacity ?? "").replace(/[^\d.]/g, ""));
      return product.proteinPerServing != null && capacity > 0
        ? Number(((product.proteinPerServing / capacity) * 100).toFixed(1))
        : null;
    },
    format: (value) => `${value.toFixed(1)}g/100mL`,
    threshold: 0.8,
    reason: "같은 용량 대비 단백질이 얼마나 압축되어 있는지 보여줍니다.",
  },
  {
    id: "bcaa",
    label: "BCAA",
    direction: "higher",
    getValue: (product) => {
      const raw = product.nutritionPerBottle?.bcaaMg ?? product.bcaa;
      if (typeof raw === "number") return raw;
      if (typeof raw === "string") {
        const parsed = Number.parseFloat(raw.replace(/[^\d.]/g, ""));
        return Number.isFinite(parsed) ? parsed : null;
      }
      return null;
    },
    format: (value) => `${Math.round(value).toLocaleString("ko-KR")}mg`,
    threshold: 500,
    reason: "운동 보충 목적에서 참고할 수 있는 보조 지표입니다.",
  },
];

function buildDifferenceCards(products: ProductDetailProps[]): DifferenceCard[] {
  if (products.length < 2) return [];
  const pair = products.slice(0, 2);

  return compareMetrics
    .flatMap((metric) => {
      const values = pair.map((product) => metric.getValue(product));
      if (values.some((value) => value == null)) return [];

      const [left, right] = values as [number, number];
      const delta = Math.abs(left - right);
      if (delta < metric.threshold || left === right) return [];

      const winnerIndex =
        metric.direction === "higher"
          ? left > right ? 0 : 1
          : left < right ? 0 : 1;
      const loserIndex = winnerIndex === 0 ? 1 : 0;
      const winner = pair[winnerIndex];
      const loser = pair[loserIndex];
      const winnerValue = values[winnerIndex] as number;
      const loserValue = values[loserIndex] as number;
      const deltaPrefix = metric.direction === "higher" ? "+" : "-";

      return [
        {
          id: metric.id,
          label: metric.label,
          winnerName: formatProductLabel(winner.brand, winner.name),
          winnerValue: metric.format(winnerValue),
          comparisonText: `${formatProductLabel(winner.brand, winner.name)} ${metric.format(winnerValue)} / ${formatProductLabel(loser.brand, loser.name)} ${metric.format(loserValue)}`,
          deltaText: `${deltaPrefix}${metric.format(delta)}`,
          reason: metric.reason,
          direction: metric.direction,
          score: compareMetrics.length - compareMetrics.findIndex((item) => item.id === metric.id) + delta / Math.max(metric.threshold, 1),
        },
      ];
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
}

export async function generateStaticParams() {
  return getAllCompareLandingStaticSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const landing = getCompareLandingBySlug(slug);

  if (!landing) {
    return { title: "비교 페이지를 찾을 수 없음 | ProteinLab" };
  }

  const canonical = `https://proteinlab.kr/compare/${landing.slug}`;
  const title = `${landing.title} — 단백질 성분 비교표`;
  const description = `${landing.description} 비교표로 수치를 나란히 확인하고 제품 상세까지 바로 이어서 볼 수 있습니다.`;
  return {
    title,
    description,
    alternates: { canonical },
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

export default async function CompareLandingPage({ params }: PageProps) {
  const { slug } = await params;
  const landing = getCompareLandingBySlug(slug);
  if (!landing) notFound();

  const allProducts = getAllProducts();
  const products = landing.productSlugs
    .map((productSlug) => allProducts.find((item) => item.slug === productSlug))
    .filter((item): item is NonNullable<typeof item> => item != null);

  const compareHref = `/compare?slugs=${landing.productSlugs.join(",")}`;
  const conversionPlan = priorityConversionPlans[landing.slug];
  const differenceCards = buildDifferenceCards(products);
  const canonical = `https://proteinlab.kr/compare/${landing.slug}`;
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "ProteinLab", item: "https://proteinlab.kr/" },
        { "@type": "ListItem", position: 2, name: "제품 비교", item: "https://proteinlab.kr/compare" },
        { "@type": "ListItem", position: 3, name: landing.title, item: canonical },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: landing.title,
      description: landing.description,
      url: canonical,
    },
    {
      "@context": "https://schema.org",
      "@type": "ItemList",
      name: landing.title,
      numberOfItems: products.length,
      itemListElement: products.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `https://proteinlab.kr/product/${p.slug}`,
        name: formatProductLabel(p.brand, p.name),
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: `${landing.title}에서 가장 중요하게 봐야 할 기준은 무엇인가요?`,
          acceptedAnswer: {
            "@type": "Answer",
            text: `${landing.intro} 단백질 함량, 당류, 칼로리, 단백질 밀도를 함께 비교하면 실제 체감 차이를 더 잘 파악할 수 있습니다.`,
          },
        },
        {
          "@type": "Question",
          name: `${landing.title} 중 어떤 제품을 선택해야 하나요?`,
          acceptedAnswer: {
            "@type": "Answer",
            text: `목적에 따라 달라집니다. 운동 후 보충이 목적이면 단백질 함량과 밀도를, 다이어트 목적이면 당류와 칼로리를 우선 기준으로 비교해보세요. ProteinLab 비교표에서 수치를 나란히 확인할 수 있습니다.`,
          },
        },
      ],
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
            <Link href="/compare" className="hover:text-[var(--accent)]">
              제품 비교
            </Link>
            <span className="mx-2">/</span>
            <span className="text-[var(--foreground)]">{landing.title}</span>
          </nav>
          <h1 className="text-2xl font-bold leading-[1.25] text-[#16412D] md:text-3xl">
            {landing.title}
          </h1>
          <p className="mt-2 max-w-[760px] text-sm leading-6 text-[var(--foreground-muted)] md:text-[15px]">
            {landing.description} 비교표로 바로 들어가고 제품 상세까지 이어서 확인할 수 있게 정리했습니다.
          </p>
          {conversionPlan ? <p className="mt-2 text-xs text-[var(--foreground-muted)]">업데이트 2026-07-15</p> : null}
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 pb-12 pt-6 md:px-6">
        {conversionPlan ? (
          <section className="mb-6 border-y border-[#dce8df] py-5">
            <h2 className="text-base font-semibold text-[var(--foreground)]">핵심 결론</h2>
            <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{conversionPlan.conclusion}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {products.slice(0, 2).map((product) => (
                <TrackedLink
                  key={product.slug}
                  href={`/product/${product.slug}`}
                  trackingLabel={`${formatProductLabel(product.brand, product.name)} 상세 보기`}
                  trackingSection="compare_hero_product"
                  trackingPageType="compare_landing"
                  contentId={conversionPlan.contentId}
                  productId={product.slug}
                  linkPosition="hero"
                  ctaType="product_detail"
                  className="rounded-full border border-[#dce8df] px-4 py-2 text-sm font-semibold text-[#24543d] hover:bg-[#f6fbf7]"
                >
                  {formatProductLabel(product.brand, product.name)} 상세
                </TrackedLink>
              ))}
              <TrackedLink
                href={compareHref}
                trackingLabel="비교표 확인"
                trackingSection="compare_hero_table"
                trackingPageType="compare_landing"
                contentId={conversionPlan.contentId}
                linkPosition="hero"
                ctaType="compare"
                className="rounded-full bg-[var(--accent)] px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
              >
                비교표 확인
              </TrackedLink>
            </div>
          </section>
        ) : null}
        {differenceCards.length > 0 ? (
          <section className="mb-6 rounded-2xl border border-[#dce8df] bg-white p-4 md:p-5">
            <div className="space-y-1" style={{ wordBreak: "keep-all" }}>
              <p className="text-xs font-semibold text-[#1B7F5B]">차이 먼저 보기</p>
              <h2 className="text-lg font-bold leading-snug text-[var(--foreground)]">
                두 제품은 이 지표에서 차이가 큽니다
              </h2>
              <p className="text-sm leading-6 text-[var(--foreground-muted)]">
                동일한 숫자 나열보다 선택에 영향을 주는 차이만 먼저 추렸습니다.
              </p>
            </div>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              {differenceCards.map((item) => (
                <article
                  key={item.id}
                  className="rounded-2xl border border-[#e7eee9] bg-[#f8fbf8] p-4"
                  style={{ wordBreak: "keep-all" }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs font-semibold text-[var(--foreground-muted)]">{item.label}</p>
                      <p className="mt-1 text-xl font-bold leading-tight text-[#16412D]">{item.winnerValue}</p>
                    </div>
                    <span
                      className="shrink-0 rounded-full px-2.5 py-1 text-xs font-bold"
                      style={{
                        background: item.direction === "higher" ? "#16412D" : "#F3EFE6",
                        color: item.direction === "higher" ? "#fff" : "#16412D",
                      }}
                    >
                      {item.deltaText}
                    </span>
                  </div>
                  <p className="mt-3 text-sm font-semibold leading-5 text-[var(--foreground)]">
                    {item.winnerName}
                  </p>
                  <p className="mt-2 text-xs leading-5 text-[var(--foreground-muted)]">
                    {item.comparisonText}
                  </p>
                  <p className="mt-3 border-t border-[#e0ebe4] pt-3 text-xs leading-5 text-[var(--foreground-muted)]">
                    {item.reason}
                  </p>
                </article>
              ))}
            </div>
          </section>
        ) : null}
        <section className="rounded-2xl border border-[#e8e6e3] bg-[#FFFDF8] p-5">
          <h2 className="text-base font-semibold text-[var(--foreground)]">비교 포인트</h2>
          <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{landing.intro}</p>
          <ul className="mt-4 space-y-2">
            {landing.bullets.map((bullet) => (
              <li key={bullet} className="flex items-start gap-2 text-sm leading-6 text-[var(--foreground-muted)]">
                <span className="mt-[6px] h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent)]" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
          <TrackedLink
            href={compareHref}
            trackingLabel="비교표 바로 보기"
            trackingSection="compare_point_table"
            trackingPageType="compare_landing"
            contentId={conversionPlan?.contentId}
            linkPosition="mid_content"
            ctaType="compare"
            className="mt-5 inline-flex items-center justify-center rounded-full bg-[var(--accent)] px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            비교표 바로 보기
          </TrackedLink>
        </section>

        <section className="mt-8">
          <div className="mb-4 space-y-1">
            <h2 className="text-lg font-bold text-[var(--foreground)]">비교 대상 제품</h2>
            <p className="text-sm leading-6 text-[var(--foreground-muted)]">
              제품 상세를 보거나 비교표에서 수치를 바로 나란히 확인할 수 있습니다.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3 md:gap-6 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard
                key={product.slug}
                {...product}
                purchaseLinkCategory="ranking"
                cardVariant="related"
              />
            ))}
          </div>
        </section>

        {landing.relatedLinks.length > 0 ? (
          <section className="mt-8 rounded-2xl border border-[#e8e6e3] bg-white p-5">
            <div className="space-y-1">
              <h2 className="text-lg font-bold text-[var(--foreground)]">비교 전후로 같이 보면 좋은 페이지</h2>
              <p className="text-sm leading-6 text-[var(--foreground-muted)]">
                이 비교만 보고 끝내지 않고 브랜드 허브, 주제 허브, 랭킹까지 이어서 보면 후보를 더 빨리 좁힐 수 있습니다.
              </p>
            </div>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {landing.relatedLinks.map((item) => (
                <TrackedLink
                  key={item.href}
                  href={item.href}
                  trackingLabel={item.title}
                  trackingSection="compare_related_links"
                  trackingPageType="compare_landing"
                  contentId={conversionPlan?.contentId}
                  linkPosition="bottom_cta"
                  ctaType="related_products"
                  className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4 transition-colors hover:bg-white"
                >
                  <h3 className="text-sm font-semibold text-[#24543d]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{item.description}</p>
                </TrackedLink>
              ))}
            </div>
          </section>
        ) : null}
        <CommercialAdSection pageType="compare" className="mt-6" />
      </main>

      <Footer />
    </div>
  );
}
