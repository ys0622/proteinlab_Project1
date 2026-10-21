import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CommercialAdSection from "../components/CommercialAdSection";
import { getProductsByCategoryAsync } from "../lib/productData";

export const metadata = {
  title: "ProteinLab 소개 | 단백질 제품 성분 비교 플랫폼",
  description:
    "ProteinLab은 국내 단백질 음료·바·요거트·쉐이크·두유를 성분 데이터 기준으로 직접 수집·정리한 독립 비교 플랫폼입니다. 데이터 수집 기준, 운영 방침, 업데이트 정책을 안내합니다.",
  alternates: { canonical: "https://proteinlab.kr/about" },
};

const dataSourceList = [
  "제품 라벨(영양성분표) 및 공식 인증 자료",
  "제조사·브랜드 공식 홈페이지 및 공식 쇼핑몰 상품 페이지",
  "쿠팡·네이버쇼핑 등 주요 온라인 유통 채널 상품 정보",
  "BCAA·단백질 급원 등 추가 정보는 공식 광고 소재 또는 제조사 발표 기준",
];

// 2026-10-21: "즉시 수정합니다"를 실제로 어떻게 하는지 보여 주는 검증 방법과 수정 이력(신뢰 신호).
const verificationList = [
  "제품마다 포장의 영양정보(성분표) 사진을 받아 수치를 입력하고, 제품 페이지에 그 성분표 이미지를 함께 보여 줍니다.",
  "1개(1병·1팩) 기준 표시가 원칙입니다. 라벨이 100g·100mL당으로만 적힌 대용량 제품은 용량에 맞춰 곱한 값으로 바꿉니다.",
  "100kcal당 단백질처럼 비교를 위해 계산한 지표는 라벨에 적힌 수치가 아니라 표시값으로 계산한 값입니다.",
  "한 제품의 대표 수치와 상세 성분표가 서로 맞는지, 당류가 탄수화물보다 크지 않은지 등을 주기적으로 자동 점검합니다.",
  "성분표 이미지가 다른 제품과 같거나 맛·용량이 맞지 않으면 성분표를 내리고, 새 자료를 받을 때까지 비워 둡니다.",
];

const correctionLog = [
  { date: "2026-10-21", body: "요거트 10개 제품의 상세 성분표 수치를 라벨과 다시 대조해 수정했습니다(상하목장 유기농 그릭 400g, 요즘 플레인 그릭 800g 등)." },
  { date: "2026-10-21", body: "다른 제품의 성분표가 연결돼 있던 8개 제품은 성분표 연결을 내리고 해당 제품 자료를 다시 확보하고 있습니다." },
  { date: "2026-10-21", body: "켈로그 프로틴바K 3종의 1개 중량·열량·단백질을 포장 표기 기준으로 바로잡았습니다." },
  { date: "2026-10-21", body: "단백질바 39종, 요거트·쉐이크 15종에 탄수화물·포화지방 등 상세 성분을 성분표 기준으로 추가했습니다." },
];

const editorialList = [
  {
    title: "성분 데이터 우선",
    body: "단백질 함량, 당류, 칼로리, 단백질 밀도를 핵심 비교 기준으로 삼습니다. 마케팅 문구보다 영양성분표 수치를 기준으로 제품을 정리합니다.",
  },
  {
    title: "브랜드 중립성",
    body: "특정 브랜드나 제조사로부터 금전적 대가를 받거나 제휴 계약을 체결한 제품을 우선 노출하지 않습니다. 모든 제품은 동일한 기준으로 수집·표시됩니다.",
  },
  {
    title: "목적별 분류",
    body: "고단백·저당·다이어트·운동 후 보충 등 소비자가 실제로 제품을 선택하는 맥락을 기준으로 분류와 가이드를 작성합니다.",
  },
  {
    title: "오류 수정 원칙",
    body: "성분 정보 오류나 누락이 확인되면 즉시 수정합니다. 제보를 통해 접수된 정정 요청은 공식 자료와 대조 후 반영합니다.",
  },
];

