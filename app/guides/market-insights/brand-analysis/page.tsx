import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { buildGuideJsonLd } from "@/app/lib/guideJsonLd";

const _pageTitle = "단백질 브랜드 분석 | 셀렉스·하이뮨·더단백 포지셔닝 비교";
const _pageDesc = "셀렉스, 하이뮨, 더단백, 뉴케어, 마이밀 등 주요 브랜드가 어떤 타깃과 메시지로 시장을 나누는지 비교합니다.";
export const metadata = {
  title: _pageTitle,
  description: _pageDesc,
  alternates: { canonical: "https://proteinlab.kr/guides/market-insights/brand-analysis" },
  openGraph: {
    title: _pageTitle,
    description: _pageDesc,
    url: "https://proteinlab.kr/guides/market-insights/brand-analysis",
    type: "website" as const,
    locale: "ko_KR",
    siteName: "ProteinLab",
  },
  twitter: {
    card: "summary" as const,
    title: _pageTitle,
    description: _pageDesc,
  },
};

const brandRows = [
  ["더단백", "빙그레", "운동·다이어트 중점", "고단백과 저당 메시지가 강하고 대중성이 좋습니다."],
  ["올프로틴", "대상웰라이프", "회복·시니어 영양관리", "대상웰라이프의 건강 관리 맥락과 함께 포지셔닝됩니다."],
  ["마이밀", "롯데헬스원", "간편 식사 보완", "식사대용과 포만감 이미지를 중심으로 전개합니다."],
  ["하이뮨", "일동후디스", "중장년 건강 관리", "프리미엄 이미지와 건강 관리 메시지가 강합니다."],
  ["셀렉스", "매일유업", "일상 단백질 보충", "유통 확장성과 접근성이 강점입니다."],
  ["하이뮨 프로틴 밸런스", "일동후디스", "시니어·균형 영양", "복합 영양과 균형 식사를 강조합니다."],
  ["랩노쉬", "빙그레", "MZ·다이어트", "저칼로리와 가벼운 식사 맥락이 강합니다."],
];

const positionCards = [
  {
    title: "대중형 단백질 브랜드",
    brands: "더단백, 셀렉스",
    body: "접근성이 높아 반복 구매 진입 장벽이 낮고, 일상형 RTD 이미지를 빠르게 구축합니다.",
  },
  {
    title: "건강 관리 중점 브랜드",
    brands: "하이뮨, 하이뮨 프로틴 밸런스, 올프로틴",
    body: "회복, 균형 영양, 중장년 건강 관리 메시지로 프리미엄 포지셔닝을 강화합니다.",
  },
  {
    title: "식사 보완·포만감 중점 브랜드",
    brands: "마이밀",
    body: "포만감과 식사 보완 메시지를 전면에 두고 식사대용 수요를 공략합니다.",
  },
  {
    title: "가벼운 다이어트형 브랜드",
    brands: "랩노쉬, 더단백 일부 라인",
    body: "저칼로리와 가벼운 섭취 경험을 강조해 체중 관리 수요와 맞닿아 있습니다.",
  },
];

const readingPoints = [
  "브랜드 이미지와 실제 영양 수치는 다를 수 있으므로 제품별 수치를 별도로 확인해야 합니다.",
  "같은 브랜드라도 라인별로 용도와 포만감, 칼로리가 다르기 때문에 SKU 단위 비교가 필요합니다.",
  "대중형 브랜드는 접근성이 강점이지만 제품별 차이가 넓을 수 있습니다.",
  "건강관리형 브랜드는 회복·균형 메시지가 강해 중장년 소비자와 건강 관리 수요에 더 맞습니다.",
];

const relatedLinks = [
  {
    href: "/guides/product-selection-comparison/selex-vs-himune",
    title: "셀렉스 vs 하이뮨 비교",
    body: "브랜드 포지셔닝을 읽었다면, 실제 제품 수치가 어떻게 갈리는지는 이 비교 페이지에서 바로 확인할 수 있습니다.",
  },
  {
    href: "/guides/product-selection-comparison/selexs-lineup",
    title: "브랜드 라인업 모아보기",
    body: "같은 브랜드 안에서도 라인이 어떻게 나뉘는지 보고 싶다면 Track B 라인업 페이지로 바로 이어지는 편이 빠릅니다.",
  },
  {
    href: "/guides/product-selection-comparison/protein-category-guide",
    title: "카테고리 선택 가이드",
    body: "브랜드보다 먼저 음료, 바, 쉐이크, 요거트 중 어디가 맞는지 다시 정리하고 싶을 때 연결해서 보기 좋습니다.",
  },
];

