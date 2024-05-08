import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { ProductList } from '@/components/ProductList'
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { currentUser } from '@/lib/auth'
import getAllProductsByCategory from '@/lib/getAllProductsByCategory'

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
        {products.length} search results for {categoryParams}'
      </h3>
      <ProductList products={products} />
    </MaxWidthWrapper>
  )
}
