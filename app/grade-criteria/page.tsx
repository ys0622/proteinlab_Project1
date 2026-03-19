"use client";

import { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import CategoryTabs from "../components/CategoryTabs";
import type { ProductCategory } from "../lib/categories";

const GRADE_COLORS: Record<string, { color: string; bg: string; border: string }> = {
  A: { color: "#1B7F5B", bg: "#E7F3EC", border: "#1B7F5B" },
  B: { color: "#4C7BD9", bg: "#EAF2FF", border: "#4C7BD9" },
  C: { color: "#F08A24", bg: "#FFF1E6", border: "#F08A24" },
  D: { color: "#999", bg: "#f3f3f3", border: "#bbb" },
};

interface UnifiedRow {
  grade: string;
  density: string;
  diet: string;
  performance: string;
}

const DRINK_ROWS: UnifiedRow[] = [
  { grade: "A", density: "8g/100mL 이상 (상위 20%)", diet: "칼로리·당류 부담 최소 (상위 20%)", performance: "단백질 보충 효율 최상위 (상위 20%)" },
  { grade: "B", density: "6~8g/100mL (상위 50%)", diet: "평균 이상 효율 (상위 50%)", performance: "평균 이상 효율 (상위 50%)" },
  { grade: "C", density: "4~6g/100mL (상위 80%)", diet: "평균 수준 (상위 80%)", performance: "평균 수준 (상위 80%)" },
  { grade: "D", density: "4g/100mL 미만", diet: "칼로리·당류 부담 높음", performance: "하위 20%" },
];

const BAR_ROWS: UnifiedRow[] = [
  { grade: "A", density: "칼로리 대비 단백질 효율 최상위 (상위 20%)", diet: "칼로리·당류 부담 최소 (상위 20%)", performance: "단백질 보충 효율 최상위 (상위 20%)" },
  { grade: "B", density: "칼로리 대비 단백질 효율 우수 (상위 50%)", diet: "평균 이상 효율 (상위 50%)", performance: "평균 이상 효율 (상위 50%)" },
  { grade: "C", density: "칼로리 대비 단백질 효율 보통 (상위 80%)", diet: "평균 수준 (상위 80%)", performance: "평균 수준 (상위 80%)" },
  { grade: "D", density: "칼로리 대비 단백질 효율 낮음 (하위 20%)", diet: "칼로리·당류 부담 높음", performance: "하위 20%" },
];

const YOGURT_ROWS: UnifiedRow[] = [
  { grade: "A", density: "10g/100g 이상 (상위 20%)", diet: "칼로리·당류 부담 최소 (상위 20%)", performance: "단백질 보충 효율 최상위 (상위 20%)" },
  { grade: "B", density: "7~10g/100g (상위 50%)", diet: "평균 이상 효율 (상위 50%)", performance: "평균 이상 효율 (상위 50%)" },
  { grade: "C", density: "6~7g/100g (상위 80%)", diet: "평균 수준 (상위 80%)", performance: "평균 수준 (상위 80%)" },
  { grade: "D", density: "6g/100g 미만", diet: "칼로리·당류 부담 높음", performance: "하위 20%" },
];

const SHAKE_ROWS: UnifiedRow[] = [
  { grade: "A", density: "데이터 축적 후 동일 기준 적용 예정", diet: "데이터 축적 후 동일 기준 적용 예정", performance: "데이터 축적 후 동일 기준 적용 예정" },
  { grade: "B", density: "카테고리 구조는 반영 완료", diet: "카테고리 구조는 반영 완료", performance: "카테고리 구조는 반영 완료" },
  { grade: "C", density: "파우치형 쉐이크만 집계 예정", diet: "파우더는 제외", performance: "추후 실제 제품 데이터 반영" },
  { grade: "D", density: "현재 공개 랭킹 데이터 없음", diet: "현재 공개 랭킹 데이터 없음", performance: "현재 공개 랭킹 데이터 없음" },
];

const FAQ = [
  {
    q: "단백질 음료 등급은 어떻게 계산하나요?",
    a: "단백질 밀도, 다이어트, 퍼포먼스 3개 지표를 각각 계산하고 전체 제품 대비 상대 순위 기준으로 A~D 등급을 부여합니다.",
  },
  {
    q: "가격이 등급에 영향을 주나요?",
    a: "아니요. 등급은 영양성분 기반 지표로만 계산하며 가격은 별도 참고 정보입니다.",
  },
  {
    q: "식물성 제품도 같은 기준으로 계산하나요?",
    a: "네. 같은 제품군 안에서는 동일한 지표와 동일한 등급 구간으로 계산합니다.",
  },
  {
    q: "단백질 요거트도 같은 방식으로 계산하나요?",
    a: "네. 단백질 요거트도 같은 제품군 내부에서 단백질 밀도, 다이어트, 퍼포먼스 지표를 각각 계산한 뒤 상대 순위 기준으로 A~D 등급을 부여합니다.",
  },
];

export default function GradeCriteriaPage() {
  const [productType, setProductType] = useState<ProductCategory>("drink");
  const categoryCounts = { drink: 104, bar: 71, yogurt: 45, shake: 3 };
  const rows =
    productType === "drink"
      ? DRINK_ROWS
      : productType === "bar"
        ? BAR_ROWS
        : productType === "yogurt"
          ? YOGURT_ROWS
          : SHAKE_ROWS;

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="w-full border-t border-b bg-[var(--hero-bg)]" style={{ borderColor: "var(--hero-border)" }}>
        <div className="mx-auto max-w-[1200px] px-4 py-4 md:px-6 md:py-5">
          <h1 className="text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
            등급 산정 기준
          </h1>
          <p className="mt-1 text-sm text-[var(--foreground-muted)]">
            단백질 밀도, 다이어트, 퍼포먼스 등급은 아래 기준으로 산정합니다. 모두 영양성분 기반이며 제조사 공개 자료를 기준으로 정리했습니다.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 py-6 md:px-6">
        <CategoryTabs
          activeCategory={productType}
          counts={categoryCounts}
          onSelect={setProductType}
          stickyMobile
          className="mb-4"
        />

        <div className="md:hidden">
          <div className="flex items-center gap-2 rounded-xl border border-[#e8e6e3] bg-[#FFFDF8] px-3 py-2 text-xs text-[#6b7280]">
            <span aria-hidden="true">←</span>
            <span className="flex-1">좌우로 넘겨보세요. 다이어트 오른쪽에 퍼포먼스 기준이 있습니다.</span>
            <span aria-hidden="true">→</span>
          </div>
        </div>

        <div className="mt-3 overflow-x-auto rounded-xl border border-[#e8e6e3]">
          <table className="w-full min-w-[760px] border-collapse text-sm">
            <colgroup>
              <col style={{ width: "72px" }} />
              <col style={{ width: "228px" }} />
              <col style={{ width: "228px" }} />
              <col style={{ width: "228px" }} />
            </colgroup>
            <thead>
              <tr style={{ background: "#f9f8f5" }}>
                <th className="px-4 py-2.5 text-center font-semibold" style={{ color: "#6b6b6b" }}>
                  등급
                </th>
                <th className="border-l border-[#e8e6e3] px-4 py-2.5 text-left font-semibold whitespace-nowrap" style={{ color: "#6b6b6b" }}>
                  단백질 밀도
                </th>
                <th className="border-l border-[#e8e6e3] px-4 py-2.5 text-left font-semibold whitespace-nowrap" style={{ color: "#6b6b6b" }}>
                  다이어트
                </th>
                <th className="border-l border-[#e8e6e3] px-4 py-2.5 text-left font-semibold whitespace-nowrap" style={{ color: "#6b6b6b" }}>
                  퍼포먼스
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => {
                const color = GRADE_COLORS[row.grade];
                return (
                  <tr key={row.grade} className="border-t border-[#f0eeeb]">
                    <td className="px-4 py-3 text-center" style={{ background: color.bg }}>
                      <span
                        className="inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold"
                        style={{
                          background: color.bg,
                          color: color.color,
                          border: `1.5px solid ${color.border}`,
                        }}
                      >
                        {row.grade}
                      </span>
                    </td>
                    <td className="border-l border-[#f0eeeb] px-4 py-3 leading-relaxed" style={{ color: "#3d3d3d" }}>
                      {row.density}
                    </td>
                    <td className="border-l border-[#f0eeeb] px-4 py-3 leading-relaxed" style={{ color: "#3d3d3d" }}>
                      {row.diet}
                    </td>
                    <td className="border-l border-[#f0eeeb] px-4 py-3 leading-relaxed" style={{ color: "#3d3d3d" }}>
                      {row.performance}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-[#e8e6e3] bg-[#FFFDF8] px-4 py-3.5" style={{ borderRadius: "16px" }}>
            <h3 className="text-xs font-semibold" style={{ color: "#1B7F5B" }}>
              단백질 밀도
            </h3>
            <ul className="mt-1.5 space-y-1 text-xs leading-relaxed" style={{ color: "#6b6b6b" }}>
              <li>제품 유형별 기준 단위에 맞춰 비교합니다.</li>
              <li>음료는 mL, 요거트와 바는 g 기준으로 해석합니다.</li>
              <li>쉐이크는 파우치형만 같은 구조로 추가 가능합니다.</li>
            </ul>
          </div>
          <div className="rounded-xl border border-[#e8e6e3] bg-[#FFFDF8] px-4 py-3.5" style={{ borderRadius: "16px" }}>
            <h3 className="text-xs font-semibold" style={{ color: "#4C7BD9" }}>
              다이어트
            </h3>
            <ul className="mt-1.5 space-y-1 text-xs leading-relaxed" style={{ color: "#6b6b6b" }}>
              <li>칼로리와 당류 부담을 함께 봅니다.</li>
              <li>같은 카테고리 안에서만 상대 비교합니다.</li>
              <li>카테고리가 달라도 등급 계산 경로는 동일한 구조를 씁니다.</li>
            </ul>
          </div>
          <div className="rounded-xl border border-[#e8e6e3] bg-[#FFFDF8] px-4 py-3.5" style={{ borderRadius: "16px" }}>
            <h3 className="text-xs font-semibold" style={{ color: "#F08A24" }}>
              퍼포먼스
            </h3>
            <ul className="mt-1.5 space-y-1 text-xs leading-relaxed" style={{ color: "#6b6b6b" }}>
              <li>단백질 보충 효율과 실제 섭취 체감을 같이 반영합니다.</li>
              <li>추천과 랭킹도 같은 데이터 구조를 사용합니다.</li>
              <li>신규 카테고리도 별도 예외 없이 여기에 연결됩니다.</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 space-y-3">
          {FAQ.map((item) => (
            <div key={item.q} className="rounded-xl border border-[#e8e6e3] bg-white px-4 py-3">
              <p className="text-sm font-semibold text-[var(--foreground)]">{item.q}</p>
              <p className="mt-1 text-sm leading-6 text-[var(--foreground-muted)]">{item.a}</p>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
