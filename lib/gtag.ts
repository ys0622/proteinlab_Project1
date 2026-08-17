import {
  event,
  internalCtaClick,
  retailerClick,
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
  retailerClick({
    productId,
    productName,
    productBrand: brand,
    retailer: store,
    destinationUrl: destinationUrl ?? "",
    linkPosition: "product_card",
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
  internalCtaClick({
    destinationUrl: destination,
    contentId: `${section}:${label}`,
  });
};

export const trackEvent = event;
