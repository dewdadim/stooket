import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/private/', '/buy/'],
    },
    sitemap: 'https://stooket.com/sitemap.xml',
  }
}
