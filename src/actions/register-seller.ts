'use server'

import { db } from '@/drizzle'
import { users } from '@/drizzle/schema'
import { currentUser } from '@/lib/auth'
import { RegisterSellerSchema } from '@/schemas'
import { eq } from 'drizzle-orm'
import { z } from 'zod'

export const registerSeller = async (
  values: z.infer<typeof RegisterSellerSchema>,
) => {
  const validatedFields = RegisterSellerSchema.safeParse(values)
  const user = await currentUser()

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' }
  }

  const { phoneNumber, studentCard } = validatedFields.data

  await db
    .update(users)
    .set({
      phoneNumber: phoneNumber,
      studentCard: studentCard,
      isSeller: true,
    })
    .where(eq(users.id, user?.id!))

  return { success: 'You are now a seller!' }
}
