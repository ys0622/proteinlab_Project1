import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import GuideBuySection from "@/app/components/GuideBuySection";
import ProteinDailyContext from "@/app/components/ProteinDailyContext";
import { buildGuideJsonLd } from "@/app/lib/guideJsonLd";

const PAGE_URL = "https://proteinlab.kr/guides/intake-strategy-health/protein-timing";
const _pageTitle = "단백질 먹는 시간 — 운동 후 30분? 아침·자기 전, 언제 먹어야 할까";
const _pageDesc =
  "단백질 먹는 시간은 운동 전후 2시간 안쪽이면 충분하고, 한 끼 20~40g씩 고르게 나누는 것이 좋습니다(ISSN 2017, Mamerow 2014). 운동 후 30분 골든타임의 근거도 확인합니다.";

export const metadata = {
  title: _pageTitle,
  description: _pageDesc,
  alternates: { canonical: PAGE_URL },
  openGraph: {
    images: [{ url: "https://proteinlab.kr/opengraph-image", width: 1200, height: 630, alt: "ProteinLab 단백질 제품 비교" }],
    title: _pageTitle,
    description: _pageDesc,
    url: PAGE_URL,
    type: "website" as const,
    locale: "ko_KR",
    siteName: "ProteinLab",
  },
  twitter: {
    images: ["https://proteinlab.kr/opengraph-image"],
    card: "summary" as const,
    title: _pageTitle,
    description: _pageDesc,
  },
};

const quickAnswer = [
  "가장 중요한 것은 시간이 아니라 하루 총량입니다. 하루 총량을 맞춘 연구들을 모아 보면 '운동 직후에 먹었느냐'에 따른 근육 차이는 거의 사라졌습니다(Schoenfeld 2013 메타분석).",
  "운동 후 '30분 골든타임'은 과장입니다. 국제스포츠영양학회(ISSN 2017)는 운동 전후 2시간 안쪽이면 충분하다고 봅니다. 운동 전 식사를 오래 굶었다면 운동 후에 조금 서두르는 편이 낫습니다.",
  "시간보다 더 차이를 만드는 것은 나누는 방법입니다. 저녁에 몰아 먹기보다 아침·점심·저녁에 고르게(한 끼 20~40g) 나눈 쪽이 하루 근육 합성이 더 높았습니다(Mamerow 2014).",
];

const timingRows: Array<[string, string, string]> = [
  [
    "운동 직후",
    "운동 전후 2시간 안에 20~40g(체중 1kg당 0.25g)",
    "ISSN 2017. 30분 안에 꼭 먹어야 한다는 근거는 약함. 공복 운동이었다면 빨리 먹는 편이 나음",
  ],
  [
    "아침",
    "다른 끼니와 비슷하게 20~40g",
    "한국인은 단백질이 저녁에 몰리기 쉬움. 아침에 채우면 하루 분배가 고르게 됨(Mamerow 2014)",
  ],
  [
    "자기 전",
    "카제인 등 천천히 소화되는 단백질 30~40g",
    "ISSN 2017. 자기 전 40g 카제인이 밤사이 근육 합성을 높였음(Res 2012)",
  ],
  [
    "운동 전",
    "운동 1~2시간 전 식사에 단백질 포함",
    "운동 전에 먹은 단백질도 운동 후까지 혈중 아미노산을 유지해 운동 후 섭취와 비슷한 역할",
  ],
  [
    "공복(아침 첫 끼 전)",
    "특별한 이점 근거 없음",
    "공복에 고함량 음료는 더부룩함이 잦음. 식사와 함께 먹어도 효과 차이는 크지 않음",
  ],
];

const scheduleRows: Array<[string, string, string, string, string]> = [
  ["아침 운동(07시)", "운동 후 아침 식사 30g", "점심 30g", "간식 20g", "저녁 30g"],
  ["저녁 운동(19시)", "아침 30g", "점심 30g", "운동 전 간식 20g", "운동 후 저녁 30g"],
  ["운동 안 하는 날", "아침 25g", "점심 25g", "간식 10~15g", "저녁 25g"],
];

