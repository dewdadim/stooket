import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { ProductCard } from '@/components/product-card'
import Fuse from 'fuse.js'
import { currentUser } from '@/lib/auth'
import getAllProducts from '@/lib/getAllProducts'

type Props = {
  params: { username: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function Product({ params, searchParams }: Props) {
  const user = await currentUser()
  const username = user?.username
  const category = searchParams['category'] as string
  const search = searchParams['search'] as string
  const param = { category, username }

  const productsData: Promise<ProductList[]> = getAllProducts(param)
  const products = await productsData

  const fuse = new Fuse(products, {
    keys: ['title', 'description'],
    includeScore: true,
    threshold: 0.6,
    minMatchCharLength: 3,
    isCaseSensitive: false,
  })

  const results = fuse.search(search ?? '')

  return (
    <MaxWidthWrapper className="mt-16">
      <div className="mt-4 grid grid-cols-2 gap-1 lg:grid-cols-4">
        {results.length > 0
          ? results.map(({ item }) => (
              <ProductCard
                key={item?.id}
                id={item?.id!}
                thumbnailUrl={item?.thumbnail!}
                title={item?.title!}
                price={item?.price?.toFixed(2)!}
                username={item?.seller.username!}
                avatar={item?.seller.image!}
              />
            ))
          : products.map((item) => (
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
    </MaxWidthWrapper>
  )
}
