import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import GuideBuySection from "@/app/components/GuideBuySection";
import { buildGuideJsonLd } from "@/app/lib/guideJsonLd";
import { hasNoPurchasableCoupangLink } from "@/app/lib/purchaseLinks";
import yogurtProducts from "@/app/data/yogurtProductsData.json";

// 2026-11-10 질문 허브: 네이버 자동완성 "그릭요거트 칼로리·칼로리 100g·무가당 그릭요거트 칼로리·칼로리 단백질·칼로리 다이어트"(전용 페이지 없음).
// 모든 수치는 등록 그릭요거트 성분표(제조사 표기)에서 100g당으로 환산해 계산한다. 같은 제품의 용량 차이(400g·800g 등)는 100g당 값이 같으면 한 줄로 묶는다.
// 효능 주장은 하지 않는다.
const canonical = "https://proteinlab.kr/guides/product-selection-comparison/greek-yogurt-calories";

type YogRow = {
  slug: string;
  brand: string;
  name: string;
  capacity: string;
  variant?: string;
  yogurtType?: string;
  proteinPerServing: number;
  calories: number;
  sugar?: number;
  fat?: number;
  coupangUrl?: string;
};
const grams = (capacity: string) => {
  const m = /^([\d.]+)\s*g$/i.exec(capacity.trim());
  return m ? Number(m[1]) : null;
};
const round1 = (v: number) => Math.round(v * 10) / 10;
const median = (values: number[]) => {
  const s = [...values].sort((a, b) => a - b);
  if (!s.length) return 0;
  const mid = Math.floor(s.length / 2);
  return s.length % 2 ? s[mid] : (s[mid - 1] + s[mid]) / 2;
};

const greek = (yogurtProducts as YogRow[]).filter(
  (d) => d.yogurtType === "그릭 요거트" && grams(d.capacity) !== null && d.calories > 0 && d.proteinPerServing > 0,
);

type Line = {
  key: string;
  brand: string;
  name: string;
  sizes: number[];
  slugs: string[];
  plain: boolean;
  kcal100: number;
  protein100: number;
  sugar100: number | null;
  fat100: number | null;
  proteinPer100kcal: number;
};
const lineMap = new Map<string, Line>();
for (const d of greek) {
  const g = grams(d.capacity)!;
  const kcal100 = round1((d.calories / g) * 100);
  const protein100 = round1((d.proteinPerServing / g) * 100);
  const sugar100 = typeof d.sugar === "number" ? round1((d.sugar / g) * 100) : null;
  const fat100 = typeof d.fat === "number" ? round1((d.fat / g) * 100) : null;
  const key = `${d.brand}|${kcal100}|${protein100}|${sugar100}`;
  const existing = lineMap.get(key);
  if (existing) {
    existing.sizes.push(g);
    existing.slugs.push(d.slug);
    continue;
  }
  lineMap.set(key, {
    key,
    brand: d.brand,
    name: d.name.replace(/\s*[\d.]+\s*g$/i, "").trim(),
    sizes: [g],
    slugs: [d.slug],
    plain: (d.variant ?? "").includes("플레인"),
    kcal100,
    protein100,
    sugar100,
    fat100,
    proteinPer100kcal: round1((protein100 / kcal100) * 100),
  });
}
const lines = [...lineMap.values()].sort((a, b) => a.kcal100 - b.kcal100 || b.protein100 - a.protein100);
const label = (l: Line) => (l.name.startsWith(l.brand) ? l.name : `${l.brand} ${l.name}`);
const sizeLabel = (l: Line) => [...new Set(l.sizes)].sort((a, b) => a - b).map((s) => `${s}g`).join("·");

const kcalAll = lines.map((l) => l.kcal100);
const kcalMedian = round1(median(kcalAll));
const kcalMin = Math.min(...kcalAll);
const kcalMax = Math.max(...kcalAll);
const plainLines = lines.filter((l) => l.plain);
const flavorLines = lines.filter((l) => !l.plain);
const plainMedian = round1(median(plainLines.map((l) => l.kcal100)));
const plainOver150 = plainLines.filter((l) => l.kcal100 > 150).length;
const flavorMedian = round1(median(flavorLines.map((l) => l.kcal100)));
const lowest = lines[0];
const highest = lines[lines.length - 1];
const under100 = lines.filter((l) => l.kcal100 <= 100).length;
const top10 = [...lines].sort((a, b) => b.kcal100 - a.kcal100).slice(0, 10);
const top10Flavor = top10.filter((l) => !l.plain).length;
const byDensity = [...lines].sort((a, b) => b.proteinPer100kcal - a.proteinPer100kcal);
const densityTop = byDensity.slice(0, 5);
const proteinMedian = round1(median(lines.map((l) => l.protein100)));

