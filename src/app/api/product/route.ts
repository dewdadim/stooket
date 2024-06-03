import { db } from '@/drizzle'
import { institutes, products, users } from '@/drizzle/schema'
import { NextRequest, NextResponse } from 'next/server'
import { eq, ilike, and, ne } from 'drizzle-orm'
import { currentUser } from '@/lib/auth'

export async function GET(req: NextRequest) {
  const username = req.nextUrl.searchParams.get('username')
  const dataSet = {
    id: products.id,
    title: products.title,
    description: products.description,
    category: products.category,
    price: products.price,
    thumbnail: products.thumbnail,
    post_at: products.post_at,
    status: products.status,
    seller: {
      username: users.username,
      image: users.image,
      institute: users.institute,
    },
  }

  if (username) {
    const data = await db
      .select(dataSet)
      .from(products)
      .innerJoin(users, eq(products.username, users.username))
      .where(and(eq(products.status, 'listed'), ne(users.username, username!)))

    return NextResponse.json(data)
  }

  const data = await db
    .select(dataSet)
    .from(products)
    .innerJoin(users, eq(products.username, users.username))
    .where(eq(products.status, 'listed'))

  return NextResponse.json(data)
}
