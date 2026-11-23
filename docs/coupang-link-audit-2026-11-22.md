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

## 11/23 후속 정리 (차단 해제 뒤, 14:22~14:50)
- 쿠팡 API: 검색 100회 + 딥링크 약 60회를 한 번에 1건씩 4.5초 간격(분당 13회 이하)으로 불렀다. 403·사용 횟수 초과 없음. 시작 전 K-RamenLab 세션에 시간대를 알렸다.
- 원인 불명 38개는 대부분 판매 중이었다(검색 API에 같은 상품 번호가 나옴). HTML 응답은 판매 중인 상품에서도 나와서 차단 신호가 아니라 상품별 응답 차이로 보인다(추정). 이때 버튼은 subId=proteinlab 파트너스 링크(/re/AFFSDP)로 간다.
- 주의: 제품 페이지의 첫 /api/out/coupang 링크는 관련 제품 버튼일 수 있다. 점검은 `slug=<그 제품>`이 붙은 버튼으로 해야 한다(처음에 잘못 집어 다시 했다).
- **같은 제품이 다른 상품 번호로 판매 중인 25개는 링크를 바꿨다**(제품명·맛·용량이 맞는 것만, 묶음 수량 차이는 허용, 다른 맛이 섞인 세트는 제외). 새 링크는 변환 성공 16, HTML 응답 9(파트너스 폴백).

| slug | 이전 상품 번호 | 새 상품 번호 | 쿠팡 상품명 |
|---|---|---|---|
| danbaek-water-peach-250 | 8710022731 | 8646782495 | 더단백 워터 프로틴 복숭아 250ml |
| sellex-profit-sports-wildchoco-350 | 9481373144 | 9678482395 | 셀렉스 프로핏 스포츠 와일드 초코 |
| takefit-pro-flatpeach-500 | 7936837232 | 7944540385 | [로켓프레시] 남양유업 테이크핏 프로 납작복숭아맛 |
| takefit-max-pumpkin-250 | 7923592222 | 8527808871 | 테이크핏 맥스 호박고구마맛 남양 |
| dryou-protein-drink-choco-250 | 9536016898 | 6612465223 | 닥터유 단백질 프로 초코 250ml 24개 |
| seoulmilk-protein-energy-choco-240 | 8590463503 | 9772670052 | 서울우유 프로틴 에너지 초코 240ML x 10 아이스박스포장 /코스트코 |
| hymune-drinking-protein-balance-125 | 7293623577 | 9808367993 | 후디스 하이뮨 마시는 프로틴 밸런스 125ml 12개 |
| dryou-proteinbar-pro-crunch | 9334616536 | 7537130432 | 오리온 닥터유 프로 단백질바 크런치 |
| quest-nutrition-protein-bar-lemon-cake-60 | 9295121509 | 9737130517 | 퀘스트 뉴트리션, 프로틴바, 레몬 케이크, 바 4개, 개당 60g(2.12oz) QST-0 |
| post-proteinbar | 8990838579 | 7563811408 | 동서 포스트 단백질바 50g |
| grenade-carbkilla-peanut-nutter-60 | 5613757276 | 9769919927 | 그레네이드 카브 킬라 단백질바 피넛 너터 60g 12개입 |
| flymill-proteinshake-peanut-butter-45 | 8997072204 | 9677681774 | 플라이밀리얼초코 플라이밀 단백질 쉐이크 파우치, 45g, 7개 (피넛버터) |
| hyindam-ttukttak-shake-seoritae-60 | 8158575026 | 9574263770 | 혜인담 뚝딱쉐이크 [서리태] /다이어트식단 체중조절 단백질 식사대용건강한끼 |
| delight-project-shake-blueberry-yogurt-45 | 9403022440 | 9826050820 | 딜라이트프로젝트 단백질 쉐이크 블루베리요거트 |
| maeil-bio-greek-togo-plain-120 | 8312114740 | 8310404719 | 매일바이오 그릭요거트 투고 플레인 120g 6개입/냉장무배 |
| maeil-bio-greek-drink-banana-190 | 8713507821 | 8700604294 | 매일 바이오 그릭요거트 드링크 바나나 |
| graintab-unsweetened-protein-190 | 9726013580 | 9620604823 | 그레인랩 담백한 무가당 고단백 두유, 24개, 190ml |
| nam-gt-blackbean-sesame-190 | 9698996861 | 9743418340 | 남양 맛있는두유GT 검은콩깨 190mlx24팩 |
| bobsnu-ssalnun-yakkong-190 | 194633279 | 9827678358 | 서울대 밥스누 쌀눈으로 더 똑똑한! 약콩100 1BOX (190ml, 총 16팩) |
| vegemil-calcium-blackbean-sesame-rice-190 | 7611814399 | 9830846466 | 베지밀 뼈에좋은 칼슘두유 검은콩 깨 쌀 |
| baggio-shakeyam-corn-45 | 9016778021 | 9680357045 | 바지오 단백질 쉐이크얌 옥수수 |
| newcare-all-protein-plant-savory-250 | 9413959502 | 9662804308 | 뉴케어올프로틴 식물성단백질 고소한맛 |
| milit-proteinshake-melon-40 | 8538147039 | 9738148469 | 밀잇 식단관리 단백질 쉐이크 멜론맛 포켓형 |
| itthefit-proteinshake-double-choco-40 | 7467524918 | 9740777415 | 델리스푼 잇더핏 더블초코맛 단백질 프로틴 쉐이크 |
| yoplait-protein-strawberry-banana-210 | 7828219997 | 6063696769 | 요플레 프로틴 딸기바나나 |

