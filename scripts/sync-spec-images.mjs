import fs from "node:fs";
import path from "node:path";

const rootDir = process.cwd();

const specs = [
  {
    rawDir: path.join(rootDir, "Bar spec"),
    publicDir: path.join(rootDir, "public", "bar-spec"),
    dataFile: path.join(rootDir, "app", "data", "barProductsData.json"),
    outputFile: path.join(rootDir, "app", "data", "slugToBarSpec.json"),
  },
  {
    rawDir: path.join(rootDir, "Shake spec"),
    publicDir: path.join(rootDir, "public", "shake-spec"),
    dataFile: path.join(rootDir, "app", "data", "shakeProductsData.json"),
    outputFile: path.join(rootDir, "app", "data", "slugToShakeSpec.json"),
  },
  {
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

function normalizeText(value) {
  return (value ?? "")
    .toLowerCase()
    .replace(/단백질/g, "")
    .replace(/프로틴/g, "")
    .replace(/쉐이크/g, "")
    .replace(/요거트/g, "")
    .replace(/그릭/g, "")
    .replace(/바$/g, "바")
    .replace(/spec/gi, "")
    .replace(/\.[a-z0-9]+$/i, "")
    .replace(/[()\[\]{}·,&+!.'"`~:/\\_-]/g, "")
    .replace(/\s+/g, "")
    .trim();
}

function buildCandidates(product) {
  const brand = product.brand ?? "";
  const name = product.name ?? "";
  const capacity = product.capacity ?? "";
  const variant = product.variant ?? "";
  const flavor = product.flavor ?? "";

  return [
    name,
    `${brand} ${name}`,
    `${name} ${capacity}`,
    `${brand} ${name} ${capacity}`,
    `${name} ${variant}`,
    `${brand} ${name} ${variant}`,
    `${name} ${flavor}`,
    `${brand} ${name} ${flavor}`,
    `${brand} ${flavor}`,
    `${name.replace(/\s*\(.+?\)/g, "").trim()} ${flavor}`,
  ]
    .map(normalizeText)
    .filter(Boolean);
}

function syncSpecGroup({ rawDir, publicDir, dataFile, outputFile }) {
  const products = readJson(dataFile);
  const rawFiles = walkFiles(rawDir).filter((file) => /\.(png|jpg|jpeg|webp)$/i.test(file));

  ensureDir(publicDir);

  const normalizedFiles = rawFiles.map((filePath) => {
    const filename = path.basename(filePath);
    const relativePath = path.relative(rawDir, filePath);
    const normalized = normalizeText(relativePath);
    const targetPath = path.join(publicDir, filename);
    fs.copyFileSync(filePath, targetPath);
    return { filename, normalized };
  });

  const mapping = {};

  for (const product of products) {
    const candidates = buildCandidates(product);
    const exactMatch =
      normalizedFiles.find((file) => candidates.includes(file.normalized)) ??
      normalizedFiles.find((file) => candidates.some((candidate) => file.normalized.includes(candidate) || candidate.includes(file.normalized)));

    if (exactMatch) {
      mapping[product.slug] = exactMatch.filename;
    }
  }

  fs.writeFileSync(outputFile, `${JSON.stringify(mapping, null, 2)}\n`, "utf8");

  return {
    totalProducts: products.length,
    matched: Object.keys(mapping).length,
    files: rawFiles.length,
  };
}

const summary = specs.map(syncSpecGroup);

for (const item of summary) {
  console.log(JSON.stringify(item));
}
