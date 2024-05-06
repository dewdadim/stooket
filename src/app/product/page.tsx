import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { ProductCard } from '@/components/product-card'
import { db } from '@/drizzle'
import { products, users } from '@/drizzle/schema'
import { currentUser } from '@/lib/auth'
import getAllProducts from '@/lib/getAllProducts'
import { eq, ilike, and } from 'drizzle-orm'

type Props = {
  params: { username: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function Product({ params, searchParams }: Props) {
  const user = await currentUser()
  const username = user?.username
  const category = searchParams['category'] as string
  const param = { category, username }

  const productsData: Promise<ProductList[]> = getAllProducts(param)
  const products = await productsData

  return (
    <MaxWidthWrapper className="mt-16">
      <div className="mt-4 grid grid-cols-2 gap-1 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard
            key={product?.id}
            id={product?.id!}
            thumbnailUrl={product?.thumbnail!}
            title={product?.title!}
            price={product?.price?.toFixed(2)!}
            username={product?.seller.username!}
            avatar={product?.seller.image!}
          />
        ))}
      </div>
    </MaxWidthWrapper>
  )
}
