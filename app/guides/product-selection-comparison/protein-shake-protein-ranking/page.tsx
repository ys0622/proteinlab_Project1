import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import GuideBuySection from "@/app/components/GuideBuySection";
import GuideCompareListCta from "@/app/components/GuideCompareListCta";
import GuideProductHeroCards, { resolveGuideHeroProducts } from "@/app/components/GuideProductHeroCards";
import { buildGuideJsonLd } from "@/app/lib/guideJsonLd";
import { formatProductLabel } from "@/app/lib/productLabel";
import { hasNoPurchasableCoupangLink } from "@/app/lib/purchaseLinks";
import shakeProducts from "@/app/data/shakeProductsData.json";

// 2026-11-09 질문 허브: 네이버 자동완성 "단백질쉐이크 단백질 함량·단백질 함량 비교"(전용 페이지 없음).
// 등록 쉐이크 성분표로 1회분(1포) 단백질 순위를 계산한다. 순위는 표준 방식(이보다 높은 제품 수 + 1, 같으면 공동).
const canonical = "https://proteinlab.kr/guides/product-selection-comparison/protein-shake-protein-ranking";

type ShakeRow = {
  slug: string;
  brand: string;
  name: string;
  capacity: string;
  variant?: string;
  flavor?: string;
  proteinPerServing: number;
  calories?: number;
  sugar?: number;
  coupangUrl?: string;
};
const round1 = (v: number) => Math.round(v * 10) / 10;
const rows = (shakeProducts as ShakeRow[])
  .filter((d) => typeof d.proteinPerServing === "number" && d.proteinPerServing > 0)
  .map((d) => ({ ...d, per100kcal: d.calories ? round1((d.proteinPerServing / d.calories) * 100) : null }))
  .sort((a, b) => b.proteinPerServing - a.proteinPerServing || (a.sugar ?? 99) - (b.sugar ?? 99));
const rankOf = (p: number) => rows.filter((x) => x.proteinPerServing > p).length + 1;
const tieCount = (p: number) => rows.filter((x) => x.proteinPerServing === p).length;
const rankLabel = (p: number) => `${tieCount(p) > 1 ? "공동 " : ""}${rankOf(p)}`;

// 같은 브랜드·제품명(맛만 다른 것)·용량은 한 줄로 묶어 브랜드 라인 비교에 쓴다.
const baseName = (d: ShakeRow) => d.name.replace(/\s*\([^)]*\)\s*/g, " ").replace(/\s+/g, " ").trim();
const lineKey = (d: ShakeRow) => `${d.brand}|${baseName(d)}|${d.capacity}`;
const lines = Array.from(new Set(rows.map(lineKey)))
  .map((key) => {
    const list = rows.filter((d) => lineKey(d) === key);
    const ps = list.map((d) => d.proteinPerServing);
    return { key, first: list[0], count: list.length, min: Math.min(...ps), max: Math.max(...ps) };
  })
  .sort((a, b) => b.max - a.max || b.min - a.min);

const proteins = rows.map((d) => d.proteinPerServing);
const maxP = Math.max(...proteins);
const minP = Math.min(...proteins);
const topRows = rows.filter((d) => d.proteinPerServing === maxP);
const countAtLeast = (g: number) => rows.filter((d) => d.proteinPerServing >= g).length;
const modeCount = new Map<number, number>();
proteins.forEach((p) => modeCount.set(p, (modeCount.get(p) ?? 0) + 1));
const [modeP, modeN] = [...modeCount.entries()].sort((a, b) => b[1] - a[1])[0];
const twentyBand = rows.filter((d) => d.proteinPerServing >= 20 && d.proteinPerServing < 25).length;
const byDensity = rows.filter((d) => d.per100kcal != null).sort((a, b) => (b.per100kcal as number) - (a.per100kcal as number));
const densityTop = byDensity.filter((d) => d.per100kcal === byDensity[0].per100kcal);
const lowSugarHigh = rows
  .filter((d) => d.proteinPerServing >= 20 && d.sugar != null)
  .slice()
  .sort((a, b) => (a.sugar as number) - (b.sugar as number) || b.proteinPerServing - a.proteinPerServing)
  .slice(0, 8);
const heroRows = rows.filter((d) => !hasNoPurchasableCoupangLink(d.coupangUrl, d.slug)).slice(0, 3);
const names = (list: ShakeRow[]) => list.map((d) => formatProductLabel(d.brand, d.name)).join("·");

