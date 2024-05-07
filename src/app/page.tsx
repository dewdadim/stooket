import { CategoryList } from '@/components/CategoryList'
import { Header } from '@/components/Header'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { ProductCard } from '@/components/product-card'
import { db } from '@/drizzle'
import { products, users } from '@/drizzle/schema'
import { currentUser } from '@/lib/auth'
import getAllProducts from '@/lib/getAllProducts'
import { eq } from 'drizzle-orm'

export default async function Home() {
  const user = await currentUser()
  const params = { username: user?.username }

  const productsData: Promise<ProductList[]> = getAllProducts(params)
  const products = await productsData

  return (
    <>
      <MaxWidthWrapper>
        <Header className="mt-24" />
        <div className="mt-12 text-2xl font-bold">Find the category</div>
        <CategoryList />
        <div className="mt-12 text-2xl font-bold">Recommended for you</div>
        <div className="mt-4 grid grid-cols-2 gap-1 lg:grid-cols-4">
          {products.map((data) => (
            <ProductCard
              key={data.id}
              id={data.id!}
              thumbnailUrl={data.thumbnail!}
              title={data.title!}
              price={data.price?.toFixed(2)!}
              username={data.seller.username!}
              avatar={data.seller.image!}
            />
          ))}
        </div>
      </MaxWidthWrapper>
    </>
  )
}
