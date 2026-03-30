import type { Metadata } from "next";
import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

type SummaryItem = {
  title: string;
  body: string;
};

type ProductExample = {
  name: string;
  protein: string;
  sugar?: string;
  calories?: string;
  fiber?: string;
  feature: string;
  recommendedFor: string;
};

type InternalLinkItem = {
  label: string;
  href: string;
};

type FaqItem = {
  question: string;
  answer: string;
};

const trackBHubLink: InternalLinkItem = {
  label: "다른 비교 가이드 보기",
  href: "/guides/product-selection-comparison",
};

type ComparisonRow = {
  label: string;
  shake: string;
  drink: string;
};

type ShakeGuideConfig = {
  title: string;
  description: string;
  breadcrumbLabel: string;
  keyword: string;
  hook: string;
  hookBody: string[];
  tlDrItems: string[];
  comparisonTitle?: string;
  comparisonRows?: ComparisonRow[];
  comparisonCards?: SummaryItem[];
  criteriaTitle?: string;
  criteriaItems: SummaryItem[];
  products: ProductExample[];
  closing: string;
  internalLinks: InternalLinkItem[];
  ctaBody: string;
  faqItems?: FaqItem[];
};

export function buildShakeGuideMetadata(title: string, description: string): Metadata {
  return {
    title: `${title} | ProteinLab`,
    description,
  };
}

