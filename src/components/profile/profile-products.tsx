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
  products: Product[]
  className?: string
}

export function ProfileProducts({ products, className }: ProfileProductsProps) {
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
