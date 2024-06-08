'use server'

import { db } from '@/drizzle'
import { purchases } from '@/drizzle/schema'
import { CancelPurchaseSchema } from '@/schemas'
import { eq } from 'drizzle-orm'
import { z } from 'zod'
import { Resend } from 'resend'
import { getPurchaseById } from '@/data/purchase'
import { getUserByUsername } from '@/data/user'
import { ConfirmPurchaseEmail } from '@/components/emails/confirm-purchase-email'
import { SellerCancelPurchaseEmail } from '@/components/emails/seller-cancel-purchase-email'
import { getProductById } from '@/data/product'

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

export const cancelPurchase = async (
  values: z.infer<typeof CancelPurchaseSchema>,
) => {
  const currentDate = new Date()
  const validatedFields = CancelPurchaseSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid purchase!' }
  }

  const { reason, by, id } = validatedFields.data
  const resend = new Resend(process.env.RESEND_API_KEY)
  const purchase = await getPurchaseById(id)
  const buyer = await getUserByUsername(purchase?.buyer!)
  const seller = await getUserByUsername(purchase?.seller!)
  const product = await getProductById(purchase?.productId!)

  await db
    .update(purchases)
    .set({
      status: 'cancelled',
      cancel_at: currentDate,
      cancel: { reason: reason, by: by, at: currentDate },
    })
    .where(eq(purchases.id, id))

  if (by === 'seller') {
    await resend.emails.send({
      from: 'Stooket <notification@stooket.com>',
      to: buyer?.email!,
      subject: `Seller cancelled your purchase request (${purchase?.id.toUpperCase()})`,
      react: SellerCancelPurchaseEmail({
        product: product as Product,
        buyer: buyer as User,
        reason: reason,
        purchaseId: id,
      }),
    })
  } else {
    await resend.emails.send({
      from: 'Stooket <notification@stooket.com>',
      to: seller?.email!,
      subject: `@${buyer?.username} has cancelled a purchase (${purchase?.id.toUpperCase()})`,
      react: SellerCancelPurchaseEmail({
        product: product as Product,
        buyer: buyer as User,
        reason: reason,
        purchaseId: id,
      }),
    })
  }

  return { success: 'Purchase has been cancelled!' }
}

export const confirmPurchase = async (id: string) => {
  const currentDate = new Date()

  if (id.length < 1) return { error: 'Invalid purchase!' }

  const resend = new Resend(process.env.RESEND_API_KEY)
  const purchase = await getPurchaseById(id)
  const seller = await getUserByUsername(purchase?.seller!)
  const buyer = await getUserByUsername(purchase?.buyer!)
  const product = await getProductById(purchase?.productId!)

  await db
    .update(purchases)
    .set({ status: 'in-progress', cancel_at: currentDate })
    .where(eq(purchases.id, id))

  await resend.emails.send({
    from: 'Stooket <notification@stooket.com>',
    to: buyer?.email!,
    subject: `Your purchase request ${purchase?.id.toUpperCase()} has been confirmed by Seller`,
    react: ConfirmPurchaseEmail({
      seller: seller as User,
      product: product as Product,
      buyer: buyer as User,
      purchaseId: id,
    }),
  })

  return { success: 'Purchase has been confirmed!' }
}
