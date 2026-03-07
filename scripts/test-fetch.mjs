import { readFileSync } from 'fs';

const html = readFileSync('scripts/recommend-page.html', 'utf8');

// Find all script src URLs
const scriptSrcs = [...html.matchAll(/src="([^"]*\.js[^"]*)"/g)].map(m => m[1]);
console.log('Script sources:');
scriptSrcs.forEach(s => console.log(`  ${s}`));

// Find the RSC payload chunks - look for quiz question data
// Search for patterns like "목적" or "단백질 보충 목적"
const rscStart = html.indexOf('<script>self.__next_f');
if (rscStart >= 0) {
  const rscSection = html.substring(rscStart);
  console.log(`\nRSC payload starts at ${rscStart}, length ${rscSection.length}`);
  
  // Look for encoded quiz data
  const quizPatterns = ['목적', '운동', '식사대용', '체중', '건강', '워터형', '밀크형', 
    '50kcal', '100kcal', '150kcal', '바나나', '초코', '오리지널'];
  for (const pat of quizPatterns) {
    const idx = rscSection.indexOf(pat);
    if (idx >= 0) {
      console.log(`\n"${pat}" found at RSC+${idx}:`);
      console.log(rscSection.substring(Math.max(0, idx - 150), idx + 300));
    }
  }
}

// Find the page component chunk URL (likely contains quiz logic)
const chunkUrls = [...html.matchAll(/"(\/[^"]*chunks[^"]*\.js)"/g)].map(m => m[1]);
console.log(`\n${chunkUrls.length} chunk URLs found`);

// Also check for inline scripts with quiz data
const inlineScripts = [...html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)];
console.log(`\n${inlineScripts.length} inline scripts found`);
for (const [, content] of inlineScripts) {
  if (content.includes('목적') || content.includes('운동') || content.includes('quiz') || content.includes('step')) {
    console.log('\n=== Quiz-related inline script ===');
    console.log(content.substring(0, 1000));
  }
}
