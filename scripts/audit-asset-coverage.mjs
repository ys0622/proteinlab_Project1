import fs from "node:fs";
import path from "node:path";

const rootDir = process.cwd();
const strictMode = process.argv.includes("--strict");
const assetSyncConfig = JSON.parse(
  fs.readFileSync(path.join(rootDir, "app", "data", "assetSyncConfig.json"), "utf8"),
);

const dataset = JSON.parse(
  fs.readFileSync(path.join(rootDir, "public", "products.json"), "utf8"),
);

const categories = [
  {
    key: "drinks",
    label: "drinks",
    imageMapFile: path.join(rootDir, "app", "data", "slugToImage.json"),
    specMapFile: path.join(rootDir, "app", "data", "slugToDrinkSpec.json"),
    imageDir: path.join(rootDir, "public", "rtd-drink-image"),
    specDir: path.join(rootDir, "public", "rtd-drink-spec"),
  },
  {
    key: "bars",
    label: "bars",
    imageMapFile: path.join(rootDir, "app", "data", "slugToBarImage.json"),
    specMapFile: path.join(rootDir, "app", "data", "slugToBarSpec.json"),
    imageDir: path.join(rootDir, "public", "bar-image"),
    specDir: path.join(rootDir, "public", "bar-spec"),
  },
  {
    key: "yogurt",
    label: "yogurt",
    imageMapFile: path.join(rootDir, "app", "data", "slugToYogurtImage.json"),
    specMapFile: path.join(rootDir, "app", "data", "slugToYogurtSpec.json"),
    imageDir: path.join(rootDir, "public", "protein-yogurt-image"),
    specDir: path.join(rootDir, "public", "protein-yogurt-spec"),
  },
  {
    key: "shake",
    label: "shake",
    imageMapFile: path.join(rootDir, "app", "data", "slugToShakeImage.json"),
    specMapFile: path.join(rootDir, "app", "data", "slugToShakeSpec.json"),
    imageDir: path.join(rootDir, "public", "shake-image"),
    specDir: path.join(rootDir, "public", "shake-spec"),
  },
];

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function fileExists(dirPath, filename) {
  return typeof filename === "string" && fs.existsSync(path.join(dirPath, filename));
}

function printList(title, values) {
  if (values.length === 0) return;
  console.log(title);
  for (const value of values) {
    console.log(`- ${value}`);
  }
}

function main() {
  let hasUnexpectedIssue = false;

  console.log("Asset coverage audit");
  console.log(
    `Generated: ${new Date().toLocaleString("ko-KR", { timeZone: "Asia/Seoul" })}`,
  );

  for (const category of categories) {
    const products = dataset.products.filter((product) => product.category === category.key);
    const imageMap = readJson(category.imageMapFile);
    const specMap = readJson(category.specMapFile);
    const allowedMissingSpec = new Set(assetSyncConfig.allowedMissingSpecSlugs?.[category.key] ?? []);

    const missingImageMap = [];
    const missingSpecMap = [];
    const missingImageFile = [];
    const missingSpecFile = [];

    for (const product of products) {
      const imageFilename = imageMap[product.slug];
      const specFilename = specMap[product.slug];

      if (!imageFilename) {
        missingImageMap.push(product.slug);
      } else if (!fileExists(category.imageDir, imageFilename)) {
        missingImageFile.push(`${product.slug} -> ${imageFilename}`);
      }

      if (!specFilename) {
        missingSpecMap.push(product.slug);
      } else if (!fileExists(category.specDir, specFilename)) {
        missingSpecFile.push(`${product.slug} -> ${specFilename}`);
      }
    }

    const unexpectedMissingSpecMap = missingSpecMap.filter((slug) => !allowedMissingSpec.has(slug));
    const allowlistedMissingSpecMap = missingSpecMap.filter((slug) => allowedMissingSpec.has(slug));

    console.log("");
    console.log(`## ${category.label}`);
    console.log(`products=${products.length}`);
    console.log(`image_map_coverage=${products.length - missingImageMap.length}/${products.length}`);
    console.log(`spec_map_coverage=${products.length - missingSpecMap.length}/${products.length}`);
    console.log(`mapped_image_files_missing=${missingImageFile.length}`);
    console.log(`mapped_spec_files_missing=${missingSpecFile.length}`);

    printList("missing_image_map", missingImageMap);
    printList("missing_spec_map", unexpectedMissingSpecMap);
    printList("allowlisted_missing_spec_map", allowlistedMissingSpecMap);
    printList("missing_image_file", missingImageFile);
    printList("missing_spec_file", missingSpecFile);

    if (
      missingImageMap.length > 0 ||
      unexpectedMissingSpecMap.length > 0 ||
      missingImageFile.length > 0 ||
      missingSpecFile.length > 0
    ) {
      hasUnexpectedIssue = true;
    }
  }

  if (strictMode && hasUnexpectedIssue) {
    process.exitCode = 1;
  }
}

main();
