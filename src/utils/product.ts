'use server'

import { db } from '@/drizzle'
import { products } from '@/drizzle/schema'
import { eq } from 'drizzle-orm'

type ProductStatus = {
  status: 'listed' | 'unlisted' | 'sold'
}

export async function updateProductStatusById(
  productId: string,
  { status }: ProductStatus,
) {
  await db
    .update(products)
    .set({ status: status })
    .where(eq(products.id, productId))
}

export async function updateProductStatusByUser(
  username: string,
  { status }: ProductStatus,
) {
  await db
    .update(products)
    .set({ status: status })
    .where(eq(products.username, username))
}
