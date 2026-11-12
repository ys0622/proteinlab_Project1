import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import GuideBuySection from "@/app/components/GuideBuySection";
import { buildGuideJsonLd } from "@/app/lib/guideJsonLd";
import { hasNoPurchasableCoupangLink } from "@/app/lib/purchaseLinks";
import { POWDER_TYPE_LABELS } from "@/app/lib/productFilters";
import powderProducts from "@/app/data/powderProductsData.json";

// 2026-11-12 질문 허브: 네이버 자동완성 "프로틴 칼로리·프로틴 칼로리 비교·단백질보충제 칼로리·프로틴 1스쿱 칼로리"(전용 페이지 없음).
// 모든 수치는 등록 단백질 파우더 성분표(제조사 표기 1회 제공량, 물에 타기 전 가루 기준)에서 계산한다. 효능 주장은 하지 않는다.
// 게이너는 1회 제공량이 120~300g이라 순위에서 빼고 따로 보여 준다.
const canonical = "https://proteinlab.kr/guides/product-selection-comparison/protein-powder-calories";

type PowderType = keyof typeof POWDER_TYPE_LABELS;
type PowderRow = {
  slug: string;
  brand: string;
  name: string;
  capacity: string;
  powderType: PowderType;
  servingSizeG: number;
  proteinPerServing: number;
  calories: number;
  sugar: number | null;
  sugarLabel?: string;
  coupangUrl?: string;
};
const round1 = (v: number) => Math.round(v * 10) / 10;
const median = (values: number[]) => {
  const s = [...values].sort((a, b) => a - b);
  if (!s.length) return 0;
  const mid = Math.floor(s.length / 2);
  return s.length % 2 ? s[mid] : (s[mid - 1] + s[mid]) / 2;
};

const all = (powderProducts as PowderRow[])
  .filter((d) => d.calories > 0 && d.proteinPerServing > 0 && d.servingSizeG > 0)
  .map((d) => ({
    ...d,
    kcal: Math.round(d.calories),
    proteinPer100kcal: round1((d.proteinPerServing / d.calories) * 100),
    label: d.name.startsWith(d.brand) ? d.name : `${d.brand} ${d.name}`,
    sugarText: d.sugarLabel ?? (typeof d.sugar === "number" ? `${d.sugar}g` : "-"),
  }));
const gainers = all.filter((d) => d.powderType === "gainer").sort((a, b) => a.kcal - b.kcal);
const powders = all
  .filter((d) => d.powderType !== "gainer")
  .sort((a, b) => a.kcal - b.kcal || b.proteinPerServing - a.proteinPerServing);

const kcals = powders.map((d) => d.kcal);
const kcalMedian = Math.round(median(kcals));
const kcalMin = Math.min(...kcals);
const kcalMax = Math.max(...kcals);
const proteinMedian = round1(median(powders.map((d) => d.proteinPerServing)));
const scoopMin = Math.min(...powders.map((d) => d.servingSizeG));
const scoopMax = Math.max(...powders.map((d) => d.servingSizeG));
const lowest = powders[0];
const highest = powders[powders.length - 1];
const under120 = powders.filter((d) => d.kcal <= 120).length;
const over150 = powders.filter((d) => d.kcal > 150).length;
const densityMedian = round1(median(powders.map((d) => d.proteinPer100kcal)));
const densityTop = [...powders].sort((a, b) => b.proteinPer100kcal - a.proteinPer100kcal || b.proteinPerServing - a.proteinPerServing).slice(0, 5);
const gainerKcalMin = gainers.length ? Math.min(...gainers.map((d) => d.kcal)) : 0;
const gainerKcalMax = gainers.length ? Math.max(...gainers.map((d) => d.kcal)) : 0;

// 유형별 1회 열량·단백질 중앙값(게이너 제외).
const typeOrder: PowderType[] = ["isolate", "whey", "blend", "plant", "senior", "meal"];
const typeBands = typeOrder
  .map((t) => {
    const rows = powders.filter((d) => d.powderType === t);
    return {
      label: POWDER_TYPE_LABELS[t],
      count: rows.length,
      kcal: Math.round(median(rows.map((d) => d.kcal))),
      protein: round1(median(rows.map((d) => d.proteinPerServing))),
      scoop: Math.round(median(rows.map((d) => d.servingSizeG))),
      density: round1(median(rows.map((d) => d.proteinPer100kcal))),
    };
  })
  .filter((b) => b.count > 0);
