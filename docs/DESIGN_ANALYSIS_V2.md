# ProteinLab V2 디자인 통일성 분석

> **작업 완료**: 2025-03-07 — 7개 페이지 디자인 통일 수정 적용 완료

## 1. 홈페이지 디자인 기준 (변경 금지)

### 레이아웃
- `min-h-screen bg-white`
- `main`: `mx-auto max-w-[1200px] px-4 pt-0 pb-2 md:px-6 md:pb-3`

### 히어로 영역
- full width, `bg-[var(--hero-bg)]` (#EFEDE6)
- `border-t border-b`, `borderColor: var(--hero-border)`
- inner: `max-w-[1200px] px-4 py-4 md:px-6 md:py-5`
- h1: `text-2xl md:text-3xl font-bold`, color `#1a1a1a`
- p: `mt-1 text-sm`, color `var(--foreground-muted)`

### 카드
- bg `#FFFDF8`, border `#e8e6e3`, `rounded-2xl` (16px), padding `14px`

### 색상
- `--accent`: #2d4a35
- `--border`: #e2dfda
- `--hero-bg`: #efede6

### Spacing
- 섹션 간: `mt-3` (12px)
- 카드 그리드 gap: `24px`

---

## 2. 페이지별 문제점

### 2.1 제품 상세 페이지
| 항목 | 홈 | 상세 | 조치 |
|------|-----|------|------|
| 히어로 border | border-t border-b | 없음 | 추가 |
| main padding | pt-0 pb-2 | py-8 | 통일 |
| 버튼 | rounded-full | rounded-lg | pill 스타일 적용 |

### 2.2 제품 추천 페이지
| 항목 | 홈 | 추천 | 조치 |
|------|-----|------|------|
| 히어로 | 제목+설명 | 퀴즈 UI 전체 | HeroSection 추가 |
| 카드 border | #e8e6e3 | #d9d6cf | 통일 |
| 카드 radius | 16px | 14px | 16px |
| 카드 bg | #FFFDF8 | #fff | #FFFDF8 |

### 2.3 등급 랭킹 페이지
| 항목 | 홈 | 랭킹 | 조치 |
|------|-----|------|------|
| 히어로 padding | py-4 md:py-5 | py-8 | 통일 |
| 카드 border | #e8e6e3 | #d9d6cf | 통일 |
| 카드 radius | 16px | 14px | 16px |
| 카드 bg | #FFFDF8 | #fff | #FFFDF8 |

### 2.4 등급 기준 페이지
| 항목 | 홈 | 등급기준 | 조치 |
|------|-----|----------|------|
| 히어로 padding | py-4 md:py-5 | py-6 | 통일 |

### 2.5 브랜드 이벤트 페이지
| 항목 | 홈 | 이벤트 | 조치 |
|------|-----|---------|------|
| 카드 border | #e8e6e3 | #d9d6cf | 통일 |
| 카드 radius | 16px | 14px | 16px |
| 카드 bg | #FFFDF8 | #fff | #FFFDF8 |

### 2.6 단백질 가이드 페이지
| 항목 | 홈 | 가이드 | 조치 |
|------|-----|--------|------|
| 카드 border | #e8e6e3 | #d9d6cf | 통일 |
| 카드 radius | 16px | 14px | 16px |
| 카드 bg | #FFFDF8 | #fff | #FFFDF8 |

### 2.7 문의 페이지
| 항목 | 홈 | 문의 | 조치 |
|------|-----|------|------|
| 히어로 | 단색 bg | gradient | 단색으로 통일 |
| CTA 박스 | - | gradient+shadow | 단순화 (과한 마케팅 UI) |

---

## 3. 개선 우선순위

1. **히어로 영역 통일**: padding, border, 배경
2. **카드 스타일 통일**: border #e8e6e3, radius 16px, bg #FFFDF8
3. **main spacing 통일**
4. **문의 페이지**: gradient 제거, CTA 단순화
