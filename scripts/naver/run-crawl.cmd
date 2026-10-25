@echo off
rem Run daily by Task Scheduler "ProteinLab Naver Crawl Daily" (weekdays 07:55, weekends 08:55). Summary: .naver-crawl\latest.txt, log: .naver-crawl\run.log
cd /d D:\proteinlab
if not exist .naver-crawl mkdir .naver-crawl
echo ===== %date% %time% >> .naver-crawl\run.log
tasklist /FI "IMAGENAME eq Aside.exe" | find /I "Aside.exe" >nul
if errorlevel 1 (
  echo starting Aside browser >> .naver-crawl\run.log
  start "" "C:\Program Files\Aside\Application\Aside.exe"
  timeout /t 40 /nobreak >nul
)
node scripts\naver\crawl-daily.mjs >> .naver-crawl\run.log 2>&1
rem 2026-10-24: "Aside isn't running" right after boot made the whole run fail. Restart Aside and retry once.
findstr /C:"Aside isn't running" /C:"fetch failed" /C:"not connected to the daemon" /C:"ETIMEDOUT" .naver-crawl\latest.txt >nul
if not errorlevel 1 (
  echo retry after Aside restart >> .naver-crawl\run.log
  start "" "C:\Program Files\Aside\Application\Aside.exe"
  timeout /t 60 /nobreak >nul
  node scripts\naver\crawl-daily.mjs >> .naver-crawl\run.log 2>&1
)
