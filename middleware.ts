import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Verifies the HMAC-signed session token using Web Crypto (Edge Runtime compatible).
 * Token format: "<timestamp>.<hex-hmac>"
 */
async function verifySession(token: string): Promise<boolean> {
  try {
    const secret = process.env.SESSION_SECRET ?? "proteinlab-session-secret-change-me";
    const dotIndex = token.lastIndexOf(".");
    if (dotIndex === -1) return false;

    const timestamp = token.slice(0, dotIndex);
    const providedHmac = token.slice(dotIndex + 1);

    // Reject tokens older than 24 hours
    const ts = parseInt(timestamp, 10);
    if (isNaN(ts) || Date.now() - ts > 86400 * 1000) return false;

    const encoder = new TextEncoder();
    const keyData = encoder.encode(secret);
    const key = await crypto.subtle.importKey(
      "raw",
      keyData,
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );
    const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(timestamp));
    const expectedHmac = Array.from(new Uint8Array(signature))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

    return providedHmac === expectedHmac;
  } catch {
    return false;
  }
}

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    const token = request.cookies.get("proteinlab_session")?.value;

    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    const valid = await verifySession(token);
    if (!valid) {
      const response = NextResponse.redirect(new URL("/admin/login", request.url));
      response.cookies.set("proteinlab_session", "", { expires: new Date(0), path: "/" });
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};
