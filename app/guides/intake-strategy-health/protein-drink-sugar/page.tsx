import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import GuideBuySection from "@/app/components/GuideBuySection";
import { buildGuideJsonLd } from "@/app/lib/guideJsonLd";

const pageTitle = "단백질 음료 당류 얼마나 봐야 하나요? | 저당 기준과 라벨 읽기";
const pageDescription =
  "단백질 음료를 고를 때 당류를 몇 g까지 봐야 하는지, 당류 0g과 저당 제품의 차이, 칼로리와 감미료까지 함께 읽는 기준을 정리했습니다.";
const canonical = "https://proteinlab.kr/guides/intake-strategy-health/protein-drink-sugar";

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
  ["0~1g", "저당 우선 후보", "다이어트, 매일 섭취, 혈당 부담을 신경 쓸 때 먼저 봅니다."],
  ["2~5g", "대부분 실사용 가능", "맛과 지속성이 더 나을 수 있어 칼로리와 함께 비교합니다."],
  ["6~10g", "목적에 따라 주의", "운동 후나 간식 대체라면 가능하지만 체중 관리 목적이면 우선순위가 낮아집니다."],
  ["10g 이상", "먼저 거를 후보", "단백질 제품이라도 디저트형에 가까울 수 있어 라벨 확인이 필요합니다."],
];

const nextLinks = [
  { href: "/guides/product-selection-comparison/low-sugar-protein-drink-guide", title: "저당 단백질 음료 가이드", body: "당류 기준으로 제품 후보를 바로 좁힙니다." },
  { href: "/topics/low-sugar-protein-drink", title: "저당 단백질 음료 추천", body: "저당 검색 의도에 맞는 토픽 허브로 이동합니다." },
  { href: "/guides/intake-strategy-health/protein-drink-weight-gain", title: "단백질 음료 살찌나요", body: "당류와 칼로리를 체중 관리 관점에서 함께 봅니다." },
];

const faq = [
  {
    question: "단백질 음료 당류는 몇 g 이하가 좋나요?",
    answer:
      "매일 마시거나 체중 관리 목적이면 0~3g 안쪽부터 보는 편이 무난합니다. 다만 맛과 지속성을 고려하면 5g 이하까지는 함께 비교할 수 있습니다.",
  },
  {
    question: "당류 0g이면 무조건 좋은 제품인가요?",
    answer:
      "그렇지는 않습니다. 당류가 낮아도 칼로리, 지방, 전체 탄수화물, 감미료 체감이 다를 수 있어 함께 봐야 합니다.",
  },
  {
    question: "맛있는 제품은 당류가 높나요?",
    answer:
      "항상 그렇지는 않지만 맛 제품은 당류나 칼로리가 올라가는 경우가 있습니다. 같은 브랜드라도 맛 SKU별 수치를 다시 확인해야 합니다.",
  },
];

export default function ProteinDrinkSugarPage() {
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
            <span>단백질 음료 당류</span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
            단백질 음료는 단백질 g보다,
            <br />
            당류와 칼로리를 같이 봐야 합니다.
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            단백질이 높아도 당류가 높으면 체중 관리나 매일 섭취 목적과 어긋날 수 있습니다. 반대로 당류 0g이라고
            무조건 좋은 것도 아니어서 칼로리, 지방, 감미료 체감까지 함께 보는 편이 안전합니다.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <div className="space-y-6">
          <section className="rounded-[28px] border border-[#e2ebe4] bg-[#f7fbf8] p-5">
            <h2 className="text-xl font-bold text-[var(--foreground)]">당류 g별로 이렇게 해석하세요</h2>
            <div className="mt-5 overflow-x-auto">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#dce8df]">
                    <th className="px-3 py-3 font-semibold">당류</th>
                    <th className="px-3 py-3 font-semibold">해석</th>
                    <th className="px-3 py-3 font-semibold">활용 기준</th>
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
            <h2 className="text-xl font-bold text-[var(--foreground)]">라벨은 이 순서로 보면 됩니다</h2>
            <ol className="mt-4 space-y-3 text-sm leading-6 text-[var(--foreground-muted)]">
              <li className="rounded-xl border border-[#dce8df] bg-[#f6fbf7] px-4 py-3">1. 당류가 0~3g인지 먼저 확인합니다.</li>
              <li className="rounded-xl border border-[#dce8df] bg-[#f6fbf7] px-4 py-3">2. 칼로리와 지방이 함께 높은지 봅니다.</li>
              <li className="rounded-xl border border-[#dce8df] bg-[#f6fbf7] px-4 py-3">3. 같은 브랜드라도 맛별 SKU 수치가 다른지 다시 확인합니다.</li>
            </ol>
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
