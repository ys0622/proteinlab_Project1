# 구매 링크 진단 보고서

## 요약

| 항목 | 값 |
|------|-----|
| 전체 제품 | 220개 |
| coupangUrl 정상 | 0 (0.0%) |
| coupangUrl 비정상 | 4개 |
| coupangUrl 없음 | 216개 |
| naverUrl | 전체 비정상 (검색결과페이지 동적생성) |
| officialUrl 정상 | 0 (0.0%) |
| officialUrl 비정상 | 218개 |
| officialUrl 없음 | 2개 (브랜드 미등록) |

## 잘못된 링크 유형 리스트

| 유형 | 설명 | 건수 |
|------|------|------|
| 쿠팡: 없음 | productUrl "#" 또는 coupang 미포함 | 216 |
| 쿠팡: lptag/itemId/vendorItemId 없음 | coupang.com/vp/products/숫자 형식 (변환 불가) | 4 |
| 네이버: 검색결과페이지 | getNaverSearchUrl → search.shopping.naver.com/search/all | 220 |
| 공식몰: 메인페이지 | BRAND_OFFICIAL_MALL이 index.do, / 등 | 211 |
| 공식몰: 브랜드 목록 | /m/brand/sangha 등 | 5 |
| 공식몰: 상세 아님 | vegemil.co.kr/greenbia 등 | 2 |
| 공식몰: 없음 | 브랜드 미등록 (노브랜드) | 2 |

## 문제 링크 유형 TOP3

1. **네이버 검색결과페이지 (220개)** - 전체 제품이 `search.shopping.naver.com/search/all?query=...` 사용. 상품 상세가 아님.
2. **공식몰 메인페이지 (211개)** - BRAND_OFFICIAL_MALL 대부분이 홈페이지 루트 또는 index.do
3. **쿠팡 없음 (216개)** - drink/bar 전부, yogurt 대부분에 coupangUrl 미등록

## 카테고리별 상세

### drink (104개)

