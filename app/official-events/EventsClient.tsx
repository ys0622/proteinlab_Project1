"use client";

import { useMemo, useState } from "react";
import barProductsData from "../data/barProductsData.json";
import drinkProductsData from "../data/drinkProductsData.json";
import shakeProductsData from "../data/shakeProductsData.json";
import yogurtProductsData from "../data/yogurtProductsData.json";

type ProductType = "drink" | "bar" | "yogurt" | "shake";
type EventCategory = "할인" | "쿠폰" | "증정" | "무료배송" | "안내";
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
  if (storeType.includes("올리브영")) return "올리브영 제품은 단품 확인 후 구매를 추천합니다.";
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

const CHECKED_DATE_LABEL = "2026-10-15 업데이트";

// Only these category-specific offers were rechecked on the editorial date.
// Historical curated copy below must not be relabelled as newly verified.
const VERIFIED_EVENTS: Partial<Record<ProductType, Record<string, { url: string; events: BrandEvent[] }>>> = {
  drink: {
    하이뮨: { url: "https://foodismall.com/", events: [
      { category: "쿠폰", periodLabel: "10/15 확인 · 신규회원 대상", description: "액티브 듀오팩 250mL 12개 등 일부 상품에 신규회원 70% 쿠폰이 안내됩니다. 할인 한도와 적용 조건은 상품 상세에서 확인하세요." },
    ] },
    뉴케어: { url: "https://www.wellife.co.kr/", events: [
      { category: "할인", periodLabel: "10/15 확인 · 종료일 미표기", description: "올프로틴 고소한맛 245mL 24팩 46,900원. W멤버십 적용가는 43,610원으로 별도 표시되며 가입 조건을 확인해야 합니다." },
      { category: "무료배송", periodLabel: "10/15 확인", description: "위 올프로틴 24팩 상품에 무료배송이 표시됩니다. 배송 지역별 추가 비용은 주문서에서 확인하세요." },
    ] },
    랩노쉬: { url: "https://labnosh.com/", events: [
      { category: "할인", periodLabel: "10/15 확인 · 종료일 미표기", description: "1억 메가위크에 프로틴 드링크 퍼펙트 9종 사전예약과 맥스 3종 구성이 올라와 있습니다. 옵션별 수량·가격과 사전예약 배송일을 확인하세요." },
    ] },
  },
  bar: {
    하이뮨: { url: "https://foodismall.com/", events: [
      { category: "할인", periodLabel: "10/15 확인 · 종료일 미표기", description: "헬시데이 타임딜에 액티브 프로틴바 딸기요거트 40g 8개 구성이 노출됩니다. 현재 적용가는 판매처에서 확인하세요." },
    ] },
    베노프: { url: "https://benope.com/", events: [
      { category: "할인", periodLabel: "10/15 확인 · 12/31 23:55까지", description: "단백질바 딸기치즈 50g 10개입 할인판매가 15,900원. 옵션과 재고에 따라 구매 가능 여부가 달라질 수 있습니다." },
      { category: "쿠폰", periodLabel: "10/15 확인 · 가입 조건 확인", description: "카카오 간편가입 시 1.2만원 할인쿠폰 혜택이 안내됩니다. 쿠폰별 최소 주문금액과 적용 상품을 확인하세요." },
    ] },
    랩노쉬: { url: "https://labnosh.com/", events: [
      { category: "할인", periodLabel: "10/15 확인 · 종료일 미표기", description: "1억 메가위크 단백쿠키바 4종 12개입이 13,900원으로 표시됩니다. 맛별 옵션과 배송비를 확인하세요." },
    ] },
  },
  yogurt: {
    그릭데이: { url: "https://greekday.co.kr/", events: [
      { category: "쿠폰", periodLabel: "10/15 확인 · 신규회원 대상", description: "공식몰 회원가입 혜택으로 2,000원 쿠폰이 안내됩니다. 최소 주문금액과 사용 기한은 발급된 쿠폰에서 확인하세요." },
      { category: "무료배송", periodLabel: "10/15 확인 · 쿠폰 조건 확인", description: "회원가입 무료배송 쿠폰이 안내됩니다. 모든 주문의 무조건 무료배송은 아니므로 적용 조건을 확인하세요." },
    ] },
  },
  shake: {
    랩노쉬: { url: "https://labnosh.com/", events: [
      { category: "할인", periodLabel: "10/15 확인 · 종료일 미표기", description: "1억 메가위크 프로틴 쉐이크 7종 1+1 상품이 23,900원으로 표시됩니다. 선택 옵션과 배송비를 확인하세요." },
    ] },
    베노프: { url: "https://benope.com/", events: [
      { category: "할인", periodLabel: "10/15 확인 · 12/30 12:00까지", description: "단백질쉐이크 골라담기 600g 상품은 최소 2개 선택 조건으로 할인판매가 30,900원이 표시됩니다. 2개 합계 가격이 아닌 상품별 표시가입니다." },
    ] },
  },
};

const CATEGORY_EMOJI: Record<EventCategory, string> = {
  안내: "ℹ️",
  할인: "🔖",
  쿠폰: "🎟",
  증정: "🎁",
  무료배송: "🚚",
};

const CATEGORY_COLOR: Record<EventCategory, { bg: string; text: string; border: string }> = {
  안내: { bg: "#f4f4f4", text: "#666666", border: "#dddddd" },
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
  { key: "안내", emoji: "ℹ️" },
];

