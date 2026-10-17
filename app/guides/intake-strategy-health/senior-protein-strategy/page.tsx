import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import GuideBuySection from "@/app/components/GuideBuySection";
import { buildGuideJsonLd } from "@/app/lib/guideJsonLd";

const _pageTitle = "노인 단백질 보충 | 음료·두유 성분 비교";
const _pageDesc = "노인 단백질 보충 제품을 찾을 때 음료·두유·요거트의 단백질, 당류, 열량, 원재료와 섭취 형태를 비교하는 방법을 정리했습니다.";
export const metadata = {
  title: _pageTitle,
  description: _pageDesc,
  alternates: { canonical: "https://proteinlab.kr/guides/intake-strategy-health/senior-protein-strategy" },
  openGraph: {
    images: [{ url: "https://proteinlab.kr/opengraph-image", width: 1200, height: 630, alt: "ProteinLab 단백질 제품 비교" }],
    title: _pageTitle,
    description: _pageDesc,
    url: "https://proteinlab.kr/guides/intake-strategy-health/senior-protein-strategy",
    type: "website" as const,
    locale: "ko_KR",
    siteName: "ProteinLab",
  },
  twitter: {
    images: ["https://proteinlab.kr/opengraph-image"],
    card: "summary" as const,
    title: _pageTitle,
    description: _pageDesc,
  },
};

const seniorTips = [
  "제품 형태를 먼저 정한 뒤 한 회 제공량의 단백질·당류·열량을 비교합니다.",
  "음료·두유·요거트는 원재료와 용량이 다르므로 같은 카테고리 안에서 먼저 비교합니다.",
  "질환, 알레르기, 삼킴 곤란, 복용 중인 약이 있다면 일반 제품 비교보다 의료진의 안내를 우선합니다.",
];

const seniorRows = [
  ["아침", "제품 형태 확인", "바로 마시는 음료인지, 냉장 보관이 필요한 요거트인지 생활 환경에 맞춰 확인합니다."],
  ["간식", "한 회 제공량 확인", "한 병이나 한 팩에 표시된 단백질·당류·열량과 용량을 함께 봅니다."],
  ["식사와 함께", "식사 전체와 구분", "보충 제품의 영양정보와 식사 전체의 영양 구성은 별도로 확인합니다."],
];

const seniorChecks = [
  {
    title: "한 회 제공량 확인",
    body: "제품마다 한 병·한 팩의 용량과 단백질이 다릅니다. 총량과 함께 당류·열량·나트륨 표시를 확인합니다.",
  },
  {
    title: "섭취 형태 구분",
    body: "RTD 음료, 두유, 요거트, 바는 질감과 보관 방식이 다릅니다. 씹기나 삼키기 어려움이 있다면 제품을 고르기 전에 의료진과 상의합니다.",
  },
  {
    title: "원재료와 알레르기 표시",
    body: "유단백 기반 음료와 대두 기반 두유는 원료가 다릅니다. 원재료명과 알레르기 표시를 제품별로 확인합니다.",
  },
];

const seniorRelated = [
  {
    href: "/guides/product-selection-comparison/protein-drink-for-50s",
    title: "50대 단백질 음료 비교",
    body: "등록 음료의 단백질·당류·열량과 제품 형태를 비교합니다.",
  },
  {
    href: "/guides/product-selection-comparison/newcare-allprotein",
    title: "뉴케어 분석 보기",
    body: "뉴케어 등록 제품의 원재료와 영양성분 차이를 확인합니다.",
  },
  {
    href: "/guides/intake-strategy-health/meal-replacement-strategy",
    title: "식사대용 전략 보기",
    body: "보충용 제품과 식사보완형 제품의 표시 항목 차이를 확인합니다.",
  },
  {
    href: "/guides/intake-strategy-health/high-protein-side-effects",
    title: "고단백 음료 확인 항목",
    body: "고함량 제품을 볼 때 한 회 제공량과 원재료, 영양정보를 확인하는 기준을 정리합니다.",
  },
  {
    href: "/guides/product-selection-comparison/high-protein-soymilk-guide",
    title: "단백질 두유 성분 비교",
    body: "대두 기반 제품을 찾는 경우 두유의 단백질·당류·열량을 비교합니다.",
  },
];

const faqItems = [
  {
    question: "노인 단백질 보충 제품은 무엇부터 확인하나요?",
    answer: "제품 형태와 한 회 제공량을 정한 뒤 단백질, 당류, 열량, 나트륨, 원재료와 알레르기 표시를 확인하세요.",
  },
  {
    question: "노인 단백질 음료와 두유는 어떻게 다른가요?",
    answer: "일반 단백질 음료는 유단백 등 여러 원료를 쓸 수 있고, 두유는 대두 기반입니다. 제품별 단백질·당류·열량과 원재료명을 같은 항목으로 비교하세요.",
  },
  {
    question: "질환이나 삼킴 곤란이 있어도 일반 제품 비교로 고를 수 있나요?",
    answer: "일반 성분 비교만으로 섭취 가능 여부를 판단할 수 없습니다. 질환, 알레르기, 삼킴 곤란, 복용 약이 있다면 담당 의료진의 안내를 우선하세요.",
  },
];

