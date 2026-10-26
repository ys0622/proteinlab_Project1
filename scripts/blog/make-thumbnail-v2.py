"""프로틴랩 블로그 썸네일 v2 (2026-10-26 사장님 확정 디자인).

흰 바탕 에디토리얼 + 1위 칸 초록 강조. 제품 사진은 사이트 원본(흰 배경)을 누끼 없이 그대로 쓴다.
제품이 놓이는 자리를 순수 흰색으로 두어 사진의 흰 배경이 녹아들게 한다.
수치는 evidence.json의 검증값(verified)만 쓴다.

사용 (blogpilot 가상환경 파이썬, playwright·Pillow 필요):
  "D:\\네이버 블로그 자동화\\.venv\\Scripts\\python.exe" scripts/blog/make-thumbnail-v2.py <content 폴더>
spec(thumbnail.spec.json)에서 읽는 값:
  lines        [[제목1, ...], [제목2, ...]]  1줄째는 굵게, 2줄째는 얇게
  titleMain/titleSub  (선택) lines 대신 직접 지정
  products     제품 slug 최대 4개
  labels       (선택) 제품별 짧은 이름. 없으면 근거의 이름 괄호 속 맛 이름
  stats        [{field,label,unit}, ...]  1번째 = 큰 숫자·1위 기준, 2번째 = 작은 보조 숫자
  highlight    (선택) "max" | "min" | "none". 기본: 단백질류 max, 당류·열량·나트륨 min
  basis        (선택) "1회 45g" 같은 기준. 없으면 근거 용량
결과: <폴더>/thumbnail.png (1080x1080)
"""
import base64
import io
import json
import re
import sys
from pathlib import Path

from PIL import Image, ImageChops
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[2]
IMAGE_DIRS = {"drink": "rtd-drink-image", "bar": "bar-image", "shake": "shake-image", "yogurt": "protein-yogurt-image", "soymilk": "soymilk-image"}
IMAGE_MAPS = {"drink": "slugToImage.json", "bar": "slugToBarImage.json", "shake": "slugToShakeImage.json", "yogurt": "slugToYogurtImage.json", "soymilk": "slugToSoymilkImage.json"}
LOWER_IS_BETTER = ("sugar", "kcal", "calorie", "sodium", "fat", "carb")
FONT = '<link href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css" rel="stylesheet">'


def product_image(category: str, slug: str) -> str:
    m = json.loads((ROOT / "app/data" / IMAGE_MAPS[category]).read_text(encoding="utf-8"))
    f = m.get(slug)
    if not f:
        raise SystemExit(f"제품 사진 매핑 없음: {slug}")
    p = ROOT / "public" / IMAGE_DIRS[category] / f
    if not p.exists():
        raise SystemExit(f"제품 사진 파일 없음: {p}")
    im = Image.open(p).convert("RGB").point(lambda v: 255 if v >= 248 else v)  # 거의 흰색은 완전 흰색으로
    diff = ImageChops.difference(im, Image.new("RGB", im.size, (255, 255, 255))).convert("L").point(lambda v: 255 if v > 28 else 0)  # 옅은 회색 여백까지 잘라 제품을 크게
    im = im.crop(diff.getbbox() or (0, 0, *im.size))
    buf = io.BytesIO()
    im.save(buf, "PNG")
    return "data:image/png;base64," + base64.b64encode(buf.getvalue()).decode()


def num(v) -> str:
    return f"{v:g}" if isinstance(v, (int, float)) else str(v)


def short_name(row: dict) -> str:
    name = row.get("name", "")
    m = re.search(r"\(([^)]+)\)\s*$", name)
    if m:
        return m.group(1)
    out = ""
    for w in name.split():  # 단어 단위로 9자까지만 (중간에서 자르지 않음)
        if out and len(out) + 1 + len(w) > 9:
            break
        out = (out + " " + w).strip()
    return out


