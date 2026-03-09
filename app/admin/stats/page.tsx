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
    { label: "집계 시간대", value: "KST" },
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
                  {nowInKst} 기준 월별 고유 방문자 수입니다.
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
              Google Analytics 4 속성 시간대가 {stats.usingTimeZone}로 설정되어 있어야 하루와 월별
              집계 기준이 한국 시간과 일치합니다.
            </p>
          </div>
        </>
      ) : (
        <div className="rounded-xl border border-[var(--border)] bg-[var(--background-card)] p-6">
          <h2 className="text-base font-semibold text-[var(--foreground)]">
            방문자 통계 설정 필요
          </h2>
          <p className="mt-2 text-sm text-[var(--foreground-muted)]">
            관리자 페이지에서 방문자 수를 보려면 Google Analytics 4 Data API용 환경변수를 추가해야
            합니다.
          </p>
          <div className="mt-4 rounded-lg bg-[var(--beige-warm)] p-4 text-sm text-[var(--foreground)]">
            <p>`GA4_PROPERTY_ID`</p>
            <p>`GA4_CLIENT_EMAIL`</p>
            <p>`GA4_PRIVATE_KEY`</p>
          </div>
          <p className="mt-4 text-xs text-[var(--foreground-muted)]">
            `NEXT_PUBLIC_GA_ID`는 추적용이고, 관리자 통계 조회에는 별도로 읽기 권한이 있는 서비스
            계정 키가 필요합니다.
          </p>
        </div>
      )}
    </div>
  );
}
