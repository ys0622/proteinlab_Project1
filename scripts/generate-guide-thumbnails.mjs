import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const outputDir = path.join(root, "public", "guide-thumbnails");
const font = await fs.readFile(path.join(root, "public", "fonts", "NotoSansKR-Bold-subset.ttf"));
const fontData = font.toString("base64");

const configs = [
  {
    slug: "selex-vs-takefit-vs-himune",
    eyebrow: "RTD 3-WAY COMPARISON",
    title: ["셀렉스·테이크핏", "하이뮨 3종 비교"],
    highlight: "운동 · 다이어트 · 일상용",
    colors: ["#18354a", "#b9e5ff", "#315d79"],
    images: ["rtd-drink-image/sellex-profit-milk-vanilla-250.webp", "rtd-drink-image/takefit-max-goso-250.webp", "rtd-drink-image/hymune-balance-active-deepchoco-250.webp"],
  },
  {
    slug: "newcare-vs-hymune",
    eyebrow: "PARENTS' PROTEIN GUIDE",
    title: ["뉴케어 vs 하이뮨", "부모님용 비교"],
    highlight: "41g 고단백 vs 10g 일상형",
    colors: ["#493821", "#ffe09b", "#725b35"],
    images: ["rtd-drink-image/newcare-all-protein-41g.webp", "rtd-drink-image/hymune-protein-balance-190.webp"],
  },
  {
    slug: "takefit-max-vs-takefit-monster",
    eyebrow: "TAKEFIT LINEUP",
    title: ["테이크핏 맥스", "vs 몬스터"],
    highlight: "24g vs 45g",
    colors: ["#102f26", "#b8f26d", "#285b49"],
    images: ["rtd-drink-image/takefit-max-goso-250.webp", "rtd-drink-image/takefit-monster-goso-350.png"],
  },
  {
    slug: "takefit-vs-hymune-drink",
    eyebrow: "PROTEIN DRINK MATCH",
    title: ["테이크핏 vs 하이뮨", "무엇이 다를까?"],
    highlight: "단백질 · 당류 · 칼로리",
    colors: ["#19364d", "#b9e5ff", "#315d79"],
    images: ["rtd-drink-image/takefit-max-goso-250.webp", "rtd-drink-image/hymune-balance-active-deepchoco-250.webp"],
  },
  {
    slug: "protein-bar-top10",
    eyebrow: "2026 PROTEIN BAR RANKING",
    title: ["단백질바 추천", "TOP 10"],
    highlight: "100종 데이터 비교",
    colors: ["#4b2f24", "#ffd49b", "#76503d"],
    images: ["bar-image/benof-proteinbar-chunky-choco.png", "bar-image/dryou-proteinbar-pro-crunch.png"],
  },
];

const escapeXml = (value) => value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

async function render(config) {
  const [background, accent, soft] = config.colors;
  const badgeWidth = Math.max(230, config.highlight.length * 27);
  const svg = Buffer.from(`
    <svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
      <style>
        @font-face { font-family: Noto; src: url(data:font/ttf;base64,${fontData}); font-weight: 700; }
        text { font-family: Noto, sans-serif; }
      </style>
      <rect width="1200" height="630" fill="${background}"/>
      <circle cx="1050" cy="85" r="265" fill="${soft}" opacity=".78"/>
      <circle cx="870" cy="675" r="175" fill="none" stroke="${accent}" stroke-width="2" opacity=".36"/>
      <text x="68" y="92" fill="${accent}" font-size="24" letter-spacing="3">${escapeXml(config.eyebrow)}</text>
      <text x="68" y="190" fill="#fff" font-size="62" font-weight="700">${escapeXml(config.title[0])}</text>
      <text x="68" y="270" fill="#fff" font-size="62" font-weight="700">${escapeXml(config.title[1])}</text>
      <rect x="68" y="513" width="${badgeWidth}" height="58" rx="29" fill="${accent}"/>
      <text x="91" y="552" fill="${background}" font-size="23" font-weight="700">${escapeXml(config.highlight)}</text>
      <text x="${68 + badgeWidth + 20}" y="552" fill="#fff" opacity=".82" font-size="22">ProteinLab</text>
    </svg>
  `);

  const overlays = [];
  for (let index = 0; index < config.images.length; index += 1) {
    const image = await sharp(path.join(root, "public", config.images[index]))
      .trim({ background: "#ffffff", threshold: 12 })
      .resize({ width: 300, height: index === 1 ? 410 : 380, fit: "inside" })
      .rotate((index - 1) * 5, { background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toBuffer();
    const left = config.images.length === 3 ? 680 + index * 120 : 755 + index * 160;
    overlays.push({ input: image, left, top: 165 - index * 20 });
  }

  await sharp(svg)
    .composite(overlays)
    .png({ compressionLevel: 9 })
    .toFile(path.join(outputDir, `${config.slug}.png`));
  console.log(`generated ${config.slug}.png`);
}

await fs.mkdir(outputDir, { recursive: true });
for (const config of configs) await render(config);
