import {
  getAffiliateLink,
  getAffiliateLinkRecord,
  getAffiliateUrl,
} from "../app/data/affiliateLinks";

const knownProductId = "takefit-max-choco-250";
const record = getAffiliateLinkRecord(knownProductId, "proteinlab", "coupang");

if (!record || record.status !== "PENDING") {
  throw new Error("Expected the ProteinLab Coupang template record to remain pending.");
}

if (getAffiliateLink(knownProductId, "proteinlab", "coupang") !== null) {
  throw new Error("Pending affiliate records must not be returned as usable links.");
}

if (getAffiliateUrl("missing-product", "proteinlab", "coupang") !== null) {
  throw new Error("Unknown products must safely resolve to null.");
}

console.log("Affiliate link lookup safety checks passed.");
