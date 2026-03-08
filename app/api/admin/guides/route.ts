import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import fs from "fs/promises";
import path from "path";
import crypto from "crypto";

const GUIDES_FILE = path.join(process.cwd(), "app/data/guidesData.json");

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
  const raw = await fs.readFile(GUIDES_FILE, "utf8");
  return NextResponse.json(JSON.parse(raw));
}

export async function POST(request: Request) {
  if (!(await verifyAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const guide = await request.json();
  const { id, slug, title } = guide;

  if (!id || !slug || !title) {
    return NextResponse.json({ error: "id, slug, title은 필수입니다." }, { status: 400 });
  }

  const raw = await fs.readFile(GUIDES_FILE, "utf8");
  const guides = JSON.parse(raw);

  if (guides.find((g: { id: string; slug: string }) => g.id === id || g.slug === slug)) {
    return NextResponse.json({ error: "id 또는 slug가 이미 존재합니다." }, { status: 409 });
  }

  const newGuide = {
    ...guide,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  guides.push(newGuide);
  await fs.writeFile(GUIDES_FILE, JSON.stringify(guides, null, 2), "utf8");

  return NextResponse.json({ ok: true, guide: newGuide });
}
