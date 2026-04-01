type Ga4MetricValue = { value?: string };
type Ga4DimensionValue = { value?: string };

type Ga4Row = {
  dimensionValues?: Ga4DimensionValue[];
  metricValues?: Ga4MetricValue[];
};

type Ga4ReportResponse = {
  rows?: Ga4Row[];
  rowCount?: number;
};

type Ga4BatchResponse = {
  reports?: Ga4ReportResponse[];
};

type Ga4Config = {
  propertyId: string;
  clientEmail: string;
  privateKey: string;
};

type CacheEntry = {
  data: AdminStatsData;
  expiresAt: number;
  staleUntil: number;
};

const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";
const GOOGLE_ANALYTICS_DATA_API = "https://analyticsdata.googleapis.com/v1beta";
const GA_SCOPE = "https://www.googleapis.com/auth/analytics.readonly";
const KST_TIME_ZONE = "Asia/Seoul";
const CACHE_TTL_MS = 5 * 60 * 1000;
const STALE_TTL_MS = 30 * 60 * 1000;
const CTR_EVENT_NAMES = [
  "product_click",
  "purchase_click",
  "internal_link_click",
  "compare_export_click",
  "compare_share_click",
  "compare_reset_click",
] as const;

let statsCache: CacheEntry | null = null;
let inFlightStatsRequest: Promise<AdminStatsData> | null = null;

function toBase64Url(input: string | Uint8Array): string {
  const buffer = typeof input === "string" ? Buffer.from(input, "utf8") : Buffer.from(input);
  return buffer.toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function pemToArrayBuffer(pem: string): ArrayBuffer {
  const normalized = pem
    .replace(/-----BEGIN PRIVATE KEY-----/g, "")
    .replace(/-----END PRIVATE KEY-----/g, "")
    .replace(/\s+/g, "");

  const binary = Buffer.from(normalized, "base64");
  return binary.buffer.slice(binary.byteOffset, binary.byteOffset + binary.byteLength);
}

function getKstDateString(date: Date): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: KST_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

function shiftDate(dateString: string, days: number): string {
  const [year, month, day] = dateString.split("-").map(Number);
  const shifted = new Date(Date.UTC(year, month - 1, day + days));
  return shifted.toISOString().slice(0, 10);
}

function formatKstLabel(dateString: string) {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Intl.DateTimeFormat("ko-KR", {
    timeZone: KST_TIME_ZONE,
    month: "numeric",
    day: "numeric",
    weekday: "short",
  }).format(new Date(Date.UTC(year, month - 1, day)));
}

function formatSyncTime(date: Date) {
  return new Intl.DateTimeFormat("ko-KR", {
    timeZone: KST_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(date);
}

function getGa4Config():
  | { configured: false; missingEnv: Array<"GA4_PROPERTY_ID" | "GA4_CLIENT_EMAIL" | "GA4_PRIVATE_KEY"> }
  | ({ configured: true } & Ga4Config) {
  const propertyId = process.env.GA4_PROPERTY_ID?.trim();
  const clientEmail = process.env.GA4_CLIENT_EMAIL?.trim();
  const privateKey = process.env.GA4_PRIVATE_KEY?.replace(/\\n/g, "\n").trim();

  const missingEnv = [
    !propertyId ? "GA4_PROPERTY_ID" : null,
    !clientEmail ? "GA4_CLIENT_EMAIL" : null,
    !privateKey ? "GA4_PRIVATE_KEY" : null,
  ].filter(Boolean) as Array<"GA4_PROPERTY_ID" | "GA4_CLIENT_EMAIL" | "GA4_PRIVATE_KEY">;

  if (missingEnv.length > 0) {
    return { configured: false, missingEnv };
  }

  return {
    configured: true,
    propertyId: propertyId!,
    clientEmail: clientEmail!,
    privateKey: privateKey!,
  };
}

function createErrorMessage(status: number, responseText: string) {
  if (status === 400) return "GA4 속성 ID 또는 요청 형식이 올바르지 않습니다.";
  if (status === 401) return "GA4 인증에 실패했습니다. 서비스 계정 키를 다시 확인해주세요.";
  if (status === 403) return "서비스 계정에 GA4 읽기 권한이 없습니다.";
  if (status === 404) return "GA4 Property를 찾지 못했습니다. GA4_PROPERTY_ID를 확인해주세요.";
  if (status === 429) return "GA4 API 호출 한도에 도달했습니다. 잠시 후 다시 시도해주세요.";
  if (status >= 500) return "Google Analytics 응답이 일시적으로 불안정합니다. 잠시 후 다시 시도해주세요.";
  if (/permission|access|forbidden/i.test(responseText)) return "서비스 계정에 GA4 읽기 권한이 없습니다.";
  return "GA4 통계를 불러오는 중 오류가 발생했습니다.";
}

async function getAccessToken(clientEmail: string, privateKey: string) {
  const nowInSeconds = Math.floor(Date.now() / 1000);
  const unsignedToken = `${toBase64Url(JSON.stringify({ alg: "RS256", typ: "JWT" }))}.${toBase64Url(
    JSON.stringify({
      iss: clientEmail,
      scope: GA_SCOPE,
      aud: GOOGLE_TOKEN_URL,
      exp: nowInSeconds + 3600,
      iat: nowInSeconds,
    }),
  )}`;

  const key = await crypto.subtle.importKey(
    "pkcs8",
    pemToArrayBuffer(privateKey),
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"],
  );

  const signature = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    key,
    new TextEncoder().encode(unsignedToken),
  );

  const assertion = `${unsignedToken}.${toBase64Url(new Uint8Array(signature))}`;

  const response = await fetch(GOOGLE_TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(createErrorMessage(response.status, text));
  }

  const data = (await response.json()) as { access_token?: string };
  if (!data.access_token) throw new Error("Google access token response did not include access_token.");
  return data.access_token;
}

async function runBatchReports(propertyId: string, accessToken: string, requests: Array<Record<string, unknown>>) {
  const response = await fetch(`${GOOGLE_ANALYTICS_DATA_API}/properties/${propertyId}:batchRunReports`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ requests }),
    cache: "no-store",
  });

  if (!response.ok) {
    const text = await response.text();
    console.error("[ga4] batchRunReports failed", { status: response.status, body: text.slice(0, 500), propertyId });
    throw new Error(createErrorMessage(response.status, text));
  }

  return (await response.json()) as Ga4BatchResponse;
}

