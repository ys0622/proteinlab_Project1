import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export const metadata = {
  title: "기초 이해 가이드 | ProteinLab",
  description: "단백질의 기본 개념과 급원별 차이를 이해하는 기초 가이드",
};

const articles = [
  {
    emoji: "🥛",
    title: "단백질 급원 가이드",
    description: "유청·카제인·식물성 단백질의 특성과 활용법",
    readTime: "7분 읽기",
    tags: ["급원", "기초"],
    href: "/guides/foundations/sources",
  },
  {
    emoji: "🧪",
    title: "오해와 진실",
    description: "단백질 섭취에 대한 대표적인 오해를 사실 기반으로 정리",
    readTime: "6분 읽기",
    tags: ["팩트체크", "기초"],
    href: "/guides/foundations/myths",
  },
];

export default function FoundationsPage() {
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
            🧬 기초 이해
          </h1>
          <p className="mt-1 text-sm text-[var(--foreground-muted)]" style={{ fontWeight: 400 }}>
            단백질의 기본 개념과 급원별 차이를 먼저 이해하면 제품 선택이 훨씬 쉬워집니다.
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
                  style={{ background: "#e7f3ec", color: "#2d6a4f" }}
                >
                  TRACK A
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