const rawDrinkBrands: BrandCard[] = [
  {
    brand: "하이뮨",
    storeType: "자사몰",
    storeUrl: "https://foodismall.com/",
    note: "현재 등록 제품 15개",
    productCount: 15,
    events: [
      { category: "할인", periodLabel: CHECKED_DATE_LABEL, description: "후디스몰 단백질관 기준으로 하이뮨 프로틴 밸런스 음료 올인원팩과 액티브 듀오팩 구성이 노출됩니다. 신규혜택 적용 가능 상품은 10% 쿠폰과 5,000P 조건까지 함께 확인하세요." },
      { category: "무료배송", periodLabel: CHECKED_DATE_LABEL, description: "무배위크 추천 구성에 하이뮨 듀오팩이 포함되어 있어 단품보다 세트·무료배송 조건을 먼저 보는 편이 좋습니다." },
    ],
  },
  {
    brand: "더단백",
    storeType: "네이버 스토어",
    storeUrl: "https://smartstore.naver.com/bingtft",
    note: "현재 등록 제품 12개",
    productCount: 12,
    events: [
      { category: "할인", periodLabel: CHECKED_DATE_LABEL, description: "빙그레 네이버 스토어 기준으로 음료·바·파우더가 카테고리별로 나뉘어 있어 맛별 묶음 구성의 즉시할인가를 먼저 비교하는 편이 좋습니다." },
      { category: "쿠폰", periodLabel: CHECKED_DATE_LABEL, description: "네이버 스토어는 상품중복할인, 장바구니 쿠폰, 배송비 쿠폰이 따로 적용될 수 있어 상품 상세와 주문서 쿠폰을 나눠 확인하세요." },
    ],
  },
  {
    brand: "셀렉스",
    storeType: "자사몰",
    storeUrl: "https://www.selexmall.com/",
    note: "현재 등록 제품 10개",
    productCount: 10,
    events: [
      { category: "할인", periodLabel: CHECKED_DATE_LABEL, description: "셀렉스몰 골라담기에서 프로핏 음료 2개 구매 9,000원, 3개 이상 구매 15,000원 추가 할인 행사가 2026-12-31까지 노출됩니다." },
      { category: "쿠폰", periodLabel: CHECKED_DATE_LABEL, description: "매일다이렉트 셀렉스 상품에는 가을행 쿠폰이 붙어 2026-09-30까지 2만원 이상 3,000원, 4만원 이상 7,000원 할인 조건을 함께 볼 수 있습니다." },
    ],
  },
  {
    brand: "테이크핏",
    storeType: "네이버 브랜드관",
    storeUrl: "https://brand.naver.com/namyang",
    note: "현재 등록 제품 9개",
    productCount: 9,
    events: [
      { category: "할인", periodLabel: CHECKED_DATE_LABEL, description: "남양 네이버 브랜드관 기준으로 테이크핏은 몬스터·맥스 라인별 세트와 박스 수량에 따라 단가 차이가 큽니다. 상품별 즉시할인과 쿠폰 적용 가능 여부를 먼저 확인하세요." },
      { category: "쿠폰", periodLabel: CHECKED_DATE_LABEL, description: "네이버 브랜드관 쿠폰은 상품중복할인과 장바구니 할인 적용 순서가 달라 최종가는 주문서 단계에서 다시 보는 편이 안전합니다." },
    ],
  },
  {
    brand: "뉴케어",
    storeType: "자사몰",
    storeUrl: "https://www.wellife.co.kr/",
    note: "현재 등록 제품 7개",
    productCount: 7,
    events: [
      { category: "할인", periodLabel: CHECKED_DATE_LABEL, description: "뉴케어 올프로틴 고소한맛 245ml 24팩 특가와 정기배송 구성이 확인됩니다. 24팩 박스 기준 할인율과 W멤버십 적용가를 함께 비교하세요." },
      { category: "증정", periodLabel: CHECKED_DATE_LABEL, description: "뉴케어 리워드형 구성은 적립금 증정 문구가 붙는 상품이 있어 단순 판매가보다 적립금 포함 체감가를 같이 보는 편이 좋습니다." },
      { category: "무료배송", periodLabel: CHECKED_DATE_LABEL, description: "올프로틴·클래식·당플랜 박스 상품은 무료배송 배지가 붙는 구성이 많습니다. 체험팩보다 24팩 단위에서 배송비 포함 단가 차이가 큽니다." },
    ],
  },
  {
    brand: "마이밀",
    storeType: "자사몰",
    storeUrl: "https://www.wellife.co.kr/",
    note: "현재 등록 제품 7개",
    productCount: 7,
    events: [
      { category: "할인", periodLabel: CHECKED_DATE_LABEL, description: "대상웰라이프 마이밀 카테고리에서 뉴프로틴바 12입 60%, 한입쏙쏙 프로틴바 묶음 48~56%, 뉴프로틴 음료 30~37% 할인이 확인됩니다." },
      { category: "무료배송", periodLabel: CHECKED_DATE_LABEL, description: "마이밀 주요 음료·바 상품에 무료배송 배지와 W멤버십 적용가가 함께 노출됩니다. 할인율보다 멤버십가와 배송 조건을 함께 비교하세요." },
    ],
  },
  {
    brand: "얼티브",
    storeType: "CJ더마켓",
    storeUrl: "https://www.cjthemarket.com/",
    note: "현재 등록 제품 6개",
    productCount: 6,
    events: [
      { category: "할인", periodLabel: CHECKED_DATE_LABEL, description: "CJ더마켓 프로틴음료·쉐이크 카테고리에서 얼티브 프로틴 골라담기, 박스특가 18개입 60%, 단품 40% 할인 구성이 노출됩니다." },
      { category: "쿠폰", periodLabel: CHECKED_DATE_LABEL, description: "얼티브 프로틴 일부 상품에 최대 20% 중복쿠폰과 36개 구매 시 55% 할인 조건이 함께 표시됩니다. 박스 수량별 최종가를 비교하세요." },
    ],
  },
  {
    brand: "랩노쉬",
    storeType: "자사몰",
    storeUrl: "https://labnosh.com/",
    note: "현재 등록 제품 9개",
    productCount: 9,
    events: [
      { category: "할인", periodLabel: CHECKED_DATE_LABEL, description: "랩노쉬 자사몰 메인에 패밀리세일 최대 94%, 득근 프로틴 기획전, 프로틴 드링크 퍼펙트 7종 특별 할인과 맥스 3종 묶음 구성이 노출됩니다." },
      { category: "쿠폰", periodLabel: CHECKED_DATE_LABEL, description: "최근 후기 목록에서도 패밀리세일, 1+1특가, ~50%특가 상품명이 이어져 보여 행사 SKU와 일반 SKU를 구분해 담는 편이 좋습니다." },
    ],
  },
  {
    brand: "닥터유",
    storeType: "자사몰",
    storeUrl: "https://dryoumall.com/",
    note: "현재 등록 제품 5개",
    productCount: 5,
    events: [
      { category: "증정", periodLabel: CHECKED_DATE_LABEL, description: "닥터유몰 이벤트 게시판 기준 최신 진행중 이벤트는 박지훈 렌티큘러 3D 입체 포카 증정 EVENT입니다. 단백질 드링크 구매 시 증정 적용 SKU인지 먼저 확인하세요." },
      { category: "쿠폰", periodLabel: CHECKED_DATE_LABEL, description: "닥터유프로 파우더 단독 특가와 단백질 위크류 할인은 진행완료로 표시됩니다. 현재는 상시 혜택 안내와 상품별 쿠폰 중심으로 확인하는 편이 안전합니다." },
    ],
  },
  {
    brand: "칼로바이",
    storeType: "자사몰",
    storeUrl: "https://www.calobye.shop/",
    note: "현재 등록 제품 4개",
    productCount: 4,
    events: [
      { category: "할인", periodLabel: CHECKED_DATE_LABEL, description: "칼로바이 타임세일에 퍼펙트 파워쉐이크 20g 24개입, 프로틴 스파클링, 대용량 파워쉐이크가 노출됩니다. 단백질/보충제 카테고리와 타임세일 탭을 함께 보세요." },
      { category: "쿠폰", periodLabel: CHECKED_DATE_LABEL, description: "칼로바이는 추가할인 쿠폰 상품 탭이 별도로 있어 표시가와 쿠폰 적용가가 달라질 수 있습니다. 장바구니 쿠폰 적용 여부를 확인하세요." },
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
      { category: "할인", periodLabel: CHECKED_DATE_LABEL, description: "맛별 가격 차이가 큰 편이라 쿠팡 로켓배송과 공식 수입 판매처를 함께 보는 편이 좋습니다. 대량팩 묶음 할인 여부도 같이 확인하세요." },
      { category: "무료배송", periodLabel: "로켓배송 기준", description: "묶음 구성과 로켓배송 여부에 따라 체감 금액 차이가 크게 납니다." },
    ],
  },
  {
    brand: "베노프",
    storeType: "자사몰",
    storeUrl: "https://benope.com/",
    note: "현재 등록 제품 10개",
    productCount: 10,
    events: [
      { category: "할인", periodLabel: CHECKED_DATE_LABEL, description: "베노프 공식몰에서 단백질바 딸기치즈, 소프트바 11종, 단백질바 라이트 2종 할인 기간이 2026-12-31까지 노출됩니다." },
      { category: "쿠폰", periodLabel: CHECKED_DATE_LABEL, description: "3팩 골라담기 소프트바처럼 장기 묶음세트 추가 할인 상품이 있어 단품보다 세트 가격을 먼저 확인하는 편이 좋습니다." },
    ],
  },
  {
    brand: "닥터유",
    storeType: "자사몰",
    storeUrl: "https://dryoumall.com/",
    note: "현재 등록 제품 7개",
    productCount: 7,
    events: [
      { category: "증정", periodLabel: CHECKED_DATE_LABEL, description: "닥터유몰 최신 진행중 이벤트는 박지훈 렌티큘러 3D 입체 포카 증정으로 확인됩니다. 바·드링크 동시 구매 시 대상 상품 여부를 먼저 확인하세요." },
      { category: "쿠폰", periodLabel: CHECKED_DATE_LABEL, description: "닥터유프로 파우더 단독 특가, 건강간식 페스타, 단백질 특가전은 진행완료로 표시되어 현재는 상품별 상시 혜택 중심으로 보는 편이 안전합니다." },
    ],
  },
  {
    brand: "프로틴방앗간",
    storeType: "공식몰",
    storeUrl: "https://dailyprotein.co.kr/",
    note: "현재 등록 제품 4개",
    productCount: 4,
    events: [
      { category: "할인", periodLabel: CHECKED_DATE_LABEL, description: "프로틴방앗간은 공식몰 쿠폰 안내 기준 신규 회원 10,000원 쿠폰팩이 운영됩니다. 5만원·7만원·10만원 이상 구간별 쿠폰을 세트 구매와 같이 비교하세요." },
      { category: "쿠폰", periodLabel: CHECKED_DATE_LABEL, description: "카톡 플친 2,000원 적립 쿠폰도 안내되어 있어 쿠폰 사용 후 적립까지 포함한 체감가를 보는 편이 좋습니다." },
    ],
  },
  {
    brand: "켈로그",
    storeType: "공식 판매처 중심",
    storeUrl: "https://www.coupang.com/",
    note: "현재 등록 제품 4개",
    productCount: 4,
    events: [
      { category: "할인", periodLabel: CHECKED_DATE_LABEL, description: "묶음팩 할인과 대형몰 기획전이 함께 걸릴 때 단가 차이가 커집니다. 변동이 잦아 주문 직전 판매처별 최종가를 다시 확인하는 편이 좋습니다." },
      { category: "무료배송", periodLabel: "판매처별 상이", description: "대형 유통몰 기준 배송비 조건이 달라 묶음 수량과 배송비 포함 총액을 함께 확인하는 편이 좋습니다." },
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
      { category: "할인", periodLabel: CHECKED_DATE_LABEL, description: "더단백 바는 빙그레 네이버 스토어에서 음료·파우더와 함께 운영되어 크런치바·마일드바 묶음 수량별 즉시할인가를 먼저 확인하는 편이 좋습니다." },
      { category: "쿠폰", periodLabel: CHECKED_DATE_LABEL, description: "스마트스토어는 상품중복할인, 스토어장바구니할인, 배송비 쿠폰이 따로 붙을 수 있어 주문서 최종가 기준으로 비교하세요." },
    ],
  },
  {
    brand: "마이프로틴",
    storeType: "자사몰",
    storeUrl: "https://www.myprotein.co.kr/",
    note: "현재 등록 제품 3개",
    productCount: 3,
    events: [
      { category: "할인", periodLabel: CHECKED_DATE_LABEL, description: "마이프로틴은 임팩트 위크 특가주간으로 최대 70% OFF에 코드 MYIMPACT 입력 시 추가 35% 즉시할인이 2026-09-08 18:59까지 안내됩니다." },
      { category: "증정", periodLabel: CHECKED_DATE_LABEL, description: "NEW 임팩트 웨이 프로틴 밀크 쉐이크 구매 시 시크릿 기프트 랜덤 증정 이벤트도 2026-09-08까지 안내됩니다. 재고 소진 조기 종료 가능성을 확인하세요." },
    ],
  },
  {
    brand: "칼로바이",
    storeType: "자사몰",
    storeUrl: "https://www.calobye.shop/",
    note: "현재 등록 제품 1개",
    productCount: 1,
    events: [
      { category: "할인", periodLabel: CHECKED_DATE_LABEL, description: "칼로바이 타임세일에서 프로틴 스파클링, 퍼펙트 파워쉐이크, 단백질/보충제 묶음 상품이 함께 노출됩니다." },
      { category: "쿠폰", periodLabel: CHECKED_DATE_LABEL, description: "추가할인 쿠폰 상품 탭이 따로 있어 바·쉐이크를 함께 담을 때 쿠폰 적용 가능 상품인지 확인하는 편이 좋습니다." },
    ],
  },
  {
    brand: "롯데웰푸드",
    storeType: "자사몰",
    storeUrl: "https://www.lottefoodmall.com/",
    note: "현재 등록 제품 2개",
    productCount: 2,
    events: [
      { category: "할인", periodLabel: CHECKED_DATE_LABEL, description: "롯데웰푸드 푸드몰은 2026 LOTTE 추석 선물세트를 2026-09-27까지 최대 60% 즉시할인 + 20% 추가 쿠폰으로 노출합니다." },
      { category: "쿠폰", periodLabel: CHECKED_DATE_LABEL, description: "파스퇴르/이지프로틴은 L프리미엄 추가 할인과 L캐시 적립이 붙을 수 있어 제품 상세의 최대 예상 할인가를 확인하세요." },
    ],
  },
];

