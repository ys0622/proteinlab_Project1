import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata = {
  title: "단백질 가이드 | ProteinLab",
  description: "단백질 섭취 기초부터 시장 흐름, 실전 활용까지 한 번에 정리한 가이드",
};

const tracks = [
  {
    emoji: "🧬",
    title: "기초 이해",
    subtitle: "TRACK A · 기초이해",
    description:
      "단백질의 구조와 역할, 필수 아미노산, 흡수 원리, 근합성 메커니즘까지 — 과학적 배경 지식을 쉽게 풀어냅니다.",
    count: 2,
    href: "/guides/foundations",
    accentColor: "#2d6a4f",
    accentBg: "#e7f3ec",
  },
  {
    emoji: "📊",
    title: "시장 인사이트",
    subtitle: "TRACK B · 시장인사이트",
    description:
      "국내 RTD 단백질 음료 시장의 규모와 성장세, 주요 브랜드 동향, 소비자 선호 변화를 데이터 기반으로 분석합니다.",
    count: 3,
    href: "/guides/insights",
    accentColor: "#4a6178",
    accentBg: "#eaf0f6",
  },
  {
    emoji: "🎯",
    title: "실전 가이드",
    subtitle: "TRACK C · 실전가이드",
    description:
      "목적에 맞는 제품 선택법, 섭취 타이밍 전략, 식단 통합 방법 등 — 지금 바로 써먹을 수 있는 실용 가이드를 모았습니다.",
    count: 2,
    href: "/guides/practical",
    accentColor: "#7a5230",
    accentBg: "#f5f0ea",
  },
];

export default function GuidesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section
        className="w-full border-t border-b bg-[var(--hero-bg)]"
        style={{ borderColor: "var(--hero-border)" }}
      >
        <div className="mx-auto max-w-[1200px] px-4 py-4 md:px-6 md:py-5">
          <h1
            className="text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl"
            style={{ fontWeight: 700 }}
          >
            단백질 가이드
          </h1>
          <p className="mt-1 text-sm text-[var(--foreground-muted)]" style={{ fontWeight: 400 }}>
            단백질 섭취의 기초부터 시장 흐름, 실전 활용까지 한 번에 정리한 가이드입니다. 트랙별로 흐름을 따라 필요한 내용을 빠르게 확인해보세요.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 pb-12 md:px-6">
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {tracks.map((track) => (
            <Link
              key={track.href}
              href={track.href}
              className="group flex flex-col justify-between"
              style={{
                border: "1px solid #e8e6e3",
                borderRadius: "16px",
                background: "#FFFDF8",
                overflow: "hidden",
              }}
            >
              {/* Track label bar */}
              <div>
                <div
                  className="px-5 pt-4 pb-2"
                  style={{ borderBottom: "1px solid #f0eeeb" }}
                >
                  <span
                    className="rounded-md px-2 py-0.5 text-[11px] font-semibold tracking-wide"
                    style={{ background: track.accentBg, color: track.accentColor }}
                  >
                    {track.subtitle}
                  </span>
                </div>

                <div className="px-5 pt-4 pb-5">
                  <h2 className="text-lg font-bold text-[var(--foreground)]">
                    {track.emoji} {track.title}
                  </h2>
                  <p className="mt-1 text-xs" style={{ color: "#999" }}>
                    글 수 {track.count}개
                  </p>
                  <p className="mt-3 text-[13px] leading-relaxed text-[var(--foreground-muted)]">
                    {track.description}
                  </p>
                </div>
              </div>

              <div className="px-5 pb-5">
                <span
                  className="flex items-center justify-center rounded-lg py-2.5 text-xs font-semibold transition-colors group-hover:bg-[var(--accent-light)] group-hover:text-[var(--accent)]"
                  style={{ border: "1px solid #e8e6e3", color: "#374151" }}
                >
                  보러 가기 →
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
