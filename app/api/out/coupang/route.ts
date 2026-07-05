import { getCloudflareContext } from "@opennextjs/cloudflare";
import { NextRequest, NextResponse } from "next/server";
import {
  extractCoupangProductParams,
  getCoupangDestinationUrl,
  getKnownSourceCoupangUrlBySlug,
  type CoupangLinkCategory,
  isValidExternalUrl,
} from "@/app/lib/purchaseLinks";

const DEEPLINK_PATH = "/v2/providers/affiliate_open_api/apis/openapi/v1/deeplink";
const DEEPLINK_HOST = "https://api-gateway.coupang.com";
const DEEPLINK_CACHE_PREFIX = "coupang-deeplink:";
const DEEPLINK_CACHE_TTL_SECONDS = 60 * 60 * 24 * 25; // 25일 (쿠팡 딥링크 30일 만료보다 여유 있게)

// 임시 검증용: 쿠팡 파트너스 웹사이트에서 "링크 생성"으로 수동 발급한 정적 링크.
// API 자동생성 링크와 전환 추적 결과를 비교하기 위한 테스트. 결과 확인 후 제거 예정.
const MANUAL_TEST_STATIC_LINKS: Record<string, string> = {
  "newcare-all-protein-savory-245": "https://link.coupang.com/a/e8LCv2UaQe",
};

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

  // 임시 검증: 수동 발급 정적 링크가 지정된 상품이면 API 호출 없이 바로 그 링크로 리다이렉트
  const manualStaticLink = slug ? MANUAL_TEST_STATIC_LINKS[slug] : undefined;
  if (manualStaticLink) {
    if (debug) {
      return NextResponse.json({
        usedManualStaticLink: true,
        destination: manualStaticLink,
        slug,
        category,
      });
    }
    return NextResponse.redirect(manualStaticLink, 307);
  }

  const normalizedSourceUrl =
    pageKey && itemId && vendorItemId
      ? `https://www.coupang.com/vp/products/${pageKey}?itemId=${itemId}&vendorItemId=${vendorItemId}`
      : url;
  const fallbackDestination = getCoupangDestinationUrl(normalizedSourceUrl, category, slug);
  // 딥링크 API에는 실제 쿠팡 상품 URL(raw)이 필요 — fallbackDestination은 이미
  // link.coupang.com 형태로 가공된 값이라 그대로 쓰면 파싱이 실패한다.
  const rawProductUrl = getCoupangProductParams(normalizedSourceUrl ?? "")
    ? normalizedSourceUrl
    : getKnownSourceCoupangUrlBySlug(slug);

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
      const cacheKey = `${DEEPLINK_CACHE_PREFIX}${params.pageKey}:${params.itemId}:${params.vendorItemId}:${category ?? "proteinlab"}`;

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
          category ?? "proteinlab",
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
      slug,
      category,
    });
  }

  return NextResponse.redirect(destination, 307);
}
