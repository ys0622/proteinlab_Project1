"use client";

import { useMemo, useState } from "react";

type ProductType = "drink" | "bar" | "yogurt" | "shake";
type EventCategory = "할인" | "쿠폰" | "증정" | "무료배송";
type FilterType = "전체" | EventCategory;

interface BrandEvent {
  category: EventCategory;
  periodLabel: string;
  description: string;
}

interface BrandCard {
  brand: string;
  storeType: string;
  storeUrl: string;
  note: string;
  productCount: number;
  events: BrandEvent[];
}

const PRODUCT_TYPE_META: Record<
  ProductType,
  {
    label: string;
    eyebrow: string;
    emoji: string;
    accentColor: string;
    accentBg: string;
    accentBorder: string;
  }
> = {
  drink: {
    label: "음료",
    eyebrow: "Protein Drink",
    emoji: "🥤",
    accentColor: "#2f5d46",
    accentBg: "#eef6f0",
    accentBorder: "#cfe0d5",
  },
  bar: {
    label: "바",
    eyebrow: "Protein Bar",
    emoji: "🍫",
    accentColor: "#7b4f2f",
    accentBg: "#faf2e8",
    accentBorder: "#e7d5c0",
  },
  yogurt: {
    label: "요거트",
    eyebrow: "Protein Yogurt",
    emoji: "🥣",
    accentColor: "#365b76",
    accentBg: "#edf4f8",
    accentBorder: "#d2e1ea",
  },
  shake: {
    label: "쉐이크",
    eyebrow: "Protein Shake",
    emoji: "🥛",
    accentColor: "#6b4c7f",
    accentBg: "#f4eef8",
    accentBorder: "#ddd2e9",
  },
};

const CHECKED_DATE_LABEL = "2026-03-14 확인";

const CATEGORY_EMOJI: Record<EventCategory, string> = {
  할인: "🔖",
  쿠폰: "🎟",
  증정: "🎁",
  무료배송: "🚚",
};

const CATEGORY_COLOR: Record<EventCategory, { bg: string; text: string; border: string }> = {
  할인: { bg: "#fdf8f0", text: "#956b2f", border: "#e8d5b8" },
  쿠폰: { bg: "#eef3f0", text: "#3a6b4a", border: "#c4d8cc" },
  증정: { bg: "#f4f0f3", text: "#7a5270", border: "#d9cdd6" },
  무료배송: { bg: "#eff2f6", text: "#4a6178", border: "#cdd6df" },
};

const FILTER_TABS: { key: FilterType; emoji: string }[] = [
  { key: "전체", emoji: "" },
  { key: "할인", emoji: "🔖" },
  { key: "쿠폰", emoji: "🎟" },
  { key: "증정", emoji: "🎁" },
  { key: "무료배송", emoji: "🚚" },
];

