import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { ProductCard } from '@/components/product-card'
import Fuse from 'fuse.js'
import { currentUser } from '@/lib/auth'
import getAllProducts from '@/lib/getAllProducts'
import { ProductList } from '@/components/ProductList'
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { SortFilterProduct } from '@/components/SortFilterProduct'

type Props = {
  params: { username: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function Product({ params, searchParams }: Props) {
  const user = await currentUser()
  const username = user?.username ?? ''
  const search = searchParams['search'] as string
  const sortSearchParams = searchParams['sort'] as string
  const instituteSearchParams = searchParams['institute'] as string

  const productsData: Promise<ProductList> = getAllProducts(username)
  const products = await productsData

  products.sort((i, j) => {
    if (i.id > j.id) {
      return 1
    }

    if (i.id < j.id) {
      return -1
    }

    return 0
  })

  const fuse = new Fuse(products, {
    keys: ['title', 'category', 'description'],
    includeScore: true,
    threshold: 0.5,
    minMatchCharLength: 3,
    isCaseSensitive: false,
  })

  let results = fuse.search(search ?? '')

  if (sortSearchParams) {
    results = results.sort((i, j) => {
      if (sortSearchParams.match('lowPrice')) {
        if (i.item.price! > j.item.price!) {
          return 1
        }

        if (i.item.price! < j.item.price!) {
          return -1
        }
      }

      if (sortSearchParams.match('highPrice')) {
        if (i.item.price! < j.item.price!) {
          return 1
        }

        if (i.item.price! > j.item.price!) {
          return -1
        }
      }

      if (sortSearchParams.match('oldest')) {
        if (i.item.post_at! > j.item.post_at!) {
          return 1
        }

        if (i.item.post_at! < j.item.post_at!) {
          return -1
        }
      }

      if (sortSearchParams.match('recent')) {
        if (i.item.post_at! < j.item.post_at!) {
          return 1
        }

        if (i.item.post_at! > j.item.post_at!) {
          return -1
        }
      }

      if (sortSearchParams.match('oldest')) {
        if (i.item.post_at! > j.item.post_at!) {
          return 1
        }

        if (i.item.post_at! < j.item.post_at!) {
          return -1
        }
      }
      return 0
    })
  }

  if (instituteSearchParams) {
    results = results.filter((item) => {
      if (instituteSearchParams.match('all')) {
        return item
      }
      return item.item.seller.institute
        ?.toLowerCase()
        .includes(instituteSearchParams.toLowerCase())
    })
  }

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
      <SortFilterProduct />
      {search ? (
        results.length !== 0 ? (
          <div className="mt-4 grid grid-cols-2 gap-1 lg:grid-cols-4">
            {results.map(({ item }) => (
              <ProductCard
                isProfile
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
            {/* <Image
              src="/emptylist.png"
              width={200}
              height={200}
              alt="empty list"
            /> */}
            <p className="mb-3 text-center text-7xl">🤔</p>
            <p className="text-center text-2xl font-semibold">
              No product found...
            </p>
          </div>
        )
      ) : (
        <ProductList
          isProfile
          products={products}
          className="mt-4 grid grid-cols-2 gap-1 lg:grid-cols-4"
        />
      )}
    </MaxWidthWrapper>
  )
}
