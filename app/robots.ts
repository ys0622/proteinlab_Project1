import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // 제휴 리다이렉트(/api/out/coupang), 추적·조회수 API, 관리자 화면은 크롤링할 이유가 없다.
        disallow: ['/api/', '/admin/'],
      },
      // 구글 AdsBot은 '*' 규칙을 따르지 않아 따로 적어야 한다. 크롤링 통계에서 JSON(/api/reviews 등)이 31%였다(2026-10-23).
      {
        userAgent: ['AdsBot-Google', 'AdsBot-Google-Mobile'],
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
    ],
    host: 'https://proteinlab.kr',
    sitemap: 'https://proteinlab.kr/sitemap.xml',
  }
}
