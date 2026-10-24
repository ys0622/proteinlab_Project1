import { getCloudflareContext } from "@opennextjs/cloudflare";
import { NextRequest, NextResponse } from "next/server";
import {
  extractCoupangProductParams,
  getCoupangDestinationUrl,
  getCoupangShortLinkTarget,
  getCoupangSubId,
  getKnownSourceCoupangUrlBySlug,
  type CoupangLinkCategory,
  isValidExternalUrl,
} from "@/app/lib/purchaseLinks";

const DEEPLINK_PATH = "/v2/providers/affiliate_open_api/apis/openapi/v1/deeplink";
const DEEPLINK_HOST = "https://api-gateway.coupang.com";
const DEEPLINK_CACHE_PREFIX = "coupang-deeplink:";
const DEEPLINK_CACHE_TTL_SECONDS = 60 * 60 * 24 * 25; // 25일 (쿠팡 딥링크 30일 만료보다 여유 있게)

interface DeeplinkKV {
  get(key: string): Promise<string | null>;
  put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>;
}

async function getDeeplinkKV(): Promise<DeeplinkKV | null> {
  try {
    const { env } = await getCloudflareContext({ async: true });
    const kv = (env as Record<string, unknown>).GUIDES_STATIC_DRAFTS_KV as DeeplinkKV | undefined;
    return kv && typeof kv.get === "function" ? kv : null;
  } catch {
    return null;
  }
}

function toCategory(value: string | null): CoupangLinkCategory | null {
  if (
    value === "drink" ||
    value === "bar" ||
    value === "yogurt" ||
    value === "shake" ||
    value === "soymilk" ||
    value === "guide" ||
    value === "ranking"
  ) {
    return value;
  }
  return null;
}

// 딥링크 API에 넘길 상품 URL. 단축 링크에서 풀어낸 주소에는 vendorItemId가 없어서(2026-10-24 확인) 비어 있어도 된다.
function getCoupangProductParams(url: string) {
  try {
    const parsed = new URL(url);
    const pageKey = parsed.pathname.match(/\/vp\/products\/(\d+)/)?.[1];
    const itemId = parsed.searchParams.get("itemId");
    const vendorItemId = parsed.searchParams.get("vendorItemId") ?? "";
    if (!pageKey || !itemId) {
      return null;
    }
    return { pageKey, itemId, vendorItemId };
  } catch {
    return null;
  }
}

async function getRuntimeEnvValue(...keys: string[]): Promise<string> {
  for (const key of keys) {
    const processValue = process.env[key];
    if (typeof processValue === "string" && processValue.trim()) {
      return processValue.trim();
    }
  }

  try {
    const { env } = await getCloudflareContext({ async: true });
    const runtimeEnv = env as Record<string, unknown>;
    for (const key of keys) {
      const value = runtimeEnv[key];
      if (typeof value === "string" && value.trim()) {
        return value.trim();
      }
    }
  } catch {
    // ignore — falls through to empty string
  }

  return "";
}

async function getRuntimeCoupangTag(): Promise<string> {
  return getRuntimeEnvValue(
    "NEXT_PUBLIC_COUPANG_LPTAG",
    "COUPANG_LPTAG",
    "NEXT_PUBLIC_COUPANG_PARTNERS_TAG",
    "COUPANG_PARTNERS_TAG",
  );
}

function toHex(buffer: ArrayBuffer): string {
  return Array.from(new Uint8Array(buffer))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function hmacSha256Hex(secret: string, message: string): Promise<string> {
  const encoder = new TextEncoder();
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(message));
  return toHex(signature);
}

function buildSignedDate(): string {
  const now = new Date();
  const pad = (n: number) => String(n).padStart(2, "0");
  const yy = String(now.getUTCFullYear()).slice(2);
  const mm = pad(now.getUTCMonth() + 1);
  const dd = pad(now.getUTCDate());
  const hh = pad(now.getUTCHours());
  const min = pad(now.getUTCMinutes());
  const ss = pad(now.getUTCSeconds());
  return `${yy}${mm}${dd}T${hh}${min}${ss}Z`;
}

async function buildCoupangAuthHeader(
  accessKey: string,
  secretKey: string,
  method: string,
  pathAndQuery: string,
): Promise<string> {
  const signedDate = buildSignedDate();
  const message = `${signedDate}${method}${pathAndQuery}`;
  const signature = await hmacSha256Hex(secretKey, message);
  return `CEA algorithm=HmacSHA256, access-key=${accessKey}, signed-date=${signedDate}, signature=${signature}`;
}