export default function SeniorProteinStrategyPage() {
  const jsonLd = buildGuideJsonLd({ title: (metadata as {title:string;description:string}).title, description: (metadata as {title:string;description:string}).description, url: 'https://proteinlab.kr/guides/intake-strategy-health/senior-protein-strategy', faq: faqItems });
  return (
    <div className="min-h-screen bg-white">
            {jsonLd.map((item, i) => (<script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }} />))}
      <Header />
      <section className="w-full border-t border-b bg-[var(--hero-bg)]" style={{ borderColor: "var(--hero-border)" }}>
        <div className="mx-auto max-w-[1200px] px-4 py-5 md:px-6 md:py-6">
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
            <Link href="/guides" className="hover:text-[var(--accent)]">Guides</Link>
            <span>/</span>
            <Link href="/guides/intake-strategy-health" className="hover:text-[var(--accent)]">섭취 전략·건강</Link>
            <span>/</span>
            <span>노인 단백질 보충</span>
          </div>
          <div className="mt-3">
            <span className="rounded-md bg-[#f5f0ea] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#7a5230]">TRACK C</span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[#16412D] md:text-3xl">
            노인 단백질 보충 제품은
            <br />
            형태와 성분표를 함께 비교합니다
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            음료·두유·요거트는 원재료와 용량이 다릅니다. 의학적 판단 없이 한 회 제공량의 단백질·당류·열량과 표시사항만 비교합니다.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
          <div className="rounded-2xl border border-[#dce8df] bg-[#f7fbf8] px-4 py-4">
            <p className="text-[11px] font-semibold tracking-[0.08em] text-[#2d6a4f]">SENIOR ROUTINE</p>
            <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">
              이 페이지는 노인에게 특정 제품을 권하거나 질병 관련 판단을 제공하지 않습니다. 등록 제품의 형태와 영양성분을 읽는 일반 정보만 제공합니다.
            </p>
          </div>
          <ul className="mt-5 space-y-3 text-sm leading-6 text-[var(--foreground-muted)]">
            {seniorTips.map((item) => (
              <li key={item} className="flex gap-3 rounded-xl border border-[#dce8df] bg-[#f6fbf7] px-4 py-3">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#2d6a4f]" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-5 overflow-x-auto">
            <table className="min-w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-[#e8e6e3] text-[var(--foreground)]">
                  <th className="px-3 py-3 font-semibold">구간</th>
                  <th className="px-3 py-3 font-semibold">포인트</th>
                  <th className="px-3 py-3 font-semibold">실전 해석</th>
                </tr>
              </thead>
              <tbody>
                {seniorRows.map((row) => (
                  <tr key={row[0]} className="border-b border-[#f0eeeb] last:border-b-0">
                    {row.map((cell) => (
                      <td key={cell} className="px-3 py-3 text-[var(--foreground-muted)]">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="mt-6 rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
          <h2 className="text-xl font-bold text-[var(--foreground)]">음료·두유·요거트 비교 항목</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            <article className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4">
              <h3 className="text-sm font-semibold text-[#24543d]">단백질 음료</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">한 병 단백질·당류·열량과 유단백 여부, 유당 관련 표시를 확인합니다.</p>
            </article>
            <article className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4">
              <h3 className="text-sm font-semibold text-[#24543d]">두유</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">대두 원료와 알레르기 표시, 한 팩 단백질·당류·열량을 확인합니다.</p>
            </article>
            <article className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4">
              <h3 className="text-sm font-semibold text-[#24543d]">요거트</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">떠먹는 형태와 마시는 형태를 구분하고 냉장 보관 여부와 영양정보를 확인합니다.</p>
            </article>
          </div>
        </section>

        <section className="mt-6 rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
          <h2 className="text-xl font-bold text-[var(--foreground)]">시니어가 특히 먼저 봐야 할 포인트</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {seniorChecks.map((item) => (
              <article key={item.title} className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4">
                <h3 className="text-sm font-semibold text-[#24543d]">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{item.body}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-6 rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
          <p className="text-[11px] font-semibold tracking-[0.08em] text-[#2d6a4f]">SENIOR NOTE</p>
          <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
            제품 라벨 비교는 일반 정보입니다. 개인의 섭취 가능 여부와 적정량은 건강 상태와 식사 구성에 따라 달라질 수 있습니다.
          </p>
        </section>

        <section className="mt-6 rounded-[28px] border border-[#e2ebe4] bg-[#f7fbf8] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
          <h2 className="text-xl font-bold text-[var(--foreground)]">💬 자주 묻는 질문</h2>
          <div className="mt-5 space-y-3">
            {faqItems.map((item) => (
              <div key={item.question} className="rounded-xl border border-[#dce8df] bg-white px-4 py-4">
                <p className="text-sm font-semibold text-[var(--foreground)]">Q. {item.question}</p>
                <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">A. {item.answer}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-6 rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
          <h2 className="text-xl font-bold text-[var(--foreground)]">📖 관련 가이드</h2>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {seniorRelated.map((item) => (
              <Link key={item.href} href={item.href} className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4 transition-colors hover:bg-white">
                <h3 className="text-sm font-semibold text-[#24543d]">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{item.body}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <GuideBuySection topic="general" />
      <Footer />
    </div>
  );
}
