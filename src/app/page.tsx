import { CategoryList } from '@/components/CategoryList'
import { Header } from '@/components/Header'
import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { ProductList } from '@/components/ProductList'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { currentUser } from '@/lib/auth'
import getAllProducts from '@/lib/getAllProducts'
import { ArrowUpRight, ExternalLink } from 'lucide-react'
import Link from 'next/link'

export default async function Home() {
  const user = await currentUser()
  const productsData: Promise<ProductList> = getAllProducts(user?.username)
  const products = await productsData
  let products_pekan
  let products_gambang

  function shuffle(array: ProductList) {
    let currentIndex = array.length

    // While there remain elements to shuffle...
    while (currentIndex != 0) {
      // Pick a remaining element...
      let randomIndex = Math.floor(Math.random() * currentIndex)
      currentIndex--

      // And swap it with the current element.
      ;[array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ]
    }
  }

  products_pekan = products.filter((item) => {
    return item.seller.institute?.toLowerCase().includes('pekan')
  })

  products_gambang = products.filter((item) => {
    return item.seller.institute?.toLowerCase().includes('gambang')
  })

  shuffle(products)
  shuffle(products_pekan)
  shuffle(products_gambang)

  return (
    <>
      <MaxWidthWrapper>
        <Header className="mt-24" />
        <div className="mt-12 text-2xl font-bold">Find the category</div>
        <CategoryList />
        <div className="mt-12">
          <div className="flex justify-between">
            <h3 className="text-2xl font-bold">Recommended for you</h3>
            <Link
              href={'/product'}
              className="flex items-center gap-1 text-sm text-sky-500"
            >
              See More
              <ArrowUpRight size={16} />
            </Link>
          </div>
          <ProductList
            isProfile
            limit={8}
            products={products}
            className="mt-4 grid grid-cols-2 gap-1 lg:grid-cols-4"
          />
          <Link href={'/product'} className="mt-10 flex w-full justify-center">
            <Button
              variant="outline"
              className="flex items-center gap-1 text-sm"
            >
              See More <ArrowUpRight size={16} />
            </Button>
          </Link>
        </div>
        {/* {products_gambang.length ? (
          <div className="mt-12">
            <div className="flex justify-between">
              <h3 className="text-2xl font-bold">UMPSA Pekan</h3>
              <Link
                href={
                  '/product?institute=Universiti+Malaysia+Pahang+Al-Sultan+Abdullah+%28Pekan%29'
                }
                className="flex items-center gap-1 text-sm text-sky-500"
              >
                See More
                <ArrowUpRight size={16} />
              </Link>
            </div>
            <ProductList
              isProfile
              limit={4}
              products={products_pekan}
              className="mt-4 grid grid-cols-2 gap-1 lg:grid-cols-4"
            />
          </div>
        ) : null}
        {products_gambang.length ? (
          <div className="mt-12">
            <div className="flex justify-between">
              <h3 className="text-2xl font-bold">UMPSA Gambang</h3>
              <Link
                href={
                  '/product?institute=Universiti+Malaysia+Pahang+Al-Sultan+Abdullah+%28Gambang%29'
                }
                className="flex items-center gap-1 text-sm text-sky-500"
              >
                See More
                <ArrowUpRight size={16} />
              </Link>
            </div>
            <ProductList
              isProfile
              limit={4}
              products={products_gambang}
              className="mt-4 grid grid-cols-2 gap-1 lg:grid-cols-4"
            />
          </div>
        ) : null} */}
        <div className="mb-12 mt-28">
          <h3 className="mb-4 text-2xl font-bold">
            Frequently Ask Question (FAQ)
          </h3>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Is it accessible?</AccordionTrigger>
              <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Is it styled?</AccordionTrigger>
              <AccordionContent>
                Yes. It comes with default styles that matches the other
                components&apos; aesthetic.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Is it animated?</AccordionTrigger>
              <AccordionContent>
                Yes. It&apos;s animated by default, but you can disable it if
                you prefer.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </MaxWidthWrapper>
    </>
  )
}
