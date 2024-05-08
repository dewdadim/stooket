import { db } from '@/drizzle'
import { products } from '@/drizzle/schema'
import { currentUser } from '@/lib/auth'
import { v4 as uuidv4 } from 'uuid'

export async function POST(request: Request) {
  const product: Product = await request.json()
  const { title, price, description, category, thumbnail } = product
  const user = await currentUser()
  const id = uuidv4()

  await db.insert(products).values({
    id: id,
    username: user?.username!,
    description: description,
    category: category,
    thumbnail: thumbnail,
    title: title,
    price: price ?? 0,
  })
}
