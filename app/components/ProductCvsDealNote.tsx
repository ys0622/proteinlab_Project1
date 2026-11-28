import Link from "next/link";
import { getConvenienceDeals, getDealUnitPrice } from "@/app/lib/convenienceDeals";

const GUIDE_HREF = "/guides/product-selection-comparison/convenience-store-protein-guide#cvs-deals";

/**
 * 제품 상세 구매 버튼 위 한 줄: 이 제품이 이번 달 편의점 1+1·2+1 행사 중이면 보여 준다(2026-11-28 시안).
 * 값은 편의점 가이드와 같은 KV(cvs-deals:v1). 행사가 없거나 기간 밖이면 아무것도 그리지 않는다.
 */
export default async function ProductCvsDealNote({ slug }: { slug: string }) {
  const deals = await getConvenienceDeals();
  const item = deals?.groups.flatMap((g) => g.items).find((i) => i.slug === slug);
  if (!deals || !item || item.offers.length === 0) return null;

  return (
    <div className="mb-2 rounded-2xl border px-3 py-2.5" style={{ borderColor: "#F2C94C", background: "#FFF9E6" }}>
      <p className="text-[12px] font-bold" style={{ color: "#7A5A00" }}>
        {deals.month} 편의점 행사 중 · {deals.until}
      </p>
      <ul className="mt-1 space-y-0.5">
        {item.offers.map((offer) => (
          <li key={offer.store} className="text-[13px] leading-snug" style={{ color: "#1E2A22" }}>
            <b>{offer.store === "세븐일레븐" ? "세븐일레븐" : "CU"} {offer.type}</b> · 정가 {offer.price.toLocaleString("ko-KR")}원 →{" "}
            <b>개당 {getDealUnitPrice(offer).toLocaleString("ko-KR")}원</b>
          </li>
        ))}
      </ul>
      <p className="mt-1 text-[11px] leading-snug" style={{ color: "#5F6B61" }}>
        여러 개 살 땐 쿠팡 박스 가격과 비교해 보세요.{" "}
        <Link href={GUIDE_HREF} className="font-semibold underline underline-offset-2" style={{ color: "#1F5A3D" }}>
          이번 달 편의점 행사 전체 보기
        </Link>
      </p>
    </div>
  );
}
