import { db } from '@/lib/db'
import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const product = await db.query.products.findMany()

  const productEntries: MetadataRoute.Sitemap = product.map(({ id }) => ({
    url: `https://www.stooket.com/product/${id}`,
  }))

  return [
    {
      url: 'https://www.stooket.com',
      priority: 1,
    },
    {
      url: 'https://www.stooket.com/register',
      priority: 0.8,
    },
    {
      url: 'https://www.stooket.com/login',
      priority: 0.5,
    },
    ...productEntries,
  ]
}
