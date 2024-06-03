import { notFound } from 'next/navigation'
import { getUserByUsername } from '@/data/user'
import * as React from 'react'
import { Metadata, ResolvingMetadata } from 'next'
import Profile from '@/components/profile/profile'
import { getProductsByUsername } from '@/data/product'
import { currentUser } from '@/lib/auth'

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

export default async function page({ params }: Props) {
  const username = params.username
  const profile = await getUserByUsername(username)
  const products = await getProductsByUsername(profile?.username!)
  const user = await currentUser()
  products.sort((i, j) => {
    if (i.status! > j.status!) {
      return 1
    }

    if (i.status! < j.status!) {
      return -1
    }

    return 0
  })

  if (!profile) {
    notFound()
  }

  return <Profile profile={profile} user={user!} products={products} />
}
