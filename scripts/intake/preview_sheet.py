"""inbox/intake/<id>/ 결과를 한 장짜리 미리보기 PNG로 합친다. 사용법: python scripts/intake/preview_sheet.py B1 B2 ..."""
import json
import os
import sys

from PIL import Image, ImageDraw, ImageFont

ROOT = os.path.join(os.path.dirname(__file__), "..", "..", "inbox", "intake")
FONT = ImageFont.truetype("C:/Windows/Fonts/malgun.ttf", 20)
SMALL = ImageFont.truetype("C:/Windows/Fonts/malgun.ttf", 16)
cands = {c["id"]: c for c in json.load(open(os.path.join(ROOT, "bar-candidates.json"), encoding="utf-8"))}

rows = []
for pid in sys.argv[1:]:
    d = os.path.join(ROOT, pid)
    g = json.load(open(os.path.join(d, "gemini.json"), encoding="utf-8"))
    m = json.load(open(os.path.join(d, "meta.json"), encoding="utf-8"))
    c = cands[pid]
    canvas = Image.new("RGB", (1300, 470), "white")
    draw = ImageDraw.Draw(canvas)
    x = 10
    for name, box in (("product.png", (300, 450)), ("spec.png", (440, 450))):
        p = os.path.join(d, name)
        if os.path.exists(p):
            im = Image.open(p).convert("RGB")
            im.thumbnail(box)
            canvas.paste(im, (x, 10))
            draw.rectangle([x - 1, 9, x + im.width, 10 + im.height], outline="#ddd")
        x += box[0] + 20
    n = g.get("nutrition_per_unit", {})
    v = lambda k, u: "?" if n.get(k) is None else f"{n[k]}{u}"
    lines = [
        f"{pid} {c['brand']} {c['name']}",
        f"기준 {n.get('basis', '?')}",
        f"열량 {v('kcal', 'kcal')}  단백질 {v('protein_g', 'g')}",
        f"당류 {v('sugar_g', 'g')}  지방 {v('fat_g', 'g')}",
        f"나트륨 {v('sodium_mg', 'mg')}",
        f"성분표 언어: {g.get('spec_language')}",
        f"쿠팡 옵션 ID: {'확인' if m.get('idSource', 'landed' if m.get('itemId') else 'none') == 'landed' else '첫 판매 옵션(확인 필요)'}",
    ]
    y = 14
    for i, t in enumerate(lines):
        draw.text((x, y), t, fill="#111", font=FONT if i == 0 else SMALL)
        y += 34 if i == 0 else 28
    note = (g.get("note") or "")[:60]
    draw.text((x, y + 6), note, fill="#777", font=SMALL)
    rows.append(canvas)

sheet = Image.new("RGB", (1300, 480 * len(rows)), "#f2f0eb")
for i, r in enumerate(rows):
    sheet.paste(r, (0, i * 480))
sheet.save(os.path.join(ROOT, "preview.png"))
print(os.path.join(ROOT, "preview.png"))
