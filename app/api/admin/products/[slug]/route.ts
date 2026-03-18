import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySessionToken } from "@/app/lib/session";
import { getProductKV, kvKeyOverride, kvKeyNew } from "@/app/lib/productKV";
import drinksData from "@/app/data/drinkProductsData.json";
import barsData from "@/app/data/barProductsData.json";
import yogurtsData from "@/app/data/yogurtProductsData.json";

async function verifyAdmin(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get("proteinlab_session")?.value;
  if (!token) return false;
  return verifySessionToken(token);
}

function findProductInJson(slug: string) {
  const drinks = drinksData as Record<string, unknown>[];
  const bars = barsData as Record<string, unknown>[];
  const yogurts = yogurtsData as Record<string, unknown>[];

  const drink = drinks.find((p) => p.slug === slug);
  if (drink) return { product: drink, type: "drink" };

  const bar = bars.find((p) => p.slug === slug);
  if (bar) return { product: bar, type: "bar" };

  const yogurt = yogurts.find((p) => p.slug === slug);
  if (yogurt) return { product: yogurt, type: "yogurt" };

  return null;
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  if (!(await verifyAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug } = await params;
  const base = findProductInJson(slug);

  if (base) {
    const kv = await getProductKV();
    if (kv) {
      const override = await kv.get(kvKeyOverride(slug), "json");
      if (override) {
        const { slug: _s, productType: _t, updatedAt: _u, ...rest } = override as Record<string, unknown>;
        return NextResponse.json({ product: { ...base.product, ...rest }, storageMode: "kv" });
      }
    }
    return NextResponse.json({ product: base.product, storageMode: kv ? "kv" : "readonly" });
  }

  const kv = await getProductKV();

  if (!kv) return NextResponse.json({ error: "제품을 찾을 수 없습니다." }, { status: 404 });

  const newProduct = await kv.get(kvKeyNew(slug), "json");
  if (newProduct) {
    return NextResponse.json({ product: newProduct, storageMode: "kv" });
  }

  return NextResponse.json({ error: "제품을 찾을 수 없습니다." }, { status: 404 });
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  if (!(await verifyAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug } = await params;
  const kv = await getProductKV();
  if (!kv || typeof kv.put !== "function") {
    return NextResponse.json(
      { error: "KV 바인딩이 없습니다. Cloudflare 대시보드에서 GUIDES_STATIC_DRAFTS_KV 바인딩을 확인하세요." },
      { status: 501 },
    );
  }

  const base = findProductInJson(slug);
  const body = (await request.json()) as Record<string, unknown>;
  const updatedAt = new Date().toISOString();

  if (base) {
    const safeBody = { ...body, slug: base.product.slug, productType: base.product.productType, updatedAt };
    await kv.put(kvKeyOverride(slug), JSON.stringify(safeBody));
    return NextResponse.json({ ok: true, savedAt: updatedAt, storageMode: "kv" });
  }

  const newProduct = await kv.get(kvKeyNew(slug), "json");
  if (!newProduct) {
    return NextResponse.json({ error: "제품을 찾을 수 없습니다." }, { status: 404 });
  }

  const productType = (body.productType as string) || (newProduct.productType as string) || "drink";
  const safeBody = { ...body, slug, productType, updatedAt };
  await kv.put(kvKeyNew(slug), JSON.stringify(safeBody));
  return NextResponse.json({ ok: true, savedAt: updatedAt, storageMode: "kv" });
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  if (!(await verifyAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug } = await params;
  const kv = await getProductKV();
  if (!kv) {
    return NextResponse.json(
      { error: "KV 바인딩이 없습니다." },
      { status: 501 },
    );
  }

  const base = findProductInJson(slug);
  if (base) {
    await kv.delete(kvKeyOverride(slug));
  } else {
    await kv.delete(kvKeyNew(slug));
  }
  return NextResponse.json({ ok: true });
}