export function ShakeGuidePage({
  title,
  description,
  breadcrumbLabel,
  keyword,
  hook,
  hookBody,
  tlDrItems,
  comparisonTitle,
  comparisonRows,
  comparisonCards,
  criteriaTitle = "기준 정리",
  criteriaItems,
  products,
  closing,
  internalLinks,
  ctaBody,
  faqItems,
}: ShakeGuideConfig) {
  const internalGuideLinks = [...internalLinks, trackBHubLink].filter(
    (item, index, array) => array.findIndex((candidate) => candidate.href === item.href) === index,
  );
  const faqJsonLd = faqItems && faqItems.length > 0
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": faqItems.map((item) => ({
          "@type": "Question",
          "name": item.question,
          "acceptedAnswer": {
            "@type": "Answer",
            "text": item.answer,
          },
        })),
      }
    : null;

  return (
    <div className="min-h-screen bg-white">
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      )}
      <Header />

      <section
        className="w-full border-t border-b bg-[var(--hero-bg)]"
        style={{ borderColor: "var(--hero-border)" }}
      >
        <div className="mx-auto max-w-[1200px] px-4 py-5 md:px-6 md:py-6">
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
            <Link href="/guides">가이드</Link>
            <span>/</span>
            <Link href="/guides/product-selection-comparison">제품 선택 & 비교</Link>
            <span>/</span>
            <span>{breadcrumbLabel}</span>
          </div>
          <div className="mt-3">
            <span className="rounded-md bg-[#eef4ea] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#4c7a57]">
              TRACK B
            </span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
            {title}
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            {description}
          </p>
          <p className="mt-3 max-w-3xl text-xs leading-5 text-[var(--foreground-subtle)]">
            ProteinLab의 쉐이크 카테고리는 파우치형 중심의 간편 섭취 단백질 쉐이크를 기준으로 하며,
            파우더 제품은 본문에서 비교 참고 수준으로만 다룹니다.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <div className="space-y-6">
          <section className="grid gap-3 md:grid-cols-4">
            <Link
              href="/shake"
              className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] px-4 py-4 text-sm leading-6 text-[var(--foreground-muted)] transition-colors hover:bg-[#eef7f1]"
            >
              <p className="font-semibold text-[#24543d]">쉐이크 전체 비교</p>
              <p className="mt-1">등록된 쉐이크를 한 번에 보고 필터와 정렬까지 바로 써볼 수 있습니다.</p>
            </Link>
            <Link
              href="/shake?curation=shake-high-protein"
              className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] px-4 py-4 text-sm leading-6 text-[var(--foreground-muted)] transition-colors hover:bg-[#eef7f1]"
            >
              <p className="font-semibold text-[#24543d]">고단백 쉐이크 보기</p>
              <p className="mt-1">단백질 20g 이상 제품만 먼저 모아서 빠르게 비교할 수 있습니다.</p>
            </Link>
            <Link
              href="/shake?curation=shake-meal-replacement"
              className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] px-4 py-4 text-sm leading-6 text-[var(--foreground-muted)] transition-colors hover:bg-[#eef7f1]"
            >
              <p className="font-semibold text-[#24543d]">식사대용 쉐이크 보기</p>
              <p className="mt-1">칼로리와 식이섬유를 같이 보고 한 끼 대체용 제품을 좁혀볼 수 있습니다.</p>
            </Link>
            <Link
              href="/recommend?category=shake"
              className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] px-4 py-4 text-sm leading-6 text-[var(--foreground-muted)] transition-colors hover:bg-[#eef7f1]"
            >
              <p className="font-semibold text-[#24543d]">쉐이크 추천 받기</p>
              <p className="mt-1">운동보충, 저당, 식사대용 기준으로 추천 결과를 바로 볼 수 있습니다.</p>
            </Link>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">{hook}</h2>
            <div className="mt-4 space-y-3 text-sm leading-6 text-[var(--foreground-muted)]">
              {hookBody.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-[#f7fbf8] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-xl font-bold text-[var(--foreground)]">핵심 요약</h2>
              <span className="rounded-full border border-[#d8e5da] bg-white px-3 py-1 text-[11px] font-semibold text-[#24543d]">
                {keyword}
              </span>
            </div>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-[var(--foreground-muted)]">
              {tlDrItems.map((item) => (
                <li key={item} className="rounded-xl border border-[#dce8df] bg-white px-4 py-3">
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {(comparisonRows || comparisonCards) && (
            <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
              <h2 className="text-xl font-bold text-[var(--foreground)]">{comparisonTitle ?? "핵심 내용"}</h2>

              {comparisonRows ? (
                <div className="mt-5 overflow-x-auto">
                  <table className="min-w-full border-collapse text-left text-sm">
                    <thead>
                      <tr className="border-b border-[#e8e6e3] text-[var(--foreground)]">
                        <th className="px-3 py-3 font-semibold">항목</th>
                        <th className="px-3 py-3 font-semibold">단백질 쉐이크</th>
                        <th className="px-3 py-3 font-semibold">단백질 음료</th>
                      </tr>
                    </thead>
                    <tbody>
                      {comparisonRows.map((row) => (
                        <tr key={row.label} className="border-b border-[#f0eeeb] last:border-b-0">
                          <td className="whitespace-nowrap px-3 py-3 font-medium text-[var(--foreground)]">
                            {row.label}
                          </td>
                          <td className="px-3 py-3 text-[var(--foreground-muted)]">{row.shake}</td>
                          <td className="px-3 py-3 text-[var(--foreground-muted)]">{row.drink}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : null}

              {comparisonCards ? (
                <div className="mt-5 grid gap-3 md:grid-cols-3">
                  {comparisonCards.map((item) => (
                    <article key={item.title} className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4">
                      <h3 className="text-sm font-semibold text-[#24543d]">{item.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{item.body}</p>
                    </article>
                  ))}
                </div>
              ) : null}
            </section>
          )}

          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">{criteriaTitle}</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {criteriaItems.map((item) => (
                <article key={item.title} className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4">
                  <h3 className="text-sm font-semibold text-[#24543d]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{item.body}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">실제 제품 예시</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {products.map((item) => (
                <article key={item.name} className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4">
                  <h3 className="text-sm font-semibold text-[#24543d]">{item.name}</h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    <span className="rounded-full bg-[#eff7f1] px-2.5 py-1 text-[11px] font-semibold text-[#2d6a4f]">단백질 {item.protein}</span>
                    {item.sugar !== undefined && (
                      <span className="rounded-full bg-[#f6fbf7] border border-[#dce8df] px-2.5 py-1 text-[11px] font-medium text-[var(--foreground-muted)]">당류 {item.sugar}</span>
                    )}
                    {item.calories !== undefined && (
                      <span className="rounded-full bg-[#f6fbf7] border border-[#dce8df] px-2.5 py-1 text-[11px] font-medium text-[var(--foreground-muted)]">칼로리 {item.calories}</span>
                    )}
                    {item.fiber !== undefined && (
                      <span className="rounded-full bg-[#f6fbf7] border border-[#dce8df] px-2.5 py-1 text-[11px] font-medium text-[var(--foreground-muted)]">식이섬유 {item.fiber}</span>
                    )}
                  </div>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">특징: {item.feature}</p>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">
                    추천 대상: {item.recommendedFor}
                  </p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-[#f7fbf8] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">정리</h2>
            <p className="mt-4 text-sm leading-6 text-[var(--foreground-muted)]">{closing}</p>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">내부 링크</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-[var(--foreground-muted)]">
              {internalGuideLinks.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="font-semibold text-[#24543d] underline underline-offset-4">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              <Link
                href="/shake"
                className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4 transition-colors hover:bg-[#eef7f1]"
              >
                <p className="text-sm font-semibold text-[#24543d]">쉐이크 전체 비교</p>
                <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">
                  카테고리 전체 목록에서 필터, 빠른 큐레이션, 상세페이지를 한 번에 볼 수 있습니다.
                </p>
              </Link>
              <Link
                href="/recommend?category=shake"
                className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4 transition-colors hover:bg-[#eef7f1]"
              >
                <p className="text-sm font-semibold text-[#24543d]">쉐이크 추천 받기</p>
                <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">
                  운동보충, 저당, 식사대용, 식이섬유 기준으로 쉐이크 추천을 바로 받아볼 수 있습니다.
                </p>
              </Link>
              <Link
                href="/ranking"
                className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4 transition-colors hover:bg-[#eef7f1]"
              >
                <p className="text-sm font-semibold text-[#24543d]">등급 순위 보기</p>
                <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">
                  단백질 밀도, 다이어트, 퍼포먼스 기준에서 쉐이크가 어디쯤인지 바로 확인할 수 있습니다.
                </p>
              </Link>
            </div>
          </section>

          {faqItems && faqItems.length > 0 && (
            <section className="rounded-[28px] border border-[#e2ebe4] bg-[#f7fbf8] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
              <h2 className="text-xl font-bold text-[var(--foreground)]">자주 묻는 질문</h2>
              <div className="mt-5 space-y-3">
                {faqItems.map((item) => (
                  <article key={item.question} className="rounded-2xl border border-[#dce8df] bg-white px-5 py-4">
                    <p className="text-sm font-semibold text-[#24543d]">Q. {item.question}</p>
                    <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">A. {item.answer}</p>
                  </article>
                ))}
              </div>
            </section>
          )}

          <section className="rounded-[28px] border border-[#dce8df] bg-[#f4faf6] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">쉐이크 제품 비교 보러가기</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">{ctaBody}</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href="/shake"
                className="inline-flex items-center justify-center rounded-xl border border-[#cddfd3] bg-white px-5 py-3 text-sm font-semibold text-[#24543d] transition-colors hover:bg-[#eef7f1]"
              >
                쉐이크 카테고리 보기
              </Link>
              <Link
                href="/recommend?category=shake"
                className="inline-flex items-center justify-center rounded-xl border border-[#cddfd3] bg-[#24543d] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1e4735]"
              >
                쉐이크 추천 받기
              </Link>
              <Link
                href="/ranking"
                className="inline-flex items-center justify-center rounded-xl border border-[#cddfd3] bg-white px-5 py-3 text-sm font-semibold text-[#24543d] transition-colors hover:bg-[#eef7f1]"
              >
                쉐이크 등급 순위 보기
              </Link>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
