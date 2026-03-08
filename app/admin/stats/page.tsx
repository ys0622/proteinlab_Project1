export default function StatsPage() {
  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-[var(--foreground)]">통계</h1>
        <p className="text-sm text-[var(--foreground-muted)] mt-0.5">
          방문 통계 및 인기 제품
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: "오늘 방문", value: "—" },
          { label: "이번 주 방문", value: "—" },
          { label: "전체 제품 조회", value: "—" },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-xl border border-[var(--border)] bg-[var(--background-card)] p-4"
          >
            <p className="text-xs text-[var(--foreground-muted)]">{s.label}</p>
            <p className="text-3xl font-bold text-[var(--foreground)] mt-1">{s.value}</p>
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
      </div>
    </div>
  );
}
