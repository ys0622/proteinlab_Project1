import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getAdminStats } from "@/app/lib/ga4";
import { verifySessionToken } from "@/app/lib/session";

export const dynamic = "force-dynamic";

function formatNumber(value: number) {
  return new Intl.NumberFormat("ko-KR").format(value);
}

function SparkBars({ values, color }: { values: number[]; color: string }) {
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

function CandidateCard({
  title,
  body,
  metric,
}: {
  title: string;
  body: string;
  metric: string;
}) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--background-card)] p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--foreground-muted)]">
        우선 개선 후보
      </p>
      <h3 className="mt-2 text-base font-semibold text-[var(--foreground)]">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{body}</p>
      <p className="mt-3 text-sm font-medium text-[var(--foreground)]">{metric}</p>
    </div>
  );
}

function SegmentCard({
  title,
  description,
  count,
  hint,
}: {
  title: string;
  description: string;
  count: number;
  hint: string;
}) {
  return (
    <div className="rounded-2xl border border-[var(--border)] bg-[var(--background-card)] p-5">
      <p className="text-xs font-semibold uppercase tracking-[0.08em] text-[var(--foreground-muted)]">
        CTR 구간
      </p>
      <h3 className="mt-2 text-base font-semibold text-[var(--foreground)]">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{description}</p>
      <p className="mt-3 text-2xl font-bold text-[var(--foreground)]">{formatNumber(count)}</p>
      <p className="mt-2 text-sm text-[var(--foreground-muted)]">{hint}</p>
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

function buildCandidates(
  topCtaPages: Array<{ path: string; label: string; eventCount: number }>,
  topCtaEvents: Array<{ label: string; eventCount: number }>,
) {
  const pathCounts = new Map<string, number>();

  for (const row of topCtaPages) {
    pathCounts.set(row.path, (pathCounts.get(row.path) ?? 0) + row.eventCount);
  }

  const sortedPaths = [...pathCounts.entries()].sort((a, b) => a[1] - b[1]);
  const weakestPath = sortedPaths[0];
  const strongestPath = [...pathCounts.entries()].sort((a, b) => b[1] - a[1])[0];
  const weakestEvent = [...topCtaEvents].sort((a, b) => a.eventCount - b.eventCount)[0];

  const candidates: Array<{ title: string; body: string; metric: string }> = [];

  if (weakestPath) {
    candidates.push({
      title: `${weakestPath[0]} 구간 CTA 조정`,
      body:
        "최근 30일 기준 클릭이 가장 약한 페이지입니다. 첫 CTA 문구를 더 직접적으로 바꾸거나, 첫 버튼만 시각적으로 더 강조하는 실험이 우선순위가 높습니다.",
      metric: `최근 30일 클릭 ${formatNumber(weakestPath[1])}`,
    });
  }

  if (weakestEvent) {
    candidates.push({
      title: `${weakestEvent.label} 문구 점검`,
      body:
        "이벤트 단위로 봤을 때 반응이 가장 약합니다. 버튼 텍스트를 더 짧은 명령형으로 줄이거나, 같은 의미의 CTA가 여러 곳에 퍼져 있다면 하나만 더 강하게 남기는 편이 좋습니다.",
      metric: `최근 30일 클릭 ${formatNumber(weakestEvent.eventCount)}`,
    });
  }

  if (strongestPath) {
    candidates.push({
      title: `${strongestPath[0]} 패턴 복제`,
      body:
        "이미 클릭이 잘 나오는 구간입니다. 여기서 쓰는 문구 구조와 CTA 배치를 클릭이 약한 구간에 복제하는 방식이 가장 빠른 개선 루프입니다.",
      metric: `최근 30일 클릭 ${formatNumber(strongestPath[1])}`,
    });
  }

  return candidates.slice(0, 3);
}

function buildSegmentSnapshots(topCtaPages: Array<{ path: string; label: string; eventCount: number }>) {
  const segments = [
    {
      key: "search",
      title: "검색 페이지",
      description: "검색 시작 카드, 검색 결과 요약, 결과 없음 CTA 클릭",
      hint: "약하면 검색 전 시작 카드와 결과 없음 CTA 문구를 먼저 손보면 됩니다.",
      match: (path: string) => path === "/search",
    },
    {
      key: "brand",
      title: "브랜드 허브",
      description: "브랜드 상단 CTA와 브랜드 빠른 링크 클릭",
      hint: "약하면 상단 첫 CTA를 더 짧고 직접적으로 바꾸는 편이 좋습니다.",
      match: (path: string) => path.startsWith("/brands/"),
    },
    {
      key: "topic",
      title: "토픽 허브",
      description: "토픽 상단 CTA, 빠른 링크, 관련 허브 클릭",
      hint: "약하면 첫 CTA를 `비교 시작하기`처럼 더 짧은 명령형으로 유지하는 편이 좋습니다.",
      match: (path: string) => path.startsWith("/topics/"),
    },
    {
      key: "detail",
      title: "제품 상세",
      description: "구매 채널 아래 CTA와 하단 복귀 CTA 클릭",
      hint: "약하면 `비교함에 넣기`만 더 강하게 보이도록 우선순위를 벌리는 편이 좋습니다.",
      match: (path: string) => path.startsWith("/product/"),
    },
  ];

  return segments.map((segment) => ({
    ...segment,
    count: topCtaPages
      .filter((row) => segment.match(row.path))
      .reduce((sum, row) => sum + row.eventCount, 0),
  }));
}

function buildFocusedExperiments(topCtaPages: Array<{ path: string; label: string; eventCount: number }>) {
  const searchCount = topCtaPages
    .filter((row) => row.path === "/search")
    .reduce((sum, row) => sum + row.eventCount, 0);

  const detailCount = topCtaPages
    .filter((row) => row.path.startsWith("/product/"))
    .reduce((sum, row) => sum + row.eventCount, 0);

  return [
    {
      key: "search_result_summary",
      title: "검색 결과 요약 CTA",
      description: "검색 결과 상단의 `전체 보기`, `비교 시작`, `추천 받기` 반응을 보는 구간",
      count: searchCount,
      hint:
        "검색 유입이 많은데 클릭이 약하면 `비교 시작`을 첫 버튼으로 올리거나, 첫 버튼만 강조색으로 바꾸는 실험이 적절합니다.",
    },
    {
      key: "product_detail_after_purchase",
      title: "상세 구매 후 CTA",
      description: "제품 상세에서 구매 채널 아래 `비교함에 넣기`, `같은 카테고리 보기` 반응을 보는 구간",
      count: detailCount,
      hint:
        "상세 클릭은 많은데 전환이 약하면 `비교함에 넣기`만 더 크게 보이게 만들거나 두 버튼 간 시각적 우선순위를 더 벌리는 편이 좋습니다.",
    },
  ];
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
            방문과 CTA 클릭 통계를 최근 시간 기준으로 확인합니다.
          </p>
        </div>

        <StatusBox
          title="GA4 설정이 필요합니다"
          description="관리자 통계를 보려면 서버 환경변수에 GA4 조회용 설정이 들어 있어야 합니다."
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
            현재 비어 있는 값: {stats.missingEnv.join(", ")}
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
            방문과 CTA 클릭 통계를 최근 시간 기준으로 확인합니다.
          </p>
        </div>

        <StatusBox title="통계를 불러오지 못했습니다" description={stats.message}>
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

  if (stats.state !== "ready") return null;

  const summaryCards = [
    { label: "오늘 방문자", value: formatNumber(stats.todayVisitors) },
    { label: "오늘 페이지뷰", value: formatNumber(stats.todayPageViews) },
    { label: "최근 7일 방문자", value: formatNumber(stats.last7DaysVisitors) },
    { label: "최근 30일 CTA 클릭", value: formatNumber(stats.last30DaysCtaClicks) },
  ];

  const candidates = buildCandidates(stats.topCtaPages, stats.topCtaEvents);
  const segmentSnapshots = buildSegmentSnapshots(stats.topCtaPages);
  const focusedExperiments = buildFocusedExperiments(stats.topCtaPages);

  return (
    <div className="mx-auto max-w-6xl p-6">
      <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-[var(--foreground)]">통계</h1>
          <p className="mt-0.5 text-sm text-[var(--foreground-muted)]">
            방문, 페이지뷰, CTA 클릭 흐름을 최근 기준으로 확인합니다.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3 text-xs text-[var(--foreground-muted)]">
          <span>마지막 동기화: {stats.lastSyncedAt}</span>
          {stats.isStale ? (
            <span className="rounded-full bg-[#FFF1E6] px-2.5 py-1 text-[#F08A24]">캐시 데이터</span>
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
          <div key={card.label} className="rounded-2xl border border-[var(--border)] bg-[var(--background-card)] p-4">
            <p className="text-xs text-[var(--foreground-muted)]">{card.label}</p>
            <p className="mt-1 text-3xl font-bold text-[var(--foreground)]">{card.value}</p>
          </div>
        ))}
      </div>

      {candidates.length > 0 ? (
        <div className="mt-6 grid gap-4 xl:grid-cols-3">
          {candidates.map((candidate) => (
            <CandidateCard
              key={`${candidate.title}-${candidate.metric}`}
              title={candidate.title}
              body={candidate.body}
              metric={candidate.metric}
            />
          ))}
        </div>
      ) : null}

      <div className="mt-6 grid gap-4 xl:grid-cols-2">
        {focusedExperiments.map((segment) => (
          <SegmentCard
            key={segment.key}
            title={segment.title}
            description={segment.description}
            count={segment.count}
            hint={segment.hint}
          />
        ))}
      </div>

      <div className="mt-6 grid gap-4 xl:grid-cols-4">
        {segmentSnapshots.map((segment) => (
          <SegmentCard
            key={segment.key}
            title={segment.title}
            description={segment.description}
            count={segment.count}
            hint={segment.hint}
          />
        ))}
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.25fr_1fr]">
        <section className="rounded-2xl border border-[var(--border)] bg-[var(--background-card)] p-5">
          <div className="mb-4">
            <h2 className="text-base font-semibold text-[var(--foreground)]">날짜별 방문 추이</h2>
            <p className="mt-1 text-xs text-[var(--foreground-muted)]">최근 14일</p>
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
            <p className="text-sm text-[var(--foreground-muted)]">표시할 추이 데이터가 없습니다.</p>
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

      <div className="mt-6 grid gap-6 xl:grid-cols-2">
        <section className="rounded-2xl border border-[var(--border)] bg-[var(--background-card)] p-5">
          <h2 className="text-base font-semibold text-[var(--foreground)]">CTR 이벤트 Top 10</h2>
          <p className="mt-1 text-xs text-[var(--foreground-muted)]">최근 30일 클릭 이벤트 기준</p>
          {stats.topCtaEvents.length > 0 ? (
            <div className="mt-4 overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)] text-left text-xs text-[var(--foreground-muted)]">
                    <th className="pb-3 pr-4">순위</th>
                    <th className="pb-3 pr-4">이벤트</th>
                    <th className="pb-3 text-right">클릭 수</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.topCtaEvents.map((row) => (
                    <tr key={`${row.rank}-${row.eventName}`} className="border-t border-[var(--border)]">
                      <td className="py-3 pr-4 font-medium text-[var(--foreground)]">{row.rank}</td>
                      <td className="py-3 pr-4 text-[var(--foreground)]">{row.label}</td>
                      <td className="py-3 text-right font-medium text-[var(--foreground)]">
                        {formatNumber(row.eventCount)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="mt-4 text-sm text-[var(--foreground-muted)]">표시할 CTR 이벤트 데이터가 없습니다.</p>
          )}
        </section>

        <section className="rounded-2xl border border-[var(--border)] bg-[var(--background-card)] p-5">
          <h2 className="text-base font-semibold text-[var(--foreground)]">CTR 발생 페이지 Top 12</h2>
          <p className="mt-1 text-xs text-[var(--foreground-muted)]">최근 30일 페이지 경로 + 클릭 이벤트 기준</p>
          {stats.topCtaPages.length > 0 ? (
            <div className="mt-4 overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b border-[var(--border)] text-left text-xs text-[var(--foreground-muted)]">
                    <th className="pb-3 pr-4">순위</th>
                    <th className="pb-3 pr-4">페이지</th>
                    <th className="pb-3 pr-4">이벤트</th>
                    <th className="pb-3 text-right">클릭 수</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.topCtaPages.map((row) => (
                    <tr key={`${row.rank}-${row.path}-${row.eventName}`} className="border-t border-[var(--border)]">
                      <td className="py-3 pr-4 font-medium text-[var(--foreground)]">{row.rank}</td>
                      <td className="py-3 pr-4 text-[var(--foreground)]">{row.path}</td>
                      <td className="py-3 pr-4 text-[var(--foreground-muted)]">{row.label}</td>
                      <td className="py-3 text-right font-medium text-[var(--foreground)]">
                        {formatNumber(row.eventCount)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="mt-4 text-sm text-[var(--foreground-muted)]">표시할 CTR 페이지 데이터가 없습니다.</p>
          )}
        </section>
      </div>
    </div>
  );
}
