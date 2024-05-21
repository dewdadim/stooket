import MaxWidthWrapper from '@/components/MaxWidthWrapper'
import { getProductById } from '@/data/product'
import { db } from '@/drizzle'
import { productImages } from '@/drizzle/schema'
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
import { PenBoxIcon, Trash2 } from 'lucide-react'
import { DeleteProductButton } from '@/components/ui/delete-product-button'
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
import { ListProductButton } from '@/components/ui/list-product-button'

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
  const currentDate = new Date()
  const userRegisterDate = product?.post_at
  const difference_inTime = currentDate.getTime() - userRegisterDate?.getTime()!
  const difference_inDay = Math.round(difference_inTime / (1000 * 3600 * 24))
  const re = /&/gi
  const categoryParams = product?.category?.replace(re, '%26')

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
            <BreadcrumbLink href={`/category/${categoryParams}`}>
              {product.category}
            </BreadcrumbLink>
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
        <section className="mb-40 w-fit flex-auto space-y-4 md:mb-8">
          <div className="text-2xl font-semibold">{product.title}</div>
          <div className="text-2xl">RM{product.price?.toFixed(2)}</div>
          {product.description ? (
            <>
              <div className="pt-16 text-xl font-semibold">Description</div>
              <p>{product.description}</p>
            </>
          ) : null}
          <div className="pt-16 text-xl font-semibold">Details</div>
          <div className="grid grid-cols-2 gap-y-16">
            <div className="space-y-1">
              <p className="text-sm">Category</p>
              <p>
                <Link
                  href={`/category/${product.category}`}
                  className="text-blue-400 underline"
                  scroll={true}
                >
                  {product.category}
                </Link>
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm">Uploaded</p>
              <p>
                {`${difference_inDay} days ago by`}{' '}
                <Link
                  href={`/${product.username}`}
                  className="text-blue-400 underline"
                  scroll={true}
                >
                  {product.username}
                </Link>
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm">Available at</p>
              <p>{seller?.institute}</p>
            </div>
          </div>
        </section>
        <section className="fixed inset-x-0 bottom-0 w-full flex-none shadow-2xl md:static md:shadow-none lg:static lg:w-auto">
          <CardWrapper className="w-full lg:w-[400px]">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Link href={'/' + seller?.username} scroll={true}>
                  <Avatar className="size-12 rounded-sm">
                    <AvatarImage
                      src={seller?.image!}
                      alt="Profile"
                      className="object-cover"
                    />
                    <AvatarFallback className="size-8 rounded-sm bg-secondary">
                      IMG
                    </AvatarFallback>
                  </Avatar>
                </Link>
                <Link href={'/' + seller?.username} scroll={true}>
                  <span className="flex flex-wrap gap-2">
                    <p className="font-semibold hover:underline">
                      {seller?.name}
                    </p>
                    <p className="hover:underline">@{seller?.username}</p>
                  </span>
                </Link>
              </div>
              <div>
                {!user?.username.match(product.username) ? (
                  <Link
                    href={user ? '/purchase/' + params.productId : '/login'}
                    scroll={true}
                  >
                    <Button type="submit" className="w-full">
                      Buy Item
                    </Button>
                  </Link>
                ) : (
                  <div className="flex flex-col gap-2 lg:gap-4">
                    <ListProductButton
                      id={params.productId}
                      status={product.status!}
                    />
                    <Link
                      href={'/edit/product/' + params.productId}
                      scroll={true}
                    >
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
                      <AlertDialogTrigger asChild>
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
                          <AlertDialogTitle>Delete Product</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure want to delete this product? It will
                            permenantly delete this product from our server and
                            cannot be undone. All your purchases record related
                            to this product will gone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogAction asChild>
                            <DeleteProductButton id={product.id} />
                          </AlertDialogAction>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
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
