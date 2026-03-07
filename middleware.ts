import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    const isAdmin = request.cookies.get("proteinlab_admin")?.value === "true";
    if (!isAdmin) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};
