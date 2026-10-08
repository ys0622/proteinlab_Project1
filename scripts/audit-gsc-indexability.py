"""Read a Search Console coverage export and check live indexability.

Usage: python scripts/audit-gsc-indexability.py COVERAGE.xlsx [LIMIT]
Requires openpyxl. This is a read-only diagnostic; inspect reported URLs
before treating a canonical override or noindex as a defect.
"""

from concurrent.futures import ThreadPoolExecutor, as_completed
from html.parser import HTMLParser
from pathlib import Path
import sys
from urllib.error import HTTPError, URLError
from urllib.parse import quote, urlsplit, urlunsplit
from urllib.request import Request, urlopen

import openpyxl


class MetadataParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.canonical = None
        self.robots = None

    def handle_starttag(self, tag, attrs):
        values = dict(attrs)
        if tag == "link" and values.get("rel", "").lower() == "canonical":
            self.canonical = values.get("href")
        if tag == "meta" and values.get("name", "").lower() == "robots":
            self.robots = values.get("content")


def inspect(url):
    parts = urlsplit(url)
    encoded_url = urlunsplit((parts.scheme, parts.netloc, quote(parts.path, safe="/%"), parts.query, parts.fragment))
    request = Request(encoded_url, headers={"User-Agent": "Googlebot"})
    try:
        with urlopen(request, timeout=20) as response:
            status = response.status
            headers = response.headers
            final_url = response.url
            body = response.read(2_000_000).decode("utf-8", errors="replace")
    except (HTTPError, URLError, TimeoutError) as error:
        return url, [f"request failed: {error}"]
    parser = MetadataParser()
    parser.feed(body)
    issues = []
    if status != 200:
        issues.append(f"HTTP {status}")
    if final_url.rstrip("/") != encoded_url.rstrip("/"):
        issues.append(f"redirect to {final_url}")
    if parser.canonical and parser.canonical.rstrip("/") != url.rstrip("/"):
        issues.append(f"canonical {parser.canonical}")
    if not parser.canonical:
        issues.append("missing canonical")
    robots = " ".join(filter(None, [parser.robots, headers.get("X-Robots-Tag")])).lower()
    if "noindex" in robots:
        issues.append(f"noindex ({robots})")
    if not body.strip():
        issues.append("empty HTML")
    return url, issues


def main():
    source = Path(sys.argv[1])
    limit = int(sys.argv[2]) if len(sys.argv) > 2 else 100
    workbook = openpyxl.load_workbook(source, read_only=True, data_only=True)
    sheet = workbook["테이블"]
    urls = [
        row[0] for row in list(sheet.values)[1:]
        if isinstance(row[0], str)
        and row[0].startswith("https://proteinlab.kr/")
    ]
    urls.sort(key=lambda url: (0 if "/guides/" in url else 1 if "/compare/" in url else 2, url))
    urls = urls[:limit]
    failures = []
    with ThreadPoolExecutor(max_workers=4) as executor:
        for future in as_completed(executor.submit(inspect, url) for url in urls):
            url, issues = future.result()
            if issues:
                failures.append((url, issues))
    print(f"checked={len(urls)} anomalies={len(failures)}")
    for url, issues in sorted(failures):
        print(url, "|", "; ".join(issues))


if __name__ == "__main__":
    main()
