import RegisterForm from '@/components/forms/auth/register-form'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Register',
  description:
    'Welcome to the #1 student marketplace in Malaysia! It is not too late to experience greatest business.',
}

export default function page() {
  return (
    <div>
      <RegisterForm />
    </div>
  )
}
