import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import GuideBuySection from "@/app/components/GuideBuySection";
import { buildGuideJsonLd } from "@/app/lib/guideJsonLd";
import { hasNoPurchasableCoupangLink } from "@/app/lib/purchaseLinks";
import drinkProducts from "@/app/data/drinkProductsData.json";

// 2026-11-10 질문 허브: 네이버 자동완성 "단백질음료 칼로리"(전용 페이지 없음, 칼로리 순위는 쉐이크에만 있었음).
// 모든 수치는 등록 단백질 음료(RTD 1병 단백질 8g 이상) 성분표(제조사 표기)에서 계산한다. 효능 주장은 하지 않는다.
const canonical = "https://proteinlab.kr/guides/product-selection-comparison/protein-drink-calories";

type DrinkRow = {
  slug: string;
  brand: string;
  name: string;
  capacity: string;
  proteinPerServing: number;
  calories: number;
  sugar?: number;
  drinkType?: string;
  coupangUrl?: string;
};
const mlOf = (capacity: string) => {
  const m = /^([\d.]+)\s*mL$/i.exec((capacity ?? "").trim());
  return m ? Number(m[1]) : null;
};
const round1 = (v: number) => Math.round(v * 10) / 10;
const median = (values: number[]) => {
  const s = [...values].sort((a, b) => a - b);
  if (!s.length) return 0;
  const mid = Math.floor(s.length / 2);
  return s.length % 2 ? s[mid] : (s[mid - 1] + s[mid]) / 2;
};

const drinks = (drinkProducts as DrinkRow[])
  .filter((d) => d.proteinPerServing > 0 && d.calories > 0 && mlOf(d.capacity) !== null)
  .map((d) => {
    const ml = mlOf(d.capacity)!;
    return {
      ...d,
      ml,
      kcal100: round1((d.calories / ml) * 100),
      proteinPer100kcal: round1((d.proteinPerServing / d.calories) * 100),
      label: d.name.startsWith(d.brand) ? d.name : `${d.brand} ${d.name}`,
    };
  })
  .sort((a, b) => a.calories - b.calories || b.proteinPerServing - a.proteinPerServing);

const kcals = drinks.map((d) => d.calories);
const kcalMedian = Math.round(median(kcals));
const kcalMin = Math.min(...kcals);
const kcalMax = Math.max(...kcals);
const kcal100Median = round1(median(drinks.map((d) => d.kcal100)));
const lowest = drinks[0];
const highest = drinks[drinks.length - 1];
const under100 = drinks.filter((d) => d.calories <= 100).length;
const over200 = drinks.filter((d) => d.calories > 200).length;
const densityTop = [...drinks].sort((a, b) => b.proteinPer100kcal - a.proteinPer100kcal).slice(0, 5);

const types = ["워터형", "밀크형"].map((type) => {
  const rows = drinks.filter((d) => d.drinkType === type);
  return {
    type,
    count: rows.length,
    kcal: Math.round(median(rows.map((d) => d.calories))),
    protein: median(rows.map((d) => d.proteinPerServing)),
    sugar: round1(median(rows.map((d) => d.sugar).filter((v): v is number => typeof v === "number"))),
    density: round1(median(rows.map((d) => d.proteinPer100kcal))),
  };
}).filter((t) => t.count > 0);

// 1병 단백질 구간별 열량 중앙값.
const bands = [
  { label: "8~19g", test: (p: number) => p < 20 },
  { label: "20~29g", test: (p: number) => p >= 20 && p < 30 },
  { label: "30~39g", test: (p: number) => p >= 30 && p < 40 },
  { label: "40g 이상", test: (p: number) => p >= 40 },
].map((band) => {
  const rows = drinks.filter((d) => band.test(d.proteinPerServing));
  return {
    label: band.label,
    count: rows.length,
    kcal: Math.round(median(rows.map((d) => d.calories))),
    density: round1(median(rows.map((d) => d.proteinPer100kcal))),
  };
}).filter((b) => b.count > 0);

// 구매 버튼: 구매 가능한 링크가 있고 단백질 20g 이상인 음료 중 1병 열량 낮은 순 3개.
const buySlugs = drinks
  .filter((d) => d.proteinPerServing >= 20 && !hasNoPurchasableCoupangLink(d.coupangUrl, d.slug))
  .slice(0, 3)
  .map((d) => d.slug);

const pageTitle = `단백질 음료 칼로리 비교: 1병 ${kcalMin}~${kcalMax}kcal, 낮은 순 순위`;
const pageDescription = `단백질 음료 칼로리는 1병에 얼마일까요? 등록 단백질 음료 ${drinks.length}종 성분표로 1병 열량을 낮은 순으로 정리했습니다. 중앙값 ${kcalMedian}kcal(100mL당 ${kcal100Median}kcal), 워터형·밀크형과 단백질 구간별 열량, 100kcal당 단백질도 함께 비교합니다.`;

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

const water = types.find((t) => t.type === "워터형");
const milk = types.find((t) => t.type === "밀크형");

