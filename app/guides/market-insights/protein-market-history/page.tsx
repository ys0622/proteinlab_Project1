import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "단백질 시장 히스토리 | 보충제에서 RTD 대중화까지",
  description: "국내 단백질 시장이 보충제 중심에서 RTD 대중화, 저당·워터형·식물성 세분화 단계로 어떻게 이동했는지 정리했습니다.",
};

const historyRows = [
  ["2000년대 초반", "보충제 중심", "운동 목적 소비자 위주로 시장이 형성됐습니다."],
  ["2010년대", "RTD 성장 시작", "편의점 채널 확장과 함께 일반 소비자 유입이 늘었습니다."],
  ["2018~2020", "대중화 단계", "더단백 등 대형 브랜드 출시로 시장이 빠르게 커졌습니다."],
  ["2021~현재", "세분화 단계", "저당, 워터형, 식물성 등 목적별 제품 구조로 이동하고 있습니다."],
];

const turningPoints = [
  {
    title: "보충제에서 일상식으로",
    body: "단백질은 운동용 보충제에서 체중 관리와 건강 관리를 위한 일상 제품으로 이동했습니다. 편의성이 대중화를 만들었습니다.",
  },
  {
    title: "편의성이 성장의 분기점",
    body: "RTD가 빠르게 커진 가장 큰 이유는 어디서나 바로 마실 수 있는 접근성이었습니다.",
  },
  {
    title: "세분화가 경쟁의 핵심",
    body: "이제는 단순 고단백보다 저당, 워터형, 식물성 같은 키워드가 더 중요해지고 있습니다.",
  },
];

const marketSizeRows = [
  ["2018", "약 2,000억 원", "RTD 대중화 시작 단계"],
  ["2020", "약 3,500억 원", "코로나 이후 건강관리 수요 급증"],
  ["2022", "약 5,000억 원 이상", "세분화와 채널 확장이 동시에 진행"],
  ["2024~", "지속 성장 추세", "요거트·기능식 인접 카테고리까지 확장"],
];

const keyInsights = [
  "시장이 커질수록 브랜드 메시지와 실제 성분 차이가 커집니다. 숫자를 직접 확인하는 습관이 더 중요해집니다.",
  "편의점 중심 유통은 접근성이 강점이지만 가격과 용량 구성의 차이가 생깁니다.",
  "세분화 단계에서는 먼저 목적에 맞는 카테고리를 고르는 것이 제품 선택보다 중요합니다.",
  "시장 히스토리를 이해하면 신제품이 어떤 포지셔닝으로 나오는지 더 잘 읽을 수 있습니다.",
];

const relatedLinks = [
  {
    href: "/guides/market-insights/new-product-analysis",
    title: "신제품 분석 가이드",
    body: "시장 흐름을 봤다면 다음 신제품이 왜 그렇게 나오는지 읽는 기준은 이 페이지에서 바로 이어집니다.",
  },
  {
    href: "/guides/market-insights/protein-rtd-market",
    title: "RTD 시장 분석",
    body: "보충제 중심에서 RTD 중심으로 옮겨간 흐름을 더 자세히 보려면 이 페이지가 가장 직접적입니다.",
  },
  {
    href: "/guides/product-selection-comparison/protein-category-guide",
    title: "카테고리 선택 가이드",
    body: "시장 히스토리를 실제 제품 카테고리 선택으로 연결하고 싶다면 음료, 쉐이크, 바, 요거트 허브를 같이 보는 편이 좋습니다.",
  },
];

export default function ProteinMarketHistoryPage() {
  return (
    <div className="min-h-screen bg-white">
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
            <span>단백질 시장 히스토리</span>
          </div>
          <div className="mt-3">
            <span className="rounded-md bg-[#eef4ea] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#4c7a57]">TRACK E</span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
            국내 단백질 시장은 어떻게 커졌을까?
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            보충제 중심 시장에서 RTD 대중화 시장으로, 다시 목적별 세분화 단계로 이동한 흐름을 정리했습니다.
            <br />
            시장 구조를 이해하면 브랜드와 제품을 읽는 기준도 더 선명해지고, 현재 비교 페이지에서 왜 이런 제품이 뜨는지도 더 쉽게 읽힙니다.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <div className="space-y-6">
          <section className="rounded-[28px] border border-[#e2ebe4] bg-[#f7fbf8] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">시장 변화 4단계</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
              보충제 중심 시장에서 편의형 단백질 시장으로, 지금은 세분화 경쟁 단계에 들어섰습니다.
            </p>
            <div className="mt-5 overflow-x-auto rounded-2xl border border-[#ece9e2] bg-white">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8e6e3] text-[var(--foreground)]">
                    <th className="px-3 py-3 font-semibold">시기</th>
                    <th className="px-3 py-3 font-semibold">주요 변화</th>
                    <th className="px-3 py-3 font-semibold">시장 해석</th>
                  </tr>
                </thead>
                <tbody>
                  {historyRows.map((row) => (
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
            <h2 className="text-xl font-bold text-[var(--foreground)]">흐름에서 읽어야 할 3가지 전환점</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {turningPoints.map((item) => (
                <article key={item.title} className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4">
                  <p className="text-sm font-semibold text-[#24543d]">{item.title}</p>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{item.body}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-[#f7fbf8] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">시장 규모 추이</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
              정확한 수치는 조사 기관마다 다르지만, 전체 성장 흐름은 일관됩니다.
            </p>
            <div className="mt-5 overflow-x-auto rounded-2xl border border-[#ece9e2] bg-white">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8e6e3] text-[var(--foreground)]">
                    <th className="px-3 py-3 font-semibold">시기</th>
                    <th className="px-3 py-3 font-semibold">추정 규모</th>
                    <th className="px-3 py-3 font-semibold">배경</th>
                  </tr>
                </thead>
                <tbody>
                  {marketSizeRows.map((row) => (
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
            <p className="mt-3 text-xs text-[var(--foreground-muted)]">시장 규모는 공개 자료 기반 추정치이며 실제와 차이가 있을 수 있습니다.</p>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">시장 흐름을 보면 보이는 것들</h2>
            <ul className="mt-4 space-y-3">
              {keyInsights.map((item) => (
                <li key={item} className="flex gap-3 rounded-xl border border-[#dce8df] bg-[#f6fbf7] px-4 py-3 text-sm leading-6 text-[var(--foreground-muted)]">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#2d6a4f]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <blockquote className="mt-5 rounded-xl border border-[#dce8df] bg-[#f7fbf8] px-4 py-4 text-sm leading-6 text-[var(--foreground-muted)]">
              단백질 시장 히스토리는 과거 정리가 아니라, 다음 신제품과 다음 카테고리를 읽는 기준입니다.
            </blockquote>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-[#f7fbf8] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">다음으로 이어서 보기 좋은 가이드</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {relatedLinks.map((item) => (
                <Link key={item.href} href={item.href} className="rounded-2xl border border-[#dce8df] bg-white p-4 transition-colors hover:bg-[#fbfdfb]">
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
