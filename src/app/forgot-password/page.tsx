import ForgotPasswordForm from '@/components/forms/auth/forgot-password-form'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Forgot Password',
}

export default function page() {
  return (
    <div>
      <ForgotPasswordForm />
    </div>
  )
}
