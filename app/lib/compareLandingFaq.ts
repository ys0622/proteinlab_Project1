import type { ProductDetailProps } from "../data/products";
import { withAnd, withObject } from "./koreanParticle";
import { formatProductLabel } from "./productLabel";
import { isComparableServing } from "./servingScope";
import { getCategoryLabel, isProductCategory } from "./categories";

export interface CompareFaq {
  question: string;
  answer: string;
}

const fmt = (n: number) => (Math.round(n * 10) / 10).toString();

function per100(value: number | undefined, p: ProductDetailProps): number | null {
  const size = Number(p.capacity?.match(/(\d+(?:\.\d+)?)/)?.[1]);
  if (value == null || !Number.isFinite(size) || size <= 0) return null;
  return (value / size) * 100;
}

// 같은 카테고리(1회 제공량 비교 대상) 안에서 몇 번째인지. 같은 값은 공동 순위로 센다.
function rankIn(pool: ProductDetailProps[], value: number, pick: (p: ProductDetailProps) => number | undefined, higher: boolean) {
  const values = pool.map(pick).filter((v): v is number => v != null && Number.isFinite(v));
  const rank = 1 + values.filter((v) => (higher ? v > value : v < value)).length;
  const tied = values.filter((v) => v === value).length > 1;
  if (rank === 1) return tied ? "공동으로 가장" : "가장";
  return `${tied ? "공동 " : ""}${rank}번째로`;
}

function buildCategoryRankFaq(products: ProductDetailProps[], allProducts: ProductDetailProps[]): CompareFaq | null {
  if (products.length < 2 || products.length > 4 || !products.every(isComparableServing)) return null;
  const lines = products.map((p) => {
    const type = p.productType ?? "drink";
    const pool = allProducts.filter((item) => (item.productType ?? "drink") === type && isComparableServing(item));
    const label = isProductCategory(type) ? getCategoryLabel(type) : "제품";
    const name = formatProductLabel(p.brand, p.name);
    const protein = `단백질 ${fmt(p.proteinPerServing)}g은 ${rankIn(pool, p.proteinPerServing, (item) => item.proteinPerServing, true)} 많고`;
    const sugar = p.sugar != null
      ? `, 당류 ${p.sugarLabel ?? `${fmt(p.sugar)}g`}은 ${rankIn(pool, p.sugar, (item) => item.sugar, false)} 적습니다`
      : "입니다";
    return `${name}: 등록된 ${label} ${pool.length}종 중 ${protein}${sugar}.`;
  });
  return {
    question: "같은 종류 제품 전체에서 보면 어느 정도인가요?",
    answer: `${lines.join(" ")} 순위는 프로틴랩에 등록된 제품의 제조사 표기 1회 제공량 기준입니다.`,
  };
}

