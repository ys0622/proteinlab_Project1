import type { ProductDetailProps } from "./products";
import slugToImageData from "./slugToImage.json";

const slugToImageFilename: Record<string, string> = slugToImageData;

/**
 * 이미지 파일명 패턴: "브랜드 제품명 (맛) 단백질g 용량ml.png"
 * 예: "뉴케어 올프로틴 (초콜릿) 25g 245ml.png"
 */
function parseFilename(filename: string) {
  const m = filename.match(/^(.+?)\s+(\d+)g\s+(\d+)ml\.png$/i);
  if (!m) return null;
  const fullName = m[1].trim();
  const protein = parseInt(m[2], 10);
  const volume = parseInt(m[3], 10);

  const parenMatch = fullName.match(/^(.+?)\s*\(([^)]+)\)$/);
  let brandAndProduct: string;
  let flavor: string | undefined;
  if (parenMatch) {
    brandAndProduct = parenMatch[1].trim();
    flavor = parenMatch[2].trim();
  } else {
    brandAndProduct = fullName;
  }

  const parts = brandAndProduct.split(/\s+/);
  const brand = parts[0];
  const productName = parts.slice(1).join(" ");

  const displayName = flavor ? `${productName} (${flavor})` : productName;

  return { brand, name: displayName, protein, volume, flavor };
}

function inferTags(name: string, volume: number): string[] {
  const lower = name.toLowerCase();
  if (lower.includes("워터") || lower.includes("스파클링")) return ["PET", "워터형"];
  if (volume <= 200) return ["팩"];
  return ["팩", "밀크형"];
}

export function getDrinkProductsFromImageMap(): ProductDetailProps[] {
  const products: ProductDetailProps[] = [];

  for (const [slug, filename] of Object.entries(slugToImageFilename)) {
    const parsed = parseFilename(filename as string);
    if (!parsed) continue;

    const density = parsed.volume > 0
      ? (parsed.protein / parsed.volume * 100).toFixed(1)
      : "0.0";

    products.push({
      slug,
      brand: parsed.brand,
      name: parsed.name,
      capacity: `${parsed.volume}mL`,
      variant: "일반",
      tags: inferTags(parsed.name, parsed.volume),
      proteinPerServing: parsed.protein,
      sugar: 0,
      density: `${density}g/100ml`,
      productUrl: "#",
      productType: "drink",
      gradeTags: [],
    });
  }

  return products;
}
