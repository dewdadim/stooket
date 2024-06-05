import { CategoryList } from '@/components/CategoryList'
import { Header } from '@/components/Header'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { ProductList } from '@/components/ProductList'
import { currentUser } from '@/lib/auth'
import getAllProducts from '@/lib/getAllProducts'

export default async function Home() {
  const user = await currentUser()
  const productsData: Promise<ProductList> = getAllProducts(user?.username)
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

  return (
    <>
      <MaxWidthWrapper>
        <Header className="mt-24" />
        <div className="mt-12 text-2xl font-bold">Find the category</div>
        <CategoryList />
        <div className="mt-12 text-2xl font-bold">Recommended for you</div>
        <ProductList
          isProfile
          products={products}
          className="mt-4 grid grid-cols-2 gap-1 lg:grid-cols-4"
        />
      </MaxWidthWrapper>
    </>
  )
}
