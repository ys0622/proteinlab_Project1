import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { getProductsByCategoryAsync } from "@/app/lib/productData";
import { fetchGoldboxSnapshot, matchRegisteredProductsToGoldbox } from "@/app/lib/coupangGoldbox";
import { getProductImageUrl } from "@/app/lib/productImage";
import GoldboxCatalog, { type GoldboxCard } from "./GoldboxCatalog";

export const dynamic = "force-dynamic";
export const metadata = { title: "오늘의 골드박스 | ProteinLab", robots: { index: false, follow: true } };

export default async function GoldboxPage({ searchParams }: { searchParams: Promise<{ preview?: string }> }) {
  const params = await searchParams;
  const preview = process.env.NODE_ENV === "development" ? params.preview : undefined;
  const groups = await Promise.all(["drink", "bar", "yogurt", "shake"].map(category => getProductsByCategoryAsync(category as "drink" | "bar" | "yogurt" | "shake")));
  const products = groups.flat();
  const snapshot = preview ? { status: "ready" as const, products: [], checkedAt: null } : await fetchGoldboxSnapshot();
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
  // App-confirmed offer omitted by the API; midnight is an editorial cutoff.
  const manualProduct = products.find(product => product.slug === "hymune-balance-active-original-250");
  // Dynamic server response: evaluate the editorial expiry on each request.
  // eslint-disable-next-line react-hooks/purity
  const manualOfferActive = Date.now() >= Date.parse("2026-10-06T08:10:00+09:00") && Date.now() < Date.parse("2026-10-07T00:00:00+09:00");
  if (!preview && manualProduct && manualOfferActive && !cards.some(card => card.slug === manualProduct.slug)) {
    cards.unshift({
      id: "app-confirmed-6979534638-15078790606", slug: manualProduct.slug,
      name: manualProduct.name, brand: manualProduct.brand, category: "drink",
      image: getProductImageUrl(manualProduct.slug) ?? "",
      offerName: "250mL × 18개 · 와우회원 할인 · 10/6 08:10 쿠팡 앱 확인",
      price: 23800, href: "https://link.coupang.com/a/e8NY4Oy9YW",
    });
  }
  return <div className="min-h-screen bg-[#faf8f3]"><Header />
    <main className="mx-auto max-w-[960px] px-4 pb-10 pt-5">
      <GoldboxCatalog cards={cards} status={preview === "error" ? "unavailable" : cards.length ? "ready" : snapshot.status} checkedAt={snapshot.checkedAt} preview={Boolean(preview)} />
    </main><Footer /></div>;
}