// 1컵(200g 이하 소포장)을 통째로 먹을 때의 열량.
const cups = greek
  .filter((d) => (grams(d.capacity) ?? 0) <= 200)
  .sort((a, b) => a.calories - b.calories || b.proteinPerServing - a.proteinPerServing);
const cupKcalMedian = Math.round(median(cups.map((d) => d.calories)));

// 구매 버튼: 100g당 단백질이 중앙값 이상인 플레인 중 구매 가능한 링크가 있는 제품을 100g당 열량 낮은 순으로 3개(라인당 1개).
const bySlug = new Map(greek.map((d) => [d.slug, d]));
const buySlugs = lines
  .filter((l) => l.plain && l.protein100 >= proteinMedian)
  .map((l) => l.slugs.find((s) => !hasNoPurchasableCoupangLink(bySlug.get(s)?.coupangUrl, s)))
  .filter((s): s is string => Boolean(s))
  .slice(0, 3);

const pageTitle = `그릭요거트 칼로리 비교: 100g당 ${kcalMin}~${kcalMax}kcal, 무가당·플레인 순위`;
const pageDescription = `그릭요거트 칼로리는 100g당 얼마일까요? 등록 그릭요거트 ${lines.length}개 제품의 성분표로 100g당 열량을 낮은 순으로 정리했습니다. 중앙값 ${kcalMedian}kcal, 플레인 ${plainMedian}kcal, 맛 첨가 ${flavorMedian}kcal이고, 단백질·당류와 100kcal당 단백질도 함께 비교합니다.`;

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
  `그릭요거트 칼로리는 100g당 ${kcalMin}~${kcalMax}kcal로 제품마다 차이가 큽니다. 등록 ${lines.length}개 제품의 중앙값은 100g당 ${kcalMedian}kcal입니다.`,
  `플레인(무가당 포함) ${plainLines.length}개는 100g당 중앙값 ${plainMedian}kcal, 그래놀라·과일·초코 등 맛 첨가 ${flavorLines.length}개는 ${flavorMedian}kcal입니다. 100g당 열량 상위 10개 중 ${top10Flavor}개가 맛 첨가 제품입니다.`,
  `가장 낮은 제품은 ${label(lowest)}(100g당 ${lowest.kcal100}kcal), 가장 높은 제품은 ${label(highest)}(${highest.kcal100}kcal)입니다. 100kcal 이하 제품은 ${under100}개입니다.`,
];

const faqItems = [
  {
    question: "그릭요거트 칼로리는 100g당 얼마인가요?",
    answer: `등록 그릭요거트 ${lines.length}개 제품 기준 100g당 ${kcalMin}~${kcalMax}kcal이고 중앙값은 ${kcalMedian}kcal입니다. 플레인만 보면 중앙값 ${plainMedian}kcal입니다.`,
  },
  {
    question: "무가당 그릭요거트 칼로리는 얼마인가요?",
    answer: `플레인(무가당 포함) 그릭요거트는 100g당 중앙값 ${plainMedian}kcal입니다. 같은 플레인이라도 100g당 150kcal을 넘는 제품이 ${plainOver150}개 있으므로, 무가당 여부와 함께 라벨의 100g당 열량을 확인하세요.`,
  },
  {
    question: "그릭요거트 한 컵 칼로리는 얼마인가요?",
    answer: `200g 이하 소포장 ${cups.length}개의 1컵 열량 중앙값은 ${cupKcalMedian}kcal입니다. 대용량을 덜어 먹는다면 100g당 열량에 먹는 양을 곱해 계산하면 됩니다(예: 100g당 ${kcalMedian}kcal 제품 150g = 약 ${Math.round(kcalMedian * 1.5)}kcal).`,
  },
  {
    question: "다이어트에는 어떤 그릭요거트가 좋나요?",
    answer: `열량 대비 단백질을 보려면 100kcal당 단백질을 비교하세요. 등록 제품 중 가장 높은 것은 ${label(densityTop[0])}(100kcal당 ${densityTop[0].proteinPer100kcal}g)입니다. 맛 첨가 제품은 같은 양이라도 열량과 당류가 높은 편이라 플레인에 과일을 직접 더하는 방법도 있습니다.`,
  },
  {
    question: "그릭요거트 칼로리와 단백질은 비례하나요?",
    answer: `꼭 그렇지는 않습니다. 100g당 단백질이 10g 이상이면서 열량이 낮은 제품(예: ${label(densityTop[0])})도 있고, 단백질은 비슷한데 지방·토핑 때문에 열량이 높은 제품도 있습니다. 아래 표의 '100kcal당 단백질' 칸으로 비교할 수 있습니다.`,
  },
];