| slug | 제품명 | coupangUrl | naverUrl | officialUrl |
|------|--------|------------|----------|-------------|
| newcare-all-protein-choco-245 | 뉴케어 올프로틴 (초콜릿) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| newcare-all-protein-banana-245 | 뉴케어 올프로틴 (바나나) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| newcare-all-protein-savory-245 | 뉴케어 올프로틴 (고소한맛) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| newcare-all-protein-plant-savory-250 | 뉴케어 올프로틴 식물성단백질 (고소한맛) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| danbaek-drink-coffee-250 | 더단백 더단백 드링크 (커피) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| sellex-profit-milk-vanilla-250 | 셀렉스 프로핏 (밀크 바닐라) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| sellex-profit-mocha-chocolate-250 | 셀렉스 프로핏 (모카 초콜릿) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| sellex-profit-banana-250 | 셀렉스 프로핏 (바나나) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| danbaek-water-apple-400 | 더단백 더단백 워터 프로틴 (청사과) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| hymune-balance-active-milkshake-deepchoco-250 | 하이뮨 프로틴 밸런스 액티브 (밀크쉐이크) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| danbaek-water-peach-250 | 더단백 더단백 워터 프로틴 (복숭아) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| hymune-balance-active-deepchoco-250 | 하이뮨 프로틴 밸런스 액티브 (딥초코) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| mymil-furotein-choco-250 | 마이밀 퓨로틴 (초코맛) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| mymil-furotein-gosohan-250 | 마이밀 퓨로틴 (고소한맛) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| mymil-furotein-goguma-250 | 마이밀 퓨로틴 (고구마맛) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| ultive-protein-chestnut-250 | 얼티브 프로틴 (맛밤) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| ultive-protein-rice-250 | 얼티브 프로틴 (햇반) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| ultive-protein-pistachio-250 | 얼티브 프로틴 (피스타치오맛) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| ultive-protein-royalmilktea-250 | 얼티브 프로틴 (로얄밀크티향) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| ultive-vegan-protein-banana-250 | 얼티브 비건 프로틴 (바나나맛) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| ultive-vegan-protein-choco-250 | 얼티브 비건 프로틴 (초코맛) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| hymune-balance-active-night-tiramisu-zero-250 | 하이뮨 프로틴 밸런스 액티브 (밤티라미수) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| hymune-balance-active-vanilla-bonbon-zero-250 | 하이뮨 프로틴 밸런스 액티브 (바닐라봉봉) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| hymune-balance-active-double-shot-coffee-250 | 하이뮨 프로틴 밸런스 액티브 (더블샷 커피) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| sellex-profit-whey-protein-americano-330 | 셀렉스 프로틴 웨이프로핏 (아메리카노) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| sellex-profit-strawberry-choco-250 | 셀렉스 프로핏 (딸기초코) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| sellex-profit-sports-choco-330 | 셀렉스 프로핏 웨이프로틴 (초콜릿) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| calobye-sparkling-grape-340 | 칼로바이 프로틴 스파클링 (포도) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| calobye-sparkling-pinkgrapefruit-340 | 칼로바이 프로틴 스파클링 (핑크자몽) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| takefit-pro-lemon-500 | 테이크핏 테이크핏 프로 (레몬맛) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| takefit-pro-flatpeach-500 | 테이크핏 테이크핏 프로 (납작복숭아맛) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| takefit-pro-shinemuscato-500 | 테이크핏 테이크핏 프로 (샤인머스캣맛) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| newcare-olprotein-water-lemon-350 | 뉴케어 올프로틴 워터 (레몬) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| newcare-olprotein-water-apple-350 | 뉴케어 올프로틴 워터 (사과) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| oatmont-protein-savory-250 | 오트몬드 프로틴 (고소한맛) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| oatmont-protein-choco-250 | 오트몬드 프로틴 (초콜릿) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| oatmont-protein-cookiecream-250 | 오트몬드 프로틴 (쿠키앤크림) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| hymune-protein-balance-plant-highprotein-190 | 하이뮨 프로틴 밸런스 (식물성 고단백) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| danbaek-drink-banana-250 | 더단백 더단백 드링크 (바나나) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| danbaek-drink-milktea-250 | 더단백 더단백 드링크 (밀크티) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| danbaek-drink-strawberry-250 | 더단백 더단백 드링크 (딸기) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| takefit-max-goso-250 | 테이크핏 테이크핏 맥스 (고소한맛) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| takefit-max-choco-250 | 테이크핏 테이크핏 맥스 (초코맛) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| takefit-max-banana-250 | 테이크핏 테이크핏 맥스 (바나나) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| takefit-max-pumpkin-250 | 테이크핏 테이크핏 맥스 (호박고구마) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| newcare-all-protein-41g | 뉴케어 올프로틴 41g (초코맛) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| danbaek-drink-chocolate-250 | 더단백 더단백 드링크 (초콜릿) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| 7eleven-junghoo-choco-protein-330 | 세븐일레븐 이정후 프로틴 (초콜릿) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| 7eleven-junghoo-vanilla-protein-330 | 세븐일레븐 이정후 프로틴 (바닐라) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| danbaek-drink-melon-250 | 더단백 더단백 드링크 (멜론) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| danbaek-drink-doublechoco-350 | 더단백 더단백 드링크 (더블초코) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| dryou-protein-drink-choco-250 | 닥터유 프로 단백질 드링크 (초콜릿) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| danbaek-drink-caramel-250 | 더단백 더단백 드링크 (카라멜) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| danbaek-drink-darkchoco-330 | 더단백 더단백 드링크 (다크초코) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| takefit-monster-goso-350 | 테이크핏 테이크핏 몬스터 (고소한맛) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| takefit-monster-chocobanana-350 | 테이크핏 테이크핏 몬스터 (초코바나나) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| sellex-profit-peach-icedtea-330 | 셀렉스 프로틴 웨이프로핏 (복숭아 아이스티) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| greenbia-proteinmeal-active-choco-250 | 그린비아 프로틴밀 액티브 (초콜릿) | 없음 | 비정상(검색결과페이지) | 비정상(상세 아님) |
| greenbia-proteinmeal-active-almond-walnut-250 | 그린비아 프로틴밀 액티브 (아몬드&호두) | 없음 | 비정상(검색결과페이지) | 비정상(상세 아님) |
| sellex-protein-lactosefree-original-190 | 셀렉스 프로틴 락토프리 (오리지널) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| sellex-protein-lowsugar-190 | 셀렉스 프로틴 (로우슈거) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| hymune-balance-active-banana-250 | 하이뮨 프로틴 밸런스 액티브 (바나나) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| dryou-protein-drink-banana-250 | 닥터유 프로 단백질 드링크 (바나나) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| pasteur-easyprotein-lowsugar-choco-250 | 파스퇴르 이지프로틴 저당 (초콜릿) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| solveandgo-protamin-savory-250 | 솔브앤고 프로타민 (고소한맛) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| yonsei-severance-a2-protein-choco-190 | 연세유업 세브란스 A2 프로틴 (초콜릿) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| yonsei-severance-a2-protein-coffee-190 | 연세유업 세브란스 A2 프로틴 (커피) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| dryou-protein-drink-strawberry-250 | 닥터유 프로 단백질 드링크 (딸기) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| dryou-protein-40g-strawberry-350 | 닥터유 프로 단백질 드링크 40g (딸기) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| hymune-balance-active-original-250 | 하이뮨 프로틴 밸런스 액티브 (오리지널) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| seoulmilk-protein-energy-coffee-240 | 서울우유 프로틴 에너지 (커피) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| solveandgo-protamin-choco-250 | 솔브앤고 프로타민 (초코맛) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| hymune-protein-balance-lowsugar-190 | 하이뮨 프로틴 밸런스 (저당) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| dryou-protein-40g-choco-350 | 닥터유 프로 단백질 드링크 40g (초콜릿) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| hymune-balance-active-cookie-cream-250 | 하이뮨 프로틴 밸런스 액티브 (쿠키앤크림) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| labnosh-protein-latte-350 | 랩노쉬 프로틴 드링크 (라떼) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| labnosh-protein-melon-350 | 랩노쉬 프로틴 드링크 (메론) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| hymune-balance-active-strawberry-250 | 하이뮨 프로틴 밸런스 액티브 (딸기) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| seoulmilk-protein-energy-choco-240 | 서울우유 프로틴 에너지 (초콜릿) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| hymune-protein-balance-choco-190 | 하이뮨 프로틴 밸런스 (초콜릿) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| labnosh-protein-cacao-350 | 랩노쉬 프로틴 드링크 (카카오) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| labnosh-protein-strawberry-350 | 랩노쉬 프로틴 드링크 (스트로베리) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| calobye-perfect-powershake-strawberry-250 | 칼로바이 퍼펙트 파워쉐이크 (딸기맛) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| yonsei-severance-a2-protein-original-190 | 연세유업 세브란스 A2 프로틴 (오리지널) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| labnosh-protein-banana-350 | 랩노쉬 프로틴 드링크 (바나나) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| labnosh-protein-cookie-cream-350 | 랩노쉬 프로틴 드링크 (쿠키앤크림) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| labnosh-protein-perfect-grain-350 | 랩노쉬 프로틴 드링크 퍼펙트 (그레인) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| labnosh-protein-perfect-choco-350 | 랩노쉬 프로틴 드링크 퍼펙트 (초코) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| labnosh-protein-perfect-banana-350 | 랩노쉬 프로틴 드링크 퍼펙트 (바나나) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| calobye-perfect-powershake-choco-250 | 칼로바이 퍼펙트 파워쉐이크 (초코맛) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| hamsoa-minions-proteinact-choco-330 | 함소아제약 미니언즈 프로틴액트 (초콜릿) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| mymil-newprotein-original-190 | 마이밀 뉴프로틴 (오리지널) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| mymil-newprotein-deepchoco-190 | 마이밀 뉴프로틴 (딥초코) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| mymil-newprotein-goatmilk-190 | 마이밀 뉴프로틴 (산양유) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| hymune-protein-balance-190 | 하이뮨 프로틴 밸런스 (오리지널) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| pasteur-easyprotein-cereal-250 | 파스퇴르 이지프로틴 (시리얼) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| hymune-protein-balance-black-sesame-190 | 하이뮨 프로틴 밸런스 (흑임자) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| sellex-protein-original-190 | 셀렉스 프로틴 (오리지널) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| hymune-protein-balance-plus-190 | 하이뮨 프로틴 밸런스 (플러스) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| danbaek-water-grapefruit-400 | 더단백 더단백 워터 프로틴 (백자몽) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| mymil-newprotein-banana-190 | 마이밀 뉴프로틴 (바나나) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| oneuldanbaek-caramel-latte-250 | 오늘단백 오늘단백 (카라멜라떼) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| oneuldanbaek-choco-latte-250 | 오늘단백 오늘단백 (초코라떼) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| oneuldanbaek-dolce-latte-250 | 오늘단백 오늘단백 (돌체라떼) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |

