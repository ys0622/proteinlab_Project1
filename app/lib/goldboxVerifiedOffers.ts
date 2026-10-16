import "server-only";

import { getCloudflareContext } from "@opennextjs/cloudflare";

const KEY = "coupang-goldbox:verified-offers:v1";
const SUPPRESSED_KEY = "coupang-goldbox:suppressed-seeds:v1";

interface OfferKV {
  get(key: string): Promise<string | null>;
  put(key: string, value: string): Promise<void>;
}

export interface VerifiedGoldboxOffer {
  slug: string;
  offerName: string;
  price: number;
  href: string;
  source: "coupang_app" | "coupang_web";
  verifiedAt: string;
  startsAt: string;
  expiresAt: string;
}

// One already-confirmed offer is retained through its original editorial cutoff.
// Future confirmations are stored in KV through /admin/goldbox without a deployment.
const EXPIRING_SEED: VerifiedGoldboxOffer[] = [{
  // 2026-10-12 사용자가 쿠팡 골드박스 상품으로 확인해 알려 준 제품(링크 hL84FefD7k, 125ml 24개 옵션). 웹 상품 페이지에는 와우쿠폰 할인가가 보이나
  // 종료 시각은 사용자가 보낸 앱 골드박스 화면(09:33, 남은 시간 21:26:27, "매일 아침 7시에 시작")으로 계산한 10/13 07:00. 화면에 이 제품 카드는 없고 골드박스 전체 타이머 기준이다.
  // 가격은 표시하지 않는다(price 0 = 가격 줄 숨김).
  slug: "hymune-drinking-protein-balance-125",
  offerName: "125mL × 24개 · 와우회원 할인 · 쿠팡 확인",
  price: 0,
  href: "https://link.coupang.com/a/hL84FefD7k",
  source: "coupang_app",
  verifiedAt: "2026-10-12T09:02:00+09:00",
  startsAt: "2026-10-12T09:02:00+09:00",
  expiresAt: "2026-10-13T07:00:00+09:00",
}, {
  // 2026-10-12 사용자가 쿠팡 골드박스 화면(상품 카드 타이머 14:19:51 남음, 16:40경)으로 확인해 알려 준 제품(링크 hMGhgfxaj6, 190ml 24개 옵션).
  // 남은 시간 14:19:51 = 10/13 07:00 종료로 계산했다(위 항목과 같은 골드박스 종료 시각). 가격은 표시하지 않는다(price 0 = 가격 줄 숨김).
  slug: "maeil-999-plain-unsweetened-190",
  offerName: "190mL × 24개 · 와우회원 쿠폰 할인 · 쿠팡 확인",
  price: 0,
  href: "https://link.coupang.com/a/hMGhgfxaj6",
  source: "coupang_app",
  verifiedAt: "2026-10-12T16:40:00+09:00",
  startsAt: "2026-10-12T16:40:00+09:00",
  expiresAt: "2026-10-13T07:00:00+09:00",
}, {
  // 2026-10-14 사용자가 쿠팡 앱 골드박스 화면(07:27, 상품 카드 타이머 23:32:42 남음)으로 확인해 알려 준 제품(링크 hMB2VuJloO, 240ml 16개 옵션).
  // 07:27 + 23:32:42 = 10/15 07:00 종료로 계산했다. 가격은 표시하지 않는다(price 0 = 가격 줄 숨김).
  slug: "yonsei-protein-pro-plain-240",
  offerName: "240mL × 16개 · 와우회원 할인 · 쿠팡 확인",
  price: 0,
  href: "https://link.coupang.com/a/hMB2VuJloO",
  source: "coupang_app",
  verifiedAt: "2026-10-14T07:27:00+09:00",
  startsAt: "2026-10-14T07:27:00+09:00",
  expiresAt: "2026-10-15T07:00:00+09:00",
}, {
  // 2026-10-15 사용자가 쿠팡 앱 골드박스 화면(07:26, 상품 카드 타이머 23:33:45 남음)으로 확인해 알려 준 제품(하이뮨 프로틴 울트라 블랙초코 400ml 6개).
  // 07:26 + 23:33:45 = 10/16 07:00 종료. 골드박스 전용 링크를 받기 전이라 등록된 제품의 기존 파트너스 링크를 쓴다. 가격은 표시하지 않는다(price 0).
  slug: "hymune-ultra-400",
  offerName: "400mL × 6개 · 와우회원 할인 · 쿠팡 확인",
  price: 0,
  href: "https://link.coupang.com/a/e8M0byZ67g",
  source: "coupang_app",
  verifiedAt: "2026-10-15T07:26:00+09:00",
  startsAt: "2026-10-15T07:26:00+09:00",
  expiresAt: "2026-10-16T07:00:00+09:00",
}, {
  // 2026-10-16 사용자가 쿠팡 앱 골드박스로 알려 준 제품(앱솔리 퀴노아 약콩두유 무가당 190ml 20개, 상품 7297343190 · 옵션 17834583104/95893832724).
  // 골드박스는 매일 07:00 시작이라 10/17 07:00 종료로 둔다. 링크는 사용자가 준 파트너스 단축 링크 hSJmyGz6bI. 가격은 표시하지 않는다(price 0).
  slug: "absolli-quinoa-yakkong-unsweetened-190",
  offerName: "190mL × 20개 · 와우회원 할인 · 쿠팡 확인",
  price: 0,
  href: "https://link.coupang.com/a/hSJmyGz6bI",
  source: "coupang_app",
  verifiedAt: "2026-10-16T07:21:00+09:00",
  startsAt: "2026-10-16T07:00:00+09:00",
  expiresAt: "2026-10-17T07:00:00+09:00",
}, {
  // 2026-10-17 사용자가 쿠팡 앱 골드박스로 알려 준 제품 2개(매일 07:00 시작, 10/18 07:00 종료).
  // 링크는 골드박스 구성(입수) 옵션의 쿠팡 상품 ID를 /api/out/coupang 으로 넘겨 파트너스 딥링크로 바꾼다.
  // 매일두유 렌틸콩 저당두유 190ml 24개: 상품 8890159701 · 옵션 25954822614/92929093931.
  slug: "maeil-lentil-lowsugar-190",
  offerName: "190mL × 24개 · 와우회원 할인 · 쿠팡 확인",
  price: 0,
  href: "/api/out/coupang?pageKey=8890159701&itemId=25954822614&vendorItemId=92929093931&category=soymilk&slug=maeil-lentil-lowsugar-190",
  source: "coupang_app",
  verifiedAt: "2026-10-17T08:00:00+09:00",
  startsAt: "2026-10-17T07:00:00+09:00",
  expiresAt: "2026-10-18T07:00:00+09:00",
}, {
  // 밥스누 약콩두유 오리지널 190ml 16개: 상품 293207724 · 옵션 282799371/3693311847.
  slug: "bobsnu-yakkong-original-190",
  offerName: "190mL × 16개 · 와우회원 할인 · 쿠팡 확인",
  price: 0,
  href: "/api/out/coupang?pageKey=293207724&itemId=282799371&vendorItemId=3693311847&category=soymilk&slug=bobsnu-yakkong-original-190",
  source: "coupang_app",
  verifiedAt: "2026-10-17T07:59:00+09:00",
  startsAt: "2026-10-17T07:00:00+09:00",
  expiresAt: "2026-10-18T07:00:00+09:00",
}];

