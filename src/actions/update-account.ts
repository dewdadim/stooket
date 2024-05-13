'use server'

import * as z from 'zod'

import { db } from '@/drizzle'
import { AccountSettingsSchema } from '@/schemas'
import { users } from '@/drizzle/schema'
import { currentUser } from '@/lib/auth'
import { getUserById, getUserByUsername } from '@/data/user'
import { eq } from 'drizzle-orm'

export const updateAccount = async (
  values: z.infer<typeof AccountSettingsSchema>,
) => {
  const validatedFields = AccountSettingsSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' }
  }
  const { username, phoneNumber } = validatedFields.data
  const user = await currentUser()
  const userData = await getUserById(user?.id!)

  //check existing username
  if (!user?.username.match(username!)) {
    const existingUsername = await getUserByUsername(username!)

    if (existingUsername) {
      return { error: 'Username is not available!' }
    }
  }

  await db
    .update(users)
    .set({
      username: username,
      phoneNumber: phoneNumber,
    })
    .where(eq(users.id, userData?.id!))

  return { success: 'Update account successfully!' }
}
