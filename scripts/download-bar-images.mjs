/**
 * proteinlab.kr에서 단백질 바 제품 이미지를 다운로드하는 스크립트
 * HTML img 태그에서 /product-images/ 경로의 이미지를 추출 → public/bar-image/ 에 저장
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const BASE_URL = 'https://proteinlab.kr';
const IMAGE_DIR = resolve(__dirname, '../public/bar-image');
const CONCURRENCY = 3;
const DELAY_MS = 500;

function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function fetchWithRetry(url, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url, {
        headers: { 'User-Agent': 'ProteinLab-Sync/1.0' }
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res;
    } catch (e) {
      if (i === retries - 1) throw e;
      await sleep(1000 * (i + 1));
    }
  }
}

function extractImageUrl(html) {
  const match = html.match(/src="(\/product-images\/[^"]+)"/);
  if (match) return BASE_URL + match[1];
  return null;
}

async function main() {
  if (!existsSync(IMAGE_DIR)) mkdirSync(IMAGE_DIR, { recursive: true });

  const barsPath = resolve(__dirname, '../app/data/barProductsData.json');
  const bars = JSON.parse(readFileSync(barsPath, 'utf8'));
  console.log(`=== 단백질 바 이미지 다운로드 (${bars.length}개) ===\n`);

  const slugToBarImage = {};
  let downloaded = 0;
  let skipped = 0;
  let failed = 0;

  for (let i = 0; i < bars.length; i += CONCURRENCY) {
    const batch = bars.slice(i, i + CONCURRENCY);
    await Promise.all(batch.map(async (bar) => {
      try {
        const pageRes = await fetchWithRetry(`${BASE_URL}/bar/${bar.slug}`);
        const html = await pageRes.text();
        const imageUrl = extractImageUrl(html);

        if (!imageUrl) {
          skipped++;
          return;
        }

        const ext = imageUrl.match(/\.(png|jpg|jpeg|webp)/)?.[1] || 'png';
        const filename = `${bar.slug}.${ext}`;
        const filepath = resolve(IMAGE_DIR, filename);

        if (existsSync(filepath)) {
          slugToBarImage[bar.slug] = filename;
          downloaded++;
          return;
        }

        const imgRes = await fetchWithRetry(encodeURI(imageUrl));
        const buffer = Buffer.from(await imgRes.arrayBuffer());
        writeFileSync(filepath, buffer);
        slugToBarImage[bar.slug] = filename;
        downloaded++;
        console.log(`  ✓ ${bar.slug} (${(buffer.length / 1024).toFixed(1)}KB)`);
      } catch (e) {
        console.log(`  ✗ ${bar.slug}: ${e.message}`);
        failed++;
      }
    }));
    if (i + CONCURRENCY < bars.length) await sleep(DELAY_MS);
    process.stdout.write(`\r  진행: ${Math.min(i + CONCURRENCY, bars.length)}/${bars.length}`);
  }
  console.log(`\n\n다운로드: ${downloaded}, 이미지 없음: ${skipped}, 실패: ${failed}`);

  const mapPath = resolve(__dirname, '../app/data/slugToBarImage.json');
  writeFileSync(mapPath, JSON.stringify(slugToBarImage, null, 2), 'utf8');
  console.log(`✓ ${mapPath} (${Object.keys(slugToBarImage).length} entries)`);
}

main().catch(console.error);
