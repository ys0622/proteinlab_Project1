import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import GuideBuySection from "@/app/components/GuideBuySection";
import { buildGuideJsonLd } from "@/app/lib/guideJsonLd";

const _pageTitle = "2026 단백질 신제품 분석 가이드 | 뉴케어·테이크핏·랩노쉬 업데이트";
const _pageDesc = "최근 출시·등록된 단백질 음료와 쉐이크를 기준으로 신제품 포지셔닝, 성분표, 기존 제품 대비 차이, 구매 전 확인 기준을 정리했습니다.";
export const metadata = {
  title: _pageTitle,
  description: _pageDesc,
  alternates: { canonical: "https://proteinlab.kr/guides/market-insights/new-product-analysis" },
  openGraph: {
    title: _pageTitle,
    description: _pageDesc,
    url: "https://proteinlab.kr/guides/market-insights/new-product-analysis",
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

const readingFrameCards = [
  {
    title: "포지셔닝 먼저 파악하기",
    body: "신제품이 운동 보완형인지, 다이어트형인지, 식사대용형인지 먼저 정리해야 전체 해석이 쉬워집니다.",
  },
  {
    title: "성분표 직접 확인하기",
    body: "마케팅 문구보다 단백질 g, 당류, 칼로리 같은 핵심 수치를 직접 읽어야 실제 경쟁력이 보입니다.",
  },
  {
    title: "기존 제품과 비교하기",
    body: "무엇이 새롭고 무엇이 비슷한지, 기존 SKU 대비 차별 포인트가 있는지 확인해야 합니다.",
  },
  {
    title: "유통 채널 확인하기",
    body: "편의점 전용인지 온라인 전용인지에 따라 가격과 용량 전략이 달라질 수 있습니다.",
  },
];

const recentProductRows = [
  [
    "뉴케어 올프로틴 25g",
    "일상형 RTD",
    "245mL · 단백질 25g · 당류 0g",
    "초코·바나나·고소한맛처럼 반복 구매가 쉬운 맛 라인. 국제 미각상 이력은 맛 참고 요소로만 봐야 합니다.",
    "/guides/product-selection-comparison/newcare-allprotein",
  ],
  [
    "뉴케어 올프로틴 41g",
    "초고단백 RTD",
    "350mL · 단백질 41g · 락토프리",
    "한 병 단백질 총량을 크게 확보하려는 사용자에게 맞습니다. 25g 라인과 목적이 다르므로 별도 비교가 필요합니다.",
    "/guides/product-selection-comparison/newcare-41g-vs-25g",
  ],
  [
    "뉴케어 올프로틴 워터",
    "워터형 보충",
    "350mL · 단백질 10g · 저칼로리",
    "묵직한 밀크형 RTD가 부담스러운 사용자를 위한 가벼운 보충형입니다. 식사대용보다 수분감 있는 보완에 가깝습니다.",
    "/guides/product-selection-comparison/newcare-protein-water-guide",
  ],
  [
    "테이크핏 프로 워터형",
    "운동 후 가벼운 음료",
    "500mL · 과일맛 워터형",
    "레몬·납작복숭아·샤인머스캣처럼 음용감 중심으로 확장되는 라인입니다. 고단백보다는 저당·가벼움 키워드와 맞습니다.",
    "/guides/product-selection-comparison/takefit-lineup",
  ],
  [
    "하이뮨 액티브·제로 라인",
    "건강관리형 RTD",
    "250mL 전후 · 저당/제로 포지션",
    "중장년 건강관리형 브랜드가 맛과 시간대 맥락을 넓히는 흐름입니다. 운동 전용보다 일상 루틴형으로 보는 편이 정확합니다.",
    "/guides/product-selection-comparison/himune-lineup",
  ],
  [
    "랩노쉬 슬림쉐이크 신규 맛",
    "파우치 쉐이크",
    "식사대용 · 맛 로테이션",
    "얼그레이 밀크티, 초당옥수수, 딸기쿠키크럼블처럼 맛 선택지가 넓어지고 있습니다. RTD 음료와 다른 기준으로 봐야 합니다.",
    "/guides/product-selection-comparison/labnosh-lineup",
  ],
];

const professionalSignals = [
  {
    title: "신제품은 총량보다 포지션을 먼저 봅니다",
    body: "25g 제품과 41g 제품은 같은 브랜드라도 해결하는 문제가 다릅니다. 일상 보충형, 초고단백형, 워터형, 식사대용형을 먼저 나눠야 비교가 정확합니다.",
  },
  {
    title: "맛 수상 이력은 영양 근거가 아닙니다",
    body: "국제 미각상 같은 외부 평가는 맛 실패 가능성을 줄이는 참고 정보입니다. 단백질 효율, 당류, 칼로리, 소화 부담은 별도의 성분 기준으로 판단해야 합니다.",
  },
  {
    title: "워터형은 식사대용보다 음용감의 문제입니다",
    body: "단백질 워터는 대체로 가볍게 마시기 좋지만 단백질 총량과 포만감은 밀크형 RTD보다 낮을 수 있습니다. 운동 후 수분감과 저당을 중시하는 흐름에 가깝습니다.",
  },
  {
    title: "파우치 쉐이크는 RTD와 KPI가 다릅니다",
    body: "쉐이크는 단백질 g만 볼 게 아니라 식이섬유, 포만감, 맛 지속성, 한 끼 대체 가능성을 함께 봐야 합니다. 그래서 음료 랭킹과 섞으면 선택 기준이 흐려집니다.",
  },
];

const checklistRows = [
  ["단백질 함량", "1회 제공량 기준 확인", "20g 이상인지, 밀도가 높은지"],
  ["당류", "g 수치 직접 확인", "저당 포지션이면 더 엄격하게 보기"],
  ["칼로리", "kcal 수치", "보완형인지 식사보완형인지 구분"],
  ["단백질 밀도", "칼로리 대비 단백질 효율", "비슷한 칼로리라면 밀도가 높은 쪽이 유리"],
  ["원료 유형", "유청, 카제인, 식물성 등", "흡수감과 포만감 특성이 다릅니다."],
  ["브랜드 메시지", "광고 문구 해석", "실제 성분과 타깃이 일치하는지 확인"],
];

const commonMistakes = [
  "신제품이라서 무조건 더 좋을 것이라고 보는 것",
  "브랜드 이미지에만 기대고 SKU별 차이를 놓치는 것",
  "편의점 가격과 온라인 가격 차이를 비교하지 않는 것",
  "마케팅 키워드를 실제 성분 수치와 분리해서 보지 않는 것",
];

const sourceLinks = [
  {
    label: "뉴케어 올프로틴 국제 미각상 관련 보도",
    href: "https://www.newsis.com/view/NISX20260112_0003472987",
  },
  {
    label: "테이크핏 프로 샤인머스캣 출시 보도",
    href: "https://www.kgnews.co.kr/news/article.html?no=873443",
  },
  {
    label: "뉴케어 올프로틴 41g 제품 등록 정보",
    href: "https://prod.danawa.com/info/?pcode=103753505",
  },
];

const relatedLinks = [
  {
    href: "/guides/market-insights/protein-drink-trend-2026",
    title: "2026 단백질 음료 트렌드",
    body: "개별 신제품보다 시장 전체 흐름이 먼저 궁금하다면 연간 트렌드 페이지로 이어서 보는 편이 좋습니다.",
  },
  {
    href: "/guides/product-selection-comparison/high-protein-40g-comparison",
    title: "40g 고단백 비교",
    body: "신제품이 정말 차별적인지 보려면 기존 강자들과 수치 비교를 바로 해보는 것이 가장 빠릅니다.",
  },
  {
    href: "/guides/product-selection-comparison/protein-density-ranking",
    title: "단백질 밀도 순위",
    body: "마케팅보다 실제 효율이 궁금하다면 100mL당 단백질 순위 페이지와 같이 보는 흐름이 맞습니다.",
  },
];

export default function NewProductAnalysisPage() {
  const jsonLd = buildGuideJsonLd({ title: (metadata as {title:string;description:string}).title, description: (metadata as {title:string;description:string}).description, url: 'https://proteinlab.kr/guides/market-insights/new-product-analysis' });
  return (
    <div className="min-h-screen bg-white">
            {jsonLd.map((item, i) => (<script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }} />))}
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
            <span>신제품 분석</span>
          </div>
          <div className="mt-3">
            <span className="rounded-md bg-[#eef4ea] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#4c7a57]">TRACK E</span>
            <span className="ml-2 text-[11px] font-medium text-[var(--foreground-muted)]">업데이트 2026-08-17</span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[#16412D] md:text-3xl">
            2026년 단백질 신제품, 어떤 기준으로 읽어야 할까?
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            뉴케어 올프로틴, 테이크핏 프로 워터형, 하이뮨 액티브, 랩노쉬 슬림쉐이크처럼 최근 제품은 목적이 뚜렷하게 갈립니다.
            <br />
            신제품이라는 이유만으로 좋은 것이 아니라, 어떤 문제를 해결하는 제품인지 성분과 사용 맥락으로 읽어야 합니다.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <div className="space-y-6">
          <section className="rounded-[28px] border border-[#e2ebe4] bg-[#f7fbf8] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">최근 제품 흐름 한눈에 보기</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
              최근 출시·등록 제품은 크게 일상형 RTD, 초고단백 RTD, 워터형, 건강관리형, 파우치 쉐이크로 나뉩니다. 같은 단백질 제품이라도 비교 기준이 서로 다릅니다.
            </p>
            <div className="mt-5 overflow-x-auto rounded-2xl border border-[#ece9e2] bg-white">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8e6e3] text-[var(--foreground)]">
                    <th className="px-3 py-3 font-semibold">제품·라인</th>
                    <th className="px-3 py-3 font-semibold">포지션</th>
                    <th className="px-3 py-3 font-semibold">핵심 수치</th>
                    <th className="px-3 py-3 font-semibold">전문 해석</th>
                    <th className="px-3 py-3 font-semibold">연결</th>
                  </tr>
                </thead>
                <tbody>
                  {recentProductRows.map((row) => (
                    <tr key={row[0]} className="border-b border-[#f0eeeb] last:border-b-0">
                      <td className="px-3 py-3 font-semibold text-[var(--foreground)]">{row[0]}</td>
                      <td className="px-3 py-3 text-[var(--foreground-muted)]">{row[1]}</td>
                      <td className="px-3 py-3 text-[var(--foreground-muted)]">{row[2]}</td>
                      <td className="px-3 py-3 text-[var(--foreground-muted)]">{row[3]}</td>
                      <td className="px-3 py-3">
                        <Link href={row[4]} className="text-sm font-semibold text-[var(--accent)] hover:underline">
                          자세히 보기
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">신제품을 읽는 4가지 프레임</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
              새 제품일수록 메시지가 강합니다. 아래 4가지 관점으로 보면 해석이 빨라집니다.
            </p>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {readingFrameCards.map((card) => (
                <article key={card.title} className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4">
                  <p className="text-sm font-semibold text-[#24543d]">{card.title}</p>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{card.body}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">전문적으로 보면 갈리는 지점</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {professionalSignals.map((item) => (
                <article key={item.title} className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4">
                  <h3 className="text-sm font-semibold text-[#24543d]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{item.body}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-[#f7fbf8] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">신제품 체크리스트</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
              새 제품은 아래 항목을 순서대로 보면 판단이 빨라집니다.
            </p>
            <div className="mt-5 overflow-x-auto rounded-2xl border border-[#ece9e2] bg-white">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8e6e3] text-[var(--foreground)]">
                    <th className="px-3 py-3 font-semibold">항목</th>
                    <th className="px-3 py-3 font-semibold">확인 방법</th>
                    <th className="px-3 py-3 font-semibold">판단 기준</th>
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

          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">신제품을 볼 때 자주 하는 실수</h2>
            <ul className="mt-4 space-y-3">
              {commonMistakes.map((item) => (
                <li key={item} className="flex gap-3 rounded-xl border border-[#dce8df] bg-[#f6fbf7] px-4 py-3 text-sm leading-6 text-[var(--foreground-muted)]">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#2d6a4f]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <blockquote className="mt-5 rounded-xl border border-[#dce8df] bg-[#f7fbf8] px-4 py-4 text-sm leading-6 text-[var(--foreground-muted)]">
              신제품 분석은 새로움 자체를 평가하는 일이 아니라, 기존 제품 대비 실제 차별 포인트가 있는지 확인하는 과정입니다.
            </blockquote>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">자료 출처</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
              제품 수치와 라인업은 ProteinLab DB를 우선 기준으로 사용하고, 출시·수상 이력은 공개 보도와 제품 등록 정보를 참고했습니다.
            </p>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              {sourceLinks.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4 text-sm font-semibold text-[#24543d] transition-colors hover:bg-white"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-[#f7fbf8] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">실제 비교로 이어지는 페이지</h2>
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
