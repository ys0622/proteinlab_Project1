import type { ProductDetailProps } from "../data/products";

const BRAND_SLUG_MAP: Record<string, string> = {
  셀렉스: "sellex",
  하이뮨: "hymune",
  닥터유: "dryou",
  베노프: "benof",
  요프로: "yopro",
  요플레: "yoplait",
  랩노쉬: "labnosh",
  플라이밀: "flymill",
  단백하니: "danbaekhani",
  뉴케어: "newcare",
  더단백: "danbaek",
  "매일 바이오": "maeil-bio",
  // 한글 브랜드명을 슬러그로 그대로 쓰면 정적 라우트에서 500 에러가 발생해
  // (OpenNext/Cloudflare 비ASCII 경로 처리 이슈) 전부 ASCII 슬러그로 매핑.
  하림: "harim",
  오늘단백: "oneuldanbaek",
  마이밀: "maymil",
  얼티브: "ultive",
  칼로바이: "calobye",
  테이크핏: "takefit",
  오트몬드: "oatmont",
  세븐일레븐: "7eleven",
  그린비아: "greenbia",
  롯데웰푸드: "lottewellfood",
  솔브앤고: "solveandgo",
  연세유업: "yonsei-dairy",
  서울우유: "seoulmilk",
  함소아제약: "hamsoa",
  커클랜드: "kirkland",
  비에스엔: "bsn",
  "퀘스트 뉴트리션": "quest-nutrition",
  포스트: "post",
  프로틴방앗간: "proteinbangatgan",
  온단백: "ondanbaek",
  힘내고: "himnaego",
  노브랜드: "nobrand",
  마이프로틴: "myprotein",
  씨알로: "cralo",
  크라운: "crown",
  올가니카: "organica",
  켈로그: "kellogg",
  곰곰: "gomgom",
  CJ제일제당: "cj-cheiljedang",
  빼바: "ppaeba",
  마켓오네이처: "marketo-nature",
  소이조이: "soyjoy",
  프로티원: "proteone",
  잇더핏: "itthefit",
  꼬박꼬밥: "kkobak-kobab",
  밀잇: "milit",
  룩트: "lookt",
  혜인담: "hyindam",
  올더배러: "allthebetter",
  프롬잇: "fromit",
  크런틴: "cruntin",
  바지오: "baggio",
  쉐이크베이비: "shakebaby",
  후디스: "hoodis",
  상하목장: "sangha",
  풀무원다논: "pulmuone-dannon",
  그릭데이: "greekday",
  덴마크: "denmark",
};

export function brandToSlug(brand: string) {
  return (
    BRAND_SLUG_MAP[brand] ??
    brand
      .trim()
      .toLowerCase()
      .replace(/\s+/g, "-")
  );
}

export function slugToBrand(slug: string, brands: string[]) {
  return brands.find((brand) => brandToSlug(brand) === slug) ?? null;
}

export function getBrandSummary(products: ProductDetailProps[]) {
  const byBrand = new Map<string, ProductDetailProps[]>();

  for (const product of products) {
    const list = byBrand.get(product.brand) ?? [];
    list.push(product);
    byBrand.set(product.brand, list);
  }

  return [...byBrand.entries()]
    .map(([brand, items]) => ({
      brand,
      slug: brandToSlug(brand),
      total: items.length,
      categories: [...new Set(items.map((item) => item.productType))].filter(Boolean),
      items,
    }))
    .sort((a, b) => b.total - a.total || a.brand.localeCompare(b.brand));
}
