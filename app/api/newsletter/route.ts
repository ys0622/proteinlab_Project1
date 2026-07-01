import { NextRequest, NextResponse } from "next/server";

// Cloudflare 환경에서는 파일시스템 쓰기 불가.
// NEWSLETTER_WEBHOOK_URL env var에 Notion API / Google Sheets webhook / Zapier webhook 등을 연결.
// 없으면 단순히 성공 응답만 반환 (이메일 수집 준비 단계).

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "이메일을 입력해주세요." }, { status: 400 });
    }

    const trimmed = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmed)) {
      return NextResponse.json({ error: "올바른 이메일 형식이 아닙니다." }, { status: 400 });
    }

    const webhookUrl = process.env.NEWSLETTER_WEBHOOK_URL;
    if (webhookUrl) {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: trimmed,
          source: req.headers.get("referer") ?? "unknown",
          timestamp: new Date().toISOString(),
        }),
      });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "잠시 후 다시 시도해주세요." }, { status: 500 });
  }
}
