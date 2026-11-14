import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import GuideBuySection from "@/app/components/GuideBuySection";
import SourceProductTable, { type SourceRow } from "@/app/components/SourceProductTable";
import { buildGuideJsonLd } from "@/app/lib/guideJsonLd";
import { hasNoPurchasableCoupangLink } from "@/app/lib/purchaseLinks";
import powderProducts from "@/app/data/powderProductsData.json";
import drinkProducts from "@/app/data/drinkProductsData.json";

// 2026-11-14 질문 허브: 네이버 자동완성 "분리유청단백질이란·분리유청 단백질 추천 순위·분리유청단백질 무맛", "wpi 뜻·wpi 프로틴 추천·wpi 단백질 보충제"(전용 페이지 없음).
// 원료 용어 검색어(mpi wpi 차이·분리유단백 wpi 차이·wpi isp 차이)는 30일 클릭률 15~50%로 사이트에서 가장 높다.
// 수치는 등록 파우더 성분표(1회 제공량)와 원재료명 표시 순서에서 계산한다. 효능 주장은 하지 않는다.
const canonical = "https://proteinlab.kr/guides/product-selection-comparison/wpi-protein-guide";

type Powder = {
  slug: string;
  brand: string;
  name: string;
  capacity: string;
  flavor?: string;
  powderType: string;
  proteinSource?: string;
  servingSizeG: number;
  proteinPerServing: number;
  calories: number;
  sugar: number | null;
  sugarLabel?: string;
  coupangUrl?: string;
};
type Drink = { slug: string; brand: string; name: string; capacity?: string; proteinSource?: string; proteinPerServing: number; calories?: number; sugar?: number | null; coupangUrl?: string };

const WPI = /분리유청|WPI/;
const OTHER = /농축|WPC|대두|ISP|우유|유단백|MPI|MPC|카제인|산양|밀|완두|밀크|콜라겐|난백/;
const round1 = (v: number) => Math.round(v * 10) / 10;
const median = (values: number[]) => {
  const s = [...values].sort((a, b) => a - b);
  if (!s.length) return 0;
  const mid = Math.floor(s.length / 2);
  return s.length % 2 ? s[mid] : (s[mid - 1] + s[mid]) / 2;
};

const toRow = (d: Powder): SourceRow & { first: string; brand: string; flavor?: string; coupangUrl?: string } => ({
  slug: d.slug,
  brand: d.brand,
  flavor: d.flavor,
  coupangUrl: d.coupangUrl,
  label: d.name.startsWith(d.brand) ? d.name : `${d.brand} ${d.name}`,
  capacity: d.capacity,
  servingSizeG: d.servingSizeG,
  proteinPerServing: d.proteinPerServing,
  proteinPct: Math.round((d.proteinPerServing / d.servingSizeG) * 100),
  kcal: Math.round(d.calories),
  sugarText: d.sugarLabel ?? (typeof d.sugar === "number" ? `${d.sugar}g` : "-"),
  source: d.proteinSource ?? "",
  first: (d.proteinSource ?? "").split("·")[0],
});

const powders = (powderProducts as Powder[]).filter(
  (d) => d.powderType !== "gainer" && d.servingSizeG > 0 && d.proteinPerServing > 0 && d.calories > 0 && WPI.test(d.proteinSource ?? ""),
);
const byPct = <T extends SourceRow>(a: T, b: T) => b.proteinPct - a.proteinPct || b.proteinPerServing - a.proteinPerServing;

// WPI(가수분해 WPI 포함)만 단백질 원료로 쓴 제품
const pure = powders.filter((d) => !OTHER.test(d.proteinSource ?? "")).map(toRow).sort(byPct);
const pureRows = pure.map((d) => {
  const rank = pure.findIndex((x) => x.proteinPct === d.proteinPct) + 1;
  const tied = pure.filter((x) => x.proteinPct === d.proteinPct).length > 1;
  return { ...d, rankText: tied ? `공동 ${rank}` : String(rank) };
});
// 다른 원료와 섞은 제품
const mixed = powders.filter((d) => OTHER.test(d.proteinSource ?? "")).map(toRow).sort(byPct);
const mixedWpiFirst = mixed.filter((d) => WPI.test(d.first));
const mixedOtherFirst = mixed.filter((d) => !WPI.test(d.first));
const ispFirst = mixed.filter((d) => /대두|ISP/.test(d.first));
// 제품 이름에 WPI·아이솔레이트가 있는데 원료 첫 자리가 WPI가 아닌 제품
const namedButNotFirst = mixedOtherFirst.filter((d) => /WPI|아이솔레이트|isolate/i.test(d.label));
const allRows = [...pure, ...mixed];
const unflavored = allRows.filter((d) => /무맛|unflavored/i.test(`${d.flavor ?? ""} ${d.label}`));

