import { AspectRatio } from '@/components/ui/aspect-ratio'
import { GraduationCap } from 'lucide-react'
import Image from 'next/image'
import { Separator } from '../ui/separator'
import { cn } from '@/lib/utils'
import { currentUser } from '@/lib/auth'
import { Button } from '../ui/button'
import Link from 'next/link'
import { getProductsByUsername } from '@/data/product'
import { ProductCard } from '../product-card'

interface ProfileProductsProps {
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

export function ProfileProducts({
  profile,
  products,
  className,
}: ProfileProductsProps) {
  if (products.length === 0)
    return (
      <div className="mt-8 w-full text-center text-lg">
        No products found...
      </div>
    )

  return (
    <div
      className={cn('mt-4 grid grid-cols-2 gap-1 lg:grid-cols-3', className)}
    >
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
  )
}