const rawShakeBrands: BrandCard[] = [
  {
    brand: "플라이밀",
    storeType: "올리브영",
    storeUrl: "https://www.oliveyoung.co.kr/store/display/getMCategoryList.do?dispCatNo=10000020002",
    note: "현재 등록 쉐이크 13개",
    productCount: 13,
    events: [
      { category: "할인", periodLabel: CHECKED_DATE_LABEL, description: "올리브영 식단관리 카테고리에서 플라이밀 단백질쉐이크 45g 4종은 9/4 하루특가 1+1, 12종은 2+1 오늘드림으로 노출됩니다." },
      { category: "쿠폰", periodLabel: CHECKED_DATE_LABEL, description: "단품 테스트는 올리브영 1+1·2+1 쿠폰을, 박스 구매는 네이버 쇼핑/쿠팡 묶음가를 함께 비교하는 편이 좋습니다." },
    ],
  },
  {
    brand: "랩노쉬",
    storeType: "자사몰",
    storeUrl: "https://labnosh.com/category/%EB%9E%A9%EB%85%B8%EC%89%AC/44/",
    note: "현재 등록 쉐이크 9개",
    productCount: 9,
    events: [
      { category: "할인", periodLabel: CHECKED_DATE_LABEL, description: "랩노쉬 패밀리세일에 프로틴 쉐이크 7종 14/21/35/49개입 구성이 노출됩니다. 드링크 1+1특가와 함께 비교하면 카테고리별 체감가 차이를 보기 쉽습니다." },
      { category: "무료배송", periodLabel: CHECKED_DATE_LABEL, description: "쉐이크는 개입 수가 커질수록 배송비보다 박스 단가 영향이 커집니다. 14개입 테스트와 35개입 이상 쟁임 구성을 나눠 보세요." },
    ],
  },
  {
    brand: "단백하니",
    storeType: "올리브영 브랜드관",
    storeUrl: "https://m.oliveyoung.co.kr/m/mtn/brand/A017276",
    note: "현재 등록 쉐이크 3개",
    productCount: 3,
    events: [
      { category: "할인", periodLabel: CHECKED_DATE_LABEL, description: "올리브영에서 단백하니 단백질쉐이크 5종 신상이 10% 할인 3,510원부터, 1+1 쿠폰 오늘드림 상품으로 노출됩니다." },
      { category: "무료배송", periodLabel: CHECKED_DATE_LABEL, description: "단백하니 바와 쉐이크 모두 올리브영 일반배송·오늘드림 조건이 달라 20,000원/30,000원 무료 기준을 함께 확인하세요." },
    ],
  },
  {
    brand: "프로티원",
    storeType: "올리브영 브랜드관",
    storeUrl: "https://m.oliveyoung.co.kr/m/mtn/brand/A010952",
    note: "현재 등록 쉐이크 5개",
    productCount: 5,
    events: [
      { category: "할인", periodLabel: CHECKED_DATE_LABEL, description: "올리브영 HEALTY FOOD FAIR에서 9/5 하루특가로 프로티원 490g 2통 24% 할인 42,900원부터, 파우치형 1+1 3,680원부터 노출됩니다." },
      { category: "증정", periodLabel: CHECKED_DATE_LABEL, description: "프로티원 브랜드관에는 대용량 490g 2통 7종 보틀증정/신제품 구성이 함께 노출됩니다. 파우치 1+1과 대용량 보틀증정을 나눠 보세요." },
    ],
  },
  {
    brand: "잇더핏",
    storeType: "네이버 쇼핑",
    storeUrl: "https://search.shopping.naver.com/search/all?query=%EC%9E%87%EB%8D%94%ED%95%8F%20%EB%8B%A8%EB%B0%B1%EC%A7%88%20%EC%89%90%EC%9D%B4%ED%81%AC",
    note: "현재 등록 쉐이크 9개",
    productCount: 9,
    events: [
      { category: "할인", periodLabel: CHECKED_DATE_LABEL, description: "더블초코·카페라떼·쿠키앤크림·미숫가루·콘 등 맛별 묶음 세트 체감가 차이가 큰 편입니다." },
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
      { category: "할인", periodLabel: CHECKED_DATE_LABEL, description: "올더베러는 9월 올영세일 베러 데이 루틴 기획전에서 한 끼 프로틴/한 입 이너뷰티 상품군으로 노출됩니다." },
      { category: "쿠폰", periodLabel: CHECKED_DATE_LABEL, description: "올리브영 세일·쿠폰·오늘드림 배지가 상품별로 달라질 수 있어 네이버 쇼핑가보다 주문서 적용가를 우선 확인하세요." },
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
      { category: "할인", periodLabel: CHECKED_DATE_LABEL, description: "그릭데이는 공식몰 이벤트 노출이 제한적이라 대용량과 소포장 모두 멤버십가·정기배송 할인 여부를 상품 상세에서 먼저 확인하는 편이 좋습니다." },
      { category: "무료배송", periodLabel: CHECKED_DATE_LABEL, description: "그릭요거트는 냉장 배송 특성상 무료배송 기준과 묶음 수량이 체감가를 크게 좌우합니다. 100g 테스트 구성과 450g 이상 대용량을 나눠 비교하세요." },
    ],
  },
  {
    brand: "YOZM",
    storeType: "공식몰",
    storeUrl: "https://yozm.co.kr/",
    note: "현재 등록 제품 3개",
    productCount: 3,
    events: [
      { category: "쿠폰", periodLabel: CHECKED_DATE_LABEL, description: "YOZM 커뮤니티 기준 최신 이벤트는 2026-08-26 등록된 루틴 클럽 리워드입니다. 쿠폰존은 로그인 후 상세 조건 확인 구조라 발급 가능 쿠폰을 직접 확인하세요." },
      { category: "할인", periodLabel: CHECKED_DATE_LABEL, description: "신규회원 이벤트상품과 정기배송 상품이 노출됩니다. 플레인 450g, 소프트 500g, 정기배송 구성의 배송 예정일과 품절 여부를 함께 보는 편이 좋습니다." },
    ],
  },
  {
    brand: "후디스",
    storeType: "자사몰",
    storeUrl: "https://foodismall.com/",
    note: "현재 등록 제품 4개",
    productCount: 4,
    events: [
      { category: "쿠폰", periodLabel: CHECKED_DATE_LABEL, description: "후디스몰 그릭 기획전과 무배위크에 10% 쿠폰과 5,000P 신규혜택 적용 가능 상품이 노출됩니다." },
      { category: "무료배송", periodLabel: CHECKED_DATE_LABEL, description: "후디스 그릭요거트 400g·450g 1~3개 구성에 그릭 무료배송 혜택이 표시됩니다. 단품보다 2개 이상 구성을 먼저 확인하세요." },
    ],
  },
  {
    brand: "상하목장",
    storeType: "자사몰",
    storeUrl: "https://direct.maeil.com/m/brand/sangha",
    note: "현재 등록 제품 5개",
    productCount: 5,
    events: [
      { category: "할인", periodLabel: CHECKED_DATE_LABEL, description: "80g 16개입·2종 구성은 브랜드관 특가 여부에 따라 체감가 차이가 납니다. 특가 구성을 먼저 보는 편이 좋습니다." },
      { category: "쿠폰", periodLabel: CHECKED_DATE_LABEL, description: "브랜드관 쿠폰 노출 여부를 확인하세요. 추가 쿠폰 발급 여부도 같이 보는 편이 좋습니다." },
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
      { category: "쿠폰", periodLabel: CHECKED_DATE_LABEL, description: "매일다이렉트는 로그인 전에도 회원가입 15,000원 웰컴쿠폰과 가을행 쿠폰 배지가 노출됩니다. 냉장 상품도 쿠폰 대상 여부를 먼저 확인하세요." },
      { category: "무료배송", periodLabel: CHECKED_DATE_LABEL, description: "매일다이렉트 안내 기준 상온·냉장/냉동 모두 할인가 15,000원 이상 구매 시 무료배송입니다. 바이오 요거트는 합배송 기준을 같이 보세요." },
    ],
  },
  {
    brand: "룩트",
    storeType: "공식몰",
    storeUrl: "https://lukt.co.kr/",
    note: "현재 등록 제품 4개",
    productCount: 4,
    events: [
      { category: "할인", periodLabel: CHECKED_DATE_LABEL, description: "룩트 공식몰에 고메멤버십 2,900원 타임세일과 단백질쉐이크 파우치·대용량 SALE/TIME SALE 구성이 노출됩니다." },
      { category: "증정", periodLabel: CHECKED_DATE_LABEL, description: "고메멤버십은 제품 할인가 구매와 샘플 증정 혜택을 안내합니다. 요거트와 쉐이크를 함께 살 때 멤버십 적용가를 확인하세요." },
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
      { category: "할인", periodLabel: CHECKED_DATE_LABEL, description: "하림몰 오!늘단백 카테고리에서 밀크초코바 5종 12팩 박스가 34,800원 대비 28,000원 할인판매가로 노출됩니다." },
      { category: "쿠폰", periodLabel: CHECKED_DATE_LABEL, description: "스트로베리·치즈케이크·제주말차·카라멜·피스타치오 단품 박스도 함께 있어 네이버 브랜드관 쿠폰과 하림몰 박스가를 비교하세요." },
    ],
  },
  {
    brand: "연세유업",
    storeType: "자사몰",
    storeUrl: "https://yonseidairy.com/goods/goods_list.php?cateCd=022013",
    note: "현재 등록 제품 3개",
    productCount: 3,
    events: [
      { category: "할인", periodLabel: CHECKED_DATE_LABEL, description: "연세샵에서 세브란스 A2 프로틴 190ml 16팩 71%, 32팩 71%, 초코·커피 32팩 45%, 48팩 2+1박스 72% 할인이 노출됩니다." },
      { category: "무료배송", periodLabel: CHECKED_DATE_LABEL, description: "20,000원 이상 무료배송 조건이라 16팩 단품은 배송비 포함가, 32팩·48팩은 박스 단가를 중심으로 비교하는 편이 좋습니다." },
    ],
  },
  {
    brand: "오트몬드",
    storeType: "네이버 브랜드관",
    storeUrl: "https://brand.naver.com/woongjinfood/category/09ec7d4b0a5f4949b4b094b6fa0c368b?cp=2",
    note: "현재 등록 제품 3개",
    productCount: 3,
    events: [
      { category: "할인", periodLabel: CHECKED_DATE_LABEL, description: "오트몬드는 웅진식품 네이버 브랜드관에서 초코·쿠키앤크림·고소한맛 세트 가격을 먼저 확인하세요. 현재 공개 검색에서는 별도 기획전 상세가 제한적으로만 확인됩니다." },
      { category: "쿠폰", periodLabel: CHECKED_DATE_LABEL, description: "네이버 브랜드관 쿠폰은 상품중복할인과 장바구니할인이 동시에 적용될 수 있어 쿠폰받기와 주문서 적용가를 함께 보세요." },
    ],
  },
  {
    brand: "그린비아",
    storeType: "자사몰",
    storeUrl: "https://www.wellife.co.kr/categories/index/101003000000",
    note: "현재 등록 제품 2개",
    productCount: 2,
    events: [
      { category: "할인", periodLabel: CHECKED_DATE_LABEL, description: "그린비아 프로틴밀 액티브는 대상웰라이프 내 뉴케어·마이밀 행사와 함께 노출될 수 있어 박스가와 W멤버십 적용가를 같이 보세요." },
      { category: "무료배송", periodLabel: CHECKED_DATE_LABEL, description: "웰라이프는 무료배송 배지가 붙는 묶음 상품이 많아 단품보다 박스·세트 기준으로 최종 결제 금액을 확인하는 편이 좋습니다." },
    ],
  },
  {
    brand: "롯데웰푸드",
    storeType: "자사몰",
    storeUrl: "https://www.lottefoodmall.com/?act=main.pasteur",
    note: "현재 등록 제품 2개",
    productCount: 2,
    events: [
      { category: "할인", periodLabel: CHECKED_DATE_LABEL, description: "롯데웰푸드 푸드몰은 2026 추석 선물세트 최대 60% 즉시할인과 20% 추가 쿠폰을 2026-09-27까지 노출합니다. 이지프로틴은 파스퇴르/해피딜 구성을 함께 확인하세요." },
      { category: "쿠폰", periodLabel: CHECKED_DATE_LABEL, description: "L프리미엄 추가 할인과 L캐시 적립이 상품별로 붙을 수 있어 표시가보다 최대 예상 할인가를 기준으로 비교하는 편이 좋습니다." },
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
      { category: "할인", periodLabel: CHECKED_DATE_LABEL, description: "솔브앤고 프로타민은 DC프라임 위드이데이몰 네이버 브랜드관에서 맛별 세트와 즉시할인가를 확인하는 편이 좋습니다." },
      { category: "쿠폰", periodLabel: CHECKED_DATE_LABEL, description: "공개 검색에서 최신 개별 기획전은 제한적으로 확인되어, 브랜드관 쿠폰받기와 배송비 할인 쿠폰 적용 여부를 주문서에서 다시 보세요." },
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
      { category: "무료배송", periodLabel: CHECKED_DATE_LABEL, description: "단품보다는 자사몰 합배송 조건을 함께 확인해야 배송비 포함 체감가를 제대로 비교할 수 있습니다." },
    ],
  },
];

