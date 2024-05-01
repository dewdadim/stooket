'use client'

import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import * as React from 'react'
import { ProfileCard } from '@/components/profile/profile-card'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import { ProfileProducts } from '@/components/profile/profile-products'
import { cn } from '@/lib/utils'
import { useSearchParams } from 'next/navigation'
import { User } from 'next-auth'

interface ProfileProps {
  profile: {
    id: string
    name: string | null
    username: string | null
    email: string
    phoneNumber: string | null
    password: string | null
    emailVerified: Date | null
    image: string | null
    institute: string | null
    isSeller: boolean | null
    register_at: Date | null
  }
  user: User
  products: {
    id: string
    username: string
    description: string | null
    title: string | null
    category: string | null
    price: number | null
    thumbnail: string | null
    status: 'listed' | 'unlisted' | 'sold' | null
    post_at: Date | null
    update_at: Date | null
  }[]
  className?: string
}

function Profile({ profile, user, products, className }: ProfileProps) {
  const searchParams = useSearchParams()
  const tab = searchParams.get('tab')

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
                  !tab ? 'border-b-2 border-primary font-medium' : '',
                )}
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                href={`/${profile.username}?tab=wishlists`}
                className={cn(
                  'px-4 py-2 hover:bg-accent',
                  tab?.match('wishlists')
                    ? 'border-b-2 border-primary font-medium'
                    : '',
                )}
              >
                Wishlists
              </Link>
            </li>
            <li>
              <Link
                href={`/${profile.username}?tab=ratings`}
                className={cn(
                  'px-4 py-2 hover:bg-accent',
                  tab?.match('ratings')
                    ? 'border-b-2 border-primary font-medium'
                    : '',
                )}
              >
                Ratings
              </Link>
            </li>
          </ul>
          <Separator className="w-full bg-primary" />
          <div>
            <ProfileProducts profile={profile} products={products} />
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  )
}

export default Profile
