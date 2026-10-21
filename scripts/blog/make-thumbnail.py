"""프로틴랩 블로그 썸네일 v2(2026-10-21). 사장님 피드백("허접하다")으로 글자만 있던 v1을 바꿨다.

- 실제 제품 사진(사이트 public/*-image, 흰 배경)을 곱하기 합성으로 얹는다. 제품 사진을 지어내지 않는다.
- 수치 배지는 evidence.json의 검증값으로만 만든다(값이 근거에 없으면 중단).
- 톤: 아이보리→흰 그라데이션, 딥그린 #173F35 제목, 강조색 1개, G마켓산스 굵은 제목.

사용: python scripts/blog/make-thumbnail.py <content 폴더> <spec.json>
spec 예:
{
  "kicker": "프로틴랩 성분 비교",
  "lines": [["닥터유 단백질바", "ink"], ["미니·견과·프로", "accent"]],
  "sub": "1개 칼로리·단백질, 얼마나 다를까?",
  "stats": [{"label": "단백질", "field": "proteinG", "unit": "g"}, {"label": "열량", "field": "caloriesKcal", "unit": "kcal"}],
  "products": ["dryou-proteinbar-mini-nuts", "dryou-proteinbar-nuts", "dryou-proteinbar-pro-choco-classic"],
  "footer": "5개 제품 · 1개 기준 성분표 비교"
}
결과: <폴더>/thumbnail.png (1080x1080)
"""
import json
import sys
from pathlib import Path

from PIL import Image, ImageChops, ImageDraw, ImageFilter, ImageFont

ROOT = Path(__file__).resolve().parents[2]
W = H = 1080
# 딥그린 배경 테마(2026-10-21 v3, 사장님 피드백 "배경이 촌스럽다")
BG_TOP = (14, 44, 37)
BG_BOTTOM = (27, 72, 60)
IVORY = (246, 240, 226)
GOLD = (227, 178, 98)
SAGE = (176, 201, 184)
FONT_TITLE = "C:/Windows/Fonts/GmarketSansTTFBold.ttf"
FONT_MED = "C:/Windows/Fonts/GmarketSansTTFMedium.ttf"
IMAGE_DIRS = {"drink": "rtd-drink-image", "bar": "bar-image", "shake": "shake-image", "yogurt": "protein-yogurt-image", "soymilk": "soymilk-image"}
IMAGE_MAPS = {"drink": "slugToImage.json", "bar": "slugToBarImage.json", "shake": "slugToShakeImage.json", "yogurt": "slugToYogurtImage.json", "soymilk": "slugToSoymilkImage.json"}


def font(path, size):
    return ImageFont.truetype(path, size)


def fit(draw, text, path, max_w, start, min_size=36):
    size = start
    while size > min_size and draw.textlength(text, font=font(path, size)) > max_w:
        size -= 4
    return font(path, size)


def product_image(category, slug):
    m = json.loads((ROOT / "app/data" / IMAGE_MAPS[category]).read_text(encoding="utf-8"))
    f = m.get(slug)
    if not f:
        raise SystemExit(f"제품 사진 매핑 없음: {slug}")
    p = ROOT / "public" / IMAGE_DIRS[category] / f
    if not p.exists():
        raise SystemExit(f"제품 사진 파일 없음: {p}")
    im = Image.open(p).convert("RGB")
    # 흰 여백 잘라내기
    diff = ImageChops.difference(im, Image.new("RGB", im.size, (255, 255, 255))).convert("L").point(lambda v: 255 if v > 14 else 0)
    box = diff.getbbox()
    return im.crop(box) if box else im


def gradient_bg():
    """위→아래 딥그린 그라데이션 + 제품 자리 뒤 은은한 조명."""
    col = Image.new("RGB", (1, H))
    for y in range(H):
        t = y / (H - 1)
        col.putpixel((0, y), tuple(int(BG_TOP[i] + (BG_BOTTOM[i] - BG_TOP[i]) * t) for i in range(3)))
    bg = col.resize((W, H))
    light = Image.new("L", (W, H), 0)
    ImageDraw.Draw(light).ellipse([60, 620, W - 60, H + 180], fill=120)
    light = light.filter(ImageFilter.GaussianBlur(90))
    bg = Image.composite(Image.new("RGB", (W, H), (88, 130, 112)), bg, light)
    # 오른쪽 위 금색 빛 번짐
    glow = Image.new("L", (W, H), 0)
    ImageDraw.Draw(glow).ellipse([700, -260, 1320, 300], fill=38)
    return Image.composite(Image.new("RGB", (W, H), GOLD), bg, glow.filter(ImageFilter.GaussianBlur(80)))


