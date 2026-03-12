import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "운동 초보 가이드 | Track D 초안 | ProteinLab",
  description:
    "운동을 막 시작한 사용자를 위한 단백질 전략 초안입니다. 식사와 간식, 제품 선택을 쉽게 이해할 수 있게 구성합니다.",
};

const starterPoints = [
  "운동 직후 바로 단백질부터 챙기기보다 하루 총량을 먼저 맞추는 것이 중요합니다.",
  "우유, 요거트, 달걀, 두부, RTD 음료처럼 부담이 적은 선택지부터 시작하는 편이 좋습니다.",
  "단백질 제품은 보충용이지 식사를 전부 대체하는 도구로 쓰지 않는 것이 기본입니다.",
];

export default function BeginnerWorkoutGuidePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <section className="w-full border-t border-b bg-[var(--hero-bg)]" style={{ borderColor: "var(--hero-border)" }}>
        <div className="mx-auto max-w-[1200px] px-4 py-5 md:px-6 md:py-6">
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
            <Link href="/guides" className="hover:text-[var(--accent)]">가이드</Link>
            <span>/</span>
            <Link href="/guides/fitness-lifestyle" className="hover:text-[var(--accent)]">운동 · 라이프스타일</Link>
            <span>/</span>
            <span>운동 초보 가이드</span>
          </div>
          <div className="mt-3">
            <span className="rounded-md bg-[#f8ede7] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#8a4b2f]">TRACK D</span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">운동 초보를 위한 단백질 가이드</h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            이 페이지는 초안입니다.
            <br />
            운동을 막 시작한 사용자가 식사, 간식, 단백질 제품을 어떻게 연결하면 좋은지 쉽게 풀어가는 방향으로 확장합니다.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <div className="space-y-6">
          <section className="rounded-[28px] border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <h2 className="text-xl font-bold text-[var(--foreground)]">초안 핵심 포인트</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {starterPoints.map((point) => (
                <article key={point} className="rounded-2xl border border-[#eaded7] bg-white p-4 shadow-[0_12px_30px_rgba(111,61,38,0.06)]">
                  <p className="text-sm leading-6 text-[var(--foreground-muted)]">{point}</p>
                </article>
              ))}
            </div>
          </section>
          <section className="rounded-[28px] border border-[#e8e6e3] bg-white px-5 py-5 shadow-[0_18px_50px_rgba(20,32,24,0.04)]">
            <div className="flex flex-wrap gap-3">
              <Link href="/guides/protein-basics" className="inline-flex items-center justify-center rounded-xl border border-[#eaded7] bg-white px-5 py-3 text-sm font-semibold text-[#6b3f28] transition-colors hover:bg-[#fcf1ea]">단백질 기초 보기</Link>
              <Link href="/guides/product-selection-comparison/protein-drink-guide" className="inline-flex items-center justify-center rounded-xl border border-[#8a4b2f] bg-[#8a4b2f] px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#6f3d26]">단백질 음료 선택 가이드</Link>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
