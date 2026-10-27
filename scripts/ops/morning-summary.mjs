#!/usr/bin/env node
/**
 * 아침 자동 작업 결과 요약(2026-10-28, 크레딧 절약: 문제 있을 때만 Claude가 판단).
 * 골드박스·네이버 수집 결과 파일, blogpilot 오늘 상태, 블로그 RSS(어제 글 게시)를 읽어
 * 한 덩어리 요약과 NEEDS_CLAUDE 여부를 출력한다. 읽기만 하고 아무것도 고치지 않는다.
 *
 * 사용: node scripts/ops/morning-summary.mjs            (사람이 읽는 요약 + 마지막 줄 JSON)
 * 출력 마지막 줄: SUMMARY {"ok":bool,"reasons":[...],...}
 */
import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const kst = new Date(Date.now() + 9 * 3600_000);
const today = kst.toISOString().slice(0, 10);
const yesterday = new Date(kst.getTime() - 86400_000).toISOString().slice(0, 10);
const reasons = [];
const out = { date: today };

function read(p) {
  return existsSync(p) ? readFileSync(p, "utf-8") : "";
}

// 1. 골드박스
const gb = read(join(root, ".goldbox-auto/latest.txt"));
const gbDate = (gb.match(/골드박스 점검 (\d{4}-\d{2}-\d{2})/) || [])[1];
const gbMatched = (gb.match(/^일치: (.*)$/m) || [])[1] || "";
const gbReview = gb.split(/\r?\n/).filter((l) => /^\s+- /.test(l)).map((l) => l.trim().slice(2));
out.goldbox = { date: gbDate, matched: gbMatched === "없음" ? [] : gbMatched.split(", ").map((s) => s.split(" ")[0]).filter(Boolean), review: gbReview.length };
if (gbDate !== today) reasons.push(`골드박스 오늘 실행 안 됨(마지막 ${gbDate || "없음"})`);
if (gbReview.length) reasons.push(`골드박스 확인 필요 ${gbReview.length}건`);

// 2. 네이버 수집 요청
const nv = read(join(root, ".naver-crawl/latest.txt"));
const nvDate = (nv.match(/네이버 수집 요청 (\d{4}-\d{2}-\d{2})/) || [])[1];
const nvAccepted = +((nv.match(/접수: (\d+)건/) || [])[1] || 0);
const nvStop = (nv.match(/^중단: (.*)$/m) || [])[1] || "";
const nvLeft = +((nv.match(/남은 주소: (\d+)건/) || [])[1] || 0);
out.crawl = { date: nvDate, accepted: nvAccepted, left: nvLeft, stop: nvStop };
if (nvDate !== today) reasons.push(`네이버 수집 오늘 실행 안 됨(마지막 ${nvDate || "없음"})`);
else if (nvStop && nvStop !== "없음" && !/하루 한도/.test(nvStop)) reasons.push(`네이버 수집 중단: ${nvStop}`);

// 3. 블로그(blogpilot 오늘 상태) — 엔진은 다른 세션 소관, 읽기만
let blogRows = [];
try {
  const txt = execFileSync("python", ["-X", "utf8", "-m", "blogpilot", "status", "protein_lab", "--date", today], {
    cwd: "D:/네이버 블로그 자동화", encoding: "utf-8", timeout: 120_000,
  });
  blogRows = [...txt.matchAll(/^\s*\d+\.\s+(\w+)\s+(\S+ \S+)\s+(.+)$/gm)].map((m) => ({ state: m[1], at: m[2], title: m[3].split("  ←")[0].trim() }));
} catch (e) {
  reasons.push(`blogpilot 상태 확인 실패: ${String(e.message).slice(0, 80)}`);
}
const failed = blogRows.filter((r) => !/published|scheduled/.test(r.state));
out.blog = { today: blogRows.length, failed: failed.map((r) => `${r.state} ${r.at} ${r.title}`) };
if (!blogRows.length) reasons.push("오늘 블로그 발행 목록 없음");
if (failed.length) reasons.push(`블로그 미발행 ${failed.length}편(${failed.map((r) => r.state).join(",")})`);

// 4. 어제 글 게시(RSS)
let rssYesterday = null;
try {
  const xml = execFileSync("curl", ["-s", "-A", "Mozilla/5.0 Chrome/130", "https://rss.blog.naver.com/proteinlab2026.xml"], { encoding: "utf-8", timeout: 60_000 });
  const [y, m, d] = yesterday.split("-").map(Number);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const tag = `${String(d).padStart(2, "0")} ${months[m - 1]} ${y}`;
  rssYesterday = (xml.match(new RegExp(`<pubDate>[^<]*${tag}`, "g")) || []).length;
} catch {
  reasons.push("블로그 RSS 확인 실패");
}
out.rssYesterday = rssYesterday;

out.ok = reasons.length === 0;
out.reasons = reasons;
console.log(`아침 요약 ${today}`);
console.log(`- 골드박스: ${out.goldbox.matched.length ? out.goldbox.matched.join(", ") : "일치 0"} · 확인 필요 ${out.goldbox.review}`);
console.log(`- 네이버 수집: ${nvAccepted}건 접수 · 남은 ${nvLeft}${nvStop && nvStop !== "없음" ? ` · 중단: ${nvStop}` : ""}`);
console.log(`- 블로그: 오늘 ${blogRows.length}편 (${blogRows.map((r) => r.state).join("/") || "-"}) · 어제 게시 ${rssYesterday ?? "?"}편`);
console.log(out.ok ? "- 판단: 이상 없음" : `- Claude 확인 필요: ${reasons.join(" / ")}`);
console.log("SUMMARY " + JSON.stringify(out));
