import {
  event,
  outboundClick,
  purchaseClick,
} from "./analytics";

type PurchaseStore = "coupang" | "naver" | "official";

export const trackPurchaseClick = ({
  productName,
  brand,
  store,
  productId,
  destinationUrl,
}: {
  productName: string;
  brand: string;
  store: PurchaseStore;
  productId: string;
  destinationUrl?: string;
}) => {
  purchaseClick({
    productId,
    productName,
    brand,
    store,
    destinationUrl,
  });
};

export const trackNavigationClick = ({
  section,
  destination,
  label,
}: {
  section: string;
  destination: string;
  label: string;
}) => {
  outboundClick({
    label: `${section} | ${label}`,
    destinationUrl: destination,
    category: "navigation",
  });
};

export const trackEvent = event;