async function getKV(): Promise<OfferKV | null> {
  try {
    const { env } = await getCloudflareContext({ async: true });
    const value = (env as Record<string, unknown>).GUIDES_STATIC_DRAFTS_KV as Partial<OfferKV> | undefined;
    return value && typeof value.get === "function" && typeof value.put === "function" ? value as OfferKV : null;
  } catch {
    return null;
  }
}

function isOffer(value: unknown): value is VerifiedGoldboxOffer {
  if (!value || typeof value !== "object") return false;
  const offer = value as Record<string, unknown>;
  let safeHref = offer.href === "";
  if (typeof offer.href === "string" && offer.href) {
    try {
      const url = new URL(offer.href);
      safeHref = url.protocol === "https:" && url.hostname === "link.coupang.com";
    } catch { safeHref = false; }
  }
  return typeof offer.slug === "string" && typeof offer.offerName === "string" &&
    typeof offer.price === "number" && Number.isFinite(offer.price) && offer.price > 0 && safeHref &&
    (offer.source === "coupang_app" || offer.source === "coupang_web") &&
    typeof offer.verifiedAt === "string" && typeof offer.startsAt === "string" &&
    typeof offer.expiresAt === "string";
}

function parseSuppressed(raw: string | null): string[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === "string") : [];
  } catch { return []; }
}

export async function getVerifiedGoldboxOffers(now = Date.now()): Promise<VerifiedGoldboxOffer[]> {
  const kv = await getKV();
  let saved: VerifiedGoldboxOffer[] = [];
  let suppressed: string[] = [];
  if (kv) {
    const [raw, suppressedRaw] = await Promise.all([
      kv.get(KEY).catch(() => null), kv.get(SUPPRESSED_KEY).catch(() => null),
    ]);
    if (raw) {
      try {
        const parsed = JSON.parse(raw) as unknown;
        if (Array.isArray(parsed)) saved = parsed.filter(isOffer);
      } catch {
        // An invalid override must not break the public page.
      }
    }
    suppressed = parseSuppressed(suppressedRaw);
  }
  const bySlug = new Map<string, VerifiedGoldboxOffer>();
  for (const offer of [...EXPIRING_SEED.filter(item => !suppressed.includes(item.slug)), ...saved]) {
    if (Date.parse(offer.startsAt) <= now && Date.parse(offer.expiresAt) > now) bySlug.set(offer.slug, offer);
  }
  return [...bySlug.values()];
}

export async function saveVerifiedGoldboxOffer(offer: VerifiedGoldboxOffer): Promise<boolean> {
  const kv = await getKV();
  if (!kv) return false;
  const active = await getVerifiedGoldboxOffers();
  const next = [...active.filter((item) => item.slug !== offer.slug), offer];
  const suppressedRaw = await kv.get(SUPPRESSED_KEY).catch(() => null);
  const suppressed = parseSuppressed(suppressedRaw);
  await Promise.all([
    kv.put(KEY, JSON.stringify(next)),
    kv.put(SUPPRESSED_KEY, JSON.stringify(suppressed.filter(item => item !== offer.slug))),
  ]);
  return true;
}

export async function removeVerifiedGoldboxOffer(slug: string): Promise<boolean> {
  const kv = await getKV();
  if (!kv) return false;
  const active = await getVerifiedGoldboxOffers();
  const suppressedRaw = await kv.get(SUPPRESSED_KEY).catch(() => null);
  const suppressed = parseSuppressed(suppressedRaw);
  await Promise.all([
    kv.put(KEY, JSON.stringify(active.filter((item) => item.slug !== slug))),
    kv.put(SUPPRESSED_KEY, JSON.stringify([...new Set([...suppressed, slug])])),
  ]);
  return true;
}
