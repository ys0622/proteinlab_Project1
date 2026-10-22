#!/usr/bin/env python3
"""네이버 통합검색에서 핵심 검색어의 프로틴랩 노출 순위를 Aside CLI로 확인해 docs/naver-rank-log.csv 에 추가한다(읽기 전용).
사이트(proteinlab.kr)와 블로그(blog.naver.com/proteinlab2026)를 함께 본다. 케어맵 scripts/aside_naver_rank.py 를 옮겨 왔다(2026-10-22).

실행: python scripts/naver/rank.py
출력: 마지막에 지난 측정 대비 변화 요약. 결과 줄을 읽지 못한 검색어는 '확인 실패'로 기록한다.
"""
import csv, datetime, os, re, subprocess, sys
from pathlib import Path

QUERIES = [
    '테이크핏 몬스터', '테이크핏 맥스', '셀렉스 프로틴', '하이뮨 프로틴 밸런스', '뉴케어 올프로틴',
    '단백질 음료 추천', '단백질바 추천', '그릭요거트 단백질', '고단백 두유', '연세두유 고단백',
    '베어벨스 프로틴바', '퀘스트바', '커클랜드 프로틴바 칼로리', '랩노쉬 프로틴', '단백질 쉐이크 추천',
]
if len(sys.argv) > 1:  # 일부 검색어만 다시 잴 때: python scripts/naver/rank.py 퀘스트바 ...
    QUERIES = sys.argv[1:]
ROOT = Path(__file__).resolve().parent.parent.parent
LOG = ROOT / 'docs' / 'naver-rank-log.csv'
ASIDE = Path(os.path.expandvars(r'%LOCALAPPDATA%\Aside\CLI\current\aside.exe'))
if not ASIDE.exists():
    print('ERROR aside.exe 를 찾을 수 없습니다:', ASIDE); sys.exit(2)

BATCH = 5   # 한 번에 5개씩, medium 노력으로 DOM 링크를 직접 확인(15개를 한 번에 빠르게 읽으면 오판이 나온 적이 있다)

def run_batch(qs):
    prompt = (
        "읽기 전용 조사입니다. 로그인, 광고 클릭, 구매, 폼 제출은 하지 마세요. 네이버(search.naver.com)에서 검색어를 각각 검색합니다: " + ' / '.join(qs) + ". "
        "각 검색어마다 통합검색 결과 페이지를 끝까지 스크롤하면서(웹문서 '더보기'나 '웹사이트' 탭은 누르지 않고 통합검색 첫 화면에 보이는 범위만) "
        "반드시 페이지 DOM에서 href 에 proteinlab.kr 또는 blog.naver.com/proteinlab2026 이 들어간 링크를 직접 찾아 확인하세요(눈으로만 보지 마세요). "
        "찾았다면 그 링크 주소와 제목, 그 링크가 속한 섹션 이름과 섹션 안 순서(예: 웹문서 1번째, AI 브리핑 추천문서 1번째·출처 2번째)를 적으세요. "
        "없으면 '없음'이라고 쓰세요. 화면에 보이는 것만 적고 추측하지 마세요. "
        "출력은 마지막에 정확히 이 형식의 한 줄씩만: CHECK|검색어|있음 또는 없음|첫 번째 프로틴랩 URL 또는 -|섹션과 순서들(세미콜론으로 구분) 또는 -|상위 외부 도메인들."
    )
    proc = subprocess.run([str(ASIDE), '--effort', 'medium', prompt], capture_output=True, text=True, encoding='utf-8', errors='replace', timeout=1800)
    return re.sub(r'\[[0-9;]*m', '', proc.stdout or '')

rows = {}
for k in range(0, len(QUERIES), BATCH):
    out = run_batch(QUERIES[k:k + BATCH])
    for line in out.splitlines():
        m = re.match(r'CHECK\|([^|]+)\|(있음|없음)\|([^|]*)\|([^|]*)\|?(.*)$', line.strip())
        if not m:
            continue
        q, found, urlfield, secs = m.group(1).strip(), m.group(2), m.group(3).strip(), m.group(4).strip()
        url = (re.findall(r'https?://[^\s<>;]+', urlfield) or ['-'])[0]
        ranks = [int(x) for x in re.findall(r'웹문서\s*(\d+)번째', secs)]
        ai = 'AI 브리핑' in secs
        rows[q] = ['Y' if found == '있음' else 'N', '웹문서' if ranks else ('AI 브리핑' if ai else '-'), str(min(ranks)) if ranks else '-', url, 'AI 브리핑 노출' if ai else '']

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

with LOG.open('a', encoding='utf-8', newline='') as fh:
    w = csv.writer(fh)
    for r in new_rows:
        w.writerow(r)

def label(r):
    return f"{r['found']}/{r['rank_in_section']}" if r['found'] == 'Y' else 'N'

changes = []
for r in new_rows:
    q = r[1]
    cur = f"{r[2]}/{r[4]}" if r[2] == 'Y' else ('N' if r[2] == 'N' else '?')
    old = label(prev[q]) if q in prev else '(처음)'
    if cur != old:
        changes.append(f'{q}: {old} → {cur}')
print(f"SUMMARY date={today} 확인={sum(1 for r in new_rows if r[2] != '?')}/{len(new_rows)} 변화={len(changes)}")
for c in changes:
    print('CHANGE', c)
