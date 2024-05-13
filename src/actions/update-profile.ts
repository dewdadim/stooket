'use server'

import * as z from 'zod'

import { db } from '@/drizzle'
import { ProfileSettingsSchema } from '@/schemas'
import { users } from '@/drizzle/schema'
import { currentUser } from '@/lib/auth'
import { getUserById } from '@/data/user'
import { eq } from 'drizzle-orm'

export const updateProfile = async (
  values: z.infer<typeof ProfileSettingsSchema>,
) => {
  const validatedFields = ProfileSettingsSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' }
  }
  const { name, institute } = validatedFields.data
  const user = await currentUser()
  const userData = await getUserById(user?.id!)

  await db
    .update(users)
    .set({
      name: name,
      institute: institute,
    })
    .where(eq(users.id, userData?.id!))

  return { success: 'Update profile successful!' }
}
