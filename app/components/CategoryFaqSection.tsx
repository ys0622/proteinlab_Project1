import type { ProductCategory } from "../lib/categories";

type FaqItem = { question: string; answer: string };

const FAQ_MAP: Record<ProductCategory, FaqItem[]> = {
  drink: [
    {
      question: "단백질 음료 고를 때 가장 중요한 기준은?",
      answer:
        "단백질 함량(g)과 단백질 밀도(g/100ml)를 먼저 보세요. 다이어트 목적이면 당류와 칼로리를, 운동 보충이 목적이면 단백질 총량을 우선 기준으로 삼으면 됩니다. 셀렉스, 하이뮨, 뉴케어, 테이크핏처럼 브랜드별로 포지션이 달라 한 번에 비교해보는 편이 빠릅니다.",
    },
    {
      question: "저당 단백질 음료 추천은?",
      answer:
        "당류 0g 또는 1g 이하 제품을 찾는다면 셀렉스 코어프로틴, 테이크핏 맥스, 뉴케어 올프로틴 등이 대표적입니다. 필터에서 '저당' 조건을 선택하면 당류 기준으로 좁혀 볼 수 있습니다.",
    },
    {
      question: "단백질 음료 40g 이상 제품이 있나요?",
      answer:
        "뉴케어 올프로틴 41g, 테이크핏 몬스터 43g, 닥터유 단백질 드링크 40g 등 고함량 RTD 제품이 있습니다. 단백질 밀도 기준 필터로 10g/100ml 이상 제품만 골라볼 수 있습니다.",
    },
    {
      question: "단백질 음료와 단백질 쉐이크 차이는?",
      answer:
        "RTD 단백질 음료는 바로 마실 수 있는 액상 제품이고, 단백질 쉐이크는 분말을 물이나 우유에 타서 마시는 형태입니다. 편의성은 RTD가 높고, 단가는 쉐이크가 낮은 편입니다.",
    },
  ],
  bar: [
    {
      question: "단백질 바 고를 때 가장 중요한 기준은?",
      answer:
        "단백질 함량과 당류를 함께 봐야 합니다. 일부 제품은 단백질이 높아도 당류가 10g 이상인 경우가 있습니다. 다이어트 목적이면 당류 5g 이하, 칼로리 200kcal 이하를 기준으로 삼으면 됩니다.",
    },
    {
      question: "단백질 바와 단백질 음료 중 뭐가 더 나은가요?",
      answer:
        "목적에 따라 다릅니다. 식사 대용이나 포만감이 필요하면 바, 운동 후 빠른 흡수가 목적이면 RTD 음료가 더 적합합니다. 단백질 밀도는 RTD가 높은 편입니다.",
    },
    {
      question: "편의점에서 살 수 있는 단백질 바는?",
      answer:
        "닥터유 단백질바, 오리온 단백질바, 하이뮨 단백질바 등이 편의점에서 구매 가능합니다. 브랜드마다 입점 편의점이 달라 실제 재고는 매장에서 확인하는 편이 정확합니다.",
    },
  ],
  yogurt: [
    {
      question: "단백질 요거트와 일반 그릭요거트 차이는?",
      answer:
        "단백질 요거트는 추가 단백질(유청, 카세인 등)을 보강해 일반 그릭요거트보다 단백질 함량이 높습니다. 일반 그릭요거트가 100g당 단백질 7~10g 수준이라면, 단백질 요거트는 12~20g 이상인 제품도 있습니다.",
    },
    {
      question: "저당 단백질 요거트 추천은?",
      answer:
        "풀무원 단백질 그릭요거트, 남양 불가리스 프로틴, 빙그레 요플레 프로틴 제로 등이 당류가 낮은 편입니다. 필터에서 당류 기준으로 좁혀보세요.",
    },
    {
      question: "드링킹 요거트와 컵 요거트 중 어떤 것을 선택해야 하나요?",
      answer:
        "단백질 밀도는 컵 타입(그릭) 요거트가 높고, 편의성은 드링킹 타입이 좋습니다. 운동 후 단백질 보충이 목적이면 컵 타입, 간식이나 음료로 즐기려면 드링킹 타입을 추천합니다.",
    },
  ],
  shake: [
    {
      question: "단백질 쉐이크 고를 때 가장 중요한 기준은?",
      answer:
        "단백질 1회 섭취량과 가격(1회 단가)을 함께 보는 편이 좋습니다. 다이어트 목적이면 칼로리와 당류를, 벌크업 목적이면 단백질 총량과 식이섬유 함량을 같이 확인하세요.",
    },
    {
      question: "식사 대용 단백질 쉐이크와 운동 보충용 쉐이크 차이는?",
      answer:
        "식사 대용 쉐이크는 단백질 외 탄수화물, 식이섬유, 비타민·미네랄이 포함된 균형 영양 설계입니다. 운동 보충용은 단백질 비율이 높고 칼로리가 낮은 편입니다.",
    },
    {
      question: "단백질 쉐이크 여성에게도 괜찮나요?",
      answer:
        "네, 성별과 무관하게 섭취할 수 있습니다. 여성의 경우 저당·저칼로리 쉐이크가 다이어트와 단백질 보충을 동시에 할 수 있어 인기가 높습니다. 하루 단백질 권장량(체중 1kg당 0.8~1.2g)에 맞춰 조절하면 됩니다.",
    },
  ],
};

export function getCategoryFaqs(category: ProductCategory): FaqItem[] {
  return FAQ_MAP[category] ?? [];
}

export default function CategoryFaqSection({ category }: { category: ProductCategory }) {
  const faqs = getCategoryFaqs(category);
  if (faqs.length === 0) return null;

  return (
    <section className="mx-auto max-w-[1200px] px-4 pb-10 pt-2 md:px-6">
      <h2 className="mb-4 text-base font-bold text-[var(--foreground)]">자주 묻는 질문</h2>
      <div className="space-y-3">
        {faqs.map((item) => (
          <div
            key={item.question}
            className="rounded-2xl border border-[#e8e6e3] bg-[#FFFDF8] px-5 py-4"
          >
            <h3 className="text-sm font-semibold text-[var(--foreground)]">Q. {item.question}</h3>
            <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{item.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
