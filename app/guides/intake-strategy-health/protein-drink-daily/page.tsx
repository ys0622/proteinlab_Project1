import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import GuideBuySection from "@/app/components/GuideBuySection";
import { buildGuideJsonLd } from "@/app/lib/guideJsonLd";

const pageTitle = "단백질 음료 매일 마셔도 되나요? | 하루 루틴과 제품 선택 기준";
const pageDescription =
  "단백질 음료를 매일 마셔도 되는지, 식사 보완용과 운동 보충용을 구분하고 당류·칼로리·단백질 함량 기준으로 정리했습니다.";
const canonical = "https://proteinlab.kr/guides/intake-strategy-health/protein-drink-daily";

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

const dailyRows = [
  ["식사에서 단백질이 부족한 날", "매일 마셔도 비교적 무난", "식사 보완용으로 20~25g대 제품을 먼저 봅니다."],
  ["운동 후 회복 목적", "운동량에 따라 가능", "근력 운동 강도가 있다면 25~40g대도 후보가 됩니다."],
  ["간식처럼 습관적으로 추가", "주의 필요", "총칼로리와 당류가 늘 수 있어 대체 섭취인지 확인해야 합니다."],
  ["식사 대신 계속 사용", "장기 반복은 주의", "일반 식사의 영양 다양성을 완전히 대체하기 어렵습니다."],
];

const nextLinks = [
  {
    href: "/guides/intake-strategy-health/protein-drink-sugar",
    title: "단백질 음료 당류 기준",
    body: "매일 마실수록 당류 누적을 먼저 확인합니다.",
  },
  {
    href: "/guides/intake-strategy-health/protein-drink-empty-stomach",
    title: "단백질 음료 공복",
    body: "아침 루틴으로 마실 때 속 부담을 줄이는 기준입니다.",
  },
  {
    href: "/guides/product-selection-comparison/protein-drink-beginners-guide",
    title: "입문용 단백질 음료",
    body: "매일 마실 제품은 부담 낮은 구간부터 고르는 편이 좋습니다.",
  },
  {
    href: "/guides/product-selection-comparison/newcare-41g-vs-25g",
    title: "뉴케어 41g vs 25g",
    body: "매일형과 고단백형 차이를 브랜드 안에서 비교합니다.",
  },
  {
    href: "/guides/intake-strategy-health/protein-drink-weight-gain",
    title: "단백질 음료 살찌나요",
    body: "매일 마실 때 체중 관리 관점도 함께 확인합니다.",
  },
];

const faq = [
  {
    question: "단백질 음료를 매일 마셔도 되나요?",
    answer:
      "식사에서 부족한 단백질을 보완하는 용도라면 매일 마실 수 있습니다. 다만 식사에 계속 추가하는 방식이면 칼로리와 당류가 늘 수 있습니다.",
  },
  {
    question: "매일 마실 제품은 몇 g이 적당한가요?",
    answer:
      "일반적인 식사 보완용이라면 20~25g대부터 보는 편이 무난합니다. 운동량이 많거나 한 끼 공백이 크다면 더 높은 함량도 검토할 수 있습니다.",
  },
  {
    question: "매일 단백질 음료로 식사를 대신해도 되나요?",
    answer:
      "가끔 식사 공백을 줄이는 용도는 가능하지만 장기적으로 모든 식사를 대체하는 방식은 권장하기 어렵습니다. 식이섬유와 다양한 영양소를 함께 챙겨야 합니다.",
  },
  {
    question: "단백질 음료를 매일 마시면 살이 찌나요?",
    answer:
      "식사에 추가로 마시면 칼로리가 늘 수 있습니다. 반대로 기존 간식이나 부족한 단백질을 보완하는 용도라면 다르게 볼 수 있습니다.",
  },
  {
    question: "매일 마시면 설사나 속 불편이 생길 수 있나요?",
    answer:
      "유당, 감미료, 섭취량이 맞지 않으면 반복 섭취 중 불편감이 생길 수 있습니다. 그런 경우 제품군이나 섭취 타이밍을 바꿔보는 편이 좋습니다.",
  },
];

export default function ProteinDrinkDailyPage() {
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
            <span>매일 마셔도 되나요</span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
            단백질 음료, 매일 마셔도 됩니다.
            <br />
            다만 식사 보완인지 추가 간식인지가 중요합니다.
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            매일 마시는 것 자체보다 중요한 건 하루 식사 안에서 어떤 역할을 하는지입니다. 부족한 단백질을
            보완하는지, 아니면 이미 충분한 식사에 추가 칼로리를 더하는지에 따라 판단이 달라집니다.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <div className="space-y-6">
          <section className="rounded-[28px] border border-[#e2ebe4] bg-[#f7fbf8] p-5">
            <h2 className="text-xl font-bold text-[var(--foreground)]">매일 마셔도 되는 상황과 주의할 상황</h2>
            <div className="mt-5 overflow-x-auto">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#dce8df]">
                    <th className="px-3 py-3 font-semibold">상황</th>
                    <th className="px-3 py-3 font-semibold">판단</th>
                    <th className="px-3 py-3 font-semibold">기준</th>
                  </tr>
                </thead>
                <tbody>
                  {dailyRows.map((row) => (
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
            <h2 className="text-xl font-bold text-[var(--foreground)]">매일 마실 제품을 고르는 기준</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {[
                ["단백질", "식사 보완용은 20~25g대, 운동 후 보충은 더 높은 함량도 후보입니다."],
                ["당류", "매일 마실수록 당류 누적을 봐야 합니다. 저당 제품부터 비교하세요."],
                ["지속성", "맛과 소화 부담이 맞지 않으면 박스 구매보다 소량 테스트가 먼저입니다."],
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