const isolateBand = typeBands.find((b) => b.label === POWDER_TYPE_LABELS.isolate);
const blendBand = typeBands.find((b) => b.label === POWDER_TYPE_LABELS.blend);
const wheyBand = typeBands.find((b) => b.label === POWDER_TYPE_LABELS.whey);

// 구매 버튼: 구매 가능한 링크가 있고 1회 단백질 20g 이상인 파우더 중 1회 열량 낮은 순 3개.
const buySlugs = powders
  .filter((d) => d.proteinPerServing >= 20 && !hasNoPurchasableCoupangLink(d.coupangUrl, d.slug))
  .slice(0, 3)
  .map((d) => d.slug);

const pageTitle = `프로틴 칼로리 비교: 단백질 보충제 1스쿱 ${kcalMin}~${kcalMax}kcal, 낮은 순 순위`;
const pageDescription = `프로틴(단백질 보충제) 1스쿱 칼로리는 얼마일까요? 등록 단백질 파우더 ${powders.length}종 성분표로 1회 제공량 열량을 낮은 순으로 정리했습니다. 중앙값 ${kcalMedian}kcal, 아이솔레이트·웨이·혼합 등 유형별 열량과 100kcal당 단백질, 게이너 열량도 함께 비교합니다.`;

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
  `프로틴(단백질 보충제) 1스쿱 칼로리는 ${kcalMin}~${kcalMax}kcal이고, 등록 파우더 ${powders.length}종의 중앙값은 ${kcalMedian}kcal입니다(게이너 제외). 1스쿱의 단백질은 중앙값 ${proteinMedian}g입니다.`,
  `제품마다 1회 제공량이 ${scoopMin}~${scoopMax}g으로 달라서 열량 차이의 상당 부분은 스쿱 크기에서 옵니다. 유형별 중앙값은 ${[isolateBand && `아이솔레이트(WPI) ${isolateBand.kcal}kcal`, wheyBand && `웨이 ${wheyBand.kcal}kcal`, blendBand && `혼합 ${blendBand.kcal}kcal`].filter(Boolean).join(", ")}입니다(아래 표).`,
  `가장 낮은 제품은 ${lowest.label}(${lowest.servingSizeG}g, ${lowest.kcal}kcal), 가장 높은 제품은 ${highest.label}(${highest.servingSizeG}g, ${highest.kcal}kcal)입니다. 열량만큼 단백질을 보려면 100kcal당 단백질을 비교하세요(중앙값 ${densityMedian}g).`,
];

const faqItems = [
  {
    question: "프로틴 1스쿱 칼로리는 얼마인가요?",
    answer: `등록 단백질 파우더 ${powders.length}종(게이너 제외) 기준 1회 제공량 ${kcalMin}~${kcalMax}kcal이고 중앙값은 ${kcalMedian}kcal입니다. 성분표의 1회 제공량은 가루 기준이라, 물에 타면 그대로이고 우유에 타면 우유의 열량이 더해집니다.`,
  },
  {
    question: "칼로리 낮은 단백질 보충제는 무엇인가요?",
    answer: `1회 열량이 가장 낮은 제품은 ${lowest.label}(${lowest.kcal}kcal, 단백질 ${lowest.proteinPerServing}g)입니다. 120kcal 이하 제품은 ${under120}종이며, 아래 순위표에서 전체를 볼 수 있습니다.`,
  },
  {
    question: "아이솔레이트(WPI)가 칼로리가 더 낮나요?",
    answer: isolateBand && blendBand && wheyBand
      ? `등록 제품의 1회 열량 중앙값은 아이솔레이트(WPI) ${isolateBand.kcal}kcal, 웨이 ${wheyBand.kcal}kcal, 혼합 ${blendBand.kcal}kcal입니다. 100kcal당 단백질 중앙값은 아이솔레이트 ${isolateBand.density}g, 웨이 ${wheyBand.density}g, 혼합 ${blendBand.density}g으로 아이솔레이트가 가장 높습니다. 다만 같은 유형 안에서도 스쿱 크기에 따라 차이가 커서 제품별 수치를 확인하는 것이 정확합니다.`
      : "유형별 중앙값은 아래 표에서 볼 수 있습니다.",
  },
  {
    question: "게이너는 칼로리가 얼마나 되나요?",
    answer: gainers.length
      ? `등록 게이너 ${gainers.length}종의 1회 제공량은 ${Math.min(...gainers.map((d) => d.servingSizeG))}~${Math.max(...gainers.map((d) => d.servingSizeG))}g이고 열량은 ${gainerKcalMin}~${gainerKcalMax}kcal입니다. 체중 증가용이라 일반 프로틴과 같은 순위에 넣지 않고 따로 정리했습니다.`
      : "등록된 게이너가 없습니다.",
  },
  {
    question: "다이어트할 때는 무엇을 보고 고르나요?",
    answer: `1회 열량, 100kcal당 단백질, 당류를 같이 보세요. 같은 열량에서 단백질이 많은 제품은 ${densityTop[0].label}(100kcal당 ${densityTop[0].proteinPer100kcal}g) 등입니다. 식사에 더해 먹는다면 그만큼 하루 열량이 늘어난다는 점도 함께 고려하세요.`,
  },
];

