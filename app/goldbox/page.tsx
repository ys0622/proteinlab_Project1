import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { getProductsByCategoryAsync } from "@/app/lib/productData";
import { fetchGoldboxSnapshot, matchRegisteredProductsToGoldbox } from "@/app/lib/coupangGoldbox";
import { getProductImageUrl } from "@/app/lib/productImage";
import { getVerifiedGoldboxOffers } from "@/app/lib/goldboxVerifiedOffers";
import GoldboxCatalog, { type GoldboxCard } from "./GoldboxCatalog";

export const dynamic = "force-dynamic";
export const metadata = { title: "오늘의 골드박스 | ProteinLab", robots: { index: false, follow: true } };

export default async function GoldboxPage({ searchParams }: { searchParams: Promise<{ preview?: string }> }) {
  const params = await searchParams;
  const preview = process.env.NODE_ENV === "development" ? params.preview : undefined;
  const groups = await Promise.all(["drink", "bar", "yogurt", "shake"].map(category => getProductsByCategoryAsync(category as "drink" | "bar" | "yogurt" | "shake")));
  const products = groups.flat();
  const [snapshot, verifiedOffers] = await Promise.all([
    preview ? Promise.resolve({ status: "ready" as const, products: [], checkedAt: null }) : fetchGoldboxSnapshot(),
    preview ? Promise.resolve([]) : getVerifiedGoldboxOffers(),
  ]);
  const matches = matchRegisteredProductsToGoldbox(products, snapshot.products);
  let cards: GoldboxCard[] = matches.map(({ product, deal }) => ({
    id: String(deal.productId), slug: product.slug, name: product.name, brand: product.brand,
    category: product.productType ?? "drink", image: getProductImageUrl(product.slug) ?? deal.productImage,
    offerName: deal.productName, price: deal.productPrice, href: deal.productUrl,
  }));
  if (preview === "items") {
    cards = groups.flatMap(group => group.slice(0, 1)).map((product, index) => ({
      id: `preview-${index}`, slug: product.slug, name: product.name, brand: product.brand,
      category: product.productType ?? "drink", image: getProductImageUrl(product.slug) ?? "",
      offerName: "화면 예시 · 판매 구성 확인 전", price: [19900, 15900, 12900, 24900][index], href: null,
    }));
  }
  for (const offer of verifiedOffers) {
    if (cards.some(card => card.slug === offer.slug)) continue;
    const product = products.find(item => item.slug === offer.slug);
    if (!product) continue;
    cards.unshift({
      id: `verified-${offer.slug}`, slug: product.slug,
      name: product.name, brand: product.brand, category: product.productType ?? "drink",
      image: getProductImageUrl(product.slug) ?? "",
      offerName: offer.offerName, price: offer.price, href: offer.href || product.coupangUrl || null,
    });
  }
  return <div className="min-h-screen bg-[#faf8f3]"><Header />
    <main className="mx-auto max-w-[960px] px-4 pb-10 pt-5">
      <GoldboxCatalog cards={cards} status={preview === "error" ? "unavailable" : cards.length ? "ready" : snapshot.status} checkedAt={snapshot.checkedAt} preview={Boolean(preview)} />
    </main><Footer /></div>;
}
