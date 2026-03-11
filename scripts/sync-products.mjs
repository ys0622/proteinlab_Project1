/**
 * proteinlab.kr 기반 제품 데이터 동기화 스크립트
 * 1) /drinks, /bars 목록 페이지에서 slug 목록 수집
 * 2) /product/{slug}, /bar/{slug} 상세 페이지에서 영양정보 파싱
 * 3) 로컬 이미지 파일명과 자동 매칭
 * 출력: app/data/drinkProductsData.json, app/data/barProductsData.json
 */
import * as cheerio from 'cheerio';
import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const BASE_URL = 'https://proteinlab.kr';
const CONCURRENCY = 3;
const DELAY_MS = 500;
const DRINK_TAG_OVERRIDES = {
  'newcare-all-protein-41g': ['팩'],
  'takefit-monster-goso-350': ['PET'],
  'takefit-monster-chocobanana-350': ['PET'],
};

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function fetchWithRetry(url, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url, {
        headers: { 'User-Agent': 'ProteinLab-Sync/1.0', 'Accept': 'text/html' }
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.text();
    } catch (e) {
      if (i === retries - 1) throw e;
      console.warn(`  Retry ${i + 1} for ${url}: ${e.message}`);
      await sleep(1000 * (i + 1));
    }
  }
}

function parseNum(str) {
  if (!str || str === '—' || str === '-') return undefined;
  const m = str.match(/([\d.]+)/);
  return m ? parseFloat(m[1]) : undefined;
}

function getDrinkTags(slug, tags) {
  return DRINK_TAG_OVERRIDES[slug] ?? tags;
}

