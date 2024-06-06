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
import { shuffle } from '@/utils/shuffle'
import { ArrowUpRight, ExternalLink } from 'lucide-react'
import Link from 'next/link'

export default async function Home() {
  const user = await currentUser()
  const productsData: Promise<ProductList> = getAllProducts(user?.username)
  const products = await productsData
  let products_pekan
  let products_gambang

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
        <div className="mt-28 md:mb-12">
          <h3 className="mb-6 text-2xl font-bold">
            Frequently Asked Question (FAQ)
          </h3>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>What is Stooket?</AccordionTrigger>
              <AccordionContent>
                Stooket is an online marketplace that is only targeted for the
                university/college ecosystem. Stooket is mainly focused on
                buy/sell activity in the campus area. This will open the
                opportunity for students to start their small business or just
                selling their pre-loved.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                Who can become seller in Stooket?
              </AccordionTrigger>
              <AccordionContent>
                Stooket only giving permission to sell to student for now...
                Maybe more in future?
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>
                Who can buy product in Stooket?
              </AccordionTrigger>
              <AccordionContent>
                Everyone have ability to buy! You just need to be in the campus
                to find your wanted stuff.
                <Link href={'/register'} className="text-sky-500">
                  {' '}
                  Register Now
                </Link>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>
                How purchasing product in Stooket works?
              </AccordionTrigger>
              <AccordionContent>
                You have to be registered with Stooket. Find and purchase
                product you wanted, then contact the seller to meet-up or
                negotiate. Payments only happen between you and seller. We
                recommended you to Cash on Delivery (COD) to prevent scammer.
                Beware of Scammer!
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </MaxWidthWrapper>
    </>
  )
}