const relatedLinks = [
  { href: "/guides/intake-strategy-health/protein-powder-per-day", title: "단백질 보충제 하루 섭취량", body: "1스쿱·2스쿱이 권장량의 몇 %인지." },
  { href: "/guides/product-selection-comparison/protein-powder-scoop-guide", title: "단백질 보충제 1스쿱 단백질", body: "1회 제공량·단백질·한 통 회분." },
  { href: "/guides/product-selection-comparison/wpi-wpc-isp-powder-guide", title: "WPI·WPC·분리대두 차이", body: "원료 유형별 함량과 당류." },
  { href: "/guides/product-selection-comparison/protein-shake-calorie-ranking", title: "단백질 쉐이크 칼로리", body: "파우치·스틱 쉐이크 열량 낮은 순." },
  { href: "/powder", title: "단백질 파우더 전체 비교", body: "유형·단백질 함량으로 전체 제품 보기." },
];

const cardClass = "rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]";
const thClass = "px-3 py-3 font-semibold whitespace-nowrap";
const tdClass = "px-3 py-3 text-[var(--foreground-muted)]";

export default function ProteinPowderCaloriesPage() {
  const jsonLd = buildGuideJsonLd({
    title: pageTitle,
    description: pageDescription,
    url: canonical,
    datePublished: "2026-11-12",
    dateModified: "2026-11-12",
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
            <span>프로틴 칼로리</span>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="rounded-md bg-[#f5f0ea] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#7a5230]">질문 답</span>
            <span className="text-[11px] font-medium text-[var(--foreground-muted)]">업데이트 2026-11-12</span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[#16412D] md:text-3xl">프로틴 칼로리 비교: 단백질 보충제 1스쿱 열량 낮은 순</h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            프로틴 1스쿱 칼로리는 {kcalMin}~{kcalMax}kcal, 중앙값 {kcalMedian}kcal입니다. 등록 단백질 파우더 {powders.length}종의 성분표로 열량·단백질·당류를 함께 비교했습니다.
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
            <h2 className="text-xl font-bold text-[var(--foreground)]">유형별 프로틴 1스쿱 칼로리</h2>
            <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">ProteinLab 유형 분류별 중앙값입니다(게이너 제외).</p>
            <div className="mt-4 overflow-x-auto rounded-2xl border border-[#e2ebe4] bg-[#f7fbf8]">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e2ebe4] text-[var(--foreground)]">
                    <th className={thClass}>유형(제품 수)</th>
                    <th className={thClass}>1회 제공량</th>
                    <th className={thClass}>1회 열량</th>
                    <th className={thClass}>단백질</th>
                    <th className={thClass}>100kcal당 단백질</th>
                  </tr>
                </thead>
                <tbody>
                  {typeBands.map((b) => (
                    <tr key={b.label} className="border-b border-[#eef3ef] last:border-b-0">
                      <td className={`${tdClass} font-semibold text-[var(--foreground)]`}>{b.label} {b.count}종</td>
                      <td className={tdClass}>{b.scoop}g</td>
                      <td className={tdClass}>{b.kcal}kcal</td>
                      <td className={tdClass}>{b.protein}g</td>
                      <td className={tdClass}>{b.density}g</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className={cardClass}>
            <h2 className="text-xl font-bold text-[var(--foreground)]">단백질 보충제 1스쿱 칼로리 순위(낮은 순)</h2>
            <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">
              등록 단백질 파우더 {powders.length}종 전체입니다(게이너 제외). 1회 제공량은 성분표 표기이며, 제품 이름을 누르면 성분표와 구매 링크가 있는 상세 페이지로 갑니다.
            </p>
            <div className="mt-4 overflow-x-auto rounded-2xl border border-[#e2ebe4] bg-[#f7fbf8]">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e2ebe4] text-[var(--foreground)]">
                    <th className={thClass}>순위</th>
                    <th className={thClass}>제품</th>
                    <th className={thClass}>1회 제공량</th>
                    <th className={thClass}>1회 열량</th>
                    <th className={thClass}>단백질</th>
                    <th className={thClass}>당류</th>
                    <th className={thClass}>유형</th>
                  </tr>
                </thead>
                <tbody>
                  {powders.map((d) => {
                    const rank = powders.findIndex((x) => x.kcal === d.kcal) + 1;
                    const tied = powders.filter((x) => x.kcal === d.kcal).length > 1;
                    return (
                      <tr key={d.slug} className="border-b border-[#eef3ef] last:border-b-0">
                        <td className={tdClass}>{tied ? `공동 ${rank}` : rank}</td>
                        <td className={`${tdClass} font-semibold text-[var(--foreground)]`}>
                          <Link href={`/product/${d.slug}`} className="hover:text-[var(--accent)]">
                            {d.label}
                          </Link>
                          <span className="ml-1 text-xs font-normal text-[var(--foreground-muted)]">{d.capacity}</span>
                        </td>
                        <td className={tdClass}>{d.servingSizeG}g</td>
                        <td className={tdClass}>{d.kcal}kcal</td>
                        <td className={tdClass}>{d.proteinPerServing}g</td>
                        <td className={tdClass}>{d.sugarText}</td>
                        <td className={tdClass}>{POWDER_TYPE_LABELS[d.powderType]}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs leading-5 text-[var(--foreground-muted)]">150kcal를 넘는 제품은 {over150}종이며, 대부분 1회 제공량이 40g 이상입니다.</p>
          </section>

          <section className={cardClass}>
            <h2 className="text-xl font-bold text-[var(--foreground)]">열량 대비 단백질이 많은 프로틴</h2>
            <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">100kcal당 단백질 높은 순 5개입니다.</p>
            <ol className="mt-4 space-y-2 text-sm leading-6 text-[var(--foreground-muted)]">
              {densityTop.map((d, i) => (
                <li key={d.slug}>
                  {i + 1}.{" "}
                  <Link href={`/product/${d.slug}`} className="font-semibold text-[var(--foreground)] hover:text-[var(--accent)]">
                    {d.label}
                  </Link>{" "}
                  — 100kcal당 단백질 {d.proteinPer100kcal}g (1회 {d.servingSizeG}g · {d.kcal}kcal · 단백질 {d.proteinPerServing}g)
                </li>
              ))}
            </ol>
          </section>

          {gainers.length > 0 && (
            <section className={cardClass}>
              <h2 className="text-xl font-bold text-[var(--foreground)]">게이너 칼로리(따로 비교)</h2>
              <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">
                체중 증가용 게이너는 1회 제공량이 커서 위 순위에서 뺐습니다.
              </p>
              <ul className="mt-4 space-y-2 text-sm leading-6 text-[var(--foreground-muted)]">
                {gainers.map((d) => (
                  <li key={d.slug}>
                    <Link href={`/product/${d.slug}`} className="font-semibold text-[var(--foreground)] hover:text-[var(--accent)]">
                      {d.label}
                    </Link>{" "}
                    {d.capacity} — 1회 {d.servingSizeG}g · {d.kcal}kcal · 단백질 {d.proteinPerServing}g · 당류 {d.sugarText}
                  </li>
                ))}
              </ul>
            </section>
          )}

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
              <li>- ProteinLab 등록 단백질 파우더 {all.length}종(게이너 {gainers.length}종 포함) 성분표(제조사 표기 1회 제공량), 2026-11-12 집계</li>
            </ul>
          </section>
        </div>
      </main>

      <GuideBuySection slugs={buySlugs} />
      <Footer />
    </div>
  );
}