// ── 목록 페이지에서 slug 수집 ──
async function getDrinkSlugs() {
  const html = await fetchWithRetry(`${BASE_URL}/drinks`);
  const $ = cheerio.load(html);
  const slugs = new Set();
  $('a[href*="/product/"]').each((_, el) => {
    const m = $(el).attr('href')?.match(/\/product\/([^/?#]+)/);
    if (m) slugs.add(m[1]);
  });
  return [...slugs];
}

async function getBarSlugs() {
  const html = await fetchWithRetry(`${BASE_URL}/bars`);
  const $ = cheerio.load(html);
  const slugs = new Set();
  $('a[href*="/bar/"]').each((_, el) => {
    const href = $(el).attr('href') || '';
    const m = href.match(/\/bar\/([^/?#]+)/);
    if (m && !['high-protein', 'mid-protein', 'low-sugar', 'low-calorie',
      'chocolate-bars', 'nut-bars', 'no-nut-bars', 'large-bars',
      'small-bars', 'high-protein-density'].includes(m[1])) {
      slugs.add(m[1]);
    }
  });
  return [...slugs];
}

// ── RSC 페이로드에서 nutritionPerBottle 추출 ──
function extractNutritionFromRSC(html) {
  const match = html.match(/\\?"nutritionPerBottle\\?"\s*:\s*\{([^}]+)\}/);
  if (!match) return null;
  try {
    const fixed = `{${match[1]}}`.replace(/\\"/g, '"');
    return JSON.parse(fixed);
  } catch { return null; }
}

// ── 음료 상세 페이지 파싱 ──
function parseDrinkPage(html, slug) {
  const $ = cheerio.load(html);

  if ($('title').text().includes('찾을 수 없')) return null;

  const rawData = {};
  $('p[class*="opacity-60"]').each((_, el) => {
    const label = $(el).text().trim();
    const value = $(el).next('p').text().trim();
    if (label && value) rawData[label] = value;
  });

  const brandEl = $('p[class*="text-sm text-gray-400"]').first();
  const brand = brandEl.contents().first().text().trim();
  const manufacturer = $('span[class*="ml-2 text-xs text-gray-400"]').text().replace('·', '').trim() || undefined;
  const productName = $('h1').first().text().trim();
  const flavorText = $('p[class*="text-sm text-gray-500"]').first().text().trim();
  const flavor = flavorText.startsWith('맛:') ? flavorText.replace('맛:', '').trim() :
    (flavorText && !flavorText.includes('·') ? flavorText : undefined);

  const displayName = flavor ? `${productName} (${flavor})` : productName;

  const gradeTags = [];
  $('span[class*="whitespace-nowrap"]').each((_, el) => {
    const t = $(el).text().trim();
    if (t.startsWith('단백질 밀도') || t.startsWith('다이어트') || t.startsWith('퍼포먼스')) {
      gradeTags.push(t);
    }
  });

  const protein = parseNum(rawData['단백질']);
  const calories = parseNum(rawData['칼로리']);
  const sugar = parseNum(rawData['당류']);
  const densityStr = rawData['단백질밀도'] || rawData['단백질 밀도'] || '';
  const capacity = rawData['용량'] || '';
  const lactofree = rawData['락토프리'] === 'O';
  const bcaa = rawData['BCAA'] || undefined;
  const proteinSource = rawData['단백질 급원'] || undefined;
  const fat = parseNum(rawData['지방']);
  const sodium = parseNum(rawData['나트륨']);
  const calorieDensity = rawData['칼로리밀도'] || rawData['칼로리 밀도'] || undefined;
  const drinkType = rawData['음료 타입'] || undefined;

  const tags = [];
  $('span[class*="rounded-full"][class*="px-2"]').each((_, el) => {
    const t = $(el).text().trim();
    if (['팩', '밀크형', '워터형', 'PET', '캔'].includes(t)) tags.push(t);
  });
  if (tags.length === 0) {
    const capacityNum = parseNum(capacity);
    if (drinkType === '워터형') { tags.push('PET', '워터형'); }
    else if (capacityNum && capacityNum <= 200) { tags.push('팩'); }
    else { tags.push('팩', '밀크형'); }
  }

  // RSC 페이로드에서 상세 영양정보 추출
  const nutrition = extractNutritionFromRSC(html);
  const nutritionPerBottle = nutrition ? {
    caloriesKcal: nutrition.caloriesKcal,
    proteinG: nutrition.proteinG,
    carbsG: nutrition.carbsG,
    sugarsG: nutrition.sugarsG,
    fatG: nutrition.fatG,
    satFatG: nutrition.satFatG,
    sodiumMg: nutrition.sodiumMg,
    ...(nutrition.fiberG != null && { fiberG: nutrition.fiberG }),
    ...(nutrition.bcaaMg != null && { bcaaMg: nutrition.bcaaMg }),
    ...(nutrition.transFatG != null && { transFatG: nutrition.transFatG }),
    ...(nutrition.cholesterolMg != null && { cholesterolMg: nutrition.cholesterolMg }),
  } : undefined;

  return {
    slug, brand, name: displayName, capacity,
    variant: lactofree ? '락토프리' : '일반',
    tags: getDrinkTags(slug, tags), proteinPerServing: protein ?? 0,
    calories, sugar, density: densityStr,
    productUrl: '#', productType: 'drink', gradeTags,
    manufacturer, flavor,
    bcaa, proteinSource, fat, sodium, calorieDensity, drinkType,
    ...(nutritionPerBottle && { nutritionPerBottle }),
  };
}

// ── 바 상세 페이지 파싱 ──
function parseBarPage(html, slug) {
  const $ = cheerio.load(html);

  if ($('title').text().includes('찾을 수 없')) return null;

  const brand = $('p[class*="text-[11px]"][class*="font-medium"]').first().text().trim();
  const h1 = $('h1').first();
  const productName = h1.clone().children().remove().end().text().trim();
  const flavorSpan = h1.find('span').text().trim();
  const displayName = flavorSpan ? `${productName} ${flavorSpan}` : productName;
  const capacityLine = $('p[class*="text-[12px]"][class*="text-stone"]').first().text().trim();
  const capacity = capacityLine.split('·')[0].trim();

  const values = [];
  const labels = [];
  $('p[class*="text-[16px]"][class*="font-extrabold"]').each((_, el) => {
    values.push($(el).text().trim());
  });
  $('p[class*="text-[10px]"][class*="text-stone"]').each((_, el) => {
    labels.push($(el).text().trim());
  });

  const rawData = {};
  for (let i = 0; i < Math.min(labels.length, values.length); i++) {
    rawData[labels[i]] = values[i];
  }

  let fat, sodium;
  $('p').each((_, el) => {
    const t = $(el).text().trim();
    if (t.startsWith('지방:')) fat = parseNum(t.replace('지방:', ''));
    if (t.startsWith('나트륨:')) sodium = parseNum(t.replace('나트륨:', ''));
  });

  const protein = parseNum(rawData['단백질']);
  const calories = parseNum(rawData['칼로리']);
  const sugar = parseNum(rawData['당류']);

  const densityVal = (calories && protein && calories > 0)
    ? `${(protein / calories * 100).toFixed(2)}g/100kcal`
    : '—';

  return {
    slug, brand, name: displayName, capacity,
    variant: '일반', tags: ['바'],
    proteinPerServing: protein ?? 0,
    calories, sugar, density: densityVal,
    productUrl: '#', productType: 'bar', gradeTags: [],
    fat, sodium,
  };
}

// ── 이미지 매칭: slugToImage.json 기반 ──
function buildImageMapping() {
  const jsonPath = resolve(__dirname, '../app/data/slugToImage.json');
  let existing = {};
  try { existing = JSON.parse(readFileSync(jsonPath, 'utf-8')); } catch { /* ignore */ }
  const map = {};
  for (const [slug, filename] of Object.entries(existing)) {
    const parsed = filename.match(/^(.+?)\s+(\d+)g\s+(\d+)ml\.png$/i);
    if (parsed) {
      const key = normalizeKey(parsed[1]);
      map[key] = { localSlug: slug, filename };
    }
  }
  return map;
}

function normalizeKey(str) {
  return str.replace(/\s+/g, '').replace(/[()（）]/g, '').toLowerCase();
}

function findImageMatch(product, imageMap) {
  // 브랜드 + 제품명 + 맛으로 매칭 시도
  const nameVariants = [
    `${product.brand} ${product.name}`,
    product.name,
  ];
  if (product.flavor) {
    nameVariants.unshift(`${product.brand} ${product.name.replace(` (${product.flavor})`, '')} (${product.flavor})`);
  }

  for (const variant of nameVariants) {
    const key = normalizeKey(variant);
    for (const [mapKey, val] of Object.entries(imageMap)) {
      if (mapKey.includes(key) || key.includes(mapKey)) {
        return val;
      }
    }
  }

  // 단백질량 + 용량으로 부분 매칭 시도
  const protein = product.proteinPerServing;
  const vol = parseNum(product.capacity);
  if (protein && vol) {
    for (const [mapKey, val] of Object.entries(imageMap)) {
      const fn = val.filename;
      if (fn.includes(`${protein}g`) && fn.includes(`${vol}ml`)) {
        const brandNorm = normalizeKey(product.brand);
        const mapNorm = normalizeKey(fn.split(' ')[0]);
        if (brandNorm === mapNorm || fn.toLowerCase().includes(product.brand.toLowerCase())) {
          return val;
        }
      }
    }
  }

  return null;
}

// ── 배치 실행 ──
async function processInBatches(items, processFn, concurrency) {
  const results = [];
  for (let i = 0; i < items.length; i += concurrency) {
    const batch = items.slice(i, i + concurrency);
    const batchResults = await Promise.all(batch.map(processFn));
    results.push(...batchResults);
    if (i + concurrency < items.length) await sleep(DELAY_MS);
    process.stdout.write(`\r  진행: ${Math.min(i + concurrency, items.length)}/${items.length}`);
  }
  console.log();
  return results;
}

// ── 메인 ──
async function main() {
  console.log('=== proteinlab.kr 제품 slug 수집 ===');
  const drinkSlugs = await getDrinkSlugs();
  console.log(`음료: ${drinkSlugs.length}개`);
  const barSlugs = await getBarSlugs();
  console.log(`바: ${barSlugs.length}개`);

  const imageMap = buildImageMapping();
  console.log(`로컬 이미지 파일: ${Object.keys(imageMap).length}개`);

  // 음료 상세 크롤링
  console.log('\n=== 음료 제품 크롤링 ===');
  const drinkResults = await processInBatches(drinkSlugs, async (slug) => {
    try {
      const html = await fetchWithRetry(`${BASE_URL}/product/${slug}`);
      return parseDrinkPage(html, slug);
    } catch (e) {
      console.error(`\n  ✗ ${slug}: ${e.message}`);
      return null;
    }
  }, CONCURRENCY);
  const drinks = drinkResults.filter(Boolean);
  console.log(`음료 ${drinks.length}/${drinkSlugs.length}개 성공`);

  // 이미지 매칭
  let drinkImageMatched = 0;
  const newSlugToImage = {};
  for (const d of drinks) {
    const match = findImageMatch(d, imageMap);
    if (match) {
      d.imageSlug = match.localSlug;
      newSlugToImage[d.slug] = match.filename;
      drinkImageMatched++;
    }
  }
  console.log(`이미지 매칭: ${drinkImageMatched}/${drinks.length}개`);

  // 바 상세 크롤링
  console.log('\n=== 바 제품 크롤링 ===');
  const barResults = await processInBatches(barSlugs, async (slug) => {
    try {
      const html = await fetchWithRetry(`${BASE_URL}/bar/${slug}`);
      return parseBarPage(html, slug);
    } catch (e) {
      console.error(`\n  ✗ ${slug}: ${e.message}`);
      return null;
    }
  }, CONCURRENCY);
  const bars = barResults.filter(Boolean);
  console.log(`바 ${bars.length}/${barSlugs.length}개 성공`);

  // JSON 저장
  const drinkOutPath = resolve(__dirname, '../app/data/drinkProductsData.json');
  const barOutPath = resolve(__dirname, '../app/data/barProductsData.json');
  const imageMapOutPath = resolve(__dirname, '../app/data/slugToImage.json');

  writeFileSync(drinkOutPath, JSON.stringify(drinks, null, 2), 'utf-8');
  writeFileSync(barOutPath, JSON.stringify(bars, null, 2), 'utf-8');

  // 기존 이미지 매핑 보존 + 새 매칭 추가
  let existingImageMap = {};
  try { existingImageMap = JSON.parse(readFileSync(imageMapOutPath, 'utf-8')); } catch { /* ignore */ }
  const mergedImageMap = { ...existingImageMap, ...newSlugToImage };
  writeFileSync(imageMapOutPath, JSON.stringify(mergedImageMap, null, 2), 'utf-8');

  console.log(`\n✓ ${drinkOutPath}`);
  console.log(`✓ ${barOutPath}`);
  console.log(`✓ ${imageMapOutPath} (${Object.keys(mergedImageMap).length} entries)`);

  // 매칭 안 된 제품 표시
  const unmatched = drinks.filter(d => !d.imageSlug);
  if (unmatched.length > 0) {
    console.log(`\n⚠ 이미지 미매칭 제품 (${unmatched.length}개):`);
    unmatched.forEach(d => console.log(`  ${d.slug}: ${d.brand} ${d.name}`));
  }
}

main().catch(console.error);
