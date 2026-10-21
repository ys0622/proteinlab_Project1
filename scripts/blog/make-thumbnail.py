"""프로틴랩 블로그 썸네일(2026-10-21). 기존 썸네일 규칙(design.md)을 따른다.

- 1024x1024, 아이보리 #F4EFE5 바탕, 딥그린 #173F35 글자, 세이지·샌드 보조색, 타이포그래피 중심
- 로고·제품 사진·영양 수치·효능 문구를 넣지 않는다(실제 이미지를 지어내지 않기 위해 도형과 글자만 쓴다)

사용: python scripts/blog/make-thumbnail.py <content 폴더> --main "줄1|줄2" --sub "보조 문구" [--cards "미니|견과|프로"]
결과: <폴더>/thumbnail.png
"""
import argparse
from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

IVORY = (244, 239, 229)
GREEN = (23, 63, 53)
SAGE = (168, 190, 170)
SAND = (222, 205, 176)
FONT_BOLD = "C:/Windows/Fonts/NanumBarunGothicBold.ttf"
FONT_REG = "C:/Windows/Fonts/NanumBarunGothic.ttf"
W = H = 1024


def fit(draw, text, path, max_w, start):
    size = start
    while size > 30:
        f = ImageFont.truetype(path, size)
        if draw.textlength(text, font=f) <= max_w:
            return f
        size -= 4
    return ImageFont.truetype(path, size)


def center(draw, y, text, font, fill):
    w = draw.textlength(text, font=font)
    draw.text(((W - w) / 2, y), text, font=font, fill=fill)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("dir")
    ap.add_argument("--main", required=True, help="'|'로 줄을 나눈다(최대 3줄)")
    ap.add_argument("--sub", default="")
    ap.add_argument("--cards", default="", help="'|'로 나눈 카드 글자(최대 4개, 숫자·효능 금지)")
    a = ap.parse_args()

    img = Image.new("RGB", (W, H), IVORY)
    d = ImageDraw.Draw(img)
    margin = 90
    # 상단 얇은 띠와 구분선
    d.rectangle([margin, 96, W - margin, 104], fill=GREEN)

    lines = [s for s in a.main.split("|") if s][:3]
    y = 170
    for line in lines:
        f = fit(d, line, FONT_BOLD, W - margin * 2, 104)
        center(d, y, line, f, GREEN)
        y += f.size + 26

    if a.sub:
        f = fit(d, a.sub, FONT_REG, W - margin * 2, 48)
        y += 14
        center(d, y, a.sub, f, GREEN)
        y += f.size

    cards = [s for s in a.cards.split("|") if s][:4]
    if cards:
        n = len(cards)
        gap = 28
        cw = (W - margin * 2 - gap * (n - 1)) / n
        top = max(y + 70, 640)
        ch = 200
        for i, c in enumerate(cards):
            x0 = margin + i * (cw + gap)
            d.rounded_rectangle([x0, top, x0 + cw, top + ch], radius=28, fill=SAND if i % 2 else SAGE)
            f = fit(d, c, FONT_BOLD, cw - 40, 64)
            tw = d.textlength(c, font=f)
            d.text((x0 + (cw - tw) / 2, top + (ch - f.size) / 2 - 6), c, font=f, fill=GREEN)

    d.rectangle([margin, H - 104, W - margin, H - 96], fill=GREEN)
    out = Path(a.dir) / "thumbnail.png"
    img.save(out)
    print(out)


if __name__ == "__main__":
    main()
