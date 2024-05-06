import { db } from '@/drizzle'
import { institutes, products, users } from '@/drizzle/schema'
import { NextRequest, NextResponse } from 'next/server'
import { eq, ilike, and, ne } from 'drizzle-orm'

export async function GET(req: NextRequest) {
  const username = req.nextUrl.searchParams.get('username')
  const category = req.nextUrl.searchParams.get('category')
  const dataSet = {
    id: products.id,
    title: products.title,
    price: products.price,
    thumbnail: products.thumbnail,
    seller: {
      username: users.username,
      image: users.image,
      institute: users.institute,
    },
  }

  if (category) {
    const data = await db
      .select(dataSet)
      .from(products)
      .innerJoin(users, eq(products.username, users.username))
      .where(
        and(
          eq(products.category, category),
          eq(products.status, 'listed'),
          ne(users.username, username!),
        ),
      )

    return NextResponse.json(data)
  }

  const data = await db
    .select(dataSet)
    .from(products)
    .innerJoin(users, eq(products.username, users.username))
    .where(and(eq(products.status, 'listed'), ne(users.username, username!)))

  return NextResponse.json(data)
}
