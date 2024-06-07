import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import ResetPasswordForm from '@/components/forms/auth/reset-password'
import { Button } from '@/components/ui/button'
import { getUserById } from '@/data/user'
import { db } from '@/drizzle'
import { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'

interface Props {
  searchParams: { [key: string]: string | string[] | undefined }
}

export const metadata: Metadata = {
  title: 'Reset Password',
}

export default async function page({ searchParams }: Props) {
  if (!searchParams.token || !searchParams.userId) {
    redirect('/forgot-password')
  }

  const token = searchParams.token
  const userId = searchParams.userId
  const user = await getUserById(userId as string)
  const currentDateTime = new Date()

  if (
    !user ||
    user.resetPasswordToken !== token ||
    currentDateTime > user.resetPasswordTokenExpiry!
  ) {
    return (
      <MaxWidthWrapper className="mt-72">
        <div className="flex w-full flex-col items-center">
          <p className="mb-3 text-center text-7xl">❌</p>
          <h2 className="text-center text-2xl font-semibold">Expired Link</h2>
          <p className="text-center">
            Reset password link has expired or the token is invalid. <br />
            Click the link below to send new one.
          </p>
          <Link href={'/forgot-password'}>
            <Button variant="link" className="text-sky-500">
              Reset Password
            </Button>
          </Link>
        </div>
      </MaxWidthWrapper>
    )
  }

  return (
    <div>
      <ResetPasswordForm userId={userId as string} />
    </div>
  )
}
