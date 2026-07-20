import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import GuideBuySection from "@/app/components/GuideBuySection";
import { buildGuideJsonLd } from "@/app/lib/guideJsonLd";

const pageTitle = "단백질 음료 살찌나요? | 칼로리·당류·대체 섭취 기준";
const pageDescription =
  "단백질 음료가 살찌는지 궁금한 사람을 위해 칼로리, 당류, 식사 대체 여부, 운동량 기준으로 체중 관리 관점의 선택법을 정리했습니다.";
const canonical = "https://proteinlab.kr/guides/intake-strategy-health/protein-drink-weight-gain";

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
  twitter: { card: "summary" as const, title: pageTitle, description: pageDescription },
};

const rows = [
  ["식사에 추가로 마신다", "살이 찔 가능성 증가", "제품도 칼로리가 있으므로 하루 총섭취량이 늘어납니다."],
  ["간식 대신 마신다", "제품에 따라 도움 가능", "기존 간식보다 칼로리와 당류가 낮으면 체중 관리에 유리할 수 있습니다."],
  ["식사 대신 계속 마신다", "주의 필요", "일시적으로 칼로리는 줄 수 있지만 일반 식사의 영양 다양성을 놓칠 수 있습니다."],
  ["운동 후 보충으로 마신다", "목표에 따라 다름", "근력 운동량이 있다면 회복 보충 목적이지만, 운동량이 적으면 칼로리 관리가 더 중요합니다."],
];

const nextLinks = [
  {
    href: "/topics/diet-protein-drink",
    title: "다이어트 단백질 음료",
    body: "칼로리와 당류 기준으로 다시 좁혀봅니다.",
  },
  {
    href: "/guides/product-selection-comparison/low-sugar-protein-drink-guide",
    title: "저당 단백질 음료 가이드",
    body: "당류가 낮은 제품군을 먼저 확인합니다.",
  },
  {
    href: "/guides/intake-strategy-health/protein-drink-without-exercise",
    title: "운동 안 해도 마셔도 될까",
    body: "운동량이 적을 때의 섭취 기준을 함께 봅니다.",
  },
];

const faq = [
  {
    question: "단백질 음료는 마시면 살찌나요?",
    answer:
      "단백질 음료 자체가 바로 살을 찌우는 것은 아닙니다. 다만 식사에 추가로 마셔 하루 총칼로리가 늘면 체중 증가로 이어질 수 있습니다.",
  },
  {
    question: "다이어트 중에는 어떤 단백질 음료가 낫나요?",
    answer:
      "저당, 저칼로리, 단백질 20g 전후 제품부터 보는 편이 무난합니다. 40g 이상 고단백 제품은 필요량과 운동량을 함께 봐야 합니다.",
  },
  {
    question: "단백질 음료로 식사를 대체해도 되나요?",
    answer:
      "가끔 식사 공백을 줄이는 용도로는 쓸 수 있지만, 계속 한 끼를 대체하면 식이섬유와 다양한 영양소가 부족할 수 있습니다.",
  },
];

export default function ProteinDrinkWeightGainPage() {
  const jsonLd = buildGuideJsonLd({ title: pageTitle, description: pageDescription, url: canonical, faq });

  return (
    <div className="min-h-screen bg-white">
      {jsonLd.map((item, index) => (
        <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }} />
      ))}
      <Header />
      <section className="w-full border-b border-t bg-[var(--hero-bg)]" style={{ borderColor: "var(--hero-border)" }}>
        <div className="mx-auto max-w-[1200px] px-4 py-6 md:px-6">
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
            <Link href="/guides" className="hover:text-[var(--accent)]">가이드</Link>
            <span>/</span>
            <Link href="/guides/intake-strategy-health" className="hover:text-[var(--accent)]">섭취 전략·건강</Link>
            <span>/</span>
            <span>단백질 음료 살찌나요</span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
            단백질 음료는 살찌는 음식일까?
            <br />
            답은 마시는 방식에 따라 달라집니다.
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            단백질 음료에도 칼로리가 있습니다. 기존 간식을 대체하면 도움이 될 수 있지만, 식사에 추가로
            계속 마시면 총섭취량이 늘어 체중 관리에 불리할 수 있습니다.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <div className="space-y-6">
          <section className="rounded-[28px] border border-[#e2ebe4] bg-[#f7fbf8] p-5">
            <h2 className="text-xl font-bold text-[var(--foreground)]">살이 찌는지는 섭취 방식이 결정합니다</h2>
            <div className="mt-5 overflow-x-auto">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#dce8df]">
                    <th className="px-3 py-3 font-semibold">마시는 방식</th>
                    <th className="px-3 py-3 font-semibold">체중 영향</th>
                    <th className="px-3 py-3 font-semibold">이유</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((row) => (
                    <tr key={row[0]} className="border-b border-[#e8efe9] last:border-b-0">
                      {row.map((cell) => (
                        <td key={cell} className="px-3 py-3 leading-6 text-[var(--foreground-muted)]">{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-white p-5">
            <h2 className="text-xl font-bold text-[var(--foreground)]">체중 관리 중이면 이 순서로 보세요</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {[
                ["1. 칼로리", "한 병이 80~150kcal인지, 200kcal 이상인지 먼저 확인합니다."],
                ["2. 당류", "저당 제품이라도 맛과 포만감이 맞아야 계속 마실 수 있습니다."],
                ["3. 대체 여부", "추가 섭취인지 간식 대체인지에 따라 결과가 달라집니다."],
              ].map((item) => (
                <article key={item[0]} className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4">
                  <h3 className="text-sm font-semibold text-[#24543d]">{item[0]}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{item[1]}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-white p-5">
            <h2 className="text-xl font-bold text-[var(--foreground)]">다음으로 볼 페이지</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {nextLinks.map((item) => (
                <Link key={item.href} href={item.href} className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4 hover:bg-white">
                  <h3 className="text-sm font-semibold text-[#24543d]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{item.body}</p>
                </Link>
              ))}
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-white p-5">
            <h2 className="text-xl font-bold text-[var(--foreground)]">자주 묻는 질문</h2>
            <div className="mt-4 space-y-3">
              {faq.map((item) => (
                <div key={item.question} className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4">
                  <h3 className="text-sm font-semibold text-[var(--foreground)]">{item.question}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{item.answer}</p>
                </div>
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
