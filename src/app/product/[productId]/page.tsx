import MaxWidthWrapper from "@/components/MaxWidthWrapper"
import { getProductById } from "@/data/product"
import { db } from "@/lib/db"
import { products } from "@/lib/db/schema"
import { eq } from "drizzle-orm"
import { notFound } from "next/navigation"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Header } from "@/components/Header"
import { CardWrapper } from "@/components/forms/card-wrapper"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getUserByUsername } from "@/data/user"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import Image from "next/image"

export default async function ProductDetails({
  params,
}: {
  params: { productId: string }
}) {
  const id = params.productId
  const product = await getProductById(id)
  const seller = await getUserByUsername(product?.username!)

  if (!product) return notFound()

  const onSubmit = async () => {}

  return (
    <MaxWidthWrapper className="mt-16">
      <Breadcrumb className="mt-20">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={"/"}>Categoryss</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={"/product/" + product.id}>
              {product.name}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="mt-4"
      >
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <AspectRatio ratio={3 / 2}>
                <Image
                  src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
                  alt="Photo by Drew Beamer"
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
          <h1 className="text-2xl font-semibold">{product.name}</h1>
          <h1 className="text-2xl">RM{product.price}</h1>
          <h1 className="pt-16 text-2xl font-semibold">Description</h1>
          <p>{product.description}</p>
        </section>
        <section className="fixed inset-x-0 bottom-0 w-full flex-none shadow-2xl md:static md:shadow-none lg:static lg:w-auto">
          <CardWrapper className="w-full lg:w-[400px]">
            <form className="space-y-6">
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
              <Button type="submit" className="w-full">
                Buy Item
              </Button>
            </form>
          </CardWrapper>
        </section>
      </div>
    </MaxWidthWrapper>
  )
}
