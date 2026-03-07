import Link from "next/link";
import Header from "../components/Header";

export const metadata = {
  title: "제품 추천 | ProteinLab",
  description: "나에게 맞는 단백질 음료 찾기",
};

export default function RecommendPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <section className="rounded-2xl border border-[var(--border)] bg-[var(--hero-bg)] px-6 py-12 text-center md:py-16" style={{ background: "#EFEDE6" }}>
          <p className="text-sm font-medium text-[var(--accent)]">💪 맞춤 추천</p>
          <h1 className="mt-2 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
            나에게 맞는
            <br />
            단백질 음료 찾기
          </h1>
          <p className="mt-4 text-sm text-[var(--foreground-muted)]">
            4가지 질문으로 101개 제품 중 최적의 RTD 단백질 음료를 추천해드려요
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs text-[var(--foreground-muted)]">
            <span>💪 101개 제품</span>
            <span>⭐ 등급 기반</span>
            <span>📊 성분 비교</span>
          </div>
          <Link
            href="#"
            className="mt-8 inline-flex items-center rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-medium text-white hover:opacity-90"
          >
            시작하기 →
          </Link>
        </section>
      </main>
      <footer className="mt-12 border-t border-[var(--border)] bg-[var(--beige-warm)] py-8">
        <div className="mx-auto max-w-[1200px] px-4 text-center text-sm text-[var(--foreground-muted)] md:px-6">
          <p>© ProteinLab. 단백질 제품 비교 정보는 참고용이며, 구매 전 공식 정보를 확인하세요.</p>
        </div>
      </footer>
    </div>
  );
}