const additionalBarBrands: BrandCard[] = [
  { brand: "소이조이", storeType: "네이버 브랜드관", storeUrl: "https://brand.naver.com/soyjoy", note: "현재 등록 제품 8개", productCount: 8, events: [{ category: "할인", periodLabel: CHECKED_DATE_LABEL, description: "소이조이는 네이버 브랜드관에서 맛별 단품과 박스 구성이 함께 움직입니다. 할인 배지보다 맛 조합별 박스 단가를 먼저 비교하세요." }, { category: "쿠폰", periodLabel: CHECKED_DATE_LABEL, description: "네이버 브랜드관은 상품중복할인과 장바구니 쿠폰이 따로 붙을 수 있어 주문서 최종가 기준으로 보는 편이 안전합니다." }] },
  { brand: "빼바", storeType: "네이버 브랜드관", storeUrl: "https://brand.naver.com/healthyplace/category/3b36ce60b9a9432496484c1ee5855d0c?cp=1", note: "현재 등록 제품 4개", productCount: 4, events: [{ category: "할인", periodLabel: CHECKED_DATE_LABEL, description: "리얼초코 프로틴바 4종은 맛별 재고와 세트 구성에 따라 체감가 차이가 큽니다." }, { category: "쿠폰", periodLabel: CHECKED_DATE_LABEL, description: "브랜드관 쿠폰과 쿠팡 단품가를 함께 비교하면 판매처별 체감가 차이를 더 정확히 볼 수 있습니다." }] },
  { brand: "CJ제일제당", storeType: "CJ더마켓", storeUrl: "https://www.cjthemarket.com/pc/search?beforeAction=%2Fpc%2Fsearch%3Fwid1%3Dgnb_search&sort=RANK&collection=ALL&range=A&searchAction=D&query=%ED%94%84%EB%A1%9C%ED%8B%B4%EB%B0%94", note: "현재 등록 제품 2개", productCount: 2, events: [{ category: "할인", periodLabel: CHECKED_DATE_LABEL, description: "CJ더마켓 식단관리 카테고리에서 밸런스밀 프로틴 쉐이크와 랩노쉬 단백쿠키·프로틴 퍼펙트 행사 상품이 함께 노출됩니다." }, { category: "쿠폰", periodLabel: CHECKED_DATE_LABEL, description: "CJ더마켓은 최대 20% 중복쿠폰 배지가 붙는 상품이 있어 표시 할인율과 쿠폰 적용가를 따로 확인하세요." }] },
  { brand: "마켓오네이처", storeType: "공식 판매처", storeUrl: "https://www.coupang.com/", note: "현재 등록 제품 1개", productCount: 1, events: [{ category: "할인", periodLabel: CHECKED_DATE_LABEL, description: "단일 SKU라 쿠팡과 네이버 검색 노출가 차이가 바로 체감가로 이어집니다." }, { category: "무료배송", periodLabel: CHECKED_DATE_LABEL, description: "배송 조건과 묶음 수량을 함께 보는 편이 좋습니다." }] },
  { brand: "단백하니", storeType: "올리브영 브랜드관", storeUrl: "https://m.oliveyoung.co.kr/m/mtn/brand/A017276", note: "현재 등록 제품 5개", productCount: 5, events: [{ category: "할인", periodLabel: CHECKED_DATE_LABEL, description: "올리브영에서 단백하니 프로틴바 4종이 10% 할인 2,610원부터, 오늘드림 1+1 배지로 노출됩니다." }, { category: "무료배송", periodLabel: CHECKED_DATE_LABEL, description: "일반배송은 20,000원 이상, 오늘드림은 30,000원 이상 무료 조건이 보여 바와 쉐이크를 묶어 담을 때 유리합니다." }] },
  { brand: "랩노쉬", storeType: "자사몰", storeUrl: "https://labnosh.com/category/%EB%9E%A9%EB%85%B8%EC%89%AC/44/", note: "현재 등록 제품 5개", productCount: 5, events: [{ category: "할인", periodLabel: CHECKED_DATE_LABEL, description: "랩노쉬 자사몰 후기 기준 단백쿠키바, 푸드바, 프로틴 드링크 퍼펙트가 패밀리세일·1+1특가 상품명으로 함께 노출됩니다." }, { category: "쿠폰", periodLabel: CHECKED_DATE_LABEL, description: "행사 상품과 일반 상품이 섞여 보여 푸드바는 세트명에 패밀리세일 또는 특가 표기가 있는지 먼저 확인하세요." }] },
  { brand: "오늘단백", storeType: "네이버 브랜드관", storeUrl: "https://brand.naver.com/harim/category/1a6d3a6007e143a59ecb3ae9b3418fc2?cp=2", note: "현재 등록 제품 4개", productCount: 4, events: [{ category: "할인", periodLabel: CHECKED_DATE_LABEL, description: "하림몰에서 오늘단백 밀크초코바 5종 12팩 박스가 34,800원 대비 28,000원 할인판매가로 노출됩니다." }, { category: "쿠폰", periodLabel: CHECKED_DATE_LABEL, description: "네이버 브랜드관은 동일 라인의 맛별 박스 쿠폰·적립 조건이 다를 수 있어 하림몰 할인판매가와 같이 비교하세요." }] },
  { brand: "셀렉스", storeType: "네이버 브랜드관", storeUrl: "https://brand.naver.com/selex/category/85709825a6ff41b7bfdb4b6dbd205dd0?cp=1", note: "현재 등록 제품 2개", productCount: 2, events: [{ category: "할인", periodLabel: CHECKED_DATE_LABEL, description: "셀렉스몰 신규회원 초특가에 프로틴 너츠바 1박스 50% 구성이 노출되고, 매일다이렉트 셀렉스 카테고리도 올데이 쿠폰 배지가 보입니다." }, { category: "쿠폰", periodLabel: CHECKED_DATE_LABEL, description: "가을행 쿠폰은 2026-09-30까지 2만원 이상 3,000원, 4만원 이상 7,000원 조건이 확인됩니다." }] },
  { brand: "커클랜드", storeType: "공식 판매처", storeUrl: "https://www.costco.co.kr/", note: "현재 등록 제품 2개", productCount: 2, events: [{ category: "할인", periodLabel: CHECKED_DATE_LABEL, description: "코스트코는 행사 페이지보다 카테고리별 대용량 박스 단가가 핵심입니다. 매장 판매 상품은 온라인 가격과 다를 수 있다는 안내를 함께 확인하세요." }, { category: "무료배송", periodLabel: CHECKED_DATE_LABEL, description: "Costco Grocery와 최소구매 수량 여부가 붙는 상품이 있어 온라인 배송 가능 여부와 박스 수량을 같이 보는 편이 좋습니다." }] },
  { brand: "포스트", storeType: "자사몰", storeUrl: "https://www.postmall.co.kr/", note: "현재 등록 제품 2개", productCount: 2, events: [{ category: "할인", periodLabel: CHECKED_DATE_LABEL, description: "포스트 프로틴 그래놀라바는 자사몰 행사 노출이 제한적이라 대형몰 묶음팩 가격과 공식몰 판매가를 같이 확인하는 편이 좋습니다." }, { category: "무료배송", periodLabel: CHECKED_DATE_LABEL, description: "미니·일반 바 모두 단품보다 묶음 수량과 배송비 포함 총액으로 비교하세요." }] },
  { brand: "온단백", storeType: "쿠팡", storeUrl: "https://www.coupang.com/", note: "현재 등록 제품 2개", productCount: 2, events: [{ category: "할인", periodLabel: CHECKED_DATE_LABEL, description: "소수 SKU 중심이라 판매처 행사 반영 여부에 따라 체감가 차이가 커집니다." }, { category: "무료배송", periodLabel: CHECKED_DATE_LABEL, description: "로켓배송 여부와 배송비 조건을 함께 보는 편이 좋습니다." }] },
  { brand: "올가니카", storeType: "공식몰", storeUrl: "https://www.organica.co.kr/", note: "현재 등록 제품 2개", productCount: 2, events: [{ category: "할인", periodLabel: CHECKED_DATE_LABEL, description: "올가니카 공식몰에서 올라 츄이프로틴바 8입 피넛카카오·베리아몬드가 14,800원 대비 9,900원대 판매가로 노출됩니다." }, { category: "쿠폰", periodLabel: CHECKED_DATE_LABEL, description: "신규회원 5,000원 쿠폰이 5만원 이상 구매 조건으로 안내됩니다. 슬로우프로틴과 츄이프로틴바를 함께 담을 때 적용 가능성을 확인하세요." }] },
  { brand: "곰곰", storeType: "쿠팡", storeUrl: "https://www.coupang.com/", note: "현재 등록 제품 1개", productCount: 1, events: [{ category: "할인", periodLabel: CHECKED_DATE_LABEL, description: "단일 SKU라도 쿠팡 판매처와 재고 상황에 따라 노출가 차이가 생깁니다." }, { category: "무료배송", periodLabel: CHECKED_DATE_LABEL, description: "로켓배송 여부와 배송비 조건을 함께 보는 편이 좋습니다." }] },
  { brand: "노브랜드", storeType: "공식 판매처", storeUrl: "https://emart.ssg.com/", note: "현재 등록 제품 2개", productCount: 2, events: [{ category: "할인", periodLabel: CHECKED_DATE_LABEL, description: "이마트몰에서 노브랜드 단백질바미니 224g 최적가 4,980원, 10g당 222원 기준으로 노출됩니다." }, { category: "쿠폰", periodLabel: CHECKED_DATE_LABEL, description: "쓱클럽·카드 적립은 쿠폰·카드 할인에 따라 달라질 수 있어 결제 페이지 기준 적립액을 확인하세요." }] },
  { brand: "마이밀", storeType: "자사몰", storeUrl: "https://www.wellife.co.kr/categories/index/102000000000", note: "현재 등록 제품 1개", productCount: 1, events: [{ category: "할인", periodLabel: CHECKED_DATE_LABEL, description: "대상웰라이프에서 뉴프로틴바 12입 핫딜특가 60%와 한입쏙쏙 프로틴바 묶음 48~56% 할인이 확인됩니다." }, { category: "무료배송", periodLabel: CHECKED_DATE_LABEL, description: "마이밀 바 상품에는 무료배송 배지와 W멤버십 적용가가 함께 보여 멤버십가 기준으로 비교하는 편이 좋습니다." }] },
  { brand: "씨알로", storeType: "공식 판매처", storeUrl: "https://www.coupang.com/", note: "현재 등록 제품 1개", productCount: 1, events: [{ category: "할인", periodLabel: CHECKED_DATE_LABEL, description: "소수 SKU 중심이라 입점몰 기획전 여부에 따라 가격이 달라집니다." }, { category: "무료배송", periodLabel: CHECKED_DATE_LABEL, description: "판매처별 배송 조건을 포함해 최종 결제 금액을 비교하는 편이 좋습니다." }] },
  { brand: "크라운", storeType: "공식몰", storeUrl: "https://www.crown.co.kr/", note: "현재 등록 제품 1개", productCount: 1, events: [{ category: "할인", periodLabel: CHECKED_DATE_LABEL, description: "제과 브랜드 행사 주기에 따라 단일 SKU도 체감가가 달라질 수 있습니다." }, { category: "증정", periodLabel: CHECKED_DATE_LABEL, description: "대형 유통몰 중심 사은 구성 여부를 함께 확인하는 편이 좋습니다." }] },
  { brand: "하이뮨", storeType: "자사몰", storeUrl: "https://foodismall.com/", note: "현재 등록 제품 1개", productCount: 1, events: [{ category: "할인", periodLabel: CHECKED_DATE_LABEL, description: "후디스몰 신규혜택 적용 가능 상품은 10% 쿠폰과 5,000P 조건이 함께 노출됩니다. 단백질바도 하이뮨 음료와 합배송 기준으로 보는 편이 좋습니다." }, { category: "무료배송", periodLabel: CHECKED_DATE_LABEL, description: "무배위크 추천템을 통해 무료배송 대상 여부를 먼저 확인하세요." }] },
  { brand: "힘내고", storeType: "자사몰", storeUrl: "https://dailyprotein.co.kr/", note: "현재 등록 제품 1개", productCount: 1, events: [{ category: "할인", periodLabel: CHECKED_DATE_LABEL, description: "소수 SKU라 자사몰 할인 반영 여부에 따라 가격 차이가 바로 드러납니다." }, { category: "무료배송", periodLabel: CHECKED_DATE_LABEL, description: "단품보다 합배송 기준을 함께 확인하는 편이 좋습니다." }] },
];

