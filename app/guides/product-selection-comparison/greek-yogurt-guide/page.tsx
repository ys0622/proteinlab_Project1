import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import GuideBuySection from "@/app/components/GuideBuySection";
import GuideCompareListCta from "@/app/components/GuideCompareListCta";
import GuideProductHeroCards, { resolveGuideHeroProducts } from "@/app/components/GuideProductHeroCards";
import { buildGuideJsonLd } from "@/app/lib/guideJsonLd";
import { formatProductLabel } from "@/app/lib/productLabel";
import yogurtProducts from "@/app/data/yogurtProductsData.json";

// 2026-11-08 질문 허브: 네이버 자동완성 "그릭요거트 단백질 함량·순위·비교·함량 높은"에 30일 노출 0이던 얇은 글을
// 등록 그릭요거트 성분표로 계산한 100g당 순위 페이지로 다시 썼다. 순위는 표준 방식(이보다 높은 제품 수 + 1, 같으면 공동).
const canonical = "https://proteinlab.kr/guides/product-selection-comparison/greek-yogurt-guide";

type YogurtRow = {
  slug: string;
  brand: string;
  name: string;
  capacity: string;
  flavor?: string;
  yogurtType?: string;
  proteinPer100g?: number;
  proteinPerServing: number;
  sugar?: number;
  calories?: number;
  coupangUrl?: string;
};
const FALLBACK_LINK = "gaIdNRGs2u";
const grams = (d: YogurtRow) => Number.parseFloat(d.capacity);
const per100 = (v: number | undefined, d: YogurtRow) => (typeof v === "number" ? Math.round((v / grams(d)) * 1000) / 10 : null);

const greek = (yogurtProducts as YogurtRow[]).filter(
  (d) => d.yogurtType === "그릭 요거트" && typeof d.proteinPer100g === "number" && /g$/i.test(d.capacity.trim()) && grams(d) > 0,
);
// 같은 제품의 용량만 다른 것(그릭데이 시그니처 100·450·800g)은 100g당 값이 같으므로 한 줄로 묶고 가장 작은 용량을 대표로 둔다.
const lineKey = (d: YogurtRow) => `${d.brand}|${d.flavor ?? ""}|${d.proteinPer100g}|${per100(d.sugar, d)}`;
const lines = greek
  .slice()
  .sort((a, b) => grams(a) - grams(b))
  .filter((d, i, arr) => arr.findIndex((x) => lineKey(x) === lineKey(d)) === i)
  .map((d) => ({
    ...d,
    sizes: greek.filter((x) => lineKey(x) === lineKey(d)).map((x) => x.capacity),
    sugar100: per100(d.sugar, d),
    kcal100: per100(d.calories, d),
  }))
  .sort((a, b) => (b.proteinPer100g as number) - (a.proteinPer100g as number) || (a.sugar100 ?? 99) - (b.sugar100 ?? 99));
const rankOf = (p: number) => lines.filter((x) => (x.proteinPer100g as number) > p).length + 1;
const tieCount = (p: number) => lines.filter((x) => x.proteinPer100g === p).length;
const rankLabel = (p: number) => `${tieCount(p) > 1 ? "공동 " : ""}${rankOf(p)}`;

const proteins = lines.map((d) => d.proteinPer100g as number);
const maxP = Math.max(...proteins);
const minP = Math.min(...proteins);
const top = lines[0];
const tenPlus = lines.filter((d) => (d.proteinPer100g as number) >= 10).length;
const plainLines = lines.filter((d) => d.flavor === "플레인");
const plainTop = plainLines[0];
const plainSugars = plainLines.map((d) => d.sugar100).filter((v): v is number => v != null);
const plainLowSugar = plainLines
  .filter((d) => d.sugar100 != null)
  .slice()
  .sort((a, b) => (a.sugar100 as number) - (b.sugar100 as number) || (b.proteinPer100g as number) - (a.proteinPer100g as number))
  .slice(0, 6);
const purchasable = (d: YogurtRow) => Boolean(d.coupangUrl) && !(d.coupangUrl ?? "").includes(FALLBACK_LINK);
const heroLines = lines.filter(purchasable).slice(0, 3);