const rawDrinkBrands: BrandCard[] = [
  {
    brand: "하이뮨",
    storeType: "자사몰",
    storeUrl: "https://foodismall.com/",
    note: "현재 등록 제품 15개",
    productCount: 15,
    events: [
      { category: "할인", periodLabel: "상시 체크", description: "회원 등급별 상시 할인과 정기배송 추가 적립이 자주 붙는 편입니다." },
      { category: "증정", periodLabel: "수시 진행", description: "세트 구성 구매 시 보틀·전용 굿즈 증정형 이벤트가 반복적으로 열립니다." },
    ],
  },
  {
    brand: "더단백",
    storeType: "네이버 스토어",
    storeUrl: "https://smartstore.naver.com/bingtft",
    note: "현재 등록 제품 12개",
    productCount: 12,
    events: [
      { category: "할인", periodLabel: "상시 체크", description: "묶음 구성 특가와 맛별 세트 할인이 자주 열려 체감가 변동이 큽니다." },
      { category: "쿠폰", periodLabel: "수시 진행", description: "스마트스토어 쿠폰이 붙는 경우가 많아 장바구니 최종가를 꼭 확인하는 편이 좋습니다." },
    ],
  },
  {
    brand: "셀렉스",
    storeType: "자사몰",
    storeUrl: "https://www.selexmall.com/",
    note: "현재 등록 제품 10개",
    productCount: 10,
    events: [
      { category: "할인", periodLabel: "상시 체크", description: "브랜드전, 정기배송, 대용량 묶음 할인 폭이 큰 편이라 공식몰 비교 가치가 높습니다." },
      { category: "증정", periodLabel: "수시 진행", description: "베스트 상품 구매 시 샘플팩이나 사은품을 묶어주는 패턴이 반복됩니다." },
    ],
  },
  {
    brand: "테이크핏",
    storeType: "자사몰",
    storeUrl: "https://mshopping.namyangi.com/item/list/1002",
    note: "현재 등록 제품 9개",
    productCount: 9,
    events: [
      { category: "할인", periodLabel: "상시 체크", description: "남양몰 기획전으로 대량 구매 가격이 자주 내려갑니다." },
      { category: "무료배송", periodLabel: "조건부 상시", description: "세트 단위로 담으면 배송비 조건을 넘기기 쉬운 편입니다." },
    ],
  },
  {
    brand: "뉴케어",
    storeType: "자사몰",
    storeUrl: "https://www.wellife.co.kr/",
    note: "현재 등록 제품 7개",
    productCount: 7,
    events: [
      { category: "할인", periodLabel: "상시 체크", description: "대상웰라이프 공식몰에서 기획전과 타임특가가 자주 묶입니다." },
      { category: "무료배송", periodLabel: "회원 혜택", description: "회원 전용 무료배송 또는 배송비 완화 혜택이 함께 붙는 경우가 있습니다." },
    ],
  },
  {
    brand: "마이밀",
    storeType: "자사몰",
    storeUrl: "https://www.wellife.co.kr/",
    note: "현재 등록 제품 7개",
    productCount: 7,
    events: [
      { category: "쿠폰", periodLabel: "회원 혜택", description: "대상웰라이프 멤버십 쿠폰 체계가 있어 신규·재구매 조건을 함께 보는 편이 좋습니다." },
      { category: "할인", periodLabel: "상시 체크", description: "48팩 이상 대용량 구성 특가가 자주 열려 단가 차이가 큽니다." },
    ],
  },
  {
    brand: "얼티브",
    storeType: "CJ더마켓",
    storeUrl: "https://www.cjthemarket.com/",
    note: "현재 등록 제품 6개",
    productCount: 6,
    events: [
      { category: "할인", periodLabel: "상시 체크", description: "비건 라인업 중심 기획전이 반복돼 단품보다 묶음 가격 메리트가 큽니다." },
      { category: "쿠폰", periodLabel: "수시 진행", description: "CJ더마켓 장바구니 쿠폰과 중복되는지 확인하면 체감가가 더 내려갑니다." },
    ],
  },
  {
    brand: "랩노쉬",
    storeType: "자사몰",
    storeUrl: "https://labnosh.com/",
    note: "현재 등록 제품 9개",
    productCount: 9,
    events: [
      { category: "할인", periodLabel: "상시 체크", description: "재고 소진형 세일과 세트 특가 빈도가 높아 시점별 가격 차이가 큰 브랜드입니다." },
      { category: "쿠폰", periodLabel: "회원 혜택", description: "신규 회원 쿠폰팩과 앱 전용 혜택이 붙는지 같이 확인하는 편이 좋습니다." },
    ],
  },
  {
    brand: "닥터유",
    storeType: "자사몰",
    storeUrl: "https://dryoumall.com/",
    note: "현재 등록 제품 5개",
    productCount: 5,
    events: [
      { category: "할인", periodLabel: "상시 체크", description: "드링크와 바를 함께 묶는 세트 구성이 많아 교차 구매 시 장점이 있습니다." },
      { category: "쿠폰", periodLabel: "회원 혜택", description: "첫 구매나 회원 전용 쿠폰을 적용하면 체감가가 달라집니다." },
    ],
  },
  {
    brand: "칼로바이",
    storeType: "자사몰",
    storeUrl: "https://www.calobye.shop/",
    note: "현재 등록 제품 4개",
    productCount: 4,
    events: [
      { category: "할인", periodLabel: "상시 체크", description: "프로틴 드링크와 쉐이크 라인 기획전이 자주 열려 공식몰 확인 가치가 높습니다." },
      { category: "무료배송", periodLabel: "조건부 상시", description: "일정 금액 이상 무료배송 기준이 비교적 명확한 편입니다." },
    ],
  },
];