const additionalYogurtBrands: BrandCard[] = [
  { brand: "덴마크", storeType: "네이버 브랜드관", storeUrl: "https://brand.naver.com/denmark/category/67b8ab52f4674b2f88a351f04949ca15?cp=1", note: "현재 등록 제품 1개", productCount: 1, events: [{ category: "할인", periodLabel: CHECKED_DATE_LABEL, description: "하이 그릭요거트는 냉장 제품이라 네이버 브랜드관의 즉시할인과 배송비 할인 쿠폰 적용 여부를 함께 확인하는 편이 좋습니다." }, { category: "쿠폰", periodLabel: CHECKED_DATE_LABEL, description: "네이버 쿠폰은 상품중복할인과 스토어장바구니할인이 따로 적용될 수 있어 주문서 최종가를 다시 보세요." }] },
  { brand: "커클랜드", storeType: "공식 판매처", storeUrl: "https://www.coupang.com/", note: "현재 등록 제품 1개", productCount: 1, events: [{ category: "할인", periodLabel: CHECKED_DATE_LABEL, description: "대용량 그릭요거트는 판매처별 단가와 재고 상황에 따라 가격 차이가 큽니다." }, { category: "무료배송", periodLabel: CHECKED_DATE_LABEL, description: "냉장 배송비 조건을 기준으로 확인하는 편이 좋습니다." }] },
  { brand: "요플레", storeType: "공식 판매처", storeUrl: "https://www.coupang.com/", note: "현재 등록 제품 5개", productCount: 5, events: [{ category: "할인", periodLabel: CHECKED_DATE_LABEL, description: "요플레 프로틴·맥스 라인은 쿠팡/대형 유통몰 묶음팩 가격 변동이 잦습니다. 컵형과 드링크형을 배송비 포함 단가로 비교하세요." }, { category: "무료배송", periodLabel: CHECKED_DATE_LABEL, description: "냉장 제품은 판매처별 아이스박스·냉장배송 조건이 달라 무료배송 배지와 도착 예정일을 함께 확인하는 편이 좋습니다." }] },
  { brand: "요프로", storeType: "공식 판매처", storeUrl: "https://www.coupang.com/", note: "현재 등록 제품 2개", productCount: 2, events: [{ category: "할인", periodLabel: CHECKED_DATE_LABEL, description: "요프로 플레인·블루베리 라인은 SKU가 적어 판매처 재고와 묶음 수량에 따라 노출가 차이가 큽니다." }, { category: "무료배송", periodLabel: CHECKED_DATE_LABEL, description: "냉장 배송 조건과 개당 단가를 함께 보는 편이 좋습니다. 소량 구매는 배송비가 체감가에 크게 반영됩니다." }] },
  { brand: "풀무원다논", storeType: "자사몰", storeUrl: "https://shop.pulmuone.com/", note: "현재 등록 제품 1개", productCount: 1, events: [{ category: "할인", periodLabel: CHECKED_DATE_LABEL, description: "풀무원다논 그릭요거트는 자사몰보다 입점몰 행사 노출이 빠를 수 있어 공식몰 가격과 대형몰 묶음가를 같이 확인하세요." }, { category: "무료배송", periodLabel: CHECKED_DATE_LABEL, description: "냉장 합배송 기준과 배송일 지정 가능 여부를 함께 보는 편이 안전합니다." }] },
];