const pageTitle = `그릭요거트 단백질 함량 순위 — 100g당 ${maxP}g부터 ${minP}g까지 ${lines.length}종 비교`;
const pageDescription = `그릭요거트 단백질 함량을 100g당 기준으로 순위를 매겼습니다. 등록된 그릭요거트 ${lines.length}종은 100g당 단백질 ${minP}~${maxP}g이고, 10g 이상은 ${tenPlus}종입니다. 플레인 제품끼리 비교, 100g당 당류·열량, 용량별 한 통 단백질까지 성분표 기준으로 정리했습니다.`;

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
  `등록된 그릭요거트 ${lines.length}종(용량만 다른 제품은 하나로 묶음)의 단백질은 100g당 ${minP}g에서 ${maxP}g까지입니다. 가장 높은 제품은 ${formatProductLabel(top.brand, top.name)}(${maxP}g)이고, 100g당 10g 이상인 제품은 ${tenPlus}종입니다.`,
  `플레인끼리 보면 ${formatProductLabel(plainTop.brand, plainTop.name)}이 100g당 ${plainTop.proteinPer100g}g으로 가장 높습니다. 무가당 플레인 400g 통은 대부분 100g당 6~7g대라, 같은 400g이라도 한 통 단백질이 24g에서 41g까지 차이 납니다.`,
  "그래놀라·과일 콩포트가 들어간 제품은 단백질과 함께 당류도 올라갑니다. 단백질만 보지 말고 100g당 당류를 같이 보세요. 아래 표는 모두 제조사 성분표를 100g 기준으로 바꾼 값입니다.",
];

const faqItems = [
  {
    question: "그릭요거트 단백질 함량은 보통 얼마인가요?",
    answer: `등록된 그릭요거트 ${lines.length}종 기준 100g당 ${minP}~${maxP}g입니다. 무가당 플레인 통 제품은 6~7g대가 많고, 고단백을 내세운 제품은 10g 이상입니다.`,
  },
  {
    question: "단백질 함량이 가장 높은 그릭요거트는?",
    answer: `100g당 기준으로는 ${formatProductLabel(top.brand, top.name)}가 ${maxP}g으로 가장 높습니다. 플레인 중에서는 ${formatProductLabel(plainTop.brand, plainTop.name)}(${plainTop.proteinPer100g}g)입니다.`,
  },
  {
    question: "총단백질이 큰 대용량 제품이 더 좋은가요?",
    answer: "800g 통은 한 통 단백질이 크게 보이지만 한 번에 먹는 양이 아닙니다. 같은 무게(100g)로 바꾼 단백질과 당류로 비교한 뒤, 먹는 양에 맞는 용량을 고르세요.",
  },
  {
    question: "그릭요거트 당류는 낮은 편인가요?",
    answer: `플레인끼리도 100g당 당류가 ${Math.min(...plainSugars)}g부터 ${Math.max(...plainSugars)}g까지 차이가 납니다. '무가당' 표시와 성분표 당류 칸을 같이 보고, 과일·그래놀라 제품은 당류를 따로 확인하세요.`,
  },
];

const relatedLinks = [
  { href: "/guides/product-selection-comparison/protein-yogurt-top5", title: "프로틴 요거트 추천 TOP 5", body: "그릭·드링킹·대용량을 함께 비교." },
  { href: "/guides/product-selection-comparison/low-sugar-yogurt-guide", title: "저당 단백질 요거트", body: "당류 낮은 요거트만 모아 보기." },
  { href: "/guides/product-selection-comparison/unsweetened-greek-yogurt-guide", title: "무가당 그릭요거트", body: "무가당 플레인 제품 비교." },
  { href: "/compare/greek-yogurt-brand-compare", title: "그릭요거트 브랜드 비교", body: "브랜드별 대표 제품을 나란히." },
  { href: "/guides/product-selection-comparison/greek-vs-protein-yogurt", title: "그릭요거트 vs 단백질 요거트", body: "두 종류의 차이와 고르는 법." },
  { href: "/yogurt", title: "요거트 전체 목록", body: "등록된 요거트 전체 성분표." },
];

const cardClass = "rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]";
const thClass = "px-3 py-3 font-semibold";
const tdClass = "px-3 py-3 text-[var(--foreground-muted)]";
const fmt = (v: number | null, unit: string) => (v == null ? "-" : `${v}${unit}`);

