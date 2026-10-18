"""등록 전 사진 품질 확인용 한 장(inbox/intake/image-qc.png).

사용법: python scripts/intake/image_qc.py --candidates inbox/intake/soymilk-candidates.json [S1 S2 ...]
inbox/intake/<id>/product.png 를 사이트에 들어갈 모양(흰 배경 여백 정리, 바는 세로면 가로로 회전)으로 만들어
번호·제품명과 함께 격자로 붙인다. 사장님이 번호를 보고 "S3 다시"처럼 고르면 그 번호만 다시 만든다.
"""
import argparse
import json
import os

from PIL import Image, ImageChops, ImageDraw, ImageFont

ROOT = os.path.join(os.path.dirname(__file__), "..", "..", "inbox", "intake")
FONT = ImageFont.truetype("C:/Windows/Fonts/malgunbd.ttf", 22)
SMALL = ImageFont.truetype("C:/Windows/Fonts/malgun.ttf", 16)
CELL_W, CELL_H, IMG_H = 300, 330, 230


def site_like(path: str, category: str) -> Image.Image:
    im = Image.open(path).convert("RGBA")
    white = Image.new("RGBA", im.size, (255, 255, 255, 255))
    white.alpha_composite(im)
    rgb = white.convert("RGB")
    diff = ImageChops.difference(rgb, Image.new("RGB", rgb.size, "white")).convert("L").point(lambda v: 255 if v > 14 else 0)
    box = diff.getbbox()
    if box:
        rgb = rgb.crop(box)
    if category == "bar" and rgb.height > rgb.width * 1.4:
        rgb = rgb.rotate(-90, expand=True, fillcolor="white")
    return rgb


def main() -> None:
    ap = argparse.ArgumentParser()
    ap.add_argument("--candidates", default=os.path.join(ROOT, "bar-candidates.json"))
    ap.add_argument("ids", nargs="*")
    args = ap.parse_args()
    cands = {c["id"]: c for c in json.load(open(args.candidates, encoding="utf-8"))}
    ids = args.ids or list(cands)
    ids = [i for i in ids if os.path.exists(os.path.join(ROOT, i, "product.png"))]
    cols = 4
    rows = (len(ids) + cols - 1) // cols
    sheet = Image.new("RGB", (CELL_W * cols, CELL_H * rows + 50), "#eceae4")
    draw = ImageDraw.Draw(sheet)
    draw.text((12, 12), f"등록 전 사진 확인 ({len(ids)}종) — 이상한 번호만 알려 주세요", fill="#16412D", font=FONT)
    for n, pid in enumerate(ids):
        c = cands[pid]
        x, y = (n % cols) * CELL_W, (n // cols) * CELL_H + 50
        card = Image.new("RGB", (CELL_W - 16, CELL_H - 16), "white")
        img = site_like(os.path.join(ROOT, pid, "product.png"), c.get("category", "bar"))
        small = img.copy()
        small.thumbnail((CELL_W - 40, IMG_H))
        card.paste(small, ((card.width - small.width) // 2, 12 + (IMG_H - small.height) // 2))
        d = ImageDraw.Draw(card)
        d.text((10, IMG_H + 22), pid, fill="#B66A00", font=FONT)
        label = f"{c.get('brand', '')} {c.get('name', '')}"
        d.text((10, IMG_H + 52), label[:22], fill="#1A2B1E", font=SMALL)
        d.text((10, IMG_H + 72), f"원본 {img.width}×{img.height}px", fill="#8A8068", font=SMALL)
        sheet.paste(card, (x + 8, y + 8))
    out = os.path.join(ROOT, "image-qc.png")
    sheet.save(out)
    print(out)


if __name__ == "__main__":
    main()
