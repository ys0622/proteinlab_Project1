import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export const metadata = {
  title: "💪 목적별 활용 | ProteinLab",
  description:
    "다이어트·근성장·일상 보충 등 목적에 따라 달라지는 섭취 전략과 제품 선택 기준을 안내합니다.",
};

export default function ByGoalPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section
        className="w-full border-t border-b bg-[var(--hero-bg)]"
        style={{ borderColor: "var(--hero-border)" }}
      >
        <div className="mx-auto max-w-[1200px] px-4 py-4 md:px-6 md:py-5">
          <Link
            href="/guides"
            className="text-xs text-[var(--foreground-muted)] hover:text-[var(--accent)]"
          >
            ← 단백질 가이드
          </Link>
          <h1
            className="mt-2 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl"
            style={{ fontWeight: 700 }}
          >
            💪 목적별 활용
          </h1>
          <p className="mt-1 text-sm text-[var(--foreground-muted)]" style={{ fontWeight: 400 }}>
            다이어트·근성장·일상 보충 등 목적에 따라 달라지는 섭취 전략과 제품 선택 기준을
            안내합니다.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 pb-12 md:px-6">
        <div
          className="mt-6 flex flex-col items-center justify-center rounded-2xl border text-center"
          style={{ borderColor: "#e8e6e3", background: "#FFFDF8", minHeight: "220px" }}
        >
          <span className="rounded-md px-2 py-0.5 text-[11px] font-semibold tracking-wide bg-[#f5f0ea] text-[#7a5230]">
            TRACK C
          </span>
          <p className="mt-3 text-base font-semibold text-[var(--foreground)]">준비 중</p>
          <p className="mt-1 text-sm text-[var(--foreground-muted)]">
            콘텐츠는 곧 업데이트될 예정입니다.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
