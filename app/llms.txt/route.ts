import { getCategoryProductCountsAsync } from "../lib/productCounts";
import { getAllCompareLandings } from "../data/compareLandings";
import { compareLandingHref } from "../data/compareCanonicalOverrides";
import { getAllProducts } from "../data/products";
import { getBrandSummary } from "../lib/brandHubs";

const SITE_URL = "https://proteinlab.kr";

// AI 검색·어시스턴트가 사이트 구조와 데이터 출처를 파악하도록 돕는 안내 파일(llmstxt.org 형식).
export async function GET() {
  const counts = await getCategoryProductCountsAsync();
  const total = counts.drink + counts.bar + counts.yogurt + counts.shake + counts.soymilk;

  // 사이트맵과 같은 기준: 비교 페이지는 대표 주소 하나만, 브랜드는 제품 3개 이상만
  const seen = new Set<string>();
  const compareLines = getAllCompareLandings()
    .map((landing) => ({ title: landing.title, href: compareLandingHref(landing.slug) }))
    .filter((item) => !seen.has(item.href) && seen.add(item.href))
    .map((item) => `- [${item.title}](${SITE_URL}${item.href})`)
    .join("\n");
  const brandLines = getBrandSummary(getAllProducts())
    .filter((brand) => brand.total >= 3)
    .map((brand) => `- [${brand.brand} 제품 성분 비교](${SITE_URL}/brands/${brand.slug}): ${brand.total}종`)
    .join("\n");

  const body = `# ProteinLab

> 국내에서 판매되는 단백질 음료, 단백질 바, 단백질 요거트, 단백질 쉐이크, 두유의 성분을 제조사 표기 기준으로 비교하는 서비스입니다. 등록 제품 ${total}종(음료 ${counts.drink}, 바 ${counts.bar}, 요거트 ${counts.yogurt}, 쉐이크 ${counts.shake}, 두유 ${counts.soymilk}).

## 데이터 기준
- 수치(단백질, 열량, 당류 등)는 제품 성분표의 제조사 표기를 1회 제공량(1병·1개) 기준으로 옮긴 값입니다. 요거트 대용량 통(250g 초과)은 용기 전체 수치라 1회분 비교에서 제외합니다.
- 원재료 조사는 식약처 식품안전나라 품목제조보고(원재료) 자료를 출처로 하며, 제조원 신고 시점 기준입니다.
- 일부 링크는 쿠팡 파트너스 링크이며 구매 시 수수료가 발생할 수 있습니다.

## 주요 페이지
- [전체 제품 목록](${SITE_URL}/products): 등록된 모든 제품을 카테고리별로 모았습니다.
- [단백질 음료](${SITE_URL}/drinks), [단백질 바](${SITE_URL}/bars), [단백질 요거트](${SITE_URL}/yogurt), [단백질 쉐이크](${SITE_URL}/shake), [두유](${SITE_URL}/soymilk): 카테고리별 비교와 필터
- [랭킹](${SITE_URL}/ranking): 단백질 밀도, 다이어트, 퍼포먼스 기준 순위(1회 제공량 비교가 가능한 제품만)
- [실시간 인기](${SITE_URL}/trending): 최근 7일 조회 기반 인기 제품
- [제품 비교](${SITE_URL}/compare): 제품 2~3개를 나란히 비교
- [맞춤 추천](${SITE_URL}/recommend): 목적별 추천
- [가이드](${SITE_URL}/guides): 단백질 기초, 제품 선택·비교, 섭취 전략 가이드
- [MPI 단백질이란? 원재료에 MPI가 표기된 음료 조사](${SITE_URL}/guides/basics/protein-source-types)
- [데이터 수집·검증 방법](${SITE_URL}/methodology)

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
