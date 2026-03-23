import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata: Metadata = {
  title: "당류 0g인데 왜 달까 | 알룰로스·스테비아·에리스리톨 해설 | ProteinLab",
  description:
    "단백질 음료에 적힌 당류 0g 표기가 왜 가능한지, 알룰로스·스테비아·에리스리톨 같은 감미료를 어떻게 읽어야 하는지 ProteinLab 기준으로 정리합니다.",
  keywords: [
    "당류 0g 단백질 음료",
    "알룰로스",
    "스테비아",
    "에리스리톨",
    "수크랄로스",
    "저당 단백질 음료",
    "단백질 음료 감미료",
  ],
  alternates: {
    canonical: "https://proteinlab.kr/guides/product-selection-comparison/zero-sugar-allulose",
  },
  openGraph: {
    title: "당류 0g인데 왜 달까 | 알룰로스·스테비아·에리스리톨 해설 | ProteinLab",
    description:
      "당류 0g 단백질 음료가 왜 달게 느껴지는지, 알룰로스·스테비아·에리스리톨 같은 감미료를 어떻게 읽어야 하는지 정리합니다.",
    url: "https://proteinlab.kr/guides/product-selection-comparison/zero-sugar-allulose",
    type: "article",
    locale: "ko_KR",
    siteName: "ProteinLab",
    images: [
      {
        url: "/proteinlab-logo.png",
        alt: "당류 0g 단백질 음료 감미료 해설 - ProteinLab",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "당류 0g인데 왜 달까 | ProteinLab",
    description:
      "알룰로스, 스테비아, 에리스리톨을 중심으로 당류 0g 단백질 음료의 감미료 구조를 정리합니다.",
    images: ["/proteinlab-logo.png"],
  },
};

const summaryPoints = [
  "당류 0g은 아무 맛이 없다는 뜻이 아니라, 당류로 집계되지 않는 감미료를 썼다는 뜻에 가깝습니다.",
  "알룰로스, 에리스리톨, 스테비아, 수크랄로스는 단맛을 내지만 영양성분표의 당류 값에는 다르게 반영됩니다.",
  "다이어트나 저당 제품을 고를 때는 당류 0g만 볼 것이 아니라 총칼로리와 단백질 함량을 함께 봐야 합니다.",
  "같은 당류 0g 제품이어도 감미료 종류에 따라 맛, 잔향, 포만감 체감이 달라질 수 있습니다.",
];

const sweeteners = [
  {
    title: "알룰로스",
    label: "당류 미집계",
    body:
      "설탕과 비슷한 구조를 가졌지만 체내 이용 열량이 매우 낮아 저당 제품에 자주 쓰입니다. 단맛이 비교적 자연스러워 RTD 단백질 음료에서 많이 보입니다.",
  },
  {
    title: "에리스리톨",
    label: "당알코올",
    body:
      "열량이 거의 없고 당류로 계산되지 않는 경우가 많습니다. 입안에서 시원한 느낌이 남을 수 있어 바나 파우더형 제품에도 자주 들어갑니다.",
  },
  {
    title: "스테비아",
    label: "고강도 감미료",
    body:
      "아주 적은 양으로도 단맛을 낼 수 있는 식물 유래 감미료입니다. 단맛이 강한 대신 약간의 허브향이나 특유의 끝맛을 느끼는 경우가 있습니다.",
  },
  {
    title: "수크랄로스",
    label: "합성 감미료",
    body:
      "적은 양으로 강한 단맛을 내기 쉬워 가공식품에 널리 쓰입니다. 맛이 깔끔한 편이라 단백질 음료나 쉐이크의 베이스 감미료로 자주 보입니다.",
  },
];

const readingRows = [
  ["1. 당류", "0g 또는 매우 낮은지 먼저 확인", "저당 제품군을 빠르게 거르는 1차 필터입니다."],
  ["2. 원재료명", "알룰로스·에리스리톨·스테비아·수크랄로스 확인", "왜 달게 느껴지는지, 어떤 감미료를 썼는지 알 수 있습니다."],
  ["3. 칼로리", "당류가 낮아도 총칼로리는 따로 체크", "당류 0g이어도 지방이나 다른 탄수화물 때문에 칼로리가 높을 수 있습니다."],
  ["4. 단백질", "20g 전후인지 비교", "저당이더라도 단백질이 너무 낮으면 보충 목적이 약해집니다."],
];

const decisionCards = [
  {
    title: "체중 관리가 목적일 때",
    body:
      "당류와 총칼로리를 먼저 보고, 그다음 단백질 함량을 비교하는 순서가 효율적입니다. 단맛이 강해도 칼로리가 낮고 단백질이 충분하면 후보군으로 남길 수 있습니다.",
  },
  {
    title: "운동 후 보충이 목적일 때",
    body:
      "당류 0g 자체보다 단백질 총량과 흡수 편의성이 더 중요합니다. 감미료는 부가 요소로 보고, 단백질 20g 이상인지부터 확인하는 편이 맞습니다.",
  },
  {
    title: "맛 민감도가 높을 때",
    body:
      "같은 당류 0g이라도 감미료 조합에 따라 잔향이 크게 달라집니다. 스테비아나 에리스리톨 특유의 끝맛이 민감하다면 원재료명을 꼭 보는 편이 좋습니다.",
  },
];

const misconceptionCards = [
  {
    q: "당류 0g이면 무조건 다이어트용인가",
    a:
      "아닙니다. 당류가 낮아도 총칼로리나 지방이 높을 수 있습니다. 다이어트용인지 판단하려면 당류와 함께 칼로리, 단백질 밀도를 같이 봐야 합니다.",
  },
  {
    q: "알룰로스가 들어가면 설탕과 완전히 같은 맛인가",
    a:
      "설탕과 가장 비슷하다고 느끼는 경우가 많지만 제품마다 단독 사용이 아니라 다른 감미료와 혼합하기 때문에 실제 체감 맛은 다를 수 있습니다.",
  },
  {
    q: "감미료가 들어가면 단백질 품질이 떨어지나",
    a:
      "감미료는 주로 맛 설계에 영향을 주는 요소입니다. 단백질 품질은 원료 단백질의 종류, 함량, 총 구성으로 따로 판단해야 합니다.",
  },
];

export default function ZeroSugarAllulosePage() {
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "당류 0g인데 왜 달까",
    description:
      "단백질 음료에 적힌 당류 0g 표기가 왜 가능한지, 알룰로스·스테비아·에리스리톨 같은 감미료를 어떻게 읽어야 하는지 정리한 가이드입니다.",
    inLanguage: "ko-KR",
    mainEntityOfPage: "https://proteinlab.kr/guides/product-selection-comparison/zero-sugar-allulose",
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
            <span>당류 0g인데 왜 달까</span>
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
            당류 0g인데 왜 달까
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            단백질 음료의 영양성분표에 당류 0g이라고 적혀 있는데도 충분히 달게 느껴지는 이유는
            감미료 구조를 보면 설명됩니다. 알룰로스, 스테비아, 에리스리톨, 수크랄로스 같은 성분을
            어떻게 읽고 비교해야 하는지 제품 선택 기준에 맞춰 정리했습니다.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <div className="space-y-6">
          <section className="grid gap-3 md:grid-cols-3">
            <Link
              href="/?curation=zero-sugar"
              className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] px-4 py-4 text-sm leading-6 text-[var(--foreground-muted)] transition-colors hover:bg-[#eef7f1]"
            >
              <p className="font-semibold text-[#24543d]">당류 0g 음료 비교</p>
              <p className="mt-1">실제 후보 제품을 당류, 칼로리, 단백질 기준으로 비교합니다.</p>
            </Link>
            <Link
              href="/guides/product-selection-comparison/low-sugar-protein-drink-guide"
              className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] px-4 py-4 text-sm leading-6 text-[var(--foreground-muted)] transition-colors hover:bg-[#eef7f1]"
            >
              <p className="font-semibold text-[#24543d]">저당 음료 고르는 법</p>
              <p className="mt-1">당류 커트라인부터 실제 비교 순서까지 이어서 볼 수 있습니다.</p>
            </Link>
            <Link
              href="/guides/product-selection-comparison/diet-protein-drink-guide"
              className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] px-4 py-4 text-sm leading-6 text-[var(--foreground-muted)] transition-colors hover:bg-[#eef7f1]"
            >
              <p className="font-semibold text-[#24543d]">다이어트 음료 기준</p>
              <p className="mt-1">저당이 실제 체중 관리에 유리한지 칼로리까지 함께 봅니다.</p>
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
            <h2 className="text-xl font-bold text-[var(--foreground)]">자주 보이는 감미료 4가지</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {sweeteners.map((item) => (
                <article key={item.title} className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4">
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-semibold text-[#24543d]">{item.title}</h3>
                    <span className="rounded-full bg-[#eff7f1] px-2 py-0.5 text-[10px] font-semibold text-[#2d6a4f]">
                      {item.label}
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{item.body}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">영양성분표를 읽는 실제 순서</h2>
            <div className="mt-5 overflow-x-auto">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8e6e3] text-[var(--foreground)]">
                    <th className="px-3 py-3 font-semibold">순서</th>
                    <th className="px-3 py-3 font-semibold">무엇을 보나</th>
                    <th className="px-3 py-3 font-semibold">왜 중요한가</th>
                  </tr>
                </thead>
                <tbody>
                  {readingRows.map((row) => (
                    <tr key={row[0]} className="border-b border-[#f0eeeb] last:border-b-0">
                      <td className="whitespace-nowrap px-3 py-3 font-medium text-[var(--foreground)]">{row[0]}</td>
                      <td className="px-3 py-3 text-[var(--foreground-muted)]">{row[1]}</td>
                      <td className="px-3 py-3 text-[var(--foreground-muted)]">{row[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <blockquote className="mt-5 rounded-xl border border-[#dce8df] bg-[#f7fbf8] px-4 py-4 text-sm leading-6 text-[var(--foreground-muted)]">
              당류 0g은 시작점이지 결론이 아닙니다. 실제 선택에서는 감미료 종류, 총칼로리, 단백질
              함량을 함께 봐야 제품 성격이 제대로 보입니다.
            </blockquote>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-[#f7fbf8] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">목적별로 해석이 달라지는 이유</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {decisionCards.map((item) => (
                <article key={item.title} className="rounded-2xl border border-[#dce8df] bg-white p-4">
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
            <h2 className="text-xl font-bold text-[var(--foreground)]">당류 0g 제품을 실제로 비교하려면</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
              ProteinLab에서는 당류 0g 단백질 음료를 따로 모아 비교할 수 있고, 저당 제품군을 어떤
              기준으로 걸러야 하는지도 이어서 볼 수 있습니다.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href="/?curation=zero-sugar"
                className="inline-flex items-center justify-center rounded-xl border border-[#cddfd3] bg-[#24543d] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1e4735]"
              >
                당류 0g 음료 비교
              </Link>
              <Link
                href="/guides/product-selection-comparison/low-sugar-protein-drink-guide"
                className="inline-flex items-center justify-center rounded-xl border border-[#cddfd3] bg-white px-5 py-3 text-sm font-semibold text-[#24543d] transition-colors hover:bg-[#eef7f1]"
              >
                저당 음료 가이드
              </Link>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
