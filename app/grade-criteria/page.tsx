"use client";

import { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

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
  { q: "단백질음료 등급은 어떻게 계산하나요", a: "단백질 밀도, 다이어트, 퍼포먼스 3개 지표를 각각 계산하고 전체 제품 대비 상대 순위(20/50/80 퍼센타일)로 A~D 등급을 부여합니다." },
  { q: "가격이 등급에 영향을 주나요", a: "아니요. 등급은 영양성분 기반 지표로만 계산합니다. 가격은 별도 참고 정보입니다." },
  { q: "식물성 제품도 같은 기준인가요", a: "네. 동일한 지표와 동일한 등급 구간으로 계산합니다." },
];

export default function GradeCriteriaPage() {
  const [productType, setProductType] = useState<ProductType>("drink");
  const rows = productType === "drink" ? DRINK_ROWS : BAR_ROWS;

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* 히어로 영역 */}
      <section className="bg-[#EFEDE6]">
        <div className="mx-auto max-w-[1200px] px-4 py-6 md:px-6">
          <p className="text-sm font-medium text-[var(--accent)]">📊 등급 기준</p>
          <h1 className="mt-2 text-2xl font-bold md:text-3xl" style={{ color: "#1a1a1a", fontWeight: 700 }}>
            {productType === "drink" ? "단백질 음료" : "단백질 바"} 등급 산정 기준
          </h1>
          <p className="mt-2 text-sm leading-relaxed" style={{ color: "#6b6b6b" }}>
            단백질 밀도·다이어트·퍼포먼스 등급은 아래 수치 기준으로 산정됩니다. 모두 영양성분 기반이며, 제조사 공식 자료 기준입니다.
          </p>

          <div className="mt-5 flex gap-2">
            {PRODUCT_TYPES.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setProductType(t.id)}
                className="rounded-full px-4 py-1.5 text-sm font-medium transition-colors"
                style={{
                  background: productType === t.id ? "var(--accent)" : "white",
                  color: productType === t.id ? "white" : "#6b6b6b",
                  border: productType === t.id ? "none" : "1px solid #d9d6cf",
                }}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 py-6 md:px-6">
        {/* 통합 등급 테이블 */}
        <div className="overflow-x-auto rounded-xl border border-[#e8e6e3]">
          <table className="w-full min-w-[600px] border-collapse text-sm">
            <thead>
              <tr style={{ background: "#f9f8f5" }}>
                <th className="px-4 py-2.5 text-center font-semibold" style={{ color: "#6b6b6b", width: "64px" }}>등급</th>
                <th className="border-l border-[#e8e6e3] px-4 py-2.5 text-left font-semibold" style={{ color: "#6b6b6b" }}>단백질 밀도</th>
                <th className="border-l border-[#e8e6e3] px-4 py-2.5 text-left font-semibold" style={{ color: "#6b6b6b" }}>다이어트</th>
                <th className="border-l border-[#e8e6e3] px-4 py-2.5 text-left font-semibold" style={{ color: "#6b6b6b" }}>퍼포먼스</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => {
                const gc = GRADE_COLORS[row.grade];
                return (
                  <tr key={row.grade} className="border-t border-[#f0eeeb]">
                    <td className="px-4 py-3 text-center" style={{ background: gc.bg }}>
                      <span
                        className="inline-flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold"
                        style={{ background: gc.bg, color: gc.color, border: `1.5px solid ${gc.border}` }}
                      >
                        {row.grade}
                      </span>
                    </td>
                    <td className="border-l border-[#f0eeeb] px-4 py-3 leading-relaxed" style={{ color: "#3d3d3d" }}>{row.density}</td>
                    <td className="border-l border-[#f0eeeb] px-4 py-3 leading-relaxed" style={{ color: "#3d3d3d" }}>{row.diet}</td>
                    <td className="border-l border-[#f0eeeb] px-4 py-3 leading-relaxed" style={{ color: "#3d3d3d" }}>{row.performance}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* 계산 방식 3개를 나란히 */}
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl border border-[#e8e6e3] bg-[#FFFDF8] px-4 py-3.5" style={{ borderRadius: "12px" }}>
            <h3 className="text-xs font-semibold" style={{ color: "#1B7F5B" }}>단백질 밀도</h3>
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
          <div className="rounded-xl border border-[#e8e6e3] bg-[#FFFDF8] px-4 py-3.5" style={{ borderRadius: "12px" }}>
            <h3 className="text-xs font-semibold" style={{ color: "#4C7BD9" }}>다이어트</h3>
            <ul className="mt-1.5 space-y-1 text-xs leading-relaxed" style={{ color: "#6b6b6b" }}>
              <li>· 칼로리(kcal) + 당류(g) × 4</li>
              <li>· 낮을수록 다이어트에 유리 (당류 4배 가중)</li>
            </ul>
          </div>
          <div className="rounded-xl border border-[#e8e6e3] bg-[#FFFDF8] px-4 py-3.5" style={{ borderRadius: "12px" }}>
            <h3 className="text-xs font-semibold" style={{ color: "#F08A24" }}>퍼포먼스</h3>
            <ul className="mt-1.5 space-y-1 text-xs leading-relaxed" style={{ color: "#6b6b6b" }}>
              <li>· 단백질(g) ÷ (1 + (cal + 당류×2) ÷ 100)</li>
              <li>· 높을수록 운동·퍼포먼스 보충에 효율적</li>
            </ul>
          </div>
        </div>

        {/* 업데이트 정책 */}
        <div className="mt-4 rounded-xl border border-[#e8e6e3] bg-[#f9f8f5] px-5 py-4" style={{ borderRadius: "12px" }}>
          <h2 className="text-sm font-semibold" style={{ color: "#3d3d3d" }}>업데이트 정책</h2>
          <ul className="mt-2 space-y-1 text-xs" style={{ color: "#6b6b6b" }}>
            <li>· 등급 지표 — 모두 영양성분 기반 (가격 무관)</li>
            <li>· 영양성분 — 제조사 공식 자료 기준, 변경 시 즉시 반영</li>
          </ul>
        </div>

        {/* FAQ */}
        <div className="mt-6">
          <h2 className="text-sm font-semibold" style={{ color: "#3d3d3d" }}>자주 묻는 질문</h2>
          <div className="mt-3 space-y-2">
            {FAQ.map((item, i) => (
              <details key={i} className="group overflow-hidden rounded-xl border border-[#e8e6e3]">
                <summary className="flex cursor-pointer items-center justify-between px-4 py-3 text-sm font-medium hover:bg-[#f9f8f5]" style={{ color: "#3d3d3d" }}>
                  {item.q}?
                  <span className="text-xs" style={{ color: "#999" }}>▼</span>
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
