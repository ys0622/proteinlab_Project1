import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import GuideBuySection from "@/app/components/GuideBuySection";
import SourceProductTable, { type SourceRow } from "@/app/components/SourceProductTable";
import { buildGuideJsonLd } from "@/app/lib/guideJsonLd";
import { hasNoPurchasableCoupangLink } from "@/app/lib/purchaseLinks";
import powderProducts from "@/app/data/powderProductsData.json";

// 2026-11-14 질문 허브: 네이버 자동완성 "분리대두단백 뜻·분리대두단백 isp·분리대두단백 중국산·미국산·국산·분리대두단백 프로틴·쉐이크",
// "대두단백 프로틴·대두 단백질 보충제"(전용 페이지 없음). 원료 용어 검색어(wpi isp 차이 등)는 30일 클릭률이 사이트에서 가장 높다.
// 수치는 등록 파우더 성분표(1회 제공량)와 원재료명 표시 순서에서 계산한다. 원산지는 데이터에 없으므로 확인 방법만 안내한다. 효능 주장은 하지 않는다.
const canonical = "https://proteinlab.kr/guides/product-selection-comparison/isolated-soy-protein-guide";

type Powder = {
  slug: string;
  brand: string;
  name: string;
  capacity: string;
  powderType: string;
  proteinSource?: string;
  servingSizeG: number;
  proteinPerServing: number;
  calories: number;
  sugar: number | null;
  sugarLabel?: string;
  coupangUrl?: string;
};

const ISP = /대두|ISP/;
const TYPE_LABEL: Record<string, string> = { blend: "혼합", senior: "시니어", meal: "식사대용", plant: "식물성", isolate: "아이솔레이트", whey: "웨이" };
const round1 = (v: number) => Math.round(v * 10) / 10;
const median = (values: number[]) => {
  const s = [...values].sort((a, b) => a - b);
  if (!s.length) return 0;
  const mid = Math.floor(s.length / 2);
  return s.length % 2 ? s[mid] : (s[mid - 1] + s[mid]) / 2;
};

const registered = (powderProducts as Powder[]).filter((d) => d.servingSizeG > 0 && d.proteinPerServing > 0 && d.calories > 0);
const withIsp = registered.filter((d) => ISP.test(d.proteinSource ?? ""));
const gainerCount = withIsp.filter((d) => d.powderType === "gainer").length;
const rows = withIsp
  .filter((d) => d.powderType !== "gainer")
  .map((d) => {
    const parts = (d.proteinSource ?? "").split("·");
    return {
      slug: d.slug,
      powderType: d.powderType,
      coupangUrl: d.coupangUrl,
      label: d.name.startsWith(d.brand) ? d.name : `${d.brand} ${d.name}`,
      capacity: d.capacity,
      servingSizeG: d.servingSizeG,
      proteinPerServing: d.proteinPerServing,
      proteinPct: Math.round((d.proteinPerServing / d.servingSizeG) * 100),
      kcal: Math.round(d.calories),
      sugarText: d.sugarLabel ?? (typeof d.sugar === "number" ? `${d.sugar}g` : "-"),
      source: d.proteinSource ?? "",
      ispFirst: ISP.test(parts[0]),
      ispOnly: parts.length === 1,
    } satisfies SourceRow & Record<string, unknown>;
  })
  .sort((a, b) => b.proteinPct - a.proteinPct || b.proteinPerServing - a.proteinPerServing);

const first = rows.filter((d) => d.ispFirst);
const notFirst = rows.filter((d) => !d.ispFirst);
const only = rows.filter((d) => d.ispOnly);
const withWhey = rows.filter((d) => /유청|WPI|WPC/.test(d.source));
const namedIsolate = first.filter((d) => /아이솔레이트|isolate|WPI/i.test(d.label));
const typeCounts = Object.entries(
  rows.reduce<Record<string, number>>((acc, d) => {
    acc[d.powderType] = (acc[d.powderType] ?? 0) + 1;
    return acc;
  }, {}),
).sort((a, b) => b[1] - a[1]);
const proteinMedian = round1(median(rows.map((d) => d.proteinPerServing)));
const pctMedian = Math.round(median(rows.map((d) => d.proteinPct)));
const rankRows = first.map((d) => {
  const rank = first.findIndex((x) => x.proteinPct === d.proteinPct) + 1;
  const tied = first.filter((x) => x.proteinPct === d.proteinPct).length > 1;
  return { ...d, rankText: tied ? `공동 ${rank}` : String(rank) };
});
const top = first[0];

