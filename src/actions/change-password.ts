'use server'

import * as z from 'zod'

import { db } from '@/drizzle'
import { ChangePasswordSchema } from '@/schemas'
import { users } from '@/drizzle/schema'
import { currentUser } from '@/lib/auth'
import bcrypt from 'bcryptjs'
import { getUserById } from '@/data/user'
import { eq } from 'drizzle-orm'

export const changePassword = async (
  values: z.infer<typeof ChangePasswordSchema>,
) => {
  const validatedFields = ChangePasswordSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' }
  }
  const { currentPassword, newPassword } = validatedFields.data
  const user = await currentUser()
  const userData = await getUserById(user?.id!)
  const hashedNewPassword = await bcrypt.hash(newPassword!, 10)

  const passwordMatch = await bcrypt.compare(
    currentPassword!,
    userData?.password!,
  )

  if (!passwordMatch) return { error: 'Wrong current password!' }

  await db
    .update(users)
    .set({
      password: hashedNewPassword,
    })
    .where(eq(users.id, userData?.id!))

  return { success: 'Password successfully changed!' }
}