function readMetric(report: Ga4ReportResponse | undefined, rowIndex: number, metricIndex: number) {
  return Number(report?.rows?.[rowIndex]?.metricValues?.[metricIndex]?.value ?? 0);
}

function sanitizePagePath(path: string | undefined) {
  if (!path || path === "(not set)") return "경로 없음";
  return path;
}

function sanitizeSourceMedium(source: string | undefined, medium: string | undefined) {
  const safeSource = !source || source === "(not set)" ? "direct" : source;
  const safeMedium = !medium || medium === "(not set)" ? "none" : medium;
  return `${safeSource} / ${safeMedium}`;
}

function formatEventLabel(eventName: string | undefined) {
  switch (eventName ?? "") {
    case "product_click":
      return "제품 클릭";
    case "purchase_click":
      return "구매 CTA 클릭";
    case "internal_link_click":
      return "내부 링크 클릭";
    case "compare_export_click":
      return "비교표 CSV 내보내기";
    case "compare_share_click":
      return "비교표 공유 링크 복사";
    case "compare_reset_click":
      return "비교표 초기화";
    default:
      return eventName || "이벤트 없음";
  }
}

function buildDailyRows(report: Ga4ReportResponse | undefined) {
  return (report?.rows ?? [])
    .map((row) => {
      const rawDate = row.dimensionValues?.[0]?.value ?? "";
      const isoDate = rawDate ? `${rawDate.slice(0, 4)}-${rawDate.slice(4, 6)}-${rawDate.slice(6, 8)}` : "";
      return {
        date: isoDate,
        label: isoDate ? formatKstLabel(isoDate) : "-",
        visitors: Number(row.metricValues?.[0]?.value ?? 0),
        pageViews: Number(row.metricValues?.[1]?.value ?? 0),
      };
    })
    .sort((a, b) => a.date.localeCompare(b.date));
}

