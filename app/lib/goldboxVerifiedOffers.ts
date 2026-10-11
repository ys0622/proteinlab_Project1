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
  // 2026-10-11 09:32 쿠팡 앱 골드박스에서 사용자가 확인. 화면의 "21:27:44 남음"으로 계산한 종료 시각(10/12 07:00).
  // 가격은 앱 전용 값이라 웹에서 확인되지 않아 표시하지 않는다(price 0 = 가격 줄 숨김).
  // 제품 데이터의 쿠팡 링크는 125ml 옵션으로 열리므로, 190ml × 24개 옵션을 직접 선택해야 한다.
  slug: "sellex-protein-lowsugar-190",
  offerName: "190mL × 24개 · 와우회원 할인 · 쿠팡 앱 확인",
  price: 0,
  href: "",
  source: "coupang_app",
  verifiedAt: "2026-10-11T09:32:00+09:00",
  startsAt: "2026-10-11T09:32:00+09:00",
  expiresAt: "2026-10-12T07:00:00+09:00",
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
