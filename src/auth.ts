import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import FacebookProvider from 'next-auth/providers/facebook'
import 'dotenv/config'
import { DrizzleAdapter } from '@auth/drizzle-adapter'
import { db } from '@/drizzle'
import { Adapter } from 'next-auth/adapters'
import bcrypt from 'bcryptjs'
import { users } from './drizzle/schema'
import { eq } from 'drizzle-orm'

export const authOptions: NextAuthOptions = {
  adapter: DrizzleAdapter(db) as Adapter,
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
      async profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          username: profile.username ?? null,
          isSeller: profile.isSeller ?? false,
          institute: profile.institute ?? null,
        } as any
      },
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
      allowDangerousEmailAccountLinking: true,
      async profile(profile) {
        return {
          id: profile.id,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          username: profile.username ?? null,
          isSeller: profile.isSeller ?? false,
          institute: profile.institute ?? null,
        } as any
      },
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'john.doe@example.com',
        },
        password: { label: 'Password', type: 'password' },
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
          institute: user.institute,
        } as any
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session, profile }) {
      if (trigger === 'update' && session?.username) {
        token.username = session.username
      }

      if (trigger === 'update' && session?.institute) {
        token.institute = session.institute
      }

      if (trigger === 'update' && session?.name) {
        token.name = session.name
      }

      if (trigger === 'update' && session?.image) {
        token.image = session.image
      }

      const account = await db.query.users.findFirst({
        where: eq(users.email!, profile?.email!),
      })

      if (user) {
        token.id = user.id
        token.username = user.username ?? account?.username
        token.isSeller = user.isSeller ?? account?.isSeller
        token.institute = user.institute ?? account?.institute
        token.image = user.image ?? account?.image
        token.name = user.name ?? account?.name
      }
      return token
    },
    async session({ token, session }) {
      if (token && session.user) {
        session.user.id = token.id
        session.user.image = token.image
        session.user.username = token.username
        session.user.isSeller = token.isSeller
        session.user.institute = token.institute
        session.user.name = token.name
      }
      return session
    },
  },
}
