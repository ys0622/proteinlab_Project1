/**
 * 구매 링크 URL 생성
 * - 쿠팡: 제품명 기반 쿠팡 검색 URL (쿠팡파트너스 개별 링크 등록 전 임시)
 * - 네이버: 네이버쇼핑 제품명 검색 결과
 * - 공식몰: 브랜드별 자사몰 URL (없으면 null → 공식몰 버튼 비활성화)
 */

/** 브랜드별 공식몰 URL (없는 브랜드는 undefined → 공식몰 버튼 흐리게 표시) */
const BRAND_OFFICIAL_MALL: Record<string, string> = {
  더단백: "https://smartstore.naver.com/bingtft",
  랩노쉬: "https://labnosh.com/",
  마이밀: "https://www.wellife.co.kr/",
  뉴케어: "https://www.wellife.co.kr/",
  셀렉스: "https://www.selexmall.com/",
  얼티브: "https://www.cjthemarket.com/",
  오늘단백: "https://harimmall.com/",
  칼로바이: "https://www.calobye.shop/",
  // 테이크핏: 남양유업 공식몰(mshopping.namyangi.com)에서 테이크핏 제품 미노출 확인 — 링크 제거
  닥터유: "https://dryoumall.com/",
  파스퇴르: "https://www.lottefoodmall.com/?act=main.pasteur",
  하이뮨: "https://foodismall.com/",
  커클랜드: "https://www.costco.co.kr/",
  // 퀘스트 뉴트리션: questnutrition.com 미국 전용 사이트 — 한국 구매 불가, 링크 제거
  온단백: "https://on-protein.com/",
  프로틴방앗간: "https://dailyprotein.co.kr/",
  하루단백바: "https://dailyprotein.co.kr/",
  베노프: "https://benope.com/",
  비에스엔: "https://www.bsn.co.kr/",
  // 포스트: postconsumerbrands.com 미국 기업 사이트 — 한국 구매 불가, 링크 제거
  마이프로틴: "https://www.myprotein.co.kr/",
  롯데웰푸드: "https://www.lottefoodmall.com/",
  올가니카: "https://www.organica.co.kr/",
  켈로그: "https://www.kelloggs.co.kr/",
  씨알로: "https://crfood.co.kr/",
  연세유업: "https://www.yonseidairy.com/",
  서울우유: "https://www.na100shop.com/",
  그린비아: "https://www.vegemil.co.kr/greenbia/",
  함소아제약: "https://www.hamsoamall.co.kr/",
  // 노브랜드: nobrand.com SSL 오류 → 이마트몰(emart.ssg.com)로 교체
  노브랜드: "https://emart.ssg.com/",
};

/** 쿠팡 파트너스 검색 URL (제품명 기반 검색 결과 페이지) */
export function getCoupangSearchUrl(brand: string, name: string): string {
  const searchName = name.startsWith(brand) ? name : `${brand} ${name}`;
  const query = encodeURIComponent(searchName);
  return `https://link.coupang.com/a/d0NVuv?subId=proteinlab&q=${query}`;
}

/** 네이버쇼핑 검색 URL */
export function getNaverSearchUrl(brand: string, name: string): string {
  // 제품명에 브랜드명이 이미 포함된 경우 중복 방지 (예: "더단백 더단백 드링크")
  const searchName = name.startsWith(brand) ? name : `${brand} ${name}`;
  const query = encodeURIComponent(searchName);
  return `https://search.shopping.naver.com/search/all?query=${query}`;
}

/** 브랜드 공식몰 URL (없으면 null) */
export function getOfficialMallUrl(brand: string): string | null {
  return BRAND_OFFICIAL_MALL[brand] ?? null;
}
