import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import GuideBuySection from "@/app/components/GuideBuySection";
import { buildGuideJsonLd } from "@/app/lib/guideJsonLd";

const pageTitle = "단백질 50g 한 번에 먹어도 될까? 초고함량 음료 섭취 기준";
const pageDescription =
  "단백질 50g을 한 번에 섭취해도 되는지, 어떤 사람에게 필요하고 어떤 경우에는 20~30g 제품이 더 나은지 실전 기준으로 정리했습니다.";
const canonical = "https://proteinlab.kr/guides/intake-strategy-health/protein-50g-at-once";

export const metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: canonical,
    type: "article" as const,
    locale: "ko_KR",
    siteName: "ProteinLab",
  },
  twitter: {
    card: "summary" as const,
    title: pageTitle,
    description: pageDescription,
  },
};

const quickAnswer = [
  "운동량이 많고 하루 단백질 목표가 높은 사람에게는 50g 제품이 선택지가 될 수 있습니다.",
  "일반적인 아침 대용이나 가벼운 간식 목적이라면 20~30g 제품이 더 현실적인 경우가 많습니다.",
  "신장질환 등 단백질 섭취 제한이 필요한 상태라면 고함량 제품을 임의로 늘리지 말고 전문가 상담이 먼저입니다.",
];

const bodyWeightRows = [
  ["50kg", "60~80g", "50g 한 병은 하루 목표의 상당 부분을 차지합니다."],
  ["60kg", "72~96g", "식사 단백질까지 고려하면 50g은 목적형 보충에 가깝습니다."],
  ["70kg", "84~112g", "운동량이 큰 날에는 후보가 될 수 있지만 매일용인지는 따져봐야 합니다."],
  ["80kg", "96~128g", "근력 운동량이 많다면 한 번 보충량으로 검토할 수 있습니다."],
];

const timingRows = [
  ["근력 운동 직후", "가능", "운동 강도와 하루 총량이 높다면 40~50g대 제품이 의미 있습니다."],
  ["아침 공복", "보수적", "공복 소화감이 부담될 수 있어 20~30g대부터 보는 편이 안전합니다."],
  ["잠들기 직전", "대체로 비추천", "소화 부담과 칼로리 부담이 같이 커질 수 있습니다."],
  ["식사 직후 추가", "대부분 불필요", "이미 식사 단백질을 먹었다면 총량이 과해질 수 있습니다."],
];

const mistakeCards = [
  {
    title: "단백질은 많을수록 좋다고 보는 경우",
    body: "총량이 높은 제품은 강력하지만, 내 하루 목표와 식사 구성을 넘어서면 효율보다 부담이 커질 수 있습니다.",
  },
  {
    title: "50g 제품을 식사대용으로만 보는 경우",
    body: "단백질은 충분해도 식이섬유, 탄수화물, 지방, 미량영양소가 한 끼 구성에 충분한지는 따로 봐야 합니다.",
  },
  {
    title: "칼로리와 당류를 나중에 보는 경우",
    body: "초고함량 제품일수록 칼로리, 당류, 지방, 나트륨을 함께 확인해야 실제 선택이 흔들리지 않습니다.",
  },
];

const relatedLinks = [
  {
    href: "/guides/product-selection-comparison/high-protein-50g-comparison",
    title: "50g 이상 단백질 음료 비교",
    body: "실제 등록 제품 기준으로 52g 제품과 49g·45g 제품을 함께 비교합니다.",
  },
  {
    href: "/guides/product-selection-comparison/high-protein-40g-comparison",
    title: "40g 이상 고단백 RTD 비교",
    body: "50g이 부담스러울 때 바로 아래 구간의 고단백 제품을 확인합니다.",
  },
  {
    href: "/tools/calculator",
    title: "하루 단백질 섭취량 계산기",
    body: "체중과 활동량 기준으로 내 하루 목표량을 먼저 계산합니다.",
  },
];

