"""쿠팡파트너스 단축 링크(link.coupang.com/a/<code>)가 가리키는 상품 번호를 풀어 app/data/coupangShortLinkTargets.json 에 더한다.

단축 링크는 만들 때 구분값(subId)이 비어 있어서, 구매 버튼은 이 표로 상품을 찾아 /api/out/coupang 에서 subId=proteinlab 딥링크를
새로 만든다(실패하면 원래 단축 링크로 보냄, 2026-10-24). 새 단축 링크를 데이터에 넣었으면 이 스크립트를 한 번 돌린다.
이미 표에 있는 코드는 건너뛴다. 사용: python -X utf8 scripts/coupang/resolve-short-links.py
"""
import glob, json, re, time, urllib.error, urllib.request

TABLE = "app/data/coupangShortLinkTargets.json"
SKIP = {"gaIdNRGs2u", "AFFSDP"}  # 쿠팡 홈 폴백, 코드가 만드는 링크 형식

table = json.load(open(TABLE, encoding="utf-8"))
codes = set()
for path in glob.glob("app/**/*.*", recursive=True):
    if not path.endswith((".ts", ".tsx", ".json")) or path.replace("\\", "/").endswith(TABLE):
        continue
    try:
        text = open(path, encoding="utf-8").read()
    except (UnicodeDecodeError, OSError):
        continue
    codes.update(c for c in re.findall(r"link\.coupang\.com/a/([A-Za-z0-9]{6,})", text) if c not in SKIP)

class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, *args, **kwargs):
        return None

opener = urllib.request.build_opener(NoRedirect)
added, failed = 0, []
for code in sorted(codes - set(table)):
    location = ""
    try:
        location = opener.open(urllib.request.Request("https://link.coupang.com/a/" + code, headers={"User-Agent": "Mozilla/5.0"}), timeout=15).headers.get("Location", "")
    except urllib.error.HTTPError as e:
        location = e.headers.get("Location", "")
    except Exception:
        pass
    page = re.search(r"/vp/products/(\d+)", location)
    item = re.search(r"[?&]itemId=(\d+)", location)
    if page and item:
        table[code] = {"pageKey": page.group(1), "itemId": item.group(1)}
        added += 1
    else:
        failed.append(code)
    time.sleep(0.3)

json.dump(table, open(TABLE, "w", encoding="utf-8"), ensure_ascii=False, indent=1, sort_keys=True)
print(f"단축 링크 {len(codes)}개 · 새로 추가 {added} · 실패 {len(failed)} {failed} · 표 {len(table)}개")