def build_html(spec: dict, rows: dict, category: str) -> str:
    slugs = spec["products"][:4]
    for s in slugs:
        r = rows.get(s)
        if not r or not r.get("verified"):
            raise SystemExit(f"검증된 근거에 없는 제품: {s}")
    stats = spec.get("stats") or [{"field": "proteinG", "label": "단백질", "unit": "g"}]
    main, sub = stats[0], (stats[1] if len(stats) > 1 else None)
    for s in slugs:
        if rows[s].get(main["field"]) is None:
            raise SystemExit(f"근거에 없는 값: {s} {main['field']}")
    mode = spec.get("highlight") or ("min" if any(k in main["field"].lower() for k in LOWER_IS_BETTER) else "max")
    vals = [rows[s][main["field"]] for s in slugs]
    win = None
    if mode in ("max", "min"):
        best = max(vals) if mode == "max" else min(vals)
        if vals.count(best) == 1:  # 동점이면 강조하지 않는다
            win = vals.index(best)
    tag = f"{main['label']} {'1위' if mode == 'max' else '최저'}"
    labels = spec.get("labels") or [short_name(rows[s]) for s in slugs]
    lines = spec.get("lines") or [[spec.get("titleMain", "")], [spec.get("titleSub", "")]]
    t_main = spec.get("titleMain") or lines[0][0]
    t_sub = spec.get("titleSub") or (lines[1][0] if len(lines) > 1 else "")
    basis = spec.get("basis") or (f"1개 {rows[slugs[0]].get('capacity', '')}".strip())

    cols = []
    for i, s in enumerate(slugs):
        r = rows[s]
        w = i == win
        sub_txt = f'{sub["label"]} {num(r[sub["field"]])}{sub["unit"]}' if sub and r.get(sub["field"]) is not None else ""
        cols.append(
            f'<div class="col{" win" if w else ""}"><div class="ph"><img src="{product_image(category, s)}"></div>'
            f'<div class="rule"></div><div class="tag">{"<span>" + tag + "</span>" if w else ""}</div>'
            f'<div class="n">{labels[i]}</div><div class="p">{num(r[main["field"]])}<small>{main["unit"]}</small></div>'
            f'<div class="s">{sub_txt}</div></div>')
    n = len(slugs)
    return f"""<!doctype html><html><head><meta charset="utf-8">{FONT}<style>
*{{margin:0;padding:0;box-sizing:border-box}}
body{{width:1080px;height:1080px;font-family:Pretendard,sans-serif;background:#fff;color:#141a16;position:relative;overflow:hidden}}
.top{{position:absolute;top:70px;left:84px;right:84px;display:flex;justify-content:space-between;align-items:baseline}}
.brand{{font-size:22px;font-weight:700;color:#1f8a5b}}
.meta{{font-size:22px;font-weight:500;color:#9aa49d}}
.h{{position:absolute;top:122px;left:80px;right:70px;white-space:nowrap;font-size:92px;font-weight:800;letter-spacing:-4px;line-height:1.06}}
.h span{{display:block;font-weight:300;color:#3d4741;font-size:80px;letter-spacing:-3px}}
.grid{{position:absolute;left:64px;right:64px;top:366px;display:grid;grid-template-columns:repeat({n},1fr);column-gap:12px}}
.col{{display:flex;flex-direction:column;align-items:center;padding:22px 0 26px;border-radius:22px}}
.ph{{height:400px;width:86%;padding:14px 8px;display:flex;align-items:flex-end;justify-content:center}}
.ph img{{max-height:372px;max-width:100%;object-fit:contain}}
.rule{{width:72%;height:1px;background:#d9ded9;margin:26px 0 18px}}
.n{{font-size:25px;font-weight:600;color:#5b665f;text-align:center;max-width:92%}}
.p{{margin-top:2px;font-size:60px;font-weight:800;letter-spacing:-2px;line-height:1.05}}
.p small{{font-size:26px;font-weight:600;margin-left:3px}}
.s{{margin-top:4px;font-size:21px;font-weight:500;color:#98a29b;min-height:26px}}
.tag{{height:30px;margin-bottom:6px;font-size:18px;font-weight:700}}
.win{{background:#1f8a5b;color:#fff}}
.win .ph{{background:#fff;border-radius:16px}}
.win .rule{{background:rgba(255,255,255,.45)}}
.win .n,.win .s{{color:rgba(255,255,255,.85)}}
.win .tag span{{background:#fff;color:#1f8a5b;border-radius:999px;padding:3px 12px}}
</style></head><body>
<div class="top"><div class="brand">PROTEIN LAB</div><div class="meta">{basis} · 성분표 기준</div></div>
<div class="h">{t_main}<span>{t_sub}</span></div>
<div class="grid">{''.join(cols)}</div>
</body></html>"""


def main():
    out_dir = Path(sys.argv[1])
    spec = json.loads((out_dir / "thumbnail.spec.json").read_text(encoding="utf-8"))
    ev = json.loads((out_dir / "evidence.json").read_text(encoding="utf-8"))
    rows = {r["slug"]: r for r in ev["rows"]}
    html = build_html(spec, rows, ev["topic"]["category_data"])
    tmp = out_dir / "thumbnail.v2.html"
    tmp.write_text(html, encoding="utf-8")
    with sync_playwright() as p:
        b = p.chromium.launch(channel="chrome")
        pg = b.new_page(viewport={"width": 1080, "height": 1080})
        pg.goto(tmp.as_uri())
        pg.wait_for_timeout(1500)
        # 제목이 넘치면 글자를 줄인다
        pg.evaluate("""() => { const h = document.querySelector('.h'); const s = h.querySelector('span');
            let f = 92, g = 80; while (h.scrollWidth > h.clientWidth + 2 && f > 56) { f -= 4; g -= 4; h.style.fontSize = f + 'px'; s.style.fontSize = g + 'px'; } }""")
        pg.screenshot(path=str(out_dir / "thumbnail.png"))
        b.close()
    tmp.unlink()
    print(out_dir / "thumbnail.png")


if __name__ == "__main__":
    main()
