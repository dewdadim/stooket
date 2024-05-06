import { db } from '@/drizzle'
import { products, users } from '@/drizzle/schema'
import { NextRequest, NextResponse } from 'next/server'
import { eq, ilike, and } from 'drizzle-orm'

export async function GET(req: NextRequest) {
  const search = req.nextUrl.searchParams.get('search')
  const category = req.nextUrl.searchParams.get('category')

  if (category) {
    const data = await db
      .select({
        id: products.id,
        title: products.title,
        price: products.price,
        thumbnail: products.thumbnail,
        seller: { username: users.username, image: users.image },
      })
      .from(products)
      .innerJoin(users, eq(products.username, users.username))
      .where(
        and(eq(products.category, category), eq(products.status, 'listed')),
      )

    return NextResponse.json(data)
  }

  if (search) {
    const data = await db
      .select({
        id: products.id,
        title: products.title,
        price: products.price,
        thumbnail: products.thumbnail,
        seller: { username: users.username, image: users.image },
      })
      .from(products)
      .innerJoin(users, eq(products.username, users.username))
      .where(
        and(
          ilike(products.title, `%${search}%`),
          eq(products.status, 'listed'),
        ),
      )

    return NextResponse.json(data)
  }

  const data = await db
    .select({
      id: products.id,
      title: products.title,
      price: products.price,
      thumbnail: products.thumbnail,
      seller: { username: users.username, image: users.image },
    })
    .from(products)
    .innerJoin(users, eq(products.username, users.username))
    .where(eq(products.status, 'listed'))

  return NextResponse.json(data)
}
