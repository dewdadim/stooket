import { CategoryCard } from '@/components/CategoryCard'
import { Header } from '@/components/Header'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { ProductCard } from '@/components/ProductCard'
import { db } from '@/lib/db'
import { users } from '@/lib/db/schema'

export default async function Home() {
  const usersData = await db
    .select({
      id: users.id,
      username: users.name,
    })
    .from(users)

  return (
    <>
      <MaxWidthWrapper>
        <Header className="mt-24" />
        <h1 className="text-2xl font-bold mt-12">Find the category</h1>
        <div className="flex gap-4 mt-4 overflow-auto">
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
        <h1 className="text-2xl font-bold mt-12">Recommended for you</h1>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-1 mt-4">
          {usersData.map((user) => (
            <ProductCard
              key={user.id}
              id="3"
              thumbnailUrl="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
              title="Best Product Everrr"
              price="13.20"
              username={user.username!}
              avatar="https://github.com/dewdadim.png"
            />
          ))}
        </div>
      </MaxWidthWrapper>
    </>
  )
}
