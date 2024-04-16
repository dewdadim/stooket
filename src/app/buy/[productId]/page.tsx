import BuyForm from '@/components/forms/buy-form'
import { getProductById } from '@/data/product'
import { notFound } from 'next/navigation'

export default async function page({
  params,
}: {
  params: { productId: string }
}) {
  const id = params.productId
  const product = await getProductById(id)

  if (!product) return notFound()

  return <BuyForm data={product} />
}