const pageTitle = `단백질 쉐이크 단백질 함량 비교 — 1포 ${minP}g부터 ${maxP}g까지 ${rows.length}종 순위`;
const pageDescription = `단백질 쉐이크 단백질 함량을 1회분(1포) 기준으로 순위를 매겼습니다. 등록 쉐이크 ${rows.length}종은 1포 단백질 ${minP}~${maxP}g이고, 20~24g대가 ${twentyBand}종으로 대부분입니다. 브랜드별 단백질 범위, 100kcal당 단백질, 당류 낮은 고단백 쉐이크까지 성분표 기준으로 정리했습니다.`;

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
  `등록된 단백질 쉐이크 ${rows.length}종(맛별 포함)의 단백질은 1포에 ${minP}g에서 ${maxP}g까지입니다. 가장 높은 제품은 ${names(topRows)}(${maxP}g)이고, 24g 이상은 ${countAtLeast(24)}종입니다.`,
  `가장 많은 값은 ${modeP}g(${modeN}종)이고, 20~24g대가 ${twentyBand}종입니다. 같은 브랜드라도 맛에 따라 1~2g, 많게는 그 이상 차이 나므로 맛별 성분표를 따로 봐야 합니다.`,
  `열량까지 보면 100kcal당 단백질이 가장 높은 제품은 ${names(densityTop)}(${byDensity[0].per100kcal}g)입니다. 아래 값은 모두 물에 타기 전 1포 기준 제조사 성분표입니다(우유에 타면 우유 단백질·열량이 더해집니다).`,
];

const faqItems = [
  {
    question: "단백질 쉐이크 단백질 함량은 보통 얼마인가요?",
    answer: `등록 쉐이크 ${rows.length}종 기준 1포 ${minP}~${maxP}g이고, ${modeP}g 제품이 ${modeN}종으로 가장 많습니다. 20~24g대가 ${twentyBand}종입니다.`,
  },
  {
    question: "단백질 함량이 가장 높은 쉐이크는?",
    answer: `1포 기준으로 가장 높은 제품은 ${names(topRows)}(${maxP}g)입니다. 24g 이상인 제품은 ${countAtLeast(24)}종입니다.`,
  },
  {
    question: "우유에 타면 단백질이 얼마나 늘어나나요?",
    answer: "표의 값은 쉐이크 1포 자체의 성분입니다. 우유에 타면 넣은 우유의 단백질과 열량이 더해지므로, 우유 팩의 성분표 값을 따로 더해 계산하세요.",
  },
  {
    question: "같은 브랜드인데 맛마다 단백질이 다른가요?",
    answer: "네. 같은 브랜드·같은 용량이라도 맛에 따라 단백질이 다른 경우가 많습니다. 아래 브랜드별 표의 범위를 보고, 고를 맛의 성분표를 확인하세요.",
  },
];

const relatedLinks = [
  { href: "/guides/product-selection-comparison/protein-shake-guide", title: "단백질쉐이크 추천·고르는 법", body: "아침·운동·다이어트 기준으로 고르기." },
  { href: "/guides/product-selection-comparison/low-sugar-protein-shake-guide", title: "저당 단백질 쉐이크", body: "당류 낮은 쉐이크 비교." },
  { href: "/guides/product-selection-comparison/diet-protein-shake", title: "다이어트 단백질 쉐이크", body: "열량·당류 기준 비교." },
  { href: "/guides/product-selection-comparison/meal-replacement-protein-shake-guide", title: "식사대용 단백질 쉐이크", body: "한 끼 대용으로 볼 때 기준." },
  { href: "/guides/product-selection-comparison/protein-drink-vs-protein-shake", title: "단백질 음료 vs 쉐이크", body: "RTD와 파우치 쉐이크 차이." },
  { href: "/shake", title: "쉐이크 전체 목록", body: "등록된 쉐이크 전체 성분표." },
];

const cardClass = "rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]";
const thClass = "px-3 py-3 font-semibold";
const tdClass = "px-3 py-3 text-[var(--foreground-muted)]";
const fmt = (v: number | null | undefined, unit: string) => (v == null ? "-" : `${v}${unit}`);

