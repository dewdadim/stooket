'use server'

import { db } from '@/drizzle'
import { products, users } from '@/drizzle/schema'
import { eq, and, ilike } from 'drizzle-orm'

export async function getProductById(productId: string) {
  const data = await db.query.products.findFirst({
    where: eq(products.id, productId),
  })

  return data
}

export async function getProductsByUsername(username: string) {
  const data = await db.query.products.findMany({
    where: eq(products.username, username),
  })

  return data
}
