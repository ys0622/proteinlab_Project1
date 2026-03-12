import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySessionToken } from "@/app/lib/session";
import { buildAdminGuidesStaticData } from "@/app/lib/adminGuidesStatic";

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

  return NextResponse.json(buildAdminGuidesStaticData());
}

export async function PUT() {
  if (!(await verifyAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json(
    {
      error:
        "현재 배포 환경은 정적 가이드 JSON을 서버에서 직접 저장하지 않습니다. 관리자 화면에서는 Track A~F 전체 콘텐츠를 검토하고 편집 초안을 확인할 수 있으며, 실제 반영은 코드/데이터 업데이트 방식으로 진행해야 합니다.",
    },
    { status: 501 },
  );
}
