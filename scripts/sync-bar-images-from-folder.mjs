/**
 * Bar image 폴더의 이미지를 public/bar-image로 복사하고
 * slugToBarImage.json 및 barProductsData.json 업데이트
 */
import { readFileSync, writeFileSync, copyFileSync, existsSync, mkdirSync } from "fs";
import { resolve, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const BAR_IMAGE_SRC = resolve(__dirname, "../Bar image");
const BAR_IMAGE_DEST = resolve(__dirname, "../public/bar-image");
const BARS_DATA_PATH = resolve(__dirname, "../app/data/barProductsData.json");
const SLUG_MAP_PATH = resolve(__dirname, "../app/data/slugToBarImage.json");

// 한글 파일명 → slug 매핑 (이미지만 있는 신규 제품은 NEW로 표시)
const IMAGE_TO_SLUG = {
  "퀘스트 뉴트리션 단백질바 (딥 초콜릿칩 쿠키 반죽).png": "quest-nutrition-protein-bar-deep-chocolate-chip-cookie-dough-60",
  "온단백 프로틴바 (초콜릿퍼지).png": "ondanbaek-protein-bar-chocolate-fudge-50",
  "퀘스트 뉴트리션 단백질바 (레몬 케이크).png": "quest-nutrition-protein-bar-lemon-cake-60",
  "커클랜드 프로틴바 (초콜릿 브라우니).png": "kirkland-proteinbar-choco-brownie",
  "퀘스트 뉴트리션 단백질바 (민트 초콜릿 청크).png": "quest-nutrition-protein-bar-mint-chocolate-chunk-60",
  "퀘스트 뉴트리션 단백질바 (쿠키 앤 크림).png": "quest-nutrition-protein-bar-cookie-cream-60",
  "퀘스트 뉴트리션 단백질바 (초콜릿 땅콩 버터).png": "quest-nutrition-protein-bar-chocolate-peanutbutter-60",
  "퀘스트 뉴트리션 단백질바 (초콜릿 칩 쿠키 반죽).png": "quest-nutrition-protein-bar-chocolate-chip-cookie-dough-60",
  "퀘스트 뉴트리션 단백질바 (더블 초콜릿 청크).png": "quest-nutrition-protein-bar-double-chocolate-chunk-60",
  "커클랜드 프로틴바 (초콜릿 칩 쿠키 도우).png": "kirkland-proteinbar-choco-chip-cookie-dough-60",
  "온단백 프로틴바 (애플크랜베리).png": "ondanbaek-protein-bar-apple-cranberry-50",
  "퀘스트 뉴트리션 단백질바 (블루베리 머핀).png": "quest-nutrition-protein-bar-blueberry-muffin-60",
  "힘내고 단백질바 (다크 초콜릿).png": "himnaego-protein-bar-dark-chocolate-50",
  "퀘스트 뉴트리션 단백질바 (화이트 초콜릿 라즈베리).png": "quest-nutrition-protein-bar-white-chocolate-raspberry-60",
  "퀘스트 뉴트리션 단백질바 (오트밀 초콜리 칩).png": "quest-nutrition-protein-bar-oatmeal-chocolate-chip-60",
  "퀘스트 뉴트리션 (단백질바 딥 쿠키 & 크림).png": "quest-nutrition-protein-bar-deep-dish-cookie-cream-60",
  "퀘스트 뉴트리션 단백질바 (스모어).png": "quest-nutrition-protein-bar-smores-60",
  // 이미지 없는 제품 (추가 시 아래 매핑 사용)
  "노브랜드 단백질바 초코.png": "nobrand-proteinbar-choco",
  "더단백 크런치바 (초코).png": "thedanbaek-crunchbar-choco",
  "셀렉스 프로틴바 베리오트.png": "selex-proteinbar-berryoat",
  "더단백 크런치바 (피넛버터).png": "thedanbaek-crunchbar-peanutbutter",
  "더단백 마일드바 (아몬드쿠키).png": "thedanbaek-mildbar-almondcookie",
  "마이밀 뉴프로틴바.png": "mymil-new-proteinbar",
  "단백하니 프로틴바 (초코).png": "danbaekhani-protein-bar-choco-38",
  "단백하니 프로틴바 시그니처.png": "danbaekhani-protein-bar-signature-31",
  "랩노쉬 푸드바 마일드 초코.png": "labnosh-foodbar-mildchoco",
  "하루단백바 카카오.png": "harudanbaek-cacao",
  "씨알로 식물성단백질바.png": "cralo-plant-proteinbar",
  "크라운 고단백질초코바.png": "crown-highprotein-chocobar",
  "칼로바이 하루견과 단백질바.png": "calobye-daily-nuts-proteinbar",
  "올가니카 올라 츄이프로틴바 (베리아몬드).png": "organica-ola-chewy-protein-bar-berry-almond-35",
  "켈로그 프로틴 그래놀라바 고소한맛 (고소한맛).png": "kellogg-protein-granolabar-savory",
  "켈로그 프로틴바K (견과).png": "kellogg-proteinbark-nuts",
  "켈로그 프로틴바K (카라멜&넛).png": "kellogg-proteinbark-caramel-nuts",
  "켈로그 프로틴바K (헤이즐넛&다크초코).png": "kellogg-proteinbark-hazelnut-darkchoco",
  "올가니카 올라 츄이프로틴바 (피넛카카오).png": "organica-ola-chewy-protein-bar-peanut-cacao-35",
  "노브랜드 단백질바 미니.png": "nobrand-proteinbar-mini",
  "롯데웰푸드 이지프로틴 고단백질바 (크리스피).png": "lottewellfood-easyprotein-highprotein-crispy",
  "롯데웰푸드 이지프로틴 에너지단백질바.png": "lottewellfood-easyprotein-energy-bar",
};

// 신규 제품 데이터 (slug만 있는 제품)
const NEW_BAR_PRODUCTS = [
  {
    slug: "quest-nutrition-protein-bar-deep-chocolate-chip-cookie-dough-60",
    brand: "퀘스트 뉴트리션",
    name: "단백질바 (딥 초콜릿칩 쿠키 반죽)",
    capacity: "60g",
    variant: "일반",
    tags: ["바"],
    proteinPerServing: 20,
    calories: 170,
    sugar: 1,
    density: "11.76g/100kcal",
    productUrl: "#",
    productType: "bar",
    gradeTags: [],
    fat: 7,
    sodium: 200,
  },
  {
    slug: "quest-nutrition-protein-bar-lemon-cake-60",
    brand: "퀘스트 뉴트리션",
    name: "단백질바 (레몬 케이크)",
    capacity: "60g",
    variant: "일반",
    tags: ["바"],
    proteinPerServing: 20,
    calories: 170,
    sugar: 1,
    density: "11.76g/100kcal",
    productUrl: "#",
    productType: "bar",
    gradeTags: [],
    fat: 7,
    sodium: 200,
  },
  {
    slug: "quest-nutrition-protein-bar-mint-chocolate-chunk-60",
    brand: "퀘스트 뉴트리션",
    name: "단백질바 (민트 초콜릿 청크)",
    capacity: "60g",
    variant: "일반",
    tags: ["바"],
    proteinPerServing: 20,
    calories: 170,
    sugar: 1,
    density: "11.76g/100kcal",
    productUrl: "#",
    productType: "bar",
    gradeTags: [],
    fat: 7,
    sodium: 200,
  },
  {
    slug: "quest-nutrition-protein-bar-cookie-cream-60",
    brand: "퀘스트 뉴트리션",
    name: "단백질바 (쿠키 앤 크림)",
    capacity: "60g",
    variant: "일반",
    tags: ["바"],
    proteinPerServing: 20,
    calories: 170,
    sugar: 1,
    density: "11.76g/100kcal",
    productUrl: "#",
    productType: "bar",
    gradeTags: [],
    fat: 7,
    sodium: 200,
  },
  {
    slug: "quest-nutrition-protein-bar-chocolate-chip-cookie-dough-60",
    brand: "퀘스트 뉴트리션",
    name: "단백질바 (초콜릿 칩 쿠키 반죽)",
    capacity: "60g",
    variant: "일반",
    tags: ["바"],
    proteinPerServing: 20,
    calories: 170,
    sugar: 1,
    density: "11.76g/100kcal",
    productUrl: "#",
    productType: "bar",
    gradeTags: [],
    fat: 7,
    sodium: 200,
  },
  {
    slug: "quest-nutrition-protein-bar-blueberry-muffin-60",
    brand: "퀘스트 뉴트리션",
    name: "단백질바 (블루베리 머핀)",
    capacity: "60g",
    variant: "일반",
    tags: ["바"],
    proteinPerServing: 20,
    calories: 170,
    sugar: 1,
    density: "11.76g/100kcal",
    productUrl: "#",
    productType: "bar",
    gradeTags: [],
    fat: 7,
    sodium: 200,
  },
  {
    slug: "quest-nutrition-protein-bar-white-chocolate-raspberry-60",
    brand: "퀘스트 뉴트리션",
    name: "단백질바 (화이트 초콜릿 라즈베리)",
    capacity: "60g",
    variant: "일반",
    tags: ["바"],
    proteinPerServing: 20,
    calories: 170,
    sugar: 1,
    density: "11.76g/100kcal",
    productUrl: "#",
    productType: "bar",
    gradeTags: [],
    fat: 7,
    sodium: 200,
  },
  {
    slug: "quest-nutrition-protein-bar-deep-dish-cookie-cream-60",
    brand: "퀘스트 뉴트리션",
    name: "단백질바 (딥 쿠키 & 크림)",
    capacity: "60g",
    variant: "일반",
    tags: ["바"],
    proteinPerServing: 20,
    calories: 170,
    sugar: 1,
    density: "11.76g/100kcal",
    productUrl: "#",
    productType: "bar",
    gradeTags: [],
    fat: 7,
    sodium: 200,
  },
  {
    slug: "quest-nutrition-protein-bar-smores-60",
    brand: "퀘스트 뉴트리션",
    name: "단백질바 (스모어)",
    capacity: "60g",
    variant: "일반",
    tags: ["바"],
    proteinPerServing: 20,
    calories: 170,
    sugar: 1,
    density: "11.76g/100kcal",
    productUrl: "#",
    productType: "bar",
    gradeTags: [],
    fat: 7,
    sodium: 200,
  },
  {
    slug: "kirkland-proteinbar-choco-chip-cookie-dough-60",
    brand: "커클랜드",
    name: "프로틴바 (초콜릿 칩 쿠키 도우)",
    capacity: "60g",
    variant: "일반",
    tags: ["바"],
    proteinPerServing: 21,
    calories: 220,
    sugar: 5,
    density: "9.55g/100kcal",
    productUrl: "#",
    productType: "bar",
    gradeTags: [],
    fat: 7,
    sodium: 150,
  },
];

function main() {
  if (!existsSync(BAR_IMAGE_SRC)) {
    console.error("Bar image 폴더가 없습니다:", BAR_IMAGE_SRC);
    process.exit(1);
  }

  if (!existsSync(BAR_IMAGE_DEST)) {
    mkdirSync(BAR_IMAGE_DEST, { recursive: true });
  }

  const bars = JSON.parse(readFileSync(BARS_DATA_PATH, "utf8"));
  const existingSlugs = new Set(bars.map((b) => b.slug));
  const slugToBarImage = JSON.parse(readFileSync(SLUG_MAP_PATH, "utf8"));

  let copied = 0;
  const toAdd = [];

  for (const [filename, slug] of Object.entries(IMAGE_TO_SLUG)) {
    const srcPath = resolve(BAR_IMAGE_SRC, filename);
    if (!existsSync(srcPath)) {
      console.warn("  ⚠ 파일 없음:", filename);
      continue;
    }

    const destFilename = `${slug}.png`;
    const destPath = resolve(BAR_IMAGE_DEST, destFilename);
    copyFileSync(srcPath, destPath);
    slugToBarImage[slug] = destFilename;
    copied++;

    if (!existingSlugs.has(slug)) {
      const newProduct = NEW_BAR_PRODUCTS.find((p) => p.slug === slug);
      if (newProduct) {
        toAdd.push(newProduct);
      }
    }
  }

  if (toAdd.length > 0) {
    const updatedBars = [...bars, ...toAdd];
    writeFileSync(BARS_DATA_PATH, JSON.stringify(updatedBars, null, 2), "utf8");
    console.log(`✓ barProductsData.json: ${toAdd.length}개 신규 제품 추가`);
  }

  writeFileSync(SLUG_MAP_PATH, JSON.stringify(slugToBarImage, null, 2), "utf8");
  console.log(`✓ slugToBarImage.json: ${Object.keys(slugToBarImage).length}개 매핑`);
  console.log(`✓ 이미지 ${copied}개 복사 완료`);
}

main();
