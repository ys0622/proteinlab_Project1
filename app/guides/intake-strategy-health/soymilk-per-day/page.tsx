import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import GuideBuySection from "@/app/components/GuideBuySection";
import { buildGuideJsonLd } from "@/app/lib/guideJsonLd";
import { getSoymilkTier, type SoymilkTier } from "@/app/lib/productFilters";
import { hasNoPurchasableCoupangLink } from "@/app/lib/purchaseLinks";
import soymilkProducts from "@/app/data/soymilkProductsData.json";

// 2026-11-09 질문 허브: 네이버 자동완성 "두유 하루 몇개·두유 하루 섭취량·두유 하루 3개·1팩·두개·적정량"(전용 페이지 없음).
// 1팩 단백질·열량·당류는 등록 두유 성분표(소포장, 1팩 단백질 5g 이상)에서, 권장섭취량·실제 섭취량은 daily-requirement와 같은 출처
// (2020 한국인 영양소 섭취기준, 김은정 외 J Nutr Health 2022 Table 1)에서, 당류 기준은 WHO 2015 지침에서 가져온다. 효능 주장은 하지 않는다.
const canonical = "https://proteinlab.kr/guides/intake-strategy-health/soymilk-per-day";

type SoyRow = { slug: string; capacity: string; proteinPerServing: number; calories?: number; sugar?: number; coupangUrl?: string };
const soy = (soymilkProducts as SoyRow[]).filter((d) => typeof d.proteinPerServing === "number" && d.proteinPerServing > 0);
const median = (values: number[]) => {
  const s = [...values].sort((a, b) => a - b);
  if (!s.length) return 0;
  const mid = Math.floor(s.length / 2);
  return s.length % 2 ? s[mid] : (s[mid - 1] + s[mid]) / 2;
};
const round1 = (v: number) => Math.round(v * 10) / 10;
const pct = (part: number, whole: number) => Math.round((part / whole) * 100);
const nums = (rows: SoyRow[], key: "proteinPerServing" | "calories" | "sugar") =>
  rows.map((d) => d[key]).filter((v): v is number => typeof v === "number");

const packProtein = median(nums(soy, "proteinPerServing"));
const packKcal = median(nums(soy, "calories").filter((v) => v > 0));
const sugars = nums(soy, "sugar");
const packSugar = round1(median(sugars));
const maxSugar = Math.max(...sugars);
const lowSugarCount = sugars.filter((v) => v <= 1).length;
const highSugarCount = sugars.filter((v) => v >= 10).length;
const ml190 = soy.filter((d) => d.capacity === "190mL").length;

const tierOrder: SoymilkTier[] = ["일반", "단백질 강화", "고단백"];
const tierLabel: Record<SoymilkTier, string> = { 일반: "일반(5~7g)", "단백질 강화": "단백질 강화(8~10g)", 고단백: "고단백(11g 이상)" };
const tiers = tierOrder.map((tier) => {
  const rows = soy.filter((d) => getSoymilkTier(d) === tier);
  return {
    tier,
    count: rows.length,
    protein: median(nums(rows, "proteinPerServing")),
    kcal: median(nums(rows, "calories").filter((v) => v > 0)),
    sugar: round1(median(nums(rows, "sugar"))),
  };
});
const high = tiers.find((t) => t.tier === "고단백")!;
const packs = [1, 2, 3];

// 구매 버튼: 고단백(11g 이상) 중 구매 가능한 링크가 있는 제품을 당류 낮은 순, 같으면 열량 낮은 순으로 3개.
const buySlugs = soy
  .filter((d) => getSoymilkTier(d) === "고단백" && !hasNoPurchasableCoupangLink(d.coupangUrl, d.slug))
  .sort((a, b) => (a.sugar ?? 99) - (b.sugar ?? 99) || (a.calories ?? 999) - (b.calories ?? 999))
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

const pageTitle = `두유 하루 몇 개? 1팩·2팩·3팩 단백질·당류·열량 계산`;
const pageDescription = `두유는 하루 몇 개 마셔야 할까요? 등록 두유 ${soy.length}종(1팩 단백질 5g 이상) 성분표로 1팩 단백질 중앙값 ${packProtein}g·열량 ${packKcal}kcal·당류 ${packSugar}g을 구하고, 2020 한국인 영양소 섭취기준 권장섭취량과 비교해 1팩·2팩·3팩이 하루의 몇 %인지, 일반·고단백 두유별로 계산했습니다.`;

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
  `두유 1팩(대부분 190mL, 등록 ${soy.length}종 중 ${ml190}종)의 단백질은 보통 ${packProtein}g입니다(중앙값). 2020 한국인 영양소 섭취기준 권장섭취량으로 보면 남자 19~49세(65g)의 ${pct(packProtein, 65)}%, 여자 30세 이상(50g)의 ${pct(packProtein, 50)}%입니다. 고단백 두유(11g 이상 ${high.count}종)는 1팩 보통 ${high.protein}g으로 ${pct(high.protein, 65)}~${pct(high.protein, 50)}%입니다.`,
  "정해진 하루 개수는 없습니다. 국민건강영양조사(2013~2017)에서 19~49세 성인은 식사로 이미 권장섭취량보다 많이 먹고 있었으므로(남자 136~137%, 여자 117~126%), 두유는 하루 1~2팩을 우유·간식 대신 마시는 정도가 흔한 선택입니다.",
  `3팩을 마시면 단백질 약 ${packProtein * 3}g, 열량 약 ${packKcal * 3}kcal, 당류 약 ${round1(packSugar * 3)}g입니다(중앙값 기준). 당류는 제품마다 0~${maxSugar}g으로 차이가 커서, 여러 팩을 마신다면 개수보다 '당류 몇 g짜리인지'를 먼저 보세요.`,
];

