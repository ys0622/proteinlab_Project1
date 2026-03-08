import { NextResponse } from "next/server";

async function createSessionToken(): Promise<string> {
  const timestamp = Date.now().toString();
  const secret = process.env.SESSION_SECRET ?? "proteinlab-session-secret-change-me";
  const encoder = new TextEncoder();
  const keyData = encoder.encode(secret);
  const key = await crypto.subtle.importKey(
    "raw",
    keyData,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(timestamp));
  const hmac = Array.from(new Uint8Array(signature))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
  return `${timestamp}.${hmac}`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { password } = body;

    const adminPassword = process.env.ADMIN_PASSWORD;
    if (!adminPassword) {
      return NextResponse.json(
        { error: "서버 설정 오류: ADMIN_PASSWORD 환경변수가 설정되지 않았습니다." },
        { status: 500 }
      );
    }

    if (!password || password !== adminPassword) {
      // Short delay to slow brute force
      await new Promise((r) => setTimeout(r, 400));
      return NextResponse.json(
        { error: "비밀번호가 올바르지 않습니다." },
        { status: 401 }
      );
    }

    const token = await createSessionToken();
    const response = NextResponse.json({ ok: true });
    response.cookies.set("proteinlab_session", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 86400, // 24h
      path: "/",
    });
    return response;
  } catch (err) {
    console.error("[admin/login]", err);
    return NextResponse.json(
      { error: "요청 처리 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
