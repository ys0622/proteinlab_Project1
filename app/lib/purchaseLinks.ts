/**
 * 구매 링크 URL 생성
 * - 쿠팡: 검색 URL (쿠팡파트너스 링크로 교체 예정)
 * - 네이버: 네이버쇼핑 제품명 검색 결과
 * - 공식몰: 브랜드별 자사몰 URL (없으면 null)
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
  테이크핏: "https://mshopping.namyangi.com/item/list/1002",
  닥터유: "https://dryoumall.com/",
  파스퇴르: "https://www.lottefoodmall.com/?act=main.pasteur",
  하이뮨: "https://foodismall.com/",
  커클랜드: "https://www.costco.co.kr/",
  "퀘스트 뉴트리션": "https://www.questnutrition.com/",
  온단백: "https://on-protein.com/",
  프로틴방앗간: "https://dailyprotein.co.kr/",
  베노프: "https://benope.com/",
  비에스엔: "https://www.bsn.co.kr/",
  포스트: "https://www.postconsumerbrands.com/",
  마이프로틴: "https://www.myprotein.co.kr/",
  롯데웰푸드: "https://www.lottefoodmall.com/",
  올가니카: "https://www.organica.co.kr/",
  켈로그: "https://www.kelloggs.co.kr/",
  // 추가 브랜드
  하루단백바: "https://dailyprotein.co.kr/",
  씨알로: "https://crfood.co.kr/",
  연세유업: "https://www.yonseidairy.com/",
  서울우유: "https://www.na100shop.com/",
  그린비아: "https://www.vegemil.co.kr/greenbia/",
  함소아제약: "https://www.hamsoamall.co.kr/",
  노브랜드: "https://www.nobrand.com/",
};

/** 쿠팡 링크 (proteinlab.kr → 쿠팡파트너스 리다이렉트) */
export function getCoupangSearchUrl(_brand: string, _name: string): string {
  return "https://proteinlab.kr";
}

/** 네이버쇼핑 검색 URL */
export function getNaverSearchUrl(brand: string, name: string): string {
  const query = encodeURIComponent(`${brand} ${name}`);
  return `https://search.shopping.naver.com/search/all?query=${query}`;
}

/** 브랜드 공식몰 URL (없으면 null) */
export function getOfficialMallUrl(brand: string): string | null {
  return BRAND_OFFICIAL_MALL[brand] ?? null;
}
