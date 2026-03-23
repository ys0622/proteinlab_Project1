import { NextResponse } from "next/server";

const MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID?.trim() ?? "";
const API_SECRET = process.env.GA4_API_SECRET?.trim() ?? "";

type AnalyticsRequestBody = {
  name?: unknown;
  params?: unknown;
  clientId?: unknown;
  sessionId?: unknown;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export async function POST(request: Request) {
  if (!MEASUREMENT_ID || !API_SECRET) {
    return NextResponse.json({ ok: true, skipped: "missing_env" }, { status: 202 });
  }

  let body: AnalyticsRequestBody;
  try {
    body = (await request.json()) as AnalyticsRequestBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const params = isRecord(body.params) ? body.params : {};
  const clientId = typeof body.clientId === "string" ? body.clientId.trim() : "";
  const sessionId = typeof body.sessionId === "string" ? body.sessionId.trim() : "";

  if (!name || !clientId || !sessionId) {
    return NextResponse.json({ error: "Missing required analytics fields" }, { status: 400 });
  }

  const payload = {
    client_id: clientId,
    events: [
      {
        name,
        params: {
          ...params,
          session_id: sessionId,
          engagement_time_msec: 1,
        },
      },
    ],
  };

  const response = await fetch(
    `https://www.google-analytics.com/mp/collect?measurement_id=${encodeURIComponent(MEASUREMENT_ID)}&api_secret=${encodeURIComponent(API_SECRET)}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "User-Agent": request.headers.get("user-agent") ?? "ProteinLab-Analytics/1.0",
      },
      body: JSON.stringify(payload),
    },
  );

  if (!response.ok) {
    return NextResponse.json({ error: "GA4 forwarding failed" }, { status: 502 });
  }

  return new NextResponse(null, { status: 204 });
}
