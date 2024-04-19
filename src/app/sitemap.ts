import { db } from '@/lib/db'
import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const product = await db.query.products.findMany()

  const productEntries: MetadataRoute.Sitemap = product.map(({ id }) => ({
    url: `https://stooket.com/product/${id}`,
  }))

  return [
    {
      url: 'https://stooket.com',
      priority: 1,
    },
    {
      url: 'https://stooket.com/register',
      priority: 0.8,
    },
    {
      url: 'https://stooket.com/login',
      priority: 0.5,
    },
    ...productEntries,
  ]
}
