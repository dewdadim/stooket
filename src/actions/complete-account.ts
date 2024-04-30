'use server'

import * as z from 'zod'
import bcrypt from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid'

import { db } from '@/drizzle'
import { RegisterSchema } from '@/schemas'
import { getUserByEmail, getUserByUsername } from '@/data/user'
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

  //check existing user
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
