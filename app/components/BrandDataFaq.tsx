import { getAllProducts } from "@/app/data/products";
import type { ProductDetailProps } from "@/app/data/products";
import type { ProductCategory } from "@/app/lib/categories";
import { getCategoryLabel } from "@/app/lib/categories";
import { withAnd } from "@/app/lib/koreanParticle";
import { isComparableServing } from "@/app/lib/servingScope";

export interface DataFaq {
  question: string;
  answer: string;
}

const fmt = (n: number) => (Math.round(n * 10) / 10).toString();
const avg = (xs: number[]) => xs.reduce((s, x) => s + x, 0) / xs.length;

function pool(brand: string, productType: ProductCategory): ProductDetailProps[] {
  return getAllProducts().filter(
    (p) => p.brand === brand && (p.productType ?? "drink") === productType && isComparableServing(p) && !p.needsServingCheck,
  );
}

const flavor = (p: ProductDetailProps) => p.flavor?.trim() || p.name;
const per100kcal = (p: ProductDetailProps) => (p.calories ? (p.proteinPerServing / p.calories) * 100 : 0);

function brandFaq(brand: string, productType: ProductCategory): DataFaq | null {
  const list = pool(brand, productType).filter((p) => p.calories != null && p.sugar != null);
  if (list.length < 2) return null;
  const by = (f: (p: ProductDetailProps) => number, dir: 1 | -1) => [...list].sort((a, b) => dir * (f(a) - f(b)))[0];
  const proteins = list.map((p) => p.proteinPerServing);
  const topProtein = by((p) => p.proteinPerServing, -1);
  const lowSugar = by((p) => p.sugar ?? 0, 1);
  const lowKcal = by((p) => p.calories ?? 0, 1);
  const topEff = by(per100kcal, -1);
  const kind = getCategoryLabel(productType);
  const range = Math.min(...proteins) === Math.max(...proteins) ? `모두 ${fmt(proteins[0])}g` : `${fmt(Math.min(...proteins))}~${fmt(Math.max(...proteins))}g`;
  return {
    question: `${brand} ${kind}는 맛별로 단백질과 당류가 얼마나 다른가요?`,
    answer:
      `ProteinLab에 등록된 ${brand} ${kind} ${list.length}종의 1회 제공량 단백질은 ${range}입니다. ` +
      (Math.min(...proteins) === Math.max(...proteins) ? "" : `단백질이 가장 높은 맛은 ${flavor(topProtein)}(${fmt(topProtein.proteinPerServing)}g), `) +
      `당류가 가장 낮은 맛은 ${flavor(lowSugar)}(${fmt(lowSugar.sugar ?? 0)}g), ` +
      `열량이 가장 낮은 맛은 ${flavor(lowKcal)}(${fmt(lowKcal.calories ?? 0)}kcal)입니다. ` +
      `열량 100kcal당 단백질이 가장 높은 맛은 ${flavor(topEff)}(${fmt(per100kcal(topEff))}g)입니다. 수치는 제조사 표기 기준입니다.`,
  };
}