def photo_bg(name):
    """실사 배경(scripts/blog/backgrounds, Unsplash 무료 라이선스): 정사각 맞춤 → 딥그린 덧칠 → 위쪽(제목)은 더 어둡게."""
    path = ROOT / "scripts/blog/backgrounds" / name
    if not path.exists():
        raise SystemExit(f"배경 사진 없음: {path}")
    im = Image.open(path).convert("RGB")
    side = min(im.size)
    left, top = (im.width - side) // 2, (im.height - side) // 2
    im = im.crop((left, top, left + side, top + side)).resize((W, H), Image.LANCZOS)
    im = im.filter(ImageFilter.GaussianBlur(2))
    # 딥그린 톤으로 덮기
    tint = Image.new("RGB", (W, H), BG_TOP)
    im = Image.blend(im, tint, 0.45)
    # 위→아래 어둡기 그라데이션(제목 영역 0.82, 가운데 0.45, 제품 영역 0.6)
    shade = Image.new("L", (1, H))
    for y in range(H):
        t = y / (H - 1)
        a = 0.82 - 0.55 * min(t / 0.62, 1) + 0.25 * max(0, (t - 0.62) / 0.38)
        shade.putpixel((0, y), int(255 * max(0, min(1, a))))
    dark = Image.new("RGB", (W, H), (6, 22, 18))
    return Image.composite(dark, im, shade.resize((W, H)))


