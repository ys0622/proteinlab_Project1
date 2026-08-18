import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

const ROOT = process.cwd();
const APP_DIR = path.join(ROOT, "app");

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await walk(target));
    else if (entry.isFile()) files.push(target);
  }

  return files;
}

function toRoute(file) {
  const relative = path.relative(APP_DIR, path.dirname(file)).split(path.sep);
  if (relative[0] === "api") return null;
  const route = relative.length === 0 || relative[0] === "" ? "/" : `/${relative.join("/")}`;
  return route.replace(/\/index$/, "") || "/";
}

function toRoutePattern(route) {
  const escaped = route
    .replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    .replace(/\\\[\.\.\.([^\]]+)\\\]/g, ".+")
    .replace(/\\\[([^\]]+)\\\]/g, "[^/]+");
  return new RegExp(`^${escaped}/?$`);
}

function normalizeHref(href) {
  return href.split(/[?#]/, 1)[0] || "/";
}

const files = await walk(APP_DIR);
const pageFiles = files.filter((file) => path.basename(file) === "page.tsx");
const sourceFiles = files.filter((file) => /\.(?:ts|tsx)$/.test(file));
const routes = pageFiles.map(toRoute).filter(Boolean);
const routePatterns = routes.map(toRoutePattern);
const nextConfig = await readFile(path.join(ROOT, "next.config.ts"), "utf8");
const redirects = new Set([...nextConfig.matchAll(/source:\s*["']([^"']+)["']/g)].map((match) => match[1]));
const hrefPattern = /\bhref\s*(?::|=)\s*["'](\/[^"'#?][^"']*)["']/g;
const records = [];

for (const file of sourceFiles) {
  const content = await readFile(file, "utf8");
  for (const match of content.matchAll(hrefPattern)) {
    const href = match[1];
    if (!href || href.startsWith("/api/")) continue;
    const route = normalizeHref(href);
    const valid = routePatterns.some((pattern) => pattern.test(route));
    records.push({
      source: path.relative(ROOT, file).replaceAll("\\", "/"),
      href,
      route,
      status: valid ? "VALID" : redirects.has(route) ? "REDIRECT" : "BROKEN",
    });
  }
}

const broken = records.filter((record) => record.status === "BROKEN");
const redirectLinks = records.filter((record) => record.status === "REDIRECT");
const result = {
  routeCount: routes.length,
  literalInternalLinkCount: records.length,
  validLinkCount: records.filter((record) => record.status === "VALID").length,
  redirectLinkCount: redirectLinks.length,
  brokenLinkCount: broken.length,
  broken,
};

console.log(JSON.stringify(result, null, 2));
if (broken.length > 0) process.exitCode = 1;
