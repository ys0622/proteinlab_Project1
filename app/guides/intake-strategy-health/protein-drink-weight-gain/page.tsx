import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import GuideBuySection from "@/app/components/GuideBuySection";
import GuideCompareListCta from "@/app/components/GuideCompareListCta";
import GuideProductHeroCards, { resolveGuideHeroProducts } from "@/app/components/GuideProductHeroCards";
import { buildGuideJsonLd } from "@/app/lib/guideJsonLd";
import { MILK_200ML, drinkStats, shakeStats } from "@/app/lib/shakeStats";

const pageTitle = "단백질 쉐이크 살찌나요? 단백질 음료 살찌나요 — 1개 열량과 과식 연구로 답합니다";
const pageDescription =
  "단백질 쉐이크·단백질 음료가 살찌는지 등록 제품 성분표(쉐이크 112개 1포 중앙값, 음료 1병 중앙값)와 과식 연구(Bray 2012 JAMA), 고단백 연구(Antonio 2014)로 계산했습니다. 식사에 더할 때와 대신할 때, 우유에 탈 때 하루·한 달 열량이 얼마나 달라지는지 정리했습니다.";
const canonical = "https://proteinlab.kr/guides/intake-strategy-health/protein-drink-weight-gain";

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
  twitter: { images: ["https://proteinlab.kr/opengraph-image"], card: "summary" as const, title: pageTitle, description: pageDescription },
};

const quickAnswer = [
  "단백질도 1g에 4kcal입니다. 단백질 쉐이크·음료가 살을 찌우는지는 '먹던 것에 더하는지, 먹던 것을 대신하는지'로 갈립니다. 더하면 그만큼 열량이 늘고, 대신하면 대개 줄어듭니다.",
  `등록 제품 중앙값은 쉐이크 1포 ${shakeStats.medianKcal}kcal, 단백질 음료 1병 ${drinkStats.medianKcal}kcal입니다. 식사는 그대로 두고 매일 1개를 더하면 한 달에 ${(drinkStats.medianKcal * 30).toLocaleString("ko-KR")}~${(shakeStats.medianKcal * 30).toLocaleString("ko-KR")}kcal가 늘어납니다.`,
  "일부러 하루 약 1,000kcal를 더 먹인 8주 실험(Bray 2012)에서 체지방은 단백질 비율과 관계없이 비슷하게 늘었습니다. 살이 찌는 원인은 단백질이 아니라 남는 열량이라는 뜻입니다. 다만 단백질이 충분한 쪽은 늘어난 체중의 절반가량이 근육 등 제지방이었습니다.",
];

const rows: Array<[string, string, string]> = [
  ["식사는 그대로 + 1개 추가", "찔 수 있음", "1개 열량이 그대로 더해집니다. 운동량이 늘지 않았다면 체중이 늘 가능성이 큽니다."],
  ["과자·빵·단 음료 대신", "대개 도움", "열량은 비슷하거나 낮고 단백질은 늘어 포만감이 오래갑니다. 당류 5g 이하 제품을 고르세요."],
  ["한 끼를 대신", "대개 줄어듦", "물에 탄 쉐이크 1포는 한 끼보다 열량이 낮습니다. 너무 낮으면 다음 끼니 폭식으로 이어질 수 있습니다."],
  ["근력 운동 후 보충", "목표에 따라", "운동으로 쓴 열량과 근육 증가를 고려하면 의미가 있지만, 운동량이 적으면 추가 열량이 더 큽니다."],
  ["우유에 타서 + 식사도 그대로", "찔 가능성 큼", `우유 200mL(약 ${MILK_200ML.kcal}kcal, 추정)까지 더해져 1회 300kcal 가까이 됩니다. 체중을 늘리려는 사람에게 맞는 방식입니다.`],
];

