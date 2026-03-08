import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySessionToken } from "@/app/lib/session";

async function verifyAdmin(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get("proteinlab_session")?.value;
  if (!token) return false;
  return verifySessionToken(token);
}

export async function POST(request: Request) {
  if (!(await verifyAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const apiKey = process.env.REMOVE_BG_API_KEY;
  if (!apiKey || apiKey.trim() === "") {
    return NextResponse.json(
      { error: "REMOVE_BG_API_KEY가 설정되지 않았습니다. .env.local에 추가하세요." },
      { status: 500 }
    );
  }

  try {
    const body = await request.json();
    const { imageData } = body; // base64 data URL (data:image/...;base64,...)

    if (!imageData || typeof imageData !== "string") {
      return NextResponse.json({ error: "이미지 데이터가 필요합니다." }, { status: 400 });
    }

    // data URL에서 base64, mime 추출
    const match = imageData.match(/^data:(image\/\w+);base64,(.+)$/);
    if (!match) {
      return NextResponse.json({ error: "유효한 base64 이미지 형식이 아닙니다." }, { status: 400 });
    }
    const mime = match[1];
    const ext = mime === "image/png" ? "png" : mime === "image/webp" ? "webp" : "jpg";

    const buffer = Buffer.from(match[2], "base64");
    const blob = new Blob([buffer], { type: mime });

    const formData = new FormData();
    formData.append("image_file", blob, `image.${ext}`);
    formData.append("size", "auto");

    const rbgRes = await fetch("https://api.remove.bg/v1.0/removebg", {
      method: "POST",
      headers: {
        "X-Api-Key": apiKey.trim(),
      },
      body: formData,
    });

    if (!rbgRes.ok) {
      const errText = await rbgRes.text();
      return NextResponse.json(
        { error: `remove.bg API 오류 (${rbgRes.status}): ${errText}` },
        { status: 502 }
      );
    }

    const resultBuffer = await rbgRes.arrayBuffer();
    const resultBase64 = Buffer.from(resultBuffer).toString("base64");
    const dataUrl = `data:image/png;base64,${resultBase64}`;

    return NextResponse.json({ dataUrl });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ error: `배경 제거 실패: ${msg}` }, { status: 500 });
  }
}
