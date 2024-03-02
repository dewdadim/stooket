import { db } from '@/lib/db'

export const getAccountByUserId = async (userId: string) => {
  try {
    const account = await db.query.accounts.findFirst({
      with: { userId: userId },
    })

    return account
  } catch {
    return null
  }
}
