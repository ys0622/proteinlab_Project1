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
