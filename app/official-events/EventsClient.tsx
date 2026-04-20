"use client";

import { useMemo, useState } from "react";
import barProductsData from "../data/barProductsData.json";
import drinkProductsData from "../data/drinkProductsData.json";
import shakeProductsData from "../data/shakeProductsData.json";
import yogurtProductsData from "../data/yogurtProductsData.json";

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

interface ProductLinkSource {
  brand: string;
  officialUrl?: string;
  naverUrl?: string;
  coupangUrl?: string;
}

function getStorePriorityLine(storeType: string) {
  if (storeType.includes("올리브영")) return "처음이면 올리브영에서 단품 테스트 후 박스 가격을 비교하는 편이 좋습니다.";
  if (storeType.includes("네이버")) return "네이버 브랜드관은 쿠폰과 장바구니 할인이 같이 붙는지 먼저 보는 편이 좋습니다.";
  if (storeType.includes("공식몰") || storeType.includes("자사몰")) return "공식몰은 회원가·정기배송·사은품이 붙는지 먼저 확인하는 편이 좋습니다.";
  return "판매처별 가격 차이가 커서 쿠폰, 배송비, 묶음가를 함께 보는 편이 좋습니다.";
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

const CHECKED_DATE_LABEL = "2026-04-20 확인";

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

const clampThreeLines = {
  display: "-webkit-box",
  WebkitLineClamp: 3,
  WebkitBoxOrient: "vertical" as const,
  overflow: "hidden",
};

const rawDrinkBrands: BrandCard[] = [
  {
    brand: "하이뮨",
    storeType: "자사몰",
    storeUrl: "https://foodismall.com/",
    note: "현재 등록 제품 15개",
    productCount: 15,
    events: [
      { category: "할인", periodLabel: "4월 봄 기획", description: "봄 시즌 기획전으로 프로틴 밸런스 라인 묶음가가 내려가는 경우가 있습니다. 회원 등급 추가 적립 여부도 함께 확인하는 편이 좋습니다." },
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
      { category: "할인", periodLabel: "4월 봄 기획", description: "봄 맞이 묶음 구성 특가가 열리는 시기입니다. 맛별 세트 할인가는 장바구니에서 다시 체크하는 편이 좋습니다." },
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
      { category: "할인", periodLabel: "4월 봄 기획", description: "봄 시즌 기획전에서 대용량 묶음 할인 폭이 커지는 편입니다. 어린이날 시즌 앞두고 선물 세트 구성도 노출 빈도가 높아집니다." },
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
      { category: "할인", periodLabel: "4월 봄 기획", description: "남양몰 봄 기획전으로 몬스터 43g·맥스 24g 대량 구매 가격이 내려가는 시기입니다." },
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
      { category: "할인", periodLabel: "4월 봄 기획", description: "대상웰라이프 공식몰 봄 기획전에서 올프로틴 라인 타임특가가 함께 열리는 경우가 있습니다." },
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
      { category: "할인", periodLabel: "4월 봄 기획", description: "48팩 이상 대용량 구성 특가가 봄 시즌에 더 자주 열리는 편이라 단가 차이를 같이 확인하는 게 좋습니다." },
    ],
  },
  {
    brand: "얼티브",
    storeType: "CJ더마켓",
    storeUrl: "https://www.cjthemarket.com/",
    note: "현재 등록 제품 6개",
    productCount: 6,
    events: [
      { category: "할인", periodLabel: "4월 봄 기획", description: "비건 라인업 중심 봄 기획전이 열리는 시기입니다. CJ더마켓 전체 프로모션과 묶이는지 먼저 보는 편이 좋습니다." },
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
      { category: "할인", periodLabel: "4월 봄 기획", description: "봄 시즌 재고 소진형 세일과 세트 특가 빈도가 높은 편입니다. 쉐이크 라인과 드링크 라인 교차 구성 할인도 같이 보는 편이 좋습니다." },
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
      { category: "할인", periodLabel: "4월 봄 기획", description: "드링크와 바를 함께 묶는 봄 시즌 세트 구성이 자주 열리는 시기입니다. 교차 구매 할인 여부를 먼저 확인하는 편이 좋습니다." },
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
      { category: "할인", periodLabel: "4월 봄 기획", description: "봄 기획전으로 프로틴 드링크·쉐이크 라인 묶음 특가가 열리는 편입니다. 공식몰 기준가를 먼저 확인하는 게 좋습니다." },
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
      { category: "할인", periodLabel: "4월 봄 기획", description: "맛별 가격 차이가 큰 편이라 쿠팡 로켓배송과 공식 수입 판매처를 함께 보는 편이 좋습니다. 봄 시즌 대량팩 묶음 할인 여부도 같이 확인하세요." },
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
      { category: "할인", periodLabel: "4월 봄 기획", description: "봄 기획전으로 소프트바·프로틴바 세트 할인가가 내려가는 시기입니다. 단품보다 묶음 구성 체감가를 먼저 보는 편이 좋습니다." },
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
      { category: "할인", periodLabel: "4월 봄 기획", description: "봄 시즌 프로 바·바이트·너츠 라인별 묶음 특가가 열리는 편입니다. 어린이날 시즌 앞두고 선물용 구성도 함께 보는 게 좋습니다." },
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
      { category: "할인", periodLabel: "4월 봄 기획", description: "봄 한정 맛이나 시즌 구성은 공식몰 할인 반영이 빠른 편입니다. 신맛 라인 등 시즌 한정 구성을 먼저 체크하는 편이 좋습니다." },
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
      { category: "할인", periodLabel: "4월 봄 기획", description: "봄 시즌 묶음팩 할인과 대형몰 기획전 빈도가 높아집니다. 단가 변동이 잦은 편이라 최종가 기준으로 비교하는 게 좋습니다." },
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
      { category: "할인", periodLabel: "4월 봄 기획", description: "봄 시즌 크런치바·마일드바 묶음 기획이 자주 열려 단가 차이가 납니다. 장바구니 쿠폰 적용 여부도 같이 보는 편이 좋습니다." },
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
      { category: "할인", periodLabel: "4월 봄 기획", description: "할인 코드 중심 브랜드라 봄 시즌 코드를 공식 SNS·뉴스레터에서 먼저 확인하는 편이 좋습니다. 표기 할인율보다 실결제가가 더 중요합니다." },
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
      { category: "할인", periodLabel: "4월 봄 기획", description: "봄 기획으로 프로틴바를 다른 간식류와 묶는 행사 구성이 나오는 시기입니다." },
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
      { category: "할인", periodLabel: "4월 봄 기획", description: "이지프로틴 라인은 롯데 계열몰 봄 기획전 반영이 빠른 편입니다. 어린이날 시즌 전 세트 구성 여부도 같이 확인하는 편이 좋습니다." },
      { category: "증정", periodLabel: "수시 진행", description: "세트 구매 사은 구성은 시즌별 변동이 있어 직접 확인이 필요합니다." },
    ],
  },
];

const rawShakeBrands: BrandCard[] = [
  {
    brand: "플라이밀",
    storeType: "네이버 쇼핑",
    storeUrl: "https://search.shopping.naver.com/search/all?query=%ED%94%8C%EB%9D%BC%EC%9D%B4%EB%B0%80%20%EB%8B%A8%EB%B0%B1%EC%A7%88%20%EC%89%90%EC%9D%B4%ED%81%AC",
    note: "현재 등록 쉐이크 13개",
    productCount: 13,
    events: [
      { category: "할인", periodLabel: CHECKED_DATE_LABEL, description: "봄 시즌 초코·바나나·딸기부터 쿠키앤크림·피스타치오까지 맛별 묶음 세트 할인가가 내려가는 시기입니다. 단품보다 구성 가격을 먼저 보는 편이 좋습니다." },
      { category: "쿠폰", periodLabel: CHECKED_DATE_LABEL, description: "네이버 쇼핑 기준으로 판매처별 쿠폰·배송 혜택을 비교하는 편이 안전합니다." },
    ],
  },
  {
    brand: "랩노쉬",
    storeType: "자사몰",
    storeUrl: "https://labnosh.com/category/%EB%9E%A9%EB%85%B8%EC%89%AC/44/",
    note: "현재 등록 쉐이크 9개",
    productCount: 9,
    events: [
      { category: "할인", periodLabel: CHECKED_DATE_LABEL, description: "봄 기획으로 슬림쉐이크 세트 구성 할인이 노출되는 편입니다. 단품보다 구성 가격을 같이 보는 편이 유리합니다." },
      { category: "무료배송", periodLabel: CHECKED_DATE_LABEL, description: "자사몰 금액 조건 무료배송이 자주 붙어 소량보다 묶음 구매 체감가가 더 내려가는 구조입니다." },
    ],
  },
  {
    brand: "단백하니",
    storeType: "올리브영 브랜드관",
    storeUrl: "https://m.oliveyoung.co.kr/m/mtn/brand/A017276",
    note: "현재 등록 쉐이크 3개",
    productCount: 3,
    events: [
      { category: "할인", periodLabel: CHECKED_DATE_LABEL, description: "4월 올리브영 봄 세일 기간에 브랜드전 적용 여부를 먼저 확인하는 편이 좋습니다. 앱 쿠폰과 중복 적용 가능한지도 같이 보세요." },
      { category: "쿠폰", periodLabel: CHECKED_DATE_LABEL, description: "브랜드관 진입 후 상품별 쿠폰 적용 범위가 다를 수 있어 장바구니 단계에서 최종 할인 반영 여부를 다시 확인하는 편이 안전합니다." },
    ],
  },
  {
    brand: "프로티원",
    storeType: "올리브영 브랜드관",
    storeUrl: "https://m.oliveyoung.co.kr/m/mtn/brand/A010952",
    note: "현재 등록 쉐이크 5개",
    productCount: 5,
    events: [
      { category: "할인", periodLabel: CHECKED_DATE_LABEL, description: "봄 올리브영 브랜드전에서 파우치형·대용량 구성 할인이 함께 노출되는 편입니다. 구성별 체감가를 먼저 비교하는 편이 좋습니다." },
      { category: "무료배송", periodLabel: CHECKED_DATE_LABEL, description: "브랜드관 내 일부 쉐이크 구성은 무료배송과 쿠폰이 함께 표시돼 박스 수에 따라 결제 금액 차이가 큽니다." },
    ],
  },
  {
    brand: "잇더핏",
    storeType: "네이버 쇼핑",
    storeUrl: "https://search.shopping.naver.com/search/all?query=%EC%9E%87%EB%8D%94%ED%95%8F%20%EB%8B%A8%EB%B0%B1%EC%A7%88%20%EC%89%90%EC%9D%B4%ED%81%AC",
    note: "현재 등록 쉐이크 9개",
    productCount: 9,
    events: [
      { category: "할인", periodLabel: CHECKED_DATE_LABEL, description: "봄 시즌 더블초코·카페라떼·쿠키앤크림·미숫가루·콘 등 맛별 묶음 세트 체감가 차이가 큰 편입니다. 네이버 쇼핑 기준 최저가를 먼저 비교하세요." },
      { category: "쿠폰", periodLabel: CHECKED_DATE_LABEL, description: "네이버 쇼핑 기준으로 쿠폰과 배송 혜택을 함께 비교하는 편이 안전합니다." },
    ],
  },
  {
    brand: "올더배러",
    storeType: "네이버 쇼핑",
    storeUrl: "https://search.shopping.naver.com/search/all?query=%EC%98%AC%EB%8D%94%EB%B0%B0%EB%9F%AC%20%EB%8B%A8%EB%B0%B1%EC%A7%88%20%EC%89%90%EC%9D%B4%ED%81%AC",
    note: "현재 등록 쉐이크 6개",
    productCount: 6,
    events: [
      { category: "할인", periodLabel: CHECKED_DATE_LABEL, description: "봄 시즌 로우슈거 라인 세트 할인과 브랜드 기획전이 묶이는 편입니다. 카테고리 페이지 가격과 장바구니 최종가를 같이 보는 편이 좋습니다." },
      { category: "무료배송", periodLabel: CHECKED_DATE_LABEL, description: "네이버 쇼핑 기준 배송비 포함 최종가를 같이 보는 편이 안전합니다." },
    ],
  },
];

const rawYogurtBrands: BrandCard[] = [
  {
    brand: "그릭데이",
    storeType: "공식몰",
    storeUrl: "https://greekday.co.kr/",
    note: "현재 등록 제품 7개",
    productCount: 7,
    events: [
      { category: "할인", periodLabel: CHECKED_DATE_LABEL, description: "봄 시즌 멤버십가·정기배송 할인 문구가 함께 노출되는 시기입니다. 대용량과 소포장 모두 공식몰 기준가를 먼저 확인하는 편이 좋습니다." },
      { category: "무료배송", periodLabel: CHECKED_DATE_LABEL, description: "회원 30,000원 이상 무료배송 기준이 표시됩니다. 어린이날 시즌 선물 구성 묶음 구매 시 체감가가 좋아집니다." },
    ],
  },
  {
    brand: "YOZM",
    storeType: "공식몰",
    storeUrl: "https://yozm.co.kr/",
    note: "현재 등록 제품 3개",
    productCount: 3,
    events: [
      { category: "할인", periodLabel: CHECKED_DATE_LABEL, description: "봄 기획으로 정기배송 할인 옵션이 상품 페이지에 노출됩니다. 450g·800g 대용량은 정기배송 여부까지 같이 보는 편이 좋습니다." },
      { category: "무료배송", periodLabel: CHECKED_DATE_LABEL, description: "30,000원 이상 구매 시 무료배송 기준이 표시됩니다. 봄 시즌 신규 쿠폰 여부도 같이 확인하는 편이 좋습니다." },
    ],
  },
  {
    brand: "후디스",
    storeType: "자사몰",
    storeUrl: "https://foodismall.com/",
    note: "현재 등록 제품 4개",
    productCount: 4,
    events: [
      { category: "할인", periodLabel: CHECKED_DATE_LABEL, description: "봄 시즌 회원 할인 판매가와 추가 할인이 함께 노출됩니다. 그릭요거트 라인은 정기배송 할인 여부도 같이 확인하는 편이 좋습니다." },
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
      { category: "할인", periodLabel: CHECKED_DATE_LABEL, description: "80g 16개입·2종 구성에 봄 시즌 할인가가 노출되는 편입니다. 브랜드관 기준 특가 구성을 먼저 보는 편이 좋습니다." },
      { category: "쿠폰", periodLabel: CHECKED_DATE_LABEL, description: "브랜드관 셰프 쿠폰 노출 여부를 확인하세요. 어린이날 전후로 추가 쿠폰 발급 여부도 같이 보는 편이 좋습니다." },
      { category: "무료배송", periodLabel: CHECKED_DATE_LABEL, description: "냉장 제품은 15,000원 이상 무료배송 안내가 보입니다. 소용량은 합배송 기준을 같이 보는 편이 좋습니다." },
    ],
  },
  {
    brand: "매일 바이오",
    storeType: "자사몰",
    storeUrl: "https://direct.maeil.com/",
    note: "현재 등록 제품 14개",
    productCount: 14,
    events: [
      { category: "쿠폰", periodLabel: CHECKED_DATE_LABEL, description: "봄 시즌 매일유업 직영몰 웰컴쿠폰과 구매 적립 구조가 함께 노출됩니다. 신규 회원 조건과 재구매 조건을 같이 보는 편이 좋습니다." },
      { category: "무료배송", periodLabel: CHECKED_DATE_LABEL, description: "냉장 제품 15,000원 이상 무료배송 정책이 안내됩니다. to go·드링크·대용량을 합배송하면 체감가가 좋아집니다." },
    ],
  },
  {
    brand: "룩트",
    storeType: "공식몰",
    storeUrl: "https://lukt.co.kr/",
    note: "현재 등록 제품 4개",
    productCount: 4,
    events: [
      { category: "할인", periodLabel: CHECKED_DATE_LABEL, description: "봄 시즌 멤버십 할인 문구와 SALE 배지가 함께 노출됩니다. 아이슬란딕 라인은 100g과 450g 가격 차이를 같이 보는 편이 좋습니다." },
      { category: "증정", periodLabel: CHECKED_DATE_LABEL, description: "봄 프로모션으로 네이버페이·톡체크아웃 연계 혜택이 붙는지 확인 가치가 있습니다. 4월 말~5월 초 증정 이벤트 여부도 같이 보세요." },
    ],
  },
];

const additionalDrinkBrands: BrandCard[] = [
  {
    brand: "오늘단백",
    storeType: "자사몰",
    storeUrl: "https://harimmall.com/category/%EC%98%A4%EB%8A%98%EB%8B%A8%EB%B0%B1/520/",
    note: "현재 등록 제품 3개",
    productCount: 3,
    events: [
      { category: "할인", periodLabel: CHECKED_DATE_LABEL, description: "봄 시즌 라떼형 3종 맛별 세트 구성과 박스 단위 가격을 먼저 비교하는 편이 좋습니다." },
      { category: "무료배송", periodLabel: CHECKED_DATE_LABEL, description: "하림몰 기준 합배송 조건을 넘기면 체감가 차이가 커져 단품보다 묶음 확인 가치가 높습니다." },
    ],
  },
  {
    brand: "연세유업",
    storeType: "자사몰",
    storeUrl: "https://yonseidairy.com/goods/goods_list.php?cateCd=022013",
    note: "현재 등록 제품 3개",
    productCount: 3,
    events: [
      { category: "할인", periodLabel: CHECKED_DATE_LABEL, description: "세브란스 A2 프로틴은 맛 수가 적어도 박스 구성 할인 여부에 따라 단가 차이가 분명한 편입니다." },
      { category: "무료배송", periodLabel: CHECKED_DATE_LABEL, description: "공식몰 카테고리 기준 배송비 조건과 박스 수량에 따른 실구매가를 함께 보는 편이 좋습니다." },
    ],
  },
  {
    brand: "오트몬드",
    storeType: "네이버 브랜드관",
    storeUrl: "https://brand.naver.com/woongjinfood/category/09ec7d4b0a5f4949b4b094b6fa0c368b?cp=2",
    note: "현재 등록 제품 3개",
    productCount: 3,
    events: [
      { category: "할인", periodLabel: CHECKED_DATE_LABEL, description: "초코, 쿠키앤크림, 고소한맛처럼 맛 수가 적어도 브랜드전이나 세트 노출 여부에 따라 가격 차이가 납니다." },
      { category: "쿠폰", periodLabel: CHECKED_DATE_LABEL, description: "네이버 브랜드관 쿠폰 반영 여부에 따라 단품보다 세트가 더 유리해지는 경우가 있습니다." },
    ],
  },
  {
    brand: "그린비아",
    storeType: "자사몰",
    storeUrl: "https://www.wellife.co.kr/categories/index/101003000000",
    note: "현재 등록 제품 2개",
    productCount: 2,
    events: [
      { category: "할인", periodLabel: CHECKED_DATE_LABEL, description: "프로틴밀 액티브는 맛 수는 적지만 대상웰라이프 기획전 반영 여부에 따라 박스 단가 차이가 납니다." },
      { category: "무료배송", periodLabel: CHECKED_DATE_LABEL, description: "웰라이프 묶음 합산 기준으로 배송비 조건을 넘기기 쉬운 편이라 장바구니 총액을 같이 보는 편이 좋습니다." },
    ],
  },
  {
    brand: "롯데웰푸드",
    storeType: "자사몰",
    storeUrl: "https://www.lottefoodmall.com/?act=main.pasteur",
    note: "현재 등록 제품 2개",
    productCount: 2,
    events: [
      { category: "할인", periodLabel: CHECKED_DATE_LABEL, description: "이지프로틴 저당 라인은 맛 수는 적어도 브랜드 기획전 반영 빈도가 있어 단품보다 박스 가격을 먼저 보는 편이 좋습니다." },
      { category: "증정", periodLabel: CHECKED_DATE_LABEL, description: "롯데 계열몰은 세트 사은 구성이 붙는 경우가 있어 결제 직전 혜택 문구를 다시 확인하는 편이 안전합니다." },
    ],
  },
  {
    brand: "서울우유",
    storeType: "네이버 브랜드관",
    storeUrl: "https://brand.naver.com/seoulmilk/category/e086f24d6e724ea88028fd47264c1936?cp=1",
    note: "현재 등록 제품 2개",
    productCount: 2,
    events: [
      { category: "할인", periodLabel: CHECKED_DATE_LABEL, description: "프로틴 에너지는 커피와 초콜릿 두 축이라 묶음 판매 여부에 따라 체감가가 달라집니다." },
      { category: "쿠폰", periodLabel: CHECKED_DATE_LABEL, description: "네이버 브랜드관 쿠폰과 배송 혜택이 함께 붙는지 확인하는 편이 좋습니다." },
    ],
  },
  {
    brand: "세븐일레븐",
    storeType: "공식 판매처",
    storeUrl: "https://www.7-eleven.co.kr/",
    note: "현재 등록 제품 2개",
    productCount: 2,
    events: [
      { category: "할인", periodLabel: CHECKED_DATE_LABEL, description: "편의점 단독 상품 성격이 강해 온라인 판매처보다 오프라인 행사나 편의점 증정 행사를 같이 보는 편이 좋습니다." },
      { category: "증정", periodLabel: CHECKED_DATE_LABEL, description: "1+1, 2+1 같은 편의점형 증정 이벤트가 붙는지 수시로 확인 가치가 있습니다." },
    ],
  },
  {
    brand: "솔브앤고",
    storeType: "네이버 브랜드관",
    storeUrl: "https://brand.naver.com/dcfwithedaymall/category/d6ef46e43ee04512bfa7eae66afb50ad?cp=1",
    note: "현재 등록 제품 2개",
    productCount: 2,
    events: [
      { category: "할인", periodLabel: CHECKED_DATE_LABEL, description: "프로타민 라인은 맛 수가 적어도 네이버 브랜드관 할인 반영 여부에 따라 체감가 차이가 납니다." },
      { category: "쿠폰", periodLabel: CHECKED_DATE_LABEL, description: "브랜드관 쿠폰 적용 여부와 배송비 포함 최종가를 함께 확인하는 편이 좋습니다." },
    ],
  },
  {
    brand: "함소아제약",
    storeType: "자사몰",
    storeUrl: "https://www.hamsoamall.co.kr/",
    note: "현재 등록 제품 1개",
    productCount: 1,
    events: [
      { category: "할인", periodLabel: CHECKED_DATE_LABEL, description: "미니언즈 프로틴액트는 단일 SKU라 자사몰 행사나 키즈 라인 묶음 기획 여부를 먼저 보는 편이 좋습니다." },
      { category: "무료배송", periodLabel: CHECKED_DATE_LABEL, description: "단품보다는 자사몰 합배송 조건을 함께 확인해야 최종가 판단이 쉽습니다." },
    ],
  },
];

const additionalBarBrands: BrandCard[] = [
  { brand: "소이조이", storeType: "네이버 브랜드관", storeUrl: "https://brand.naver.com/soyjoy", note: "현재 등록 제품 8개", productCount: 8, events: [{ category: "할인", periodLabel: CHECKED_DATE_LABEL, description: "8종 라인업이라 맛별 묶음과 박스 구성을 먼저 비교하는 편이 좋습니다." }, { category: "쿠폰", periodLabel: CHECKED_DATE_LABEL, description: "네이버 브랜드관 쿠폰과 판매처별 묶음 가격이 함께 달라질 수 있어 최종가 확인이 필요합니다." }] },
  { brand: "빼바", storeType: "네이버 브랜드관", storeUrl: "https://brand.naver.com/healthyplace/category/3b36ce60b9a9432496484c1ee5855d0c?cp=1", note: "현재 등록 제품 4개", productCount: 4, events: [{ category: "할인", periodLabel: CHECKED_DATE_LABEL, description: "리얼초코 프로틴바 4종은 맛별 재고와 세트 구성에 따라 체감가 차이가 큽니다." }, { category: "쿠폰", periodLabel: CHECKED_DATE_LABEL, description: "브랜드관 쿠폰과 쿠팡 단품가를 함께 비교하면 실구매가 판단이 쉬워집니다." }] },
  { brand: "CJ제일제당", storeType: "CJ더마켓", storeUrl: "https://www.cjthemarket.com/pc/search?beforeAction=%2Fpc%2Fsearch%3Fwid1%3Dgnb_search&sort=RANK&collection=ALL&range=A&searchAction=D&query=%ED%94%84%EB%A1%9C%ED%8B%B4%EB%B0%94", note: "현재 등록 제품 2개", productCount: 2, events: [{ category: "할인", periodLabel: CHECKED_DATE_LABEL, description: "밸런스밀 프로틴바는 CJ더마켓 행사와 장바구니 쿠폰 적용 여부를 먼저 보는 편이 좋습니다." }, { category: "무료배송", periodLabel: CHECKED_DATE_LABEL, description: "CJ더마켓 합배송 기준과 묶음 구성을 함께 확인하는 편이 좋습니다." }] },
  { brand: "마켓오네이처", storeType: "공식 판매처", storeUrl: "https://www.coupang.com/", note: "현재 등록 제품 1개", productCount: 1, events: [{ category: "할인", periodLabel: CHECKED_DATE_LABEL, description: "단일 SKU라 쿠팡과 네이버 검색 노출가 차이가 바로 체감가로 이어집니다." }, { category: "무료배송", periodLabel: CHECKED_DATE_LABEL, description: "배송비 포함 최종가와 묶음 수량을 함께 보는 편이 좋습니다." }] },
  { brand: "단백하니", storeType: "올리브영 브랜드관", storeUrl: "https://m.oliveyoung.co.kr/m/mtn/brand/A017276", note: "현재 등록 제품 5개", productCount: 5, events: [{ category: "할인", periodLabel: CHECKED_DATE_LABEL, description: "올영 브랜드전과 묶음 구성에 따라 바 단가 차이가 커지는 편입니다." }, { category: "쿠폰", periodLabel: CHECKED_DATE_LABEL, description: "브랜드관 쿠폰과 장바구니 할인 중복 여부를 결제 직전에 확인하는 편이 좋습니다." }] },
  { brand: "랩노쉬", storeType: "자사몰", storeUrl: "https://labnosh.com/category/%EB%9E%A9%EB%85%B8%EC%89%AC/44/", note: "현재 등록 제품 5개", productCount: 5, events: [{ category: "할인", periodLabel: CHECKED_DATE_LABEL, description: "푸드바는 세트 할인과 맛별 재고 소진형 세일이 자주 보여 단품보다 묶음 가격 비교가 중요합니다." }, { category: "무료배송", periodLabel: CHECKED_DATE_LABEL, description: "자사몰은 금액 조건 무료배송과 함께 보이는 경우가 많아 합배송 기준을 같이 보는 편이 좋습니다." }] },
  { brand: "오늘단백", storeType: "네이버 브랜드관", storeUrl: "https://brand.naver.com/harim/category/1a6d3a6007e143a59ecb3ae9b3418fc2?cp=2", note: "현재 등록 제품 4개", productCount: 4, events: [{ category: "할인", periodLabel: CHECKED_DATE_LABEL, description: "밀크초코 라인 4종은 맛별 세트 가격 차이가 있어 브랜드관 기준 비교가 효율적입니다." }, { category: "쿠폰", periodLabel: CHECKED_DATE_LABEL, description: "네이버 브랜드관 쿠폰과 적립을 함께 반영하면 체감가가 더 내려갈 수 있습니다." }] },
  { brand: "셀렉스", storeType: "네이버 브랜드관", storeUrl: "https://brand.naver.com/selex/category/85709825a6ff41b7bfdb4b6dbd205dd0?cp=1", note: "현재 등록 제품 2개", productCount: 2, events: [{ category: "할인", periodLabel: CHECKED_DATE_LABEL, description: "셀렉스 바는 SKU 수는 적지만 브랜드전 여부에 따라 묶음 체감가가 달라집니다." }, { category: "쿠폰", periodLabel: CHECKED_DATE_LABEL, description: "브랜드관 쿠폰과 무료배송 조건을 함께 확인하는 편이 좋습니다." }] },
  { brand: "커클랜드", storeType: "공식 판매처", storeUrl: "https://www.costco.co.kr/", note: "현재 등록 제품 2개", productCount: 2, events: [{ category: "할인", periodLabel: CHECKED_DATE_LABEL, description: "대용량 박스 판매 비중이 높아 행사 시점별 단가 차이가 큰 편입니다." }, { category: "무료배송", periodLabel: CHECKED_DATE_LABEL, description: "판매처별 배송 조건이 달라 박스 단위 실구매가 비교가 중요합니다." }] },
  { brand: "포스트", storeType: "자사몰", storeUrl: "https://www.postmall.co.kr/", note: "현재 등록 제품 2개", productCount: 2, events: [{ category: "할인", periodLabel: CHECKED_DATE_LABEL, description: "프로틴 그래놀라바는 프로모션이 붙을 때 묶음 단가 차이가 분명해집니다." }, { category: "무료배송", periodLabel: CHECKED_DATE_LABEL, description: "자사몰 합배송 기준을 함께 보면 체감가 판단이 쉬워집니다." }] },
  { brand: "온단백", storeType: "자사몰", storeUrl: "https://dailyprotein.co.kr/", note: "현재 등록 제품 2개", productCount: 2, events: [{ category: "할인", periodLabel: CHECKED_DATE_LABEL, description: "소수 SKU 중심이라 자사몰 행사 반영 여부에 따라 체감가 차이가 커집니다." }, { category: "무료배송", periodLabel: CHECKED_DATE_LABEL, description: "합배송 조건과 세트 구성을 함께 보는 편이 좋습니다." }] },
  { brand: "올가니카", storeType: "공식몰", storeUrl: "https://www.organica.co.kr/", note: "현재 등록 제품 2개", productCount: 2, events: [{ category: "할인", periodLabel: CHECKED_DATE_LABEL, description: "간식형 라인은 기획전 반영 여부에 따라 단가 차이가 자주 납니다." }, { category: "무료배송", periodLabel: CHECKED_DATE_LABEL, description: "공식몰 배송 조건과 묶음 구성을 같이 확인하는 편이 좋습니다." }] },
  { brand: "곰곰", storeType: "쿠팡", storeUrl: "https://www.coupang.com/", note: "현재 등록 제품 1개", productCount: 1, events: [{ category: "할인", periodLabel: CHECKED_DATE_LABEL, description: "단일 SKU라도 쿠팡 판매처와 재고 상황에 따라 노출가 차이가 생깁니다." }, { category: "무료배송", periodLabel: CHECKED_DATE_LABEL, description: "로켓배송 여부와 배송비 조건을 함께 보는 편이 좋습니다." }] },
  { brand: "노브랜드", storeType: "공식 판매처", storeUrl: "https://emart.ssg.com/", note: "현재 등록 제품 2개", productCount: 2, events: [{ category: "할인", periodLabel: CHECKED_DATE_LABEL, description: "이마트 계열 행사 주기에 따라 체감가 차이가 커져 행사 시점 체크 가치가 높습니다." }, { category: "증정", periodLabel: CHECKED_DATE_LABEL, description: "대형마트형 증정 행사나 묶음 구성이 붙는지 같이 보는 편이 좋습니다." }] },
  { brand: "마이밀", storeType: "자사몰", storeUrl: "https://www.wellife.co.kr/categories/index/102000000000", note: "현재 등록 제품 1개", productCount: 1, events: [{ category: "할인", periodLabel: CHECKED_DATE_LABEL, description: "대상웰라이프 기획전 반영 여부에 따라 단일 바 SKU도 가격 차이가 생깁니다." }, { category: "무료배송", periodLabel: CHECKED_DATE_LABEL, description: "웰라이프 다른 품목과 합배송 시 체감가가 내려가는 구조를 같이 보는 편이 좋습니다." }] },
  { brand: "씨알로", storeType: "공식 판매처", storeUrl: "https://www.coupang.com/", note: "현재 등록 제품 1개", productCount: 1, events: [{ category: "할인", periodLabel: CHECKED_DATE_LABEL, description: "소수 SKU 중심이라 입점몰 기획전 여부에 따라 가격이 달라집니다." }, { category: "무료배송", periodLabel: CHECKED_DATE_LABEL, description: "판매처별 배송 조건을 포함해 최종가를 같이 보는 편이 좋습니다." }] },
  { brand: "크라운", storeType: "공식몰", storeUrl: "https://www.crown.co.kr/", note: "현재 등록 제품 1개", productCount: 1, events: [{ category: "할인", periodLabel: CHECKED_DATE_LABEL, description: "제과 브랜드 행사 주기에 따라 단일 SKU도 체감가가 달라질 수 있습니다." }, { category: "증정", periodLabel: CHECKED_DATE_LABEL, description: "대형 유통몰 중심 사은 구성 여부를 함께 확인하는 편이 좋습니다." }] },
  { brand: "하이뮨", storeType: "자사몰", storeUrl: "https://foodismall.com/", note: "현재 등록 제품 1개", productCount: 1, events: [{ category: "할인", periodLabel: CHECKED_DATE_LABEL, description: "식품몰 기획전과 회원가가 함께 붙는지 보면 단일 바 SKU도 체감가 차이가 납니다." }, { category: "무료배송", periodLabel: CHECKED_DATE_LABEL, description: "푸디스몰 합배송 기준을 같이 보는 편이 좋습니다." }] },
  { brand: "힘내고", storeType: "자사몰", storeUrl: "https://dailyprotein.co.kr/", note: "현재 등록 제품 1개", productCount: 1, events: [{ category: "할인", periodLabel: CHECKED_DATE_LABEL, description: "소수 SKU라 자사몰 할인 반영 여부에 따라 가격 차이가 바로 드러납니다." }, { category: "무료배송", periodLabel: CHECKED_DATE_LABEL, description: "단품보다 합배송 기준을 함께 확인하는 편이 좋습니다." }] },
];

const additionalYogurtBrands: BrandCard[] = [
  { brand: "덴마크", storeType: "네이버 브랜드관", storeUrl: "https://brand.naver.com/denmark/category/67b8ab52f4674b2f88a351f04949ca15?cp=1", note: "현재 등록 제품 1개", productCount: 1, events: [{ category: "할인", periodLabel: CHECKED_DATE_LABEL, description: "하이 그릭요거트는 냉장 제품이라 브랜드관 할인과 배송 조건을 같이 확인하는 편이 좋습니다." }, { category: "쿠폰", periodLabel: CHECKED_DATE_LABEL, description: "네이버 브랜드관 쿠폰과 장바구니 최종가를 결제 직전에 다시 보는 편이 안전합니다." }] },
  { brand: "커클랜드", storeType: "공식 판매처", storeUrl: "https://www.coupang.com/", note: "현재 등록 제품 1개", productCount: 1, events: [{ category: "할인", periodLabel: CHECKED_DATE_LABEL, description: "대용량 그릭요거트는 판매처별 단가와 재고 상황에 따라 가격 차이가 큽니다." }, { category: "무료배송", periodLabel: CHECKED_DATE_LABEL, description: "냉장 배송비 포함 최종가를 기준으로 비교하는 편이 좋습니다." }] },
  { brand: "요플레", storeType: "공식 판매처", storeUrl: "https://www.coupang.com/", note: "현재 등록 제품 5개", productCount: 5, events: [{ category: "할인", periodLabel: CHECKED_DATE_LABEL, description: "프로틴·맥스 라인은 대형 유통몰 행사 빈도가 있어 묶음가 차이를 먼저 보는 편이 좋습니다." }, { category: "무료배송", periodLabel: CHECKED_DATE_LABEL, description: "냉장 제품 특성상 배송비 포함 최종가를 같이 봐야 체감가 판단이 쉽습니다." }] },
  { brand: "요프로", storeType: "공식 판매처", storeUrl: "https://www.coupang.com/", note: "현재 등록 제품 2개", productCount: 2, events: [{ category: "할인", periodLabel: CHECKED_DATE_LABEL, description: "플레인과 블루베리 정도로 SKU가 적어도 행사 시점별 묶음가 차이가 있습니다." }, { category: "무료배송", periodLabel: CHECKED_DATE_LABEL, description: "냉장 배송 조건과 묶음 수량을 함께 보는 편이 좋습니다." }] },
  { brand: "풀무원다논", storeType: "자사몰", storeUrl: "https://shop.pulmuone.com/", note: "현재 등록 제품 1개", productCount: 1, events: [{ category: "할인", periodLabel: CHECKED_DATE_LABEL, description: "소수 SKU라 자사몰 또는 입점몰 프로모션 반영 여부를 먼저 확인하는 편이 좋습니다." }, { category: "무료배송", periodLabel: CHECKED_DATE_LABEL, description: "냉장 합배송 기준을 포함해 최종가를 보는 편이 안전합니다." }] },
];

const additionalShakeBrands: BrandCard[] = [
  { brand: "바지오", storeType: "네이버 스토어", storeUrl: "https://smartstore.naver.com/bbagio/category/d890334c286d4920bbc0c2c0eb8ffd11?cp=1", note: "현재 등록 쉐이크 7개", productCount: 7, events: [{ category: "할인", periodLabel: CHECKED_DATE_LABEL, description: "쉐이크얌 7종은 맛별 세트와 스마트스토어 행사 여부에 따라 박스 단가 차이가 큽니다." }, { category: "쿠폰", periodLabel: CHECKED_DATE_LABEL, description: "네이버 스토어 쿠폰과 쿠팡 단품가를 함께 비교하면 실구매가 판단이 쉬워집니다." }] },
  { brand: "쉐이크베이비", storeType: "네이버 브랜드관", storeUrl: "https://brand.naver.com/shakebaby/category/177bfd2e1aef4cddb4791fbb385ad53e?cp=1", note: "현재 등록 쉐이크 5개", productCount: 5, events: [{ category: "할인", periodLabel: CHECKED_DATE_LABEL, description: "5종 맛 구성은 박스/맛별 세트 할인 여부에 따라 체감가가 달라집니다." }, { category: "쿠폰", periodLabel: CHECKED_DATE_LABEL, description: "브랜드관 쿠폰과 배송 혜택이 함께 적용되는지 장바구니에서 다시 보는 편이 좋습니다." }] },
  { brand: "크런틴", storeType: "네이버 스토어", storeUrl: "https://smartstore.naver.com/cruntin/category/5d567d55118a40f29920d1694d67b18c?cp=1", note: "현재 등록 쉐이크 4개", productCount: 4, events: [{ category: "할인", periodLabel: CHECKED_DATE_LABEL, description: "크런치 토핑형 쉐이크는 맛별 세트와 판매처별 재고에 따라 노출가가 달라집니다." }, { category: "쿠폰", periodLabel: CHECKED_DATE_LABEL, description: "스마트스토어 쿠폰과 쿠팡 단품가를 같이 비교하는 편이 좋습니다." }] },
  { brand: "프롬잇", storeType: "올리브영 브랜드관", storeUrl: "https://www.oliveyoung.co.kr/store/display/getBrandShopDetail.do?onlBrndCd=A003607", note: "현재 등록 쉐이크 3개", productCount: 3, events: [{ category: "할인", periodLabel: CHECKED_DATE_LABEL, description: "올리브영 브랜드관 행사와 단품 테스트 가격을 먼저 확인하는 편이 좋습니다." }, { category: "쿠폰", periodLabel: CHECKED_DATE_LABEL, description: "올영세일과 상품별 쿠폰 적용 범위를 장바구니에서 다시 확인하는 편이 안전합니다." }] },
  { brand: "꼬박꼬밥", storeType: "공식 판매처", storeUrl: "https://www.coupang.com/", note: "현재 등록 쉐이크 6개", productCount: 6, events: [{ category: "할인", periodLabel: CHECKED_DATE_LABEL, description: "고단저당 라인은 맛 수가 다양해 박스 구성과 판매처별 세트가 차이를 만듭니다." }, { category: "무료배송", periodLabel: CHECKED_DATE_LABEL, description: "박스 수량과 배송 조건을 함께 비교하는 편이 좋습니다." }] },
  { brand: "더단백", storeType: "네이버 브랜드관", storeUrl: "https://brand.naver.com/binggrae/category/54e40c847f15417fae9351c9478ee909?cp=1", note: "현재 등록 쉐이크 2개", productCount: 2, events: [{ category: "할인", periodLabel: CHECKED_DATE_LABEL, description: "파우더형 2종이라 브랜드관 할인 반영 여부가 체감가에 바로 드러납니다." }, { category: "쿠폰", periodLabel: CHECKED_DATE_LABEL, description: "브랜드관 쿠폰과 배송 혜택을 함께 확인하는 편이 좋습니다." }] },
  { brand: "룩트", storeType: "공식몰", storeUrl: "https://lukt.co.kr/26", note: "현재 등록 쉐이크 3개", productCount: 3, events: [{ category: "할인", periodLabel: CHECKED_DATE_LABEL, description: "식사대용 계열은 멤버십 할인과 정기배송 문구를 같이 보는 편이 좋습니다." }, { category: "무료배송", periodLabel: CHECKED_DATE_LABEL, description: "공식몰 기준 배송 조건과 세트 구성을 함께 확인하는 편이 좋습니다." }] },
  { brand: "밀잇", storeType: "공식 판매처", storeUrl: "https://www.coupang.com/", note: "현재 등록 쉐이크 7개", productCount: 7, events: [{ category: "할인", periodLabel: CHECKED_DATE_LABEL, description: "맛 수가 많은 편이라 행사 시점에는 단품보다 혼합 세트 체감가 차이가 커집니다." }, { category: "무료배송", periodLabel: CHECKED_DATE_LABEL, description: "박스 수량과 판매처별 배송 조건을 함께 보는 편이 좋습니다." }] },
  { brand: "베노프", storeType: "공식몰", storeUrl: "https://benope.com/", note: "현재 등록 쉐이크 2개", productCount: 2, events: [{ category: "할인", periodLabel: CHECKED_DATE_LABEL, description: "적은 SKU라도 자사몰 행사 반영 여부에 따라 세트 가격 차이가 분명합니다." }, { category: "쿠폰", periodLabel: CHECKED_DATE_LABEL, description: "자사몰 쿠폰과 네이버 판매처 혜택 중 어느 쪽이 유리한지 같이 보는 편이 좋습니다." }] },
  { brand: "혜인담", storeType: "공식몰", storeUrl: "https://www.haeindam.com/", note: "현재 등록 쉐이크 4개", productCount: 4, events: [{ category: "할인", periodLabel: CHECKED_DATE_LABEL, description: "곡물형 라인은 묶음 구성과 브랜드 기획전 여부에 따라 체감가가 달라집니다." }, { category: "무료배송", periodLabel: CHECKED_DATE_LABEL, description: "공식몰 배송 조건과 박스 구성을 함께 보는 편이 좋습니다." }] },
];

const PRODUCT_LINK_SOURCES: Record<ProductType, ProductLinkSource[]> = {
  drink: drinkProductsData as ProductLinkSource[],
  bar: barProductsData as ProductLinkSource[],
  yogurt: yogurtProductsData as ProductLinkSource[],
  shake: shakeProductsData as ProductLinkSource[],
};

function getMostCommonUrl(products: ProductLinkSource[], key: keyof ProductLinkSource) {
  const counts = new Map<string, number>();

  for (const product of products) {
    const value = product[key];
    if (!value || value === "#") continue;
    counts.set(value, (counts.get(value) ?? 0) + 1);
  }

  return [...counts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? "";
}

function classifyStoreUrl(url: string) {
  if (!url || url === "#") return { score: 0, kind: "missing" as const };

  try {
    const parsed = new URL(url);
    const { hostname, pathname, searchParams } = parsed;
    const lowerPath = pathname.toLowerCase();

    if (hostname.includes("coupang.com")) {
      if (
        lowerPath.includes("/vp/products/") &&
        searchParams.get("itemId") &&
        searchParams.get("vendorItemId")
      ) {
        return { score: 88, kind: "product" as const };
      }
      return { score: 35, kind: "generic" as const };
    }

    if (hostname.includes("search.shopping.naver.com")) {
      return { score: 28, kind: "search" as const };
    }

    if (hostname.includes("brand.naver.com") || hostname.includes("smartstore.naver.com")) {
      if (lowerPath.includes("/products/")) return { score: 82, kind: "product" as const };
      if (lowerPath.includes("/category/")) return { score: 72, kind: "category" as const };
      return { score: 55, kind: "brand" as const };
    }

    if (
      lowerPath.includes("/product/") ||
      lowerPath.includes("/products/view/") ||
      lowerPath.includes("/products/") ||
      lowerPath.includes("/goods/view") ||
      lowerPath.includes("/item/")
    ) {
      return { score: 90, kind: "product" as const };
    }

    if (
      lowerPath.includes("/category/") ||
      lowerPath.includes("/categories/") ||
      lowerPath.includes("/goods/goods_list.php") ||
      lowerPath.includes("/list.html")
    ) {
      return { score: 75, kind: "category" as const };
    }

    if (
      lowerPath === "/" ||
      lowerPath === "" ||
      lowerPath === "/index.html" ||
      lowerPath === "/index.php"
    ) {
      return { score: 20, kind: "homepage" as const };
    }

    return { score: 50, kind: "brand" as const };
  } catch {
    return { score: 0, kind: "invalid" as const };
  }
}

function chooseBestStoreUrl(products: ProductLinkSource[]) {
  const scores = new Map<string, { score: number; count: number }>();

  for (const product of products) {
    for (const candidate of [product.officialUrl, product.naverUrl, product.coupangUrl]) {
      if (!candidate || candidate === "#") continue;

      const { score } = classifyStoreUrl(candidate);
      const current = scores.get(candidate);
      if (!current) {
        scores.set(candidate, { score, count: 1 });
        continue;
      }

      scores.set(candidate, {
        score: Math.max(current.score, score),
        count: current.count + 1,
      });
    }
  }

  return [...scores.entries()].sort((a, b) => {
    const scoreDiff = b[1].score - a[1].score;
    if (scoreDiff !== 0) return scoreDiff;
    return b[1].count - a[1].count;
  })[0]?.[0] ?? "";
}

function inferStoreType(storeUrl: string) {
  if (!storeUrl || storeUrl === "#") return "공식 판매처";

  try {
    const { hostname } = new URL(storeUrl);

    if (hostname.includes("smartstore.naver.com")) return "네이버 스토어";
    if (hostname.includes("brand.naver.com")) return "네이버 브랜드관";
    if (hostname.includes("search.shopping.naver.com")) return "네이버 쇼핑";
    if (hostname.includes("oliveyoung.co.kr")) return "올리브영 브랜드관";
    if (hostname.includes("coupang.com")) return "쿠팡";
    if (
      hostname.includes("wellife.co.kr") ||
      hostname.includes("foodismall.com") ||
      hostname.includes("labnosh.com") ||
      hostname.includes("harimmall.com") ||
      hostname.includes("selexmall.com") ||
      hostname.includes("dryoumall.com")
    ) {
      return "자사몰";
    }

    return "공식몰";
  } catch {
    return "공식 판매처";
  }
}

function buildGenericEvents(brand: string, storeType: string): BrandEvent[] {
  if (storeType.includes("네이버") || storeType.includes("올리브영")) {
    return [
      {
        category: "할인",
        periodLabel: CHECKED_DATE_LABEL,
        description: `${brand} 라인은 ${storeType} 기획전과 묶음 구성에 따라 체감가 차이가 자주 납니다.`,
      },
      {
        category: "쿠폰",
        periodLabel: CHECKED_DATE_LABEL,
        description: `${storeType} 쿠폰과 장바구니 할인이 함께 붙는지 결제 직전에 확인하는 편이 좋습니다.`,
      },
    ];
  }

  if (storeType === "쿠팡") {
    return [
      {
        category: "할인",
        periodLabel: CHECKED_DATE_LABEL,
        description: `${brand} 상품은 판매처와 묶음 수량에 따라 쿠팡 노출가 차이가 큰 편입니다.`,
      },
      {
        category: "무료배송",
        periodLabel: CHECKED_DATE_LABEL,
        description: `로켓배송 여부와 무료배송 조건에 따라 최종 결제 금액 차이가 생길 수 있습니다.`,
      },
    ];
  }

  return [
    {
      category: "할인",
      periodLabel: CHECKED_DATE_LABEL,
      description: `${brand} 라인은 자사몰 기획전과 세트 할인 반영 여부를 먼저 확인하는 편이 좋습니다.`,
    },
    {
      category: "무료배송",
      periodLabel: CHECKED_DATE_LABEL,
      description: `${storeType} 기준 배송비 조건과 합배송 기준이 자주 함께 붙어 최종가 차이가 생길 수 있습니다.`,
    },
  ];
}

function buildBrandCards(productType: ProductType, curatedBrands: BrandCard[]) {
  const products = PRODUCT_LINK_SOURCES[productType];
  const counts = new Map<string, number>();

  for (const product of products) {
    counts.set(product.brand, (counts.get(product.brand) ?? 0) + 1);
  }

  const curatedMap = new Map(curatedBrands.map((brand) => [brand.brand, brand]));
  const orderedBrands = [
    ...curatedBrands.map((brand) => brand.brand).filter((brand) => counts.has(brand)),
    ...[...counts.entries()]
      .map(([brand]) => brand)
      .filter((brand) => !curatedMap.has(brand))
      .sort((a, b) => (counts.get(b) ?? 0) - (counts.get(a) ?? 0) || a.localeCompare(b, "ko")),
  ];

  return orderedBrands.map((brand) => {
    const curated = curatedMap.get(brand);
    const brandProducts = products.filter((product) => product.brand === brand);
    const bestDataUrl =
      chooseBestStoreUrl(brandProducts) ||
      getMostCommonUrl(brandProducts, "officialUrl") ||
      getMostCommonUrl(brandProducts, "naverUrl") ||
      getMostCommonUrl(brandProducts, "coupangUrl") ||
      "#";
    const curatedScore = curated?.storeUrl ? classifyStoreUrl(curated.storeUrl).score : 0;
    const bestDataScore = classifyStoreUrl(bestDataUrl).score;
    const storeUrl =
      curated?.storeUrl && curatedScore >= bestDataScore
        ? curated.storeUrl
        : bestDataUrl;
    const storeType = curated?.storeType || inferStoreType(storeUrl);
    const events =
      curated?.events?.length
        ? curated.events.map((event) => ({ ...event, periodLabel: CHECKED_DATE_LABEL }))
        : buildGenericEvents(brand, storeType);

    return {
      brand,
      storeType,
      storeUrl,
      note: `현재 등록 제품 ${counts.get(brand) ?? 0}개`,
      productCount: counts.get(brand) ?? 0,
      events,
    };
  });
}

const drinkBrands: BrandCard[] = buildBrandCards("drink", [...rawDrinkBrands, ...additionalDrinkBrands]);
const barBrands: BrandCard[] = buildBrandCards("bar", [...rawBarBrands, ...additionalBarBrands]);
const yogurtBrands: BrandCard[] = buildBrandCards("yogurt", [...rawYogurtBrands, ...additionalYogurtBrands]);
const shakeBrands: BrandCard[] = buildBrandCards("shake", [...rawShakeBrands, ...additionalShakeBrands]);

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
            등록 제품 352개 기준으로 공식몰·네이버·쿠팡 혜택 확인 우선순위를 정리했습니다. 최근 추가한 바·요거트·쉐이크 브랜드까지 포함해 할인, 쿠폰, 증정, 무료배송 포인트를 빠르게 볼 수 있습니다.
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

        <p className="mt-3 text-xs leading-5 text-[var(--foreground-muted)]">
          {PRODUCT_TYPE_META[productType].label} 브랜드 {brands.length}개 · 등록 제품{" "}
          {brands.reduce((sum, brand) => sum + brand.productCount, 0)}개 · {CHECKED_DATE_LABEL}
        </p>

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
      className="flex h-full min-h-[284px] flex-col overflow-hidden rounded-2xl border bg-[#fffdf8] shadow-[0_10px_24px_rgba(20,40,28,0.05)] transition-colors"
      style={{
        borderColor: meta.accentBorder,
        boxShadow: "0 12px 28px rgba(28, 52, 39, 0.06)",
      }}
    >
      <div className="h-1.5 w-full" style={{ background: meta.accentColor }} />
      <div>
        <div
          className="min-h-[108px] border-b px-4 py-3.5"
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

          <div className="mt-3 flex items-start gap-3">
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
              <h2 className="mt-0.5 text-[17px] font-bold" style={{ color: meta.accentColor }}>
                {brand.brand}
              </h2>
              <p className="mt-1 text-xs text-[#7a837d]">{brand.note}</p>
            </div>
          </div>

          <div className="mt-3">
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
            <p className="mt-2 text-[12px] leading-5 text-[#657069]">{getStorePriorityLine(brand.storeType)}</p>
          </div>
        </div>

        <ul className="space-y-2.5 px-4 pb-2 pt-3.5">
          {brand.events.map((event) => {
            const color = CATEGORY_COLOR[event.category];
            return (
              <li
                key={`${brand.brand}-${event.category}-${event.description}`}
                className="rounded-xl border border-[#edf2ed] bg-white px-3 py-2.5"
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
                <p className="mt-1.5 text-[13px] leading-[1.55] text-[var(--foreground)]" style={clampThreeLines}>
                  {event.description}
                </p>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="mt-auto px-4 pb-4 pt-2.5">
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
          {brand.storeType === "네이버 스토어"
            ? "네이버 혜택 확인"
            : brand.storeType.includes("올리브영")
              ? "올리브영 혜택 확인"
              : "판매처 혜택 확인"} →
        </a>
      </div>
    </div>
  );
}
