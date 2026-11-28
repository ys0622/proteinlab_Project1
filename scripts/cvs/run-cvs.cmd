@echo off
rem Run daily by Task Scheduler "ProteinLab CVS Deals Daily" (09:20). Summary: .cvs-auto\latest.txt, log: .cvs-auto\run.log
rem Collects CU / 7-Eleven 1+1, 2+1 lists with the work Chrome profile and writes KV cvs-deals:v1 (no deploy needed).
cd /d D:\proteinlab
if not exist .cvs-auto mkdir .cvs-auto
echo ===== %date% %time% >> .cvs-auto\run.log
node scripts\cvs\monthly-cvs.mjs --write >> .cvs-auto\run.log 2>&1
