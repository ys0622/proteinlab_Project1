import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "단백질 시장 히스토리 | ProteinLab",
  description: "국내 단백질 시장이 보충제에서 RTD 대중 시장으로, 다시 목적별 세분화로 이어진 흐름을 정리했습니다.",
};

const historyRows = [
  ["2000년대 초반", "보충제 중심", "헬스클럽·운동 목적 소비자 위주. 파우더·쉐이크 중심 시장"],
  ["2010년대", "RTD 성장", "편의점 입점 확대. 일반 소비자 진입. 브랜드 경쟁 본격화"],
  ["2018~2020", "대중화", "셀렉스·더단백 등 대형 브랜드 출시. 시장 규모 급성장"],
  ["2021~현재", "세분화", "저당·워터형·식물성·락토프리 등 목적별 제품으로 분화"],
];

const turningPoints = [
  {
    title: "보충제 → 일상 식품",
    body: "운동하는 사람만 먹는 것에서 건강 관리·다이어트 목적의 일반 소비자까지 확장됐습니다. 편의점이 핵심 유통 채널이 됐어요.",
  },
  {
    title: "편의성이 성장을 이끌었다",
    body: "파우더보다 RTD가 빠르게 커진 이유는 '바로 마실 수 있다'는 사용성입니다. 진입 장벽이 낮아지면서 시장이 급팽창했습니다.",
  },
  {
    title: "세분화가 경쟁의 새 축",
    body: "지금은 단순 고단백보다 저당·워터형·식물성처럼 목적 기반 키워드가 제품 선택을 결정합니다. 브랜드도 이에 맞춰 라인업을 재편하고 있습니다.",
  },
];

const marketSizeRows = [
  ["2018", "약 2,000억 원", "RTD 대중화 시작"],
  ["2020", "약 3,500억 원", "코로나 이후 건강 관심 급증"],
  ["2022", "약 5,000억 원 이상", "세분화·프리미엄화 가속"],
  ["2024~", "지속 성장 추세", "요거트·바 등 카테고리 확장"],
];

const keyInsights = [
  "시장이 커질수록 브랜드 메시지와 실제 성분 사이의 간격도 커질 수 있습니다. 숫자를 직접 확인하는 습관이 필요합니다.",
  "편의점 중심 유통은 접근성이 높지만 가격 경쟁력이 온라인보다 낮을 수 있습니다.",
  "세분화 단계에서는 자신의 목적에 맞는 카테고리를 먼저 정하는 게 제품 선택보다 우선입니다.",
  "시장 히스토리를 알면 신제품이 어떤 포지션을 노리는지도 빠르게 읽을 수 있습니다.",
];

export default function ProteinMarketHistoryPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <section className="w-full border-t border-b bg-[var(--hero-bg)]" style={{ borderColor: "var(--hero-border)" }}>
        <div className="mx-auto max-w-[1200px] px-4 py-5 md:px-6 md:py-6">
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
            <Link href="/guides" className="hover:text-[var(--accent)]">가이드</Link>
            <span>/</span>
            <Link href="/guides/market-insights" className="hover:text-[var(--accent)]">시장 인사이트</Link>
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
            보충제 중심 시장에서 RTD 대중 시장으로, 다시 목적별 세분화로 이어진 흐름을 읽습니다.
            <br />
            시장 구조를 알면 브랜드와 제품을 보는 눈이 달라집니다.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <div className="space-y-6">
          <section className="rounded-[28px] border border-[#e2ebe4] bg-[#f7fbf8] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">시장 변화 4단계</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
              보충제 틈새 시장에서 편의점 대중 시장으로, 지금은 목적별 세분화 경쟁으로 이어졌습니다.
            </p>
            <div className="mt-5 overflow-x-auto rounded-2xl border border-[#ece9e2] bg-white">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8e6e3] text-[var(--foreground)]">
                    <th className="px-3 py-3 font-semibold">시기</th>
                    <th className="px-3 py-3 font-semibold">주요 변화</th>
                    <th className="px-3 py-3 font-semibold">시장 의미</th>
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
            <h2 className="text-xl font-bold text-[var(--foreground)]">이 흐름에서 읽어야 할 3가지 전환점</h2>
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
              정확한 수치는 조사 기관마다 다를 수 있으나, 전반적인 성장 흐름은 일관됩니다.
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
            <p className="mt-3 text-xs text-[var(--foreground-muted)]">※ 시장 규모는 공개 자료 기반 추정치이며 실제와 다를 수 있습니다.</p>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">시장 흐름을 알면 보이는 것들</h2>
            <ul className="mt-4 space-y-3">
              {keyInsights.map((item) => (
                <li key={item} className="flex gap-3 rounded-xl border border-[#dce8df] bg-[#f6fbf7] px-4 py-3 text-sm leading-6 text-[var(--foreground-muted)]">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#2d6a4f]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <div className="flex flex-wrap gap-3">
              <Link
                href="/guides/market-insights/protein-rtd-market"
                className="inline-flex items-center justify-center rounded-lg border border-[#d9e7dc] px-5 py-3 text-sm font-semibold text-[#24543d] transition-colors hover:bg-[#eef7f1]"
              >
                RTD 시장 보기 →
              </Link>
              <Link
                href="/guides/market-insights/global-protein-market"
                className="inline-flex items-center justify-center rounded-lg border border-[#d9e7dc] px-5 py-3 text-sm font-semibold text-[#24543d] transition-colors hover:bg-[#eef7f1]"
              >
                글로벌 시장 보기 →
              </Link>
              <Link
                href="/recommend"
                className="inline-flex items-center justify-center rounded-lg border border-[#2d6a4f] bg-[#2d6a4f] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#24543d]"
              >
                제품 비교하기 →
              </Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
