import { buildGuideJsonLd } from "@/app/lib/guideJsonLd";
import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

const _pageTitle = "운동 안 해도 단백질 음료 마셔도 될까";
const _pageDesc = "운동을 안 해도 단백질 음료를 마셔도 되는지, 어떤 상황에서 필요하고 어떤 제품이 부담이 적은지 실용적으로 정리했습니다.";
export const metadata = {
  title: _pageTitle,
  description: _pageDesc,
  alternates: { canonical: "https://proteinlab.kr/guides/intake-strategy-health/protein-drink-without-exercise" },
  openGraph: {
    title: _pageTitle,
    description: _pageDesc,
    url: "https://proteinlab.kr/guides/intake-strategy-health/protein-drink-without-exercise",
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

const situations = [
  ["아침을 자주 거를 때", "식사 보완용에 가까운 제품", "식사 공백이 길어지면 단백질보다 포만감과 지속성이 먼저 중요합니다."],
  ["단백질 반찬을 자주 못 챙길 때", "20g 전후 RTD", "매일 고기나 계란을 충분히 못 먹는다면 가장 무난한 보완 수단입니다."],
  ["다이어트 중 허기가 심할 때", "저당·저칼로리 제품", "간식을 대신하기 좋지만 식사 전체를 대체하지 않는 편이 안전합니다."],
  ["부모님·중장년층 보완용", "식사 보완형 또는 부담 적은 제품", "건강 유지 목적이라면 운동용 고단백보다 생활 보완형 제품이 더 맞습니다."],
];

const dontNeedCases = [
  "식사에서 이미 단백질을 충분히 먹고 있다면 굳이 추가로 마실 필요는 없습니다.",
  "단백질 음료를 무조건 자주 마시는 습관은 필요 이상 칼로리로 이어질 수 있습니다.",
  "운동 목적이 아니라면 40g 같은 초고단백 제품부터 찾을 필요는 거의 없습니다.",
];

const compareLinks = [
  {
    href: "/guides/product-selection-comparison/protein-drink-beginners-guide",
    title: "부담 적은 입문 제품부터 보기",
    body: "운동 안 해도 부담 없이 시작할 수 있는 제품부터 보고 싶다면 이 페이지가 가장 빠릅니다.",
  },
  {
    href: "/guides/intake-strategy-health/diet-protein-drink-strategy",
    title: "체중 관리 기준 같이 보기",
    body: "운동은 안 하지만 체중 관리 목적이라면 저당·저칼로리 기준부터 보는 편이 더 정확합니다.",
  },
  {
    href: "/guides/product-selection-comparison/protein-drink-for-50s",
    title: "중장년 보완용 제품 보기",
    body: "건강 유지나 식사 보완 목적이라면 50대·중장년 기준 페이지가 바로 이어집니다.",
  },
  {
    href: "/guides/intake-strategy-health/protein-drink-meal-replacement",
    title: "식사 보완 기준 더 보기",
    body: "운동용이 아니라 아침 공백이나 한 끼 보완용인지 더 분명하게 보고 싶다면 이 페이지가 이어집니다.",
  },
];

const commonMistakes = [
  "운동을 안 하니 무조건 단백질 음료가 불필요하다고 단정하는 경우",
  "바로 건강식이라고 생각하고 식사를 보조가 아니라 대체로 계속 마시는 경우",
  "20g 전후 제품이면 충분한 상황인데 40g대 제품부터 찾는 경우",
];

const selectionSteps = [
  ["1단계", "식사에서 실제로 부족한지 확인", "고기, 계란, 유제품, 콩류가 하루에 얼마나 들어가는지 먼저 떠올려보는 편이 좋습니다."],
  ["2단계", "보완용인지 식사대용인지 구분", "가볍게 채울 건지, 한 끼 공백을 막을 건지에 따라 제품군이 달라집니다."],
  ["3단계", "마지막에 브랜드 비교", "셀렉스, 하이뮨, 뉴케어 같은 브랜드 비교는 목적을 먼저 정한 뒤에 보는 편이 더 빠릅니다."],
];

export default function ProteinDrinkWithoutExercisePage() {
  const jsonLd = buildGuideJsonLd({ title: (metadata as {title:string;description:string}).title, description: (metadata as {title:string;description:string}).description, url: 'https://proteinlab.kr/guides/intake-strategy-health/protein-drink-without-exercise' });
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
            <span>운동 안 해도 단백질 음료</span>
          </div>
          <div className="mt-3">
            <span className="rounded-md bg-[#f5f0ea] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#7a5230]">TRACK C</span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
            운동 안 해도 단백질 음료 마셔도 됩니다.
            <br />
            다만 운동용이 아니라 식사 보완 기준으로 봐야 합니다.
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            단백질 음료는 운동하는 사람만 마시는 제품이 아닙니다. 아침을 자주 거르거나, 식사에서 단백질이 부족하거나,
            부모님 건강 보완용이 필요할 때도 충분히 쓸 수 있습니다. 다만 40g 고단백 제품보다 현재 생활에서 어떤 공백을
            메울지 먼저 정하고 제품을 고르는 것이 더 중요합니다.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <div className="space-y-6">
          <section className="rounded-[28px] border border-[#e2ebe4] bg-[#f7fbf8] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">운동 안 해도 단백질 음료가 도움이 되는 상황은 언제일까</h2>
            <div className="mt-5 overflow-x-auto">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8e6e3] text-[var(--foreground)]">
                    <th className="px-3 py-3 font-semibold">상황</th>
                    <th className="px-3 py-3 font-semibold">우선 기준</th>
                    <th className="px-3 py-3 font-semibold">이유</th>
                  </tr>
                </thead>
                <tbody>
                  {situations.map((row) => (
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
            <h2 className="text-xl font-bold text-[var(--foreground)]">운동 안 한다면 무엇부터 보면 덜 헷갈릴까</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {[
                ["1. 단백질 총량", "처음엔 20g 전후 제품부터 봐도 충분한 경우가 많습니다."],
                ["2. 당류와 칼로리", "운동량이 적으면 저당·저칼로리 기준이 더 중요해집니다."],
                ["3. 포만감과 소화감", "건강 보완용이라면 한 번에 많이 마시는 제품보다 편하게 마실 수 있는 제품이 더 맞습니다."],
              ].map((item) => (
                <article key={item[0]} className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4">
                  <h3 className="text-sm font-semibold text-[#24543d]">{item[0]}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{item[1]}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">운동 안 할 때 단백질 음료는 어떤 순서로 고르면 될까</h2>
            <div className="mt-5 overflow-x-auto">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8e6e3] text-[var(--foreground)]">
                    <th className="px-3 py-3 font-semibold">단계</th>
                    <th className="px-3 py-3 font-semibold">무엇을 볼까</th>
                    <th className="px-3 py-3 font-semibold">해석</th>
                  </tr>
                </thead>
                <tbody>
                  {selectionSteps.map((row) => (
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
            <h2 className="text-xl font-bold text-[var(--foreground)]">운동 안 할 때 굳이 더 마실 필요 없는 경우는 언제일까</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-[var(--foreground-muted)]">
              {dontNeedCases.map((item) => (
                <li key={item} className="flex gap-3 rounded-xl border border-[#dce8df] bg-[#f6fbf7] px-4 py-3">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#2d6a4f]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">운동 안 할 때 단백질 음료에서 많이 하는 실수는 무엇일까</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-[var(--foreground-muted)]">
              {commonMistakes.map((item) => (
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
              지금 기준이 잡혔다면 다음은 부담 적은 입문 제품부터 볼지, 체중 관리 기준을 같이 볼지, 중장년 보완용으로
              좁힐지 방향을 정하면 됩니다.
            </p>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {compareLinks.map((item) => (
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
