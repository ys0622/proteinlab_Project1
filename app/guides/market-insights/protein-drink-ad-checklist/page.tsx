import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import GuideBuySection from "@/app/components/GuideBuySection";
import { buildGuideJsonLd } from "@/app/lib/guideJsonLd";

const pageTitle = "단백질 음료 광고 보고 살 때 체크할 7가지";
const pageDesc =
  "단백질 음료 광고를 보고 구매하기 전 단백질 함량, 당류, 칼로리, 용량, 단백질 밀도, 가격, 섭취 목적을 확인하는 방법을 정리했습니다.";
const canonical = "https://proteinlab.kr/guides/market-insights/protein-drink-ad-checklist";

export const metadata = {
  title: pageTitle,
  description: pageDesc,
  alternates: { canonical },
  openGraph: {
    title: pageTitle,
    description: pageDesc,
    url: canonical,
    type: "article" as const,
    locale: "ko_KR",
    siteName: "ProteinLab",
  },
  twitter: {
    card: "summary" as const,
    title: pageTitle,
    description: pageDesc,
  },
};

const checklistRows = [
  ["단백질 함량", "1병 기준 g", "20g 전후는 일상형, 40g 이상은 고함량 보충형으로 나눠 봅니다."],
  ["당류", "g 수치", "저당을 원하면 0~1g 제품과 4~5g 제품을 구분합니다."],
  ["칼로리", "kcal", "다이어트 목적이면 단백질보다 총열량을 먼저 놓치지 않아야 합니다."],
  ["용량", "mL 또는 g", "같은 단백질 20g이라도 190mL와 350mL는 음용감이 다릅니다."],
  ["단백질 밀도", "100mL당 단백질", "용량이 큰 제품은 밀도까지 봐야 실제 효율이 보입니다."],
  ["가격", "개당가와 박스가", "광고가 강한 제품도 박스 기준 가격은 따로 확인해야 합니다."],
  ["섭취 목적", "운동 후, 아침, 간식", "목적이 다르면 좋은 제품의 기준도 달라집니다."],
];

const mistakeCards = [
  {
    title: "브랜드가 익숙하면 성분도 좋을 것이라고 보기",
    body: "대형 브랜드 제품도 맛별로 당류와 칼로리가 달라질 수 있습니다. 브랜드보다 SKU별 성분표가 우선입니다.",
  },
  {
    title: "단백질 g만 보고 바로 고르기",
    body: "단백질이 높아도 칼로리, 지방, 당류가 함께 올라갈 수 있습니다. 특히 다이어트 목적이면 총량 기준이 더 중요합니다.",
  },
  {
    title: "광고 속 상황을 내 상황으로 그대로 옮기기",
    body: "운동 후 보충, 아침 대용, 간식 대체는 서로 다른 목적입니다. 광고 장면보다 자신의 섭취 타이밍을 먼저 정해야 합니다.",
  },
];

const relatedLinks = [
  {
    href: "/guides/market-insights/seoulmilk-protein-energy",
    title: "서울우유 프로틴 에너지 읽기",
    body: "광고로 접한 제품을 실제 수치 기준으로 읽는 예시입니다.",
  },
  {
    href: "/guides/product-selection-comparison/protein-drink-beginners-guide",
    title: "단백질 음료 입문 가이드",
    body: "제품 선택 전 기본 기준을 먼저 잡고 싶다면 이어서 보세요.",
  },
  {
    href: "/guides/product-selection-comparison/protein-drink-by-content",
    title: "단백질 함량별 음료 비교",
    body: "20g대와 40g대 제품을 목적별로 나눠 볼 수 있습니다.",
  },
];

export default function ProteinDrinkAdChecklistPage() {
  const jsonLd = buildGuideJsonLd({
    title: pageTitle,
    description: pageDesc,
    url: canonical,
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
            <Link href="/guides" className="hover:text-[var(--accent)]">
              Guides
            </Link>
            <span>/</span>
            <Link href="/guides/market-insights" className="hover:text-[var(--accent)]">
              시장 인사이트
            </Link>
            <span>/</span>
            <span>광고 구매 체크리스트</span>
          </div>
          <div className="mt-3">
            <span className="rounded-md bg-[#eef4ea] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#4c7a57]">
              구매 전 체크
            </span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[#16412D] md:text-3xl">
            단백질 음료 광고 보고 살 때, 무엇부터 확인해야 할까?
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            광고는 제품의 장점을 빠르게 보여주지만, 실제 선택에는 성분표와 섭취 목적이 더 중요합니다. 구매 전 확인할
            기준을 7가지로 나눠 정리했습니다.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <div className="space-y-6">
          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">핵심 답변</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
              단백질 음료 광고를 보고 구매하려면 먼저 단백질 함량, 당류, 칼로리, 용량을 확인하세요. 그다음 자신의
              목적이 운동 후 보충인지, 아침 대용인지, 간식 대체인지에 따라 20g대 일상형과 40g 이상 고함량 제품을
              나눠 보는 것이 실용적입니다.
            </p>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-[#f7fbf8] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">구매 전 체크리스트</h2>
            <div className="mt-5 overflow-x-auto rounded-2xl border border-[#ece9e2] bg-white">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8e6e3] text-[var(--foreground)]">
                    <th className="px-3 py-3 font-semibold">항목</th>
                    <th className="px-3 py-3 font-semibold">볼 곳</th>
                    <th className="px-3 py-3 font-semibold">해석</th>
                  </tr>
                </thead>
                <tbody>
                  {checklistRows.map((row) => (
                    <tr key={row[0]} className="border-b border-[#f0eeeb] last:border-b-0">
                      {row.map((cell, i) => (
                        <td key={cell} className={`px-3 py-3 ${i === 0 ? "font-semibold text-[var(--foreground)]" : "text-[var(--foreground-muted)]"}`}>
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="grid gap-3 md:grid-cols-3">
            {mistakeCards.map((card) => (
              <article key={card.title} className="rounded-2xl border border-[#dce8df] bg-white p-4">
                <h2 className="text-sm font-semibold text-[#24543d]">{card.title}</h2>
                <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{card.body}</p>
              </article>
            ))}
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-[#f7fbf8] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">다음에 보면 좋은 글</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {relatedLinks.map((item) => (
                <Link key={item.href} href={item.href} className="rounded-2xl border border-[#dce8df] bg-white p-4 transition-colors hover:bg-[#fbfdfb]">
                  <h3 className="text-sm font-semibold text-[#24543d]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{item.body}</p>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>
      <GuideBuySection />
      <Footer />
    </div>
  );
}
