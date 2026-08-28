import { buildGuideJsonLd } from "@/app/lib/guideJsonLd";
import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import GuideBuySection from "@/app/components/GuideBuySection";

export const metadata = {
  alternates: { canonical: "https://proteinlab.kr/guides/product-selection-comparison/shakebaby-vs-danbaekhani" },
  title: "쉐이크베이비 vs 단백하니 쉐이크 비교 | 단백질·당류·칼로리 기준 2026",
  description: "쉐이크베이비 초코·말차와 단백하니 시그니처·초코·말차를 단백질, 당류, 칼로리, 단백질 밀도 기준으로 직접 비교했습니다. 맛 선택 폭과 칼로리 효율 중 무엇이 더 맞는지 바로 확인해보세요.",
};

const compareRows = [
  ["쉐이크베이비 단백질쉐이크 초코", "22g", "2g", "163kcal", "13.5g/100kcal"],
  ["쉐이크베이비 단백질쉐이크 말차", "21g", "2g", "164kcal", "12.8g/100kcal"],
  ["단백하니 단백질쉐이크 시그니처", "22g", "2g", "155kcal", "14.2g/100kcal"],
  ["단백하니 단백질쉐이크 초코", "22g", "2g", "145kcal", "15.2g/100kcal"],
  ["단백하니 단백질쉐이크 말차", "22g", "2g", "140kcal", "15.7g/100kcal"],
];

const positionCards = [
  {
    title: "쉐이크베이비",
    tag: "맛 다양성",
    body: "초코, 딸기, 말차, 곡물, 스윗콘 플레이크까지 5종으로 한 브랜드 안에서 맛 선택 폭이 가장 넓습니다. 단백질 20~22g, 칼로리 163~167kcal로 편차가 작습니다.",
  },
  {
    title: "단백하니",
    tag: "칼로리 효율",
    body: "단백질 22g을 유지하면서 칼로리를 140~155kcal까지 낮춰 단백질 밀도 기준이 더 좋습니다. 맛 종류는 3가지로 상대적으로 적습니다.",
  },
];

const recommendCards = [
  {
    title: "쉐이크베이비가 더 맞는 경우",
    items: ["매번 다른 맛으로 바꿔가며 마시고 싶은 경우", "딸기·곡물·스윗콘처럼 특이한 맛을 찾는 경우", "신제품 브랜드를 먼저 테스트해보고 싶은 경우"],
  },
  {
    title: "단백하니가 더 맞는 경우",
    items: ["같은 단백질에서 칼로리를 더 낮추고 싶은 경우", "단백질 밀도(g/100kcal) 숫자를 우선하는 경우", "이미 검증된 브랜드로 시작하고 싶은 경우"],
  },
];

