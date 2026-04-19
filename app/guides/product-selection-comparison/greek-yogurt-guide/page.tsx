import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "그릭요거트 추천 기준 | 단백질 함량·밀도 비교",
  description:
    "그릭요거트를 고를 때 단백질 함량, 단백질 밀도, 당류, 총용량 차이를 어떻게 함께 읽어야 하는지 정리합니다.",
};

const cards = [
  {
    title: "단백질 밀도를 먼저 보기",
    body: "그릭요거트는 100g당 단백질 차이가 큽니다. 총용량보다 밀도를 먼저 보면 비교가 훨씬 쉬워집니다.",
  },
  {
    title: "당류도 같이 보기",
    body: "꾸덕한 식감이 강점이어도 당류가 높으면 활용도가 달라질 수 있습니다. 다이어트 목적이라면 당류 기준을 함께 좁혀야 합니다.",
  },
  {
    title: "총용량과 1회 기준 병행",
    body: "450g, 800g 제품은 총단백질만 크게 보입니다. 1회 섭취 기준과 100g 기준을 같이 읽어야 착시를 줄일 수 있습니다.",
  },
];

const relatedLinks = [
  {
    href: "/curation/yogurt-greek",
    title: "그릭 단백질 요거트 추천",
    description: "현재 데이터 기준으로 그릭 타입 제품만 바로 모아볼 수 있습니다.",
  },
  {
    href: "/guides/product-selection-comparison/protein-yogurt-guide",
    title: "단백질 요거트 선택 가이드",
    description: "그릭, 드링킹, 대용량을 포함한 전체 흐름으로 다시 비교할 수 있습니다.",
  },
  {
    href: "/guides/product-selection-comparison/low-sugar-yogurt-guide",
    title: "저당 단백질 요거트 기준",
    description: "그릭요거트 안에서도 당류를 어떻게 같이 봐야 하는지 이어서 확인할 수 있습니다.",
  },
];

export default function GreekYogurtGuidePage() {
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
            <span>그릭요거트 추천 기준</span>
          </div>
          <div className="mt-3">
            <span className="rounded-md bg-[#eaf0f6] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#4a6178]">
              TRACK B
            </span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
            그릭요거트는 단백질 밀도와 당류를 같이 봐야 합니다
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            그릭요거트는 꾸덕함과 고단백 이미지가 강하지만 실제 비교는 밀도와 당류를 함께 읽을 때
            가장 정확해집니다.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <div className="space-y-6">
          <section className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">그릭요거트 비교 포인트</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {cards.map((item) => (
                <article
                  key={item.title}
                  className="rounded-2xl border border-[#dce8df] bg-[#f6fbf7] p-4"
                >
                  <h3 className="text-sm font-semibold text-[#24543d]">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">
                    {item.body}
                  </p>
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
                  <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">
                    {item.description}
                  </p>
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
