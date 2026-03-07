import Header from "../components/Header";

export const metadata = {
  title: "등급 기준 | ProteinLab",
  description: "단백질음료 등급 산정 기준",
};

const gradeTable = [
  { grade: "A", criteria: "단백질 밀도 8g/100mL 이상 (전체 상위 20%)" },
  { grade: "B", criteria: "단백질 밀도 6~8g/100mL (상위 50%)" },
  { grade: "C", criteria: "단백질 밀도 4~6g/100mL (상위 80%)" },
  { grade: "D", criteria: "단백질 밀도 4g/100mL 미만" },
];

export default function GradeCriteriaPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <p className="text-sm font-medium text-[var(--accent)]">📊 등급 기준</p>
        <h1 className="mt-2 text-2xl font-bold text-[var(--foreground)] md:text-3xl">
          단백질음료 등급 산정 기준
        </h1>
        <p className="mt-3 text-sm text-[var(--foreground-muted)]">
          단백질 밀도·다이어트·퍼포먼스 등급은 아래 수치 기준으로 산정됩니다. 모두 영양성분 기반이며, 제조사 공식 자료 기준입니다.
        </p>

        <div className="mt-6 flex gap-2">
          <span className="rounded-full bg-[var(--accent)] px-3 py-1 text-xs font-medium text-white">단백질음료</span>
          <span className="rounded-full border border-[var(--border)] px-3 py-1 text-xs text-[var(--foreground-muted)]">단백질바</span>
        </div>

        <div className="mt-8 overflow-hidden rounded-xl border border-[var(--border)]">
          <table className="w-full border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-[var(--border)] bg-[var(--hero-bg)]" style={{ background: "#EFEDE6" }}>
                <th className="px-4 py-3 font-semibold text-[var(--foreground)]">등급</th>
                <th className="px-4 py-3 font-semibold text-[var(--foreground)]">기준</th>
              </tr>
            </thead>
            <tbody>
              {gradeTable.map((row) => (
                <tr key={row.grade} className="border-b border-[var(--border)]">
                  <td className="px-4 py-3 font-medium">{row.grade}</td>
                  <td className="px-4 py-3 text-[var(--foreground-muted)]">{row.criteria}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-8 rounded-xl border border-[var(--border)] bg-[var(--hero-bg)] p-4" style={{ background: "#EFEDE6" }}>
          <h2 className="text-sm font-semibold text-[var(--foreground)]">업데이트 정책</h2>
          <ul className="mt-2 list-inside list-disc text-xs text-[var(--foreground-muted)]">
            <li>등급 지표 — 모두 영양성분 기반 (가격 무관)</li>
            <li>영양성분 — 제조사 공식 자료 기준, 변경 시 즉시 반영</li>
          </ul>
        </div>
      </main>
      <footer className="mt-12 border-t border-[var(--border)] bg-[var(--beige-warm)] py-8">
        <div className="mx-auto max-w-[1200px] px-4 text-center text-sm text-[var(--foreground-muted)] md:px-6">
          <p>© ProteinLab. 단백질 제품 비교 정보는 참고용이며, 구매 전 공식 정보를 확인하세요.</p>
        </div>
      </footer>
    </div>
  );
}
