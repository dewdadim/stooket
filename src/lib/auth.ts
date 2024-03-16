import { authOptions } from "@/auth"
import { getServerSession } from "next-auth"
import { getSession } from "next-auth/react"

export const currentUser = async () => {
  const session = await getServerSession(authOptions)

  return session?.user
}
