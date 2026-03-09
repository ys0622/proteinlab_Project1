type PurchaseStore = "coupang" | "naver" | "official_mall";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export const trackPurchaseClick = ({
  productName,
  brand,
  store,
  productId,
}: {
  productName: string;
  brand: string;
  store: PurchaseStore;
  productId: string;
}) => {
  if (typeof window === "undefined") return;
  if (typeof window.gtag !== "function") return;

  window.gtag("event", "purchase_link_click", {
    event_category: "engagement",
    event_label: `${productName} | ${store}`,
    product_id: productId,
    product_name: productName,
    brand,
    store,
  });
};