const relatedLinks = [
  { href: "/guides/product-selection-comparison/greek-yogurt-guide", title: "그릭요거트 단백질 함량 순위", body: "100g당 단백질 높은 순 전체 비교." },
  { href: "/guides/intake-strategy-health/greek-yogurt-per-day", title: "그릭요거트 하루 권장량", body: "하루 몇 개·몇 g이 권장량의 몇 %인지." },
  { href: "/guides/product-selection-comparison/unsweetened-greek-yogurt-guide", title: "무가당 그릭요거트", body: "무가당 플레인 제품 비교." },
  { href: "/guides/product-selection-comparison/low-sugar-yogurt-guide", title: "저당 단백질 요거트", body: "당류 낮은 요거트만 모아 보기." },
  { href: "/yogurt", title: "요거트 전체 비교", body: "단백질·당류·열량으로 전체 제품 보기." },
  { href: "/guides/product-selection-comparison/soymilk-calories", title: "두유 칼로리", body: "1팩 열량 낮은 두유 순위." },
];

const cardClass = "rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]";
const thClass = "px-3 py-3 font-semibold whitespace-nowrap";
const tdClass = "px-3 py-3 text-[var(--foreground-muted)]";

export default function GreekYogurtCaloriesPage() {
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
            <span>그릭요거트 칼로리</span>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="rounded-md bg-[#f5f0ea] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#7a5230]">질문 답</span>
            <span className="text-[11px] font-medium text-[var(--foreground-muted)]">업데이트 2026-11-10</span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[#16412D] md:text-3xl">그릭요거트 칼로리 비교: 100g당 열량 낮은 순</h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            그릭요거트 칼로리는 100g당 {kcalMin}~{kcalMax}kcal, 중앙값 {kcalMedian}kcal입니다. 등록 {lines.length}개 제품의 성분표를 100g당으로 맞춰
            열량·단백질·당류를 비교했습니다.
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
            <h2 className="text-xl font-bold text-[var(--foreground)]">그릭요거트 100g당 칼로리 순위</h2>
            <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">
              100g당 열량 낮은 순입니다. 같은 제품의 다른 용량은 100g당 값이 같아 한 줄로 묶었습니다. 제품 이름을 누르면 성분표와 구매 링크가 있는 상세 페이지로 갑니다.
            </p>
            <div className="mt-4 overflow-x-auto rounded-2xl border border-[#e2ebe4] bg-[#f7fbf8]">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e2ebe4] text-[var(--foreground)]">
                    <th className={thClass}>순위</th>
                    <th className={thClass}>제품(용량)</th>
                    <th className={thClass}>100g당 열량</th>
                    <th className={thClass}>단백질</th>
                    <th className={thClass}>당류</th>
                    <th className={thClass}>100kcal당 단백질</th>
                  </tr>
                </thead>
                <tbody>
                  {lines.map((l) => {
                    const rank = lines.findIndex((x) => x.kcal100 === l.kcal100) + 1;
                    const tied = lines.filter((x) => x.kcal100 === l.kcal100).length > 1;
                    return (
                      <tr key={l.key} className="border-b border-[#eef3ef] last:border-b-0">
                        <td className={tdClass}>{tied ? `공동 ${rank}` : rank}</td>
                        <td className={`${tdClass} font-semibold text-[var(--foreground)]`}>
                          <Link href={`/product/${l.slugs[0]}`} className="hover:text-[var(--accent)]">
                            {label(l)}
                          </Link>{" "}
                          <span className="font-normal text-[var(--foreground-muted)]">({sizeLabel(l)})</span>
                        </td>
                        <td className={tdClass}>{l.kcal100}kcal</td>
                        <td className={tdClass}>{l.protein100}g</td>
                        <td className={tdClass}>{l.sugar100 === null ? "-" : `${l.sugar100}g`}</td>
                        <td className={tdClass}>{l.proteinPer100kcal}g</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>

          <section className={cardClass}>
            <h2 className="text-xl font-bold text-[var(--foreground)]">무가당·플레인 vs 맛 첨가 그릭요거트 칼로리</h2>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <div className="rounded-2xl border border-[#e2ebe4] bg-[#f7fbf8] p-4">
                <h3 className="text-sm font-semibold text-[#2d6a4f]">플레인(무가당 포함) {plainLines.length}개</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">
                  100g당 중앙값 {plainMedian}kcal · 범위 {Math.min(...plainLines.map((l) => l.kcal100))}~{Math.max(...plainLines.map((l) => l.kcal100))}kcal
                </p>
              </div>
              <div className="rounded-2xl border border-[#e2ebe4] bg-[#f7fbf8] p-4">
                <h3 className="text-sm font-semibold text-[#2d6a4f]">맛 첨가(그래놀라·과일·초코 등) {flavorLines.length}개</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">
                  100g당 중앙값 {flavorMedian}kcal · 범위 {Math.min(...flavorLines.map((l) => l.kcal100))}~{Math.max(...flavorLines.map((l) => l.kcal100))}kcal
                </p>
              </div>
            </div>
            <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
              같은 플레인이라도 100g당 {Math.min(...plainLines.map((l) => l.kcal100))}kcal부터 {Math.max(...plainLines.map((l) => l.kcal100))}kcal까지 차이가 납니다. &apos;무가당&apos;은 당을 넣지 않았다는 뜻일 뿐 열량이 낮다는 뜻은 아니므로, 라벨의 100g당 열량을 함께 보세요.
            </p>
          </section>

          <section className={cardClass}>
            <h2 className="text-xl font-bold text-[var(--foreground)]">그릭요거트 한 컵 칼로리</h2>
            <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">
              200g 이하 소포장 {cups.length}개를 한 컵 통째로 먹을 때의 열량입니다(1컵 중앙값 {cupKcalMedian}kcal).
            </p>
            <div className="mt-4 overflow-x-auto rounded-2xl border border-[#e2ebe4] bg-[#f7fbf8]">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e2ebe4] text-[var(--foreground)]">
                    <th className={thClass}>제품</th>
                    <th className={thClass}>1컵</th>
                    <th className={thClass}>열량</th>
                    <th className={thClass}>단백질</th>
                    <th className={thClass}>당류</th>
                  </tr>
                </thead>
                <tbody>
                  {cups.map((d) => (
                    <tr key={d.slug} className="border-b border-[#eef3ef] last:border-b-0">
                      <td className={`${tdClass} font-semibold text-[var(--foreground)]`}>
                        <Link href={`/product/${d.slug}`} className="hover:text-[var(--accent)]">
                          {d.name.startsWith(d.brand) ? d.name : `${d.brand} ${d.name}`}
                        </Link>
                      </td>
                      <td className={tdClass}>{d.capacity}</td>
                      <td className={tdClass}>{d.calories}kcal</td>
                      <td className={tdClass}>{d.proteinPerServing}g</td>
                      <td className={tdClass}>{typeof d.sugar === "number" ? `${d.sugar}g` : "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className={cardClass}>
            <h2 className="text-xl font-bold text-[var(--foreground)]">열량 대비 단백질이 많은 그릭요거트</h2>
            <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">
              100kcal당 단백질 높은 순 5개입니다. 같은 열량으로 단백질을 더 채우고 싶을 때 볼 수치입니다.
            </p>
            <ol className="mt-4 space-y-2 text-sm leading-6 text-[var(--foreground-muted)]">
              {densityTop.map((l, i) => (
                <li key={l.key}>
                  {i + 1}.{" "}
                  <Link href={`/product/${l.slugs[0]}`} className="font-semibold text-[var(--foreground)] hover:text-[var(--accent)]">
                    {label(l)}
                  </Link>{" "}
                  — 100kcal당 단백질 {l.proteinPer100kcal}g (100g당 {l.kcal100}kcal · 단백질 {l.protein100}g)
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
              <li>- ProteinLab 등록 그릭요거트 {greek.length}종({lines.length}개 제품) 성분표(제조사 표기), 2026-11-10 집계. 100g당 값은 1개(통) 표기 값을 내용량으로 나눠 계산</li>
            </ul>
          </section>
        </div>
      </main>

      <GuideBuySection slugs={buySlugs} />
      <Footer />
    </div>
  );
}
