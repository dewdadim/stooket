import { getProductById } from '@/data/product'
import { notFound, redirect } from 'next/navigation'
import { Metadata, ResolvingMetadata } from 'next'
import { currentUser } from '@/lib/auth'
import PurchaseForm from '@/components/forms/purchase-form'

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
    title: `Buy ${product?.title}`,
  }
}

export default async function page({ params }: Props) {
  const id = params.productId
  const product = await getProductById(id)
  const user = await currentUser()

  if (!product) return notFound()
  if (user?.username.match(product.username))
    return redirect('/product/' + product.id)

  return <PurchaseForm data={product} />
}
