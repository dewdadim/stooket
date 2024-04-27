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
import Link from 'next/link'
import { currentUser } from '@/lib/auth'
import * as React from 'react'
import { ProductCarousel } from '@/components/product-carousel'
import { Metadata, ResolvingMetadata } from 'next'
import { EyeOff, PenBoxIcon, Trash2 } from 'lucide-react'
import { DeleteButton } from '@/components/ui/delete-button'
import {
  AlertDialogHeader,
  AlertDialogFooter,
} from '@/components/ui/alert-dialog'
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/ui/alert-dialog'

type Props = {
  params: { productId: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { params, searchParams }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  // read route params
  const id = params.productId
  const product = await getProductById(id)

  return {
    title: product?.title,
  }
}

export default async function ProductDetails({ params }: Props) {
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
      <ProductCarousel productImages={productImg} />
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
                {!user?.username.match(product.username) ? (
                  <Link href={user ? '/buy/' + params.productId : '/login'}>
                    <Button type="submit" className="w-full">
                      Buy Item
                    </Button>
                  </Link>
                ) : (
                  <div className="flex flex-col gap-2 lg:gap-4">
                    <Link href={'/edit/product/' + params.productId}>
                      <Button
                        type="submit"
                        className="w-full"
                        variant="outline"
                      >
                        <div className="flex flex-row items-center gap-4">
                          <EyeOff size={16} />
                          Unlist Product
                        </div>
                      </Button>
                    </Link>
                    <Link href={'/edit/product/' + params.productId}>
                      <Button
                        type="submit"
                        className="w-full"
                        variant="outline"
                      >
                        <div className="flex flex-row items-center gap-4">
                          <PenBoxIcon size={16} />
                          Edit Product
                        </div>
                      </Button>
                    </Link>
                    <AlertDialog>
                      <AlertDialogTrigger>
                        <Button
                          type="submit"
                          className="w-full"
                          variant="destructive"
                        >
                          <div className="flex flex-row items-center gap-4">
                            <Trash2 size={16} />
                            DELETE PRODUCT
                          </div>
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Are you absolutely sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            This action cannot be undone. This will permanently
                            delete your account and remove your data from our
                            servers.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction className="bg-white p-0">
                            <DeleteButton productId={product.id} />
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                )}
              </div>
            </div>
          </CardWrapper>
        </section>
      </div>
    </MaxWidthWrapper>
  )
}