const additionalShakeBrands: BrandCard[] = [
  { brand: "바지오", storeType: "네이버 스토어", storeUrl: "https://smartstore.naver.com/bbagio/category/d890334c286d4920bbc0c2c0eb8ffd11?cp=1", note: "현재 등록 쉐이크 7개", productCount: 7, events: [{ category: "할인", periodLabel: CHECKED_DATE_LABEL, description: "바지오 쉐이크얌 7종은 스마트스토어 카테고리에서 맛별 세트와 박스 구성이 나뉩니다. 상품별 즉시할인가와 리뷰 많은 구성을 먼저 비교하세요." }, { category: "쿠폰", periodLabel: CHECKED_DATE_LABEL, description: "네이버 스토어 쿠폰은 상품·스토어 단위가 나뉘므로 쿠팡 단품가와 주문서 적용가를 함께 확인하세요." }] },
  { brand: "쉐이크베이비", storeType: "네이버 브랜드관", storeUrl: "https://brand.naver.com/shakebaby/category/177bfd2e1aef4cddb4791fbb385ad53e?cp=1", note: "현재 등록 쉐이크 5개", productCount: 5, events: [{ category: "할인", periodLabel: CHECKED_DATE_LABEL, description: "쉐이크베이비는 네이버 브랜드관에서 5종 맛 구성과 박스 수량별 가격 차이가 큽니다. 알림받기·브랜드 쿠폰 적용 여부를 먼저 확인하세요." }, { category: "쿠폰", periodLabel: CHECKED_DATE_LABEL, description: "네이버 브랜드관 쿠폰과 배송비 쿠폰은 적용 단위가 달라 최종 결제 단계에서 다시 보는 편이 안전합니다." }] },
  { brand: "크런틴", storeType: "올리브영 브랜드관", storeUrl: "https://www.oliveyoung.co.kr/store/display/getBrandShopDetail.do?onlBrndCd=A017318", note: "현재 등록 쉐이크 4개", productCount: 4, events: [{ category: "할인", periodLabel: CHECKED_DATE_LABEL, description: "올리브영 크런틴 브랜드관에 NEW 500g 2통/1통 구성이 노출되고, 50g 5종은 2+1 쿠폰 오늘드림 상품으로 검색됩니다." }, { category: "쿠폰", periodLabel: CHECKED_DATE_LABEL, description: "크런치볼 단백질쉐이크는 올리브영 쿠폰과 스마트스토어 가격이 다를 수 있어 두 판매처를 같이 비교하세요." }] },
  { brand: "프롬잇", storeType: "올리브영 브랜드관", storeUrl: "https://www.oliveyoung.co.kr/store/display/getBrandShopDetail.do?onlBrndCd=A003607", note: "현재 등록 쉐이크 3개", productCount: 3, events: [{ category: "할인", periodLabel: CHECKED_DATE_LABEL, description: "프롬잇은 올리브영 식단관리/이너뷰티 카테고리의 세일·쿠폰·오늘드림 행사와 함께 확인하는 편이 좋습니다." }, { category: "쿠폰", periodLabel: CHECKED_DATE_LABEL, description: "9월 올영세일 기간에는 온라인 전용 쿠폰과 오늘드림 조건이 달라질 수 있어 상품 상세 쿠폰받기를 확인하세요." }] },
  { brand: "꼬박꼬밥", storeType: "공식 판매처", storeUrl: "https://www.coupang.com/", note: "현재 등록 쉐이크 6개", productCount: 6, events: [{ category: "할인", periodLabel: CHECKED_DATE_LABEL, description: "꼬박꼬밥 플러스 50g 4종은 올리브영 식단관리 카테고리에서 오늘드림 상품으로 노출됩니다. 쿠팡 박스가와 올리브영 단품가를 함께 비교하세요." }, { category: "무료배송", periodLabel: CHECKED_DATE_LABEL, description: "박스 수량과 오늘드림·일반배송 무료 조건이 다르므로 구매처별 배송비 포함가를 확인하는 편이 좋습니다." }] },
  { brand: "더단백", storeType: "네이버 브랜드관", storeUrl: "https://brand.naver.com/binggrae/category/54e40c847f15417fae9351c9478ee909?cp=1", note: "현재 등록 쉐이크 2개", productCount: 2, events: [{ category: "할인", periodLabel: CHECKED_DATE_LABEL, description: "더단백 파우더형 2종은 빙그레 네이버 브랜드관에서 음료·바와 함께 쿠폰 적용 여부를 확인하는 편이 좋습니다." }, { category: "쿠폰", periodLabel: CHECKED_DATE_LABEL, description: "브랜드관 알림받기 쿠폰과 장바구니 쿠폰은 상품별 적용 여부가 달라 주문서 단계에서 다시 보세요." }] },
  { brand: "룩트", storeType: "공식몰", storeUrl: "https://lukt.co.kr/26", note: "현재 등록 쉐이크 3개", productCount: 3, events: [{ category: "할인", periodLabel: CHECKED_DATE_LABEL, description: "룩트 공식몰에서 단백질쉐이크 파우치 3개 세트, 대용량 통, 대용량+파우치 혼합구성 SALE/TIME SALE이 노출됩니다." }, { category: "증정", periodLabel: CHECKED_DATE_LABEL, description: "고메멤버십은 할인가 구매와 샘플 증정 혜택을 안내하므로 쉐이크 세트 구매 전 멤버십 적용가를 함께 확인하세요." }] },
  { brand: "밀잇", storeType: "공식 판매처", storeUrl: "https://www.coupang.com/", note: "현재 등록 쉐이크 7개", productCount: 7, events: [{ category: "할인", periodLabel: CHECKED_DATE_LABEL, description: "밀잇 식단관리 단백질쉐이크 40g은 올리브영에서 3,900원대 단품과 세일가가 함께 노출됩니다. 쿠팡 대량팩과 단품 테스트 가격을 비교하세요." }, { category: "쿠폰", periodLabel: CHECKED_DATE_LABEL, description: "올리브영 세일·쿠폰·오늘드림 배지가 붙는지 확인하면 소량 구매 체감가를 더 정확히 볼 수 있습니다." }] },
  { brand: "베노프", storeType: "공식몰", storeUrl: "https://benope.com/", note: "현재 등록 쉐이크 2개", productCount: 2, events: [{ category: "할인", periodLabel: CHECKED_DATE_LABEL, description: "베노프 단백질쉐이크 골라담기와 8종 상품은 2026-12-30~31까지 할인 기간이 표시됩니다. 최소 택2 구성과 단품 8종 구성을 비교하세요." }, { category: "쿠폰", periodLabel: CHECKED_DATE_LABEL, description: "쉐이크 전용보틀과 묶음세트가 함께 노출되어 보틀 포함 세트가 필요한지에 따라 체감가가 달라집니다." }] },
  { brand: "혜인담", storeType: "공식몰", storeUrl: "https://www.haeindam.com/", note: "현재 등록 쉐이크 4개", productCount: 4, events: [{ category: "할인", periodLabel: CHECKED_DATE_LABEL, description: "곡물형 라인은 묶음 구성과 브랜드 기획전 여부에 따라 체감가가 달라집니다." }, { category: "무료배송", periodLabel: CHECKED_DATE_LABEL, description: "공식몰 배송 조건과 박스 구성을 함께 보는 편이 좋습니다." }] },
];

