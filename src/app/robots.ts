import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/private/', '/buy/', 'settings'],
    },
    sitemap: 'https://www.stooket.com/sitemap.xml',
  }
}