export default function BrandAnalysisPage() {
  const jsonLd = buildGuideJsonLd({ title: (metadata as {title:string;description:string}).title, description: (metadata as {title:string;description:string}).description, url: 'https://proteinlab.kr/guides/market-insights/brand-analysis' });
  return (
    <div className="min-h-screen bg-white">
            {jsonLd.map((item, i) => (<script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }} />))}
      <Header />
      <section className="w-full border-t border-b bg-[var(--hero-bg)]" style={{ borderColor: "var(--hero-border)" }}>
        <div className="mx-auto max-w-[1200px] px-4 py-5 md:px-6 md:py-6">
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
            <Link href="/guides" className="hover:text-[var(--accent)]">Guides</Link>
            <span>/</span>
            <Link href="/guides/market-insights" className="hover:text-[var(--accent)]">시장 인사이트</Link>
            <span>/</span>
            <span>브랜드 분석</span>
          </div>
          <div className="mt-3">
            <span className="rounded-md bg-[#eef4ea] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#4c7a57]">TRACK E</span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
            브랜드는 어떤 차이로 선택 기준을 만들까?
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            같은 단백질 카테고리 안에서도 브랜드는 유통, 가격, 메시지, 제품 구성을 통해 서로 다른 이미지를 만듭니다.
            <br />
            브랜드 포지셔닝을 읽으면 제품 비교와 시장 해석이 더 쉬워지고, 그다음에 실제 비교 페이지로 넘어갈 기준도 더 또렷해집니다.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <div className="space-y-6">
          <section className="rounded-[28px] border border-[#e2ebe4] bg-[#f7fbf8] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">주요 브랜드 포지셔닝 비교</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
              브랜드별 운영사와 대표 메시지를 함께 보면 시장 안에서 어떤 역할을 갖는지 더 쉽게 보입니다.
            </p>
            <div className="mt-5 overflow-x-auto rounded-2xl border border-[#ece9e2] bg-white">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8e6e3] text-[var(--foreground)]">
                    <th className="px-3 py-3 font-semibold">브랜드</th>
                    <th className="px-3 py-3 font-semibold">운영사</th>
                    <th className="px-3 py-3 font-semibold">대표 포지션</th>
                    <th className="px-3 py-3 font-semibold">해석</th>
                  </tr>
                </thead>
                <tbody>
                  {brandRows.map((row) => (
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

          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">포지셔닝 유형으로 묶어 보기</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
              브랜드를 개별로 보기보다 포지셔닝 그룹으로 보면 시장 구조가 더 명확하게 보입니다.
            </p>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {positionCards.map((card) => (
                <article key={card.title} className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4">
                  <p className="text-sm font-semibold text-[#24543d]">{card.title}</p>
                  <p className="mt-1 text-xs text-[#2d6a4f]">{card.brands}</p>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{card.body}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-[#f7fbf8] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">브랜드를 볼 때 주의할 점</h2>
            <ul className="mt-4 space-y-3">
              {readingPoints.map((item) => (
                <li key={item} className="flex gap-3 rounded-xl border border-[#dce8df] bg-white px-4 py-3 text-sm leading-6 text-[var(--foreground-muted)]">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#2d6a4f]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <blockquote className="mt-5 rounded-xl border border-[#dce8df] bg-[#f7fbf8] px-4 py-4 text-sm leading-6 text-[var(--foreground-muted)]">
              브랜드 분석의 목적은 브랜드 선호를 고르는 것이 아니라, 제품 비교 전에 어떤 메시지와 타깃으로 구성돼 있는지 이해하는 데 있습니다.
            </blockquote>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">바로 이어서 보기 좋은 비교 가이드</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {relatedLinks.map((item) => (
                <Link key={item.href} href={item.href} className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4 transition-colors hover:bg-white">
                  <h3 className="text-sm font-semibold text-[#24543d]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{item.body}</p>
                </Link>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
