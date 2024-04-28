'use server'

import * as z from 'zod'
import bcrypt from 'bcryptjs'
import { v4 as uuidv4 } from 'uuid'

import { db } from '@/drizzle'
import { RegisterSchema } from '@/schemas'
import { getUserByEmail, getUserByUsername } from '@/data/user'
import { users } from '@/drizzle/schema'

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' }
  }

  const id = uuidv4()
  const { email, password, name, username } = validatedFields.data
  const hashedPassword = await bcrypt.hash(password, 10)

  //check existing user
  const existingEmail = await getUserByEmail(email)
  const existingUsername = await getUserByUsername(username)

  if (existingEmail) {
    return { error: 'Email already in use!' }
  }

  if (existingUsername) {
    return { error: 'Username is not available!' }
  }

  await db.insert(users).values({
    id: id,
    username: username,
    name: name,
    email: email,
    password: hashedPassword,
    image: '/avatar/default.jpg',
  })

  return { success: 'User created!' }
}
