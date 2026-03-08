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

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await verifyAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const raw = await fs.readFile(GUIDES_FILE, "utf8");
  const guides = JSON.parse(raw);
  const guide = guides.find((g: { id: string }) => g.id === id);

  if (!guide) {
    return NextResponse.json({ error: "가이드를 찾을 수 없습니다." }, { status: 404 });
  }
  return NextResponse.json(guide);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await verifyAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const updates = await request.json();

  const raw = await fs.readFile(GUIDES_FILE, "utf8");
  const guides = JSON.parse(raw);
  const idx = guides.findIndex((g: { id: string }) => g.id === id);

  if (idx === -1) {
    return NextResponse.json({ error: "가이드를 찾을 수 없습니다." }, { status: 404 });
  }

  guides[idx] = { ...guides[idx], ...updates, id, updatedAt: new Date().toISOString() };
  await fs.writeFile(GUIDES_FILE, JSON.stringify(guides, null, 2), "utf8");

  return NextResponse.json({ ok: true });
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await verifyAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const raw = await fs.readFile(GUIDES_FILE, "utf8");
  const guides = JSON.parse(raw);
  const filtered = guides.filter((g: { id: string }) => g.id !== id);

  if (filtered.length === guides.length) {
    return NextResponse.json({ error: "가이드를 찾을 수 없습니다." }, { status: 404 });
  }

  await fs.writeFile(GUIDES_FILE, JSON.stringify(filtered, null, 2), "utf8");
  return NextResponse.json({ ok: true });
}