def cutout_mask(p):
    """가장자리와 이어진 흰 배경만 지운다(포장 안의 흰 글자·바탕은 남긴다)."""
    near_white = ImageChops.difference(p, Image.new("RGB", p.size, (255, 255, 255))).convert("L").point(lambda v: 0 if v <= 12 else 255)
    m = near_white.copy()
    w, h = m.size
    for xy in [(0, 0), (w - 1, 0), (0, h - 1), (w - 1, h - 1), (w // 2, 0), (w // 2, h - 1), (0, h // 2), (w - 1, h // 2)]:
        if m.getpixel(xy) == 0:
            ImageDraw.floodfill(m, xy, 128)
    mask = m.point(lambda v: 0 if v == 128 else 255)
    return mask.filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(1.2))


def stat_range(rows, field):
    vals = [r[field] for r in rows if r.get("verified") and r.get(field) is not None]
    if not vals:
        raise SystemExit(f"근거에 없는 배지 값: {field}")
    lo, hi = min(vals), max(vals)
    f = lambda v: str(int(v)) if float(v).is_integer() else str(round(v, 1))
    return f(lo) if lo == hi else f"{f(lo)}~{f(hi)}"


def main():
    out_dir = Path(sys.argv[1])
    spec = json.loads(Path(sys.argv[2]).read_text(encoding="utf-8"))
    ev = json.loads((out_dir / "evidence.json").read_text(encoding="utf-8"))
    rows = ev["rows"]
    category = ev["topic"]["category_data"]

    img = (photo_bg(spec["background"]) if spec.get("background") else gradient_bg()).convert("RGBA")
    d = ImageDraw.Draw(img)
    mx = 78

    # 상단 라벨: 금색 테두리 알약
    kf = font(FONT_MED, 30)
    kw = d.textlength(spec["kicker"], font=kf)
    d.rounded_rectangle([mx, 70, mx + kw + 48, 70 + 58], radius=29, outline=GOLD, width=3)
    d.text((mx + 24, 70 + 14), spec["kicker"], font=kf, fill=GOLD)

    # 제목
    y = 168
    for text, tone in spec["lines"]:
        f = fit(d, text, FONT_TITLE, W - mx * 2, 118)
        d.text((mx, y), text, font=f, fill=GOLD if tone == "accent" else IVORY)
        y += int(f.size * 1.18)

    # 보조 문구
    sf = fit(d, spec["sub"], FONT_MED, W - mx * 2, 46)
    d.text((mx, y + 4), spec["sub"], font=sf, fill=SAGE)
    y += sf.size + 42

    # 수치 배지: 반투명 유리 카드
    stats = spec.get("stats", [])
    if stats:
        gap = 22
        bw = (W - mx * 2 - gap * (len(stats) - 1)) / len(stats)
        bh = 150
        layer = Image.new("RGBA", img.size, (0, 0, 0, 0))
        ld = ImageDraw.Draw(layer)
        for i in range(len(stats)):
            x0 = mx + i * (bw + gap)
            ld.rounded_rectangle([x0, y, x0 + bw, y + bh], radius=26, fill=(255, 255, 255, 26), outline=(255, 255, 255, 60), width=2)
        img = Image.alpha_composite(img, layer)
        d = ImageDraw.Draw(img)
        for i, s in enumerate(stats):
            x0 = mx + i * (bw + gap)
            d.text((x0 + 30, y + 24), s["label"] + " · " + s.get("basis", spec.get("basis", "1개 기준")), font=font(FONT_MED, 30), fill=SAGE)
            value = stat_range(rows, s["field"]) + s["unit"]
            vf = fit(d, value, FONT_TITLE, bw - 60, 66)
            d.text((x0 + 30, y + 64), value, font=vf, fill=IVORY)
        y += bh + 30

    # 제품 사진
    prods = [product_image(category, s) for s in spec["products"]][:4]
    area_top = y + 10
    area_h = H - 110 - area_top
    n = len(prods)
    span = W - mx * 2 + 60
    slot = span / n
    placed = []
    for i, p in enumerate(prods):
        scale = min(slot * 1.22 / p.width, area_h / p.height)
        p = p.resize((int(p.width * scale), int(p.height * scale)), Image.LANCZOS)
        x = int(mx - 30 + i * slot + (slot - p.width) / 2)
        x = max(10, min(W - 10 - p.width, x))
        yy = int(H - 112 - p.height)
        placed.append((i, p, x, yy))
    mid = n // 2
    if spec.get("productCards"):
        # 흰 포장(요거트·두유·음료)은 배경을 지우면 포장까지 깎인다. 흰 카드 위에 사진 그대로 올린다.
        gap = 22
        cw = (W - mx * 2 - gap * (n - 1)) / n
        ch = area_h - 6
        top = H - 112 - ch
        for i, p in enumerate(prods):
            x0 = int(mx + i * (cw + gap))
            sh = Image.new("RGBA", img.size, (0, 0, 0, 0))
            ImageDraw.Draw(sh).rounded_rectangle([x0 + 8, top + 14, x0 + cw + 8, top + ch + 14], radius=28, fill=(0, 0, 0, 110))
            img = Image.alpha_composite(img, sh.filter(ImageFilter.GaussianBlur(14)))
            card = Image.new("RGBA", (int(cw), int(ch)), (0, 0, 0, 0))
            ImageDraw.Draw(card).rounded_rectangle([0, 0, int(cw) - 1, int(ch) - 1], radius=28, fill=(255, 255, 255, 255))
            scale = min((cw - 40) / p.width, (ch - 40) / p.height)
            q = p.resize((int(p.width * scale), int(p.height * scale)), Image.LANCZOS)
            card.paste(q, ((int(cw) - q.width) // 2, (int(ch) - q.height) // 2))
            img.alpha_composite(card, (x0, int(top)))
        placed = []
    for i, p, x, yy in sorted(placed, key=lambda t: -abs(t[0] - mid)):
        mask = cutout_mask(p)
        shadow = Image.new("L", img.size, 0)
        shadow.paste(mask.point(lambda v: int(v * 0.55)), (x + 12, yy + 18))
        sh = Image.new("RGBA", img.size, (4, 18, 14, 255))
        sh.putalpha(shadow.filter(ImageFilter.GaussianBlur(16)))
        img = Image.alpha_composite(img, sh)
        img.paste(p, (x, yy), mask)

    d = ImageDraw.Draw(img)
    # 하단: 금색 가는 선 + 문구
    ff = font(FONT_MED, 30)
    fw = d.textlength(spec["footer"], font=ff)
    d.line([mx, H - 78, W - mx, H - 78], fill=(227, 178, 98), width=2)
    d.text(((W - fw) / 2, H - 62), spec["footer"], font=ff, fill=IVORY)
    img = img.convert("RGB")

    out = out_dir / "thumbnail.png"
    img.save(out)
    (out_dir / "thumbnail.spec.json").write_text(json.dumps(spec, ensure_ascii=False, indent=2), encoding="utf-8")
    print(out)


if __name__ == "__main__":
    main()
