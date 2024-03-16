import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db"
import { products, test } from "@/lib/db/schema"
import { NextResponse } from "next/server"
import { v4 as uuidv4 } from "uuid"

type Product = {
  id: string
  userId: string
  title: string
  price: number
  description?: string
  category: string
}

export async function POST(request: Request) {
  const product: Product = await request.json()
  console.log("data: ", product)

  const { title, price, description, category } = product
  const user = await currentUser()
  const id = uuidv4()

  console.log("data: ", id, title, description, price)

  return NextResponse.json({ title, price, description, category })
}