const faqItems = [
  {
    question: "단백질 쉐이크 먹으면 살찌나요?",
    answer: `먹던 식사에 더하면 찔 수 있고, 간식이나 한 끼를 대신하면 대개 찌지 않습니다. 등록 쉐이크 ${shakeStats.total}개의 1포 열량은 ${shakeStats.minKcal}~${shakeStats.maxKcal}kcal(중앙값 ${shakeStats.medianKcal}kcal)로, 하루 열량에 이만큼이 더해지는지 빠지는지가 결과를 정합니다.`,
  },
  {
    question: "단백질 음료는 마시면 살찌나요?",
    answer: `단백질 음료 1병은 중앙값 ${drinkStats.medianKcal}kcal로 쉐이크보다 조금 가볍지만 원리는 같습니다. 식사에 추가로 마셔 하루 총열량이 늘면 체중이 늘 수 있습니다. 당류가 0g이어도 열량은 있습니다.`,
  },
  {
    question: "운동 안 하고 단백질 쉐이크 먹으면 살찌나요?",
    answer:
      "운동과 상관없이 하루 열량이 남으면 체중이 늡니다. 운동을 안 한다면 쉐이크를 식사에 더하기보다 간식이나 아침을 대신하는 방식이 맞습니다. 식사로 단백질을 충분히 먹고 있다면 굳이 추가할 이유가 적습니다.",
  },
  {
    question: "자기 전에 단백질 쉐이크 마시면 살찌나요?",
    answer:
      "시간보다 하루 합계가 중요합니다. 저녁을 다 먹고 야식으로 더하면 열량이 늘고, 야식을 쉐이크로 바꾸면 줄어듭니다. 자기 전 단백질 섭취 연구는 대부분 근력 운동을 하는 사람이 대상이었습니다.",
  },
  {
    question: "단백질을 많이 먹으면 살이 안 찌나요?",
    answer:
      "단백질은 탄수화물·지방보다 소화에 쓰이는 에너지가 많고 포만감이 큽니다. 근력 운동하는 사람이 단백질을 크게 늘려도 8주 동안 체지방이 늘지 않았다는 연구도 있습니다(Antonio 2014). 하지만 과식 실험(Bray 2012)에서는 단백질 비율이 높아도 남는 열량만큼 체지방이 늘었습니다. 많이 먹어도 된다는 뜻은 아닙니다.",
  },
  {
    question: "살을 찌우고 싶을 때 단백질 쉐이크가 도움이 되나요?",
    answer:
      "식사량을 늘리기 어려운 사람에게는 우유에 탄 쉐이크가 간편하게 열량과 단백질을 더하는 방법입니다. 근력 운동을 같이 해야 늘어나는 체중 중 근육 비율이 높아집니다.",
  },
];

const relatedLinks = [
  {
    href: "/guides/intake-strategy-health/protein-shake-diet",
    title: "단백질 쉐이크 다이어트",
    body: "한 끼 대신·간식 대신, 감량 중 기준.",
  },
  {
    href: "/guides/intake-strategy-health/protein-shake-effects",
    title: "단백질 쉐이크 효과",
    body: "근육·포만감·식사대용, 연구로 확인한 효과.",
  },
  {
    href: "/guides/product-selection-comparison/protein-shake-calorie-ranking",
    title: "단백질 쉐이크 칼로리 순위",
    body: "1포 열량이 낮은 순서로 봅니다.",
  },
  {
    href: "/guides/intake-strategy-health/protein-drink-sugar",
    title: "단백질 음료 당류 기준",
    body: "체중 관리 중이면 당류와 열량을 같이 봅니다.",
  },
  {
    href: "/guides/intake-strategy-health/protein-drink-daily",
    title: "단백질 음료 매일 마셔도 되나요",
    body: "매일 마실 때 추가 열량인지 먼저 구분합니다.",
  },
  {
    href: "/guides/intake-strategy-health/protein-drink-without-exercise",
    title: "운동 안 해도 마셔도 될까",
    body: "운동량이 적을 때의 섭취 기준.",
  },
];

const sources = [
  "Bray GA et al., Effect of dietary protein content on weight gain, energy expenditure, and body composition during overeating: a randomized controlled trial. JAMA 2012;307(1):47-55",
  "Antonio J et al., The effects of consuming a high protein diet (4.4 g/kg/d) on body composition in resistance-trained individuals. J Int Soc Sports Nutr 2014;11:19",
  "Leidy HJ et al., The role of protein in weight loss and maintenance. Am J Clin Nutr 2015;101(6):1320S-1329S",
  "보건복지부·한국영양학회, 2020 한국인 영양소 섭취기준(에너지 필요추정량)",
  `ProteinLab 등록 제품 성분표 데이터: 단백질 쉐이크 ${shakeStats.total}개(1포 기준), 단백질 음료 ${drinkStats.total}개(1병 기준), 2026-11-02 집계`,
];

