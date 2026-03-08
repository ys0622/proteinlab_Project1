import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import fs from "fs/promises";
import path from "path";
import { verifySessionToken } from "@/app/lib/session";

const DATA_FILE = path.join(process.cwd(), "app/data/guidesStaticData.json");

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
  const raw = await fs.readFile(DATA_FILE, "utf8");
  return NextResponse.json(JSON.parse(raw));
}

export async function PUT(request: Request) {
  if (!(await verifyAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json();
  await fs.writeFile(DATA_FILE, JSON.stringify(body, null, 2), "utf8");
  return NextResponse.json({ ok: true });
}
