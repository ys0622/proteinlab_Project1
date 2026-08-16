"use client";

import { useRef } from "react";
import KakaoShareButton from "./KakaoShareButton";
import MobileStickyBuyButton from "./MobileStickyBuyButton";
import ProductDetailPurchaseActions from "./ProductDetailPurchaseActions";

type Props = {
  brand: string;
  coupangHref: string | null;
  naverHref: string | null;
  officialMallHref: string | null;
  productName: string;
  slug: string;
  proteinG?: number;
  imageUrl?: string;
  description?: string;
};

export default function ProductDetailBuyWrapper(props: Props) {
  const anchorRef = useRef<HTMLDivElement>(null);

  const shareTitle = `${props.brand} ${props.productName}${props.proteinG ? ` — 단백질 ${props.proteinG}g` : ""}`;
  const shareUrl = `/product/${props.slug}`;

  return (
    <>
      <div ref={anchorRef}>
        <ProductDetailPurchaseActions {...props} />
      </div>

      {/* 카카오톡 공유 */}
      <div className="mt-3">
        <KakaoShareButton
          url={shareUrl}
          title={shareTitle}
          description={props.description ?? `ProteinLab에서 ${props.brand} ${props.productName} 성분을 확인했어요.`}
          imageUrl={props.imageUrl}
          className="w-full py-3 text-[14px]"
        />
      </div>

      <MobileStickyBuyButton
        coupangHref={props.coupangHref}
        brand={props.brand}
        productName={props.productName}
        slug={props.slug}
        anchorRef={anchorRef}
      />
    </>
  );
}
