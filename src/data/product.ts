'use server'

import { db } from '@/drizzle'
import { products, users } from '@/drizzle/schema'
import { eq, and, ilike } from 'drizzle-orm'

const dataSet = {
  id: products.id,
  title: products.title,
  description: products.description,
  category: products.category,
  price: products.price,
  thumbnail: products.thumbnail,
  post_at: products.post_at,
  status: products.status,
  seller: {
    username: users.username,
    image: users.image,
    institute: users.institute,
  },
}

export async function getProductById(productId: string) {
  const data = await db.query.products.findFirst({
    where: eq(products.id, productId),
  })

  return data
}

export async function getProductsByUsername(username: string) {
  const data = await db
    .select(dataSet)
    .from(products)
    .innerJoin(users, eq(products.username, users.username))
    .where(eq(products.username, username))

  return data
}
