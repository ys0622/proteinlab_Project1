import { buildGuideJsonLd } from "@/app/lib/guideJsonLd";
﻿import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "편의점 단백질 음료·바 추천 | CU·GS25·세븐일레븐 성분 기준",
  description:
    "편의점에서 살 수 있는 단백질 음료와 단백질 바를 단백질 함량, 당류, 칼로리 기준으로 비교합니다. 더단백·셀렉스·하이뮨·닥터유·랩노쉬 브랜드를 성분 데이터로 바로 선택하세요.",
  alternates: {
    canonical: "https://proteinlab.kr/guides/product-selection-comparison/convenience-store-protein-guide",
  },
};

const drinkBrands = [
  {
    title: "더단백",
    body: "빙그레 브랜드입니다. 제품별 용량과 단백질·당류·열량이 다르므로 매장에 놓인 제품의 영양정보를 기준으로 비교합니다.",
  },
  {
    title: "셀렉스",
    body: "매일유업 브랜드입니다. 같은 브랜드 안에서도 제품 라인에 따라 단백질과 당류가 달라 개별 성분표 확인이 필요합니다.",
  },
  {
    title: "하이뮨",
    body: "일동후디스 브랜드입니다. 제품 이름이나 대상 표현보다 한 병의 단백질·당류·열량과 원재료를 확인합니다.",
  },
  {
    title: "랩노쉬",
    body: "음료와 바 제품이 등록되어 있습니다. 서로 형태가 다르므로 같은 카테고리 안에서 단백질·당류·열량을 비교합니다.",
  },
  {
    title: "닥터유 프로틴 드링크",
    body: "오리온 브랜드입니다. 용량 대비 단백질과 한 병의 당류·열량을 함께 확인합니다.",
  },
];

const barBrands = [
  {
    title: "닥터유 단백질바",
    body: "오리온 브랜드입니다. 맛과 제품 규격에 따라 당류와 열량이 달라 개별 영양정보를 확인합니다.",
  },
  {
    title: "랩노쉬 프로틴바",
    body: "단백질 밀도가 상대적으로 높은 편이며 편의점에서도 일부 매장 취급합니다. 음료와 함께 비교하면 편합니다.",
  },
  {
    title: "롯데 프로틴바",
    body: "롯데웰푸드 브랜드입니다. 중량 대비 단백질과 한 개당 당류·열량을 함께 비교합니다.",
  },
];

const selectionSteps = [
  {
    step: "1단계",
    title: "음료 vs 바 먼저 결정",
    body: "이동 중 바로 마실 수 있는 음료형인지, 간단히 씹을 수 있는 바형인지 먼저 정하면 비교 범위가 절반으로 줄어듭니다.",
  },
  {
    step: "2단계",
    title: "단백질 함량 확인",
    body: "제품 라벨의 한 병 또는 한 개 기준 단백질을 확인합니다. 용량이 다르면 총량뿐 아니라 용량당 수치도 같이 봅니다.",
  },
  {
    step: "3단계",
    title: "당류·칼로리 체크",
    body: "당류와 열량은 같은 브랜드 안에서도 제품별로 다를 수 있습니다. 제품명보다 영양정보를 직접 확인합니다.",
  },
  {
    step: "4단계",
    title: "단백질 밀도로 최종 비교",
    body: "비슷한 단백질 함량이라면 칼로리 대비 단백질이 높은 제품이 실질적으로 더 효율적입니다. ProteinLab에서 밀도 기준 정렬로 바로 확인할 수 있습니다.",
  },
];

const commonMistakes = [
  {
    title: "단백질 g만 보고 고르는 경우",
    body: "단백질 총량만으로 제품의 전체 영양 구성을 판단할 수 없습니다. 당류와 열량, 용량을 함께 확인하세요.",
  },
  {
    title: "음료와 바를 같은 기준으로 비교하는 경우",
    body: "음료와 바는 용량·포만감·섭취 상황이 달라 단백질 g만으로 직접 비교하기 어렵습니다. 카테고리를 나눠서 보는 것이 맞습니다.",
  },
  {
    title: "편의점에서 판매 중인지 확인하지 않는 경우",
    body: "ProteinLab의 편의점 큐레이션은 편의점 유통이 확인된 브랜드 기준으로 구성되어 있습니다. 매장마다 입고 품목이 다를 수 있습니다.",
  },
];

