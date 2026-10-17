import { NextResponse } from "next/server";
import { getActiveGoldboxCards } from "@/app/lib/activeGoldbox";

export const dynamic = "force-dynamic";

// 상품 상세(1시간 캐시)·카테고리 목록의 "오늘의 골드박스" 줄이 브라우저에서 부른다.
// 골드박스는 매일 07:00에 바뀌므로 응답은 5분만 캐시한다.
export async function GET() {
  const { cards } = await getActiveGoldboxCards();
  return NextResponse.json(
    { cards: cards.filter((card) => card.href) },
    { headers: { "Cache-Control": "public, max-age=300, s-maxage=300" } },
  );
}
