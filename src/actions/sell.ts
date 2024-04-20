'use server'

import * as z from 'zod'
import { v4 as uuidv4 } from 'uuid'

import { db } from '@/lib/db'
import { SellSchema } from '@/schemas'
import { products, productImages as productImagesDB } from '@/lib/db/schema'
import { currentUser } from '@/lib/auth'

export const sell = async (values: z.infer<typeof SellSchema>) => {
  const validatedFields = SellSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' }
  }

  const id = uuidv4()
  const { title, category, thumbnail, price, description, productImages } =
    validatedFields.data
  const user = await currentUser()

  await db.insert(products).values({
    id: id,
    username: user?.username!,
    description: description,
    category: category,
    thumbnail: thumbnail,
    title: title,
    price: price,
  })

  for (let i = 0; i < productImages.length; i++) {
    await db.insert(productImagesDB).values({
      url: productImages[i].url,
      productId: id,
    })
  }

  return { success: 'Product created!' }
}
