import Header from "../components/Header";

export const metadata = {
  title: "브랜드 이벤트 & 혜택 | ProteinLab",
  description: "단백질음료 브랜드 이벤트 & 혜택",
};

export default function OfficialEventsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <p className="text-sm font-medium text-[var(--accent)]">🎁 공식 혜택</p>
        <h1 className="mt-2 text-2xl font-bold text-[var(--foreground)] md:text-3xl">
          단백질음료 브랜드 이벤트 & 혜택
        </h1>
        <p className="mt-3 text-sm text-[var(--foreground-muted)]">
          단백질음료 브랜드의 자사몰·공식 스토어 혜택을 모았습니다. 정기배송·회원가입 혜택까지 — 직접 구매 전 여기서 먼저 확인하세요.
        </p>
        <div className="mt-4 flex flex-wrap gap-2 text-xs text-[var(--foreground-muted)]">
          <span>12개 브랜드</span>
          <span>·</span>
          <span>20개 혜택</span>
          <span>·</span>
          <span>직접 확인 후 구매 권장</span>
        </div>
        <div className="mt-8 flex flex-wrap gap-2">
          {["전체 20", "🔖 할인 12", "🎟 쿠폰 4", "🎁 증정 2", "🚚 무료배송 2"].map((label) => (
            <span
              key={label}
              className="rounded-full border border-[var(--border)] bg-white px-3 py-1.5 text-xs"
            >
              {label}
            </span>
          ))}
        </div>
        <div className="mt-8 space-y-4">
          <p className="text-sm text-[var(--foreground-muted)]">브랜드별 이벤트 카드 영역 (추후 데이터 연동)</p>
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
