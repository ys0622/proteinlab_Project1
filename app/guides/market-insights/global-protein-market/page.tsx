import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { buildGuideJsonLd } from "@/app/lib/guideJsonLd";

const _pageTitle = "글로벌 단백질 시장 비교 | 미국·유럽·일본과 국내 흐름 차이";
const _pageDesc = "미국, 유럽, 일본, 국내 단백질 시장이 어떻게 다른지 비교하고 국내에서 다음으로 커질 카테고리를 읽는 기준을 정리했습니다.";
export const metadata = {
  title: _pageTitle,
  description: _pageDesc,
  alternates: { canonical: "https://proteinlab.kr/guides/market-insights/global-protein-market" },
  openGraph: {
    title: _pageTitle,
    description: _pageDesc,
    url: "https://proteinlab.kr/guides/market-insights/global-protein-market",
    type: "website" as const,
    locale: "ko_KR",
    siteName: "ProteinLab",
  },
  twitter: {
    card: "summary" as const,
    title: _pageTitle,
    description: _pageDesc,
  },
};

const compareRows = [
  ["미국", "보충제·RTD·바 모두 성숙", "기능별 세분화와 식물성 제품군이 매우 다양합니다."],
  ["유럽", "식물성·클린라벨 강세", "비건, 친환경, 프리미엄 포지셔닝이 강합니다."],
  ["일본", "시니어 건강·기능식 중심", "고령층 대상 제품과 건강 인식이 강점입니다."],
  ["국내", "RTD 중심 대중화 + 세분화 진행", "편의점 채널 강점과 워터형 확장 속도가 빠릅니다."],
];

const globalTrendCards = [
  {
    title: "식물성 단백질 확장",
    body: "미국과 유럽에서 강한 흐름으로, 국내에서도 점진적으로 유입되고 있습니다.",
    region: "미국·유럽",
  },
  {
    title: "퍼포먼스 중심 세분화",
    body: "운동 목적별로 회복, 체중 관리, 근육 유지 라인이 더 세분화되고 있습니다.",
    region: "미국",
  },
  {
    title: "시니어 단백질 강화",
    body: "고령화가 빠른 지역에서는 시니어용 단백질 제품이 먼저 발달하고 있습니다.",
    region: "일본·유럽",
  },
  {
    title: "간편 식사형 확장",
    body: "단백질 음료가 바깥 활동뿐 아니라 식사대체 맥락으로도 확대되고 있습니다.",
    region: "글로벌",
  },
];

const domesticImplications = [
  "해외에서 먼저 성장한 식물성·클린라벨 트렌드는 국내에서도 2~3년 내 주요 선택축이 될 가능성이 있습니다.",
  "고령화 속도가 빠른 국내에서는 시니어 단백질 시장도 더 크게 확장될 수 있습니다.",
  "글로벌 브랜드 유입이 많아질수록 성분 설명력과 가격 경쟁이 더 중요해질 수 있습니다.",
  "RTD 중심 국내 시장은 앞으로 바·요거트·기능식까지 더 넓게 확장될 가능성이 높습니다.",
];

const relatedLinks = [
  {
    href: "/guides/market-insights/protein-rtd-market",
    title: "국내 RTD 시장 분석",
    body: "글로벌 흐름을 본 뒤 국내에서 가장 먼저 커진 RTD 구조를 바로 확인하면 연결이 더 자연스럽습니다.",
  },
  {
    href: "/guides/market-insights/protein-drink-trend-2026",
    title: "2026 국내 단백질 음료 트렌드",
    body: "글로벌 트렌드가 국내에서 지금 어떻게 나타나고 있는지 현재 시점으로 좁혀서 보고 싶다면 이 페이지가 맞습니다.",
  },
  {
    href: "/guides/product-selection-comparison/protein-category-guide",
    title: "카테고리 선택 가이드",
    body: "시장 흐름을 읽은 뒤 실제로 음료, 쉐이크, 바, 요거트 중 어디가 커지고 있는지 제품 관점으로 다시 보려면 이 허브가 좋습니다.",
  },
];

