import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import GuideBuySection from "@/app/components/GuideBuySection";
import { buildGuideJsonLd } from "@/app/lib/guideJsonLd";
import { BAR_MIN_PROTEIN_G } from "@/app/lib/categories";
import { hasNoPurchasableCoupangLink } from "@/app/lib/purchaseLinks";
import barProducts from "@/app/data/barProductsData.json";

// 2026-11-10 질문 허브: 네이버 자동완성 "단백질바 칼로리·단백질바 칼로리 비교"(전용 페이지 없음, 칼로리 순위는 쉐이크에만 있었음).
// 모든 수치는 등록 단백질바(1개 단백질 5g 이상) 성분표(제조사 표기)에서 계산한다. 효능 주장은 하지 않는다.
const canonical = "https://proteinlab.kr/guides/product-selection-comparison/protein-bar-calories";

type BarRow = { slug: string; brand: string; name: string; capacity: string; proteinPerServing: number; calories: number; sugar?: number; coupangUrl?: string };
const gramsOf = (capacity: string) => {
  const m = /^([\d.]+)\s*g$/i.exec((capacity ?? "").trim());
  return m ? Number(m[1]) : null;
};
const round1 = (v: number) => Math.round(v * 10) / 10;
const median = (values: number[]) => {
  const s = [...values].sort((a, b) => a - b);
  if (!s.length) return 0;
  const mid = Math.floor(s.length / 2);
  return s.length % 2 ? s[mid] : (s[mid - 1] + s[mid]) / 2;
};

const bars = (barProducts as BarRow[])
  .filter((d) => d.proteinPerServing >= BAR_MIN_PROTEIN_G && d.calories > 0 && gramsOf(d.capacity) !== null)
  .map((d) => {
    const g = gramsOf(d.capacity)!;
    return {
      ...d,
      g,
      kcal: round1(d.calories),
      kcal100: Math.round((d.calories / g) * 100),
      proteinPer100kcal: round1((d.proteinPerServing / d.calories) * 100),
      label: d.name.startsWith(d.brand) ? d.name : `${d.brand} ${d.name}`,
    };
  })
  .sort((a, b) => a.kcal - b.kcal || b.proteinPerServing - a.proteinPerServing);

const kcals = bars.map((d) => d.kcal);
const kcalMedian = Math.round(median(kcals));
const kcalMin = Math.min(...kcals);
const kcalMax = Math.max(...kcals);
const kcal100Median = Math.round(median(bars.map((d) => d.kcal100)));
const gMin = Math.min(...bars.map((d) => d.g));
const gMax = Math.max(...bars.map((d) => d.g));
const lowest = bars[0];
const highest = bars[bars.length - 1];
const under150 = bars.filter((d) => d.kcal <= 150).length;
const over250 = bars.filter((d) => d.kcal > 250).length;
const densityMedian = round1(median(bars.map((d) => d.proteinPer100kcal)));
const densityTop = [...bars].sort((a, b) => b.proteinPer100kcal - a.proteinPer100kcal).slice(0, 5);

// 무게 구간별 1개 열량 중앙값.
const bands = [
  { label: "30g 이하", test: (g: number) => g <= 30 },
  { label: "31~45g", test: (g: number) => g > 30 && g <= 45 },
  { label: "46~55g", test: (g: number) => g > 45 && g <= 55 },
  { label: "56g 이상", test: (g: number) => g > 55 },
].map((band) => {
  const rows = bars.filter((d) => band.test(d.g));
  return {
    label: band.label,
    count: rows.length,
    kcal: Math.round(median(rows.map((d) => d.kcal))),
    protein: round1(median(rows.map((d) => d.proteinPerServing))),
    kcal100: Math.round(median(rows.map((d) => d.kcal100))),
  };
}).filter((b) => b.count > 0);

// 구매 버튼: 구매 가능한 링크가 있고 단백질 12g 이상인 바 중 1개 열량 낮은 순 3개.
const buySlugs = bars
  .filter((d) => d.proteinPerServing >= 12 && !hasNoPurchasableCoupangLink(d.coupangUrl, d.slug))
  .slice(0, 3)
  .map((d) => d.slug);

