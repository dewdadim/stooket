'use client'

import { signIn } from 'next-auth/react'
import { FcGoogle } from 'react-icons/fc'
import { ImFacebook2 } from 'react-icons/im'
import { useSearchParams } from 'next/navigation'

import { Button } from '@/components/ui/button'
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'

export function Social() {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl')

  const onClick = (provider: 'google' | 'facebook') => {
    signIn(provider, {
      callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    })
  }

  return (
    <div className="flex w-full items-center gap-x-2">
      <Button
        size="lg"
        className="flex w-full gap-2"
        variant="outline"
        onClick={() => onClick('google')}
      >
        <FcGoogle className="h-5 w-5" />
        <p>Google</p>
      </Button>
      <Button
        size="lg"
        className="flex w-full gap-2"
        variant="outline"
        onClick={() => onClick('facebook')}
      >
        <ImFacebook2 className="h-5 w-5" color="#4267B2" />
        <p>Facebook</p>
      </Button>
    </div>
  )
}