- **남은 57개**: 변환 거부이고 검색에서도 같은 제품(같은 맛 단품)을 못 찾았다. 품절·판매 종료 가능성이 높다(추정). 같은 날 쿠팡 검색 결과 파트너스 링크로 바꿨다(아래 표).

| 분류 | 제품 | slug |
|---|---|---|
| drink | 셀렉스 프로핏 (모카 초콜릿) 250mL | sellex-profit-mocha-chocolate-250 |
| drink | 셀렉스 프로핏 스포츠 (초콜릿) 330mL | sellex-profit-sports-choco-330 |
| drink | 하이뮨 프로틴 밸런스 (식물성 고단백) 190mL | hymune-protein-balance-plant-highprotein-190 |
| drink | 테이크핏 테이크핏 맥스 (초코맛) 250mL | takefit-max-choco-250 |
| drink | 더단백 더단백 밸런스 (오리지널) 190mL | danbaek-balance-original-190 |
| drink | 랩노쉬 프로틴 드링크 (카카오) 350mL | labnosh-protein-cacao-350 |
| drink | 칼로바이 퍼펙트 파워쉐이크 (딸기맛) 250mL | calobye-perfect-powershake-strawberry-250 |
| drink | 칼로바이 퍼펙트 파워쉐이크 (초코맛) 250mL | calobye-perfect-powershake-choco-250 |
| drink | 함소아제약 미니언즈 프로틴액트 (초콜릿) 330mL | hamsoa-minions-proteinact-choco-330 |
| bar | 베노프 단백질바 (청키초콜릿) 50g | benof-proteinbar-chunky-choco |
| bar | 하이뮨 액티브바 (넛츠) 50g | hymune-activebar-nuts |
| bar | 마이프로틴 소프트 단백질바 (레몬 얼그레이) 45g | myprotein-soft-lemon-earlgrey |
| bar | 마이프로틴 소프트 단백질바 (카라멜 초코) 45g | myprotein-soft-caramel-choco |
| bar | 마이프로틴 소프트 단백질바 (딸기 요거트) 45g | myprotein-soft-strawberry-yogurt |
| bar | 단백하니 프로틴바 (피넛버터) 38g | danbaekhani-protein-bar-peanutbutter-38 |
| bar | 랩노쉬 푸드바 마일드 초코 55g | labnosh-foodbar-mildchoco |
| bar | 랩노쉬 단백쿠키바 밀크티 35g | labnosh-cookiebar-milktea-35 |
| bar | 씨알로 식물성단백질바 43g | cralo-plant-proteinbar |
| bar | 크라운 고단백질초코바 45g | crown-highprotein-chocobar |
| bar | 켈로그 프로틴 그래놀라바 (고소한맛) 35g | kellogg-protein-granolabar-savory |
| bar | 하이뮨 프로틴밸런스 단백질바 40g | hymune-protein-balance-bar |
| bar | 빼바 리얼초콜릿 프로틴바 다크 40g 40g | ppaeba-realchoco-proteinbar-dark-40 |
| bar | 빼바 리얼초콜릿 프로틴바 화이트 40g 40g | ppaeba-realchoco-proteinbar-white-40 |
| bar | 빼바 리얼초콜릿 프로틴바 쿠키앤크림 40g 40g | ppaeba-realchoco-proteinbar-cookies-cream-40 |
| bar | 소이조이 스트로베리 30g 30g | soyjoy-strawberry-30 |
| shake | 플라이밀 단백질 쉐이크 (고구마) 45g | flymill-proteinshake-goguma-45 |
| shake | 프로티원 단백질 쉐이크 (딸기맛) 40g | proteone-proteinshake-strawberry-40 |
| shake | 꼬박꼬밥 단백질 쉐이크 고단저당 (제주 말차) 40g | kkobak-kobab-high-protein-low-sugar-jeju-matcha-40 |
| shake | 꼬박꼬밥 단백질 쉐이크 고단저당 (흑임자) 40g | kkobak-kobab-high-protein-low-sugar-black-sesame-40 |
| shake | 잇더핏 단백질 쉐이크 (미숫가루) 40g | itthefit-proteinshake-misugaru-40 |
| shake | 플라이밀 단백질 쉐이크 (블랙) 45g | flymill-proteinshake-black-45 |
| shake | 랩노쉬 슬림쉐이크 (딸기쿠키크럼블) 45g | labnosh-slimshake-strawberry-cookie-crumble-45 |
| shake | 더단백 단백질쉐이크 파우더 (초코) 32g | thedanbaek-proteinshake-powder-choco-32 |
| shake | 프롬잇 단백질 쉐이크 (곡물흑임자) 45g | fromit-proteinshake-grain-black-sesame-45 |
| shake | 프롬잇 단백질 쉐이크 (초코) 45g | fromit-proteinshake-choco-45 |
| shake | 바지오 단백질 쉐이크얌 (곡물) 45g | baggio-shakeyam-grain-45 |
| shake | 쉐이크베이비 단백질 쉐이크 (말차맛) 45g | shakebaby-proteinshake-matcha-45 |
| shake | 쉐이크베이비 단백질 쉐이크 (곡물맛) 45g | shakebaby-proteinshake-grain-45 |
| shake | 한손한끼 Petit 단백질 쉐이크 (딸기) 40g | hansonhankki-petit-shake-strawberry-40 |
| yogurt | 요플레 요플레 프로틴 드링크 플레인 210mL 210mL | yoplait-protein-plain-210 |
| yogurt | 요플레 요플레 프로틴 MAX 210mL 210mL | yoplait-protein-max-210 |
| yogurt | 매일 바이오 매일 바이오 그릭요거트 to go 허니 120g 120g | maeil-bio-greek-togo-honey-120 |
| yogurt | YOZM YOZM 그릭요거트 스트로베리 콩포트 130g 130g | yozm-strawberry-compote-130 |
| yogurt | YOZM YOZM 그릭요거트 애플시나몬 130g 130g | yozm-apple-cinnamon-130 |
| yogurt | YOZM YOZM 그릭요거트 카페라떼 100g 100g | yozm-cafe-latte-100 |
| yogurt | YOZM YOZM 오! 그래놀라 저당 그릭요거트 115g 115g | yozm-oh-granola-low-sugar-115 |
| drink | 더단백 더단백 드링크 (카라멜) 250mL | danbaek-drink-caramel-250 |
| drink | 하이뮨 프로틴 밸런스 (흑임자) 190mL | hymune-protein-balance-black-sesame-190 |
| bar | 온단백 프로틴바 (애플크랜베리) 50g | ondanbaek-protein-bar-apple-cranberry-50 |
| bar | 온단백 프로틴바 (초콜릿퍼지) 50g | ondanbaek-protein-bar-chocolate-fudge-50 |
| bar | 단백하니 프로틴바 (베리) 30g | danbaekhani-protein-bar-berry-30 |
| shake | 프로티원 단백질 쉐이크 (커피맛) 40g | proteone-proteinshake-coffee-40 |
| shake | 잇더핏 단백질 쉐이크 (옥수수) 40g | itthefit-proteinshake-corn-40 |
| shake | 잇더핏 단백질 쉐이크 (녹차라떼) 40g | itthefit-proteinshake-green-tea-latte-40 |
| shake | 플라이밀 단백질 쉐이크 (피스타치오) 45g | flymill-proteinshake-pistachio-45 |
| shake | 프롬잇 단백질 쉐이크 (블루베리그릭요거트) 45g | fromit-proteinshake-blueberry-greek-yogurt-45 |
| yogurt | 요플레 요플레 프로틴 블루베리 떠먹는 요구르트 100g 100g | yoplait-protein-blueberry-100 |

