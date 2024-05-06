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

export default async function Wishlist({ params }: Props) {
  const username = params.username
  const profile = await getUserByUsername(username)
  const products = await getProductsByUsername(params.username)
  const user = await currentUser()

  if (!profile) return notFound()
  return (
    <MaxWidthWrapper className="mt-16 lg:mt-24">
      <div className="flex flex-wrap gap-8">
        <ProfileCard profile={profile} className="grid flex-none" />
        <div className="flex w-96 grow flex-col gap-2">
          <ul className="flex flex-row gap-6">
            <li>
              <Link href={'/' + profile.username} className="font-light">
                Products
              </Link>
            </li>
            <li>
              <Link
                href={'/wishlist/' + profile.username}
                className="font-medium"
              >
                Wishlists
              </Link>
            </li>
          </ul>
          <Separator className="w-full bg-primary" />
          <div>
            <div className="mt-4 grid grid-cols-2 gap-1 lg:grid-cols-3">
              {products?.map((product) => (
                <ProductCard
                  key={product?.id}
                  id={product?.id!}
                  thumbnailUrl={product?.thumbnail!}
                  title={product?.title!}
                  price={product?.price?.toFixed(2)!}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  )
}
