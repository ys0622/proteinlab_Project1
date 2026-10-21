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
INK = (23, 63, 53)
ACCENT = (196, 120, 34)
SUBINK = (70, 78, 74)
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
    bg = Image.new("RGB", (W, H), (255, 255, 255))
    top, bottom = (246, 241, 230), (255, 255, 255)
    px = bg.load()
    for y in range(H):
        t = y / (H - 1)
        c = tuple(int(top[i] + (bottom[i] - top[i]) * t) for i in range(3))
        for x in range(W):
            px[x, y] = c
    # 오른쪽 위 은은한 원
    glow = Image.new("L", (W, H), 0)
    ImageDraw.Draw(glow).ellipse([620, -220, 1300, 460], fill=70)
    glow = glow.filter(ImageFilter.GaussianBlur(60))
    tint = Image.new("RGB", (W, H), (214, 226, 214))
    return Image.composite(tint, bg, glow)


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

    img = gradient_bg()
    d = ImageDraw.Draw(img)
    mx = 78

    # 상단 라벨
    kf = font(FONT_MED, 30)
    kw = d.textlength(spec["kicker"], font=kf)
    d.rounded_rectangle([mx, 70, mx + kw + 44, 70 + 56], radius=28, fill=INK)
    d.text((mx + 22, 70 + 13), spec["kicker"], font=kf, fill=(255, 255, 255))

    # 제목
    y = 160
    for text, tone in spec["lines"]:
        f = fit(d, text, FONT_TITLE, W - mx * 2, 118)
        d.text((mx, y), text, font=f, fill=ACCENT if tone == "accent" else INK)
        y += int(f.size * 1.18)

    # 보조 문구
    sf = fit(d, spec["sub"], FONT_MED, W - mx * 2, 46)
    d.text((mx, y + 4), spec["sub"], font=sf, fill=SUBINK)
    y += sf.size + 40

    # 수치 배지
    stats = spec.get("stats", [])
    if stats:
        gap = 22
        bw = (W - mx * 2 - gap * (len(stats) - 1)) / len(stats)
        bh = 150
        for i, s in enumerate(stats):
            x0 = mx + i * (bw + gap)
            d.rounded_rectangle([x0, y, x0 + bw, y + bh], radius=26, fill=(255, 255, 255), outline=(216, 222, 214), width=3)
            lf = font(FONT_MED, 30)
            d.text((x0 + 30, y + 22), s["label"] + " · 1개 기준", font=lf, fill=SUBINK)
            value = stat_range(rows, s["field"]) + s["unit"]
            vf = fit(d, value, FONT_TITLE, bw - 60, 66)
            d.text((x0 + 30, y + 62), value, font=vf, fill=INK)
        y += bh + 30

    # 제품 사진: 아래쪽 판 위에 나란히(흰 배경이라 곱하기로 합성)
    prods = [product_image(category, s) for s in spec["products"]][:4]
    area_top = y + 10
    area_h = H - 110 - area_top
    plate = Image.new("L", (W, H), 0)
    ImageDraw.Draw(plate).ellipse([mx - 20, H - 150, W - mx + 20, H - 96], fill=90)
    img = Image.composite(Image.new("RGB", (W, H), (205, 214, 204)), img, plate.filter(ImageFilter.GaussianBlur(18)))
    n = len(prods)
    # 가로로 긴 바 포장은 칸보다 조금 크게 그려 살짝 겹치게 한다(가운데 제품이 앞).
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
    for i, p, x, yy in sorted(placed, key=lambda t: -abs(t[0] - mid)):
        # 흰 배경은 투명하게(곱하기는 겹친 제품이 비쳐 보여서, 흰색 마스크로 붙인다)
        mask = ImageChops.difference(p, Image.new("RGB", p.size, (255, 255, 255))).convert("L").point(lambda v: 255 if v > 10 else 0).filter(ImageFilter.MaxFilter(3)).filter(ImageFilter.GaussianBlur(1))
        shadow = Image.new("L", img.size, 0)
        shadow.paste(mask.point(lambda v: v * 0.35), (x + 10, yy + 14))
        img = Image.composite(Image.new("RGB", img.size, (150, 160, 150)), img, shadow.filter(ImageFilter.GaussianBlur(14)))
        img.paste(p, (x, yy), mask)

    d = ImageDraw.Draw(img)
    # 하단 띠
    d.rectangle([0, H - 72, W, H], fill=INK)
    ff = font(FONT_MED, 30)
    fw = d.textlength(spec["footer"], font=ff)
    d.text(((W - fw) / 2, H - 72 + 20), spec["footer"], font=ff, fill=(255, 255, 255))

    out = out_dir / "thumbnail.png"
    img.save(out)
    (out_dir / "thumbnail.spec.json").write_text(json.dumps(spec, ensure_ascii=False, indent=2), encoding="utf-8")
    print(out)


if __name__ == "__main__":
    main()