const quickAnswer = [
  `단백질 음료 칼로리는 1병에 ${kcalMin}~${kcalMax}kcal이고, 등록 ${drinks.length}종의 중앙값은 ${kcalMedian}kcal입니다. 100mL로 맞추면 중앙값 ${kcal100Median}kcal입니다.`,
  water && milk
    ? `워터형(투명한 음료) ${water.count}종은 1병 중앙값 ${water.kcal}kcal, 우유 같은 밀크형 ${milk.count}종은 ${milk.kcal}kcal입니다.`
    : `음료 형태에 따라 1병 열량이 다릅니다.`,
  `가장 낮은 음료는 ${lowest.label} ${lowest.capacity}(${lowest.calories}kcal), 가장 높은 음료는 ${highest.label} ${highest.capacity}(${highest.calories}kcal)입니다. 100kcal 이하는 ${under100}종, 200kcal 초과는 ${over200}종입니다.`,
];

const faqItems = [
  {
    question: "단백질 음료 1병 칼로리는 얼마인가요?",
    answer: `등록 단백질 음료 ${drinks.length}종 기준 1병 ${kcalMin}~${kcalMax}kcal이고 중앙값은 ${kcalMedian}kcal입니다. 1병 단백질 40g 이상 대용량 제품은 1병 열량이 높은 편이라, 아래 단백질 함량별 표를 함께 보세요.`,
  },
  {
    question: "칼로리 낮은 단백질 음료는 무엇인가요?",
    answer: `1병 열량이 가장 낮은 음료는 ${lowest.label} ${lowest.capacity}(${lowest.calories}kcal, 단백질 ${lowest.proteinPerServing}g)입니다. 100kcal 이하 음료는 ${under100}종이며 아래 순위표에서 전체를 볼 수 있습니다.`,
  },
  {
    question: "다이어트할 때 단백질 음료는 어떻게 고르나요?",
    answer: `1병 열량과 100kcal당 단백질을 같이 보세요. 같은 열량에서 단백질이 가장 많은 음료는 ${densityTop[0].label} ${densityTop[0].capacity}(100kcal당 ${densityTop[0].proteinPer100kcal}g)입니다. 식사에 더해 마시면 그만큼 하루 열량이 늘어난다는 점도 함께 고려하세요.`,
  },
  {
    question: "단백질 40g 음료는 칼로리가 높나요?",
    answer: (() => {
      const b40 = bands.find((b) => b.label === "40g 이상");
      return b40
        ? `1병 단백질 40g 이상 음료 ${b40.count}종의 1병 열량 중앙값은 ${b40.kcal}kcal입니다. 1병 열량은 높지만 100kcal당 단백질은 ${b40.density}g으로, 같은 열량에서 단백질이 많은 편입니다.`
        : "등록 음료 중 40g 이상 제품이 없습니다.";
    })(),
  },
];

const relatedLinks = [
  { href: "/guides/intake-strategy-health/protein-drink-daily", title: "단백질 음료 하루 몇 개", body: "하루에 몇 병까지 마셔도 되는지." },
  { href: "/guides/intake-strategy-health/protein-drink-weight-gain", title: "단백질 음료 살찌나요", body: "열량과 체중의 관계." },
  { href: "/guides/product-selection-comparison/protein-bar-calories", title: "단백질바 칼로리", body: "1개 열량 낮은 바 순위." },
  { href: "/guides/product-selection-comparison/protein-shake-calorie-ranking", title: "단백질 쉐이크 칼로리", body: "쉐이크 열량 낮은 순." },
  { href: "/drinks", title: "단백질 음료 전체 비교", body: "단백질·당류·열량으로 전체 제품 보기." },
];

const cardClass = "rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]";
const thClass = "px-3 py-3 font-semibold whitespace-nowrap";
const tdClass = "px-3 py-3 text-[var(--foreground-muted)]";

