"use server"

import { getServerSession } from "next-auth"

async function getSession() {
  const session = await getServerSession()

  return {
    name: session?.user.name,
    username: session?.user.username,
    email: session?.user.email,
    avatar: session?.user.image,
  }
}

export const session = await getSession()

export const avatar = session.avatar