export default async function AboutPage() {
  const [drinks, bars, yogurts, shakes, soymilks] = await Promise.all([
    getProductsByCategoryAsync("drink"),
    getProductsByCategoryAsync("bar"),
    getProductsByCategoryAsync("yogurt"),
    getProductsByCategoryAsync("shake"),
    getProductsByCategoryAsync("soymilk"),
  ]);
  // 두유가 빠져 있어 소개 페이지 숫자가 실제보다 적게 보였다(2026-10-21).
  const totalCount = drinks.length + bars.length + yogurts.length + shakes.length + soymilks.length;

  const stats = [
    { label: "등록 제품", value: `${totalCount}종` },
    { label: "비교 기준 항목", value: "단백질·당류·칼로리·밀도" },
    { label: "데이터 출처", value: "제조사 공식 자료" },
    { label: "업데이트", value: "상시 검토" },
  ];
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section
        className="w-full border-t border-b bg-[var(--hero-bg)]"
        style={{ borderColor: "var(--hero-border)" }}
      >
        <div className="mx-auto max-w-[1200px] px-4 py-6 md:px-6 md:py-8">
          <p className="text-xs font-semibold uppercase tracking-widest text-[var(--foreground-muted)]">
            About ProteinLab
          </p>
          <h1 className="mt-2 text-2xl font-bold leading-tight text-[#16412D] md:text-3xl">
            단백질 제품 성분 비교 플랫폼
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--foreground-muted)]">
            ProteinLab은 국내에서 판매되는 단백질 음료·바·요거트·쉐이크·두유 {totalCount}종을
            성분 데이터 기준으로 직접 수집·정리한 독립 비교 플랫폼입니다.
            마케팅 문구 대신 영양성분표 수치를 기준으로 소비자가 목적에 맞는 제품을 찾을 수 있도록 돕습니다.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 pb-16 md:px-6">

        {/* 숫자 요약 */}
        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-[#e8e6e3] bg-[#fffdf8] px-4 py-4 text-center"
            >
              <p className="text-base font-bold text-[#1f5138]">{stat.value}</p>
              <p className="mt-1 text-[12px] text-[var(--foreground-muted)]">{stat.label}</p>
            </div>
          ))}
        </div>

        <article className="mt-10 space-y-10">

          {/* 사이트 목적 */}
          <section>
            <h2 className="text-lg font-bold text-[var(--foreground)]">왜 만들었나요</h2>
            <p className="mt-3 text-[14px] leading-7 text-[var(--foreground-muted)]">
              국내 단백질 제품 시장이 빠르게 커지면서 음료·바·요거트·쉐이크·두유까지 선택지가 수백 종에 달하지만,
              소비자가 성분을 직접 비교할 수 있는 곳은 많지 않았습니다.
            </p>
            <p className="mt-3 text-[14px] leading-7 text-[var(--foreground-muted)]">
              ProteinLab은 단백질 함량, 당류, 칼로리, 단백질 밀도(단백질 g / 100kcal)를 핵심 지표로 삼아
              제품을 동일한 기준에서 나란히 비교할 수 있는 환경을 만들기 위해 시작됐습니다.
              운동하는 사람뿐 아니라 다이어트, 시니어 영양 관리, 일상적인 단백질 보충을 고민하는 모든 소비자를 대상으로 합니다.
            </p>
          </section>

          {/* 데이터 수집 기준 */}
          <section>
            <h2 className="text-lg font-bold text-[var(--foreground)]">데이터 수집 기준</h2>
            <p className="mt-3 text-[14px] leading-7 text-[var(--foreground-muted)]">
              모든 영양성분 데이터는 다음 공식 자료를 1차 출처로 사용합니다.
            </p>
            <ul className="mt-3 space-y-2">
              {dataSourceList.map((item) => (
                <li key={item} className="flex items-start gap-2 text-[14px] leading-6 text-[var(--foreground-muted)]">
                  <span className="mt-0.5 shrink-0 text-[#1b7f5b]">✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-3 text-[14px] leading-7 text-[var(--foreground-muted)]">
              데이터는 정기적으로 검토·업데이트되며, 오류나 누락 정보를 발견하셨다면{" "}
              <Link href="/contact" className="text-[var(--accent)] hover:underline">
                문의 페이지
              </Link>
              로 알려주세요. 공식 자료와 대조 후 즉시 수정합니다.
            </p>
          </section>

          {/* 검증 방법 */}
          <section>
            <h2 className="text-lg font-bold text-[var(--foreground)]">성분 수치 검증 방법</h2>
            <ul className="mt-3 space-y-2">
              {verificationList.map((item) => (
                <li key={item} className="flex items-start gap-2 text-[14px] leading-6 text-[var(--foreground-muted)]">
                  <span className="mt-0.5 shrink-0 text-[#1b7f5b]">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          {/* 수정 이력 */}
          <section>
            <h2 className="text-lg font-bold text-[var(--foreground)]">최근 데이터 수정 이력</h2>
            <ul className="mt-3 space-y-2">
              {correctionLog.map((item) => (
                <li key={item.body} className="text-[14px] leading-6 text-[var(--foreground-muted)]">
                  <span className="mr-2 font-semibold text-[#1f5138]">{item.date}</span>
                  {item.body}
                </li>
              ))}
            </ul>
          </section>

          {/* 편집 방침 */}
          <section>
            <h2 className="text-lg font-bold text-[var(--foreground)]">편집 방침</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {editorialList.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-[#e8e6e3] bg-[#fffdf8] px-4 py-4"
                >
                  <p className="text-sm font-semibold text-[#1f5138]">{item.title}</p>
                  <p className="mt-2 text-[13px] leading-6 text-[var(--foreground-muted)]">{item.body}</p>
                </div>
              ))}
            </div>
          </section>

          {/* 업데이트 정책 */}
          <section>
            <h2 className="text-lg font-bold text-[var(--foreground)]">업데이트 정책</h2>
            <p className="mt-3 text-[14px] leading-7 text-[var(--foreground-muted)]">
              신제품 출시, 리뉴얼, 단종, 영양성분 변경 등에 따라 데이터를 상시 검토합니다.
              가격 정보는 실시간 반영이 아니므로 실제 구매 전 판매 채널에서 최종 가격을 확인하시기 바랍니다.
            </p>
            <p className="mt-3 text-[14px] leading-7 text-[var(--foreground-muted)]">
              제품 등록 요청이나 신제품 제보는{" "}
              <Link href="/contact" className="text-[var(--accent)] hover:underline">
                Contact 페이지
              </Link>
              를 통해 접수할 수 있습니다.
            </p>
          </section>

          {/* 광고 및 제휴 */}
          <section>
            <h2 className="text-lg font-bold text-[var(--foreground)]">광고 및 제휴 안내</h2>
            <p className="mt-3 text-[14px] leading-7 text-[var(--foreground-muted)]">
              ProteinLab은 사이트 운영을 위해 Google AdSense 등 제3자 광고 서비스와 쿠팡 파트너스 제휴 링크를 사용합니다.
              일부 구매 링크를 통해 소정의 수수료가 발생할 수 있으나, 이는 제품의 노출 순서나 평가 기준에 영향을 주지 않습니다.
            </p>
            <p className="mt-3 text-[14px] leading-7 text-[var(--foreground-muted)]">
              광고 게재 여부와 제품 정보는 완전히 독립적으로 운영됩니다.
              특정 브랜드로부터 금전적 지원을 받거나 협찬을 받은 제품은 별도로 표시합니다.
            </p>
          </section>

          {/* 운영 정보 */}
          <section className="rounded-2xl border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5">
            <h2 className="text-base font-bold text-[var(--foreground)]">운영 정보</h2>
            <p className="mt-2 text-[14px] leading-6 text-[var(--foreground-muted)]">
              본 사이트는 국내 단백질 제품 정보를 독립적으로 수집·운영하는 개인 운영 플랫폼입니다.
            </p>
            <div className="mt-3 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="rounded-full border border-[#d7e6dd] bg-white px-4 py-2 text-sm font-medium text-[#1f5138] hover:bg-[#f4faf6]"
              >
                문의하기
              </Link>
              <Link
                href="/privacy"
                className="rounded-full border border-[#d7e6dd] bg-white px-4 py-2 text-sm font-medium text-[#1f5138] hover:bg-[#f4faf6]"
              >
                개인정보처리방침
              </Link>
              <Link
                href="/disclaimer"
                className="rounded-full border border-[#d7e6dd] bg-white px-4 py-2 text-sm font-medium text-[#1f5138] hover:bg-[#f4faf6]"
              >
                면책조항
              </Link>
            </div>
          </section>

        </article>
        <CommercialAdSection pageType="feed" className="mt-6" />
      </main>

      <Footer />
    </div>
  );
}
