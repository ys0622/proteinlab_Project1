import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import GuideBuySection from "@/app/components/GuideBuySection";
import SourceProductTable, { type SourceRow } from "@/app/components/SourceProductTable";
import { buildGuideJsonLd } from "@/app/lib/guideJsonLd";
import { hasNoPurchasableCoupangLink } from "@/app/lib/purchaseLinks";
import powderProducts from "@/app/data/powderProductsData.json";

// 2026-11-14 질문 허브: 네이버 AI 브리핑 'mpc 단백질'은 브리핑이 뜨는데 우리 원료 페이지가 없어 인용되지 않았다.
// 'mpi 단백질' 30일 클릭률 21.9%, 'wpi mpi 차이' 18.8%(원료 용어 검색어가 사이트에서 클릭률이 가장 높다).
// 수치는 등록 파우더 성분표(1회 제공량)와 원재료명 표시 순서에서 계산한다. 효능 주장은 하지 않는다.
const canonical = "https://proteinlab.kr/guides/product-selection-comparison/milk-protein-mpc-mpi-guide";

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

const MPI = /분리우유단백|분리유단백|분리밀크단백|MPI/;
const MPC = /농축우유단백|농축유단백|우유단백농축|우유단백\(MPC\)|MPC/;
const MILK = new RegExp(`${MPI.source}|${MPC.source}`);
const WPI_ONLY_OTHER = /농축|WPC|대두|ISP|우유|유단백|MPI|MPC|카제인|산양|밀|완두|밀크|콜라겐|난백/;
const median = (values: number[]) => {
  const s = [...values].sort((a, b) => a - b);
  if (!s.length) return 0;
  const mid = Math.floor(s.length / 2);
  return s.length % 2 ? s[mid] : (s[mid - 1] + s[mid]) / 2;
};

