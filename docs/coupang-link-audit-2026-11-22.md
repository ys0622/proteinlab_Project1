# 쿠팡 파트너스 링크 전수 점검 (2026-11-22)

라이브 제품 페이지 578개를 모두 열어 구매 버튼을 모으고, 버튼마다 /api/out/coupang?debug=1로 딥링크 변환 결과를 기록했다(12:58~13:00, 쿠팡 클릭 없음).

## 결과
- 제품 페이지 578개 모두 200. 구매 버튼 있는 제품 563개, 없는 제품 15개(모두 '현재 쿠팡에서 판매가 확인되지 않습니다' 안내, 의도된 것).
- subId: 563개 모두 proteinlab.
- 딥링크 변환: 캐시 356 · 새로 성공 102 · **'url convert failed'(쿠팡 응답 400) 67** · 원인 불명(HTML 응답) 38.
  - 실패해도 버튼은 원래 링크(단축 링크 또는 /re/AFFSDP)로 보낸다. 다만 단축 링크로 가면 subId가 비고, 쿠팡이 변환을 거부한 상품은 품절·판매 종료·옵션 삭제일 가능성이 높다(추정, 10/31에는 변환 실패 18개가 품절·다른 맛과 거의 겹쳤다).
  - 10/31 변환 실패 18개 → 오늘 67개. 단축 링크(51)와 상품 주소 링크(16)에 고르게 나와 링크 형식 문제가 아니라 상품 쪽 문제로 보인다.
  - 캐시 356개는 25일 안에 변환된 것이라 지금 판매 상태는 모른다.
- 다른 제품이 같은 쿠팡 옵션을 가리킴: 2묶음
  - 뉴케어 올프로틴 41g 초코 350mL ↔ 고소한맛 350mL (itemId 28633543172) — 한쪽은 다른 맛으로 간다.
  - 플라이밀 단백질 쉐이크 브라운 45g ↔ 17곡 미숫가루 대용량 630g (itemId 23428822892).

## 확인 못 한 것과 이유
- 13:00쯤 쿠팡 파트너스 API가 **11/23 12:59까지 차단**됐다('1분당 100회 초과, 총 3회 초과 시 이용 제한, 현재 1회'). 이 점검(2분간 캐시 없는 약 200건)과 같은 시각 K-RamenLab 세션의 링크 점검(약 100건)이 겹쳤다. 계정 공용.
- 그래서 검색 API로 판매·제목 대조는 100개에서 멈췄고(차단 응답), 쿠팡 상품 페이지는 작업용 크롬에 빈 페이지(264자)만 보여 줘 읽지 못했다.
- 다음: 11/23 13:00 이후 아래 105개와 2묶음을 검색 API로 분당 15회 이하로 대조 → 같은 상품이 판매 중이면 링크 교체, 없으면 '판매 확인 안 됨'.
- 교훈: 링크 점검은 동시 호출 금지, 분당 30회 이하로 한다(공용 계정 한도 100/분).

