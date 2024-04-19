import LoginForm from '@/components/forms/auth/login-form'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Login',
  description: 'It is a pleasure to see you here! Login your account',
}

export default function page() {
  return (
    <div>
      <LoginForm />
    </div>
  )
}
