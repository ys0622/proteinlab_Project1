import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import GuideBuySection from "@/app/components/GuideBuySection";
import { buildGuideJsonLd } from "@/app/lib/guideJsonLd";

const pageTitle = "서울우유 프로틴 에너지, 광고 보고 살 때 확인할 기준";
const pageDesc =
  "서울우유 프로틴 에너지 커피·초콜릿 제품을 단백질, 당류, 칼로리, 용량 기준으로 읽고 기존 단백질 음료와 비교하는 방법을 정리했습니다.";
const canonical = "https://proteinlab.kr/guides/market-insights/seoulmilk-protein-energy";

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

const productRows = [
  ["프로틴 에너지 커피", "240mL", "21g", "135kcal", "4g"],
  ["프로틴 에너지 초콜릿", "240mL", "21g", "145kcal", "5g"],
];

const checkCards = [
  {
    title: "광고 문구보다 먼저 볼 숫자",
    body: "두 제품 모두 단백질 21g 구간입니다. 고단백 RTD 안에서는 초고함량보다 일상 보충형에 가깝게 읽는 편이 자연스럽습니다.",
  },
  {
    title: "당류는 맛별로 다르게 보기",
    body: "커피맛은 당류 4g, 초콜릿맛은 5g입니다. 저당만 최우선이면 당류 0~1g 제품군과 따로 비교해야 합니다.",
  },
  {
    title: "식사 대용으로 볼 때의 한계",
    body: "단백질 보충에는 유용하지만 한 끼 전체를 대신하려면 탄수화물, 지방, 식이섬유, 미량영양소까지 별도로 확인해야 합니다.",
  },
];

const relatedLinks = [
  {
    href: "/guides/product-selection-comparison/protein-drink-beginners-guide",
    title: "단백질 음료 입문 가이드",
    body: "처음 단백질 음료를 고르는 기준부터 정리합니다.",
  },
  {
    href: "/guides/product-selection-comparison/low-sugar-protein-drink-guide",
    title: "저당 단백질 음료 가이드",
    body: "당류를 더 엄격하게 보고 싶을 때 이어서 확인하기 좋습니다.",
  },
  {
    href: "/guides/product-selection-comparison/protein-drink-by-content",
    title: "단백질 함량별 음료 비교",
    body: "20g대, 40g대 제품을 한 번에 구분해서 볼 수 있습니다.",
  },
];

export default function SeoulmilkProteinEnergyGuidePage() {
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
            <span>서울우유 프로틴 에너지</span>
          </div>
          <div className="mt-3">
            <span className="rounded-md bg-[#eef4ea] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#4c7a57]">
              신제품 읽기
            </span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[#16412D] md:text-3xl">
            서울우유 프로틴 에너지, 광고 보고 살 때 무엇을 봐야 할까?
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            광고로 먼저 접한 제품은 익숙한 브랜드 이미지 때문에 판단이 빨라지기 쉽습니다. 이 페이지에서는 서울우유
            프로틴 에너지를 단백질, 당류, 칼로리, 용량 기준으로 차분하게 읽습니다.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <div className="space-y-6">
          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">핵심 답변</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
              서울우유 프로틴 에너지는 240mL에 단백질 21g을 담은 일상형 RTD 단백질 음료로 볼 수 있습니다.
              초고단백 제품처럼 한 번에 많은 단백질을 채우는 타입이라기보다, 커피나 초코 음료를 마시던 사람이 단백질을
              함께 챙기고 싶을 때 비교 후보에 넣기 좋은 포지션입니다.
            </p>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-[#f7fbf8] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">등록 제품 기준 성분 비교</h2>
            <div className="mt-5 overflow-x-auto rounded-2xl border border-[#ece9e2] bg-white">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8e6e3] text-[var(--foreground)]">
                    <th className="px-3 py-3 font-semibold">제품</th>
                    <th className="px-3 py-3 font-semibold">용량</th>
                    <th className="px-3 py-3 font-semibold">단백질</th>
                    <th className="px-3 py-3 font-semibold">칼로리</th>
                    <th className="px-3 py-3 font-semibold">당류</th>
                  </tr>
                </thead>
                <tbody>
                  {productRows.map((row) => (
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
            <p className="mt-3 text-xs leading-5 text-[var(--foreground-muted)]">
              기준: ProteinLab 등록 데이터. 제품 리뉴얼 또는 판매처 표기에 따라 성분은 달라질 수 있어 구매 전 상품 상세와 영양정보를 다시 확인하세요.
            </p>
          </section>

          <section className="grid gap-3 md:grid-cols-3">
            {checkCards.map((card) => (
              <article key={card.title} className="rounded-2xl border border-[#dce8df] bg-white p-4">
                <h2 className="text-sm font-semibold text-[#24543d]">{card.title}</h2>
                <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{card.body}</p>
              </article>
            ))}
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">어떤 사람에게 먼저 맞춰 볼 수 있나</h2>
            <div className="mt-4 space-y-3 text-sm leading-6 text-[var(--foreground-muted)]">
              <p>
                커피나 초코 계열 음료를 자주 마시면서 단백질을 조금 더 챙기고 싶은 사람이라면 진입 장벽이 낮습니다.
                반대로 운동 직후 고함량 보충이 목적이라면 40g 이상 제품과 비교하는 편이 더 정확합니다.
              </p>
              <p>
                다이어트 목적이라면 당류와 칼로리를 함께 보세요. 당류 4~5g은 과한 수치는 아니지만, 0g 저당 음료를
                찾는 사용자에게는 별도 비교가 필요합니다.
              </p>
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-[#f7fbf8] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">이어 보면 좋은 비교</h2>
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
