import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { getProductsByCategoryAsync } from "../lib/productData";
import drinkSpec from "../data/slugToDrinkSpec.json";
import barSpec from "../data/slugToBarSpec.json";
import shakeSpec from "../data/slugToShakeSpec.json";
import yogurtSpec from "../data/slugToYogurtSpec.json";
import soymilkSpec from "../data/slugToSoymilkSpec.json";

// 2026-10-26: 데이터를 어떻게 모으고 계산·표시하는지 한 곳에 적은 방법론 페이지(신뢰 신호, docs/google-index-recovery-2026-10-26.md).
// 숫자는 빌드 시점 데이터에서 계산한다. 규칙은 실제 코드·운영 기준(CLAUDE.md)과 같아야 한다.
export const metadata = {
  title: "ProteinLab 데이터 방법론 | 성분표 수집·계산·표시 기준",
  description:
    "ProteinLab이 단백질 음료·바·쉐이크·요거트·두유의 성분 수치를 어떻게 모으고, 단백질 밀도 같은 비교 지표를 어떻게 계산하며, 구매 링크와 특가를 어떤 기준으로 붙이는지 정리했습니다.",
  alternates: { canonical: "https://proteinlab.kr/methodology" },
};

export const revalidate = 3600;

const specMaps: Record<string, Record<string, string>> = {
  drink: drinkSpec,
  bar: barSpec,
  shake: shakeSpec,
  yogurt: yogurtSpec,
  soymilk: soymilkSpec,
};

const categoryLabels: Record<string, string> = {
  drink: "단백질 음료",
  bar: "단백질 바",
  shake: "단백질 쉐이크",
  yogurt: "단백질 요거트",
  soymilk: "두유",
};

const formulaRows = [
  { name: "단백질 밀도", formula: "단백질(g) ÷ 열량(kcal) × 100", note: "100kcal를 먹을 때 단백질이 몇 g인지. 다이어트·체중 관리 비교에 쓴다." },
  { name: "용량당 단백질", formula: "단백질(g) ÷ 용량(mL) × 100", note: "음료·두유를 100mL 기준으로 맞춰 본다." },
  { name: "열량 밀도", formula: "열량(kcal) ÷ 용량(mL) × 100", note: "같은 양을 마실 때 열량 차이를 본다." },
];

const displayRules = [
  "수치는 1회 섭취 단위(1병·1개·1팩·1컵) 기준이 원칙입니다. 라벨에 100g·100mL당만 적힌 대용량 제품은 용량에 맞춰 곱한 값으로 바꾸고 상세 표에 기준을 적습니다.",
  "라벨에 '1g 미만'처럼 숫자 하나로 적히지 않은 값은 그 표기를 그대로 보여 줍니다. 정렬·필터에는 상한값(1g)을 씁니다. '0g'으로 바꿔 적지 않습니다.",
  "확인하지 못한 칸(원재료, 제조사, 나트륨 등)은 추정해서 채우지 않고 비워 둡니다.",
  "같은 성분표 이미지가 서로 다른 제품에 붙어 있거나 맛·용량이 맞지 않으면 성분표 연결을 내리고 새 자료를 받을 때까지 비워 둡니다.",
];

const soymilkRules = [
  "두유는 250mL 이하 소포장, 대두 기반, 1팩 단백질이 g으로 5g 이상 표기된 제품만 등록합니다. % 표기만 있는 제품, 대용량, 유단백을 섞은 프로틴밀류는 넣지 않습니다.",
  "1팩 단백질 11g 이상(1일 기준치 55g의 20%)은 고단백, 8~10g은 단백질 강화, 5~7g은 일반으로 나눕니다.",
];

const linkRules = [
  "구매 버튼은 쿠팡 파트너스 링크입니다. 구매가 일어나면 ProteinLab이 쿠팡에서 일정액의 수수료를 받으며, 소비자가 내는 가격은 같습니다.",
  "링크를 지어내지 않습니다. 쿠팡에서 판매가 확인되지 않거나 단종된 제품은 구매 버튼 대신 '현재 쿠팡에서 판매가 확인되지 않습니다'를 보여 줍니다.",
  "특정 브랜드에서 돈을 받고 순서를 올리지 않습니다. 목록 순서와 추천은 위 수치와 기준으로만 정합니다.",
  "골드박스 특가는 쿠팡 골드박스에 실제로 올라온 상품만 붙입니다. 쿠팡 상품 번호와 용량·맛 이름이 우리 제품과 모두 맞을 때만 표시하고, 애매하면 붙이지 않습니다. 특가가 끝나는 시각(보통 다음 날 오전 7시)이 지나면 자동으로 내려갑니다.",
];

