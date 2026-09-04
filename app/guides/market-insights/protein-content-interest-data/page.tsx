import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import GuideBuySection from "@/app/components/GuideBuySection";
import { buildGuideJsonLd } from "@/app/lib/guideJsonLd";

const pageTitle = "단백질 함량별 관심도, 실제 데이터로 보면 다릅니다";
const pageDescription =
  "proteinlab.kr 방문 데이터를 기준으로 단백질 함량대별 조회 패턴을 분석했습니다. 40g 이상 제품의 관심도는 높지만 구매까지 이어지는 비율은 다른 이야기입니다.";
const canonical = "https://proteinlab.kr/guides/market-insights/protein-content-interest-data";

export const metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: canonical,
    type: "article" as const,
    locale: "ko_KR",
    siteName: "ProteinLab",
  },
  twitter: {
    card: "summary" as const,
    title: pageTitle,
    description: pageDescription,
  },
};

const quickAnswer = [
  "제품당 평균 조회수는 50g 이상 구간이 가장 높습니다 — 초고단백 제품에 대한 호기심 자체는 큽니다.",
  "다만 전체 조회량 점유율은 20~29g대가 절반 이상을 차지합니다 — 실제로 가장 많이 검색·비교되는 구간은 중단백입니다.",
  "관심(조회)과 구매 결정은 다른 문제입니다. 초고단백 제품을 눌러보고도 부담 때문에 다른 제품으로 넘어가는 경우가 많다는 뜻으로 해석할 수 있습니다.",
];

const distributionRows = [
  ["20g 미만", "22개", "11.0%", "9.5회"],
  ["20~29g", "80개", "54.4%", "12.9회"],
  ["30~39g", "5개", "7.1%", "26.8회"],
  ["40~49g", "10개", "19.4%", "36.8회"],
  ["50g 이상", "3개", "8.2%", "52.0회"],
];

const interpretationCards = [
  {
    title: "관심은 초고단백이 더 크다",
    body: "50g 이상 제품은 등록된 제품 수가 적은데도 제품당 평균 조회수가 가장 높습니다. \"이 제품 뭐지?\"하는 호기심 클릭이 많다는 뜻입니다.",
  },
  {
    title: "실제 비교·검토는 중단백에서 일어난다",
    body: "20~29g대는 제품 수가 압도적으로 많고 전체 조회량의 절반 이상을 차지합니다. 이 구간에서 실제 제품 간 비교가 가장 활발합니다.",
  },
  {
    title: "클릭과 구매는 다르다",
    body: "조회수는 관심의 크기이지 구매 의사의 크기가 아닙니다. 초고단백 제품을 눌러본 뒤 부담을 느껴 중단백 제품으로 이동하는 흐름이 있을 수 있습니다.",
  },
];

const relatedLinks = [
  {
    href: "/guides/intake-strategy-health/high-protein-side-effects",
    title: "고단백 음료 부담·부작용 가이드",
    body: "초고단백 제품에 대한 호기심은 크지만 왜 실제 선택으로 이어지지 않는지 설명합니다.",
  },
  {
    href: "/topics/mid-protein-alternatives",
    title: "중단백 대안 추천",
    body: "실제로 가장 많이 비교되는 20~29g대 제품을 모았습니다.",
  },
  {
    href: "/guides/market-insights/protein-drink-trend-2026",
    title: "2026 단백질 음료 시장 트렌드",
    body: "초고단백 경쟁이 시장 전체에서 어떻게 전개되고 있는지 확인합니다.",
  },
];

const faqItems = [
  {
    question: "가장 조회수가 높은 단백질 함량대는 어디인가요?",
    answer: "제품당 평균 조회수 기준으로는 50g 이상 초고단백 구간이 가장 높습니다. 다만 등록 제품 수 자체가 적어서 전체 조회량 점유율은 낮습니다.",
  },
  {
    question: "실제로 가장 많이 비교되는 구간은 어디인가요?",
    answer: "20~29g대입니다. 등록 제품 수가 가장 많고 전체 조회량의 절반 이상을 차지해서, 실제 제품 간 비교가 가장 활발하게 일어나는 구간입니다.",
  },
  {
    question: "조회수가 높으면 실제로도 많이 팔리나요?",
    answer: "꼭 그렇지는 않습니다. 조회수는 관심의 크기이지 구매 의사의 크기가 아닙니다. 초고단백 제품을 궁금해서 눌러본 뒤 부담을 느껴 중단백 제품으로 이동하는 경우가 있을 수 있습니다.",
  },
];

