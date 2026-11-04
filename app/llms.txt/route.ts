import { getCategoryProductCountsAsync } from "../lib/productCounts";
import { getAllCompareLandings } from "../data/compareLandings";
import { compareLandingHref, compareNoindexSlugs } from "../data/compareCanonicalOverrides";
import { getAllProducts } from "../data/products";
import { getBrandSummary } from "../lib/brandHubs";

const SITE_URL = "https://proteinlab.kr";

// AI 검색·어시스턴트가 사이트 구조와 데이터 출처를 파악하도록 돕는 안내 파일(llmstxt.org 형식).
export async function GET() {
  const counts = await getCategoryProductCountsAsync();
  const total = counts.drink + counts.bar + counts.yogurt + counts.shake + counts.soymilk + counts.powder;

  // 사이트맵과 같은 기준: 비교 페이지는 대표 주소 하나만, 브랜드는 제품 3개 이상만
  const seen = new Set<string>();
  const compareLines = getAllCompareLandings()
    .filter((landing) => !compareNoindexSlugs.has(landing.slug))
    .map((landing) => ({ title: landing.title, href: compareLandingHref(landing.slug) }))
    .filter((item) => !seen.has(item.href) && seen.add(item.href))
    .map((item) => `- [${item.title}](${SITE_URL}${item.href})`)
    .join("\n");
  const brandLines = getBrandSummary(getAllProducts())
    .filter((brand) => brand.total >= 3)
    .map((brand) => `- [${brand.brand} 제품 성분 비교](${SITE_URL}/brands/${brand.slug}): ${brand.total}종`)
    .join("\n");

  const body = `# ProteinLab

> 국내에서 판매되는 단백질 음료, 단백질 바, 단백질 요거트, 단백질 쉐이크, 두유, 단백질 파우더의 성분을 제조사 표기 기준으로 비교하는 서비스입니다. 등록 제품 ${total}종(음료 ${counts.drink}, 바 ${counts.bar}, 요거트 ${counts.yogurt}, 쉐이크 ${counts.shake}, 두유 ${counts.soymilk}, 파우더 ${counts.powder}).

## 데이터 기준
- 수치(단백질, 열량, 당류 등)는 제품 성분표의 제조사 표기를 1회 제공량(1병·1개) 기준으로 옮긴 값입니다. 요거트 대용량 통(250g 초과)은 용기 전체 수치라 1회분 비교에서 제외합니다.
- 원재료 조사는 식약처 식품안전나라 품목제조보고(원재료) 자료를 출처로 하며, 제조원 신고 시점 기준입니다.
- 일부 링크는 쿠팡 파트너스 링크이며 구매 시 수수료가 발생할 수 있습니다.

## 주요 페이지
- [전체 제품 목록](${SITE_URL}/products): 등록된 모든 제품을 카테고리별로 모았습니다.
- [단백질 음료](${SITE_URL}/drinks), [단백질 바](${SITE_URL}/bars), [단백질 요거트](${SITE_URL}/yogurt), [단백질 쉐이크](${SITE_URL}/shake), [두유](${SITE_URL}/soymilk), [단백질 파우더](${SITE_URL}/powder): 카테고리별 비교와 필터
- [단백질 파우더 추천 TOP 10](${SITE_URL}/guides/product-selection-comparison/protein-powder-top10): 등록 파우더 45종 중 게이너·식사대용 제외, 단백질 함량(1회 제공량 대비 %) 높은 순·같으면 당류 낮은 순, 1위 원데이뉴트리션 WPI 90%(27g/30g, 당류 0g), TOP 10 함량 76.7~90%, 해외 직구 4종, 당류 미표시 제품은 순위 제외
- [WPI·WPC·분리대두 단백질 파우더 차이](${SITE_URL}/guides/product-selection-comparison/wpi-wpc-isp-powder-guide): 유형별 평균 단백질 함량 아이솔레이트 78.5%(12종)·웨이 71.9%(7종)·식물성 74.2%(3종)·혼합 63.9%(8종), 평균 당류(표시 제품) 0.4·1.9·0.5·1.6g
- [목적별 단백질 파우더 — 시니어·식사대용·게이너·운동용](${SITE_URL}/guides/product-selection-comparison/protein-powder-by-purpose): 1회 제공량 운동용 12.5~55g·시니어 30~40g·식사대용 35~45g·게이너 120~300g, 게이너 1회 417.7~1149kcal(1,000kcal 초과 2종), 시니어 7종 중 6종은 당류 미표시
- [단백질 보충제 1스쿱 단백질 비교](${SITE_URL}/guides/product-selection-comparison/protein-powder-scoop-guide): 게이너를 뺀 등록 파우더의 1회 제공량(1스쿱 기준)·1회 단백질·단백질 함량·열량·한 통 회분을 단백질 많은 순으로 비교
- [랭킹](${SITE_URL}/ranking): 단백질 밀도, 다이어트, 퍼포먼스 기준 순위(1회 제공량 비교가 가능한 제품만)
- [실시간 인기](${SITE_URL}/trending): 최근 7일 조회 기반 인기 제품
- [제품 비교](${SITE_URL}/compare): 제품 2~3개를 나란히 비교
- [맞춤 추천](${SITE_URL}/recommend): 목적별 추천
- [가이드](${SITE_URL}/guides): 단백질 기초, 제품 선택·비교, 섭취 전략 가이드
- [데이터 수집·검증 방법](${SITE_URL}/methodology)
- [단백질 섭취량 계산기](${SITE_URL}/tools/calculator): 체중·목적별 하루 단백질 목표

## 단백질 질문 가이드 (공식 기준·논문 출처 표기)
- [단백질 하루 섭취량 — 성별·나이·체중별 권장량과 운동할 때 기준](${SITE_URL}/guides/basics/daily-requirement): 2020 한국인 영양소 섭취기준(성인 남성 60~65g, 여성 50~55g, 체중 1kg당 0.91g), 국민건강영양조사 실제 섭취량, 운동 시 ISSN 1.4~2.0g/kg
- [단백질 과다섭취 부작용 — 얼마부터 많은지, 신장에 무리가 가는지](${SITE_URL}/guides/intake-strategy-health/high-protein-side-effects): 섭취기준에 상한섭취량이 없는 이유, 신장 기능 정상인 메타분석(Devries 2018), 만성콩팥병 기준(KDOQI 2020)
- [단백질 부족 증상 — 근육 감소·부종·탈모·회복 지연](${SITE_URL}/guides/basics/deficiency-symptoms): 증상별 다른 원인 구분, 근감소증 자가 점검(AWGS 2019 악력·의자 일어서기·보행 속도)
- [단백질 많은 음식 순위 — 100g당·한 번 먹는 양·열량 대비](${SITE_URL}/guides/basics/high-protein-foods): 식약처 식품영양성분 DB 원재료성 식품 25가지 100g당 값(황태포 79g, 건멸치 60.29g, 구운 돼지 안심 30.23g, 삶은 닭가슴살 28.09g, 삶은 달걀 13.49g, 두부 9.62g, 우유 3.09g), 100kcal당 단백질 순위(달걀흰자 22.8g·황태포 22.6g·삶은 닭가슴살 22.1g), 편의점 음식과 단백질 음료·바·요거트 비교
- [단백질 한 번에 흡수량 — 30g 넘으면 버려질까](${SITE_URL}/guides/intake-strategy-health/protein-50g-at-once): Moore 2009·Areta 2013·Macnaughton 2016·Trommelen 2023 연구 비교, 끼니당 0.4~0.55g/kg
- [단백질 먹는 시간 — 운동 후 30분? 아침·자기 전](${SITE_URL}/guides/intake-strategy-health/protein-timing): 타이밍 메타분석(Schoenfeld 2013), 끼니 분산(Mamerow 2014), 자기 전 카제인(Res 2012)
- [근육 합성에 단백질 얼마나? — 한 끼 20~40g·하루 1.6g/kg](${SITE_URL}/guides/basics/muscle): 근단백질 합성 조건별 근거(Moore 2009, Witard 2014, Macnaughton 2016, Trommelen 2023, Areta 2013, Res 2012, Moore 2015 노인 0.40g/kg), 체중별 하루 목표
- [마운자로·위고비 단백질 — 근육 빠짐 막으려면 하루 얼마나](${SITE_URL}/guides/intake-strategy-health/glp1-protein): 빠진 체중 중 제지방 약 25%(SURMOUNT-1)·약 40%(STEP 1), 2025 미국 4개 학회 공동 권고(하루 80~120g 또는 감량 중 1.2~1.6g/kg, 근력 운동 병행), 250mL 이하 고단백 음료 성분표
- [노인 단백질 섭취량 — 65세 이상 하루 얼마나](${SITE_URL}/guides/intake-strategy-health/senior-protein-strategy): 2020 한국인 영양소 섭취기준 65세 이상 남 60g·여 50g, PROT-AGE·ESPEN 1.0~1.2g/kg, 75세 이상 여성 실제 섭취 권장량의 75%, 한 끼 0.4g/kg(Moore 2015), Health ABC 3년 추적(Houston 2008), AWGS 2019 근감소증 점검
- [임산부 단백질 하루 얼마나](${SITE_URL}/guides/intake-strategy-health/pregnancy-protein): 2020 한국인 영양소 섭취기준 임신 2분기 +15g·3분기 +30g·수유기 +25g(1분기 추가 없음), 지표 아미노산 산화법 추정 1.22~1.52g/kg(Stephens 2015, 공식 기준 아님), WHO 2016 고단백 보충 비권고, 당류 낮은 고단백 두유 성분표
- [청소년 단백질 섭취량 — 중학생·고등학생](${SITE_URL}/guides/intake-strategy-health/teen-protein): 12~14세 남 60g·여 55g, 15~18세 남 65g·여 55g(성장 몫 포함), 국민건강영양조사 평균 섭취량과 하위 25%(15~18세 여자 42.7g < 평균필요량 45g), 에너지적정비율 7~20%
- [신장 질환 단백질 섭취량 — 콩팥병 단계별·투석 중 하루 얼마나](${SITE_URL}/guides/intake-strategy-health/kidney-disease-protein): KDOQI 2020 투석 전 3~5기 0.55~0.6g/kg(당뇨 동반 0.6~0.8g, 초저단백 0.28~0.43g + 케토산), 투석 중 1.0~1.2g/kg, KDIGO 2024 3~5기 0.8g/kg·1.3g/kg 초과 피하기·나트륨 2g 미만, 국내 일차 의료용 만성콩팥병 진료지침(2022) 0.8g/kg, 체중별 표
- [자기 전 단백질 — 근육에 효과 있을까, 살찔까](${SITE_URL}/guides/intake-strategy-health/night-protein-drink): Res 2012, Snijders 2015(12주 허벅지 근육 단면적 +8.4 vs +4.8cm²), Kouw 2017(노인 40g만 효과), 체중은 하루 총열량(Bray 2012)
- [운동 안 하고 단백질 음료 마시면](${SITE_URL}/guides/intake-strategy-health/protein-drink-without-exercise): 필요량 0.91g/kg은 운동과 무관, 근육 증가 근거는 근력 운동 병행 연구(Morton 2018), 비활동 시 근육 감소(Kortebein 2007)
- [단백질 쉐이크 효과 — 근육·다이어트·포만감, 연구로 확인한 것과 아닌 것](${SITE_URL}/guides/intake-strategy-health/protein-shake-effects): 근력 운동 시 제지방 +0.30kg·1.6g/kg 이후 정체(Morton 2018 메타분석 49개 연구), 감량 중 1.2~1.6g/kg(Leidy 2015), 등록 쉐이크·음료 성분 중앙값
- [단백질 쉐이크 다이어트 — 한 끼 대신? 간식 대신?](${SITE_URL}/guides/intake-strategy-health/protein-shake-diet): 식사대용 3개월 약 2.5kg 추가 감량·1년 차이 불분명(Heymsfield 2003), 식약처 체중조절용 조제식품 1회 200~400kcal, 등록 쉐이크 열량·당류 분포
- [단백질 쉐이크·단백질 음료 살찌나요](${SITE_URL}/guides/intake-strategy-health/protein-drink-weight-gain): 1개 열량을 하루·30일 기준으로 계산(2020 에너지 필요추정량 대비), 과식 실험에서 체지방은 단백질 비율과 무관하게 증가(Bray 2012 JAMA)
- [MPI 단백질이란? WPI·WPC·MPC 차이와 식물성 vs 동물성](${SITE_URL}/guides/basics/protein-source-types): 원료별 단백질 비율·유당, 대두와 동물성 단백질의 근육 증가 차이(Messina 2018)

## 제품·브랜드·맛별 성분 비교
${compareLines}

## 브랜드별 제품
${brandLines}

## 기타
- [사이트맵](${SITE_URL}/sitemap.xml)
- [RSS(최근 수정된 페이지)](${SITE_URL}/rss.xml)
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
