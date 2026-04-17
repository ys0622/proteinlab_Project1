import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { buildGuideJsonLd } from "@/app/lib/guideJsonLd";

const _pageTitle = "아침 대용 단백질 음료 추천 기준 | 공복·출근길에 보는 법";
const _pageDesc =
  "아침 대용 단백질 음료를 고를 때 단백질 함량, 당류, 칼로리, 포만감, 공복 부담, 출근길 편의성을 어떤 순서로 봐야 하는지 정리했습니다.";

export const metadata = {
  title: _pageTitle,
  description: _pageDesc,
  alternates: { canonical: "https://proteinlab.kr/guides/intake-strategy-health/morning-protein-drink" },
  openGraph: {
    title: _pageTitle,
    description: _pageDesc,
    url: "https://proteinlab.kr/guides/intake-strategy-health/morning-protein-drink",
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

const morningRows = [
  ["공복에 바로 마심", "저당·중간 칼로리 RTD", "너무 진한 40g대보다 20~25g 전후가 부담이 적은 경우가 많습니다."],
  ["출근길 이동 중", "뚜껑형 RTD 또는 드링킹 요거트", "준비와 세척이 필요 없고, 가방 안에서 새지 않는 형태가 중요합니다."],
  ["점심 전 허기가 큼", "식사대용 쉐이크 또는 바 조합", "RTD 한 병만으로 부족하면 식이섬유나 씹는 제품을 함께 봐야 합니다."],
  ["다이어트 중 아침 대체", "저당·저칼로리 + 포만감", "칼로리만 낮으면 오전에 흔들릴 수 있어 당류와 포만감을 같이 봐야 합니다."],
  ["운동 전 가볍게 보충", "가벼운 RTD 또는 워터형", "속이 무거우면 운동 효율이 떨어질 수 있어 지방과 진한 음용감을 함께 봐야 합니다."],
];

const keyChecks = [
  {
    title: "단백질은 20g 전후부터",
    body: "아침에는 한 번에 40g 이상을 채우는 것보다 20~25g 전후를 안정적으로 반복하는 쪽이 현실적입니다. 전날 식사가 부족했거나 운동량이 큰 날만 30g 이상을 검토하면 됩니다.",
  },
  {
    title: "당류는 먼저 거르기",
    body: "공복에 마시는 제품은 당류가 높으면 아침 루틴이 흔들릴 수 있습니다. 단맛 선호가 있더라도 먼저 저당 제품으로 후보를 좁히고, 맛은 그다음에 비교하는 편이 안전합니다.",
  },
  {
    title: "포만감은 칼로리와 같이 보기",
    body: "100kcal 전후 RTD는 가볍지만 식사대용으로는 부족할 수 있습니다. 오전 회의나 이동 시간이 길다면 150~250kcal 구간, 식이섬유, 씹는 제품 조합까지 같이 봐야 합니다.",
  },
];

const mistakes = [
  "아침 대용인데 단백질 함량만 보고 40g 이상 제품부터 고르는 경우",
  "당류와 칼로리는 낮지만 포만감이 약한 제품을 한 끼 대체로 쓰는 경우",
  "출근길에 마실 제품인데 뚜껑, 보관, 휴대성을 확인하지 않는 경우",
  "아침을 완전히 대체하면서 미네랄, 식이섬유, 지방 함량은 확인하지 않는 경우",
  "전날 저녁 식사량이나 당일 운동 여부와 상관없이 매일 같은 고단백 제품만 반복하는 경우",
];

const decisionRows = [
  {
    title: "가볍게 루틴을 만들 목적",
    body: "20g 전후 RTD가 우선입니다. 아침에 부담 없이 반복할 수 있어야 검색에서 말하는 '추천'이 실제 재구매로 이어집니다.",
  },
  {
    title: "아침을 거의 먹지 못하는 목적",
    body: "단백질만 높은 제품보다 150kcal 이상, 식이섬유 또는 씹는 제품 조합을 같이 봐야 합니다. RTD 한 병이 너무 가벼우면 점심 전 간식으로 다시 흔들립니다.",
  },
  {
    title: "운동 전후와 연결되는 목적",
    body: "운동 직후라면 25g 이상도 의미가 있지만, 출근 전 공복 운동이라면 지방과 음용감이 낮은 제품이 더 편합니다. 같은 단백질 음료라도 시간대에 따라 답이 달라집니다.",
  },
];

const finalChecks = [
  "공복에 바로 마실 제품이면 당류와 지방을 먼저 낮춰서 후보를 줄입니다.",
  "한 끼 대체라면 단백질 20g만으로 끝내지 말고 칼로리와 포만감을 같이 봅니다.",
  "출근길용이면 맛보다 뚜껑형, 보관성, 마신 뒤 입안 잔여감까지 확인합니다.",
  "운동 후 보충까지 겸하면 25g 이상으로 올리되, 매일용과 운동용을 분리해서 고릅니다.",
];

const faq = [
  {
    question: "아침 대용 단백질 음료는 단백질 몇 g이 적당한가요?",
    answer: "일반적인 아침 루틴이라면 20~25g 전후부터 보는 것이 현실적입니다. 운동 직후나 전날 식사가 부족한 날은 30g 이상도 후보가 되지만, 공복에 매일 마실 제품이라면 40g 이상은 부담이 될 수 있습니다.",
  },
  {
    question: "단백질 음료 한 병만으로 아침 식사를 대체해도 되나요?",
    answer: "가벼운 보충 목적이면 가능하지만, 완전한 식사 대체로 쓰려면 칼로리, 식이섬유, 지방, 포만감을 함께 봐야 합니다. 100kcal 전후 제품은 점심 전 허기가 빨리 올 수 있습니다.",
  },
  {
    question: "다이어트 중에는 어떤 아침 단백질 음료가 좋나요?",
    answer: "저당, 낮은 칼로리, 충분한 단백질을 먼저 보고 포만감이 부족하면 바나 요거트 조합을 고려하는 편이 좋습니다. 칼로리만 낮은 제품은 오전 간식으로 이어질 가능성이 있습니다.",
  },
];

const relatedLinks = [
  {
    href: "/guides/product-selection-comparison/protein-drink-guide",
    title: "단백질 음료 선택 가이드",
    body: "RTD 음료를 고를 때 단백질, 당류, 칼로리를 어떤 순서로 봐야 하는지 기본 기준을 확인합니다.",
  },
  {
    href: "/guides/product-selection-comparison/morning-protein-products-guide",
    title: "아침 대용 단백질 제품 추천",
    body: "음료뿐 아니라 쉐이크, 바, 요거트까지 카테고리별로 아침 대용 후보를 넓게 비교합니다.",
  },
  {
    href: "/guides/intake-strategy-health/meal-replacement-strategy",
    title: "식사대용 전략",
    body: "아침 한 끼를 대체하려면 보충용과 식사대용의 차이를 먼저 구분하는 것이 좋습니다.",
  },
];

export default function MorningProteinDrinkPage() {
  const jsonLd = buildGuideJsonLd({
    title: (metadata as { title: string; description: string }).title,
    description: (metadata as { title: string; description: string }).description,
    url: "https://proteinlab.kr/guides/intake-strategy-health/morning-protein-drink",
    updatedAt: "2026-04-17",
    faq,
    breadcrumb: [
      { name: "가이드", item: "https://proteinlab.kr/guides" },
      { name: "섭취 전략·건강", item: "https://proteinlab.kr/guides/intake-strategy-health" },
      { name: "아침 대용 단백질 음료", item: "https://proteinlab.kr/guides/intake-strategy-health/morning-protein-drink" },
    ],
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
            <Link href="/guides" className="hover:text-[var(--accent)]">Guides</Link>
            <span>/</span>
            <Link href="/guides/intake-strategy-health" className="hover:text-[var(--accent)]">섭취 전략·건강</Link>
            <span>/</span>
            <span>아침 대용 단백질 음료</span>
          </div>
          <div className="mt-3">
            <span className="rounded-md bg-[#f5f0ea] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#7a5230]">TRACK C</span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
            아침 대용 단백질 음료는
            <br />
            공복 부담과 점심 전 허기까지 같이 봐야 합니다
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            아침에는 단백질 숫자만 높다고 좋은 선택이 아닙니다. 공복에 마셔도 부담이 적은지, 당류가 높지 않은지,
            점심 전까지 허기를 버틸 수 있는지까지 같이 봐야 실제 루틴으로 이어집니다.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <div className="space-y-6">
          <section className="rounded-[28px] border border-[#e2ebe4] bg-[#f7fbf8] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">아침 상황별로 어떤 단백질 음료가 맞을까</h2>
            <div className="mt-5 overflow-x-auto">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8e6e3] text-[var(--foreground)]">
                    <th className="px-3 py-3 font-semibold">상황</th>
                    <th className="px-3 py-3 font-semibold">우선 후보</th>
                    <th className="px-3 py-3 font-semibold">판단 기준</th>
                  </tr>
                </thead>
                <tbody>
                  {morningRows.map((row) => (
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
            <h2 className="text-xl font-bold text-[var(--foreground)]">아침 대용으로 고를 때 먼저 볼 3가지</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {keyChecks.map((item) => (
                <article key={item.title} className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4">
                  <h3 className="text-sm font-semibold text-[#24543d]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{item.body}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">목적별 선택 순서</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {decisionRows.map((item) => (
                <article key={item.title} className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4">
                  <h3 className="text-sm font-semibold text-[#24543d]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{item.body}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">아침 대용 단백질 음료에서 자주 하는 실수</h2>
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
            <h2 className="text-xl font-bold text-[var(--foreground)]">최종 체크리스트</h2>
            <ul className="mt-4 grid gap-3 text-sm leading-6 text-[var(--foreground-muted)] md:grid-cols-2">
              {finalChecks.map((item) => (
                <li key={item} className="rounded-xl border border-[#dce8df] bg-[#f6fbf7] px-4 py-3">{item}</li>
              ))}
            </ul>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">자주 묻는 질문</h2>
            <div className="mt-4 space-y-3">
              {faq.map((item) => (
                <article key={item.question} className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4">
                  <h3 className="text-sm font-semibold text-[#24543d]">{item.question}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{item.answer}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">다음으로 무엇을 볼지 바로 고르기</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
              아침 대용 기준이 잡혔다면 RTD 음료 기준으로 좁힐지, 쉐이크·바·요거트까지 넓힐지, 식사대용 관점으로 다시 볼지 나눠서 보면 됩니다.
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
