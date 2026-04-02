import { getCloudflareContext } from "@opennextjs/cloudflare";
import { NextRequest, NextResponse } from "next/server";
import {
  extractCoupangProductParams,
  getCoupangDestinationUrl,
  type CoupangLinkCategory,
  isValidExternalUrl,
} from "@/app/lib/purchaseLinks";

function toCategory(value: string | null): CoupangLinkCategory | null {
  if (
    value === "drink" ||
    value === "bar" ||
    value === "yogurt" ||
    value === "shake" ||
    value === "guide" ||
    value === "ranking"
  ) {
    return value;
  }
  return null;
}

function getCoupangProductParams(url: string) {
  try {
    const parsed = new URL(url);
    const pageKey = parsed.pathname.match(/\/vp\/products\/(\d+)/)?.[1];
    const itemId = parsed.searchParams.get("itemId");
    const vendorItemId = parsed.searchParams.get("vendorItemId");
    if (!pageKey || !itemId || !vendorItemId) {
      return null;
    }
    return { pageKey, itemId, vendorItemId };
  } catch {
    return null;
  }
}

function buildCoupangTraceId(params: { pageKey: string; itemId: string; vendorItemId: string }) {
  const seed = `${params.pageKey}:${params.itemId}:${params.vendorItemId}`;
  let hash = 0;
  for (let index = 0; index < seed.length; index += 1) {
    hash = (hash * 31 + seed.charCodeAt(index)) >>> 0;
  }

  return `PL-${params.pageKey}-${hash.toString(16)}`;
}

async function getRuntimeCoupangTag(): Promise<string> {
  const processTag =
    process.env.NEXT_PUBLIC_COUPANG_LPTAG ??
    process.env.COUPANG_LPTAG ??
    process.env.NEXT_PUBLIC_COUPANG_PARTNERS_TAG ??
    process.env.COUPANG_PARTNERS_TAG;

  if (typeof processTag === "string" && processTag.trim()) {
    return processTag.trim();
  }

  try {
    const { env } = await getCloudflareContext({ async: true });
    const runtimeEnv = env as Record<string, unknown>;
    const tag =
      runtimeEnv.NEXT_PUBLIC_COUPANG_LPTAG ??
      runtimeEnv.COUPANG_LPTAG ??
      runtimeEnv.NEXT_PUBLIC_COUPANG_PARTNERS_TAG ??
      runtimeEnv.COUPANG_PARTNERS_TAG;
    return typeof tag === "string" ? tag.trim() : "";
  } catch {
    return "";
  }
}

function buildRuntimePartnersUrl(
  sourceUrl: string,
  tag: string,
  category: CoupangLinkCategory | null,
): string | null {
  if (!tag) return null;
  const params = getCoupangProductParams(sourceUrl);
  if (!params) return null;

  const subId = category ?? "proteinlab";
  const url = new URL("https://link.coupang.com/re/AFFSDP");
  url.searchParams.set("lptag", tag);
  url.searchParams.set("subid", subId);
  url.searchParams.set("pageKey", params.pageKey);
  url.searchParams.set("itemId", params.itemId);
  url.searchParams.set("vendorItemId", params.vendorItemId);
  url.searchParams.set("traceid", buildCoupangTraceId(params));
  return url.toString();
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");
  const pageKey = searchParams.get("pageKey");
  const itemId = searchParams.get("itemId");
  const vendorItemId = searchParams.get("vendorItemId");
  const slug = searchParams.get("slug");
  const category = toCategory(searchParams.get("category"));
  const debug = searchParams.get("debug") === "1";

  const normalizedSourceUrl =
    pageKey && itemId && vendorItemId
      ? `https://www.coupang.com/vp/products/${pageKey}?itemId=${itemId}&vendorItemId=${vendorItemId}`
      : url;
  const fallbackDestination = getCoupangDestinationUrl(normalizedSourceUrl, category, slug);
  const runtimeTag = await getRuntimeCoupangTag();
  const partnersDestination =
    fallbackDestination ? buildRuntimePartnersUrl(fallbackDestination, runtimeTag, category) : null;
  const destination = partnersDestination ?? fallbackDestination;
  if (!destination || !isValidExternalUrl(destination)) {
    return NextResponse.json({ error: "invalid_coupang_url" }, { status: 400 });
  }

  if (debug) {
    return NextResponse.json({
      hasRuntimeTag: Boolean(runtimeTag),
      runtimeTagPreview: runtimeTag ? `${runtimeTag.slice(0, 3)}***` : null,
      usedPartnersRedirect: Boolean(partnersDestination),
      destination,
      fallbackDestination,
      sourceParams: extractCoupangProductParams(normalizedSourceUrl),
      slug,
      category,
    });
  }

  return NextResponse.redirect(destination, 307);
}
