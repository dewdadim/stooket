import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { getProductsByUsername } from '@/data/product'
import { notFound } from 'next/navigation'
import { getUserByUsername } from '@/data/user'
import { currentUser } from '@/lib/auth'
import * as React from 'react'
import { Metadata, ResolvingMetadata } from 'next'
import { ProfileCard } from '@/components/profile/profile-card'
import { Separator } from '@/components/ui/separator'
import Link from 'next/link'
import { ProductCard } from '@/components/product-card'
import { ProfileProducts } from '@/components/profile/profile-products'

type Props = {
  params: { username: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // read route params
  const username = params.username

  return {
    title: `${username}'s profile`,
  }
}

export default async function Profile({ params }: Props) {
  const username = params.username
  const profile = await getUserByUsername(username)
  const products = await getProductsByUsername(params.username)
  const user = await currentUser()

  if (!profile) return notFound()
  return (
    <MaxWidthWrapper className="mt-16">
      <div className="mt-24 flex flex-wrap gap-8">
        <ProfileCard profile={profile} className="grid flex-none" />
        <div className="flex w-96 grow flex-col gap-2">
          <ul className="flex flex-row gap-6">
            <li>
              <Link href={'/' + profile.username} className="font-medium">
                Products
              </Link>
            </li>
            <li>
              <Link href={'/wishlist/' + profile.username}>Wishlists</Link>
            </li>
          </ul>
          <Separator className="w-full bg-primary" />
          <div>
            <ProfileProducts profile={profile} />
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  )
}
