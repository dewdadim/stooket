import { Header } from '@/components/Header'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { ProductCard } from '@/components/ProductCard'
import { ToastDemo } from '@/components/ToasterDemo'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import { Button } from '@/components/ui/button'
import { db } from '@/lib/db'
import { user } from '@/lib/db/schema'
import Image from 'next/image'

export default async function Home() {
  const users = await db.select().from(user)

  const createUser = async () => {
    'use server'

    await db
      .insert(user)
      .values({ username: 'hello', fullname: 'hello', phone: '123' })
  }

  return (
    <>
      <MaxWidthWrapper>
        <Header />
        <h1 className="text-2xl font-bold mt-8">Recommended for you</h1>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-1 mt-4">
          <ProductCard
            id="1"
            thumbnailUrl="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
            title="Best Product Everrr - Best in town (HURRYYYYY!!!)"
            price="13.20"
            username="nadimhairi"
            avatar="https://github.com/dewdadim.png"
          />
          <ProductCard
            id="2"
            thumbnailUrl="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
            title="Best Product Everrr"
            price="13.20"
            username="nadimhairi"
            avatar="https://github.com/dewdadim.png"
          />
          <ProductCard
            id="3"
            thumbnailUrl="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
            title="Best Product Everrr"
            price="13.20"
            username="nadimhairi"
            avatar="https://github.com/dewdadim.png"
          />
          <ProductCard
            id="4"
            thumbnailUrl="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
            title="Best Product Everrr - Best in town (HURRYYYYY!!!) Never find this offer anywhere elseee goo buy noww"
            price="13.20"
            username="nadimhairi"
            avatar="https://github.com/dewdadim.png"
          />
          <ProductCard
            id="5"
            thumbnailUrl="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
            title="Best Product Everrr"
            price="13.20"
            username="nadimhairi"
            avatar="https://github.com/dewdadim.png"
          />
        </div>
      </MaxWidthWrapper>
    </>
  )
}
