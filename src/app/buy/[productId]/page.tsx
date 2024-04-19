import BuyForm from '@/components/forms/buy-form'
import { getProductById } from '@/data/product'
import { notFound } from 'next/navigation'
import { Metadata, ResolvingMetadata } from 'next'

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

  if (!product) return notFound()

  return <BuyForm data={product} />
}
