import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import GuideBuySection from "@/app/components/GuideBuySection";
import { buildGuideJsonLd } from "@/app/lib/guideJsonLd";
import { getSoymilkTier, type SoymilkTier } from "@/app/lib/productFilters";
import { hasNoPurchasableCoupangLink } from "@/app/lib/purchaseLinks";
import soymilkProducts from "@/app/data/soymilkProductsData.json";

// 2026-11-10 질문 허브: 네이버 자동완성 "두유 칼로리·두유 칼로리 다이어트"(전용 페이지 없음).
// 모든 수치는 등록 두유 성분표(소포장, 1팩 단백질 5g 이상, 제조사 표기)에서 계산한다. 효능 주장은 하지 않는다.
const canonical = "https://proteinlab.kr/guides/product-selection-comparison/soymilk-calories";

type SoyRow = { slug: string; brand: string; name: string; capacity: string; proteinPerServing: number; calories: number; sugar?: number; coupangUrl?: string };
const mlOf = (capacity: string) => {
  const m = /^([\d.]+)\s*mL$/i.exec(capacity.trim());
  return m ? Number(m[1]) : null;
};
const round1 = (v: number) => Math.round(v * 10) / 10;
const median = (values: number[]) => {
  const s = [...values].sort((a, b) => a - b);
  if (!s.length) return 0;
  const mid = Math.floor(s.length / 2);
  return s.length % 2 ? s[mid] : (s[mid - 1] + s[mid]) / 2;
};

const soy = (soymilkProducts as SoyRow[])
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

const kcals = soy.map((d) => d.calories);
const kcalMedian = Math.round(median(kcals));
const kcalMin = Math.min(...kcals);
const kcalMax = Math.max(...kcals);
const kcal100Median = round1(median(soy.map((d) => d.kcal100)));
const lowest = soy[0];
const highest = soy[soy.length - 1];
const under80 = soy.filter((d) => d.calories <= 80).length;
const over150 = soy.filter((d) => d.calories >= 150).length;
const ml190 = soy.filter((d) => d.ml === 190).length;

const tierOrder: SoymilkTier[] = ["일반", "단백질 강화", "고단백"];
const tierLabel: Record<SoymilkTier, string> = { 일반: "일반(5~7g)", "단백질 강화": "단백질 강화(8~10g)", 고단백: "고단백(11g 이상)" };
const tiers = tierOrder.map((tier) => {
  const rows = soy.filter((d) => getSoymilkTier(d) === tier);
  return {
    tier,
    count: rows.length,
    kcal: Math.round(median(rows.map((d) => d.calories))),
    protein: median(rows.map((d) => d.proteinPerServing)),
    sugar: round1(median(rows.map((d) => d.sugar).filter((v): v is number => typeof v === "number"))),
    density: round1(median(rows.map((d) => d.proteinPer100kcal))),
  };
});

// 당류 10g 이상 두유와 1g 이하 두유의 1팩 열량 중앙값.
const sugarHigh = soy.filter((d) => (d.sugar ?? 0) >= 10);
const sugarLow = soy.filter((d) => typeof d.sugar === "number" && d.sugar <= 1);
const sugarHighKcal = Math.round(median(sugarHigh.map((d) => d.calories)));
const sugarLowKcal = Math.round(median(sugarLow.map((d) => d.calories)));

const densityTop = [...soy].sort((a, b) => b.proteinPer100kcal - a.proteinPer100kcal).slice(0, 5);

// 구매 버튼: 구매 가능한 링크가 있는 두유 중 1팩 열량 낮은 순 3개(단백질 6g 이상).
const buySlugs = soy
  .filter((d) => d.proteinPerServing >= 6 && !hasNoPurchasableCoupangLink(d.coupangUrl, d.slug))
  .slice(0, 3)
  .map((d) => d.slug);

