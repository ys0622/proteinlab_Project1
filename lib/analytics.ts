/** Centralized GA4 event contract for ProteinLab. */

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
type Retailer = "coupang" | "naver" | "official";
export type PageType = "home" | "category" | "compare" | "product" | "guide" | "insight" | "feed" | "recommend" | "ranking";
export type LinkPosition =
  | "hero"
  | "product_card"
  | "spec_table"
  | "mid_content"
  | "bottom_cta"
  | "sticky_mobile"
  | "related_product"
  | "comparison_result"
  | "recommend_result"
  | "ranking"
  | "home_featured";
export type StandardEventName =
  | "product_card_click"
  | "product_detail_view"
  | "internal_cta_click"
  | "compare_add"
  | "compare_view"
  | "affiliate_click"
  | "retailer_click"
  | "filter_apply"
  | "sort_apply"
  | "recommend_start"
  | "recommend_complete";

type ProductParams = {
  productId?: string;
  productName?: string;
  productBrand?: string;
  productCategory?: string;
};
type FallbackPayload = { name: string; params: AnalyticsParams; clientId: string; sessionId: string };

function canTrackWithGtag() {
  return process.env.NODE_ENV === "production" && typeof window !== "undefined" && typeof window.gtag === "function" && Boolean(GA_ID);
}

function canUseFallback() {
  return process.env.NODE_ENV === "production" && typeof window !== "undefined" && Boolean(GA_ID);
}

export function isAnalyticsReady() {
  return canTrackWithGtag();
}

export function getPageType(pathname: string): PageType {
  if (pathname === "/") return "home";
  if (pathname.startsWith("/compare")) return "compare";
  if (pathname.startsWith("/product/")) return "product";
  if (pathname.startsWith("/recommend")) return "recommend";
  if (pathname.startsWith("/ranking")) return "ranking";
  if (pathname.startsWith("/guides/market-insights")) return "insight";
  if (pathname.startsWith("/guides")) return "guide";
  if (pathname.startsWith("/feed")) return "feed";
  return "category";
}

function getCurrentPagePath() {
  if (typeof window === "undefined") return "";
  return `${window.location.pathname}${window.location.search}`;
}

function getPageLocation(url: string) {
  if (typeof window === "undefined") return url;
  return new URL(url, window.location.origin).toString();
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
        window.sessionStorage.setItem(SESSION_ID_KEY, JSON.stringify({ ...parsed, touchedAt: Date.now() }));
        return parsed.id;
      }
    } catch {}
  }
  const sessionId = `${Date.now()}`;
  window.sessionStorage.setItem(SESSION_ID_KEY, JSON.stringify({ id: sessionId, touchedAt: Date.now() }));
  return sessionId;
}

function postFallback(name: string, params: AnalyticsParams) {
  if (!canUseFallback()) return false;
  const payload: FallbackPayload = { name, params, clientId: getOrCreateClientId(), sessionId: getOrCreateSessionId() };
  void fetch(ANALYTICS_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    keepalive: true,
  }).catch(() => {});
  return true;
}

function withCommonParams(params: AnalyticsParams = {}) {
  const pagePath = typeof params.page_path === "string" ? params.page_path : getCurrentPagePath();
  return {
    site_name: "proteinlab",
    page_type: typeof params.page_type === "string" ? params.page_type : getPageType(pagePath),
    page_path: pagePath,
    ...params,
  };
}

function sendEvent(name: string, params: AnalyticsParams = {}, allowFallback = true) {
  const payload = withCommonParams(params);
  if (process.env.NODE_ENV !== "production" && typeof window !== "undefined") {
    console.info("[ProteinLab analytics]", { eventName: name, params: payload, url: window.location.href, at: new Date().toISOString() });
  }
  if (canTrackWithGtag()) {
    window.gtag?.("event", name, payload);
    return true;
  }
  return allowFallback ? postFallback(name, payload) : false;
}

function productFields(product: ProductParams) {
  return {
    product_id: product.productId,
    product_name: product.productName,
    product_brand: product.productBrand,
    product_category: product.productCategory,
  };
}

export function pageView(url: string, pageReferrer?: string) {
  const params = {
    page_path: url,
    page_location: getPageLocation(url),
    page_title: typeof document !== "undefined" ? document.title : undefined,
    page_referrer: pageReferrer || undefined,
  };

  // Development keeps the event visible in the console without mixing local navigation into GA4.
  if (process.env.NODE_ENV !== "production") {
    sendEvent("page_view", params, false);
    return true;
  }

  return sendEvent("page_view", params, false);
}