## 변환 거부(url convert failed) 67개
| 분류 | 제품 | slug | 쿠팡 상품 번호 |
|---|---|---|---|
| drink | 셀렉스 프로핏 (모카 초콜릿) 250mL | sellex-profit-mocha-chocolate-250 | 7553257510 |
| drink | 더단백 더단백 워터 프로틴 (복숭아) 250mL | danbaek-water-peach-250 | 8710022731 |
| drink | 셀렉스 프로핏 스포츠 (초콜릿) 330mL | sellex-profit-sports-choco-330 | 8288998337 |
| drink | 셀렉스 프로핏 스포츠 와일드 초코 350mL | sellex-profit-sports-wildchoco-350 | 9481373144 |
| drink | 테이크핏 테이크핏 프로 (납작복숭아맛) 500mL | takefit-pro-flatpeach-500 | 7936837232 |
| drink | 하이뮨 프로틴 밸런스 (식물성 고단백) 190mL | hymune-protein-balance-plant-highprotein-190 | 9323322421 |
| drink | 테이크핏 테이크핏 맥스 (초코맛) 250mL | takefit-max-choco-250 | 7923580560 |
| drink | 테이크핏 테이크핏 맥스 (호박고구마) 250mL | takefit-max-pumpkin-250 | 7923592222 |
| drink | 닥터유 프로 단백질 드링크 (초콜릿) 250mL | dryou-protein-drink-choco-250 | 9536016898 |
| drink | 더단백 더단백 밸런스 (오리지널) 190mL | danbaek-balance-original-190 | 7322095041 |
| drink | 서울우유 프로틴 에너지 (초콜릿) 240mL | seoulmilk-protein-energy-choco-240 | 8590463503 |
| drink | 랩노쉬 프로틴 드링크 (카카오) 350mL | labnosh-protein-cacao-350 | 8464365223 |
| drink | 칼로바이 퍼펙트 파워쉐이크 (딸기맛) 250mL | calobye-perfect-powershake-strawberry-250 | 8004938677 |
| drink | 칼로바이 퍼펙트 파워쉐이크 (초코맛) 250mL | calobye-perfect-powershake-choco-250 | 7645380932 |
| drink | 함소아제약 미니언즈 프로틴액트 (초콜릿) 330mL | hamsoa-minions-proteinact-choco-330 | 9221550660 |
| drink | 하이뮨 마시는 프로틴 밸런스 125mL | hymune-drinking-protein-balance-125 | 7293623577 |
| bar | 닥터유 프로 단백질바 (크런치) 70g | dryou-proteinbar-pro-crunch | 9334616536 |
| bar | 베노프 단백질바 (청키초콜릿) 50g | benof-proteinbar-chunky-choco | 8839977383 |
| bar | 퀘스트 뉴트리션 단백질바 (레몬 케이크) 60g | quest-nutrition-protein-bar-lemon-cake-60 | 9295121509 |
| bar | 포스트 단백질바 50g | post-proteinbar | 8990838579 |
| bar | 하이뮨 액티브바 (넛츠) 50g | hymune-activebar-nuts | 7353621539 |
| bar | 마이프로틴 소프트 단백질바 (레몬 얼그레이) 45g | myprotein-soft-lemon-earlgrey | 9160768937 |
| bar | 마이프로틴 소프트 단백질바 (카라멜 초코) 45g | myprotein-soft-caramel-choco | 9160765332 |
| bar | 마이프로틴 소프트 단백질바 (딸기 요거트) 45g | myprotein-soft-strawberry-yogurt | 9160773423 |
| bar | 단백하니 프로틴바 (피넛버터) 38g | danbaekhani-protein-bar-peanutbutter-38 | 9183196271 |
| bar | 랩노쉬 푸드바 마일드 초코 55g | labnosh-foodbar-mildchoco | 5054893507 |
| bar | 랩노쉬 단백쿠키바 밀크티 35g | labnosh-cookiebar-milktea-35 | 9297198972 |
| bar | 씨알로 식물성단백질바 43g | cralo-plant-proteinbar | 6204369926 |
| bar | 크라운 고단백질초코바 45g | crown-highprotein-chocobar | 1371174605 |
| bar | 켈로그 프로틴 그래놀라바 (고소한맛) 35g | kellogg-protein-granolabar-savory | 6639078957 |
| bar | 하이뮨 프로틴밸런스 단백질바 40g | hymune-protein-balance-bar | 7353621539 |
| bar | 빼바 리얼초콜릿 프로틴바 다크 40g 40g | ppaeba-realchoco-proteinbar-dark-40 | 8584694707 |
| bar | 빼바 리얼초콜릿 프로틴바 화이트 40g 40g | ppaeba-realchoco-proteinbar-white-40 | 8203768424 |
| bar | 빼바 리얼초콜릿 프로틴바 쿠키앤크림 40g 40g | ppaeba-realchoco-proteinbar-cookies-cream-40 | 8584694707 |
| bar | 소이조이 스트로베리 30g 30g | soyjoy-strawberry-30 | 152193161 |
| bar | 그레네이드 카브킬라 프로틴바 (피넛 너터) 60g | grenade-carbkilla-peanut-nutter-60 | 5613757276 |
| shake | 플라이밀 단백질 쉐이크 (고구마) 45g | flymill-proteinshake-goguma-45 | 7589407783 |
| shake | 프로티원 단백질 쉐이크 (딸기맛) 40g | proteone-proteinshake-strawberry-40 | 9609926670 |
| shake | 꼬박꼬밥 단백질 쉐이크 고단저당 (제주 말차) 40g | kkobak-kobab-high-protein-low-sugar-jeju-matcha-40 | 8873700490 |
| shake | 꼬박꼬밥 단백질 쉐이크 고단저당 (흑임자) 40g | kkobak-kobab-high-protein-low-sugar-black-sesame-40 | 8959420216 |
| shake | 잇더핏 단백질 쉐이크 (미숫가루) 40g | itthefit-proteinshake-misugaru-40 | 6847899146 |
| shake | 플라이밀 단백질 쉐이크 (블랙) 45g | flymill-proteinshake-black-45 | 9548820068 |
| shake | 랩노쉬 슬림쉐이크 (딸기쿠키크럼블) 45g | labnosh-slimshake-strawberry-cookie-crumble-45 | 9247005349 |
| shake | 혜인담 뚝딱쉐이크 (서리태) 60g | hyindam-ttukttak-shake-seoritae-60 | 8158575026 |
| shake | 플라이밀 단백질 쉐이크 (피넛버터) 45g | flymill-proteinshake-peanut-butter-45 | 8997072204 |
| shake | 더단백 단백질쉐이크 파우더 (초코) 32g | thedanbaek-proteinshake-powder-choco-32 | 7475936789 |
| shake | 프롬잇 단백질 쉐이크 (곡물흑임자) 45g | fromit-proteinshake-grain-black-sesame-45 | 8493902583 |
| shake | 프롬잇 단백질 쉐이크 (초코) 45g | fromit-proteinshake-choco-45 | 8493916400 |
| shake | 바지오 단백질 쉐이크얌 (곡물) 45g | baggio-shakeyam-grain-45 | 9412344405 |
| shake | 쉐이크베이비 단백질 쉐이크 (말차맛) 45g | shakebaby-proteinshake-matcha-45 | 9003599646 |
| shake | 쉐이크베이비 단백질 쉐이크 (곡물맛) 45g | shakebaby-proteinshake-grain-45 | 9003859424 |
| shake | 딜라이트 프로젝트 단백질 쉐이크 (블루베리요거트) 45g | delight-project-shake-blueberry-yogurt-45 | 9403022440 |
| shake | 한손한끼 Petit 단백질 쉐이크 (딸기) 40g | hansonhankki-petit-shake-strawberry-40 | 8873112152 |
| yogurt | 요플레 요플레 프로틴 드링크 플레인 210mL 210mL | yoplait-protein-plain-210 | 4542348097 |
| yogurt | 요플레 요플레 프로틴 드링크 딸기바나나 210mL 210mL | yoplait-protein-strawberry-banana-210 | 7828219997 |
| yogurt | 요플레 요플레 프로틴 MAX 210mL 210mL | yoplait-protein-max-210 | 7842498830 |
| yogurt | 매일 바이오 매일 바이오 그릭요거트 to go 플레인 120g 120g | maeil-bio-greek-togo-plain-120 | 8312114740 |
| yogurt | 매일 바이오 매일 바이오 그릭요거트 to go 허니 120g 120g | maeil-bio-greek-togo-honey-120 | 8310404657 |
| yogurt | 매일 바이오 매일 바이오 그릭요거트 Drink 바나나 190mL 190mL | maeil-bio-greek-drink-banana-190 | 8713507821 |
| yogurt | YOZM YOZM 그릭요거트 스트로베리 콩포트 130g 130g | yozm-strawberry-compote-130 | 9449131609 |
| yogurt | YOZM YOZM 그릭요거트 애플시나몬 130g 130g | yozm-apple-cinnamon-130 | 8744851239 |
| yogurt | YOZM YOZM 그릭요거트 카페라떼 100g 100g | yozm-cafe-latte-100 | 9155961457 |
| yogurt | YOZM YOZM 오! 그래놀라 저당 그릭요거트 115g 115g | yozm-oh-granola-low-sugar-115 | 9071774255 |
| soymilk | 그레인랩 담백한 무가당 고단백 두유 190mL | graintab-unsweetened-protein-190 | 9726013580 |
| soymilk | 맛있는두유 GT 검은콩깨 190mL | nam-gt-blackbean-sesame-190 | 9698996861 |
| soymilk | 밥스누 쌀눈으로 더 똑똑한 약콩두유 190mL | bobsnu-ssalnun-yakkong-190 | 194633279 |
| soymilk | 베지밀 뼈에좋은 칼슘두유 검은콩·검은깨·검은쌀 190mL | vegemil-calcium-blackbean-sesame-rice-190 | 7611814399 |

