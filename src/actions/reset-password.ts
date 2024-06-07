'use server'

import { LoginSchema } from '@/schemas'
import * as z from 'zod'
import { getUserByEmail } from '@/data/user'
import crypto from 'crypto'
import { db } from '@/drizzle'
import { users } from '@/drizzle/schema'
import { eq } from 'drizzle-orm'
import { Resend } from 'resend'
import { ResetPasswordEmail } from '@/components/emails/reset-password-email'
import 'dotenv/config'

export const resetPassword = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'Invalid fields!' }
  }

  const { email } = validatedFields.data
  const user = await getUserByEmail(email!)

  if (!user) {
    return { error: 'Account does not exist' }
  }

  const resetPasswordToken = crypto.randomBytes(32).toString('base64url')
  const today = new Date()
  const expiryDate = new Date(today.setTime(today.getHours() + 5))
  const resend = new Resend(process.env.RESEND_API_KEY!)

  await db
    .update(users)
    .set({
      resetPasswordToken: resetPasswordToken,
      resetPasswordTokenExpiry: expiryDate,
    })
    .where(eq(users.id, user.id))

  await resend.emails.send({
    from: 'Stooket <noreply@stooket.com>',
    to: user.email,
    subject: 'Reset your password',
    react: ResetPasswordEmail({
      userFirstname: user.name!,
      resetPasswordToken: resetPasswordToken,
    }),
  })

  return { success: 'Email has been sent!', email: user.email }
}
