'use server'

import { db } from '@/drizzle'
import { purchases } from '@/drizzle/schema'
import { eq } from 'drizzle-orm'

export const completePurchase = async (id: string) => {
  const purchase = await db.query.purchases.findFirst({
    where: eq(purchases.id, id),
  })
  const currentDate = new Date()

  if (purchase?.status?.match('to-confirm'))
    return { error: 'Seller need to confirm the purchase first!' }

  await db
    .update(purchases)
    .set({ status: 'completed', complete_at: currentDate })
    .where(eq(purchases.id, id))

  return { success: 'Complete purchase!' }
}

export const cancelPurchase = async (id: string) => {
  const currentDate = new Date()

  if (id.length < 1) return { error: 'Invalid purchase!' }

  await db
    .update(purchases)
    .set({ status: 'cancelled', cancel_at: currentDate })
    .where(eq(purchases.id, id))

  return { success: 'Purchase has been cancelled!' }
}

export const confirmPurchase = async (id: string) => {
  const currentDate = new Date()

  if (id.length < 1) return { error: 'Invalid purchase!' }

  await db
    .update(purchases)
    .set({ status: 'in-progress', cancel_at: currentDate })
    .where(eq(purchases.id, id))

  return { success: 'Purchase has been confirmed!' }
}
