import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata = {
  title: "About | ProteinLab",
  description: "프로틴 비교 — 국내 RTD 단백질 음료 정보 사이트 소개",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section
        className="w-full border-t border-b bg-[var(--hero-bg)]"
        style={{ borderColor: "var(--hero-border)" }}
      >
        <div className="mx-auto max-w-[1200px] px-4 py-4 md:px-6 md:py-5">
          <h1
            className="text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl"
            style={{ fontWeight: 700 }}
          >
            About
          </h1>
          <p className="mt-1 text-sm text-[var(--foreground-muted)]">이 사이트에 대해</p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 pb-12 md:px-6">
        <article className="prose prose-sm mt-8 max-w-none">
          <h2 className="text-lg font-bold text-[var(--foreground)]">사이트 목적</h2>
          <p className="mt-2 text-[14px] leading-relaxed text-[var(--foreground-muted)]">
            프로틴 비교는 국내에서 판매되는 RTD(Ready-to-Drink) 단백질 음료의 핵심 스펙을 한눈에 비교할 수 있도록 만든 독립 정보 사이트입니다.
          </p>
          <p className="mt-2 text-[14px] leading-relaxed text-[var(--foreground-muted)]">
            단백질 함량·칼로리·당류·가격 등 제품 선택에 실질적으로 필요한 정보를 수집·정리하여 소비자가 자신의 목적에 맞는 제품을 쉽게 찾을 수 있도록 돕는 것을 목표로 합니다.
          </p>

          <h2 className="mt-8 text-lg font-bold text-[var(--foreground)]">데이터 수집 기준</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-[14px] leading-relaxed text-[var(--foreground-muted)]">
            <li>BCAA·단백질 급원 등 추가 정보는 공식 광고 소재 또는 제조사 발표 기준</li>
            <li>쿠팡·네이버쇼핑 등 주요 온라인 유통 채널 상품 정보</li>
            <li>제품 라벨(영양성분표) 및 공식 인증 자료</li>
            <li>제조사·브랜드 공식 홈페이지 및 공식 쇼핑몰 상품 페이지</li>
          </ul>
          <p className="mt-2 text-[14px] leading-relaxed text-[var(--foreground-muted)]">
            수집 데이터는 정기적으로 검토·업데이트됩니다. 오류나 누락 정보를 발견하셨다면{" "}
            <Link href="/contact" className="text-[var(--accent)] hover:underline">
              문의 페이지
            </Link>
            로 알려주세요.
          </p>

          <h2 className="mt-8 text-lg font-bold text-[var(--foreground)]">광고 및 상업적 이해관계</h2>
          <p className="mt-2 text-[14px] leading-relaxed text-[var(--foreground-muted)]">
            본 사이트는 특정 브랜드나 제조사로부터 금전적 대가를 받거나 광고·제휴 계약을 체결한 제품을 우선 노출하지 않습니다. 모든 제품은 동일한 기준으로 수집·표시됩니다.
          </p>
          <p className="mt-2 text-[14px] leading-relaxed text-[var(--foreground-muted)]">
            사이트 운영을 위해 Google AdSense 등 제3자 광고 서비스가 표시될 수 있습니다. 광고 콘텐츠는 사이트 편집 방침과 무관하며, 광고 게재 여부가 제품 정보나 순위에 영향을 주지 않습니다.
          </p>

          <h2 className="mt-8 text-lg font-bold text-[var(--foreground)]">업데이트 정책</h2>
          <p className="mt-2 text-[14px] leading-relaxed text-[var(--foreground-muted)]">
            신제품 출시, 가격 변동, 영양성분 변경 등에 따라 데이터를 지속적으로 업데이트합니다. 가격 정보는 실시간 반영이 아니므로, 실제 구매 전 판매 채널에서 최종 가격을 확인하시기 바랍니다.
          </p>

          <h2 className="mt-8 text-lg font-bold text-[var(--foreground)]">운영 정보</h2>
          <p className="mt-2 text-[14px] leading-relaxed text-[var(--foreground-muted)]">
            본 사이트는 독립적으로 운영되는 정보 서비스입니다. 문의, 정정 요청, 광고 관련 문의는{" "}
            <Link href="/contact" className="text-[var(--accent)] hover:underline">
              Contact 페이지
            </Link>
            를 통해 접수할 수 있습니다.
          </p>
        </article>
      </main>

      <Footer />
    </div>
  );
}
