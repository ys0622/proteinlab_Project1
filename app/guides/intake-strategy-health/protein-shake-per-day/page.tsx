import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import GuideBuySection from "@/app/components/GuideBuySection";
import { buildGuideJsonLd } from "@/app/lib/guideJsonLd";
import { hasNoPurchasableCoupangLink } from "@/app/lib/purchaseLinks";
import shakeProducts from "@/app/data/shakeProductsData.json";

// 2026-11-09 질문 허브: 네이버 자동완성 "단백질 쉐이크 하루 권장량·하루에 몇번·단백질쉐이크 하루"(전용 페이지 없음).
// 1포 단백질은 등록 쉐이크 성분표에서, 권장섭취량·실제 섭취량은 daily-requirement와 같은 출처(2020 한국인 영양소 섭취기준,
// 김은정 외 J Nutr Health 2022 Table 1·3)에서, 운동 시 범위는 ISSN 2017 입장문에서 가져온다. 효능 주장은 하지 않는다.
const canonical = "https://proteinlab.kr/guides/intake-strategy-health/protein-shake-per-day";

type ShakeRow = { slug: string; proteinPerServing: number; calories?: number; coupangUrl?: string };
const shakes = (shakeProducts as ShakeRow[]).filter((d) => d.proteinPerServing > 0);
const median = (values: number[]) => {
  const s = [...values].sort((a, b) => a - b);
  const mid = Math.floor(s.length / 2);
  return s.length % 2 ? s[mid] : (s[mid - 1] + s[mid]) / 2;
};
const packProtein = median(shakes.map((d) => d.proteinPerServing));
const kcals = shakes.map((d) => d.calories).filter((v): v is number => typeof v === "number" && v > 0);
const packKcal = median(kcals);
const minKcal = Math.min(...kcals);
const maxKcal = Math.max(...kcals);
const pct = (part: number, whole: number) => Math.round((part / whole) * 100);
// 구매 버튼: 1포 단백질이 중앙값 이상이고 구매 가능한 링크가 있는 제품 중 열량이 낮은 3개.
const buySlugs = shakes
  .filter((d) => d.proteinPerServing >= packProtein && !hasNoPurchasableCoupangLink(d.coupangUrl, d.slug))
  .sort((a, b) => (a.calories ?? 999) - (b.calories ?? 999))
  .slice(0, 3)
  .map((d) => d.slug);

// 2020 한국인 영양소 섭취기준 권장섭취량(g/일) — daily-requirement 페이지와 같은 값.
const kdri: Array<[string, number, number]> = [
  ["19~29세", 65, 55],
  ["30~49세", 65, 50],
  ["50~64세", 60, 50],
  ["65세 이상", 60, 50],
];
// 국민건강영양조사 2013~2017 하루 평균 섭취량과 권장섭취량 대비 비율(김은정 외 2022 Table 1).
const actualIntake: Array<[string, string, string]> = [
  ["남자 19~29세", "88.3g", "136%"],
  ["남자 30~49세", "88.8g", "137%"],
  ["남자 75세 이상", "58.0g", "97%"],
  ["여자 19~29세", "64.3g", "117%"],
  ["여자 30~49세", "63.0g", "126%"],
  ["여자 75세 이상", "37.7g", "75%"],
];
const exerciseWeights = [50, 60, 70, 80];

