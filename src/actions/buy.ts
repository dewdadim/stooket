'use server'

import * as z from 'zod'
import { createId } from '@paralleldrive/cuid2'

import { db } from '@/lib/db'
import { BuySchema } from '@/schemas'
import { purchases } from '@/lib/db/schema'
import { currentUser } from '@/lib/auth'
import { getProductById } from '@/data/product'

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

  return { success: 'Order successfully requested!' }
}
