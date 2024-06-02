'use client'

import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import * as React from 'react'
import { ProfileCard } from '@/components/profile/profile-card'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import { ProfileProducts } from '@/components/profile/profile-products'
import { cn } from '@/lib/utils'
import { useSearchParams } from 'next/navigation'
import { User as CurrentUser } from 'next-auth'

interface ProfileProps {
  profile: User
  user: CurrentUser
  products: ProductList
  className?: string
}

function Profile({ profile, user, products, className }: ProfileProps) {
  const searchParams = useSearchParams()
  const tab = searchParams.get('tab')

  if (!user?.username || user.username !== profile.username) {
    products = products.filter((e) => {
      return !e.status?.includes('unlisted')
    })
  }

  return (
    <MaxWidthWrapper className={cn('mt-16 lg:mt-24', className)}>
      <div className=" flex flex-wrap gap-8">
        <ProfileCard profile={profile} user={user} className="grid flex-none" />
        <div className="flex w-96 grow flex-col gap-2">
          <ul className="flex flex-row gap-1">
            <li>
              <Link
                href={`/${profile.username}`}
                className={cn(
                  'px-4 py-2 hover:bg-accent',
                  !tab ? 'border-b-4 border-primary font-medium' : '',
                )}
              >
                Products
              </Link>
            </li>
          </ul>
          <Separator className="w-full bg-primary" />
          <div>
            <ProfileProducts products={products} />
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  )
}

export default Profile
