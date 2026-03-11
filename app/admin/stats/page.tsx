import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getAdminStats } from "@/app/lib/ga4";
import { verifySessionToken } from "@/app/lib/session";

export const dynamic = "force-dynamic";

function formatNumber(value: number) {
  return new Intl.NumberFormat("ko-KR").format(value);
}

function SparkBars({
  values,
  color,
}: {
  values: number[];
  color: string;
}) {
  const max = Math.max(...values, 1);

  return (
    <div className="flex h-8 items-end gap-1">
      {values.map((value, index) => (
        <span
          key={`${value}-${index}`}
          className="w-2 rounded-sm"
          style={{
            height: `${Math.max(10, (value / max) * 100)}%`,
            background: color,
            opacity: 0.9,
          }}
        />
      ))}
    </div>
  );
}

function StatusBox({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--background-card)] p-6">
      <h2 className="text-base font-semibold text-[var(--foreground)]">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{description}</p>
      {children ? <div className="mt-4">{children}</div> : null}
    </div>
  );
}

async function requireAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get("proteinlab_session")?.value;
  const isAdmin = token ? await verifySessionToken(token) : false;

  if (!isAdmin) {
    redirect("/admin/login");
  }
}

export default async function StatsPage({
  searchParams,
}: {
  searchParams?: Promise<{ refresh?: string }>;
}) {
  await requireAdmin();
  const params = (await searchParams) ?? {};
  const stats = await getAdminStats({ forceRefresh: Boolean(params.refresh) });

  if (stats.state === "missing_config") {
    return (
      <div className="mx-auto max-w-6xl p-6">
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-[var(--foreground)]">통계</h1>
          <p className="mt-0.5 text-sm text-[var(--foreground-muted)]">
            방문자 통계를 한국 시간 기준으로 확인합니다.
          </p>
        </div>

        <StatusBox
          title="방문자 통계 설정 필요"
          description="관리자 통계를 사용하려면 Cloudflare secret/env에 GA4 조회용 환경변수를 설정해야 합니다. 비밀값은 화면에 노출되지 않으며, 설정이 없으면 API 호출도 수행하지 않습니다."
        >
          <div className="rounded-xl bg-[var(--beige-warm)] p-4 text-sm text-[var(--foreground)]">
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
            현재 누락된 값: {stats.missingEnv.join(", ")}
          </p>
          <p className="mt-2 text-xs text-[var(--foreground-muted)]">
            <code>NEXT_PUBLIC_GA_ID</code>는 프론트 추적용이고, 관리자 통계는 읽기 권한이 있는
            서비스 계정이 필요합니다.
          </p>
        </StatusBox>
      </div>
    );
  }

  if (stats.state === "error") {
    return (
      <div className="mx-auto max-w-6xl p-6">
        <div className="mb-6">
          <h1 className="text-xl font-semibold text-[var(--foreground)]">통계</h1>
          <p className="mt-0.5 text-sm text-[var(--foreground-muted)]">
            방문자 통계를 한국 시간 기준으로 확인합니다.
          </p>
        </div>

        <StatusBox
          title="통계를 불러오지 못했습니다"
          description={stats.message}
        >
          <div className="flex flex-wrap items-center gap-3 text-xs text-[var(--foreground-muted)]">
            <span>기준 시간대: {stats.usingTimeZone}</span>
            {stats.lastSyncedAt ? <span>마지막 동기화: {stats.lastSyncedAt}</span> : null}
          </div>
          <div className="mt-4">
            <Link
              href="/admin/stats?refresh=1"
              className="inline-flex h-9 items-center justify-center rounded-lg border border-[var(--border)] bg-white px-4 text-sm font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--accent-light)] hover:text-[var(--accent)]"
            >
              새로고침
            </Link>
          </div>
        </StatusBox>
      </div>
    );
  }

  if (stats.state !== "ready") {
    return null;
  }

  const summaryCards = [
    { label: "오늘 방문자 수", value: formatNumber(stats.todayVisitors) },
    { label: "오늘 페이지뷰", value: formatNumber(stats.todayPageViews) },
    { label: "최근 7일 방문자 수", value: formatNumber(stats.last7DaysVisitors) },
    { label: "최근 30일 페이지뷰", value: formatNumber(stats.last30DaysPageViews) },
  ];

  return (
    <div className="mx-auto max-w-6xl p-6">
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-[var(--foreground)]">통계</h1>
          <p className="mt-0.5 text-sm text-[var(--foreground-muted)]">
            방문자 통계를 한국 시간 기준으로 확인합니다.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-xs text-[var(--foreground-muted)]">
          <span>마지막 동기화: {stats.lastSyncedAt}</span>
          {stats.isStale ? (
            <span className="rounded-full bg-[#FFF1E6] px-2.5 py-1 text-[#F08A24]">
              캐시된 데이터 표시 중
            </span>
          ) : null}
          <Link
            href="/admin/stats?refresh=1"
            className="inline-flex h-9 items-center justify-center rounded-lg border border-[var(--border)] bg-white px-4 text-sm font-medium text-[var(--foreground)] transition-colors hover:bg-[var(--accent-light)] hover:text-[var(--accent)]"
          >
            새로고침
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {summaryCards.map((card) => (
          <div
            key={card.label}
            className="rounded-2xl border border-[var(--border)] bg-[var(--background-card)] p-4"
          >
            <p className="text-xs text-[var(--foreground-muted)]">{card.label}</p>
            <p className="mt-1 text-3xl font-bold text-[var(--foreground)]">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.25fr_1fr]">
        <section className="rounded-2xl border border-[var(--border)] bg-[var(--background-card)] p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-semibold text-[var(--foreground)]">
                일자별 방문 추이
              </h2>
              <p className="mt-1 text-xs text-[var(--foreground-muted)]">최근 14일</p>
            </div>
          </div>

          {stats.dailyTrend.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)] text-left text-xs text-[var(--foreground-muted)]">
                    <th className="pb-3 pr-4">날짜</th>
                    <th className="pb-3 pr-4 text-right">방문자</th>
                    <th className="pb-3 pr-4 text-right">페이지뷰</th>
                    <th className="pb-3">추이</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.dailyTrend.map((row, index) => (
                    <tr key={row.date} className={index > 0 ? "border-t border-[var(--border)]" : ""}>
                      <td className="py-3 pr-4 text-[var(--foreground)]">{row.label}</td>
                      <td className="py-3 pr-4 text-right font-medium text-[var(--foreground)]">
                        {formatNumber(row.visitors)}
                      </td>
                      <td className="py-3 pr-4 text-right font-medium text-[var(--foreground)]">
                        {formatNumber(row.pageViews)}
                      </td>
                      <td className="py-3">
                        <SparkBars values={[row.visitors, row.pageViews]} color="#4C7BD9" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-sm text-[var(--foreground-muted)]">표시할 일자별 데이터가 없습니다.</p>
          )}
        </section>

        <section className="rounded-2xl border border-[var(--border)] bg-[var(--background-card)] p-5">
          <h2 className="text-base font-semibold text-[var(--foreground)]">상위 페이지 Top 10</h2>
          <p className="mt-1 text-xs text-[var(--foreground-muted)]">최근 30일 페이지뷰 기준</p>
          {stats.topPages.length > 0 ? (
            <div className="mt-4 overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)] text-left text-xs text-[var(--foreground-muted)]">
                    <th className="pb-3 pr-4">순위</th>
                    <th className="pb-3 pr-4">페이지 경로</th>
                    <th className="pb-3 text-right">페이지뷰</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.topPages.map((row) => (
                    <tr key={`${row.rank}-${row.path}`} className="border-t border-[var(--border)]">
                      <td className="py-3 pr-4 font-medium text-[var(--foreground)]">{row.rank}</td>
                      <td className="py-3 pr-4 text-[var(--foreground)]">{row.path}</td>
                      <td className="py-3 text-right font-medium text-[var(--foreground)]">
                        {formatNumber(row.pageViews)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="mt-4 text-sm text-[var(--foreground-muted)]">표시할 페이지 데이터가 없습니다.</p>
          )}
        </section>
      </div>

      <section className="mt-6 rounded-2xl border border-[var(--border)] bg-[var(--background-card)] p-5">
        <h2 className="text-base font-semibold text-[var(--foreground)]">트래픽 소스 Top 10</h2>
        <p className="mt-1 text-xs text-[var(--foreground-muted)]">최근 30일 방문자 기준</p>
        {stats.topSources.length > 0 ? (
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--border)] text-left text-xs text-[var(--foreground-muted)]">
                  <th className="pb-3 pr-4">순위</th>
                  <th className="pb-3 pr-4">source / medium</th>
                  <th className="pb-3 text-right">방문자</th>
                </tr>
              </thead>
              <tbody>
                {stats.topSources.map((row) => (
                  <tr key={`${row.rank}-${row.sourceMedium}`} className="border-t border-[var(--border)]">
                    <td className="py-3 pr-4 font-medium text-[var(--foreground)]">{row.rank}</td>
                    <td className="py-3 pr-4 text-[var(--foreground)]">{row.sourceMedium}</td>
                    <td className="py-3 text-right font-medium text-[var(--foreground)]">
                      {formatNumber(row.visitors)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="mt-4 text-sm text-[var(--foreground-muted)]">표시할 소스 데이터가 없습니다.</p>
        )}
      </section>

      <p className="mt-4 text-xs text-[var(--foreground-muted)]">
        Google Analytics 4 속성 시간대도 가능하면 <code>{stats.usingTimeZone}</code>로 맞춰두는
        것을 권장합니다.
      </p>
    </div>
  );
}
