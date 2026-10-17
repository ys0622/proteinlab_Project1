import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import { getActiveGoldboxCards } from "@/app/lib/activeGoldbox";
import { getProductsByCategoryAsync } from "@/app/lib/productData";
import { getProductImageUrl } from "@/app/lib/productImage";
import GoldboxCatalog, { type GoldboxCard } from "./GoldboxCatalog";

export const dynamic = "force-dynamic";
export const metadata = { title: "오늘의 골드박스 | ProteinLab", robots: { index: false, follow: true } };

export default async function GoldboxPage({ searchParams }: { searchParams: Promise<{ preview?: string }> }) {
  const params = await searchParams;
  const preview = process.env.NODE_ENV === "development" ? params.preview : undefined;
  let cards: GoldboxCard[];
  let status: "ready" | "unavailable";
  let checkedAt: string | null;

  if (preview) {
    const groups = await Promise.all(["drink", "bar", "yogurt", "shake", "soymilk"].map(category => getProductsByCategoryAsync(category as "drink" | "bar" | "yogurt" | "shake" | "soymilk")));
    cards = preview === "items" ? groups.flatMap(group => group.slice(0, 1)).map((product, index) => ({
      id: `preview-${index}`, slug: product.slug, name: product.name, brand: product.brand,
      category: product.productType ?? "drink", image: getProductImageUrl(product.slug) ?? "",
      offerName: "화면 예시 · 판매 구성 확인 전", price: [19900, 15900, 12900, 24900][index], href: null,
    })) : [];
    status = preview === "error" ? "unavailable" : "ready";
    checkedAt = null;
  } else {
    const activeGoldbox = await getActiveGoldboxCards();
    cards = activeGoldbox.cards;
    status = cards.length ? "ready" : activeGoldbox.status;
    checkedAt = activeGoldbox.checkedAt;
  }

  return <div className="min-h-screen bg-[#faf8f3]"><Header />
    <main className="mx-auto max-w-[960px] px-4 pb-10 pt-5">
      <GoldboxCatalog cards={cards} status={status} checkedAt={checkedAt} preview={Boolean(preview)} />
    </main><Footer /></div>;
}
