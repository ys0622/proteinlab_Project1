import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "시장 인사이트 | ProteinLab",
  description:
    "단백질 시장 흐름, RTD 카테고리, 브랜드 포지셔닝, 성분 트렌드를 Track E에서 정리합니다.",
};

const featuredTopics = [
  {
    title: "단백질 RTD 시장",
    href: "/guides/market-insights/protein-rtd-market",
    badge: "먼저 읽기",
    description:
      "RTD 단백질 음료 시장이 어떻게 커졌고, 어떤 기준으로 브랜드와 제품이 나뉘는지 먼저 정리합니다.",
    question: "RTD 시장은 왜 이렇게 빠르게 커졌을까?",
  },
  {
    title: "브랜드 분석",
    href: "/guides/market-insights/brand-analysis",
    badge: "포지셔닝 비교",
    description:
      "더단백, 올프로틴, 마이밀 같은 주요 브랜드가 어떤 포지셔닝을 갖는지 비교합니다.",
    question: "브랜드는 어떤 차이로 선택 기준을 만들까?",
  },
  {
    title: "성분 트렌드",
    href: "/guides/market-insights/ingredient-trends",
    badge: "트렌드",
    description:
      "저당, 워터형, 식물성 같은 키워드가 왜 중요해졌는지와 실제 구매 기준 변화를 함께 봅니다.",
    question: "요즘 단백질 제품은 어떤 방향으로 바뀌고 있을까?",
  },
];

const supportingTopics = [
  {
    title: "단백질 시장 히스토리",
    href: "/guides/market-insights/protein-market-history",
    description: "국내 단백질 시장이 어떤 단계로 확장됐는지 흐름 중심으로 정리합니다.",
  },
  {
    title: "신제품 분석",
    href: "/guides/market-insights/new-product-analysis",
    description: "최근 출시 제품을 어떤 기준으로 읽어야 하는지 실전적으로 설명합니다.",
  },
  {
    title: "글로벌 단백질 시장",
    href: "/guides/market-insights/global-protein-market",
    description: "해외 흐름을 통해 국내 제품과 브랜드 변화 방향을 해석합니다.",
  },
];

const topicEmojis = ["🥤", "🏷️", "📈", "🕰️", "🆕", "🌍"];

type MarketTopicCard = {
  title: string;
  href: string;
  description: string;
  badge?: string;
  question?: string;
};

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
            <span className="rounded-md bg-[#eef4ea] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#4c7a57]">TRACK E</span>
            <span className="text-xs text-[#8b8b8b]">시장과 브랜드를 데이터 관점으로 읽는 인사이트 트랙</span>
            <span className="text-xs text-[#8b8b8b]">6개 주제</span>
          </div>
          <div className="mt-4">
            <h1 className="text-[26px] font-bold leading-tight text-[var(--foreground)] md:text-[30px]">시장 인사이트</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--foreground-muted)]">
              제품 숫자를 보는 단계에서 한 걸음 더 나아가,
              <br />
              시장과 브랜드의 흐름을 해석하는 콘텐츠를 모았습니다.
            </p>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--foreground-muted)]">
              Track E는 검색형 유입과 시장 콘텐츠를 ProteinLab 제품 데이터와 연결하는 허브입니다.
            </p>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 pb-12 md:px-6">
        <section className="mt-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold text-[var(--foreground)]">주제 목록</h2>
              <p className="mt-1 text-xs text-[#8b8b8b]">가장 큰 질문부터 보고 필요한 인사이트 주제로 이동할 수 있습니다.</p>
            </div>
            <div className="hidden rounded-full border border-[#d9e7dc] bg-[#eff7f1] px-3 py-1.5 text-xs font-medium text-[#24543d] md:block">
              읽기 시작: 단백질 RTD 시장
            </div>
          </div>

          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[...featuredTopics, ...supportingTopics].map((topic: MarketTopicCard, index) => (
              <Link
                key={topic.href}
                href={topic.href}
                className="group flex h-full flex-col justify-between rounded-2xl border border-[#d8e2da] bg-[#fffdf8] shadow-[0_10px_24px_rgba(20,40,28,0.05)] transition-colors hover:border-[#cfe1d7]"
              >
                <div className="h-1.5 w-full rounded-t-2xl bg-[#2d6a4f]" />
                <div className="flex flex-1 flex-col justify-between px-5 py-4">
                  <div>
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex flex-wrap gap-1.5">
                        <span className="rounded-full border border-[#d9e4dd] bg-[#f7faf8] px-2.5 py-1 text-[11px] font-medium text-[#496555]">
                          {topic.badge ?? "보조 주제"}
                        </span>
                      </div>
                      <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#d7e6dd] bg-white text-lg">
                        {topicEmojis[index % topicEmojis.length]}
                      </span>
                    </div>

                    <h3 className="mt-3 text-base font-bold text-[#1f5138] transition-colors group-hover:text-[var(--accent)]">{topic.title}</h3>
                    <p className="mt-2 text-[13px] leading-[1.7] text-[var(--foreground-muted)]">{topic.description}</p>

                    <div className="mt-4 rounded-xl border border-[#d7e6dd] bg-[#f4faf6] px-3 py-2.5">
                      <p className="text-[11px] font-semibold text-[#1f5138]">핵심 질문</p>
                      <p className="mt-1 text-[12px] font-medium leading-5 text-[var(--foreground)]">
                        {topic.question ?? "시장 흐름과 브랜드 해석 포인트를 빠르게 확인할 수 있습니다."}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-3">
                    <span className="rounded-full border border-[#d9e4dd] bg-[#f7faf8] px-2.5 py-1 text-[11px] font-medium text-[#496555]">바로 보기</span>
                    <span className="text-xs font-semibold text-[#2f5d46] transition-colors group-hover:text-[#1f4834]">주제 읽기</span>
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
