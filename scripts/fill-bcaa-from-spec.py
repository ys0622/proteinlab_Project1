#!/usr/bin/env python
from __future__ import annotations

import argparse
import json
import re
from pathlib import Path
from typing import Any

import cv2
import easyocr
import numpy as np


ROOT = Path(__file__).resolve().parent.parent
DRINK_DATA_PATH = ROOT / "app" / "data" / "drinkProductsData.json"
SPEC_MAP_PATH = ROOT / "app" / "data" / "slugToDrinkSpec.json"
SPEC_DIR = ROOT / "public" / "rtd-drink-spec"
SPEC_SOURCE_DIR = ROOT / "RTD drink spec"


DIRECT_BCAA_RE = re.compile(r"BCAA[^0-9]{0,12}(\d[\d,\.]*)\s*(mg|g)", re.IGNORECASE)

AMINO_PATTERNS = {
    "leucine": [r"류신", r"루신", r"료신", r"LEUCINE"],
    "isoleucine": [r"이소류신", r"이소루신", r"이소유신", r"ISOLEUCINE"],
    "valine": [r"발린", r"VALINE"],
}


def has_bcaa_value(product: dict[str, Any]) -> bool:
    bcaa = str(product.get("bcaa", "") or "").strip()
    if re.search(r"\d", bcaa):
        return True

    nutrition = product.get("nutritionPerBottle") or {}
    bcaa_mg = nutrition.get("bcaaMg")
    return isinstance(bcaa_mg, (int, float)) and bcaa_mg > 0


def load_json(path: Path) -> Any:
    return json.loads(path.read_text(encoding="utf-8-sig"))