const auditRules = [
  "새 제품은 포장 사진과 영양정보(성분표) 사진을 받아 사람이 수치를 읽고 입력합니다. 제품 페이지에는 그 성분표 이미지를 함께 보여 줍니다.",
  "카테고리별로 성분표 전수 대조를 합니다(2026-10-22 단백질 바 97개, 10-23 요거트·두유). 대표 수치와 상세 성분표가 다르면 라벨 기준으로 고칩니다.",
  "당류가 탄수화물보다 크거나, 대표 수치와 상세 수치가 서로 맞지 않는 제품은 자동 점검으로 찾아 다시 확인합니다.",
];

const correctionLog = [
  { date: "2026-10-26", body: "연세두유 저당 검은콩&고칼슘·아몬드&잣을 성분표 기준으로 추가했습니다. 완전두유 검은콩 17곡 고칼슘은 1팩 단백질이 4g이라 두유 등록 기준에 맞지 않아 넣지 않았습니다." },
  { date: "2026-10-24", body: "라벨이 '당류 1g 미만'인 단백질바 4종(퀘스트 더블 초콜릿 청크, 단백하니 피넛버터·말차초코, 밸런스밀 말차초코)을 '1g 미만'으로 표시하고, 단백하니 피넛버터 상세 표의 당류 4g을 라벨에 맞게 지웠습니다." },
  { date: "2026-10-24", body: "쿠팡에서 품절로 확인된 4개 제품의 구매 버튼을 내렸습니다." },
  { date: "2026-10-23", body: "요거트·두유 성분표를 전수 대조해 다른 제품 라벨이 붙어 있던 3개 제품의 성분표 연결을 내렸습니다." },
  { date: "2026-10-22", body: "단백질 바 97개 성분표를 대조해 15개 제품의 상세 수치를 라벨에 맞게 고쳤습니다." },
];