function buildTopPages(report: Ga4ReportResponse | undefined) {
  return (report?.rows ?? []).map((row, index) => ({
    rank: index + 1,
    path: sanitizePagePath(row.dimensionValues?.[0]?.value),
    pageViews: Number(row.metricValues?.[0]?.value ?? 0),
  }));
}

function buildTopSources(report: Ga4ReportResponse | undefined) {
  return (report?.rows ?? []).map((row, index) => ({
    rank: index + 1,
    sourceMedium: sanitizeSourceMedium(row.dimensionValues?.[0]?.value, row.dimensionValues?.[1]?.value),
    visitors: Number(row.metricValues?.[0]?.value ?? 0),
  }));
}

function buildTopCtaEvents(report: Ga4ReportResponse | undefined) {
  return (report?.rows ?? []).map((row, index) => {
    const eventName = row.dimensionValues?.[0]?.value ?? "";
    return {
      rank: index + 1,
      eventName,
      label: formatEventLabel(eventName),
      eventCount: Number(row.metricValues?.[0]?.value ?? 0),
    };
  });
}

function buildTopCtaPages(report: Ga4ReportResponse | undefined) {
  return (report?.rows ?? []).map((row, index) => {
    const path = row.dimensionValues?.[0]?.value;
    const eventName = row.dimensionValues?.[1]?.value;
    return {
      rank: index + 1,
      path: sanitizePagePath(path),
      eventName: eventName ?? "",
      label: formatEventLabel(eventName),
      eventCount: Number(row.metricValues?.[0]?.value ?? 0),
    };
  });
}

function buildEventNameFilterExpression() {
  return {
    filter: {
      fieldName: "eventName",
      inListFilter: { values: [...CTR_EVENT_NAMES] },
    },
  };
}

export type AdminStatsData =
  | {
      state: "missing_config";
      configured: false;
      missingEnv: Array<"GA4_PROPERTY_ID" | "GA4_CLIENT_EMAIL" | "GA4_PRIVATE_KEY">;
      message: string;
    }
  | {
      state: "error";
      configured: true;
      message: string;
      lastSyncedAt: string | null;
      isStale: boolean;
      usingTimeZone: string;
    }
  | {
      state: "ready";
      configured: true;
      message: string | null;
      usingTimeZone: string;
      lastSyncedAt: string;
      isStale: boolean;
      todayVisitors: number;
      todayPageViews: number;
      last7DaysVisitors: number;
      last30DaysPageViews: number;
      last30DaysCtaClicks: number;
      dailyTrend: Array<{ date: string; label: string; visitors: number; pageViews: number }>;
      topPages: Array<{ rank: number; path: string; pageViews: number }>;
      topSources: Array<{ rank: number; sourceMedium: string; visitors: number }>;
      topCtaEvents: Array<{ rank: number; eventName: string; label: string; eventCount: number }>;
      topCtaPages: Array<{ rank: number; path: string; eventName: string; label: string; eventCount: number }>;
    };

