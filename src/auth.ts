import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import "dotenv/config"
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import { db } from "@/lib/db"
import { Adapter } from "next-auth/adapters"
import bcrypt from "bcryptjs"
import { users } from "./lib/db/schema"
import { eq } from "drizzle-orm"

export const authOptions: NextAuthOptions = {
  adapter: DrizzleAdapter(db) as Adapter,
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "john.doe@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await db.query.users.findFirst({
          where: eq(users.email, credentials.email),
        })

        if (!user) return null

        const passwordMatch = await bcrypt.compare(
          credentials.password,
          user.password!,
        )

        if (!passwordMatch) return null

        return {
          id: user.id,
          name: user.name,
          username: user.username,
          isSeller: user.isSeller,
          email: user.email,
          image: user.image,
        } as any
      },
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      if (token && session.user) {
        session.user.id = token.id
        session.user.username = token.username
        session.user.isSeller = token.isSeller
      }
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.username = user.username
        token.isSeller = user.isSeller
      }
      return token
    },
  },
}