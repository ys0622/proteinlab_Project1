import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "시장 인사이트 | ProteinLab",
  description:
    "단백질 시장의 흐름, RTD 카테고리, 브랜드 전략, 성분 트렌드까지 Track E에서 정리합니다.",
};

const topics = [
  {
    title: "단백질 시장 히스토리",
    href: "/guides/market-insights/protein-market-history",
    badge: "기본 흐름",
    description: "국내 단백질 시장이 어떻게 커졌는지, 어떤 카테고리가 먼저 성장했는지 시간축으로 정리합니다.",
  },
  {
    title: "단백질 RTD 시장",
    href: "/guides/market-insights/protein-rtd-market",
    badge: "핵심 카테고리",
    description: "RTD 음료 시장이 왜 커졌는지, 브랜드 경쟁이 어디서 벌어지는지 구조적으로 설명합니다.",
  },
  {
    title: "브랜드 분석",
    href: "/guides/market-insights/brand-analysis",
    badge: "브랜드 관점",
    description: "셀렉스, 더단백, 하이뮨 같은 대표 브랜드가 어떤 포지션을 가져가는지 비교합니다.",
  },
  {
    title: "성분 트렌드",
    href: "/guides/market-insights/ingredient-trends",
    badge: "트렌드",
    description: "고단백, 저당, 락토프리, 식물성 같은 키워드가 왜 중요해졌는지 정리합니다.",
  },
  {
    title: "신제품 분석",
    href: "/guides/market-insights/new-product-analysis",
    badge: "업데이트",
    description: "새 제품이 나왔을 때 어떤 숫자와 포지셔닝을 먼저 봐야 하는지 기준을 제공합니다.",
  },
  {
    title: "글로벌 단백질 시장",
    href: "/guides/market-insights/global-protein-market",
    badge: "확장 시야",
    description: "해외 시장 흐름을 통해 국내 제품과 브랜드 전략을 더 넓게 해석합니다.",
  },
];

export default function MarketInsightsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <section className="w-full border-t border-b bg-[var(--hero-bg)]" style={{ borderColor: "var(--hero-border)" }}>
        <div className="mx-auto max-w-[1200px] px-4 py-5 md:px-6 md:py-6">
          <div className="flex items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
            <Link href="/guides" className="hover:text-[var(--accent)]">
              Guides
            </Link>
            <span>/</span>
            <span>시장 인사이트</span>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2.5">
            <span className="rounded-md bg-[#f1ebf7] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#6b4d7c]">
              TRACK E
            </span>
            <span className="text-xs text-[#8b8b8b]">시장과 브랜드를 데이터 관점으로 읽는 트랙</span>
            <span className="text-xs text-[#8b8b8b]">{topics.length}개 주제</span>
          </div>
          <div className="mt-4">
            <h1 className="text-[26px] font-bold leading-tight text-[#5a4271] md:text-[30px]">시장 인사이트</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--foreground-muted)]">
              제품 숫자만 보는 단계에서 한 걸음 더 나아가, 브랜드와 카테고리 흐름을 읽는 콘텐츠를 모읍니다.
              <br />
              Track E는 검색 유입형 시장 콘텐츠와 ProteinLab 데이터 해석을 연결하는 허브입니다.
            </p>
          </div>
        </div>
      </section>
      <main className="mx-auto max-w-[1200px] px-4 pb-12 md:px-6">
        <section className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {topics.map((topic) => (
            <Link
              key={topic.href}
              href={topic.href}
              className="group flex min-h-[224px] flex-col justify-between rounded-2xl border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5 transition-colors hover:border-[#d9cde4]"
            >
              <div>
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full bg-[#f4eef9] px-3 py-1 text-[11px] font-semibold text-[#6b4d7c]">
                    {topic.badge}
                  </span>
                  <span className="text-[10px] font-semibold uppercase tracking-wide text-[#9a8faa]">Track E</span>
                </div>
                <h2 className="mt-3 text-base font-bold text-[#5a4271] group-hover:text-[var(--accent)]">{topic.title}</h2>
                <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{topic.description}</p>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className="rounded-full bg-[#f4eef9] px-2.5 py-1 text-[11px] font-semibold text-[#6b4d7c]">초안</span>
                <span className="text-sm font-semibold text-[#5a4271]">주제 보기</span>
              </div>
            </Link>
          ))}
        </section>
      </main>
      <Footer />
    </div>
  );
}
