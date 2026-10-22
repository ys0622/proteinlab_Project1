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

// utm_ 은 지우지 않는다(2026-10-22). 서버에서 지우고 308 하면 GA4가 캠페인을 못 읽어 블로그 유입을 잴 수 없다.
// 중복 주소는 각 페이지의 canonical(자기 참조)이 막는다.
const STRIP_QUERY_PREFIXES: string[] = [];

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

  // 순회 중에 지우면 다음 키를 건너뛰므로 키 목록을 먼저 복사한다.
  for (const key of [...new Set(normalizedUrl.searchParams.keys())]) {
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
