import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import GuideBuySection from "@/app/components/GuideBuySection";
import { buildGuideJsonLd } from "@/app/lib/guideJsonLd";

const pageTitle = "단백질 음료 공복에 마셔도 되나요? | 아침·운동 전 부담 줄이는 기준";
const pageDescription =
  "단백질 음료를 공복에 마셔도 되는지 아침, 운동 전, 소화 부담, 당류와 칼로리 기준으로 정리하고 부담 적은 제품 선택 순서를 안내합니다.";
const canonical = "https://proteinlab.kr/guides/intake-strategy-health/protein-drink-empty-stomach";

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
  ["아침 식사 전", "가능하지만 천천히", "위가 예민하면 반 병이나 20g대 제품부터 시작합니다."],
  ["운동 전 공복", "운동 강도에 따라 다름", "고강도 운동 직전에는 묵직한 밀크형보다 가벼운 RTD가 낫습니다."],
  ["속쓰림·더부룩함이 잦음", "주의", "공복보다 식후나 간식 대체 시간대로 옮겨봅니다."],
  ["다이어트 중 공복감 완화", "제품 선택이 중요", "저당·저칼로리 제품을 간식 대체로 쓰는 편이 안전합니다."],
];

const nextLinks = [
  { href: "/guides/intake-strategy-health/morning-protein-drink", title: "아침 대용 단백질 음료", body: "출근길과 아침 공복 기준으로 제품을 고릅니다." },
  { href: "/guides/intake-strategy-health/pre-workout-protein", title: "운동 전 단백질 섭취", body: "운동 직전에는 섭취 타이밍과 소화 부담을 같이 봅니다." },
  { href: "/guides/intake-strategy-health/protein-drink-diarrhea", title: "단백질 음료 설사", body: "공복에 불편감이 반복되면 유당·감미료도 확인하세요." },
  { href: "/guides/intake-strategy-health/protein-drink-daily", title: "매일 마셔도 되나요", body: "아침 루틴으로 매일 넣어도 되는지 함께 봅니다." },
  { href: "/guides/intake-strategy-health/protein-drink-sugar", title: "당류 기준", body: "공복감 완화 목적이면 당류와 칼로리도 확인하세요." },
];

const faq = [
  {
    question: "단백질 음료를 공복에 마셔도 되나요?",
    answer:
      "대체로 가능하지만 위가 예민하거나 밀크형 제품이 부담스럽다면 반 병부터 시작하거나 식후로 옮기는 편이 좋습니다.",
  },
  {
    question: "아침 공복에는 어떤 단백질 음료가 낫나요?",
    answer:
      "처음에는 20~25g대, 저당, 너무 묵직하지 않은 제품부터 보는 편이 무난합니다. 공복감이 크면 식사대용성도 함께 봐야 합니다.",
  },
  {
    question: "운동 전 공복에 마셔도 괜찮나요?",
    answer:
      "운동 강도와 시간에 따라 다릅니다. 고강도 운동 직전에는 속이 불편할 수 있으므로 시간을 두고 마시거나 가벼운 제품을 선택하세요.",
  },
  {
    question: "공복에 마시면 설사가 날 수 있나요?",
    answer:
      "일부 사람은 공복, 차가운 음용, 유당이나 감미료 때문에 장이 민감하게 반응할 수 있습니다. 반복된다면 식후 섭취나 다른 제품군을 확인하세요.",
  },
  {
    question: "공복감 때문에 매일 마셔도 괜찮나요?",
    answer:
      "간식 대체나 식사 보완용이라면 가능하지만, 식사에 계속 추가하면 칼로리가 늘 수 있습니다. 매일 섭취 기준도 함께 보는 편이 좋습니다.",
  },
];

export default function ProteinDrinkEmptyStomachPage() {
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
            <span>공복 단백질 음료</span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
            단백질 음료를 공복에 마셔도 될까?
            <br />
            가능하지만 제품과 타이밍을 나눠봐야 합니다.
          </h1>
          <p className="mt-3 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            공복 섭취 자체가 문제라기보다, 제품이 너무 묵직하거나 급하게 마시거나 위가 예민한 상태일 때
            부담이 커질 수 있습니다. 아침, 운동 전, 다이어트 목적을 나눠서 보는 편이 정확합니다.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <div className="space-y-6">
          <section className="rounded-[28px] border border-[#e2ebe4] bg-[#f7fbf8] p-5">
            <h2 className="text-xl font-bold text-[var(--foreground)]">공복 섭취 상황별 판단</h2>
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
            <h2 className="text-xl font-bold text-[var(--foreground)]">공복 부담을 줄이는 순서</h2>
            <ol className="mt-4 space-y-3 text-sm leading-6 text-[var(--foreground-muted)]">
              <li className="rounded-xl border border-[#dce8df] bg-[#f6fbf7] px-4 py-3">1. 처음에는 반 병이나 20~25g대 제품부터 시작합니다.</li>
              <li className="rounded-xl border border-[#dce8df] bg-[#f6fbf7] px-4 py-3">2. 당류와 칼로리를 확인해 간식 대체인지 추가 섭취인지 구분합니다.</li>
              <li className="rounded-xl border border-[#dce8df] bg-[#f6fbf7] px-4 py-3">3. 불편감이 반복되면 식후로 옮기거나 워터형·락토프리 제품을 봅니다.</li>
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