async function fetchCoupangDeeplink(
  productUrl: string,
  accessKey: string,
  secretKey: string,
  subId: string,
): Promise<{ url: string | null; debug: string }> {
  try {
    const authorization = await buildCoupangAuthHeader(accessKey, secretKey, "POST", DEEPLINK_PATH);
    const res = await fetch(`${DEEPLINK_HOST}${DEEPLINK_PATH}`, {
      method: "POST",
      headers: {
        Authorization: authorization,
        "Content-Type": "application/json;charset=UTF-8",
      },
      body: JSON.stringify({ coupangUrls: [productUrl], subId }),
    });

    const bodyText = await res.text();
    if (!res.ok) return { url: null, debug: `http_${res.status}: ${bodyText.slice(0, 300)}` };

    const data = JSON.parse(bodyText) as {
      data?: { shortenUrl?: string; landingUrl?: string }[];
    };
    const first = data.data?.[0];
    const url = first?.shortenUrl ?? first?.landingUrl ?? null;
    return { url, debug: url ? "ok" : `no_url_in_response: ${bodyText.slice(0, 300)}` };
  } catch (err) {
    return { url: null, debug: `exception: ${err instanceof Error ? err.message : String(err)}` };
  }
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
  // 쿠팡파트너스에서 만든 단축 링크(link.coupang.com/a/<short>)는 구분값(subId)이 비어 있다. 미리 풀어 둔 상품 번호
  // (app/data/coupangShortLinkTargets.json)로 subId를 붙인 딥링크를 만들고, 실패하면 원래 단축 링크로 보낸다(2026-10-24).
  const shortCode = searchParams.get("short");
  const shortTarget = getCoupangShortLinkTarget(shortCode);

  const normalizedSourceUrl = shortTarget
    ? `https://www.coupang.com/vp/products/${shortTarget.pageKey}?itemId=${shortTarget.itemId}${shortTarget.vendorItemId ? `&vendorItemId=${shortTarget.vendorItemId}` : ""}`
    : pageKey && itemId && vendorItemId
      ? `https://www.coupang.com/vp/products/${pageKey}?itemId=${itemId}&vendorItemId=${vendorItemId}`
      : url;
  const fallbackDestination = shortTarget
    ? `https://link.coupang.com/a/${shortCode}`
    : getCoupangDestinationUrl(normalizedSourceUrl, category, slug);
  // 딥링크 API에는 실제 쿠팡 상품 URL(raw)이 필요 — fallbackDestination은 이미
  // link.coupang.com 형태로 가공된 값이라 그대로 쓰면 파싱이 실패한다.
  const rawProductUrl = getCoupangProductParams(normalizedSourceUrl ?? "")
    ? normalizedSourceUrl
    : getKnownSourceCoupangUrlBySlug(slug);
  const subId = getCoupangSubId();

  const [accessKey, secretKey] = await Promise.all([
    getRuntimeEnvValue("COUPANG_ACCESS_KEY"),
    getRuntimeEnvValue("COUPANG_SECRET_KEY"),
  ]);

  let partnersDestination: string | null = null;
  let deeplinkDebug = "not_attempted";
  let cacheHit = false;
  const kv = await getDeeplinkKV();

  if (rawProductUrl && accessKey && secretKey) {
    const params = getCoupangProductParams(rawProductUrl);
    if (params) {
      // 키에 subId를 넣어, 예전(카테고리 이름 subId) 캐시를 쓰지 않고 새로 만든다.
      const cacheKey = `${DEEPLINK_CACHE_PREFIX}${params.pageKey}:${params.itemId}:${params.vendorItemId || "-"}:sub-${subId}`;

      const cached = kv ? await kv.get(cacheKey).catch(() => null) : null;
      if (cached) {
        partnersDestination = cached;
        deeplinkDebug = "cache_hit";
        cacheHit = true;
      } else {
        const result = await fetchCoupangDeeplink(
          rawProductUrl,
          accessKey,
          secretKey,
          subId,
        );
        partnersDestination = result.url;
        deeplinkDebug = result.debug;
        if (result.url && kv) {
          await kv.put(cacheKey, result.url, { expirationTtl: DEEPLINK_CACHE_TTL_SECONDS }).catch(() => {});
        }
      }
    } else {
      deeplinkDebug = "no_params_extracted";
    }
  } else {
    deeplinkDebug = "missing_keys_or_fallback";
  }

  const destination = partnersDestination ?? fallbackDestination;
  if (!destination || !isValidExternalUrl(destination)) {
    return NextResponse.json({ error: "invalid_coupang_url" }, { status: 400 });
  }

  if (debug) {
    const runtimeTag = await getRuntimeCoupangTag();
    return NextResponse.json({
      hasAccessKey: Boolean(accessKey),
      hasSecretKey: Boolean(secretKey),
      hasRuntimeTag: Boolean(runtimeTag),
      usedPartnersRedirect: Boolean(partnersDestination),
      deeplinkDebug,
      cacheHit,
      destination,
      fallbackDestination,
      sourceParams: extractCoupangProductParams(normalizedSourceUrl),
      shortCode: shortTarget ? shortCode : null,
      subId,
      slug,
      category,
    });
  }

  return NextResponse.redirect(destination, 307);
}
