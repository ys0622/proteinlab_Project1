import Link from "next/link";
import Header from "../components/Header";

export const metadata = {
  title: "단백질 가이드 | ProteinLab",
  description: "단백질 섭취 기초부터 실전 활용까지",
};

const tracks = [
  {
    emoji: "🧬",
    title: "기초 이해",
    subtitle: "TRACK A · 기초이해",
    description: "단백질의 구조와 역할, 필수 아미노산, 흡수 원리, 근합성 메커니즘까지 — 과학적 배경 지식을 쉽게 풀어냅니다.",
    count: "글 수 2개",
  },
  {
    emoji: "📊",
    title: "시장 인사이트",
    subtitle: "TRACK B · 시장인사이트",
    description: "국내 RTD 단백질 음료 시장의 규모와 성장세, 주요 브랜드 동향, 소비자 선호 변화를 데이터 기반으로 분석합니다.",
    count: "글 수 3개",
  },
  {
    emoji: "🎯",
    title: "실전 가이드",
    subtitle: "TRACK C · 실전가이드",
    description: "목적에 맞는 제품 선택법, 섭취 타이밍 전략, 식단 통합 방법 등 — 지금 바로 써먹을 수 있는 실용 가이드를 모았습니다.",
    count: "글 수 2개",
  },
];

export default function GuidesPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <p className="text-sm font-medium text-[var(--accent)]">🥗 단백질 가이드</p>
        <h1 className="mt-2 text-2xl font-bold text-[var(--foreground)] md:text-3xl">
          단백질 가이드
        </h1>
        <p className="mt-3 text-sm text-[var(--foreground-muted)]">
          단백질 섭취의 기초부터 시장 흐름, 실전 활용까지 한 번에 정리한 가이드입니다. 트랙별로 흐름을 따라 필요한 내용을 빠르게 확인해보세요.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {tracks.map((track) => (
            <Link
              key={track.subtitle}
              href="#"
              className="flex flex-col rounded-xl border border-[var(--border)] bg-[var(--hero-bg)] p-5 transition hover:border-[var(--accent)]"
              style={{ background: "#EFEDE6" }}
            >
              <p className="text-xs text-[var(--foreground-muted)]">{track.subtitle}</p>
              <h2 className="mt-1 text-lg font-semibold text-[var(--foreground)]">
                {track.emoji} {track.title}
              </h2>
              <p className="mt-1 text-xs text-[var(--foreground-muted)]">{track.count}</p>
              <p className="mt-2 text-sm text-[var(--foreground-muted)]">{track.description}</p>
              <span className="mt-3 text-xs font-medium text-[var(--accent)]">보러 가기 →</span>
            </Link>
          ))}
        </div>
      </main>
      <footer className="mt-12 border-t border-[var(--border)] bg-[var(--beige-warm)] py-8">
        <div className="mx-auto max-w-[1200px] px-4 text-center text-sm text-[var(--foreground-muted)] md:px-6">
          <p>© ProteinLab. 단백질 제품 비교 정보는 참고용이며, 구매 전 공식 정보를 확인하세요.</p>
        </div>
      </footer>
    </div>
  );
}