/** Generic helper retained for non-standard events such as ad telemetry. */
export function event(name: string, params: AnalyticsParams = {}) {
  return sendEvent(name, params);
}

export function productCardClick(product: ProductParams & { linkPosition?: LinkPosition; contentId?: string }) {
  return sendEvent("product_card_click", { ...productFields(product), link_position: product.linkPosition ?? "product_card", content_id: product.contentId });
}

export function productClick(params: {
  productId: string;
  productName: string;
  brand: string;
  category?: string;
  destinationUrl?: string;
  source?: string;
  ctaText?: string;
}) {
  return productCardClick({
    productId: params.productId,
    productName: params.productName,
    productBrand: params.brand,
    productCategory: params.category,
    linkPosition: "product_card",
    contentId: params.source,
  });
}

export function productDetailView(product: ProductParams) {
  return sendEvent("product_detail_view", productFields(product));
}

export function internalCtaClick(params: { destinationUrl: string; contentId?: string; linkPosition?: LinkPosition; productId?: string }) {
  return sendEvent("internal_cta_click", {
    content_id: params.contentId ?? params.destinationUrl,
    link_position: params.linkPosition ?? "mid_content",
    destination_url: params.destinationUrl,
    destination_path: params.destinationUrl,
    product_id: params.productId,
  });
}

export function compareAdd(productId: string, compareCount: number) {
  return sendEvent("compare_add", { product_id: productId, compare_count: compareCount });
}

export function compareView(compareCount: number) {
  return sendEvent("compare_view", { compare_count: compareCount, link_position: "comparison_result" });
}

export function affiliateClick(product: ProductParams & { retailer: Retailer; destinationUrl: string; affiliateLinkId: string; linkPosition: LinkPosition }) {
  if (!product.affiliateLinkId || !product.destinationUrl) return false;
  return sendEvent("affiliate_click", {
    ...productFields(product), retailer: product.retailer, destination_url: product.destinationUrl,
    affiliate_link_id: product.affiliateLinkId, link_position: product.linkPosition,
  });
}

export function retailerClick(product: ProductParams & { retailer: Retailer; destinationUrl: string; linkPosition: LinkPosition }) {
  return sendEvent("retailer_click", {
    ...productFields(product), retailer: product.retailer, destination_url: product.destinationUrl, link_position: product.linkPosition,
  });
}

export function purchaseClick(params: {
  productId?: string;
  productName?: string;
  brand?: string;
  store: Retailer;
  destinationUrl?: string;
  placement?: string;
  ctaText?: string;
}) {
  return retailerClick({
    productId: params.productId,
    productName: params.productName,
    productBrand: params.brand,
    retailer: params.store,
    destinationUrl: params.destinationUrl ?? "",
    linkPosition: params.placement === "mobile_sticky_bar" ? "sticky_mobile" : "hero",
  });
}

export function filterApply(productCategory: string, contentId: string, resultCount?: number) {
  return sendEvent("filter_apply", {
    product_category: productCategory,
    content_id: contentId,
    filter_value: contentId,
    result_count: resultCount,
  });
}

export function sortApply(productCategory: string, contentId: string) {
  return sendEvent("sort_apply", { product_category: productCategory, content_id: contentId });
}

export function recommendStart(productCategory: string) {
  return sendEvent("recommend_start", { product_category: productCategory });
}

export function recommendComplete(productCategory: string, contentId?: string) {
  return sendEvent("recommend_complete", { product_category: productCategory, content_id: contentId });
}

export function getDeviceType() {
  if (typeof window === "undefined") return "unknown";
  if (window.matchMedia("(max-width: 767px)").matches) return "mobile";
  if (window.matchMedia("(max-width: 1023px)").matches) return "tablet";
  return "desktop";
}

export function adImpression(params: { pageType?: PageType; pagePath: string; adSlot: string; deviceType?: string }) {
  return event("ad_impression", {
    page_type: params.pageType ?? getPageType(params.pagePath),
    page_path: params.pagePath,
    ad_slot: params.adSlot,
    device_type: params.deviceType ?? getDeviceType(),
  });
}

export function adClick(params: { pageType?: PageType; pagePath: string; adSlot: string; deviceType?: string }) {
  return event("ad_click", {
    page_type: params.pageType ?? getPageType(params.pagePath),
    page_path: params.pagePath,
    ad_slot: params.adSlot,
    device_type: params.deviceType ?? getDeviceType(),
  });
}
