import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { buildGuideJsonLd } from "@/app/lib/guideJsonLd";

const _pageTitle = "식사대용 단백질 가이드 | 보충용과 뭐가 다를까";
const _pageDesc = "식사대용 단백질 제품과 일반 보충용 제품의 차이를 정리했습니다. 포만감, 칼로리, 지속 가능성 기준으로 어떻게 구분해야 하는지 바로 확인할 수 있습니다.";
export const metadata = {
  title: _pageTitle,
  description: _pageDesc,
  alternates: { canonical: "https://proteinlab.kr/guides/intake-strategy-health/meal-replacement-strategy" },
  openGraph: {
    title: _pageTitle,
    description: _pageDesc,
    url: "https://proteinlab.kr/guides/intake-strategy-health/meal-replacement-strategy",
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

const replacementRows = [
  ["가벼운 RTD", "보충용에 가까움", "단백질이 충분해도 칼로리와 포만감이 식사를 대체하기에는 부족한 경우가 많습니다."],
  ["바 형태 고단백", "상황별 식사 보완", "칼로리와 포만감이 어느 정도 있어 바쁜 일정에서 보완용으로 연결하기 좋습니다."],
  ["바 + 음료 조합", "간편 식사 보완", "출근 직전이나 이동 중 식사 보완이 필요할 때 실전성이 높습니다."],
];

const keyPoints = [
  {
    title: "포만감",
    body: "식사대용은 단백질이 높다고 끝이 아닙니다. 다음 끼니까지 버틸 수 있는 포만감이 있어야 실제 대체가 됩니다.",
  },
  {
    title: "칼로리",
    body: "칼로리가 너무 낮으면 보충용에 가깝고, 너무 높으면 목적에 따라 과할 수 있습니다. 균형이 핵심입니다.",
  },
  {
    title: "지속 가능성",
    body: "매일 반복해야 하는 루틴이라면 맛, 위장 부담, 준비 편의성까지 같이 봐야 오래 갑니다.",
  },
];

const useCases = [
  "출근 전 아침을 자주 거르는 경우",
  "오후 업무 중 간편하게 한 끼를 보완해야 하는 경우",
  "운동 후 바로 식사하기 어렵지만 공복이 길어지는 경우",
];

const replacementChecks = [
  {
    title: "포만감이 먼저",
    body: "식사대용은 단백질 숫자보다 다음 식사 전까지 버티는 체감이 더 중요합니다.",
  },
  {
    title: "칼로리가 너무 낮아도 문제",
    body: "너무 가벼운 RTD는 숫자는 예뻐 보여도 허기가 빨리 올 수 있습니다. 식사대용이라면 총열량도 같이 봐야 합니다.",
  },
  {
    title: "매일 반복 가능한지 확인",
    body: "아침 대용처럼 자주 쓰는 루틴이라면 위 부담과 맛 적응까지 중요합니다. 한 번 먹고 끝날 제품이면 약합니다.",
  },
];

const mealLinks = [
  {
    href: "/guides/product-selection-comparison/protein-category-guide",
    title: "식사대용에 맞는 카테고리부터 고르기",
    body: "음료, 쉐이크, 바 중에서 지금 식사대용에 가장 가까운 카테고리를 먼저 고르고 싶다면 이 허브가 가장 빠릅니다.",
  },
  {
    href: "/guides/product-selection-comparison/morning-protein-shake",
    title: "아침 대용 쉐이크 바로 보기",
    body: "바쁜 아침에 바로 적용할 제품 쪽으로 좁혀보고 싶다면 이 페이지가 식사대용 흐름과 가장 잘 연결됩니다.",
  },
  {
    href: "/guides/intake-strategy-health/weight-management-protein",
    title: "체중 관리 기준 같이 보기",
    body: "식사대용을 감량용으로 쓰는 상황이라면 체중 관리 기준을 같이 봐야 판단이 덜 흔들립니다.",
  },
];

export default function MealReplacementStrategyPage() {
  const jsonLd = buildGuideJsonLd({ title: (metadata as {title:string;description:string}).title, description: (metadata as {title:string;description:string}).description, url: 'https://proteinlab.kr/guides/intake-strategy-health/meal-replacement-strategy' });
  return (
    <div className="min-h-screen bg-white">
            {jsonLd.map((item, i) => (<script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }} />))}
      <Header />
      <section className="w-full border-t border-b bg-[var(--hero-bg)]" style={{ borderColor: "var(--hero-border)" }}>
        <div className="mx-auto max-w-[1200px] px-4 py-5 md:px-6 md:py-6">
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
            <Link href="/guides" className="hover:text-[var(--accent)]">Guides</Link>
            <span>/</span>
            <Link href="/guides/intake-strategy-health" className="hover:text-[var(--accent)]">섭취 전략·건강</Link>
            <span>/</span>
            <span>식사대용 단백질 가이드</span>
          </div>
          <div className="mt-3">
            <span className="rounded-md bg-[#f5f0ea] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#7a5230]">TRACK C</span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
            단백질 제품이 언제 식사대용이 되는지
            <br />
            보충용과 먼저 구분해야 합니다
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            모든 단백질 음료가 식사대용은 아닙니다. 포만감과 칼로리, 다음 끼니까지의 거리까지 함께 봐야 기준이 분명해지고,
            그다음에 내 상황에 맞는 카테고리와 제품 비교로 넘어가야 덜 헷갈립니다.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <div className="space-y-6">
          <section className="rounded-[28px] border border-[#e2ebe4] bg-[#f7fbf8] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">어떤 단백질 제품이 식사대용에 더 가까울까</h2>
            <div className="mt-4 rounded-2xl border border-[#dce8df] bg-white px-4 py-4">
              <p className="text-[11px] font-semibold tracking-[0.08em] text-[#2d6a4f]">MEAL-REPLACEMENT CHECK</p>
              <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">
                단백질 수치만 높다고 식사대용이 되지는 않습니다. 포만감과 총열량, 다음 끼니까지의 거리까지 같이 봐야 합니다.
              </p>
            </div>
            <div className="mt-5 overflow-x-auto">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8e6e3] text-[var(--foreground)]">
                    <th className="px-3 py-3 font-semibold">유형</th>
                    <th className="px-3 py-3 font-semibold">해석</th>
                    <th className="px-3 py-3 font-semibold">실전 포인트</th>
                  </tr>
                </thead>
                <tbody>
                  {replacementRows.map((row) => (
                    <tr key={row[0]} className="border-b border-[#f0eeeb] last:border-b-0">
                      {row.map((cell) => (
                        <td key={cell} className="px-3 py-3 text-[var(--foreground-muted)]">{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">식사대용 단백질은 무엇을 먼저 봐야 덜 헷갈릴까</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {keyPoints.map((item) => (
                <article key={item.title} className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4">
                  <h3 className="text-sm font-semibold text-[#24543d]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{item.body}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">식사대용 단백질이 특히 잘 맞는 상황은 언제일까</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-[var(--foreground-muted)]">
              {useCases.map((item) => (
                <li key={item} className="flex gap-3 rounded-xl border border-[#dce8df] bg-[#f6fbf7] px-4 py-3">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#2d6a4f]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">식사대용으로 볼 때 놓치기 쉬운 기준은 무엇일까</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {replacementChecks.map((item) => (
                <article key={item.title} className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4">
                  <h3 className="text-sm font-semibold text-[#24543d]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{item.body}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">📖 다음으로 무엇을 볼지 바로 고르기</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
              식사대용 기준이 잡혔다면, 이제는 카테고리를 먼저 고를지, 아침 대용 제품으로 바로 좁힐지, 체중 관리 기준까지
              같이 볼지 방향을 나눠서 보는 편이 더 빠릅니다.
            </p>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {mealLinks.map((item) => (
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
