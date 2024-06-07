'use server'

import * as z from 'zod'

import { db } from '@/drizzle'
import { ChangePasswordSchema } from '@/schemas'
import { users } from '@/drizzle/schema'
import { currentUser } from '@/lib/auth'
import bcrypt from 'bcryptjs'
import { getUserById } from '@/data/user'
import { eq } from 'drizzle-orm'

export const resetPassword = async (
  values: z.infer<typeof ChangePasswordSchema>,
  userId: string,
) => {
  const validatedFields = ChangePasswordSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' }
  }
  const { newPassword } = validatedFields.data

  const user = await getUserById(userId)
  const hashedNewPassword = await bcrypt.hash(newPassword!, 10)

  if (!user) {
    return { error: 'User not found!' }
  }

  if (!user.resetPasswordTokenExpiry) {
    return { error: 'Token expired!' }
  }

  const currentDateTime = new Date()

  if (currentDateTime > user.resetPasswordTokenExpiry) {
    return { error: 'Token expired!' }
  }

  await db
    .update(users)
    .set({
      password: hashedNewPassword,
      resetPasswordToken: null,
      resetPasswordTokenExpiry: null,
    })
    .where(eq(users.id, user?.id!))

  return { success: 'Password successfully changed!' }
}
