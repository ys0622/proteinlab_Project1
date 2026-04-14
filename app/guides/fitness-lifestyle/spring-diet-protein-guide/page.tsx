import { buildGuideJsonLd } from "@/app/lib/guideJsonLd";
import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

const _pageTitle = "봄 다이어트 단백질 전략 | 가벼운 감량기 제품 기준";
const _pageDesc = "봄철 체중 관리 시즌에는 단백질 음료, 단백질 바, 단백질 요거트를 어떤 기준으로 고르면 좋은지 칼로리, 당류, 포만감 중심으로 정리합니다.";
export const metadata = {
  title: _pageTitle,
  description: _pageDesc,
  alternates: { canonical: "https://proteinlab.kr/guides/fitness-lifestyle/spring-diet-protein-guide" },
  openGraph: {
    title: _pageTitle,
    description: _pageDesc,
    url: "https://proteinlab.kr/guides/fitness-lifestyle/spring-diet-protein-guide",
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

const springSignals = [
  {
    title: "가벼운 감량 수요 증가",
    body: "봄에는 무리한 벌크업보다 가벼운 체중 관리와 식단 정리에 대한 관심이 높아집니다. 그래서 단순 고단백보다 칼로리와 당류 균형이 더 중요해집니다.",
  },
  {
    title: "야외활동 전환",
    body: "겨울보다 활동량이 늘어나면서 식사 사이를 가볍게 보완하는 제품 수요가 같이 커집니다.",
  },
  {
    title: "아침·간식 수요 증가",
    body: "날씨가 가벼워지면서 아침이나 간식으로 부담 없이 먹을 수 있는 단백질 제품을 찾는 경우가 많아집니다.",
  },
];

const categoryRows = [
  ["단백질 음료", "단백질 함량, 칼로리, 당류", "가벼운 보충형인지 식사보완형인지 먼저 구분하는 편이 좋습니다."],
  ["단백질 바", "당류, 총열량, 포만감", "간식형과 식사대용형을 분리해서 봐야 합니다."],
  ["단백질 요거트", "당류, 유형, 100g 기준", "그릭·드링킹·대용량을 나눠 비교하면 더 명확합니다."],
];

const mistakes = [
  "봄 다이어트라고 해서 무조건 저칼로리 제품만 고르는 것",
  "단백질 양만 보고 당류와 포만감을 확인하지 않는 것",
  "식사대용 제품과 가벼운 간식용 제품을 같은 기준으로 비교하는 것",
];

export default function SpringDietProteinGuidePage() {
  const jsonLd = buildGuideJsonLd({ title: (metadata as {title:string;description:string}).title, description: (metadata as {title:string;description:string}).description, url: 'https://proteinlab.kr/guides/fitness-lifestyle/spring-diet-protein-guide' });
  return (
    <div className="min-h-screen bg-white">
      {jsonLd.map((item, i) => (<script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }} />))}
      <Header />

      <section className="w-full border-t border-b bg-[var(--hero-bg)]" style={{ borderColor: "var(--hero-border)" }}>
        <div className="mx-auto max-w-[1200px] px-4 py-5 md:px-6 md:py-6">
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
            <Link href="/guides">Guides</Link>
            <span>/</span>
            <Link href="/guides/fitness-lifestyle">운동 & 라이프스타일</Link>
            <span>/</span>
            <span>봄 다이어트 단백질 전략</span>
          </div>

          <div className="mt-3">
            <span className="rounded-md bg-[#f8ede7] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#8a4b2f]">TRACK D</span>
          </div>

          <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
            봄 다이어트 시즌에는
            <br />
            가벼운 단백질 기준이 더 중요합니다
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            봄은 체중 관리와 야외활동 준비가 겹치는 시즌입니다.
            <br />
            그래서 단백질 함량만이 아니라 칼로리, 당류, 포만감을 함께 보는 흐름이 더 중요해집니다.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <div className="space-y-6">
          <section className="rounded-[28px] border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">봄철 기준이 달라지는 이유</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {springSignals.map((item) => (
                <article key={item.title} className="rounded-2xl border border-[#eaded7] bg-white p-4 shadow-[0_12px_30px_rgba(111,61,38,0.06)]">
                  <p className="text-sm font-semibold text-[#6b3f28]">{item.title}</p>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{item.body}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">카테고리별 봄 체크포인트</h2>
            <div className="mt-5 overflow-x-auto rounded-2xl border border-[#ece9e2] bg-white">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8e6e3] text-[var(--foreground)]">
                    <th className="px-3 py-3 font-semibold">카테고리</th>
                    <th className="px-3 py-3 font-semibold">먼저 볼 기준</th>
                    <th className="px-3 py-3 font-semibold">메모</th>
                  </tr>
                </thead>
                <tbody>
                  {categoryRows.map((row) => (
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

          <section className="rounded-[28px] border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">봄 다이어트에서 흔한 실수</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-[var(--foreground-muted)]">
              {mistakes.map((item) => (
                <li key={item} className="flex gap-3 rounded-xl border border-[#eaded7] bg-white px-4 py-3">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#8a4b2f]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <div className="mt-5 flex flex-wrap gap-2">
              <Link href="/guides/intake-strategy-health/weight-management-protein" className="rounded-full border border-[#eaded7] bg-white px-3 py-1 text-xs font-semibold text-[#8a4b2f]">
                관련 체중 관리용 단백질
              </Link>
              <Link href="/guides/product-selection-comparison/diet-protein-drink-guide" className="rounded-full border border-[#eaded7] bg-white px-3 py-1 text-xs font-semibold text-[#8a4b2f]">
                관련 다이어트 단백질 음료 기준
              </Link>
              <Link href="/guides/product-selection-comparison/diet-protein-shake" className="rounded-full border border-[#eaded7] bg-white px-3 py-1 text-xs font-semibold text-[#8a4b2f]">
                관련 다이어트 쉐이크 비교
              </Link>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