export default function GreekYogurtGuidePage() {
  const jsonLd = buildGuideJsonLd({
    title: pageTitle,
    description: pageDescription,
    url: canonical,
    datePublished: "2026-03-01",
    dateModified: "2026-11-08",
    faq: faqItems,
  });

  const heroProducts = resolveGuideHeroProducts(
    heroLines.map((d) => ({ slug: d.slug, contextLabel: `100g당 단백질 ${d.proteinPer100g}g · 당류 ${fmt(d.sugar100, "g")}` })),
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
            <span>그릭요거트 단백질 함량</span>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="rounded-md bg-[#f5f0ea] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#7a5230]">성분표 순위</span>
            <span className="text-[11px] font-medium text-[var(--foreground-muted)]">업데이트 2026-11-08</span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[#16412D] md:text-3xl">그릭요거트 단백질 함량 순위</h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            그릭요거트 단백질은 100g당 {minP}~{maxP}g입니다(등록 {lines.length}종). 같은 무게로 바꿔 비교해야 대용량 통과 소용량 컵을
            공정하게 볼 수 있어, 모든 값은 제조사 성분표를 100g 기준으로 계산했습니다.
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
          <GuideBuySection slugs={heroLines.map((d) => d.slug)} variant="top" />

          <section className={cardClass}>
            <h2 className="text-xl font-bold text-[var(--foreground)]">그릭요거트 단백질 함량 순위 (100g당)</h2>
            <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">
              단백질이 같으면 공동 순위이고, 같은 순위 안에서는 당류가 낮은 순입니다. 용량만 다른 제품은 한 줄에 용량을 함께 적었습니다.
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
                    <th className={thClass}>용량</th>
                  </tr>
                </thead>
                <tbody>
                  {lines.map((d) => (
                    <tr key={d.slug} className="border-b border-[#eef3ef] last:border-b-0">
                      <td className={`${tdClass} whitespace-nowrap`}>{rankLabel(d.proteinPer100g as number)}</td>
                      <td className={`${tdClass} font-semibold text-[var(--foreground)]`}>
                        <Link href={`/product/${d.slug}`} className="text-[#2d6a4f] underline underline-offset-2">
                          {formatProductLabel(d.brand, d.name)}
                        </Link>
                      </td>
                      <td className={`${tdClass} font-semibold text-[var(--foreground)]`}>{d.proteinPer100g}g</td>
                      <td className={tdClass}>{fmt(d.sugar100, "g")}</td>
                      <td className={tdClass}>{fmt(d.kcal100, "kcal")}</td>
                      <td className={tdClass}>{d.sizes.join("·")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className={cardClass}>
            <h2 className="text-xl font-bold text-[var(--foreground)]">플레인 그릭요거트 — 당류 낮은 순</h2>
            <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">
              플레인 {plainLines.length}종 중 100g당 당류가 낮은 6종입니다.
            </p>
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
                  {plainLowSugar.map((d) => (
                    <tr key={d.slug} className="border-b border-[#eef3ef] last:border-b-0">
                      <td className={`${tdClass} font-semibold text-[var(--foreground)]`}>
                        <Link href={`/product/${d.slug}`} className="text-[#2d6a4f] underline underline-offset-2">
                          {formatProductLabel(d.brand, d.name)}
                        </Link>
                      </td>
                      <td className={tdClass}>{fmt(d.sugar100, "g")}</td>
                      <td className={tdClass}>{d.proteinPer100g}g</td>
                      <td className={tdClass}>{fmt(d.kcal100, "kcal")}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <GuideCompareListCta category="yogurt" slugs={heroLines.map((d) => d.slug)} />

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
              ProteinLab 등록 그릭요거트 성분표(제조사 표기) {greek.length}개 제품, 2026-11-08 집계. 100g당 단백질은 표기값, 당류·열량은 한 통
              값을 용량으로 나눠 소수 첫째 자리까지 계산했습니다.
            </p>
          </section>
        </div>
      </main>

      <GuideBuySection slugs={heroLines.map((d) => d.slug)} />
      <Footer />
    </div>
  );
}