async function fetchGa4DashboardData(config: Ga4Config): Promise<AdminStatsData> {
  const today = getKstDateString(new Date());
  const last7Start = shiftDate(today, -6);
  const last14Start = shiftDate(today, -13);
  const last30Start = shiftDate(today, -29);
  const accessToken = await getAccessToken(config.clientEmail, config.privateKey);

  const summaryBatch = await runBatchReports(config.propertyId, accessToken, [
    { dateRanges: [{ startDate: today, endDate: today }], metrics: [{ name: "activeUsers" }] },
    { dateRanges: [{ startDate: today, endDate: today }], metrics: [{ name: "screenPageViews" }] },
    { dateRanges: [{ startDate: last7Start, endDate: today }], metrics: [{ name: "activeUsers" }] },
    { dateRanges: [{ startDate: last30Start, endDate: today }], metrics: [{ name: "screenPageViews" }] },
    {
      dateRanges: [{ startDate: last14Start, endDate: today }],
      dimensions: [{ name: "date" }],
      metrics: [{ name: "activeUsers" }, { name: "screenPageViews" }],
      orderBys: [{ dimension: { dimensionName: "date" } }],
    },
    {
      dateRanges: [{ startDate: last30Start, endDate: today }],
      metrics: [{ name: "eventCount" }],
      dimensionFilter: buildEventNameFilterExpression(),
    },
  ]);

  const detailBatch = await runBatchReports(config.propertyId, accessToken, [
    {
      dateRanges: [{ startDate: last30Start, endDate: today }],
      dimensions: [{ name: "pagePath" }],
      metrics: [{ name: "screenPageViews" }],
      orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
      limit: 10,
    },
    {
      dateRanges: [{ startDate: last30Start, endDate: today }],
      dimensions: [{ name: "sessionSource" }, { name: "sessionMedium" }],
      metrics: [{ name: "activeUsers" }],
      orderBys: [{ metric: { metricName: "activeUsers" }, desc: true }],
      limit: 10,
    },
    {
      dateRanges: [{ startDate: last30Start, endDate: today }],
      dimensions: [{ name: "eventName" }],
      metrics: [{ name: "eventCount" }],
      dimensionFilter: buildEventNameFilterExpression(),
      orderBys: [{ metric: { metricName: "eventCount" }, desc: true }],
      limit: 10,
    },
    {
      dateRanges: [{ startDate: last30Start, endDate: today }],
      dimensions: [{ name: "pagePath" }, { name: "eventName" }],
      metrics: [{ name: "eventCount" }],
      dimensionFilter: buildEventNameFilterExpression(),
      orderBys: [{ metric: { metricName: "eventCount" }, desc: true }],
      limit: 12,
    },
  ]);

  return {
    state: "ready",
    configured: true,
    message: null,
    usingTimeZone: KST_TIME_ZONE,
    lastSyncedAt: formatSyncTime(new Date()),
    isStale: false,
    todayVisitors: readMetric(summaryBatch.reports?.[0], 0, 0),
    todayPageViews: readMetric(summaryBatch.reports?.[1], 0, 0),
    last7DaysVisitors: readMetric(summaryBatch.reports?.[2], 0, 0),
    last30DaysPageViews: readMetric(summaryBatch.reports?.[3], 0, 0),
    dailyTrend: buildDailyRows(summaryBatch.reports?.[4]),
    last30DaysCtaClicks: readMetric(summaryBatch.reports?.[5], 0, 0),
    topPages: buildTopPages(detailBatch.reports?.[0]),
    topSources: buildTopSources(detailBatch.reports?.[1]),
    topCtaEvents: buildTopCtaEvents(detailBatch.reports?.[2]),
    topCtaPages: buildTopCtaPages(detailBatch.reports?.[3]),
  };
}

export async function getAdminStats(options?: { forceRefresh?: boolean }): Promise<AdminStatsData> {
  const forceRefresh = options?.forceRefresh === true;
  const config = getGa4Config();

  if (!config.configured) {
    return {
      state: "missing_config",
      configured: false,
      missingEnv: config.missingEnv,
      message: "관리자 통계를 사용하려면 Cloudflare secret/env에 GA4 조회용 환경변수를 설정해야 합니다.",
    };
  }

  const now = Date.now();
  if (!forceRefresh && statsCache && now < statsCache.expiresAt) return statsCache.data;
  if (!forceRefresh && inFlightStatsRequest) return inFlightStatsRequest;

  inFlightStatsRequest = (async () => {
    try {
      const data = await fetchGa4DashboardData(config);
      statsCache = { data, expiresAt: now + CACHE_TTL_MS, staleUntil: now + STALE_TTL_MS };
      return data;
    } catch (error) {
      const message = error instanceof Error ? error.message : "GA4 통계를 불러오는 중 알 수 없는 오류가 발생했습니다.";
      console.error("[ga4] dashboard stats failed", { message, propertyId: config.propertyId });

      if (statsCache && now < statsCache.staleUntil && statsCache.data.state === "ready") {
        return { ...statsCache.data, isStale: true, message: "실시간 조회에 실패해 최근 성공 데이터를 대신 표시합니다." };
      }

      return {
        state: "error",
        configured: true,
        message,
        lastSyncedAt: statsCache?.data.state === "ready" ? statsCache.data.lastSyncedAt : null,
        isStale: false,
        usingTimeZone: KST_TIME_ZONE,
      } satisfies AdminStatsData;
    } finally {
      inFlightStatsRequest = null;
    }
  })();

  return inFlightStatsRequest;
}
