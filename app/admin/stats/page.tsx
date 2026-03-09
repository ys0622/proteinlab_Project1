import { getVisitorStats } from "@/app/lib/ga4";

function formatNumber(value: number) {
  return new Intl.NumberFormat("ko-KR").format(value);
}

export default async function StatsPage() {
  const stats = await getVisitorStats();
  const nowInKst = new Intl.DateTimeFormat("ko-KR", {
    timeZone: "Asia/Seoul",
    year: "numeric",
  }).format(new Date());

  const summaryCards = [
    { label: "오늘 방문자", value: formatNumber(stats.todayVisitors) },
    { label: "최근 7일 방문자", value: formatNumber(stats.last7DaysVisitors) },
    { label: "최근 30일 방문자", value: formatNumber(stats.last30DaysVisitors) },
  ];

  return (
    <div className="mx-auto max-w-5xl p-6">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-[var(--foreground)]">통계</h1>
        <p className="mt-0.5 text-sm text-[var(--foreground-muted)]">
          방문자 통계를 한국 시간 기준으로 확인합니다.
        </p>
      </div>

      {stats.configured ? (
        <>
          <div className="stats-cards mb-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            {summaryCards.map((card) => (
              <div
                key={card.label}
                className="stats-card rounded-xl border border-[var(--border)] bg-[var(--background-card)] p-4"
              >
                <p className="stats-card__label text-xs text-[var(--foreground-muted)]">
                  {card.label}
                </p>
                <p className="stats-card__value mt-1 text-3xl font-bold text-[var(--foreground)]">
                  {card.value}
                </p>
              </div>
            ))}
          </div>

          <div className="rounded-xl border border-[var(--border)] bg-[var(--background-card)] p-6">
            <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-base font-semibold text-[var(--foreground)]">월별 방문자</h2>
                <p className="mt-1 text-sm text-[var(--foreground-muted)]">
                  {nowInKst}년 기준 월별 활성 사용자 수입니다.
                </p>
              </div>
              <a
                href="https://analytics.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-9 items-center justify-center rounded-lg border border-[var(--border)] bg-white px-4 text-sm font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--accent-light)] hover:text-[var(--accent)]"
              >
                Google Analytics 열기
              </a>
            </div>

            <p className="mb-4 rounded-lg bg-[var(--beige-warm)] px-4 py-3 text-xs text-[var(--foreground-muted)]">
              GA4의 알려진 봇 필터링과 <code>activeUsers</code> 지표를 기준으로 집계합니다. 사내 테스트
              트래픽까지 제외하려면 GA4에서 내부 트래픽 필터를 별도로 설정해야 합니다.
            </p>

            <div className="overflow-hidden rounded-xl border border-[var(--border)]">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[var(--beige-warm)]">
                    <th className="px-4 py-3 text-left text-xs font-medium text-[var(--foreground-muted)]">
                      월
                    </th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-[var(--foreground-muted)]">
                      방문자
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {stats.monthlyVisitors.map((month) => (
                    <tr key={month.month} className="border-t border-[var(--border)]">
                      <td className="px-4 py-3 text-[var(--foreground)]">{month.label}</td>
                      <td className="px-4 py-3 text-right font-semibold text-[var(--foreground)]">
                        {formatNumber(month.visitors)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-4 text-xs text-[var(--foreground-muted)]">
              Google Analytics 4 속성 시간대가 {stats.usingTimeZone}로 설정돼 있어야 하루, 7일, 30일,
              월별 집계가 한국 시간 기준과 일치합니다.
            </p>
          </div>
        </>
      ) : (
        <div className="rounded-xl border border-[var(--border)] bg-[var(--background-card)] p-6">
          <h2 className="text-base font-semibold text-[var(--foreground)]">방문자 통계 설정 필요</h2>
          <p className="mt-2 text-sm text-[var(--foreground-muted)]">
            관리자 페이지에서 방문자 수를 보려면 Google Analytics 4 Data API 조회용 환경변수가 추가로
            필요합니다.
          </p>
          <div className="mt-4 rounded-lg bg-[var(--beige-warm)] p-4 text-sm text-[var(--foreground)]">
            <p>
              <code>GA4_PROPERTY_ID</code>
            </p>
            <p>
              <code>GA4_CLIENT_EMAIL</code>
            </p>
            <p>
              <code>GA4_PRIVATE_KEY</code>
            </p>
          </div>
          <p className="mt-4 text-xs text-[var(--foreground-muted)]">
            <code>NEXT_PUBLIC_GA_ID</code>는 프론트 추적용 ID이고, 관리자 통계 조회에는 별도 읽기 권한이
            있는 서비스 계정이 필요합니다.
          </p>
        </div>
      )}
    </div>
  );
}