const PRODUCT_LINK_SOURCES: Record<ProductType, ProductLinkSource[]> = {
  drink: drinkProductsData as ProductLinkSource[],
  bar: barProductsData as ProductLinkSource[],
  yogurt: yogurtProductsData as ProductLinkSource[],
  shake: shakeProductsData as ProductLinkSource[],
};

function wrapCoupangAffiliate(url: string, category: string): string {
  if (!url || url === "#") return url;
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("coupang.com") && parsed.pathname.includes("/vp/products/")) {
      const pageKey = parsed.pathname.match(/\/vp\/products\/(\d+)/)?.[1];
      const itemId = parsed.searchParams.get("itemId");
      const vendorItemId = parsed.searchParams.get("vendorItemId");
      if (pageKey && itemId && vendorItemId) {
        return `/api/out/coupang?pageKey=${pageKey}&itemId=${itemId}&vendorItemId=${vendorItemId}&category=${category}`;
      }
    }
  } catch {}
  return url;
}

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
      description: `${storeType} 기준 배송비 조건과 합배송 기준이 자주 함께 붙어`,
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
    // If a curated storeUrl is explicitly set (and isn't a generic Coupang/placeholder), use it directly.
    // Only fall back to DB-computed best URL when no real curated URL was provided.
    const isPlaceholderUrl =
      !curated?.storeUrl ||
      curated.storeUrl === "https://www.coupang.com/" ||
      curated.storeUrl === "#";
    const verified = VERIFIED_EVENTS[productType]?.[brand];
    const rawStoreUrl = verified?.url ?? (isPlaceholderUrl ? bestDataUrl : curated.storeUrl);
    const storeUrl = wrapCoupangAffiliate(rawStoreUrl, productType);
    const storeType = verified ? "공식몰" : curated?.storeType || inferStoreType(storeUrl);
    const events: BrandEvent[] = verified?.events ?? buildGenericEvents(brand, storeType).slice(0, 1).map(() => ({
      category: "안내",
      periodLabel: "판매처 확인 필요",
      description: "진행 중인 행사를 확인하지 못했습니다. 할인·쿠폰·배송 조건은 아래 판매처에서 확인해 주세요.",
    }));

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
const TOTAL_REGISTERED_PRODUCTS =
  [...drinkBrands, ...barBrands, ...yogurtBrands, ...shakeBrands].reduce(
    (sum, brand) => sum + brand.productCount,
    0,
  );

