import NextAuth, { type DefaultSession } from 'next-auth'
import { JWT } from 'next-auth/jwt'

declare module 'next-auth' {
  interface User {
    id: string
    username: string
    isSeller: boolean
    institute: string
  }
  interface Session extends DefaultSession {
    user?: User
  }
}

declare module 'next-auth/jwt' {
  type JWT = {
    id: string
    username: string
    isSeller: boolean
    institute: string
  }
}
