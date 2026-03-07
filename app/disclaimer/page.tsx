import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata = {
  title: "Disclaimer | ProteinLab",
  description: "프로틴 비교 면책 고지",
};

export default function DisclaimerPage() {
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
            면책 고지
          </h1>
          <p className="mt-1 text-sm text-[var(--foreground-muted)]">Disclaimer</p>
          <div
            className="mt-3 inline-flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-semibold"
            style={{ background: "#fff1e6", color: "#c76b2a" }}
          >
            ⚠️ 중요 안내
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 pb-12 md:px-6">
        <article className="prose prose-sm mt-8 max-w-none">
          <p className="text-[14px] leading-relaxed text-[var(--foreground-muted)]">
            본 사이트에서 제공하는 모든 정보는 일반적인 참고 목적으로만 제공됩니다. 의학적 조언, 영양 처방, 운동 치료를 대체하지 않습니다.
          </p>

          <h2 className="mt-8 text-lg font-bold text-[var(--foreground)]">건강·영양 정보</h2>
          <p className="mt-2 text-[14px] leading-relaxed text-[var(--foreground-muted)]">
            단백질 섭취 권장량, 섭취 타이밍, 단백질 급원 비교 등 영양 관련 정보는 일반적으로 공개된 연구 자료와 가이드라인을 바탕으로 작성된 참고 정보입니다.
          </p>
          <p className="mt-2 text-[14px] leading-relaxed text-[var(--foreground-muted)]">
            개인의 체질, 건강 상태, 식습관, 운동 목표에 따라 적합한 단백질 섭취량은 다를 수 있습니다. 본 사이트의 계산기 및 가이드는 일반적인 범위를 제시하는 도구이며, 정확한 섭취 계획은 전문가의 상담을 통해 결정하시기 바랍니다.
          </p>

          <h2 className="mt-8 text-lg font-bold text-[var(--foreground)]">특수 상황 전문가 상담 권고</h2>
          <p className="mt-2 text-[14px] leading-relaxed text-[var(--foreground-muted)]">
            다음에 해당하는 경우, 반드시 의사·영양사 등 전문가와 상담하신 후 단백질 보충제 섭취 여부를 결정하시기 바랍니다.
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-[14px] leading-relaxed text-[var(--foreground-muted)]">
            <li>특수 식이요법(저단백식 등)을 처방받은 경우</li>
            <li>식품 알레르기(유제품·대두·계란 등)가 있는 경우</li>
            <li>소아·청소년 (성장기 특수 영양 고려 필요)</li>
            <li>임산부·수유 중인 경우</li>
            <li>당뇨·고혈압 등 만성 질환 또는 약물 복용 중인 경우</li>
            <li>신장(콩팥) 질환, 간 질환이 있거나 의심되는 경우</li>
          </ul>

          <h2 className="mt-8 text-lg font-bold text-[var(--foreground)]">제품 정보의 정확성</h2>
          <p className="mt-2 text-[14px] leading-relaxed text-[var(--foreground-muted)]">
            본 사이트의 제품 정보(영양성분, 가격, 이미지 등)는 제조사 공개 자료를 기반으로 수집됩니다. 그러나 다음 사항에 유의하시기 바랍니다.
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-[14px] leading-relaxed text-[var(--foreground-muted)]">
            <li>이미지는 실제 제품과 다를 수 있으며, 제조사 제공 또는 공개 자료를 사용합니다.</li>
            <li>영양성분 수치는 제품 개체·제조 로트에 따라 소폭 차이가 있을 수 있습니다.</li>
            <li>가격은 수집 시점 기준이며, 실제 판매 가격과 다를 수 있습니다.</li>
            <li>제조사의 리뉴얼·성분 변경이 사이트에 즉시 반영되지 않을 수 있습니다.</li>
          </ul>

          <h2 className="mt-8 text-lg font-bold text-[var(--foreground)]">책임 한계</h2>
          <p className="mt-2 text-[14px] leading-relaxed text-[var(--foreground-muted)]">
            본 사이트는 제공된 정보의 활용 결과로 발생하는 직·간접적 손해에 대해 법적 책임을 지지 않습니다. 구매 결정은 이용자 본인의 판단과 책임 하에 이루어지며, 중요한 건강 관련 결정은 반드시 전문 의료인과 상담하시기 바랍니다.
          </p>
        </article>
      </main>

      <Footer />
    </div>
  );
}