### bar (71개)

| slug | 제품명 | coupangUrl | naverUrl | officialUrl |
|------|--------|------------|----------|-------------|
| dryou-proteinbar-pro-3nuts-crunch | 닥터유 프로 단백질바 (3넛츠 크런치) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| dryou-proteinbar-pro-choco-classic | 닥터유 프로 단백질바 (초코 클래식) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| dryou-proteinbar-pro-crunch | 닥터유 프로 단백질바 (크런치) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| kirkland-proteinbar-choco-brownie | 커클랜드 프로틴바 초콜릿 브라우니 | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| kirkland-proteinbar-choco-chip-cookie-dough-60 | 커클랜드 프로틴바 초코칩 쿠키도우 | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| benof-proteinbar-chunky-choco | 베노프 단백질바 (청키초콜릿) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| benof-proteinbar-truffle-peanutbutter-choco | 베노프 단백질바 (트러플피넛버터초콜릿) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| benof-softbar-peanutbutter | 베노프 소프트바 (피넛버터) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| benof-softbar-cookie-cream | 베노프 소프트바 (쿠키앤크림) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| benof-softbar-chocolate-caramel | 베노프 소프트바 (초콜릿카라멜) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| benof-softbar-cacao | 베노프 소프트바 (카카오) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| benof-softbar-black-sesame | 베노프 소프트바 (흑임자) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| benof-softbar-injeolmi | 베노프 소프트바 (인절미) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| benof-softbar-roasted-sweetpotato | 베노프 소프트바 (군고구마) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| benof-softbar-berry-cheesecake | 베노프 소프트바 (베리베리치즈케이크) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| syntha6-crispy-choco | 비에스엔 프로틴 키리스프 단백질바 (초콜... | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| bsn-protein-crisp-peanut-butter-crunch | 비에스엔 프로틴 키리스프 단백질바 (피넛... | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| bsn-protein-crisp-salted-toffee-pretzel | 비에스엔 프로틴 키리스프 단백질바 (솔티... | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| quest-nutrition-protein-bar-double-chocolate-chunk-60 | 퀘스트 뉴트리션 단백질바 (더블 초콜릿 청크) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| quest-nutrition-protein-bar-chocolate-peanutbutter-60 | 퀘스트 뉴트리션 단백질바 (초콜릿 피넛버터) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| quest-nutrition-protein-bar-oatmeal-chocolate-chip-60 | 퀘스트 뉴트리션 단백질바 (오트밀 초콜릿 칩) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| quest-nutrition-protein-bar-deep-chocolate-chip-cookie-dough-60 | 퀘스트 뉴트리션 단백질바 (딥 초콜릿칩 ... | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| quest-nutrition-protein-bar-lemon-cake-60 | 퀘스트 뉴트리션 단백질바 (레몬 케이크) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| quest-nutrition-protein-bar-mint-chocolate-chunk-60 | 퀘스트 뉴트리션 단백질바 (민트 초콜릿 청크) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| quest-nutrition-protein-bar-cookie-cream-60 | 퀘스트 뉴트리션 단백질바 (쿠키 앤 크림) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| quest-nutrition-protein-bar-chocolate-chip-cookie-dough-60 | 퀘스트 뉴트리션 단백질바 (초코칩 쿠키도우) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| quest-nutrition-protein-bar-blueberry-muffin-60 | 퀘스트 뉴트리션 단백질바 (블루베리 머핀) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| quest-nutrition-protein-bar-white-chocolate-raspberry-60 | 퀘스트 뉴트리션 단백질바 (화이트 초콜릿... | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| quest-nutrition-protein-bar-deep-dish-cookie-cream-60 | 퀘스트 뉴트리션 단백질바 (딥디쉬 쿠키 ... | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| quest-nutrition-protein-bar-smores-60 | 퀘스트 뉴트리션 단백질바 (스모어) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| post-proteinbar | 포스트 단백질바 | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| proteinbangatgan-harudanbaekbar-blacksesame | 프로틴방앗간 하루단백바 (흑임자) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| ondanbaek-protein-bar-apple-cranberry-50 | 온단백 프로틴바 (애플크랜베리) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| ondanbaek-protein-bar-chocolate-fudge-50 | 온단백 프로틴바 (초콜릿퍼지) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| proteinbangatgan-harudanbaekbar-cheeseberry | 프로틴방앗간 하루단백바 (치즈베리) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| himnaego-protein-bar-dark-chocolate-50 | 힘내고 단백질바 (다크 초콜릿) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| nobrand-proteinbar-choco | 노브랜드 단백질바 초코 | 없음 | 비정상(검색결과페이지) | 없음 |
| thedanbaek-crunchbar-choco | 더단백 크런치바 (초코) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| selex-proteinbar-berryoat | 셀렉스 프로틴바 베리오트 | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| thedanbaek-crunchbar-peanutbutter | 더단백 크런치바 (피넛버터) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| thedanbaek-mildbar-almondcookie | 더단백 마일드바 (아몬드쿠키) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| hymune-activebar-nuts | 하이뮨 액티브바 (넛츠) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| mymil-new-proteinbar | 마이밀 뉴프로틴바 | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| myprotein-soft-lemon-earlgrey | 마이프로틴 소프트 단백질 (레몬 얼그레이) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| myprotein-soft-caramel-choco | 마이프로틴 소프트 단백질 (카라멜 초코) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| myprotein-soft-strawberry-yogurt | 마이프로틴 소프트 단백질 (딸기 요거트) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| proteinbangatgan-harudanbaekbar-jetchococake | 프로틴방앗간 하루단백바 (제트초코케이크) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| dryou-proteinbar-bite-crunch | 닥터유 프로 단백질바 한입쏙 (크런치) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| dryou-proteinbar-nuts | 닥터유 단백질바 (견과) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| dryou-proteinbar-pro-bite-choco-classic | 닥터유 프로 단백질바 한입쏙 (초코 클래식) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| danbaekhani-protein-bar-choco-38 | 단백하니 프로틴바 (초코) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| danbaekhani-protein-bar-signature-31 | 단백하니 프로틴바 시그니처 | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| danbaekhani-protein-bar-berry-30 | 단백하니 프로틴바 (베리) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| danbaekhani-protein-bar-peanutbutter-38 | 단백하니 프로틴바 (피넛버터) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| danbaekhani-protein-bar-matcha-choco-38 | 단백하니 프로틴바 (말차초코) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| labnosh-foodbar-mildchoco | 랩노쉬 푸드바 마일드 초코 | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| cralo-plant-proteinbar | 씨알로 식물성단백질바 | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| crown-highprotein-chocobar | 크라운 고단백질초코바 | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| calobye-daily-nuts-proteinbar | 칼로바이 하루견과 단백질바 | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| organica-ola-chewy-protein-bar-berry-almond-35 | 올가니카 올라 츄이프로틴바 (베리아몬드) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| kellogg-protein-granolabar-savory | 켈로그 프로틴 그래놀라바 (고소한맛) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| kellogg-proteinbark-nuts | 켈로그 프로틴바K (견과) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| kellogg-proteinbark-caramel-nuts | 켈로그 프로틴바K (카라멜&넛) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| kellogg-proteinbark-hazelnut-darkchoco | 켈로그 프로틴바K (헤이즐넛&다크초코) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| dryou-proteinbar-mini-nuts | 닥터유 단백질바 미니 (견과) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| organica-ola-chewy-protein-bar-peanut-cacao-35 | 올가니카 올라 츄이프로틴바 (피넛카카오) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| post-proteinbar-mini | 포스트 단백질바 미니 | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| gomgom-proteinbar-mini | 곰곰 단백질바 미니 | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| nobrand-proteinbar-mini | 노브랜드 단백질바 미니 | 없음 | 비정상(검색결과페이지) | 없음 |
| lottewellfood-easyprotein-highprotein-crispy | 롯데웰푸드 이지프로틴 고단백질바 (크리스피) | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| lottewellfood-easyprotein-energy-bar | 롯데웰푸드 이지프로틴 에너지단백질바 | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |

### yogurt (45개)

| slug | 제품명 | coupangUrl | naverUrl | officialUrl |
|------|--------|------------|----------|-------------|
| yopro-plain-150 | 요프로 요프로 프로틴 설탕무첨가 플레인 ... | 비정상(lptag/itemId/vendorItemId 없음) | 비정상(검색결과페이지) | 비정상(메인페이지) |
| yopro-blueberry-150 | 요프로 요프로 프로틴 블루베리 요거트 150g | 비정상(lptag/itemId/vendorItemId 없음) | 비정상(검색결과페이지) | 비정상(메인페이지) |
| yoplait-protein-blueberry-100 | 요플레 요플레 프로틴 블루베리 떠먹는 요... | 비정상(lptag/itemId/vendorItemId 없음) | 비정상(검색결과페이지) | 비정상(메인페이지) |
| yoplait-protein-plain-210 | 요플레 요플레 프로틴 드링크 플레인 210mL | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| yoplait-protein-strawberry-banana-210 | 요플레 요플레 프로틴 드링크 딸기바나나 ... | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| yoplait-protein-max-210 | 요플레 요플레 프로틴 MAX 210mL | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| who-greek-plain-80 | 후디스 후디스 그릭요거트 플레인 80g | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| who-greek-plain-450 | 후디스 후디스 그릭요거트 플레인 450g | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| maeil-bio-greek-unsweetened-150 | 매일 바이오 매일 바이오 그릭요거트 무가... | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| sangha-organic-greek-unsweetened-80 | 상하목장 상하목장 유기농 그릭요거트 무가... | 없음 | 비정상(검색결과페이지) | 비정상(브랜드 목록) |
| pulmuone-dannon-greek-unsweetened-90 | 풀무원다논 풀무원다논 그릭요거트 무가당 ... | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| yoplait-protein-plain-100 | 요플레 요플레 프로틴 플레인 떠먹는 요구... | 비정상(lptag/itemId/vendorItemId 없음) | 비정상(검색결과페이지) | 비정상(메인페이지) |
| sangha-organic-greek-plain-80 | 상하목장 상하목장 유기농 그릭요거트 플레... | 없음 | 비정상(검색결과페이지) | 비정상(브랜드 목록) |
| sangha-organic-greek-unsweetened-400 | 상하목장 상하목장 유기농 그릭요거트 무가... | 없음 | 비정상(검색결과페이지) | 비정상(브랜드 목록) |
| who-highprotein-greek-unsweetened-400 | 후디스 후디스 고단백 무가당 그릭요거트 ... | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| yozm-plain-greek-450 | YOZM YOZM 플레인 그릭요거트 450g | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| yozm-plain-greek-800 | YOZM YOZM 플레인 그릭요거트 800g | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| yozm-soft-plain-500 | YOZM YOZM 소프트 플레인 500g | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| greekday-light-100 | 그릭데이 그릭데이 그릭요거트 라이트 100g | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| greekday-light-450 | 그릭데이 그릭데이 그릭요거트 라이트 450g | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| greekday-light-800 | 그릭데이 그릭데이 그릭요거트 라이트 800g | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| greekday-signature-100 | 그릭데이 그릭데이 그릭요거트 시그니처 100g | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| greekday-signature-450 | 그릭데이 그릭데이 그릭요거트 시그니처 450g | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| greekday-signature-800 | 그릭데이 그릭데이 그릭요거트 시그니처 800g | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| greekday-signature-yuja-100 | 그릭데이 그릭데이 시그니처 유자 100g | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| maeil-bio-greek-unsweetened-400 | 매일 바이오 매일 바이오 그릭요거트 무가... | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| maeil-bio-greek-unsweetened-80 | 매일 바이오 매일 바이오 그릭요거트 무가... | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| maeil-bio-greek-unsweetened-800 | 매일 바이오 매일 바이오 그릭요거트 무가... | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| maeil-bio-greek-plain-150 | 매일 바이오 매일 바이오 그릭요거트 플레... | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| maeil-bio-greek-plain-400 | 매일 바이오 매일 바이오 그릭요거트 플레... | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| maeil-bio-greek-delight-banana-80 | 매일 바이오 매일 바이오 그릭요거트 De... | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| maeil-bio-greek-togo-plain-120 | 매일 바이오 매일 바이오 그릭요거트 to... | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| maeil-bio-greek-togo-honey-120 | 매일 바이오 매일 바이오 그릭요거트 to... | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| maeil-bio-greek-drink-plain-190 | 매일 바이오 매일 바이오 그릭요거트 Dr... | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| maeil-bio-greek-drink-banana-190 | 매일 바이오 매일 바이오 그릭요거트 Dr... | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| maeil-bio-greek-drink-unsweetened-710 | 매일 바이오 매일 바이오 그릭요거트 Dr... | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| maeil-bio-greek-drink-plain-710 | 매일 바이오 매일 바이오 그릭요거트 Dr... | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| maeil-bio-greek-drink-banana-710 | 매일 바이오 매일 바이오 그릭요거트 Dr... | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| sangha-organic-greek-apple-kale-120 | 상하목장 상하목장 유기농 그릭요거트 사과... | 없음 | 비정상(검색결과페이지) | 비정상(브랜드 목록) |
| sangha-organic-greek-blueberry-kale-120 | 상하목장 상하목장 유기농 그릭요거트 블루... | 없음 | 비정상(검색결과페이지) | 비정상(브랜드 목록) |
| who-organic-greek-unsweetened-450 | 후디스 후디스 유기농 그릭요거트 달지않은... | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| lookt-icelandic-mild-100 | 룩트 룩트 아이슬란딕 요거트 마일드 100g | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| lookt-icelandic-thick-100 | 룩트 룩트 아이슬란딕 요거트 띠크 100g | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| lookt-icelandic-mild-450 | 룩트 룩트 아이슬란딕 요거트 마일드 450g | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |
| lookt-icelandic-thick-450 | 룩트 룩트 아이슬란딕 요거트 띠크 450g | 없음 | 비정상(검색결과페이지) | 비정상(메인페이지) |

## 전체 통계

- 전체 제품: 220개
- coupangUrl 정상: 0 (0.0%)
- coupangUrl 비정상: 4
- coupangUrl 없음: 216
- naverUrl: 전체 비정상 (검색결과페이지 동적생성)
- officialUrl 정상: 0 (0.0%)
- officialUrl 비정상: 218
- officialUrl 없음: 2 (브랜드 미등록)

## 문제 링크 유형 TOP3

1. 네이버: 검색결과페이지(전체): 220개
2. 공식몰: 비정상(메인페이지): 211개
3. 공식몰: 비정상(브랜드 목록): 5개
4. 쿠팡: 비정상(lptag/itemId/vendorItemId 없음): 4개
5. 공식몰: 비정상(상세 아님): 2개