def dump_json(path: Path, value: Any) -> None:
    path.write_text(
        json.dumps(value, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )


def preprocess_variants(image_path: Path) -> list[Any]:
    raw = np.fromfile(str(image_path), dtype=np.uint8)
    if raw.size == 0:
        return []

    image = cv2.imdecode(raw, cv2.IMREAD_COLOR)
    if image is None:
        return []

    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    upscaled = cv2.resize(gray, None, fx=2, fy=2, interpolation=cv2.INTER_CUBIC)
    thresholded = cv2.threshold(upscaled, 0, 255, cv2.THRESH_BINARY + cv2.THRESH_OTSU)[1]
    return [upscaled, thresholded]


def read_texts(reader: easyocr.Reader, image_path: Path) -> list[str]:
    texts: list[str] = []
    seen: set[str] = set()

    for variant in preprocess_variants(image_path):
        try:
            result = reader.readtext(variant, detail=0, paragraph=False)
        except Exception:
            continue
        for item in result:
            cleaned = " ".join(str(item).split())
            if cleaned and cleaned not in seen:
                seen.add(cleaned)
                texts.append(cleaned)

    return texts


def normalize_name(value: str) -> str:
    text = Path(value).stem
    text = re.sub(r"\b\d+(?:\.\d+)?\s*(?:ml|mL|g)\b", "", text, flags=re.IGNORECASE)
    text = re.sub(r"[^가-힣a-z0-9]+", "", text.lower())
    return text


def build_spec_indexes() -> tuple[dict[str, Path], dict[str, list[Path]]]:
    exact_by_name: dict[str, Path] = {}
    normalized_to_paths: dict[str, list[Path]] = {}

    for candidate in SPEC_SOURCE_DIR.rglob("*.png"):
        exact_by_name[candidate.stem] = candidate
        key = normalize_name(candidate.name)
        normalized_to_paths.setdefault(key, []).append(candidate)

    return exact_by_name, normalized_to_paths


def find_spec_path(
    slug: str,
    product_name: str,
    exact_by_name: dict[str, Path],
    normalized_to_paths: dict[str, list[Path]],
) -> tuple[Path | None, str | None]:
    mapped_name = spec_map.get(slug)
    if mapped_name:
        public_path = SPEC_DIR / mapped_name
        if public_path.exists():
            return public_path, mapped_name

    direct_source = exact_by_name.get(product_name)
    if direct_source:
        return direct_source, direct_source.name

    normalized_product_name = normalize_name(product_name)
    candidates = normalized_to_paths.get(normalized_product_name, [])
    if len(candidates) == 1:
        return candidates[0], candidates[0].name

    partial_candidates: list[Path] = []
    for key, paths in normalized_to_paths.items():
        if normalized_product_name and normalized_product_name in key:
            partial_candidates.extend(paths)
    if len(partial_candidates) == 1:
        return partial_candidates[0], partial_candidates[0].name

    return None, mapped_name


def to_mg(raw_value: str, unit: str) -> int | None:
    if unit.lower() == "g":
        try:
            numeric = float(raw_value.replace(",", ""))
        except ValueError:
            return None
        return int(round(numeric * 1000))

    normalized = raw_value.strip()
    normalized = normalized.translate(str.maketrans({
        "O": "0",
        "o": "0",
        "D": "0",
        "Q": "0",
        "B": "8",
        "S": "5",
        "I": "1",
        "l": "1",
    }))
    digits_only = re.sub(r"[^0-9]", "", normalized)
    if not digits_only:
        return None
    return int(digits_only)


def find_direct_bcaa(text_blob: str) -> int | None:
    match = DIRECT_BCAA_RE.search(text_blob)
    if not match:
        return None
    return to_mg(match.group(1), match.group(2))


def find_amino_value(text_blob: str, patterns: list[str]) -> int | None:
    for pattern in patterns:
        regex = re.compile(
            rf"(?:{pattern})[^0-9]{{0,12}}(\d[\d,\.]*)\s*(mg|g)",
            re.IGNORECASE,
        )
        match = regex.search(text_blob)
        if match:
            return to_mg(match.group(1), match.group(2))
    return None


def extract_bcaa_from_texts(texts: list[str]) -> tuple[int | None, str | None, dict[str, int]]:
    text_blob = "\n".join(texts)

    direct_bcaa = find_direct_bcaa(text_blob)
    if direct_bcaa:
        return direct_bcaa, "direct_bcaa", {}

    amino_values: dict[str, int] = {}
    for key, patterns in AMINO_PATTERNS.items():
        value = find_amino_value(text_blob, patterns)
        if value:
            amino_values[key] = value

    if len(amino_values) == 3:
        return sum(amino_values.values()), "amino_sum", amino_values

    return None, None, amino_values


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--apply", action="store_true", help="Apply extracted values to drinkProductsData.json")
    parser.add_argument("--limit", type=int, default=0, help="Limit number of missing products to scan")
    args = parser.parse_args()

    products: list[dict[str, Any]] = load_json(DRINK_DATA_PATH)
    global spec_map
    spec_map = load_json(SPEC_MAP_PATH)
    exact_by_name, normalized_to_paths = build_spec_indexes()

    missing_products = [product for product in products if not has_bcaa_value(product)]
    if args.limit > 0:
        missing_products = missing_products[: args.limit]

    reader = easyocr.Reader(["ko", "en"], gpu=False, verbose=False)

    updates: list[dict[str, Any]] = []
    unresolved: list[dict[str, Any]] = []

    for product in missing_products:
        slug = product["slug"]
        image_path, spec_name = find_spec_path(
            slug,
            str(product.get("name", "")),
            exact_by_name,
            normalized_to_paths,
        )
        if not image_path:
            unresolved.append(
                {
                    "slug": slug,
                    "name": product.get("name"),
                    "reason": "no_spec_image",
                }
            )
            continue

        texts = read_texts(reader, image_path)
        bcaa_mg, method, amino_values = extract_bcaa_from_texts(texts)

        if bcaa_mg:
            updates.append(
                {
                    "slug": slug,
                    "name": product.get("name"),
                    "bcaaMg": bcaa_mg,
                    "method": method,
                    "aminoValues": amino_values,
                    "specImage": spec_name,
                }
            )
        else:
            unresolved.append(
                {
                    "slug": slug,
                    "name": product.get("name"),
                    "reason": "ocr_no_bcaa_match",
                    "specImage": spec_name,
                    "ocrSample": texts[:20],
                    "aminoValues": amino_values,
                }
            )

    if args.apply and updates:
        updates_by_slug = {item["slug"]: item for item in updates}
        for product in products:
            update = updates_by_slug.get(product["slug"])
            if not update:
                continue
            bcaa_mg = update["bcaaMg"]
            product["bcaa"] = f"{bcaa_mg}mg"
            nutrition = product.setdefault("nutritionPerBottle", {})
            nutrition["bcaaMg"] = bcaa_mg

        dump_json(DRINK_DATA_PATH, products)

    unresolved_by_reason: dict[str, int] = {}
    for item in unresolved:
        reason = item["reason"]
        unresolved_by_reason[reason] = unresolved_by_reason.get(reason, 0) + 1

    report = {
        "missingCount": len(missing_products),
        "resolvedCount": len(updates),
        "unresolvedCount": len(unresolved),
        "unresolvedByReason": unresolved_by_reason,
        "updates": updates,
        "unresolved": unresolved,
    }
    print(json.dumps(report, ensure_ascii=False, indent=2))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