function versusFaq(a: string, b: string, productType: ProductCategory): DataFaq | null {
  const la = pool(a, productType).filter((p) => p.calories != null && p.sugar != null);
  const lb = pool(b, productType).filter((p) => p.calories != null && p.sugar != null);
  if (la.length === 0 || lb.length === 0) return null;
  const m = (l: ProductDetailProps[], f: (p: ProductDetailProps) => number) => avg(l.map(f));
  const pa = m(la, (p) => p.proteinPerServing), pb = m(lb, (p) => p.proteinPerServing);
  const sa = m(la, (p) => p.sugar ?? 0), sb = m(lb, (p) => p.sugar ?? 0);
  const ka = m(la, (p) => p.calories ?? 0), kb = m(lb, (p) => p.calories ?? 0);
  const morePro = pa === pb ? null : pa > pb ? a : b;
  const lessSugar = sa === sb ? null : sa < sb ? a : b;
  return {
    question: `${withAnd(a)} ${b}, 평균으로 보면 어느 쪽 단백질이 더 높나요?`,
    answer:
      `ProteinLab 등록 제품 평균(1회 제공량) 기준으로 ${a} ${la.length}종은 단백질 ${fmt(pa)}g·당류 ${fmt(sa)}g·${fmt(ka)}kcal, ` +
      `${b} ${lb.length}종은 단백질 ${fmt(pb)}g·당류 ${fmt(sb)}g·${fmt(kb)}kcal입니다. ` +
      (morePro ? `평균 단백질은 ${morePro} 쪽이 더 높고, ` : "평균 단백질은 같고, ") +
      (lessSugar ? `평균 당류는 ${lessSugar} 쪽이 더 낮습니다. ` : "평균 당류도 같습니다. ") +
      `맛마다 차이가 있어 실제 선택은 맛별 수치를 함께 보는 편이 정확합니다.`,
  };
}

function categoryFaq(productType: ProductCategory): DataFaq | null {
  const list = getAllProducts().filter((p) => (p.productType ?? "drink") === productType && isComparableServing(p) && !p.needsServingCheck);
  if (list.length < 5) return null;
  const kind = getCategoryLabel(productType);
  const n20 = list.filter((p) => p.proteinPerServing >= 20).length;
  const n40 = list.filter((p) => p.proteinPerServing >= 40).length;
  const zeroSugar = list.filter((p) => p.sugar === 0).length;
  const sorted = [...list.map((p) => p.proteinPerServing)].sort((x, y) => x - y);
  const median = sorted[Math.floor(sorted.length / 2)];
  return {
    question: `ProteinLab에 등록된 단백질 ${kind}는 단백질이 보통 얼마나 들어 있나요?`,
    answer:
      `1회 제공량 비교가 가능한 단백질 ${kind} ${list.length}종의 단백질 중앙값은 ${fmt(median)}g입니다. ` +
      `20g 이상은 ${n20}종, 40g 이상은 ${n40}종이고, 당류 0g 제품은 ${zeroSugar}종입니다. ` +
      `단백질이 높을수록 열량도 함께 오르는 경우가 많아, 목적에 맞게 단백질·당류·열량을 같이 보는 편이 좋습니다.`,
  };
}

export function buildBrandDataFaqs(options: { brands?: string[]; productType: ProductCategory; category?: boolean }): DataFaq[] {
  const { brands = [], productType, category } = options;
  const out: DataFaq[] = [];
  if (category) {
    const c = categoryFaq(productType);
    if (c) out.push(c);
  }
  for (const brand of brands) {
    const f = brandFaq(brand, productType);
    if (f) out.push(f);
  }
  if (brands.length === 2) {
    const v = versusFaq(brands[0], brands[1], productType);
    if (v) out.push(v);
  }
  return out;
}

/** 가이드 하단 데이터 FAQ. 수치는 제품 데이터에서 계산한다. */
export default function BrandDataFaq({ faqs }: { faqs: DataFaq[] }) {
  if (faqs.length === 0) return null;
  return (
    <section className="mx-auto mb-8 max-w-[1200px] px-4 md:px-6">
      <div className="rounded-[28px] border border-[#e2ebe4] bg-white px-5 py-5">
        <p className="text-[12px] font-bold uppercase tracking-wider text-[#1F5A3D]">ProteinLab 데이터</p>
        <h2 className="mt-0.5 text-xl font-bold text-[var(--foreground)]">데이터로 보는 자주 묻는 질문</h2>
        <div className="mt-4 space-y-3">
          {faqs.map((item) => (
            <div key={item.question} className="rounded-2xl border border-[#e8e6e3] bg-[#FFFDF8] px-5 py-4" style={{ wordBreak: "keep-all" }}>
              <h3 className="text-sm font-semibold text-[var(--foreground)]">Q. {item.question}</h3>
              <p className="mt-2 text-sm leading-6 text-[var(--foreground-muted)]">{item.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
