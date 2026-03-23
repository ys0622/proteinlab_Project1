/**
 * GA4 client tracking helpers.
 *
 * Setup:
 * - GA script is injected once from app/layout.tsx
 * - NEXT_PUBLIC_GA_ID must contain the GA4 Measurement ID
 * - page_view is sent manually from the App Router tracker to avoid duplicates
 *
 * Realtime check:
 * 1. Open the deployed site in a normal browser window
 * 2. Move between pages inside the site
 * 3. In GA4 Realtime, confirm page_view / product_click / outbound_click events
 */

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID?.trim() ?? "";

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
};

function canTrack() {
  return typeof window !== "undefined" && typeof window.gtag === "function" && Boolean(GA_ID);
}

export function isAnalyticsReady() {
  return canTrack();
}

function getPageLocation(url: string) {
  if (typeof window === "undefined") {
    return url;
  }

  return new URL(url, window.location.origin).toString();
}

export function pageView(url: string) {
  if (!canTrack()) return false;

  window.gtag?.("event", "page_view", {
    page_path: url,
    page_location: getPageLocation(url),
    page_title: typeof document !== "undefined" ? document.title : undefined,
  });

  return true;
}

export function event(name: string, params: AnalyticsParams = {}) {
  if (!canTrack()) return;
  window.gtag?.("event", name, params);
}

export function productClick({
  productId,
  productName,
  brand,
  category,
  destinationUrl,
}: ProductClickParams) {
  event("product_click", {
    product_id: productId,
    product_name: productName,
    brand,
    category,
    destination_url: destinationUrl,
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
  event("outbound_click", {
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
}: PurchaseClickParams) {
  outboundClick({
    label: `${productName} | ${store}`,
    destinationUrl: destinationUrl ?? "",
    category: "purchase",
    store,
    productId,
    productName,
    brand,
  });

  event("purchase_click", {
    product_id: productId,
    product_name: productName,
    brand,
    store,
    destination_url: destinationUrl,
  });
}