### 남은 57개 → 쿠팡 검색 결과 파트너스 링크로 교체 (11/22 Scott 결정, 11/23 15시)
- 위 57개는 제품명 검색 결과 페이지의 파트너스 단축 링크로 바꿨다(딥링크 API 57회, 4.5초 간격, 오류 없음). 이동 주소는 `link.coupang.com/re/AFFSRP?lptag=AF2667911&subid=proteinlab&pageKey=<검색어>`라 subId가 붙는다.
- 되돌릴 때는 아래 '이전 링크'를 쓴다. 같은 제품이 다시 판매되면 상품 링크로 바꾼다.

| slug | 검색어 | 새 링크 | 이전 링크 |
|---|---|---|---|
| sellex-profit-mocha-chocolate-250 | 셀렉스 프로핏 모카 초콜릿 250mL | https://link.coupang.com/a/iUgGLMDryu | https://link.coupang.com/a/e8MRZ5k8bY |
| sellex-profit-sports-choco-330 | 셀렉스 프로핏 스포츠 초콜릿 330mL | https://link.coupang.com/a/iUgIa3YQyO | https://link.coupang.com/a/e8NeaakAQ8 |
| hymune-protein-balance-plant-highprotein-190 | 하이뮨 프로틴 밸런스 식물성 고단백 190mL | https://link.coupang.com/a/iUgIxNDct2 | https://link.coupang.com/a/e8NrCG2wiO |
| takefit-max-choco-250 | 테이크핏 맥스 초코맛 250mL | https://link.coupang.com/a/iUgIUn9aY8 | https://link.coupang.com/a/e8Nv18aYQS |
| danbaek-balance-original-190 | 더단백 밸런스 오리지널 190mL | https://link.coupang.com/a/iUgJgXewpw | https://link.coupang.com/a/e8NJCn0h5M |
| labnosh-protein-cacao-350 | 랩노쉬 프로틴 드링크 카카오 350mL | https://link.coupang.com/a/iUgJDlGYwu | https://link.coupang.com/a/e8N9r5TH4K |
| calobye-perfect-powershake-strawberry-250 | 칼로바이 퍼펙트 파워쉐이크 딸기맛 250mL | https://link.coupang.com/a/iUgJZynvno | https://link.coupang.com/a/e8ObH2oJwq |
| calobye-perfect-powershake-choco-250 | 칼로바이 퍼펙트 파워쉐이크 초코맛 250mL | https://link.coupang.com/a/iUgKlZZTTU | https://link.coupang.com/a/e8Of4ixslg |
| hamsoa-minions-proteinact-choco-330 | 함소아제약 미니언즈 프로틴액트 초콜릿 330mL | https://link.coupang.com/a/iUgKIBWJky | https://link.coupang.com/a/e8OgPckiOc |
| benof-proteinbar-chunky-choco | 베노프 단백질바 청키초콜릿 50g | https://link.coupang.com/a/iUgK4MWwGi | https://link.coupang.com/a/fg1Mvt8ki4 |
| hymune-activebar-nuts | 하이뮨 액티브바 넛츠 50g | https://link.coupang.com/a/iUgLrbPN7Z | https://link.coupang.com/a/fg2cJ4hoZg |
| myprotein-soft-lemon-earlgrey | 마이프로틴 소프트 단백질바 레몬 얼그레이 45g | https://link.coupang.com/a/iUgLNvS25k | https://link.coupang.com/a/fg2d57avQW |
| myprotein-soft-caramel-choco | 마이프로틴 소프트 단백질바 카라멜 초코 45g | https://link.coupang.com/a/iUgL9MN4bA | https://link.coupang.com/a/fg2eFA6KVE |
| myprotein-soft-strawberry-yogurt | 마이프로틴 소프트 단백질바 딸기 요거트 45g | https://link.coupang.com/a/iUgMv0loqG | https://link.coupang.com/a/fg2fgPewxM |
| danbaekhani-protein-bar-peanutbutter-38 | 단백하니 프로틴바 피넛버터 38g | https://link.coupang.com/a/iUgMStw0Oa | https://www.coupang.com/vp/products/9183196271?itemId=27283149526&vendorItemId=94249810713 |
| labnosh-foodbar-mildchoco | 랩노쉬 푸드바 마일드 초코 55g | https://link.coupang.com/a/iUgNeOYKIe | https://www.coupang.com/vp/products/5054893507?itemId=19081213276&vendorItemId=86203578287 |
| labnosh-cookiebar-milktea-35 | 랩노쉬 단백쿠키바 밀크티 35g | https://link.coupang.com/a/iUgNBtCleS | https://link.coupang.com/a/fg2ra3wwpg |
| cralo-plant-proteinbar | 씨알로 식물성단백질바 43g | https://link.coupang.com/a/iUgNXNzzfE | https://www.coupang.com/vp/products/6204369926?itemId=12329742710&vendorItemId=92437079941 |
| crown-highprotein-chocobar | 크라운 고단백질초코바 45g | https://link.coupang.com/a/iUgOkbrkoS | https://www.coupang.com/vp/products/1371174605?itemId=18040186790&vendorItemId=85194526826 |
| kellogg-protein-granolabar-savory | 켈로그 프로틴 그래놀라바 고소한맛 35g | https://link.coupang.com/a/iUgOGylpV6 | https://www.coupang.com/vp/products/6639078957?itemId=17008664182&vendorItemId=72395745477 |
| hymune-protein-balance-bar | 하이뮨 프로틴밸런스 단백질바 40g | https://link.coupang.com/a/iUgO3aifmK | https://link.coupang.com/a/fg2EKN2Ykm |
| ppaeba-realchoco-proteinbar-dark-40 | 빼바 리얼초콜릿 프로틴바 다크 40g | https://link.coupang.com/a/iUgPpngnlI | https://link.coupang.com/a/fg2IbmLplI |
| ppaeba-realchoco-proteinbar-white-40 | 빼바 리얼초콜릿 프로틴바 화이트 40g | https://link.coupang.com/a/iUgPLEcS9A | https://link.coupang.com/a/fg2JbiVgYK |
| ppaeba-realchoco-proteinbar-cookies-cream-40 | 빼바 리얼초콜릿 프로틴바 쿠키앤크림 40g | https://link.coupang.com/a/iUgP8f2Qmq | https://link.coupang.com/a/fg2J2if8c8 |
| soyjoy-strawberry-30 | 소이조이 스트로베리 30g | https://link.coupang.com/a/iUgQuGCdSS | https://link.coupang.com/a/fg2NGUGHGC |
| flymill-proteinshake-goguma-45 | 플라이밀 단백질 쉐이크 고구마 45g | https://link.coupang.com/a/iUgQQ5DSfY | https://link.coupang.com/a/fgZZyAikrA |
| proteone-proteinshake-strawberry-40 | 프로티원 단백질 쉐이크 딸기맛 40g | https://link.coupang.com/a/iUgRdkBb9o | https://link.coupang.com/a/fg0cYwKeom |
| kkobak-kobab-high-protein-low-sugar-jeju-matcha-40 | 꼬박꼬밥 단백질 쉐이크 고단저당 제주 말차 40g | https://link.coupang.com/a/iUgRzHYs0a | https://link.coupang.com/a/fg0g2prRQa |
| kkobak-kobab-high-protein-low-sugar-black-sesame-40 | 꼬박꼬밥 단백질 쉐이크 고단저당 흑임자 40g | https://link.coupang.com/a/iUgRVRO0yq | https://link.coupang.com/a/fg0imqpzJA |
| itthefit-proteinshake-misugaru-40 | 잇더핏 단백질 쉐이크 미숫가루 40g | https://link.coupang.com/a/iUgSh3byHA | https://link.coupang.com/a/fg0m4YjUf6 |
| flymill-proteinshake-black-45 | 플라이밀 단백질 쉐이크 블랙 45g | https://link.coupang.com/a/iUgSEiH4Q8 | https://link.coupang.com/a/fg0tbfUNS8 |
| labnosh-slimshake-strawberry-cookie-crumble-45 | 랩노쉬 슬림쉐이크 딸기쿠키크럼블 45g | https://link.coupang.com/a/iUgS0wGeqW | https://link.coupang.com/a/fg0ufOi7wG |
| thedanbaek-proteinshake-powder-choco-32 | 더단백 단백질쉐이크 파우더 초코 32g | https://link.coupang.com/a/iUgTmXjsDQ | https://link.coupang.com/a/fg0PlINItw |
| fromit-proteinshake-grain-black-sesame-45 | 프롬잇 단백질 쉐이크 곡물흑임자 45g | https://link.coupang.com/a/iUgTJrAghw | https://link.coupang.com/a/fg0S0oBXJ6 |
| fromit-proteinshake-choco-45 | 프롬잇 단백질 쉐이크 초코 45g | https://link.coupang.com/a/iUgT5BIoXQ | https://link.coupang.com/a/fg0TCQqNRA |
| baggio-shakeyam-grain-45 | 바지오 단백질 쉐이크얌 곡물 45g | https://link.coupang.com/a/iUgUrXcuQK | https://link.coupang.com/a/fg0YQwO30S |
| shakebaby-proteinshake-matcha-45 | 쉐이크베이비 단백질 쉐이크 말차맛 45g | https://link.coupang.com/a/iUgUOeO48y | https://link.coupang.com/a/fg045ZUzG8 |
| shakebaby-proteinshake-grain-45 | 쉐이크베이비 단백질 쉐이크 곡물맛 45g | https://link.coupang.com/a/iUgVaOdwoC | https://link.coupang.com/a/fg05Wly3Xw |
| hansonhankki-petit-shake-strawberry-40 | 한손한끼 Petit 단백질 쉐이크 딸기 40g | https://link.coupang.com/a/iUgVw12rLM | https://link.coupang.com/a/htaqgC1yIm |
| yoplait-protein-plain-210 | 요플레 프로틴 드링크 플레인 210mL | https://link.coupang.com/a/iUgVTkybqC | https://www.coupang.com/vp/products/4542348097?itemId=22950129834&vendorItemId=94053885418 |
| yoplait-protein-max-210 | 요플레 프로틴 MAX 210mL | https://link.coupang.com/a/iUgWfAGfO8 | https://www.coupang.com/vp/products/7842498830?itemId=21353027936&vendorItemId=88410649081 |
| maeil-bio-greek-togo-honey-120 | 매일 바이오 매일 바이오 그릭요거트 to go 허니 120g | https://link.coupang.com/a/iUgWB2pwzs | https://www.coupang.com/vp/products/8310404657?itemId=28029010707&vendorItemId=94986131697 |
| yozm-strawberry-compote-130 | YOZM 그릭요거트 스트로베리 콩포트 130g | https://link.coupang.com/a/iUgWYfb4mW | https://www.coupang.com/vp/products/9449131609?itemId=28108889931&vendorItemId=95064910245&q=YOZM+%EA%B7%B8%EB%A6%AD%EC%9A%94%EA%B1%B0%ED%8A%B8+%EC%8A%A4%ED%8A%B8%EB%A1%9C%EB%B2%A0%EB%A6%AC+%EC%BD%A9%ED%8F%AC%ED%8A%B8+130g&searchId=89c7f8381254599&sourceType=search&itemsCount=36&searchRank=0&rank=0&traceId=mn8njth1 |
| yozm-apple-cinnamon-130 | YOZM 그릭요거트 애플시나몬 130g | https://link.coupang.com/a/iUgXkDv9yu | https://www.coupang.com/vp/products/8744851239?itemId=27391192182&vendorItemId=94356984474&q=YOZM+%EA%B7%B8%EB%A6%AD%EC%9A%94%EA%B1%B0%ED%8A%B8+%EC%95%A0%ED%94%8C%EC%8B%9C%EB%82%98%EB%AA%AC+130g&searchId=a54abd522441953&sourceType=search&itemsCount=36&searchRank=1&rank=1&traceId=mn8nk6lt |
| yozm-cafe-latte-100 | YOZM 그릭요거트 카페라떼 100g | https://link.coupang.com/a/iUgXHxUUrk | https://www.coupang.com/vp/products/9155961457?itemId=26964737551&vendorItemId=93933686886&q=YOZM+%EA%B7%B8%EB%A6%AD%EC%9A%94%EA%B1%B0%ED%8A%B8+%EC%B9%B4%ED%8E%98%EB%9D%BC%EB%96%BC+100g&searchId=0ac988482433245&sourceType=search&itemsCount=36&searchRank=1&rank=1&traceId=mn8nl290 |
| yozm-oh-granola-low-sugar-115 | YOZM 오! 그래놀라 저당 그릭요거트 115g | https://link.coupang.com/a/iUgX3PBlpA | https://www.coupang.com/vp/products/9071774255?itemId=26642437310&vendorItemId=93625442795&q=YOZM%20%EC%98%A4!%20%EA%B7%B8%EB%9E%98%EB%86%80%EB%9D%BC%20%EC%A0%80%EB%8B%B9%20%EA%B7%B8%EB%A6%AD%EC%9A%94%EA%B1%B0%ED%8A%B8%20115g&searchId=891fa8ac2438545&sourceType=search&itemsCount=36&searchRank=2&rank=2&traceId=mn8nlqkl |
| danbaek-drink-caramel-250 | 더단백 드링크 카라멜 250mL | https://link.coupang.com/a/iUgYp0YKPY | https://link.coupang.com/a/e8NHwDyU6S |
| hymune-protein-balance-black-sesame-190 | 하이뮨 프로틴 밸런스 흑임자 190mL | https://link.coupang.com/a/iUgYMiWMWi | https://link.coupang.com/a/e8OliFJOpM |
| ondanbaek-protein-bar-apple-cranberry-50 | 온단백 프로틴바 애플크랜베리 50g | https://link.coupang.com/a/iUgY8HWWBM | https://www.coupang.com/vp/products/9004312871?itemId=26388106664&vendorItemId=93364470969 |
| ondanbaek-protein-bar-chocolate-fudge-50 | 온단백 프로틴바 초콜릿퍼지 50g | https://link.coupang.com/a/iUgZu1UaCy | https://www.coupang.com/vp/products/9004389967?itemId=26388520629&vendorItemId=93364878631 |
| danbaekhani-protein-bar-berry-30 | 단백하니 프로틴바 베리 30g | https://link.coupang.com/a/iUg4jYl7Rc | https://www.coupang.com/vp/products/8802155167?itemId=26192923642&vendorItemId=93172255273 |
| proteone-proteinshake-coffee-40 | 프로티원 단백질 쉐이크 커피맛 40g | https://link.coupang.com/a/iUg4GfYH80 | https://link.coupang.com/a/fgZ27kGoNw |
| itthefit-proteinshake-corn-40 | 잇더핏 단백질 쉐이크 옥수수 40g | https://link.coupang.com/a/iUg42JYLVQ | https://link.coupang.com/a/fg0nJGCFZQ |
| itthefit-proteinshake-green-tea-latte-40 | 잇더핏 단백질 쉐이크 녹차라떼 40g | https://link.coupang.com/a/iUg5oTJixw | https://link.coupang.com/a/fg0wtSetmm |
| flymill-proteinshake-pistachio-45 | 플라이밀 단백질 쉐이크 피스타치오 45g | https://link.coupang.com/a/iUg5LcUfo4 | https://link.coupang.com/a/fg0OwfAlq0 |
| fromit-proteinshake-blueberry-greek-yogurt-45 | 프롬잇 단백질 쉐이크 블루베리그릭요거트 45g | https://link.coupang.com/a/iUg57vgKRg | https://link.coupang.com/a/fg0SpJPi1c |
| yoplait-protein-blueberry-100 | 요플레 프로틴 블루베리 떠먹는 요구르트 100g | https://link.coupang.com/a/iUg6tLmtgW | https://www.coupang.com/vp/products/1583671851?itemId=2707120147&vendorItemId=70697395078 |
