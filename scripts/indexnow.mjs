/**
 * IndexNow 제출: 라이브 sitemap.xml 의 URL을 Bing·Naver·Yandex 등 IndexNow 참여 검색엔진에 알린다.
 * (Google은 IndexNow를 지원하지 않는다.) ChatGPT 검색은 Bing 색인을 참고한다.
 *
 * 사용법: node scripts/indexnow.mjs [--dry-run] [경로 ...]   (경로를 주면 그 URL만 제출)
 */
const HOST = "proteinlab.kr";
const KEY = "b1417e4dc3ef9b9bad8fecc866737f2a";
const dryRun = process.argv.includes("--dry-run");
const paths = process.argv.slice(2).filter((a) => !a.startsWith("--"));

let urls;
if (paths.length) {
  urls = paths.map((p) => `https://${HOST}${p.startsWith("/") ? p : "/" + p}`);
} else {
  const xml = await (await fetch(`https://${HOST}/sitemap.xml`)).text();
  urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}
console.log(`제출 대상 ${urls.length}개`);
if (dryRun) {
  console.log("[dry-run] 제출하지 않음");
} else {
const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "content-type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList: urls }),
});
console.log("응답:", res.status, res.statusText);
}