const rawBarBrands: BrandCard[] = [
  {
    brand: "퀘스트 뉴트리션",
    storeType: "공식 판매처 중심",
    storeUrl: "https://www.coupang.com/",
    note: "현재 등록 제품 12개",
    productCount: 12,
    events: [
      { category: "할인", periodLabel: "상시 체크", description: "맛별 가격 차이가 큰 편이라 쿠팡 로켓배송과 공식 수입 판매처를 함께 보는 편이 좋습니다." },
      { category: "무료배송", periodLabel: "로켓배송 기준", description: "묶음 구성과 로켓배송 여부에 따라 실구매가 차이가 크게 납니다." },
    ],
  },
  {
    brand: "베노프",
    storeType: "자사몰",
    storeUrl: "https://benof.co.kr/",
    note: "현재 등록 제품 10개",
    productCount: 10,
    events: [
      { category: "할인", periodLabel: "상시 체크", description: "소프트바와 프로틴바 세트 가격이 단품 대비 유리한 경우가 많습니다." },
      { category: "쿠폰", periodLabel: "수시 진행", description: "브랜드 자체 프로모션과 스마트스토어 쿠폰 여부를 같이 확인하는 편이 좋습니다." },
    ],
  },
  {
    brand: "닥터유",
    storeType: "자사몰",
    storeUrl: "https://dryoumall.com/",
    note: "현재 등록 제품 7개",
    productCount: 7,
    events: [
      { category: "할인", periodLabel: "상시 체크", description: "프로 바, 바이트, 너츠 라인별로 묶음 특가가 따로 열리는 편입니다." },
      { category: "증정", periodLabel: "수시 진행", description: "드링크와 동시 구매 시 증정형 기획전이 붙는지 함께 보는 편이 좋습니다." },
    ],
  },
  {
    brand: "프로틴방앗간",
    storeType: "공식몰",
    storeUrl: "https://proteinbangatgan.com/",
    note: "현재 등록 제품 4개",
    productCount: 4,
    events: [
      { category: "할인", periodLabel: "상시 체크", description: "한정 맛이나 시즌 구성은 공식몰 할인 반영이 빠른 편입니다." },
      { category: "쿠폰", periodLabel: "수시 진행", description: "신규 회원 쿠폰과 세트 할인 중 어떤 쪽이 유리한지 비교가 필요합니다." },
    ],
  },
  {
    brand: "켈로그",
    storeType: "공식 판매처 중심",
    storeUrl: "https://www.coupang.com/",
    note: "현재 등록 제품 4개",
    productCount: 4,
    events: [
      { category: "할인", periodLabel: "상시 체크", description: "묶음팩 할인과 대형몰 기획전 빈도가 높아 가격 변동이 잦습니다." },
      { category: "무료배송", periodLabel: "판매처별 상이", description: "대형 유통몰 기준 배송비 조건이 달라 최종가 비교가 중요합니다." },
    ],
  },
  {
    brand: "비에스엔",
    storeType: "공식 판매처 중심",
    storeUrl: "https://www.coupang.com/",
    note: "현재 등록 제품 3개",
    productCount: 3,
    events: [
      { category: "할인", periodLabel: "상시 체크", description: "해외 브랜드 특성상 입고 시점에 따라 가격 변동 폭이 큰 편입니다." },
      { category: "무료배송", periodLabel: "판매처별 상이", description: "로켓배송 여부와 병행수입 여부를 함께 확인하는 편이 안전합니다." },
    ],
  },
  {
    brand: "더단백",
    storeType: "네이버 스토어",
    storeUrl: "https://smartstore.naver.com/bingtft",
    note: "현재 등록 제품 3개",
    productCount: 3,
    events: [
      { category: "할인", periodLabel: "상시 체크", description: "크런치바와 마일드바 묶음 기획이 자주 열려 단가 차이가 납니다." },
      { category: "쿠폰", periodLabel: "수시 진행", description: "네이버 스토어 쿠폰을 적용하면 공식몰 대비 체감가가 더 내려가는 경우가 있습니다." },
    ],
  },
  {
    brand: "마이프로틴",
    storeType: "자사몰",
    storeUrl: "https://www.myprotein.co.kr/",
    note: "현재 등록 제품 3개",
    productCount: 3,
    events: [
      { category: "할인", periodLabel: "상시 체크", description: "할인 코드 중심 브랜드라 표기 할인율보다 실결제 할인 코드를 먼저 보는 편이 좋습니다." },
      { category: "무료배송", periodLabel: "조건부 상시", description: "무료배송 기준 금액과 할인코드 중복 여부를 같이 확인해야 합니다." },
    ],
  },
  {
    brand: "칼로바이",
    storeType: "자사몰",
    storeUrl: "https://www.calobye.shop/",
    note: "현재 등록 제품 1개",
    productCount: 1,
    events: [
      { category: "할인", periodLabel: "상시 체크", description: "프로틴바 단품보다 다른 간식류와 묶는 행사 구성이 자주 나옵니다." },
      { category: "무료배송", periodLabel: "조건부 상시", description: "장바구니 합산 금액으로 배송비를 넘기기 쉬운 편입니다." },
    ],
  },
  {
    brand: "롯데웰푸드",
    storeType: "자사몰",
    storeUrl: "https://www.lottefoodmall.com/",
    note: "현재 등록 제품 2개",
    productCount: 2,
    events: [
      { category: "할인", periodLabel: "상시 체크", description: "이지프로틴 라인은 롯데 계열몰 기획전 반영이 빠른 편입니다." },
      { category: "증정", periodLabel: "수시 진행", description: "세트 구매 사은 구성은 시즌별 변동이 있어 직접 확인이 필요합니다." },
    ],
  },
];

