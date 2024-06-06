import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { ProductList } from '@/components/ProductList'
import { SortFilterProduct } from '@/components/SortFilterProduct'
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { currentUser } from '@/lib/auth'
import getAllProductsByCategory from '@/lib/getAllProductsByCategory'
import { shuffle } from '@/utils/shuffle'

type Props = {
  params: { category: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function Category({ params, searchParams }: Props) {
  const category = params.category
  const user = await currentUser()
  const username = user?.username

  const productsData: Promise<ProductList> = getAllProductsByCategory(
    username,
    category,
  )
  const products = await productsData
  const categoryParams = category?.replaceAll('%26', '&').replaceAll('%20', ' ')

  products.sort((i, j) => {
    if (i.id > j.id) {
      return 1
    }

    if (i.id < j.id) {
      return -1
    }

    return 0
  })

  return (
    <MaxWidthWrapper className="mt-16">
      <Breadcrumb className="mt-20">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={'#'}>{categoryParams}</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h3 className="my-2 text-2xl font-medium">
        {products.length} results in {categoryParams}
      </h3>
      <SortFilterProduct />
      <ProductList isProfile products={products} />
    </MaxWidthWrapper>
  )
}
