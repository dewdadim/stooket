'use server'

import { db } from '@/drizzle'
import { users } from '@/drizzle/schema'
import { currentUser } from '@/lib/auth'
import { getUserById } from '@/data/user'
import { eq } from 'drizzle-orm'
import { deleteFiles } from '@/server/uploadthing'

export const changeImage = async (imageUrl: string) => {
  const user = await currentUser()
  const userData = await getUserById(user?.id!)
  const UUID = userData?.image?.split('/').slice(-1)[0]
  await deleteFiles(UUID!)

  await db
    .update(users)
    .set({
      image: imageUrl,
    })
    .where(eq(users.id, userData?.id!))

  return
}
