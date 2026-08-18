import proteinlabAffiliateLinksData from "./affiliateLinks.proteinlab.json";

export const AFFILIATE_SITES = ["proteinlab", "caremap"] as const;
export const AFFILIATE_RETAILERS = ["coupang", "naver", "official"] as const;
export const AFFILIATE_LINK_STATUSES = ["ACTIVE", "PENDING", "BROKEN", "INACTIVE"] as const;

export type AffiliateSite = (typeof AFFILIATE_SITES)[number];
export type AffiliateRetailer = (typeof AFFILIATE_RETAILERS)[number];
export type AffiliateLinkStatus = (typeof AFFILIATE_LINK_STATUSES)[number];

export interface AffiliateLinkRecord {
  productId: string;
  site: AffiliateSite;
  retailer: AffiliateRetailer;
  affiliateUrl: string;
  affiliateLinkId: string;
  channelId: string;
  status: AffiliateLinkStatus;
  updatedAt: string;
  lastCheckedAt: string;
}

type AffiliateLinkStore = {
  schemaVersion: number;
  site: AffiliateSite;
  records: AffiliateLinkRecord[];
};

const store = proteinlabAffiliateLinksData as AffiliateLinkStore;
const records = store.records.map((record) => ({ ...record }));

function isValidAffiliateUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

/** Returns the management record, including pending or inactive entries. */
export function getAffiliateLinkRecord(
  productId: string,
  site: AffiliateSite,
  retailer: AffiliateRetailer,
): AffiliateLinkRecord | null {
  return (
    records.find(
      (record) =>
        record.productId === productId && record.site === site && record.retailer === retailer,
    ) ?? null
  );
}

/**
 * Returns only a link that is safe for a future purchase CTA to use.
 * Pending, broken, inactive, blank, and malformed entries always resolve to null.
 */
export function getAffiliateLink(
  productId: string,
  site: AffiliateSite,
  retailer: AffiliateRetailer,
): AffiliateLinkRecord | null {
  const record = getAffiliateLinkRecord(productId, site, retailer);
  if (!record || record.status !== "ACTIVE" || !isValidAffiliateUrl(record.affiliateUrl)) {
    return null;
  }
  return record;
}

export function getAffiliateUrl(
  productId: string,
  site: AffiliateSite,
  retailer: AffiliateRetailer,
): string | null {
  return getAffiliateLink(productId, site, retailer)?.affiliateUrl ?? null;
}

export function getAffiliateLinksForProduct(
  productId: string,
  site: AffiliateSite,
): AffiliateLinkRecord[] {
  return records.filter((record) => record.productId === productId && record.site === site);
}