export default function ProteinDrinkCaloriesPage() {
  const jsonLd = buildGuideJsonLd({
    title: pageTitle,
    description: pageDescription,
    url: canonical,
    datePublished: "2026-11-10",
    dateModified: "2026-11-10",
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
            <Link href="/guides/product-selection-comparison" className="hover:text-[var(--accent)]">제품 선택·비교</Link>
            <span>/</span>
            <span>단백질 음료 칼로리</span>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="rounded-md bg-[#f5f0ea] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#7a5230]">질문 답</span>
            <span className="text-[11px] font-medium text-[var(--foreground-muted)]">업데이트 2026-11-10</span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[#16412D] md:text-3xl">단백질 음료 칼로리 비교: 1병 열량 낮은 순</h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            단백질 음료 칼로리는 1병 {kcalMin}~{kcalMax}kcal, 중앙값 {kcalMedian}kcal입니다. 등록 단백질 음료 {drinks.length}종의 성분표로 열량·단백질·당류를 함께 비교했습니다.
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
            <h2 className="text-xl font-bold text-[var(--foreground)]">워터형·밀크형 단백질 음료 칼로리</h2>
            <div className="mt-4 overflow-x-auto rounded-2xl border border-[#e2ebe4] bg-[#f7fbf8]">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e2ebe4] text-[var(--foreground)]">
                    <th className={thClass}>형태(제품 수)</th>
                    <th className={thClass}>1병 열량</th>
                    <th className={thClass}>단백질</th>
                    <th className={thClass}>당류</th>
                    <th className={thClass}>100kcal당 단백질</th>
                  </tr>
                </thead>
                <tbody>
                  {types.map((t) => (
                    <tr key={t.type} className="border-b border-[#eef3ef] last:border-b-0">
                      <td className={`${tdClass} font-semibold text-[var(--foreground)]`}>{t.type} {t.count}종</td>
                      <td className={tdClass}>{t.kcal}kcal</td>
                      <td className={tdClass}>{t.protein}g</td>
                      <td className={tdClass}>{t.sugar}g</td>
                      <td className={tdClass}>{t.density}g</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className={cardClass}>
            <h2 className="text-xl font-bold text-[var(--foreground)]">단백질 함량별 1병 칼로리</h2>
            <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">1병 단백질 구간별 중앙값입니다.</p>
            <div className="mt-4 overflow-x-auto rounded-2xl border border-[#e2ebe4] bg-[#f7fbf8]">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e2ebe4] text-[var(--foreground)]">
                    <th className={thClass}>1병 단백질(제품 수)</th>
                    <th className={thClass}>1병 열량</th>
                    <th className={thClass}>100kcal당 단백질</th>
                  </tr>
                </thead>
                <tbody>
                  {bands.map((b) => (
                    <tr key={b.label} className="border-b border-[#eef3ef] last:border-b-0">
                      <td className={`${tdClass} font-semibold text-[var(--foreground)]`}>{b.label} {b.count}종</td>
                      <td className={tdClass}>{b.kcal}kcal</td>
                      <td className={tdClass}>{b.density}g</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className={cardClass}>
            <h2 className="text-xl font-bold text-[var(--foreground)]">단백질 음료 1병 칼로리 순위(낮은 순)</h2>
            <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">
              등록 단백질 음료 {drinks.length}종 전체입니다. 제품 이름을 누르면 성분표와 구매 링크가 있는 상세 페이지로 갑니다.
            </p>
            <div className="mt-4 overflow-x-auto rounded-2xl border border-[#e2ebe4] bg-[#f7fbf8]">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e2ebe4] text-[var(--foreground)]">
                    <th className={thClass}>순위</th>
                    <th className={thClass}>제품</th>
                    <th className={thClass}>용량</th>
                    <th className={thClass}>1병 열량</th>
                    <th className={thClass}>100mL당</th>
                    <th className={thClass}>단백질</th>
                    <th className={thClass}>당류</th>
                  </tr>
                </thead>
                <tbody>
                  {drinks.map((d) => {
                    const rank = drinks.findIndex((x) => x.calories === d.calories) + 1;
                    const tied = drinks.filter((x) => x.calories === d.calories).length > 1;
                    return (
                      <tr key={d.slug} className="border-b border-[#eef3ef] last:border-b-0">
                        <td className={tdClass}>{tied ? `공동 ${rank}` : rank}</td>
                        <td className={`${tdClass} font-semibold text-[var(--foreground)]`}>
                          <Link href={`/product/${d.slug}`} className="hover:text-[var(--accent)]">
                            {d.label}
                          </Link>
                        </td>
                        <td className={tdClass}>{d.capacity}</td>
                        <td className={tdClass}>{d.calories}kcal</td>
                        <td className={tdClass}>{d.kcal100}kcal</td>
                        <td className={tdClass}>{d.proteinPerServing}g</td>
                        <td className={tdClass}>{typeof d.sugar === "number" ? `${d.sugar}g` : "-"}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>

          <section className={cardClass}>
            <h2 className="text-xl font-bold text-[var(--foreground)]">열량 대비 단백질이 많은 단백질 음료</h2>
            <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">100kcal당 단백질 높은 순 5개입니다.</p>
            <ol className="mt-4 space-y-2 text-sm leading-6 text-[var(--foreground-muted)]">
              {densityTop.map((d, i) => (
                <li key={d.slug}>
                  {i + 1}.{" "}
                  <Link href={`/product/${d.slug}`} className="font-semibold text-[var(--foreground)] hover:text-[var(--accent)]">
                    {d.label}
                  </Link>{" "}
                  {d.capacity} — 100kcal당 단백질 {d.proteinPer100kcal}g (1병 {d.calories}kcal · 단백질 {d.proteinPerServing}g)
                </li>
              ))}
            </ol>
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
              <li>- ProteinLab 등록 단백질 음료 {drinks.length}종(RTD 1병 단백질 8g 이상) 성분표(제조사 표기), 2026-11-10 집계</li>
            </ul>
          </section>
        </div>
      </main>

      <GuideBuySection slugs={buySlugs} />
      <Footer />
    </div>
  );
}