export default function GlobalProteinMarketPage() {
  const jsonLd = buildGuideJsonLd({ title: (metadata as {title:string;description:string}).title, description: (metadata as {title:string;description:string}).description, url: 'https://proteinlab.kr/guides/market-insights/global-protein-market' });
  return (
    <div className="min-h-screen bg-white">
            {jsonLd.map((item, i) => (<script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }} />))}
      <Header />
      <section className="w-full border-t border-b bg-[var(--hero-bg)]" style={{ borderColor: "var(--hero-border)" }}>
        <div className="mx-auto max-w-[1200px] px-4 py-5 md:px-6 md:py-6">
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
            <Link href="/guides" className="hover:text-[var(--accent)]">
              Guides
            </Link>
            <span>/</span>
            <Link href="/guides/market-insights" className="hover:text-[var(--accent)]">
              시장 인사이트
            </Link>
            <span>/</span>
            <span>글로벌 단백질 시장</span>
          </div>
          <div className="mt-3">
            <span className="rounded-md bg-[#eef4ea] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#4c7a57]">TRACK E</span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
            글로벌 단백질 시장과 국내는 어떻게 다를까?
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            해외 시장 흐름을 보면 국내 시장이 어디쯤 와 있고, 앞으로 어떤 방향으로 세분화될지 읽을 수 있습니다.
            <br />
            글로벌 트렌드는 국내 제품 변화의 선행 지표 역할을 하고, 실제 국내 비교 페이지를 해석할 때도 기준점이 됩니다.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <div className="space-y-6">
          <section className="rounded-[28px] border border-[#e2ebe4] bg-[#f7fbf8] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">국가별 단백질 시장 비교</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
              각 시장의 성숙 단계와 세분화 특성을 비교하면 국내 시장의 현재 위치가 보입니다.
            </p>
            <div className="mt-5 overflow-x-auto rounded-2xl border border-[#ece9e2] bg-white">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8e6e3] text-[var(--foreground)]">
                    <th className="px-3 py-3 font-semibold">국가</th>
                    <th className="px-3 py-3 font-semibold">시장 특징</th>
                    <th className="px-3 py-3 font-semibold">해석</th>
                  </tr>
                </thead>
                <tbody>
                  {compareRows.map((row) => (
                    <tr key={row[0]} className="border-b border-[#f0eeeb] last:border-b-0">
                      {row.map((cell, i) => (
                        <td key={cell} className={`px-3 py-3 ${i === 0 ? "font-semibold text-[var(--foreground)]" : "text-[var(--foreground-muted)]"}`}>
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">글로벌 대표 트렌드 4가지</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
              해외에서 먼저 성장한 흐름은 국내에서도 시차를 두고 들어오는 경우가 많습니다.
            </p>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {globalTrendCards.map((card) => (
                <article key={card.title} className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-[#24543d]">{card.title}</p>
                    <span className="rounded-full bg-[#eff7f1] px-2 py-0.5 text-[10px] font-semibold text-[#2d6a4f]">{card.region}</span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{card.body}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-[#f7fbf8] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">국내 시장에 주는 시사점</h2>
            <ul className="mt-4 space-y-3">
              {domesticImplications.map((item) => (
                <li key={item} className="flex gap-3 rounded-xl border border-[#dce8df] bg-white px-4 py-3 text-sm leading-6 text-[var(--foreground-muted)]">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#2d6a4f]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <blockquote className="mt-5 rounded-xl border border-[#dce8df] bg-[#f7fbf8] px-4 py-4 text-sm leading-6 text-[var(--foreground-muted)]">
              글로벌 시장 비교의 목적은 해외 사례를 그대로 따라가는 것이 아니라, 국내에서 다음으로 커질 카테고리를 읽는 데 있습니다.
            </blockquote>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">국내 비교로 이어서 보기</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {relatedLinks.map((item) => (
                <Link key={item.href} href={item.href} className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4 transition-colors hover:bg-white">
                  <h3 className="text-sm font-semibold text-[#24543d]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{item.body}</p>
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
