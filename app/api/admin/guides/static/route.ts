import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySessionToken } from "@/app/lib/session";
import guidesStaticData from "@/app/data/guidesStaticData.json";

async function verifyAdmin(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get("proteinlab_session")?.value;
  if (!token) return false;
  return verifySessionToken(token);
}

export async function GET() {
  if (!(await verifyAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json(guidesStaticData);
}

export async function PUT() {
  if (!(await verifyAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json(
    { error: "파일 쓰기는 Cloudflare Workers에서 지원되지 않습니다. 로컬 서버를 사용하세요." },
    { status: 501 }
  );
}
