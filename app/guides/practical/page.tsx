import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export const metadata = {
  title: "실전 가이드 | ProteinLab",
  description: "지금 바로 적용 가능한 단백질 섭취 전략과 루틴 설계",
};

const articles = [
  {
    emoji: "🥤",
    title: "섭취량 계산 가이드",
    description: "목표별 단백질 섭취량을 계산하고 제품으로 채우는 방법",
    readTime: "7분 읽기",
    tags: ["실전", "섭취량"],
    href: "/guides/practical/intake",
  },
  {
    emoji: "⏰",
    title: "섭취 타이밍 가이드",
    description: "운동 전·후, 취침 전 등 상황별 섭취 타이밍 전략",
    readTime: "6분 읽기",
    tags: ["실전", "타이밍"],
    href: "/guides/practical/timing",
  },
];

export default function PracticalPage() {
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
            🎯 실전 가이드
          </h1>
          <p className="mt-1 text-sm text-[var(--foreground-muted)]" style={{ fontWeight: 400 }}>
            지금 바로 적용 가능한 섭취 전략과 루틴 설계를 단계별로 정리했습니다.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 pb-12 md:px-6">
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {articles.map((article) => (
            <Link
              key={article.href}
              href={article.href}
              className="group flex flex-col justify-between"
              style={{
                border: "1px solid #e8e6e3",
                borderRadius: "16px",
                background: "#FFFDF8",
                overflow: "hidden",
              }}
            >
              <div className="px-5 pt-5 pb-4">
                <span
                  className="rounded-md px-2 py-0.5 text-[11px] font-semibold tracking-wide"
                  style={{ background: "#f5f0ea", color: "#7a5230" }}
                >
                  TRACK C
                </span>
                <h2 className="mt-3 text-base font-bold text-[var(--foreground)]">
                  {article.emoji} {article.title}
                </h2>
                <p className="mt-2 text-[13px] leading-relaxed text-[var(--foreground-muted)]">
                  {article.description}
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <span className="text-[11px]" style={{ color: "#999" }}>
                    {article.readTime}
                  </span>
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full px-2 py-0.5 text-[10px] font-medium"
                      style={{ background: "#f3f0eb", color: "#6b6b6b" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="px-5 pb-5">
                <span
                  className="flex items-center justify-center rounded-lg py-2.5 text-xs font-semibold transition-colors group-hover:bg-gray-50"
                  style={{ border: "1px solid #e8e6e3", color: "#374151" }}
                >
                  읽기 →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