const faqs = [
  {
    question: "단백질은 언제 먹는 게 가장 좋나요?",
    answer:
      "하루 총량을 채우는 것이 먼저이고, 그다음은 아침·점심·저녁에 고르게 나누는 것입니다. 특정 시간에 먹어야 효과가 난다는 근거는 생각보다 약합니다. 운동을 한다면 운동 전후 2시간 안에 한 번, 근육을 늘리려면 자기 전 한 번을 더하는 정도가 연구로 뒷받침됩니다.",
  },
  {
    question: "운동 후 30분 안에 단백질을 꼭 먹어야 하나요?",
    answer:
      "아닙니다. 하루 총량을 맞춘 연구들을 묶어 보면 운동 직후 섭취 여부에 따른 근육 차이는 거의 없었습니다(Schoenfeld 2013). ISSN은 운동 전후 2시간 안쪽을 권합니다. 다만 운동 전에 오래 굶었다면 운동 후 너무 늦지 않게 먹는 편이 좋습니다.",
  },
  {
    question: "자기 전에 단백질 먹으면 살찌나요?",
    answer:
      "하루 총 열량이 늘지 않는다면 자기 전에 먹었다고 살이 더 찌지는 않습니다. 오히려 자기 전 카제인 30~40g은 밤사이 근육 합성을 높이는 것으로 보고됐습니다. 야식으로 열량을 더하는 것이 문제입니다.",
    href: "/guides/intake-strategy-health/night-protein-drink",
    linkLabel: "자기 전 단백질 음료 가이드",
  },
  {
    question: "아침에 단백질을 먹어야 하는 이유가 있나요?",
    answer:
      "아침을 거르거나 빵·밥 위주로 먹으면 하루 단백질이 저녁에 몰립니다. 같은 하루 총량이라도 세 끼에 고르게 나눈 쪽이 하루 근육 합성이 약 25% 높았다는 연구가 있습니다(Mamerow 2014).",
    href: "/guides/intake-strategy-health/morning-protein-drink",
    linkLabel: "아침 단백질 음료 가이드",
  },
  {
    question: "공복에 단백질 음료 마셔도 되나요?",
    answer:
      "마셔도 되지만 공복에만 생기는 특별한 이점은 확인되지 않았습니다. 공복에 고함량 음료를 마시면 더부룩하거나 묽은 변이 생기는 경우가 있어 식사와 함께 마시는 편이 편합니다.",
    href: "/guides/intake-strategy-health/protein-drink-empty-stomach",
    linkLabel: "공복 단백질 음료 가이드",
  },
];

const sources = [
  "Jäger R. et al., ISSN Position Stand: Protein and Exercise. J Int Soc Sports Nutr 2017;14:20",
  "Schoenfeld BJ, Aragon AA, Krieger JW, The effect of protein timing on muscle strength and hypertrophy: a meta-analysis. J Int Soc Sports Nutr 2013;10:53",
  "Mamerow MM et al., Dietary protein distribution positively influences 24-h muscle protein synthesis in healthy adults. J Nutr 2014;144(6):876-880",
  "Res PT et al., Protein ingestion before sleep improves postexercise overnight recovery. Med Sci Sports Exerc 2012;44(8):1560-1569",
  "Areta JL et al., Timing and distribution of protein ingestion during prolonged recovery from resistance exercise. J Physiol 2013;591(9):2319-2331",
];

const cardClass = "rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]";
const thClass = "px-3 py-3 font-semibold";
const tdClass = "px-3 py-3 text-[var(--foreground-muted)]";

