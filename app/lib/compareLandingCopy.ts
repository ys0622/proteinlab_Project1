import type { ProductDetailProps } from "../data/products";
import type { CompareLanding } from "../data/compareLandings";
import { formatProductLabel } from "./productLabel";
import { withAnd, withObject, withTopic } from "./koreanParticle";

// 비교 랜딩 초기 문구에는 "검색 유입 대응", "랜딩", "분기하기 좋음"처럼 운영 메모가 섞여 있다.
// 방문자에게 보이는 문구가 아니므로, 이런 문구가 있는 랜딩은 제품 데이터에서 계산한 문장으로 바꿔 보여준다.
const INTERNAL_COPY = /랜딩|검색 유입|검색량|검색어 대응|검색 대응|수요 대응|대응$|분기|확장|진입|연결하기|이어지기|연계|고정 URL|탐색에 적합|탐색용|유입/;

function round1(value: number) {
  return Math.round(value * 10) / 10;
}

function diffLine(label: string, unit: string, a: ProductDetailProps, b: ProductDetailProps, av: number, bv: number, lowerIsBetter: boolean) {
  const aName = formatProductLabel(a.brand, a.name);
  const bName = formatProductLabel(b.brand, b.name);
  const gap = round1(Math.abs(av - bv));
  const base = `${label}: ${aName} ${round1(av)}${unit}, ${bName} ${round1(bv)}${unit}`;
  if (gap === 0) return `${base} (같음)`;
  const winner = (lowerIsBetter ? av < bv : av > bv) ? aName : bName;
  return `${base} — ${withTopic(winner)} ${gap}${unit} ${lowerIsBetter ? "낮음" : "많음"}`;
}

export function resolveLandingCopy(landing: CompareLanding, products: ProductDetailProps[]) {
  const internal = INTERNAL_COPY.test(landing.intro) || landing.bullets.some((bullet) => INTERNAL_COPY.test(bullet));
  if (!internal || products.length < 2) return { intro: landing.intro, bullets: landing.bullets };

  const [a, b] = products;
  const aName = formatProductLabel(a.brand, a.name);
  const bName = formatProductLabel(b.brand, b.name);
  const intro = `${withAnd(aName)} ${withObject(bName)} 1회 제공량 기준 단백질·당류·칼로리·단백질 밀도로 나란히 비교합니다. 수치는 제조사 표기를 그대로 옮긴 값입니다.`;

  const bullets: string[] = [];
  if (a.proteinPerServing != null && b.proteinPerServing != null) {
    bullets.push(diffLine("단백질", "g", a, b, a.proteinPerServing, b.proteinPerServing, false));
  }
  if (a.sugar != null && b.sugar != null) bullets.push(diffLine("당류", "g", a, b, a.sugar, b.sugar, true));
  if (a.calories != null && b.calories != null) bullets.push(diffLine("열량", "kcal", a, b, a.calories, b.calories, true));
  if (a.proteinPerServing != null && b.proteinPerServing != null && a.calories && b.calories) {
    bullets.push(
      diffLine("100kcal당 단백질", "g", a, b, (a.proteinPerServing / a.calories) * 100, (b.proteinPerServing / b.calories) * 100, false),
    );
  }
  if (a.capacity && b.capacity) bullets.push(`용량: ${aName} ${a.capacity}, ${bName} ${b.capacity}`);

  return { intro, bullets: bullets.length > 0 ? bullets : landing.bullets };
}
