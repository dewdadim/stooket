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
import { getUserById, getUserByUsername } from "@/data/user"

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
      <Header className="mt-4" />
      <div className="mt-4 flex">
        <section className="flex-1 space-y-4">
          <h1 className="text-2xl font-semibold">{product.name}</h1>
          <h1 className="text-2xl">RM{product.price}</h1>
        </section>
        <section className="flex-">
          <CardWrapper>
            <form className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="size-12 rounded-sm">
                  <AvatarImage src={seller?.image!} alt="Profile" />
                  <AvatarFallback className="size-8 rounded-sm bg-secondary">
                    IMG
                  </AvatarFallback>
                </Avatar>
                <span className="flex gap-2">
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
