'use server'

import * as z from 'zod'

import { db } from '@/drizzle'
import { RegisterSchema } from '@/schemas'
import { getUserByUsername } from '@/data/user'
import { users } from '@/drizzle/schema'
import { eq } from 'drizzle-orm'
import { currentUser } from '@/lib/auth'

export const complete_account = async (
  values: z.infer<typeof RegisterSchema>,
) => {
  const validatedFields = RegisterSchema.safeParse(values)
  const user = await currentUser()

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' }
  }

  const { username, institute } = validatedFields.data

  //check existing username
  const existingUsername = await getUserByUsername(username!)

  if (existingUsername) {
    return { error: 'Username is not available!' }
  }

  await db
    .update(users)
    .set({ username: username, institute: institute })
    .where(eq(users.id, user?.id!))

  return { success: 'Account complete!' }
}
