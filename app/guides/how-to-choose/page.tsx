import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

export const metadata = {
  title: "🎯 제품 선택 가이드 | ProteinLab",
  description:
    "어떤 제품을 골라야 할지 모르겠다면 이 트랙을 따라가세요. 5가지 핵심 지표와 유형별 선택법을 정리했습니다.",
};

export default function HowToChoosePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section
        className="w-full border-t border-b bg-[var(--hero-bg)]"
        style={{ borderColor: "var(--hero-border)" }}
      >
        <div className="mx-auto max-w-[1200px] px-4 py-4 md:px-6 md:py-5">
          <Link
            href="/guides"
            className="text-xs text-[var(--foreground-muted)] hover:text-[var(--accent)]"
          >
            ← 단백질 가이드
          </Link>
          <h1
            className="mt-2 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl"
            style={{ fontWeight: 700 }}
          >
            🎯 제품 선택 가이드
          </h1>
          <p className="mt-1 text-sm text-[var(--foreground-muted)]" style={{ fontWeight: 400 }}>
            어떤 제품을 골라야 할지 모르겠다면 이 트랙을 따라가세요. 5가지 핵심 지표와 유형별 선택법을
            정리했습니다.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 pb-12 md:px-6">
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Link
            href="/guides/how-to-choose/checklist"
            className="group flex flex-col justify-between rounded-2xl border bg-[#FFFDF8]"
            style={{ borderColor: "#e8e6e3" }}
          >
            <div className="px-5 pt-5 pb-4">
              <span className="rounded-md bg-[#eaf0f6] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#4a6178]">
                TRACK B-1
              </span>
              <h2 className="mt-3 text-base font-bold text-[var(--foreground)]">
                단백질 음료 고르는 법  5가지 핵심 체크리스트
              </h2>
              <p className="mt-2 text-[13px] leading-relaxed text-[var(--foreground-muted)]">
                단백질 함량부터 당류·급원까지, 구매 전 꼭 확인해야 할 기준을 한 번에 정리했습니다.
              </p>
              <div className="mt-3 flex items-center gap-2">
                <span className="rounded-full bg-[#f3f0eb] px-2 py-0.5 text-[10px] text-[#6b6b6b]">
                  7분
                </span>
                <span className="rounded-full bg-[#f3f0eb] px-2 py-0.5 text-[10px] text-[#6b6b6b]">
                  체크리스트
                </span>
              </div>
            </div>
            <div className="px-5 pb-5">
              <span
                className="flex items-center justify-center rounded-lg py-2.5 text-xs font-semibold transition-colors group-hover:bg-gray-50"
                style={{ border: "1px solid #e8e6e3", color: "#374151" }}
              >
                보러 가기
              </span>
            </div>
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
