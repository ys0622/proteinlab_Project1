import Image from "next/image";
import Link from "next/link";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { getPickBySlug } from "../../../data/picksConfig";

export const metadata = {
  title: "단백질 음료 고르는 법  5가지 핵심 체크리스트",
  description:
    "단백질 함량부터 당류급원까지, 제품 선택 전 꼭 확인해야 할 5가지 기준을 데이터로 정리했습니다.",
};

const TAGS = ["선택가이드", "기초", "체크리스트"];
const READ_TIME = "7분";

function pickHref(slug: string) {
  return getPickBySlug(slug) ? `/picks/${slug}` : "#";
}

function drinkImageSrc(filename: string) {
  return `/rtd-drink-image/${encodeURIComponent(filename)}`;
}

function Table({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="mt-3 overflow-x-auto rounded-xl border" style={{ borderColor: "#e8e6e3" }}>
      <table className="min-w-full border-collapse text-sm">
        <thead style={{ background: "#f7f4ef" }}>
          <tr>
            {headers.map((header) => (
              <th key={header} className="px-3 py-2 text-left font-semibold text-[var(--foreground)]">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={`${row[0]}-${rowIndex}`} className="border-t" style={{ borderColor: "#ece8e1" }}>
              {row.map((cell, cellIndex) => (
                <td key={`${cell}-${cellIndex}`} className="px-3 py-2 align-top text-[var(--foreground-muted)]">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function InlineButton({ href, text }: { href: string; text: string }) {
  const isDisabled = href === "#";
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center rounded-lg border px-4 py-2 text-sm font-semibold"
      style={{
        borderColor: isDisabled ? "#d9d9d9" : "#cfd7cf",
        background: isDisabled ? "#f3f3f3" : "#ffffff",
        color: isDisabled ? "#9ca3af" : "#2d4a35",
        pointerEvents: isDisabled ? "none" : "auto",
      }}
    >
      {text}
    </Link>
  );
}

function ProductImageCard({ src, alt }: { src: string; alt: string }) {
  return (
    <div
      className="relative overflow-hidden rounded-xl border bg-white"
      style={{ borderColor: "#e8e6e3", minHeight: "180px" }}
    >
      <Image src={src} alt={alt} fill className="object-contain p-3" sizes="(max-width: 768px) 100vw, 33vw" />
    </div>
  );
}

export default function ChecklistGuidePage() {
  const links = {
    highProtein20: pickHref("high-protein-20"),
    zeroSugar: pickHref("zero-sugar"),
    valueA: pickHref("value-a"),
    proteinWater: pickHref("protein-water"),
    gradeCriteria: "/grade-criteria",
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="w-full border-t border-b bg-[var(--hero-bg)]" style={{ borderColor: "var(--hero-border)" }}>
        <div className="mx-auto max-w-[1200px] px-4 py-4 md:px-6 md:py-5">
          <div className="flex items-center gap-1.5 text-xs text-[var(--foreground-muted)]">
            <Link href="/guides" className="hover:text-[var(--accent)]">
              가이드
            </Link>
            <span>/</span>
            <Link href="/guides/how-to-choose" className="hover:text-[var(--accent)]">
              🎯 제품 선택 가이드
            </Link>
          </div>
          <span className="mt-3 inline-block rounded-md bg-[#eaf0f6] px-2 py-0.5 text-[11px] font-semibold tracking-wide text-[#4a6178]">
            TRACK B-1
          </span>
          <h1 className="mt-2 text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
            단백질 음료 고르는 법  5가지 핵심 체크리스트
          </h1>
          <p className="mt-2 text-sm text-[var(--foreground-muted)]">
            편의점 냉장고 앞에서 고민하던 경험, 있으신가요?
            <br />
            단백질 음료는 무엇을 보고 골라야 할지 알면, 선택이 훨씬 쉬워집니다.
          </p>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="rounded-full bg-[#f3f0eb] px-2 py-0.5 text-[11px] text-[#6b6b6b]">{READ_TIME}</span>
            {TAGS.map((tag) => (
              <span key={tag} className="rounded-full bg-[#f3f0eb] px-2 py-0.5 text-[11px] text-[#6b6b6b]">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-[800px] px-4 py-8 md:px-6">
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          <ProductImageCard
            src={drinkImageSrc("빙그레 더단백 (커피) 20g 250ml.png")}
            alt="국내 단백질 음료 대표 제품들"
          />
          <ProductImageCard
            src={drinkImageSrc("매일유업 셀렉스 프로핏 (밀크 바닐라) 20g 250ml.png")}
            alt="국내 단백질 음료 대표 제품들"
          />
          <ProductImageCard
            src={drinkImageSrc("하이뮨 프로틴 밸런스 액티브 (딥초코) 20g 250ml.png")}
            alt="국내 단백질 음료 대표 제품들"
          />
        </div>

        <p className="mt-6 text-sm leading-7 text-[var(--foreground-muted)]">
          국내 단백질 식품 시장은 2018년 약 813억 원에서 2021년 3,364억 원으로 3년 만에 4배 이상 급성장했습니다.
          2024년 기준 시장 규모는 약 4,500억 원대로 추정됩니다.
        </p>
        <blockquote className="mt-3 rounded-xl border-l-4 px-4 py-3 text-sm" style={{ borderColor: "#4a6178", background: "#f5f7fb", color: "#425466" }}>
          출처: 한국농수산식품유통공사(aT), 국민일보 2024.02.25
        </blockquote>

        <section className="mt-10">
          <h2 className="text-xl font-bold text-[var(--foreground)]">1. 단백질 함량  한 팩에 얼마나 들어있나?</h2>
          <p className="mt-3 text-sm leading-7 text-[var(--foreground-muted)]">
            단백질 음료의 가장 기본 지표입니다. 운동 후 근합성을 극대화하려면 1회 최소 20g 이상이 권장됩니다.
            (출처: 경향신문 수피의 헬스 가이드, 2024.10)
          </p>
          <Table
            headers={["함량 기준", "의미"]}
            rows={[
              ["30g 이상", "초고함량  고강도 운동 후 적합"],
              ["20~29g", "고함량  일반 운동 후 보충에 적합"],
              ["20g 미만", "저함량  가벼운 일상 보충 또는 간식 대용"],
            ]}
          />
          <div className="mt-4">
            <ProductImageCard
              src={drinkImageSrc("뉴케어 올프로틴 (초콜릿) 25g 245ml.png")}
              alt="단백질 25g 고함량 제품  뉴케어 올프로틴"
            />
          </div>
          <div className="mt-4">
            <InlineButton href={links.highProtein20} text="고단백 20g+ 제품 바로 보기" />
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-bold text-[var(--foreground)]">2. 단백질 급원  유청인가, 식물성인가?</h2>
          <p className="mt-3 text-sm leading-7 text-[var(--foreground-muted)]">
            단백질의 원료(급원)에 따라 흡수 속도와 아미노산 구성이 달라집니다.
            <br />
            (출처: GQ코리아, 2025.03  &quot;유청단백은 운동 직후, 카제인은 취침 전이 이상적&quot;)
          </p>
          <Table
            headers={["급원", "특징", "추천 대상"]}
            rows={[
              ["분리유청단백 (WPI)", "흡수 빠름, 지방·유당 거의 없음", "운동 직후, 유당불내증 있는 분"],
              ["농축유청단백 (WPC)", "흡수 빠름, 가격 합리적", "일반 운동 목적"],
              ["카제인", "흡수 느림, 포만감 지속", "취침 전, 장시간 공복 시"],
              ["식물성 (대두·완두)", "채식주의자 적합", "비건, 유제품 민감한 분"],
            ]}
          />
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-bold text-[var(--foreground)]">3. 당류  0g이 무조건 좋은 건 아닙니다</h2>
          <p className="mt-3 text-sm leading-7 text-[var(--foreground-muted)]">
            단백질 음료라고 해서 무조건 건강하지 않습니다. 일부 제품은 당류가 단백질 함량만큼 많이 들어있기도 합니다.
          </p>
          <ul className="mt-2 list-disc pl-5 text-sm leading-7 text-[var(--foreground-muted)]">
            <li>다이어트 목적이라면 당류 0~1g 제품 선택</li>
            <li>당류 0g 제품은 감미료(수크랄로스 등)가 포함된 경우가 많음</li>
            <li>감미료는 일반적 섭취량에서 문제없으나, 민감한 분은 확인 권장</li>
          </ul>
          <p className="mt-2 text-xs text-[var(--foreground-muted)]">(출처: 경향신문 수피의 헬스 가이드, 2024.10)</p>
          <div className="mt-4">
            <InlineButton href={links.zeroSugar} text="당류 0g 제품 모아보기" />
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-bold text-[var(--foreground)]">4. 단백질 밀도  용량 대비 효율 지표</h2>
          <p className="mt-3 text-sm leading-7 text-[var(--foreground-muted)]">
            같은 단백질 함량이라도 용량이 크면 실제 농도는 낮습니다. ProteinLab은 이를 수치화한 단백질 밀도(g/100ml)
            지표와 A~D 등급을 제공합니다.
          </p>
          <Table
            headers={["밀도 등급", "기준", "의미"]}
            rows={[
              ["A등급", "9g/100ml 이상", "고밀도  적은 용량에 단백질이 풍부"],
              ["B등급", "7~9g/100ml", "표준 밀도"],
              ["C등급", "5~7g/100ml", "저밀도  워터형에 많음"],
              ["D등급", "5g/100ml 미만", "간식·가벼운 보충 목적"],
            ]}
          />
          <div className="mt-4 flex flex-wrap gap-2">
            <InlineButton href={links.valueA} text="밀도 A등급 제품 보기" />
            <InlineButton href={links.gradeCriteria} text="등급 기준 전체 보기" />
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-bold text-[var(--foreground)]">5. 워터형 vs 밀크형  내 목적에 맞는 타입</h2>
          <Table
            headers={["구분", "워터형", "밀크형"]}
            rows={[
              ["질감", "가볍고 청량함", "부드럽고 진함"],
              ["칼로리", "낮음 (50~100kcal)", "중간 (100~150kcal)"],
              ["단백질 밀도", "낮은 편", "높은 편"],
              ["추천 목적", "다이어트, 운동 중", "근성장, 포만감 필요 시"],
              ["대표 제품", "더단백 워터 프로틴, 랩노쉬 헤이워터", "셀렉스 프로핏, 하이뮨 액티브"],
            ]}
          />
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            <ProductImageCard
              src={drinkImageSrc("빙그레 더단백 (청사과) 25g 400ml.png")}
              alt="워터형  더단백 워터 프로틴 청사과"
            />
            <ProductImageCard
              src={drinkImageSrc("매일유업 셀렉스 프로핏 (밀크 바닐라) 20g 250ml.png")}
              alt="밀크형  셀렉스 프로핏 밀크 바닐라"
            />
          </div>
          <div className="mt-4">
            <InlineButton href={links.proteinWater} text="워터형 제품만 보기" />
          </div>
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-bold text-[var(--foreground)]">목적별 선택 요약표</h2>
          <Table
            headers={["목적", "우선 확인 지표", "추천 타입"]}
            rows={[
              ["근성장·운동 후 보충", "단백질 20g, WPI/WPC 급원", "밀크형"],
              ["다이어트·칼로리 관리", "당류 0g, 칼로리 100kcal 이하", "워터형"],
              ["일상 간편 보충", "맛, 휴대성, 20g 내외", "둘 다 가능"],
              ["비건·유당불내증", "식물성 급원, 락토프리 확인", "식물성"],
            ]}
          />
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div>
              <ProductImageCard src={drinkImageSrc("뉴케어 올프로틴 (초콜릿) 25g 245ml.png")} alt="근성장" />
              <p className="mt-1 text-center text-xs text-[var(--foreground-muted)]">근성장</p>
            </div>
            <div>
              <ProductImageCard src={drinkImageSrc("빙그레 더단백 (청사과) 25g 400ml.png")} alt="다이어트" />
              <p className="mt-1 text-center text-xs text-[var(--foreground-muted)]">다이어트</p>
            </div>
            <div>
              <ProductImageCard src={drinkImageSrc("매일유업 셀렉스 프로핏 (밀크 바닐라) 20g 250ml.png")} alt="일상보충" />
              <p className="mt-1 text-center text-xs text-[var(--foreground-muted)]">일상보충</p>
            </div>
            <div>
              <ProductImageCard src={drinkImageSrc("CJ 얼티브 비건 프로틴 (바나나맛) 21g 250ml.png")} alt="비건" />
              <p className="mt-1 text-center text-xs text-[var(--foreground-muted)]">비건</p>
            </div>
          </div>
          <div className="mt-6">
            <Link href="/" className="btn-cta-primary max-w-[280px]">
              전체 제품 비교하러 가기
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
