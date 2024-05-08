import { cn } from '@/lib/utils'
import { ProductList } from '../ProductList'

interface ProfileProductsProps {
  products: ProductList
  className?: string
}

export function ProfileProducts({ products, className }: ProfileProductsProps) {
  return (
    <ProductList
      products={products}
      className={cn('mt-4 grid grid-cols-2 gap-1 lg:grid-cols-3', className)}
    />
  )
}