// 2020 한국인 영양소 섭취기준 에너지 필요추정량(kcal/일)
const energyNeeds = [
  { label: "여성 30~49세", kcal: 1900 },
  { label: "남성 30~49세", kcal: 2500 },
];

const cardClass = "rounded-[28px] border border-[#e5deca] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(38,28,18,0.05)]";
const thClass = "px-3 py-3 font-semibold";
const tdClass = "px-3 py-3 text-[var(--foreground-muted)]";

export default function ProteinDrinkWeightGainPage() {
  const jsonLd = buildGuideJsonLd({ title: pageTitle, description: pageDescription, url: canonical, dateModified: "2026-11-02", faq: faqItems });

  const addRows = [
    { label: `단백질 음료 1병(중앙값)`, kcal: drinkStats.medianKcal },
    { label: `단백질 쉐이크 1포, 물(중앙값)`, kcal: shakeStats.medianKcal },
    { label: `단백질 쉐이크 1포 + 흰 우유 200mL`, kcal: shakeStats.medianKcal + MILK_200ML.kcal },
  ];

  // 1포 열량이 낮으면서 단백질 20g 이상인 쉐이크(성분표 기준)
  const heroProducts = resolveGuideHeroProducts([
    { slug: "proteone-proteinshake-coffee-40", contextLabel: "108kcal · 단백질 22g" },
    { slug: "thedanbaek-proteinshake-powder-grain-32", contextLabel: "110kcal · 단백질 20g" },
    { slug: "benof-proteinshake-chocolate-cereal-40", contextLabel: "119kcal · 단백질 20g" },
  ]);

  return (
    <div className="min-h-screen bg-white">
      {jsonLd.map((item, index) => (
        <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }} />
      ))}
      <Header />
      <section className="w-full border-b border-t bg-[var(--hero-bg)]" style={{ borderColor: "var(--hero-border)" }}>
        <div className="mx-auto max-w-[1200px] px-4 py-5 md:px-6 md:py-6">
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
            <Link href="/guides" className="hover:text-[var(--accent)]">가이드</Link>
            <span>/</span>
            <Link href="/guides/intake-strategy-health" className="hover:text-[var(--accent)]">섭취 전략 & 건강</Link>
            <span>/</span>
            <span>단백질 쉐이크·음료 살찌나요</span>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="rounded-md bg-[#fbf7f1] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#7a5230]">체중 질문</span>
            <span className="text-[11px] font-medium text-[var(--foreground-muted)]">업데이트 2026-11-02</span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[#16412D] md:text-3xl">
            단백질 쉐이크·단백질 음료, 살찌나요?
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            &quot;단백질은 살 안 찐다&quot;와 &quot;쉐이크 먹고 살쪘다&quot;가 둘 다 들립니다. 등록 제품 성분표로 1개 열량을 하루·한 달
            기준으로 계산하고, 일부러 과식시킨 연구 결과로 답했습니다.
          </p>
          <GuideProductHeroCards products={heroProducts} />
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
            <h2 className="text-xl font-bold text-[var(--foreground)]">매일 1개를 더하면 — 열량 계산</h2>
            <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">
              식사는 그대로 두고 하루 1개를 추가했을 때입니다. 비교 기준은 2020 한국인 영양소 섭취기준의 30~49세 에너지
              필요추정량(여성 1,900kcal, 남성 2,500kcal)입니다.
            </p>
            <div className="mt-4 overflow-x-auto rounded-2xl border border-[#e8e3da] bg-[#fdfaf5]">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8e3da] text-[var(--foreground)]">
                    <th className={thClass}>추가하는 것</th>
                    <th className={thClass}>1개 열량</th>
                    {energyNeeds.map((e) => (
                      <th key={e.label} className={thClass}>{e.label} 하루 필요량 대비</th>
                    ))}
                    <th className={thClass}>30일 합계</th>
                  </tr>
                </thead>
                <tbody>
                  {addRows.map((row) => (
                    <tr key={row.label} className="border-b border-[#f0ece5] last:border-b-0">
                      <td className={`${tdClass} font-semibold text-[var(--foreground)]`}>{row.label}</td>
                      <td className={tdClass}>{row.kcal}kcal</td>
                      {energyNeeds.map((e) => (
                        <td key={e.label} className={tdClass}>{Math.round((row.kcal / e.kcal) * 100)}%</td>
                      ))}
                      <td className={tdClass}>{(row.kcal * 30).toLocaleString("ko-KR")}kcal</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
              하루 필요량의 5~15%가 매일 더해지는 셈입니다. 실제 체중 변화는 몸이 적응하고 활동량이 바뀌어 단순 계산보다
              작게 나타나는 경우가 많지만, 방향은 같습니다. 우유 열량은 시판 흰 우유 표시값 기준 추정치입니다.
            </p>
          </section>

          <section className={cardClass}>
            <h2 className="text-xl font-bold text-[var(--foreground)]">어떻게 먹느냐가 결정한다 — 방식별</h2>
            <div className="mt-4 overflow-x-auto rounded-2xl border border-[#e8e3da] bg-[#fdfaf5]">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8e3da] text-[var(--foreground)]">
                    <th className={thClass}>먹는 방식</th>
                    <th className={thClass}>체중 영향</th>
                    <th className={thClass}>이유</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map(([way, effect, reason]) => (
                    <tr key={way} className="border-b border-[#f0ece5] last:border-b-0">
                      <td className={`${tdClass} font-semibold text-[var(--foreground)]`}>{way}</td>
                      <td className={tdClass}>{effect}</td>
                      <td className={tdClass}>{reason}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className={cardClass}>
            <h2 className="text-xl font-bold text-[var(--foreground)]">연구는 뭐라고 했나 — 단백질과 체지방</h2>
            <div className="mt-3 space-y-3 text-sm leading-6 text-[var(--foreground-muted)]">
              <p>
                <strong className="text-[var(--foreground)]">Bray 외 2012(JAMA)</strong> — 성인 25명에게 8주 동안 필요량보다 40%(하루
                약 1,000kcal) 더 먹이면서 단백질 비율만 5%·15%·25%로 달리했습니다. 체중은 저단백 그룹이 3.16kg, 보통·고단백
                그룹이 6.05kg·6.51kg 늘었는데, 체지방은 세 그룹 모두 비슷하게 늘었습니다. 저단백 그룹은 늘어난 열량의 90% 이상이
                지방으로 쌓였고, 보통·고단백 그룹은 절반가량이 제지방이었습니다. 연구진의 결론은 &quot;체지방 증가에는 단백질보다
                열량이 중요하다&quot;였습니다.
              </p>
              <p>
                <strong className="text-[var(--foreground)]">Antonio 외 2014</strong> — 근력 운동을 하는 사람이 8주 동안 단백질을
                하루 4.4g/kg까지 늘려(하루 열량도 더 많았음) 먹었지만 체중·체지방이 대조군과 의미 있게 다르지 않았습니다. 다만
                참가자가 적고 식사량을 본인이 기록한 연구라 &quot;단백질은 살 안 찐다&quot;의 근거로 일반화하기는 어렵습니다.
              </p>
              <p>
                정리하면 단백질은 같은 열량의 탄수화물·지방보다 체지방으로 덜 쌓일 수 있지만, 남는 열량이 크면 결국 체지방이
                늡니다. 쉐이크가 &apos;추가 열량&apos;이 되는지부터 보세요.
              </p>
            </div>
          </section>

          <section className={cardClass}>
            <h2 className="text-xl font-bold text-[var(--foreground)]">등록 쉐이크 {shakeStats.total}개 1포 열량 분포</h2>
            <div className="mt-4 overflow-x-auto rounded-2xl border border-[#e8e3da] bg-[#fdfaf5]">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8e3da] text-[var(--foreground)]">
                    <th className={thClass}>1포 열량(물)</th>
                    {shakeStats.kcalBuckets.map((b) => (
                      <th key={b.label} className={thClass}>{b.label}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className={`${tdClass} font-semibold text-[var(--foreground)]`}>제품 수</td>
                    {shakeStats.kcalBuckets.map((b) => (
                      <td key={b.label} className={tdClass}>{b.count}개</td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
              가장 낮은 제품({shakeStats.minKcal}kcal)과 높은 제품({shakeStats.maxKcal}kcal)의 차이가 2배가 넘습니다. 단백질은
              대부분 20g대로 비슷하니, 살이 걱정되면 열량과 당류(중앙값 {shakeStats.medianSugar}g)를 먼저 비교하세요.
            </p>
          </section>

          <GuideCompareListCta
            category="shake"
            slugs={["proteone-proteinshake-coffee-40", "thedanbaek-proteinshake-powder-grain-32", "benof-proteinshake-chocolate-cereal-40"]}
          />

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