const faqItems = [
  {
    question: "편의점 단백질 음료는 무엇부터 비교하나요?",
    answer: "한 병 기준 단백질, 당류, 열량, 용량을 먼저 확인하세요. 병 크기가 다르면 총량과 용량당 수치를 함께 보는 편이 정확합니다.",
  },
  {
    question: "같은 브랜드면 편의점 단백질 음료 성분도 비슷한가요?",
    answer: "제품 라인과 맛에 따라 영양정보가 달라질 수 있습니다. 브랜드 이름만 보지 말고 매장에 놓인 개별 제품의 라벨을 확인하세요.",
  },
  {
    question: "편의점마다 같은 제품을 판매하나요?",
    answer: "매장과 시점에 따라 취급 품목이 다를 수 있습니다. 이 페이지는 등록 제품의 성분 비교 기준을 제공하며 특정 매장의 재고를 보장하지 않습니다.",
  },
];

export default function ConvenienceStoreProteinGuidePage() {
  const jsonLd = buildGuideJsonLd({
    title: "편의점 단백질 음료·바 추천 | CU·GS25·세븐일레븐 성분 기준",
    description: "편의점에서 살 수 있는 단백질 음료와 단백질 바를 단백질 함량, 당류, 칼로리 기준으로 비교합니다. 더단백·셀렉스·하이뮨·닥터유·랩노쉬 브랜드를 성분 데이터로 바로 선택하세요.",
    url: "https://proteinlab.kr/guides/product-selection-comparison/convenience-store-protein-guide",
    datePublished: "2026-03-01",
    dateModified: "2026-10-18",
    faq: faqItems,
  });

  return (
    <div className="min-h-screen bg-white">
      {jsonLd.map((item, i) => (<script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }} />))}

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
            <span>편의점 단백질 제품 추천</span>
          </div>
          <div className="mt-3">
            <span className="rounded-md bg-[#eef4ea] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#4c7a57]">
              편의점
            </span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[#16412D] md:text-3xl">
            편의점 단백질 음료·바, 성분 기준으로 고르는 법
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            CU, GS25, 세븐일레븐에서 볼 수 있는 단백질 음료와 단백질 바를 단백질 함량, 당류, 칼로리 기준으로 비교합니다.
            더단백·셀렉스·하이뮨·닥터유·랩노쉬 등 편의점 유통 브랜드를 ProteinLab 데이터로 바로 확인하세요.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <div className="space-y-6">

          {/* 빠른 이동 */}
          <section className="grid gap-3 md:grid-cols-3">
            <Link
              href="/?curation=convenience"
              className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] px-4 py-4 text-sm leading-6 text-[var(--foreground-muted)] transition-colors hover:bg-[#eef7f1]"
            >
              <p className="font-semibold text-[#24543d]">편의점 단백질 음료 비교</p>
              <p className="mt-1">편의점 유통 브랜드 음료만 필터링해서 단백질·당류·칼로리 기준으로 바로 비교합니다.</p>
            </Link>
            <Link
              href="/bars?curation=convenience"
              className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] px-4 py-4 text-sm leading-6 text-[var(--foreground-muted)] transition-colors hover:bg-[#eef7f1]"
            >
              <p className="font-semibold text-[#24543d]">편의점 단백질 바 비교</p>
              <p className="mt-1">닥터유·랩노쉬·롯데 등 편의점 단백질 바를 성분 기준으로 한 번에 비교합니다.</p>
            </Link>
            <Link
              href="/curation/convenience"
              className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] px-4 py-4 text-sm leading-6 text-[var(--foreground-muted)] transition-colors hover:bg-[#eef7f1]"
            >
              <p className="font-semibold text-[#24543d]">편의점 큐레이션 전체보기</p>
              <p className="mt-1">음료·바 큐레이션과 선택 기준을 한 페이지에서 확인할 수 있습니다.</p>
            </Link>
          </section>

          {/* 브랜드 현황 — 음료 */}
          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">편의점 단백질 음료 브랜드</h2>
            <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">
              ProteinLab 편의점 큐레이션에는 편의점 유통이 확인된 브랜드 제품이 포함되어 있습니다.
            </p>
            <div className="mt-5 grid gap-3 md:grid-cols-3 lg:grid-cols-5">
              {drinkBrands.map((item) => (
                <article key={item.title} className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4">
                  <h3 className="text-sm font-semibold text-[#24543d]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{item.body}</p>
                </article>
              ))}
            </div>
            <div className="mt-4">
              <Link
                href="/?curation=convenience"
                className="inline-flex items-center gap-1 text-sm font-semibold text-[#24543d] underline underline-offset-4"
              >
                편의점 단백질 음료 성분 비교 바로가기 →
              </Link>
            </div>
          </section>

          {/* 브랜드 현황 — 바 */}
          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">편의점 단백질 바 브랜드</h2>
            <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">
              편의점에서 볼 수 있는 단백질 바는 음료보다 브랜드 수가 적지만 중량 대비 단백질 효율 차이가 있어 비교가 필요합니다.
            </p>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {barBrands.map((item) => (
                <article key={item.title} className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4">
                  <h3 className="text-sm font-semibold text-[#24543d]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{item.body}</p>
                </article>
              ))}
            </div>
            <div className="mt-4">
              <Link
                href="/bars?curation=convenience"
                className="inline-flex items-center gap-1 text-sm font-semibold text-[#24543d] underline underline-offset-4"
              >
                편의점 단백질 바 성분 비교 바로가기 →
              </Link>
            </div>
          </section>

          {/* 고르는 순서 */}
          <section className="rounded-[28px] border border-[#e2ebe4] bg-[#f7fbf8] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">편의점에서 단백질 제품 고르는 순서</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
              {selectionSteps.map((item) => (
                <article key={item.step} className="rounded-2xl border border-[#dce8df] bg-white p-4">
                  <p className="text-xs font-semibold tracking-[0.08em] text-[#2d6a4f]">{item.step}</p>
                  <p className="mt-2 text-sm font-semibold text-[var(--foreground)]">{item.title}</p>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{item.body}</p>
                </article>
              ))}
            </div>
          </section>

          {/* 자주 하는 실수 */}
          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">편의점 단백질 제품을 고를 때 자주 하는 실수</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {commonMistakes.map((item) => (
                <article key={item.title} className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4">
                  <h3 className="text-sm font-semibold text-[#24543d]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{item.body}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">편의점 단백질 음료 라벨 빠른 확인</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              <article className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4">
                <h3 className="text-sm font-semibold text-[#24543d]">한 병 기준</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">단백질·당류·열량이 한 병 전체 기준인지 영양정보에서 확인합니다.</p>
              </article>
              <article className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4">
                <h3 className="text-sm font-semibold text-[#24543d]">원재료</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">우유·대두 등 단백질 원료와 알레르기 표시를 제품별로 확인합니다.</p>
              </article>
              <article className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4">
                <h3 className="text-sm font-semibold text-[#24543d]">재고와 성분 구분</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">등록 성분 정보는 매장 재고를 뜻하지 않습니다. 실제 취급 여부는 방문 매장에서 확인합니다.</p>
              </article>
            </div>
          </section>

          {/* FAQ */}
          <section className="rounded-[28px] border border-[#e2ebe4] bg-[#f7fbf8] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">자주 묻는 질문</h2>
            <div className="mt-5 space-y-3">
              {faqItems.map((item) => (
                <article key={item.question} className="rounded-2xl border border-[#dce8df] bg-white p-4">
                  <h3 className="text-sm font-semibold text-[#24543d]">{item.question}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{item.answer}</p>
                </article>
              ))}
            </div>
          </section>

          {/* 내부 링크 */}
          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">📖 관련 가이드</h2>
            <ul className="mt-4 space-y-3 text-sm leading-6 text-[var(--foreground-muted)]">
              <li>
                <Link href="/guides/product-selection-comparison/protein-drink-guide" className="font-semibold text-[#24543d] underline underline-offset-4">
                  단백질 음료 선택 가이드 — 단백질 함량·당류·칼로리 비교 순서
                </Link>
              </li>
              <li>
                <Link href="/guides/product-selection-comparison/diet-protein-drink-guide" className="font-semibold text-[#24543d] underline underline-offset-4">
                  다이어트 단백질 음료 기준 — 칼로리·당류 중심 선택법
                </Link>
              </li>
              <li>
                <Link href="/guides/product-selection-comparison/protein-bar-top10" className="font-semibold text-[#24543d] underline underline-offset-4">
                  단백질바 추천 TOP 10 — 100개 제품 성분 비교
                </Link>
              </li>
              <li>
                <Link href="/guides/intake-strategy-health/senior-protein-strategy" className="font-semibold text-[#24543d] underline underline-offset-4">
                  노인 단백질 보충 — 음료·두유·요거트 성분 비교
                </Link>
              </li>
            </ul>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              <Link
                href="/?curation=convenience"
                className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4 transition-colors hover:bg-[#eef7f1]"
              >
                <p className="text-sm font-semibold text-[#24543d]">편의점 단백질 음료 비교</p>
                <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">
                  편의점 브랜드 필터 적용 상태로 단백질·당류·칼로리를 바로 비교할 수 있습니다.
                </p>
              </Link>
              <Link
                href="/bars?curation=convenience"
                className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4 transition-colors hover:bg-[#eef7f1]"
              >
                <p className="text-sm font-semibold text-[#24543d]">편의점 단백질 바 비교</p>
                <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">
                  편의점 기준 단백질 바를 중량·단백질·당류 데이터 기준으로 한 번에 비교합니다.
                </p>
              </Link>
              <Link
                href="/curation/convenience"
                className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4 transition-colors hover:bg-[#eef7f1]"
              >
                <p className="text-sm font-semibold text-[#24543d]">편의점 큐레이션 전체보기</p>
                <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">
                  편의점 큐레이션 기준과 음료·바 비교를 한 페이지에서 확인할 수 있습니다.
                </p>
              </Link>
            </div>
          </section>

          {/* CTA */}
          <section className="rounded-[28px] border border-[#dce8df] bg-[#f4faf6] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">편의점 단백질 제품 성분 비교 바로가기</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
              ProteinLab에서는 편의점 유통 브랜드 제품을 단백질 함량, 당류, 칼로리, 단백질 밀도 기준으로 직접 비교할 수 있습니다.
              필터와 정렬을 조합해 목적에 맞는 제품을 바로 찾아보세요.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href="/?curation=convenience"
                className="inline-flex items-center justify-center rounded-xl border border-[#cddfd3] bg-[#24543d] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#1e4735]"
              >
                편의점 단백질 음료 비교
              </Link>
              <Link
                href="/bars?curation=convenience"
                className="inline-flex items-center justify-center rounded-xl border border-[#cddfd3] bg-white px-5 py-3 text-sm font-semibold text-[#24543d] transition-colors hover:bg-[#eef7f1]"
              >
                편의점 단백질 바 비교
              </Link>
              <Link
                href="/curation/convenience"
                className="inline-flex items-center justify-center rounded-xl border border-[#cddfd3] bg-white px-5 py-3 text-sm font-semibold text-[#24543d] transition-colors hover:bg-[#eef7f1]"
              >
                편의점 큐레이션 전체보기
              </Link>
            </div>
          </section>

        </div>
      </main>

      <Footer />
    </div>
  );
}
