import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import GuideBuySection from "@/app/components/GuideBuySection";
import GuideCompareListCta from "@/app/components/GuideCompareListCta";
import { buildGuideJsonLd } from "@/app/lib/guideJsonLd";
import { MILK_200ML, drinkStats, shakeStats } from "@/app/lib/shakeStats";

const pageTitle = "단백질 쉐이크 효과 — 근육·다이어트·포만감, 연구로 확인한 것과 아닌 것";
const pageDescription =
  "단백질 쉐이크·단백질 음료 효과는 부족한 하루 단백질을 채우는 것입니다. 근력 운동과 병행한 49개 연구에서 제지방량이 평균 0.30kg 더 늘었습니다(Morton 2018).";
const canonical = "https://proteinlab.kr/guides/intake-strategy-health/protein-shake-effects";

export const metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical },
  openGraph: {
    images: [{ url: "https://proteinlab.kr/opengraph-image", width: 1200, height: 630, alt: "ProteinLab 단백질 제품 비교" }],
    title: pageTitle,
    description: pageDescription,
    url: canonical,
    type: "article" as const,
    locale: "ko_KR",
    siteName: "ProteinLab",
  },
  twitter: {
    images: ["https://proteinlab.kr/opengraph-image"],
    card: "summary" as const,
    title: pageTitle,
    description: pageDescription,
  },
};

const quickAnswer = [
  "단백질 쉐이크(단백질 음료 포함)의 효과는 '하루 단백질을 편하게 채워 주는 것'입니다. 쉐이크만의 특별한 성분 효과가 있다기보다, 식사로 부족한 단백질을 메우는 만큼 효과가 납니다.",
  "근력 운동과 함께라면 효과가 확인됐습니다. 49개 연구(1,863명)를 모은 메타분석(Morton 2018)에서 단백질 보충은 제지방량(근육 등)을 평균 0.30kg 더 늘렸고 근력 증가도 더 컸습니다. 다만 하루 체중 1kg당 약 1.6g을 넘으면 추가 효과가 뚜렷하지 않았습니다.",
  "운동 없이 이미 단백질을 충분히 먹는 사람에게는 효과가 작습니다. 다이어트 중에는 포만감과 근육 유지에 도움이 되지만(Leidy 2015), 먹던 식사에 더하면 그만큼 열량이 늘어납니다.",
];

const effectRows: Array<[string, string, string]> = [
  ["근력 운동 + 근육 증가", "근거 있음", "Morton 2018: 단백질 보충 시 제지방량 평균 +0.30kg(운동만 한 경우 대비). 크기는 작고, 나이가 많을수록 효과가 줄었음"],
  ["근력 운동 + 근력", "근거 있음", "같은 메타분석에서 최대 근력(1RM) 증가도 보충한 쪽이 더 컸음"],
  ["다이어트 중 포만감·근육 유지", "근거 있음", "Leidy 2015 리뷰: 하루 1.2~1.6g/kg, 끼니당 25~30g 정도의 고단백 식사가 포만감과 감량 중 제지방 유지에 유리"],
  ["식사 대용으로 체중 감량", "조건부", "Heymsfield 2003(6개 연구): 하루 1~2끼를 식사대용으로 바꾼 쪽이 3개월에 약 2.5kg 더 감량. 1년 차이는 통계적으로 뚜렷하지 않음"],
  ["운동 없이 근육 증가", "근거 약함", "운동 자극 없이 단백질만 늘려 근육이 늘었다는 근거는 약함. 단, 식사량이 적은 고령층의 근육 유지 목적은 별도"],
  ["피부·머리카락·면역 개선", "부족할 때만", "단백질이 부족한 사람이 채우면 의미가 있지만, 이미 충분한 사람에게 추가 효과가 있다는 근거는 없음"],
];

const fitRows: Array<[string, string, string]> = [
  ["근력 운동 중 + 하루 단백질이 체중 1kg당 1.2g 미만", "효과 기대", "부족분을 쉐이크 1개(20g 안팎)로 채우는 것이 가장 효과가 확인된 쓰임입니다."],
  ["다이어트 중, 간식·야식을 줄이고 싶음", "도움 가능", "과자·빵 대신이면 열량은 비슷하거나 낮고 단백질은 늘어납니다. 식사에 '더하면' 효과가 사라집니다."],
  ["65세 이상, 식사량이 줄었음", "도움 가능", "PROT-AGE(2013)는 65세 이상에게 하루 1.0~1.2g/kg을 제안합니다. 끼니를 거르기 쉽다면 보충 수단이 됩니다."],
  ["운동은 거의 안 하고 식사가 규칙적", "효과 작음", "한국 성인 권장량(남 60~65g, 여 50~55g)을 식사로 이미 채우는 경우가 많습니다. 단백질 섭취량부터 계산해 보세요."],
  ["신장 질환·단백질 제한 중", "의료진 상담 먼저", "임의로 고단백 제품을 더하지 않습니다."],
];

