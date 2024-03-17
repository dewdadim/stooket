import { CategoryList } from "@/components/CategoryList"
import { Header } from "@/components/Header"
import MaxWidthWrapper from "@/components/MaxWidthWrapper"
import { ProductCard } from "@/components/product-card"
import { db } from "@/lib/db"
import { products, users } from "@/lib/db/schema"
import { eq } from "drizzle-orm"

export default async function Home() {
  // const data = await db
  //   .select({
  //     id: products.id,
  //     userId: products.userId,
  //     username: users.username,
  //     avatar: users.image,
  //     title: products.name,
  //     price: products.price,
  //   })
  //   .from(products)
  //   .fullJoin(users, eq(products.userId, users.id))

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
              thumbnailUrl="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
              title={data.product?.name!}
              price={data.product?.price?.toString()!}
              username={data.product?.username!}
              avatar={data.user?.image!}
            />
          ))}
        </div>
      </MaxWidthWrapper>
    </>
  )
}
