import { permanentRedirect } from "next/navigation";

export default function BcaaGuideRedirectPage() {
  // 원래 대상(product-selection-comparison/bcaa-guide)은 2026-03-30 삭제돼 404였다. 원료·BCAA 표기를 다루는 가장 가까운 페이지로 보낸다(2026-10-21).
  permanentRedirect("/guides/basics/protein-source-types");
}
