'use client'

import { cn } from '@/lib/utils'
import { ProductCard } from './product-card'
import { useSearchParams } from 'next/navigation'

interface ProductListProps {
  products: ProductList
  isProfile: boolean
  className?: string
}

export function ProductList({
  products,
  isProfile,
  className,
}: ProductListProps) {
  const searchParams = useSearchParams()
  const sortSearchParams = searchParams.get('sort')
  const instituteSearchParams = searchParams.get('institute')
  let results = products

  if (sortSearchParams) {
    results = products.sort((i, j) => {
      if (sortSearchParams.match('lowPrice')) {
        if (i.price! > j.price!) {
          return 1
        }

        if (i.price! < j.price!) {
          return -1
        }
      }

      if (sortSearchParams.match('highPrice')) {
        if (i.price! < j.price!) {
          return 1
        }

        if (i.price! > j.price!) {
          return -1
        }
      }

      if (sortSearchParams.match('oldest')) {
        if (i.post_at! > j.post_at!) {
          return 1
        }

        if (i.post_at! < j.post_at!) {
          return -1
        }
      }

      if (sortSearchParams.match('recent')) {
        if (i.post_at! < j.post_at!) {
          return 1
        }

        if (i.post_at! > j.post_at!) {
          return -1
        }
      }

      if (sortSearchParams.match('oldest')) {
        if (i.post_at! > j.post_at!) {
          return 1
        }

        if (i.post_at! < j.post_at!) {
          return -1
        }
      }
      return 0
    })
  }

  if (instituteSearchParams) {
    results = products.filter((item) => {
      if (instituteSearchParams.match('all')) {
        return item
      }
      return item.seller.institute
        ?.toLowerCase()
        .includes(instituteSearchParams.toLowerCase())
    })
  }

  return (
    <>
      {results.length > 0 ? (
        <div
          className={cn(
            'mt-4 grid grid-cols-2 gap-1 lg:grid-cols-4',
            className,
          )}
        >
          {results?.map((item) => (
            <ProductCard
              isProfile={isProfile}
              key={item?.id}
              id={item?.id!}
              status={item.status!}
              thumbnailUrl={item?.thumbnail!}
              title={item?.title!}
              price={item?.price?.toFixed(2)!}
              username={item?.seller.username!}
              avatar={item?.seller.image!}
            />
          ))}
        </div>
      ) : (
        <div className="mt-24 flex w-full flex-col items-center">
          {/* <Image
            src="/emptylist.png"
            width={200}
            height={200}
            alt="empty list"
          /> */}
          <p className="mb-3 text-center text-7xl">🤔</p>
          <p className="text-center text-2xl font-semibold">
            No product found...
          </p>
        </div>
      )}
    </>
  )
}
