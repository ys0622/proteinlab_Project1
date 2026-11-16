#!/usr/bin/env python3
"""네이버 통합검색에서 핵심 검색어의 프로틴랩 노출을 확인해 docs/naver-rank-log.csv 에 추가한다(읽기 전용).
사이트(proteinlab.kr)와 블로그(blog.naver.com/proteinlab2026)를 함께 본다.

2026-11-16(백로그 #18): Aside 에이전트(크레딧 소모, 11/14 크레딧 부족 402로 15개 모두 실패) 대신
작업용 크롬에서 scripts/naver/rank.repl.js 를 돌려 DOM 링크를 직접 센다(CLAUDE.md: 자동화는 크롬, 실패 시 Aside repl).

실행: python -X utf8 scripts/naver/rank.py [검색어...]   (--dry-run: csv에 쓰지 않고 결과만 출력)
출력: 마지막에 지난 측정 대비 변화 요약. 결과 줄을 읽지 못한 검색어는 '확인 실패'로 기록한다.
"""
import csv, datetime, json, os, re, subprocess, sys, tempfile
from pathlib import Path

QUERIES = [
    '테이크핏 몬스터', '테이크핏 맥스', '셀렉스 프로틴', '하이뮨 프로틴 밸런스', '뉴케어 올프로틴',
    '단백질 음료 추천', '단백질바 추천', '그릭요거트 단백질', '고단백 두유', '연세두유 고단백',
    '베어벨스 프로틴바', '퀘스트바', '커클랜드 프로틴바 칼로리', '랩노쉬 프로틴', '단백질 쉐이크 추천',
]
args = [a for a in sys.argv[1:] if not a.startswith('--')]
DRY = '--dry-run' in sys.argv
if args:  # 일부 검색어만 다시 잴 때: python scripts/naver/rank.py 퀘스트바 ...
    QUERIES = args
ROOT = Path(__file__).resolve().parent.parent.parent
LOG = ROOT / 'docs' / 'naver-rank-log.csv'
TEMPLATE = ROOT / 'scripts' / 'naver' / 'rank.repl.js'
REPL = ROOT / 'scripts' / 'browser' / 'chrome-repl.mjs'
PROFILE = 'work-nologin'

code = TEMPLATE.read_text(encoding='utf-8').replace('__QUERIES__', json.dumps(QUERIES, ensure_ascii=False))
with tempfile.NamedTemporaryFile('w', suffix='.js', delete=False, encoding='utf-8') as fh:
    fh.write(code)
    tmp = fh.name
try:
    proc = subprocess.run(['node', str(REPL).replace('\\', '/'), '--profile', PROFILE, '--timeout', str(60_000 + 40_000 * len(QUERIES)), '--file', tmp.replace('\\', '/')],
                          capture_output=True, text=True, encoding='utf-8', errors='replace', timeout=120 + 60 * len(QUERIES), cwd=str(ROOT))
    out = proc.stdout or ''
finally:
    os.unlink(tmp)

rows = {}
for line in out.splitlines():
    m = re.match(r'RANK (.+?) => (\{.*\})\s*$', line.strip())
    if not m:
        continue
    q, r = m.group(1).strip(), json.loads(m.group(2))
    if 'error' in r:
        continue
    if r.get('found'):
        sec = 'AI 브리핑' if r.get('ai') else (r.get('section') or '-')
        note = 'chrome repl DOM' + (' · AI 브리핑 출처' if r.get('ai') else '') + (' · 블로그' if 'blog.naver.com' in r.get('url', '') else '')
        rows[q] = ['Y', sec, str(r.get('rank') or '-'), r.get('url', '-'), note]
    else:
        rows[q] = ['N', '-', '-', '-', 'chrome repl DOM']

today = datetime.date.today().isoformat()
prev = {}
if LOG.exists():
    for r in csv.DictReader(LOG.open(encoding='utf-8')):
        prev[r['query']] = r   # 마지막 행이 가장 최근

new_rows = []
for q in QUERIES:
    if q in rows:
        f, sec, rank, url, note = rows[q]
        new_rows.append([today, q, f, sec, rank, url, note])
    else:
        new_rows.append([today, q, '?', '-', '-', '-', '확인 실패'])

if DRY:
    for r in new_rows:
        print('ROW', r)
else:
    with LOG.open('a', encoding='utf-8', newline='') as fh:
        w = csv.writer(fh)
        for r in new_rows:
            w.writerow(r)

def label(r):
    return 'Y' if r['found'] == 'Y' else ('N' if r['found'] == 'N' else '?')

changes = []
for r in new_rows:
    q = r[1]
    cur = r[2]
    old = label(prev[q]) if q in prev else '(처음)'
    if cur != old:
        changes.append(f'{q}: {old} → {cur}')
print(f"SUMMARY date={today} 확인={sum(1 for r in new_rows if r[2] != '?')}/{len(new_rows)} 변화={len(changes)}{' (dry-run, 기록 안 함)' if DRY else ''}")
for c in changes:
    print('CHANGE', c)
if not rows:
    print('STDERR', (proc.stderr or '')[-800:])