const rawShakeBrands: BrandCard[] = [
  {
    brand: "플라이밀",
    storeType: "자사몰",
    storeUrl: "https://flymill.co.kr/",
    note: "현재 등록 쉐이크 13개",
    productCount: 13,
    events: [
      { category: "할인", periodLabel: CHECKED_DATE_LABEL, description: "초코, 바나나, 딸기부터 쿠키앤크림·피스타치오까지 맛 구성이 넓어 단품보다 맛별 묶음 구성과 세트 가격을 먼저 보는 편이 좋습니다." },
      { category: "쿠폰", periodLabel: CHECKED_DATE_LABEL, description: "자사몰은 신규 회원 쿠폰과 기획전이 함께 붙는 경우가 있어 최종 결제 직전 적용 혜택을 다시 확인하는 편이 안전합니다." },
    ],
  },
  {
    brand: "랩노쉬",
    storeType: "자사몰",
    storeUrl: "https://labnosh.com/category/%EB%9E%A9%EB%85%B8%EC%89%AC/44/",
    note: "현재 등록 쉐이크 9개",
    productCount: 9,
    events: [
      { category: "할인", periodLabel: CHECKED_DATE_LABEL, description: "슬림쉐이크 세트 구성과 정기배송 할인 문구가 반복적으로 노출되는 편이라 단품보다 구성 가격을 같이 보는 편이 좋습니다." },
      { category: "무료배송", periodLabel: CHECKED_DATE_LABEL, description: "자사몰은 금액 조건 무료배송이 자주 붙어 소량보다 묶음 구매 체감가가 더 내려가는 구조가 많습니다." },
    ],
  },
  {
    brand: "단백하니",
    storeType: "공식몰",
    storeUrl: "https://dailyprotein.co.kr/",
    note: "현재 등록 쉐이크 3개",
    productCount: 3,
    events: [
      { category: "할인", periodLabel: CHECKED_DATE_LABEL, description: "시그니처, 초코, 말차 3종 중심으로 운영돼 맛별 묶음이나 세트 구성 가격을 먼저 보는 편이 좋습니다." },
      { category: "쿠폰", periodLabel: CHECKED_DATE_LABEL, description: "공식몰은 회원 전용 할인이나 장바구니 혜택이 붙는 시점이 있어 최종 결제 단계에서 할인 적용 여부를 다시 보는 편이 좋습니다." },
    ],
  },
  {
    brand: "프로티원",
    storeType: "공식몰",
    storeUrl: "https://proteone.kr/",
    note: "현재 등록 쉐이크 5개",
    productCount: 5,
    events: [
      { category: "할인", periodLabel: CHECKED_DATE_LABEL, description: "초코, 커피, 딸기, 흑임자, 곡물 5종 중심이라 맛별 구성과 저당 성향 제품 가격을 같이 보는 편이 좋습니다." },
      { category: "무료배송", periodLabel: CHECKED_DATE_LABEL, description: "공식몰은 박스 수와 구성에 따라 배송 혜택 체감이 달라 묶음 기준 최종가를 같이 보는 편이 안전합니다." },
    ],
  },
  {
    brand: "잇더핏",
    storeType: "자사몰",
    storeUrl: "https://itthefit.com/",
    note: "현재 등록 쉐이크 9개",
    productCount: 9,
    events: [
      { category: "할인", periodLabel: CHECKED_DATE_LABEL, description: "더블초코, 카페라떼, 쿠키앤크림, 미숫가루, 콘 등 맛 스펙트럼이 넓어 맛별 묶음 세트 체감가 차이가 큰 편입니다." },
      { category: "쿠폰", periodLabel: CHECKED_DATE_LABEL, description: "회원 쿠폰과 기획전 할인이 중복되는지 확인하면 실결제 체감가를 더 정확히 볼 수 있습니다." },
    ],
  },
  {
    brand: "올더배러",
    storeType: "자사몰",
    storeUrl: "https://allthebetter.co.kr/",
    note: "현재 등록 쉐이크 6개",
    productCount: 6,
    events: [
      { category: "할인", periodLabel: CHECKED_DATE_LABEL, description: "로우슈거 쉐이크 라인은 세트 할인과 브랜드 기획전이 자주 묶여 보여 카테고리 페이지 가격과 장바구니 가격을 같이 보는 편이 좋습니다." },
      { category: "무료배송", periodLabel: CHECKED_DATE_LABEL, description: "무료배송 기준 금액이 체감가에 미치는 영향이 커 소량 주문보다는 묶음 주문이 유리한 경우가 많습니다." },
    ],
  },
];