const buySlugs = first.filter((d) => !hasNoPurchasableCoupangLink(d.coupangUrl, d.slug)).slice(0, 3).map((d) => d.slug);

const pageTitle = `분리대두단백(ISP)이란? 뜻·원산지 확인법, 분리대두단백 프로틴 ${rows.length}종 성분표`;
const pageDescription = `분리대두단백(ISP, Isolated Soy Protein)은 콩에서 단백질을 분리해 90% 이상으로 높인 원료입니다. 등록 단백질 파우더 ${registered.length}종 중 ${withIsp.length}종이 분리대두단백을 쓰고, 게이너를 빼면 ${first.length}종은 원재료 첫 자리가 분리대두단백입니다. 1회 단백질·함량·원료 순서를 성분표로 비교했습니다.`;

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
  "분리대두단백(ISP)은 Isolated Soy Protein의 약자로, 콩(대두)에서 기름과 탄수화물을 걸러 내고 단백질 비율을 건조 기준 90% 이상으로 높인 원료입니다. 같은 콩 원료라도 농축대두단백(SPC)은 65~90%, 대두분은 그보다 낮습니다. 유당이 없는 식물성 단백질입니다.",
  `ProteinLab 등록 단백질 파우더 ${registered.length}종 중 ${withIsp.length}종이 분리대두단백을 씁니다. 게이너 ${gainerCount}종을 뺀 ${rows.length}종 중 ${first.length}종은 원재료 표시 첫 자리가 분리대두단백이고, 분리대두단백만 쓴 제품은 ${only.length}종뿐이며 ${withWhey.length}종은 유청 단백질(WPI·WPC)과 섞었습니다.`,
  `이 ${rows.length}종의 1회 단백질 중앙값은 ${proteinMedian}g, 가루 무게 대비 단백질 ${pctMedian}%입니다. 원산지(미국산·중국산 등)는 제품마다 다르고 ProteinLab 데이터에는 없으니, 포장의 원재료명 옆 원산지 표시를 확인하세요.`,
];

const faqItems = [
  {
    question: "분리대두단백 뜻이 뭔가요?",
    answer: "콩(대두)에서 단백질만 분리한 원료입니다. 영어로 Isolated Soy Protein(ISP) 또는 Soy Protein Isolate(SPI)라고 하며, 건조 기준 단백질 90% 이상입니다. 두유는 콩을 통째로 갈아 만든 것이라 분리대두단백과는 다른 식품입니다.",
  },
  {
    question: "분리대두단백 원산지(중국산·미국산)는 어떻게 확인하나요?",
    answer: "원산지는 포장의 원재료명에서 '분리대두단백(외국산: 미국 등)'처럼 함께 적힌 표시로 확인합니다. 같은 브랜드라도 생산 시기에 따라 바뀔 수 있어 구매 페이지의 원재료 사진을 보는 것이 정확합니다. ProteinLab은 원산지를 따로 기록하지 않습니다.",
  },
  {
    question: "분리대두단백 프로틴은 어떤 제품이 있나요?",
    answer: `원재료 첫 자리가 분리대두단백인 등록 파우더는 ${first.length}종이고, 가루 대비 단백질 함량이 가장 높은 제품은 ${top.label}(${top.servingSizeG}g 중 ${top.proteinPerServing}g, ${top.proteinPct}%)입니다. 유형은 ${typeCounts.map(([t, n]) => `${TYPE_LABEL[t] ?? t} ${n}종`).join(", ")}입니다(분리대두단백이 들어간 ${rows.length}종, 게이너 제외).`,
  },
  {
    question: "'아이솔레이트'라는 이름이면 WPI인가요?",
    answer: namedIsolate.length
      ? `아닐 수 있습니다. 이름에 아이솔레이트·WPI가 들어갔지만 원재료 첫 자리가 분리대두단백인 제품이 ${namedIsolate.length}종 있습니다(${namedIsolate.map((d) => d.label).join(", ")}). 분리대두단백도 '분리(isolate)' 원료라서입니다. 유청 원료를 찾는다면 원재료 순서를 확인하세요.`
      : "이름보다 원재료 순서를 확인하세요. 분리대두단백도 '분리(isolate)' 원료입니다.",
  },
  {
    question: "분리대두단백과 유청(WPI)은 무엇이 다른가요?",
    answer: "분리대두단백은 식물성이라 유당이 없고, 유청은 우유에서 나온 동물성 단백질입니다. 한 번 먹었을 때 근단백 합성은 같은 양이면 대두가 유청보다 낮게 나온 연구가 있지만, 6주 이상 운동하며 먹은 연구를 모으면 근육량·근력 증가 차이는 없었습니다(아래 원료 차이 가이드의 출처).",
  },
];