const pageTitle = `단백질바 칼로리 비교: 1개 ${kcalMin}~${kcalMax}kcal, 낮은 순 순위`;
const pageDescription = `단백질바 칼로리는 1개에 얼마일까요? 등록 단백질바 ${bars.length}종(1개 단백질 ${BAR_MIN_PROTEIN_G}g 이상) 성분표로 1개 열량을 낮은 순으로 정리했습니다. 중앙값 ${kcalMedian}kcal(100g당 ${kcal100Median}kcal), 무게별 열량과 100kcal당 단백질도 함께 비교합니다.`;

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
  `단백질바 칼로리는 1개에 ${kcalMin}~${kcalMax}kcal이고, 등록 ${bars.length}종의 중앙값은 ${kcalMedian}kcal입니다. 바 무게가 ${gMin}~${gMax}g으로 달라서, 100g당으로 맞추면 중앙값 ${kcal100Median}kcal입니다.`,
  `가장 낮은 바는 ${lowest.label}(${lowest.capacity}, ${lowest.kcal}kcal), 가장 높은 바는 ${highest.label}(${highest.capacity}, ${highest.kcal}kcal)입니다. 150kcal 이하는 ${under150}종, 250kcal 초과는 ${over250}종입니다.`,
  `열량만큼 단백질을 보려면 100kcal당 단백질을 비교하세요. 등록 바의 중앙값은 100kcal당 ${densityMedian}g이고, 가장 높은 바는 ${densityTop[0].label}(${densityTop[0].proteinPer100kcal}g)입니다.`,
];

const faqItems = [
  {
    question: "단백질바 1개 칼로리는 얼마인가요?",
    answer: `등록 단백질바 ${bars.length}종 기준 1개 ${kcalMin}~${kcalMax}kcal이고 중앙값은 ${kcalMedian}kcal입니다. 바 무게(${gMin}~${gMax}g)에 따라 1개 열량이 달라서, 비교할 때는 1개 열량과 무게를 함께 보세요.`,
  },
  {
    question: "칼로리 낮은 단백질바는 무엇인가요?",
    answer: `1개 열량이 가장 낮은 바는 ${lowest.label}(${lowest.capacity}, ${lowest.kcal}kcal, 단백질 ${lowest.proteinPerServing}g)입니다. 150kcal 이하 바는 ${under150}종이며, 아래 순위표에서 전체를 볼 수 있습니다.`,
  },
  {
    question: "다이어트할 때 단백질바는 어떻게 고르나요?",
    answer: `1개 열량과 100kcal당 단백질을 같이 보세요. 같은 열량에서 단백질이 많은 바는 ${densityTop[0].label}(100kcal당 ${densityTop[0].proteinPer100kcal}g) 등입니다. 간식으로 더 먹는 경우 하루 열량에 그만큼 더해진다는 점도 함께 고려하세요.`,
  },
  {
    question: "단백질바와 단백질 쉐이크 중 칼로리는 어느 쪽이 낮나요?",
    answer: `제품마다 다르지만, 등록 단백질바의 100kcal당 단백질 중앙값은 ${densityMedian}g입니다. 쉐이크와의 비교는 '단백질바 하루 몇 개' 페이지에 정리했습니다.`,
  },
];

const relatedLinks = [
  { href: "/guides/product-selection-comparison/protein-bar-protein-ranking", title: "단백질바 단백질 함량 순위", body: "1개 단백질 높은 순 전체 비교." },
  { href: "/guides/intake-strategy-health/protein-bar-per-day", title: "단백질바 하루 몇 개", body: "1개·2개 단백질과 열량." },
  { href: "/guides/product-selection-comparison/protein-shake-calorie-ranking", title: "단백질 쉐이크 칼로리", body: "쉐이크 열량 낮은 순." },
  { href: "/guides/product-selection-comparison/protein-drink-calories", title: "단백질 음료 칼로리", body: "1병 열량 낮은 음료 순위." },
  { href: "/bars", title: "단백질바 전체 비교", body: "단백질·당류·열량으로 전체 제품 보기." },
];

const cardClass = "rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]";
const thClass = "px-3 py-3 font-semibold whitespace-nowrap";
const tdClass = "px-3 py-3 text-[var(--foreground-muted)]";

