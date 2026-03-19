import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySessionToken } from "@/app/lib/session";
import drinksData from "@/app/data/drinkProductsData.json";
import barsData from "@/app/data/barProductsData.json";
import yogurtsData from "@/app/data/yogurtProductsData.json";
import shakesData from "@/app/data/shakeProductsData.json";
import slugToImageData from "@/app/data/slugToImage.json";
import slugToBarImageData from "@/app/data/slugToBarImage.json";
import slugToShakeImageData from "@/app/data/slugToShakeImage.json";
import slugToYogurtImageData from "@/app/data/slugToYogurtImage.json";
import { getProductKV, kvKeyNew } from "@/app/lib/productKV";
import { slugExistsInJson } from "@/app/lib/productData";
import { getAllNewProductsFromKV } from "@/app/lib/productKV";

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
  const shakeImageMap = slugToShakeImageData as Record<string, string>;
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

  const shakesWithStatus = (shakesData as Record<string, unknown>[]).map((product) => ({
    ...product,
    imageStatus: shakeImageMap[product.slug as string] ? "card-ready" : "no-image",
  }));

  const kvNew = await getAllNewProductsFromKV();
  const drinkSlugs = new Set((drinksData as Record<string, unknown>[]).map((p) => p.slug));
  const barSlugs = new Set((barsData as Record<string, unknown>[]).map((p) => p.slug));
  const yogurtSlugs = new Set((yogurtsData as Record<string, unknown>[]).map((p) => p.slug));
  const shakeSlugs = new Set((shakesData as Record<string, unknown>[]).map((p) => p.slug));

  const drinksNew = kvNew
    .filter((p) => (p.productType as string) === "drink" && !drinkSlugs.has(p.slug as string))
    .map((p) => ({ ...p, imageStatus: "no-image" }));
  const barsNew = kvNew
    .filter((p) => (p.productType as string) === "bar" && !barSlugs.has(p.slug as string))
    .map((p) => ({ ...p, imageStatus: "no-image" }));
  const yogurtsNew = kvNew
    .filter((p) => (p.productType as string) === "yogurt" && !yogurtSlugs.has(p.slug as string))
    .map((p) => ({ ...p, imageStatus: "no-image" }));
  const shakesNew = kvNew
    .filter((p) => (p.productType as string) === "shake" && !shakeSlugs.has(p.slug as string))
    .map((p) => ({ ...p, imageStatus: "no-image" }));

  return NextResponse.json({
    drinks: [...drinksWithStatus, ...drinksNew],
    bars: [...barsWithStatus, ...barsNew],
    yogurts: [...yogurtsWithStatus, ...yogurtsNew],
    shakes: [...shakesWithStatus, ...shakesNew],
  });
}

export async function POST(request: Request) {
  if (!(await verifyAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = (await request.json()) as Record<string, unknown>;
    const slug = typeof body.slug === "string" ? body.slug.trim() : "";

    if (!slug) {
      return NextResponse.json({ error: "slug는 필수입니다." }, { status: 400 });
    }

    if (slugExistsInJson(slug)) {
      return NextResponse.json(
        { error: `이미 존재하는 제품입니다. (slug: ${slug})` },
        { status: 409 }
      );
    }

    const kv = await getProductKV();
    if (!kv || typeof kv.put !== "function") {
      return NextResponse.json(
        { error: "KV 바인딩이 없습니다. Cloudflare 대시보드에서 GUIDES_STATIC_DRAFTS_KV 바인딩을 확인하세요." },
        { status: 501 }
      );
    }

    const existing = await kv.get(kvKeyNew(slug), "json");
    if (existing) {
      return NextResponse.json(
        { error: `이미 존재하는 신규 제품입니다. (slug: ${slug})` },
        { status: 409 }
      );
    }

    const productType = (body.productType as string) || "drink";
    if (!["drink", "bar", "yogurt", "shake"].includes(productType)) {
      return NextResponse.json(
        { error: "productType은 drink, bar, yogurt, shake 중 하나여야 합니다." },
        { status: 400 }
      );
    }

    const product = {
      ...body,
      slug,
      productType,
      updatedAt: new Date().toISOString(),
    };

    await kv.put(kvKeyNew(slug), JSON.stringify(product));

    return NextResponse.json({ ok: true, slug, storageMode: "kv" });
  } catch (e) {
    console.error("[admin/products POST]", e);
    return NextResponse.json(
      { error: "제품 저장 중 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
