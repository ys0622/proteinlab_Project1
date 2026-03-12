import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySessionToken } from "@/app/lib/session";

/**
 * 로그인 설정 상태 확인 (디버깅용)
 * ADMIN_PASSWORD, SESSION_SECRET 설정 여부만 반환 (값은 노출하지 않음)
 */
export async function GET() {
  const hasAdminPassword = !!process.env.ADMIN_PASSWORD;
  const hasSessionSecret = !!process.env.SESSION_SECRET;
  const cookieStore = await cookies();
  const token = cookieStore.get("proteinlab_session")?.value;
  const isAdmin = token ? await verifySessionToken(token) : false;
  return NextResponse.json({
    adminPasswordSet: hasAdminPassword,
    sessionSecretSet: hasSessionSecret,
    ready: hasAdminPassword && hasSessionSecret,
    isAdmin,
  });
}
