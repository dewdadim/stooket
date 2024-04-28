import { db } from '@/drizzle'
import { productImages, products } from '@/drizzle/schema'
import { eq } from 'drizzle-orm'
import { NextRequest, NextResponse } from 'next/server'
import { deleteFiles } from '@/server/uploadthing'

export async function DELETE(
  req: NextRequest,
  { params }: { params: { productId: string } },
) {
  const images = await db
    .select()
    .from(productImages)
    .where(eq(productImages.productId, params.productId))
  await db.delete(products).where(eq(products.id, params.productId))
  images.map((image) => {
    deleteFiles(image.url.split('/').slice(-1)[0])
  })

  return NextResponse.json({ message: 'delete success!' })
}
