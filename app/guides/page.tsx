import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata = {
  title: "단백질 가이드  기초부터 제품 선택까지 | ProteinLab",
  description:
    "단백질 음료 기초 지식부터 제품 선택 기준, 목적별 활용법까지. ProteinLab이 데이터 기반으로 정리한 단백질 가이드입니다.",
};

const tracks = [
  {
    label: "TRACK A",
    title: "🧬 단백질 기초",
    description:
      "단백질 음료를 처음 접한다면 여기서 시작하세요. 급원별 차이, 밀도 개념까지 기초를 탄탄하게 잡아드립니다.",
    href: "/guides/basics",
    accentColor: "#2d6a4f",
    accentBg: "#e7f3ec",
  },
  {
    label: "TRACK B",
    title: "🎯 제품 선택 가이드",
    description:
      "어떤 제품을 골라야 할지 모르겠다면 이 트랙을 따라가세요. 5가지 핵심 지표와 유형별 선택법을 정리했습니다.",
    href: "/guides/how-to-choose",
    accentColor: "#4a6178",
    accentBg: "#eaf0f6",
  },
  {
    label: "TRACK C",
    title: "💪 목적별 활용",
    description:
      "다이어트·근성장·일상 보충 등 목적에 따라 달라지는 섭취 전략과 제품 선택 기준을 안내합니다.",
    href: "/guides/by-goal",
    accentColor: "#7a5230",
    accentBg: "#f5f0ea",
  },
];

export default function GuidesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

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
            단백질 음료 기초 지식부터 제품 선택 기준, 목적별 활용법까지. 필요한 트랙부터 바로
            확인해보세요.
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
              <div>
                <div className="px-5 pt-4 pb-2" style={{ borderBottom: "1px solid #f0eeeb" }}>
                  <span
                    className="rounded-md px-2 py-0.5 text-[11px] font-semibold tracking-wide"
                    style={{ background: track.accentBg, color: track.accentColor }}
                  >
                    {track.label}
                  </span>
                </div>

                <div className="px-5 pt-4 pb-5">
                  <h2 className="text-lg font-bold text-[var(--foreground)]">{track.title}</h2>
                  <p className="mt-1 text-xs" style={{ color: "#999" }}>
                    글 수 준비 중
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
                  보러 가기
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
