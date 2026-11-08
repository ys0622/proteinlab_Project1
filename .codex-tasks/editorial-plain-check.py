# -*- coding: utf-8 -*-
"""사람이 쓴 제품 소개 글 검사: 본문 숫자가 자기·비교 제품·같은 브랜드 데이터나 sources 글에 있는지, 괄호 뒤 조사, 금지 문구, 형식, 유사도.
실행: python -X utf8 .codex-tasks/editorial-plain-check.py <json>
"""
import json, re, sys, difflib, itertools

src = sys.argv[1]
ed = json.load(open(src, encoding="utf-8"))
by = {}
for c in ["drink", "bar", "shake", "yogurt", "soymilk", "powder"]:
    for p in json.load(open(f"app/data/{c}ProductsData.json", encoding="utf-8")):
        by[p["slug"]] = (c, p)


def nums(o):
    s = json.dumps(o, ensure_ascii=False)
    return set(x.replace(",", "") for x in re.findall(r"\d[\d,]*(?:\.\d+)?", s))


def norm(n):
    try:
        f = float(n)
    except ValueError:
        return {n}
    out = {n, f"{f:.1f}", f"{f:.2f}"}
    if f == int(f):
        out.add(str(int(f)))
    return out


BAN = ["나란히 볼 수", "함께 확인할 수", "따로 확인하세요", "비교하려는 분", "맞추려는 분", "안쪽으로 두고 싶은"]
probs = []
for s, v in ed.items():
    if s not in by:
        probs.append(f"없는 slug {s}")
        continue
    c, p = by[s]
    pool = set()
    rel = [s] + v.get("compareSlugs", []) + [q["slug"] for cc, q in by.values() if q.get("brand") == p.get("brand") and cc == c]
    for r in rel:
        if r in by:
            for n in nums(by[r][1]):
                pool |= norm(n)
    for n in nums(v.get("sources", [])):
        pool |= norm(n)
    text = " ".join([v["summary"]] + v["points"] + v["goodFor"] + v["watchOut"])
    for n in re.findall(r"\d[\d,]*(?:\.\d+)?", text):
        n = n.replace(",", "")
        if not (norm(n) & pool):
            probs.append(f"[근거 없는 숫자] {s}: {n}")
    for c2 in v.get("compareSlugs", []):
        if c2 not in by or by[c2][0] != c:
            probs.append(f"[비교 slug] {s}: {c2}")
    if re.search(r"\)\s?(은|는|이|가|을|를|와|과)(\s|$|[.,])", text):
        probs.append(f"[괄호 뒤 조사] {s}")
    for b in BAN:
        if b in text:
            probs.append(f"[금지 문구] {s}: {b}")
    if not (len(v["points"]) in (3, 4) and len(v["goodFor"]) == 2 and len(v["watchOut"]) in (1, 2) and len(v["compareSlugs"]) in (2, 3)):
        probs.append(f"[형식] {s}")

texts = {s: " ".join([v["summary"]] + v["points"]) for s, v in ed.items()}
sims = sorted(((difflib.SequenceMatcher(None, texts[a], texts[b]).ratio(), a, b) for a, b in itertools.combinations(texts, 2)), reverse=True)[:5]
print("제품", len(ed), "문제", len(probs))
for x in probs:
    print(" -", x)
print("유사도 상위", [(round(r, 2), a, b) for r, a, b in sims])
