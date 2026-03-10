import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export const metadata = {
  title: "단백질 부족 증상 5가지 | 근육감소·피로·면역저하·탈모·부종 | ProteinLab",
  description:
    "단백질이 부족하면 근육 감소, 피로감, 면역력 저하, 탈모, 부종 등의 신호가 나타납니다. 증상별 원인과 해결법을 데이터 기반으로 정리했습니다.",
};

const summaryRows = [
  ["근육", "근육량 감소, 근력 저하", "단백질 부족 시 근육 조직 분해"],
  ["피로", "쉽게 피로함, 무기력", "에너지 대사 저하, ATP 생성 감소"],
  ["면역", "감기·감염 잦음, 회복 지연", "항체·면역세포 합성 감소"],
  ["피부·모발", "탈모, 피부 건조, 손톱 갈라짐", "콜라겐·케라틴 합성 부족"],
  ["부종", "손발·복부·얼굴 부음", "혈장 알부민 감소 → 삼투압 저하"],
];

const riskRows = [
  ["다이어터·식이조절 중", "칼로리 제한으로 단백질 섭취 부족", "식사마다 단백질 식품 우선 섭취"],
  ["고령자 (60세 이상)", "흡수율 저하, 식욕 감소, 근감소증 위험", "1.2g/kg 이상 섭취 권장"],
  ["채식·비건 식단", "필수 아미노산 섭취 부족 우려", "다양한 식물성 단백질 조합 섭취"],
  ["식사 거르기·불규칙 식단", "단백질 공급 중단 → 근분해 촉진", "최소 3끼 단백질 식단 유지"],
];

function ImageSlot({ alt }: { alt: string }) {
  return (
    <div
      className="mt-4 rounded-2xl border border-dashed border-[#d9d4cd] bg-white px-5 py-8 text-center"
      role="img"
      aria-label={alt}
    >
      <p className="text-xs font-semibold tracking-[0.08em] text-[#8f8a84]">IMAGE SLOT</p>
      <p className="mt-2 text-sm font-semibold text-[var(--foreground)]">{alt}</p>
    </div>
  );
}

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="mt-4 rounded-xl border border-[#eef1f3] bg-white px-4 py-4 text-sm leading-6 text-[var(--foreground-muted)]">
      {children}
    </blockquote>
  );
}

