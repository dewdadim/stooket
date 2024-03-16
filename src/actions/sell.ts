"use server"

import * as z from "zod"
import { v4 as uuidv4 } from "uuid"

import { db } from "@/lib/db"
import { SellSchema } from "@/schemas"
import { products } from "@/lib/db/schema"
import { currentUser } from "@/lib/auth"

export const sell = async (values: z.infer<typeof SellSchema>) => {
  const validatedFields = SellSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: "Invalid fields!" }
  }

  const id = uuidv4()
  const { title, category, price, description } = validatedFields.data
  const user = await currentUser()

  await db.insert(products).values({
    id: id,
    username: user?.username!,
    description: description,
    name: title,
    price: price,
  })

  return { success: "Product created!" }
}
