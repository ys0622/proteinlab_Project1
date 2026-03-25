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


DIRECT_BCAA_RE = re.compile(r"BCAA[^0-9]{0,12}(\d[\d,\.]*)\s*(mg|g)", re.IGNORECASE)

AMINO_PATTERNS = {
    "leucine": [r"류신", r"루신", r"LEUCINE"],
    "isoleucine": [r"이소류신", r"이소루신", r"ISOLEUCINE"],
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
    denoised = cv2.fastNlMeansDenoising(upscaled)
    return [image, gray, upscaled, thresholded, denoised]


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


def to_mg(raw_value: str, unit: str) -> int | None:
    try:
        numeric = float(raw_value.replace(",", ""))
    except ValueError:
        return None

    if unit.lower() == "g":
        numeric *= 1000

    return int(round(numeric))


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
    spec_map: dict[str, str] = load_json(SPEC_MAP_PATH)

    missing_products = [product for product in products if not has_bcaa_value(product)]
    if args.limit > 0:
        missing_products = missing_products[: args.limit]

    reader = easyocr.Reader(["ko", "en"], gpu=False, verbose=False)

    updates: list[dict[str, Any]] = []
    unresolved: list[dict[str, Any]] = []

    for product in missing_products:
        slug = product["slug"]
        spec_name = spec_map.get(slug)
        if not spec_name:
            unresolved.append(
                {
                    "slug": slug,
                    "name": product.get("name"),
                    "reason": "no_spec_image",
                }
            )
            continue

        image_path = SPEC_DIR / spec_name
        if not image_path.exists():
            unresolved.append(
                {
                    "slug": slug,
                    "name": product.get("name"),
                    "reason": "missing_spec_file",
                    "specImage": spec_name,
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