const pureProteinMedian = round1(median(pure.map((d) => d.proteinPerServing)));
const purePctMedian = Math.round(median(pure.map((d) => d.proteinPct)));
const mixedPctMedian = Math.round(median(mixed.map((d) => d.proteinPct)));
const pureKcalMedian = Math.round(median(pure.map((d) => d.kcal)));
const top = pure[0];

const wpiDrinks = (drinkProducts as Drink[]).filter((d) => d.proteinSource === "WPI");

const buySlugs = pure.filter((d) => !hasNoPurchasableCoupangLink(d.coupangUrl, d.slug)).slice(0, 3).map((d) => d.slug);

const pageTitle = `분리유청단백질(WPI)이란? 뜻·WPC 차이, WPI 프로틴 ${pure.length}종 함량 순위`;
const pageDescription = `분리유청단백질(WPI, Whey Protein Isolate)은 유청에서 단백질 비율을 90% 이상으로 높인 원료입니다. WPI만 쓴 단백질 파우더 ${pure.length}종을 1회 단백질 함량 순으로, WPI가 들어간 혼합 제품 ${mixed.length}종은 원재료 표시 순서와 함께 성분표로 비교했습니다.`;

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
  `분리유청단백질(WPI)은 Whey Protein Isolate의 약자로, 치즈를 만들고 남은 유청에서 단백질을 분리해 원료 기준 단백질 비율을 90% 이상으로 높인 것입니다. 농축유청단백(WPC)은 같은 유청을 농축한 원료로 등급(WPC34·WPC80 등)에 따라 단백질 비율이 다르고, WPI보다 유당이 많을 수 있습니다.`,
  `ProteinLab에 등록된 단백질 파우더 중 WPI(가수분해 WPI 포함)만 단백질 원료로 쓴 제품은 ${pure.length}종입니다. 1회 단백질 중앙값 ${pureProteinMedian}g, 가루 무게 대비 단백질 ${purePctMedian}%, 열량 ${pureKcalMedian}kcal이고, 함량이 가장 높은 제품은 ${top.label}(${top.servingSizeG}g 중 ${top.proteinPerServing}g, ${top.proteinPct}%)입니다.`,
  `WPI가 들어갔지만 다른 원료와 섞은 제품은 ${mixed.length}종(함량 중앙값 ${mixedPctMedian}%)이고, 그중 ${mixedOtherFirst.length}종은 원재료 표시 첫 자리가 WPI가 아닙니다(분리대두단백이 첫 자리인 제품 ${ispFirst.length}종). 원재료명은 많이 쓴 순서로 적으므로, 'WPI 함유'라는 이름보다 원료 순서를 보세요.`,
];

