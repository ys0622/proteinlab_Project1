import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import fs from "fs/promises";
import path from "path";
import crypto from "crypto";

const DRINK_FILE = path.join(process.cwd(), "app/data/drinkProductsData.json");
const BAR_FILE = path.join(process.cwd(), "app/data/barProductsData.json");
const SLUG_TO_IMAGE = path.join(process.cwd(), "app/data/slugToImage.json");
const SLUG_TO_BAR_IMAGE = path.join(process.cwd(), "app/data/slugToBarImage.json");

async function verifyAdmin(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("proteinlab_session")?.value;
    if (!token) return false;

    const secret = process.env.SESSION_SECRET ?? "proteinlab-session-secret-change-me";
    const dotIndex = token.lastIndexOf(".");
    if (dotIndex === -1) return false;

    const timestamp = token.slice(0, dotIndex);
    const providedHmac = token.slice(dotIndex + 1);

    const ts = parseInt(timestamp, 10);
    if (isNaN(ts) || Date.now() - ts > 86400 * 1000) return false;

    const expectedHmac = crypto
      .createHmac("sha256", secret)
      .update(timestamp)
      .digest("hex");

    return providedHmac === expectedHmac;
  } catch {
    return false;
  }
}

export async function GET() {
  if (!(await verifyAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const [drinksRaw, barsRaw, slugToImage, slugToBarImage] = await Promise.all([
    fs.readFile(DRINK_FILE, "utf8"),
    fs.readFile(BAR_FILE, "utf8"),
    fs.readFile(SLUG_TO_IMAGE, "utf8"),
    fs.readFile(SLUG_TO_BAR_IMAGE, "utf8"),
  ]);

  const drinks = JSON.parse(drinksRaw);
  const bars = JSON.parse(barsRaw);
  const imageMap: Record<string, string> = JSON.parse(slugToImage);
  const barImageMap: Record<string, string> = JSON.parse(slugToBarImage);

  const drinksWithStatus = drinks.map((p: Record<string, unknown>) => ({
    ...p,
    imageStatus: imageMap[p.slug as string] ? "card-ready" : "no-image",
  }));

  const barsWithStatus = bars.map((p: Record<string, unknown>) => ({
    ...p,
    imageStatus: barImageMap[p.slug as string] ? "card-ready" : "no-image",
  }));

  return NextResponse.json({ drinks: drinksWithStatus, bars: barsWithStatus });
}

export async function POST(request: Request) {
  if (!(await verifyAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const product = await request.json();
  const { productType, slug } = product;

  if (!slug || !productType) {
    return NextResponse.json({ error: "slug and productType are required" }, { status: 400 });
  }

  const file = productType === "bar" ? BAR_FILE : DRINK_FILE;
  const existing = JSON.parse(await fs.readFile(file, "utf8"));

  if (existing.find((p: Record<string, unknown>) => p.slug === slug)) {
    return NextResponse.json({ error: "slug이 이미 존재합니다." }, { status: 409 });
  }

  existing.push(product);
  await fs.writeFile(file, JSON.stringify(existing, null, 2), "utf8");

  return NextResponse.json({ ok: true, product });
}
