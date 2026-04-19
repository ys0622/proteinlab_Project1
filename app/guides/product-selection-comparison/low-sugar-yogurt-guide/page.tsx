import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "저당 단백질 요거트 추천 기준 | 당류 5g 이하 비교",
  description:
    "저당 단백질 요거트를 고를 때 당류 5g 이하 기준과 단백질 함량, 칼로리, 제품 유형을 함께 보는 방법을 정리합니다.",
};

const rules = [
  ["당류 먼저 좁히기", "다이어트 목적이라면 먼저 당류 5g 이하 제품만 추려 보는 흐름이 가장 실용적입니다."],
  ["단백질 함량 같이 보기", "당류만 낮고 단백질이 낮으면 단백질 요거트로서의 장점이 줄어듭니다."],
  ["맛 제품은 따로 보기", "바나나, 과일, 토핑형은 기본적으로 당류가 높아지기 쉬워 플레인과 분리해 보는 편이 안전합니다."],
];

const relatedLinks = [
  {
    href: "/curation/yogurt-low-sugar",
    title: "저당 요거트 큐레이션",
    description: "당류 기준으로 먼저 좁힌 추천 제품군을 바로 확인할 수 있습니다.",
  },
  {
    href: "/guides/product-selection-comparison/protein-yogurt-guide",
    title: "단백질 요거트 선택 가이드",
    description: "유형 전체를 먼저 이해한 뒤 저당 기준으로 다시 비교할 때 유용합니다.",
  },
  {
    href: "/guides/product-selection-comparison/drinking-yogurt-guide",
    title: "드링킹 요거트 비교 포인트",
    description: "마시는 타입에서 당류를 어떻게 함께 읽어야 하는지 이어서 확인할 수 있습니다.",
  },
];

export default function LowSugarYogurtGuidePage() {
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
            <span>저당 단백질 요거트 기준</span>
          </div>
          <div className="mt-3">
            <span className="rounded-md bg-[#eaf0f6] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#4a6178]">
              TRACK B
            </span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
            저당 단백질 요거트는 당류만 보면 부족합니다
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            당류를 먼저 좁히는 것은 좋지만, 단백질 함량과 제품 유형까지 같이 봐야 실제로 먹을 만한
            제품을 찾을 수 있습니다.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <div className="space-y-6">
          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">저당 요거트 비교 기준</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {rules.map((item) => (
                <article key={item[0]} className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4">
                  <h3 className="text-sm font-semibold text-[#24543d]">{item[0]}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{item[1]}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="rounded-[28px] border border-[#e2ebe4] bg-[#f7fbf8] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">📖 관련 페이지</h2>
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