export default function ProteinTimingPage() {
  const jsonLd = buildGuideJsonLd({
    title: _pageTitle,
    description: _pageDesc,
    url: PAGE_URL,
    dateModified: "2026-11-02",
    faq: faqs.map(({ question, answer }) => ({ question, answer })),
  });

  return (
    <div className="min-h-screen bg-white">
      {jsonLd.map((item, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }} />
      ))}
      <Header />

      <section className="w-full border-t border-b bg-[var(--hero-bg)]" style={{ borderColor: "var(--hero-border)" }}>
        <div className="mx-auto max-w-[1200px] px-4 py-5 md:px-6 md:py-6">
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
            <Link href="/guides" className="hover:text-[var(--accent)]">
              가이드
            </Link>
            <span>/</span>
            <Link href="/guides/intake-strategy-health" className="hover:text-[var(--accent)]">
              섭취 전략 & 건강
            </Link>
            <span>/</span>
            <span>단백질 먹는 시간</span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[#16412D] md:text-3xl">
            단백질 먹는 시간, 운동 후 30분이 정말 중요할까?
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            단백질 먹는 시간은 운동 전후 2시간 안쪽이면 충분하고, 한 끼 20~40g씩 고르게 나누는 것이 좋습니다(ISSN 2017,
            Mamerow 2014). 운동 후 30분 골든타임과 아침·자기 전 섭취도 정리했습니다. 기준일 2026-11-02.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <div className="space-y-6">
          <section className="rounded-[28px] border border-[#e2ebe4] bg-[#f7fbf8] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">짧게 답하면</h2>
            <ul className="mt-4 space-y-3">
              {quickAnswer.map((item) => (
                <li key={item} className="flex gap-3 rounded-xl border border-[#dce8df] bg-white px-4 py-3 text-sm leading-6 text-[var(--foreground-muted)]">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#2d6a4f]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
          <GuideBuySection topic="general" variant="top" />

          <section className={cardClass}>
            <h2 className="text-xl font-bold text-[var(--foreground)]">단백질은 언제 먹어야 하나요?</h2>
            <div className="mt-4 overflow-x-auto">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8e6e3] text-[var(--foreground)]">
                    <th className={thClass}>언제</th>
                    <th className={thClass}>얼마나</th>
                    <th className={thClass}>근거</th>
                  </tr>
                </thead>
                <tbody>
                  {timingRows.map(([when, howMuch, basis]) => (
                    <tr key={when} className="border-b border-[#f0eeeb] last:border-b-0">
                      <td className={`${tdClass} font-semibold text-[var(--foreground)]`}>{when}</td>
                      <td className={tdClass}>{howMuch}</td>
                      <td className={tdClass}>{basis}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className={cardClass}>
            <h2 className="text-xl font-bold text-[var(--foreground)]">&apos;운동 후 30분&apos;은 어디서 나왔나</h2>
            <div className="mt-3 space-y-3 text-sm leading-6 text-[var(--foreground-muted)]">
              <p>
                운동 직후 근육이 아미노산을 잘 받아들인다는 초기 연구들이 &quot;30분~1시간 안에 먹어야 한다&quot;는 골든타임
                이야기로 퍼졌습니다. 그런데 이 연구들 상당수는 운동 직후 단백질을 먹은 쪽이 하루 총량도 더 많았습니다.
              </p>
              <p>
                Schoenfeld 외(2013)는 23개 연구를 모아 하루 총량 차이를 보정했습니다. 그러자 운동 직후 섭취의 효과는 통계적으로
                의미가 없어졌습니다. 근육 성장을 가른 것은 &quot;언제&quot;보다 &quot;하루에 얼마나&quot;였습니다.
              </p>
              <p>
                그래서 ISSN(2017)은 운동 후 섭취를 권하면서도 그 시간을 운동 전후 2시간 안쪽으로 넓게 봅니다. 운동 1~2시간 전에
                단백질이 든 식사를 했다면 운동 후에 서두를 필요는 더 줄어듭니다.
              </p>
            </div>
            <div className="mt-4">
              <Link
                href="/guides/intake-strategy-health/post-workout-protein"
                className="text-sm font-semibold text-[var(--accent)] hover:underline"
              >
                운동 후 단백질, 무엇을 얼마나 →
              </Link>
            </div>
          </section>

          <section className={cardClass}>
            <h2 className="text-xl font-bold text-[var(--foreground)]">시간보다 중요한 것: 고르게 나누기</h2>
            <div className="mt-3 space-y-3 text-sm leading-6 text-[var(--foreground-muted)]">
              <p>
                Mamerow 외(2014)는 같은 양의 단백질을 아침·점심·저녁에 약 30g씩 고르게 먹은 경우와 저녁에 몰아 먹은 경우를
                비교했습니다. 고르게 먹은 쪽의 24시간 근육 합성이 약 25% 높았습니다.
              </p>
              <p>
                Areta 외(2013)도 12시간 동안 같은 80g을 먹을 때 20g씩 4번이 40g씩 2번이나 10g씩 8번보다 근육 합성이 높았습니다.
                한 끼에 몇 g이 적당한지는{" "}
                <Link href="/guides/intake-strategy-health/protein-50g-at-once" className="font-semibold text-[var(--accent)] hover:underline">
                  단백질 한 번에 흡수량
                </Link>
                에서 자세히 다뤘습니다.
              </p>
            </div>
          </section>

          <section className={cardClass}>
            <h2 className="text-xl font-bold text-[var(--foreground)]">운동 시간대별 하루 나누기 예시 (체중 70kg, 운동하는 날 110g)</h2>
            <div className="mt-4 overflow-x-auto">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8e6e3] text-[var(--foreground)]">
                    <th className={thClass}>루틴</th>
                    <th className={thClass}>아침</th>
                    <th className={thClass}>점심</th>
                    <th className={thClass}>간식</th>
                    <th className={thClass}>저녁</th>
                  </tr>
                </thead>
                <tbody>
                  {scheduleRows.map(([routine, ...meals]) => (
                    <tr key={routine} className="border-b border-[#f0eeeb] last:border-b-0">
                      <td className={`${tdClass} font-semibold text-[var(--foreground)]`}>{routine}</td>
                      {meals.map((meal, i) => (
                        <td key={i} className={tdClass}>
                          {meal}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs leading-5 text-[var(--foreground-muted)]">
              110g은 체중 70kg이 근력 운동을 할 때 1kg당 약 1.6g입니다. 운동하지 않는 날은 권장섭취량(1kg당 0.91g, 약 64g)
              이상이면 충분합니다. 내 목표량은{" "}
              <Link href="/guides/basics/daily-requirement" className="font-semibold text-[var(--accent)] hover:underline">
                단백질 하루 섭취량
              </Link>
              에서 계산하세요.
            </p>
          </section>

          <section className="rounded-[28px] border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5">
            <h2 className="text-xl font-bold text-[var(--foreground)]">자주 묻는 질문</h2>
            <div className="mt-5 space-y-4">
              {faqs.map((faq) => (
                <article key={faq.question} className="rounded-2xl border border-[#e8e6e3] bg-white px-4 py-4">
                  <h3 className="text-base font-semibold text-[var(--foreground)]">Q. {faq.question}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">A. {faq.answer}</p>
                  {faq.href ? (
                    <div className="mt-3">
                      <Link href={faq.href} className="text-sm font-semibold text-[var(--accent)] hover:underline">
                        {faq.linkLabel}
                      </Link>
                    </div>
                  ) : null}
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-[#e8e6e3] bg-white px-5 py-4">
            <h2 className="text-sm font-bold text-[var(--foreground)]">출처</h2>
            <ul className="mt-2 space-y-1 text-xs leading-5 text-[var(--foreground-muted)]">
              {sources.map((s) => (
                <li key={s}>· {s}</li>
              ))}
            </ul>
          </section>
        </div>
      </main>

      <ProteinDailyContext />
      <GuideBuySection topic="general" />
      <Footer />
    </div>
  );
}
