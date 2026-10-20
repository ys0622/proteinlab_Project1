@echo off
rem Run daily 07:10 by Task Scheduler "ProteinLab Goldbox Daily". Summary: .goldbox-auto\latest.txt, log: .goldbox-auto\run.log
cd /d D:\proteinlab
if not exist .goldbox-auto mkdir .goldbox-auto
echo ===== %date% %time% >> .goldbox-auto\run.log
node scripts\goldbox\daily-goldbox.mjs --write >> .goldbox-auto\run.log 2>&1
