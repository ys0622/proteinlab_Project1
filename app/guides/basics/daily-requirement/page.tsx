import { buildGuideJsonLd } from "@/app/lib/guideJsonLd";
import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import GuideNextReads from "@/app/components/GuideNextReads";
import GuideBuySection from "@/app/components/GuideBuySection";
import CategoryDataSection from "@/app/components/CategoryDataSection";
import TrackedLink from "@/app/components/TrackedLink";

const PAGE_URL = "https://proteinlab.kr/guides/basics/daily-requirement";
const _pageTitle = "단백질 하루 섭취량 | 성별·나이·체중별 권장량과 운동할 때 기준";
const _pageDesc =
  "2020 한국인 영양소 섭취기준으로 본 단백질 하루 권장량(성인 남자 60~65g, 여자 50~55g, 체중 1kg당 0.91g)과 운동·노년·체중별 계산법, 한국인이 실제로 먹는 양을 정리했습니다.";
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

// 2020 한국인 영양소 섭취기준(보건복지부·한국영양학회). 수치는 김은정 외, J Nutr Health 2022;55(1):10 Table 3에서 옮겼다.
// [연령, 남자 평균필요량, 남자 권장섭취량, 여자 평균필요량, 여자 권장섭취량]
const kdriRows: Array<[string, number, number, number, number]> = [
  ["12~14세", 50, 60, 45, 55],
  ["15~18세", 55, 65, 45, 55],
  ["19~29세", 50, 65, 45, 55],
  ["30~49세", 50, 65, 40, 50],
  ["50~64세", 50, 60, 40, 50],
  ["65~74세", 50, 60, 40, 50],
  ["75세 이상", 50, 60, 40, 50],
];

// 같은 자료 Table 1: 국민건강영양조사 2013~2017 하루 평균 섭취량(g)과 권장섭취량 대비 비율
const actualIntakeRows: Array<[string, string, string]> = [
  ["남자 19~29세", "88.3g", "136%"],
  ["남자 30~49세", "88.8g", "137%"],
  ["남자 65~74세", "69.2g", "115%"],
  ["남자 75세 이상", "58.0g", "97%"],
  ["여자 19~29세", "64.3g", "117%"],
  ["여자 30~49세", "63.0g", "126%"],
  ["여자 65~74세", "49.6g", "99%"],
  ["여자 75세 이상", "37.7g", "75%"],
];

const weights = [50, 60, 70, 80, 90];
const perKgLevels: Array<{ label: string; perKg: number; note: string }> = [
  { label: "권장섭취량", perKg: 0.91, note: "건강한 성인 대부분이 충분한 양" },
  { label: "노년(65세 이상)", perKg: 1.2, note: "PROT-AGE 1.0~1.2g의 위쪽" },
  { label: "근력 운동", perKg: 1.6, note: "ISSN 1.4~2.0g의 가운데" },
  { label: "고강도 운동", perKg: 2.0, note: "ISSN 범위의 위쪽" },
];

