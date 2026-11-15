import { getStaticProductBySlug } from "./productDataStatic";
import { formatProductLabel } from "./productLabel";
import { isComparableServing } from "./servingScope";
import { formatSugar } from "./sugarLabel";
import { withTopic } from "./koreanParticle";
import type { ProductDetailProps } from "@/app/data/products";

// 비교 가이드 첫 화면 한 줄 답(2026-11-15). ChatGPT 유입 랜딩 160세션 중 40이 비교 가이드인데,
// 100개 중 69개가 첫 문장에 수치가 없었다. 그 페이지에 나온 제품의 성분표 1회 기준 수치로 계산한다.

function num(v: unknown): v is number {
  return typeof v === "number" && Number.isFinite(v);
}

function label(p: ProductDetailProps) {
  // 괄호는 풀어 쓴다(문장 안 괄호 겹침 방지).
  return formatProductLabel(p.brand, p.name).replace(/\s*\(([^)]*)\)/g, " $1").trim();
}

function facts(p: ProductDetailProps) {
  const parts = [`단백질 ${p.proteinPerServing}g`];
  const sugar = formatSugar(p);
  if (sugar) parts.push(`당류 ${sugar}`);
  if (num(p.calories)) parts.push(`${p.calories}kcal`);
  return parts.join("·");
}

function range(values: number[], unit: string) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  return min === max ? `${min}${unit}` : `${min}~${max}${unit}`;
}

/** 첫 문장에 이미 수치(g·kcal·mg·종)가 있으면 계산 답을 덧붙이지 않는다. */
export function introHasNumber(intro: string): boolean {
  return /\d+(\.\d+)?\s?(g|kcal|mg|종)/.test(intro.split(/(?<=[.다])\s/)[0] ?? "");
}

/** 수치를 비교할 수 있는 제품이 2개 미만이면 빈 문자열(문장을 그리지 않는다). */
export function getGuideAnswer(slugs: string[]): string {
  const seen = new Set<string>();
  const products = slugs
    .map((slug) => getStaticProductBySlug(slug))
    .filter((p): p is ProductDetailProps => {
      if (!p || seen.has(p.slug)) return false;
      seen.add(p.slug);
      return num(p.proteinPerServing) && p.proteinPerServing > 0 && !p.needsServingCheck && isComparableServing(p) && p.powderType !== "gainer";
    });
  if (products.length < 2) return "";

  if (products.length <= 3) {
    return `성분표 1회 제공량 기준으로 ${products.map((p) => `${withTopic(label(p))} ${facts(p)}`).join(", ")}입니다.`;
  }

  const protein = products.map((p) => p.proteinPerServing);
  const sugars = products.map((p) => p.sugar).filter(num);
  const kcal = products.map((p) => p.calories).filter(num);
  const top = [...products].sort((a, b) => b.proteinPerServing - a.proteinPerServing || (a.sugar ?? 99) - (b.sugar ?? 99))[0];
  const lowSugar = [...products].filter((p) => num(p.sugar)).sort((a, b) => (a.sugar as number) - (b.sugar as number) || b.proteinPerServing - a.proteinPerServing)[0];
  const ranges = [`단백질 ${range(protein, "g")}`];
  if (sugars.length >= 2) ranges.push(`당류 ${range(sugars, "g")}`);
  if (kcal.length >= 2) ranges.push(range(kcal, "kcal"));
  let text = `이 가이드에 나온 제품 ${products.length}개는 성분표 1회 제공량 기준 ${ranges.join("·")}이고, 단백질이 가장 많은 제품은 ${label(top)}(${top.proteinPerServing}g)`;
  if (lowSugar && lowSugar.slug !== top.slug) text += `, 당류가 가장 낮은 제품은 ${label(lowSugar)}(${formatSugar(lowSugar)})`;
  return `${text}입니다.`;
}