function getCounts(brands: BrandCard[]) {
  const allEvents = brands.flatMap((brand) => brand.events);
  return {
    total: allEvents.length,
    할인: allEvents.filter((event) => event.category === "할인").length,
    쿠폰: allEvents.filter((event) => event.category === "쿠폰").length,
    증정: allEvents.filter((event) => event.category === "증정").length,
    무료배송: allEvents.filter((event) => event.category === "무료배송").length,
    안내: allEvents.filter((event) => event.category === "안내").length,
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
        className="w-full border-t border-b"
        style={{ background: "#FAF8F3", borderColor: "#E7DFC9" }}
      >
        <div className="mx-auto max-w-[1200px] px-4 py-4 md:px-6 md:py-5">
          <div className="mb-2 inline-flex items-center gap-1.5 rounded-full px-3 py-1" style={{ background: "#FDEDE3", color: "#C2410C" }}>
            <span aria-hidden>🔥</span>
            <span className="text-xs font-bold">지금 확인하는 핫딜</span>
          </div>
          <h1 className="text-2xl font-bold leading-tight md:text-3xl" style={{ color: "#16412D" }}>
            이벤트/핫딜
          </h1>
          <p className="mt-1 text-sm text-[var(--foreground-muted)]">
            {CHECKED_DATE_LABEL} · 등록 제품 {TOTAL_REGISTERED_PRODUCTS}개의 브랜드별 혜택을 모았습니다. 확인된 혜택과 판매처 확인이 필요한 안내를 구분했습니다.
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
                  background: active ? "#16412D" : "#fff",
                  color: active ? "#fff" : "#6b6b6b",
                  border: active ? "1px solid #16412D" : "1px solid var(--border)",
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
                style={{ color: active ? "#16412D" : "#999" }}
              >
                {tab.emoji ? `${tab.emoji} ${tab.key}` : tab.key}
                <span className="ml-1 text-xs font-normal">{getCount(tab.key)}</span>
                {active ? (
                  <span
                    className="absolute bottom-0 left-0 right-0 h-[2px]"
                    style={{ background: "#16412D" }}
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
          이벤트와 배송 조건은 판매처 정책에 따라 수시로 바뀝니다. 이 페이지는 공개 페이지에서 확인 가능한 혜택을 중심으로 정리했으며,
          최종 결제 전에는 브랜드 공식몰, 네이버 스토어, 쿠팡 로켓배송 페이지에서 적용 대상과 종료 여부를 다시 확인하는 것을 권장합니다.
        </p>
      </main>
    </>
  );
}

function BrandEventCard({ brand, productType }: { brand: BrandCard; productType: ProductType }) {
  const meta = PRODUCT_TYPE_META[productType];

  return (
    <div
      className="flex h-full min-h-[284px] flex-col overflow-hidden rounded-2xl border bg-[#fffdf8] shadow-[0_10px_24px_rgba(20,40,28,0.05)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_18px_36px_rgba(28,52,39,0.14)]"
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
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-xl shadow-sm"
              style={{ background: meta.accentColor }}
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
                  <span className="text-[11px] font-medium text-[#7a837d]">{event.periodLabel}</span>
                </div>
                <p className="mt-1.5 text-[13px] leading-[1.55] text-[var(--foreground)]">
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
