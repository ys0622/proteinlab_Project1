// 편의점 단백질 1+1·2+1 행사(KV `cvs-deals:v1`, scripts/cvs/monthly-cvs.mjs가 매일 갱신 — 배포 불필요).
// 출처: CU 공식 행사상품, 세븐일레븐 이달의 증정할인. GS25는 웹 목록이 없어(앱 전용) 빠진다.
import { getCloudflareContext } from "@opennextjs/cloudflare";

export type ConvenienceStore = "CU" | "세븐일레븐";
export type ConvenienceDealType = "1+1" | "2+1";

export interface ConvenienceDealOffer {
  store: ConvenienceStore;
  type: ConvenienceDealType;
  /** 편의점 정상가(원, 1개). */
  price: number;
  /** 편의점 행사 목록의 상품명 그대로. */
  storeName: string;
}

export interface ConvenienceDealGroup {
  key: "drink" | "bar-shake" | "yogurt" | "soymilk";
  title: string;
  items: { slug: string; offers: ConvenienceDealOffer[] }[];
}

export interface ConvenienceDeals {
  month: string;
  checkedAt: string;
  until: string;
  showFrom: string;
  validUntil: string;
  groups: ConvenienceDealGroup[];
}

const KV_KEY = "cvs-deals:v1";

interface KVLike {
  get(key: string): Promise<string | null>;
}

/** 지금 보여 줄 행사 목록. 없거나 기간 밖(지난달 값)이면 null — 칸을 숨긴다. */
export async function getConvenienceDeals(): Promise<ConvenienceDeals | null> {
  try {
    const { env } = await getCloudflareContext({ async: true });
    const kv = (env as Record<string, unknown>).GUIDES_STATIC_DRAFTS_KV as KVLike | undefined;
    if (!kv || typeof kv.get !== "function") return null;
    const raw = await kv.get(KV_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as ConvenienceDeals;
    const now = Date.now();
    if (!Array.isArray(data.groups)) return null;
    if (Date.parse(data.showFrom) > now || Date.parse(data.validUntil) < now) return null;
    return data;
  } catch {
    return null;
  }
}

/** 행사 묶음으로 샀을 때 1개 값(원 단위 반올림). */
export function getDealUnitPrice(offer: ConvenienceDealOffer): number {
  return offer.type === "1+1" ? Math.round(offer.price / 2) : Math.round((offer.price * 2) / 3);
}
