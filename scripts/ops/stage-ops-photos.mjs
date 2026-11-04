/**
 * 운영실 '사진 넣을 제품' 표에서 Scott이 올린 사진·쿠파스 링크를 inbox/photos로 옮긴다(2026-11-04, 케어맵 운영실과 같은 방식).
 *
 * 순서(Claude가 한다)
 *   1. ArtifactData query photos (out_dir=<작업폴더>/db) — photo(asset id)나 link가 있는 줄을 받는다.
 *   2. 각 photo id를 Artifact read path=<asset id> (out_dir=<작업폴더>/assets)로 내려받는다.
 *   3. node scripts/ops/stage-ops-photos.mjs <작업폴더>
 *      → inbox/photos/<slug>.<확장자>, inbox/photos/links.txt("<slug> <링크>")
 *   4. node scripts/apply-photos.mjs --dry-run → 확인 후 실행 → 운영실 photos의 해당 줄 status를 done으로.
 */
import { copyFileSync, existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from "fs";
import { extname, join, resolve } from "path";

const work = resolve(process.argv[2] ?? "");
if (!process.argv[2] || !existsSync(work)) {
  console.error("사용법: node scripts/ops/stage-ops-photos.mjs <작업폴더(db/, assets/ 포함)>");
  process.exit(1);
}
const root = resolve(import.meta.dirname, "../..");
const inbox = join(root, "inbox/photos");
mkdirSync(inbox, { recursive: true });

function walk(dir) {
  if (!existsSync(dir)) return [];
  return readdirSync(dir, { withFileTypes: true }).flatMap((e) => (e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)]));
}
const assetFiles = walk(join(work, "assets"));
const rows = walk(join(work, "db"))
  .filter((f) => f.endsWith(".json"))
  .map((f) => {
    const doc = JSON.parse(readFileSync(f, "utf-8"));
    return { id: doc.id, ...(doc.data ?? doc) };
  });

const links = [];
const problems = [];
let photos = 0;
for (const r of rows) {
  if (r.status === "done") continue;
  const slug = r.slug ?? r.id;
  if (r.photo) {
    const file = assetFiles.find((f) => f.includes(r.photo));
    if (!file) problems.push(`${slug}: 사진 ${r.photo}을 내려받지 않음`);
    else {
      copyFileSync(file, join(inbox, `${slug}${extname(file).toLowerCase() || ".png"}`));
      photos++;
    }
  }
  if (r.link) links.push(`${slug} ${r.link}`);
}
if (links.length) {
  const path = join(inbox, "links.txt");
  const prev = existsSync(path) ? readFileSync(path, "utf-8").trimEnd() + "\n" : "";
  writeFileSync(path, prev + links.join("\n") + "\n", "utf-8");
}
console.log(`사진 ${photos}개 · 링크 ${links.length}개 → ${inbox}`);
if (problems.length) console.log(`확인 필요:\n  ${problems.join("\n  ")}`);
