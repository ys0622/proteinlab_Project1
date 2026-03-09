export default function StatsPage() {
  return (
    <div className="mx-auto max-w-4xl p-6">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-[var(--foreground)]">통계</h1>
        <p className="mt-0.5 text-sm text-[var(--foreground-muted)]">방문 통계 및 인기 제품</p>
      </div>

      <div className="stats-cards mb-8 grid grid-cols-3 gap-4">
        {[
          { label: "오늘 방문", value: "-" },
          { label: "이번 주 방문", value: "-" },
          { label: "전체 제품 조회", value: "-" },
        ].map((s) => (
          <div
            key={s.label}
            className="stats-card rounded-xl border border-[var(--border)] bg-[var(--background-card)] p-4"
          >
            <p className="stats-card__label text-xs text-[var(--foreground-muted)]">{s.label}</p>
            <p className="stats-card__value mt-1 text-3xl font-bold text-[var(--foreground)]">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-[var(--border)] bg-[var(--background-card)] p-6 text-center">
        <p className="text-sm text-[var(--foreground-muted)]">
          통계 기능을 활성화하려면 분석 서비스를 연결하세요.
        </p>
        <p className="mt-2 text-xs text-[var(--foreground-muted)]">
          Google Analytics, Plausible, 또는 Vercel Analytics를 추천합니다.
        </p>
        <a
          href="https://analytics.google.com"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex h-9 items-center justify-center rounded-lg border border-[var(--border)] bg-white px-4 text-sm font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--accent-light)] hover:text-[var(--accent)]"
        >
          Google Analytics 열기
        </a>
      </div>
    </div>
  );
}
