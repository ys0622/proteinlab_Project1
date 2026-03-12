import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "체중 관리와 단백질 | ProteinLab",
  description:
    "감량과 유지 단계에서 단백질을 어떻게 활용해야 하는지, 저당 제품을 어떤 기준으로 볼지 정리합니다.",
};

export default function WeightManagementProteinPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <section className="w-full border-t border-b bg-[var(--hero-bg)]" style={{ borderColor: "var(--hero-border)" }}>
        <div className="mx-auto max-w-[1200px] px-4 py-5 md:px-6 md:py-6">
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
            <Link href="/guides">가이드</Link>
            <span>/</span>
            <Link href="/guides/intake-strategy-health">섭취 전략 · 건강</Link>
            <span>/</span>
            <span>체중 관리와 단백질</span>
          </div>
          <div className="mt-3">
            <span className="rounded-md bg-[#f5f0ea] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#7a5230]">
              TRACK C
            </span>
          </div>
          <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
            체중 관리는 단백질만이 아니라 당류와 칼로리 조합으로 봐야 합니다
          </h1>
        </div>
      </section>
      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <section className="rounded-2xl border border-[#e8e6e3] bg-white px-5 py-5">
          <ul className="space-y-3 text-sm leading-6 text-[var(--foreground-muted)]">
            <li>• 감량기에는 단백질 함량과 함께 당류와 칼로리를 먼저 좁히는 편이 안전합니다.</li>
            <li>• 포만감이 중요하다면 총열량과 단백질을 함께 보고, 저당만으로 판단하지 않는 것이 좋습니다.</li>
            <li>• 체중 유지 단계에서는 지나치게 낮은 칼로리보다 지속 가능한 제품을 고르는 편이 더 현실적입니다.</li>
          </ul>
        </section>
      </main>
      <Footer />
    </div>
  );
}