export default function Protein50gAtOncePage() {
  const jsonLd = buildGuideJsonLd({
    title: pageTitle,
    description: pageDescription,
    url: canonical,
  });

  return (
    <div className="min-h-screen bg-white">
      {jsonLd.map((item, index) => (
        <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }} />
      ))}
      <Header />
      <section className="w-full border-t border-b bg-[var(--hero-bg)]" style={{ borderColor: "var(--hero-border)" }}>
        <div className="mx-auto max-w-[1200px] px-4 py-5 md:px-6 md:py-6">
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
            <Link href="/guides" className="hover:text-[var(--accent)]">가이드</Link>
            <span>/</span>
            <Link href="/guides/intake-strategy-health" className="hover:text-[var(--accent)]">섭취 전략 & 건강</Link>
            <span>/</span>
            <span>단백질 50g 한 번에</span>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="rounded-md bg-[#f5f0ea] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#7a5230]">TRACK C</span>
            <span className="rounded-md bg-[#fbf7f1] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#7a5230]">섭취량 질문</span>
            <span className="text-[11px] font-medium text-[var(--foreground-muted)]">업데이트 2026-05-29</span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[#16412D] md:text-3xl">
            단백질 50g,
            <br />
            한 번에 먹어도 되는 사람과 아닌 사람이 나뉩니다.
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            50g 이상 초고함량 단백질 음료가 나오면서 “한 번에 이렇게 많이 먹어도 되나”라는 질문이 늘었습니다.
            답은 단순하지 않습니다. 운동량, 체중, 하루 총량, 식사 구성에 따라 좋은 선택이 될 수도 있고 과한 보충이 될 수도 있습니다.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <div className="space-y-6">
          <section className="rounded-[28px] border border-[#e5deca] bg-[#fdfaf5] px-5 py-5 shadow-[0_18px_50px_rgba(38,28,18,0.05)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">짧게 답하면</h2>
            <ul className="mt-4 space-y-3">
              {quickAnswer.map((item) => (
                <li key={item} className="flex gap-3 rounded-xl border border-[#e8e3da] bg-white px-4 py-3 text-sm leading-6 text-[var(--foreground-muted)]">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#7a5230]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-[28px] border border-[#e5deca] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(38,28,18,0.05)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">체중별로 보면 50g은 어느 정도일까</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
              아래 표는 운동량이 있는 성인이 하루 체중 1kg당 약 1.2~1.6g을 목표로 잡는 경우를 단순 계산한 예시입니다.
              개인 질환, 식단, 운동량에 따라 달라질 수 있습니다.
            </p>
            <div className="mt-5 overflow-x-auto rounded-2xl border border-[#e8e3da] bg-[#fdfaf5]">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8e3da] text-[var(--foreground)]">
                    <th className="px-3 py-3 font-semibold">체중</th>
                    <th className="px-3 py-3 font-semibold">하루 목표 예시</th>
                    <th className="px-3 py-3 font-semibold">50g 한 병의 의미</th>
                  </tr>
                </thead>
                <tbody>
                  {bodyWeightRows.map((row) => (
                    <tr key={row[0]} className="border-b border-[#f0ece5] last:border-b-0">
                      {row.map((cell) => (
                        <td key={cell} className="px-3 py-3 text-[var(--foreground-muted)]">{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e5deca] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(38,28,18,0.05)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">언제 마시면 괜찮고 언제는 부담스러울까</h2>
            <div className="mt-5 overflow-x-auto rounded-2xl border border-[#e8e3da] bg-[#fdfaf5]">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8e3da] text-[var(--foreground)]">
                    <th className="px-3 py-3 font-semibold">타이밍</th>
                    <th className="px-3 py-3 font-semibold">판단</th>
                    <th className="px-3 py-3 font-semibold">이유</th>
                  </tr>
                </thead>
                <tbody>
                  {timingRows.map((row) => (
                    <tr key={row[0]} className="border-b border-[#f0ece5] last:border-b-0">
                      {row.map((cell) => (
                        <td key={cell} className="px-3 py-3 text-[var(--foreground-muted)]">{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e5deca] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(38,28,18,0.05)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">50g 제품을 볼 때 흔한 실수</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {mistakeCards.map((item) => (
                <article key={item.title} className="rounded-2xl border border-[#e8e3da] bg-[#fdfaf5] p-4">
                  <h3 className="text-sm font-semibold text-[#7a5230]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{item.body}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e5deca] bg-[#fdfaf5] px-5 py-5 shadow-[0_18px_50px_rgba(38,28,18,0.05)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">결론</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
              단백질 50g을 한 번에 먹는 것 자체가 무조건 문제는 아닙니다. 다만 “운동 후 부족분을 채우는 목적”인지,
              “식사를 자주 놓쳐서 보완하는 목적”인지, “이미 식사에서 충분히 먹고 있는데 추가하는 것”인지에 따라 판단이 달라집니다.
              제품을 고르기 전에는 하루 목표량을 먼저 잡고, 그 다음 20g·40g·50g 중 어떤 구간이 필요한지 좁히는 순서가 가장 안정적입니다.
            </p>
          </section>

          <section className="rounded-[28px] border border-[#e5deca] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(38,28,18,0.05)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">이어 읽기</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {relatedLinks.map((item) => (
                <Link key={item.href} href={item.href} className="rounded-2xl border border-[#e8e3da] bg-[#fdfaf5] p-4 transition-colors hover:bg-white">
                  <h3 className="text-sm font-semibold text-[#7a5230]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{item.body}</p>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>
      <GuideBuySection />
      <Footer />
    </div>
  );
}