const yogurtBrands: BrandCard[] = [
  {
    brand: "그릭데이",
    storeType: "공식몰",
    storeUrl: "https://greekday.co.kr/",
    note: "현재 등록 제품 7개",
    productCount: 7,
    events: [
      { category: "할인", periodLabel: CHECKED_DATE_LABEL, description: "멤버십가와 정기배송 할인 문구가 함께 노출됩니다. 대용량과 소포장 모두 공식몰 기준가를 먼저 확인하는 편이 좋습니다." },
      { category: "무료배송", periodLabel: CHECKED_DATE_LABEL, description: "회원 30,000원 이상 무료배송 기준이 표시됩니다. 단체 정기배송은 무료배송 안내가 함께 노출됩니다." },
    ],
  },
  {
    brand: "YOZM",
    storeType: "공식몰",
    storeUrl: "https://yozm.co.kr/",
    note: "현재 등록 제품 3개",
    productCount: 3,
    events: [
      { category: "할인", periodLabel: CHECKED_DATE_LABEL, description: "정기배송 할인 옵션이 상품 페이지에 노출됩니다. 450g·800g 대용량은 정기배송 여부까지 같이 보는 편이 좋습니다." },
      { category: "무료배송", periodLabel: CHECKED_DATE_LABEL, description: "30,000원 이상 구매 시 무료배송 기준이 표시됩니다. 단품보다 합배송 시 체감가가 좋아집니다." },
    ],
  },
  {
    brand: "후디스",
    storeType: "자사몰",
    storeUrl: "https://foodismall.com/",
    note: "현재 등록 제품 4개",
    productCount: 4,
    events: [
      { category: "할인", periodLabel: CHECKED_DATE_LABEL, description: "회원 할인 판매가와 추가 할인 표시가 함께 노출됩니다. 그릭요거트 라인은 정기배송 할인 여부도 같이 확인하는 편이 좋습니다." },
      { category: "무료배송", periodLabel: CHECKED_DATE_LABEL, description: "20,000원 이상 구매 시 무료배송 기준이 표시됩니다. 단품보다 묶음 구매가 유리한 구조입니다." },
    ],
  },
  {
    brand: "상하목장",
    storeType: "자사몰",
    storeUrl: "https://direct.maeil.com/m/brand/sangha",
    note: "현재 등록 제품 5개",
    productCount: 5,
    events: [
      { category: "할인", periodLabel: CHECKED_DATE_LABEL, description: "브랜드관에서 80g 16개입과 2종 구성에 10% 할인가가 노출됩니다. 브랜드관 기준 특가 구성을 먼저 보는 편이 좋습니다." },
      { category: "쿠폰", periodLabel: CHECKED_DATE_LABEL, description: "상하목장 브랜드관에 셰프 쿠폰 노출이 확인됩니다. 상품별 적용 여부를 결제 전 다시 확인하는 편이 안전합니다." },
      { category: "무료배송", periodLabel: CHECKED_DATE_LABEL, description: "냉장 제품은 할인가 기준 15,000원 이상 무료배송 안내가 보입니다. 소용량은 합배송 기준을 같이 보는 편이 좋습니다." },
    ],
  },
  {
    brand: "매일 바이오",
    storeType: "자사몰",
    storeUrl: "https://direct.maeil.com/",
    note: "현재 등록 제품 14개",
    productCount: 14,
    events: [
      { category: "쿠폰", periodLabel: CHECKED_DATE_LABEL, description: "매일유업 직영몰은 웰컴쿠폰과 구매 적립 구조가 함께 노출됩니다. 신규 회원 조건과 재구매 조건을 같이 보는 편이 좋습니다." },
      { category: "무료배송", periodLabel: CHECKED_DATE_LABEL, description: "냉장 제품은 할인가 기준 15,000원 이상 무료배송 정책이 안내됩니다. to go·드링크·대용량을 합배송하면 체감가가 좋아집니다." },
    ],
  },
  {
    brand: "룩트",
    storeType: "공식몰",
    storeUrl: "https://lukt.co.kr/",
    note: "현재 등록 제품 4개",
    productCount: 4,
    events: [
      { category: "할인", periodLabel: CHECKED_DATE_LABEL, description: "멤버십 할인 문구와 SALE 배지가 함께 노출됩니다. 아이슬란딕 라인은 100g과 450g 가격 차이를 같이 보는 편이 좋습니다." },
      { category: "증정", periodLabel: CHECKED_DATE_LABEL, description: "네이버페이·톡체크아웃 간편구매가 같이 열려 있어 프로모션 연계 혜택이 붙는지 확인 가치가 있습니다." },
    ],
  },
];