const pageTitle = `두유 칼로리 비교: 1팩 ${kcalMin}~${kcalMax}kcal, 낮은 순 순위`;
const pageDescription = `두유 칼로리는 1팩에 얼마일까요? 등록 두유 ${soy.length}종(1팩 단백질 5g 이상) 성분표로 1팩 열량을 낮은 순으로 정리했습니다. 중앙값 ${kcalMedian}kcal(100mL당 ${kcal100Median}kcal), 일반·고단백 두유별 열량과 100kcal당 단백질, 당류에 따른 차이를 함께 비교합니다.`;

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
  `두유 칼로리는 1팩에 ${kcalMin}~${kcalMax}kcal이고, 등록 ${soy.length}종의 중앙값은 ${kcalMedian}kcal입니다(대부분 190mL, ${ml190}종). 100mL로 맞추면 중앙값 ${kcal100Median}kcal입니다.`,
  `가장 낮은 두유는 ${lowest.label} ${lowest.capacity}(${lowest.calories}kcal), 가장 높은 두유는 ${highest.label} ${highest.capacity}(${highest.calories}kcal)입니다. 80kcal 이하는 ${under80}종, 150kcal 이상은 ${over150}종입니다.`,
  `당류에 따라 열량도 다릅니다. 당류 1g 이하 두유 ${sugarLow.length}종의 1팩 열량 중앙값은 ${sugarLowKcal}kcal, 당류 10g 이상 ${sugarHigh.length}종은 ${sugarHighKcal}kcal입니다.`,
];

const faqItems = [
  {
    question: "두유 1팩 칼로리는 얼마인가요?",
    answer: `등록 두유 ${soy.length}종 기준 1팩 ${kcalMin}~${kcalMax}kcal이고 중앙값은 ${kcalMedian}kcal입니다. 190mL 소포장이 대부분이며, 240mL 고단백 제품은 열량도 높습니다.`,
  },
  {
    question: "다이어트할 때 두유 칼로리는 어떻게 보나요?",
    answer: `1팩 열량과 당류를 함께 보세요. 당류 1g 이하 두유는 1팩 중앙값 ${sugarLowKcal}kcal로, 당류 10g 이상 두유(${sugarHighKcal}kcal)보다 낮습니다. 단백질을 같이 채우고 싶다면 100kcal당 단백질이 높은 제품(예: ${densityTop[0].label}, 100kcal당 ${densityTop[0].proteinPer100kcal}g)을 고르면 됩니다.`,
  },
  {
    question: "고단백 두유는 칼로리가 더 높나요?",
    answer: `1팩 단백질 11g 이상 고단백 두유 ${tiers[2].count}종의 1팩 열량 중앙값은 ${tiers[2].kcal}kcal로, 일반 두유(${tiers[0].kcal}kcal)와 ${tiers[2].kcal >= tiers[0].kcal ? `${tiers[2].kcal - tiers[0].kcal}kcal 차이` : "비슷"}입니다. 대신 100kcal당 단백질은 고단백 ${tiers[2].density}g, 일반 ${tiers[0].density}g으로 차이가 큽니다.`,
  },
  {
    question: "칼로리가 가장 낮은 두유는 무엇인가요?",
    answer: `등록 두유 중 1팩 열량이 가장 낮은 것은 ${lowest.label} ${lowest.capacity}(${lowest.calories}kcal, 단백질 ${lowest.proteinPerServing}g)입니다. 아래 순위표에서 열량 낮은 순으로 전체를 볼 수 있습니다.`,
  },
];

const relatedLinks = [
  { href: "/guides/product-selection-comparison/soymilk-protein-ranking", title: "두유 단백질 함량 순위", body: "1팩 단백질 높은 순 전체 비교." },
  { href: "/guides/intake-strategy-health/soymilk-per-day", title: "두유 하루 몇 개", body: "1팩·2팩·3팩 단백질과 당류." },
  { href: "/soymilk", title: "두유 전체 비교", body: "단백질·당류·열량으로 전체 제품 보기." },
  { href: "/guides/product-selection-comparison/greek-yogurt-calories", title: "그릭요거트 칼로리", body: "100g당 열량 낮은 그릭요거트 순위." },
  { href: "/guides/product-selection-comparison/low-calorie-protein-products-guide", title: "저칼로리 단백질 제품", body: "카테고리별 열량 낮은 제품." },
];

