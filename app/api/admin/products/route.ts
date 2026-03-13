import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySessionToken } from "@/app/lib/session";
import drinksData from "@/app/data/drinkProductsData.json";
import barsData from "@/app/data/barProductsData.json";
import yogurtsData from "@/app/data/yogurtProductsData.json";
import slugToImageData from "@/app/data/slugToImage.json";
import slugToBarImageData from "@/app/data/slugToBarImage.json";
import slugToYogurtImageData from "@/app/data/slugToYogurtImage.json";

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

  const drinkImageMap = slugToImageData as Record<string, string>;
  const barImageMap = slugToBarImageData as Record<string, string>;
  const yogurtImageMap = slugToYogurtImageData as Record<string, string>;

  const drinksWithStatus = (drinksData as Record<string, unknown>[]).map((product) => ({
    ...product,
    imageStatus: drinkImageMap[product.slug as string] ? "card-ready" : "no-image",
  }));

  const barsWithStatus = (barsData as Record<string, unknown>[]).map((product) => ({
    ...product,
    imageStatus: barImageMap[product.slug as string] ? "card-ready" : "no-image",
  }));

  const yogurtsWithStatus = (yogurtsData as Record<string, unknown>[]).map((product) => ({
    ...product,
    imageStatus: yogurtImageMap[product.slug as string] ? "card-ready" : "no-image",
  }));

  return NextResponse.json({
    drinks: drinksWithStatus,
    bars: barsWithStatus,
    yogurts: yogurtsWithStatus,
  });
}

export async function POST() {
  if (!(await verifyAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json(
    { error: "파일 쓰기는 Cloudflare Workers에서 지원되지 않습니다. 로컬 서버를 사용하세요." },
    { status: 501 },
  );
}
