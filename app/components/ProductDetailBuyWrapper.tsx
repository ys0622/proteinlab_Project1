"use client";

import { useRef } from "react";
import KakaoShareButton from "./KakaoShareButton";
import MobileStickyBuyButton from "./MobileStickyBuyButton";
import ProductDetailPurchaseActions, { type DiscontinuedAlternative } from "./ProductDetailPurchaseActions";

type Props = {
  brand: string;
  coupangHref: string | null;
  naverHref: string | null;
  officialMallHref: string | null;
  productName: string;
  slug: string;
  proteinG?: number;
  quickFacts?: string[];
  imageUrl?: string;
  description?: string;
  productType?: "drink" | "bar" | "yogurt" | "shake" | "soymilk";
  alternatives?: DiscontinuedAlternative[];
};

export default function ProductDetailBuyWrapper(props: Props) {
  const anchorRef = useRef<HTMLDivElement>(null);

  const shareTitle = `${props.brand} ${props.productName}${props.proteinG ? ` — 단백질 ${props.proteinG}g` : ""}`;
  const shareUrl = `/product/${props.slug}`;

  return (
    <>
      <div ref={anchorRef}>
        <ProductDetailPurchaseActions
          {...props}
          headerAction={
            // 카카오톡 공유: 따로 한 줄을 차지하지 않게 구매 카드 제목 줄 오른쪽 노란 동그라미로 둔다.
            <KakaoShareButton
              url={shareUrl}
              title={shareTitle}
              description={props.description ?? `ProteinLab에서 ${props.brand} ${props.productName} 성분을 확인했어요.`}
              imageUrl={props.imageUrl}
              variant="icon"
            />
          }
        />
      </div>

      <MobileStickyBuyButton
        coupangHref={props.coupangHref}
        brand={props.brand}
        productName={props.productName}
        slug={props.slug}
        productType={props.productType}
        anchorRef={anchorRef}
      />
    </>
  );
}