export default function DeficiencySymptomsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section
        className="w-full border-t border-b bg-[var(--hero-bg)]"
        style={{ borderColor: "var(--hero-border)" }}
      >
        <div className="mx-auto max-w-[1200px] px-4 py-5 md:px-6 md:py-6">
          <div className="flex flex-wrap items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
            <Link href="/guides" className="hover:text-[var(--accent)]">
              가이드
            </Link>
            <span>/</span>
            <Link href="/guides/basics" className="hover:text-[var(--accent)]">
              🧬 단백질 기초
            </Link>
            <span>/</span>
            <span>단백질 부족 시 나타나는 증상</span>
          </div>

          <div className="mt-3">
            <span className="rounded-md bg-[#eef4ea] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#4c7a57]">
              TRACK A
            </span>
          </div>

          <h1 className="mt-3 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
            단백질이 부족하면 몸에 어떤 신호가 올까?
          </h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-[var(--foreground-muted)]">
            피로감, 잦은 감기, 탈모, 부종. 이 증상들이 반복된다면 단백질 부족을 의심해볼 수 있습니다.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-6">
        <div className="space-y-6">
          <section className="rounded-2xl border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5">
            <h2 className="text-xl font-bold text-[var(--foreground)]">한눈에 보는 단백질 부족 신호</h2>

            <div className="mt-5 overflow-x-auto">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8e6e3] text-[var(--foreground)]">
                    <th className="px-3 py-3 font-semibold">구분</th>
                    <th className="px-3 py-3 font-semibold">대표 증상</th>
                    <th className="px-3 py-3 font-semibold">원인</th>
                  </tr>
                </thead>
                <tbody>
                  {summaryRows.map((row) => (
                    <tr key={row[0]} className="border-b border-[#f0eeeb] last:border-b-0">
                      {row.map((cell) => (
                        <td key={cell} className="whitespace-nowrap px-3 py-3 text-[var(--foreground-muted)]">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-4 text-xs text-[var(--foreground-muted)]">
              출처: WHO / 삼성서울병원(2015) / Cleveland Clinic(2025)
            </p>
          </section>

          <section className="rounded-2xl border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5">
            <h2 className="text-xl font-bold text-[var(--foreground)]">1. 근육 감소와 근력 저하</h2>
            <p className="mt-4 text-sm leading-6 text-[var(--foreground-muted)]">
              단백질이 부족하면 신체는 에너지 확보를 위해 근육 단백질을 분해합니다. 근육량이 점진적으로
              줄어들고, 계단 오르기·물건 들기 등 일상 활동이 힘들어집니다. 심한 경우 심장 근육까지 약화될
              수 있습니다.
            </p>

            <Callout>
              단기간 단백질을 0.5g/kg으로 제한한 고령자 집단에서 근육 합성 관련 유전자 발현이 억제되는
              변화가 관찰되었습니다.
            </Callout>

            <p className="mt-4 text-xs text-[var(--foreground-muted)]">출처: Thalacker-Mercer (2007)</p>

            <ImageSlot alt="정상 근육과 단백질 결핍 시 근육 위축 비교 도식" />

            <div className="mt-5">
              <Link
                href="/picks/high-protein-20"
                className="inline-flex items-center justify-center rounded-lg border border-[#e8e6e3] px-5 py-3 text-sm font-semibold text-[#374151] transition-colors hover:bg-[var(--accent-light)] hover:text-[var(--accent)]"
              >
                고단백 20g+ 제품 보기
              </Link>
            </div>
          </section>

          <section className="rounded-2xl border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5">
            <h2 className="text-xl font-bold text-[var(--foreground)]">2. 피로감·집중력 저하</h2>
            <p className="mt-4 text-sm leading-6 text-[var(--foreground-muted)]">
              단백질 결핍으로 기초 대사와 ATP 생성 효율이 떨어지면 식사 후에도 피로하고, 하루 종일 무기력한
              상태가 지속됩니다. 혈당 조절이 불안정해져 점심 식후 졸림이 심해지기도 합니다.
            </p>

            <Callout>
              하루 3끼에 나누어 15~30g씩 단백질을 섭취하는 것이 피로 예방에 효과적입니다.
            </Callout>

            <p className="mt-4 text-xs text-[var(--foreground-muted)]">출처: Cesari (2023)</p>
          </section>

          <section className="rounded-2xl border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5">
            <h2 className="text-xl font-bold text-[var(--foreground)]">3. 면역력 저하</h2>
            <p className="mt-4 text-sm leading-6 text-[var(--foreground-muted)]">
              항체(면역글로불린), 사이토카인, 면역세포는 모두 단백질로 만들어집니다. 단백질이 부족하면
              면역기관이 퇴화하고 감염에 취약해집니다. 잔병치레가 잦거나 질환 후 회복이 오래 걸린다면
              단백질 부족을 의심해보세요.
            </p>

            <Callout>
              단백질 결핍 상태의 마우스는 독감 감염 시 항체 반응과 CD8+ T세포 생성이 현저히 감소했습니다.
            </Callout>

            <p className="mt-4 text-xs text-[var(--foreground-muted)]">출처: CDC (2013)</p>

            <ImageSlot alt="항체(면역글로불린) 구조와 면역세포 역할 도식" />
          </section>

          <section className="rounded-2xl border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5">
            <h2 className="text-xl font-bold text-[var(--foreground)]">4. 피부·모발 변화</h2>
            <p className="mt-4 text-sm leading-6 text-[var(--foreground-muted)]">
              피부 탄력의 근간인 콜라겐과 모발 주성분인 케라틴은 단백질에서 만들어집니다. 단백질이 부족하면
              모발이 가늘어지고 탈모 위험이 커지며, 피부 주름이 깊어지고 손톱이 쉽게 갈라집니다.
            </p>

            <Callout>
              충분한 단백질을 섭취하면 수 개월 내로 모발 굵기와 피부 컨디션이 개선될 수 있습니다.
            </Callout>

            <p className="mt-4 text-xs text-[var(--foreground-muted)]">출처: Chosun (2025)</p>
          </section>

          <section className="rounded-2xl border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5">
            <h2 className="text-xl font-bold text-[var(--foreground)]">5. 부종 (몸 붓기)</h2>
            <p className="mt-4 text-sm leading-6 text-[var(--foreground-muted)]">
              혈액 내 알부민(단백질)이 부족하면 혈장 삼투압이 낮아지고, 체액이 조직으로 빠져나가
              손발·복부·얼굴이 붓습니다. 심한 경우 단백질 결핍형 영양실조(콰시오커)로 발전할 수 있습니다.
            </p>

            <Callout>
              아침에 눈 주위가 자주 붓거나, 오래 서 있으면 다리가 심하게 붓는다면 단백질 섭취를
              점검해보세요.
            </Callout>

            <p className="mt-4 text-xs text-[var(--foreground-muted)]">출처: Cleveland Clinic (2025)</p>
          </section>

          <section className="rounded-2xl border border-[#e8e6e3] bg-[#fffdf8] px-5 py-5">
            <h2 className="text-xl font-bold text-[var(--foreground)]">이런 분들은 특히 주의하세요</h2>

            <div className="mt-5 overflow-x-auto">
              <table className="min-w-full border-collapse text-left text-sm">
                <thead>
                  <tr className="border-b border-[#e8e6e3] text-[var(--foreground)]">
                    <th className="px-3 py-3 font-semibold">위험군</th>
                    <th className="px-3 py-3 font-semibold">이유</th>
                    <th className="px-3 py-3 font-semibold">권장 조치</th>
                  </tr>
                </thead>
                <tbody>
                  {riskRows.map((row) => (
                    <tr key={row[0]} className="border-b border-[#f0eeeb] last:border-b-0">
                      {row.map((cell) => (
                        <td key={cell} className="whitespace-nowrap px-3 py-3 text-[var(--foreground-muted)]">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-4 text-xs text-[var(--foreground-muted)]">출처: 대한노인의학회 / WHO</p>
          </section>

          <section className="rounded-2xl border border-[#e8e6e3] bg-white px-5 py-5">
            <div className="flex flex-wrap gap-3">
              <Link
                href="/guides/basics/daily-requirement"
                className="inline-flex items-center justify-center rounded-lg border border-[#e8e6e3] px-5 py-3 text-sm font-semibold text-[#374151] transition-colors hover:bg-[var(--accent-light)] hover:text-[var(--accent)]"
              >
                나에게 맞는 하루 단백질 권장량 확인
              </Link>
              <Link
                href="/recommend"
                className="inline-flex items-center justify-center rounded-lg border border-[#e8e6e3] px-5 py-3 text-sm font-semibold text-[#374151] transition-colors hover:bg-[var(--accent-light)] hover:text-[var(--accent)]"
              >
                내 목적에 맞는 제품 찾기
              </Link>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