export default function ShakebabyVsDanbaekhaniPage() {
  const jsonLd = buildGuideJsonLd({
    title: "쉐이크베이비 vs 단백하니 쉐이크 비교 | 단백질·당류·칼로리 기준 2026",
    description: "쉐이크베이비 초코·말차와 단백하니 시그니처·초코·말차를 단백질, 당류, 칼로리, 단백질 밀도 기준으로 직접 비교했습니다. 맛 선택 폭과 칼로리 효율 중 무엇이 더 맞는지 바로 확인해보세요.",
    url: "https://proteinlab.kr/guides/product-selection-comparison/shakebaby-vs-danbaekhani",
    datePublished: "2026-08-26",
    dateModified: "2026-08-26",
  });

  return (
    <div className="min-h-screen bg-white">
      {jsonLd.map((item, i) => (<script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }} />))}

      <Header />
      <section className="w-full border-t border-b bg-[var(--hero-bg)]" style={{ borderColor: "var(--hero-border)" }}>
        <div className="mx-auto max-w-[1200px] px-4 py-5 md:px-6 md:py-6">
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
            <Link href="/guides" className="hover:text-[var(--accent)]">가이드</Link>
            <span>/</span>
            <Link href="/guides/product-selection-comparison" className="hover:text-[var(--accent)]">제품 선택 & 비교</Link>
            <span>/</span>
            <span>쉐이크베이비 vs 단백하니</span>
          </div>
          <div className="mt-3">
            <span className="rounded-md bg-[#eef4ea] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#4c7a57]">TRACK B</span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[#16412D] md:text-3xl">
            쉐이크베이비 vs 단백하니, 어떤 쉐이크가 더 맞을까?
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            맛 선택 폭을 우선하면 쉐이크베이비, 칼로리 효율을 우선하면 단백하니가 더 잘 맞을 수 있습니다.
            <br />
            단백질, 당류, 칼로리, 단백질 밀도를 직접 비교해서 어떤 브랜드가 내 루틴에 맞는지 바로 가늠해보세요.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <div className="space-y-6">
          <section className="rounded-[28px] border border-[#e2ebe4] bg-[#f7fbf8] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">성분 직접 비교</h2>
            <p className="mt-3 text-sm leading-6 text-[var(--foreground-muted)]">
              단백질·당류·칼로리·단백질 밀도 기준으로 나란히 비교합니다.
            </p>
            <div className="mt-5 overflow-x-auto rounded-2xl border border-[#ece9e2] bg-white">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8e6e3] text-[var(--foreground)]">
                    <th className="px-3 py-3 font-semibold">제품명</th>
                    <th className="px-3 py-3 font-semibold">단백질</th>
                    <th className="px-3 py-3 font-semibold">당류</th>
                    <th className="px-3 py-3 font-semibold">칼로리</th>
                    <th className="px-3 py-3 font-semibold">단백질 밀도</th>
                  </tr>
                </thead>
                <tbody>
                  {compareRows.map((row) => (
                    <tr key={row[0]} className="border-b border-[#f0eeeb] last:border-b-0">
                      {row.map((cell, i) => (
                        <td key={cell} className={`px-3 py-3 ${i === 0 ? "font-medium text-[var(--foreground)]" : "text-[var(--foreground-muted)]"}`}>
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
            <h2 className="text-xl font-bold text-[var(--foreground)]">브랜드 포지션 비교</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {positionCards.map((card) => (
                <article key={card.title} className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-[#24543d]">{card.title}</p>
                    <span className="rounded-full bg-[#eff7f1] px-2 py-0.5 text-[10px] font-semibold text-[#2d6a4f]">{card.tag}</span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{card.body}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-[#f7fbf8] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">어떤 경우에 무엇을 고를까</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {recommendCards.map((card) => (
                <article key={card.title} className="rounded-2xl border border-[#dce8df] bg-white p-4">
                  <p className="text-sm font-semibold text-[#24543d]">{card.title}</p>
                  <ul className="mt-3 space-y-2">
                    {card.items.map((item) => (
                      <li key={item} className="flex gap-2 text-sm leading-6 text-[var(--foreground-muted)]">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#2d6a4f]" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <div className="flex flex-wrap gap-3">
              <Link href="/guides/product-selection-comparison/shakebaby-protein-shake" className="inline-flex items-center justify-center rounded-lg border border-[#d9e7dc] px-5 py-3 text-sm font-semibold text-[#24543d] transition-colors hover:bg-[#eef7f1]">
                쉐이크베이비 5종 전체 보기 →
              </Link>
              <Link href="/guides/product-selection-comparison/danbaekhani-protein-shake" className="inline-flex items-center justify-center rounded-lg border border-[#d9e7dc] px-5 py-3 text-sm font-semibold text-[#24543d] transition-colors hover:bg-[#eef7f1]">
                단백하니 전체 보기 →
              </Link>
              <Link href="/shake" className="inline-flex items-center justify-center rounded-lg border border-[#2d6a4f] bg-[#2d6a4f] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#24543d]">
                쉐이크 제품 바로 비교 →
              </Link>
            </div>
          </section>
        </div>
      </main>
      <GuideBuySection />
      <Footer />
    </div>
  );
}
