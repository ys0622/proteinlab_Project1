# Gemini 성분표·사진 교차검증 (2026-10-16)

Gemini 4 Argon(바·음료 일부)과 Gemini 3.8 Flash(나머지)가 444종의 성분표·제품 사진을 직접 판독해 사이트 값과 비교했다. 원본 판독 TSV: `.tmp-gemini/out/`. 수치는 Claude가 이미지로 재확인한 뒤 반영했다.

## 반영함
- 수치 7건: 꼬박꼬밥 고단저당 초코 당류 1.7g, 제주말차 당류 1.6g, 룩트 초코헤이즐넛 당류 6g, 랩노쉬 맥스 초코 지방 0.8g, 맥스 딸기 지방 0.6g·콜레스테롤 15mg, 마이밀 뉴프로틴 오리지널 나트륨 150mg, 매일 바이오 그릭 Delight 바나나 지방 1.5g
- 용량 9건: 베노프 소프트바 8종 50g→60g, 씨알로 식물성 단백질바 45g→43g

## 남은 문제 (전체 목록, 사람 확인 필요)

```
slug	cat	issue	site(kcal/prot/sugar/fat/na)	gemini_pack	spec_ok	img_ok	basis	note
dryou-proteinbar-pro-3nuts-crunch	bar	SPEC:?	334/25/8/18/170	334/25/8/18/170	?	Y	1봉지 70g	성분표에 제품명/맛 미기재(총내용량 560g, 70gx8봉지)
dryou-proteinbar-pro-choco-classic	bar	SPEC:? IMG:?	312/24/9/12/210	312/24/9/12/210	?	?	1개 70g	성분표 제품명 미기재, 사진에 초코 클래식 문구 없음(기본 24g 단백질바)
dryou-proteinbar-pro-crunch	bar	SPEC:?	355/24/9/19/200	355/24/9/19/200	?	Y	1봉지 70g	성분표에 제품명/맛 미기재
benof-softbar-peanutbutter	bar	SPEC:N IMG:?	171/20/2.2/3.6/193	171/20/2.2/3.6/193	N	?	총 내용량 60g	제품정보 용량은 50g이나 성분표는 60g 기준(사진은 용량 미표기, 구형 60g 추정)
benof-softbar-cookie-cream	bar	SPEC:N IMG:?	174/20/3.2/3.4/179	174/20/3.2/3.4/179	N	?	총 내용량 60g	제품정보 용량은 50g이나 성분표는 60g 기준(사진은 용량 미표기)
benof-softbar-chocolate-caramel	bar	SPEC:N IMG:?	172/20/2/3.3/178	172/20/2/3.3/178	N	?	총 내용량 60g	제품정보 용량은 50g이나 성분표는 60g 기준(사진은 용량 미표기)
benof-softbar-cacao	bar	SPEC:N IMG:?	177/20/3.5/3.1/132	177/20/3.5/3.1/132	N	?	총 내용량 60g	제품정보 용량은 50g이나 성분표는 60g 기준(사진은 용량 미표기)
benof-softbar-black-sesame	bar	SPEC:N IMG:?	171/20/1.9/3.7/173	171/20/1.9/3.7/173	N	?	총 내용량 60g	제품정보 용량은 50g이나 성분표는 60g 기준(사진은 용량 미표기)
benof-softbar-injeolmi	bar	SPEC:N IMG:?	173/20/2.1/3.4/172	173/20/2.1/3.4/172	N	?	총 내용량 60g	제품정보 용량은 50g이나 성분표는 60g 기준(사진은 용량 미표기)
benof-softbar-roasted-sweetpotato	bar	SPEC:N IMG:?	172/20/2.4/3.1/178	172/20/2.4/3.1/178	N	?	총 내용량 60g	제품정보 용량은 50g이나 성분표는 60g 기준(사진은 용량 미표기)
benof-softbar-berry-cheesecake	bar	SPEC:N IMG:?	171/20/2/3.8/390	171/20/2/3.8/390	N	?	총 내용량 60g	제품정보 용량은 50g이나 성분표는 60g 기준(사진은 용량 미표기)
syntha6-crispy-choco	bar	SPEC:N	190/20/5//	190/20/5/6/230	N	Y	1 Bar (55g)	성분표는 솔티드 토피 프레첼(1 Bar 55g, 당류 5g) 파일로 본 제품(57g, 사진상 당류 2g)과 불일치
bsn-protein-crisp-peanut-butter-crunch	bar	SPEC:N IMG:N	190/20/5//	190/20/5/6/230	N	N	1 Bar (55g)	성분표는 솔티드 토피 프레첼(55g, 당류 5g) 공용 파일이며 제품 사진은 56g(1.97oz, 당류 4g)으로 정보(57g)와 불일치
bsn-protein-crisp-salted-toffee-pretzel	bar	SPEC:N	190/20/5/6/230	190/20/5/6/230	N	Y	1 Bar (55g)	성분표 기준량(55g) 및 당류(5g)가 제품 용량(57g) 및 사진 표기(57g, 당류 4g)와 불일치
quest-nutrition-protein-bar-deep-chocolate-chip-cookie-dough-60	bar	SPEC:N IMG:N	190/21/1/9/220	190/21/1/9/220	N	N	1 bar (60g)	사진은 Dipped 50g(단백질 18g) 제품이나 제품 정보는 60g이고 성분표는 일반 쿠키도우(60g, 단백질 21g)임
quest-nutrition-protein-bar-deep-dish-cookie-cream-60	bar	DIFF:kcal,protein SPEC:N IMG:N	200/21/1//	180/18/1/9/210	N	N	1 bar (50g)	성분표(50g)와 사진(Dipped Cookies & Cream 1.76oz/50g, 단백질 18g)은 서로 일치하나 제품 정보의 용량(60g)과 불일치
himnaego-protein-bar-dark-chocolate-50	bar	SPEC:? IMG:?	250/13/10/12/210	250/13/10/12/210	?	?	1개 50g	성분표와 제품 사진 모두 50g(250kcal, 단백질 13g)로 일치하나 다크 초콜릿 표기 없음
nobrand-proteinbar-choco	bar	DIFF:kcal,protein,sugar SPEC:N IMG:N	220/12/10//	175/11/6/7/90	N	N	1개 40g	제품 정보 용량은 48g이나 성분표와 제품 사진 모두 1개 40g(175kcal)임
mymil-new-proteinbar	bar	DIFF:kcal,protein,sugar SPEC:N IMG:N	210/12/8//	107/2.5/7/5/40	N	N	1개 21g	제품 정보 용량은 50g이나 성분표와 제품 사진 모두 21g(미니) 제품임
proteinbangatgan-harudanbaekbar-jetchococake	bar	SPEC:?	148/12/3/8/105	148/12/3/8/105	?	Y	총 내용량 40g	성분표에 제품명 미표기, 사진 패키지엔 당류 2g(146kcal 추정) 표기로 성분표 수치(148kcal, 당류 3g)와 미세 차이
dryou-proteinbar-bite-crunch	bar	SPEC:N IMG:N	122.6/8.4/3.1//	////	N	N	1봉지(50g)당	성분표는 닥터유 단백질바(견과 50g)의 것임, 사진은 대용량(34개입) 패키지이며 용량 24g은 6개 섭취시 단백질 함량(24g)을 오기한 것
dryou-proteinbar-pro-bite-choco-classic	bar	SPEC:N IMG:N	98.4/8.4/2.9//	////	N	N	1봉지(50g)당	성분표는 닥터유 단백질바(견과 50g)의 것임, 사진은 대용량(408g/34개입) 패키지이며 용량 24g은 6개 섭취시 단백질 함량(24g)을 오기한 것
danbaekhani-protein-bar-choco-38	bar	SPEC:?	160/12/0/4.6/190	/12/0/4.6/190	?	Y	NA	성분표에 제품명·기준용량·열량 누락(사진 패키지 하단에 38g 161kcal 표기)
danbaekhani-protein-bar-signature-31	bar	SPEC:?	125/12/0/2.3/175	/12/0/2.3/175	?	Y	NA	성분표에 제품명·기준용량·열량 누락(사진 패키지 하단에 31g 126kcal 표기)
danbaekhani-protein-bar-berry-30	bar	SPEC:? IMG:N	120/12/1/2/200	////	?	N	NA	성분표에 제품명·기준용량·열량 누락, 사진 패키지에는 용량이 30g이 아닌 32g(115kcal)으로 표기됨
danbaekhani-protein-bar-peanutbutter-38	bar	SPEC:N IMG:N	170/12/1/6/180	170/12/1/6/180	N	N	총 내용량 38g	성분표는 말차초코(38g, 170kcal, 당류 1g미만)와 완전히 동일한 잘못된 데이터이며, 사진 패키지에는 34g(140kcal, 당류 1.5g)으로 표기되어 제품 정보(38g)와 불일치
danbaekhani-protein-bar-matcha-choco-38	bar	DIFF:kcal,sugar SPEC:?	160/12/0//	170/12/1/6/180	?	Y	총 내용량 38g	성분표에 제품명 미표기이나 사진 패키지의 38g(170kcal)·당류 <1g·단백질 12g과 일치
labnosh-foodbar-mildchoco	bar	SPEC:N	235/12/9//	////	N	Y	총 내용량 35g	성분표는 다른 제품(단백쿠키바 밀크티 35g)임
cralo-plant-proteinbar	bar	SPEC:N IMG:N	240/10/9/16/58	240/10/9/16/58	N	N	1개(43g)	성분표와 제품 사진 모두 1개 용량이 43g임(제시된 45g과 불일치)
calobye-daily-nuts-proteinbar	bar	DIFF:kcal,protein,sugar SPEC:N IMG:N	190/10/7//	140/11/2/6/130	N	N	1개(30g)	성분표(제품명 미기재)와 사진 모두 1개 30g(140kcal) 기준임(제시된 45g과 불일치)
kellogg-protein-granolabar-savory	bar	SPEC:N IMG:N	165/8/7//	////	N	N	1개(50g)	성분표는 다른 제품(프로틴바K 견과 50g)이며 사진은 프로틴 그래놀라바 고소한맛 50g(217kcal)임(제시된 35g과 불일치)
kellogg-proteinbark-nuts	bar	DIFF:kcal,protein,sugar SPEC:N IMG:N	165/8/7//	244/15/9/13.2/150	N	N	1개(50g)	성분표(제품명 미기재)와 사진 모두 1개 용량이 50g임(제시된 35g과 불일치)
kellogg-proteinbark-caramel-nuts	bar	DIFF:kcal,protein,sugar SPEC:N IMG:N	165/8/7//	209/10/7.9/12.5/92	N	N	1개(40g)	성분표와 사진 모두 1개 용량이 40g임(제시된 35g과 불일치)
kellogg-proteinbark-hazelnut-darkchoco	bar	DIFF:kcal,protein,sugar SPEC:N IMG:N	165/8/7//	206/10.5/7.8/12/68.8	N	N	1개(40g)	성분표(제품명 미기재)와 사진 모두 1개 용량이 40g임(제시된 35g과 불일치)
dryou-proteinbar-mini-nuts	bar	DIFF:kcal,protein,sugar SPEC:? IMG:N	160/8/6//	177.1/8.75/7/9.1/73.5	?	N	100g당	성분표(제품명 미기재, 총내용량 202.5g)는 100g당 기준(35g 환산 시 177.1kcal)이고 사진은 324g(약 23개입, 3개 34g당 단백질 12g) 대용량 패키지임
gomgom-proteinbar-mini	bar	SPEC:?	54/2.2/2/3/15	54/2.19/2/3/15	?	Y	100g당	성분표에 제품명 미표기(총내용량 480g, 100g당 기준), 사진은 480g(48개입) 대용량 팩으로 1개(10g) 기준 환산
nobrand-proteinbar-mini	bar	SPEC:? IMG:?	165/7/6.7/8.1/105	164.5/7/6.65/8.05/105	?	?	100g당	성분표에 제품명 미표기, 성분표·사진 모두 총내용량 224g(100g당 기준)만 표기되어 개별 용량 35g 확인 불가(pack은 35g 기준 환산)
lottewellfood-easyprotein-highprotein-crispy	bar	SPEC:?	180/20/5/7/300	180/20/5/7/300	?	Y	총 내용량 50g	성분표에 브랜드·제품명 미표기(50g 180kcal, 단백질 20g은 사진과 일치)
lottewellfood-easyprotein-energy-bar	bar	SPEC:N IMG:?	195/9/5/11/120	195/9/5/11/120	N	?	총 내용량 40g	제품 정보 용량은 45g이나 성분표는 총 내용량 40g 기준(제품명 미표기), 사진에는 중량 표기 식별 불가(45g 환산 시 219.38kcal, 단백질 10.13g, 당류 5.63g, 지방 12.38g, 나트륨 135mg)
hymune-protein-balance-bar	bar	SPEC:N IMG:N	152/8/9.2/4/124	154.4/8/9.2/4/124	N	N	100g당	성분표와 사진 모두 총 내용량 300g(미니사이즈 대용량 파우치) 제품으로 용량 40g 표기 없음(pack은 40g 기준 환산)
myprotein-6layer-triple-chocolate-fudge-60	bar	SPEC:? IMG:?	212/20/1.9/6.2/84	212/20/1.9/6.2/	?	?	1회 제공량 60g	성분표에 브랜드·제품명 미표기 및 나트륨 대신 소금 0.21g(100g당 0.35g) 표기, 사진은 Layered BAR TRIPLE CHOCOLATE이나 용량(60g) 미표기
myprotein-protein-wafer-42	bar	SPEC:? IMG:N	195/15/5.5/9/	195/15/5.5/9/210	?	N	1개당 (42g)	성분표에 브랜드·제품명 미표기 및 나트륨 0.21g(210mg)으로 표기, 사진은 CRISPY Wafer 초콜릿 헤이즐넛 맛이며 용량 미표기
gomgom-proteinbar-50	bar	SPEC:?	260/14/10/14/90	260/14/10/14/90	?	Y	1개(50g)당	성분표에 브랜드·제품명 미표기(1개 50g당 260kcal, 단백질 14g은 사진과 일치)
ppaeba-realchoco-proteinbar-greek-yogurt-40	bar	SPEC:?	160/12/1.9/8/169	160/12/1.9/8/169	?	Y	1개(40g)당	성분표에 브랜드·제품명·맛 미표기(1개 40g당 160kcal, 단백질 12g은 사진과 일치)
cralo-79-corn-yogurt-bar-25	bar	SPEC:?	100/1/6/2.2/35	100/1/6/2.2/35	?	Y	1개(25g)당	성분표에 제품명 미표기(총내용량 300g=25g×12개, 1개 25g당 100kcal이나 단품 사진에는 25g 95kcal로 표기)
labnosh-protein-max-choco-400	drink	DIFF:fat	235/52/0/0/250	235/52/0/0.8/250	Y	Y	총 내용량 400 ml	정상 일치(성분표에 제품명 미표기이나 용량·열량·단백질 일치)
labnosh-protein-max-strawberry-400	drink	DIFF:fat	230/52/0/0/250	230/52/0/0.6/250	Y	Y	총 내용량 400 ml	정상 일치(성분표에 제품명 미표기이나 용량·열량·단백질 일치)
hymune-balance-active-deepchoco-250	drink	SPEC:?	110/20/0/0.7/150	110/20/0/0.7/150	?	Y	1팩(250 mL)	제품 사진은 104kcal(제로 리뉴얼)이나 성분표는 110kcal(구버전 추정)
mymil-furotein-goguma-250	drink	DIFF:sodium SPEC:?	130/20/0/3.5/250	130/20/0/3.5/230	?	Y	1팩(250mL)	고소한맛 성분표 파일 공유 사용(표 내 제품명 미표기, 수치는 동일)
takefit-max-pumpkin-250	drink	SPEC:?	105/24/0.7/0.5/210	105/24/0.7/0.5/210	?	Y	총내용량 250mL	성분표가 고소한맛 이미지와 완전히 동일함(250mL·105kcal·24g 수치는 부합)
newcare-all-protein-41g-coffee-350	drink	SPEC:?	210/41/0.8/3.5/250	210/41/0.8/3.5/250	?	Y	총 내용량 350 mL	초코·커피·고소한맛 3종이 동일한 성분표 이미지를 사용함(350mL·210kcal·41g 수치는 부합)
newcare-all-protein-41g-savory-350	drink	SPEC:?	210/41/0.8/3.5/250	210/41/0.8/3.5/250	?	Y	총 내용량 350 mL	초코·커피·고소한맛 3종이 동일한 성분표 이미지를 사용함(350mL·210kcal·41g 수치는 부합)
takefit-monster-chocobanana-350	drink	SPEC:?	195/45/1/1.1/270	195/45/1/1.1/270	?	Y	총 내용량 350mL	성분표는 195kcal(고소한맛과 수치 동일)이나 제품 전면 사진 하단은 193kcal로 표기됨
hymune-balance-active-banana-250	drink	SPEC:N	99/20/0/0/130	99/20/0/0/130	N	Y	1팩(250mL)	제품 사진 전면은 250mL(140kcal) 바나나맛이나 성분표는 99kcal(당류 0g, 지방 0g)인 다른 제품 성분표임
pasteur-easyprotein-lowsugar-choco-250	drink	IMG:N	110/20/3/0.6/120	110/20/3/0.6/120	Y	N	총 내용량 250mL	성분표는 저당(110kcal, 당류 3g) 버전이나 제품 사진은 당0(115kcal, 당류0 설탕0) 버전임
labnosh-protein-banana-350	drink	DIFF:kcal,protein,sugar,fat,sodium SPEC:N	190/25/8/3.2/280	160/27/6/0/160	N	Y	내용량 355ml	성분표 내용량 355ml 표기(제품 350mL), 단백질 27미만 표기
mymil-newprotein-original-190	drink	DIFF:sodium	150/9/10/6/170	150/9/10/6/150	Y	Y	총 내용량 190mL	
oneuldanbaek-caramel-latte-250	drink	DIFF:kcal,sugar,sodium SPEC:N	158/21/6/2/200	135/21/3/2/100	N	Y	총 내용량 250mL	성분표는 초코라떼(코코아분말, 135kcal)이며 사진은 카라멜라떼(158kcal)
oneuldanbaek-dolce-latte-250	drink	DIFF:sugar,fat SPEC:N	135/21/4/1.4/100	135/21/3/2/100	N	Y	총 내용량 250mL	성분표는 초코라떼(코코아분말 함유)이며 사진은 돌체라떼(커피·연유 함유)
proteone-proteinshake-coffee-40	shake	SPEC:?	108/22/1/0.6/299	108/22/1/0.6/299	?	Y	총 내용량 40g	성분표 열량은 108kcal이나 제품 사진 하단은 40g(137kcal)로 표기됨
kkobak-kobab-high-protein-low-sugar-choco-40	shake	DIFF:sugar	157/20/2/3.5/197	157/20/1.7/3.5/197	Y	Y	1포 (40g)당	
kkobak-kobab-high-protein-low-sugar-jeju-matcha-40	shake	DIFF:sugar	153/20/2/2.8/198.5	153/20/1.6/2.8/198.5	Y	Y	1포 (40g)당	
lookat-proteinshake-choco-hazelnut-45	shake	DIFF:sugar	180/16.8/6.6/5.3/134.4	180/16.8/6/5.3/134.4	Y	Y	총내용량 45 g	
flymill-proteinshake-cookie-cream-45	shake	IMG:?	173/20.3/2.8/4.3/228.6	173/20.3/2.8/4.3/228.6	Y	?	1회(45g)당	사진 전면 173kcal이나 하단 1병(220ml)·180kcal 오표기 혼재
thedanbaek-proteinshake-powder-choco-32	shake	IMG:N	110/20/0.8/1.47/360	110/20/0.8/1.47/360	Y	N	총 내용량 32g	사진 용량 31g(105kcal)으로 제품 정보(32g)와 상이
baggio-shakeyam-oolong-milk-tea-45	shake	IMG:N	160/18/1.9/3.3/210	160/18/1.9/3.3/210	Y	N	1포(45g)	사진 용량 50g
shakebaby-proteinshake-choco-45	shake	IMG:N	163/22/2/3/433	163/22/2/3/433	Y	N	총 내용량 45g	사진 용량 35g
shakebaby-proteinshake-strawberry-45	shake	IMG:N	167/20/3/2.1/252	167/20/3/2.1/252	Y	N	총 내용량 45g	사진 용량 35g
shakebaby-proteinshake-matcha-45	shake	IMG:N	164/21/2/2.2/331	164/21/2/2.2/331	Y	N	총 내용량 45g	사진 용량 35g
shakebaby-proteinshake-grain-45	shake	IMG:N	166/20/2/2.4/442	166/20/2/2.4/442	Y	N	총 내용량 45g	사진 용량 35g
shakebaby-proteinshake-sweetcorn-flakes-45	shake	IMG:N	163/20/3/2.5/362	163/20/3/2.5/362	Y	N	총 내용량 45g	사진 용량 40g
delight-project-shake-nutty-choco-45	shake	IMG:N	180/19/3/3.8/150	180/19/3/3.8/150	Y	N	총 내용량 45g	사진 용량 40g
delight-project-shake-black-sesame-injeolmi-45	shake	IMG:N	160/19/3/2.9/240	160/19/3/2.9/240	Y	N	총 내용량 45g	사진 용량 40g
delight-project-shake-sweet-potato-misutgaru-45	shake	IMG:N	165/19/4/2.1/220	165/19/4/2.1/220	Y	N	총 내용량 45 g	사진 용량 40g 표기
delight-project-shake-corn-castella-45	shake	IMG:N	170/18/6/3.1/210	170/18/6/3.1/210	Y	N	총 내용량 45 g	사진 용량 40g 표기
delight-project-shake-pistachio-choco-45	shake	IMG:N	185/22/2/4/180	185/22/2/4/180	Y	N	총 내용량 45 g	사진 용량 40g 표기
delight-project-shake-strawberry-yogurt-45	shake	IMG:N	175/20/6/1.9/180	175/20/6/1.9/180	Y	N	총 내용량 45 g	사진 용량 40g 표기
delight-project-shake-blueberry-yogurt-45	shake	IMG:N	180/18/4/2.6/190	180/18/4/2.6/190	Y	N	총 내용량 45 g	사진 용량 40g 표기
delight-project-shake-melon-milk-45	shake	IMG:N	160/21/3/1.7/200	160/21/3/1.7/200	Y	N	총 내용량 45 g	사진 용량 40g 표기
yoplait-protein-plain-210	yogurt	DIFF:kcal,protein,sugar,fat,sodium SPEC:N	125/15/4/1.8/95	180/17/16.5/3.3/130	N	Y	총 내용량 210mL	성분표는 딸기바나나맛
who-greek-plain-80	yogurt	DIFF:kcal,sugar SPEC:N IMG:N	125/4.8/12/6.2/90	105/4.8/7.2/6.2/90	N	N	1개(80g)당	성분표·사진 모두 유기농 달지않은 플레인
who-greek-plain-450	yogurt	IMG:N	720/27/72/35.1/504	720/27/72/35.1/504	Y	N	100g당	사진은 유기농 달지않은 플레인
yoplait-protein-plain-210	yogurt	DIFF:kcal,protein,sugar,fat,sodium SPEC:N	125/15/4/1.8/95	180/17/16.5/3.3/130	N	Y	총 내용량 210mL	성분표는 딸기바나나맛
who-greek-plain-80	yogurt	DIFF:kcal,sugar SPEC:N IMG:N	125/4.8/12/6.2/90	105/4.8/7.2/6.2/90	N	N	1개(80g)당	성분표·사진 모두 유기농 달지않은 플레인
who-greek-plain-450	yogurt	IMG:N	720/27/72/35.1/504	720/27/72/35.1/504	Y	N	100g당	사진은 유기농 달지않은 플레인
maeil-bio-greek-unsweetened-80	yogurt	IMG:N	75/5.6/1.4/3.8/65	75/5.6/1.4/3.8/65	Y	N	총 내용량 80g	사진은 바이오 그릭요거트 Delight 플레인 85g
maeil-bio-greek-plain-150	yogurt	DIFF:protein,sugar,fat SPEC:N	135/9/5.5/6.5/110	135/10/2.5/7/120	N	Y	총 내용량 150g	성분표는 무가당 플레인(설탕무첨가, 단백질 10g)
maeil-bio-greek-plain-400	yogurt	DIFF:protein,sugar,fat,sodium SPEC:N	360/24/14.67/17.33/293.33	360/28/7.2/19.2/320	N	Y	100g당	성분표는 무가당 플레인(360kcal, 단백질 28g)
maeil-bio-greek-delight-banana-80	yogurt	DIFF:fat	70/5/6/2.6/50	70/5/6/1.5/50	Y	Y	총 내용량 80g	매일 바이오 그릭요거트 Delight 바나나 80g 일치
who-organic-greek-unsweetened-450	yogurt	DIFF:kcal,protein,sugar,fat,sodium	565/27/36/35.1/517.5	100/4.8/6.4/6.24/92	Y	Y	100g당	사이트 기준 80g 환산(1팩 450g 전체 기준 565kcal 단백질 27g 당류 36g 지방 35.1g 나트륨 517.5mg)
who-organic-greek-plain-480	yogurt	SPEC:N IMG:N	720/28.8/66/37.2/540	720/28.8/66/37.2/540	N	N	1개(80g)당	성분표 총용량 320g(80g×4개), 사진 80g 컵으로 제품 용량(480g)과 불일치```
