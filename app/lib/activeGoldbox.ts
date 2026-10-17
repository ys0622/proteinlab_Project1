import { getProductsByCategoryAsync } from "@/app/lib/productData";
import { fetchGoldboxSnapshot, matchRegisteredProductsToGoldbox } from "@/app/lib/coupangGoldbox";
import { getVerifiedGoldboxOffers } from "@/app/lib/goldboxVerifiedOffers";
import { getProductImageUrl } from "@/app/lib/productImage";
import { getCoupangRedirectHref } from "@/app/lib/purchaseLinks";

export type GoldboxCategory = "drink" | "bar" | "yogurt" | "shake" | "soymilk";
export const GOLDBOX_CATEGORIES: GoldboxCategory[] = ["drink", "bar", "yogurt", "shake", "soymilk"];

export interface ActiveGoldboxCard {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: GoldboxCategory;
  image: string;
  offerName: string;
  /** 0이면 가격을 표시하지 않는다(앱에서 확인한 수동 등록 특가). */
  price: number;
  href: string | null;
}

/**
 * 지금 유효한 골드박스 카드: 쿠팡 골드박스 API 피드에서 등록 제품과 맞은 것 + 사용자가 앱에서 확인해 넣은 수동 특가.
 * /goldbox, /api/goldbox/active 가 같이 쓴다. 수동 특가 href가 없으면 제품 쿠팡 링크를 딥링크 경로로 바꿔 쓴다.
 */
export async function getActiveGoldboxCards(): Promise<{ cards: ActiveGoldboxCard[]; status: string; checkedAt: string | null }> {
  const groups = await Promise.all(GOLDBOX_CATEGORIES.map((category) => getProductsByCategoryAsync(category)));
  const products = groups.flat();
  const [snapshot, verifiedOffers] = await Promise.all([fetchGoldboxSnapshot(), getVerifiedGoldboxOffers()]);
  const cards: ActiveGoldboxCard[] = matchRegisteredProductsToGoldbox(products, snapshot.products).map(({ product, deal }) => ({
    id: String(deal.productId),
    slug: product.slug,
    name: product.name,
    brand: product.brand,
    category: (product.productType ?? "drink") as GoldboxCategory,
    image: getProductImageUrl(product.slug) ?? deal.productImage,
    offerName: deal.productName,
    price: deal.productPrice,
    href: deal.productUrl,
  }));
  for (const offer of verifiedOffers) {
    if (cards.some((card) => card.slug === offer.slug)) continue;
    const product = products.find((item) => item.slug === offer.slug);
    if (!product) continue;
    const category = (product.productType ?? "drink") as GoldboxCategory;
    cards.unshift({
      id: `verified-${offer.slug}`,
      slug: product.slug,
      name: product.name,
      brand: product.brand,
      category,
      image: getProductImageUrl(product.slug) ?? "",
      offerName: offer.offerName,
      price: offer.price,
      href: offer.href || getCoupangRedirectHref(product.coupangUrl, category, product.slug),
    });
  }
  return { cards, status: snapshot.status, checkedAt: snapshot.checkedAt };
}
