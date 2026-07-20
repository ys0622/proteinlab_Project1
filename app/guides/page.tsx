import Link from "next/link";
import CommercialAdSection from "../components/CommercialAdSection";
import Header from "../components/Header";
import Footer from "../components/Footer";
import GuideBuySection from "@/app/components/GuideBuySection";
import { getAdminGuidesStaticRuntimeData } from "@/app/lib/adminGuidesStaticRuntime";

export const revalidate = 3600;

const metadataTitle = "단백질 가이드 모음 | 음료·쉐이크·바·요거트 비교·추천";
const metadataDescription =
  "단백질 음료 추천 TOP10, 뉴케어 올프로틴, 고단백 RTD 비교, 쉐이크 추천, 단백질 바와 요거트 선택 기준까지 한 번에 볼 수 있는 ProteinLab 가이드 허브입니다.";

const priorityGuideLinks = [
  {
    href: "/guides/intake-strategy-health/protein-drink-diarrhea",
    title: "단백질 음료 설사",
    description: "유당, 감미료, 섭취량 기준으로 소화 부담 원인을 나눠봅니다.",
  },
  {
    href: "/guides/intake-strategy-health/protein-drink-weight-gain",
    title: "단백질 음료 살찌나요",
    description: "칼로리, 당류, 간식 대체 여부로 체중 영향을 판단합니다.",
  },
  {
    href: "/guides/intake-strategy-health/protein-drink-daily",
    title: "단백질 음료 매일 마셔도 되나요",
    description: "매일 섭취할 때 식사 보완과 추가 칼로리를 구분합니다.",
  },
  {
    href: "/guides/intake-strategy-health/protein-drink-empty-stomach",
    title: "단백질 음료 공복",
    description: "아침 공복과 운동 전 공복에 마실 때 부담을 줄이는 기준입니다.",
  },
  {
    href: "/guides/intake-strategy-health/protein-drink-sugar",
    title: "단백질 음료 당류 기준",
    description: "당류 0g, 저당, 맛별 SKU 차이를 라벨 기준으로 읽습니다.",
  },
  {
    href: "/guides/product-selection-comparison/protein-drink-top10",
    title: "단백질 음료 추천 TOP 10",
    description: "대표 RTD 후보를 단백질, 당류, 칼로리 기준으로 먼저 좁힙니다.",
  },
  {
    href: "/guides/product-selection-comparison/newcare-allprotein",
    title: "뉴케어 올프로틴 완전 분석",
    description: "41g, 25g, 워터, 식물성 라인과 국제 미각상 정보를 함께 봅니다.",
  },
  {
    href: "/guides/product-selection-comparison/high-protein-40g-comparison",
    title: "40g 이상 고단백 음료 비교",
    description: "뉴케어, 테이크핏, 닥터유 등 고단백 RTD의 차이를 비교합니다.",
  },
  {
    href: "/guides/product-selection-comparison/protein-drink-by-flavor",
    title: "단백질 음료 맛별 추천",
    description: "초코, 바나나, 고소한맛처럼 맛 기준으로 후보를 줄입니다.",
  },
];

export const metadata = {
  title: metadataTitle,
  description: metadataDescription,
  alternates: {
    canonical: "https://proteinlab.kr/guides",
  },
  openGraph: {
    title: metadataTitle,
    description: metadataDescription,
    url: "https://proteinlab.kr/guides",
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

export default async function GuidesPage() {
  const cms = await getAdminGuidesStaticRuntimeData();

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "ProteinLab", item: "https://proteinlab.kr/" },
      { "@type": "ListItem", position: 2, name: "가이드", item: "https://proteinlab.kr/guides" },
    ],
  };

  return (
    <div className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <Header />

      <section
        className="w-full border-b border-t bg-[var(--hero-bg)]"
        style={{ borderColor: "var(--hero-border)" }}
      >
        <div className="mx-auto max-w-[1200px] px-4 py-6 md:px-6 md:py-7">
          <h1 className="text-2xl font-bold leading-[1.25] text-[var(--foreground)] md:text-3xl">
            {cms.mainPage.title}
          </h1>
          <p className="mt-2 max-w-[760px] text-sm leading-6 text-[var(--foreground-muted)] md:text-[15px]">
            {cms.mainPage.description}
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 pb-12 md:px-6">
        <CommercialAdSection
          pageType="guide"
          className="mt-6"
          title="가이드를 둘러보기 전 참고 광고"
          description="광고는 제품 상세나 비교 화면이 아니라 가이드 허브 같은 정보형 섹션에서만 제한적으로 노출합니다."
        />

        <section className="mt-6 rounded-2xl border border-[#d9e7dc] bg-[#f6fbf7] p-5">
          <div className="mb-4 space-y-1">
            <h2 className="text-lg font-bold text-[var(--foreground)]">먼저 색인 신호를 밀어야 할 핵심 가이드</h2>
            <p className="text-sm leading-6 text-[var(--foreground-muted)]">
              단백질 음료 설사, 살찌나요, 매일 마셔도 되나요처럼 정보형 검색어와 추천형 검색어를
              함께 받을 수 있는 페이지를 먼저 배치했습니다.
            </p>
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            {priorityGuideLinks.map((link) => (
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

        <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {cms.mainPage.tracks.map((track) => (
            <Link
              key={track.id}
              href={track.href}
              className="group flex h-full flex-col overflow-hidden rounded-[24px] border border-[#d8e2da] bg-[#fffdf8] shadow-[0_10px_24px_rgba(20,40,28,0.05)] transition-colors hover:border-[#cfe1d7]"
            >
              <div className="flex flex-1 flex-col px-5 py-5">
                <div className="flex items-center justify-between gap-3">
                  <span
                    className="shrink-0 whitespace-nowrap rounded-md px-2 py-0.5 text-[11px] font-semibold tracking-wide"
                    style={{ color: track.accentColor }}
                  >
                    {track.subtitle}
                  </span>
                  <span className="shrink-0 whitespace-nowrap rounded-full border border-[#d8e2da] bg-white px-2.5 py-1 text-[11px] font-semibold text-[#6f7f76]">
                    {track.count}개 주제
                  </span>
                </div>
                <h2
                  className="mt-4 text-[17px] font-bold leading-7 transition-colors group-hover:text-[var(--accent)]"
                  style={{ color: track.accentColor }}
                >
                  {track.title}
                </h2>
                <p className="mt-2 flex-1 text-[13px] leading-[1.6] text-[var(--foreground-muted)]">
                  {track.description}
                </p>
              </div>
              <div className="px-5 pb-5">
                <span
                  className="flex items-center justify-center rounded-lg border bg-white py-2.5 text-xs font-semibold transition-colors"
                  style={{
                    borderColor: track.accentColor + "33",
                    color: track.accentColor,
                  }}
                >
                  트랙 바로 보기
                </span>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <GuideBuySection />

      <Footer />
    </div>
  );
}
