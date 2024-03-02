import { db } from '@/lib/db'

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.query.users.findFirst({ with: { email: email } })

    return user
  } catch {
    return null
  }
}

export const getUserById = async (id: string) => {
  try {
    const user = await db.query.users.findFirst({ with: { id: id } })

    return user
  } catch {
    return null
  }
}