const drinkBrands: BrandCard[] = rawDrinkBrands.map((brand) => ({
  ...brand,
  events: brand.events.map((event) => ({
    ...event,
    periodLabel: CHECKED_DATE_LABEL,
  })),
}));

const barBrands: BrandCard[] = rawBarBrands.map((brand) => ({
  ...brand,
  events: brand.events.map((event) => ({
    ...event,
    periodLabel: CHECKED_DATE_LABEL,
  })),
}));

const shakeBrands: BrandCard[] = rawShakeBrands.map((brand) => ({
  ...brand,
  events: brand.events.map((event) => ({
    ...event,
    periodLabel: CHECKED_DATE_LABEL,
  })),
}));

function getCounts(brands: BrandCard[]) {
  const allEvents = brands.flatMap((brand) => brand.events);
  return {
    total: allEvents.length,
    할인: allEvents.filter((event) => event.category === "할인").length,
    쿠폰: allEvents.filter((event) => event.category === "쿠폰").length,
    증정: allEvents.filter((event) => event.category === "증정").length,
    무료배송: allEvents.filter((event) => event.category === "무료배송").length,
  };
}

export default function EventsClient() {
  const [productType, setProductType] = useState<ProductType>("drink");
  const [activeFilter, setActiveFilter] = useState<FilterType>("전체");

  const brands =
    productType === "drink"
      ? drinkBrands
      : productType === "bar"
        ? barBrands
        : productType === "yogurt"
          ? yogurtBrands
          : shakeBrands;
  const counts = useMemo(() => getCounts(brands), [brands]);

  const filteredBrands = useMemo(() => {
    if (activeFilter === "전체") return brands;
    return brands
      .map((brand) => ({
        ...brand,
        events: brand.events.filter((event) => event.category === activeFilter),
      }))
      .filter((brand) => brand.events.length > 0);
  }, [activeFilter, brands]);

  const getCount = (key: FilterType) => (key === "전체" ? counts.total : counts[key as EventCategory]);

  return (
    <>
      <section
        className="w-full border-t border-b bg-[var(--hero-bg)]"
        style={{ borderColor: "var(--hero-border)" }}
      >
        <div className="mx-auto max-w-[1200px] px-4 py-4 md:px-6 md:py-5">
          <h1 className="text-2xl font-bold leading-tight text-[var(--foreground)] md:text-3xl">
            이벤트/핫딜
          </h1>
          <p className="mt-1 text-sm text-[var(--foreground-muted)]">
            단백질 브랜드의 자사몰·공식 스토어 혜택을 모았습니다. 정기배송·회원가입 혜택까지 직접 구매 전 여기서 먼저 확인하세요.
          </p>
        </div>
      </section>

      <main className="mx-auto max-w-[1200px] px-4 pb-12 md:px-6">
        <div className="flex gap-2 pt-5">
          {(["drink", "bar", "yogurt", "shake"] as const).map((type) => {
            const active = productType === type;
            const meta = PRODUCT_TYPE_META[type];
            return (
              <button
                key={type}
                type="button"
                onClick={() => {
                  setProductType(type);
                  setActiveFilter("전체");
                }}
                className="rounded-full px-4 py-2 text-sm font-semibold transition-colors"
                style={{
                  background: active ? "var(--accent)" : "#fff",
                  color: active ? "#fff" : "#6b6b6b",
                  border: active ? "1px solid var(--accent)" : "1px solid var(--border)",
                }}
              >
                {meta.label}
              </button>
            );
          })}
        </div>

        <div className="mt-4 flex gap-5 overflow-x-auto border-b border-[#e8e6e3]">
          {FILTER_TABS.map((tab) => {
            const active = activeFilter === tab.key;
            return (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveFilter(tab.key)}
                className="relative shrink-0 pb-3 text-sm font-semibold transition-colors"
                style={{ color: active ? "var(--accent)" : "#999" }}
              >
                {tab.emoji ? `${tab.emoji} ${tab.key}` : tab.key}
                <span className="ml-1 text-xs font-normal">{getCount(tab.key)}</span>
                {active ? (
                  <span
                    className="absolute bottom-0 left-0 right-0 h-[2px]"
                    style={{ background: "var(--accent)" }}
                  />
                ) : null}
              </button>
            );
          })}
        </div>

        <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredBrands.map((brand) => (
            <BrandEventCard key={brand.brand} brand={brand} productType={productType} />
          ))}
        </div>

        <p className="mt-10 text-center text-xs leading-5 text-[#8b8b8b]">
          이벤트와 배송 조건은 판매처 정책에 따라 수시로 바뀝니다. 최종 결제 전에는 브랜드 공식몰, 네이버 스토어,
          쿠팡 로켓배송 페이지에서 실시간 가격과 혜택을 다시 확인하는 것을 권장합니다.
        </p>
      </main>
    </>
  );
}

