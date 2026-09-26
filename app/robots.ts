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
    ],
    host: 'https://proteinlab.kr',
    sitemap: 'https://proteinlab.kr/sitemap.xml',
  }
}
