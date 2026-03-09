type Ga4MetricValue = {
  value?: string;
};

type Ga4DimensionValue = {
  value?: string;
};

type Ga4Row = {
  dimensionValues?: Ga4DimensionValue[];
  metricValues?: Ga4MetricValue[];
};

type Ga4ReportResponse = {
  rows?: Ga4Row[];
};

const GOOGLE_TOKEN_URL = "https://oauth2.googleapis.com/token";
const GOOGLE_ANALYTICS_DATA_API = "https://analyticsdata.googleapis.com/v1beta";
const KST_TIME_ZONE = "Asia/Seoul";

function toBase64Url(input: string | Uint8Array): string {
  const buffer =
    typeof input === "string" ? Buffer.from(input, "utf8") : Buffer.from(input);

  return buffer
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
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
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: KST_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  return formatter.format(date);
}

function shiftDate(dateString: string, days: number): string {
  const [year, month, day] = dateString.split("-").map(Number);
  const shifted = new Date(Date.UTC(year, month - 1, day + days));
  return shifted.toISOString().slice(0, 10);
}

function getCurrentKstYearMonth() {
  const now = new Date();
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: KST_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
  });
  const [year, month] = formatter.format(now).split("-");

  return { year, month };
}

function getGa4Config() {
  const propertyId = process.env.GA4_PROPERTY_ID;
  const clientEmail = process.env.GA4_CLIENT_EMAIL;
  const privateKey = process.env.GA4_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!propertyId || !clientEmail || !privateKey) {
    return null;
  }

  return {
    propertyId,
    clientEmail,
    privateKey,
  };
}

async function getAccessToken(clientEmail: string, privateKey: string) {
  const nowInSeconds = Math.floor(Date.now() / 1000);
  const header = { alg: "RS256", typ: "JWT" };
  const payload = {
    iss: clientEmail,
    scope: "https://www.googleapis.com/auth/analytics.readonly",
    aud: GOOGLE_TOKEN_URL,
    exp: nowInSeconds + 3600,
    iat: nowInSeconds,
  };

  const unsignedToken = `${toBase64Url(JSON.stringify(header))}.${toBase64Url(
    JSON.stringify(payload)
  )}`;
  const key = await crypto.subtle.importKey(
    "pkcs8",
    pemToArrayBuffer(privateKey),
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    key,
    new TextEncoder().encode(unsignedToken)
  );
  const assertion = `${unsignedToken}.${toBase64Url(new Uint8Array(signature))}`;

  const response = await fetch(GOOGLE_TOKEN_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to get Google access token: ${await response.text()}`);
  }

  const data = (await response.json()) as { access_token?: string };
  if (!data.access_token) {
    throw new Error("Google access token response did not include access_token");
  }

  return data.access_token;
}

async function runReport(
  propertyId: string,
  accessToken: string,
  body: Record<string, unknown>
): Promise<Ga4ReportResponse> {
  const response = await fetch(
    `${GOOGLE_ANALYTICS_DATA_API}/properties/${propertyId}:runReport`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to run GA4 report: ${await response.text()}`);
  }

  return (await response.json()) as Ga4ReportResponse;
}

function readMetricValue(report: Ga4ReportResponse): number {
  return Number(report.rows?.[0]?.metricValues?.[0]?.value ?? 0);
}

function buildMonthlyRows(report: Ga4ReportResponse) {
  const { month: currentMonth } = getCurrentKstYearMonth();
  const currentMonthNumber = Number(currentMonth);
  const monthMap = new Map<number, number>();

  for (const row of report.rows ?? []) {
    const month = Number(row.dimensionValues?.[0]?.value ?? 0);
    const visitors = Number(row.metricValues?.[0]?.value ?? 0);
    if (month >= 1 && month <= 12) {
      monthMap.set(month, visitors);
    }
  }

  return Array.from({ length: currentMonthNumber }, (_, index) => {
    const month = index + 1;
    return {
      month,
      label: `${month}월`,
      visitors: monthMap.get(month) ?? 0,
    };
  });
}

export type VisitorStats = {
  todayVisitors: number;
  last7DaysVisitors: number;
  last30DaysVisitors: number;
  monthlyVisitors: Array<{
    month: number;
    label: string;
    visitors: number;
  }>;
  usingTimeZone: string;
  configured: boolean;
};

export async function getVisitorStats(): Promise<VisitorStats> {
  const config = getGa4Config();
  if (!config) {
    return {
      todayVisitors: 0,
      last7DaysVisitors: 0,
      last30DaysVisitors: 0,
      monthlyVisitors: [],
      usingTimeZone: KST_TIME_ZONE,
      configured: false,
    };
  }

  const today = getKstDateString(new Date());
  const weekStart = shiftDate(today, -6);
  const last30DaysStart = shiftDate(today, -29);
  const { year } = getCurrentKstYearMonth();
  const accessToken = await getAccessToken(config.clientEmail, config.privateKey);

  const [todayReport, weeklyReport, last30DaysReport, monthlyReport] = await Promise.all([
    runReport(config.propertyId, accessToken, {
      dateRanges: [{ startDate: today, endDate: today }],
      metrics: [{ name: "activeUsers" }],
    }),
    runReport(config.propertyId, accessToken, {
      dateRanges: [{ startDate: weekStart, endDate: today }],
      metrics: [{ name: "activeUsers" }],
    }),
    runReport(config.propertyId, accessToken, {
      dateRanges: [{ startDate: last30DaysStart, endDate: today }],
      metrics: [{ name: "activeUsers" }],
    }),
    runReport(config.propertyId, accessToken, {
      dateRanges: [{ startDate: `${year}-01-01`, endDate: today }],
      dimensions: [{ name: "month" }],
      metrics: [{ name: "activeUsers" }],
      orderBys: [
        {
          dimension: {
            dimensionName: "month",
            orderType: "NUMERIC",
          },
        },
      ],
    }),
  ]);

  return {
    todayVisitors: readMetricValue(todayReport),
    last7DaysVisitors: readMetricValue(weeklyReport),
    last30DaysVisitors: readMetricValue(last30DaysReport),
    monthlyVisitors: buildMonthlyRows(monthlyReport),
    usingTimeZone: KST_TIME_ZONE,
    configured: true,
  };
}