const faqItems = [
  {
    question: "WPI 뜻이 뭔가요?",
    answer: "Whey Protein Isolate, 우리말로 분리유청단백(질)입니다. 우유에서 치즈를 만들고 남은 유청(웨이)에서 단백질을 분리한 원료로, 원료 기준 단백질 비율이 90% 이상입니다.",
  },
  {
    question: "WPI와 WPC 차이는 무엇인가요?",
    answer: `둘 다 유청 단백질입니다. WPC(농축유청단백)는 농축 정도에 따라 단백질 비율이 34%·80% 등 등급별로 다르고, WPI는 90% 이상으로 더 높이면서 유당·지방을 더 걸러낸 원료입니다. 등록 제품 기준 WPI만 쓴 파우더의 가루 대비 단백질은 중앙값 ${purePctMedian}%, WPI를 다른 원료와 섞은 제품은 ${mixedPctMedian}%입니다.`,
  },
  {
    question: "분리유청단백질 프로틴 추천 순위는?",
    answer: `WPI만 쓴 ${pure.length}종을 가루 무게 대비 단백질 함량 순으로 보면 1위는 ${top.label}(${top.proteinPct}%)입니다. 아래 순위표에서 1회 단백질·열량·당류를 함께 볼 수 있습니다. 순위는 성분표 수치 기준이며 맛·가격은 반영하지 않았습니다.`,
  },
  {
    question: "분리유청단백질 무맛 제품이 있나요?",
    answer: unflavored.length
      ? `등록 제품 중 무맛은 ${unflavored.map((d) => d.label).join(", ")}입니다. 무맛은 감미료·향료가 없는 대신 음료나 요리에 섞어 먹는 경우가 많습니다.`
      : "현재 등록된 WPI 무맛 제품은 없습니다.",
  },
  {
    question: "WPI면 유당이 0인가요?",
    answer: "아닙니다. WPI는 WPC보다 유당이 적은 원료일 뿐, 완제품의 유당이 0이라는 뜻은 아닙니다. 유당이 걱정되면 제품의 '락토프리' 표시와 원재료명을 함께 확인하세요.",
  },
  {
    question: "WPI가 들어간 단백질 음료도 있나요?",
    answer: wpiDrinks.length
      ? `등록된 RTD 음료 중 원료를 WPI로 표시한 제품은 ${wpiDrinks.map((d) => `${d.name.startsWith(d.brand) ? d.name : `${d.brand} ${d.name}`}(${d.proteinPerServing}g)`).join(", ")}입니다.`
      : "현재 등록된 WPI 음료는 없습니다.",
  },
];

const relatedLinks = [
  { href: "/guides/basics/protein-source-types", title: "MPI·WPI·WPC·ISP 차이", body: "단백질 원료 7가지를 한 표로." },
  { href: "/guides/product-selection-comparison/isolated-soy-protein-guide", title: "분리대두단백(ISP)이란", body: "대두단백이 들어간 프로틴과 원료 순서." },
  { href: "/guides/product-selection-comparison/milk-protein-mpc-mpi-guide", title: "MPC·MPI 단백질이란", body: "농축·분리우유단백 뜻과 차이." },
  { href: "/guides/product-selection-comparison/wpi-wpc-isp-powder-guide", title: "WPI·WPC·분리대두 파우더 차이", body: "유형별 평균 함량과 당류." },
  { href: "/guides/product-selection-comparison/protein-powder-top10", title: "단백질 파우더 추천 TOP 10", body: "함량·당류로 고른 보충제." },
  { href: "/guides/product-selection-comparison/protein-powder-calories", title: "프로틴 칼로리 비교", body: "1스쿱 열량 낮은 순." },
  { href: "/powder", title: "단백질 파우더 전체 비교", body: "유형·함량으로 전체 보기." },
];

const cardClass = "rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]";