const faqItems = [
  {
    question: "두유 하루에 몇 개 마셔도 되나요?",
    answer: `정해진 개수는 없습니다. 1팩 단백질(보통 ${packProtein}g, 고단백 두유 ${high.protein}g)과 당류·열량을 보고 하루 식사에 맞추는 것이 기준입니다. 우유나 다른 간식을 대신하면 1~2팩이 흔한 선택이고, 그보다 많이 마신다면 당류가 낮은 제품을 고르세요.`,
  },
  {
    question: "두유 하루 3개 마셔도 되나요?",
    answer: `일반 두유 3팩이면 단백질 약 ${packProtein * 3}g, 열량 약 ${packKcal * 3}kcal입니다. 당류가 10g 이상인 제품(등록 ${highSugarCount}종)을 3팩 마시면 당류만 30g이 넘어, WHO가 권하는 하루 유리당 50g 미만(2,000kcal 기준)의 절반을 넘길 수 있습니다. 당류 1g 이하 제품(${lowSugarCount}종)이라면 부담이 훨씬 적습니다.`,
  },
  {
    question: "두유 하루 적정량은 얼마인가요?",
    answer: "두유만의 공식 적정량은 없습니다. 2020 한국인 영양소 섭취기준은 음식 전체에서 먹는 단백질의 권장섭취량(남자 19~49세 65g, 여자 19~29세 55g·30세 이상 50g)을 정하고 있고, 두유는 그중 일부를 채우는 식품입니다.",
  },
  {
    question: "단백질 보충이 목적이면 어떤 두유가 좋나요?",
    answer: `1팩 단백질 11g 이상인 고단백 두유가 효율적입니다. 등록 고단백 두유 ${high.count}종의 1팩 중앙값은 단백질 ${high.protein}g, 열량 ${high.kcal}kcal, 당류 ${high.sugar}g입니다. 전체 순위는 두유 단백질 함량 순위에 정리했습니다.`,
  },
  {
    question: "두유를 많이 마시면 안 되는 사람이 있나요?",
    answer: "대두 알레르기가 있으면 피해야 합니다. 신장 질환이 있거나 단백질·칼륨 제한 식이를 하고 있다면 두유를 늘리기 전에 의료진과 먼저 상의하세요.",
  },
];

const relatedLinks = [
  { href: "/guides/product-selection-comparison/soymilk-protein-ranking", title: "두유 단백질 함량 순위", body: "1팩 단백질 높은 순 전체 비교." },
  { href: "/soymilk", title: "두유 전체 비교", body: "단백질·당류·열량으로 전체 제품 보기." },
  { href: "/guides/basics/daily-requirement", title: "단백질 하루 섭취량", body: "성별·나이·체중별 권장량과 계산법." },
  { href: "/guides/intake-strategy-health/protein-shake-per-day", title: "단백질 쉐이크 하루 몇 번", body: "1포·2포가 권장량의 몇 %인지." },
  { href: "/guides/intake-strategy-health/protein-bar-per-day", title: "단백질바 하루 몇 개", body: "1개·2개 단백질과 열량." },
  { href: "/guides/intake-strategy-health/high-protein-side-effects", title: "단백질 과다섭취 부작용", body: "많이 먹을 때 확인할 것." },
];

const sources = [
  "보건복지부·한국영양학회, 「2020 한국인 영양소 섭취기준」",
  "김은정 외, 2020 한국인 영양소 섭취기준: 단백질. J Nutr Health 2022;55(1):10-29 (연령별 권장섭취량, 국민건강영양조사 2013~2017 섭취량)",
  "WHO, Guideline: Sugars intake for adults and children, 2015 (유리당 총열량의 10% 미만)",
  `ProteinLab 등록 두유 ${soy.length}종(소포장, 1팩 단백질 5g 이상) 성분표(제조사 표기), 2026-11-09 집계`,
];

const cardClass = "rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]";
const thClass = "px-3 py-3 font-semibold";
const tdClass = "px-3 py-3 text-[var(--foreground-muted)]";