const faqs = [
  {
    question: "단백질 하루 섭취량은 성인 기준 몇 g인가요?",
    answer:
      "2020 한국인 영양소 섭취기준의 권장섭취량은 남자 19~49세 65g, 50세 이상 60g, 여자 19~29세 55g, 30세 이상 50g입니다. 체중으로 계산하면 1kg당 0.91g입니다.",
  },
  {
    question: "여자 단백질 하루 섭취량은 얼마인가요?",
    answer:
      "여자 19~29세는 하루 55g, 30세 이상은 50g이 권장섭취량입니다. 체중이 기준보다 많이 나가거나 근력 운동을 한다면 체중 1kg당 0.91g(운동 시 1.4~2.0g)으로 다시 계산하는 편이 맞습니다. 임신 2·3분기와 수유기에는 추가량이 따로 정해져 있습니다.",
  },
  {
    question: "운동하면 단백질을 얼마나 먹어야 하나요?",
    answer:
      "국제스포츠영양학회(ISSN) 2017 입장문은 운동하는 사람에게 체중 1kg당 하루 1.4~2.0g을 권합니다. 70kg이면 98~140g입니다. 한 끼에는 체중 1kg당 0.25g(대략 20~40g)을 3~4시간 간격으로 나눠 먹는 방법을 제시합니다.",
    href: "/guides/intake-strategy-health/protein-50g-at-once",
    linkLabel: "한 번에 몇 g까지 흡수되는지 보기",
  },
  {
    question: "단백질을 너무 많이 먹으면 안 되나요? 상한선이 있나요?",
    answer:
      "2020 기준은 단백질 상한섭취량을 정하지 않았습니다. 해롭지 않다는 뜻이 아니라, 보충제·고단백 식사의 장기 영향에 대한 근거가 부족해 정하지 못했다는 뜻입니다. 신장 질환이 있으면 오히려 제한이 필요할 수 있으니 의료진과 먼저 상의하세요.",
    href: "/guides/intake-strategy-health/high-protein-side-effects",
    linkLabel: "단백질 과다섭취 부작용 보기",
  },
  {
    question: "나이가 들면 단백질을 덜 먹어도 되나요?",
    answer:
      "아닙니다. 2020 기준은 근감소증 예방을 이유로 65세 이상 권장섭취량을 50~64세와 같은 수준(남 60g, 여 50g)으로 올렸습니다. 유럽 PROT-AGE 연구그룹은 65세 이상에게 체중 1kg당 1.0~1.2g을 권합니다.",
    href: "/guides/intake-strategy-health/senior-protein-strategy",
    linkLabel: "노년 단백질 섭취 전략 보기",
  },
  {
    question: "단백질이 부족하면 어떤 증상이 나타나나요?",
    answer:
      "근육량·근력 감소, 상처 회복 지연, 부종 등이 알려져 있지만 다른 원인으로도 생기는 증상입니다. 증상보다 하루 섭취량을 먼저 계산해 보는 편이 정확합니다.",
    href: "/guides/basics/deficiency-symptoms",
    linkLabel: "단백질 부족 증상 보기",
  },
];

const sources = [
  "보건복지부·한국영양학회, 「2020 한국인 영양소 섭취기준」",
  "김은정 외, 2020 한국인 영양소 섭취기준: 단백질. J Nutr Health 2022;55(1):10-29 (연령별 기준·국민건강영양조사 2013~2017 섭취량·에너지적정비율·상한섭취량 미설정 사유)",
  "Jäger R. et al., ISSN Position Stand: Protein and Exercise. J Int Soc Sports Nutr 2017;14:20",
  "Bauer J. et al., PROT-AGE Study Group. J Am Med Dir Assoc 2013;14(8):542-559",
];

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="mt-4 rounded-xl border border-[#eef1f3] bg-white px-4 py-4 text-sm leading-6 text-[var(--foreground-muted)]">
      {children}
    </blockquote>
  );
}

const thClass = "px-3 py-3 font-semibold";
const tdClass = "px-3 py-3 text-[var(--foreground-muted)]";