const faqItems = [
  {
    question: "단백질 쉐이크 효과는 언제부터 나타나나요?",
    answer:
      "근육·근력 효과를 본 연구들은 대부분 6주 이상 근력 운동을 하면서 보충한 결과입니다. 몇 주 만에 눈에 띄게 달라지기보다, 수개월 동안 운동과 함께 하루 단백질을 꾸준히 채웠을 때 평균적으로 조금 더 늘어나는 정도로 보는 것이 맞습니다.",
  },
  {
    question: "운동 안 하고 단백질 쉐이크만 먹어도 효과가 있나요?",
    answer:
      "식사로 단백질이 부족한 사람이라면 부족분을 채우는 의미가 있습니다. 하지만 운동 없이 단백질만 늘려 근육이 늘었다는 근거는 약하고, 이미 충분히 먹는 사람이라면 추가되는 열량만 남습니다.",
  },
  {
    question: "단백질 음료와 단백질 쉐이크는 효과가 다른가요?",
    answer: `단백질 양이 같다면 효과 차이를 보인 근거는 없습니다. 차이는 형태입니다. 등록 제품 중앙값 기준으로 쉐이크 1포는 단백질 ${shakeStats.medianProtein}g·${shakeStats.medianKcal}kcal·식이섬유 ${shakeStats.medianFiber}g, 단백질 음료 1병은 단백질 ${drinkStats.medianProtein}g·${drinkStats.medianKcal}kcal입니다. 쉐이크는 곡물·식이섬유가 들어 한 끼 대용에 가깝고, 음료는 열량 대비 단백질이 높아 보충용에 가깝습니다.`,
  },
  {
    question: "단백질 쉐이크는 하루에 몇 개까지 마셔도 되나요?",
    answer:
      "개수보다 하루 총량으로 봅니다. 근력 운동을 하는 사람도 하루 체중 1kg당 약 1.6g을 넘으면 근육 증가 효과가 더 커지지 않았습니다(Morton 2018). 식사로 먹는 양을 빼고 모자라는 만큼만 1~2개로 채우는 것이 일반적입니다.",
  },
  {
    question: "단백질 쉐이크는 물에 타야 하나요, 우유에 타야 하나요?",
    answer: `효과 자체는 같습니다. 흰 우유 200mL를 쓰면 대략 ${MILK_200ML.kcal}kcal와 단백질 ${MILK_200ML.protein}g 안팎이 더해집니다(시판 제품 표시 기준 추정). 다이어트 중이면 물, 한 끼 대용이나 체중을 늘리는 중이면 우유가 맞습니다.`,
  },
];

const relatedLinks = [
  {
    href: "/guides/intake-strategy-health/protein-shake-diet",
    title: "단백질 쉐이크 다이어트",
    body: "한 끼 대신·간식 대신, 열량과 단백질 기준으로 정리했습니다.",
  },
  {
    href: "/guides/intake-strategy-health/protein-drink-weight-gain",
    title: "단백질 쉐이크·음료 살찌나요",
    body: "1개 열량을 하루 기준으로 계산하고 과식 연구를 정리했습니다.",
  },
  {
    href: "/guides/basics/daily-requirement",
    title: "단백질 하루 섭취량",
    body: "쉐이크로 채울 양을 정하기 전에 하루 총량부터.",
  },
  {
    href: "/guides/intake-strategy-health/protein-timing",
    title: "단백질 먹는 시간",
    body: "운동 후 30분 안에 꼭 마셔야 하는지 연구로 확인했습니다.",
  },
  {
    href: "/guides/product-selection-comparison/protein-shake-guide",
    title: "단백질 쉐이크 고르는 법",
    body: "아침·운동·다이어트 목적별로 고르는 기준.",
  },
  {
    href: "/guides/product-selection-comparison/protein-drink-vs-protein-shake",
    title: "단백질 음료 vs 쉐이크",
    body: "RTD와 파우치형 중 무엇이 맞는지.",
  },
];

