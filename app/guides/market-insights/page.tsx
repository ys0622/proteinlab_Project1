import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "시장 인사이트 | ProteinLab",
  description:
    "단백질 시장의 흐름, RTD 카테고리, 브랜드 포지셔닝, 성분 트렌드를 Track E에서 정리합니다.",
};

const featuredTopics = [
  {
    title: "단백질 RTD 시장",
    href: "/guides/market-insights/protein-rtd-market",
    badge: "먼저 읽기",
    description:
      "RTD 음료 시장이 왜 커졌는지, 어떤 기준으로 브랜드와 제품을 읽어야 하는지 먼저 정리합니다.",
    question: "RTD 시장은 왜 빠르게 커졌을까?",
    related: ["편의성", "브랜드 경쟁", "세분화"],
  },
  {
    title: "브랜드 분석",
    href: "/guides/market-insights/brand-analysis",
    badge: "포지션 비교",
    description:
      "셀렉스, 더단백, 하이뮨, 닥터유 같은 주요 브랜드가 어떤 소비자 이미지를 갖는지 비교합니다.",
    question: "브랜드는 어떤 차이로 선택을 만들까?",
    related: ["대표 SKU", "가격대", "소비자 인식"],
  },
  {
    title: "성분 트렌드",
    href: "/guides/market-insights/ingredient-trends",
    badge: "트렌드",
    description:
      "고단백, 저당, 워터형, 식물성 같은 키워드가 왜 중요해졌는지 소비자 관점에서 읽습니다.",
    question: "요즘 단백질 제품은 어떤 방향으로 바뀌고 있을까?",
    related: ["저당", "워터형", "식물성"],
  },
];

const supportingTopics = [
  {
    title: "단백질 시장 히스토리",
    href: "/guides/market-insights/protein-market-history",
    description: "국내 단백질 시장이 어떻게 커졌는지 시계열로 읽습니다.",
  },
  {
    title: "신제품 분석",
    href: "/guides/market-insights/new-product-analysis",
    description: "새로 나온 제품을 어떤 기준으로 읽어야 하는지 정리합니다.",
  },
  {
    title: "글로벌 단백질 시장",
    href: "/guides/market-insights/global-protein-market",
    description: "해외 흐름을 통해 국내 제품과 브랜드 변화를 해석합니다.",
  },
];

const readingFlow = [
  ["1단계", "단백질 RTD 시장", "카테고리 구조와 성장 배경 이해"],
  ["2단계", "브랜드 분석", "시장 안에서 브랜드가 어떤 역할을 하는지 비교"],
  ["3단계", "성분 트렌드", "소비자 키워드가 제품 기획을 어떻게 바꾸는지 읽기"],
];

export default function MarketInsightsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <section className="w-full border-t border-b bg-[var(--hero-bg)]" style={{ borderColor: "var(--hero-border)" }}>
        <div className="mx-auto max-w-[1200px] px-4 py-5 md:px-6 md:py-6">
          <div className="flex items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
            <Link href="/guides" className="hover:text-[var(--accent)]">
              가이드
            </Link>
            <span>/</span>
            <span>시장 인사이트</span>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2.5">
            <span className="rounded-md bg-[#f1ebf7] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#6b4d7c]">
              TRACK E
            </span>
            <span className="text-xs text-[#8b8b8b]">시장과 브랜드를 데이터로 읽는 트랙</span>
            <span className="text-xs text-[#8b8b8b]">6개 주제</span>
          </div>
          <div className="mt-4">
            <h1 className="text-[26px] font-bold leading-tight text-[#5a4271] md:text-[30px]">시장 인사이트</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--foreground-muted)]">
              제품 숫자를 읽는 단계를 넘어,
              <br />
              시장과 브랜드의 흐름을 해석하는 콘텐츠를 모았습니다.
            </p>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--foreground-muted)]">
              Track E는 검색 유입용 시장 콘텐츠와
              <br />
              ProteinLab 제품 데이터 해석을 연결하는 허브입니다.
            </p>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 pb-12 md:px-6">
        <div className="space-y-6">
          <section className="mt-5 rounded-2xl border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold text-[var(--foreground)]">먼저 읽으면 좋은 흐름</h2>
                <p className="mt-1 text-xs text-[#8b8b8b]">
                  시장 구조를 먼저 보고, 그다음 브랜드와 성분 트렌드로 넓혀가면 흐름이 더 잘 읽힙니다.
                </p>
              </div>
              <div className="hidden rounded-full border border-[#e7dff0] bg-[#f7f2fb] px-3 py-1.5 text-xs font-medium text-[#6b4d7c] md:block">
                추천 시작점: RTD 시장
              </div>
            </div>
            <div className="mt-5 overflow-x-auto">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8e6e3] text-[var(--foreground)]">
                    <th className="px-3 py-3 font-semibold">순서</th>
                    <th className="px-3 py-3 font-semibold">주제</th>
                    <th className="px-3 py-3 font-semibold">왜 먼저 읽나</th>
                  </tr>
                </thead>
                <tbody>
                  {readingFlow.map((row) => (
                    <tr key={row[0]} className="border-b border-[#f0eeeb] last:border-b-0">
                      {row.map((cell) => (
                        <td key={cell} className="px-3 py-3 text-[var(--foreground-muted)]">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold text-[var(--foreground)]">대표 주제</h2>
                <p className="mt-1 text-xs text-[#8b8b8b]">
                  시장 구조, 브랜드 포지션, 성분 트렌드를 중심으로 가장 먼저 읽을 주제를 앞에 배치했습니다.
                </p>
              </div>
            </div>
            <div className="mt-4 grid gap-4 xl:grid-cols-3">
              {featuredTopics.map((topic) => (
                <Link
                  key={topic.href}
                  href={topic.href}
                  className="group flex min-h-[248px] flex-col justify-between rounded-2xl border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5 transition-colors hover:border-[#d9cde4]"
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
                    <div className="mt-4 rounded-xl border border-[#ece5f3] bg-white px-3 py-3">
                      <p className="text-[11px] font-semibold uppercase tracking-wide text-[#9a8faa]">핵심 질문</p>
                      <p className="mt-1 text-[13px] leading-5 text-[var(--foreground)]">{topic.question}</p>
                    </div>
                    <ul className="mt-3 space-y-1.5">
                      {topic.related.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-[12px] leading-5 text-[var(--foreground-muted)]">
                          <span className="mt-[5px] h-1.5 w-1.5 shrink-0 rounded-full bg-[#9077a6]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="rounded-full bg-[#f4eef9] px-2.5 py-1 text-[11px] font-semibold text-[#6b4d7c]">대표 주제</span>
                    <span className="text-sm font-semibold text-[#5a4271]">주제 보기</span>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-[#e8e6e3] bg-white px-5 py-5">
            <h2 className="text-lg font-bold text-[var(--foreground)]">함께 읽으면 좋은 보조 주제</h2>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              {supportingTopics.map((topic) => (
                <Link
                  key={topic.href}
                  href={topic.href}
                  className="rounded-xl border border-[#f0ebf4] bg-[#fbfafc] px-4 py-4 transition-colors hover:border-[#d9cde4]"
                >
                  <p className="text-sm font-semibold text-[#5a4271]">{topic.title}</p>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{topic.description}</p>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