const pageTitle = `단백질 쉐이크 하루 몇 번? 권장량으로 계산한 1포·2포 기준`;
const pageDescription = `단백질 쉐이크는 하루 몇 번 먹어야 할까요? 등록 쉐이크 ${shakes.length}종의 1포 단백질 중앙값 ${packProtein}g을 2020 한국인 영양소 섭취기준 권장섭취량(남 60~65g, 여 50~55g)과 비교해 1포·2포가 하루 권장량의 몇 %인지, 운동할 때 기준과 함께 계산했습니다.`;

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
  `단백질 쉐이크 1포의 단백질은 보통 ${packProtein}g입니다(등록 ${shakes.length}종 중앙값). 2020 한국인 영양소 섭취기준 권장섭취량으로 보면 남자 19~49세(65g)의 ${pct(packProtein, 65)}%, 여자 30세 이상(50g)의 ${pct(packProtein, 50)}%입니다.`,
  "국민건강영양조사(2013~2017)에서 19~49세 성인은 식사로 이미 권장섭취량보다 많이 먹고 있었습니다(남자 136~137%, 여자 117~126%). 식사가 고른 날이라면 쉐이크는 하루 1포로 단백질이 적은 끼니를 채우는 용도로 충분한 경우가 많습니다.",
  `2포를 먹으면 단백질 약 ${packProtein * 2}g, 열량 약 ${packKcal * 2}kcal가 더해집니다(물에 탄 기준). 식사를 대신하지 않고 더해 먹는다면 그만큼 하루 열량이 늘어난다는 점을 같이 계산하세요. 근력 운동을 한다면 기준 자체가 달라집니다(아래 표).`,
];

const faqItems = [
  {
    question: "단백질 쉐이크 하루에 몇 번 먹어도 되나요?",
    answer: `정해진 횟수는 없습니다. 1포 단백질(보통 ${packProtein}g)을 하루 권장섭취량(성인 50~65g)과 식사로 먹는 양에 맞춰 보는 것이 기준입니다. 식사로 단백질이 충분하면 1포, 끼니를 거르거나 운동량이 많으면 2포를 생각해 볼 수 있습니다.`,
  },
  {
    question: "단백질 쉐이크 하루 권장량이 따로 있나요?",
    answer: "쉐이크만의 권장량은 없습니다. 2020 한국인 영양소 섭취기준은 음식 전체에서 먹는 단백질의 권장섭취량(남자 19~49세 65g, 여자 19~29세 55g·30세 이상 50g)을 정하고 있고, 쉐이크는 그중 일부를 채우는 식품입니다.",
  },
  {
    question: "운동하는 사람은 쉐이크를 더 먹어야 하나요?",
    answer: "국제스포츠영양학회(ISSN) 2017 입장문은 운동하는 사람에게 체중 1kg당 하루 1.4~2.0g을 권합니다. 70kg이면 98~140g입니다. 한 끼 20~40g씩 3~4시간 간격으로 나누는 방법을 제시하므로, 쉐이크 1포는 그중 한 번 몫으로 볼 수 있습니다.",
  },
  {
    question: "단백질 쉐이크는 언제 먹는 게 좋나요?",
    answer: "먹는 시간보다 하루 총량과 끼니별 분배가 먼저입니다. 운동 직후·아침·자기 전 등 시간별 연구는 단백질 먹는 시간 가이드에 정리해 두었습니다.",
  },
  {
    question: "2포를 한 번에 먹어도 되나요?",
    answer: "한 번에 먹는 양과 흡수에 대한 연구는 '단백질 한 번에 50g' 가이드에 정리했습니다. 신장 질환이 있으면 단백질을 늘리기 전에 의료진과 먼저 상의하세요.",
  },
];

const relatedLinks = [
  { href: "/guides/basics/daily-requirement", title: "단백질 하루 섭취량", body: "성별·나이·체중별 권장량과 계산법." },
  { href: "/guides/intake-strategy-health/protein-timing", title: "단백질 먹는 시간", body: "운동 후·아침·자기 전, 언제 먹을까." },
  { href: "/guides/intake-strategy-health/protein-50g-at-once", title: "단백질 한 번에 50g", body: "한 번에 먹는 양과 흡수 연구." },
  { href: "/guides/intake-strategy-health/protein-shake-effects", title: "단백질 쉐이크 효과", body: "연구로 확인한 것과 아닌 것." },
  { href: "/guides/product-selection-comparison/protein-shake-protein-ranking", title: "쉐이크 단백질 함량 순위", body: "1포 단백질 높은 순 전체 비교." },
  { href: "/guides/intake-strategy-health/high-protein-side-effects", title: "단백질 과다섭취 부작용", body: "많이 먹을 때 확인할 것." },
];

