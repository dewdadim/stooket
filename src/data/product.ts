import { db } from '@/drizzle'
import { products } from '@/drizzle/schema'
import { eq } from 'drizzle-orm'

export async function getProductById(productId: string) {
  const product = await db.query.products.findFirst({
    where: eq(products.id, productId),
  })

  return product
}