export default function SoymilkPerDayPage() {
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
            <span>두유 하루 몇 개</span>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="rounded-md bg-[#f5f0ea] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#7a5230]">질문 답</span>
            <span className="text-[11px] font-medium text-[var(--foreground-muted)]">업데이트 2026-11-09</span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[#16412D] md:text-3xl">두유 하루 몇 개 마셔야 할까</h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            두유 1팩은 보통 단백질 {packProtein}g, 열량 {packKcal}kcal, 당류 {packSugar}g입니다. 하루 권장섭취량(성인 50~65g)과 실제 식사
            섭취량, 당류를 함께 놓고 1팩·2팩·3팩이 어느 정도인지 계산했습니다.
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
            <h2 className="text-xl font-bold text-[var(--foreground)]">두유 종류별 1팩·2팩·3팩</h2>
            <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">
              1팩 단백질로 나눈 등록 두유 구간별 중앙값입니다. 권장량 %는 남자 19~49세 65g / 여자 30세 이상 50g 기준입니다.
            </p>
            <div className="mt-4 overflow-x-auto rounded-2xl border border-[#e2ebe4] bg-[#f7fbf8]">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e2ebe4] text-[var(--foreground)]">
                    <th className={thClass}>구간(제품 수)</th>
                    <th className={thClass}>팩 수</th>
                    <th className={thClass}>단백질</th>
                    <th className={thClass}>권장량 대비(남/여)</th>
                    <th className={thClass}>열량</th>
                    <th className={thClass}>당류</th>
                  </tr>
                </thead>
                <tbody>
                  {tiers.flatMap((t) =>
                    packs.map((n) => (
                      <tr key={`${t.tier}-${n}`} className="border-b border-[#eef3ef] last:border-b-0">
                        <td className={`${tdClass} font-semibold text-[var(--foreground)]`}>{n === 1 ? `${tierLabel[t.tier]} ${t.count}종` : ""}</td>
                        <td className={tdClass}>{n}팩</td>
                        <td className={tdClass}>{round1(t.protein * n)}g</td>
                        <td className={tdClass}>{pct(t.protein * n, 65)}% / {pct(t.protein * n, 50)}%</td>
                        <td className={tdClass}>{Math.round(t.kcal * n)}kcal</td>
                        <td className={tdClass}>{round1(t.sugar * n)}g</td>
                      </tr>
                    )),
                  )}
                </tbody>
              </table>
            </div>
          </section>

          <section className={cardClass}>
            <h2 className="text-xl font-bold text-[var(--foreground)]">나이·성별 권장량 대비 1팩</h2>
            <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">
              일반 두유 1팩 = 전체 중앙값 {packProtein}g, 고단백 두유 1팩 = 고단백 중앙값 {high.protein}g. 권장섭취량은 2020 한국인 영양소 섭취기준입니다.
            </p>
            <div className="mt-4 overflow-x-auto rounded-2xl border border-[#e2ebe4] bg-[#f7fbf8]">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e2ebe4] text-[var(--foreground)]">
                    <th className={thClass}>나이</th>
                    <th className={thClass}>남자 권장량</th>
                    <th className={thClass}>두유 / 고단백 두유</th>
                    <th className={thClass}>여자 권장량</th>
                    <th className={thClass}>두유 / 고단백 두유</th>
                  </tr>
                </thead>
                <tbody>
                  {kdri.map(([age, m, f]) => (
                    <tr key={age} className="border-b border-[#eef3ef] last:border-b-0">
                      <td className={`${tdClass} font-semibold text-[var(--foreground)]`}>{age}</td>
                      <td className={tdClass}>{m}g</td>
                      <td className={tdClass}>{pct(packProtein, m)}% / {pct(high.protein, m)}%</td>
                      <td className={tdClass}>{f}g</td>
                      <td className={tdClass}>{pct(packProtein, f)}% / {pct(high.protein, f)}%</td>
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
              권장섭취량에 못 미칩니다. 평균이라 개인마다 다르니, 식사량이 적다면 두유로 채울 몫이 커집니다.
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

          <section className="rounded-[28px] border border-[#e2ebe4] bg-[#f7fbf8] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">여러 팩 마실 때 같이 볼 것</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-[var(--foreground-muted)]">
              <li>- 당류: 등록 두유 당류는 0~{maxSugar}g입니다. 1g 이하 제품이 {lowSugarCount}종, 10g 이상 제품이 {highSugarCount}종이라 같은 개수라도 당류가 크게 다릅니다. 라벨의 당류는 원료에서 온 당과 넣은 당을 합친 값입니다.</li>
              <li>- 열량: 1팩 중앙값 {packKcal}kcal입니다. 우유·간식을 대신하면 하루 열량은 크게 늘지 않지만, 식사에 더하면 그만큼 늘어납니다.</li>
              <li>- 대두 알레르기가 있으면 피하고, 신장 질환이 있거나 단백질·칼륨 제한 식이를 하고 있다면 두유를 늘리기 전에 의료진과 먼저 상의하세요.</li>
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
