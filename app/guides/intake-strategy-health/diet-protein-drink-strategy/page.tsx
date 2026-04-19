import { buildGuideJsonLd } from "@/app/lib/guideJsonLd";
import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

const _pageTitle = "다이어트 중 단백질 음료 어떻게 마실까 | 저당·저칼로리 기준 정리";
const _pageDesc = "다이어트 중 단백질 음료를 언제, 어떤 기준으로 마셔야 하는지 정리합니다. 저당, 저칼로리, 포만감, 식사대용 기준을 함께 봐야 실패 확률이 줄어듭니다.";
export const metadata = {
  title: _pageTitle,
  description: _pageDesc,
  alternates: { canonical: "https://proteinlab.kr/guides/intake-strategy-health/diet-protein-drink-strategy" },
  openGraph: {
    title: _pageTitle,
    description: _pageDesc,
    url: "https://proteinlab.kr/guides/intake-strategy-health/diet-protein-drink-strategy",
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
  ["간식 대체", "저당·저칼로리 RTD", "칼로리 추가를 최소화하면서 단백질만 보충하려는 상황에 맞습니다."],
  ["아침 한 끼 대체", "식사대용형 쉐이크", "포만감과 식이섬유가 같이 있어야 점심 전 허기가 덜 흔들립니다."],
  ["운동 후 보충", "20g대 RTD", "회복이 목적이라면 당류와 칼로리를 과하게 올리지 않는 선에서 단백질을 채우는 편이 낫습니다."],
  ["늦은 밤 허기 해결", "상황 따라 다름", "단순 허기면 제품보다 식사 패턴 수정이 먼저일 수 있습니다."],
];

const selectionSteps = [
  {
    title: "1. 살을 빼는 단계인지 유지 단계인지 먼저 구분",
    body: "감량 초반은 칼로리와 당류를 더 엄격하게 보고, 유지 단계는 포만감과 지속 가능성을 함께 봐야 합니다.",
  },
  {
    title: "2. 보충용과 식사대용을 섞지 않기",
    body: "가벼운 RTD와 식사대용 쉐이크는 역할이 다릅니다. 같은 기준으로 고르면 실패하기 쉽습니다.",
  },
  {
    title: "3. 결국은 계속 마실 수 있는 맛인지 확인",
    body: "다이어트는 한 번 잘 고르는 것보다 반복 가능한 제품을 찾는 일이 더 중요합니다.",
  },
];

const mistakes = [
  "다이어트 중이니까 무조건 가장 칼로리 낮은 제품만 찾는 경우",
  "포만감이 거의 없는 RTD를 식사대용으로 계속 쓰는 경우",
  "단백질 숫자만 보고 당류와 총칼로리를 놓치는 경우",
];

const caseCards = [
  {
    title: "출근길 아침 대체",
    body: "RTD보다 식사대용형 쉐이크가 더 맞는 경우가 많습니다. 칼로리만 낮고 포만감이 약하면 오전에 다시 흔들립니다.",
  },
  {
    title: "운동 후 체중 관리",
    body: "20g 전후의 저당 RTD가 무난합니다. 다이어트 중인데 40g 고단백 제품부터 찾을 필요는 없는 경우가 많습니다.",
  },
  {
    title: "군것질 대신 보충",
    body: "허기 방어가 목적이면 저당 제품 또는 식이섬유가 있는 쉐이크가 더 오래 버티기 쉽습니다.",
  },
];

const relatedLinks = [
  {
    href: "/guides/product-selection-comparison/protein-drink-for-diabetes",
    title: "저당 제품부터 바로 비교하기",
    body: "다이어트 중에는 결국 당류를 먼저 거르는 쪽이 빠릅니다. 저당 기준 제품 비교 페이지로 이어집니다.",
  },
  {
    href: "/guides/product-selection-comparison/diet-protein-shake",
    title: "포만감 중심 쉐이크 보러가기",
    body: "식사대용 비중이 높다면 RTD보다 쉐이크가 더 잘 맞을 수 있습니다. 포만감 중심으로 다시 비교할 수 있습니다.",
  },
  {
    href: "/guides/intake-strategy-health/weight-management-protein",
    title: "체중 관리 기준 같이 보기",
    body: "제품 하나보다 전체 루틴이 먼저라면 체중 관리용 단백질 기준 페이지를 같이 보는 편이 더 효율적입니다.",
  },
];

export default function DietProteinDrinkStrategyPage() {
  const jsonLd = buildGuideJsonLd({ title: (metadata as {title:string;description:string}).title, description: (metadata as {title:string;description:string}).description, url: 'https://proteinlab.kr/guides/intake-strategy-health/diet-protein-drink-strategy' });
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
            <span>다이어트 중 단백질 음료 어떻게 마실까</span>
          </div>
          <div className="mt-3">
            <span className="rounded-md bg-[#f5f0ea] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#7a5230]">TRACK C</span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
            다이어트 중 단백질 음료는 도움이 됩니다.
            <br />
            다만 저당·저칼로리와 포만감을 함께 봐야 오래 갑니다.
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            감량 중에는 단백질 음료가 편리한 도구가 될 수 있지만, 보충용 RTD와 식사대용형 제품을 같은 눈으로 보면
            실패하기 쉽습니다. 다이어트에서는 단백질 양만이 아니라 당류, 칼로리, 포만감, 반복 가능성을 같이 보고 그다음에
            내 상황에 맞는 제품군으로 넘어가야 합니다.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <div className="space-y-6">
          <section className="rounded-[28px] border border-[#e2ebe4] bg-[#f7fbf8] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">다이어트 중 단백질 음료는 어떤 상황에서 다르게 봐야 할까</h2>
            <div className="mt-5 overflow-x-auto">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8e6e3] text-[var(--foreground)]">
                    <th className="px-3 py-3 font-semibold">상황</th>
                    <th className="px-3 py-3 font-semibold">우선 제품</th>
                    <th className="px-3 py-3 font-semibold">이유</th>
                  </tr>
                </thead>
                <tbody>
                  {compareRows.map((row) => (
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
            <h2 className="text-xl font-bold text-[var(--foreground)]">다이어트 중 단백질 음료는 어떤 순서로 고르면 쉬울까</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {selectionSteps.map((item) => (
                <article key={item.title} className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4">
                  <h3 className="text-sm font-semibold text-[#24543d]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{item.body}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">아침 대체, 운동 후, 군것질 대체는 어떻게 달라질까</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {caseCards.map((item) => (
                <article key={item.title} className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4">
                  <h3 className="text-sm font-semibold text-[#24543d]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{item.body}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">다이어트 중 단백질 음료에서 가장 많이 하는 실수는 무엇일까</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-[var(--foreground-muted)]">
              {mistakes.map((item) => (
                <li key={item} className="flex gap-3 rounded-xl border border-[#dce8df] bg-[#f6fbf7] px-4 py-3">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#2d6a4f]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">📖 다음으로 무엇을 볼지 바로 고르기</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
              지금 기준이 잡혔다면 다음은 저당 제품부터 거를지, 포만감 중심 쉐이크를 볼지, 체중 관리 기준까지 같이 볼지
              방향을 정하면 됩니다.
            </p>
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