// 비교 랜딩 FAQ. 화면과 FAQPage 구조화 데이터에 같은 내용을 쓴다(구조화 데이터만 있고 화면에 없으면 구글 지침 위반).
// 답변 수치는 모두 제품 데이터(제조사 표기)에서 계산한다.
export function buildCompareFaqs(title: string, intro: string, products: ProductDetailProps[], allProducts: ProductDetailProps[] = []): CompareFaq[] {
  const faqs: CompareFaq[] = [];
  const [a, b] = products;
  if (a && b) {
    const aName = formatProductLabel(a.brand, a.name);
    const bName = formatProductLabel(b.brand, b.name);
    const comparable = isComparableServing(a) && isComparableServing(b);

    if (comparable) {
      const diff = Math.abs(a.proteinPerServing - b.proteinPerServing);
      const more = a.proteinPerServing > b.proteinPerServing ? aName : bName;
      const lead = diff === 0
        ? "두 제품의 단백질은 같습니다."
        : `${more} 쪽이 ${fmt(diff)}g 더 많습니다.`;
      const kcalLine = a.calories && b.calories
        ? ` 열량 100kcal당 단백질은 ${aName} ${fmt((a.proteinPerServing / a.calories) * 100)}g, ${bName} ${fmt((b.proteinPerServing / b.calories) * 100)}g입니다.`
        : "";
      faqs.push({
        question: `${withAnd(aName)} ${bName}, 단백질은 어느 쪽이 더 많나요?`,
        answer: `1회 제공량 기준 단백질은 ${aName} ${fmt(a.proteinPerServing)}g(${a.capacity}), ${bName} ${fmt(b.proteinPerServing)}g(${b.capacity})이며 ${lead}${kcalLine}`,
      });
    } else {
      const ap = per100(a.proteinPerServing, a);
      const bp = per100(b.proteinPerServing, b);
      if (ap != null && bp != null) {
        faqs.push({
          question: `${withAnd(aName)} ${bName}, 단백질은 어느 쪽이 더 많나요?`,
          answer: `두 제품은 용량 단위가 달라 한 통 수치를 그대로 비교하기 어렵습니다. 100g(mL)당 단백질은 ${aName} 쪽이 ${fmt(ap)}g, ${bName} 쪽이 ${fmt(bp)}g입니다.`,
        });
      }
    }

    if (comparable && a.sugar != null && b.sugar != null && a.calories != null && b.calories != null) {
      const lowSugar = a.sugar === b.sugar ? null : a.sugar < b.sugar ? aName : bName;
      const lowKcal = a.calories === b.calories ? null : a.calories < b.calories ? aName : bName;
      const summary = lowSugar && lowSugar === lowKcal
        ? `당류와 열량 모두 ${lowSugar} 쪽이 더 낮습니다.`
        : !lowSugar && !lowKcal
          ? "당류와 열량도 같습니다."
          : [lowSugar ? `당류는 ${lowSugar} 쪽이 더 낮고` : "당류는 같고", lowKcal ? `열량은 ${lowKcal} 쪽이 더 낮습니다.` : "열량은 같습니다."].join(" ");
      faqs.push({
        question: "당류와 열량은 어느 쪽이 더 낮나요?",
        answer: `당류는 ${aName} ${fmt(a.sugar)}g, ${bName} ${fmt(b.sugar)}g이고, 열량은 각각 ${fmt(a.calories)}kcal, ${fmt(b.calories)}kcal입니다. ${summary}`,
      });

      const moreProtein = a.proteinPerServing === b.proteinPerServing ? null : a.proteinPerServing > b.proteinPerServing ? aName : bName;
      const lighter = lowKcal ?? lowSugar;
      let pick: string;
      if (moreProtein && lighter && moreProtein !== lighter) {
        pick = `단백질 총량을 우선한다면 ${withObject(moreProtein)}, 열량과 당류 부담을 줄이고 싶다면 ${withObject(lighter)} 먼저 보세요.`;
      } else if (moreProtein && (!lighter || moreProtein === lighter)) {
        pick = `수치상으로는 ${moreProtein} 쪽이 단백질이 더 많고 열량·당류 부담도 크지 않은 편입니다. 맛과 용량, 가격은 직접 비교해 보세요.`;
      } else {
        pick = "두 제품의 단백질이 같아 열량·당류와 맛, 용량, 가격으로 고르는 편이 좋습니다.";
      }
      faqs.push({ question: "목적에 따라 어떤 제품을 고르면 되나요?", answer: pick });
    }
  }

  const rankFaq = buildCategoryRankFaq(products, allProducts);
  if (rankFaq) faqs.push(rankFaq);

  faqs.push({
    question: `${title}에서 가장 중요하게 봐야 할 기준은 무엇인가요?`,
    answer: `${intro} 단백질 함량, 당류, 칼로리, 단백질 밀도를 함께 비교하면 실제 체감 차이를 더 잘 파악할 수 있습니다.`,
  });
  return faqs;
}

