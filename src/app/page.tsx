import { CategoryList } from '@/components/CategoryList'
import { Header } from '@/components/Header'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { ProductCard } from '@/components/product-card'
import { db } from '@/lib/db'
import { products, users } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

export default async function Home() {
  const data = await db
    .select()
    .from(products)
    .innerJoin(users, eq(products.username, users.username))

  return (
    <>
      <MaxWidthWrapper>
        <Header className="mt-24" />
        <h1 className="mt-12 text-2xl font-bold">Find the category</h1>
        <CategoryList />
        <h1 className="mt-12 text-2xl font-bold">Recommended for you</h1>
        <div className="mt-4 grid grid-cols-2 gap-1 lg:grid-cols-4">
          {data.map((data) => (
            <ProductCard
              key={data.product?.id}
              id={data.product?.id!}
              thumbnailUrl={data.product?.thumbnail!}
              title={data.product?.title!}
              price={data.product?.price?.toFixed(2)!}
              username={data.product?.username!}
              avatar={data.user?.image!}
            />
          ))}
        </div>
      </MaxWidthWrapper>
    </>
  )
}
