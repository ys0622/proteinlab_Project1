import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "드링킹 단백질 요거트 추천 기준 | 마시는 요거트 비교",
  description:
    "드링킹 단백질 요거트를 비교할 때 용량, 단백질 함량, 당류, 휴대성을 어떻게 함께 봐야 하는지 정리합니다.",
};

const rows = [
  ["용량", "190mL, 210mL처럼 비슷해 보여도 총단백질과 칼로리는 달라질 수 있습니다."],
  ["단백질 밀도", "마시기 편해도 단백질이 너무 낮으면 일반 드링킹 요거트와 차이가 줄어듭니다."],
  ["당류", "맛 제품은 당류가 높아지기 쉬워 다이어트 목적이라면 별도로 좁혀 봐야 합니다."],
];

const relatedLinks = [
  {
    href: "/curation/yogurt-drinking",
    title: "드링킹 요거트 큐레이션",
    description: "마시기 편한 제품만 별도로 모은 큐레이션으로 바로 이동할 수 있습니다.",
  },
  {
    href: "/guides/product-selection-comparison/protein-yogurt-guide",
    title: "단백질 요거트 선택 가이드",
    description: "드링킹을 포함한 전체 요거트 유형을 다시 비교할 수 있습니다.",
  },
  {
    href: "/guides/product-selection-comparison/protein-yogurt-ranking-guide",
    title: "단백질 요거트 순위 보는 법",
    description: "드링킹 타입이 랭킹에서 어떻게 보이는지도 이어서 확인할 수 있습니다.",
  },
];

export default function DrinkingYogurtGuidePage() {
  return (
    <div className="min-h-screen bg-white">
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
            <span>드링킹 단백질 요거트 기준</span>
          </div>
          <div className="mt-3">
            <span className="rounded-md bg-[#eaf0f6] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#4a6178]">
              TRACK B
            </span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
            드링킹 단백질 요거트는 용량과 당류를 같이 봐야 합니다
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            마시는 타입은 휴대성이 좋지만 제품마다 용량과 단백질 차이가 큽니다. 인상만 보지 말고 당류와
            밀도까지 함께 읽어야 합니다.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <div className="space-y-6">
          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">드링킹 요거트 비교 포인트</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {rows.map((item) => (
                <article key={item[0]} className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4">
                  <h3 className="text-sm font-semibold text-[#24543d]">{item[0]}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{item[1]}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-[#f7fbf8] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">관련 페이지</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {relatedLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-2xl border border-[#dce8df] bg-white p-4 transition-colors hover:bg-[#eef7f1]"
                >
                  <p className="text-sm font-semibold text-[#24543d]">{item.title}</p>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{item.description}</p>
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
