import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    host: 'https://proteinlab.kr',
    sitemap: 'https://proteinlab.kr/sitemap.xml',
  }
}
