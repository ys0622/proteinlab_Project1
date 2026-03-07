/**
 * proteinlab.kr 큐레이션 콘텐츠 동기화 스크립트
 * 음료: /picks/{slug}, 바: /bars/{slug}
 * 출력: app/data/picksContent.json
 */
import * as cheerio from 'cheerio';
import { writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const BASE_URL = 'https://proteinlab.kr';
const DELAY_MS = 800;

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

function parsePicksPage(html) {
  const $ = cheerio.load(html);

  // script, style, nav, header, footer 제거
  $('script, style, nav, header, footer').remove();

  const description = [];
  const recommendations = [];
  const criteria = [];
  const faq = [];

  // h1 이후 형제 <p> 요소들이 설명 문단
  const h1 = $('h1').first();
  let el = h1.next();
  while (el.length && el[0].tagName !== 'h2' && el[0].tagName !== 'section') {
    if (el[0].tagName === 'p') {
      const text = el.text().trim();
      if (text.length > 10) description.push(text);
    }
    // div 안에 p가 있을 수 있음
    if (el[0].tagName === 'div') {
      el.find('p').each((_, p) => {
        const text = $(p).text().trim();
        if (text.length > 10) description.push(text);
      });
    }
    el = el.next();
  }

  // "이런 분에게 추천" 섹션
  const recH2 = $('h2').filter((_, e) => $(e).text().includes('이런 분에게 추천'));
  if (recH2.length) {
    let next = recH2.next();
    while (next.length && next[0].tagName !== 'h2') {
      next.find('li, p').each((_, e) => {
        const t = $(e).text().replace(/^[✓✔·•\-\s]+/g, '').trim();
        if (t.length > 3) recommendations.push(t);
      });
      if (next[0].tagName === 'li') {
        const t = next.text().replace(/^[✓✔·•\-\s]+/g, '').trim();
        if (t.length > 3) recommendations.push(t);
      }
      next = next.next();
    }
  }

  // 직접 탐색: body text 기반 (fallback)
  if (recommendations.length === 0) {
    const bodyText = $('body').text();
    const recIdx = bodyText.indexOf('이런 분에게 추천');
    const critIdx = bodyText.indexOf('선택 기준');
    if (recIdx > 0 && critIdx > recIdx) {
      const section = bodyText.substring(recIdx + '이런 분에게 추천'.length, critIdx);
      section.split(/[✓✔]/).filter(s => s.trim().length > 5).forEach(s => {
        recommendations.push(s.trim());
      });
    }
  }

  // "선택 기준" 섹션
  const critH2 = $('h2').filter((_, e) => $(e).text().includes('선택 기준'));
  if (critH2.length) {
    let next = critH2.next();
    while (next.length && next[0].tagName !== 'h2') {
      next.find('li, p').each((_, e) => {
        const t = $(e).text().replace(/^[·•\-\s]+/g, '').trim();
        if (t.length > 3) criteria.push(t);
      });
      if (next[0].tagName === 'li') {
        const t = next.text().replace(/^[·•\-\s]+/g, '').trim();
        if (t.length > 3) criteria.push(t);
      }
      next = next.next();
    }
  }

  if (criteria.length === 0) {
    const bodyText = $('body').text();
    const critIdx = bodyText.indexOf('선택 기준');
    const faqIdx = bodyText.indexOf('자주 묻는 질문');
    if (critIdx > 0) {
      const endIdx = faqIdx > critIdx ? faqIdx : critIdx + 500;
      const section = bodyText.substring(critIdx + '선택 기준'.length, endIdx);
      section.split(/[·•]/).filter(s => s.trim().length > 5).forEach(s => {
        const cleaned = s.replace(/기준:.*$/, '').trim();
        if (cleaned.length > 5) criteria.push(cleaned);
      });
    }
  }

  // FAQ 섹션
  const faqH2 = $('h2').filter((_, e) => $(e).text().includes('자주 묻는 질문'));
  if (faqH2.length) {
    const bodyText = $('body').text();
    const faqIdx = bodyText.indexOf('자주 묻는 질문');
    const endMarkers = ['전체 제품', '관련 큐레이션', '관련 비교'];
    let endIdx = bodyText.length;
    for (const marker of endMarkers) {
      const idx = bodyText.indexOf(marker, faqIdx + 10);
      if (idx > faqIdx && idx < endIdx) endIdx = idx;
    }
    const faqText = bodyText.substring(faqIdx + '자주 묻는 질문'.length, endIdx);
    const qaPairs = faqText.split(/Q\.\s*/g).filter(s => s.trim().length > 10);
    for (const pair of qaPairs) {
      const aIdx = pair.indexOf('A.');
      if (aIdx > 0) {
        const q = pair.substring(0, aIdx).trim().replace(/\?$/, '').trim();
        const a = pair.substring(aIdx + 2).trim();
        if (q && a) faq.push({ q, a });
      }
    }
  }

  return {
    description: description.join('\n\n'),
    recommendations,
    criteria,
    faq,
  };
}

const pickMappings = [
  { localSlug: 'zero-sugar', url: '/picks/zero-sugar' },
  { localSlug: 'light-protein-under-20', url: '/picks/light-protein-under-20' },
  { localSlug: 'high-protein-20', url: '/picks/high-protein-20' },
  { localSlug: 'high-protein', url: '/picks/high-protein' },
  { localSlug: 'protein-water', url: '/picks/protein-water' },
  { localSlug: 'lactose-free', url: '/picks/lactose-free' },
  { localSlug: 'value-a', url: '/picks/value-a' },
  { localSlug: 'diet-a', url: '/picks/diet-a' },
  { localSlug: 'fitness-a', url: '/picks/fitness-a' },
  { localSlug: 'vegan', url: '/picks/vegan' },
  { localSlug: 'bar-high-protein-20', url: '/bars/high-protein' },
  { localSlug: 'bar-high-protein-15', url: '/bars/mid-protein' },
  { localSlug: 'bar-low-sugar', url: '/bars/low-sugar' },
  { localSlug: 'bar-low-calorie', url: '/bars/low-calorie' },
  { localSlug: 'bar-choco', url: '/bars/chocolate-bars' },
  { localSlug: 'bar-nut', url: '/bars/nut-bars' },
  { localSlug: 'bar-no-nut', url: '/bars/no-nut-bars' },
  { localSlug: 'bar-large', url: '/bars/large-bars' },
  { localSlug: 'bar-small', url: '/bars/small-bars' },
  { localSlug: 'bar-high-density', url: '/bars/high-protein-density' },
];

async function main() {
  const results = {};

  for (const { localSlug, url } of pickMappings) {
    const fullUrl = `${BASE_URL}${url}`;
    process.stdout.write(`  ${localSlug} (${url})...`);
    try {
      const html = await fetchWithRetry(fullUrl);
      const content = parsePicksPage(html);
      results[localSlug] = content;
      console.log(` ✓ desc:${content.description.length}ch, ${content.recommendations.length} recs, ${content.criteria.length} crit, ${content.faq.length} faqs`);
    } catch (e) {
      console.log(` ✗ ${e.message}`);
      results[localSlug] = { description: '', recommendations: [], criteria: [], faq: [] };
    }
    await sleep(DELAY_MS);
  }

  const outPath = resolve(__dirname, '../app/data/picksContent.json');
  writeFileSync(outPath, JSON.stringify(results, null, 2), 'utf-8');
  console.log(`\n✓ ${outPath}`);
}

main().catch(console.error);