const sources = [
  "Morton RW et al., A systematic review, meta-analysis and meta-regression of the effect of protein supplementation on resistance training-induced gains in muscle mass and strength in healthy adults. Br J Sports Med 2018;52(6):376-384",
  "Leidy HJ et al., The role of protein in weight loss and maintenance. Am J Clin Nutr 2015;101(6):1320S-1329S",
  "Heymsfield SB et al., Weight management using a meal replacement strategy: meta and pooling analysis from six studies. Int J Obes 2003;27(5):537-549",
  "Bauer J et al., Evidence-based recommendations for optimal dietary protein intake in older people: a position paper from the PROT-AGE Study Group. J Am Med Dir Assoc 2013;14(8):542-559",
  "보건복지부·한국영양학회, 2020 한국인 영양소 섭취기준",
  `ProteinLab 등록 제품 성분표 데이터: 단백질 쉐이크 ${shakeStats.total}개(1포 기준), 단백질 음료 ${drinkStats.total}개(1병 기준), 2026-11-02 집계`,
];

const cardClass = "rounded-[28px] border border-[#e5deca] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(38,28,18,0.05)]";
const thClass = "px-3 py-3 font-semibold";
const tdClass = "px-3 py-3 text-[var(--foreground-muted)]";

export default function ProteinShakeEffectsPage() {
  const jsonLd = buildGuideJsonLd({
    title: pageTitle,
    description: pageDescription,
    url: canonical,
    datePublished: "2026-11-02",
    dateModified: "2026-11-02",
    faq: faqItems,
  });

  const formRows: Array<[string, string, string]> = [
    ["1개 단백질", `${shakeStats.medianProtein}g`, `${drinkStats.medianProtein}g`],
    ["1개 열량", `${shakeStats.medianKcal}kcal`, `${drinkStats.medianKcal}kcal`],
    ["1개 당류", `${shakeStats.medianSugar}g`, `${drinkStats.medianSugar}g`],
    ["열량 중 단백질 비율", `약 ${shakeStats.medianProteinEnergyPct}%`, `약 ${drinkStats.medianProteinEnergyPct}%`],
    ["어울리는 쓰임", "한 끼 대용·간식 대체(식이섬유·곡물 포함)", "운동 후·식사 사이 보충(열량 대비 단백질 높음)"],
  ];

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
            <span>단백질 쉐이크 효과</span>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="rounded-md bg-[#fbf7f1] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#7a5230]">효과 질문</span>
            <span className="text-[11px] font-medium text-[var(--foreground-muted)]">업데이트 2026-11-02</span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[#16412D] md:text-3xl">
            단백질 쉐이크 효과, 연구로 확인된 것과 아닌 것
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            단백질 쉐이크·단백질 음료 효과는 부족한 하루 단백질을 채우는 것이며, 근력 운동과 병행한 49개 연구에서는
            제지방량이 평균 0.30kg 더 늘었습니다(Morton 2018 메타분석). 운동 없이 이미 충분히 먹는 사람의 추가 효과는 작습니다.
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
          <GuideBuySection topic="workout" variant="top" />

          <section className={cardClass}>
            <h2 className="text-xl font-bold text-[var(--foreground)]">단백질 쉐이크·단백질 음료 효과는 무엇인가요?</h2>
            <div className="mt-4 overflow-x-auto rounded-2xl border border-[#e8e3da] bg-[#fdfaf5]">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8e3da] text-[var(--foreground)]">
                    <th className={thClass}>기대하는 효과</th>
                    <th className={thClass}>근거</th>
                    <th className={thClass}>연구 내용</th>
                  </tr>
                </thead>
                <tbody>
                  {effectRows.map(([effect, level, detail]) => (
                    <tr key={effect} className="border-b border-[#f0ece5] last:border-b-0">
                      <td className={`${tdClass} font-semibold text-[var(--foreground)]`}>{effect}</td>
                      <td className={tdClass}>{level}</td>
                      <td className={tdClass}>{detail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
              대부분의 연구는 쉐이크라는 형태가 아니라 &apos;단백질을 더 먹은 것&apos;의 효과를 봤습니다. 같은 양을 고기·달걀·우유로
              먹어도 기대할 수 있는 효과는 같고, 쉐이크의 장점은 양을 정확히 맞추기 쉽고 간편하다는 데 있습니다.
            </p>
          </section>

          <section className={cardClass}>
            <h2 className="text-xl font-bold text-[var(--foreground)]">근육 효과의 크기 — 0.30kg은 얼마나 큰가</h2>
            <div className="mt-3 space-y-3 text-sm leading-6 text-[var(--foreground-muted)]">
              <p>
                Morton 등(2018)은 근력 운동을 하면서 단백질을 보충한 49개 무작위 대조 연구를 묶었습니다. 단백질을 더 먹은 쪽은
                운동만 한 쪽보다 제지방량이 평균 <strong className="text-[var(--foreground)]">0.30kg</strong> 더 늘었습니다. 운동
                자체로 늘어나는 양에 &apos;조금 더&apos; 얹히는 크기입니다.
              </p>
              <p>
                효과는 근력 운동 경험이 있는 사람에게서 더 컸고, 나이가 많을수록 줄었습니다. 하루 섭취량이 체중 1kg당 약
                <strong className="text-[var(--foreground)]"> 1.6g</strong>을 넘으면 더 늘지 않는 모습이었는데, 이 값은 범위가 넓은
                추정치라 정확한 상한으로 보기는 어렵습니다.
              </p>
              <p>
                그래서 쉐이크가 가장 효과를 내는 경우는 &apos;운동은 하는데 식사로 단백질이 모자란 사람&apos;입니다. 하루 섭취량을
                먼저 계산해 보고 모자라는 만큼만 채우세요.
              </p>
            </div>
          </section>

          <section className={cardClass}>
            <h2 className="text-xl font-bold text-[var(--foreground)]">쉐이크 vs 단백질 음료 — 등록 제품 성분 중앙값</h2>
            <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">
              ProteinLab에 등록된 단백질 쉐이크 {shakeStats.total}개(1포, 물에 탄 기준)와 단백질 음료 {drinkStats.total}개(1병)의
              성분표 값을 집계했습니다.
            </p>
            <div className="mt-4 overflow-x-auto rounded-2xl border border-[#e8e3da] bg-[#fdfaf5]">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8e3da] text-[var(--foreground)]">
                    <th className={thClass}>항목(중앙값)</th>
                    <th className={thClass}>단백질 쉐이크</th>
                    <th className={thClass}>단백질 음료</th>
                  </tr>
                </thead>
                <tbody>
                  {formRows.map(([label, shake, drink]) => (
                    <tr key={label} className="border-b border-[#f0ece5] last:border-b-0">
                      <td className={`${tdClass} font-semibold text-[var(--foreground)]`}>{label}</td>
                      <td className={tdClass}>{shake}</td>
                      <td className={tdClass}>{drink}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 overflow-x-auto rounded-2xl border border-[#e8e3da] bg-[#fdfaf5]">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8e3da] text-[var(--foreground)]">
                    <th className={thClass}>쉐이크 1포 단백질</th>
                    {shakeStats.proteinBuckets.map((b) => (
                      <th key={b.label} className={thClass}>{b.label}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className={`${tdClass} font-semibold text-[var(--foreground)]`}>제품 수</td>
                    {shakeStats.proteinBuckets.map((b) => (
                      <td key={b.label} className={tdClass}>{b.count}개</td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
              쉐이크는 대부분 1포에 단백질 20g대로 비슷합니다. 차이는 열량({shakeStats.minKcal}~{shakeStats.maxKcal}kcal)과
              당류·식이섬유에서 크게 나므로, 효과보다 목적(한 끼 대용인지, 보충인지)에 맞춰 고르는 편이 실패가 적습니다.
            </p>
          </section>

          <GuideCompareListCta
            category="shake"
            slugs={["itthefit-proteinshake-misugaru-40", "proteone-proteinshake-choco-40", "flymill-proteinshake-choco-45"]}
          />

          <section className={cardClass}>
            <h2 className="text-xl font-bold text-[var(--foreground)]">누구에게 효과가 있나 — 상황별</h2>
            <div className="mt-4 overflow-x-auto rounded-2xl border border-[#e8e3da] bg-[#fdfaf5]">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8e3da] text-[var(--foreground)]">
                    <th className={thClass}>상황</th>
                    <th className={thClass}>판단</th>
                    <th className={thClass}>이유</th>
                  </tr>
                </thead>
                <tbody>
                  {fitRows.map(([situation, verdict, reason]) => (
                    <tr key={situation} className="border-b border-[#f0ece5] last:border-b-0">
                      <td className={`${tdClass} font-semibold text-[var(--foreground)]`}>{situation}</td>
                      <td className={tdClass}>{verdict}</td>
                      <td className={tdClass}>{reason}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className={cardClass}>
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

          <section className={cardClass}>
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
      <GuideBuySection topic="workout" />
      <Footer />
    </div>
  );
}
