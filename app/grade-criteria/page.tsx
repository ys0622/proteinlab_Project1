"use client";

import { useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";

type ProductType = "drink" | "bar";

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
  { grade: "A", density: "상위 20%", diet: "칼로리·당류 부담 최소 (상위 20%)", performance: "단백질 보충 효율 최상위 (상위 20%)" },
  { grade: "B", density: "상위 50%", diet: "평균 이상 효율 (상위 50%)", performance: "평균 이상 효율 (상위 50%)" },
  { grade: "C", density: "상위 80%", diet: "평균 수준 (상위 80%)", performance: "평균 수준 (상위 80%)" },
  { grade: "D", density: "하위 20%", diet: "칼로리·당류 부담 높음", performance: "하위 20%" },
];

const PRODUCT_TYPES: { id: ProductType; label: string }[] = [
  { id: "drink", label: "단백질 음료" },
  { id: "bar", label: "단백질 바" },
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
];

export default function GradeCriteriaPage() {
  const [productType, setProductType] = useState<ProductType>("drink");
  const rows = productType === "drink" ? DRINK_ROWS : BAR_ROWS;

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
        <div className="flex gap-2">
          {PRODUCT_TYPES.map((type) => (
            <button
              key={type.id}
              type="button"
              onClick={() => setProductType(type.id)}
              className="rounded-full px-4 py-1.5 text-sm font-medium transition-colors"
              style={{
                background: productType === type.id ? "var(--accent)" : "white",
                color: productType === type.id ? "white" : "#6b6b6b",
                border: productType === type.id ? "1px solid var(--accent)" : "1px solid var(--border)",
              }}
            >
              {type.label}
            </button>
          ))}
        </div>

        <div className="mt-4 md:hidden">
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
              {productType === "drink" ? (
                <>
                  <li>· 단백질(g) ÷ 용량(mL) × 100</li>
                  <li>· 높을수록 적은 양으로 많은 단백질 보충</li>
                </>
              ) : (
                <>
                  <li>· 단백질(g) ÷ 칼로리(kcal) × 100</li>
                  <li>· 높을수록 칼로리 대비 단백질 효율 우수</li>
                </>
              )}
            </ul>
          </div>
          <div className="rounded-xl border border-[#e8e6e3] bg-[#FFFDF8] px-4 py-3.5" style={{ borderRadius: "16px" }}>
            <h3 className="text-xs font-semibold" style={{ color: "#4C7BD9" }}>
              다이어트
            </h3>
            <ul className="mt-1.5 space-y-1 text-xs leading-relaxed" style={{ color: "#6b6b6b" }}>
              <li>· 칼로리(kcal) + 당류(g) × 4</li>
              <li>· 낮을수록 다이어트에 유리하게 계산</li>
            </ul>
          </div>
          <div className="rounded-xl border border-[#e8e6e3] bg-[#FFFDF8] px-4 py-3.5" style={{ borderRadius: "16px" }}>
            <h3 className="text-xs font-semibold" style={{ color: "#F08A24" }}>
              퍼포먼스
            </h3>
            <ul className="mt-1.5 space-y-1 text-xs leading-relaxed" style={{ color: "#6b6b6b" }}>
              <li>· 단백질(g) ÷ (1 + (칼로리 + 당류 × 2) ÷ 100)</li>
              <li>· 높을수록 운동 후 보충 효율이 좋음</li>
            </ul>
          </div>
        </div>

        <div className="mt-4 rounded-xl border border-[#e8e6e3] bg-[#FFFDF8] px-5 py-4" style={{ borderRadius: "16px" }}>
          <h2 className="text-sm font-semibold" style={{ color: "#3d3d3d" }}>
            업데이트 정책
          </h2>
          <ul className="mt-2 space-y-1 text-xs" style={{ color: "#6b6b6b" }}>
            <li>· 등급 지표는 모두 영양성분 기반입니다.</li>
            <li>· 영양성분은 제조사 및 공식 자료 기준으로 업데이트합니다.</li>
            <li>· 랭킹 점수는 현재 제품군 내 백분위 기준 100점 체계로 환산합니다.</li>
            <li>· 제품이 추가되면 등급과 랭킹 점수는 전체 데이터를 기준으로 다시 계산됩니다.</li>
          </ul>
        </div>

        <div className="mt-6">
          <h2 className="text-sm font-semibold" style={{ color: "#3d3d3d" }}>
            자주 묻는 질문
          </h2>
          <div className="mt-3 space-y-2">
            {FAQ.map((item) => (
              <details key={item.q} className="group overflow-hidden rounded-xl border border-[#e8e6e3]">
                <summary className="flex cursor-pointer items-center justify-between px-4 py-3 text-sm font-medium hover:bg-[#f9f8f5]" style={{ color: "#3d3d3d" }}>
                  {item.q}
                  <span className="text-xs" style={{ color: "#999" }}>+
                  </span>
                </summary>
                <p className="border-t border-[#f0eeeb] px-4 py-3 text-sm leading-relaxed" style={{ color: "#6b6b6b" }}>
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
