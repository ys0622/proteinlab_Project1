import fs from "node:fs";
import path from "node:path";

const rootDir = process.cwd();
const assetSyncConfig = JSON.parse(
  fs.readFileSync(path.join(rootDir, "app", "data", "assetSyncConfig.json"), "utf8"),
);

const specGroups = [
  {
    key: "drinks",
    rawDir: path.join(rootDir, "RTD drink spec"),
    publicDir: path.join(rootDir, "public", "rtd-drink-spec"),
    dataFile: path.join(rootDir, "app", "data", "drinkProductsData.json"),
    outputFile: path.join(rootDir, "app", "data", "slugToDrinkSpec.json"),
    preferredBrandFirst: true,
  },
  {
    key: "bars",
    rawDir: path.join(rootDir, "Bar spec"),
    publicDir: path.join(rootDir, "public", "bar-spec"),
    dataFile: path.join(rootDir, "app", "data", "barProductsData.json"),
    outputFile: path.join(rootDir, "app", "data", "slugToBarSpec.json"),
  },
  {
    key: "shake",
    rawDir: path.join(rootDir, "Shake spec"),
    publicDir: path.join(rootDir, "public", "shake-spec"),
    dataFile: path.join(rootDir, "app", "data", "shakeProductsData.json"),
    outputFile: path.join(rootDir, "app", "data", "slugToShakeSpec.json"),
  },
  {
    key: "yogurt",
    rawDir: path.join(rootDir, "Yogurt spec"),
    publicDir: path.join(rootDir, "public", "protein-yogurt-spec"),
    dataFile: path.join(rootDir, "app", "data", "yogurtProductsData.json"),
    outputFile: path.join(rootDir, "app", "data", "slugToYogurtSpec.json"),
  },
];

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function walkFiles(dirPath) {
  if (!fs.existsSync(dirPath)) return [];
  const results = [];
  for (const entry of fs.readdirSync(dirPath, { withFileTypes: true })) {
    const fullPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      results.push(...walkFiles(fullPath));
      continue;
    }
    results.push(fullPath);
  }
  return results;
}

function extractSizeToken(value) {
  const match = String(value ?? "").toLowerCase().match(/(\d+(?:\.\d+)?)\s*(ml|g)/i);
  return match ? `${match[1]}${match[2].toLowerCase()}` : null;
}

function normalizeText(value) {
  return String(value ?? "")
    .toLowerCase()
    .replace(/spec/gi, "")
    .replace(/\b(ml|mL|g)\b/gi, "")
    .replace(/[0-9]+/g, "")
    .replace(/&/g, "")
    .replace(/protein|whey|drink|drinking|shake|bar|greek|yogurt/gi, "")
    .replace(/프로틴|단백질|웨이|드링크|쉐이크|바|그릭|요거트|요구르트/g, "")
    .replace(/맛/g, "")
    .replace(/[()[\]{}'",.+!`~:/\\_|?-]/g, "")
    .replace(/\s+/g, "")
    .trim();
}

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

function buildCandidates(product, preferredBrandFirst = false) {
  const brand = product.brand ?? "";
  const name = product.name ?? "";
  const capacity = product.capacity ?? "";
  const variant = product.variant ?? "";
  const flavor = product.flavor ?? "";
  const plainName = name.replace(/\s*\(.+?\)\s*/g, " ").trim();

  const baseCandidates = [
    name,
    `${brand} ${name}`,
    `${name} ${capacity}`,
    `${brand} ${name} ${capacity}`,
    `${name} ${variant}`,
    `${brand} ${name} ${variant}`,
    `${name} ${flavor}`,
    `${brand} ${name} ${flavor}`,
    `${brand} ${flavor}`,
    `${plainName} ${flavor}`,
    plainName,
    `${brand} ${plainName}`,
    `${plainName} ${capacity}`,
    `${brand} ${plainName} ${capacity}`,
    `${plainName} ${variant}`,
    `${brand} ${plainName} ${variant}`,
  ];

  const normalized = unique(baseCandidates.map(normalizeText));

  if (!preferredBrandFirst || !brand) {
    return normalized;
  }

  const normalizedBrand = normalizeText(brand);
  return normalized.sort((a, b) => {
    const aHasBrand = a.includes(normalizedBrand);
    const bHasBrand = b.includes(normalizedBrand);
    if (aHasBrand === bHasBrand) return b.length - a.length;
    return aHasBrand ? -1 : 1;
  });
}

function buildFileEntries(rawDir, publicDir) {
  const rawFiles = walkFiles(rawDir).filter((file) => /\.(png|jpg|jpeg|webp)$/i.test(file));

  ensureDir(publicDir);

  return rawFiles.map((filePath) => {
    const filename = path.basename(filePath);
    const relativePath = path.relative(rawDir, filePath);
    fs.copyFileSync(filePath, path.join(publicDir, filename));
    return {
      filename,
      normalized: normalizeText(relativePath),
      relativePath,
      sizeToken: extractSizeToken(relativePath),
    };
  });
}

function scoreMatch(file, candidate) {
  if (!candidate) return -1;

  let score = -1;
  if (file.normalized === candidate) score = 1000 + candidate.length;
  else if (file.normalized.includes(candidate)) score = 500 + candidate.length;
  else if (candidate.includes(file.normalized)) score = 250 + file.normalized.length;

  if (score < 0) return -1;
  if (file.sizeToken && candidate.includes(file.sizeToken)) score += 50;
  return score;
}

function findBestMatch(files, candidates, product) {
  let best = null;
  const productSize = extractSizeToken(product.capacity);

  for (const file of files) {
    if (productSize && file.sizeToken && productSize !== file.sizeToken) {
      continue;
    }

    for (const candidate of candidates) {
      const score = scoreMatch(file, candidate);
      if (score < 0) continue;
      if (!best || score > best.score) {
        best = { file, score };
      }
    }
  }

  return best?.file ?? null;
}

function syncSpecGroup(group) {
  const products = readJson(group.dataFile);
  const files = buildFileEntries(group.rawDir, group.publicDir);
  const existingMapping = fs.existsSync(group.outputFile) ? readJson(group.outputFile) : {};
  const overrides = assetSyncConfig.specOverrides?.[group.key] ?? {};
  const mapping = {};

  for (const product of products) {
    const overrideFilename = overrides[product.slug];
    if (overrideFilename && fs.existsSync(path.join(group.publicDir, overrideFilename))) {
      mapping[product.slug] = overrideFilename;
      continue;
    }

    const candidates = buildCandidates(product, group.preferredBrandFirst);
    const match = findBestMatch(files, candidates, product);
    if (match) {
      mapping[product.slug] = match.filename;
      continue;
    }

    const previousFilename = existingMapping[product.slug];
    if (previousFilename && fs.existsSync(path.join(group.publicDir, previousFilename))) {
      mapping[product.slug] = previousFilename;
    }
  }

  fs.writeFileSync(group.outputFile, `${JSON.stringify(mapping, null, 2)}\n`, "utf8");

  return {
    outputFile: path.relative(rootDir, group.outputFile),
    totalProducts: products.length,
    matched: Object.keys(mapping).length,
    files: files.length,
  };
}

for (const item of specGroups.map(syncSpecGroup)) {
  console.log(JSON.stringify(item));
}
