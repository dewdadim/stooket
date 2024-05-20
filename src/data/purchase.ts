import { db } from '@/drizzle'
import { purchases } from '@/drizzle/schema'
import { eq } from 'drizzle-orm'

export async function getPurchaseById(id: string) {
  const purchase = await db.query.purchases.findFirst({
    where: eq(purchases.id, id),
  })

  return purchase
}

export async function getPurchaseByBuyer(buyer: string) {
  const purchase = await db.query.purchases.findFirst({
    where: eq(purchases.buyer, buyer),
  })

  return purchase
}

export async function getPurchasesByProductId(id: string) {
  const purchase = await db.query.purchases.findMany({
    where: eq(purchases.productId, id),
  })

  return purchase
}
