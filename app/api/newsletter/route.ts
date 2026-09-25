import { NextRequest, NextResponse } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";

// Cloudflare 환경에서는 파일시스템 쓰기 불가.
// NEWSLETTER_WEBHOOK_URL env var에 Notion API / Google Sheets webhook / Zapier webhook 등을 연결.
// 웹훅이 없으면 예전에는 성공 응답만 하고 이메일을 버렸다. 이제는 Cloudflare KV(GUIDES_STATIC_DRAFTS_KV)에
// `newsletter:<email>` 키로 저장한다. 확인: npx wrangler kv key list --binding GUIDES_STATIC_DRAFTS_KV --prefix newsletter:

interface NewsletterKV {
  get(key: string): Promise<string | null>;
  put(key: string, value: string): Promise<void>;
}

async function saveToKV(email: string, source: string) {
  try {
    const { env } = await getCloudflareContext({ async: true });
    const kv = (env as Record<string, unknown>).GUIDES_STATIC_DRAFTS_KV as NewsletterKV | undefined;
    if (!kv) return false;
    const key = `newsletter:${email}`;
    if (await kv.get(key)) return true;
    await kv.put(key, JSON.stringify({ email, source, subscribedAt: new Date().toISOString() }));
    return true;
  } catch {
    return false;
  }
}

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

    const source = req.headers.get("referer") ?? "unknown";
    const saved = await saveToKV(trimmed, source);
    const webhookUrl = process.env.NEWSLETTER_WEBHOOK_URL;
    if (!saved && !webhookUrl) {
      return NextResponse.json({ error: "저장 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요." }, { status: 500 });
    }
    if (webhookUrl) {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: trimmed,
          source,
          timestamp: new Date().toISOString(),
        }),
      });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: "잠시 후 다시 시도해주세요." }, { status: 500 });
  }
}
