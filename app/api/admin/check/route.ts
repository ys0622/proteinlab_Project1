import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySessionToken } from "@/app/lib/session";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("proteinlab_session")?.value;
    if (!token) return NextResponse.json({ isAdmin: false });

    const valid = await verifySessionToken(token);
    return NextResponse.json({ isAdmin: valid });
  } catch {
    return NextResponse.json({ isAdmin: false });
  }
}