export default function ProteinContentInterestDataPage() {
  const jsonLd = buildGuideJsonLd({
    title: pageTitle,
    description: pageDescription,
    url: canonical,
    faq: faqItems,
  });

  return (
    <div className="min-h-screen bg-white">
      {jsonLd.map((item, index) => (
        <script key={index} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }} />
      ))}
      <Header />
      <section className="w-full border-t border-b bg-[var(--hero-bg)]" style={{ borderColor: "var(--hero-border)" }}>
        <div className="mx-auto max-w-[1200px] px-4 py-5 md:px-6 md:py-6">
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
            <Link href="/guides" className="hover:text-[var(--accent)]">가이드</Link>
            <span>/</span>
            <Link href="/guides/market-insights" className="hover:text-[var(--accent)]">시장 인사이트</Link>
            <span>/</span>
            <span>단백질 함량별 관심도 데이터</span>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <span className="rounded-md bg-[#f1ebf7] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#6b4d7c]">TRACK E</span>
            <span className="rounded-md bg-[#f7f3fb] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#6b4d7c]">자체 데이터 분석</span>
            <span className="text-[11px] font-medium text-[var(--foreground-muted)]">업데이트 2026-07-02</span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[#16412D] md:text-3xl">
            단백질 함량별 관심도,
            <br />
            실제 데이터로 보면 다릅니다.
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            proteinlab.kr에 등록된 단백질 음료 120개의 실제 방문 데이터를 함량 구간별로 나눠봤습니다.
            "고단백이 잘 팔린다"는 인상과 실제 데이터가 보여주는 패턴은 조금 다릅니다.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <div className="space-y-6">
          <section className="rounded-[28px] border border-[#e3dceb] bg-[#f9f7fb] px-5 py-5 shadow-[0_18px_50px_rgba(38,18,38,0.05)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">짧게 답하면</h2>
            <ul className="mt-4 space-y-3">
              {quickAnswer.map((item) => (
                <li key={item} className="flex gap-3 rounded-xl border border-[#e5dfec] bg-white px-4 py-3 text-sm leading-6 text-[var(--foreground-muted)]">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#6b4d7c]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-[28px] border border-[#e3dceb] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(38,18,38,0.05)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">단백질 함량대별 조회 패턴</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
              proteinlab.kr에 등록된 RTD 단백질 음료 120개를 함량 구간별로 나누고, 최근 방문 데이터에서
              구간별 조회수를 집계했습니다.
            </p>
            <div className="mt-5 overflow-x-auto rounded-2xl border border-[#e5dfec] bg-[#f9f7fb]">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e5dfec] text-[var(--foreground)]">
                    <th className="px-3 py-3 font-semibold">단백질 함량</th>
                    <th className="px-3 py-3 font-semibold">등록 제품 수</th>
                    <th className="px-3 py-3 font-semibold">전체 조회량 점유율</th>
                    <th className="px-3 py-3 font-semibold">제품당 평균 조회수</th>
                  </tr>
                </thead>
                <tbody>
                  {distributionRows.map((row) => (
                    <tr key={row[0]} className="border-b border-[#efe9f4] last:border-b-0">
                      {row.map((cell) => (
                        <td key={cell} className="px-3 py-3 text-[var(--foreground-muted)]">{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-3 text-xs text-[var(--foreground-muted)]">
              * proteinlab.kr 자체 방문 로그 기준 집계이며, 실제 구매 전환 데이터가 아닌 페이지 조회 데이터입니다.
            </p>
          </section>

          <section className="rounded-[28px] border border-[#e3dceb] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(38,18,38,0.05)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">이 데이터를 어떻게 해석해야 할까</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {interpretationCards.map((item) => (
                <article key={item.title} className="rounded-2xl border border-[#e5dfec] bg-[#f9f7fb] p-4">
                  <h3 className="text-sm font-semibold text-[#6b4d7c]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{item.body}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e3dceb] bg-[#f9f7fb] px-5 py-5 shadow-[0_18px_50px_rgba(38,18,38,0.05)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">결론</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
              초고단백 제품은 "궁금해서 눌러보는" 관심은 확실히 큽니다. 하지만 실제로 반복해서 비교되고
              검토되는 구간은 여전히 20~29g대 중단백입니다. 이는 소화 부담, 맛, 용량에 대한 우려가 실제
              선택 단계에서 작용하고 있다는 신호로 해석할 수 있습니다. 신제품을 기획하거나 제품을 고를 때
              "관심도"와 "실사용 적합도"를 구분해서 보는 것이 중요합니다.
            </p>
          </section>

          <section className="rounded-[28px] border border-[#e3dceb] bg-[#f9f7fb] px-5 py-5 shadow-[0_18px_50px_rgba(38,18,38,0.05)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">💬 자주 묻는 질문</h2>
            <div className="mt-5 space-y-3">
              {faqItems.map((item) => (
                <div key={item.question} className="rounded-xl border border-[#e5dfec] bg-white px-4 py-4">
                  <p className="text-sm font-semibold text-[var(--foreground)]">Q. {item.question}</p>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">A. {item.answer}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e3dceb] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(38,18,38,0.05)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">이어 읽기</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {relatedLinks.map((item) => (
                <Link key={item.href} href={item.href} className="rounded-2xl border border-[#e5dfec] bg-[#f9f7fb] p-4 transition-colors hover:bg-white">
                  <h3 className="text-sm font-semibold text-[#6b4d7c]">{item.title}</h3>
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
