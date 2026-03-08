import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySessionToken } from "@/app/lib/session";
import guidesData from "@/app/data/guidesData.json";

async function verifyAdmin(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get("proteinlab_session")?.value;
  if (!token) return false;
  return verifySessionToken(token);
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await verifyAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const guide = (guidesData as Record<string, unknown>[]).find(
    (g) => (g as { id: string }).id === id
  );

  if (!guide) {
    return NextResponse.json({ error: "가이드를 찾을 수 없습니다." }, { status: 404 });
  }
  return NextResponse.json(guide);
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

export async function DELETE() {
  if (!(await verifyAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json(
    { error: "파일 쓰기는 Cloudflare Workers에서 지원되지 않습니다. 로컬 서버를 사용하세요." },
    { status: 501 }
  );
}
