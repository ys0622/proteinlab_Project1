"use client";

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

  const shareTitle = `${props.brand} ${props.productName}${props.proteinG ? ` — 단백질 ${props.proteinG}g` : ""}`;
  const shareUrl = `/product/${props.slug}`;

  return (
    <>
      {/* 모바일은 하단 고정 바(MobileStickyBuyButton)가 쿠팡 버튼을 맡으므로 구매 카드를 숨겨 중복을 없앤다. 링크 없는 단종 제품은 대체 상품 안내 때문에 그대로 보인다. */}
      <div className={props.coupangHref ? "hidden md:block" : undefined}>
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
        quickFacts={props.quickFacts}
      />
    </>
  );
}
