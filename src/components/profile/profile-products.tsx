import { cn } from '@/lib/utils'
import { ProductList } from '../ProductList'
import { ProductCard } from '../product-card'

interface ProfileProductsProps {
  products: ProductList
  className?: string
}

export function ProfileProducts({ products, className }: ProfileProductsProps) {
  if (!products.length) {
    return (
      <div className="mt-24 flex w-full flex-col items-center">
        <p className="mb-3 text-center text-5xl">🤔</p>
        <p className="text-center text-2xl font-semibold">
          No product found...
        </p>
      </div>
    )
  }

  return (
    <div
      className={cn('mt-4 grid grid-cols-2 gap-1 lg:grid-cols-3', className)}
    >
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id!}
          status={product.status!}
          isProfile={false}
          title={product.title!}
          price={product.price?.toFixed(2)!}
          avatar={product.seller.image!}
          thumbnailUrl={product.thumbnail!}
        />
      ))}
    </div>
  )
}
