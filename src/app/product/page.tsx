import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { ProductCard } from '@/components/product-card'
import Fuse from 'fuse.js'
import { currentUser } from '@/lib/auth'
import getAllProducts from '@/lib/getAllProducts'
import { ProductList } from '@/components/ProductList'
import Image from 'next/image'
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

type Props = {
  params: { username: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function Product({ params, searchParams }: Props) {
  const user = await currentUser()
  const username = user?.username ?? ''
  const search = searchParams['search'] as string

  const productsData: Promise<ProductList> = getAllProducts(username)
  const products = await productsData

  const fuse = new Fuse(products, {
    keys: ['title', 'category', 'description'],
    includeScore: true,
    threshold: 0.5,
    minMatchCharLength: 3,
    isCaseSensitive: false,
  })

  const results = fuse.search(search)

  return (
    <MaxWidthWrapper>
      <Breadcrumb className="mt-20">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={'#'}>
              Search results for &apos;{search}&apos;
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h3 className="my-2 text-2xl font-medium">
        {results.length} search results for &apos;{search}&apos;
      </h3>
      {search ? (
        results.length !== 0 ? (
          <div className="mt-4 grid grid-cols-2 gap-1 lg:grid-cols-4">
            {results.map(({ item }) => (
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
        ) : (
          <div className="mt-24 flex w-full flex-col items-center">
            <Image
              src="/emptylist.png"
              width={200}
              height={200}
              alt="empty list"
            />
            <p className="text-center text-xl">
              This seems weird? No items founded...
            </p>
          </div>
        )
      ) : (
        <ProductList
          products={products}
          className="mt-4 grid grid-cols-2 gap-1 lg:grid-cols-4"
        />
      )}
    </MaxWidthWrapper>
  )
}