const sources = [
  "보건복지부·한국영양학회, 「2020 한국인 영양소 섭취기준」",
  "김은정 외, 2020 한국인 영양소 섭취기준: 단백질. J Nutr Health 2022;55(1):10-29 (연령별 권장섭취량, 국민건강영양조사 2013~2017 섭취량)",
  "Jäger R. et al., ISSN Position Stand: Protein and Exercise. J Int Soc Sports Nutr 2017;14:20",
  `ProteinLab 등록 단백질 쉐이크 ${shakes.length}종 성분표(제조사 표기), 2026-11-09 집계`,
];

const cardClass = "rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]";
const thClass = "px-3 py-3 font-semibold";
const tdClass = "px-3 py-3 text-[var(--foreground-muted)]";

export default function ProteinShakePerDayPage() {
  const jsonLd = buildGuideJsonLd({
    title: pageTitle,
    description: pageDescription,
    url: canonical,
    datePublished: "2026-11-09",
    dateModified: "2026-11-09",
    faq: faqItems,
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
            <Link href="/guides" className="hover:text-[var(--accent)]">가이드</Link>
            <span>/</span>
            <Link href="/guides/intake-strategy-health" className="hover:text-[var(--accent)]">섭취 전략·건강</Link>
            <span>/</span>
            <span>단백질 쉐이크 하루 몇 번</span>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="rounded-md bg-[#f5f0ea] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#7a5230]">질문 답</span>
            <span className="text-[11px] font-medium text-[var(--foreground-muted)]">업데이트 2026-11-09</span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[#16412D] md:text-3xl">단백질 쉐이크 하루 몇 번 먹어야 할까</h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            쉐이크 1포는 보통 단백질 {packProtein}g입니다. 하루 권장섭취량(성인 50~65g)과 실제로 식사에서 먹는 양을 함께 놓고 1포·2포가
            어느 정도인지 계산했습니다.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <div className="space-y-6">
          <section className="rounded-[28px] border border-[#dce8df] bg-[#f6fbf7] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
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

          <section className={cardClass}>
            <h2 className="text-xl font-bold text-[var(--foreground)]">쉐이크 1포·2포는 하루 권장량의 몇 %인가</h2>
            <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">
              1포 = 등록 쉐이크 {shakes.length}종의 단백질 중앙값 {packProtein}g. 권장섭취량은 2020 한국인 영양소 섭취기준입니다.
            </p>
            <div className="mt-4 overflow-x-auto rounded-2xl border border-[#e2ebe4] bg-[#f7fbf8]">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e2ebe4] text-[var(--foreground)]">
                    <th className={thClass}>나이</th>
                    <th className={thClass}>남자 권장량</th>
                    <th className={thClass}>1포 / 2포</th>
                    <th className={thClass}>여자 권장량</th>
                    <th className={thClass}>1포 / 2포</th>
                  </tr>
                </thead>
                <tbody>
                  {kdri.map(([age, m, f]) => (
                    <tr key={age} className="border-b border-[#eef3ef] last:border-b-0">
                      <td className={`${tdClass} font-semibold text-[var(--foreground)]`}>{age}</td>
                      <td className={tdClass}>{m}g</td>
                      <td className={tdClass}>{pct(packProtein, m)}% / {pct(packProtein * 2, m)}%</td>
                      <td className={tdClass}>{f}g</td>
                      <td className={tdClass}>{pct(packProtein, f)}% / {pct(packProtein * 2, f)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className={cardClass}>
            <h2 className="text-xl font-bold text-[var(--foreground)]">식사로 이미 얼마나 먹고 있나</h2>
            <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">
              국민건강영양조사 2013~2017 하루 평균 단백질 섭취량입니다. 19~49세는 평균적으로 권장섭취량을 넘지만, 75세 이상은 평균이
              권장섭취량에 못 미칩니다. 평균이라 개인마다 다르니, 끼니를 자주 거르거나 식사량이 적다면 쉐이크로 채울 몫이 커집니다.
            </p>
            <div className="mt-4 overflow-x-auto rounded-2xl border border-[#e2ebe4] bg-[#f7fbf8]">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e2ebe4] text-[var(--foreground)]">
                    <th className={thClass}>구분</th>
                    <th className={thClass}>하루 평균 섭취량</th>
                    <th className={thClass}>권장섭취량 대비</th>
                  </tr>
                </thead>
                <tbody>
                  {actualIntake.map(([group, amount, ratio]) => (
                    <tr key={group} className="border-b border-[#eef3ef] last:border-b-0">
                      <td className={`${tdClass} font-semibold text-[var(--foreground)]`}>{group}</td>
                      <td className={tdClass}>{amount}</td>
                      <td className={tdClass}>{ratio}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className={cardClass}>
            <h2 className="text-xl font-bold text-[var(--foreground)]">근력 운동을 한다면</h2>
            <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">
              국제스포츠영양학회(ISSN) 2017 입장문은 운동하는 사람에게 체중 1kg당 하루 1.4~2.0g을 권하고, 한 끼 20~40g씩 3~4시간
              간격으로 나누는 방법을 제시합니다. 아래는 1.4g·2.0g으로 계산한 하루 양과 쉐이크 1포({packProtein}g)가 차지하는 몫입니다.
            </p>
            <div className="mt-4 overflow-x-auto rounded-2xl border border-[#e2ebe4] bg-[#f7fbf8]">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e2ebe4] text-[var(--foreground)]">
                    <th className={thClass}>체중</th>
                    <th className={thClass}>하루 단백질(1.4~2.0g/kg)</th>
                    <th className={thClass}>쉐이크 1포 비중</th>
                  </tr>
                </thead>
                <tbody>
                  {exerciseWeights.map((w) => (
                    <tr key={w} className="border-b border-[#eef3ef] last:border-b-0">
                      <td className={`${tdClass} font-semibold text-[var(--foreground)]`}>{w}kg</td>
                      <td className={tdClass}>{Math.round(w * 1.4)}~{Math.round(w * 2)}g</td>
                      <td className={tdClass}>{pct(packProtein, w * 2)}~{pct(packProtein, w * 1.4)}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-[#f7fbf8] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">2포 이상 먹을 때 같이 볼 것</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-[var(--foreground-muted)]">
              <li>- 열량: 등록 쉐이크 1포는 {minKcal}~{maxKcal}kcal(중앙값 {packKcal}kcal)입니다. 우유에 타면 우유 열량·단백질이 더해집니다.</li>
              <li>- 끼니 대신인지 더하는 것인지: 식사를 대신하면 하루 열량은 크게 늘지 않지만, 간식으로 더하면 그만큼 늘어납니다.</li>
              <li>- 신장 질환이 있거나 단백질 제한 식이를 하고 있다면 쉐이크를 늘리기 전에 의료진과 먼저 상의하세요.</li>
            </ul>
          </section>

          <section className={cardClass}>
            <h2 className="text-xl font-bold text-[var(--foreground)]">자주 묻는 질문</h2>
            <div className="mt-4 space-y-3">
              {faqItems.map((item) => (
                <details key={item.question} className="rounded-xl border border-[#e2ebe4] bg-[#f7fbf8] px-4 py-3">
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
                <Link key={item.href} href={item.href} className="rounded-2xl border border-[#e2ebe4] bg-[#f7fbf8] p-4 transition-colors hover:bg-white">
                  <h3 className="text-sm font-semibold text-[#2d6a4f]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{item.body}</p>
                </Link>
              ))}
            </div>
          </section>

          <section className="rounded-2xl border border-[#e8e6e3] bg-white px-5 py-4">
            <h2 className="text-sm font-bold text-[var(--foreground)]">출처</h2>
            <ul className="mt-2 space-y-1 text-xs leading-5 text-[var(--foreground-muted)]">
              {sources.map((s) => (
                <li key={s}>- {s}</li>
              ))}
            </ul>
          </section>
        </div>
      </main>

      <GuideBuySection slugs={buySlugs} />
      <Footer />
    </div>
  );
}
