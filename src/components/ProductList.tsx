import { cn } from '@/lib/utils'
import { ProductCard } from './product-card'
import Image from 'next/image'

interface ProductListProps {
  products: ProductList
  className?: string
}

export function ProductList({ products, className }: ProductListProps) {
  return (
    <>
      {products.length > 0 ? (
        <div
          className={cn(
            'mt-4 grid grid-cols-2 gap-1 lg:grid-cols-4',
            className,
          )}
        >
          {products.map((item) => (
            <ProductCard
              key={item?.id}
              id={item?.id!}
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
          <Image
            src="/emptylist.png"
            width={200}
            height={200}
            alt="empty list"
          />
          <p className="text-center text-xl">
            This seems weird? No items founded...
          </p>
        </div>
      )}
    </>
  )
}
