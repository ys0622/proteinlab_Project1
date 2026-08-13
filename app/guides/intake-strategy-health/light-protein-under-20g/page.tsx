import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import GuideBuySection from "@/app/components/GuideBuySection";
import { buildGuideJsonLd } from "@/app/lib/guideJsonLd";

const pageTitle = "저함량 단백질 음료, 오히려 필요한 사람들이 있습니다";
const pageDescription =
  "마이밀 뉴프로틴, 하이뮨 프로틴 밸런스, 더단백 밸런스처럼 20g 미만 저함량 라인은 대부분 190mL 소용량입니다. 부담 없이 매일 마실 수 있는 이유와 적합한 대상을 정리했습니다.";
const canonical = "https://proteinlab.kr/guides/intake-strategy-health/light-protein-under-20g";

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
  "저함량 라인(9~14g대)은 대부분 190mL 소용량으로 나옵니다. 부피가 작아 소화 부담이 적고 매일 마시기 편합니다.",
  "고단백 제품이 근비대·운동 목적이라면, 저함량 라인은 시니어·회복기·성장기 등 '적게, 자주, 꾸준히' 필요한 상황에 맞습니다.",
  "단백질 수치가 낮다고 나쁜 제품이 아닙니다. 목적이 다를 뿐이며, 오히려 과다 섭취 우려 없이 안전하게 매일 챙길 수 있다는 것이 장점입니다.",
];

const brandRows = [
  ["마이밀 뉴프로틴", "9g", "190mL", "산양유 등 소화 편의성 강조, 가장 가벼운 라인"],
  ["하이뮨 프로틴 밸런스", "10~13g", "190mL", "오리지널·저당·플러스 등 라인 세분화"],
  ["더단백 밸런스", "10g", "190mL", "빙그레 더단백의 저함량 버전"],
  ["셀렉스 프로틴 (로우슈거·당솔브 등)", "12~14g", "190mL", "당 관리와 저함량을 함께 고려한 라인"],
  ["연세유업 세브란스 A2 프로틴", "12g", "190mL", "A2 우유 기반 저함량 제품"],
];

const audienceCards = [
  {
    title: "시니어·회복기 환자",
    body: "한 번에 많은 양을 소화하기 부담스러운 경우, 소용량·저함량 제품을 하루 여러 번 나눠 섭취하는 편이 더 현실적입니다.",
  },
  {
    title: "운동을 하지 않는 일반 소비자",
    body: "근비대 목적이 아니라면 40g 이상은 대부분 필요량을 초과합니다. 저함량 제품이 일상 영양 보충에는 더 적합할 수 있습니다.",
  },
  {
    title: "성장기 청소년·처음 시작하는 사람",
    body: "고함량 제품에 익숙하지 않은 경우, 소화 적응을 위해 저함량·소용량부터 시작하는 것이 안전합니다.",
  },
];

const faqItems = [
  {
    question: "단백질 함량이 낮으면 효과가 없나요?",
    answer:
      "목적에 따라 다릅니다. 근비대가 목적이라면 부족할 수 있지만, 일상 영양 보충이나 소화 부담을 줄이려는 목적이라면 9~14g대도 충분히 의미가 있습니다.",
  },
  {
    question: "왜 저함량 제품은 대부분 190mL인가요?",
    answer:
      "저함량 라인은 부담 없이 자주 마시는 것을 목표로 설계되어 있어, 소용량으로 만들어 소화 부담과 칼로리 부담을 함께 낮추는 경우가 많습니다.",
  },
  {
    question: "고단백 제품과 같이 마셔도 되나요?",
    answer:
      "가능합니다. 예를 들어 운동 후에는 고단백 제품을, 평소에는 저함량 제품을 활용해 하루 총 섭취량을 조절하는 방식도 흔히 사용됩니다.",
  },
];

const relatedLinks = [
  {
    href: "/picks/light-protein-under-20",
    title: "20g 미만 저함량 음료 전체 보기",
    body: "저함량 제품 22종을 한 번에 비교합니다.",
  },
  {
    href: "/guides/intake-strategy-health/high-protein-side-effects",
    title: "고단백 음료 부담·부작용 가이드",
    body: "반대로 40g 이상 고단백 제품이 부담스러운 이유를 정리했습니다.",
  },
  {
    href: "/guides/intake-strategy-health/senior-protein-strategy",
    title: "시니어 단백질 전략",
    body: "중장년·시니어에게 맞는 단백질 섭취 기준을 확인합니다.",
  },
];

export default function LightProteinUnder20gPage() {
  const jsonLd = buildGuideJsonLd({
    title: pageTitle,
    description: pageDescription,
    url: canonical,
    faq: faqItems,
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
            <span>저함량 단백질 음료</span>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="rounded-md bg-[#f5f0ea] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#7a5230]">TRACK C</span>
            <span className="rounded-md bg-[#fbf7f1] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#7a5230]">섭취량 질문</span>
            <span className="text-[11px] font-medium text-[var(--foreground-muted)]">업데이트 2026-07-03</span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[#16412D] md:text-3xl">
            저함량 단백질 음료,
            <br />
            오히려 필요한 사람들이 있습니다.
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            고단백 경쟁이 치열해지는 사이, 마이밀·하이뮨·더단백의 9~14g대 저함량 라인은 조용히 자리를 지키고 있습니다.
            대부분 190mL 소용량으로 나오는 이유와, 어떤 분들에게 오히려 더 잘 맞는지 정리했습니다.
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
            <h2 className="text-xl font-bold text-[var(--foreground)]">주요 저함량 라인 비교</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
              등록된 20g 미만 제품 22개 중 19개(86%)가 190mL입니다. 소용량 설계가 우연이 아니라
              "부담 없이 자주" 마시게 하려는 의도적인 구성이라는 뜻입니다.
            </p>
            <div className="mt-5 overflow-x-auto rounded-2xl border border-[#e8e3da] bg-[#fdfaf5]">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8e3da] text-[var(--foreground)]">
                    <th className="px-3 py-3 font-semibold">라인</th>
                    <th className="px-3 py-3 font-semibold">단백질</th>
                    <th className="px-3 py-3 font-semibold">용량</th>
                    <th className="px-3 py-3 font-semibold">특징</th>
                  </tr>
                </thead>
                <tbody>
                  {brandRows.map((row) => (
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
            <h2 className="text-xl font-bold text-[var(--foreground)]">누구에게 더 잘 맞을까</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {audienceCards.map((item) => (
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
              단백질 함량이 낮다고 열등한 제품이 아닙니다. 190mL 소용량 설계는 소화 부담과 칼로리 부담을
              동시에 낮춰 매일 꾸준히 마실 수 있게 만든 결과입니다. 근비대가 목적이 아니라면, 오히려
              저함량·소용량 제품이 장기적으로 더 지속 가능한 선택일 수 있습니다.
            </p>
          </section>

          <section className="rounded-[28px] border border-[#e5deca] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(38,28,18,0.05)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">자주 묻는 질문</h2>
            <div className="mt-4 space-y-3">
              {faqItems.map((item) => (
                <details key={item.question} className="rounded-xl border border-[#e8e3da] bg-[#fdfaf5] px-4 py-3">
                  <summary className="cursor-pointer text-sm font-semibold text-[var(--foreground)]">{item.question}</summary>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{item.answer}</p>
                </details>
              ))}
            </div>
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
