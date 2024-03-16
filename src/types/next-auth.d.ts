import NextAuth, { type DefaultSession } from "next-auth"

declare module "next-auth" {
  interface User {
    id: string
    username: string
    isSeller: boolean
  }
  interface Session extends DefaultSession {
    user?: User
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    username: string
    isSeller: boolean
  }
}
