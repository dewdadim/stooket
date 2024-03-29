import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { getProductById } from '@/data/product'
import { db } from '@/lib/db'
import { productImages, products } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'
import { notFound } from 'next/navigation'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { CardWrapper } from '@/components/forms/card-wrapper'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { getUserByUsername } from '@/data/user'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { AspectRatio } from '@/components/ui/aspect-ratio'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { currentUser } from '@/lib/auth'

export default async function ProductDetails({
  params,
}: {
  params: { productId: string }
}) {
  const id = params.productId
  const product = await getProductById(id)
  const seller = await getUserByUsername(product?.username!)
  const productImg = await db
    .select()
    .from(productImages)
    .where(eq(productImages.productId, product?.id!))
  const user = await currentUser()

  if (!product) return notFound()

  return (
    <MaxWidthWrapper className="mt-16">
      <Breadcrumb className="mt-20">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={'/'}>Categoryss</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={'/product/' + product.id}>
              {product.title}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Carousel
        opts={{
          align: 'start',
          loop: false,
          dragFree: false,
        }}
        className="mt-4"
      >
        <CarouselContent>
          {productImg.map((productImg) => (
            <CarouselItem
              key={productImg.url}
              className={cn('md:basis-1/2 lg:basis-1/3')}
            >
              <AspectRatio ratio={3 / 2}>
                <Image
                  src={productImg.url}
                  alt="Product's image"
                  fill
                  className="rounded-md object-cover"
                />
              </AspectRatio>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden lg:flex" />
        <CarouselNext className="hidden lg:flex" />
      </Carousel>
      <div className="mt-4 flex flex-wrap gap-8 lg:flex-nowrap">
        <section className="w-fit flex-auto space-y-4">
          <h1 className="text-2xl font-semibold">{product.title}</h1>
          <h1 className="text-2xl">RM{product.price?.toFixed(2)}</h1>
          <h2 className="pt-16 text-xl font-semibold">Description</h2>
          <p>{product.description}</p>
        </section>
        <section className="fixed inset-x-0 bottom-0 w-full flex-none shadow-2xl md:static md:shadow-none lg:static lg:w-auto">
          <CardWrapper className="w-full lg:w-[400px]">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="size-12 rounded-sm">
                  <AvatarImage src={seller?.image!} alt="Profile" />
                  <AvatarFallback className="size-8 rounded-sm bg-secondary">
                    IMG
                  </AvatarFallback>
                </Avatar>
                <span className="flex flex-wrap gap-2">
                  <p className="font-semibold">{seller?.name}</p>
                  <p className="">@{seller?.username}</p>
                </span>
              </div>
              <div>
                <Link href={user ? '/buy' : '/login'}>
                  <Button type="submit" className="w-full">
                    Buy Item
                  </Button>
                </Link>
              </div>
            </div>
          </CardWrapper>
        </section>
      </div>
    </MaxWidthWrapper>
  )
}
