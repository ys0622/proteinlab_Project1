/**
 * GA4 client tracking helpers.
 *
 * Initialization:
 * - GA script is injected once from app/layout.tsx
 * - NEXT_PUBLIC_GA_ID must contain the GA4 Measurement ID
 * - Optional server fallback uses GA4 Measurement Protocol via /api/analytics
 * - Set GA4_API_SECRET on the server to enable the fallback path
 *
 * page_view behavior:
 * - Automatic GA page_view is disabled in gtag config
 * - App Router navigation is tracked manually from AnalyticsPageViewTracker
 * - If gtag is blocked or unavailable, events fall back to /api/analytics
 *
 * Realtime check:
 * 1. Open the deployed site
 * 2. Navigate across internal pages
 * 3. Click a product card and an outbound purchase button
 * 4. In GA4 Realtime, confirm page_view / product_click / outbound_click
 */

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID?.trim() ?? "";

const ANALYTICS_ENDPOINT = "/api/analytics";
const CLIENT_ID_KEY = "proteinlab_ga_client_id";
const SESSION_ID_KEY = "proteinlab_ga_session_id";
const SESSION_TIMEOUT_MS = 30 * 60 * 1000;

type GtagCommand = "config" | "event" | "js" | "set" | "consent";
type Gtag = (command: GtagCommand, target: string | Date, params?: Record<string, unknown>) => void;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: Gtag;
  }
}

type AnalyticsParams = Record<string, unknown>;

type ProductClickParams = {
  productId: string;
  productName: string;
  brand: string;
  category?: string;
  destinationUrl?: string;
  source?: string;
  ctaText?: string;
};

type OutboundClickParams = {
  label: string;
  destinationUrl: string;
  category?: string;
  store?: string;
  productId?: string;
  productName?: string;
  brand?: string;
};

type PurchaseClickParams = {
  productId: string;
  productName: string;
  brand: string;
  store: "coupang" | "naver" | "official";
  destinationUrl?: string;
  placement?: string;
  ctaText?: string;
};

type InternalLinkClickParams = {
  label: string;
  destinationUrl: string;
  section: string;
  pageType: string;
};

export type PageType = "home" | "category" | "compare" | "product" | "guide" | "insight" | "feed";

type AdEventParams = {
  pageType?: PageType;
  pagePath: string;
  adSlot: string;
  deviceType?: string;
};

type FallbackPayload = {
  name: string;
  params: AnalyticsParams;
  clientId: string;
  sessionId: string;
};

function canTrackWithGtag() {
  return typeof window !== "undefined" && typeof window.gtag === "function" && Boolean(GA_ID);
}

function canUseFallback() {
  return typeof window !== "undefined" && Boolean(GA_ID);
}

export function isAnalyticsReady() {
  return canTrackWithGtag() || canUseFallback();
}

function getPageLocation(url: string) {
  if (typeof window === "undefined") {
    return url;
  }

  return new URL(url, window.location.origin).toString();
}

export function getPageType(pathname: string): PageType {
  if (pathname === "/") return "home";
  if (pathname.startsWith("/compare")) return "compare";
  if (pathname.startsWith("/product/")) return "product";
  if (pathname.startsWith("/guides/market-insights")) return "insight";
  if (pathname.startsWith("/guides")) return "guide";
  if (pathname.startsWith("/feed")) return "feed";
  return "category";
}

export function getDeviceType() {
  if (typeof window === "undefined") return "unknown";
  if (window.matchMedia("(max-width: 767px)").matches) return "mobile";
  if (window.matchMedia("(max-width: 1023px)").matches) return "tablet";
  return "desktop";
}

function randomDigits(length: number) {
  return Math.random().toString().slice(2, 2 + length).padEnd(length, "0");
}

function getOrCreateClientId() {
  if (typeof window === "undefined") return "";

  const existing = window.localStorage.getItem(CLIENT_ID_KEY);
  if (existing) return existing;

  const clientId = `${Date.now()}.${randomDigits(10)}`;
  window.localStorage.setItem(CLIENT_ID_KEY, clientId);
  return clientId;
}