export default async function MethodologyPage() {
  const categories = ["drink", "bar", "shake", "yogurt", "soymilk"] as const;
  const lists = await Promise.all(categories.map((category) => getProductsByCategoryAsync(category)));
  const coverage = categories.map((category, index) => {
    const products = lists[index];
    const withSpec = products.filter((product) => product.slug && specMaps[category][product.slug]).length;
    return { category, total: products.length, withSpec };
  });
  const total = coverage.reduce((sum, row) => sum + row.total, 0);
  const totalWithSpec = coverage.reduce((sum, row) => sum + row.withSpec, 0);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="w-full border-t border-b bg-[var(--hero-bg)]" style={{ borderColor: "var(--hero-border)" }}>
        <div className="mx-auto max-w-[1200px] px-4 py-6 md:px-6 md:py-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--foreground-muted)]">Methodology</p>
          <h1 className="mt-2 text-2xl font-bold leading-tight text-[#16412D] md:text-3xl">데이터 방법론</h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--foreground-muted)]">
            ProteinLab의 모든 비교는 제품 포장의 영양정보(성분표)에서 출발합니다. 이 페이지는 수치를 어떻게 모으고,
            비교 지표를 어떻게 계산하고, 구매 링크와 특가를 어떤 기준으로 붙이는지 정리한 것입니다.
            운영 원칙은{" "}
            <Link href="/about" className="text-[var(--accent)] hover:underline">소개 페이지</Link>, 등급 기준은{" "}
            <Link href="/grade-criteria" className="text-[var(--accent)] hover:underline">등급 기준</Link>에 있습니다.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 pb-16 md:px-6">
        <article className="mt-8 space-y-10">
          <section>
            <h2 className="text-lg font-bold text-[var(--foreground)]">성분표 확보 현황</h2>
            <p className="mt-3 text-[14px] leading-7 text-[var(--foreground-muted)]">
              등록 제품 {total}종 중 {totalWithSpec}종은 성분표 이미지를 제품 페이지에 함께 보여 줍니다. 나머지는 성분표 자료를 다시 받는 중이며,
              그동안 수치는 제조사 공식 자료 기준입니다.
            </p>
            <div className="mt-4 overflow-x-auto rounded-2xl border border-[#e8e6e3]">
              <table className="w-full min-w-[420px] text-left text-sm">
                <thead className="bg-[#f9f8f5] text-[#6b6b6b]">
                  <tr>
                    <th className="px-4 py-2.5 font-medium">카테고리</th>
                    <th className="px-4 py-2.5 font-medium">등록 제품</th>
                    <th className="px-4 py-2.5 font-medium">성분표 이미지</th>
                  </tr>
                </thead>
                <tbody>
                  {coverage.map((row) => (
                    <tr key={row.category} className="border-t border-[#f0eeeb]">
                      <td className="px-4 py-2.5 font-medium text-[var(--foreground)]">{categoryLabels[row.category]}</td>
                      <td className="px-4 py-2.5 text-[var(--foreground-muted)]">{row.total}종</td>
                      <td className="px-4 py-2.5 text-[var(--foreground-muted)]">{row.withSpec}종</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[var(--foreground)]">수치를 넣는 방법</h2>
            <ul className="mt-3 space-y-2">
              {auditRules.map((item) => (
                <li key={item} className="flex items-start gap-2 text-[14px] leading-6 text-[var(--foreground-muted)]">
                  <span className="mt-0.5 shrink-0 text-[#1b7f5b]">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[var(--foreground)]">표시 규칙</h2>
            <ul className="mt-3 space-y-2">
              {displayRules.map((item) => (
                <li key={item} className="flex items-start gap-2 text-[14px] leading-6 text-[var(--foreground-muted)]">
                  <span className="mt-0.5 shrink-0 text-[#1b7f5b]">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[var(--foreground)]">비교 지표 계산식</h2>
            <p className="mt-3 text-[14px] leading-7 text-[var(--foreground-muted)]">
              아래 지표는 라벨에 적힌 값이 아니라 라벨 수치로 계산한 값입니다. 소수 첫째 자리에서 반올림합니다.
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-3">
              {formulaRows.map((row) => (
                <div key={row.name} className="rounded-2xl border border-[#e8e6e3] bg-[#fffdf8] px-4 py-4">
                  <p className="text-sm font-semibold text-[#1f5138]">{row.name}</p>
                  <p className="mt-2 text-[13px] font-medium text-[var(--foreground)]">{row.formula}</p>
                  <p className="mt-2 text-[13px] leading-6 text-[var(--foreground-muted)]">{row.note}</p>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[var(--foreground)]">두유 등록·구간 기준</h2>
            <ul className="mt-3 space-y-2">
              {soymilkRules.map((item) => (
                <li key={item} className="flex items-start gap-2 text-[14px] leading-6 text-[var(--foreground-muted)]">
                  <span className="mt-0.5 shrink-0 text-[#1b7f5b]">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[var(--foreground)]">구매 링크와 특가</h2>
            <ul className="mt-3 space-y-2">
              {linkRules.map((item) => (
                <li key={item} className="flex items-start gap-2 text-[14px] leading-6 text-[var(--foreground-muted)]">
                  <span className="mt-0.5 shrink-0 text-[#1b7f5b]">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold text-[var(--foreground)]">최근 데이터 수정 이력</h2>
            <ul className="mt-3 space-y-2">
              {correctionLog.map((item) => (
                <li key={item.body} className="text-[14px] leading-6 text-[var(--foreground-muted)]">
                  <span className="mr-2 font-semibold text-[#1f5138]">{item.date}</span>
                  {item.body}
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[14px] leading-7 text-[var(--foreground-muted)]">
              수치가 포장과 다르면{" "}
              <Link href="/contact" className="text-[var(--accent)] hover:underline">문의 페이지</Link>로 성분표 사진과 함께 알려 주세요. 라벨과 대조한 뒤 고치고 이 목록에 남깁니다.
            </p>
          </section>
        </article>
      </main>
      <Footer />
    </div>
  );
}
