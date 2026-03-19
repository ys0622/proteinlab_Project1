import { NextResponse } from "next/server";
import { verifySessionToken } from "@/app/lib/session";
import { getLinkRecommendations, type LinkRecommendationType } from "@/app/lib/linkRecommendation";

async function verifyAdmin(): Promise<boolean> {
  const { cookies } = await import("next/headers");
  const cookieStore = await cookies();
  const token = cookieStore.get("proteinlab_session")?.value;
  if (!token) return false;
  return verifySessionToken(token);
}

export async function POST(request: Request) {
  if (!(await verifyAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await request.json()) as { name?: string; brand?: string; type?: string };
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const brand = typeof body.brand === "string" ? body.brand.trim() : "";
    const type = body.type as LinkRecommendationType | undefined;

    if (!name) {
      return NextResponse.json({ error: "상품명(name)은 필수입니다." }, { status: 400 });
    }
    if (!type || !["coupang", "naver", "official"].includes(type)) {
      return NextResponse.json({ error: "type은 coupang, naver, official 중 하나여야 합니다." }, { status: 400 });
    }

    const results = await getLinkRecommendations(brand, name, type);

    return NextResponse.json({ results });
  } catch (e) {
    console.error("[link-recommend]", e);
    return NextResponse.json({ error: "링크 추천 중 오류가 발생했습니다." }, { status: 500 });
  }
}
