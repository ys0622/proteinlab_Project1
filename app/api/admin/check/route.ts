import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import crypto from "crypto";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("proteinlab_session")?.value;
    if (!token) return NextResponse.json({ isAdmin: false });

    const secret = process.env.SESSION_SECRET ?? "proteinlab-session-secret-change-me";
    const dotIndex = token.lastIndexOf(".");
    if (dotIndex === -1) return NextResponse.json({ isAdmin: false });

    const timestamp = token.slice(0, dotIndex);
    const providedHmac = token.slice(dotIndex + 1);

    const ts = parseInt(timestamp, 10);
    if (isNaN(ts) || Date.now() - ts > 86400 * 1000) {
      return NextResponse.json({ isAdmin: false });
    }

    const expectedHmac = crypto
      .createHmac("sha256", secret)
      .update(timestamp)
      .digest("hex");

    return NextResponse.json({ isAdmin: providedHmac === expectedHmac });
  } catch {
    return NextResponse.json({ isAdmin: false });
  }
}
