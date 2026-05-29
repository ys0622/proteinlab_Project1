import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const STRIP_QUERY_PARAMS = new Set([
  "_ga",
  "_gl",
  "dclid",
  "fbclid",
  "gclid",
  "gclsrc",
  "gbraid",
  "igshid",
  "info_filled",
  "mc_cid",
  "mc_eid",
  "mibextid",
  "srsltid",
  "wbraid",
]);

const STRIP_QUERY_PREFIXES = ["utm_"];

function isStaticAsset(pathname: string) {
  return /\.[a-z0-9]+$/i.test(pathname);
}

function shouldStripParam(param: string) {
  return STRIP_QUERY_PARAMS.has(param) || STRIP_QUERY_PREFIXES.some((prefix) => param.startsWith(prefix));
}

function shouldNoindex(pathname: string, searchParams: URLSearchParams) {
  if (
    (pathname === "/" ||
      pathname === "/products" ||
      pathname === "/drinks" ||
      pathname === "/bars" ||
      pathname === "/shake" ||
      pathname === "/yogurt") &&
    Array.from(searchParams.keys()).length > 0
  ) {
    return true;
  }

  if (pathname === "/compare" && searchParams.has("slugs")) {
    return true;
  }

  if (pathname === "/recommend" && searchParams.has("category")) {
    return true;
  }

  return false;
}

export function middleware(request: NextRequest) {
  const { nextUrl } = request;
  const { pathname } = nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/admin") ||
    isStaticAsset(pathname)
  ) {
    return NextResponse.next();
  }

  const normalizedUrl = nextUrl.clone();
  let changed = false;

  for (const [key] of normalizedUrl.searchParams) {
    if (!shouldStripParam(key)) continue;
    normalizedUrl.searchParams.delete(key);
    changed = true;
  }

  if (changed) {
    return NextResponse.redirect(normalizedUrl, 308);
  }

  const response = NextResponse.next();

  if (shouldNoindex(pathname, nextUrl.searchParams)) {
    response.headers.set("X-Robots-Tag", "noindex, follow");
  }

  return response;
}

export const config = {
  matcher: "/:path*",
};
