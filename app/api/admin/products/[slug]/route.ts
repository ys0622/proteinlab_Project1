import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import fs from "fs/promises";
import path from "path";
import { verifySessionToken } from "@/app/lib/session";

const DRINK_FILE = path.join(process.cwd(), "app/data/drinkProductsData.json");
const BAR_FILE = path.join(process.cwd(), "app/data/barProductsData.json");

async function verifyAdmin(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get("proteinlab_session")?.value;
  if (!token) return false;
  return verifySessionToken(token);
}

async function findProduct(slug: string) {
  const [drinksRaw, barsRaw] = await Promise.all([
    fs.readFile(DRINK_FILE, "utf8"),
    fs.readFile(BAR_FILE, "utf8"),
  ]);
  const drinks: Record<string, unknown>[] = JSON.parse(drinksRaw);
  const bars: Record<string, unknown>[] = JSON.parse(barsRaw);

  const drink = drinks.find((p) => p.slug === slug);
  if (drink) return { product: drink, file: DRINK_FILE, list: drinks, type: "drink" };

  const bar = bars.find((p) => p.slug === slug);
  if (bar) return { product: bar, file: BAR_FILE, list: bars, type: "bar" };

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
  const result = await findProduct(slug);
  if (!result) {
    return NextResponse.json({ error: "제품을 찾을 수 없습니다." }, { status: 404 });
  }
  return NextResponse.json({ product: result.product });
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  if (!(await verifyAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug } = await params;
  const updates = await request.json();
  const result = await findProduct(slug);

  if (!result) {
    return NextResponse.json({ error: "제품을 찾을 수 없습니다." }, { status: 404 });
  }

  const updated = result.list.map((p) =>
    p.slug === slug ? { ...p, ...updates, slug } : p
  );

  await fs.writeFile(result.file, JSON.stringify(updated, null, 2), "utf8");
  return NextResponse.json({ ok: true });
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  if (!(await verifyAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug } = await params;
  const result = await findProduct(slug);

  if (!result) {
    return NextResponse.json({ error: "제품을 찾을 수 없습니다." }, { status: 404 });
  }

  const filtered = result.list.filter((p) => p.slug !== slug);
  await fs.writeFile(result.file, JSON.stringify(filtered, null, 2), "utf8");
  return NextResponse.json({ ok: true });
}
