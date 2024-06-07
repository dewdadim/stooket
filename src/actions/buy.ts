'use server'

import * as z from 'zod'
import { createId } from '@paralleldrive/cuid2'
import { Resend } from 'resend'
import { db } from '@/drizzle'
import { BuySchema } from '@/schemas'
import { purchases } from '@/drizzle/schema'
import { currentUser } from '@/lib/auth'
import { getProductById } from '@/data/product'
import { RequestPurchaseEmail } from '@/components/emails/request-purchase-email'
import { getUserByUsername } from '@/data/user'

export const buy = async (
  values: z.infer<typeof BuySchema>,
  productId: string,
) => {
  const validatedFields = BuySchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' }
  }

  const id = createId()
  const { phoneNumber, message, location } = validatedFields.data
  const user = await currentUser()
  const product = await getProductById(productId)
  const seller = await getUserByUsername(product?.username!)
  const resend = new Resend(process.env.RESEND_API_KEY)

  if (product?.status === 'sold' || product?.status === 'unlisted') {
    return { error: 'Product cannot be purchased!' }
  }

  await db.insert(purchases).values({
    id: id,
    buyer: user?.username!,
    seller: product?.username!,
    buyerPhoneNumber: phoneNumber,
    message: message,
    location: location,
    totalPrice: product?.price!, //need to total up the price if has any additional charges
    productId: productId,
  })

  await resend.emails.send({
    from: 'Stooket <notification@stooket.com>',
    to: seller?.email!,
    subject: `@${user?.username} request to purchase ${product?.title}`,
    react: RequestPurchaseEmail({
      seller: seller as User,
      product: product as Product,
      buyer: user as User,
      purchaseId: id,
    }),
  })

  return { success: 'Purchase successfully requested!' }
}