const toRow = (d: Powder): SourceRow & { first: string; coupangUrl?: string } => ({
  slug: d.slug,
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

const valid = (powderProducts as Powder[]).filter(
  (d) => d.powderType !== "gainer" && d.servingSizeG > 0 && d.proteinPerServing > 0 && d.calories > 0 && (d.proteinSource ?? "") !== "",
);
const byPct = <T extends SourceRow>(a: T, b: T) => b.proteinPct - a.proteinPct || b.proteinPerServing - a.proteinPerServing;

const milk = valid.filter((d) => MILK.test(d.proteinSource ?? "")).map(toRow).sort(byPct);
const withMpi = milk.filter((d) => MPI.test(d.source));
const withMpc = milk.filter((d) => MPC.test(d.source));
const withBoth = milk.filter((d) => MPI.test(d.source) && MPC.test(d.source));
const milkFirst = milk.filter((d) => MILK.test(d.first));
const ispFirst = milk.filter((d) => /대두|ISP/.test(d.first));
const wheyFirst = milk.filter((d) => /유청|WPI|WPC/.test(d.first));
const milkOnly = milk.filter((d) => d.source.split("·").every((part) => MILK.test(part)));
const caseinCount = valid.filter((d) => /카제인/.test(d.proteinSource ?? "")).length;
const milkPctMedian = Math.round(median(milk.map((d) => d.proteinPct)));
const milkProteinMedian = Math.round(median(milk.map((d) => d.proteinPerServing)) * 10) / 10;
const wpiOnlyPctMedian = Math.round(
  median(
    valid
      .filter((d) => /분리유청|WPI/.test(d.proteinSource ?? "") && !WPI_ONLY_OTHER.test(d.proteinSource ?? ""))
      .map((d) => (d.proteinPerServing / d.servingSizeG) * 100),
  ),
);
const top = milk[0];
const rows = milk.map((d) => {
  const rank = milk.findIndex((x) => x.proteinPct === d.proteinPct) + 1;
  const tied = milk.filter((x) => x.proteinPct === d.proteinPct).length > 1;
  return { ...d, rankText: tied ? `공동 ${rank}` : String(rank) };
});

const buySlugs = milk.filter((d) => !hasNoPurchasableCoupangLink(d.coupangUrl, d.slug)).slice(0, 3).map((d) => d.slug);

const pageTitle = `MPC·MPI 단백질이란? 농축우유단백·분리우유단백 뜻과 차이, 들어간 프로틴 ${milk.length}종`;
const pageDescription = `MPC(농축우유단백)는 우유 단백질을 40~89%로 농축한 원료, MPI(분리우유단백)는 89.5% 이상으로 높인 원료입니다. 둘 다 카제인과 유청을 우유와 비슷한 비율로 담습니다. MPC·MPI가 들어간 단백질 파우더 ${milk.length}종을 원재료 표시 순서와 1회 단백질 함량으로 비교했습니다.`;

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
  `MPC(Milk Protein Concentrate, 농축우유단백)는 우유를 막으로 걸러(한외여과·정용여과) 유당·무기질을 줄이고 단백질을 농축한 원료로, 단백질 비율에 따라 MPC40~MPC85 등급이 있습니다(원료 기준 단백질 약 40~89%). MPI(Milk Protein Isolate, 분리우유단백)는 같은 방식으로 단백질을 89.5% 이상까지 높인 원료입니다(미국 유제품 원료 협회 ADPI 2023 기준).`,
  `MPC·MPI는 유청만 뽑은 WPI·WPC와 달리 카제인과 유청을 우유와 비슷한 비율(카제인 약 80%, 유청 약 20%)로 함께 담습니다. 그래서 원재료명에는 '농축우유단백·분리우유단백(분리유단백)'으로 적히고, 유청단백(WPI·WPC)과는 다른 원료입니다.`,
  `ProteinLab에 등록된 단백질 파우더(게이너 제외) 중 MPC 또는 MPI가 들어간 제품은 ${milk.length}종(MPI ${withMpi.length}종, MPC ${withMpc.length}종${withBoth.length ? `, 둘 다 ${withBoth.length}종` : ""})입니다. ${milkOnly.length ? `우유 단백만 쓴 제품은 ${milkOnly.length}종이고` : "MPC·MPI만 쓴 제품은 없고"}, 원재료 첫 자리가 MPC·MPI인 제품은 ${milkFirst.length}종입니다. 첫 자리는 분리대두단백 ${ispFirst.length}종, 유청단백 ${wheyFirst.length}종입니다.`,
];

const faqItems = [
  {
    question: "MPC 단백질이 뭔가요?",
    answer: "MPC는 Milk Protein Concentrate, 우리말로 농축우유단백(우유단백농축물)입니다. 우유를 막으로 걸러 유당·무기질 일부를 줄이고 단백질을 농축한 원료로, 원료 기준 단백질은 등급에 따라 약 40~89%입니다.",
  },
  {
    question: "MPI 단백질이 뭔가요?",
    answer: "MPI는 Milk Protein Isolate, 분리우유단백(분리유단백)입니다. MPC와 같은 우유 단백 원료이지만 단백질 비율을 89.5% 이상으로 높인 것입니다. 카제인과 유청을 함께 담는 점은 MPC와 같습니다.",
  },
  {
    question: "MPC와 MPI 차이는 무엇인가요?",
    answer: "원료 기준 단백질 비율이 다릅니다. MPC는 약 40~89%(등급별), MPI는 89.5% 이상이고, MPI가 유당·무기질을 더 걸러낸 원료입니다. 완제품의 함량은 원료 비율보다 배합에 따라 달라지므로 성분표의 1회 단백질 g을 함께 보세요.",
  },
  {
    question: "MPI와 WPI 차이는 무엇인가요?",
    answer: `둘 다 단백질 비율이 90% 안팎인 분리 원료지만, WPI는 유청 단백질만, MPI는 카제인과 유청을 함께 담습니다. 등록 제품 기준 WPI만 쓴 파우더의 가루 대비 단백질 중앙값은 ${wpiOnlyPctMedian}%, MPC·MPI가 들어간 혼합 파우더는 ${milkPctMedian}%입니다(배합 차이 포함).`,
  },
  {
    question: "MPC·MPI가 들어간 프로틴은 어떤 게 있나요?",
    answer: `등록 파우더 ${milk.length}종이고, 가루 무게 대비 단백질이 가장 높은 제품은 ${top.label}(${top.servingSizeG}g 중 ${top.proteinPerServing}g, ${top.proteinPct}%)입니다. 1회 단백질 중앙값은 ${milkProteinMedian}g입니다. 아래 표에서 원료 순서와 함께 볼 수 있습니다.`,
  },
  {
    question: "카제인과 MPC·MPI는 같은 건가요?",
    answer: `아닙니다. 카제인(미셀라카제인·카제인칼슘 등)은 우유 단백 중 카제인만 분리한 원료이고, MPC·MPI는 카제인과 유청이 함께 들어 있습니다. 등록 파우더 중 카제인을 따로 표시한 제품은 ${caseinCount}종입니다.`,
  },
];

const relatedLinks = [
  { href: "/guides/basics/protein-source-types", title: "MPI·WPI·WPC·ISP 차이", body: "단백질 원료 7가지를 한 표로." },
  { href: "/guides/product-selection-comparison/wpi-protein-guide", title: "분리유청단백질(WPI)이란", body: "WPI만 쓴 프로틴 함량 순위." },
  { href: "/guides/product-selection-comparison/isolated-soy-protein-guide", title: "분리대두단백(ISP)이란", body: "대두단백이 들어간 프로틴과 원료 순서." },
  { href: "/guides/product-selection-comparison/wpi-wpc-isp-powder-guide", title: "WPI·WPC·분리대두 파우더 차이", body: "유형별 평균 함량과 당류." },
  { href: "/guides/product-selection-comparison/protein-powder-top10", title: "단백질 파우더 추천 TOP 10", body: "함량·당류로 고른 보충제." },
  { href: "/powder", title: "단백질 파우더 전체 비교", body: "유형·함량으로 전체 보기." },
];

const cardClass = "rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]";

export default function MilkProteinMpcMpiGuidePage() {
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
            <span>MPC·MPI(우유 단백)</span>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="rounded-md bg-[#f5f0ea] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#7a5230]">질문 답</span>
            <span className="text-[11px] font-medium text-[var(--foreground-muted)]">업데이트 2026-11-14</span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[#16412D] md:text-3xl">MPC·MPI 단백질이란? 농축우유단백·분리우유단백 뜻과 차이</h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            MPC는 우유 단백질을 약 40~89%로 농축한 원료, MPI는 89.5% 이상으로 높인 원료입니다. 둘이 들어간 파우더 {milk.length}종을 성분표와 원재료 표시 순서로 비교했습니다.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <div className="space-y-6">
          <section className="rounded-[28px] border border-[#dce8df] bg-[#f6fbf7] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">MPC·MPI 단백질이란? 짧게 답하면</h2>
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
            <h2 className="text-xl font-bold text-[var(--foreground)]">MPC·MPI·WPI·카제인 차이</h2>
            <div className="mt-4 overflow-x-auto rounded-2xl border border-[#e2ebe4] bg-[#f7fbf8]">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e2ebe4] text-[var(--foreground)]">
                    <th className="px-3 py-3 font-semibold whitespace-nowrap">원료</th>
                    <th className="px-3 py-3 font-semibold whitespace-nowrap">원재료명 표시</th>
                    <th className="px-3 py-3 font-semibold">원료 기준 단백질 비율</th>
                    <th className="px-3 py-3 font-semibold">담긴 단백질</th>
                  </tr>
                </thead>
                <tbody className="text-[var(--foreground-muted)]">
                  <tr className="border-b border-[#eef3ef]">
                    <td className="px-3 py-3 font-semibold text-[var(--foreground)]">MPC</td>
                    <td className="px-3 py-3">농축우유단백·우유단백농축물</td>
                    <td className="px-3 py-3">약 40~89%(MPC40~MPC85 등급)</td>
                    <td className="px-3 py-3">카제인 + 유청(우유와 비슷한 비율)</td>
                  </tr>
                  <tr className="border-b border-[#eef3ef]">
                    <td className="px-3 py-3 font-semibold text-[var(--foreground)]">MPI</td>
                    <td className="px-3 py-3">분리우유단백·분리유단백</td>
                    <td className="px-3 py-3">89.5% 이상</td>
                    <td className="px-3 py-3">카제인 + 유청(우유와 비슷한 비율)</td>
                  </tr>
                  <tr className="border-b border-[#eef3ef]">
                    <td className="px-3 py-3 font-semibold text-[var(--foreground)]">WPI·WPC</td>
                    <td className="px-3 py-3">분리유청단백·농축유청단백</td>
                    <td className="px-3 py-3">WPI 90% 이상, WPC 등급별</td>
                    <td className="px-3 py-3">유청만</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-3 font-semibold text-[var(--foreground)]">카제인</td>
                    <td className="px-3 py-3">미셀라카제인·카제인칼슘·카제인나트륨</td>
                    <td className="px-3 py-3">원료에 따라 다름</td>
                    <td className="px-3 py-3">카제인만</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs leading-5 text-[var(--foreground-muted)]">
              원료 비율은 원료 자체의 규격입니다. 완제품 가루의 단백질 비율은 감미료·향료·다른 원료 배합에 따라 이보다 낮습니다. 분리대두단백까지 비교하려면{" "}
              <Link href="/guides/basics/protein-source-types" className="font-semibold text-[#2d6a4f] hover:underline">단백질 원료 차이</Link>를 보세요.
            </p>
          </section>

          <section className={cardClass}>
            <h2 className="text-xl font-bold text-[var(--foreground)]">MPC·MPI가 들어간 프로틴 {milk.length}종 — 함량과 원료 순서</h2>
            <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">
              원재료명은 많이 사용한 순서로 적습니다. MPC·MPI가 첫 자리인 제품은 {milkFirst.length}종, 분리대두단백이 첫 자리인 제품은 {ispFirst.length}종, 유청단백이 첫 자리인 제품은 {wheyFirst.length}종입니다. 함량은 1회 제공량 가루 무게 대비 단백질(%)이고, 굵게 표시한 것이 MPC·MPI입니다.
            </p>
            <SourceProductTable rows={rows} highlight={MILK} />
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
                - 원료 규격: American Dairy Products Institute,{" "}
                <a
                  href="https://www.adpi.org/wp-content/uploads/2023/10/Concentrated-Milk-Proteins-Standard-v2.1_2023.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  Concentrated Milk Proteins Standard v2.1 (2023)
                </a>
                {" "}— MPC40~MPC85 단백질 최소 39.5~85.0%, MPI 89.5%
              </li>
              <li>
                - 원료 설명: U.S. Dairy Export Council,{" "}
                <a
                  href="https://www.thinkusadairy.org/products/milk-proteins/milk-protein-categories/milk-protein-concentrate"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  Milk Protein Concentrate
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
