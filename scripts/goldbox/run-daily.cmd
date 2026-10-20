@echo off
rem Run daily 07:10 by Task Scheduler "ProteinLab Goldbox Daily". Summary: .goldbox-auto\latest.txt, log: .goldbox-auto\run.log
rem aside repl needs the Aside browser running (2026-10-21 run failed with "Aside isn't running"), so start it first.
cd /d D:\proteinlab
if not exist .goldbox-auto mkdir .goldbox-auto
echo ===== %date% %time% >> .goldbox-auto\run.log
tasklist /FI "IMAGENAME eq Aside.exe" | find /I "Aside.exe" >nul
if errorlevel 1 (
  echo starting Aside browser >> .goldbox-auto\run.log
  start "" "C:\Program Files\Aside\Application\Aside.exe"
  timeout /t 40 /nobreak >nul
)
node scripts\goldbox\daily-goldbox.mjs --write >> .goldbox-auto\run.log 2>&1
