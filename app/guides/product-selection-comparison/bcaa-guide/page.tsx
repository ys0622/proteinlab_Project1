import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata: Metadata = {
  title: "BCAA란 무엇인가 | 단백질 음료에서 BCAA를 읽는 법 | ProteinLab",
  description:
    "류신·이소류신·발린으로 구성된 BCAA가 무엇인지, 단백질 음료와 쉐이크에서 BCAA 표기를 어떻게 해석해야 하는지 ProteinLab 기준으로 정리합니다.",
  keywords: [
    "BCAA",
    "류신",
    "이소류신",
    "발린",
    "단백질 음료 BCAA",
    "웨이 단백질 BCAA",
    "고단백 음료",
  ],
  alternates: {
    canonical: "https://proteinlab.kr/guides/product-selection-comparison/bcaa-guide",
  },
  openGraph: {
    title: "BCAA란 무엇인가 | 단백질 음료에서 BCAA를 읽는 법 | ProteinLab",
    description:
      "BCAA의 구성과 역할, 그리고 단백질 음료에서 BCAA 표기를 실제 제품 비교에 어떻게 적용해야 하는지 정리합니다.",
    url: "https://proteinlab.kr/guides/product-selection-comparison/bcaa-guide",
    type: "article",
    locale: "ko_KR",
    siteName: "ProteinLab",
    images: [
      {
        url: "/proteinlab-logo.png",
        alt: "BCAA 해설과 단백질 음료 비교 기준 - ProteinLab",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "BCAA란 무엇인가 | ProteinLab",
    description:
      "BCAA를 구성하는 아미노산과 단백질 음료에서의 실제 해석 기준을 정리합니다.",
    images: ["/proteinlab-logo.png"],
  },
};

const summaryPoints = [
  "BCAA는 류신, 이소류신, 발린 3가지 필수 아미노산 묶음입니다.",
  "근육 합성 신호와 운동 후 회복 맥락에서 자주 언급되지만, 일반적인 단백질 음료에서는 이미 자연스럽게 포함되는 경우가 많습니다.",
  "BCAA 단독 표기만 보고 제품을 고르기보다 총 단백질 함량과 단백질 원료를 먼저 보는 편이 더 실용적입니다.",
  "웨이 단백질 기반 제품은 대체로 BCAA 구성이 충분한 편이고, 콜라겐 위주 제품은 이 관점에서 다르게 봐야 합니다.",
];

const aminoCards = [
  {
    title: "류신",
    label: "근육 합성 신호",
    body:
      "BCAA 중에서도 근육 단백질 합성 신호와 가장 강하게 연결되는 아미노산입니다. 운동 후 보충 맥락에서 특히 자주 언급됩니다.",
  },
  {
    title: "이소류신",
    label: "에너지 이용 보조",
    body:
      "운동 중 에너지 대사와 회복 보조 역할로 함께 설명되는 경우가 많습니다. 류신만큼 단독으로 강조되지는 않지만 BCAA 구성의 한 축입니다.",
  },
  {
    title: "발린",
    label: "지구력·회복 맥락",
    body:
      "운동 중 피로 체감이나 회복 서사에서 함께 등장하는 아미노산입니다. 실제 제품 비교에서는 단독 수치보다 전체 단백질 구성 안에서 해석하는 편이 낫습니다.",
  },
];

const productRows = [
  ["웨이 단백질 음료", "대체로 충분", "WPC, WPI 같은 유청 단백질은 원료 자체에 BCAA가 자연스럽게 포함됩니다."],
  ["고단백 쉐이크", "대체로 충분", "웨이나 우유 단백질 기반이면 별도 BCAA 강조가 없어도 이미 들어 있는 경우가 많습니다."],
  ["콜라겐 위주 제품", "상대적으로 약함", "단백질 총량이 높아 보여도 근육 합성 관점에서는 해석을 달리해야 합니다."],
  ["BCAA 강화 제품", "마케팅 강조 가능", "총 단백질이 충분한지, 실제 용도가 다른지 먼저 보는 편이 안전합니다."],
];

const decisionCards = [
  {
    title: "운동 후 회복용으로 고를 때",
    body:
      "BCAA 표기 자체보다 총 단백질이 20g 전후인지, 웨이 기반인지가 더 우선입니다. 일반적인 보충 목적이라면 이 기준이 실제 차이를 더 잘 설명합니다.",
  },
  {
    title: "공복 운동 전후를 신경 쓸 때",
    body:
      "BCAA 단독 제품이 자주 언급되지만, 식사나 단백질 섭취가 전체적으로 충분한 사람이라면 일반 단백질 음료만으로도 목적을 상당 부분 충족할 수 있습니다.",
  },
  {
    title: "광고 문구가 과장되어 보일 때",
    body:
      "BCAA 함유라는 말만으로 제품 우열이 갈리지는 않습니다. 총 단백질, 당류, 칼로리, 원료 구성을 함께 봐야 실제 비교가 됩니다.",
  },
];

const comparisonSteps = [
  {
    title: "1. 원료 단백질 확인",
    body: "WPI, WPC, MPC 같은 웨이·우유 단백질인지 먼저 봅니다.",
  },
  {
    title: "2. 총 단백질 확인",
    body: "BCAA 강조보다 1회 섭취 단백질 총량이 충분한지가 우선입니다.",
  },
  {
    title: "3. 제품 목적 확인",
    body: "운동 후 보충용인지, 다이어트 간식인지, 식사 대체인지에 따라 해석이 달라집니다.",
  },
  {
    title: "4. 부가 수치 비교",
    body: "그다음 당류, 칼로리, 단백질 밀도까지 봐야 실제 선택이 가능합니다.",
  },
];

const misconceptionCards = [
  {
    q: "BCAA가 따로 적혀 있으면 무조건 더 좋은 제품인가",
    a:
      "그렇지 않습니다. 웨이 기반 고단백 제품이라면 원료 특성상 이미 BCAA가 충분한 경우가 많습니다. 별도 표기는 마케팅 포인트일 수 있습니다.",
  },
  {
    q: "근육을 늘리려면 BCAA만 따로 챙겨야 하나",
    a:
      "대부분의 경우 총 단백질 섭취가 충분한지가 더 중요합니다. 식사와 단백질 음료가 안정적으로 들어오면 BCAA만 따로 볼 필요는 크지 않습니다.",
  },
  {
    q: "콜라겐 제품도 단백질이니까 BCAA 관점에서 비슷한가",
    a:
      "아닙니다. 단백질 총량만 같아 보여도 아미노산 구성이 다르기 때문에 근육 합성 관점에서는 웨이 단백질 제품과 같은 선상에 두기 어렵습니다.",
  },
];

export default function BcaaGuidePage() {
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "BCAA란 무엇인가",
    description:
      "류신·이소류신·발린으로 구성된 BCAA가 무엇인지, 단백질 음료와 쉐이크에서 BCAA 표기를 어떻게 해석해야 하는지 정리한 가이드입니다.",
    inLanguage: "ko-KR",
    mainEntityOfPage: "https://proteinlab.kr/guides/product-selection-comparison/bcaa-guide",
    author: {
      "@type": "Organization",
      name: "ProteinLab",
    },
    publisher: {
      "@type": "Organization",
      name: "ProteinLab",
      logo: {
        "@type": "ImageObject",
        url: "https://proteinlab.kr/proteinlab-logo.png",
      },
    },
    dateModified: "2026-03-23",
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: misconceptionCards.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

  return (
    <div className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Header />

      <section
        className="w-full border-t border-b bg-[var(--hero-bg)]"
        style={{ borderColor: "var(--hero-border)" }}
      >
        <div className="mx-auto max-w-[1200px] px-4 py-5 md:px-6 md:py-6">
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
            <Link href="/guides">가이드</Link>
            <span>/</span>
            <Link href="/guides/product-selection-comparison">제품 선택 · 비교</Link>
            <span>/</span>
            <span>BCAA란 무엇인가</span>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2.5">
            <span className="rounded-md bg-[#eaf0f6] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#4a6178]">
              TRACK B
            </span>
            <span className="rounded-md bg-[#fdf3e7] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#a05c1a]">
              성분 해설
            </span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
            BCAA란 무엇인가
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            BCAA는 운동 보충제 문맥에서 자주 등장하지만, 단백질 음료를 고를 때는 생각보다 다른 기준이 더
            중요합니다. 류신, 이소류신, 발린의 역할을 짚고, 제품 비교에서는 무엇을 먼저 봐야 하는지
            실용적으로 정리했습니다.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <div className="space-y-6">
          <section className="grid gap-3 md:grid-cols-3">
            <Link
              href="/?curation=high-protein"
              className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] px-4 py-4 text-sm leading-6 text-[var(--foreground-muted)] transition-colors hover:bg-[#eef7f1]"
            >
              <p className="font-semibold text-[#24543d]">고단백 음료 비교</p>
              <p className="mt-1">총 단백질과 영양성분 기준으로 실제 제품군을 볼 수 있습니다.</p>
            </Link>
            <Link
              href="/shake?curation=shake-high-protein"
              className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] px-4 py-4 text-sm leading-6 text-[var(--foreground-muted)] transition-colors hover:bg-[#eef7f1]"
            >
              <p className="font-semibold text-[#24543d]">고단백 쉐이크 비교</p>
              <p className="mt-1">쉐이크 쪽에서도 원료와 단백질 총량 기준을 같이 볼 수 있습니다.</p>
            </Link>
            <Link
              href="/guides/intake-strategy-health/post-workout-protein"
              className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] px-4 py-4 text-sm leading-6 text-[var(--foreground-muted)] transition-colors hover:bg-[#eef7f1]"
            >
              <p className="font-semibold text-[#24543d]">운동 후 단백질 전략</p>
              <p className="mt-1">운동 직후 무엇을 우선해서 먹어야 하는지 맥락을 이어서 볼 수 있습니다.</p>
            </Link>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-[#f7fbf8] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">핵심 요약</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-[var(--foreground-muted)]">
              {summaryPoints.map((item) => (
                <li key={item} className="rounded-xl border border-[#dce8df] bg-white px-4 py-3">
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">BCAA를 이루는 3가지 아미노산</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {aminoCards.map((item) => (
                <article key={item.title} className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4">
                  <h3 className="text-sm font-semibold text-[#24543d]">{item.title}</h3>
                  <span className="mt-1 inline-block rounded-full bg-[#eff7f1] px-2 py-0.5 text-[10px] font-semibold text-[#2d6a4f]">
                    {item.label}
                  </span>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{item.body}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">제품 비교에서는 어떻게 읽어야 하나</h2>
            <div className="mt-5 overflow-x-auto">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8e6e3] text-[var(--foreground)]">
                    <th className="px-3 py-3 font-semibold">제품 유형</th>
                    <th className="px-3 py-3 font-semibold">BCAA 해석</th>
                    <th className="px-3 py-3 font-semibold">실제 판단 포인트</th>
                  </tr>
                </thead>
                <tbody>
                  {productRows.map((row) => (
                    <tr key={row[0]} className="border-b border-[#f0eeeb] last:border-b-0">
                      <td className="whitespace-nowrap px-3 py-3 font-medium text-[var(--foreground)]">{row[0]}</td>
                      <td className="px-3 py-3 text-[var(--foreground-muted)]">{row[1]}</td>
                      <td className="px-3 py-3 text-[var(--foreground-muted)]">{row[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-[#f7fbf8] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">실제 선택 순서</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-4">
              {comparisonSteps.map((item) => (
                <article key={item.title} className="rounded-2xl border border-[#dce8df] bg-white p-4">
                  <p className="text-xs font-semibold tracking-[0.08em] text-[#2d6a4f]">{item.title}</p>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{item.body}</p>
                </article>
              ))}
            </div>
            <blockquote className="mt-5 rounded-xl border border-[#dce8df] bg-white px-4 py-4 text-sm leading-6 text-[var(--foreground-muted)]">
              BCAA는 제품을 이해하는 데 도움이 되는 보조 정보입니다. 실제 구매 판단은 원료 단백질,
              총 단백질, 당류, 칼로리 순으로 보는 편이 훨씬 안정적입니다.
            </blockquote>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">상황별 해석</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {decisionCards.map((item) => (
                <article key={item.title} className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4">
                  <h3 className="text-sm font-semibold text-[#24543d]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{item.body}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">자주 생기는 오해</h2>
            <div className="mt-5 space-y-3">
              {misconceptionCards.map((item) => (
                <article key={item.q} className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4">
                  <h3 className="text-sm font-semibold text-[#24543d]">Q. {item.q}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">A. {item.a}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-[28px] border border-[#dce8df] bg-[#f4faf6] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">BCAA보다 먼저 볼 비교 기준</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
              ProteinLab에서는 고단백 음료와 쉐이크를 총 단백질, 당류, 칼로리 기준으로 먼저 비교할 수
              있습니다. BCAA 표기는 그 다음 해석 포인트로 붙이면 됩니다.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href="/?curation=high-protein"
                className="inline-flex items-center justify-center rounded-xl border border-[#cddfd3] bg-[#24543d] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1e4735]"
              >
                고단백 음료 비교
              </Link>
              <Link
                href="/shake?curation=shake-high-protein"
                className="inline-flex items-center justify-center rounded-xl border border-[#cddfd3] bg-white px-5 py-3 text-sm font-semibold text-[#24543d] transition-colors hover:bg-[#eef7f1]"
              >
                고단백 쉐이크 비교
              </Link>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