const cardClass = "rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]";
const thClass = "px-3 py-3 font-semibold whitespace-nowrap";
const tdClass = "px-3 py-3 text-[var(--foreground-muted)]";

export default function SoymilkCaloriesPage() {
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
            <span>두유 칼로리</span>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="rounded-md bg-[#f5f0ea] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#7a5230]">질문 답</span>
            <span className="text-[11px] font-medium text-[var(--foreground-muted)]">업데이트 2026-11-10</span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[#16412D] md:text-3xl">두유 칼로리 비교: 1팩 열량 낮은 순</h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            두유 칼로리는 1팩 {kcalMin}~{kcalMax}kcal, 중앙값 {kcalMedian}kcal입니다. 등록 두유 {soy.length}종의 성분표로 열량·단백질·당류를 함께 비교했습니다.
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
            <h2 className="text-xl font-bold text-[var(--foreground)]">두유 종류별 1팩 칼로리</h2>
            <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">1팩 단백질로 나눈 구간별 중앙값입니다.</p>
            <div className="mt-4 overflow-x-auto rounded-2xl border border-[#e2ebe4] bg-[#f7fbf8]">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e2ebe4] text-[var(--foreground)]">
                    <th className={thClass}>구간(제품 수)</th>
                    <th className={thClass}>1팩 열량</th>
                    <th className={thClass}>단백질</th>
                    <th className={thClass}>당류</th>
                    <th className={thClass}>100kcal당 단백질</th>
                  </tr>
                </thead>
                <tbody>
                  {tiers.map((t) => (
                    <tr key={t.tier} className="border-b border-[#eef3ef] last:border-b-0">
                      <td className={`${tdClass} font-semibold text-[var(--foreground)]`}>{tierLabel[t.tier]} {t.count}종</td>
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
            <h2 className="text-xl font-bold text-[var(--foreground)]">두유 1팩 칼로리 순위(낮은 순)</h2>
            <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">
              등록 두유 {soy.length}종 전체입니다. 제품 이름을 누르면 성분표와 구매 링크가 있는 상세 페이지로 갑니다.
            </p>
            <div className="mt-4 overflow-x-auto rounded-2xl border border-[#e2ebe4] bg-[#f7fbf8]">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e2ebe4] text-[var(--foreground)]">
                    <th className={thClass}>순위</th>
                    <th className={thClass}>제품</th>
                    <th className={thClass}>용량</th>
                    <th className={thClass}>1팩 열량</th>
                    <th className={thClass}>100mL당</th>
                    <th className={thClass}>단백질</th>
                    <th className={thClass}>당류</th>
                  </tr>
                </thead>
                <tbody>
                  {soy.map((d) => {
                    const rank = soy.findIndex((x) => x.calories === d.calories) + 1;
                    const tied = soy.filter((x) => x.calories === d.calories).length > 1;
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
            <h2 className="text-xl font-bold text-[var(--foreground)]">열량 대비 단백질이 많은 두유</h2>
            <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">100kcal당 단백질 높은 순 5개입니다.</p>
            <ol className="mt-4 space-y-2 text-sm leading-6 text-[var(--foreground-muted)]">
              {densityTop.map((d, i) => (
                <li key={d.slug}>
                  {i + 1}.{" "}
                  <Link href={`/product/${d.slug}`} className="font-semibold text-[var(--foreground)] hover:text-[var(--accent)]">
                    {d.label}
                  </Link>{" "}
                  {d.capacity} — 100kcal당 단백질 {d.proteinPer100kcal}g (1팩 {d.calories}kcal · 단백질 {d.proteinPerServing}g)
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
              <li>- ProteinLab 등록 두유 {soy.length}종(소포장, 1팩 단백질 5g 이상) 성분표(제조사 표기), 2026-11-10 집계</li>
            </ul>
          </section>
        </div>
      </main>

      <GuideBuySection slugs={buySlugs} />
      <Footer />
    </div>
  );
}
