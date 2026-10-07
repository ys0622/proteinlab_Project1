import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { verifySessionToken } from "@/app/lib/session";
import { getAllProductsAsync } from "@/app/lib/productData";
import { fetchGoldboxSnapshot, matchRegisteredProductsToGoldbox } from "@/app/lib/coupangGoldbox";
import {
  getVerifiedGoldboxOffers,
  removeVerifiedGoldboxOffer,
  saveVerifiedGoldboxOffer,
  type VerifiedGoldboxOffer,
} from "@/app/lib/goldboxVerifiedOffers";

export const dynamic = "force-dynamic";

async function authorized(): Promise<boolean> {
  const token = (await cookies()).get("proteinlab_session")?.value;
  return token ? verifySessionToken(token) : false;
}

function isCoupangUrl(raw: string): boolean {
  try {
    const url = new URL(raw);
    return url.protocol === "https:" && url.hostname === "link.coupang.com";
  } catch {
    return false;
  }
}

export async function GET() {
  if (!(await authorized())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const [offers, snapshot, products] = await Promise.all([
    getVerifiedGoldboxOffers(), fetchGoldboxSnapshot(), getAllProductsAsync(),
  ]);
  const matchedIds = new Set(matchRegisteredProductsToGoldbox(products, snapshot.products).map(item => item.deal.productId));
  const unmatchedCandidates = snapshot.products
    .filter(item => !matchedIds.has(item.productId) && /단백질|프로틴|protein|쉐이크|요거트|두유/i.test(item.productName))
    .slice(0, 30)
    .map(item => ({ productId: item.productId, name: item.productName, price: item.productPrice, href: item.productUrl }));
  return NextResponse.json({ offers, unmatchedCandidates }, { headers: { "Cache-Control": "no-store" } });
}

export async function POST(request: Request) {
  if (!(await authorized())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json().catch(() => null) as Partial<VerifiedGoldboxOffer> | null;
  const slug = body?.slug?.trim() ?? "";
  const offerName = body?.offerName?.trim() ?? "";
  const href = body?.href?.trim() ?? "";
  const price = Number(body?.price);
  const start = Date.parse(body?.startsAt ?? "");
  const end = Date.parse(body?.expiresAt ?? "");
  const now = Date.now();
  if (!slug || offerName.length < 4 || offerName.length > 160 || !isCoupangUrl(href) ||
    !Number.isInteger(price) || price <= 0 || price > 10_000_000 ||
    (body?.source !== "coupang_app" && body?.source !== "coupang_web") ||
    !Number.isFinite(start) || !Number.isFinite(end) || start > now ||
    end <= now || end <= start || end - start > 36 * 60 * 60 * 1000) {
    return NextResponse.json({ error: "제품·가격·쿠팡 파트너스 링크(link.coupang.com)·확인 시각·만료 시각을 확인해 주세요. 최대 36시간만 게시할 수 있습니다." }, { status: 400 });
  }
  const products = await getAllProductsAsync();
  if (!products.some(item => item.slug === slug)) {
    return NextResponse.json({ error: "프로틴랩에 등록된 제품만 게시할 수 있습니다." }, { status: 400 });
  }
  const offer: VerifiedGoldboxOffer = {
    slug, offerName, href, price, source: body.source,
    verifiedAt: new Date().toISOString(), startsAt: new Date(start).toISOString(), expiresAt: new Date(end).toISOString(),
  };
  if (!(await saveVerifiedGoldboxOffer(offer))) {
    return NextResponse.json({ error: "KV 저장소를 사용할 수 없습니다." }, { status: 503 });
  }
  return NextResponse.json({ ok: true, offer });
}

export async function DELETE(request: Request) {
  if (!(await authorized())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await request.json().catch(() => null) as { slug?: string } | null;
  const slug = body?.slug?.trim() ?? "";
  if (!slug) return NextResponse.json({ error: "slug가 필요합니다." }, { status: 400 });
  if (!(await removeVerifiedGoldboxOffer(slug))) {
    return NextResponse.json({ error: "KV 저장소를 사용할 수 없습니다." }, { status: 503 });
  }
  return NextResponse.json({ ok: true });
}
