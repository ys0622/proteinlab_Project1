// robots.txt를 직접 쓴다. 다음(카카오) 웹마스터도구가 소유 확인 줄(#DaumWebMasterTool)을 맨 위 주석으로 요구하는데,
// Next.js MetadataRoute.Robots로는 주석 줄을 넣을 수 없어서 2026-11-09 app/robots.ts에서 옮겼다. 규칙은 그때와 같다.
// - 제휴 리다이렉트(/api/out/coupang), 추적·조회수 API, 관리자 화면은 크롤링할 이유가 없다.
// - 구글 AdsBot은 '*' 규칙을 따르지 않아 따로 적어야 한다. 크롤링 통계에서 JSON(/api/reviews 등)이 31%였다(2026-10-23).
const BODY = `#DaumWebMasterTool:3b2ff1b178605a24979ac56f1e5d4cca8ac86945ded2f0e9c032270bd16dcfb1:fjbPToQo9CIdABBLcO2OJw==
User-Agent: *
Allow: /
Disallow: /api/
Disallow: /admin/

User-Agent: AdsBot-Google
User-Agent: AdsBot-Google-Mobile
Allow: /
Disallow: /api/
Disallow: /admin/

Host: https://proteinlab.kr
Sitemap: https://proteinlab.kr/sitemap.xml
`;

export const dynamic = "force-static";

export function GET() {
  return new Response(BODY, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
