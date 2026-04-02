import assert from "node:assert/strict";
import type { ProductDetailProps } from "../app/data/productTypes";
import type { CompareColumnId } from "../app/lib/compareColumns";
import { getCompareSummary } from "../app/lib/compareSummary";

function makeProduct(overrides: Partial<ProductDetailProps>): ProductDetailProps {
  return {
    slug: overrides.slug ?? "test-product",
    name: overrides.name ?? "Test Product",
    brand: overrides.brand ?? "Test Brand",
    capacity: overrides.capacity ?? "250ml",
    price: overrides.price ?? 0,
    calories: overrides.calories ?? 150,
    sugar: overrides.sugar ?? 0,
    proteinPerServing: overrides.proteinPerServing ?? 20,
    productType: overrides.productType ?? "shake",
    bcaa: overrides.bcaa ?? "5000",
    density: overrides.density ?? "10.0",
    fat: overrides.fat ?? 3,
    sodium: overrides.sodium ?? 120,
    calorieDensity: overrides.calorieDensity ?? "0.60",
    nutritionPerBottle: overrides.nutritionPerBottle ?? {
      fiberG: 5,
      bcaaMg: 5000,
    },
    ...overrides,
  } as ProductDetailProps;
}

const BASE_VISIBLE_IDS: CompareColumnId[] = [
  "proteinPerServing",
  "bcaa",
  "calories",
  "sugar",
  "fiber",
  "density",
];

function runTest(name: string, fn: () => void) {
  try {
    fn();
    console.log(`PASS ${name}`);
  } catch (error) {
    console.error(`FAIL ${name}`);
    throw error;
  }
}

runTest("Visible fiber tie should not create a winner chip", () => {
  const left = makeProduct({
    slug: "left-fiber-tie",
    name: "Left Product",
    nutritionPerBottle: { fiberG: 5, bcaaMg: 5000 },
  });
  const right = makeProduct({
    slug: "right-fiber-tie",
    name: "Right Product",
    nutritionPerBottle: { fiberG: 5, bcaaMg: 5000 },
  });

  const summary = getCompareSummary([left, right], BASE_VISIBLE_IDS);

  assert.ok(summary);
  assert.equal(
    summary.chips.some((chip) => chip.columnId === "fiber"),
    false,
  );
});

runTest("Differences below threshold should be excluded", () => {
  const left = makeProduct({
    slug: "left-small-diff",
    name: "Left Product",
    proteinPerServing: 20,
  });
  const right = makeProduct({
    slug: "right-small-diff",
    name: "Right Product",
    proteinPerServing: 21,
  });

  const summary = getCompareSummary([left, right], BASE_VISIBLE_IDS);

  assert.ok(summary);
  assert.equal(
    summary.chips.some((chip) => chip.columnId === "proteinPerServing"),
    false,
  );
});

runTest("Meaningful differences should point to the correct winner", () => {
  const left = makeProduct({
    slug: "left-meaningful",
    name: "Left Product",
    sugar: 0,
    calories: 140,
  });
  const right = makeProduct({
    slug: "right-meaningful",
    name: "Right Product",
    sugar: 4,
    calories: 180,
  });

  const summary = getCompareSummary([left, right], BASE_VISIBLE_IDS);

  assert.ok(summary);
  const sugarChip = summary.chips.find((chip) => chip.columnId === "sugar");
  assert.ok(sugarChip);
  assert.equal(sugarChip.winnerName, "Left Product");
  assert.equal(sugarChip.differenceText, "0g vs 4g");
});

console.log("compare-summary regression checks passed");
