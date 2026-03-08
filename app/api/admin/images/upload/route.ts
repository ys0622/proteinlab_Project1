import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import fs from "fs/promises";
import path from "path";
import crypto from "crypto";

const SLUG_TO_IMAGE = path.join(process.cwd(), "app/data/slugToImage.json");
const SLUG_TO_BAR_IMAGE = path.join(process.cwd(), "app/data/slugToBarImage.json");
const DRINK_IMG_DIR = path.join(process.cwd(), "public/rtd-drink-image");
const BAR_IMG_DIR = path.join(process.cwd(), "public/bar-image");

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

export async function POST(request: Request) {
  if (!(await verifyAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file") as File | null;
  const slug = formData.get("slug") as string | null;
  const productType = formData.get("productType") as string | null; // "drink" | "bar"

  if (!file || !slug || !productType) {
    return NextResponse.json(
      { error: "file, slug, productType 필드가 필요합니다." },
      { status: 400 }
    );
  }

  const allowedTypes = ["image/png", "image/jpeg", "image/webp"];
  if (!allowedTypes.includes(file.type)) {
    return NextResponse.json(
      { error: "PNG, JPG, WEBP 파일만 업로드 가능합니다." },
      { status: 400 }
    );
  }

  const ext = file.type === "image/png" ? "png" : file.type === "image/webp" ? "webp" : "jpg";
  const filename = `${slug}.${ext}`;
  const targetDir = productType === "bar" ? BAR_IMG_DIR : DRINK_IMG_DIR;
  const targetPath = path.join(targetDir, filename);

  const buffer = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(targetPath, buffer);

  // Update slug→image mapping
  const mapFile = productType === "bar" ? SLUG_TO_BAR_IMAGE : SLUG_TO_IMAGE;
  const mapRaw = await fs.readFile(mapFile, "utf8");
  const map: Record<string, string> = JSON.parse(mapRaw);
  map[slug] = filename;
  await fs.writeFile(mapFile, JSON.stringify(map, null, 2), "utf8");

  const publicUrl =
    productType === "bar"
      ? `/bar-image/${encodeURIComponent(filename)}`
      : `/rtd-drink-image/${encodeURIComponent(filename)}`;

  return NextResponse.json({ ok: true, url: publicUrl, filename });
}
