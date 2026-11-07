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
  "딜라이트 프로젝트": "delight-project",
  한손한끼: "hansonhankki",
  매일한끼: "maeilhankki",
  스포식스: "sportsix",
  후디스: "hoodis",
  상하목장: "sangha",
  풀무원다논: "pulmuone-dannon",
  그릭데이: "greekday",
  덴마크: "denmark",
  오뚜기: "ottogi",
  퓨어틴: "puretein",
  매일두유: "maeil-soymilk",
  베지밀: "vegemil",
  맛있는두유: "gt-soymilk",
  클릭유: "clickyou",
  연세두유: "yonsei-soymilk",
  이롬: "erom",
  그레인랩: "grainlab",
  밥스누: "bobsnu",
  케어웰: "carewell",
  콩앤콩: "kongnkong",
  완전두유: "wanjeon-soymilk",
  소이비랩: "soybilab",
  삼육두유: "sahmyook-soymilk",
  앱솔리: "absolli",
  베어벨즈: "barebells",
  곡물도감: "gokmuldogam",
  그레네이드: "grenade",
  // 2026-11-03 파우더 카테고리 브랜드(한글 slug는 Workers 정적 내보내기에서 깨진다)
  "BPI 스포츠": "bpi-sports",
  "EVL뉴트리션": "evl-nutrition",
  경성포유틴: "kyungsung-foutin",
  나우푸드: "now-foods",
  뉴욕웨이: "newyork-whey",
  뉴트리라이트: "nutrilite",
  다이마타이즈: "dymatize",
  스포츠리서치: "sports-research",
  머슬테크: "muscletech",
  머슬팜: "musclepharm",
  미트리: "meatree",
  옵티멈뉴트리션: "optimum-nutrition",
  원데이뉴트리션: "oneday-nutrition",
  웰핏: "wellfit",
  인테로: "intero",
  퍼스널벌크포뮬러: "personal-bulk-formula",
  푸른빈: "purunbean",
  프로틴스토리: "protein-story",
  프로틴컴퍼니: "protein-company",
  // 2026-11-04 신제품(두유·쉐이크)
  파이토메이드: "phytomade",
  바디랩: "bodylab", // 2026-11-05 두유
  허닭: "heodak", // 2026-11-05 바
  ONE: "one-brands", // 2026-11-05 프로틴바
  파스퇴르: "pasteur", // 2026-11-05 음료
  셀렉더요그: "selecttheyog", // 2026-11-05 요거트
  성균관: "sungkyunkwan",
  총각네: "chonggakne",
  코어리지: "coreage",
  아임푸디: "imfoody",
  프로우틴: "proutin",
  린코어: "leancore",
  // 2026-11-05 파우더 2차
  아이소퓨어: "isopure",
  오늘의바디: "oneul-body",
  베네틴: "benetin",
  스타트프로틴: "startprotein",
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