const relatedLinks = [
  { href: "/guides/product-selection-comparison/wpi-protein-guide", title: "분리유청단백질(WPI)이란", body: "WPI만 쓴 프로틴 함량 순위." },
  { href: "/guides/basics/protein-source-types", title: "MPI·WPI·WPC·ISP 차이", body: "단백질 원료 7가지를 한 표로." },
  { href: "/guides/product-selection-comparison/wpi-wpc-isp-powder-guide", title: "WPI·WPC·분리대두 파우더 차이", body: "유형별 평균 함량과 당류." },
  { href: "/guides/product-selection-comparison/soymilk-protein-ranking", title: "두유 단백질 함량 순위", body: "콩을 통째로 쓴 두유 전체 비교." },
  { href: "/guides/product-selection-comparison/protein-powder-top10", title: "단백질 파우더 추천 TOP 10", body: "함량·당류로 고른 보충제." },
  { href: "/powder", title: "단백질 파우더 전체 비교", body: "유형·함량으로 전체 보기." },
];

const cardClass = "rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]";

export default function IsolatedSoyProteinGuidePage() {
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
            <span>분리대두단백(ISP)</span>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="rounded-md bg-[#f5f0ea] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#7a5230]">질문 답</span>
            <span className="text-[11px] font-medium text-[var(--foreground-muted)]">업데이트 2026-11-14</span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[#16412D] md:text-3xl">분리대두단백(ISP)이란? 뜻·원산지 확인법과 분리대두단백 프로틴 비교</h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            분리대두단백은 콩 단백질을 90% 이상으로 높인 원료입니다. 등록 파우더 {registered.length}종 중 {withIsp.length}종이 쓰고 있어, 원료 순서와 1회 단백질을 성분표로 비교했습니다.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <div className="space-y-6">
          <section className="rounded-[28px] border border-[#dce8df] bg-[#f6fbf7] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">분리대두단백(ISP)이란? 짧게 답하면</h2>
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
            <h2 className="text-xl font-bold text-[var(--foreground)]">분리대두단백이 첫 원료인 프로틴 {first.length}종 — 함량 순위</h2>
            <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">
              원재료명은 많이 사용한 순서로 적습니다. 첫 자리가 분리대두단백인 등록 파우더를 가루 무게 대비 단백질(%) 순으로 놓았습니다(게이너 {gainerCount}종 제외). 굵게 표시한 것이 대두단백입니다.
            </p>
            <SourceProductTable rows={rankRows} highlight={/대두|ISP/} />
          </section>

          {notFirst.length > 0 && (
            <section className={cardClass}>
              <h2 className="text-xl font-bold text-[var(--foreground)]">분리대두단백이 두 번째 이후 원료인 프로틴 {notFirst.length}종</h2>
              <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">유청·우유 단백이 주원료이고 분리대두단백이 함께 들어간 제품입니다.</p>
              <SourceProductTable rows={notFirst} highlight={/대두|ISP/} />
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
              <li>- 원료 정의: Codex Alimentarius CXS 175-1989 「General Standard for Soy Protein Products」(분리대두단백 건조 기준 단백질 90% 이상, 농축 65~90%)</li>
              <li>- 원재료명 표시 순서: 식품의약품안전처 「식품등의 표시기준」(많이 사용한 순서로 표시)</li>
              <li>- 근단백 합성·근육량 연구: Tang 2009, Messina 2018(<Link href="/guides/basics/protein-source-types" className="underline">단백질 원료 차이</Link>에 정리)</li>
              <li>- ProteinLab 등록 단백질 파우더 성분표(제조사 표기 1회 제공량)와 원재료명, 2026-11-14 집계</li>
            </ul>
          </section>
        </div>
      </main>

      <GuideBuySection slugs={buySlugs} />
      <Footer />
    </div>
  );
}
