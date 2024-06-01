'use server'

import { getPurchasesByProductId } from '@/data/purchase'
import { db } from '@/drizzle'
import { productImages, products } from '@/drizzle/schema'
import { EditProductSchema, SellSchema } from '@/schemas'
import { deleteFiles } from '@/server/uploadthing'
import { eq } from 'drizzle-orm'
import { z } from 'zod'

export const deleteProduct = async (id: string) => {
  const pendingPurchase = await (
    await getPurchasesByProductId(id)
  ).filter((dt) => dt.status === 'in-progress' || dt.status === 'to-confirm')

  if (id.length < 1) return { error: 'Invalid product!' }

  const images = await db
    .select()
    .from(productImages)
    .where(eq(productImages.productId, id))

  if (pendingPurchase.length) {
    return {
      error: 'Product cannot be deleted! Pending purchases',
    }
  }

  try {
    await db.delete(products).where(eq(products.id, id))

    images.map((image) => {
      deleteFiles(image.url.split('/').slice(-1)[0])
    })
  } catch (e) {
    console.error(e)
    return {
      error: 'Something went wrong',
    }
  }

  return { success: 'Product has been deleted!' }
}

export const editProduct = async (
  values: z.infer<typeof EditProductSchema>,
  id: string,
) => {
  const currentDate = new Date()
  const validatedFields = EditProductSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' }
  }

  const { title, category, price, description } = validatedFields.data

  await db
    .update(products)
    .set({
      title: title,
      category: category,
      description: description,
      update_at: currentDate,
      price: price,
    })
    .where(eq(products.id, id))

  return { success: 'Product has been edited!' }
}