## 원인 불명(HTML 응답) 38개
| 분류 | 제품 | slug | 쿠팡 상품 번호 |
|---|---|---|---|
| drink | 뉴케어 올프로틴 식물성단백질 (고소한맛) 250mL | newcare-all-protein-plant-savory-250 | 9413959502 |
| drink | 얼티브 프로틴 (밤맛) 250mL | ultive-protein-chestnut-250 | 8005946804 |
| drink | 하이뮨 프로틴 밸런스 액티브 (더블샷 커피) 250mL | hymune-balance-active-double-shot-coffee-250 | 7675277669 |
| drink | 셀렉스 프로핏 스포츠 (코코넛) 330mL | sellex-profit-sports-coconut-330 | 9197453112 |
| drink | 뉴케어 올프로틴 워터 (사과) 350mL | newcare-olprotein-water-apple-350 | 8888082215 |
| drink | 하이뮨 프로틴 밸런스 액티브 (식물성 단백질) 250mL | hymune-balance-active-plant-protein-250 | 8034447584 |
| drink | 더단백 더단백 드링크 (카라멜) 250mL | danbaek-drink-caramel-250 | 7616812492 |
| drink | 셀렉스 프로틴 락토프리 (오리지널) 190mL | sellex-protein-lactosefree-original-190 | 8725170517 |
| drink | 롯데웰푸드 이지프로틴 저당 (초콜릿) 250mL | pasteur-easyprotein-lowsugar-choco-250 | 7744533886 |
| drink | 랩노쉬 프로틴 드링크 (스트로베리) 350mL | labnosh-protein-strawberry-350 | 9348157119 |
| drink | 마이밀 뉴프로틴 (딥초코) 190mL | mymil-newprotein-deepchoco-190 | 7172666535 |
| drink | 하이뮨 프로틴 밸런스 (흑임자) 190mL | hymune-protein-balance-black-sesame-190 | 7892272743 |
| bar | 퀘스트 뉴트리션 단백질바 (오트밀 초콜릿 칩) 60g | quest-nutrition-protein-bar-oatmeal-chocolate-chip-60 | 7096080662 |
| bar | 프로틴방앗간 하루단백바 (흑임자) 45g | proteinbangatgan-harudanbaekbar-blacksesame | 7418046930 |
| bar | 온단백 프로틴바 (애플크랜베리) 50g | ondanbaek-protein-bar-apple-cranberry-50 | 9004312871 |
| bar | 온단백 프로틴바 (초콜릿퍼지) 50g | ondanbaek-protein-bar-chocolate-fudge-50 | 9004389967 |
| bar | 닥터유 프로 단백질바 한입쏙 (초코 클래식) 24g | dryou-proteinbar-pro-bite-choco-classic | 8745169929 |
| bar | 단백하니 프로틴바 시그니처 31g | danbaekhani-protein-bar-signature-31 | 8802146213 |
| bar | 단백하니 프로틴바 (베리) 30g | danbaekhani-protein-bar-berry-30 | 8802155167 |
| bar | 베어벨즈 프로틴바 (쿠키 앤 크림) 55g | barebells-proteinbar-cookies-cream-55 | 8520980337 |
| shake | 프로티원 단백질 쉐이크 (커피맛) 40g | proteone-proteinshake-coffee-40 | 8230052689 |
| shake | 잇더핏 단백질 쉐이크 (더블초코) 40g | itthefit-proteinshake-double-choco-40 | 7467524918 |
| shake | 잇더핏 단백질 쉐이크 (옥수수) 40g | itthefit-proteinshake-corn-40 | 9129558610 |
| shake | 잇더핏 단백질 쉐이크 (녹차라떼) 40g | itthefit-proteinshake-green-tea-latte-40 | 8260876653 |
| shake | 밀잇 단백질 쉐이크 (멜론맛) 40g | milit-proteinshake-melon-40 | 8538147039 |
| shake | 플라이밀 단백질 쉐이크 (피스타치오) 45g | flymill-proteinshake-pistachio-45 | 8136852218 |
| shake | 프롬잇 단백질 쉐이크 (블루베리그릭요거트) 45g | fromit-proteinshake-blueberry-greek-yogurt-45 | 8493921134 |
| shake | 크런틴 단백질 쉐이크 (오곡놀라) 50g | cruntin-proteinshake-ogoknola-50 | 9195173706 |
| shake | 바지오 단백질 쉐이크얌 (옥수수) 45g | baggio-shakeyam-corn-45 | 9016778021 |
| shake | 매일한끼 단백질 쉐이크 (자색고구마) 40g | maeilhankki-shake-purple-sweet-potato-40 | 9664848928 |
| yogurt | 요플레 요플레 프로틴 블루베리 떠먹는 요구르트 100g 100g | yoplait-protein-blueberry-100 | 1583671851 |
| yogurt | 매일 바이오 매일 바이오 그릭요거트 무가당 플레인 800g 800g | maeil-bio-greek-unsweetened-800 | 7216495213 |
| yogurt | 룩트 룩트 아이슬란딕 요거트 마일드 450g 450g | lookt-icelandic-mild-450 | 6970727970 |
| yogurt | 커클랜드 커클랜드 그릭요거트 플레인 907g 907g | kirkland-greek-plain-907 | 249357928 |
| soymilk | 이롬 고단백 두유 8g 190mL | erom-protein-190 | 4618165668 |
| soymilk | 삼육두유 검은콩&칼슘 파우치 190mL | sahmyook-blackbean-calcium-pouch-190 | 8128605871 |
| soymilk | 매일두유 렌틸콩 저당 190mL | maeil-lentil-lowsugar-190 | 8890159701 |
| soymilk | 베지밀 달콤한 비 190mL | vegemil-sweet-b-190 | 8126806548 |
