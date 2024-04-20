import { db } from '@/lib/db'
import { purchases } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

export async function getPurchaseById(id: string) {
  const purchase = await db.query.products.findFirst({
    where: eq(purchases.id, id),
  })

  return purchase
}

export async function getPurchaseByBuyer(buyer: string) {
  const purchase = await db.query.products.findFirst({
    where: eq(purchases.buyer, buyer),
  })

  return purchase
}
