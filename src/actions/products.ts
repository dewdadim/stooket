'use server'

import { getPurchasesByProductId } from '@/data/purchase'
import { db } from '@/drizzle'
import { productImages, products, purchases } from '@/drizzle/schema'
import { deleteFiles } from '@/server/uploadthing'
import { eq } from 'drizzle-orm'

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

export const updatePurchase = async (id: string) => {
  const currentDate = new Date()

  if (id.length < 1) return { error: 'Invalid purchase!' }

  await db
    .update(purchases)
    .set({ status: 'in-progress', cancel_at: currentDate })
    .where(eq(purchases.id, id))

  return { success: 'Purchase has been confirmed!' }
}