export default function ProteinBarCaloriesPage() {
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
            <span>단백질바 칼로리</span>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="rounded-md bg-[#f5f0ea] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#7a5230]">질문 답</span>
            <span className="text-[11px] font-medium text-[var(--foreground-muted)]">업데이트 2026-11-10</span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[#16412D] md:text-3xl">단백질바 칼로리 비교: 1개 열량 낮은 순</h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            단백질바 칼로리는 1개 {kcalMin}~{kcalMax}kcal, 중앙값 {kcalMedian}kcal입니다. 등록 단백질바 {bars.length}종의 성분표로 열량·단백질·당류를 함께 비교했습니다.
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
            <h2 className="text-xl font-bold text-[var(--foreground)]">무게별 단백질바 칼로리</h2>
            <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">바 무게 구간별 중앙값입니다.</p>
            <div className="mt-4 overflow-x-auto rounded-2xl border border-[#e2ebe4] bg-[#f7fbf8]">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e2ebe4] text-[var(--foreground)]">
                    <th className={thClass}>무게(제품 수)</th>
                    <th className={thClass}>1개 열량</th>
                    <th className={thClass}>단백질</th>
                    <th className={thClass}>100g당 열량</th>
                  </tr>
                </thead>
                <tbody>
                  {bands.map((b) => (
                    <tr key={b.label} className="border-b border-[#eef3ef] last:border-b-0">
                      <td className={`${tdClass} font-semibold text-[var(--foreground)]`}>{b.label} {b.count}종</td>
                      <td className={tdClass}>{b.kcal}kcal</td>
                      <td className={tdClass}>{b.protein}g</td>
                      <td className={tdClass}>{b.kcal100}kcal</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className={cardClass}>
            <h2 className="text-xl font-bold text-[var(--foreground)]">단백질바 1개 칼로리 순위(낮은 순)</h2>
            <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">
              등록 단백질바 {bars.length}종 전체입니다. 제품 이름을 누르면 성분표와 구매 링크가 있는 상세 페이지로 갑니다.
            </p>
            <div className="mt-4 overflow-x-auto rounded-2xl border border-[#e2ebe4] bg-[#f7fbf8]">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e2ebe4] text-[var(--foreground)]">
                    <th className={thClass}>순위</th>
                    <th className={thClass}>제품</th>
                    <th className={thClass}>무게</th>
                    <th className={thClass}>1개 열량</th>
                    <th className={thClass}>100g당</th>
                    <th className={thClass}>단백질</th>
                    <th className={thClass}>당류</th>
                  </tr>
                </thead>
                <tbody>
                  {bars.map((d) => {
                    const rank = bars.findIndex((x) => x.kcal === d.kcal) + 1;
                    const tied = bars.filter((x) => x.kcal === d.kcal).length > 1;
                    return (
                      <tr key={d.slug} className="border-b border-[#eef3ef] last:border-b-0">
                        <td className={tdClass}>{tied ? `공동 ${rank}` : rank}</td>
                        <td className={`${tdClass} font-semibold text-[var(--foreground)]`}>
                          <Link href={`/product/${d.slug}`} className="hover:text-[var(--accent)]">
                            {d.label}
                          </Link>
                        </td>
                        <td className={tdClass}>{d.capacity}</td>
                        <td className={tdClass}>{d.kcal}kcal</td>
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
            <h2 className="text-xl font-bold text-[var(--foreground)]">열량 대비 단백질이 많은 단백질바</h2>
            <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">100kcal당 단백질 높은 순 5개입니다.</p>
            <ol className="mt-4 space-y-2 text-sm leading-6 text-[var(--foreground-muted)]">
              {densityTop.map((d, i) => (
                <li key={d.slug}>
                  {i + 1}.{" "}
                  <Link href={`/product/${d.slug}`} className="font-semibold text-[var(--foreground)] hover:text-[var(--accent)]">
                    {d.label}
                  </Link>{" "}
                  {d.capacity} — 100kcal당 단백질 {d.proteinPer100kcal}g (1개 {d.kcal}kcal · 단백질 {d.proteinPerServing}g)
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
              <li>- ProteinLab 등록 단백질바 {bars.length}종(1개 단백질 {BAR_MIN_PROTEIN_G}g 이상) 성분표(제조사 표기), 2026-11-10 집계</li>
            </ul>
          </section>
        </div>
      </main>

      <GuideBuySection slugs={buySlugs} />
      <Footer />
    </div>
  );
}