export default function WpiProteinGuidePage() {
  const jsonLd = buildGuideJsonLd({
    title: pageTitle,
    description: pageDescription,
    url: canonical,
    datePublished: "2026-11-14",
    dateModified: "2026-11-14",
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
            <span>분리유청단백질(WPI)</span>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="rounded-md bg-[#f5f0ea] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#7a5230]">질문 답</span>
            <span className="text-[11px] font-medium text-[var(--foreground-muted)]">업데이트 2026-11-14</span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[#16412D] md:text-3xl">분리유청단백질(WPI)이란? 뜻·WPC 차이와 WPI 프로틴 함량 순위</h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            WPI는 유청 단백질 비율을 90% 이상으로 높인 원료입니다. WPI만 쓴 파우더 {pure.length}종과 WPI를 섞은 제품 {mixed.length}종을 성분표와 원재료 표시 순서로 비교했습니다.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <div className="space-y-6">
          <section className="rounded-[28px] border border-[#dce8df] bg-[#f6fbf7] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">분리유청단백질(WPI)이란? 짧게 답하면</h2>
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
            <h2 className="text-xl font-bold text-[var(--foreground)]">WPI·WPC·WPH 차이</h2>
            <div className="mt-4 overflow-x-auto rounded-2xl border border-[#e2ebe4] bg-[#f7fbf8]">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e2ebe4] text-[var(--foreground)]">
                    <th className="px-3 py-3 font-semibold whitespace-nowrap">원료</th>
                    <th className="px-3 py-3 font-semibold whitespace-nowrap">원재료명 표시</th>
                    <th className="px-3 py-3 font-semibold">원료 기준 단백질 비율</th>
                    <th className="px-3 py-3 font-semibold">특징</th>
                  </tr>
                </thead>
                <tbody className="text-[var(--foreground-muted)]">
                  <tr className="border-b border-[#eef3ef]">
                    <td className="px-3 py-3 font-semibold text-[var(--foreground)]">WPI</td>
                    <td className="px-3 py-3">분리유청단백</td>
                    <td className="px-3 py-3">90% 이상</td>
                    <td className="px-3 py-3">WPC보다 유당·지방을 더 걸러냄</td>
                  </tr>
                  <tr className="border-b border-[#eef3ef]">
                    <td className="px-3 py-3 font-semibold text-[var(--foreground)]">WPC</td>
                    <td className="px-3 py-3">농축유청단백</td>
                    <td className="px-3 py-3">등급별(WPC34·WPC80 등)</td>
                    <td className="px-3 py-3">WPI보다 유당이 많을 수 있음</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-3 font-semibold text-[var(--foreground)]">WPH</td>
                    <td className="px-3 py-3">가수분해유청단백</td>
                    <td className="px-3 py-3">원료에 따라 다름</td>
                    <td className="px-3 py-3">유청단백을 가수분해해 작은 조각으로 나눈 것(가수분해 WPI는 HWPI)</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs leading-5 text-[var(--foreground-muted)]">
              MPI(분리우유단백)는 유청이 아니라 카제인과 유청을 함께 담은 우유 단백 원료입니다(
              <Link href="/guides/product-selection-comparison/milk-protein-mpc-mpi-guide" className="font-semibold text-[#2d6a4f] hover:underline">MPC·MPI 단백질이란</Link>). MPI·카제인·분리대두단백까지 비교하려면{" "}
              <Link href="/guides/basics/protein-source-types" className="font-semibold text-[#2d6a4f] hover:underline">단백질 원료 차이</Link>를 보세요.
            </p>
          </section>

          <section className={cardClass}>
            <h2 className="text-xl font-bold text-[var(--foreground)]">WPI 프로틴 함량 순위 — WPI만 쓴 {pure.length}종</h2>
            <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">
              단백질 원료가 분리유청단백(가수분해 WPI 포함)뿐인 등록 파우더입니다. 함량은 1회 제공량 가루 무게 대비 단백질(%)이고, 같은 함량이면 1회 단백질이 많은 순입니다.
            </p>
            <SourceProductTable rows={pureRows} highlight={/분리유청|WPI/} />
          </section>

          <section className={cardClass}>
            <h2 className="text-xl font-bold text-[var(--foreground)]">WPI가 들어간 혼합 프로틴 {mixed.length}종 — 원료 순서 확인</h2>
            <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">
              원재료명은 많이 사용한 순서로 적습니다. WPI가 첫 자리인 제품은 {mixedWpiFirst.length}종, 다른 원료가 첫 자리인 제품은 {mixedOtherFirst.length}종입니다
              {namedButNotFirst.length ? `(이름에 WPI·아이솔레이트가 들어갔지만 첫 자리가 아닌 제품 ${namedButNotFirst.length}종 포함)` : ""}. 굵게 표시한 것이 WPI입니다.
            </p>
            <SourceProductTable rows={mixed} highlight={/분리유청|WPI/} />
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
              <li>
                - 원료 정의: U.S. Dairy Export Council,{" "}
                <a
                  href="https://www.usdec.org/assets/documents/Customer%20Site/C3-Using%20Dairy/C3.7-Resources%20and%20Insights/03-Application%20and%20Technical%20Materials/Whey_Spec.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  Whey products specifications
                </a>
              </li>
              <li>- 원재료명 표시 순서: 식품의약품안전처 「식품등의 표시기준」(많이 사용한 순서로 표시)</li>
              <li>- ProteinLab 등록 단백질 파우더 성분표(제조사 표기 1회 제공량)와 원재료명, 2026-11-14 집계(게이너 제외)</li>
            </ul>
          </section>
        </div>
      </main>

      <GuideBuySection slugs={buySlugs} />
      <Footer />
    </div>
  );
}