function BrandEventCard({ brand, productType }: { brand: BrandCard; productType: ProductType }) {
  const meta = PRODUCT_TYPE_META[productType];

  return (
    <div
      className="flex h-full min-h-[320px] flex-col overflow-hidden rounded-2xl border bg-[#fffdf8] shadow-[0_10px_24px_rgba(20,40,28,0.05)] transition-colors"
      style={{
        borderColor: meta.accentBorder,
        boxShadow: "0 12px 28px rgba(28, 52, 39, 0.06)",
      }}
    >
      <div className="h-1.5 w-full" style={{ background: meta.accentColor }} />
      <div>
        <div
          className="min-h-[132px] border-b px-5 py-4"
          style={{
            borderColor: meta.accentBorder,
            background: `linear-gradient(135deg, ${meta.accentBg} 0%, #fffdf8 100%)`,
          }}
        >
          <div className="flex items-center justify-between gap-3">
            <span
              className="rounded-md bg-white px-2 py-0.5 text-[11px] font-semibold tracking-wide"
              style={{ color: meta.accentColor }}
            >
              {meta.eyebrow}
            </span>
            <span
              className="rounded-full border bg-white px-2.5 py-1 text-[11px] font-semibold text-[#6f7f76]"
              style={{ borderColor: meta.accentBorder }}
            >
              제품 {brand.productCount}개
            </span>
          </div>

          <div className="mt-4 flex items-start gap-3">
            <span
              aria-hidden
              className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border bg-white text-lg"
              style={{ borderColor: meta.accentBorder }}
            >
              {meta.emoji}
            </span>
            <div className="min-w-0">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#6f7f76]">
                Brand
              </p>
              <h2 className="mt-1 text-lg font-bold" style={{ color: meta.accentColor }}>
                {brand.brand}
              </h2>
              <p className="mt-1 text-xs text-[#7a837d]">{brand.note}</p>
            </div>
          </div>

          <div className="mt-4">
            <span
              className="inline-flex rounded-full border px-2.5 py-1 text-[11px] font-medium"
              style={{
                borderColor: meta.accentBorder,
                background: "#fff",
                color: meta.accentColor,
              }}
            >
              {brand.storeType}
            </span>
          </div>
        </div>

        <ul className="space-y-3 px-5 pb-2 pt-4">
          {brand.events.map((event) => {
            const color = CATEGORY_COLOR[event.category];
            return (
              <li
                key={`${brand.brand}-${event.category}-${event.description}`}
                className="rounded-xl border border-[#edf2ed] bg-white px-3.5 py-3"
              >
                <div className="flex flex-wrap items-center gap-1.5">
                  <span
                    className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-semibold"
                    style={{
                      backgroundColor: color.bg,
                      color: color.text,
                      border: `1px solid ${color.border}`,
                    }}
                  >
                    {CATEGORY_EMOJI[event.category]} {event.category}
                  </span>
                  <span className="text-[11px] font-medium text-[#7a837d]">확인 시점: {event.periodLabel}</span>
                </div>
                <p className="mt-2 text-[13px] leading-6 text-[var(--foreground)]">{event.description}</p>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mt-auto px-5 pb-5 pt-3">
        <a
          href={brand.storeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center rounded-lg border bg-white py-2.5 text-xs font-semibold transition-colors"
          style={{
            borderColor: meta.accentBorder,
            color: meta.accentColor,
          }}
        >
          {brand.storeType === "네이버 스토어" ? "네이버 스토어 방문" : "판매처 방문"} →
        </a>
      </div>
    </div>
  );
}

