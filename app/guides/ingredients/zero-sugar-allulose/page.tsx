import { permanentRedirect } from "next/navigation";

export default function ZeroSugarAlluloseRedirectPage() {
  // 원래 대상은 삭제돼 404였다. 당류 낮은 제품 가이드로 보낸다(2026-10-21).
  permanentRedirect("/guides/product-selection-comparison/low-sugar-protein-products-guide");
}
