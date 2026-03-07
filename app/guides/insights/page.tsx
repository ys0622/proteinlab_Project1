import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export const metadata = {
  title: "시장 인사이트 가이드 | ProteinLab",
  description: "국내 RTD 단백질 음료 시장 데이터와 제품 포지셔닝 분석",
};

const articles = [
  {
    emoji: "🧪",
    title: "제품 포지셔닝 분석",
    description: "단백질밀도/당류/칼로리 분포로 시장 포지션을 비교",
    readTime: "7분 읽기",
    tags: ["데이터", "포지셔닝"],
    href: "/insights",
  },
  {
    emoji: "📈",
    title: "시장 히스토리",
    description: "파우더에서 RTD까지 시장 변화 타임라인",
    readTime: "8분 읽기",
    tags: ["시장", "히스토리"],
    href: "/insights/history",
  },
];

export default function InsightsPage() {
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
            📊 시장 인사이트
          </h1>
          <p className="mt-1 text-sm text-[var(--foreground-muted)]" style={{ fontWeight: 400 }}>
            시장 데이터와 제품 포지셔닝을 기반으로 흐름을 읽고 선택 기준을 정리합니다.
          </p>
          <p className="mt-1 text-xs" style={{ color: "#999" }}>
            섭취량·타이밍·핫딜 등 실행형 콘텐츠는{" "}
            <Link href="/guides/practical" className="text-[var(--accent)] hover:underline">
              실전 가이드
            </Link>
            에서 확인하세요.
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
                border: "1px solid #d9d6cf",
                borderRadius: "14px",
                background: "#fff",
                overflow: "hidden",
              }}
            >
              <div className="px-5 pt-5 pb-4">
                <span
                  className="rounded-md px-2 py-0.5 text-[11px] font-semibold tracking-wide"
                  style={{ background: "#eaf0f6", color: "#4a6178" }}
                >
                  TRACK B
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
                  style={{ border: "1px solid #d9d6cf", color: "#374151" }}
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
