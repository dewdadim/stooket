import { CategoryCard } from "@/components/category-icon"
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

  const data = await db.select().from(products)

  return (
    <>
      <MaxWidthWrapper>
        <Header className="mt-24" />
        <h1 className="mt-12 text-2xl font-bold">Find the category</h1>
        <div className="mt-4 flex gap-4 overflow-auto">
          <CategoryCard
            icon="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
            title="Free Items"
          />
          <CategoryCard
            icon="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
            title="Foods & Drinks"
          />
          <CategoryCard
            icon="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
            title="Services"
          />
          <CategoryCard
            icon="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
            title="Tech & Gadgets"
          />
          <CategoryCard
            icon="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
            title="Hobby"
          />
        </div>
        <h1 className="mt-12 text-2xl font-bold">Recommended for you</h1>
        <div className="mt-4 grid grid-cols-2 gap-1 lg:grid-cols-4">
          {data.map((data) => (
            <ProductCard
              key={data.id}
              id={data.id!}
              thumbnailUrl="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
              title={data.name!}
              price={data.price?.toString()!}
              username={data.username!}
              avatar={data.name!}
            />
          ))}
        </div>
      </MaxWidthWrapper>
    </>
  )
}
