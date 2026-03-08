import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySessionToken } from "@/app/lib/session";
import drinksData from "@/app/data/drinkProductsData.json";
import barsData from "@/app/data/barProductsData.json";

async function verifyAdmin(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get("proteinlab_session")?.value;
  if (!token) return false;
  return verifySessionToken(token);
}

function findProduct(slug: string) {
  const drinks = drinksData as Record<string, unknown>[];
  const bars = barsData as Record<string, unknown>[];

  const drink = drinks.find((p) => p.slug === slug);
  if (drink) return { product: drink, type: "drink" };

  const bar = bars.find((p) => p.slug === slug);
  if (bar) return { product: bar, type: "bar" };

  return null;
}

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  if (!(await verifyAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug } = await params;
  const result = findProduct(slug);
  if (!result) {
    return NextResponse.json({ error: "제품을 찾을 수 없습니다." }, { status: 404 });
  }
  return NextResponse.json({ product: result.product });
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
