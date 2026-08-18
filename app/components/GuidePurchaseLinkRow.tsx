"use client";

import { retailerClick } from "@/lib/analytics";
import PurchaseLinkRow from "./PurchaseLinkRow";

type GuidePurchaseLinkRowProps = {
  productId: string;
  productName: string;
  brand: string;
  category: string;
  coupangHref: string | null;
  naverHref: string | null;
  officialMallHref: string | null;
};

export default function GuidePurchaseLinkRow(props: GuidePurchaseLinkRowProps) {
  const track = (retailer: "coupang" | "naver" | "official", destinationUrl: string | null) =>
    retailerClick({
      productId: props.productId,
      productName: props.productName,
      productBrand: props.brand,
      productCategory: props.category,
      retailer,
      destinationUrl: destinationUrl ?? "",
      linkPosition: "related_product",
    });

  return (
    <PurchaseLinkRow
      coupangHref={props.coupangHref}
      naverHref={props.naverHref}
      officialMallHref={props.officialMallHref}
      coupangOnly
      size="sm"
      onCoupangClick={() => track("coupang", props.coupangHref)}
      onNaverClick={() => track("naver", props.naverHref)}
      onOfficialClick={() => track("official", props.officialMallHref)}
    />
  );
}
