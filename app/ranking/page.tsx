import Header from "../components/Header";

export const metadata = {
  title: "등급 랭킹 | ProteinLab",
  description: "단백질 음료 등급 랭킹",
};

export default function RankingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <h1 className="text-2xl font-bold text-[var(--foreground)] md:text-3xl">등급 랭킹</h1>
        <p className="mt-2 text-sm text-[var(--foreground-muted)]">
          단백질 밀도·다이어트·퍼포먼스 등급별 제품 순위입니다.
        </p>
        <div className="mt-8 rounded-xl border border-[var(--border)] bg-[var(--hero-bg)] p-6" style={{ background: "#EFEDE6" }}>
          <p className="text-sm text-[var(--foreground-muted)]">랭킹 목록 영역 (추후 데이터 연동)</p>
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