export default function ProteinShakeProteinRankingPage() {
  const jsonLd = buildGuideJsonLd({
    title: pageTitle,
    description: pageDescription,
    url: canonical,
    datePublished: "2026-11-09",
    dateModified: "2026-11-09",
    faq: faqItems,
  });

  const heroProducts = resolveGuideHeroProducts(
    heroRows.map((d) => ({ slug: d.slug, contextLabel: `1포 단백질 ${d.proteinPerServing}g · 당류 ${fmt(d.sugar, "g")}` })),
  );

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
            <span>단백질 쉐이크 단백질 함량</span>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="rounded-md bg-[#f5f0ea] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#7a5230]">성분표 순위</span>
            <span className="text-[11px] font-medium text-[var(--foreground-muted)]">업데이트 2026-11-09</span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[#16412D] md:text-3xl">단백질 쉐이크 단백질 함량 비교 순위</h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            단백질 쉐이크는 1포에 단백질 {minP}~{maxP}g입니다(등록 {rows.length}종). 브랜드·맛별 1포 단백질 순위와 100kcal당 단백질을
            제조사 성분표로 정리했습니다.
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
          <GuideProductHeroCards products={heroProducts} />
          <GuideBuySection slugs={heroRows.map((d) => d.slug)} variant="top" />

          <section className={cardClass}>
            <h2 className="text-xl font-bold text-[var(--foreground)]">브랜드별 단백질 함량 비교</h2>
            <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">
              맛만 다른 제품은 한 줄로 묶어 1포 단백질 범위를 적었습니다({lines.length}개 제품 라인). 최고값이 높은 순입니다.
            </p>
            <div className="mt-4 overflow-x-auto rounded-2xl border border-[#e2ebe4] bg-[#f7fbf8]">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e2ebe4] text-[var(--foreground)]">
                    <th className={thClass}>브랜드·제품</th>
                    <th className={thClass}>1포 단백질</th>
                    <th className={thClass}>맛</th>
                    <th className={thClass}>1포 용량</th>
                  </tr>
                </thead>
                <tbody>
                  {lines.map((l) => (
                    <tr key={l.key} className="border-b border-[#eef3ef] last:border-b-0">
                      <td className={`${tdClass} font-semibold text-[var(--foreground)]`}>
                        {formatProductLabel(l.first.brand, baseName(l.first))}
                      </td>
                      <td className={`${tdClass} font-semibold text-[var(--foreground)] whitespace-nowrap`}>
                        {l.min === l.max ? `${l.max}g` : `${l.min}~${l.max}g`}
                      </td>
                      <td className={tdClass}>{l.count}종</td>
                      <td className={tdClass}>{l.first.capacity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className={cardClass}>
            <h2 className="text-xl font-bold text-[var(--foreground)]">단백질 쉐이크 단백질 함량 순위 (1포 기준)</h2>
            <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">
              단백질이 같으면 공동 순위이고, 같은 순위 안에서는 당류가 낮은 순입니다. 100kcal당 단백질은 1포 단백질을 열량으로 나눠 계산했습니다.
            </p>
            <div className="mt-4 overflow-x-auto rounded-2xl border border-[#e2ebe4] bg-[#f7fbf8]">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e2ebe4] text-[var(--foreground)]">
                    <th className={thClass}>순위</th>
                    <th className={thClass}>제품</th>
                    <th className={thClass}>단백질</th>
                    <th className={thClass}>당류</th>
                    <th className={thClass}>열량</th>
                    <th className={thClass}>100kcal당</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((d) => (
                    <tr key={d.slug} className="border-b border-[#eef3ef] last:border-b-0">
                      <td className={`${tdClass} whitespace-nowrap`}>{rankLabel(d.proteinPerServing)}</td>
                      <td className={`${tdClass} font-semibold text-[var(--foreground)]`}>
                        <Link href={`/product/${d.slug}`} className="text-[#2d6a4f] underline underline-offset-2">
                          {formatProductLabel(d.brand, d.name)}
                        </Link>
                      </td>
                      <td className={`${tdClass} font-semibold text-[var(--foreground)]`}>{d.proteinPerServing}g</td>
                      <td className={tdClass}>{fmt(d.sugar, "g")}</td>
                      <td className={tdClass}>{fmt(d.calories, "kcal")}</td>
                      <td className={tdClass}>{fmt(d.per100kcal, "g")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className={cardClass}>
            <h2 className="text-xl font-bold text-[var(--foreground)]">단백질 20g 이상 — 당류 낮은 순</h2>
            <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">1포 단백질 20g 이상 쉐이크 중 당류가 낮은 8종입니다.</p>
            <div className="mt-4 overflow-x-auto rounded-2xl border border-[#e2ebe4] bg-[#f7fbf8]">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e2ebe4] text-[var(--foreground)]">
                    <th className={thClass}>제품</th>
                    <th className={thClass}>당류</th>
                    <th className={thClass}>단백질</th>
                    <th className={thClass}>열량</th>
                  </tr>
                </thead>
                <tbody>
                  {lowSugarHigh.map((d) => (
                    <tr key={d.slug} className="border-b border-[#eef3ef] last:border-b-0">
                      <td className={`${tdClass} font-semibold text-[var(--foreground)]`}>
                        <Link href={`/product/${d.slug}`} className="text-[#2d6a4f] underline underline-offset-2">
                          {formatProductLabel(d.brand, d.name)}
                        </Link>
                      </td>
                      <td className={tdClass}>{fmt(d.sugar, "g")}</td>
                      <td className={tdClass}>{d.proteinPerServing}g</td>
                      <td className={tdClass}>{fmt(d.calories, "kcal")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <GuideCompareListCta category="shake" slugs={heroRows.map((d) => d.slug)} />

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
            <h2 className="text-sm font-bold text-[var(--foreground)]">계산 기준</h2>
            <p className="mt-2 text-xs leading-5 text-[var(--foreground-muted)]">
              ProteinLab 등록 단백질 쉐이크 성분표(제조사 표기) {rows.length}개 제품, 2026-11-09 집계. 1포(1회분) 단백질·당류·열량은 표기값이며
              물·우유를 더하기 전 값입니다. 100kcal당 단백질은 1포 단백질을 열량으로 나눠 소수 첫째 자리까지 계산했습니다.
            </p>
          </section>
        </div>
      </main>

      <GuideBuySection slugs={heroRows.map((d) => d.slug)} />
      <Footer />
    </div>
  );
}
