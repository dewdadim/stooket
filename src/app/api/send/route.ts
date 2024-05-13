import { EmailTemplate } from '@/components/email-template'
import { Resend } from 'resend'
import 'dotenv/config'

const resend = new Resend(process.env.RESEND_API_KEY!)

export async function GET() {
  try {
    const data = await resend.emails.send({
      from: 'Stooket <info@stooket.com>',
      to: 'dewdadim@gmail.com',
      subject: 'Test Email from Stooket',
      html: '<h1>Welcome Nadim from Stooket!</h1>',
    })

    return Response.json(data)
  } catch (error) {
    return Response.json({ error })
  }
}