export default function DailyRequirementPage() {
  const jsonLd = buildGuideJsonLd({
    title: _pageTitle,
    description: _pageDesc,
    url: PAGE_URL,
    datePublished: "2026-03-01",
    dateModified: "2026-11-02",
  });

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  return (
    <div className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
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
            <Link href="/guides/protein-basics" className="hover:text-[var(--accent)]">
              단백질 기초
            </Link>
            <span>/</span>
            <span>단백질 하루 섭취량</span>
          </div>

          <h1 className="mt-3 text-2xl font-bold leading-tight text-[#16412D] md:text-3xl">
            단백질 하루 섭취량, 나는 몇 g 먹어야 할까?
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            성별·나이별 공식 권장량, 체중으로 계산하는 법, 운동하거나 나이가 들었을 때 늘리는 기준, 그리고 한국인이 실제로
            먹는 양까지 한 페이지에 정리했습니다. 기준일 2026-11-02.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <div className="space-y-6">
          <section
            aria-labelledby="daily-answer-title"
            className="rounded-2xl border border-[#d7e6da] bg-[#f5fbf6] px-5 py-5"
          >
            <h2 id="daily-answer-title" className="text-lg font-bold text-[#16412D]">
              핵심만 먼저
            </h2>
            <ul className="mt-3 space-y-2 text-sm leading-6 text-[var(--foreground)]">
              <li>
                · <strong>성인 권장섭취량은 체중 1kg당 0.91g</strong>입니다(2020 한국인 영양소 섭취기준). 남자 19~49세{" "}
                <strong>65g</strong>, 50세 이상 <strong>60g</strong>, 여자 19~29세 <strong>55g</strong>, 30세 이상{" "}
                <strong>50g</strong>.
              </li>
              <li>
                · 근력 운동을 하면 <strong>1kg당 1.4~2.0g</strong>(ISSN 2017), 65세 이상은 <strong>1.0~1.2g</strong>(PROT-AGE
                2013)이 해외 전문가 단체의 권장 범위입니다.
              </li>
              <li>
                · 단백질 <strong>상한섭취량은 정해져 있지 않습니다</strong>. 안전하다는 뜻이 아니라 근거가 부족해 정하지
                못했다는 뜻입니다. 신장 질환이 있으면 의료진과 먼저 상의하세요.
              </li>
              <li>
                · 한국 성인 대부분은 평균적으로 권장량보다 많이 먹지만, <strong>75세 이상 여성은 권장량의 75%</strong>에
                그칩니다(국민건강영양조사 2013~2017).
              </li>
            </ul>
          </section>

          <section className="rounded-2xl border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5">
            <h2 className="text-xl font-bold text-[var(--foreground)]">성별·나이별 단백질 권장섭취량 (2020 기준)</h2>
            <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">
              평균필요량은 그 나이대 사람 절반이 충분한 양이고, 권장섭취량은 대부분(97~98%)이 충분한 양입니다. 목표로 삼을
              숫자는 권장섭취량입니다.
            </p>
            <div className="mt-4 overflow-x-auto">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8e6e3] text-[var(--foreground)]">
                    <th className={thClass}>나이</th>
                    <th className={thClass}>남자 평균필요량</th>
                    <th className={thClass}>남자 권장섭취량</th>
                    <th className={thClass}>여자 평균필요량</th>
                    <th className={thClass}>여자 권장섭취량</th>
                  </tr>
                </thead>
                <tbody>
                  {kdriRows.map(([age, mEar, mRni, fEar, fRni]) => (
                    <tr key={age} className="border-b border-[#f0eeeb] last:border-b-0">
                      <td className={`${tdClass} font-semibold text-[var(--foreground)]`}>{age}</td>
                      <td className={tdClass}>{mEar}g</td>
                      <td className={`${tdClass} font-semibold text-[#24543d]`}>{mRni}g</td>
                      <td className={tdClass}>{fEar}g</td>
                      <td className={`${tdClass} font-semibold text-[#24543d]`}>{fRni}g</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs leading-5 text-[var(--foreground-muted)]">
              어린이 기준(1~2세 20g, 3~5세 25g, 6~8세 35g, 9~11세 남 50g·여 45g)도 같은 자료에 있습니다. 임신 2·3분기와
              수유기는 위 값에 추가량이 더해지므로 산부인과·영양 상담에서 확인하세요.
            </p>
            <Callout>
              2020년 개정에서 65세 이상 기준이 올라갔습니다. 근감소증과 노쇠를 막기 위해 남자 65세 이상과 여자 65세 이상
              권장섭취량을 50~64세와 같은 수준으로 맞췄습니다. 나이가 들수록 덜 먹어도 된다는 생각과 반대입니다.
            </Callout>
          </section>

          <section className="rounded-2xl border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5">
            <h2 className="text-xl font-bold text-[var(--foreground)]">체중으로 계산하는 법</h2>
            <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">
              표의 g 수는 표준 체중을 기준으로 한 값입니다. 체중이 기준과 다르면 <strong>체중(kg) × 1kg당 g</strong>으로
              계산하는 편이 정확합니다. 예를 들어 체중 58kg 여성이 근력 운동을 한다면 58 × 1.6 ≈ 93g입니다.
            </p>
            <div className="mt-4 overflow-x-auto">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8e6e3] text-[var(--foreground)]">
                    <th className={thClass}>기준</th>
                    {weights.map((w) => (
                      <th key={w} className={thClass}>
                        {w}kg
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {perKgLevels.map((level) => (
                    <tr key={level.label} className="border-b border-[#f0eeeb] last:border-b-0">
                      <td className={tdClass}>
                        <span className="font-semibold text-[var(--foreground)]">{level.label}</span>
                        <span className="block text-xs">
                          {level.perKg}g/kg · {level.note}
                        </span>
                      </td>
                      {weights.map((w) => (
                        <td key={w} className={tdClass}>
                          {Math.round(w * level.perKg)}g
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs leading-5 text-[var(--foreground-muted)]">
              이 표는 건강한 성인 기준이며 신장·간 질환이 있는 경우에는 맞지 않습니다.
            </p>

            <div className="mt-5 rounded-2xl border border-[#d7e6da] bg-[#f5fbf6] px-4 py-4">
              <p className="text-sm font-semibold text-[#24543d]">내 체중·활동량으로 바로 계산하기</p>
              <p className="mt-1 text-sm leading-6 text-[var(--foreground-muted)]">
                계산기에 체중과 운동 정도를 넣으면 하루 목표량과 한 끼 목표량을 같이 보여줍니다.
              </p>
              <TrackedLink
                href="/guides/tools#daily-protein-calculator"
                trackingLabel="하루 단백질 계산기"
                trackingSection="daily_requirement_calculator_cta"
                trackingPageType="guide"
                className="mt-3 inline-flex items-center rounded-xl bg-[#24543d] px-4 py-2 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#1d4532]"
              >
                하루 단백질 계산기 열기
              </TrackedLink>
            </div>
          </section>

          <GuideBuySection topic="general" variant="top" />

          <section className="rounded-2xl border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5">
            <h2 className="text-xl font-bold text-[var(--foreground)]">운동할 때는 얼마나 늘려야 할까</h2>
            <div className="mt-3 space-y-3 text-sm leading-6 text-[var(--foreground-muted)]">
              <p>
                국제스포츠영양학회(ISSN)는 2017년 입장문에서 운동하는 사람의 하루 단백질을{" "}
                <strong className="text-[var(--foreground)]">체중 1kg당 1.4~2.0g</strong>으로 제시했습니다. 국내 권장섭취량(0.91g)의
                1.5~2배입니다. 근력 운동으로 근육을 늘리려는 경우가 이 범위에 해당하고, 걷기·가벼운 유산소 정도라면
                권장섭취량에서 크게 늘릴 근거는 약합니다.
              </p>
              <p>
                같은 입장문은 한 끼에 <strong className="text-[var(--foreground)]">체중 1kg당 0.25g(대략 20~40g)</strong>을 3~4시간
                간격으로 나눠 먹는 방법을 권합니다. 하루 총량을 채우는 것이 먼저이고, 나눠 먹는 것은 그다음입니다.
              </p>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link
                href="/guides/intake-strategy-health/protein-timing"
                className="rounded-full border border-[#d7e6da] bg-white px-3 py-1.5 text-sm font-semibold text-[#24543d] hover:border-[#24543d]"
              >
                단백질 먹는 시간
              </Link>
              <Link
                href="/guides/intake-strategy-health/protein-50g-at-once"
                className="rounded-full border border-[#d7e6da] bg-white px-3 py-1.5 text-sm font-semibold text-[#24543d] hover:border-[#24543d]"
              >
                한 번에 흡수되는 양
              </Link>
              <Link
                href="/guides/intake-strategy-health/post-workout-protein"
                className="rounded-full border border-[#d7e6da] bg-white px-3 py-1.5 text-sm font-semibold text-[#24543d] hover:border-[#24543d]"
              >
                운동 후 단백질
              </Link>
            </div>
          </section>

          <section className="rounded-2xl border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5">
            <h2 className="text-xl font-bold text-[var(--foreground)]">한국인은 실제로 얼마나 먹고 있을까</h2>
            <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">
              국민건강영양조사(2013~2017) 하루 평균 섭취량입니다. 청년·중년은 평균적으로 권장량을 넘지만, 65세 이상부터
              급격히 줄어 75세 이상 여성은 권장량의 4분의 3에 그칩니다. 평균이 넘어도 하위 10%는 평균필요량보다 적게
              먹습니다.
            </p>
            <div className="mt-4 overflow-x-auto">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8e6e3] text-[var(--foreground)]">
                    <th className={thClass}>대상</th>
                    <th className={thClass}>하루 평균 섭취량</th>
                    <th className={thClass}>권장섭취량 대비</th>
                  </tr>
                </thead>
                <tbody>
                  {actualIntakeRows.map(([who, grams, pct]) => (
                    <tr key={who} className="border-b border-[#f0eeeb] last:border-b-0">
                      <td className={`${tdClass} font-semibold text-[var(--foreground)]`}>{who}</td>
                      <td className={tdClass}>{grams}</td>
                      <td className={tdClass}>{pct}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Callout>
              평균보다 적게 먹을 가능성이 큰 경우: 아침을 거르는 사람, 다이어트로 식사량을 크게 줄인 사람, 혼자 식사하는
              고령층, 고기·달걀·유제품을 거의 먹지 않는 사람. 이런 경우가 아니라면 식사만으로 권장량은 대개 채워집니다.
            </Callout>
          </section>

          <section className="rounded-2xl border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5">
            <h2 className="text-xl font-bold text-[var(--foreground)]">칼로리로 보면: 하루 열량의 7~20%</h2>
            <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">
              2020 기준은 단백질에서 얻는 열량을 하루 섭취 열량의 <strong>7~20%</strong>(에너지적정비율)로 둡니다. 단백질 1g은
              약 4kcal이므로 하루 2,000kcal를 먹는 사람이라면 35~100g입니다. 다이어트로 열량을 1,500kcal로 줄이면 같은
              비율이라도 26~75g으로 내려가, 열량을 줄일 때 단백질 비중을 일부러 지키는 이유가 됩니다.
            </p>
          </section>

          <section className="rounded-2xl border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5">
            <h2 className="text-xl font-bold text-[var(--foreground)]">식사로 부족할 때 채우는 순서</h2>
            <ol className="mt-3 space-y-2 text-sm leading-6 text-[var(--foreground-muted)]">
              <li>
                <strong className="text-[var(--foreground)]">1. 끼니마다 단백질 반찬 하나</strong> — 달걀, 두부, 생선, 살코기,
                우유·요거트처럼 매 끼니 한 가지씩 넣는 것이 가장 쉽고 쌉니다.
              </li>
              <li>
                <strong className="text-[var(--foreground)]">2. 거르는 끼니를 보충</strong> — 아침을 거른다면 그릭요거트, 두유,
                단백질 음료처럼 준비가 필요 없는 것으로 채웁니다.
              </li>
              <li>
                <strong className="text-[var(--foreground)]">3. 그래도 모자라면 제품</strong> — 단백질 음료·쉐이크는 1개에
                10~40g까지 차이가 큽니다. 부족한 양만큼 고르고, 당류와 열량을 같이 봅니다.
              </li>
            </ol>
            <div className="mt-4 flex flex-wrap gap-2">
              <Link
                href="/drinks"
                className="rounded-full border border-[#d7e6da] bg-white px-3 py-1.5 text-sm font-semibold text-[#24543d] hover:border-[#24543d]"
              >
                단백질 음료 성분 비교
              </Link>
              <Link
                href="/yogurt"
                className="rounded-full border border-[#d7e6da] bg-white px-3 py-1.5 text-sm font-semibold text-[#24543d] hover:border-[#24543d]"
              >
                그릭요거트 비교
              </Link>
              <Link
                href="/soymilk"
                className="rounded-full border border-[#d7e6da] bg-white px-3 py-1.5 text-sm font-semibold text-[#24543d] hover:border-[#24543d]"
              >
                두유 단백질 비교
              </Link>
            </div>
          </section>

          <section className="rounded-2xl border border-[#e5deca] bg-[#fdfaf5] px-5 py-5">
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
            <p className="mt-2 text-xs leading-5 text-[var(--foreground-muted)]">
              이 글은 건강한 성인을 위한 일반 정보입니다. 질환이 있거나 약을 먹고 있다면 의료진과 상의하세요.
            </p>
          </section>
        </div>
      </main>
      <CategoryDataSection category="drink" mode="protein" />

      <GuideBuySection topic="general" />

      <GuideNextReads path="/guides/basics/daily-requirement" />
      <Footer />
    </div>
  );
}