function getOrCreateSessionId() {
  if (typeof window === "undefined") return "";

  const raw = window.sessionStorage.getItem(SESSION_ID_KEY);
  if (raw) {
    try {
      const parsed = JSON.parse(raw) as { id: string; touchedAt: number };
      if (Date.now() - parsed.touchedAt < SESSION_TIMEOUT_MS) {
        const nextValue = JSON.stringify({ ...parsed, touchedAt: Date.now() });
        window.sessionStorage.setItem(SESSION_ID_KEY, nextValue);
        return parsed.id;
      }
    } catch {
      // ignore and recreate
    }
  }

  const sessionId = `${Date.now()}`;
  window.sessionStorage.setItem(
    SESSION_ID_KEY,
    JSON.stringify({ id: sessionId, touchedAt: Date.now() }),
  );
  return sessionId;
}

function postFallback(name: string, params: AnalyticsParams) {
  if (!canUseFallback()) return false;

  const payload: FallbackPayload = {
    name,
    params,
    clientId: getOrCreateClientId(),
    sessionId: getOrCreateSessionId(),
  };

  void fetch(ANALYTICS_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    keepalive: true,
  }).catch(() => {
    // Ignore fallback delivery failures on the client.
  });

  return true;
}

export function pageView(url: string) {
  const params = {
    page_path: url,
    page_location: getPageLocation(url),
    page_title: typeof document !== "undefined" ? document.title : undefined,
    page_type: getPageType(url),
  };

  if (canTrackWithGtag()) {
    window.gtag?.("event", "page_view", params);
    return true;
  }

  return postFallback("page_view", params);
}

export function event(name: string, params: AnalyticsParams = {}) {
  if (canTrackWithGtag()) {
    window.gtag?.("event", name, params);
    return true;
  }

  return postFallback(name, params);
}

export function productClick({
  productId,
  productName,
  brand,
  category,
  destinationUrl,
  source,
  ctaText,
}: ProductClickParams) {
  return event("product_click", {
    product_id: productId,
    product_name: productName,
    brand,
    category,
    destination_url: destinationUrl,
    source,
    cta_text: ctaText,
  });
}

export function outboundClick({
  label,
  destinationUrl,
  category,
  store,
  productId,
  productName,
  brand,
}: OutboundClickParams) {
  return event("outbound_click", {
    event_category: category ?? "engagement",
    event_label: label,
    destination_url: destinationUrl,
    store,
    product_id: productId,
    product_name: productName,
    brand,
  });
}

export function purchaseClick({
  productId,
  productName,
  brand,
  store,
  destinationUrl,
  placement,
  ctaText,
}: PurchaseClickParams) {
  outboundClick({
    label: ctaText ? `${productName} | ${ctaText}` : `${productName} | ${store}`,
    destinationUrl: destinationUrl ?? "",
    category: "purchase",
    store,
    productId,
    productName,
    brand,
  });

  return event("purchase_click", {
    product_id: productId,
    product_name: productName,
    brand,
    store,
    destination_url: destinationUrl,
    placement,
    cta_text: ctaText,
  });
}

export function internalLinkClick({
  label,
  destinationUrl,
  section,
  pageType,
}: InternalLinkClickParams) {
  return event("internal_link_click", {
    link_text: label,
    destination_url: destinationUrl,
    section,
    page_type: pageType,
  });
}

export function adImpression({
  pageType,
  pagePath,
  adSlot,
  deviceType,
}: AdEventParams) {
  return event("ad_impression", {
    page_type: pageType ?? getPageType(pagePath),
    page_path: pagePath,
    ad_slot: adSlot,
    device_type: deviceType ?? getDeviceType(),
  });
}

export function adClick({
  pageType,
  pagePath,
  adSlot,
  deviceType,
}: AdEventParams) {
  return event("ad_click", {
    page_type: pageType ?? getPageType(pagePath),
    page_path: pagePath,
    ad_slot: adSlot,
    device_type: deviceType ?? getDeviceType(),
  });
}
