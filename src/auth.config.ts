import CredentialsProvider from "next-auth/providers/credentials"
import { db } from "@/lib/db"
import bcrypt from "bcryptjs"
import { users } from "@/lib/db/schema"
import { eq } from "drizzle-orm"

export default {
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
          email: user.email,
          image: user.image,
        } as any
      },
    }),
  ],
}
